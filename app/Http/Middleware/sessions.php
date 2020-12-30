<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Routing\Redirector;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Session;

class sessions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (isset($_GET) && count($_GET) > 0 && !isset($_SESSION['get_data']) && ((!isset($_GET['cctelephone']) && !isset($_GET['customername'])) || isset($_GET['kw']))) {
            $request->session()->put('get_data', json_encode($_GET));
            $request->session()->put('keyword', $_GET['kw']);
        }
        return $next($request);
    }
}
