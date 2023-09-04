@extends('lpv23.layouts.base')

@section('style')
    <link href="{{ asset('_lpv23/css/second-service.css') }}" rel="stylesheet">
@endsection

@section('content')
@include('lpv23.partials.headers.header')
<div style="margin-bottom:20px; height: 100vh">
    <div class="container">
        <div class="row">
            <div class="col-md-12" style="margin-top: 40px;">
                Do Not Sell or Share My Personal Information
                <br><br>
                If you are a California resident, you may submit a request to opt out of the sale of your personal information by emailing us at {{ config('base.contact_email') }}. Please include your name, email address, and mailing address so that we can identify the personal information we have collected about you. You do not need to be a registered user in order to opt out of the sale of your personal information.
            </div>
        </div>
    </div>
</div>
@include('lpv23.partials.footers.footer')
@endsection