@extends('lpv23.layouts.base')


@section('style')
<link rel="stylesheet" href="{{ asset('_lpv23/css/swiper-bundle.min.css') }}" />
<link rel="stylesheet" href="{{ asset('_lpv23/css/common.css') }}" />

@endsection

@section('content')
<div class="content-wrapper">

@include('lpv23.partials.headers.mainHeader')
@include('lpv23.pages.form')

<div id="content-part">
  <section class="s-py-half hide-in-mobile">
    <div class="container text-center">
      <div class="title">
        <h2>Get Your Free Solar Cost <span>+Savings Report</span></h2>
        <h5>Includes incentives in your state.</h5>
      </div>
    </div>
  </section>
  <section class="s-py-half light-gradient hide-in-mobile">
    <div class="container">
      <div class="row space-between statistics-row">
        <div class="block government-incentives"
          style="background-image:url({{asset('_lpv23/images/solar-pole.png')}});">
          <div class="inner">
            <h4>Government Incentives</h4>
            <p>26% Federal Tax Credit</p>
            <span class="number">$17,727</span>
          </div>
        </div>
        <div class="block net-profit"
          style="background-image:url({{asset('_lpv23/images/net-profit-bg.png')}});">
          <div class="inner">
            <h4>Net Profit Over 10 Years</h4>
            <ul class="table">
              <li>
                <span class="label">Power Generated in 10 Years</span>
                <span class="value">$52,827</span>
              </li>
              <li>
                <span class="label">Increased Home Value</span>
                <span class="value">$95,492</span>
              </li>
              <li>
                <span class="label">Loan Interest Paid</span>
                <span class="value">-$10,049</span>
              </li>
              <li>
                <span class="label">Loan Principal Paid</span>
                <span class="value">-$22,301</span>
              </li>
              <li class="footer">
                <span class="label">Profit</span>
                <span class="value">$20,744</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="report-example text-center">
        <h4>Partial Report Example (You Will Receive a Full Solar Report).
        </h4>
        <ul class="row space-between report-list">
          <li>
            <div class="icon"><img loading="lazy" height="40" width="40"
                src="{{asset('_lpv23/images/save-icon.svg')}}" alt=""></div>
            <div class="content">
              <h6>Save You</h6>
              <span class="number">$2,074</span>
              <p>An average per year</p>
            </div>
          </li>
          <li>
            <div class="icon"><img loading="lazy" height="40" width="40"
                src="{{asset('_lpv23/images/reduce-co2-emissions.svg')}}" alt=""></div>
            <div class="content">
              <h6>Reduces CO2 Emissions</h6>
              <span class="number">16.2</span>
              <p>Metric tones per year</p>
            </div>
          </li>
          <li>
            <div class="icon"><img loading="lazy" height="40" width="40"
                src="{{asset('_lpv23/images/planting-icon.svg')}}" alt=""></div>
            <div class="content">
              <h6>Equivalent to planting</h6>
              <span class="number">1,173</span>
              <p>Trees per year</p>
            </div>
          </li>
          <li>
            <div class="icon"><img loading="lazy" height="40" width="40"
                src="{{asset('_lpv23/images/equivalent-driving-icon.svg')}}" alt=""></div>
            <div class="content">
              <h6>Equivalent to Driving</h6>
              <span class="number">40,180mi</span>
              <p>Less per year</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section class="s-py-half">
    <div class="container">
      <div class="row space-between align-center cost-section">
        <div class="content">
          <h2>The Cost of Solar Panels in 2021</h2>
          <p>With the cost of solar panels dropping every year, there’s
            never been a better time to go solar. Due to new government
            incentives, many homeowners are taking advantage of these
            opportunities. A solar panel installation ranges in cost
            depending on many factors, including your state, equipment
            brand, and energy usage. That all brings us to a key question:
            how much do solar panels cost? Use our FREE Solar Calculator to
            calculate the cost of Solar in your area.</p>
        </div>
        <div class="form-block">
          <ul class="form-list">
            <li class="full">
              <button class="button w-100" id="cta2">Get Free Solar
                Report</button>
            </li>
          </ul>
          <p class="msg"><i class="icon"></i>Get Your Free Solar Cost
            +Savings Report</p>
        </div>
      </div>
      <hr>
      <div class="how-it-works-section">
        <div class="title text-center mx-auto">
          <h2>How Solar Panels Work?</h2>
          <p>Solar power works by converting light from the sun into
            electricity. This electricity can then be used in your home or
            exported to the grid when it’s not needed. This is done by
            installing solar panels on your roof which generate DC (Direct
            Current) electricity. This is then fed into a solar inverter
            which converts the DC electricity from your solar panels into AC
            (Alternating Current) electricity.</p>
        </div>
        <ol class="how-it-works">
          <li>
            <h5>Solar Panels</h5>
            <img loading="lazy" height="200" width="200"
              src="{{asset('_lpv23/images/solar-panels.webp')}}" alt="">
          </li>
          <li>
            <h5>Inverter</h5>
            <img loading="lazy" height="200" width="200"
              src="{{asset('_lpv23/images/inverter.webp')}}" alt="">
          </li>
          <li>
            <h5>Switch Board</h5>
            <img loading="lazy" height="200" width="200"
              src="{{asset('_lpv23/images/switch-board.webp')}}" alt="">
          </li>
          <li>
            <h5>Utility Meter</h5>
            <img loading="lazy" height="200" width="200"
              src="{{asset('_lpv23/images/utility-meter.webp')}}" alt="">
          </li>
          <li>
            <h5>Grid</h5>
            <img loading="lazy" height="200" width="200"
              src="{{asset('_lpv23/images/grid.webp')}}" alt="">
          </li>
        </ol>
        <div class="row space-between align-center solar-info">
          <div class="img"><img loading="lazy" height="550" width="590"
              src="{{asset('_lpv23/images/solar-plate.webp')}}" alt=""></div>
          <div class="content">
            <ol class="numbr-list">
              <li>Your solar panels are made up of silicon photovoltaic (PV)
                cells. When sunlight hits your solar panels, the solar PV
                cells absorb the sunlight’s rays and electricity is produced
                via the Photovoltaic Effect. The electricity produced by
                your panels is called Direct Current (DC) electricity, and
                which is not suitable to be used in your home by your
                appliances. Instead, the DC electricity is directed to your
                central inverter (or micro inverter, depending on your
                system setup).</li>
              <li>Your inverter is able to convert the DC electricity into
                Alternating Current (AC) electricity, which can be used in
                your home. From here, the AC electricity is directed to your
                switchboard.</li>
              <li>A switchboard allows your usable AC electricity to be sent
                to the appliances in your home. Your switchboard will always
                ensure that your solar energy will be used first to power
                your home, only accessing additional energy from the grid
                when your solar production is not enough.</li>
              <li>All households with solar are required to have a
                bi-directional meter (utility meter), which your electricity
                retailer will install for you. A bi-directional meter is
                able to record all the power that is drawn to the house but
                also record the amount of solar energy that is exported back
                to the grid. This is called net-metering.</li>
              <li>Any unused solar electricity is then sent back to the
                grid. Exporting solar power back to the grid will earn you a
                credit on your electricity bill, called a feed-in tariff
                (FiT). Your electricity bills will then take into account
                the electricity you purchase from the grid, plus credits for
                the electricity generated by your solar power system that
                you don’t use.</li>
            </ol>
            <p>With solar power, you don’t need to switch it on in the
              morning or switch it off at night – the system will do this
              seamlessly and automatically. You also don’t need to switch
              between solar power and the grid, as your solar system can
              determine when is best to do so based on the amount of energy
              being consumed in your home. In fact, a solar system requires
              very little maintenance (as there are no moving parts) which
              means you’ll hardly know it’s there. This also means a good
              quality solar power system will last a long time.</p>
          </div>
        </div>
        <div class="row align-center benefits-section">
          <div class="img"><img loading="lazy" height="400" width="570"
              src="{{asset('_lpv23/images/solar-plant.webp')}}" alt=""></div>
          <div class="content">
            <h2>The Benefits of Going Solar</h2>
            <p>The premier advantage of the solar power system lies in its
              versatile adaptability, giving you instant access to renewable
              solar power. You no longer need an expensive, clunky system to
              enjoy the benefits of this green energy. It is now
              effortlessly accessible through multiple paneling
              technologies, and a host of independent, solar-powered
              products like solar lighting equipment, chargers and power
              banks, solar windows and blinds, portable solar power systems
              for camping and boating, etc.</p>
            <p>Annual growth of 49%, thanks to solar-friendly government
              policies, rising demand, and falling prices of solar power
              systems. In fact, prices have fallen by 40% in the majority of
              American states!</p>
            <p>Today, almost any American can tap into the vast benefits of
              a solar power system, in any place, in various ways!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="light-gradient solar-cost">
    <img loading="lazy" class="bg-img"
      src="{{asset('_lpv23/images/solar-plan-on-home.webp')}}">
    <div class="container">
      <div class="inner">
        <div class="title">
          <h2>See Solar Cost & Savings for <br><span
              id="cost-saving-state"></span></h2>
          <h5>Select your approximate home square footage.</h5>
        </div>
        <ul class="radio-list">
          <li class="radio-style-button">
            <input type="radio" id="1000-sq.ft" name="vehicleYear">
            <label for="1000-sq.ft">1000 sq.ft</label>
          </li>
          <li class="radio-style-button">
            <input type="radio" id="1500-sq.ft" name="vehicleYear">
            <label for="1500-sq.ft">1500 sq.ft</label>
          </li>
          <li class="radio-style-button">
            <input type="radio" id="2000-sq.ft" name="vehicleYear">
            <label for="2000-sq.ft">2000 sq.ft</label>
          </li>
          <li class="radio-style-button">
            <input type="radio" id="2500-sq.ft" name="vehicleYear">
            <label for="2500-sq.ft">2500 sq.ft</label>
          </li>
          <li class="radio-style-button">
            <input type="radio" id="3000-sq.ft" name="vehicleYear">
            <label for="3000-sq.ft">3000+ sq.ft</label>
          </li>
        </ul>
        <a class="button small-btn sTop" href="#">Continue</a>
      </div>
    </div>
  </section>
  <section class="s-py-half disclosure-section">
    <div class="container small-container">
      <h6><b>Marketing Disclosure:</b></h6>
      <p>This website is a market place. As such you should know that the
        owner has a monetary connection to the product and services
        advertised on the site. The owner receives payment whenever a
        qualified lead is referred but that is the extent of it.</p>
      <h6><b>Advertising Disclosure:</b></h6>
      <p>This website and the products & services referred to on the site
        are advertising marketplaces. This website is an advertisement and
        not a news publication. Any photographs of persons used on this site
        are models. The owner of this site and of the products and services
        referred to on this site only provides a service where consumers can
        obtain options.</p>
      <h6><b>Website Disclaimer:</b></h6>
      <p>All product and company names are trademarks™ or registered®
        trademarks of their respective holders. Use of them does not imply
        any affiliation with or endorsement by them. Use of individuals
        names or likenesses are not an endorsement and are for information
        or public interest purposes only.</p>
    </div>
  </section>
</div>


@include('lpv23.partials.footers.mainFooter')
</div>

<script> 


</script> 
@endsection

