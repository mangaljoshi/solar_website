const ERROR_TYPES = {
    ZIP_LENGTH: 'zipLength',
    EMPTY: 'empty',
    ZIP_NOT_FOUND: 'zipNotFound',
    ADDRESS_LETTER_NUMBER: 'addressLetterNumber',
    EMAIL_DECLINE: 'emailDecline',
    FIRST_NAME_EMPTY: 'firstNameEmpty',
    LAST_NAME_EMPTY: 'lastNameEmpty',
    PHONE_DECLINE: 'phoneDecline',
    NETWORKING_ERROR: 'networkingError'
  };
  
  const ERROR_TEXT = {
    zipLength: {
      en: 'enter 5 digits zip code',
      es: 'Ingrese un código postal de 5 dígitos',
    },
    empty: {
      en: 'this field is required',
      es: 'este campo es obligatorio',
    },
    zipNotFound: {
      en: 'Please enter a valid U.S. zip code',
      es: 'Por favor, introduzca un código postal válido de los EE.UU.',
    },
    addressLetterNumber: {
      en: 'Your address must contain letter and numbers',
      es: 'Su dirección debe contener letras y números',
    },
    emailDecline: {
      en: 'Please Enter a Valid Email Address',
      es: 'Por favor, introduzca una dirección de correo electrónico válida',
    },
    firstNameEmpty: {
      en: 'Please Enter Your First Name',
      es: 'Por favor, introduzca su primer nombre',
    },
    lastNameEmpty: {
      en: 'Please Enter Your Last Name',
      es: 'Por favor, introduzca su apellido',
    },
    phoneDecline: {
      en: 'Please Enter a Valid US Phone Number',
      es: 'Por favor, introduzca un número de teléfono válido de los EE.UU.',
    },
    networkingError: {
      en: 'Networking Error',
      es: 'Error de red'
    }
  };
  
  const PROGRESS_TYPES = {
    GREAT: 'great',
    AMAZING: 'amazing',
    MASSIVE: 'massive'
  };
  
  const PROGRESS_TEXT = {
    great: {
      en: 'Great',
      es: 'Genial',
    },
    amazing: {
      en: 'Amazing',
      es: 'Asombroso',
    },
    massive: {
      en: 'Massive',
      es: 'Masivo',
    },
  };
  
  const BUTTON_TYPES = {
    NEXT: 'next',
    VALIDATING_ZIP: 'validatingZip',
    CALCULATE: 'calculate',
    OTHER: 'other'
  }
  
  const BUTTON_TEXT = {
    next: {
      en: 'Next',
      es: 'Siguiente',
    },
    validatingZip: {
      en: 'Validating Zip...',
      es: 'Validando postal...',
    },
    calculate: {
      en: 'Calculate',
      es: 'Calcular',
    },
    other: {
      en: 'Other',
      es: 'Otro',
    }
  };
  
  
  $(document).ready(function() {
      var apiUrl = 'https://api.sunvalue.com/api'
      var fieldsWithErrors = '#zip,#email,#fname,#lname,#phone,#autoaddress'
      var validatedValues = {}
      var swiper = initSwiper()
  
      initCustomRadio()
      initRangeSlider()
      initPhoneInputElement()
      addHiddenInputsToForm()
      updateTcpaValue()
      updateProgressBar()
  
      addSwiperTransitionHandlers(swiper, validatedValues)
      addSwiperClickHandlers(swiper)
  
      $(fieldsWithErrors).on('input', clearInputErrors)
  
      $('#calculateYourSavings').click(function(){
          calculateSavingsOnClick(swiper, apiUrl)
      })
  
      $('form#solarForm').on('submit', function(event){
          event.preventDefault();
          submitForm(swiper, apiUrl, validatedValues)
      })
  
      updatePageBasedOnQueryParams()
      $(window).resize(function () { resizeWindowElements(swiper) })
  });
  
  function initCustomRadio () {
      $('.custom-radio-item input[type=radio]:checked').parent().addClass('checked');
      $('.custom-radio-item input[type=radio]:not(:checked)').parent().removeClass('checked');
      $('.custom-radio-item input[type=radio]').change(function() {
          $(this).parents('.custom-radio').find('.custom-radio-item').removeClass('checked');
          $(this).parent().addClass('checked');
      });
  }
  
  function initRangeSlider () {
      var $document = $(document);
      var selector = '[data-rangeslider]';
      var $element = $(selector);
      var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
  
      var isProgramPage = document.location.pathname.includes('program');
      var useSqftSlider = isProgramPage && getParameterByName('slider') === 'sqf';
      if(useSqftSlider) updateSliderForProgram();
  
      function valueOutput(element) {
          var value = element.value;
          var output = (
              element.parentNode.getElementsByTagName('output')[0] || 
              element.parentNode.parentNode.getElementsByTagName('output')[0]
          )
          if (value == element.max) value = value + '+';
          output[textContent] = value;
      }
  
      $document.on('input', 'input[type="range"], ' + selector, function (e) {
          updateSliderIndicator(e);
          valueOutput(e.target);
      });
  
      $element.rangeslider({
          polyfill: false,
          onInit: function() {
              valueOutput(this.$element[0]);
              setTimeout(function(){
                  $element.trigger('change');
              },0);
              
          }
      });
  }
  
  function initPhoneInputElement() {
      const inputElement = document.getElementById('phone');
      inputElement.maxLength = 14
      inputElement.addEventListener('paste', function (e) {
          e.preventDefault()
        let phoneNumber = (e.clipboardData || window.clipboardData).getData('text');
        e.target.value = phoneNumber
        formatToPhone(e)
      })
      
      inputElement.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey) return false;
        enforceFormat(e)
        formatToPhone(e)
      })
      
      inputElement.addEventListener('keyup', function (e) {
        if (e.ctrlKey || e.metaKey) return false;
        formatToPhone(e)
      })
  }
  
  function initSwiper() {
      return new Swiper('.swiper-container.banner-slider', {
          autoHeight: true,
          allowTouchMove: false,
          observer: true,
          observeParents: true,
          effect: 'fade',
          navigation: {
              nextEl: '.nextSlide2',
              prevEl: '.prevSlide2'
          },
          navigationClickable: true,
          on: { init: function () { $("#nogo").hide() } }
      });
  }
  
  function updateSliderIndicator (e) {
      if ($(e.target).attr('name') == 'monthly_elec') {
          var a = 19 / 799;
          var b = a * $(e.target).val();
          var c = ($(e.target).val() == 101) ? 50.5 + b - 2.5 : 50.5 + b;
          $('.status-indicator .inner .indicator').css('left', c + '%');
      }
  }
  
  function updateSliderForProgram () {
      $('#footage-headline > strong').text('What\'s your Approximate Home Square Footage?');
  
      const min = 500;
      const max = 3500;
      const defaultValue = 2000;
  
      $('.footage .sliderLegendItem--start').text(`${min} sq.ft.`);
      $('.footage .sliderLegendItem--end').text(`${max}+ sq.ft.`);
      $('#unit-pre').text('');
      $('#unit-post').text(' sq.ft.');
      $('#output').text(defaultValue)
      $('#range-slider').attr({ max, min, value: defaultValue });
  }
  
  function updateProgressBar (total, step) {
    var totalStep = total || $('.swiper-container.banner-slider .swiper-slide').length;
    var currentStep = step || 1;
    var percentComplete = Math.round(currentStep * 100 / totalStep);
    
    $('.progress .progress-bar').css({'width':percentComplete+'%'});
    $('.progress .progress-bar').attr('fill', percentComplete);
    $('.progress-block .progress-width').html(percentComplete+'%');
  }
  
  function handleTransitionEnd (swiper) {
      if(swiper.realIndex == 1){
          $('.status-indicator').removeClass('js-great js-amazing js-massive')
          $('.status-indicator').addClass('js-great')
          $('.status span').text(getProgressText(PROGRESS_TYPES.GREAT))
          loadSeonScript()
      }				
  
      if(swiper.realIndex == 3){
          $('.status-indicator').removeClass('js-great js-amazing js-massive')
          $('.status-indicator').addClass('js-amazing')
          $('.status span').text(getProgressText(PROGRESS_TYPES.AMAZING))
      }
  
      if(swiper.realIndex == 4){
          $('.status-indicator').removeClass('js-great js-amazing js-massive')
          $('.status-indicator').addClass('js-massive')
          $('.status span').text(getProgressText(PROGRESS_TYPES.MASSIVE))
      }		
  
      if (swiper.realIndex == 0) {
          $('.progress-block').hide()
          $('.status-indicator').hide()
          $('.wrapper').addClass('show')
          $('.btn-block').addClass('hide')
      } else {
          $('.progress-block').show()
          $('.status-indicator').show()
          $('.wrapper').removeClass('show')
          $('.btn-block').removeClass('hide')
      }
  
      updateProgressBar(swiper.slides.length, swiper.realIndex + 1)
  }
  
  function handleTransitionStart (swiper) {
      $('.step-loading').fadeIn()
      setTimeout(function() { $('.step-loading').fadeOut() },1500);
  }
  
  function handleSlideChange(swiper, validatedValues) {
  
      hideNextByIndex(swiper);
      window.scrollTo(0, 0);
      document.activeElement.blur();
  
      var utilOnlyOther = $("#companies").children().length === 1;
      if (utilOnlyOther) {
          $("#util-other").prop("checked", true);
          if (swiper.realIndex == 2) {
              if (swiper.previousIndex > swiper.realIndex) {
                  return swiper.slidePrev();
              }
              swiper.slideNext();
          }
      }
  
      const stepToValidate = swiper.realIndex - 1;
      var noErrors = true;
  
      if (stepToValidate == 2) {
          const utilityCompany = $('input[name="electric_utility"]:checked');
          if (!utilityCompany || !utilityCompany?.val()) {
              $('#companies-error').text('Select your utility provider');
              swiper.slideTo(2);
              noErrors = false;
          } else {
              $('#companies-error').text('');
          }
      }
  
      if (stepToValidate == 3) {
          const address = $('#autoaddress').val();
          attachGoogleAddressToForm(address) // attach parsed address to form in background
          if (address.length == 0 || !hasNumber(address) || !hasAlphabet(address) || address.includes('@')) {
              $('#autoaddress').addClass('input-error');
              $('#address-error').text(getErrorText(ERROR_TYPES.ADDRESS_LETTER_NUMBER));
              swiper.slideTo(3);
              noErrors = false;
          }
      }
  
      if (stepToValidate == 4) {
          const shade = $('input[name="shade"]:checked');
          if (!shade || !shade?.val()) {
              $('#shade-error').text('Select the amount of sunlight your roof gets');
              swiper.slideTo(4);
              noErrors = false;
          } else {
              $('#shade-error').text('');
          }
      }
  
      if (stepToValidate == 5) {
          $('#email').val($.trim($('#email').val()));
          if (!isEmail($('#email').val())) {
              $('#email').addClass('input-error');
              $('#email-error').text(getErrorText(ERROR_TYPES.EMAIL_DECLINE));
              swiper.slideTo(5);
              noErrors = false;
          }
      }
  
      if (stepToValidate == 6) {
          $('#fname').val($.trim($('#fname').val()));
          $('#lname').val($.trim($('#lname').val()));
  
          if ($('#fname').val().length == 0) {
              $('#fname').addClass('input-error');
              $('#fname-error').text(getErrorText(ERROR_TYPES.FIRST_NAME_EMPTY));
              swiper.slideTo(6);
              noErrors = false;
          } else if ($('#lname').val().length == 0) {
              $('#lname').addClass('input-error');
              $('#lname-error').text(getErrorText(ERROR_TYPES.LAST_NAME_EMPTY));
              swiper.slideTo(6);
              noErrors = false;
          }
      }
  
      if (!noErrors) {
          window.dispatchEvent(new Event('resize'));
          return;
      }
  
      registerAfterValidation(swiper, validatedValues);
  }
  
  function hideNextByIndex(swiper){
      const altBill = swiper.realIndex===1&&getParameterByName('bill')==='buttons'
  
      if([2,4,7].indexOf(swiper.realIndex)>=0 || altBill){
          $('.nextSlide').hide();
          return
      }
      if(swiper.realIndex>0)$('.nextSlide').show();
  }
  
  function addSwiperTransitionHandlers(swiper, validatedValues) {
      swiper.on('transitionEnd', function () {
          handleTransitionEnd(swiper);
      });
  
      swiper.on('transitionStart', function () {
          handleTransitionStart(swiper);
      });
  
      swiper.on('slideChange', function () {
          handleSlideChange(swiper, validatedValues);
      });
  }
  
  function addSwiperClickHandlers(swiper) {
      $('.prevSlide').click(function(event){
          $(this).blur();
          swiper.slidePrev();
          window.scrollTo(0,0);
      });
  
      $('.nextSlide').click(function() {
          if (isStepWithHiddenNext(swiper.realIndex)) return;
          swiper.slideNext();
      });
  
      $('.radioNext').click(function(){
          if (swiper.realIndex === 4) swiper.slideNext();
      });	
  
      $('#companies').on('click', '.radioNext', function(){
          if (swiper.realIndex === 2) swiper.slideNext();
      });
  
      $('#bill-buttons').on('click', '.radioNext', function(){
          if (swiper.realIndex === 1) swiper.slideNext();
      });
  }
  
  function calculateSavingsOnClick(swiper, apiUrl) {
      $('#calculateYourSavings').blur();
    
      if (swiper.realIndex !== 0) return;
  
      $('#companies').empty();
  
      validateZip(apiUrl, $('#zip').val(), function (isValidZip, address) {
        if (!isValidZip) {
          $('#zip').focus();
          window.dispatchEvent(new Event('resize'));
          return;
        }
    
        swiper.slideNext();
        $('#zip').removeClass('input-error');
        $('#zip-error').text('');
    
        loadUtilityCompanies(apiUrl);
    
        setCityState(address);
    
        window.dispatchEvent(new Event('resize'));
      });
  }
  
  function submitForm(swiper, apiUrl, validatedValues) {
      if(swiper.realIndex !== 7) return false;
      if (!isValidPhone($('#phone').val())) {
          showPhoneError();
          return;
      }
      
      showReport();
      setElectricUtility();
  
      var frm=$("#solarForm");
  
      var shouldBypassSeon = (
          getParameterByName('s') && 
          ['GA', 'YT', 'PM'].indexOf(getParameterByName('s')) === -1
      )
  
      if(shouldBypassSeon){
          return postToSeon(frm, apiUrl, function (error, data) {
              if (error) console.log(error)
  
              const seonTransactionID = data?.data?.id || null;
              postToLeadspediaTrack(
                  { frm, apiUrl, seonTransactionID, validatedValues }
              )
              return;
          })
      }
  
      // hold for 24 hours
      var fdMetric = window.localStorage.getItem('fd_metric')
      if (fdMetric){
          fdMetric = JSON.parse(fdMetric)
  
          if(fdMetric.dec > 1) {
              var hourDiff = Math.floor(Math.abs((new Date(fdMetric.dec_t)-new Date()))/36e5)
  
              // 5 second fake loader
              if(hourDiff < 24){
                  return setTimeout(() => {
                      retryFromEmail(swiper)
                      return;
                  }, 5000);
              }
  
              window.localStorage.removeItem('fd_metric')
          }
      }
  
      postToSeon(frm, apiUrl, function (error, data) {
          if (error) console.log(error)
          let seonTransactionID = null;
          if (data) {
              var state = data.data?.state;
              seonTransactionID = data.data?.id;
  
              if(state === 'DECLINE') {
                  retryFromEmail(swiper)
                  return;
              }
          }
          postToLeadspediaTrack(
              { frm, apiUrl, seonTransactionID, validatedValues }
          )
          return;
      })
  }
  
  function loadUtilityCompanies(apiUrl) {
    $.get(`${apiUrl}/utilcos?zip=${$('#zip').val()}`, data => {
      data.forEach(({ name }) => {
        const radioItem = 
          `<div class="custom-radio-item radioNext">
             <input type="radio" name="electric_utility" value="${name}">
             ${name}
           </div>`;
        $(radioItem).appendTo('#companies');
      });
      $(`<div class="custom-radio-item radioNext">
          <input id="util-other" type="radio" name="electric_utility" value="Other">
          ${getButtonText(BUTTON_TYPES.OTHER)}
         </div>`).appendTo('#companies');
    });
  }
  
  function setCityState(address) {
      $('#city').val(address.city);
      $('#state').val(address.state_id);
      $('<input id="state_name" type="hidden" name="state_name" value="' + address.state_name + '" />').appendTo('body');
  }
    
  function clearInputErrors() {
      $(this).removeClass('input-error');
      $('.error-msg').html('');
  }
  
  function addHiddenInputsToForm () {
      if(!$('#rid').val()){
          $('<input>')
              .attr({type: 'hidden',value: getParameterByName('r') ,name: 'lp_request_id' })
              .appendTo('#solarForm')
      }
  
      for (let i = 1; i <= 5; i++) {
          $('<input>')
          .attr({type: 'hidden', value: getParameterByName(`s${i}`), name: `lp_s${i}` })
          .appendTo('#solarForm')
      }
  
    const referrer = sessionStorage.getItem('referrer') || document.referrer;
  
    if (referrer) {
      const hostname = new URL(referrer).hostname;
      if (!hostname.includes('sunvalue.com')) {
        $('<input>')
          .attr({ type: 'hidden', value: referrer, name: 'refurl_full' })
          .appendTo('#solarForm');
  
        $('<input>')
          .attr({ type: 'hidden', value: hostname, name: 'refurl_domain' })
          .appendTo('#solarForm');
      }
    }
  }
  
  function updatePageBasedOnQueryParams() {
      var zip = getParameterByName('zip')
      const isSave = document.location.pathname.includes('save');
      const geo = getParameterByName('geo');
      const solid = getParameterByName('solid');
  
      const allowedGeos = [
          'losangeles1',
          'losangeles2',
          'losangeles3',
          'losangeles4',
          'losangeles5',
          'lasvegas1',
      ];
  
      if (isSave && allowedGeos.includes(geo)) {
          const backgroundClass = `${geo.replace('losangeles', 'la-').replace('lasvegas', 'lv-')}-background`;
  
          $('.wrapper').toggleClass(backgroundClass);
          if(!solid) $('.wrapper').toggleClass('geo-overlay');
          $('.wrapper.show').toggleClass('full-opacity');
      }
  
      if(zip){
          $('#zip').val(zip);
          $("#calculateYourSavings").click();
      }
  
      if(getParameterByName('bill') === 'buttons'){
        $('#bill-slider').remove();
        [
          { text:'$101 - $150', value: '101'}, 
          { text:'$151 - $200', value: '151'}, 
          { text:'$201 - $300', value: '201'},
          { text:'$301 - $400 ', value: '301'}, 
          { text:'$401 - $500', value: '401'}, 
          { text:'Over $500' ,value: '501'}
        ].forEach(({text, value}) => {
          $(`<div class="custom-radio-item radioNext"><input class="bill-button" type="radio" name="monthly_elec" value="${value}">${text}</div>`).appendTo("#bill-buttons"); 
        });
      }
    
      if (getParameterByName('id')) {
        $('#header-empty-id').css('display', 'none');
        $('#header-with-id').css('display', 'block');
      }
  }
  
  function updateTcpaValue(){
      var tcpa = $("#leadid_tcpa_disclosure");
      if(!tcpa.val()){
          var text = $("#tcpa_label").text().replace(/^\s+|\s+$/g, '');
          tcpa.val(text);
      }
  }
  
  function resizeWindowElements(swiper) {
      var sliderBtns = $('#slider-block')
      var sliderNext = sliderBtns.find('a:nth-child(2)')
      var onlyNext = $('#next-block')
      var onlyNextBtn = onlyNext.find('a')
      if ($(window).width() < 1024) {
         sliderNext.addClass('btn nextSlide')
         sliderNext.removeClass('d-none')
         onlyNext.removeClass('btn-block')
         onlyNextBtn.removeClass('nextSlide btn')
         onlyNext.addClass('d-none')
         hideNextByIndex(swiper)
         return
      }
      sliderNext.removeClass('btn nextSlide')
      sliderNext.addClass('d-none')
      onlyNext.addClass('btn-block')
      onlyNextBtn.addClass('btn nextSlide')
      onlyNext.removeClass('d-none')
      hideNextByIndex(swiper)
  }
  
  function showPhoneError() {
      $('#phone').addClass('input-error');
      $('#phone-error').text(getErrorText(ERROR_TYPES.PHONE_DECLINE));
      window.dispatchEvent(new Event('resize'));
  }
  
  function showReport() {
      $('.banner-slider,.progress-block,.btn-block').addClass('d-none');
      $('.report-block').removeClass('d-none');
  }
    
  function setElectricUtility() {
      if ($.trim($("input[name=electric_utility]", "#solarForm").val()).length === 0) {
          $("input[name=electric_utility]", "#solarForm").val('Other');
      }
  }
  
  function isNumberKey(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
      return true;
  }
  
  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  
  function isValidPhone(phone) {
    var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    return regex.test(phone);
  }
  
  function isNumericInput(event) {
      var key = event.keyCode
      return ((key >= 48 && key <= 57) || (key >= 96 && key <= 105))
  }
  
  function enforceFormat(event) {
      if (!isNumericInput(event) && !isModifierKey(event)) event.preventDefault()
  }
  
  function formatToPhone(event) {
      if (isModifierKey(event)) return
      var target = event.target;
      var input = event.target.value.replace(/(^\+[1-2])|\D/g, '').substring(0, 10); // First ten digits of input only
      var zip = input.substring(0, 3);
      var middle = input.substring(3, 6);
      var last = input.substring(6, 10);
      if (input.length > 6) { target.value = `(${zip}) ${middle}-${last}`; }
      else if (input.length > 3) { target.value = `(${zip}) ${middle}`; }
      else if (input.length > 0) { target.value = `(${zip}`; }
  }
  
  function isModifierKey(event) {
      var key = event.keyCode;
      return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
          (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
          (key > 36 && key < 41) || // Allow left, up, right, down
          (
              // Allow Ctrl/Command + A,C,V,X,Z
              (event.ctrlKey === true || event.metaKey === true) &&
              (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
          )
  }
  
  function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  function postToLeadspediaTrack ({ frm, apiUrl, seonTransactionID, validatedValues }){
      var data = Object.assign({}, convertToJSONBySnakeCamel(frm), validatedValues)
        data.seonTransactionID = seonTransactionID;
      data.fbc = getCookie('_fbc')
      data.fbp = getCookie('_fbp')
      $.ajax({
          contentType: 'application/json',
          type: "POST",
          url: `${apiUrl}/leadspedia/lead`,
          dataType: 'json',
          data: JSON.stringify(data),
          success: function(data, status){
  
              const lander = frm
              .serializeArray()
              .find(e=>e.name==='landing_page')
              .value
  
  
              if(status==='success' && data.lead_id){
                  getAndSetLeadSoldInfo(apiUrl, data.lead_id, function (err, soldData) {
                      const buyerID = (soldData?.response?.data[0]?.buyerID) || 0
                      const advQuery = buyerID ? `&adv=${buyerID}` : ''
            const route = getCurrentLanguage() === 'es' ? '/es/thankyou' : '/thankyou/'
                      location.href = (data.redirect !== undefined)
                      ? data.redirect 
                      :  `${route}?id=${data.lead_id}&lander=${lander}${advQuery}`;
                  });
                  return;
              }
  
              msgs="There were some errors in your submission\n* "+Object.values(data.errors).join("\n* ");
              console.log (msgs);
              $("#processor-title").text("Error");
              $("#processor").hide();
              $("#sub-title").hide();
  
              
          },
          error: function(e, stat){
              var msg=e && e.responseJSON && e.responseJSON.message ? e.responseJSON.message : stat;
              msg=msg.split("(")[0];
              console.log("Networking error. Try to submit again in 10 seconds. \n\nError: "+msg);
              $("#processor-title").text(getErrorText(ERROR_TYPES.NETWORKING_ERROR));
              $("#processor").hide();
              $("#sub-title").hide();
          }
      })
  }
  
  function convertFormToJSON(form) {
      const array = $(form).serializeArray();
      const json = {};
      $.each(array, function () {
        json[this.name] = this.value || "";
      });
      json.full_name = json.first_name + " " + json.last_name;
      return json;
  }
  
  function snakeToCamel (str = '') {
      return str
      .toLowerCase()
      .replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
  }
  
  function convertToJSONBySnakeCamel (form){
      const array = $(form).serializeArray();
      const json = {};
      $.each(array, function () {
          json[!this.name.includes('_') ? this.name : snakeToCamel(this.name)] = this.value || "";
      });
      json.fullName = json.firstName + " " + json.lastName;
      return json;
  } 
  
  function getFraudData(form, ip ='') {
      var jsonForm = convertFormToJSON(form);
        var stateName = $('#state_name').val()
      return {
          config: {
              ip: {
                  include: "flags,history,id",
                  version: "v1.1"
              },
              email: {
                  include: "flags,history,id",
                  version: "v2.2"
              },
              phone: {
                  "include": "flags,history,id,cnam_lookup,hlr_details",
                  "version": "v1.4"
              },
              "ip_api": true,
              "email_api": true,
              "phone_api": true,
              "device_fingerprinting": true,
              response_fields: 'id,state,calculation_time,geolocation_details'
          },
          ip,
          email: jsonForm.email,
          email_domain: jsonForm.email.split('@')[1],
          user_fullname: jsonForm.full_name,
          user_created: (new Date()).valueOf(),
          user_country: jsonForm.country,
          user_city: jsonForm.city,
          user_region: jsonForm.state,
          user_zip: jsonForm.zip,
          user_street: jsonForm.street,
          phone_number: `+1${jsonForm.phone_number.replace(/[-()\s]/g, '')}`,
          custom_fields: {
              source: getParameterByName('s'),
              state: stateName,
              r: jsonForm.lp_request_id,
              s1: jsonForm.lp_s1,
              s2: jsonForm.lp_s2,
              s3: jsonForm.lp_s3,
              s4: jsonForm.lp_s4,
              s5: jsonForm.lp_s5,
          },
          session_id: window.seon_session_id || '',
          session: window.seon_session || '',
          details_url: window.location.href.slice(window.location.protocol.length+2, 100)
      }
  }
  
  function getAndSetLeadSoldInfo(apiUrl, leadId, onComplete) {
      $.ajax({
          type: "GET",
          url: `${apiUrl}/leadspedia/getSoldInfo?leadId=${leadId}`,
          success: function (data, status, xhr) {
              if (status == 'success') {
                  const soldInfo = data.response?.data[0]
                  if (soldInfo) {
                      window.sessionStorage.setItem(`lead_${leadId}`, JSON.stringify(soldInfo))
                  }
              }
          },
          error: function (xhr, status, error) {
              console.log(error)
          },
          complete: function ( xhr ) {
              onComplete(null, xhr.responseJSON)
          }
      })
  }
  
  function validateZipAgainstDB(apiUrl, zip, cb) {
      $.ajax({
          type: "GET",
          url: `${apiUrl}/address?zip=${zip}`,
          success: function (data, status, xhr) {
              if (!data || (Array.isArray(data) && data.length === 0)) {
                  console.log(xhr)
                  cb(false)
  
                  return
              }
  
              if(data.state_id === 'NV') {
                  $('<div class="custom-radio-item radioNext">' + 
                  '<input id="util-nv-energy" type="radio" ' +
                  'name="electric_utility" value="NV Energy">NV Energy'+ 
                  '</div>').appendTo('#companies');
              }
  
              if(data.redirectUrl) return location.href = data.redirectUrl
  
              cb(true, data)
          },
          error: function (xhr, status, error) {
              console.log(error)
  
              cb(false)
          },
      })
  }
  
  function validateZip(apiUrl, zip, cb) {
      function toggleLoading() {
          $('#calculateYourSavings')
              .toggleClass('btn-loading')
              .prop('disabled', (_, val) => !val)
  
          $('#calculateYourSavings > span')
              .text((_, text) => {
                  const defaultWhitelist = ['save', 'woody', 'xm', 'es', 'valpak']
                  const defaultBtnText = defaultWhitelist
                      .includes(window.location.pathname.split('/')[1])
                          ? getButtonText(BUTTON_TYPES.NEXT) 
                          : getButtonText(BUTTON_TYPES.CALCULATE)
                  if (text === defaultBtnText) {
                      return getButtonText(BUTTON_TYPES.VALIDATING_ZIP)
                  }
  
                  return defaultBtnText
              })
  
          $('#calculateYourSavings > div')
              .toggleClass('loader-hidden loader')
      }
  
      if(zip == ''){
          $('#zip').addClass('input-error');
          $('#zip-error').text(getErrorText(ERROR_TYPES.EMPTY));		
  
          cb(false)
          return
      }
  
      if(zip.trim().length != 5){
          $('#zip').addClass('input-error');
          $('#zip-error').text(getErrorText(ERROR_TYPES.ZIP_LENGTH));
  
          cb(false)
          return
      }
      
      toggleLoading()
      validateZipAgainstDB(apiUrl, zip, function(isValid, address) {
          if (!isValid) {
              $('#zip').addClass('input-error');
              $('#zip-error').text(getErrorText(ERROR_TYPES.ZIP_NOT_FOUND));		
          }
  
          toggleLoading()
          cb(isValid, address)
      })
  }
  
  function loadSeonScript () {
      $.getScript('https://cdnjs.cloudflare.com/ajax/libs/uuid/8.2.0/uuidv4.min.js',  function() {
          $.getScript('https://cdn.seondf.com/js/v5/agent.js', function () {
              window.seon_session_id = uuidv4();
              seon.config({
                  host: "seondf.com",
                  session_id: window.seon_session_id,
                  audio_fingerprint: true,
                  canvas_fingerprint: true,
                  webgl_fingerprint: true,
                  onSuccess: async function(message) {
                      window.seon_session = await seon.getBase64Session()
                      console.log(message)
                  },
                  onError: function(message) {
                      console.log("error", message);
                  }
              });
          })
      })
  }
  
  function postToSeon (frm, apiUrl, cb) {
      $.ajax({
          contentType: 'application/json',
          url: `${apiUrl}/seon/lead`,
          type: 'POST',
          data: JSON.stringify(getFraudData(frm)),
          dataType: 'json',
          success: function (data) {
              cb(null, data)
          },
          error: (xhr,status,error) => {
              cb(error)
          },
      });
  }
  
  function retryFromEmail(swiper) {
      swiper.slideTo(5) // back to email
      $('.banner-slider,.progress-block,.btn-block').removeClass('d-none');
      $('.report-block').addClass('d-none');
      $('#email').addClass('input-error');
      $('#email-error').css("color","red");
      $('#email-error').text(getErrorText(ERROR_TYPES.EMAIL_DECLINE));
  
      var fdMetric = window.localStorage.getItem('fd_metric')
  
      // set first decline if empty
      if(!fdMetric){
          window.localStorage.setItem('fd_metric', JSON.stringify({ dec: 1, dec_t: Date.now()}));
          return;
      }
  
      //  update decline count & timer
      fdMetric = JSON.parse(fdMetric)
      window.localStorage.setItem('fd_metric',  JSON.stringify({ dec: fdMetric.dec + 1, dec_t: Date.now()}))
  }
  
  function hasAlphabet(input) {
    return /[a-z]/i.test(input)
  }
  
  function hasNumber(input) {
    return /[0-9]/.test(input)
  }
  
  function getCookie(name){
      return Object
          .fromEntries(document.cookie.split('; ')
          .map(v=>v.split(/=(.*)/s)
          .map(decodeURIComponent)))[name]
  }
  
  function isStepWithHiddenNext(currentStep) {
      const altBill = currentStep===1&&getParameterByName('bill')==='buttons'
    return [2,4,7].indexOf(currentStep) >= 0 || altBill;
  }
  
  function registerAfterValidation (event, value) {
      const formNames = [
          'zip', 
          'monthly_elec', 
          'electric_utility', 
          'street', 
          'shade', 
          'email', 
          'first_name'
      ]
  
      const data = convertFormToJSON($('#solarForm'))
      const isV2 = window
          .location
          .pathname
          .split('/save').pop().replace(/\//g, '') === 'v2'
  
      if(formNames[event.realIndex-1] === 'first_name'){
          value['lastName'] =  data['last_name']
      }
  
      value[snakeToCamel(formNames[event.realIndex-1])] = data[
          formNames[event.realIndex-1]
      ]
  
      if(isV2) write(event.realIndex)
  }
  
  function attachGoogleAddressToForm(address) {
    var apiKey = 'AIzaSyDtjbzGiQga-NP-KNnEuJmBWuEdNlZynK0'
    $.getScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`, function () {
      var geocoder = new google.maps.Geocoder()
  
      geocoder.geocode({ address: address }, function (results, status) {
        if (status !== 'OK') console.error(status)
        $('#google-address').val(results[0].formatted_address)
      })
    })
  }
  
  function getErrorText(type) {
    const lang = getCurrentLanguage();
    return ERROR_TEXT[type][lang];
  }
  
  function getProgressText(index) {
    const lang = getCurrentLanguage();
    return PROGRESS_TEXT[index][lang];
  }
  
  function getButtonText(index) {
    const lang = getCurrentLanguage();
    return BUTTON_TEXT[index][lang];
  }
  
  function getCurrentLanguage() {
    return document.location.pathname.includes('/es/') ? 'es' : 'en';
  }






//   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  
  
  $(document).ready(function() {
      var apiUrl = 'https://api.sunvalue.com/api'
      var fieldsWithErrors = '#zip,#email,#fname,#lname,#phone,#autoaddress'
      var validatedValues = {}
      var swiper = initSwiper()
  
      initCustomRadio()
      initRangeSlider()

      updateTcpaValue()
      updateProgressBar()
  
      addSwiperTransitionHandlers(swiper, validatedValues)
      addSwiperClickHandlers(swiper)
  
      $(fieldsWithErrors).on('input', clearInputErrors)
  
      $('#calculateYourSavings').click(function(){
          calculateSavingsOnClick(swiper, apiUrl)
      })
  
      $('form#solarForm').on('submit', function(event){
          event.preventDefault();
          submitForm(swiper, apiUrl, validatedValues)
      })
  
      updatePageBasedOnQueryParams()
      $(window).resize(function () { resizeWindowElements(swiper) })
  });

  
  function initRangeSlider () {
      var $document = $(document);
      var selector = '[data-rangeslider]';
      var $element = $(selector);
      var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
  
      var isProgramPage = document.location.pathname.includes('program');
      var useSqftSlider = isProgramPage && getParameterByName('slider') === 'sqf';
      if(useSqftSlider) updateSliderForProgram();
  
      function valueOutput(element) {
          var value = element.value;
          var output = (
              element.parentNode.getElementsByTagName('output')[0] || 
              element.parentNode.parentNode.getElementsByTagName('output')[0]
          )
          if (value == element.max) value = value + '+';
          output[textContent] = value;
      }
  
      $document.on('input', 'input[type="range"], ' + selector, function (e) {
          updateSliderIndicator(e);
          valueOutput(e.target);
      });
  
      $element.rangeslider({
          polyfill: false,
          onInit: function() {
              valueOutput(this.$element[0]);
              setTimeout(function(){
                  $element.trigger('change');
              },0);
              
          }
      });
  }
  

  
  function updateSliderIndicator (e) {
      if ($(e.target).attr('name') == 'monthly_elec') {
          var a = 19 / 799;
          var b = a * $(e.target).val();
          var c = ($(e.target).val() == 101) ? 50.5 + b - 2.5 : 50.5 + b;
          $('.status-indicator .inner .indicator').css('left', c + '%');
      }
  }
  
  function updateSliderForProgram () {
      $('#footage-headline > strong').text('What\'s your Approximate Home Square Footage?');
  
      const min = 500;
      const max = 3500;
      const defaultValue = 2000;
  
      $('.footage .sliderLegendItem--start').text(`${min} sq.ft.`);
      $('.footage .sliderLegendItem--end').text(`${max}+ sq.ft.`);
      $('#unit-pre').text('');
      $('#unit-post').text(' sq.ft.');
      $('#output').text(defaultValue)
      $('#range-slider').attr({ max, min, value: defaultValue });
  }
  

  function updatePageBasedOnQueryParams() {
      var zip = getParameterByName('zip')
      const isSave = document.location.pathname.includes('save');
      const geo = getParameterByName('geo');
      const solid = getParameterByName('solid');
  
      const allowedGeos = [
          'losangeles1',
          'losangeles2',
          'losangeles3',
          'losangeles4',
          'losangeles5',
          'lasvegas1',
      ];
  
      if (isSave && allowedGeos.includes(geo)) {
          const backgroundClass = `${geo.replace('losangeles', 'la-').replace('lasvegas', 'lv-')}-background`;
  
          $('.wrapper').toggleClass(backgroundClass);
          if(!solid) $('.wrapper').toggleClass('geo-overlay');
          $('.wrapper.show').toggleClass('full-opacity');
      }
  
      if(zip){
          $('#zip').val(zip);
          $("#calculateYourSavings").click();
      }
  
      if(getParameterByName('bill') === 'buttons'){
        $('#bill-slider').remove();
        [
          { text:'$101 - $150', value: '101'}, 
          { text:'$151 - $200', value: '151'}, 
          { text:'$201 - $300', value: '201'},
          { text:'$301 - $400 ', value: '301'}, 
          { text:'$401 - $500', value: '401'}, 
          { text:'Over $500' ,value: '501'}
        ].forEach(({text, value}) => {
          $(`<div class="custom-radio-item radioNext"><input class="bill-button" type="radio" name="monthly_elec" value="${value}">${text}</div>`).appendTo("#bill-buttons"); 
        });
      }
    
      if (getParameterByName('id')) {
        $('#header-empty-id').css('display', 'none');
        $('#header-with-id').css('display', 'block');
      }
  }
  
  function updateTcpaValue(){
      var tcpa = $("#leadid_tcpa_disclosure");
      if(!tcpa.val()){
          var text = $("#tcpa_label").text().replace(/^\s+|\s+$/g, '');
          tcpa.val(text);
      }
  }
  
  function resizeWindowElements(swiper) {
      var sliderBtns = $('#slider-block')
      var sliderNext = sliderBtns.find('a:nth-child(2)')
      var onlyNext = $('#next-block')
      var onlyNextBtn = onlyNext.find('a')
      if ($(window).width() < 1024) {
         sliderNext.addClass('btn nextSlide')
         sliderNext.removeClass('d-none')
         onlyNext.removeClass('btn-block')
         onlyNextBtn.removeClass('nextSlide btn')
         onlyNext.addClass('d-none')
         hideNextByIndex(swiper)
         return
      }
      sliderNext.removeClass('btn nextSlide')
      sliderNext.addClass('d-none')
      onlyNext.addClass('btn-block')
      onlyNextBtn.addClass('btn nextSlide')
      onlyNext.removeClass('d-none')
      hideNextByIndex(swiper)
  }
  
  function showPhoneError() {
      $('#phone').addClass('input-error');
      $('#phone-error').text(getErrorText(ERROR_TYPES.PHONE_DECLINE));
      window.dispatchEvent(new Event('resize'));
  }
  
  function showReport() {
      $('.banner-slider,.progress-block,.btn-block').addClass('d-none');
      $('.report-block').removeClass('d-none');
  }
    

 