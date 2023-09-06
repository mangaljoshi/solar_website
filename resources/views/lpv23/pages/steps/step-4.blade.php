<li class="swiper-slide steps step-4" data-step="4">
    <div class="v-center" id="estimate-map">
      <div class="container text-center">
        <h2 class="title hide-in-mobile">Where is your home located?
        </h2>
        <h2 class="title mb-5 show-in-mobile">Where is your home
          located?</h2>
        <h4 class="sub-title hide-in-mobile">This helps us find your
          home's position relative to the sun.</h4>
        <h4 class="sub-title show-in-mobile">This helps us find your
          home's position relative to the sun.</h4>
        <div class="map-loader">
          <img src="/images/loader.svg">
        </div>
        <div class="small-container">
          <input type="search" class="text-field" id="address-radar" name="street"  x-bind="GeoCompleteInput($data)" autocomplete="nope"placeholder="Type Here e.g. 123 West Main Road">

          <div x-bind="GeoCompletePanel($data)">
            <template x-for="item in items" :key="item.distance">
                <div x-bind="GeoCompleteItem($data, item)">
                    <img src="../../img/marker.svg" />
    
                    <div x-text="item.formattedAddress" class="autocomplete-item__label"></div>
                </div>
            </template>
        </div>

          <span class="error-msg step_error_4" id="address-error">&nbsp;</span>
          <a href="javascript:;" class="btn default-1 nextSlide next-step address-btn" data-step="4">Next</a>

          <div id="slider-block" class="btn-block" data-slide="">
            <a href="javascript:;" class=" back-link back-link-4 prevSlide colback" data-step="4">Back</a>
            
          </div>
          <div id="map_canvas" class="map-box"></div>
        </div>
      </div>
    </div>
  </li>