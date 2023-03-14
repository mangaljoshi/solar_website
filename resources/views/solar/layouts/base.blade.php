<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/x-icon" href="./solar/images/logo.png">

        <title>{{ config('base.website_name') }}-Best Solar Panels For Solar & Renewable Energy</title>
        <link rel="icon" type="image/x-icon" href="./solar/images/logo.png">
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        @include('solar.partials.style')

        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
    </head>
    <body>    
        @if(Route::current()->getName() != 'home' && Route::current()->getName() != 'thankyou' && Route::current()->getName() != 'solar.wizard')
            @include('solar.partials.header_common')
        @endif
        
        @yield('content')

        @include('solar.partials.footer')

        @include('solar.partials.script')

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASQy-lj_qEU3g4G3D-J1jW00jagKYq91M&libraries=places&callback=initAutocomplete"
                   async defer></script>
    </body>
</html>
