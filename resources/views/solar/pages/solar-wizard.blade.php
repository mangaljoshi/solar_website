@extends('solar.layouts.base')

@section('content')
    <div id="loading" style="display: none;">
        <img id="loading-image" src="solar/images/loader.gif" alt="Loading..." />
    </div>
    @include('solar.partials.top_header')
    <div class="main-wrapper wizard-box">
        <div class="d-table w-100">
            <div class="d-table-cell">
                <header class="header-main position-static pb-0 text-center">
                    <div class="container">
                        <div class="row">
                        <div class="col-sm-12">
                            <div class="lock"></div>
                            <div class="hero-logo">
                                <a href="{{ route('home') }}"><img src="solar/images/logo.png" alt=""></a>
                            </div>
                            <div class="wizard-bg-box mt-4">
                                <div class="progress" style="height: 20px;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="5" style="width: 10%;"></div>
                                </div>
                                <p>Your Savings Calculation is <span class="wizard-persantage">10%</span>Complete</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </header>
                <section class="hero-banner wizard-bg page-paddings">
                    <div class="container">
                        <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div class="page-ath-wrap">
                                <div class="page-ath-content register-form-content">
                                    <div class="page-ath-form">
                                    <div class="form-align-box">
                                        <div class="wizard">
                                            <!-- <form role="form" action="index.html" class="register-wizard-box"> -->
                                                <div class="tab-content" id="main_form">
                                                <div class="tab-pane fade in active" role="tabpanel" id="step1">
                                                    <div class="wizard__box">
                                                        <div class="page-title text-center mb-3">
                                                            <h2>{{ __('solar.page_title') }}</h2>
                                                            <p>{{ __('solar.page_title_description') }}</p>
                                                        </div>
                                                        <div class="wizard__main">
                                                            <div class="row justify-content-center">
                                                            <div class="col-sm-12">
                                                                <div class="range-slider">
                                                                    <div class="sliderLegend">
                                                                        <p class="sliderLegendItem--start" style="margin-bottom:0px">$101+</p>
                                                                        <p class="sliderLegendItem--end" style="margin-bottom:0px">$800+</p>
                                                                    </div>
                                                                    <div class="rSlider">
                                                                        <span class="slide"></span>
                                                                        <input id="range" class="avgBillRange" type="range" data-val="dec" min="101" max="800" >
                                                                    </div>
                                                                    <input type="hidden" class="zip_code" name="zip_code" value="{{ Session::get('userData')['zip_code']}}">
                                                                    <p class="range-slider__value text-center">$<span id="demo">450</span></p>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-12">
                                                                <span class="error-msg billInp_v error_step_1" style="color: white; display: none;"></span>
                                                            </div>
                                                            <div class="col-sm-12">
                                                                <div class="form-group picker text-center mt-20">
                                                                    <a href="javascript:void(0);" data-zip-btn class="btn-main next-step1 step1">
                                                                        <span class="text">Continue</span>
                                                                        <!-- <div class="spinner-border" style="display: none;" role="status">
                                                                        <span class="sr-only">Loading...</span>
                                                                        </div> -->
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
                                                            <h2>{{ __('solar.utility_text_heading')}}</h2>
                                                            <p>{{ __('solar.utility_text_details')}}</p>
                                                        </div>
                                                        <p data-zip-error style="text-align: center; color: red; display: none;">{{ __('solar.zip_code_result')}}</p>
                                                        <div class="wizard__main mx-680">
                                                            <div class="row justify-content-center">
                                                                <div class="col-sm-6 col-12">
                                                                    <div class="form-group text-center">
                                                                        <!-- <a href="javascript:void(0);" class="btn-main step2 w-100 utilityProvider">Other</a> -->

                                                                        <p class="text-white">Loading ....</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="wizard-back-btn text-center mt-4">
                                                        <span class="error-msg billInp_v error_step_2" style="color: white; display: none;"></span><br>
                                                        <a class="prev-step-1" style="text-decoration: none; color: white;" href="#" data-prev-step="1">
                                                            <span><i class="fas fa-chevron-left"></i> Back</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="tab-pane tab-pane" role="tabpanel" id="step3">
                                                    <div class="wizard__box">
                                                        <div class="page-title text-center mb-3">
                                                            <h2>{{ __('solar.address')}}</h2>
                                                            <p>{{ __('solar.address_text')}}</p>
                                                        </div>
                                                        <div class="wizard__main mx-680">
                                                            <form id="pac-input-form">
                                                            <div class="row justify-content-center">
                                                            <div class="col-12">
                                                                <div class="form-group">
                                                                    <!-- <input type="search" class="form-control" name="street" autocomplete="off" placeholder="Type Here e.g. 123 West Main Road"> -->

                                                                        <div class="dropdown">
                                                                        <input type="search" id="pac-input" name="home_address" class="jAuto form-control" placeholder="Type Here e.g. 123 West Main Road" autocomplete="off" required>

                                                                        <div class="invalid-feedback error_step_3 text-white"></div>

                                                                        <div class="dropdown-menu">
                                                                            <i class="hasNoResults">{{ __('solar.matching_results')}}</i>
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
                                                            <div class="row">
                                                            <div class="col-md-12 col-sm-12 col-12">
                                                                <div class="form-group picker text-center mt-20">
                                                                    <!-- <a href="javascript:void(0);" style="display: none;" class="btn-main step3">Continue</a> -->
                                                                    <button type="submit" class="btn-main step3">Continue</button>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        </form>
                                                    </div>
                                                    <div class="wizard-back-btn text-center mt-4">
                                                        <span class="prev-step-2" data-prev-step="2"><i class="fas fa-chevron-left"></i> Back</span>
                                                    </div>
                                                </div>
                                                <div class="tab-pane tab-pane" role="tabpanel" id="step4">
                                                    <div class="wizard__box">
                                                        <div class="page-title text-center mb-3">
                                                            <h2>{{ __('solar.sunlight_heading')}}</h2>
                                                            <p>{{ __('solar.sunlight_text')}}</p>
                                                        </div>
                                                        <div class="wizard__main mx-680">
                                                            <div class="row justify-content-center">
                                                            <div class="col-sm-6 col-6">
                                                                <div class="sunlight-box text-center">
                                                                    <a href="javascript:void(0);" class="step4 roofSunlight">
                                                                        <div class="sunlight-ico">
                                                                        <img src="solar/images/no-shade.svg" alt="">
                                                                        </div>
                                                                        <h3 class="theme-title">Full Sunlight</h3>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 col-6">
                                                                <div class="sunlight-box text-center">
                                                                    <a href="javascript:void(0);" class="step4 roofSunlight">
                                                                        <div class="sunlight-ico">
                                                                        <img src="solar/images/little-shade.svg" alt="">
                                                                        </div>
                                                                        <h3 class="theme-title">Some Shade</h3>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 col-6">
                                                                <div class="sunlight-box text-center">
                                                                    <a href="javascript:void(0);" class="step4 roofSunlight">
                                                                        <div class="sunlight-ico">
                                                                        <img src="solar/images/lot-of-shade.svg" alt="">
                                                                        </div>
                                                                        <h3 class="theme-title">Severe Shade</h3>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div class="col-sm-6 col-6">
                                                                <div class="sunlight-box text-center">
                                                                    <a href="javascript:void(0);" class="step4 roofSunlight">
                                                                        <div class="sunlight-ico">
                                                                        <img src="solar/images/uncertain.svg" alt="">
                                                                        </div>
                                                                        <h3 class="theme-title">Uncertain</h3>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="wizard-back-btn text-center mt-4">
                                                        <div class="invalid-feedback error_step_4 text-white"></div>
                                                        <span class="prev-step-3" data-prev-step="3"><i class="fas fa-chevron-left"></i> Back</span>
                                                    </div>
                                                </div>
                                                <div class="tab-pane tab-pane" role="tabpanel" id="step5">
                                                    <div class="wizard__box">
                                                        <div class="page-title text-center mb-3">
                                                            <h2>{{ __('solar.estimate_heading')}}</h2>
                                                            <p>{{ __('solar.estimate_text')}}</p>
                                                        </div>
                                                        <div class="wizard__main mx-680">
                                                            <div class="row justify-content-center">
                                                            <div class="col-12">
                                                                <div class="form-group">
                                                                    <input type="email" oninput="handleInput(event)" class="form-control emailInp" placeholder="Email address" required>
                                                                    <!-- <span class="error-msg emailInp_vemail" style="color: white; display: none;">Please Enter a Valid Email Address</span> -->
                                                                    <div class="invalid-feedback error_step_5 text-white"></div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div class="row">
                                                            <div class="col-md-12 col-sm-12 col-12">
                                                                <div class="form-group picker text-center mt-20">
                                                                    <a href="javascript:void(0);" class="btn-main step5">Next</a>
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="wizard-back-btn text-center mt-4">
                                                        <span class="prev-step-4" data-prev-step="4"><i class="fas fa-chevron-left"></i> Back</span>
                                                    </div>
                                                </div>
                                                <div class="tab-pane tab-pane" role="tabpanel" id="step6">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <div class="wizard__box">
                                                            <div class="page-title text-center mb-3">
                                                                <h2>{{ __('solar.estimate_for')}}</h2>
                                                                <p>{{ __('solar.privacy_text')}}</p>
                                                            </div>
                                                            <div class="wizard__main mx-680">
                                                                <div class="row justify-content-center">
                                                                    <div class="col-sm-6 col-12">
                                                                        <div class="form-group">
                                                                            <input type="text" oninput="handleInput(event)" class="form-control firstNameInp" placeholder="Enter first name" required>
                                                                            <!-- <span class="error-msg firstNameInp_errormsg" style="color: white; display: none;">Please Enter Your First Name</span> -->
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-sm-6 col-12">
                                                                        <div class="form-group">
                                                                            <input type="text" oninput="handleInput(event)" class="form-control lastNameInp" placeholder="Enter last name" required>
                                                                        <!-- <span class="error-msg lastNameInp_errormsg" style="color: white; display: none;">Please Enter Your Last Name</span> -->
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-sm-6 col-12 text-center">
                                                                        <div class="invalid-feedback error_step_6 text-white"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12 col-sm-12 col-12">
                                                                        <div class="form-group picker text-center mt-20">
                                                                        <a href="javascript:void(0);" class="btn-main step6">Next</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                            <div class="wizard-back-btn text-center mt-4">
                                                            <span class="prev-step-5" data-prev-step="5"><i class="fas fa-chevron-left"></i> Back</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane tab-pane" role="tabpanel" id="step7">
                                                    <form id="phoneNumberForm">
                                                        <div class="row">
                                                            <div class="col-12">
                                                            <div class="wizard__box">
                                                                <div class="page-title text-center mb-3">
                                                                    <h2>{{ __('solar.final_step')}}</h2>
                                                                    <p>{{ __('solar.final_step_text')}}</p>
                                                                </div>
                                                                <div class="wizard__main mx-680">
                                                                    <div class="row justify-content-center">
                                                                        <div class="col-sm-12 col-12">
                                                                        <div class="input-group">
                                                                            <div class="input-group-prepend left_border">
                                                                                <b>+ 1</b>
                                                                            </div>
                                                                            <input id="phone" type="tel" 
                                                                            name="phone" oninput="handleInput(event)" class="form-control phoneNumber right_border" placeholder="Enter Phone Number" required onkeypress="return onlyNumberKey(event)">

                                                                            <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
                                                                            <input type="hidden" name="xxTrustedFormCertUrl" id="xxTrustedFormCertUrl_0" value="https://cert.trustedform.com/454a35b802f3e7b63ffabb4efedb7c6ebe67886c">
                                                                            <input type="hidden" name="xxTrustedFormPingUrl" id="xxTrustedFormPingUrl_0" value="https://ping.trustedform.com/0.HJDqajg8vVF20hwiDBJ92kct5idepgBM4vHylmh43kShfWSZKwm8HI37KqPToi0y3dhTIQ3N.uOjUbzs7aKNUWivkGh7I9Q.50hgmcLFsDabNx1wtZZPdQ">
                                                                        </div>
                                                                        <!-- <span class="error-msg phoneNumber_errormsg" style="color: white; display: none;">Please Enter a Valid US Phone Number</span> -->

                                                                        <div class="invalid-feedback error_step_7 text-white phoneNumber_errormsg"></div>
                                                                        </div>

                                                                        <div class="col-md-12 col-sm-12 col-12 mt-2">
                                                                            <div class="form-group picker text-center mt-4 mb-4">
                                                                                <button type="submit" class="btn-main">View My Savings</button>
                                                                            </div>
                                                                        </div>

                                                                        <div class="col-sm-12 col-12 mt-4">
                                                                        <label for="leadid_tcpa_disclosure" class="lead_text">
                                                                        {{ __('solar.tcpa_label.solar._1') }} <a href="{{ route('marketing') }}" target="_blank" tabindex="0" style="color:#7b7b7b;text-decoration:underline">{{ __('solar.tcpa_label.solar._2') }}</a> {{ __('solar.tcpa_label.solar._3') }}
                                                                        </label>  
                                                                            
                                                                        <input type="hidden" id="leadid_tcpa_disclosure" name="tcpa" tabindex="0" value="{{ __('solar.tcpa_text') }}">
                                                                        </div>
                                                
                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="wizard-back-btn text-center mt-4">
                                                                <span class="prev-step-6" data-prev-step="6"><i class="fas fa-chevron-left"></i> Back</span>
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div class="clearfix"></div>
                                                </div>
                                            <!-- </form> -->
                                            <!-- <div class="wizard-inner d-none">
                                                <ul class="nav nav-tabs" role="tablist">
                                                <li role="presentation">
                                                    <a href="#step1" class="active" data-toggle="tab" aria-controls="step1" role="tab" aria-expanded="true" data-step="1">
                                                    <span class="round-tab">1</span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#step2" class="disabled" data-toggle="tab" aria-controls="step2" role="tab" aria-expanded="false" data-step="2">
                                                    <span class="round-tab">2</span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#step3" class="disabled" data-toggle="tab" aria-controls="step3" role="tab" data-step="3">
                                                    <span class="round-tab">3</span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#step4" class="disabled" data-toggle="tab" aria-controls="step4" role="tab" data-step="4">
                                                    <span class="round-tab">4</span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#step5" class="disabled" data-toggle="tab" aria-controls="step4" role="tab" data-step="5">
                                                    <span class="round-tab">5</span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#step6" class="disabled" data-toggle="tab" aria-controls="step4" role="tab" data-step="6">
                                                    <span class="round-tab">6</span>
                                                    </a>
                                                </li>
                                                <li role="presentation">
                                                    <a href="#step7" class="disabled" data-toggle="tab" aria-controls="step7" role="tab" data-step="7">
                                                    <span class="round-tab">7</span>
                                                    </a>
                                                </li>
                                                </ul>
                                            </div> -->
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
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