<footer class="site-footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="site-footer-main d-flex justify-content-between align-items-center">
                    <div class="copyright">
                        <p>© {{date('Y')}} {{ __('footer.copyright_text') }}</p>
                    </div>
                    <div class="logo">
                        <a href="{{ route('energy.home') }}">
                            <img src="{{ asset('energybill/images/logo.png') }}" alt="">
                        </a>
                    </div>
                    <div class="links">
                        <a href="{{ route('energy.contact') }}">{{ __('footer.contact') }}</a>
                        <a href="{{ route('energy.privacy') }}">{{ __('footer.privacy_policy') }}</a>
                        <a href="{{ route('energy.terms') }}" target="_blank">{{ __('footer.terms_of_use') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>