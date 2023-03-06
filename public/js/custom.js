// localStorage.clear();

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


  console.log('dataObj---',dataObj);

  // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));

  // if (!getLocalStorage) {
  //     localStorage.setItem("solar-data", JSON.stringify(data));
  // }

  getIP();

  function getIP() {
    var range = $(".avgBillRange").val();
    if (range) {
      // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      var monthly_bill= range;
      // getLocalStorage["monthly_bill"] = range;
      if (monthly_bill < 100) {
        // getLocalStorage["monthly_bill"] = "Less than $100";
        dataObj.monthly_bill = "Less than $100";
      } else if (monthly_bill > 100 && monthly_bill < 200) {
        dataObj.monthly_bill = "From $100 to $200";
      } else if (monthly_bill > 200 && monthly_bill < 300) {
        dataObj.monthly_bill = "From $200 to $300";
      } else {
        dataObj.monthly_bill = "More than $300";
      }
      // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
    }

    var url = new URL(window.location.href);
    var lp_subid1 = url.searchParams.get("lp_subid1");
    if (lp_subid1) {
      dataObj.lp_subid1 = lp_subid1;
      // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      // getLocalStorage["lp_subid1"] = lp_subid1;
      // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
    } 

    // $.getJSON("https://api.ipify.org?format=json", function(data) {
    //   let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
    //   getLocalStorage["ip_address"] = data.ip;
    //   localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
    //   return data.ip;
    // }); 
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
    // google.maps.event.addDomListener(window, 'load', initialize);
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
      // percent = percent.toFixed(2)
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
        // Btn.querySelector('.text').style.display = 'none';
        // Btn.querySelector('.spinner-border').style.display = 'inline-block'
        
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
          utilities += `<div class="col-sm-6 col-12">
              <div class="form-group">
                <a href="javascript:void(0);" class="btn-main step2 w-100 utilityProvider">${utility.utility_name}</a>
              </div>
          </div>`
        })

        utilities += `<div class="col-sm-6 col-12">
            <div class="form-group">
              <a href="javascript:void(0);" class="btn-main step2 w-100 utilityProvider">Other</a>
            </div>
        </div>`

        document.querySelector('p[data-zip-error] + .wizard__main .row').innerHTML = utilities;

        // var $active = $(".wizard .nav-tabs li a.active");
        // $active.parent().next().children().removeClass("disabled");
        // $active.parent().addClass("done");
        // nextTab($active);

        // $(".next-step").click(async function (e) {
        //   var $active = $(".wizard .nav-tabs li a.active");
        //   $active.parent().next().children().removeClass("disabled");
        //   $active.parent().addClass("done");
        //   nextTab($active);
        // })

      }
      // else{
      //   var $active = $(".wizard .nav-tabs li a.active");
      //   $active.parent().next().children().removeClass("disabled");
      //   $active.parent().addClass("done");
      //   nextTab($active);
      // }

      if (document.querySelector(".utilityProvider")) {
        document.querySelectorAll(".utilityProvider").forEach((ele) => {
          ele.addEventListener("click", (e) => {
            let selectedOption = e.currentTarget.innerText;
            console.log('selectedOption--jj-',selectedOption);
            // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
            // getLocalStorage["utility_provider"] = selectedOption;
            // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));

            updateData(2, {'utility_provider': selectedOption});
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
        enteredAddress = results[0].formatted_address;
        // getLocalStorage["address"] = address;
        // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
        // updateData(3, {'address': address});
      });
      
      for (const component of place.address_components) {
        // @ts-ignore remove once typings fixed
        const componentType = component.types[0];
    
        switch (componentType) {
          case "locality": {
            // getLocalStorage["city"] = component.short_name;
            // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
            // updateData(3, {'city': component.short_name});
            enteredCity = component.short_name;
            break;
          }
          case "administrative_area_level_1": {
            // getLocalStorage["state"] = component.short_name;
            // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
            // updateData(3, {'state': component.short_name});
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
      // if (trustedForm) {
      //   let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      //   getLocalStorage["trusted_form_cert_url"] = trustedForm;
      //   localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
      // }
      
      var jornaya = $("#leadid_token").val();
      // if (jornaya) {
      //   let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      //   getLocalStorage["jornaya_lead_id"] = jornaya;
      //   localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
      // }
      // console.log('here--indie');
      // if(formData.get('phone') == '' || formData.get('phone').length < 13 || formData.get('phone').length > 14){
      //   console.log('here--indie-if');
      //   $(".phoneNumber_errormsg").text('Please Enter a Valid US Phone Number');
      //   return ; 
      // }else{
        var number = formData.get('phone');
        number = number.replace(/\D+/g, "");
        updateData(7, {'phone': number, 'trusted_form_cert_url': trustedForm, 'jornaya_lead_id': jornaya});
        
        // window.location.href = "/quote-report";
      // }
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

      // form.querySelector('a.next-step').click();
    })
  }

  function handleInput(e){
    let elment = e.currentTarget.closest('div')
    // console.log(elment.querySelector('span.error-msg'));
    elment.querySelector('span.error-msg').style.display = 'none'
    // elment.style.display = 'none';
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

  //============= validations =================
  
  // if (document.querySelector(".homeSqFootRange")) {
  //   document.querySelector(".homeSqFootRange").addEventListener("input", (e) => {
  //     let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  //     getLocalStorage["homeSqFoot"] = e.currentTarget.value;
  //     localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
  //   });
  // }
  
  if (document.getElementById("zipCode")) {
    document.getElementById("zipCode").addEventListener("keyup", (e) => {
      let form = e.currentTarget.closest('form');
      form.querySelector('span').innerText = ''
      let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
      getLocalStorage["zip_code"] = e.currentTarget.value;
      localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
    });
  }
  
  // if (document.querySelector(".avgBillRange")) {
  //   document.querySelector(".avgBillRange").addEventListener("input", (e) => {
  //     // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  //     // var monthly_bill= e.currentTarget.value;
  //     // if (monthly_bill < 100) {
  //     //   monthly_bill = "Less than $100";
  //     // } else if (monthly_bill > 100 && monthly_bill < 200) {
  //     //   monthly_bill = "From $100 to $200";
  //     // } else if (monthly_bill > 200 && monthly_bill < 300) {
  //     //   monthly_bill = "From $200 to $300";
  //     // } else {
  //     //   monthly_bill = "More than $300";
  //     // }   
     
  //   });
  // }

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
  });

  $(".step3").click(function(e){
    if (!$(".pac-target-input").val()) {
      enteredAddress='';
      enteredCity='';
      enteredState='';
    }
    updateData(3, {'address': enteredAddress, 'city': enteredCity, 'state': enteredState});
  });
  
  if (document.querySelector(".utilityProvider")) {
    document.querySelectorAll(".utilityProvider").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let selectedOption = e.currentTarget.innerText;
        // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
        // getLocalStorage["utility_provider"] = selectedOption;
        // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
      });
    });
  }
  
  if (document.querySelector(".roofSunlight")) {
    document.querySelectorAll(".roofSunlight").forEach((ele) => {
      ele.addEventListener("click", (e) => {
        let selectedOption = e.currentTarget.querySelector("h3").innerText;
        // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));

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
        // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
      });
    });
  }
  
  // if (document.querySelector(".emailInp")) {
  //   document.querySelector(".emailInp").addEventListener("keyup", (e) => {
  //     // let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  //     // getLocalStorage["email"] = e.currentTarget.value;
  //     // localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));

  //     // updateData(5, {'email': e.currentTarget.value});
  //   });
  // }

  $(".step5").click(function(e){
    var email = $(".emailInp").val();
    updateData(5, {'email': email});
  });
  
  // if (document.querySelector(".firstNameInp")) {
  //   document.querySelector(".firstNameInp").addEventListener("keyup", (e) => {
  //     let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  //     getLocalStorage["first_name"] = e.currentTarget.value;
  //     localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
  //   });
  // }
  
  // if (document.querySelector(".lastNameInp")) {
  //   document.querySelector(".lastNameInp").addEventListener("keyup", (e) => {
  //     let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  //     getLocalStorage["last_name"] = e.currentTarget.value;
  //     localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
  //   });
  // }

  $(".step6").click(function(e){
    var first_name = $(".firstNameInp").val();
    var last_name = $(".lastNameInp").val();
    updateData(6, {'first_name': first_name, 'last_name': last_name});
  });
  
  // $(".step7").click(function(e){
  //   var number = $(".phone").val();
  //   number = number.replace(/\D+/g, "");
  //   updateData(7, {'phone': number});
  // });

  // if (document.getElementById("phone")) {
  //   document.getElementById("phone").addEventListener("keyup", (e) => {
  //     let number = e.currentTarget.value;
  //     number = number.replace(/\D+/g, "");
  //     let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
  //     getLocalStorage["phone"] = number;
  //     localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
  //   });
  // }

  $('*[class^="prev-step-"]').click(function(){
    $prevStep = $(this).data("prev-step");
    var stepNumber = Number($prevStep);
    $('#step'+stepNumber).show();
    $('.error_step_'+stepNumber).hide();
    stepNumber = stepNumber + 1;
    $('#step'+stepNumber).hide();
  });
  
  // const onSubmitData = async () => {
  //   let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));
    
  //   $('#loading').show();

  //   if (await validateJsonData()) {
  //     alert("Something is wrong while submitting the data. Please try to submit the details again. Thankyou!");
  //     return window.location.reload();
  //   } else {
  //     let obj = {
  //       lp_campaign_id: getLocalStorage.lp_campaign_id,
  //       lp_campaign_key: getLocalStorage.lp_campaign_key,
  //       first_name: getLocalStorage.first_name,
  //       last_name: getLocalStorage.last_name,
  //       phone: getLocalStorage.phone,
  //       address: getLocalStorage.address,
  //       city: getLocalStorage.city,
  //       state: getLocalStorage.state,
  //       zip_code: getLocalStorage.zip_code,
  //       email: getLocalStorage.email,
  //       monthly_bill: getLocalStorage.monthly_bill,
  //       ip_address: getLocalStorage.ip_address,
  //       roof_shade: getLocalStorage.roof_shade,
  //       homeowner: getLocalStorage.homeowner,
  //       landing_page: getLocalStorage.landing_page,
  //       user_agent: getLocalStorage.user_agent,
  //       tcpa_text: getLocalStorage.tcpa_text,
  //       time_frame: getLocalStorage.time_frame,
  //       utility_provider: getLocalStorage.utility_provider,
  //       jornaya_lead_id: getLocalStorage.jornaya_lead_id,
  //       trusted_form_cert_url: getLocalStorage.trusted_form_cert_url
  //     }
  
  //     localStorage.setItem("solar-data", JSON.stringify(getLocalStorage));
  //     const URL = `https://api.leadprosper.io/ingest`;
      
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(getLocalStorage),
  //     };
    
  //     const response = await fetch(URL, options);
    
  //     const data = await response.json();
  
  //     if (data && data.status) {
  //       // localStorage.clear();
  //       window.location.href = "quote-report.html";
  //     }
  //   }
  // };
  
  // const validateJsonData = async() => {
  //   let getLocalStorage = JSON.parse(localStorage.getItem("solar-data"));

  //   if (getLocalStorage.ip_address == null || getLocalStorage.address == null || getLocalStorage.state == null || getLocalStorage.first_name == null || getLocalStorage.last_name == null || getLocalStorage.email == null || getLocalStorage.roof_shade == null ||  getLocalStorage.phone.length < 10) {
  //     return true;
  //   }
  //   return false;
  // }

  const updateData = (step, data) => {
    if (step == 7) {
      $('#loading').show();
    }
    $.ajax({
      type:'POST',
      url: 'update-data/'+step,
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
          console.log(errorResponse.responseJSON.errors);
      }
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
      // console.log(obj);
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