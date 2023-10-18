<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>{{ config('base.website_name') }}-Best Solar Panels For Solar & Renewable Energy</title>
    <meta name="csrf-param" content="authenticity_token" />
    <meta name="csrf-token" content="Ed+9E73ZMivHhfJoqDc+rIf2gLkY+IOGCo3PvzVR0ZHmr2fPP4XoAcqCuIvDrHDwxAih34yo9KgKnwNfRTXHVw==" />

    <link rel="icon" type="image/x-icon" href="{{ asset('_lpv23/images/fav.png') }}">

    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('_lpv23/images/fav.png') }}" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        
    <!-- Fonts -->
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&display=swap" onload="this.rel='stylesheet'">

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
    


    @include('lpv23.partials.style')
</head>

<body>
    @yield('content')

    
    @include('lpv23.partials.script')
</body>

</html>