@extends('lpv88.layouts.base')

@section('style')
<link href="{{ asset('_lpv88/css/second-service.css') }}" rel="stylesheet">


@endsection

@section('content')
<style>
    body {
        background-color: #f2f2f2 !important;
        display: grid;
        place-items: center;
    }

    @media(min-width:768px) {
        body {
            background-color: #f2f2f2 !important;
        }
    }

    footer {
        margin-top: 300px !important;
        background-color: #f2f2f2 !important;
    }
</style>
<div id="loading" style="display: none;">
    <img id="loading-image" src="{{ asset('_lpv88/images/loader.gif') }}" alt="Loading..." />
</div>


<div class="thumbtack-container">
    <div class="thumbtack-heading">
        <h1>Additional home services from top-rated pros through our trusted partner - Thumbtack</h1>

    </div>

    <div class="serch-box">
        <span>

            <select name="categories" id="category" class="input-1">


                <option value="{{ isset($category) && $category != "" ? $category : 'Select Service ' }}">{{
                    isset($category) && $category != "" ? $category : 'Select Service ' }}</option>
                <option value="bathroom remodel">bathroom remodel</option>
                <option value="kitchen remodel">kitchen remodel</option>
                <option value="stair installation or remodel">stair installation or remodel</option>
                <option value="cabinetry">cabinetry</option>
                <option value="junk removal">junk removal</option>
                <option value="floor installation or replacement">floor installation or replacement</option>
                <option value="central air conditioning installation">central air conditioning installation</option>
                <option value="mold inspection and removal">mold inspection and removal</option>
                <option value="plumbing">plumbing</option>
                <option value="shower and bathtub installation">shower and bathtub installation</option>
                <option value="home security and alarms install">home security and alarms install</option>
                <option value="siding installation">siding installation</option>
                <option value="moving">moving</option>

            </select>


        </span><span><input id="zipCode" class="zipcode input-2" placeholder="Enter your zip code" type="tel"
                name="zipCode"
                value="{{ isset($zipCode) ? $zipCode : (isset(('userData')['zip_code']) ? ('userData')['zip_code'] : '') }}"
                maxlength="5">
        </span>
        <span><button id="tt-btn" type="submit" class="thumb-tack-btn"><i
                    class="fa-solid fa-magnifying-glass"></i></button></span>

    </div>
    <div class="thumbtack-heading" style="margin-top:10px">
        <p> You will be redirected to our partner's site below </p>
    </div>

    <p id="thumbtack-error" style="color: red; font-size: 18px; font-weight: bold; display:none"> Please Enter valid Zip
        Code</p>
    @if (isset($apiResponse['results']) && count($apiResponse['results']) > 0)

    <div class="thumbtack-children">
        @foreach($apiResponse['results'] as $item)
        <div class="container-11">
            <h1 class="title">{{ $item['business_name'] }}</h1>
            <a class="subscribe-button" href="{{ $item['thumbtack_url'] }}" target="_blank">View profile</a>
            <div class="list">
                <div class="reviews">

                    <span class="rating">
                        <span style="color:#1e4f44;">@if (number_format($item['rating'], 1) == "5")
                            Exceptional
                            @else
                            Great
                            @endif {{ number_format($item['rating'], 1) }} </span>
                        @php
                        $rating = $item['rating'];
                        $fullStars = floor($rating);
                        $halfStar = $rating - $fullStars >= 0.5;
                        $emptyStars = 5 - $fullStars - ($halfStar ? 1 : 0);
                        @endphp

                        @for ($i = 0; $i < $fullStars; $i++) <i class="fa-solid fa-star"
                            style="color: #ffc800; margin-right: 0;"></i>
                            @endfor

                            @if ($halfStar)
                            <i class="fa-solid fa-star-half-stroke" style="color: #ffc800; margin-right: 0;"></i>
                            @endif

                            @for ($i = 0; $i < $emptyStars; $i++) <i class="fa-regular fa-star"
                                style="margin-right: 0;"></i>
                                @endfor
                                <span style="opacity: .8">({{ $item['num_reviews'] }})</span>
                    </span>
                </div>
                <span><i class="fa-solid fa-location-dot"></i> Servicing {{ $item['location'] }}</span><br>
                <span><i class="fa-solid fa-user-large"></i> {{ $item['years_in_business'] }} years in
                    business</span><br>
                <span><i class="fa-solid fa-medal"></i> Hired {{ $item['num_hires'] }} times</span><br>
            </div>

            @if(!empty($item['featured_review']))
            <p class="description">
                {{ substr($item['featured_review'], 0, 200) }} <span id="see-more-{{ $loop->index }}"
                    style="display:none;">{{ substr($item['featured_review'], 100) }}</span>
                @if(strlen($item['featured_review']) > 100)
                <a href="#" class="see-more-link" data-index="{{ $loop->index }}">See More</a>
                @endif
            </p>
            @else
            <p></p>
            @endif

            <a class="subscribe-button-1" style="display: none" href="{{ $item['thumbtack_url'] }}" target="_blank">View
                profile</a>

            <div class="ribbon-wrap">
                <div><img class="ribbon" src="{{ $item['image_url'] }}" alt=""></div>
            </div>

        </div>

        @endforeach
    </div>
</div>


@else
{{-- <p>No data available.</p> --}}
@endif

@endsection