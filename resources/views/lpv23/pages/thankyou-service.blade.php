@extends('lpv55.layouts.base')

@section('style')
    <link href="{{ asset('_lpv55/css/second-service.css') }}" rel="stylesheet">
@endsection

@section('content')
{{-- <div class="container" style="height: 100vh">
    <div class="row test-center">
        <div class="col-md-12 thank-you-banner2" style="text-align:center">
            <img src="{{asset('_lpv55/images/thank-you-banner.png')}}" alt="thank-you-banner">
        </div>    
    </div>
</div> --}}



<div class="container">
    <div class="row test-center">
        <div class="col-md-12" style="margin-top: 40px;">
        <div class="test-center">
            <h3 style="color: #0c0c98;">Thank you, we are on it.</h3>
            {{-- <h3 class="bold-11"> Special Promotion for <span class="city"></span> Window Replacement! </h3> --}}
            </div>
        </div>
        <div class="col-md-12 thank-you-banner" style="text-align:center">
            <!-- <h4 class="bold-11" style="margin-bottom: 10px;">Click 2-3 companies below to compare &amp; see how much money you could save.</h4> -->
            <!-- <h4  class="bold-11" class="mb-4" style="color:rgb(3, 3, 145)">Home Insurance Providers in <span class="city"> </span>  </h4> -->
          <!-- <div id="transparently-ads"></div>  -->
          <a href="https://qualitywindowsdirect.com/rbaw40a-200.aspx?eccmp=7025&eckwd=natroof&ecadid=&Offerid=">
            <img src="{{asset('_lpv55/images/thank-you-banner1.jpg')}}" alt="thank-you-banner">

         </a>
        </div>
    </div>

</div>
@include('lpv55.partials.footers.footer')
@endsection


@section('script')
<!-- <script src="https://api.transparent.ly/search/blue/green/Loader"></script>  -->
<!-- <script language="javascript">
    var data = {
        "state" : "CA",
        "pubcampaignid" : "9100",
        "vertical" : "4"
    }; 
    Transparently.Render(data);
</script> -->

@endsection