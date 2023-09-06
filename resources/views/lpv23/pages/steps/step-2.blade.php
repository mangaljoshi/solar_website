 
        <li class="swiper-slide steps three step-2" data-step="2">
            <div class="v-center" id="estimate-bill">
              <div class="container text-center">
                <h4 class="sub-title hide-in-mobile">✅ Incentives are found in
                  your area!</h4>
                <h4 class="sub-title show-in-mobile">✅ Incentives are found in
                  your area!</h4>
                <h2 class="title hide-in-mobile">How much is your monthly
                  energy bill?</h2>
                <h2 class="title show-in-mobile">How much is your monthly
                  energy bill?</h2>
                <div class="custom-radio borderd small-container" id="bill-buttons"></div>
                <div id="bill-slider" class="rangeslider-block with-gradient electric">
                    <input type="range" min="101" value="317" max="800" name="monthly_elec" data-rangeslider="" style="position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0;">
                    <div class="range-slider">
                      <div id="tooltip"><img src="{{asset('_lpv23/images/combined-arrow.sv')}}" alt=""style="
                        margin-top: 9px;
                        margin-left: -3px;
                        font-size: 38px;"></div>
                      <input id="bill-range" type="range" name="monthly_bill" step="10" value="394" min="100" max="800">
                  </div>
                    {{-- <div class="rangeslider rangeslider--horizontal scroll-container" id="js-rangeslider-1">
                        <div class="rangeslider__fill" style="width: 268.677px;"></div>
                        <div class="rangeslider__handle" style="left: 253.677px;"></div>
                    </div> --}}
                    <div class="rangeslider-tooltip">$<output id="outputtwo">394</output></div>
                    <div class="sliderLegend">
                      <p class="sliderLegendItem--start">$101</p>
                      <p class="sliderLegendItem--end">$800+</p>
                    </div>
                    {{-- <div id="" class="mainbtn" data-slide=""> --}}
                    <a href="javascript:;" class="btn default-1 address-btn nextSlide next-step next-step2" data-step="2">Next</a>
                    {{-- </div> --}}

                    <a href="javascript:;" class=" back-link back-link-2 prevSlide colback" data-step="2">Back</a>
                  </div>


                  
              </div>
            </div>

            {{-- <div id="next-block" class="" data-slide="" style="display: block">
                <a href="javascript:;" class="default nextSlide" style="display: block">Next</a>
              </div> --}}

              {{-- <div id="slider-block" class="btn-block" data-slide=""> --}}
                {{-- <a href="javascript:;" class="back-link prevSlide colback" data-step="2">Back</a> --}}
               
              {{-- </div> --}}
          </li>
        {{-- <div class="relative mb-2 form-error-message step_error_2"></div> --}}


