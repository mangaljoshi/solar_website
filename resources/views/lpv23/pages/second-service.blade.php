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
                        <span class="orangeColor"> A solar specialist will be contacting you</span>
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
                                action="{{ route('energybill.second.service', ['route_name' => 'lpv23']) }}"
                                accept-charset="UTF-8" method="post">
                                @csrf()
                                
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
                                            <select class="form-control" name="services[gutter][project_type]"
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
                                    <h5 id="seconde_service_validation" class="text-danger text-left"
                                        style="display: none;"></h5>
                                    <div class="row justify-content-cente">
                                        <div class="col-xs-12 col-md-6 col-md-offset-3 btn-prent"
                                            style=" text-align: center; ">
                                            <button type="submit"
                                                data-disable-with="Please Wait <i class='linearicon linearicon-ellipsis'></i>"
                                                class="btn btn-warning btn-block btn-lg" onclick="upsellSubmitA()">Get Free Quotes</button>
                                             <a href="{{route('energybill.thank.you.service', ['route_name' => 'lpv23'])}}"
                                                {{-- <p --}}
                                                className="mt-30 pop-up" style="font-size: 18px; cursor: pointer;">
                                                No Thanks
                                                
                                             </a>

                                               
                                        </div>
                                    </div>
                                </div>
                            </form>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</section>


@endsection