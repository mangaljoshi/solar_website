const utility = async (zipCode) => {
  const URL = "https://apis.wattbuy.com/v3/electricity/info?zip="+zipCode;
  const options = {
    method: "GET",
    headers: {
      "accept": "application/json",
      "x-api-key": "AqXT2UqxbQ1fZgwQp9Tqf6wSmiSDDvJhaZwYMiVZ"
    },
  };
  const response = await fetch(URL, options);
  const data = await response.json();
  return data.utility_info;
};

$("#range").on('input', function() {
  var value = ($(this).val()-this.min)/(this.max-this.min)*100
  this.style.background = 'linear-gradient(to right, #0160B0 0%, #0160B0 ' + value + '%, #d9d3d3 ' + value + '%, #d9d3d3 100%)'
});

$(document).ready(function () {  
  var url = new URL(window.location.href);
  var zipcode = url.searchParams.get("zip");
  if (zipcode) {
    $("#zipCode").val(zipcode);
  }

  let dataObj = {
    lp_campaign_id: "12444",
    lp_key: "o6e2twdofpyp6",
    lp_supplier_id: "25370",
    sub_id1: "112",
    lp_response: "JSON",
    // lp_action: "test",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
    state: "NY",
    zip_code: "",
    email: "",
    ip_address: "",
    roof_shade: "",
    homeowner: "Yes",
    landing_page: "LP1",
    user_agent: navigator.userAgent,
    monthly_bill: "",
    tcpa_text: "By clicking the View My Savings button, you authorize www.wiseenergypower.com and up to 4 solar partners to call you and send you pre-recorded messages and text messages at the number you entered above, using an autodialer, with offers about their products or services, even if your phone number is on any national or state Do Not Call list. Message and data rates may apply. Your consent here is not based on a condition of purchase.",
    utility_provider: "",
    time_frame: "Immediate",
    jornaya_lead_id: "",
    trusted_form_cert_url: "",
  };

  getIP();

  function getIP() {
    var range = $(".avgBillRange").val();
    if (range) {
      var monthly_bill= range;
      if (monthly_bill < 100) {
        dataObj.monthly_bill = "Less than $100";
      } else if (monthly_bill > 100 && monthly_bill < 200) {
        dataObj.monthly_bill = "From $100 to $200";
      } else if (monthly_bill > 200 && monthly_bill < 300) {
        dataObj.monthly_bill = "From $200 to $300";
      } else {
        dataObj.monthly_bill = "More than $300";
      }
    }

    var url = new URL(window.location.href);
    var lp_subid1 = url.searchParams.get("lp_subid1");
    if (lp_subid1) {
      dataObj.lp_subid1 = lp_subid1;
    } 
  }

});

$(window).on("load", function () {
 
  var range = $("#range").attr("value");
  $("#demo").html(range);
  $(".slide").css("width", "50%");
  $(document).on("input change", "#range", function (e) {
    $("#demo").html($(this).val());

    var slideWidth;

    if($(e.target).attr("data-val")=="dec"){
      slideWidth = (($(this).val()-48) * 100) /e.target.max;
    } 
    else{
      slideWidth = ($(this).val() * 100) /e.target.max;
    } 

    $(".slide").css("width", slideWidth + "%");
  });
});

  
const getGeo = async() => {
  $.ajax({
    url: "https://ipinfo.io?token=28226e67806240",
    success: function(location) {
      $('.city').html(location.region);
      console.log('location--',location);
      return location.region;
    }
  });
}

