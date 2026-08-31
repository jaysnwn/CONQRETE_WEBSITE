import LegalPage from '@/components/ui/legal-page';

export default function ShippingReturnsPolicy() {
  const sections = [
    { id: 'part-a', title: 'PART A &mdash; SHIPPING POLICY' },
    { id: 'sec-1', title: '1. SHIPPING WITHIN INDIA' },
    { id: 'sec-2', title: '2. SHIPPING CHARGES' },
    { id: 'sec-3', title: '3. DELIVERY TIME' },
    { id: 'sec-4', title: '4. ORDER PROCESSING' },
    { id: 'sec-5', title: '5. SHIPPING PARTNERS' },
    { id: 'sec-6', title: '6. TRACKING' },
    { id: 'sec-7', title: '7. DELIVERY ATTEMPTS' },
    { id: 'sec-8', title: '8. CUSTOMER RESPONSIBILITY FOR DELIVERY INFORMATION' },
    { id: 'sec-9', title: '9. ADDRESS CHANGE REQUESTS' },
    { id: 'sec-10', title: '10. INCORRECT ADDRESS AND SUCCESSFUL DELIVERY' },
    { id: 'sec-11', title: '11. FAILED DELIVERY AND RETURN TO SENDER' },
    { id: 'part-b', title: 'PART B &mdash; DAMAGED, OPENED OR TAMPERED PACKAGES' },
    { id: 'sec-12', title: '12. PACKAGE INSPECTION' },
    { id: 'sec-13', title: '13. OPEN OR TAMPERED PACKAGE' },
    { id: 'sec-14', title: '14. PHOTOGRAPHS AND VIDEO' },
    { id: 'sec-15', title: '15. REPORTING TRANSIT DAMAGE' },
    { id: 'part-c', title: 'PART C &mdash; RETURNS' },
    { id: 'sec-16', title: '16. RETURN WINDOW' },
    { id: 'sec-17', title: '17. ELIGIBLE RETURN REASONS' },
    { id: 'sec-18', title: '18. WRONG PRODUCT' },
    { id: 'sec-19', title: '19. PRODUCT DAMAGED DURING TRANSIT' },
    { id: 'sec-20', title: '20. DEFECTIVE ON ARRIVAL' },
    { id: 'sec-21', title: '21. MISSING PRODUCT OR COMPONENT' },
    { id: 'part-d', title: 'PART D &mdash; PRODUCTS THAT SHOULD NOT BE RETURNED' },
    { id: 'sec-22', title: '22. CHANGE OF MIND' },
    { id: 'sec-23', title: '23. DAMAGE CAUSED BY CUSTOMER' },
    { id: 'part-e', title: 'PART E &mdash; RETURN PROCEDURE' },
    { id: 'sec-24', title: '24. HOW TO REQUEST A RETURN' },
    { id: 'sec-25', title: '25. RETURN APPROVAL' },
    { id: 'sec-26', title: '26. RETURN PICKUP' },
    { id: 'sec-27', title: '27. RETURN SHIPPING COST' },
    { id: 'sec-28', title: '28. RETURN CONDITION' },
    { id: 'part-f', title: 'PART F &mdash; INSPECTION AND RESOLUTION' },
    { id: 'sec-29', title: '29. RETURN INSPECTION' },
    { id: 'sec-30', title: '30. POSSIBLE RESOLUTIONS' },
    { id: 'part-g', title: 'PART G &mdash; REFUNDS' },
    { id: 'sec-31', title: '31. REFUND METHOD' },
    { id: 'sec-32', title: '32. REFUND PROCESSING TIME' },
    { id: 'sec-33', title: '33. REFUND OF SHIPPING CHARGES' },
    { id: 'part-h', title: 'PART H &mdash; CANCELLATIONS' },
    { id: 'sec-34', title: '34. CUSTOMER CANCELLATION' },
    { id: 'sec-35', title: '35. CONQRETE CANCELLATION' },
    { id: 'part-i', title: 'PART I &mdash; WARRANTY VS RETURN' },
    { id: 'sec-36', title: '36. RETURN POLICY' },
    { id: 'sec-37', title: '37. WARRANTY POLICY' },
    { id: 'sec-38', title: '38. RETURN AND WARRANTY ARE DIFFERENT' },
    { id: 'part-j', title: 'PART J &mdash; CUSTOMER COMPLAINTS' },
    { id: 'sec-39', title: '39. CUSTOMER SUPPORT' },
    { id: 'sec-40', title: '40. GOOD-FAITH RESOLUTION' },
    { id: 'part-k', title: 'PART K &mdash; POLICY CHANGES' },
    { id: 'sec-41', title: '41. CHANGES TO THIS POLICY' },
    { id: 'part-l', title: 'PART L &mdash; GOVERNING LAW' },
    { id: 'sec-42', title: '42. APPLICABLE LAW' },
    { id: 'sec-43', title: '43. CONTACT INFORMATION' }
  ];

  return (
    <LegalPage title="Shipping & Returns Policy" lastUpdated="31 August 2026" breadcrumbCurrent="Shipping & Returns" sections={sections}>
      <p>This Shipping & Returns Policy explains the shipping, delivery, cancellation, return, replacement and refund procedures applicable to purchases made through the CONQRETE website.</p>
      <p>This policy applies to products purchased directly through CONQRETE\'s authorised online sales channels, subject to the terms below and applicable law.</p>

      <section id="part-a">
        <h2 className="part-header">PART A &mdash; SHIPPING POLICY</h2>
      </section>

      <section id="sec-1">
        <h2>1. SHIPPING WITHIN INDIA</h2>
        <p>CONQRETE currently ships products across India.</p>
        <p>Orders may be delivered to serviceable residential, commercial and other eligible addresses within India.</p>
        <p>Certain remote, restricted or otherwise non-serviceable locations may be subject to delivery limitations imposed by logistics providers.</p>
      </section>

      <section id="sec-2">
        <h2>2. SHIPPING CHARGES</h2>
        <p>CONQRETE provides the following standard shipping charges:</p>
        <ul>
          <li>Orders of ?999 or more: <strong>FREE SHIPPING</strong></li>
          <li>Orders below ?999: <strong>?50 shipping charge</strong></li>
        </ul>
        <p>The applicable shipping charge will be displayed during checkout before the customer completes the order.</p>
      </section>

      <section id="sec-3">
        <h2>3. DELIVERY TIME</h2>
        <p>Orders are generally expected to be delivered within:</p>
        <p><strong>3&ndash;6 business days</strong></p>
        <p>Delivery timelines are estimates and may vary depending on:</p>
        <ul>
          <li>Delivery location</li>
          <li>PIN code</li>
          <li>Logistics provider</li>
          <li>Courier capacity</li>
          <li>Weather</li>
          <li>Public holidays</li>
          <li>Transportation conditions</li>
          <li>Remote-area serviceability</li>
          <li>Operational disruptions</li>
          <li>Government restrictions</li>
          <li>Force majeure events</li>
          <li>Other circumstances outside CONQRETE\'s reasonable control</li>
        </ul>
      </section>

      <section id="sec-4">
        <h2>4. ORDER PROCESSING</h2>
        <p>Orders are generally processed after successful order placement and payment confirmation, subject to:</p>
        <ul>
          <li>Product availability</li>
          <li>Payment confirmation</li>
          <li>Address verification</li>
          <li>Fraud and security checks</li>
          <li>Operational requirements</li>
        </ul>
        <p>Orders may be processed during business days.</p>
        <p>Orders placed outside normal processing periods may be processed on the next available business day.</p>
      </section>

      <section id="sec-5">
        <h2>5. SHIPPING PARTNERS</h2>
        <p>CONQRETE may use multiple logistics and shipping providers depending on the destination, serviceability and operational requirements.</p>
        <p>These may include:</p>
        <ul>
          <li>Delhivery</li>
          <li>Shadowfax</li>
          <li>Ecom Express</li>
          <li>Shiprocket</li>
          <li>DTDC</li>
          <li>Other logistics providers</li>
        </ul>
        <p>CONQRETE may select or change the logistics provider without prior notice.</p>
      </section>

      <section id="sec-6">
        <h2>6. TRACKING</h2>
        <p>Where tracking is available, CONQRETE or the applicable logistics provider may provide tracking information.</p>
        <p>Tracking information may be delivered through:</p>
        <ul>
          <li>Email</li>
          <li>SMS</li>
          <li>WhatsApp</li>
          <li>Customer account</li>
          <li>Other communication channels</li>
        </ul>
        <p>Tracking information is provided by the applicable logistics provider and may not update immediately.</p>
      </section>

      <section id="sec-7">
        <h2>7. DELIVERY ATTEMPTS</h2>
        <p>The logistics provider may make one or more delivery attempts depending on its operational procedures.</p>
        <p>Customers should remain available at the provided delivery address or coordinate with the applicable delivery provider where necessary.</p>
        <p>Repeated failed delivery attempts may result in the shipment being returned to CONQRETE.</p>
      </section>

      <section id="sec-8">
        <h2>8. CUSTOMER RESPONSIBILITY FOR DELIVERY INFORMATION</h2>
        <p>Customers are responsible for providing accurate and complete:</p>
        <ul>
          <li>Name</li>
          <li>Address</li>
          <li>PIN code</li>
          <li>Mobile number</li>
          <li>Email address, where required</li>
          <li>Other delivery information</li>
        </ul>
        <p>CONQRETE is not responsible for delivery problems caused by incorrect or incomplete information provided by the customer, subject to applicable law.</p>
      </section>

      <section id="sec-9">
        <h2>9. ADDRESS CHANGE REQUESTS</h2>
        <p>If an order has not yet been delivered, the customer may contact CONQRETE and request a change of delivery address.</p>
        <p>CONQRETE may attempt to accommodate the request where operationally possible.</p>
        <p>An address change cannot be guaranteed, particularly after dispatch.</p>
        <p>Additional charges or delivery delays may apply where imposed by the logistics provider or where the requested change requires additional services.</p>
      </section>

      <section id="sec-10">
        <h2>10. INCORRECT ADDRESS AND SUCCESSFUL DELIVERY</h2>
        <p>If a customer provides an incorrect delivery address and the order is successfully delivered to the address supplied during checkout, CONQRETE may not be responsible for the resulting loss or inability to recover the package, subject to applicable law.</p>
        <p>Customers should verify their delivery information carefully before placing an order.</p>
      </section>

      <section id="sec-11">
        <h2>11. FAILED DELIVERY AND RETURN TO SENDER</h2>
        <p>If a shipment cannot be delivered because of:</p>
        <ul>
          <li>Incorrect address</li>
          <li>Incomplete address</li>
          <li>Incorrect PIN code</li>
          <li>Recipient unavailable</li>
          <li>Repeated failed delivery attempts</li>
          <li>Customer refusal</li>
          <li>Customer unavailability</li>
          <li>Other customer-related delivery issues</li>
        </ul>
        <p>the logistics provider may return the shipment to CONQRETE.</p>
        <p>Where this occurs, the customer should contact CONQRETE regarding available options.</p>
        <p>Any refund or re-shipment will be handled according to the circumstances and applicable law.</p>
      </section>

      <section id="part-b">
        <h2 className="part-header">PART B &mdash; DAMAGED, OPENED OR TAMPERED PACKAGES</h2>
      </section>

      <section id="sec-12">
        <h2>12. PACKAGE INSPECTION</h2>
        <p>Customers are strongly advised to inspect the outer package at the time of delivery.</p>
        <p>If the package appears:</p>
        <ul>
          <li>Opened</li>
          <li>Tampered with</li>
          <li>Severely damaged</li>
          <li>Torn</li>
          <li>Crushed</li>
          <li>Wet</li>
          <li>Unsealed</li>
          <li>Missing contents</li>
        </ul>
        <p>the customer should, where reasonably possible, refuse delivery and contact CONQRETE.</p>
      </section>

      <section id="sec-13">
        <h2>13. OPEN OR TAMPERED PACKAGE</h2>
        <p>Customers should not accept an obviously opened or tampered package where refusal at delivery is reasonably possible.</p>
        <p>If a customer accepts such a package, the customer should immediately document the condition of the package.</p>
      </section>

      <section id="sec-14">
        <h2>14. PHOTOGRAPHS AND VIDEO</h2>
        <p>Where a package appears damaged, opened or tampered with, customers should take clear photographs and, where possible, video showing:</p>
        <ul>
          <li>Outer packaging</li>
          <li>Shipping label</li>
          <li>Seals</li>
          <li>Visible damage</li>
          <li>Product packaging</li>
          <li>Product condition</li>
          <li>Missing or damaged components</li>
        </ul>
        <p>This evidence may be required to investigate a transit-damage or missing-item claim.</p>
      </section>

      <section id="sec-15">
        <h2>15. REPORTING TRANSIT DAMAGE</h2>
        <p>Customers should report visible transit damage, opened packages or missing contents to CONQRETE within:</p>
        <p><strong>24 hours of delivery</strong></p>
        <p>Reports should be made through:</p>
        <p>Email: <a href="mailto:ask@conqrete.in">ask@conqrete.in</a><br/>or<br/>Phone / WhatsApp: +91 9022281117</p>
        <p>The customer should provide the order number and supporting photographs/video where requested.</p>
      </section>

      <section id="part-c">
        <h2 className="part-header">PART C &mdash; RETURNS</h2>
      </section>

      <section id="sec-16">
        <h2>16. RETURN WINDOW</h2>
        <p>Eligible returns must generally be requested within:</p>
        <p><strong>7 days from the date of delivery</strong></p>
        <p>Requests made after the applicable period may not be accepted except where required by applicable law.</p>
      </section>

      <section id="sec-17">
        <h2>17. ELIGIBLE RETURN REASONS</h2>
        <p>CONQRETE accepts eligible returns where the product:</p>
        <ul>
          <li>Is the wrong product delivered;</li>
          <li>Was damaged during transit;</li>
          <li>Is defective on arrival;</li>
          <li>Is missing from the shipment;</li>
          <li>Does not correspond to the product ordered;</li>
          <li>Otherwise qualifies for return under applicable law.</li>
        </ul>
      </section>

      <section id="sec-18">
        <h2>18. WRONG PRODUCT</h2>
        <p>If CONQRETE sends a product different from the product ordered, the customer should contact CONQRETE within 7 days of delivery.</p>
        <p>The customer may be asked to provide:</p>
        <ul>
          <li>Order number</li>
          <li>Photographs</li>
          <li>Product details</li>
          <li>Packaging details</li>
          <li>Other information reasonably necessary to verify the issue</li>
        </ul>
        <p>If the wrong product was supplied, CONQRETE will arrange the applicable resolution.</p>
      </section>

      <section id="sec-19">
        <h2>19. PRODUCT DAMAGED DURING TRANSIT</h2>
        <p>Where a product is damaged during transit, the customer should report the issue within 24 hours where possible and provide photographs/video of the package and product.</p>
        <p>CONQRETE may coordinate with the logistics provider to investigate the shipment.</p>
        <p>Where the return is approved, CONQRETE will arrange the applicable return process.</p>
      </section>

      <section id="sec-20">
        <h2>20. DEFECTIVE ON ARRIVAL</h2>
        <p>If a product is defective when received, the customer should contact CONQRETE within 7 days of delivery.</p>
        <p>CONQRETE may request photographs, video or other information to determine whether the product is defective.</p>
        <p>Where appropriate, CONQRETE may provide a return, replacement, repair or refund according to the circumstances and applicable law.</p>
      </section>

      <section id="sec-21">
        <h2>21. MISSING PRODUCT OR COMPONENT</h2>
        <p>If an ordered product or an essential component is missing from the shipment, the customer should notify CONQRETE within 7 days of delivery.</p>
        <p>The customer may be asked to provide:</p>
        <ul>
          <li>Order number</li>
          <li>Photographs/video of the package</li>
          <li>Shipping label</li>
          <li>Contents received</li>
          <li>Description of the missing item</li>
        </ul>
        <p>CONQRETE will investigate and provide the applicable resolution.</p>
      </section>

      <section id="part-d">
        <h2 className="part-header">PART D &mdash; PRODUCTS THAT SHOULD NOT BE RETURNED</h2>
      </section>

      <section id="sec-22">
        <h2>22. CHANGE OF MIND</h2>
        <p>CONQRETE does not generally accept returns solely because a customer:</p>
        <ul>
          <li>Changed their mind;</li>
          <li>No longer wants the product;</li>
          <li>Ordered the wrong product for their personal requirements;</li>
          <li>Purchased the wrong product despite the product information being correctly displayed;</li>
          <li>Simply does not like the product.</li>
        </ul>
        <p>This restriction does not apply where applicable law gives the customer a mandatory right to return, refund or other remedy.</p>
      </section>

      <section id="sec-23">
        <h2>23. DAMAGE CAUSED BY CUSTOMER</h2>
        <p>A return may not be accepted as a standard return where the issue was caused by:</p>
        <ul>
          <li>Physical damage</li>
          <li>Accidental damage</li>
          <li>Liquid damage</li>
          <li>Improper use</li>
          <li>Misuse</li>
          <li>Negligence</li>
          <li>Tampering</li>
          <li>Unauthorised repair</li>
          <li>Modification</li>
          <li>Incorrect voltage</li>
          <li>Electrical surge</li>
          <li>Use with incompatible equipment</li>
          <li>Failure to follow product instructions</li>
        </ul>
        <p>Where the issue is a manufacturing defect, it may instead be handled under the Warranty Policy.</p>
      </section>

      <section id="part-e">
        <h2 className="part-header">PART E &mdash; RETURN PROCEDURE</h2>
      </section>

      <section id="sec-24">
        <h2>24. HOW TO REQUEST A RETURN</h2>
        <p>To request a return, contact:</p>
        <p>Returns & Complaints Team<br/>Email: <a href="mailto:ask@conqrete.in">ask@conqrete.in</a><br/>Phone / WhatsApp: +91 9022281117</p>
        <p>The customer should provide:</p>
        <ul>
          <li>Name</li>
          <li>Order number</li>
          <li>Product name</li>
          <li>Reason for return</li>
          <li>Photographs/video where applicable</li>
          <li>Description of the issue</li>
          <li>Other information reasonably requested by CONQRETE</li>
        </ul>
      </section>

      <section id="sec-25">
        <h2>25. RETURN APPROVAL</h2>
        <p>Submitting a return request does not automatically mean that the return has been approved.</p>
        <p>CONQRETE may review:</p>
        <ul>
          <li>Order information</li>
          <li>Delivery date</li>
          <li>Product condition</li>
          <li>Reason for return</li>
          <li>Photographs/video</li>
          <li>Packaging</li>
          <li>Product identity</li>
          <li>Other relevant information</li>
        </ul>
        <p>After assessment, CONQRETE will communicate the applicable resolution.</p>
      </section>

      <section id="sec-26">
        <h2>26. RETURN PICKUP</h2>
        <p>For an approved return, CONQRETE may arrange a return pickup through its logistics partner.</p>
        <p>Customers should:</p>
        <ul>
          <li>Pack the product securely</li>
          <li>Include the applicable accessories</li>
          <li>Include original packaging where reasonably possible</li>
          <li>Follow return instructions provided by CONQRETE</li>
        </ul>
        <p>Customers should not independently ship the product to CONQRETE unless specifically instructed to do so.</p>
      </section>

      <section id="sec-27">
        <h2>27. RETURN SHIPPING COST</h2>
        <p>For an approved eligible return arising from an issue attributable to CONQRETE, including:</p>
        <ul>
          <li>Wrong product</li>
          <li>Transit damage</li>
          <li>Defective-on-arrival product</li>
          <li>Missing item</li>
        </ul>
        <p>CONQRETE will bear the applicable return shipping cost.</p>
      </section>

      <section id="sec-28">
        <h2>28. RETURN CONDITION</h2>
        <p>Where applicable, the returned product should include:</p>
        <ul>
          <li>Product</li>
          <li>Relevant accessories</li>
          <li>Cables</li>
          <li>Adapters</li>
          <li>Manuals</li>
          <li>Other components supplied with the original order</li>
        </ul>
        <p>Where missing components affect the return or refund assessment, CONQRETE may take the missing items into account, subject to applicable law.</p>
      </section>

      <section id="part-f">
        <h2 className="part-header">PART F &mdash; INSPECTION AND RESOLUTION</h2>
      </section>

      <section id="sec-29">
        <h2>29. RETURN INSPECTION</h2>
        <p>Returned products may be inspected to verify:</p>
        <ul>
          <li>Product identity</li>
          <li>Condition</li>
          <li>Claimed defect</li>
          <li>Transit damage</li>
          <li>Missing components</li>
          <li>Signs of misuse</li>
          <li>Signs of tampering</li>
          <li>Return eligibility</li>
        </ul>
      </section>

      <section id="sec-30">
        <h2>30. POSSIBLE RESOLUTIONS</h2>
        <p>Depending on the circumstances, CONQRETE may provide:</p>
        <ul>
          <li>Replacement</li>
          <li>Repair</li>
          <li>Refund</li>
          <li>Missing-item resolution</li>
          <li>Other appropriate remedy</li>
        </ul>
        <p>The remedy will depend on the nature of the issue, product availability and applicable law.</p>
      </section>

      <section id="part-g">
        <h2 className="part-header">PART G &mdash; REFUNDS</h2>
      </section>

      <section id="sec-31">
        <h2>31. REFUND METHOD</h2>
        <p>Where a refund is approved, the refund will generally be issued to the original payment method.</p>
        <p>For Cash on Delivery orders, CONQRETE may request bank-account details or other information necessary to process the refund through an appropriate method.</p>
      </section>

      <section id="sec-32">
        <h2>32. REFUND PROCESSING TIME</h2>
        <p>Approved refunds are generally processed within:</p>
        <p><strong>5&ndash;7 business days after approval</strong></p>
        <p>The actual time taken for the amount to appear in the customer\'s account may depend on:</p>
        <ul>
          <li>Payment provider</li>
          <li>Bank</li>
          <li>Card issuer</li>
          <li>UPI provider</li>
          <li>Financial institution</li>
          <li>Other payment-processing circumstances</li>
        </ul>
      </section>

      <section id="sec-33">
        <h2>33. REFUND OF SHIPPING CHARGES</h2>
        <p>Where a return or refund is approved because of an issue attributable to CONQRETE, applicable shipping charges paid by the customer may be refunded as required by the circumstances and applicable law.</p>
        <p>Where a customer is not legally entitled to a refund, no refund will be provided merely because the customer requests one.</p>
      </section>

      <section id="part-h">
        <h2 className="part-header">PART H &mdash; CANCELLATIONS</h2>
      </section>

      <section id="sec-34">
        <h2>34. CUSTOMER CANCELLATION</h2>
        <p>Customers may contact CONQRETE to request cancellation as soon as possible after placing an order.</p>
        <p>Cancellation may be possible where the order has not yet been processed or dispatched.</p>
        <p>Once an order has been dispatched, cancellation may no longer be possible.</p>
        <p>Where cancellation is accepted, any applicable refund will be processed through the appropriate payment method.</p>
      </section>

      <section id="sec-35">
        <h2>35. CONQRETE CANCELLATION</h2>
        <p>CONQRETE may cancel an order before dispatch where reasonably necessary, including because of:</p>
        <ul>
          <li>Product unavailability</li>
          <li>Inventory errors</li>
          <li>Pricing errors</li>
          <li>Technical errors</li>
          <li>Suspected fraud</li>
          <li>Payment issues</li>
          <li>Incorrect information</li>
          <li>Operational restrictions</li>
          <li>Legal or regulatory requirements</li>
        </ul>
        <p>Where payment has already been received, an applicable refund will be processed.</p>
      </section>

      <section id="part-i">
        <h2 className="part-header">PART I &mdash; WARRANTY VS RETURN</h2>
      </section>

      <section id="sec-36">
        <h2>36. RETURN POLICY</h2>
        <p>The 7-day return process generally applies to eligible issues relating to the delivered order, including:</p>
        <ul>
          <li>Wrong product</li>
          <li>Transit damage</li>
          <li>Defective-on-arrival product</li>
          <li>Missing item</li>
        </ul>
      </section>

      <section id="sec-37">
        <h2>37. WARRANTY POLICY</h2>
        <p>The CONQRETE Warranty Policy provides a 6-month warranty against manufacturing defects, subject to the separate Warranty Policy.</p>
        <p>A manufacturing defect discovered after the initial return period may therefore be handled through the Warranty Policy.</p>
      </section>

      <section id="sec-38">
        <h2>38. RETURN AND WARRANTY ARE DIFFERENT</h2>
        <p>A product that has been damaged by misuse, accident, liquid, electrical surge, unauthorised repair, modification or other excluded circumstances is not automatically eligible for a return or warranty claim.</p>
        <p>CONQRETE will assess the applicable circumstances.</p>
      </section>

      <section id="part-j">
        <h2 className="part-header">PART J &mdash; CUSTOMER COMPLAINTS</h2>
      </section>

      <section id="sec-39">
        <h2>39. CUSTOMER SUPPORT</h2>
        <p>For shipping problems, returns, refunds, complaints or order-related issues:</p>
        <p>Returns & Complaints Team<br/>CONQRETE CORP PVT LTD<br/>Email: <a href="mailto:ask@conqrete.in">ask@conqrete.in</a><br/>Phone / WhatsApp: +91 9022281117<br/>Support Hours: 10:00 AM &ndash; 5:00 PM<br/>Working Days: Monday &ndash; Friday</p>
        <p>Where applicable, CONQRETE may provide a complaint or reference number so that the customer can track the status of the complaint.</p>
      </section>

      <section id="sec-40">
        <h2>40. GOOD-FAITH RESOLUTION</h2>
        <p>CONQRETE will make reasonable efforts to investigate customer complaints and provide an appropriate resolution in accordance with its policies and applicable law.</p>
        <p>Customers should provide accurate information and reasonable cooperation when investigating a complaint.</p>
      </section>

      <section id="part-k">
        <h2 className="part-header">PART K &mdash; POLICY CHANGES</h2>
      </section>

      <section id="sec-41">
        <h2>41. CHANGES TO THIS POLICY</h2>
        <p>CONQRETE may update this Shipping & Returns Policy from time to time to reflect:</p>
        <ul>
          <li>Changes in products</li>
          <li>Changes in logistics arrangements</li>
          <li>Changes in return procedures</li>
          <li>Changes in payment methods</li>
          <li>Changes in business practices</li>
          <li>Changes in applicable law</li>
        </ul>
        <p>The updated version will be published on the website with a revised "Last Updated" date.</p>
        <p>The version applicable to an order will generally be the version in effect at the relevant time, subject to applicable law.</p>
      </section>

      <section id="part-l">
        <h2 className="part-header">PART L &mdash; GOVERNING LAW</h2>
      </section>

      <section id="sec-42">
        <h2>42. APPLICABLE LAW</h2>
        <p>This Shipping & Returns Policy shall be governed by the laws applicable in India.</p>
        <p>Nothing in this Policy is intended to exclude, restrict or waive any mandatory consumer rights or remedies available under applicable law.</p>
      </section>

      <section id="sec-43">
        <h2>43. CONTACT INFORMATION</h2>
        <p>CONQRETE CORP PVT LTD<br/>Near Nehru Garden, Code 122, Sangamner, Ahmed Nagar &ndash; 422605, Maharashtra, India<br/>Returns & Complaints Team<br/>Email: <a href="mailto:ask@conqrete.in">ask@conqrete.in</a> Phone / WhatsApp: +91 9022281117<br/>Support Hours: 10:00 AM &ndash; 5:00 PM Working Days: Monday &ndash; Friday</p>
      </section>
    </LegalPage>
  );
}
