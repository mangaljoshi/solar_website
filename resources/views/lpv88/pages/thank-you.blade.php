@extends('lpv88.layouts.base')

@section('content')
@include('lpv88.partials.header_common')

<div class="container" style="height: 100vh">
    <div class="row test-center">
        <div class="col-md-12 thank-you-banner2" style="text-align:center">
            <img src="{{asset('_lpv88/images/thank-you-banner.png')}}" alt="thank-you-banner">
        </div>    
    </div>
</div>
{{-- <div class="container"> --}}
    {{-- <div class="row test-center thank-text-center">
        <div class="col-md-12" style="margin-top: 20px;">
            
            <div class="test-center  thank-text-center">
            <h3>Thank you, we are on it!</h3>
            <h3 class="bold-11" style="color:#2d830b; font-weight:bold;"> Special Promotion for <span class="city"></span> Window Replacement! </h3>
            </div>
            
        </div>
        <div class="col-md-12 thank-you-banner" style="text-align:center">
             <a href="https://qualitywindowsdirect.com/rbaw40a-200.aspx?eccmp=7025&eckwd=&ecadid=native&Offerid=">
            <img src="{{asset('_lpv88/images/thank-you-banner.jpg')}}" alt="thank-you-banner">
        
        </a>
        </div> 

       
    </div> --}}
{{-- </div> --}}
@endsection 