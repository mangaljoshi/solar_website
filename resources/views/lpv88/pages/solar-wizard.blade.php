@extends('lpv88.layouts.base')

@section('content')
    <div id="loading" style="display: none;">
        <img id="loading-image" src="{{ asset('energybill/images/loader.gif') }}" alt="Loading..." />
    </div>
    <div class="main-wrapper wizard-box">
        <div class="d-table w-100">
            <div class="d-table-cell">
                <header class="header-main position-static pb-0 text-center">
                    <div class="container">
                        <div class="row">
                        <div class="col-sm-12">
                            <div class="hero-logo">
                                <a href="{{ route('solar.home', ['route_name' => 'lpv88']) }}"><img src="{{ asset('energybill/images/logo.png') }}" alt=""></a>
                            </div>
                            <!-- <div class="wizard-bg-box mt-4">
                                <div class="progress" style="height: 20px;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="5" style="width: 10%;"></div>
                                </div>
                                <p>Your Savings Calculation is <span class="wizard-persantage">10%</span>Complete</p>
                            </div> -->
                        </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    </div>

<div id="root">
    <div class="wubeyt-3 leVSaK">
        <div class="wubeyt-0 gOBari">
            <div class="wubeyt-4 FwqCW">
                <div class="wubeyt-1 cKvqmz">
                </div>
            </div>
            <div>
                <div class="sc-1j985zc-0 FwqCW">
                    <div class="MuiLinearProgress-root MuiLinearProgress-colorPrimary MuiLinearProgress-determinate" role="progressbar" aria-valuenow="22" aria-valuemin="0" aria-valuemax="100">
                        <div class="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate">
                            <div class="wizard sc-1mfr99g-0 jTfmBgS" style="padding: 25px 10px;">
                                <div class="tab-content" id="main_form">
                                    <div class="tab-pane fade in active" role="tabpanel" id="step1">
                                        <div class="wizard__box">
                                            <div class="page-title text-center mb-3">
                                                <h2>{{ __('solarenergy.electricity_bill_heading')}}</h2>
                                                <!-- <p>{{ __('solarenergy.savings_text')}}</p> -->
                                            </div>
                                            <div class="wizard__main" >
                                                <div class="row justify-content-center">
                                                    <div class="col-sm-12">
                                                        <div class="range-slider">
                                                            <div class="sliderLegend">
                                                                <p class="sliderLegendItem--start" style="margin-bottom:0px">$101+</p>
                                                                <p class="sliderLegendItem--end" style="margin-bottom:0px">$800+</p>
                                                            </div>
                                                            <div class="rSlider">
                                                                <!-- <span class="slide"></span> -->
                                                                <input id="range" class="avgBillRange" type="range" data-val="dec" min="101" max="800" >
                                                            </div>
                                                            <input type="hidden" class="zip_code" name="zip_code" value="{{ Session::get('userData')['zip_code']}}">
                                                            <p class="range-slider__value text-center">$<span id="demo">450</span></p>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-12">
                                                        <span class="error-msg billInp_v error_step_1" style="color: red; display: none;"></span>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-6 col-md-6">
                                                        <div class="form-group picker text-center mt-20">
                                                            <a href="javascript:void(0);" data-zip-btn class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary next-step1 step1" style="background-color: #e11c1c; font-weight: bold;width: 100%;">
                                                                <span class="MuiButton-label" style="line-height: 1.5em;">Continue</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane tab-pane" role="tabpanel" id="step2">
                                        <div class="wizard__box">
                                            <div class="page-title text-center mb-3">
                                                <h2>{{ __('solarenergy.utility_provider')}}</h2>
                                                <!-- <p>{{ __('solarenergy.utility_text')}}</p> -->
                                            </div>
                                            <p data-zip-error style="text-align: center; color: red; display: none;">{{ __('solarenergy.zip_code')}}</p>
                                            <div class="wizard__main mx-680">
                                                <div class="byMguB">
                                                    <div class="cwbftf">
                                                        <div class="row justify-content-center">
                                                            <div class="col-sm-6 col-12">
                                                                <div class="form-group text-center">
                                                                    <p class="text-dark">Loading ....</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wizard-back-btn text-center mt-4">
                                            <span class="error-msg billInp_v error_step_2" style="color: red; display: none;"></span><br>
                                            <a class="prev-step-1 text-dark" style="text-decoration: none; color: white;" href="#" data-prev-step="1">
                                                <span><i class="fas fa-chevron-left text-dark"></i> Back</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="tab-pane tab-pane" role="tabpanel" id="step3">
                                        <div class="wizard__box">
                                            <div class="page-title text-center mb-3">
                                                <h2>{{ __('solarenergy.address')}}</h2>
                                                <!-- <p>{{ __('solarenergy.rebates')}}</p> -->
                                            </div>
                                            <div>
                                                <form id="pac-input-form">
                                                <div class="row justify-content-center">
                                                    <div class="col-xs-10 col-md-6">
                                                        <div class="form-group">
                                                            <div class="dropdown">
                                                                <input type="search" id="pac-input" name="home_address" class="jAuto form-control" placeholder="Street Address" autocomplete="off" required>

                                                                <div class="invalid-feedback error_step_3 text-danger"></div>

                                                                <div class="dropdown-menu">
                                                                    <i class="hasNoResults">{{ __('solarenergy.matching_results')}}</i>
                                                                    <div class="list-autocomplete">
                                                                        <button type="button" class="dropdown-item">New Orleans, LA, USA</button>
                                                                        <button type="button" class="dropdown-item">Cherokee, NC, USA</button>
                                                                        <button type="button" class="dropdown-item">New York, NY, USA</button>
                                                                        <button type="button" class="dropdown-item">Baltimore, MD, USA</button>
                                                                        <button type="button" class="dropdown-item">Nashville, TN, USA</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <div class="col-xs-12 col-md-6 col-sm-6 ">
                                                        <div class="form-group picker text-center mt-20">
                                                            <button type="submit" class="btn-main step3 MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary jTfmBg" style="background-color: #e11c1c; font-weight: bold;">Continue</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </form>
                                        </div>
                                        <div class="wizard-back-btn text-center mt-4">
                                            <span class="prev-step-2 text-dark" data-prev-step="2"><i class="fas fa-chevron-left"></i> Back</span>
                                        </div>
                                    </div>
                                    <div class="tab-pane tab-pane" role="tabpanel" id="step4">
                                        <div class="wizard__box">
                                            <div class="page-title text-center mb-3">
                                                <h2 class="title_">{{ __('solarenergy.sunlight')}}</h2>
                                                <!-- <p>{{ __('solarenergy.savings')}}</p> -->
                                            </div>
                                            <div class="wizard__main mx-680">
                                                <div class="row justify-content-center">
                                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                                        <a href="javascript:void(0);" class="step4 roofSunlight sunlight-box text-center">
                                                            <div class="sunlight-ico">
                                                                <img src="{{ asset('energybill/images/noshade.svg') }}" alt="">
                                                            </div>
                                                            <span class="text_ text-dark">Full Sunlight</span>
                                                        </a>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                                        <a href="javascript:void(0);" class="step4 roofSunlight sunlight-box text-center">
                                                            <div class="sunlight-ico">
                                                                <img src="{{ asset('energybill/images/littleshade.svg') }}" alt="">
                                                            </div>
                                                            <span class="text_ text-dark">Some Shade</span>
                                                        </a>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                                        <a href="javascript:void(0);" class="step4 roofSunlight sunlight-box text-center">
                                                            <div class="sunlight-ico">
                                                                <img src="{{ asset('energybill/images/alotshade.svg') }}" alt="">
                                                            </div>
                                                            <span class="text_ text-dark">Severe Shade</span>
                                                        </a>
                                                    </div>
                                                    <div class="col-xs-12 col-sm-3 col-md-3">
                                                        <a href="javascript:void(0);" class="step4 roofSunlight sunlight-box text-center">
                                                            <div class="sunlight-ico">
                                                                <img src="{{ asset('energybill/images/uncertain.svg') }}" alt="">
                                                            </div>
                                                            <span class="text_ text-dark">Uncertain</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wizard-back-btn text-center mt-4">
                                            <div class="invalid-feedback error_step_4 text-white"></div>
                                            <span class="prev-step-3 text-dark" data-prev-step="3"><i class="fas fa-chevron-left"></i> Back</span>
                                        </div>
                                    </div>
                                    <div class="tab-pane tab-pane" role="tabpanel" id="step5">
                                        <div class="wizard__box">
                                            <div class="page-title text-center mb-3">
                                                <h2>{{ __('solarenergy.estimate')}}</h2>
                                                <p class="note">{{ __('solarenergy.email')}}</p>
                                            </div>
                                            <div>
                                                <div class="row justify-content-center">
                                                    <div class="col-xs-12 col-md-6">
                                                        <div class="form-group">
                                                            <input type="email" oninput="handleInput(event)" class="form-control emailInp" placeholder="Email address" required>
                                                            <div class="invalid-feedback error_step_5 text-danger"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-center">
                                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                                        <div class="form-group picker text-center mt-20">
                                                            <a href="javascript:void(0);" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary btn-main step5" style="background-color: #e11c1c; font-weight: bold;line-height: 1.5em; width: 100%;font-size: 17px;">Next</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="wizard-back-btn text-center mt-4 text-dark">
                                            <span class="prev-step-4" data-prev-step="4"><i class="fas fa-chevron-left"></i> Back</span>
                                        </div>
                                    </div>
                                    <div class="tab-pane tab-pane" role="tabpanel" id="step6">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="wizard__box">
                                                    <div class="page-title text-center mb-3">
                                                        <h2>{{ __('solarenergy.estimate_for')}}</h2>
                                                        <p>{{ __('solarenergy.privacy')}}</p>
                                                    </div>
                                                    <div class="row d-flex justify-content-center ">
                                                        <div class="col-xs-6 col-sm-6 col-md-6">
                                                            <div class="form-group">
                                                                <input type="text" oninput="handleInput(event)" class="form-control firstNameInp" placeholder="Enter first name" required>
                                                                <div class="invalid-feedback error_step_6 text-danger"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <div class="col-xs-6 col-sm-6 col-md-6">
                                                            <div class="form-group">
                                                                <input type="text" oninput="handleInput(event)" class="form-control lastNameInp" placeholder="Enter last name" required>

                                                                <div class="invalid-feedback error_step_6 text-danger"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row justify-content-center">
                                                        <div class="col-xs-6 col-sm-6 col-md-6">
                                                            <div class="form-group picker text-center mt-20">
                                                            <a href="javascript:void(0);" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary btn-main step6" style="background-color: #e11c1c; font-weight: bold; line-height: 1.5em;width: 100%;font-size: 17px;">Next</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="wizard-back-btn text-center mt-4 text-dark">
                                                    <span class="prev-step-5" data-prev-step="5"><i class="fas fa-chevron-left"></i> Back</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane tab-pane" role="tabpanel" id="step7" style="margin: 0 150px;">
                                        <form id="phoneNumberForm">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="wizard__box">
                                                        <div class="page-title text-center mb-3">
                                                            <h2>{{ __('solarenergy.final_step') }}</h2>
                                                            <p class="note">{{ __('solarenergy.savings_text_final') }}</p>
                                                        </div>
                                                        <div>
                                                            <div class="row justify-content-center">
                                                                <div class="col-xs-12 col-sm-6 col-md-6">
                                                                    <div class="input-group mb-3" style="height: 60px;">
                                                                        <div class="input-group-prepend">
                                                                            <span class="input-group-text" id="basic-phone" style="height: 60px; width: 50px;font-size: 22px;font-weight: bold;">+1</span>
                                                                        </div>
                                                                        <input id="phone" type="tel" class="form-control phoneNumber" placeholder="Enter Phone Number"
                                                                        required aria-describedby="basic-phone" onkeypress="return onlyNumberKey(event)"
                                                                        style="font-size: 22px;">
                                                                    </div>
                                                                    <div>
                                                                        <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
                                                                        <input type="hidden" name="xxTrustedFormCertUrl" id="xxTrustedFormCertUrl_0" value="https://cert.trustedform.com/454a35b802f3e7b63ffabb4efedb7c6ebe67886c">
                                                                        <input type="hidden" name="xxTrustedFormPingUrl" id="xxTrustedFormPingUrl_0" value="https://ping.trustedform.com/0.HJDqajg8vVF20hwiDBJ92kct5idepgBM4vHylmh43kShfWSZKwm8HI37KqPToi0y3dhTIQ3N.uOjUbzs7aKNUWivkGh7I9Q.50hgmcLFsDabNx1wtZZPdQ">
                                                                    </div>
                                                                    <div class="invalid-feedback error_step_7 text-white phoneNumber_errormsg"></div>
                                                                </div>
                                                            </div>
                                                            <div class="row justify-content-center">
                                                                <div class="col-xs-12 col-md-6 col-sm-6 mt-2" style="margin-top: 80px;">
                                                                    <div class="form-group picker text-center mb-4">
                                                                        <button type="submit" class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary btn-main" style="background-color: #e11c1c; font-weight: bold; margin-top: 0px;">Get Free Quote</button>
                                                                    </div>
                                                                </div>

                                                                <div class="col-xs-12 col-md-10 col-md-10 mt-4 mb-4">
                                                                    <label for="leadid_tcpa_disclosure" class="lead_text" style="margin: 85px auto 0px;">
                                                                    {{ __('solarenergy.tcpa_label._1')}} <a href="{{ route('solar.marketing', ['route_name' => 'lpv88']) }}" target="_blank" tabindex="0" style="color:#7b7b7b;text-decoration:underline">{{ __('solarenergy.tcpa_label._2')}}</a> {{ __('solarenergy.tcpa_label._3')}} <a href="{{ route('solar.terms', ['route_name' => 'lpv88']) }}" target="_blank" tabindex="0" style="color:#7b7b7b;text-decoration:underline">{{ __('solarenergy.tcpa_label._4')}}</a>
                                                                    {{ __('solarenergy.tcpa_label._5')}} <a href="{{ route('solar.privacy', ['route_name' => 'lpv88']) }}" target="_blank" tabindex="0" style="color:#7b7b7b;text-decoration:underline">{{ __('solarenergy.tcpa_label._6')}}</a>
                                                                    </label>  
                                                                        
                                                                    <input type="hidden" id="leadid_tcpa_disclosure" name="tcpa" tabindex="0" value="{{ __('solarenergy.tcpa_text')}}">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="wizard-back-btn text-center mt-4 text-dark">
                                                        <span class="prev-step-6" data-prev-step="6"><i class="fas fa-chevron-left"></i> Back</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @include('lpv88.partials.footer')
    </div>
</div>
@endsection

@section('script')
    <script id="LeadiDscript" type="text/javascript">
         (function() {
         var s = document.createElement('script');
         s.id = 'LeadiDscript_campaign';
         s.type = 'text/javascript';
         s.async = true;
         s.src = '//create.lidstatic.com/campaign/093ae24d-3c6c-1874-691e-bbfd5eac0c88.js?snippet_version=2';
         var LeadiDscript = document.getElementById('LeadiDscript');
         LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
         })();
    </script>
    <noscript>
        <img src='//create.leadid.com/noscript.gif?lac=997AF13F-C149-B106-54A8-4676CF210163&lck=093ae24d-3c6c-1874-691e-bbfd5eac0c88&snippet_version=2' />
    </noscript>
    <!-- TrustedForm -->
    <script type="text/javascript">
        (function() {
        var tf = document.createElement('script');
        tf.type = 'text/javascript'; tf.async = true;
        tf.src = ("https:" == document.location.protocol ? 'https' : 'http') + "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=" + new Date().getTime() + Math.random();
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
        })();
    </script>
    <noscript>
        <img src="https://api.trustedform.com/ns.gif" />
    </noscript>
    <!-- End TrustedForm -->
@endsection