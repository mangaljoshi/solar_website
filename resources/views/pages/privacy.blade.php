@extends('layouts.base')

@section('content')
    <section class="user-text page-paddings">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="user__text">
                        <h2>SECTION 1</h2>
                        <h3 class="theme-title">WHAT DO WE DO WITH YOUR INFORMATION?</h3>
                        <p></p>
                        <p>When you use our site, we collect the personal information you give us such as your name, address and email address.</p>
                        <p>When you browse our site, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</p>
                        <p>Email marketing : With your permission, we may send you emails about our service, new products and other updates.</p>
                        <p></p>
                        <h2>SECTION 2</h2>
                        <h3 class="theme-title">CONSENT</h3>
                        <p></p>
                        <p>How do you get my consent?</p>
                        <p>When you provide us with personal information to use our service, we imply that you consent to our collecting it and using it for that specific reason only.</p>
                        <p>If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>
                        <p>How do I withdraw my consent?</p>
                        <p>If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at <a href="mailto: {{ config('base.contact_email') }}"> {{ config('base.contact_email') }}</a></p>
                        <p></p>
                        <h2>SECTION 3</h2>
                        <h3 class="theme-title">DISCLOSURE</h3>
                        <p></p>
                        <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</p>
                        <p></p>
                        <h2>SECTION 4</h2>
                        <h3 class="theme-title">THIRD-PARTY SERVICES</h3>
                        <p></p>
                        <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
                        <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
                        <p>In particular, remember that certain providers may be located in or have facilities that are located in a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</p>
                        <div class="more">
                        <p>As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.</p>
                        <p>Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.</p>
                        <p></p>
                        <h3 class="theme-title">LINKS</h3>
                        <p></p>
                        <p>When you click on links on our site, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</p>
                        </div>
                        <p></p>
                        <h2>SECTION 5</h2>
                        <p></p>
                        <h3 class="theme-title">SPECIAL NOTICE TO CALIFORNIA RESIDENTS</h3>
                        <div class="more">
                        <p>California residents may also take advantage of the following rights:</p>
                        <ul>
                            <li>You may request, up to two times each year, that we disclose to you the categories and specific pieces of personal information that we have collected about you, the categories of sources from which your personal information is collected, the business or commercial purpose for collecting your personal information, the categories of personal information that we disclosed for a business purpose, any categories of personal information that we sold about you, the categories of third parties with whom we have shared your personal information, and the business or commercial purpose for selling your personal information, if applicable.</li>
                            <li>You may request that we delete any personal information that we have collected from or about you. Note that there are some reasons we will not be able to fully address your request, such as if we need to complete a transaction for you, to detect and protect against fraudulent and illegal activity, to exercise our rights, or to comply with a legal obligation.</li>
                            <li>You may request to opt out of {{ config('base.website_name') }}'s sale of your personal information to third parties, and to our affiliated companies that do not share the same brand name, for their direct marketing purposes. This means that, if you opt out, going forward, we will not share your information with such third parties to use for their purposes unless you later direct us to do so. To effect the opt out, please <a href="{{ route('contact') }}">click here</a>  </li>
                        </ul>
                        <p>To take advantage of your access and deletion rights, please <a href="./contact.html">click here</a>. For verification purposes, please provide your name, address, telephone number and email address. Further information may be required for verification. We value your privacy and will not discriminate in response to your exercise of your privacy rights. We will respond to your access and deletion requests within 45 days of receipt of your request, after proper verification, unless we need additional time, in which case we will let you know. We will respond to your opt of sale requests as soon as reasonably possible.</p>
                        <p>For purposes of compliance with the California Consumer Privacy Act, in addition to the further details as described throughout this Privacy Policy, we make the following disclosures:</p>
                        <ul>
                            <li>We collect the following categories of personal information: Identifiers/Contact Information (like your transaction history and service usage), Commercial information, Internet or other electronic network activity information, geolocation, visual and audio information, and profiles and inferences drawn from the above.</li>
                            <li>We sell the following categories of personal information: Identifiers/Contact Information, Internet or other electronic network activity information, and inferences drawn from the above. We have sold these categories of information in the preceding 12 months.</li>
                            <li>We disclose the following categories of personal information for a business or commercial purpose: Identifiers/Contact Information, Commercial information, Internet or other electronic network activity information, geolocation, visual and audio information, and inferences drawn from above.</li>
                        </ul>
                        </div>
                        <p></p>
                        <h2>SECTION 6</h2>
                        <h3 class="theme-title">YOUR CHOICES AND OPTING OUT</h3>
                        <p></p>
                        <p><strong>A. Cookies, Tracking Options and California Do Not Track Disclosures</strong><br>
                        Certain parts of our Site require cookies. You may adjust your device or Internet browser settings to limit certain tracking or to decline cookies, but by doing so, you may not be able to use certain features on the Site or take full advantage of all of our offerings. Please refer to your device’s settings or your Internet browser’s “Help” section for more information on how to delete and/or disable cookies or to control your tracking preferences.
                        </p>
                        <p>Our system may not recognize “do not track” (DNT) requests or headers from some or all browsers. We may use cookies or other technologies to deliver more relevant advertising and to link data collected across other computers or devices that you may use.</p>
                        <p><strong>B. Interest-Based Advertising Choices</strong><br>To understand your choices for receiving more relevant advertising provided on the Service or across other websites and online services, please review the information below:</p>
                        <div class="more">
                        <ul>
                            <li>To learn more about such interest-based advertising, and to opt out of such collection and use for interest-based advertising by the Digital Advertising Alliance (DAA) participating companies, please visit http://www.aboutads.info/choices/.</li>
                            <li>To opt out from the use of information about your online activities for interest-based advertising by Network Advertising Initiative (NAI) member companies, please visit http://www.networkadvertising.org/choices/.</li>
                            <li>To opt out of the use of your mobile device ID for targeted advertising, please see http://www.aboutads.info/appchoices.</li>
                            <li>If you wish to prevent your data from being used by Google Analytics, Google has developed the Google Analytics opt-out browser add-on available at https://tools.google.com/dlpage/gaoptout/.</li>
                            <li>On your mobile device, you may also adjust your privacy and advertising settings to control whether you want to receive more relevant advertising.</li>
                            <li>Even if you opt out, you still may receive advertising from us that is not customized based on your Service or usage information, or advertising from other third parties if they are not a DAA or NAI participating company.</li>
                        </ul>
                        </div>
                        <p><strong>C. Unsubscribing from Our Marketing Communications</strong><br>
                        We provide our customers with the opportunity to opt out of having their information used for purposes not directly related to placement, processing, fulfillment, or delivery of a product or service. To opt out of marketing communications or to request to be added to our Do Not Call List or Do Not Mail List, you may use one of these convenient methods:
                        </p>
                        <ul>
                        <li><strong>Electronic Promotional Offers:</strong> If you receive commercial email from us, you may unsubscribe at any time by following the instructions contained within the email. You may also opt out from receiving commercial email from us by sending us an email or by writing to us at the address given at the end of this policy. You should note that unsubscribing from our electronic mailings will not automatically unsubscribe your information from electronic communications sent by any third party, and you will need to separately unsubscribe from such third party’s communication, if desired.</li>
                        <li><strong>Direct Mail Offers:</strong> If you do not wish to be notified by postal mail regarding products, services, events, programs, and offers that we believe you may find of interest, you may opt out from such communications by sending us an email or by writing to us at the address given at the end of this policy.</li>
                        <li><strong>Telemarketing:</strong> If you do not want to receive marketing phone calls from us, you may: (i) email us at info@ {{ config('base.domain') }} with “Do Not Call” in the subject line; (ii) call customer care at 1-310-845-6421; (iii) ask to be placed on our Do Not Call list when you receive a call from us; or (iv) mail us at the address given at the end of this policy. Once we place your name on our internal “Do Not Call” list, we will no longer call you for marketing purposes (unless you submit another inquiry or request another consultation/quote from us subsequent to your initial request). Your instructions to limit the use of your information for these purposes will be processed as soon as reasonably practicable. Also, our Do-Not-Call process applies to calls made by us or by entities on our behalf. You may still receive calls from third parties who are not calling on our behalf regarding their products and services in which case you will need to request that those parties not call you, on a case-by-case basis.</li>
                        <li><strong>Third Party Analytic Technologies</strong>:<br> If you would like to opt out of participating in the collection of your web viewing data over time and across unaffiliated sites for interest-based and other applicable use, please visit http://www.aboutads.info/choices.</li>
                        </ul>
                        <p><strong>D. Unsubscribing from Third Party Communications</strong><br>
                        Any third parties to whom we may disclose personal information may have their own privacy policies which describe how they use and disclose personal information, and your choices. If you want to learn more about their privacy practices, we encourage you to visit the websites of those third parties.
                        </p>
                        <h2>SECTION 7</h2>
                        <p></p>
                        <h3 class="theme-title">How We Use Information Collected.</h3>
                        <p><strong>A. Providing Services and Products</strong>. We use the information we gather on our website to provide you with the services and or products you have requested. This may include passing your information on to a third party to provide such services or products. We do not control the privacy practices of these third parties. If you have any questions or wish to remove your information from the third party databases, you will need to contact that party directly. When you’ve submitted your Personal Information to us, with such submission you have understood and agreed to allow us and all identified third parties to contact you or allow our vendors to contact you via telephone for a limited period even if the telephone number you submitted appears on any state and/or federal Do Not Call list, because your inquiry serves as an exception to state and/or federal Do Not Call laws.</p>
                        <p><strong>B. Marketing</strong>. We also use the information you provide to us to send you advertisements, promotions and content by third parties that we think will be of interest to you. To provide this service we may anonymize and aggregate information for different purposes which include traffic flow, analysis usage, product development, market analysis, reports and other insights.</p>
                        <p><strong>C. Improving Our Website</strong>. We use the information we gather to respond to any inquires you make, operate and improve the functionality of our website, and deliver the products and services advertised on our website. Our services include the display of personalized products, content, and advertising, relating to your experience and interests. In addition, we use this information to comply with all legal obligations and resolve any disputes or concerns you may have.</p>
                        <p></p>
                        <h2>SECTION 8</h2>
                        <p></p>
                        <p><strong>Disclosure of Information to Others.</strong></p>
                        <p>a. We will share your personal information with third parties only in the ways that are described in this Privacy Statement.</p>
                        <p><strong>(i) Product and Service Delivery.</strong> We share your information with third party service providers who provide services such as contact information verification, payment processing, order fulfillment, customer service, website hosting, data analysis, infrastructure provision, IT services, email delivery services, auditing services and other similar services to enable them to provide services. This may include third party credit bureaus to verify you identity and obtain a credit report or score. When you seek insurance quotes, to the appropriate Department of Motor Vehicles to verify your driving record, previous claims history, vehicles and VIN.</p>
                        <p><strong>(ii) Website Functionality.</strong> We share your information with companies and individuals we employ to perform technical functions on our behalf. Examples include third parties who host our website, analyze our data, provide marketing assistance, process credit card payments, and provide customer service.</p>
                        <p><strong>(iii) Third Party Products and Services.</strong> We share your information with third parties who will provide you with their opportunities, products or services. This includes your personal and non-personal information, and includes your interests and preferences, so they may determine whether you might be interested in their products or services.</p>
                        <p><strong>(iv) Anonymous information.</strong> We share aggregated anonymous information about you, combined with other persons using our website with third parties, so that they can understand the kinds of visitors that come to our website, and how those visitors use our website. This includes demographic information and behavioral information.</p>
                        <div class="more">
                        <p><strong>(v) Legal Process.</strong> We disclose your information if legally required to do so, or at our discretion, pursuant to a request from a governmental entity, or if we believe in good faith that such action is necessary to (a) conform to legal requirements or comply with legal process; (b) protect our rights or property, or our affiliated companies; (c) prevent a crime or protect national security; or (d) protect the personal safety of users or the public.</p>
                        <p><strong>(vi) Acquisition or Merger.</strong> We may disclose and transfer your information to a third party who acquires any or all of our business, whether such acquisition is by way of merger, consolidation or purchase of all or a substantial portion of our assets. In the event we become the subject of an insolvency proceeding, whether voluntary or involuntary, we or our liquidator, administrator, receiver or administrative receiver may sell, license or otherwise dispose of, such information in a transaction approved by the court.</p>
                        </div>
                        <p></p>
                        <h2>SECTION 9</h2>
                        <h3 class="theme-title">SECURITY</h3>
                        <p></p>
                        <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
                        <p></p>
                        <h2>SECTION 10</h2>
                        <h3 class="theme-title">COOKIES</h3>
                        <p></p>
                        <p>Cookies are small text files created by a website that store information on your computer, such as your preferences when visiting that site. They are often stored on the device you are using to help track your areas of interest. When you visit our website, we may assign your computer one or more cookies, to facilitate access to our site and to personalize your online experience. Through the use of a cookie, we also may automatically collect information about your online activity on our site, such as the web pages you visit, the links you click, and the searches you conduct on our site. Most browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies. If you choose to decline cookies, please note that you may not be able to sign in or use some of the interactive features offered on our website.</p>
                        <p></p>
                        <h3 class="theme-title">THIRD PARTY ANALYTIC TECHNOLOGIES</h3>
                        <p></p>
                        <p>We may use third parties’ analytic and tracking tools, such as Google Analytics for Display Marketing to better understand who is using the Site, how people are using the Site and how to improve the effectiveness of the Site and its content, and to help us or those parties serve more targeted advertising to you across the Internet. These tools may use cookies, web beacons, pixel tags, log files, Flash cookies, or other technologies to collect and store non-personal information. They may also combine information they collect from your interaction with Site with information they collect from other sources. We do not have access to, or control over, these third parties’ use of cookies or other tracking technologies. If you would like to opt out of participating in the collection of your web viewing data over time and across unaffiliated sites for interest-based and other applicable use, please visit http://www.aboutads.info/choices.</p>
                        <div class="more">
                        <p></p>
                        <h3 class="theme-title">TRACKING OPTIONS AND CALIFORNIA DO NOT TRACK DISCLOSURES</h3>
                        <p></p>
                        <p>Certain parts of our Site require cookies. You are free to set your browser or operating system settings to limit certain tracking or to decline cookies, but by doing so, you may not be able to use certain features on the Site or take full advantage of all of our offerings. Please refer to your Web browser’s or operating system’s website or “Help” section for more information on how to delete and/or disable your browser or operating system from receiving cookies or controlling your tracking preferences. On your mobile device, you may also adjust your privacy and advertising settings to control whether you want to receive more relevant advertising. Our system may not respond to “do not track” (DNT) requests or signals from some or all browser. To learn more about the use of cookies or other technologies to deliver more relevant advertising and to know your choices with respect to collection and use of the data by these third party tools, you may visit here.</p>
                        <p></p>
                        <h3 class="theme-title">SPECIAL NOTICE TO CALIFORNIA RESIDENTS</h3>
                        <p></p>
                        <p>If you are a California resident, you may opt-out from having your information shared with or sold to third parties for their direct marketing purposes. To opt-out, please contact us at {{ config('base.contact_email') }}. You must put the statement “Your California Privacy Rights” in the subject field. We are not responsible for notices that are not labeled or sent properly, or do not have complete information. Non-affiliated third parties are independent from us and if you wish to receive information about your disclosure choices or stop communications from such third parties, you will need to contact those non-affiliated third parties directly.</p>
                        </div>
                        <p></p>
                        <h2>SECTION 11</h2>
                        <h3 class="theme-title">AGE OF CONSENT</h3>
                        <p></p>
                        <p>By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
                        <p></p>
                        <h2>SECTION 12</h2>
                        <h3 class="theme-title">CHANGES TO THIS PRIVACY POLICY</h3>
                        <p></p>
                        <p>
                        We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                        </p>
                        <p>If our site is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to offer services and products to you.</p>
                        <p>
                        Last Update: December 9th, 2022
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection