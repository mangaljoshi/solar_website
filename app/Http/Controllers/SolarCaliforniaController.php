<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
class SolarCaliforniaController extends Controller
{   
    public $theme;

    public function __construct(){
        $this->theme = 'california';
    }
    
    public function home(Request $request) {
        if ($request->input('lp_subid1') || $request->get('sub_id1')) {
            $userData = [
                'lp_subid1' => $request->input('lp_subid1'),
                'sub_id1' => $request->get('subid'),
            ];
            Session::put('userData', $userData);
        }
        return view($this->theme.'.pages.home');
    }  

    public function zipForm(Request $request) {
        $this->validate($request, [
            'zip_code' => 'required|digits:5|numeric'
        ]);

        $userData = Session::get('userData');
        $userData["lp_campaign_id"] = "12325";
        $userData["lp_key"] = "wo2jugw6bkwqy";
        $userData["lp_supplier_id"] = "25154";
        // $userData["sub_id1"] = "NAT";
        $userData["lp_subid2"] ="nat";
        $userData["lp_response"] = "JSON";
        $userData["zip_code"] = $request->input('zip_code');
        $userData["ip_address"] = $request->ip();
        $userData["homeowner"] = "Yes";
        $userData["landing_page"] = "LP1";
        $userData["user_agent"] = $request->header('User-Agent');
        $userData["tcpa_text"] = config('base.tcpa_text');
        $userData["time_frame"] = "Immediate";
        $userData["house_size"] = "2-3 Bedroom";
        $userData["credit_rating"] = "Good";
        $userData["type_of_home"] = "Single Family";

        Session::put('userData', $userData);

        return redirect('/solar-energy-resolution-california/solar-wizard');
    }

    public function marketingPartners() {
        return view($this->theme.'.pages.marketing-partners');
    }

    public function solarWizard(Request $request) {
        if (Session::has('userData')) {
            $userData = Session::get('userData');
            if (!$userData['zip_code']) {
                return redirect('/solar-energy-resolution-california');
            }
        } else {
            return redirect('/solar-energy-resolution-california');
        }
        return view($this->theme.'.pages.solar-wizard');
    }

    public function terms() {
        return view($this->theme.'.pages.terms');
    }

    public function contact() {
        return view($this->theme.'.pages.contact');
    }

    public function privacy() {
        return view($this->theme.'.pages.privacy');
    }

    public function thankyou() {
        return view($this->theme.'.pages.quote-report');
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
                'first_name' => 'required|min:2',
                'last_name' => 'required|min:2'
            ]);
            $userData['first_name'] = $request->get('first_name');
            $userData['last_name'] = $request->get('last_name');
        } else if ($step == 7) {
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
        return response()->json(['success' => true, 'step' => $step]);
    }

    public function leadprosperAPI() {
        $url = "https://api.leadprosper.io/ingest";
        
        $userData = Session::get('userData');
        
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
