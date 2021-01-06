<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Session;

class form_submits extends Controller
{
    public function saveLocal($package){
        $package['datetime_submitted'] = date('Y-m-d H:i:s');
        $applications = Storage::exists('applications/' . date('Y-m-d') . '.json') ? json_decode(Storage::get('applications/' . date('Y-m-d') . '.json')) : array();
        $applications = json_decode(json_encode($applications), true);
        if ($applications == null) {
            $applications = [];
        }
        array_push($applications, $package);
        Storage::put('applications/' . date('Y-m-d') . '.json', json_encode($applications), 'private');
        return 'done';
    }

    public function deleteOld()
    {
        // since server can't run cron jobs, we must see if theres a file over a month old old and delete it if so
        $old = strtotime("-30 days", strtotime(date('Y-m-d')));
        $old = date("Y-m-d", $old);
        if (Storage::exists('applications/' . $old . '.json')) {
            Storage::delete('applications/' . $old . '.json');
        }
        return 'done';
    }

    public function debt_help_submit(Request $request)
    {
        //  set total debt
        $totalDebt = 0;
        $debtString = $request['question_5']['answer'];
        if ($debtString == "Less than £5,000") {
            $totalDebt = 5000;
        } elseif ($debtString == "£5,000 - £10,000") {
            $totalDebt = 10000;
        } elseif ($debtString == "£10,000 - £20,000") {
            $totalDebt = 20000;
        } elseif ($debtString == "More than £20,000") {
            $totalDebt = 25000;
        }
        // set how many debts
        $creditors = 0;
        $creditorsString = $request['question_6']['answer'];
        if ($creditorsString == "1-3") {
            $creditors = 3;
        } elseif ($creditorsString == "4-5") {
            $creditors = 5;
        } elseif ($creditorsString == "6-7") {
            $creditors = 7;
        } elseif ($creditorsString == "8 or more") {
            $creditors = 8;
        }

        $urlData = '';
        if (Session()->exists('get_data')) {
            $urlData = Session()->get('get_data');
            parse_str($urlData, $output);
            $urlData = json_encode($output);
        } 

        $package = array(
            'Lead_ref' => urlencode('DSC'), 'LeadSourceID' => urlencode('280') //required
            , 'IsLive' => urlencode('1') //required, change to 1 when ready
            , 'Name' => urlencode(stripslashes($request['question_8']['fullName'])) //required
            , 'Mob' => urlencode($request['question_8']['phone']) //required               
            , 'Email' => urlencode($request['question_8']['email']) //Optional   
            , 'DebtValue' => urlencode($totalDebt) //Optional (Requires integer)
            , 'Creditors' => urlencode($creditors) //Optional   
            , 'Employment' => urlencode($request['question_3']['answer']) //Optional   
            , 'ResidentialStatus' => urlencode($request['question_4']['answer']) //Optional            
            , 'DI' => urlencode($request['question_7']['answer']) //Optional 
            , 'opt_in' => urlencode(1), 'tc_a' => urlencode(1), 
            'mk_text' => urlencode(($request['question_8']['commsSMS'] == true) ? 1 : 0), 
            'mk_email' => urlencode(($request['question_8']['commsEmail'] == true) ? 1 : 0), 
            'client_ip' => urlencode($request['question_8']['userIP']), 
            'Current_Situation' => urlencode($request['question_1']['answer']), 
            'Causing_Stress_Anxiety' => urlencode($request['question_2']['answer']), 
            'a_url' => urlencode($urlData)
        );

        $this->saveLocal($package);
        $this->deleteOld();

        if(env('APP_ENV') == 'dev'){
            // Skip sending to API if in dev mode
            return 'done';
        }else{
            //Send to API
            $api_url = 'http://dfh-api.co.uk/api2/SubmitApplication/DSC/index.php';
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $api_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $package);
            $response_string = curl_exec($ch);
            $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            return $response_string;
        }       
    }
}
