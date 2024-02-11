<?php

namespace App\GraphQL\Resolvers;

use Gate;

class ResourceAclResolver
{
    public function __invoke($resource): array
    {
        return [
            'view' => Gate::check('view', $resource),
            'update' => Gate::check('update', $resource),
            'delete' => Gate::check('delete', $resource),
        ];
    }
}
