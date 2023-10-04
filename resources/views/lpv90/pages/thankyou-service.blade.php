@extends('lpv90.layouts.base')

@section('content')
{{-- @include('lpv90.partials.header_common') --}}


<div class="container">
    <div class="row test-center thank-text-center">
        <div class="col-md-12" style="margin-top: 20px;">
            
            <div class="test-center  thank-text-center">
            <h3>Thank you, we are on it!</h3>
            </div>
            
        </div>
        <div class="col-md-12 thank-you-banner" style="text-align:center">
             <a href="https://qualitywindowsdirect.com/rbaw40a-200.aspx?eccmp=7025&eckwd=&ecadid=solarcs&Offerid=">
            <img src="{{asset('_lpv90/images/thank-you-banner1.jpg')}}" alt="thank-you-banner">
        
        </a>
        </div> 

        <a class="no-thanks-btn" style=" font-size: 18px !important;
        text-align: center !important;
        margin-top: -17px !important;
        margin-bottom: 17px !important;
        color:rgb(0, 0, 161) !important;
        font-weight: 900 !important;" href="{{ route('energybill.thankyouConfirmation', ['route_name' => 'lpv90']) }}"> No Thanks</a>
    </div>
</div>
@endsection 