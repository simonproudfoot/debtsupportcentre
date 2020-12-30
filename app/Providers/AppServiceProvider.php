<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Statamic;
use Statamic\Facades\CP\Nav;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Statamic::script('app', 'cp');
        Nav::extend(function ($nav) {
            $nav->content('Applications')
                //->route('store.index')
                ->icon('form');
        });
        // Nav::extend(function ($nav) {
        //     $nav->content('Store')
        //         ->route('store.index')
        //         ->icon('shopping-cart');
        // });
    }
}
