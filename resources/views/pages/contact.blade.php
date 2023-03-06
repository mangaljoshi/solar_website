@extends('layouts.base')

@section('content')
    <section class="contact-area page-paddings">
        <div class="d-table w-100">
            <div class="d-table-cell">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-12 col-sm-12 col-12 offset-lg-3">
                        <div class="page-title text-center">
                            <h2>Contacting Us and Questions?</h2>
                            <p>We are here to help. If you have any questions or concerns please email us at <a href="mailto: {{ config('base.contact_email') }}"> {{ config('base.contact_email') }}</a></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection