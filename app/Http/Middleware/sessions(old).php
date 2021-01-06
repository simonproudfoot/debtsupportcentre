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

    //dd(Session()->get('get_data'));
    if ($request->input('utm_source') !== null && !session()->exists('get_data')) {
      session()->put('get_data', $request->all());
      // session()->put('keyword', $_GET['utm_source']);
    }

    // ?mt=e&device=c&kw=consolidation%20loan%20for%20bad%20credit&cn=loans&ag=[CE]-SE-ConsolidationLoansBadCredit-[EM]&sc=g
    return $next($request);
  }
}
