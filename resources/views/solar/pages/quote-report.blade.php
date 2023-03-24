@extends('solar.layouts.base')

@section('content')
    <div class="main-wrapper wizard-box">
        <div class="d-table w-100">
            <div class="d-table-cell">
                <div class="d-none d-sm-block d-md-block">
                  @include('solar.partials.header_home')
                </div>
                <section class="hero-banner quate-report wizard-bg page-paddings pt-1 pb-4">
                    <div class="container">
                        <div class="row justify-content-center">
                        <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div class="wizard__box">
                                <div class="page-title text-center mb-2">
                                    <!-- <h2 class='sorry-qualify'>Sorry, you didn't qualify for our offer</h2>
                                    <p class="text qualify-text">Why didn't I qualify?</p>
                                    <p class="hidden-text">You are in a zip code where we currently don't have an installation team.</p> -->
                                    <h2>You’ve been Pre-Qualified for $0 Out of Pocket Solar with Estimated Savings of <span style="color:#FB7306">$64,147*</span> </h2>
                                    <p class="mobile-text">*based on a special offer from a solar provider. Expect a phone call from a solar expert to claim the offer and your spot in the line.</p>
                                </div>
                                <div class="wizard__main">
                                    <div class="row justify-content-center">
                                    <div class="col-sm-12">
                                        <!-- <div class="yell-wrapper">
                                            <div class="yell solar-saver">
                                                <div class="text-center">
                                                <div class="cta-title text-center mb-2 text-dark">
                                                    <h2 class="prog-title">
                                                        You matched with top local installers on SolarSaverProgram.com
                                                    </h2>
                                                </div>
                                                <div class="row justify-content-around">
                                                    <div class="col-xs-12 col-sm-12 col-md-8  text-center text-dark">
                                                        <img src="{{ asset('_solar/images/solar-saver-program-logo.png') }}" alt="Solar Saver Program-logo" class="object-contain">
                                                    </div>
                                                </div>
                                                <div class="row justify-content-around">
                                                    <div class="col-xs-12 col-md-5 text-center text-dark">
                                                        <ul class="my-3 list-disc text-start">
                                                            <li>See All Of Your Rebates & Incentives</li>
                                                            <li>Save Big On Utility Bills</li>
                                                            <li>Competitive Prices</li>      
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="row justify-content-around">
                                                    <div class="col-12 text-dark">
                                                        <a class="btn btn-danger btn-lg btn-block prog-btn" style="background-color:#6ceb8e; border:none" target="_blank" rel="noreferrer" href="https://www.tymd83trk.com/623T3S/7D4XXB/">
                                                            Click Here 
                                                        </a>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>   
                                        </div> -->
                                        <div class="" >
                                        <div class="card-deck mb-3 text-center">
                                            <div class="card mb-4 box-shadow" style='border: 3px solid  #22c55d; border-radius:10px'>
                                            <div class="card-header " style="width:81%;background-color:#22c55d;border-radius:4px;height:38px;text-align:left;padding-top:1px;padding-bottom:30px;margin-bottom:16px">
                                                <h4 class=" font-weight-normal" style="color:white;font-weight:700;"><i class="fa fa-check fa-xs" style="color: #22c55d; background-color:white;border-radius:50%;width:25px;height:25px!important;padding:5px;margin-right:7px;"></i>Recommended For You</h4>
                                            </div>
                                            <div class="card-body">
                                            <div class="text-center">
                                                    <div class="row justify-content-around">
                                                        <div class="col-xs-12 col-sm-12 col-md-8  text-center text-dark">
                                                            <!-- <img src="{{ asset('_solar/images/solar-saver-program-logo.png') }}" alt="Solar Saver Program-logo" class="object-contain"> -->
                                                            <span class="text-dark" style="font-size: 45px;font-weight: 600;">BestPolicyRate</span>
                                                        </div>
                                                    </div>
                                                    <div class="cta-title text-center mb-2 text-dark">
                                                        <h2 class="prog-title" style="font-size:23px!important;margin-top:25px">
                                                        Drop Your Auto Insurance Rates Now!
                                                        </h2>
                                                    </div>
                                                    <div class="row justify-content-around">
                                                        <div class="col-xs-12 col-md-5 text-center text-dark">
                                                            <ul class=" text-start">
                                                                <li style="font-weight:600;" > <i class="fa fa-check " style="color: #22c55d;padding-right:5px"></i>Compare Cheap Car Insurance</li>
                                                                <li  style="font-weight:600;"> <i class="fa fa-check " style="color: #22c55d;padding-right:5px"></i>Find Coverage Options That You Need</li>
                                                                <li  style="font-weight:600;"> <i class="fa fa-check " style="color: #22c55d;padding-right:5px"></i>Click To Save On Your Insurance</li>      
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div class="row justify-content-around">
                                                        <div class="col-12 text-dark">
                                                            <a class="btn btn-danger btn-lg btn-block prog-btn mobile-btn" style="background-color:#22c55d;border:none; width:70%;margin:20px auto"  target="_blank" rel="noreferrer" href="https://synergyplayer.com/a4e7244f957c5d8219defbc368c457367/?sid1=&sid2=sr2&sid3=&sid4=">
                                                                Click Here 
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
        font-size:18px;
        padding:4px;
        margin-top:13px;
        margin-bottom:-3px!important;
    }}
    @media screen and (max-width: 414px) {
    p.mobile-text {
        font-size: 13px!important;
        line-height:1.5!important;
    }}
   
    @media screen and (max-width: 414px){
        .wizard__box .page-title h2 {
	    font-size: 16px !important;
        line-height:1.4!important;
	}}
    @media screen and (max-width: 414px){
        ul li {
	    
        line-height:1.2!important;
        font-weight:500!important;
	}}
    @media screen and (max-width: 414px){
        ul  {
	    margin-top:-3px!important;
	}}
    @media screen and (max-width: 414px){
        .box-2{
	    margin-top:-30px!important;
	}}
    </style>
    
    
@endsection
