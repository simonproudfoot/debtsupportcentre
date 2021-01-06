<?php

namespace simonp\Applications\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Illuminate\Support\Facades\Response;
class Applications
{

    public function index()
    {
        return view('applications::index');
    }

    public function export(Request $request)
    {

        $headers = [
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0'
        ,   'Content-type'        => 'text/csv'
        ,   'Content-Disposition' => 'attachment; filename='.$_GET['d'].'.csv'
        ,   'Expires'             => '0'
        ,   'Pragma'              => 'public'
    ];

    $file = Storage::get('applications/' . $_GET['d'] . '.json');
    $list = json_decode($file, true);
    

    # add headers for each column in the CSV download
    array_unshift($list, array_keys($list[0]));
    

   $callback = function() use ($list) 
    {
        $FH = fopen('php://output', 'w');
        foreach ($list as $row) { 
            fputcsv($FH, $row);
        }

        fclose($FH);
    };

    return Response::stream($callback, 200, $headers); //use Illuminate\Support\Facades\Response;
    }
}
