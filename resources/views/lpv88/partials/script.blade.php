<script src="{{ asset('_lpv88/js/jquery.min.js') }}"></script>
<script src="{{ asset('_lpv88/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('_lpv88/js/owl.carousel.min.js') }}"></script>
<script src="{{ asset('_lpv88/js/custom.js') }}"></script> 

<script type="text/javascript">
    (function(){
        var anura = document.createElement('script');
        if(typeof anura === 'object') {
            var url_params_obj = {};
            window.location.search.slice(1).split('&').forEach(function (item){url_params_obj[item.split('=')[0]] = item.split('=').slice(1).join('')});
            var request = {
                instance: '1723947302',
                source: url_params_obj['utm_source'],
                campaign: url_params_obj['utm_campaign'],
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

@yield('script')