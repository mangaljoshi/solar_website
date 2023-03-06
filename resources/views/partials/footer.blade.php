<footer class="site-footer">
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="site-footer-main d-flex justify-content-between align-items-center">
                    <div class="copyright">
                        <p>© {{date('Y')}} {{ __('footer.copyright_text') }}</p>
                    </div>
                    <div class="logo">
                        <a href="{{ route('home') }}">
                            <img src="images/logo.png" alt="">
                        </a>
                    </div>
                    <div class="links">
                        <a href="{{ route('contact') }}">{{ __('footer.contact') }}</a>
                        <a href="{{ route('privacy') }}">{{ __('footer.privacy_policy') }}</a>
                        <a href="{{ route('terms') }}" target="_blank">{{ __('footer.terms_of_use') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>