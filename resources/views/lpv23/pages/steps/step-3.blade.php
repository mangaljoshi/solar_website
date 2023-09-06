
<li class="swiper-slide steps step-3" data-step="3">
  <div id="loading" style="display: none;">
    <img id="loading-image" src="{{ asset('_lpv23/images/loader.gif') }}" alt="Loading..." />
  </div>
    <div class="v-center" id="estimate-provider">
      <div class="container text-center">
        <h2 class="title hide-in-mobile">Who is your utility provider?
        </h2>
        <h2 class="title mb-5 show-in-mobile">Who is your utility
          provider?</h2>
          <input class="form-control zipcode" style="display:none;" type="tel" name="zipCode"
          value="{{ Session::has('userData') && isset(Session::get('userData')['zip_code']) ? Session::get('userData')['zip_code'] : '' }}"/>
          <div class="small-container-main">
           
            <div class="next-step btn nextSlide" data-utility_provider="other" data-step="3" id="companies">
          </div>
          </div>
          
        {{-- <div class=" small-container-1 next-step btn nextSlide" data-utility_provider="other" data-step="3" id="companies">Other
        </div> --}}
        <span class="error-msg step_error_2" id="companies-error" style="text-align: center;">&nbsp;</span>
      </div>

      <a href="javascript:;" class=" back-link back-link-3 prevSlide colback" data-step="3">Back</a>
    </div>

    {{-- <div id="slider-block" class="btn-block" data-slide=""> --}}
      {{-- <a href="javascript:;" class="back-link prevSlide colback" data-step="3">Back</a> --}}
     
    {{-- </div> --}}
  </li>