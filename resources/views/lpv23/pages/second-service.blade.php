@extends('lpv23.layouts.base')

@section('style')
<link href="{{ asset('_lpv23/css/second-service.css') }}" rel="stylesheet">

@endsection

@section('script')
<script src="{{ asset('_lpv23/js/second-service.js') }}" type="text/javascript"></script>
@endsection

@section('content')
<div id="loading" style="display: none;">
    <img id="loading-image" src="{{ asset('_lpv23/images/loader.gif') }}" alt="Loading..." />
</div>

<section class="second-service form-page pt-xs-30 pt-md-50 pb-xs-30 pb-md-50" style="background: #ecf1f5;">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-10 col-sm-offset-1 text-center">
                <div class="thankYouPromoSection">
                    <div class="thankYouPage__title thankYouPage__title_center">
                        <span class="greenColor">Thanks For Requesting</span> An Estimate!<br />
                        <span class="orangeColor"> A roofing specialist will be contacting you</span>
                    </div>
                </div>
            </div>

            <div class="thank-text-center">
                <div class="" style="margin-top: 20px;">   
                </div>
                <div class="thank-you-banner-2" style="text-align:center; margin-top: 30px;margin: 18px 81px;">
                     <a href="https://qualitywindowsdirect.com/rbaw40a-200.aspx?eccmp=7025&eckwd=natroof&ecadid=&Offerid=" target="_balnk">
                    <img src="{{asset('_lpv23/images/banner1.jpg')}}" style="border-radius: 20px; width:100%" alt="thank-you-banner">
                
                </a>
                </div> 
        
               
        </div>

            <div class="col-xs-12 col-sm-10 col-sm-offset-1 text-center large-box">
                <div class="form-wrapper second-service-wrapper pt-xs-20 pb-xs-20 pl-xs-15 pr-xs-15 pl-sm-30 pr-sm-30 pl-lg-40 pr-lg-40"
                    style="text-align: initial;">
                    <h3 class="mt-xs-0" style="color: #3c763d; font-weight:600;">Increase your property value with these
                        home upgrades. Get your free quote from top local installers.</h3>
                    <div class="second-service mt-xs-30">
                        <p>Select needed project(s):</p>
                            <form novalidate="novalidate"
                                action="{{ route('roof.upsell.data', ['route_name' => 'lpv23']) }}"
                                accept-charset="UTF-8" method="post">
                                @csrf()
                                <div class="service">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                        <title>home_pros_center_icons</title>
                                        <circle class="circle-orange" cx="160" cy="160" r="35"></circle>
                                        <circle class="circle-blue" cx="115" cy="115" r="65"></circle>
                                        <path class="fill-dark"
                                            d="M100,143.88A2.15,2.15,0,0,0,97.87,146v15.8a2.14,2.14,0,0,0,4.29,0V146A2.14,2.14,0,0,0,100,143.88Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M100,36a2.15,2.15,0,0,0-2.14,2.14V54a2.14,2.14,0,1,0,4.29,0V38.18A2.14,2.14,0,0,0,100,36Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M124.87,138.8a2.14,2.14,0,0,0-3.71,2.14l7.9,13.68a2.14,2.14,0,0,0,3.71-2.14Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M70.94,45.39A2.14,2.14,0,0,0,68,44.6a2.14,2.14,0,0,0-.78,2.93l7.93,13.74a2.14,2.14,0,1,0,3.71-2.14Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M154.61,129.06l-13.67-7.9a2.14,2.14,0,0,0-2.15,3.71l13.68,7.9a2.13,2.13,0,0,0,1.07.29,2.14,2.14,0,0,0,1.07-4Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M61.27,75.16,47.53,67.23a2.14,2.14,0,1,0-2.14,3.71l13.74,7.93a2.14,2.14,0,0,0,2.14-3.71Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M161.82,97.87H146a2.14,2.14,0,0,0,0,4.29h15.8a2.14,2.14,0,1,0,0-4.29Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M56.15,100A2.15,2.15,0,0,0,54,97.87H38.18a2.14,2.14,0,0,0,0,4.29H54A2.15,2.15,0,0,0,56.15,100Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M139.84,79.12a2.16,2.16,0,0,0,1.07-.28l13.71-7.9a2.14,2.14,0,0,0-2.14-3.71l-13.71,7.9a2.14,2.14,0,0,0-.79,2.93A2.15,2.15,0,0,0,139.84,79.12Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M60.16,120.85h0a2.14,2.14,0,0,0-1.07.29l-13.71,7.93a2.14,2.14,0,1,0,2.15,3.71l13.71-7.93a2.14,2.14,0,0,0-1.07-4Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M132,44.6a2.14,2.14,0,0,0-1.07-.29h0a2.15,2.15,0,0,0-1.86,1.07l-7.93,13.71a2.14,2.14,0,1,0,3.71,2.15l7.93-13.71A2.15,2.15,0,0,0,132,44.6Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M78,138a2.14,2.14,0,0,0-2.93.79l-7.9,13.71a2.14,2.14,0,0,0,3.71,2.14l7.9-13.71A2.15,2.15,0,0,0,78,138Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M113.4,97.12a2.61,2.61,0,0,0-2-1.27L104,95.42l1.42-17a2.5,2.5,0,0,0-.61-1.77,2.34,2.34,0,0,0-1.72-.75,2.5,2.5,0,0,0-2,1.14l-14.41,24.3a2.37,2.37,0,0,0-.06,2.34,2.62,2.62,0,0,0,2,1.27l7.42.43-1.41,16.19a2.33,2.33,0,0,0,4.3,1.42l14.42-23.51A2.37,2.37,0,0,0,113.4,97.12Z">
                                        </path>
                                        <path class="fill-dark"
                                            d="M100,59a41,41,0,1,0,41,41A41,41,0,0,0,100,59Zm0,77.72A36.72,36.72,0,1,1,136.72,100,36.72,36.72,0,0,1,100,136.72Z">
                                        </path>
                                        <path class="fill-orange"
                                            d="M100.55,98.36a1.52,1.52,0,0,1-.37-1.11l1.12-13.44L90.89,101.37l7.55.44a1.51,1.51,0,0,1,1.41,1.64l-1.11,12.78,10.37-16.91-7.5-.44A1.52,1.52,0,0,1,100.55,98.36Z">
                                        </path>
                                    </svg>

                                    <label class="custom-checkbox">
                                        Solar For Your Home
                                        <input type="checkbox" name="services[solar]" id="services_solar_"
                                            value="solar" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <div class="second-service-questions">
                                        <div class="form-group mb-xs-15">
                                            <label>How Much Sun Exposure Does Your Property Get?</label>
                                            <select class="form-control" name="services[solar][roof_shade]">
                                                <option value="Not shaded">Not shaded</option>
                                                <option value="Completely shaded">Completely shaded</option>
                                                <option value="Slightly shaded">Slightly shaded</option>
                                            </select>
                                        </div>
                                        <div class="form-group mb-xs-15">
                                            <label>What Is Your Average Monthly Electricity Bill?</label>
                                            <select class="form-control" name="services[solar][monthly_bill]"
                                                disabled="true">
                                                <option value="Less than $100">Less than $100</option>
                                                <option value="From $100 to $200">$100 to $200</option>
                                                <option value="From $200 to $300">$200 to $300</option>
                                                <option value="More than $300">More than $300</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="service">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                                        <title>home_pros_center_icons</title>
                                        <circle class="circle-orange" cx="160" cy="160" r="35"></circle>
                                        <circle class="circle-blue" cx="115" cy="115" r="65"></circle>
                                        <path class="fill-dark"
                                            d="M173.38,136.24,151,61a2,2,0,0,0-1.92-1.41H94.24V45.46a2,2,0,0,0-2-2H76.64a2,2,0,0,0-2,2V59.6H58.55A2,2,0,0,0,56.63,61L34.22,136.24a2,2,0,0,0,1.92,2.58h90.52a2,2,0,0,0,1.92-1.43l20.48-68.72,19.71,66.14H146.45a2,2,0,1,0,0,4h25a2,2,0,0,0,1.92-2.58ZM78.64,47.46H90.23V81.93H78.64ZM38.83,134.8,60,63.61H74.63V83.94a2,2,0,0,0,2,2h15.6a2,2,0,0,0,2-2V63.61h20.94L94,134.8ZM143.09,74.64H126.33a2,2,0,0,0,0,4H141.9l-3.29,11H121.84a2,2,0,0,0,0,4h15.57l-3.29,11H117.36a2,2,0,1,0,0,4h15.58l-3.29,11H112.87a2,2,0,0,0,0,4h15.58l-3.29,11h-27l21.21-71.19h27Z">
                                        </path>
                                        <rect class="fill-orange" x="78.64" y="47.46" width="11.59" height="34.47">
                                        </rect>
                                    </svg>

                                    <label class="custom-checkbox">
                                        Gutter Guard Protection
                                        <input type="checkbox" name="services[gutter]" id="services_roofing_"
                                            value="Gutter" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <div class="second-service-questions">
                                        <div class="form-group mb-xs-15">
                                            <label>What is the nature of your project?</label>
                                            <select class="form-control" name="services[gutter][service_type]"
                                                disabled="true">
                                                <option value="Install" selected="">Install</option>
                                                <option value="Replace">Replace</option>
                                                <option value="Repair">Repair</option>
                                            </select>
                                        </div>
                                        <div class="form-group mb-xs-15">
                                            <label>What type of Gutter material you have? </label>
                                            <select class="form-control" name="services[gutter][material]"
                                                disabled="true">
                                                <option value="Copper" selected="">Copper</option>
                                                <option value="Galvanized ">Galvanized steel</option>
                                                <option value="PVC">PVC</option>
                                                <option value="Seamless Metal">Seamless Metal</option>
                                                <option value="wood">Wood</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                {{-- <div class="service">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="window-icon" viewBox="0 0 200 200">
                                        <title>home_pros_center_icons</title>
                                        <circle class="circle-orange" cx="160" cy="160" r="35"></circle>
                                        <circle class="circle-blue" cx="115" cy="115" r="65"></circle>
                                        <g id="window">
                                            <path class="fill-dark"
                                                d="M155.22,157H44.78A1.78,1.78,0,0,1,43,155.22V44.78A1.78,1.78,0,0,1,44.78,43H155.22A1.78,1.78,0,0,1,157,44.78V155.22A1.78,1.78,0,0,1,155.22,157ZM46.56,153.44H153.44V46.56H46.56Z">
                                            </path>
                                            <path class="fill-dark"
                                                d="M94.66,146.31H55.47a1.78,1.78,0,0,1-1.78-1.78V55.47a1.78,1.78,0,0,1,1.78-1.78H94.66a1.78,1.78,0,0,1,1.78,1.78v89.06A1.78,1.78,0,0,1,94.66,146.31Zm-37.41-3.56H92.88V57.25H57.25Z">
                                            </path>
                                            <path class="fill-dark"
                                                d="M144.53,146.31H105.34a1.78,1.78,0,0,1-1.78-1.78V114.25h3.56v28.5h35.63V57.25H107.13V87.53h-3.56V55.47a1.78,1.78,0,0,1,1.78-1.78h39.19a1.78,1.78,0,0,1,1.78,1.78v89.06A1.78,1.78,0,0,1,144.53,146.31Z">
                                            </path>
                                            <path class="fill-orange"
                                                d="M66.16,75.06a1.78,1.78,0,0,1-1.26-3L72,64.9a1.78,1.78,0,0,1,2.52,2.52l-7.12,7.13A1.78,1.78,0,0,1,66.16,75.06Z">
                                            </path>
                                            <path class="fill-orange"
                                                d="M66.16,89.31a1.78,1.78,0,0,1-1.26-3L82.71,68.46A1.78,1.78,0,0,1,85.23,71L67.42,88.79A1.78,1.78,0,0,1,66.16,89.31Z">
                                            </path>
                                            <path class="fill-dark"
                                                d="M101.78,110.69h0a1.78,1.78,0,0,1-1.78-1.78v-1.78a1.78,1.78,0,0,1,1-1.59l3.56-1.78a1.78,1.78,0,0,1,.8-.19h15.14a2.67,2.67,0,0,0,0-5.34H105.34a1.78,1.78,0,0,1-.8-.19L101,96.25a1.78,1.78,0,0,1-1-1.59V92.88a1.78,1.78,0,0,1,1.78-1.78h0a1.78,1.78,0,0,1,1.78,1.78v.68l2.2,1.1h14.72a6.23,6.23,0,0,1,0,12.47H105.76l-2.2,1.1v.68A1.78,1.78,0,0,1,101.78,110.69Z">
                                            </path>
                                        </g>
                                    </svg>

                                    <label class="custom-checkbox">
                                        Window Replacement
                                        <input type="checkbox" name="services[windows]" id="services_roofing_"
                                            value="windows" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <div class="second-service-questions">
                                        <div class="form-group mb-xs-15">
                                            <label> What is your windows service type?</label>
                                            <select class="form-control" name="services[windows][windows_service]"
                                                disabled="true">
                                                <option value="Install" selected="">Install</option>
                                                <option value="Replace">Replace</option>
                                                <option value="Repair">Repair</option>
                                            </select>
                                        </div>
                                        <div class="form-group mb-xs-15">
                                            <label> What type of windows are you looking for? </label>
                                            <select class="form-control" name="services[windows][window_material]"
                                                disabled="true">
                                                <option value="Aluminum" selected="">Aluminum</option>
                                                <option value="Vinyl & Acrylic ">Vinyl & Acrylic </option>
                                                <option value="Wood">Wood</option>
                                                <option value=" Metal"> Metal</option>
                                            </select>
                                        </div>
                                        <div class="form-group mb-xs-15">
                                            <label>How many windows are involved in the project?</label>
                                            <select class="form-control" name="services[windows][number_windows]"
                                                disabled="true">
                                                <option value="1">1</option>
                                                <option value="2">2 </option>
                                                <option value="3">3</option>
                                                <option value="4">4 </option>
                                            </select>
                                        </div>
                                    </div>

                                </div> --}}
                                <div class="mt-xs-30">
                                    <h5 id="seconde_service_validation" class="text-danger text-left"
                                        style="display: none;"></h5>
                                    <div class="row justify-content-cente">
                                        <div class="col-xs-12 col-md-6 col-md-offset-3 btn-prent"
                                            style=" text-align: center; ">
                                            <button type="submit"
                                                data-disable-with="Please Wait <i class='linearicon linearicon-ellipsis'></i>"
                                                class="btn btn-warning btn-block btn-lg" onclick="upsellSubmitA()">Get Free Quotes</button>
                                            <a href="{{ route('roof.thankyouService', ['route_name' => 'lpv23']) }}"
                                                className="mt-30" style="font-size: 18px">
                                                No Thanks
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                    </div>
                    {{-- <p class="para-15">
                        By clicking the "Get Quotes" button, you authorize up to <a href="/market-partners"
                            target='_blank' style="text-decoration: underLine;"> 4 our
                            partners </a> to call
                        you and send you pre-recorded messages and text messages at
                        the number you entered above, using an autodialer, with offers
                        about their products or services, even if your phone number is
                        on any national or state "Do Not Call" list. Message and data
                        rates may apply. Your consent here is not based on a condition
                        of purchase. You agree to the <a href="/terms" target="_blank"
                            style="text-decoration: underLine;">Terms of Use</a> and <a href="/privacy" target="_blank"
                            style="text-decoration: underLine;">Privacy Policy.</a>
                    </p> --}}
                </div>
            </div>
        </div>
    </div>
</section>


@endsection