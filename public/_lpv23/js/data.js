var enteredAddress = '';
var enteredCity = '';
var enteredState = ''; 
var zipCode = '';
var phone = document.getElementById('phone');

//code = 2k minified
function initAutocomplete() {
  const autocompleteAddress = new google.maps.places.Autocomplete(
     (document.getElementById('address-radar')),
     {
        componentRestrictions: {country: "us"},
        fields: ["address_component", "adr_address", "alt_id", "formatted_address", "geometry", "name"],
        types: ["address"],
     }
  );

  google.maps.event.addListener(autocompleteAddress, 'place_changed', function () {
    var place = autocompleteAddress.getPlace();
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    var latlng = new google.maps.LatLng(latitude, longitude);
    var geocoder = geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      var address = results[0].formatted_address;
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
        case "postal_code": {
            zipCode = component.short_name;
            $("#pii_zipcode").val(zipCode);
            break;
        }
      }
    }
  });
  
}


window.initAutocomplete = initAutocomplete;





$(document).ready(function ($) {
    $("#phone")
    .mask("(999) 999-9999")
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
});


function onlyNumberKey(evt) {      

    var currentInput = evt.target.value;

    currentInput = currentInput.replace(/[&\/\\#,_+()$~%.'":*?<>{}-]/g, '');
    currentInput = currentInput.replace(/\s/g, '');
    if (evt.key == '1' && currentInput.length < 1) {
        evt.preventDefault()     
        alert('Invalid US Number. Should not start with 1');
        return true;
    }
    return true;
  }

  let oneWordRegex = /^\S+$/;

  $(".next-step").click(function (e) {
    e.preventDefault();

    let step = $(this).data("step");
    if (step == 1) {
        let zip_code = $('input[name="zip_code"]').val();
        console.log(zip_code);
        updateData(step, { zip_code: zip_code });
        autoScroll();
    } else if (step == 2) {
        let project_type = $(this).data("project_type");
        console.log(project_type);
        updateData(step, { project_type: project_type });
        autoScroll();
    } else if (step == 3) {
        let time_frame = $(this).data("time_frame");
        console.log(time_frame);
        updateData(step, { time_frame: time_frame });
        autoScroll();
    } else if (step == 4) {
        let home_owner = $(this).data("home_owner");
        console.log(home_owner);
        updateData(step, { home_owner: home_owner });
        autoScroll();
    } else if (step == 5) {
        let first_name = $('input[name="first_name"]').val();
          if(first_name.length < 2){
            $(".step_error_5").text("First name must be at least 2 characters");
            $(".step_error_5").show();
            return false;
          }
          if (!oneWordRegex.test(first_name)) {
            $(".step_error_5").text("First name should not contain spaces");
            $(".step_error_5").show();
            return false;
          } 
        updateData(step, { first_name: first_name });
        autoScroll();
    } else if (step == 6) {
        let last_name = $('input[name="last_name"]').val();
        if(last_name.length < 2){
          $(".step_error_6").text("last name must be at least 2 characters");
          $(".step_error_6").show();
          return false;
        }
        updateData(step, { last_name: last_name });
        autoScroll();
    } else if (step == 7) {
        updateData(step, {
            address: enteredAddress,
            city: enteredCity,
            state: enteredState,
        });
        autoScroll();
    } else if (step == 8) {
        let email = $('input[name="email"]').val();
        console.log(email);
        updateData(step, { email: email });
        autoScroll();
    } else if (step == 9) {
        let number = $('input[name="phone"]').val();
        phone_number = number.replace(/\D/g, "");
        var trustedForm = $("#xxTrustedFormCertUrl_0").val();
        var jornaya = $("#leadid_token").val();
        $("#loading").show();

        updateData(step, {
            phone: phone_number,
            trusted_form_cert_url: trustedForm,
            jornaya_leadid: jornaya,
        });
        autoScroll();
    }
});



function goNext(step) {
  console.log(step);
  $(".step-" + step).hide("step_active");
  progressBar(step);
  step++;

  if (step > 1) {
    $(".status-indicator").css("display", "block");
      $(".title_VRTut_h2").show();
      $(".title_VRTut_h3").show();
      $(".FormSteps_progress__YPWkn").show();
      $(".FormStep_tcpa__Y7q13").hide();
  } else {
      $(".title_VRTut_h2").hide();
      $(".title_VRTut_h3").hide();
      $(".FormSteps_progress__YPWkn").hide();
      $(".FormStep_tcpa__Y7q13").show();
  }
  $(".step-" + step).show("step_active");
  $(".form-error-message").hide();
}

$(".colback").on("click", function () {
  // alert("this is working");
  let step = $(this).data("step");
  console.log("step-->", step);
  if (step == 1) {
      return false;
  }
  $(".step-" + step).hide("step_active");
  progressBar(step);
  step--;

  if (step < 9) {
    // console.log("this is for step 9", step)
    $(".title_VRTut_h2").show();
    $(".title_VRTut_h3").show();
    $(".FormSteps_progress__YPWkn").show();
    $(".FormStep_tcpa__Y7q13").hide();
} else {
    $(".title_VRTut_h2").hide();
    $(".title_VRTut_h3").hide();
    $(".FormSteps_progress__YPWkn").hide();
    $(".FormStep_tcpa__Y7q13").show();
}
  $(".step-" + step).show("step_active");
  $("#slidenum").html(step);
  $(".form-error-message").hide();
});

$("#close-hero").on("click", function () {
  $("#hero_section").show(300);
  $("#hero_form").hide(300);

  var step = $(".step_active").data("step");
  $(".step-" + step).removeClass("step_active");
  $("body").removeClass("no-scroll");
});

function progressBar(step) {
    var data = Math.floor(100/9 * step);
    $(".progress-bar").css("width", data+'%');
}

const upsellSubmitA = () => {
  $('#loading').show();
}

function updateData(step, data) {
    var responseResult = false;
        $.ajax({
            type:'POST',
            url: '/update-data-lpv23/'+step,
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
            
              var stepNumber = Number(response.step);
              var success = response.success;
              
               if (step == 9) {
                if(success== false){
                  $('#loading').hide();
                  $('.step_error_'+stepNumber).text(response.message);
                  $('.step_error_'+stepNumber).show();
                  return true;
                   }
                   return window.location.href = "/lpv23/second-service";
                }
                goNext(step);
                responseResult = true;
            },
            error: function (errorResponse) {
                $('.step_error_'+step).text(errorResponse.responseJSON.message);
                $('.step_error_'+step).show();
                $('#loading').hide();

            }
        });
    
        return responseResult;
}

// --------------------Script for old cross sell----------------------------//

      // $(".next-url").click(function(){
      //   let zipVal = $('#zip').val();
      
      //     if(zipVal != ""){
      //     setTimeout( function(){
      //       window.location.href="https://homeownersavings.roofingquoteadvisors.com/";
        
      //   }, 100);
      //     }else{
      //     $(".text-danger").text("please enter zip code");
      //     }
          
      // })
 
   
    
const getGeo = async() => {
    $.ajax({
      url: "https://ipinfo.io?token=28226e67806240",
      success: function(location) {
        console.log(location.region);
        $('.city').html(location.region);
        return location.region;
      }
    });
  }
  
  const con = getGeo();
  
  function autoScroll() {
    $('html,body').scrollTop(0);
  }
  


      // ///////////////

$(document).ready(function() {

const params = new URLSearchParams(window.location.search);
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
        queryParams[key] = value;
    });
}

var mainHeanding = queryParams.headline.replace(/"/g, '');
console.log(mainHeanding)
 $('.main-heading').text(mainHeanding);

});


// -------------------RangeSlider-------------------
const
range = document.getElementById('range'),
tooltip = document.getElementById('tooltip'),
setValue = ()=>{
    const
        newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
        newPosition = 16 - (newValue * 0.32);
    tooltip.innerHTML = `<span>${range.value}</span>`;
    tooltip.style.left = `calc(${newValue}% + (${newPosition}px))`;
    document.documentElement.style.setProperty("--range-progress", `calc(${newValue}% + (${newPosition}px))`);
};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);