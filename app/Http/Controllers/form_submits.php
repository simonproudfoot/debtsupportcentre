<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
class form_submits extends Controller
{
    public function debt_help_submit(Request $request){
        //return $request['question_1']['answer'];
        $package = array(
            'Lead_ref' => urlencode('DSC')
            , 'LeadSourceID' => urlencode('280') //required
            , 'IsLive' => urlencode('0') //required, change to 1 when ready
            , 'Name' => urlencode(stripslashes($request['question_8']['fullName'])) //required
            , 'Mob' => urlencode($request['question_8']['phone']) //required               
            , 'Email' => urlencode($request['question_8']['email'])//Optional   
            // , 'DebtValue' => urlencode('5000') //Optional (Requires integer)
            //    , 'Creditors' => urlencode($request['question_5']['answer']) //Optional   
            , 'Employment' => urlencode($request['question_3']['answer']) //Optional   
            , 'ResidentialStatus' => urlencode($request['question_4']['answer']) //Optional            
            , 'DI' => urlencode($request['question_5']['answer']) //Optional (amou range)
            , 'a_url' => urlencode($_SERVER['SERVER_NAME'])
            , 'opt_in' => urlencode(1)
            , 'tc_a' => urlencode(1)
            , 'mk_text' => urlencode(1)
            , 'mk_email' => urlencode(1)
            , 'client_ip' => urlencode($request['question_8']['userIP'])
        );
        $api_url = 'http://dfh-api.co.uk/api2/SubmitApplication/DSC/index.php';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $package);
        $response_string = curl_exec($ch);
        $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        return $httpcode;
    }
}
