@extends('lpv23.layouts.base')

@section('style')
    <link href="{{ asset('_lpv23/css/second-service.css') }}" rel="stylesheet">
    {{-- <link href="{{ asset('_lpv23/css/common.css') }}" rel="stylesheet"> --}}
@endsection

@section('content')
<div class="container">
    <div class="row test-center">
        <div class="col-md-12" style="margin-top: 40px;">
        <div class="test-center">
            <h3 style="color: #0c0c98;">Thank you, we are on it.</h3>
            </div>
        </div>
        <div class="col-md-12 thank-you-banner" style="text-align:center">
          <a href="https://qualitywindowsdirect.com/rbaw40a-200.aspx?eccmp=7025&eckwd=natroof&ecadid=&Offerid=">
            <img src="{{asset('_lpv23/images/thank-you-banner1.jpg')}}" alt="thank-you-banner">

         </a>
        </div>
    </div>

</div>
@include('lpv23.partials.footers.footer')
@endsection

