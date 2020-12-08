<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class form_submits extends Controller
{
    public function debt_help_submit(Request $data){
        
        

        echo $data['data'];
        


        // $package = array(
        //     'Lead_ref' => urlencode('DSC')
        //     , 'LeadSourceID' => urlencode('280') //required
        //     , 'IsLive' => urlencode('0') //required
        //     , 'Name' => urlencode(stripslashes($_REQUEST['ccname'])) //required
        //     , 'Mob' => urlencode($_REQUEST['cctelephone']) //required               
        //     , 'Email' => urlencode($_REQUEST['ccemail'])//Optional   
        //     , 'DebtValue' => urlencode($amount) //Optional   
        //     , 'Creditors' => urlencode($debt) //Optional   
        //     , 'Employment' => urlencode($_REQUEST['regular_income']) //Optional   
        //     , 'ResidentialStatus' => urlencode($_REQUEST['own_house']) //Optional            
        //     , 'DI' => urlencode($_REQUEST['amountrange']) //Optional
        //     , 'a_url' => urlencode($_REQUEST['get-data'])
        //     , 'opt_in' => urlencode(($_REQUEST['agree'] == 'yes') ? 1 : 0)
        //     , 'tc_a' => urlencode(($_REQUEST['check'] == 'yes') ? 1 : 0)
        //     , 'mk_text' => urlencode(($_REQUEST['update_sms'] == 'yes') ? 1 : 0)
        //     , 'mk_email' => urlencode(($_REQUEST['update_email'] == 'yes') ? 1 : 0)
        //     , 'client_ip' => urlencode($ip)
        // );
        
        // $api_url = 'http://dfh-api.co.uk/api2/SubmitApplication/DSC/index.php';
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, $api_url);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($ch, CURLOPT_POST, 1);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $package);
        // $response_string = curl_exec($ch);
    }
}
