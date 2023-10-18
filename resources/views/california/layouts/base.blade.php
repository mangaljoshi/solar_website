<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ config('base.website_name') }}-Best Solar Panels For Solar & Renewable Energy</title>
        <link rel="icon" type="image/x-icon" href="./california/images/logo.png">
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <meta http-equiv="delegate-ch" content="sec-ch-ua https://puster-blereby.com; sec-ch-ua-mobile https://puster-blereby.com; sec-ch-ua-arch https://puster-blereby.com; sec-ch-ua-model https://puster-blereby.com; sec-ch-ua-platform https://puster-blereby.com; sec-ch-ua-platform-version https://puster-blereby.com; sec-ch-ua-bitness https://puster-blereby.com; sec-ch-ua-full-version-list https://puster-blereby.com; sec-ch-ua-full-version https://puster-blereby.com">

        @include('california.partials.style')

        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>
           <!--  ClickCease.com tracking-->
      <script type='text/javascript'>var script = document.createElement('script');
      script.async = true; script.type = 'text/javascript';
      var target = 'https://www.clickcease.com/monitor/stat.js';
      script.src = target;var elem = document.head;elem.appendChild(script);
      </script>
      <noscript>
      <a href='https://www.clickcease.com' rel='nofollow'><img src='https://monitor.clickcease.com' alt='ClickCease'/></a>
      </noscript>
      <!--  ClickCease.com tracking-->
      
      <!--  ClickCease.com Conversion tracking-->
        <script type="text/javascript">
        ccConVal = 0;
        var script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        var target = 'https://www.clickcease.com/monitor/cccontrack.js';
        script.src = target; var elem = document.head; elem.appendChild(script);
        </script>
        <noscript>
        <a href="https://www.clickcease.com" rel="nofollow"><img src="https://monitor.clickcease.com/conversions/conversions.aspx?value=0" alt="ClickCease"/></a>
        </noscript>
        <!--  ClickCease.com Conversion tracking-->
    </head>
    <body>    
        @if(Route::current()->getName() != 'solar.california.home' && Route::current()->getName() != 'solar.california.thankyou' && Route::current()->getName() != 'solar.california.solar.wizard' && Route::current()->getName() != 'energy.thankyou')
            @include('california.partials.header_common')
        @endif
        
        @yield('content')

        @include('california.partials.footer')

        @include('california.partials.script')
        @include('california.partials.meta')

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASQy-lj_qEU3g4G3D-J1jW00jagKYq91M&libraries=places&callback=initAutocomplete"
                   async defer></script>
    </body>
</html>
