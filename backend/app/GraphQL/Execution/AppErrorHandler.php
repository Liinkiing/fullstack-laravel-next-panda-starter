<?php

namespace App\GraphQL\Execution;

use Closure;
use GraphQL\Error\Error;
use Nuwave\Lighthouse\Execution\ErrorHandler;
use Nuwave\Lighthouse\GlobalId\GlobalIdException;

class AppErrorHandler implements ErrorHandler
{
    private function shouldBeDiscarded(?\Throwable $e): bool
    {
        if (null === $e) {
            return true;
        }

        if ($e instanceof GlobalIdException) {
            return true;
        }

        return false;
    }

    public function __invoke(?Error $error, Closure $next): ?array
    {
        if ($this->shouldBeDiscarded($error?->getPrevious())) {
            return $next(null);
        }

        return $next($error);
    }
}
