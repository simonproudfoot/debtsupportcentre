<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Statamic;
use Statamic\Facades\CP\Nav;
use Illuminate\Support\Facades\Route;

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
            $nav->content('Applications')->route('applications.index')->icon('form');
        });


        // Statamic::pushCpRoutes(function () {
        //     Route::namespace('\App\Http\Controllers')->group(function () {
        //         require base_path('routes/cp.php');
        //     });
        // });

        
    }
}
