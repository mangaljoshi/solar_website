@extends('lpv88.layouts.base')

@section('style')
    <link href="{{ asset('_lpv88/css/c-wizard.css') }}" rel="stylesheet">
@endsection

@section('content')
    @include('lpv88.partials.top_header')
    <div class="main-wrapper">
        @include('lpv88.partials.header_home')
        <section class="hero-banner">
            <div class="d-table w-100">
               <div class="d-table-cell">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="hero-inner text-center">
                                    <h1 class="">
                                        <span class="main-heading"></span>  <span class="city bold"></span>  {{ __('home.section_1.h1') }} 
                                    </h1>
                                    <h4 class="sub-title mb-20 location-text">
                                        {{ __('home.section_1.h4') }}
                                    </h4>
                                    <!-- <h5><strong>{{ __('home.section_1.h5') }}</strong></h5>
                                    <div class="range-slider">
                                        <div class="sliderLegend">
                                            <p class="sliderLegendItem--start" style="margin-bottom:0px">
                                                {{ __('home.section_1.range_min') }}
                                            </p>
                                            <p class="sliderLegendItem--end" style="margin-bottom:0px">
                                                {{ __('home.section_1.range_max') }}
                                            </p>
                                        </div>
                                        <div class="rSlider">
                                            <span class="slide"></span>
                                            <input id="range" class="homeSqFootRange" type="range" min="0" max="3000" >
                                        </div>
                                        <p class="range-slider__value text-center">
                                            <span id="demo">1750 </span> {{ __('home.section_1.sq_ft') }}
                                        </p>
                                    </div> -->
                                    <form method="post" action="{{ route('energybill.zip.post', ['route_name' => 'lpv88']) }}">
                                        {{ csrf_field() }}
                                        <div class="form-list d-flex justify-content-between align-items-center">
                                            <div class="form-group">
                                                <input class="form-control" id="zipCode" type="text" size="5" maxlength="5" onkeypress="return isNumberKey(event)" name="zip_code"  value="{{ Session::has('userData') && isset(Session::get('userData')['zip_code']) ? Session::get('userData')['zip_code'] : '' }}"   placeholder="{{ __('home.section_1.zip_code') }}">
                                            </div>
                                            
                                            <button type="submit" class="btn-main next-url">
                                                {{ __('home.section_1.calculate') }}
                                            </button>
                                        </div>
                                        @if ($errors->any())
                                            <span style="color: white;display: block; text-align: left; font-weight: 700; margin: 0 auto; max-width: 560px;">
                                                Please Enter a Valid Zip Code
                                            </span>
                                        @endif
                                    </form>
                                    <ul class="list-style hide-in-mobile">
                                        <li>{{ __('home.section_1.ul.li_1') }}</li>
                                        <li>{{ __('home.section_1.ul.li_2') }}</li>
                                        <li>{{ __('home.section_1.ul.li_3') }}</li>
                                        <li>{{ __('home.section_1.ul.li_4') }}</li>
                                        <li>{{ __('home.section_1.ul.li_5') }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <section class="government-incentives right-bg page-paddings">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6 col-sm-12 col-12">
                    <div class="government-left position-relative">
                        <div class="government-media">
                        <img src="{{ asset('_lpv88/images/electrician-installing.jpg') }}" alt="">
                        </div>
                        <div class="government-data text-center">
                        <h2><span>$17,727</span>Government <br> Incentives</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-sm-12 col-12">
                    <div class="government-info">
                        <div class="page-title">
                        <h2>Get Your Free solar Cost <span>+Savings Report</span></h2>
                        <p>Includes incentives in your state.</p>
                        </div>
                        <div class="government-profit">
                        <h4>Net Profit Over 10 Years</h4>
                        <ul class="table">
                            <li>
                                <span class="label">Power Generated in 10 Years</span>
                                <span class="value">$52,827</span>
                            </li>
                            <li>
                                <span class="label">Increased Home Value</span>
                                <span class="value">$95,492</span>
                            </li>
                            <li>
                                <span class="label">Loan Interest Paid</span>
                                <span class="value">-$10,049</span>
                            </li>
                            <li>
                                <span class="label">Loan Principal Paid</span>
                                <span class="value">-$22,301</span>
                            </li>
                            <li class="footer">
                                <span class="label">Profit</span>
                                <span class="value">$20,744</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="report-example text-center page-paddings pt-0">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="page-title text-center">
                        <h2>Partial Report Example (You Will Receive a Full solar Report).</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div class="report-list text-center">
                        <div class="icon"><img src="{{ asset('_lpv88/images/save-icon.svg') }}" alt=""></div>
                        <div class="content">
                        <span class="number">$2,074</span>
                        <h6>You Save</h6>
                        <p>An average per year</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div class="report-list text-center">
                        <div class="icon"><img src="{{ asset('_lpv88/images/reduce-co2-emissions.svg') }}" alt=""></div>
                        <div class="content">
                        <span class="number">16.2</span>
                        <h6>Reduces CO2 Emissions</h6>
                        <p>Metric tones per year</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div class="report-list text-center">
                        <div class="icon"><img src="{{ asset('_lpv88/images/planting-icon.svg') }}" alt=""></div>
                        <div class="content">
                        <span class="number">1,173</span>
                        <h6>Equivalent to planting</h6>
                        <p>Trees per year</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                    <div class="report-list text-center">
                        <div class="icon"><img src="{{ asset('_lpv88/images/equivalent-driving-icon.svg') }}" alt=""></div>
                        <div class="content">
                        <span class="number">40,180mi</span>
                        <h6>Equivalent to Driving</h6>
                        <p>Less per year</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="cost-solar page-background">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="s-py-info">
                        <div class="page-title">
                        <h2>The Cost of solar Panels in 2023</h2>
                        <p>With the cost of solar panels dropping every year, there’s never been a better time to go solar. Due to new government incentives, many homeowners are taking advantage of these opportunities. A solar panel installation ranges in cost depending on many factors, including your state, equipment brand, and energy usage. That all brings us to a key question: how much do solar panels cost? Use our FREE solar Calculator to calculate the cost of solar in your area.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12 col-12">
                    <div class="form-block text-center">
                        <div class="py-btn mb-3">
                        <a style="text-decoration:none" href="#zipCode">  <button  class="btn-main">Get Free solar Report </button></a>
                        </div>
                        <p  class="text-white">Get Your Free solar Cost +Savings Report</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
      
    <section class="solar-work left-bg page-paddings">
        <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="page-title text-center">
                    <h2>How solar Panels Work?</h2>
                    <p>solar power works by converting light from the sun into electricity. This electricity can then be used in your home or exported to the grid when it’s not needed. This is done by installing solar panels on your roof which generate DC (Direct Current) electricity. This is then fed into a solar inverter which converts the DC electricity from your solar panels into AC (Alternating Current) electricity.</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="how-it-works clearfix">
                    <div class="work-process position-relative">
                    <img src="{{ asset('_lpv88/images/solar-panels.png') }}" alt="">
                    <h3 class="theme-title mt-3">solar Panels</h3>
                    <span class="work-budge">01</span>
                    </div>
                    <div class="work-process position-relative">
                    <img src="{{ asset('_lpv88/images/inverter.png') }}" alt="">
                    <h3 class="theme-title mt-3">Inverter</h3>
                    <span class="work-budge">02</span>
                    </div>
                    <div class="work-process position-relative">
                    <img src="{{ asset('_lpv88/images/switch-board.png') }}" alt="">
                    <h3 class="theme-title mt-3">Switch Board</h3>
                    <span class="work-budge">03</span>
                    </div>
                    <div class="work-process position-relative">
                    <img src="{{ asset('_lpv88/images/utility-meter.png') }}" alt="">
                    <h3 class="theme-title mt-3">Utility Meter</h3>
                    <span class="work-budge">04</span>
                    </div>
                    <div class="work-process position-relative">
                    <img src="{{ asset('_lpv88/images/grid.png') }}" alt="">
                    <h3 class="theme-title mt-3">Grid</h3>
                    <span class="work-budge">05</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="solar-info">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="content">
                    <ol class="numbr-list">
                        <li><span>01</span> Your solar panels are made up of silicon photovoltaic (PV) cells. When sunlight hits your solar panels, the solar PV cells absorb the sunlight’s rays and electricity is produced via the Photovoltaic Effect. The electricity produced by your panels is called Direct Current (DC) electricity, and which is not suitable to be used in your home by your appliances. Instead, the DC electricity is directed to your central inverter (or micro inverter, depending on your system setup).</li>
                        <li><span>02</span> Your inverter is able to convert the DC electricity into Alternating Current (AC) electricity, which can be used in your home. From here, the AC electricity is directed to your switchboard.</li>
                        <li><span>03</span> A switchboard allows your usable AC electricity to be sent to the appliances in your home. Your switchboard will always ensure that your solar energy will be used first to power your home, only accessing additional energy from the grid when your solar production is not enough.</li>
                        <li><span>04</span> All households with solar are required to have a bi-directional meter (utility meter), which your electricity retailer will install for you. A bi-directional meter is able to record all the power that is drawn to the house but also record the amount of solar energy that is exported back to the grid. This is called net-metering.</li>
                        <li><span>05</span> Any unused solar electricity is then sent back to the grid. Exporting solar power back to the grid will earn you a credit on your electricity bill, called a feed-in tariff (FiT). Your electricity bills will then take into account the electricity you purchase from the grid, plus credits for the electricity generated by your solar power system that you don’t use.</li>
                    </ol>
                    <p>With solar power, you don’t need to switch it on in the morning or switch it off at night – the system will do this seamlessly and automatically. You also don’t need to switch between solar power and the grid, as your solar system can determine when is best to do so based on the amount of energy being consumed in your home. In fact, a solar system requires very little maintenance (as there are no moving parts) which means you’ll hardly know it’s there. This also means a good quality solar power system will last a long time.</p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="government-left md-none position-relative">
                    <div class="government-media">
                        <img src="{{ asset('_lpv88/images/electrician-installing.jpg') }}" alt="">
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>

    <section class="going-solar page-paddings">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="going-solar-media">
                        <img src="{{ asset('_lpv88/images/solar-plant.png') }}" alt="">
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="going-solar-info">
                        <div class="page-title">
                        <h2>The Benefits of Going solar</h2>
                        </div>
                        <p>The premier advantage of the solar power system lies in its versatile adaptability, giving you instant access to renewable solar power. You no longer need an expensive, clunky system to enjoy the benefits of this green energy. It is now effortlessly accessible through multiple paneling technologies, and a host of independent, solar-powered products like solar lighting equipment, chargers and power banks, solar windows and blinds, portable solar power systems for camping and boating, etc.</p>
                        <p>Annual growth of 49%, thanks to solar-friendly government policies, rising demand, and falling prices of solar power systems. In fact, prices have fallen by 40% in the majority of American states!</p>
                        <p>Today, almost any American can tap into the vast benefits of a solar power system, in any place, in various ways!</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="solar-cost page-background">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="page-title text-center">
                        <h2>See solar Cost & Savings for <br><span ><b class="city">Gujarat</b></span></h2>
                        <p>Select your approximate home square footage.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="solar-cost-box">
                        <div class="solar-cost-data">
                        <ul class="d-flex justify-content-center">
                            <li><button class="btn-main">1000 sq.ft</button></li>
                            <li><button class="btn-main">1500 sq.ft</button></li>
                            <li><button class="btn-main">2000 sq.ft</button></li>
                            <li><button class="btn-main">2500 sq.ft</button></li>
                            <li><button class="btn-main">3000+ sq.ft</button></li>
                        </ul>
                        </div>
                        <div class="solar-fl-btn text-center mt-4">
                        <a href="#" class="btn-main m-auto">Continue</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="s-py-half disclosure-section">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="theme-title mb-2">Marketing Disclosure:</h3>
                    <p class="mb-4">This website is a market place. As such you should know that the owner has a monetary connection to the product and services advertised on the site. The owner receives payment whenever a qualified lead is referred but that is the extent of it.</p>
                    <h3 class="theme-title mb-2">Advertising Disclosure:</h3>
                    <p class="mb-4">This website and the products &amp; services referred to on the site are advertising marketplaces. This website is an advertisement and not a news publication. Any photographs of persons used on this site are models. The owner of this site and of the products and services referred to on this site only provides a service where consumers can obtain options.</p>
                    <h3 class="theme-title mb-2">Website Disclaimer:</h3>
                    <p class="mb-0">All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. Use of individuals names or likenesses are not an endorsement and are for information or public interest purposes only. Wise Energy Power is a technology, marketing, and intake service provider, not a law firm, and does not provide legal advice. Website Disclaimer: All product and company names are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them. Use of individuals names or likenesses are not an endorsement and are for information or public interest purposes only.</p>
                </div>
            </div>
        </div>
    </section>
@endsection