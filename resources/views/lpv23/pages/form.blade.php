<div id="loading" style="display: none;">
  <img id="loading-image" src="{{ asset('_lpv23/images/loader.gif') }}" alt="Loading..." />
</div>
<form id="solarForm">
  <input name="full_address" class="fulladdress" type="hidden">
  <input name="google_address" id="google-address" type="hidden" value="">
  <input name="lat" class="addr-lat" type="hidden" autocomplete="off">
  <input name="lng" class="addr-lng" type="hidden" autocomplete="off">
  <input name="hstreet" class="hstreet" type="hidden" value="">
  <input name="city" class="hcity" type="hidden" value="" id="city">
  <input name="state" class="hstate" type="hidden" value="" id="state">
  <input name="country" id="country" class="hcountry" type="hidden" value="US" />
  <input name="landing_page" type="hidden" value="program">
  <input name="residence_ownership" type="hidden" value="Own" id="ownership" />
  <input name="adblock" type="hidden" value="" id="adbl" />
  <div class="wrapper show">
    <header id="header-empty-id">
      <div class="status-indicator">
        <div class="inner">
          <span class="indicator"></span>
          <div class="item indicator-1">Average</div>
          <div class="item indicator-2">Good</div>
          <div class="item indicator-3">Great</div>
          <div class="item indicator-4">Amazing</div>
          <div class="item indicator-5">Massive</div>
        </div>
        <div class="status">Estimated Savings: <span class="status">Great</span></div>
      </div>
    </header>
    <header id="header-with-id" style="display: none">
      <div class="progress-block" style="z-index:1">
        <div class="progress">
          <div class="progress-bar"></div>
        </div>
        <p>Your progress <span class="progress-width">16%</span></p>
      </div>
    </header>
    <div class="swiper-container banner-slider">
      {{-- <div style="width:150px;max-width:100%;margin:0 auto;" id="nogo">
        Loading Form...
      </div> --}}
      <ul class="swiper-wrapper">
       
        @include('lpv23.pages.steps.step-1')
        @include('lpv23.pages.steps.step-2')
        @include('lpv23.pages.steps.step-3')
        @include('lpv23.pages.steps.step-4')
        @include('lpv23.pages.steps.step-5')
        @include('lpv23.pages.steps.step-6')
        @include('lpv23.pages.steps.step-7')
        @include('lpv23.pages.steps.step-8')

      </ul>
      <div id="next-block" class="hide d-none" data-slide="">
        <a href="javascript:;" class="default nextSlide">Next</a>
      </div>
    </div>
    <div id="slider-block" class="btn-block hide" data-slide="">
      <a href="javascript:;" class="back-link prevSlide">Back</a>
      <a href="javascript:;" class="btn default nextSlide">Next</a>
    </div>
    <div class="report-block d-none">
      <div class="v-center">
        <div class="container text-center">
          <div id="processor">
            <div class="sphere" id="sphere1"></div>
            <div class="sphere" id="sphere2"></div>
            <div class="sphere" id="sphere3"></div>
            <div class="sphere" id="sphere4"></div>
          </div>
          <h2 class="title" id="processor-title">Submitting Your Request...
          </h2>
          <h3 id="sub-title">This may take up to 30 seconds please wait.
          </h3>
        </div>
      </div>
    </div>
  </div>
</form>

@section('script')
    <script id="LeadiDscript" type="text/javascript">
         (function() {
         var s = document.createElement('script');
         s.id = 'LeadiDscript_campaign';
         s.type = 'text/javascript';
         s.async = true;
         s.src = '//create.lidstatic.com/campaign/093ae24d-3c6c-1874-691e-bbfd5eac0c88.js?snippet_version=2';
         var LeadiDscript = document.getElementById('LeadiDscript');
         LeadiDscript.parentNode.insertBefore(s, LeadiDscript);
         })();
    </script>
    <noscript>
        <img src='//create.leadid.com/noscript.gif?lac=997AF13F-C149-B106-54A8-4676CF210163&lck=093ae24d-3c6c-1874-691e-bbfd5eac0c88&snippet_version=2' />
    </noscript>
    <!-- TrustedForm -->
    <script type="text/javascript">
        (function() {
        var tf = document.createElement('script');
        tf.type = 'text/javascript'; tf.async = true;
        tf.src = ("https:" == document.location.protocol ? 'https' : 'http') + "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&l=" + new Date().getTime() + Math.random();
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
        })();
    </script>
    <noscript>
        <img src="https://api.trustedform.com/ns.gif" />
    </noscript>
    <!-- End TrustedForm -->
@endsection