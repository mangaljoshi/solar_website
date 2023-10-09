<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/x-icon" href="{{asset('_lpv90/images/logo.png')}}">

        <title>{{ config('base.website_name') }}-Best Solar Panels For Solar & Renewable Energy</title>
        <link rel="icon" type="image/x-icon" href="./solar/images/logo.png">

        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <meta http-equiv="delegate-ch" content="sec-ch-ua https://puster-blereby.com; sec-ch-ua-mobile https://puster-blereby.com; sec-ch-ua-arch https://puster-blereby.com; sec-ch-ua-model https://puster-blereby.com; sec-ch-ua-platform https://puster-blereby.com; sec-ch-ua-platform-version https://puster-blereby.com; sec-ch-ua-bitness https://puster-blereby.com; sec-ch-ua-full-version-list https://puster-blereby.com; sec-ch-ua-full-version https://puster-blereby.com">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>

        @include('lpv90.partials.style')

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700;900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.10/jquery.mask.js"></script>

        {{-- Anura Script --}}
        <script type="text/javascript">
            (function(){
                var anura = document.createElement('script');
                if(typeof anura === 'object') {
                    var url_params_obj = {};
                    window.location.search.slice(1).split('&').forEach(function (item){url_params_obj[item.split('=')[0]] = item.split('=').slice(1).join('')});
                    var additional_obj = {
                                1: url_params_obj['lptoken'],
                                2: url_params_obj['lptoken3'],
                                3: url_params_obj['vid'],
                            }
                            var additional = JSON.stringify(additional_obj);
                    var request = {
                        instance: '1723947302',
                        source: url_params_obj['trafficsource'],
                        additional: additional,
                        callback: 'anuraResponseHandler',
                    };
                    var params = [];
                    for(var x in request) params.push(x + '=' + encodeURIComponent(request[x]));
                    params.push(Math.floor(1E12 * Math.random() + 1));
                    anura.type = 'text/javascript';
                    anura.async = true
                    anura.src = 'https://script.anura.io/request.js?' + params.join('&');
                    var script = document.getElementsByTagName('script')[0];
                    script.parentNode.insertBefore(anura, script);
                }
            })();
            function anuraResponseHandler(response) {
                if(!response.getId() && !response.getExId()) return;
                var method = 'POST';
                var params = ['instance=1723947302'];
                if(response.getId()) params.push('id=' + encodeURIComponent(response.getId()));
                if(response.getExId()) params.push('exid=' + encodeURIComponent(response.getExId()));
                var url = 'https://script.anura.io/result.json' + ('GET' === method ? ('?' + params.join('&')) : '');
                if(window.XDomainRequest) {
                    var http = new XDomainRequest();
                    if(http) {
                        http.open(method, document.location.protocol === 'https:' ? url: url.replace('https:', 'http:'));
                        http.onload = function(){resultHandler(this); };
                        setTimeout(function(){
                        http.send('POST' === method ? params.join('&'): '');}, 0);
                    }
                } else if(window.XMLHttpRequest) {
                    var http = new XMLHttpRequest();
                    if (http && 'withCredentials' in http) {
                        http.open(method, url, true);
                        if ('POST' === method) http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        http.onload = function(){resultHandler(this); };
                        http.send('POST' === method ? params.join('&'): '');
                    }
                }
            }
            function resultHandler(http) {
                var response = JSON.parse(http.response);
                if(response.result == 'bad') {
                    var an_gs = document.createElement('script');
                    an_gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + 'AW-11327591835/WS0kCIalnOgYEJurtZkq';
                    an_gs.addEventListener('load', function() {
                        window.dataLayer = window.dataLayer || [];
                        function gtag() { dataLayer.push(arguments); };
                        gtag('js', new Date());
                        gtag('config', 'AW-11327591835/WS0kCIalnOgYEJurtZkq');
                        gtag('set', { 'cookie_flags': 'SameSite:None;Secure' });
                        gtag('event', 'anura_exclusion', {'send_to': 'AW-11327591835/WS0kCIalnOgYEJurtZkq'});
                    });
                    document.head.appendChild(an_gs);
                }
                if(response.result == 'bad') {
                    var search_params = new URLSearchParams(window.location.search);
                    search_params.set('an_mtexaud', 'an_fb_exaudmax123');
                    var rep_url = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + search_params.toString();
                    window.history.pushState({ path: rep_url }, '', rep_url);
                    var s = document.getElementsByTagName('script')[0];
                    var ns = document.createElement('noscript');
                    ns.id = 'fb-ns';
                    s.parentNode.insertBefore(ns, s);
                    var px = document.createElement('img');
                    px.src = 'https://www.facebook.com/tr?id=0&ev=PageView&noscript=1'
                    ns.appendChild(px);
                    !function(f, b, e, v, n, t, s) {
                        if (f.fbq) return;
                        n = f.fbq = function() {
                            n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                        };
                        if (!f._fbq) f._fbq = n;
                        n.push = n;
                        n.loaded = !0;
                        n.version = '2.0';
                        n.queue = [];
                        t = b.createElement(e);
                        t.async = !0;
                        t.src = v;
                        s = b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t, s)
                    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                    var iids = ['1058931401932346'];
                    for (var i = 0; i < iids.length; i++) { fbq('init', iids[i]); fbq('track', 'PageView'); fbq('track', 'AnuraExclusionEvent'); }
                }
            }
        </script>
        
        <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RXZ3171R34"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RXZ3171R34');
        </script>

        <!-- Meta Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '798504555355901');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=798504555355901&ev=PageView&noscript=1"
    /></noscript>
<!-- End Meta Pixel Code -->
    </head>
    <body>    
        {{-- @if(Route::current()->getName() != 'home' && Route::current()->getName() != 'solar.home' && Route::current()->getName() != 'solar.thankyou' && Route::current()->getName() != 'solar.solar.wizard')
            @include('lpv90.partials.header_common')
        @endif --}}
        
        @yield('content')

        @include('lpv90.partials.footer')

        @include('lpv90.partials.script')
        @include('lpv90.partials.meta')

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASQy-lj_qEU3g4G3D-J1jW00jagKYq91M&libraries=places&callback=initAutocomplete"
                   async defer></script>
    </body>
</html>
