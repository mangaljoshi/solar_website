@extends('lpv23.layouts.base')
<style>
    .text-black {
        color: #000 ;
    }
</style>
@section('style')
    <link href="{{ asset('_lpv23/css/second-service.css') }}" rel="stylesheet">
@endsection

@section('content')
@include('lpv23.partials.headers.header')
<div class="container mt-5 mb-5">
    <div class="row">
        <div class="col-md-12" style="margin-top: 40px;">
            <style>
                @media only screen and (max-width: 768px) {
                    #terms .modal-body {
                        max-height: calc(100vh - 168px) !important;
                    }
                }
            </style>
            <p><strong>Last Modified:  May 01, 2023</strong></p>
            <p><strong>PLEASE READ THESE TERMS AND CONDITIONS. BY USING  , YOU AGREE TO ABIDE BY THIS AGREEMENT.</strong></p>

            <h4>(1) Acceptance of the Terms and Conditions and any Modification hereafter.</h4>
            <p>
                To enhance the user experience on <strong>{{ config('base.domain') }}</strong>, we collect data about the visitor computer including operating system, web browser, java script enabling status, IP address, and referral URL. We may use this
                data to re-market our website to those visitors by launching advertising campaigns on reputable advertising companies.
            </p>

            <hr />

            <h4>(2) Modification to or Termination of Services.</h4>
            <p>
                You acknowledge and agree that we may modify or terminate the services provided on the Website and any of its features at any time or terminate your access to them without notice to you. You acknowledge and agree that we shall not
                be liable to you or any third party as a result of any such modification or termination. You may discontinue use of the Website at any time without notice to us.
            </p>

            <hr />

            <h4>(3) Privacy Policy.</h4>
            <p>
                Registration data and other information about you collected on the Website, which may include personally identifiable information you voluntarily submit, are subject to the Website’s Privacy Policy. The Privacy Policy can be found
                at {{ config('base.domain') }}/privacy. By using the Website, you consent to the collection and use of this information in accordance with the Privacy Policy.
            </p>

            <hr />

            <h4>(4) The Website.</h4>
            <p>
                The Website is designed to help you locate information regarding home improvement projects and services. The Website also connects you with contractors and other providers who may be able to assist you with your home improvement
                projects and services. We own and retain all intellectual property rights in and to the Website.
            </p>
            <strong></strong>
            <p>
                <strong>
                    WARNING: Certain home improvement projects are inherently dangerous, and even the most benign tool, product, chemical or other material can cause serious injury or death if not used properly. ALWAYS READ AND FOLLOW INSTRUCTION
                    MANUALS AND SAFETY WARNINGS, AND SEEK THE ADVICE OF A QUALIFIED PROFESSIONAL. Be particularly careful when dealing with electricity. Moreover, always use common sense. You are using the Website and the content thereon at your
                    own risk (see Disclaimers below).
                </strong>
            </p>
            <hr />

            <h4>(5) Links to Third-Party Websites.</h4>
            <p>
                Some information provided to you on the Website may contain links to information that resides on third-party websites not owned or controlled by us. Unless the link is to an article or content on another website owned by us, we do
                not claim ownership to the content on other websites you reach by clicking on a link from the Website. Your rights to such content will be governed by the terms of those third-party websites. You acknowledge and agree that we are
                not responsible for any third-party content and that you must evaluate any such third-party content and bear all risks associated with any use of the content, including any reliance on the accuracy or completeness of the
                information.
            </p>

            <hr />

            <h4>(6) Use of the Website.</h4>
            <p>
                You may use the Website for your individual personal use and you agree that you will not reproduce, duplicate, copy, sell, trade or otherwise exploit the Website for any commercial purpose. You agree to access the Website through
                the interface provided by the Website using a standard web browser. You may not decompile, reverse engineer, disassemble, rent, lease, loan, sell, sublicense, or create derivative works from the Website or the content thereon. Nor
                may you use any network monitoring, discovery software or other programs or methods to determine the Website architecture or to extract content from the Website or information about its usage or users.
            </p>

            <hr />

            <h4>Copyright Infringement.</h4>
            <p>
                If you are a copyright owner or agent thereof and believe that content on the Website infringes upon your copyright, please submit notice, pursuant to the Copyright Protection Law of the defending party's jurisdiction to our
                Copyright Agent with the following information: (i) an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright; (ii) a description of the copyrighted work that you claim has been
                infringed; (iii) the URL of the location containing the material that you claim is infringing; (iv) your address, telephone number, and email address; (v) a statement by you that you have a good faith belief that the disputed use is
                not authorized by the copyright owner, its agent, or the law; (vi) a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on
                the copyright owner's behalf. Our Copyright Agent can be reached By email: <a href="mailto:contact@{{ config('base.domain') }}">contact@{{ config('base.domain') }}</a>
            </p>

            <hr />

            <h4>(7) Disclaimers.</h4>
            <p>
                ALL CONTENT AND SERVICES PROVIDED ON OR THROUGH THIS WEBSITE ARE PROVIDED "AS IS" AND "AS AVAILABLE" FOR YOUR USE. THE CONTENT IS PROVIDED WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT
                LIMITED TO IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. NEITHER {{ config('base.domain') }}, ITS AFFILIATES AND RELATED ENTITIES, NOR ANY OF THEIR RESPECTIVE EMPLOYEES, AGENTS,
                THIRD PARTY CONTENT PROVIDERS OR LICENSORS WARRANT THAT: (A) THE WEBSITE OR CONTENT THEREON WILL BE UP-TO-DATE, COMPLETE, COMPREHENSIVE, ACCURATE OR APPLICABLE TO YOUR CIRCUMSTANCES; (B) THE QUALITY OF ANY PRODUCTS, SERVICES,
                INFORMATION, OR OTHER MATERIAL OBTAINED BY YOU THROUGH THE WEBSITE WILL MEET YOUR EXPECTATIONS; (C) THIS WEBSITE WILL BE AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; or (D) ANY DEFECTS OR ERRORS WILL BE CORRECTED OR THAT THE
                WEBSITE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THIS WEBSITE IS SOLELY AT YOUR OWN RISK.
            </p>

            <hr />

            <h4>(8) Limitation of Liability</h4>
            <p>
                IN NO EVENT SHALL {{ config('base.domain') }}, OR ITS DIRECTORS, OFFICERS, PARTNERS, EMPLOYEES, REPRESENTATIVES, CONTRACTORS, AFFILIATES, SUCCESSORS OR ASSIGNS ("THE {{ config('base.domain') }} PARTIES") BE LIABLE TO YOU FOR YOUR ACCESSING OF THIS
                WEBSITE OR UNDER OR RELATED TO THIS AGREEMENT FOR ANY INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL, RELIANCE, EXEMPLARY OR CONSEQUENTIAL DAMAGES, LOSS OF PROFITS, LOSS OF EXPECTED SAVINGS, OR ANY OTHER NON-DIRECT DAMAGES HOWSOEVER CAUSED
                WHETHER OR NOT {{ config('base.domain') }} OR ANY OF THE {{ config('base.domain') }} PARTIES HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. {{ config('base.domain') }}'S AND THE {{ config('base.domain') }} PARTIES' COLLECTIVE MAXIMUM LIABILITY TO YOU UNDER OR
                RELATED TO THIS AGREEMENT SHALL IN NO EVENT EXCEED THE AMOUNT PAID BY YOU FOR USE OF THE WEBSITE OR SERVICES PROVIDED ON THE WEBSITE, IF ANY. THE LIMITATIONS OF LIABILITY AND DISCLAIMERS IN THIS AGREEMENT SHALL APPLY REGARDLESS OF
                THE FORM OF ACTION, WHETHER IN CONTRACT, WARRANTY, STRICT LIABILITY, NEGLIGENCE OR OTHER TORT AND SHALL SURVIVE A FUNDAMENTAL BREACH OR BREACHES OR THE FAILURE OF THE ESSENTIAL PURPOSE OF CONTRACT OR THE FAILURE OF AN EXCLUSIVE
                REMEDY. BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, {{ config('base.domain') }}'S AND THE {{ config('base.domain') }} PARTIES' LIABILITY IN SUCH JURISDICTIONS SHALL BE LIMITED TO THE
                FULLEST EXTENT PERMITTED BY LAW.
            </p>

            <hr />

            <h4>(9) Indemnity.</h4>
            <p>
                You agree to defend, indemnify and hold harmless {{ config('base.domain') }} and its directors, officers, partners, employees, representatives, contractors, affiliates, successors or assigns, including all third parties mentioned on the
                Website, from and against any and all claims, actions or demands, including without limitation reasonable legal and accounting fees, alleging or resulting from your use of the Website or the services and the content thereon or your
                breach of this Agreement.
            </p>

            <hr />

            <h4>(10) Choice of Law.</h4>
            <p>
                This Agreement shall be governed by and construed under the laws of the defending party's jurisdiction without giving effect to its conflict of laws principles. You and {{ config('base.domain') }} hereby submit to the exclusive forum,
                jurisdiction and venue of the courts located in defending party's jurisdiction for any claim related to, arising from or in connection with this Agreement and/or your use of the Website.
            </p>

            <hr />

            <h4>(11) Statute of Limitations.</h4>
            <p>
                You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Website or the Agreement must be filed within one (1) year after such claim or cause of action
                arose or be forever barred.
            </p>
        </div>
    </div>
</div>
@include('lpv23.partials.footers.footer')
@endsection

@section('script')
@endsection