<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class BaseController extends Controller
{
    
    public function home() {
        return view('pages.home');
    }

    public function zipForm(Request $request) {
        $this->validate($request, [
            'zip_code' => 'required|digits:5|numeric'
        ]);

        $userData = [
            "lp_campaign_id" => "12444",
            "lp_key" => "o6e2twdofpyp6",
            "lp_supplier_id" => "25370",
            "sub_id1" => "112",
            "lp_response" => "JSON",
            "zip_code" => $request->input('zip_code'),
            "ip_address" => $request->ip(),
            "homeowner" => "Yes",
            "landing_page" => "LP1",
            "user_agent" => $request->header('User-Agent'),
            "tcpa_text"=> config('base.tcpa_text'),
            "time_frame" => "Immediate",
        ];

        Session::put('userData', $userData);

        // dd(Session::get('userData'));

        return redirect('/solar-wizard');
    }


    // Session::set('variableName', $value);


    public function marketingPartners() {
        return view('pages.marketing-partners');
    }

    public function solarWizard(Request $request) {
        if (Session::has('userData')) {
            $userData = Session::get('userData');
            if (!$userData['zip_code']) {
                return redirect('/');
            }
        } else {
            return redirect('/');
        }
        // dd(Session::get('userData'));
        return view('pages.solar-wizard');
    }

    public function terms() {
        return view('pages.terms');
    }

    public function contact() {
        return view('pages.contact');
    }

    public function privacy() {
        return view('pages.privacy');
    }

    public function thankyou() {
        return view('pages.quote-report');
    }

    public function updateData(Request $request, $step) {
        $userData = Session::get('userData');
        if ($step == 1) {
            $this->validate($request, [
                'monthly_bill' => 'required'
            ]);
            $userData['monthly_bill'] = $request->get('monthly_bill');
        } else if ($step == 2) {
            $this->validate($request, [
                'utility_provider' => 'required'
            ]);
            $userData['utility_provider'] = $request->get('utility_provider');
        } else if ($step == 3) {
            $this->validate($request, [
                'address' => 'required'
            ]);
            $userData['address'] = $request->get('address');
            $userData['city'] = $request->get('city');
            $userData['state'] = $request->get('state');
        } else if ($step == 4) {
            $this->validate($request, [
                'roof_shade' => 'required'
            ]);
            $userData['roof_shade'] = $request->get('roof_shade');
        } else if ($step == 5) {
            $this->validate($request, [
                'email' => 'required|email'
            ]);
            $userData['email'] = $request->get('email');
        } else if ($step == 6) {
            $this->validate($request, [
                'first_name' => 'required',
                'last_name' => 'required'
            ]);
            $userData['first_name'] = $request->get('first_name');
            $userData['last_name'] = $request->get('last_name');
        } else if ($step == 7) {
            // dd(var_dump($request->get('phone')));
            $this->validate($request, [
                'phone' => 'required|size:10'
            ]);
            $userData['phone'] = $request->get('phone');
            $userData['trusted_form_cert_url'] = $request->get('trusted_form_cert_url');
            $userData['jornaya_lead_id'] = $request->get('jornaya_lead_id');
            Session::put('userData', $userData);
            $this->leadprosperAPI();
            Session::forget('userData');
            return response()->json(['success' => true, 'step' => $step]);
        } else {
            return response()->json(['success' => false]);
        }
        
        Session::put('userData', $userData);
        // dump($userData);
        return response()->json(['success' => true, 'step' => $step]);
    }

    public function leadprosperAPI() {
        $url = "https://api.leadprosper.io/ingest";
       
        $userData = Session::get('userData');
        // return true;
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json'
        ));
        $responseData = curl_exec($ch);
        if(curl_errno($ch)) {
            return curl_error($ch);
        }
        curl_close($ch);
        $responseData = json_decode($responseData);
        return $responseData;
    }
    
}
