@extends('solar.layouts.base')

@section('style')
    <link href="{{ asset('solar/css/second-service.css') }}" rel="stylesheet">
@endsection

@section('script')
    <script src="{{ asset('solar/js/second-service.js') }}" type="text/javascript" ></script>
@endsection

@section('content')
    <div class="main-wrapper wizard-box">
        <div class="d-table w-100">
            <div class="d-table-cell">
                <!-- <div class="d-none d-sm-block d-md-block">
                  @include('solar.partials.header_home')
                </div> -->
                <section class="hero-banner quate-report wizard-bg page-paddings pt-1 pb-4">
                    <div class="container">
                        <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div class="wizard__box">
                                <div class="page-title text-center mb-2">
                                    <h2 style="font-size:22px;font-weight:400">You’ve been Pre-Qualified for $0 Out of Pocket Solar with Estimated Savings of <span style="color:#FB7306">$64,741*</span></h2>
                                    <p class="mobile-text" style="font-size: 14px;">*based on a special offer from a solar provider. Expect a phone call from a solar expert to claim the offer and your spot in the line.</p>
                                </div>
                                <div class="wizard__main">
                                    <div class="row justify-content-center">
                                    <div class="col-xs-12 col-sm-12 col-md-12">
                                            <div class="form-wrapper second-service-wrapper pt-xs-20 pb-xs-20 pl-xs-15 pr-xs-15 pl-sm-30 pr-sm-30 pl-lg-40 pr-lg-40">                                            
                                                <h3 class="mt-xs-0" style="color: #3c763d; font-weight:600;">Increase your property value with these home upgrades. Get your free quote from top local installers.</h3>
                                                <div class="second-service mt-xs-30">
                                                    <p>Select needed project(s):</p>
                                                    <form novalidate="novalidate" action="{{ route('solar.second.service', ['route_name' => 'solar']) }}" accept-charset="UTF-8" method="post">
                                                        @csrf()
                                                        <div class="service">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                                                <title>home_pros_center_icons</title>
                                                                <circle class="circle-orange" cx="160" cy="160" r="35"></circle>
                                                                <circle class="circle-blue" cx="115" cy="115" r="65"></circle>
                                                                <path class="fill-dark" d="M100,143.88A2.15,2.15,0,0,0,97.87,146v15.8a2.14,2.14,0,0,0,4.29,0V146A2.14,2.14,0,0,0,100,143.88Z"></path>
                                                                <path class="fill-dark" d="M100,36a2.15,2.15,0,0,0-2.14,2.14V54a2.14,2.14,0,1,0,4.29,0V38.18A2.14,2.14,0,0,0,100,36Z"></path>
                                                                <path class="fill-dark" d="M124.87,138.8a2.14,2.14,0,0,0-3.71,2.14l7.9,13.68a2.14,2.14,0,0,0,3.71-2.14Z"></path>
                                                                <path class="fill-dark" d="M70.94,45.39A2.14,2.14,0,0,0,68,44.6a2.14,2.14,0,0,0-.78,2.93l7.93,13.74a2.14,2.14,0,1,0,3.71-2.14Z"></path>
                                                                <path class="fill-dark" d="M154.61,129.06l-13.67-7.9a2.14,2.14,0,0,0-2.15,3.71l13.68,7.9a2.13,2.13,0,0,0,1.07.29,2.14,2.14,0,0,0,1.07-4Z"></path>
                                                                <path class="fill-dark" d="M61.27,75.16,47.53,67.23a2.14,2.14,0,1,0-2.14,3.71l13.74,7.93a2.14,2.14,0,0,0,2.14-3.71Z"></path>
                                                                <path class="fill-dark" d="M161.82,97.87H146a2.14,2.14,0,0,0,0,4.29h15.8a2.14,2.14,0,1,0,0-4.29Z"></path>
                                                                <path class="fill-dark" d="M56.15,100A2.15,2.15,0,0,0,54,97.87H38.18a2.14,2.14,0,0,0,0,4.29H54A2.15,2.15,0,0,0,56.15,100Z"></path>
                                                                <path class="fill-dark" d="M139.84,79.12a2.16,2.16,0,0,0,1.07-.28l13.71-7.9a2.14,2.14,0,0,0-2.14-3.71l-13.71,7.9a2.14,2.14,0,0,0-.79,2.93A2.15,2.15,0,0,0,139.84,79.12Z"></path>
                                                                <path class="fill-dark" d="M60.16,120.85h0a2.14,2.14,0,0,0-1.07.29l-13.71,7.93a2.14,2.14,0,1,0,2.15,3.71l13.71-7.93a2.14,2.14,0,0,0-1.07-4Z"></path>
                                                                <path class="fill-dark" d="M132,44.6a2.14,2.14,0,0,0-1.07-.29h0a2.15,2.15,0,0,0-1.86,1.07l-7.93,13.71a2.14,2.14,0,1,0,3.71,2.15l7.93-13.71A2.15,2.15,0,0,0,132,44.6Z"></path>
                                                                <path class="fill-dark" d="M78,138a2.14,2.14,0,0,0-2.93.79l-7.9,13.71a2.14,2.14,0,0,0,3.71,2.14l7.9-13.71A2.15,2.15,0,0,0,78,138Z"></path>
                                                                <path
                                                                    class="fill-dark"
                                                                    d="M113.4,97.12a2.61,2.61,0,0,0-2-1.27L104,95.42l1.42-17a2.5,2.5,0,0,0-.61-1.77,2.34,2.34,0,0,0-1.72-.75,2.5,2.5,0,0,0-2,1.14l-14.41,24.3a2.37,2.37,0,0,0-.06,2.34,2.62,2.62,0,0,0,2,1.27l7.42.43-1.41,16.19a2.33,2.33,0,0,0,4.3,1.42l14.42-23.51A2.37,2.37,0,0,0,113.4,97.12Z"
                                                                ></path>
                                                                <path class="fill-dark" d="M100,59a41,41,0,1,0,41,41A41,41,0,0,0,100,59Zm0,77.72A36.72,36.72,0,1,1,136.72,100,36.72,36.72,0,0,1,100,136.72Z"></path>
                                                                <path class="fill-orange" d="M100.55,98.36a1.52,1.52,0,0,1-.37-1.11l1.12-13.44L90.89,101.37l7.55.44a1.51,1.51,0,0,1,1.41,1.64l-1.11,12.78,10.37-16.91-7.5-.44A1.52,1.52,0,0,1,100.55,98.36Z"></path>
                                                            </svg>

                                                            <label class="custom-checkbox">
                                                                Gutter Guard
                                                                <input type="checkbox" name="services[gutter]" id="services_gutter_" value="gutter"/>
                                                                <span class="checkmark"></span>
                                                            </label>
                                                            <div class="second-service-questions">
                                                                <div class="form-group mb-xs-15">
                                                                    <label>What is the nature of your project?</label>
                                                                    <select class="form-control" name="services[gutter][project_type]" disabled="true">
                                                                        <option value="Install">Install new gutter guards</option>
                                                                        <option value="Repair">Replace existing gutter guards</option>
                                                                        <option value="Repair">Repair existing gutter guards</option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group mb-xs-15">
                                                                    <label>Select the type of Gutter material you have:</label>
                                                                    <select class="form-control" name="services[gutter][material]" disabled="true">
                                                                        <option value="Copper" selected="">Copper</option>
                                                                        <option value="Galvanized">Galvanized steel</option>
                                                                        <option value="PVC">PVC</option>
                                                                        <option value="Seamless Metal">Seamless aluminum</option>
                                                                        <option value="Wood">Wood</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="service">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                                                <title>home_pros_center_icons</title>
                                                                <circle class="circle-orange" cx="160" cy="160" r="35"></circle>
                                                                <circle class="circle-blue" cx="115" cy="115" r="65"></circle>
                                                                <path
                                                                    class="fill-dark"
                                                                    d="M173.38,136.24,151,61a2,2,0,0,0-1.92-1.41H94.24V45.46a2,2,0,0,0-2-2H76.64a2,2,0,0,0-2,2V59.6H58.55A2,2,0,0,0,56.63,61L34.22,136.24a2,2,0,0,0,1.92,2.58h90.52a2,2,0,0,0,1.92-1.43l20.48-68.72,19.71,66.14H146.45a2,2,0,1,0,0,4h25a2,2,0,0,0,1.92-2.58ZM78.64,47.46H90.23V81.93H78.64ZM38.83,134.8,60,63.61H74.63V83.94a2,2,0,0,0,2,2h15.6a2,2,0,0,0,2-2V63.61h20.94L94,134.8ZM143.09,74.64H126.33a2,2,0,0,0,0,4H141.9l-3.29,11H121.84a2,2,0,0,0,0,4h15.57l-3.29,11H117.36a2,2,0,1,0,0,4h15.58l-3.29,11H112.87a2,2,0,0,0,0,4h15.58l-3.29,11h-27l21.21-71.19h27Z"
                                                                ></path>
                                                                <rect class="fill-orange" x="78.64" y="47.46" width="11.59" height="34.47"></rect>
                                                            </svg>

                                                            <label class="custom-checkbox">
                                                                Roofing
                                                                <input type="checkbox" name="services[roofing]" id="services_roofing_" value="roofing" />
                                                                <span class="checkmark"></span>
                                                            </label>
                                                            <div class="second-service-questions">
                                                                <div class="form-group mb-xs-15">
                                                                    <label>What is your roofing project type?</label>
                                                                    <select class="form-control" name="services[roofing][service_type]" disabled="true">
                                                                        <option value="Install" selected="">Install</option>
                                                                        <option value="Replace">Replace</option>
                                                                        <option value="Repair">Repair</option>
                                                                    </select>
                                                                </div>
                                                                <div class="form-group mb-xs-15">
                                                                    <label>What type of roof do you need help with?</label>
                                                                    <select class="form-control" name="services[roofing][material]" disabled="true">
                                                                        <option value="Asphalt" selected="">Asphalt/Shingle</option>
                                                                        <option value="Metal">Metal</option>
                                                                        <option value="Natural Slate">Natural Slate</option>
                                                                        <option value="Composite">Wood/Composite</option>
                                                                        <option value="Tile">Tile</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mt-xs-30">
                                                            <h5 id="seconde_service_validation" class="text-danger text-left" style="display: none;"></h5>
                                                            <div class="row justify-content-cente">
                                                                <div class="col-xs-12 col-md-6 col-md-offset-3">
                                                                    <button type="submit" data-disable-with="Please Wait <i class='linearicon linearicon-ellipsis'></i>" class="btn btn-warning btn-block btn-lg">Get Quotes</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="yell-wrapper box-2">

                                            <div class="yell">

                                                <div class="credit-score d-none d-sm-block d-md-block">
                                                    <a href=""><img src="{{ asset('solar/images/thank-you-image.png') }}"></a>
                                                </div>

                                                <div class="body">
                                                    <div class="cta-title mb-4">
                                                        Congratulations! You Qualified for the Best Deals on Window Replacements in Your Area.
                                                    </div>

                                                    <div class="credit-score d-block d-sm-none d-md-none">
                                                        <a href=""><img src="{{ asset('solar/images/thank-you-image.png') }}"></a>
                                                    </div>

                                                    <div class="cta-subtitle text-dark">
                                                        See your savings with top local professionals in 30 seconds.
                                                    </div>

                                                    <a class="btn-main" style="padding: 12px 65px;" target="_blank" href="https://lp.remodelyourhome.net/?c=307&lp=6">
                                                        Continue &gt;
                                                    </a>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <section class="s-pb testimonial-section page-paddings pt-0">
                    <div class="container">
                        <div class="testimonial row">
                        <div class="item">
                            <div class="ts-block">
                                <div class="ts-author">
                                    <img src="{{ asset('solar/images/testimonial-1.png') }}" width="60" height="60" alt="">
                                    <div class="content">
                                    <h3 class="theme-title">Linda R.</h3>
                                    <div class="rating">
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                    </div>
                                    </div>
                                </div>
                                <p>I had no idea I could benefit from the solar program that much! The solar expert called me the same day and was extremely kind and helpful. She outlined all the benefits and incentives available for my very house based on the information I left on Wise Energy Power. So everything was fast and easy. I've claimed my spot in the line and got an amazing solar deal with $0 out of pocket Incentive. My energy bill will be completely eliminated. Can't wait for it.</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ts-block">
                                <div class="ts-author">
                                    <img src="{{ asset('solar/images/testimonial-2.png') }}" width="60" height="60" alt="">
                                    <div class="content">
                                    <h3 class="theme-title">Amanda C.</h3>
                                    <div class="rating">
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                    </div>
                                    </div>
                                </div>
                                <p>The phone conversation I had with Solar Expert was one of the best investments in my life. I still can't believe that. I got myself around $50,000 in savings through going solar the right way. Wise Energy Power offers exceptional matching service and it got me the best incentives on the market. Good buy my energy bill, I will never see you again. Hello all cool things I'm able to afford with my new savings.</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="ts-block">
                                <div class="ts-author">
                                    <img src="{{ asset('solar/images/testimonial-3.png') }}" width="60" height="60" alt="">
                                    <div class="content">
                                    <h3 class="theme-title">John P.</h3>
                                    <div class="rating">
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                        <span><img src="{{ asset('solar/images/star-fill-icon.svg') }}" width="17" height="16" alt=""></span>
                                    </div>
                                    </div>
                                </div>
                                <p>Getting yourself an awesome solar deal was never that easy. My friend went solar a while ago and I didn't realize how beneficial it is. Not until I went on Wise Energy Power and found out that I'm missing out on the opportunity to save a fortune. After I got on the phone with a solar expert it all got cleared. This man was a solar PHD or something, sooo smart. He taught me the best way to go solar without paying anything out of pocket. That's thousands and thousands of pure savings. I felt like I'm getting paid for doing it. And I actually was. I paid myself instead of paying the utility company. Still doing it now, feels great!</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  
   
@endsection
@section('style')
    <style>
        .hero-logo img{
            max-width: 63px!important;
        
        }
        .hero-logo {
            margin: 0 0 !important;
        }
    
        @media screen and (max-width: 414px) {
        .mobile-btn {
            font-weight:600!important;
            min-width:318px!important;
            font-size: 16px!important;
            margin-bottom:-10px;
            padding:4px;
         }}

        @media screen and (max-width: 414px) {
         p.mobile-text {
            font-size: 15px!important;
            line-height:1.2!important;
        }}
   
        @media screen and (max-width: 414px){
            .wizard__box .page-title h2 {
            font-size: 17px !important;
            line-height:1.3!important;
            font-weight:400!important;
	    }}

         @media screen and (max-width: 414px){
        .prog-title {
            font-size: 23px !important;
        }}
        @media screen and (max-width: 414px){
            ul li {
            
            line-height:1.2!important;
            font-weight:500!important;
            }}
        @media screen and (max-width: 414px){
            ul {
             margin-top:5px!important;
        }}
        @media screen and (max-width: 414px){
            .box-2 {
                margin-top: -32px;
        }}
        @media screen and (max-width: 414px){
        .logo-heading {
	        font-size: 30px!important;
	    }}
    </style>
    
    
@endsection
