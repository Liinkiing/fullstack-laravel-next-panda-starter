<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Auth;
use GuzzleHttp\Exception\ClientException;
use Laravel\Socialite\Facades\Socialite;
use Session;

class OAuthController extends Controller
{
    public function redirect()
    {
        if (request()->has('return_to')) {
            Session::put('return_to', request()->get('return_to'));
        }

        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            /** @var \Laravel\Socialite\Two\User $oauthUser */
            $oauthUser = Socialite::driver('google')->user();
            $avatarUrl = $oauthUser->avatar;
            if (!$oauthUser->email) {
                logger()->alert('User has no email', [
                    'provider' => 'google',
                    'user' => $oauthUser,
                ]);

                return redirect(config('app.frontend_url') . '/login');
            }

            $user = User::where("google_id", $oauthUser->id)->orWhere('email', $oauthUser->email)->first();
            $refreshToken = $oauthUser->refreshToken;

            if ($user) {
                $user->update([
                    'google_id' => $oauthUser->id,
                    'avatar_url' => $avatarUrl,
                    'google_token' => $oauthUser->token,
                    'google_refresh_token' => $refreshToken,
                ]);
            } else {
                $user = User::create([
                    'name' => $oauthUser->name,
                    'email' => $oauthUser->email,
                    'avatar_url' => $avatarUrl,
                    'google_id' => $oauthUser->id,
                    'google_token' => $oauthUser->token,
                    'google_refresh_token' => $refreshToken,
                ]);
            }

            $returnTo = Session::get('return_to', RouteServiceProvider::HOME);
            Auth::login($user);
            Session::forget('return_to');

            return redirect(config('app.frontend_url') . $returnTo);
        } catch (ClientException $e) {
            if (request('error') === 'access_denied') {
                logger()->warning('User denied access', [
                    'provider' => 'google',
                ]);

                return redirect(config('app.frontend_url') . '/login');
            }
            logger()->error("An error occurred while trying to login via Google", [
                'exception' => $e,
            ]);

            return redirect(config('app.frontend_url') . '/login');
        } catch (\Exception $e) {
            logger()->error("An error occurred while trying to login via Google", [
                'exception' => $e,
            ]);

            return redirect(config('app.frontend_url') . '/login');
        }
    }
}