const con = getGeo();

  
  $(".solar-cost-data .btn-main").click(function () {
    $(".solar-cost-data .btn-main.active").removeClass("active"); // Just remove class from all folder
    $(this).addClass("active"); // add onto current
  });

  // ------------register-steps--------------
  $(document).ready(function ($) {
    $("#phone")
    .mask("(999)999-9999")
    .on("change", function() {
    
        var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
    
        if( last.length == 3 ) {
            var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
            var lastfour = move + last;
            var first = $(this).val().substr( 0, 9 ); // Change 9 to 8 if you prefer mask without space: (99)9999?9-9999
    
            $(this).val( first + '-' + lastfour );
        }
    })
    .change();


    //asdsad
    $(".nav-tabs > li a[title]").tooltip();
    //Wizard
    $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
      var $target = $(e.target);
      if ($target.hasClass("disabled")) {
        return false;
      }

      // handle with prgressbar
      var step = $(e.target).data("step");
      var percent = (parseFloat(step) / 7) * 100;
      percent = parseInt(percent);
      $(".wizard-persantage").html(percent + "%");
      $(".progress-bar").css({ width: percent + "%" });
      $(".progress-bar").text("Step " + step + " of 7");
      $(".wizard-persantage").blur(function () {
        var amt = parseFloat(this.value);
        $(this).val("$" + amt.toFixed(2));
      });
    });
  
    $('a[data-toggle="tab"]').on("show.bs.tab", function (e) {
      var $target = $(e.target);
      $target.parent().addClass("active");
    });
  
    $('a[data-toggle="tab"]').on("hide.bs.tab", function (e) {
      var $target = $(e.target);
      $target.parent().removeClass("active");
    });
  
    $(".picker .next-step").click(function () {
      $(this).parent().children().removeClass("active");
      $(this).addClass("active");
    });
  
    $(".next-step1").click(async function (e) {
      let checkBtnTrigger = e.currentTarget.hasAttribute('data-zip-btn')
      if(checkBtnTrigger){
        let Btn = document.querySelector('[data-zip-btn]');

        let zipCode = $('.zip_code').val();
        //Show Loader
        
        let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  
        const URL = "https://api.powersolarsavings.com/api/v1/power-solar/utility";
      
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({zip: zipCode}),
        };
      
        const response = await fetch(URL, options);
      
        const data = await response.json();

        if(!data.data){
          document.querySelector('[data-zip-error]').style.display = 'block'
          document.querySelector('[data-zip-error] + div').style.display = 'none'
          
          Btn.querySelector('.text').style.display = 'block';
          Btn.querySelector('.spinner-border').style.display = 'none'
        

          var $active = $(".wizard .nav-tabs li a.active");
          $active.parent().next().children().removeClass("disabled");
          $active.parent().addClass("done");
          nextTab($active);

          return;
        }

        let utilities = '';
        data.data.forEach(utility => {
          utilities += `<button class="selected step2 utilityProvider">
            <svg class="MuiSvgIcon-root MUIRadioIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </svg>
            <div>${utility.utility_name}</div>
        </button>
          `
        })

        utilities += `<button class="selected step2 utilityProvider">
            <svg class="MuiSvgIcon-root MUIRadioIcon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </svg>
            <div>Other</div>
        </button>`

        // document.querySelector('p[data-zip-error] + .wizard__main .row').innerHTML = utilities;
        document.querySelector('.byMguB .cwbftf').innerHTML = utilities;
      }

      if (document.querySelector(".utilityProvider")) {
        document.querySelectorAll(".utilityProvider").forEach((ele) => {
          ele.addEventListener("click", (e) => {
            let selectedOption = e.currentTarget.innerText;
            updateData(2, {'utility_provider': selectedOption});
            progressBar(2);
          });
        });
      }
    });
  
    $(".prev-step").click(function (e) {
      var $active = $(".wizard .nav-tabs li a.active");
      prevTab($active);
    });

  });
  
  function nextTab(elem) {
    $(".error-msg").hide();
    if($("#step5").hasClass('active')){
      var email = isValidEmail($('.emailInp').val());
      if(email == false){
        $('.emailInp_vemail').show()
        return false;
      }
    }
    if($("#step6").hasClass('active')){

      var len = {min:2};

      if($(".firstNameInp").val() == '' || $(".firstNameInp").val().length < len.min){
        $(".firstNameInp_errormsg").show();
        return false;
      }
      if($(".lastNameInp").val() == ''  || $(".lastNameInp").val().length < len.min){
        $(".lastNameInp_errormsg").show();
        return false;
      }
    }

    $(elem).parent().next().find('a[data-toggle="tab"]').click();
  }
  function prevTab(elem) {
    
    $(elem).parent().prev().find('a[data-toggle="tab"]').click();
  }
  $("#zipCode, #phoneNumber")
    .unbind("keyup change input paste")
    .bind("keyup change input paste", function (e) {
      var $this = $(this);
      var val = $this.val();
      var valLength = val.length;
      var maxCount = $this.attr("max");
      if (valLength > maxCount) {
        $this.val($this.val().substring(0, maxCount));
      }
    });
  

  var enteredAddress = '';
  var enteredCity = '';
  var enteredState = ''; 
  //code = 2k minified
  function initAutocomplete() {
    const autocompleteAddress = new google.maps.places.Autocomplete(
       (document.getElementById('pac-input')),
       {
          componentRestrictions: {country: "us"},
          fields: ["address_components", "geometry"],
          types: ["address"],
       }
    );

    google.maps.event.addListener(autocompleteAddress, 'place_changed', function () {
      let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      var place = autocompleteAddress.getPlace();

      var latitude = place.geometry.location.lat();
      var longitude = place.geometry.location.lng();
      var latlng = new google.maps.LatLng(latitude, longitude);
      var geocoder = geocoder = new google.maps.Geocoder();
      
      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        var address = results[0].formatted_address;
        // enteredAddress = results[0].formatted_address;
      });
      
      for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        const componentType = component.types[0];
    
        switch (componentType) {
          case "street_number":{
            enteredAddress = component.short_name;
            enteredAddress += " "
            break;
          }
          case "route": {
            enteredAddress += component.short_name;
            break;
          }

          case "locality": {
            enteredCity = component.short_name;
            break;
          }
          case "administrative_area_level_1": {
            enteredState = component.short_name;
            break;
          }
        }
      }
    });
  }

  window.initAutocomplete = initAutocomplete;
  
  function createAuto(i, elem) {
    var input = $(elem);
    var dropdown = input.closest(".dropdown");
    var listContainer = dropdown.find(".list-autocomplete");
    var listItems = listContainer.find(".dropdown-item");
    var hasNoResults = dropdown.find(".hasNoResults");
  
    listItems.hide();
    listItems.each(function () {
      $(this).data("value", $(this).text());
      //!important, keep this copy of the text outside of keyup/input function
    });
  
    input.on("input", function (e) {
      if ((e.keyCode ? e.keyCode : e.which) == 13) {
        $(this).closest(".dropdown").removeClass("open").removeClass("in");
        return; //if enter key, close dropdown and stop
      }
      if ((e.keyCode ? e.keyCode : e.which) == 9) {
        return; //if tab key, stop
      }
  
      var query = input.val().toLowerCase();
  
      if (query.length > 1) {
        // dropdown.addClass("open").addClass("in");
        listItems.each(function () {
          var text = $(this).data("value");
          if (text.toLowerCase().indexOf(query) > -1) {
            var textStart = text.toLowerCase().indexOf(query);
            var textEnd = textStart + query.length;
            var htmlR =
              text.substring(0, textStart) +
              "<em>" +
              text.substring(textStart, textEnd) +
              "</em>" +
              text.substring(textEnd + length);
            $(this).html(htmlR);
            $(this).show();
          } else {
            $(this).hide();
          }
        });
  
        var count = listItems.filter(":visible").length;
        count > 0 ? hasNoResults.hide() : hasNoResults.show();
      } else {
        listItems.hide();
        dropdown.removeClass("open").removeClass("in");
        hasNoResults.show();
      }
    });
  
    listItems.on("click", function (e) {
      var txt = $(this)
        .text()
        .replace(/^\s+|\s+$/g, ""); //remove leading and trailing whitespace
      input.val(txt);
  
      let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      getLocalStorage["address"] = txt.replace(/\s\s+/g, " ");
      localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
  
      dropdown.removeClass("open").removeClass("in");
    });
  }
  
  $(".jAuto").each(createAuto);
  
  $(document).on("focus", ".jAuto", function () {
    $(this).select(); // in case input text already exists
  });
  
  //========= validations ==========
  if(document.querySelector('#zipCodeForm')){
    document.querySelector('#zipCodeForm').addEventListener('submit', (e) => {
      e.preventDefault();
      let form = e.currentTarget;
      let formData = new FormData(form);

      if(formData.get('zip_code') == '' || formData.get('zip_code').length != 5){
        form.querySelector('span').innerText = 'Please Enter a Valid Zip Code';
        return ; 
      }else{
        form.querySelector('span').innerText = '';
      }

      let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      getLocalStorage["zip_code"] = formData.get('zip_code');
      localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));

      var trustedForm = $("#xxTrustedFormCertUrl_0").val();
      if (trustedForm) {
        let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
        getLocalStorage["trusted_form_cert_url"] = trustedForm;
        localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
      }
      
      var jornaya = $("#leadid_token").val();
      if (jornaya) {
        let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
        getLocalStorage["jornaya_lead_id"] = jornaya;
        localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
      }
      
      window.location.href = 'solar-wizard.html';
    })
  }

  if(document.querySelector('#phoneNumberForm')){
    document.querySelector('#phoneNumberForm').addEventListener('submit', (e) => {
      e.preventDefault();
      let form = e.currentTarget;
      let formData = new FormData(form);
      var trustedForm = $("#xxTrustedFormCertUrl_0").val();
    
      var jornaya = $("#leadid_token").val();
      
      var number = $('#phone').val();
      number = number.replace(/\D+/g, "");
      updateData(7, {'phone': number, 'trusted_form_cert_url': trustedForm, 'jornaya_lead_id': jornaya});
    })
  }

  if(document.querySelector('#pac-input')){
    document.querySelector('#pac-input').addEventListener('input', (e) => {
      let element = e.currentTarget;
      if(element.classList.contains('error')){
        element.classList.remove('error')
      }
    })
  }

  if(document.querySelector('#pac-input-form')){
    document.querySelector('#pac-input-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      let form = e.currentTarget;
      let formData = new FormData(form);

      if(formData.get('home_address') == ''){
        form.querySelector('input').classList.add('error');
        return ;
      }
    })
  }

  function handleInput(e){
    let elment = e.currentTarget.closest('div')
    elment.querySelector('span.error-msg').style.display = 'none'
  }

  function isNumberKey(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57))
          return false;
      return true;
  }

  function onlyNumberKey(evt) {      
    var currentInput = evt.target.value;
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    if (ASCIICode === 49 && currentInput.length <= 1) {
      return false;
    } else if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      return false;
    }
    return true;
  }

  function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }
  
  if (document.getElementById("zipCode")) {
    document.getElementById("zipCode").addEventListener("keyup", (e) => {
      let form = e.currentTarget.closest('form');
      form.querySelector('span').innerText = ''
      let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      getLocalStorage["zip_code"] = e.currentTarget.value;
      localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
    });
  }

  $(".step1").click(function(e){
    var range = $(".avgBillRange").val();
    if (range < 100) {
      monthly_bill = "Less than $100";
    } else if (range > 100 && range < 200) {
      monthly_bill = "From $100 to $200";
    } else if (range > 200 && range < 300) {
      monthly_bill = "From $200 to $300";
    } else {
      monthly_bill = "More than $300";
    }   
    
    updateData(1, {'monthly_bill': monthly_bill});
    progressBar(1);
  });

  $(".step3").click(function(e){
    if (!$(".pac-target-input").val()) {
      enteredAddress='';
      enteredCity='';
      enteredState='';
    }
    updateData(3, {'address': enteredAddress, 'city': enteredCity, 'state': enteredState});
    progressBar(3);
  });
  
  if (document.querySelector(".roofSunlight")) {
    document.querySelectorAll(".roofSunlight").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let selectedOption = e.currentTarget.querySelector("span").innerText;

        var roof_shade= selectedOption;
        
        if (roof_shade == 'Full Sunlight') {
          roof_shade_type = "Not shaded";
        } else if (roof_shade == 'Some Shade') {
          roof_shade_type = "Slightly shaded";
        } else if (roof_shade == 'Uncertain') {
          roof_shade_type = "Slightly shaded";
        } else if (roof_shade == 'Severe Shade') {
          roof_shade_type = "Completely shaded";
        }
        updateData(4, {'roof_shade': roof_shade_type});
        progressBar(4);
      });
    });
  }

  $(".step5").click(function(e){
    var email = $(".emailInp").val();
    updateData(5, {'email': email});
    progressBar(5);
  });
  

  $(".step6").click(function(e){
    var first_name = $(".firstNameInp").val();
    var last_name = $(".lastNameInp").val();
    updateData(6, {'first_name': first_name, 'last_name': last_name});
    progressBar(6);
  });

  $('*[class^="prev-step-"]').click(function(){
    $prevStep = $(this).data("prev-step");
    var stepNumber = Number($prevStep);
    $('#step'+stepNumber).show();
    $('.error_step_'+stepNumber).hide();
    stepNumber = stepNumber + 1;
    $('#step'+stepNumber).hide();
  });

  const updateData = (step, data) => {
    if (step == 7) {
      $('#loading').show();
    }
    $.ajax({
      type:'POST',
      url: '/update-data/'+step,
      data: data,
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      success: function (response) {
        var stepNumber = Number(response.step);
        if (stepNumber == 7) {
          return window.location.href = "/quote-report";
        }
        $('#step'+stepNumber).hide();
        stepNumber = stepNumber + 1;
        $('#step'+stepNumber).show();
        return true;
      },
      error: function (errorResponse) {
          if (step == 7) {
            $('#loading').hide();
          }
          $('.error_step_'+step).text(errorResponse.responseJSON.message);
          $('.error_step_'+step).show();
      }
    });
  }

  const progressBar = (step) => {   
    var percent = (parseFloat(step) / 7) * 100;
    percent = parseInt(percent);
    $(".wizard-persantage").html(percent + "%");
    $(".progress-bar").css({ width: percent + "%" });
    $(".progress-bar").text("Step " + step + " of 7");
    $(".wizard-persantage").blur(function () {
      var amt = parseFloat(this.value);
      $(this).val("$" + amt.toFixed(2));
    });
  }

  if (document.getElementById("successBtn")) {
    document.getElementById("successBtn").addEventListener("click", onSubmitData);
  }

  if(document.querySelector('#speciallink')){
    document.querySelector('#speciallink').addEventListener('click', (e) => {
      e.preventDefault();

      let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));

      let obj = {
        firstname: getLocalStorage.first_name,
        lastname: getLocalStorage.last_name,
        email: getLocalStorage.email,
        phone: getLocalStorage.phone,
        address: getLocalStorage.address.replaceAll(' ', '+'),
        zipcode: getLocalStorage.zipCode
      }
      let queryString = ''
      for (key in obj){
        queryString += `${key}=${obj[key]}`
        if(key != 'zipcode'){
          queryString += '&'
        }
      }

      let a = document.createElement('a');
      a.setAttribute('href', `https://secure.rspcdn.com/xprr/red/PID/12032/SID/sid_here?${queryString}`)
      a.setAttribute('target', '_blank');

      a.click();
      console.log(queryString);
    })
  }
  

  $(".qualify-text").click(function(){
    $(".hidden-text").toggle(100);
  });

  $(document).ready(function() {

    var urlParams = new URLSearchParams(window.location.search);
    var scrollToSection = urlParams.get('scroll_to');
    
    if (scrollToSection) {
      var targetElement = $('#' + scrollToSection);
      
      if (targetElement.length) {
        var targetOffset = targetElement.offset().top;
        $('html, body').animate(
          {
            scrollTop: targetOffset 
          },
          1000
        );
      }
    }
  });


  var queryString = window.location.search;

  // Parse the query string into an object
  var queryParams = {};
  if (queryString) {
      queryString = queryString.substring(1); // Remove the leading '?'
      var pairs = queryString.split('&');
      pairs.forEach(function(pair) {
          var parts = pair.split('=');
          var key = decodeURIComponent(parts[0]);
          var value = decodeURIComponent(parts[1] || '');
          
          // Replace '+' with space in the parameter value
          value = value.replace(/\+/g, ' ');
  
          console.log(value);
          queryParams[key] = value;
      });
  }
  
  console.log(queryParams.headline);
  var mainHeandingpre = queryParams.headline.replace(/"/g, '');
  var mainHeanding = mainHeandingpre + "?"
   $('.main-heading').text(mainHeanding);
  
  
  
  
  
  
  
