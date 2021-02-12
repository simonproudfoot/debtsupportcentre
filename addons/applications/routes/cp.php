<?php

use Illuminate\Support\Facades\Route;
//use simonp\Applications\Http\Controllers\applications;

Route::prefix('applications/')->name('applications')->group(function() {
   // Route::get('/', "applications@index")->name('index');
    Route::get('/', 'applications@index'); // Acme\Example\ExampleController
});


Route::prefix('export/')->name('export.')->group(function() {
    Route::get('/', "applications@export")->name('index');
});