 <li class="swiper-slide steps one step_active step-1" data-step="1">
        <div class="v-center" id="estimate-zip">
          <div class="container text-center">
            {{-- <h1 class="title htitle">New State Solar Program Offers $0
              Down &amp; Reduces Utility Costs.</h1> --}}
             <h1 class="title htitle main-heading">National Capital Territory of <span class="city"></span> Solar Incentive Program</h1> 
            <h4 class="sub-title mb-20 location-text"></h4>
            <h5 id="footage-headline"><strong>How Much Would You Like To
                Save?</strong></h5>
            <div class="rangeslider-block footage">
              <div class="range-slider">
                <div id="tooltip"></div>
                <input id="range" type="range" step="10" value="300" min="100" max="500">
            </div>
              <input type="range" min="100" max="500" step="50" id="range-slider" data-rangeslider=""
                style="position: absolute;width: 36px;height: 76px;overflow: hidden;opacity: 0;">
                {{-- <range-slider min="0" max="100" step="1" dir="rtl"></range-slider> --}}
              {{-- <div class="rangeslider rangeslider--horizontal" id="js-rangeslider-0">
                <div class="rangeslider__fill" style="width: 275px;"></div>
                <div class="rangeslider__handle" style="left: 260px;"></div>
              </div> --}}
              <div class="rangeslider-tooltip"><span id="unit-pre">$</span><output id="output">300</output><span
                  id="unit-post">/Month</span></div>
              <div class="sliderLegend">
                <p class="sliderLegendItem--start" style="margin-bottom:0px">$100</p>
                <p class="sliderLegendItem--end" style="margin-bottom:0px">$500+</p>
              </div>
            </div>
            <div class="small-container">
              <ul class="form-list">
                <li>
                  <input type="text" inputmode="numeric" class="text-field zip" id="zip" name="zip_code"
                    autocomplete="postal-code" onkeypress="return isNumberKey(event)" placeholder="Zip Code"
                    pattern="[0-9]*" maxlength="5" size="5" value="">
                  <span class="error-msg" id="zip-error">&nbsp;</span>
                </li>
                <li>
                  <a id="calculateYourSavings" href="javascript:;" class="btn default btn-with-loader">
                    <div class="loader-hidden"></div>
                    <span class="next-step" data-step="1">Calculate</span>
                  </a>
                </li>
              </ul>
            </div>
            <ul class="list-style hide-in-mobile">
              <li>100% Free Solar Savings Report</li>
              <li>Get Your System Size & Battery Details</li>
              <li>Get Your Solar Cost & Energy Savings</li>
              <li>Learn About Incentives in Your State</li>
              <li>Compare Solar Prices from Installers Near You</li>
            </ul>
          </div>
        </div>
      </li>