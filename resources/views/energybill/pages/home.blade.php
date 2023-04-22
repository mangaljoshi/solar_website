@extends('energybill.layouts.base')

@section('style')
    <link href="{{ asset('energybill/css/c-wizard.css') }}" rel="stylesheet">
@endsection

@section('content')
<div id="root">
         <div class="qpmywg-4 jsEGxl">
            <div class="qpmywg-3 WnJYq"><img src="{{ asset('energybill/images/us-flag.svg') }}" alt=""/></div>
            <div class="qpmywg-0 cusrAz">
               <div class="qpmywg-7 jeVraF">
                  <div class="qpmywg-1 kWNlXB"> 
                    @include('energybill.partials.header_home')
                  </div>
               </div>
            </div>
            <div class="qpmywg-7 jeVraF">
               <div class="MuiGrid-root MuiGrid-container MuiGrid-align-items-xs-flex-start MuiGrid-justify-content-xs-center">
                  <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-lg-6 MuiGrid-grid-xl-7">
                     <div class="fu7ycq-0 eNUsAC">
                        <div class="fu7ycq-1 iUWgez">
                           <h1 class="fu7ycq-2 bMYtbr">
                              <span class="city"> </span> </br> Residents Own Your Power By Going Solar
                           </h1>
                           <h1 class="fu7ycq-3 ieziWX">
                              Enter basic home information to see if you quality!
                           </h1>
                        </div>
                     </div>
                  </div>
                  <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-lg-6 MuiGrid-grid-xl-5">
                     <div class="qpmywg-5 jyhrBC">
                        <div class="qpmywg-6 SWfUG"><img src="{{ asset('energybill/images/stars.svg') }}" alt=""/></div>
                        <div id="lead" class="sc-1mfr99g-0 jTfmBgA">
                           <div class="sc-1f6gucm-0 bepWUU">
                              <form method="post" action="{{ route('energy.zip.post') }}">
                                 {{ csrf_field() }}
                                 <div class="sc-1f6gucm-3 iHrnEv">
                                    <div class="sc-1f6gucm-4 bgRNrx">
                                       <img src="{{ asset('energybill/images/star.svg') }}" alt=""/>
                                       <p><span>FREE</span> Expert Solar Quote</p>
                                       <img src="{{ asset('energybill/images/star.svg') }}" alt=""/>
                                    </div>
                                 </div>
                                 <div class="sc-1f6gucm-2 ixxZa">
                                    <h2>See if you qualify for incentives in your area and get solar with zero upfront costs!</h2>
                                 </div>
                                 <div class="step">
                                    <div class="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
                                       <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl">
                                          <input type="tel" aria-invalid="false" autoComplete="off" autofocus="" id="zipCode" name="zip_code" placeholder="Enter Zip Code" maxLength="5" class="MuiInputBase-input MuiOutlinedInput-input" size="5" onkeypress="return isNumberKey(event)"/>
                                          <fieldset aria-hidden="true" class="jss1 MuiOutlinedInput-notchedOutline">
                                             <legend class="jss3"><span>Zip Code</span></legend>
                                          </fieldset>
                                       </div>
                                    </div>
                                    
                                 </div>

                                 <button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeLarge MuiButton-sizeLarge" tabindex="0" type="submit" style="background-color:#E11C1C;font-weight:bold">
                                    <span class="MuiButton-label">FREE QUOTE</span>
                                 </button>
                                 @if ($errors->any())
                                    <span style="color: white;display: block; text-align: left; font-weight: 700; margin: 0 auto; max-width: 560px;">
                                       Please Enter a Valid Zip Code
                                    </span>
                                 @endif
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="sc-1xt41li-1 lhbSTG">
               <div class="sc-1xt41li-0 bouawQ"></div>
               <footer class="sc-1xt41li-2 eYHupb">
                  <span>
                     <p>© 2023 Power Solar All Rights Reserved.</p>
                  </span>
                  <a href="{{ route('energy.contact') }}">Contact Us</a>
                  <a href="{{ route('energy.privacy') }}">Privacy Policy</a>
                  <a href="{{ route('energy.terms') }}" target="_blank">Terms of Use</a>
               </footer>
            </div>
         </div>
      </div>

  
@endsection