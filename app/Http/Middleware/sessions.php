<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
        //dd(session()->get('get_data'));
        if (!isset($_GET['name']) && isset($_GET) && count($_GET) > 0 && !session()->has('get_data') || !isset($_GET['name']) && isset($_GET) && count($_GET) > 0 && empty(session()->get('get_data'))) {
            session()->put('get_data', $_GET);
        }
        // ?mt=e&device=c&kw=consolidation%20loan%20for%20bad%20credit&cn=loans&ag=[CE]-SE-ConsolidationLoansBadCredit-[EM]&sc=g
        return $next($request);
    }
}
