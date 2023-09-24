<li class="swiper-slide steps last step-9" data-step="9">
    <div class="v-center" id="estimate-phone">
      <div class="container text-center">
        <h2 class="title hide-in-mobile">What is the best number to
          reach you at if you qualify?</h2>
        <h2 class="title mb-5 show-in-mobile">What is the best number
          to reach you at if you qualify?</h2>
        {{-- <h4 class="sub-title show-in-mobile">Don't worry, we won't bug
          you... We HATE bugs! 🕷</h4>
        <h4 class="sub-title hide-in-mobile">Don't worry, we won't bug
          you... We HATE bugs! 🕷</h4> --}}
        <div class="medium-container" style="margin-top: 40px">
          <input type="tel" inputmode="numeric" class="text-field vsmall-container" id="phone"
            name="phone_number" placeholder="Enter phone number" onkeypress="return onlyNumberKey(event)" minlength="10" maxlength="10">

            <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
            <input type="hidden" name="xxTrustedFormCertUrl" id="xxTrustedFormCertUrl_0" value="https://cert.trustedform.com/454a35b802f3e7b63ffabb4efedb7c6ebe67886c">

          <span class="error-msg vsmall-container mb-20 step_error_9" id="phone-error"></span>

    
          <span class="final-btn" style="padding-top:15px;display:block;margin:0 auto; margin-bottom: 107px;">
            <input type="submit" id="submit" class="btn default submitButton next-step" data-step="9" value="submit" />
          </span>
          <label for="leadid_tcpa_disclosure" class="font-12" id="tcpa_label">
            By clicking the 'View My Savings' button, you authorize powersolarsavings.com and up to <a href="{{route('marketing')}}" target="_blank" tabindex="0" style="color: #7b7b7b; text-decoration: underline;">4 solar partners</a> to call you and send you pre-recorded messages and text messages at the number you entered above, using an autodialer, with offers about their products or services, even if your phone number is on any national or state 'Do Not Call' list. Message and data rates may apply. Your consent here is not based on a condition of purchase. You agree to the Terms of Use and Privacy Policy.
          </label>

          <input
              type="hidden"
              id="leadid_tcpa_disclosure"
              name="tcpa"
              tabindex="0"
              value="By clicking the 'View My Savings' button, you authorize powersolarsavings.com and up to 4 solar partners  to call you and send you pre-recorded messages and text messages at the number you entered above, using an autodialer, with offers about their products or services, even if your phone number is on any national or state 'Do Not Call' list. Message and data rates may apply. Your consent here is not based on a condition of purchase. You agree to the Terms of Use and Privacy Policy."
          />

          {{-- <a href="javascript:;" class=" back-link back-link-8 prevSlide colback" data-step="9">Back</a> --}}
        </div>
      </div>
    </div>
    {{-- <div id="slider-block" class="btn-block" data-slide=""> --}}
      {{-- <a href="javascript:;" class="back-link prevSlide colback" data-step="7">Back</a> --}}
      
    {{-- </div> --}}
  </li>