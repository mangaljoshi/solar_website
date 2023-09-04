@extends('lpv23.layouts.base')
@section('style')
    <link href="{{ asset('_lpv23/css/second-service.css') }}" rel="stylesheet">
@endsection

@section('content')
@include('lpv23.partials.headers.header')
<div class="container">
    <div class="row">
        <div class="col-md-12" style="margin-top: 40px;">
            <style>
                @media only screen and (max-width: 768px) {
                    #privacy .modal-body {
                        max-height: calc(100vh - 168px) !important;
                    }
                }
                .privacy-copy h3 {
                    font-size: 19px !important;
                    margin-top: 25px;
                    margin-bottom: 10px;
                }
                .privacy-copy h4 {
                    font-size: 16px !important;
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                .privacy-copy p {
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
                .privacy-copy h3,
                h4,
                strong {
                    font-weight: 700;
                }
                .privacy-copy ul {
                    padding-left: 30px;
                }
                .privacy-copy ul ul {
                    margin-top: 5px;
                }
                .privacy-copy ul li {
                    margin-bottom: 3px;
                }
                .privacy-copy td:nth-child(1) {
                    width: 20%;
                }
                .privacy-copy td:nth-child(2) {
                    width: 70%;
                }
                .privacy-copy td:nth-child(3) {
                    width: 10%;
                }
            </style>
            <div class="privacy-copy">
                <p><strong>Last Modified:  May 01, 2023</strong></p>
                <p>
                    This Privacy Policy ("Policy") of {{ config('base.company_name') }}  owner and operator of {{ config('base.domain') }} ("Website," "us," "our," or "we"), which will always be at
                    <a href="https://{{ config('base.domain') }}/privacy">https://{{ config('base.domain') }}/privacy-policy/</a> is intended to help you understand our privacy practices and how we collect, use, disclose and process your personal information.
                    We also describe your rights and choices with respect to how we process your personal information. This Policy applies to www.{{ config('base.domain') }}, and all other websites and domains on which a link to this Policy appears
                    (including all subdomains, collectively the "Site(s)"). This Policy does not apply to any other websites owned or operated by {{ config('base.company_name') }}  that do not link to this Policy, terms for which are included with
                    those sites individually. We have a "data controller" or direct relationship with all individuals accessing the Sites, submitting personal information via the Sites for any reason, or calling any phone number posted on our Sites
                </p>

                <h3>ACCEPTANCE:</h3>
                <p>Any entity accessing the Sites ("you") represents and warrants that you accept the data practices and terms described in this Policy. If you do not agree with this Policy, please discontinue your use of the Sites immediately.</p>

                <h3>CHANGES TO THIS POLICY:</h3>
                <p>
                    We may revise this Policy from time to time and without prior notice to you. Except as otherwise noted in this Policy, such changes may apply to any personal information we already hold about you or personal information
                    collected after the Policy is modified. Changes will be posted on this page and are effective as of the "Last Modified" date at the top of this Policy. Please visit this page regularly so that you are aware of our latest
                    updates. Continuing to access or use this Site after any changes become effective indicates your acceptance of the revised Policy.
                </p>
                <p>
                    In addition, we may provide you with "just-in-time" disclosures or additional information about the data processing practices of specific parts of our Site. Such notices may supplement this Policy or provide you with additional
                    choices about how we process your personal information.
                </p>

                <h3>THIRD PARTIES:</h3>
                <p>
                    This Policy does not apply to information processed by third parties, for example, when you visit a third party website or interact with third party services including those you may access by following a link from the Sites or
                    those with whom we may share information as set forth in this Policy. Please review any third parties’ privacy policies before disclosing information to them.
                </p>
                <p>
                    When you call a number posted on the Sites or otherwise submit an inquiry for an estimate, quote or service, we share this information with our network of Partners (each, a "Partner"), who pay us to provide this service, to
                    enable them to match you with contractors ("Contractors" or each, a "Contractor") who can provide you with estimates and other information related to your inquiry. Our terms of service require that Partners utilize Personal Data
                    in accordance with all applicable local, state and federal laws, rules and regulations. Note that any Personal Data transferred to our Partners or Contractors as part of our services is no longer under our control. Each Partner
                    and Contractor has its own Privacy Policy, and you should contact those Partners and Contractors directly regarding their use of your Personal Data.
                </p>

                <h3>PERSONAL INFORMATION:</h3>
                <p>
                    "Personal Data" means any information about an identified or identifiable individual and any performance, log and cookie information that may be linked with an identifiable individual. We collect and process the following types
                    of information. Note: Specific Personal Data elements listed in example are provided for example only and may change. We may create anonymous records from Personal Data for certain business purposes of ours, of our Partners and
                    of our Affiliates as defined below. Any information that is anonymized or aggregated is no longer Personal Data and we may indefinitely use it, share it and retain it for any reason.
                </p>
                <p>
                    <strong><em>"Contact Data":</em></strong> Personal Data about you used to contact you. For example: your name, company name, title, email address, physical address, phone number, and/or username. "Performance &amp; Log Data":
                    Information created by your use of our Sites. For example: your IP address, browser type, operating system, command line information, diagnostic information related to the Site (i.e. crash activity reports), the referring
                    webpage, pages visited, date, your geo-location, your mobile carrier, your device and application IDs and search terms. Note that Depending on the law of your country of residence, your IP address may legally be considered
                    personally identifiable information.
                </p>
                <p>
                    <strong><em>"Cookies":</em></strong> A cookie is a small amount of data generated by a website and saved by your web browser. Its purpose is to remember information about you, similar to a preference file created by a software
                    application. In some cases, Cookies and similar automated data collection technologies may be used to collect personal information, or information that becomes personal information if we combine it with other information.
                </p>
                <p>
                    <strong><em>"Web Pixels":</em></strong> A web pixel is small HTML code snippet which is loaded when a user visits a website or opens an email. It is used for tracking user behavior on our Sites such as referring sites and form
                    submissions. In some cases, Web Pixels may be used to collect personal information, or information that becomes Personal Data if we combine it with other information.
                </p>
                <p>
                    <strong><em>"Other Data":</em></strong> Any other information that an individual provides to us. For example: survey responses, blog comments, or other communication submitted to us.
                </p>

                <h3>COLLECTION AND PROCESSING:</h3>
                <p>
                    We collect your Personal Data through our Sites and over the phone when you call an inquiry number listed on our Sites. Our Sites are public, any information that is disclosed on our Sites may appear on search engines, or other
                    publicly available platforms and may be "crawled," searched and used by unaffiliated third parties. Please do not post any information that you do not want to reveal publicly and please do not call us from any phone number you
                    do not give us permission to utilize and share as provided below.
                </p>
                <p>
                    <strong><em>Quote Requests:</em></strong> When you submit a request for an estimate, quote or other information through our Sites, we may use your Personal Data to match your request with a Partner or Contractor in our network.
                    Our "Partner Network" is a collection of Partners that have networks of local Contractors to provide home services.
                </p>
                <p>
                    <strong><em>Customer Service:</em></strong> When you contact us through the Sites, including submitting a "contact us" or other online inquiry form, subscribing to a newsletter or blog, downloading a whitepaper or other
                    informational document, entering a contest, registering for a demo or webinar, completing an online survey or any other means, we may record your Contact Data in our customer relationship management system and use your Personal
                    Data to respond to you, or provide this information to a Partner so that the Partner or Contractor may respond to you. If you provide a mobile phone number to us, you are explicitly granting us and our Partners and Contractors
                    permission to send text messages to that number to respond to your request and to contact you at that number via an auto-dialer or with a recorded message, which we may do at our discretion.
                </p>
                <p>
                    <strong><em>Marketing:</em></strong> We may use your Personal Data to keep you updated about our products and services and send you promotional material about {{ config('base.domain') }} and participating Partners and as permitted by
                    applicable law, on behalf of our parent company, affiliates, subsidiaries, joint ventures, or other companies under common control with us (collectively, "Affiliates") and partner companies. Promotional materials may include
                    marketing communications, online surveys, notifications regarding our events and webinars and those of our Partners, Contractors, Affiliates and other third-party partners. If you provide a mobile phone number to us, you are
                    explicitly granting us and our Partners andContractors permission to send text messages, recorded messages, and/or use an auto-dialer to contact that number for marketing and promotional purposes, which we or our Partners and
                    Contractors may do at our discretion. You may opt-out of our marketing communications at any time.
                </p>
                <p>
                    <strong><em>Cookies &amp; Similar Tech:</em></strong> When you access the Sites or open one of our HTML emails, we may automatically record Performance &amp; Log Data by using Cookies, Web Pixels, web beacons, click-stream
                    tracking and similar automated data collection technologies. We use this Personal Data for essential and functional purposes including for site administration, to improve the performance and usability of the Sites, and analyze
                    how users interact with the Sites. On certain portions of our Sites, we may collect Personal Data through these technologies for advertising, remarketing or other similar purposes.
                </p>
                <p>
                    <strong><em>Security:</em></strong> We process your Personal Data to enhance the security of our Sites and to combat spam, malware or other security risks. This may include monitoring your activities on our Sites. Without
                    processing your Personal Data for such purposes, we may not be able to ensure the security of our Sites.
                </p>
                <p>
                    <strong><em>Additional Processing:</em></strong> If we process Personal Data in connection with your use of the Sites in a way not described in this Policy, this Policy will still apply generally (e.g. with respect to Your
                    Rights and Choices) unless otherwise stated when you provide it.
                </p>

                <h3>SHARING:</h3>
                <p>
                    Information we collect may be shared with a variety of parties depending upon the purpose for and context in which that information was provided. In all cases where we share Personal Data with third party service providers
                    acting on our behalf, we will use a "minimum necessary" standard to disclose only that information required for satisfying the purpose of or performing the service for which the information is disclosed. We generally transfer
                    Personal Data according to the following:
                </p>
                <p>
                    <strong><em>Consent:</em></strong> We will share your Personal Data in accordance with your consent for us to do so. By submitting any Personal Data via our Sites or by calling a number published on our Sites you are providing
                    consent for us to share your Personal Data with Partners in our Partner Network, and for those Partners to share your Personal Data with Contractors.
                </p>
                <p>
                    <strong><em>Partner Network:</em></strong> When you submit a request for a quote, we may share your Personal Data with Partners in our Partner Network who pay us to provide this service. Our Partners may use your Personal Data
                    to connect you with a Contractor to assist you with your home services project and may share your Personal Data with such Contractor in order to contact you to offer its services. If you provide a mobile phone number to us you
                    are explicitly granting us, and any Partner or Contractor with whom you are matched by our service, permission to call and send text messages to that number to respond to your request and to contact you at that number via phone
                    call, text message, an auto-dialer or recorded message, which we or our Partners or Contractors may do at our discretion. Note that Partners and Contractors are third parties. Any Personal Data transferred to a Partner or
                    Contractor as part of our services, is no longer under our control and is subject to the privacy policies of such Partner or Contractor.
                </p>
                <p>
                    <strong><em>Service Providers:</em></strong> In connection with our general business operations, to enable certain features, and in connection with our other legitimate business interests, we may share your Personal Data with
                    service providers or sub-processors who provide certain services or process data on our behalf. Our contracts with these service providers dictate that they only use your information in connection with the services they perform
                    for us and you consent to our sharing of information with these parties by using our Sites subject to this Policy.
                </p>
                <p>
                    <strong><em>Affiliates:</em></strong> In order to streamline certain business operations, develop products and services that better meet the interests and needs of our customers, and inform our customers about relevant products
                    and services, we may share your Personal Data with any of our current or future Affiliates. You hereby agree to our sharing some or all of your information and Personal Data with our Affiliates.
                </p>
                <p>
                    <strong><em>Third-Party Partners: When</em></strong> you complete an online inquiry form to which you were referred by a third-party partner, any information collected through an online inquiry form hosted on the Sites may be
                    shared with the referring third party partner. We may share your Personal Data with third parties for marketing or adverting purposes, as permitted by law. For example, when you sign up for a webinar co-hosted by us and a
                    third-party partner, we may share your Personal Data with the third-party partner. Third party partners may use your Personal Data for their own purposes subject to their own privacy policies.
                </p>
                <p>
                    <strong><em>Business Transactions:</em></strong> Your Personal Data may be processed in the event of a business transaction, such as a merger, acquisition, liquidation, or sale of all or a portion of our assets. For example,
                    Personal Data may be disclosed (subject to confidentiality restrictions) during the due diligence process for a potential transaction or may part of the assets transferred, in such case the acquiring company will possess any
                    rights granted to us under this Policy.
                </p>
                <p>
                    <strong><em>Legal Disclosures:</em></strong> In limited circumstances, we may without notice to you or your consent, access and disclose your Personal Data any communications sent or received by you, and any other information
                    that we may have about you to the extent we believe such disclosure is legally required, to prevent or respond to a crime, to investigate violations of our Terms of Use, or in the vital interests of us or any person. Note, these
                    disclosures may be made to governments that do not ensure the same degree of protection of your Personal Data as your home jurisdiction. We may, in our sole discretion (but without any obligation), object to the disclosure of
                    your Personal Data to such parties.
                </p>

                <h3>RETENTION:</h3>
                <p>
                    We retain Personal Data for so long as necessary to service the purpose(s) for which your Personal Data was processed and for a reasonable time thereafter, or as necessary to comply with our legal obligations, to resolve
                    disputes or enforce our agreements. While retention requirements can vary by jurisdiction, we generally apply the retention periods noted below:
                </p>
                <p>
                    <strong><em>Site Activity:</em></strong> We may store any information about your activity on our Sites or any Other Data created, posted or shared by you on our Sites for as long as we deem it necessary or until you provide
                    specific instructions to delete it, which may be indefinitely, or where a valid business reason exists for such storage such as maintaining the integrity of our systems and logs or for the establishment or defense of legal
                    claims, audit and crime prevention purposes.
                </p>
                <p>
                    <strong><em>Marketing:</em></strong> We store information used for marketing purposes indefinitely until you unsubscribe. When you unsubscribe from marketing communications, we add your contact information to our suppression
                    list to ensure we respect your unsubscribe request.
                </p>
                <p>
                    <strong><em>Cookie Data:</em></strong> We retain any information collected via cookies, clear gifs, flash cookies, webpage counters and other technical or analytics tools up to one year from the expiry of the cookie or date of
                    collection. Cookies owned by third parties may have other retention periods.
                </p>
                <p>
                    <strong><em>Call Recording:</em></strong> As required by applicable law, we will inform you that a call will be recorded before doing so. Any recorded telephone calls with you may be retained for a period of up to six years.
                </p>
                <p>
                    Note that any Personal Data transferred to our Partners or Contractors as part of our services is no longer under our control. While our terms of service require that Partners and Contractors utilize Personal Data in accordance
                    with all applicable local, state and federal laws, rules and regulations, each Partner and Contractor has its own data retention policy. You should contact those Partners or Contractors directly regarding their retention of your
                    Personal Data.
                </p>

                <h3>YOUR RIGHTS AND CHOICES:</h3>
                <h4>Rights:</h4>
                <p>You have the following rights in your Personal Data, in each case to the extent required/permitted under applicable law, and subject to our rights to limit or deny access or disclosure under applicable law.</p>
                <p>
                    <strong><em>Access:</em></strong> You may request a list of your Personal Data that we process by submitting an official request in writing via email to address provided below.
                </p>
                <p>
                    <strong><em>Rectification:</em></strong> You may correct any Personal Data that we hold about you by emailing us at the address provided below and indicating both the inaccurate and corrected information.
                </p>
                <p>
                    <strong><em>Erasure:</em></strong> You may request that we delete your Personal Data from our systems once per year by making an official request in writing via email to the address provided below and indicating the specific
                    information you would like permanently deleted from our systems.
                </p>
                <p>
                    <strong><em>Data Export:</em></strong> You may request a copy of your Personal Data in a common portable format of our choice by submitting an official request in writing via email to the address provided below.
                </p>
                <p>
                    We may require that you provide additional Personal Data to exercise these rights, e.g. information necessary to prove your identity. We also reserve the right to retain certain account information for our recordkeeping or
                    compliance purposes.
                </p>
                <p>
                    Note that any Personal Data transferred to our Partners or Contractors as part of our services is no longer under our control. Our terms of service require that Partners and Contractors utilize Personal Data in accordance with
                    all applicable local, state and federal laws, rules and regulations. Each Partner and Contractor has its own policies and procedures for you to exercise your rights. You should contact those Partners and Contractors directly
                    regarding exercising your rights regarding your Personal Data.
                </p>

                <h4>Choices:</h4>
                <p>
                    It is possible for you to access and use the Sites without providing any Personal Data, but you may not be able to access certain features or view certain content and some portions of the Sites may not function properly. You
                    have the following choices regarding Personal Data we process:
                </p>
                <p>
                    <strong><em>Consent:</em></strong> If you consent to processing you may withdraw your consent at any time to the extent required by law.
                </p>
                <p>
                    <strong><em>Opt-Out:</em></strong> Any communications from us that are not service-related or transactional in nature will offer you an "unsubscribe" option. You may opt-out of receiving marketing communications from us by
                    following the opt-out instructions included in such communications or contacting us at the email provided below. It may take up to 30 days for us to process an opt-out request. We may send you other types of transactional and
                    relationship email communications including service announcements, administrative notices, and surveys, without offering you the opportunity to opt-out of receiving them. To the extent required by law, you may choose to opt-out
                    of sharing Personal Data with third parties. Note that any Personal Data transferred to our Partners and Contractors as part of our services is no longer under our control. Our terms of service require that Partners utilize
                    Personal Data in accordance with all applicable local, state and federal laws, rules and regulations. Each Partner and Contractor has its own opt-out procedures, and you should contact those Partners and Contractors directly
                    regarding their opt-out policies and procedures.
                </p>
                <p>
                    <strong><em>Telemarketing:</em></strong> We have adopted and adhere to policies that comply with applicable Federal Trade Commission, Federal Communications Commission and state laws/regulations. If you do not want to receive
                    non-informational calls from us, you can ask us to place your telephone number(s) on our internal Do Not Call List by emailing us at the contact information provided below. Your request must include, at minimum, your telephone
                    number and name. If you have multiple telephone numbers, please be sure to include all numbers that you would like included on our Do Not Call List in your request. Any phone call, e-mail or any other form of communication used
                    to confirm receipt of your Do Not Call request will not be deemed to have violated this Policy. Your request will be honored within thirty days of the request in compliance with federal and state laws. Note that any phone
                    information transferred to our Partners or Contractors as part of our services is no longer under our control. While our terms of service require that our Partners and Contractors utilize this contact information in accordance
                    with all applicable local, state, and federal laws, rules, and regulations including TCPA, each Partner and Contractor has its own Do Not Call List and you must contact each Partner and Contractor individually to be placed on
                    their internal Do Not Call Lists.
                </p>
                <p>
                    <strong><em>Cookies:</em></strong> If you do not want information collected through the use of cookies, you can manage/deny cookies (and certain technologies) using your browser’s settings menu or by using a variety of tools.
                </p>
                <ul>
                    <li>You can visit the Google Ads Settings page <a href="https://adssettings.google.com/u/0/authenticated?hl=en" target="_blank">here</a>.</li>
                    <li>You can use the Google Analytics Opt Out Browser add on.</li>
                    <li>Digital Advertising Alliance’s opt-out page <a href="https://optout.aboutads.info/?c=2&amp;lang=EN" target="_blank">here</a> allows you to opt out from receiving third party advertiser cookies and Web Pixels.</li>
                    <li>You can visit the Network Advertising Initiative opt-out page <a href="https://www.networkadvertising.org/optout_nonppii.asp" target="_blank">here</a>.</li>
                    <li>You can control Facebook’s use of interest-based ads through your Facebook account settings or can visit the customer support page <a href="https://www.facebook.com/help/247395082112892" target="_blank">here</a>.</li>
                    <li>To learn more about cookies and similar tracking technologies, and how they can affect your privacy, visit <a href="https://allaboutcookies.org" target="_blank">allaboutcookies.org</a>.</li>
                </ul>
                <p>As there is no consistent industry understanding of how to respond to "Do Not Track" signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.</p>

                <h3>PRIVACY NOTICE FOR CALIFORNIA RESIDENTS:</h3>
                <p>
                    This Privacy Notice for California Residents ("Notice") supplements the information contained in the other sections of this Policy and only applies to consumer users of our Sites that are residents of the State of California
                    ("Consumer(s)" and in this Section "you" and "your"). We have adopted the terms of this Notice to comply with the California Consumer Privacy Act of 2018 ("CCPA") and its related regulations. Terms used in this Notice have the
                    same meanings as defined in the CCPA.
                </p>

                <h4>Collection of Personal Information:</h4>
                <p>
                    We collect Personal Information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with an individual Consumer, household, or device.
                    We have collected the following categories of Personal Information from Consumers within the last twelve months:
                </p>
                <p>The following examples are taken directly from the CCPA, where we indicate that a category is collected, we collect at least one of the example items from each category.</p>

                <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Examples</th>
                                <th>Collected</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>A. Identifiers.</td>
                                <td>
                                    A real name, alias, postal address, unique personal identifier, online identifier, Internet Protocol address, email address, account name, Social Security number, driver's license number, passport number, or
                                    other similar identifiers.
                                </td>
                                <td>YES</td>
                            </tr>
                            <tr>
                                <td>B. Personal information categories listed in the California Customer Records statute (Cal. Civ. Code § 1798.80(e)).</td>
                                <td>
                                    A name, signature, Social Security number, physical characteristics or description, address, telephone number, passport number, driver's license or state identification card number, insurance policy number,
                                    education, employment, employment history, bank account number, credit card number, debit card number, or any other financial information, medical information, or health insurance information. Some personal
                                    information included in this category may overlap with other categories.
                                </td>
                                <td>YES</td>
                            </tr>
                            <tr>
                                <td>C. Protected classification characteristics under California or federal law.</td>
                                <td>
                                    Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed, marital status, medical condition, physical or mental disability, sex (including gender, gender identity, gender
                                    expression, pregnancy or childbirth and related medical conditions), sexual orientation, veteran or military status, genetic information (including familial genetic information).
                                </td>
                                <td>No</td>
                            </tr>
                            <tr>
                                <td>D. Commercial information</td>
                                <td>Records of personal property, products or services purchased, obtained, or considered, or other purchasing or consuming histories or tendencies.</td>
                                <td>YES</td>
                            </tr>
                            <tr>
                                <td>E. Biometric information.</td>
                                <td>
                                    Genetic, physiological, behavioral, and biological characteristics, or activity patterns used to extract a template or other identifier or identifying information, such as, fingerprints, faceprints, and
                                    voiceprints, iris or retina scans, keystroke, gait, or other physical patterns, and sleep, health, or exercise data.
                                </td>
                                <td>NO</td>
                            </tr>
                            <tr>
                                <td>F. Internet or other similar network activity.</td>
                                <td>Browsing history, search history, information on a consumer's interaction with a website, application, or advertisement.</td>
                                <td>YES</td>
                            </tr>
                            <tr>
                                <td>G. Geolocation data.</td>
                                <td>Physical location or movements.</td>
                                <td>YES</td>
                            </tr>
                            <tr>
                                <td>H. Sensory data.</td>
                                <td>Audio, electronic, visual, thermal, olfactory, or similar information.</td>
                                <td>NO</td>
                            </tr>
                            <tr>
                                <td>I. Professional or employment-related information.</td>
                                <td>Current or past job history or performance evaluations.</td>
                                <td>NO</td>
                            </tr>
                            <tr>
                                <td>J. Non-public education information (per the Family Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34 C.F.R. Part 99)).</td>
                                <td>
                                    Education records directly related to a student maintained by an educational institution or party acting on its behalf, such as grades, transcripts, class lists, student schedules, student identification codes,
                                    student financial information, or student disciplinary records.
                                </td>
                                <td>NO</td>
                            </tr>
                            <tr>
                                <td>K. Inferences drawn from other personal information.</td>
                                <td>Profile reflecting a person's preferences, characteristics, psychological trends, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes.</td>
                                <td>YES</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>We obtain the categories of Personal Information listed above from the following categories of sources:</p>
                <ul>
                    <li>Directly and indirectly from activity on our Sites. For example, from customer submissions through our website or customer usage details collected automatically.</li>
                    <li>Directly from consumers accessing our Sites and utilizing our services. For example, from phone calls made to us, emails sent to us, and form data submitted to us from Sites.</li>
                    <li>From third parties. For example, Google and Facebook.</li>
                </ul>

                <h4>Sharing of Personal Information:</h4>
                <p>
                    Personal Information we collect may be shared with service providers who provide certain services on our behalf, including but not limited to identity verification, fraud prevention, business intelligence, customer relationship
                    management, bill collection, payment processing, marketing, hosting, and other common technology services. Our contracts with these service providers dictate that they only use Consumer information in connection with the
                    services they perform for us and you consent to our sharing of information with these parties by using our Sites subject to this Policy.
                </p>
                <p>In the preceding twelve months we have disclosed the following categories of Personal Information to our third-party service providers for a business purpose:</p>
                <ul>
                    <li>Category A: Identifiers</li>
                    <li>Category B: California Consumer personal information</li>
                    <li>Category D: California Consumer commercial information</li>
                    <li>Category F: California Consumer internet or other similar network activity</li>
                    <li>Category G: California Consumer geolocation data</li>
                    <li>Category K: Inferences drawn from other personal information</li>
                </ul>
                <p>We disclose Consumer Personal Information for our business purposes to the following categories of third parties:</p>
                <ul>
                    <li>Our Affiliates. For example, sharing information with companies under common control with us.</li>
                    <li>Service Providers. For example, sharing information with an email marketing service provider.</li>
                    <li>
                        Third parties to whom you or your agents authorize us to disclose your Personal Information in connection with products or services we provide to you. For example, providing tools which allow a customer to contact home
                        remodeling vendors in their local area.
                    </li>
                </ul>
                <p>In the preceding twelve months we have sold the following categories of Personal Information to Partners and/or Contractors:</p>
                <ul>
                    <li>Category A: Identifiers</li>
                    <li>Category B: California Consumer personal information</li>
                    <li>Category D: California Consumer commercial information</li>
                    <li>Category F: California Consumer internet or other similar network activity</li>
                    <li>Category G: California Consumer geolocation data</li>
                    <li>Category K: Inferences drawn from other personal information</li>
                </ul>
                <p><strong>Exercising your rights to access certain information, data portability, and deletion:</strong></p>
                <p>The CCPA provides Consumers with specific rights regarding their Personal Information. This section describes your CCPA rights and explains how to exercise those rights via a Verifiable Consumer Request.</p>
                <p>
                    <strong><em>"Verifiable Consumer Request":</em></strong> means a request that:
                </p>
                <ul>
                    <li>is submitted to the contact information provided below;</li>
                    <li>is made by you or your authorized representative on your behalf, or by you on behalf of your minor child;</li>
                    <li>is made only twice within a twelve-month period;</li>
                    <li>provides sufficient information for us to reasonably verify that you are the person about whom we collected Personal Information or an authorized representative of such person; and</li>
                    <li>describes your request with sufficient detail to properly understand, evaluate, and responds to your request.</li>
                </ul>
                <p>
                    We are unable to respond to requests when we cannot verify your identity or authority to make the request. Personal Information provided in a Verifiable Consumer Request will only be used to verify the requestor’s identity or
                    authority to make the request and to comply with the request. You are not required to create an account with us to submit a Verifiable Consumer Request. We can only honor and respond to Verifiable Consumer Requests related to
                    data that we hold directly in our systems. Personal Information shared with or sold to Partners, Contractors, or other third parties is subject to their Verifiable Consumer Request process and such request should be submitted
                    directly to those Partners, Contractors, and third parties.
                </p>
                <p>
                    <strong><em>Access and Data Portability:</em></strong> Upon receipt of a Verifiable Consumer Request we will disclose the following information
                </p>
                <ul>
                    <li>The categories of Personal Information we collected about you;</li>
                    <li>The categories of sources of the Personal Information we collected about you;</li>
                    <li>The categories of third parties with whom we shared your Personal Information;</li>
                    <li>Our business or commercial purpose for collecting or selling your Personal Information;</li>
                    <li>The specific pieces of Personal Information we collected about you (also referred to as a Data Portability Request);</li>
                    <li>
                        If we sold or disclosed your personal information for a business purpose, two separate lists disclosing:
                        <ul>
                            <li>Sales, identifying the categories of Personal Information that each category of third party purchased;</li>
                            <li>Disclosures for a business purpose, identifying the categories of Personal Information that each category of third party received.</li>
                        </ul>
                    </li>
                </ul>
                <p>Personal Information is retained by us for various time periods, we may not be able to fully respond to what might be relevant for the twelve months prior to receipt of the Verifiable Consumer Request.</p>
                <p>
                    California Civil Code Section 1798.83 entitles Consumers to request information concerning whether a business has disclosed certain information about you to any third parties for the third parties’ direct marketing purposes.
                    Consumers who wish to request further information in compliance with this law or have questions or concerns about our privacy practices and policies may contact us using the Contact Information below.
                </p>
                <p>
                    <strong><em>Deletion Requests:</em></strong> The CCPA provides Consumers with the right to request that we delete any Personal Information that we collected about you, subject to certain exceptions. Upon receipt and confirmation
                    of your Verifiable Consumer Request we will delete your Personal Information from our records, unless an exception applies, and direct our service providers to similarly delete your Personal Information from their records.
                </p>
                <p>In addition to submitting a Verifiable Consumer Request, requests to delete your Personal Information can be made by submitting this <a href="/do-not-sell" target="_blank">form</a>.</p>
                <p><strong>Personal Information Sales Opt-Out and Opt-In Rights:</strong></p>
                <p>
                    The CCPA provides Consumers the right to opt-out of the sale of Personal Information about their or their household, for example their name, postal or email address, and other personally identifying information. You need not be
                    physically present in California exercise this right, provided that you have a current California residence. This right is subject to certain exemptions. For example, it does not apply to information that we share with certain
                    third-party service providers that are performing business functions for us or on our behalf.
                </p>
                <p>
                    To exercise the right to opt-out, you, or your authorized representative, may submit an opt-out request to us using this <a href="/do-not-sell" target="_blank">form</a>, or by emailing or calling us at the contact information
                    provided below. You are not required to create an account with us to submit an opt-out request. Personal Information provided in an opt-out request will only be used to verify the requestor’s identity or authority to make the
                    request and to comply with the request.
                </p>
                <p>
                    Following the fulfillment of your opt-out request, we will wait at least twelve months before asking you to reauthorize Personal Information sales. However, you may opt-in to Personal Information sales at any time, by contacting
                    us using any method in the Contact Information section.
                </p>
                <p>
                    Non-Discrimination: We will not discriminate against you for exercising any of your CCPA rights. Unless permitted by the CCPA: we will not deny you goods or services; charge you different prices or rates for goods or services,
                    including through granting discounts or other benefits, or imposing penalties; provide you a different level or quality of good or services; or suggest that you may receive a different price or rate for goods or services or a
                    different level or quality of goods or services.
                </p>
                <h3>SECURITY:</h3>
                <p>
                    We have implemented reasonable security measures designed to secure your Personal Data from accidental loss, unauthorized access, use, alteration and disclosure, however we do not provide any guarantee that your Personal Data
                    will remain secure. We are not responsible for circumvention of any privacy settings or security measures contained on the Sites. All information you provide to us is stored on our service providers’ servers which utilize
                    industry standard security controls; however, we do not have control over and will not be liable for third parties’ security processes. Any transmission of information or Personal Data is at your own risk
                </p>
                <h3>MINORS:</h3>
                <p>
                    Our services are neither directed at nor intended for direct use by individuals under the age of 18 or the age of majority in the jurisdiction where they reside. Further we do not intentionally gather information about such
                    individuals. If we learn that we have inadvertently done so, we will promptly delete it. Do not access or use the Sites if you are not the age of majority in your jurisdiction unless you have the consent of your parent or
                    guardian.
                </p>
                <h3>INTERNATIONAL TRANSFERS:</h3>
                <p>
                    We operate in the United States. Our Sites may be accessed from anywhere, and users outside of our target United States markets may submit their Personal Data to us via forms, comment fields, or other input mechanisms. If you
                    are accessing the Sites from outside the United States, or submitting your Personal Data to us from outside the United States, your Personal Data may be transferred to, stored, or processed in the United States and maintained on
                    computers or servers located outside of your state, province, country, or other governmental jurisdiction where the privacy laws may not be as protective those in your jurisdiction. By accessing our Sites, you understand and
                    consent to the transfer of your information to the United States and to those third parties with whom we share it as described in this Policy, whether or not we can currently serve your jurisdiction.
                </p>

                <h3>CONTACT INFORMATION:</h3>
                <address>
                    <strong>Email:</strong> {{ config('base.contact_email') }}<br />
                </address>
            </div>
        </div>
    </div>
</div>
@include('lpv23.partials.footers.footer')
@endsection

@section('script')
@endsection