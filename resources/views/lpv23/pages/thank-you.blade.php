@extends('lpv23.layouts.base')

@section('style')
    <link href="{{ asset('_lpv23/css/second-service.css') }}" rel="stylesheet">
@endsection

@section('content')

<div class="container" style="height: 100vh">
    <div class="row test-center">
        {{-- <div class="col-md-12" style="margin-top: 20px;"> --}}
            
            {{-- <div class="test-center">
              <h3>Thank you, we are on it!</h3>
              <h3 class="bold-11" style="text-align: center"> A Roofing Specialist Will Be Contacting You </h3>
            </div> --}}
            
        {{-- </div> --}}
        <div class="col-md-12 thank-you-banner2" style="text-align:center">
             {{-- <a href="https://qualitywindowsdirect.com/rbaw40a-200.aspx?eccmp=7025&eckwd=&ecadid=native&Offerid="> --}}
            <img src="{{asset('_lpv23/images/thank-you-banner.png')}}" alt="thank-you-banner">
        
        {{-- </a> --}}
        </div> 

       
    </div>
</div>
@include('lpv23.partials.footers.footer')
@endsection


@section('script')
<!-- <script src="https://api.transparent.ly/search/blue/green/Loader"></script> 
<script language="javascript">
    var data = {
        "state" : "CA",
        "pubcampaignid" : "9100",
        "vertical" : "4"
    }; 
    Transparently.Render(data);
</script> -->
@endsection