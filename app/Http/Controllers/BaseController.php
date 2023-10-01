<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class BaseController extends Controller
{
    // ?address=1851&city=&email=&fname=Thomas&lname=Haroldson&lptoken=33xrgjdq0g0fj6pky70041&state=&trafficsource=RevContent&vid=ef7KWBtmIDQhYaxBpqlWya6B9Ux&zip=
    public function home(Request $request, $route_name = 'energybill') {
        if ($request->get('ef_transaction_id') || $request->get('sub1') || $request->get('aff_id') ||$request->get('lptoken') || $request->get('sub_id1') || $request->get('fname')|| $request->get('lname') || $request->get('email')|| $request->get('zip')|| $request->get('trafficsource')||$request->get('vid')) {
            $userData = [
                'sub_id1' => $request->get('subid1'),
                'ef_transaction_id' => $request->get('ef_transaction_id'),
                'aff_id' => $request->get('aff_id'),
                'sub1' => $request->get('sub1'),
                'first_name' => $request->get('fname'),
                'last_name' => $request->get('lname'),
                'zip_code' => $request->get('zip'),
                'email' => $request->get('email'),
                'source' => $request->get('trafficsource'),
                'lp_subid1' => $request->get('lptoken'),
                "vid" => $request->get('vid'),

            ];
            Session::put('userData', $userData);
        }

        if($route_name == 'lpv23'){
            $userData = Session::get('userData');
            $userData['lp_campaign_id'] = "12325";
            $userData['lp_key'] = "wo2jugw6bkwqy";
            $userData['lp_supplier_id'] = "25154";
            $userData['lp_subid2'] = "lpv23";
            $userData['lp_response'] = "JSON";
            $userData['sub_id1'] = "int";
            $userData['ip_address'] = $request->ip();
            $userData['homeowner'] = "Yes";
            $userData['landing_page'] = 'powersolarsavings.com';
            $userData['user_agent'] = $request->header('User-Agent');
            $userData['tcpa_text'] = config('base.tcpa_text');
            $userData['time_frame'] = "Immediate";
            $userData["house_size"] = "2-3 Bedroom";
            $userData["credit_rating"] = "Good";
            $userData["gclid"] = "";
    
            Session::put('userData', $userData);
            return view($route_name.'.pages.home');
        }
        // dd($route_name.'.pages.home');
        return view($route_name.'.pages.home');
    }

    public function zipForm(Request $request, $route_name = 'energybill') {
        $this->validate($request, [
            'zip_code' => 'required|digits:5|numeric'
        ]);
        $userData = Session::get('userData');
        $userData['lp_campaign_id'] = "12325";
        $userData['lp_key'] = "wo2jugw6bkwqy";
        $userData['lp_supplier_id'] = "25154";
        $userData['lp_subid2'] = ($route_name == 'lpv88') ? 'lpv88' : "nat";
        $userData['lp_response'] = "JSON";
        $userData['sub_id1'] = "int";
        $userData['zip_code'] = $request->input('zip_code');
        $userData['ip_address'] = $request->ip();
        $userData['homeowner'] = "Yes";
        $userData['landing_page'] = 'powersolarsavings.com';
        $userData['user_agent'] = $request->header('User-Agent');
        $userData['tcpa_text'] = config('base.tcpa_text');
        $userData['time_frame'] = "Immediate";
        $userData["house_size"] = "2-3 Bedroom";
        $userData["credit_rating"] = "Good";
        $userData["type_of_home"] = "Single Family";
        $userData["gclid"] = "";

        Session::put('userData', $userData);
        return redirect($route_name.'/solar-wizard');
    }

    public function marketingPartners($route_name = 'energybill') {
        return view($route_name.'.pages.marketing-partners');
    }

    public function solarWizard(Request $request, $route_name = 'energybill') {
        if (Session::has('userData')) {
            $userData = Session::get('userData');
            if (!$userData['zip_code']) {
                return redirect('/');
            }
        } else {
            return redirect('/');
        }
        return view($route_name.'.pages.solar-wizard');
    }

    public function terms($route_name = 'energybill') {
        return view($route_name.'.pages.terms');
    }

    public function contact($route_name = 'energybill') {
        return view($route_name.'.pages.contact');
    }

    public function privacy($route_name = 'energybill') {
        return view($route_name.'.pages.privacy');
    }

    public function ccpa($route_name = 'energybill') {
        return view($route_name.'.pages.ccpa');
    }


    public function quotereport($route_name = 'energybill') {
        if($route_name == "lpv23"){
            return view($route_name.'.pages.second-service');
        }else{
             return view($route_name.'.pages.quote-report');
        }
       
    }

    public function thankyou($route_name = 'energybill') {
        return view($route_name.'.pages.thank-you');
    }

     public function thankyouService($route_name = 'energybill') {
        return view($route_name.'.pages.thankyou-service');
    }

    public function thankyouConfirmation(Request $request, $route_name = 'energybill', $zipCode = null, $category = null) {

        if ($zipCode === null) {
            $zipCode = $request->session()->get('zipCode');
        }
    
        if ($category === null) {
            $category = $request->session()->get('category');
            $category = str_replace('%20', ' ', $category);
        }
        $response = $this->fetchData($request, $route_name);
    
        $apiResponse = $request->session()->get('api_response');
        return view($route_name . '.pages.thankyou-confirmation', ['apiResponse' => $apiResponse,
        'zipCode' => $zipCode,
        'category' => $category,]);
        
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
        }else if ($step == 3) {
            $this->validate($request, [
                'type_of_home' => 'required'
            ]);
            $userData['type_of_home'] = $request->get('type_of_home');
        } else if ($step == 4) {
            $this->validate($request, [
                'address' => 'required'
            ]);
            $userData['address'] = $request->get('address');
            $userData['city'] = $request->get('city');
            $userData['state'] = $request->get('state');
        } else if ($step == 5) {
            $this->validate($request, [
                'roof_shade' => 'required'
            ]);
            $userData['roof_shade'] = $request->get('roof_shade');
        } else if ($step == 6) {
            $this->validate($request, [
                'email' => 'required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'
            ]);
            $userData['email'] = $request->get('email');
        } else if ($step == 7) {
            $this->validate($request, [
                'first_name' => 'required|min:2',
                'last_name' => 'required|min:2'
            ]);
            $userData['first_name'] = $request->get('first_name');
            $userData['last_name'] = $request->get('last_name');
        } else if ($step == 8) {
            $this->validate($request, [
                'phone' => 'required|size:10'
            ]);
            $userData['phone'] = $request->get('phone');
            $phoneResponse = $this->verifyPhone($userData['phone']);
            if ($phoneResponse) {
                return response()->json([
                    'success' => false,
                    'step' => $step,
                    'message' => "Phone Number Is Invalid"
                ]);
            }
            $userData['trusted_form_cert_url'] = $request->get('trusted_form_cert_url');
            $userData['trusted_form_cert_id'] = basename($request->get('trusted_form_cert_url'));
            $userData['jornaya_lead_id'] = $request->get('jornaya_lead_id');
            $userData['jornaya_leadid'] = $request->get('jornaya_lead_id');
            Session::put('userData', $userData);
            $this->leadprosperAPI($userData);
            // $this->leadprosperAPISolar();
            return response()->json(['success' => true, 'step' => $step]);
        } else {
            return response()->json(['success' => false]);
        }
        
        Session::put('userData', $userData);
        return response()->json(['success' => true, 'step' => $step]);
    }

    public function updateSolarDataLPV23(Request $request, $step){

        $userData = Session::get('userData');
       if ($step == 1) {
            $this->validate($request, [
                'zip_code' => 'required|digits:5|numeric',
                'monthly_savings' => 'required'
            ]);
            $userData['zip_code'] = $request->get('zip_code');
            $userData['monthly_savings'] = $request->get('monthly_savings');
        } else if ($step == 2) {
            $this->validate($request, [
                'monthly_bill' => 'required'
            ]);
            $userData['monthly_bill'] = $request->get('monthly_bill');
        }  else if ($step == 3) {
            $this->validate($request, [
                'utility_provider' => 'required'
            ]);
            $userData['utility_provider'] = $request->get('utility_provider');
        } else if ($step == 4) {
            $this->validate($request, [
                'type_of_home' => 'required'
            ]);
            $userData['type_of_home'] = $request->get('type_of_home');
        }else if ($step == 5) {
            $this->validate($request, [
                'address' => 'required',
            ]);
            $userData['address'] = $request->get('address');
            $userData['city'] = $request->get('city');
            $userData['state'] = $request->get('state');
        }else if ($step == 6) {
            $this->validate($request, [
                'roof_shade' => 'required'
            ]);
            $userData['roof_shade'] = $request->get('roof_shade');
        }else if ($step == 7) {
            $this->validate($request, [
                'email' => 'required|email'
            ]);
            $userData['email'] = $request->get('email');
        }  else if ($step == 8) {
            $this->validate($request, [
                'first_name' => 'required|regex:/^[A-Za-z]+$/',
                'last_name' => 'required|regex:/^[A-Za-z]+$/'

            ]);
            $userData['first_name'] = $request->get('first_name');
            $userData['last_name'] = $request->get('last_name');
        } else if ($step == 9) {
            $this->validate($request, [
                'phone' => 'required|digits:10'

            ]);
            $userData['phone'] = $request->get('phone');
            $phoneResponse = $this->verifyPhone( $userData['phone'] );
            if ($phoneResponse) {
                return response()->json([
                    'success' => false,
                    'step' => $step,
                    'message' => "Phone Number Is Invalid"
                ]);
            }
            $userData['trusted_form_cert_url'] = $request->get('trusted_form_cert_url');
            $userData['trusted_form_cert_id'] = basename($request->get('trusted_form_cert_url'));
            $userData['jornaya_lead_id'] = $request->get('jornaya_leadid');
            $userData['jornaya_leadid'] = $request->get('jornaya_leadid');
            // dd($userData);
            Session::put('userData', $userData);
            $userData = Session::get('userData');
            $this->leadprosperAPI($userData);

            //Session::forget('userData');
            return response()->json(['success' => true, 'step' => $step]);
        } else {
            return response()->json(['success' => false]);
        }

        Session::put('userData', $userData);

        return response()->json(['success' => true, 'step' => $step]);
    }

    public function secondService(Request $request, $route_name = 'energybill') {
        $userData = Session::get('userData');
        // dd($userData);
        if(!$request->has('services')) {
            return redirect($route_name.'/thankyou-service');
        }

        if (array_key_exists("roofing", $request->get('services'))) {
            $this->roofingData($userData, $request->get('services'));
        } 
        
        if (array_key_exists("gutter", $request->get('services'))) {
            $this->gutterData($userData, $request->get('services'));
        } 

        return redirect($route_name.'/thankyou-service');
        // return redirect($route_name.'/quote-report')
    }

    public function roofingData($userData, $services) {
        $roofingData['lp_campaign_id'] = "14988";
        $roofingData['lp_supplier_id'] = "30547";
        $roofingData['lp_key'] = "wo2jue3xrsyzmw";
        $roofingData['lp_subid2'] = "natus";
        $roofingData['first_name'] = $userData['first_name'];
        $roofingData['last_name'] = $userData['last_name'];
        $roofingData['email'] = $userData['email'];
        $roofingData['phone'] = $userData['phone'];
        $roofingData['address'] = $userData['address'];
        $roofingData['city'] = $userData['city'];
        $roofingData['state'] = $userData['state'];
        $roofingData['zip_code'] = $userData['zip_code'];
        $roofingData['ip_address'] = $userData['ip_address'];
        $roofingData['user_agent'] = $userData['user_agent'];
        $roofingData['trusted_form_cert_url'] = $userData['trusted_form_cert_url'];
        $roofingData['jornaya_leadid'] = $userData['jornaya_lead_id'];
        $roofingData['jornaya_lead_id'] = $userData['jornaya_lead_id'];

        $roofingData['project_type'] = $services['roofing']['service_type'];
        $roofingData['roofing_type'] = $services['roofing']['material'];

        $roofingData['project_interest'] = 'Planning & Budgeting';
        $roofingData['landing_page_url'] = 'remodelmintroofing.com';
        $roofingData['time_frame'] = 'Flexible';
        $roofingData['home_owner'] = 'Yes';
        $roofingData['credit_rating'] = "Good";
        $roofingData['call_time'] = 'Anytime';
        $roofingData['tcpa'] = 'Yes';
        $roofingData['tcpa_text'] = "By submitting the form or by clicking on the 'Get My Free Quote' button above or buttons that carry the same meaning, you expressly consent to receive communications from us, our partners and their dealers and contractors regarding their products, devices or services, by email, text message or phone (including via automatic telephone dialing system) to the landline or mobile number provided, even if that telephone number is on a corporate, state, or national Do Not Call Registry. You do not have to agree to receive such calls or messages as a condition of receiving any devices, services or products from us or from our partners and their dealers. For more information see our Privacy Policy and Terms & Conditions.";

        $this->leadprosperAPI($roofingData);
    }

    public function gutterData($userData, $services) {
        $gutterData['lp_campaign_id'] = "14650";
        $gutterData['lp_supplier_id'] = "29931";
        $gutterData['lp_key'] = "r23jcmm66c6n7n";
        $gutterData['lp_subid2'] = "natus";
        $gutterData['first_name'] = $userData['first_name'];
        $gutterData['last_name'] = $userData['last_name'];
        $gutterData['email'] = $userData['email'];
        $gutterData['phone'] = $userData['phone'];
        $gutterData['address'] = $userData['address'];
        $gutterData['city'] = $userData['city'];
        $gutterData['state'] = $userData['state'];
        $gutterData['zip_code'] = $userData['zip_code'];
        $gutterData['ip_address'] = $userData['ip_address'];
        $gutterData['user_agent'] = $userData['user_agent'];
        $gutterData['trusted_form_cert_url'] = $userData['trusted_form_cert_url'];
        $gutterData['jornaya_leadid'] = $userData['jornaya_lead_id'];
        $gutterData['jornaya_lead_id'] = $userData['jornaya_lead_id'];
        
        $gutterData['project_type'] = $services['gutter']['project_type'];; 
        $gutterData['gutter_material'] = $services['gutter']['material'];; 

        $gutterData['property_type'] = 'Residential';
        $gutterData['project_interest'] = 'Planning & Budgeting';
        $gutterData['landing_page_url'] = 'remodelmint.com';
        $gutterData['time_frame'] = 'Flexible';
        $gutterData['home_owner'] = 'Yes';
        $gutterData['call_time'] = 'Anytime';
        $gutterData['service_type'] = 'Gutters';
        $gutterData['credit_rating'] = "Good";
        $gutterData['tcpa'] = 'Yes';
        $gutterData['tcpa_text'] = "By submitting the form or by clicking on the 'Get My Free Quote' button above or buttons that carry the same meaning, you expressly consent to receive communications from us, our partners and their dealers and contractors regarding their products, devices or services, by email, text message or phone (including via automatic telephone dialing system) to the landline or mobile number provided, even if that telephone number is on a corporate, state, or national Do Not Call Registry. You do not have to agree to receive such calls or messages as a condition of receiving any devices, services or products from us or from our partners and their dealers. For more information see our Privacy Policy and Terms & Conditions.";

        $this->leadprosperAPI($gutterData);
    }

    public function leadprosperAPI($data) {
        $url = "https://api.leadprosper.io/ingest";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
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

    public function thankYouPage($route_name = 'energybill') {
        Session::forget('userData');
        return view($route_name.'.pages.thank-you');
    }

    public function verifyPhone($number) {
        $apiKey = "5f2506a1-c62e-4600-8c3f-bbf61b2819ed";
        $url = "https://api.phonevalidator.com/api/v3/phonesearch?apikey=".$apiKey."&phone=".$number."&type=fake,basic";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json'
        ));
        $responseData = curl_exec($ch);
        if(curl_errno($ch)) {
            return curl_error($ch);
        }
        curl_close($ch);
        $responseData = json_decode($responseData);
        $FakeNumber =$responseData->PhoneBasic->FakeNumber;
        if($FakeNumber == "YES"){
            return true;
        }else{
            return false;
        }
        // return $responseData;
    }

    public function fetchData(Request $request, $route_name) {
        try {
            $username = "Maxadsmedia";
            $password = "IJc4zVGCP45y9U2N1AD2AIJZLD5ZU4dZotua59IClZQ=";
    
            // $zipCode = $request->route('zipCode');
            $zipCode = $request->input('zipCode');
            $category = $request->input('category');
        //    dd($zipCode);
            if (!$zipCode) {
                $userData = Session::get('userData');
                $zipCode = $userData['zip_code'];
            }
            $credentials = base64_encode($username . ':' . $password);
    
            $ch = curl_init();
    
            curl_setopt($ch, CURLOPT_URL, "https://api.thumbtack.com/v1/partners/discoverylite/pros?zip_code={$zipCode}&category={$category}}&utm_medium=partnership&utm_source=cma-maxads");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Basic ' . $credentials,
                'Content-Type: application/json'
            ]);
    
            $response = curl_exec($ch);
    
            if (curl_errno($ch)) {
                throw new \Exception('cURL Error: ' . curl_error($ch));
            }
            $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            if ($httpStatus !== 200) {
                throw new \Exception('API request failed with HTTP status: ' . $httpStatus);
            }
    
            curl_close($ch);
    
            $data = json_decode($response, true);
    
            $request->session()->put('api_response', $data);
            $request->session()->put('zipCode', $zipCode);
            $request->session()->put('category', $category);
            // dd($data);
    
            // return response()->json($data);
            // return redirect()->route('thank-you');
            return redirect($route_name."/thankyou-confirmation");
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching data: ' . $e->getMessage()], 500);
        }
    }
    
}
