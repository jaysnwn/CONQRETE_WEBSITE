import LegalPage from '@/components/ui/legal-page';

export default function WarrantyPolicy() {
  const sections = [
    { id: 'sec-1', title: '1. WARRANTY PERIOD' },
    { id: 'sec-2', title: '2. WHO IS COVERED' },
    { id: 'sec-3', title: '3. WHAT THE WARRANTY COVERS' },
    { id: 'sec-4', title: '4. WARRANTY REMEDY' },
    { id: 'sec-5', title: '5. PROOF OF PURCHASE' },
    { id: 'sec-6', title: '6. WARRANTY CLAIM PROCESS' },
    { id: 'sec-7', title: '7. WARRANTY ASSESSMENT' },
    { id: 'sec-8', title: '8. SHIPPING FOR APPROVED WARRANTY CLAIMS' },
    { id: 'sec-9', title: '9. WHAT IS NOT COVERED' },
    { id: 'sec-10', title: '10. PRODUCT COMPATIBILITY' },
    { id: 'sec-11', title: '11. COMMERCIAL OR INDUSTRIAL USE' },
    { id: 'sec-12', title: '12. WARRANTY DOES NOT COVER DATA' },
    { id: 'sec-13', title: '13. REPLACEMENT PRODUCTS' },
    { id: 'sec-14', title: '14. NO CASH ALTERNATIVE' },
    { id: 'sec-15', title: '15. WARRANTY EXCLUSIONS AND LEGAL RIGHTS' },
    { id: 'sec-16', title: '16. WARRANTY CLAIM DENIAL' },
    { id: 'sec-17', title: '17. CONTACT FOR WARRANTY CLAIMS' }
  ];

  return (
    <LegalPage title="Warranty Policy" lastUpdated="31 August 2026" breadcrumbCurrent="Warranty Policy" sections={sections}>
      <p>CONQRETE CORP PVT LTD provides a limited warranty on CONQRETE products purchased through authorised sales channels.</p>
      <p>The CONQRETE warranty covers eligible manufacturing defects for a period of 6 months from the date of purchase, subject to the terms and conditions contained in this Warranty Policy.</p>

      <section id="sec-1">
        <h2>1. WARRANTY PERIOD</h2>
        <p>All eligible CONQRETE products are covered by a 6-month warranty from the date of purchase.</p>
        <p>The date of purchase will generally be determined from the applicable invoice or order record.</p>
        <p>Customers should retain their invoice or order details for the duration of the warranty period.</p>
      </section>

      <section id="sec-2">
        <h2>2. WHO IS COVERED</h2>
        <p>The warranty applies to the original purchaser of the product.</p>
        <p>The warranty is non-transferable.</p>
        <p>A product purchased by one person and subsequently sold, gifted or transferred to another person does not automatically carry the warranty to the subsequent owner, subject to any rights that may apply under applicable law.</p>
      </section>

      <section id="sec-3">
        <h2>3. WHAT THE WARRANTY COVERS</h2>
        <p>The warranty covers manufacturing defects and defects in workmanship that occur under normal and intended use during the warranty period.</p>
        <p>A manufacturing defect may include a failure caused by a defect in materials, components or manufacturing workmanship that existed when the product was manufactured.</p>
        <p>The warranty does not cover damage caused after manufacture through misuse, accident, external conditions, unauthorised modification or other circumstances described below.</p>
      </section>

      <section id="sec-4">
        <h2>4. WARRANTY REMEDY</h2>
        <p>If CONQRETE determines that a product has a valid manufacturing defect covered by this Warranty Policy, CONQRETE may, at its discretion and subject to applicable law:</p>
        <ul>
          <li>Repair the product;</li>
          <li>Replace the product with the same or an equivalent product; or</li>
          <li>Provide another appropriate remedy where required by applicable law.</li>
        </ul>
        <p>The availability of a replacement product may depend on stock availability.</p>
      </section>

      <section id="sec-5">
        <h2>5. PROOF OF PURCHASE</h2>
        <p>A warranty claim may require the customer to provide:</p>
        <ul>
          <li>Invoice; or</li>
          <li>Order number; and</li>
          <li>Product information; and</li>
          <li>Serial number, where applicable.</li>
        </ul>
        <p>CONQRETE may request additional information reasonably necessary to assess the claim.</p>
      </section>

      <section id="sec-6">
        <h2>6. WARRANTY CLAIM PROCESS</h2>
        <p>To submit a warranty claim, contact:</p>
        <ul>
          <li>Email: <a href="mailto:ask@conqrete.in">ask@conqrete.in</a></li>
          <li>Phone / WhatsApp: +91 9022281117</li>
        </ul>
        <p>The customer may be asked to provide:</p>
        <ul>
          <li>Name</li>
          <li>Contact number</li>
          <li>Email address</li>
          <li>Invoice/order number</li>
          <li>Product name</li>
          <li>Product serial number, if applicable</li>
          <li>Description of the problem</li>
          <li>Photographs of the product</li>
          <li>Video demonstrating the problem, where necessary</li>
          <li>Other information reasonably required for assessment</li>
        </ul>
      </section>

      <section id="sec-7">
        <h2>7. WARRANTY ASSESSMENT</h2>
        <p>CONQRETE may review the information provided by the customer before approving a warranty claim.</p>
        <p>Where necessary, CONQRETE may require the product to be returned for physical inspection or testing.</p>
        <p>A warranty claim is not considered finally approved merely because a customer reports a problem.</p>
        <p>CONQRETE may conduct a reasonable assessment to determine whether the issue is covered by this Warranty Policy.</p>
      </section>

      <section id="sec-8">
        <h2>8. SHIPPING FOR APPROVED WARRANTY CLAIMS</h2>
        <p>For an approved warranty claim involving a covered manufacturing defect, CONQRETE will bear the applicable shipping costs for the warranty process.</p>
        <p>Customers must follow the shipping instructions provided by CONQRETE.</p>
        <p>Customers should not send a product to an address that has not been provided or authorised by CONQRETE.</p>
        <p>CONQRETE may not reimburse unauthorised shipping arrangements unless expressly agreed in advance.</p>
      </section>

      <section id="sec-9">
        <h2>9. WHAT IS NOT COVERED</h2>
        <p>The CONQRETE warranty does not cover defects, failures or damage caused by circumstances other than manufacturing defects, including:</p>
        
        <h3>9.1 Physical Damage</h3>
        <ul>
          <li>Cracks</li>
          <li>Breakage</li>
          <li>Dents</li>
          <li>Bent connectors</li>
          <li>Broken ports</li>
          <li>Broken housing</li>
          <li>Scratches caused by use</li>
          <li>Impact damage</li>
          <li>Crushing</li>
          <li>Damage caused by dropping</li>
        </ul>
        
        <h3>9.2 Accidental Damage</h3>
        <p>Damage resulting from accidents, mishandling or unintended use is not covered.</p>
        
        <h3>9.3 Liquid and Moisture Damage</h3>
        <p>Damage caused by:</p>
        <ul>
          <li>Water</li>
          <li>Liquid</li>
          <li>Moisture</li>
          <li>Humidity</li>
          <li>Corrosion caused by liquid exposure</li>
        </ul>
        <p>is not covered unless specifically stated for a particular product.</p>
        
        <h3>9.4 Electrical Damage</h3>
        <p>Damage caused by:</p>
        <ul>
          <li>Incorrect voltage</li>
          <li>Incorrect electrical input</li>
          <li>Electrical surge</li>
          <li>Power fluctuation</li>
          <li>Short circuit caused by external equipment</li>
          <li>Improper electrical connection</li>
          <li>Electrical conditions outside product specifications</li>
        </ul>
        <p>is not covered.</p>
        
        <h3>9.5 Improper Use</h3>
        <p>Damage resulting from using the product contrary to:</p>
        <ul>
          <li>Product instructions</li>
          <li>Safety instructions</li>
          <li>Technical specifications</li>
          <li>Intended use</li>
          <li>Compatibility requirements</li>
        </ul>
        <p>is not covered.</p>
        
        <h3>9.6 Unauthorised Modification</h3>
        <p>The warranty does not cover products that have been:</p>
        <ul>
          <li>Modified</li>
          <li>Altered</li>
          <li>Opened improperly</li>
          <li>Tampered with</li>
          <li>Rewired</li>
          <li>Disassembled</li>
          <li>Reconfigured</li>
        </ul>
        <p>where the modification or tampering caused or contributed to the claimed defect.</p>
        
        <h3>9.7 Unauthorised Repair</h3>
        <p>Damage caused by repair, servicing or attempted repair by a person or service centre not authorised by CONQRETE is not covered.</p>
        
        <h3>9.8 Negligence and Abuse</h3>
        <p>Damage caused by:</p>
        <ul>
          <li>Negligence</li>
          <li>Abuse</li>
          <li>Misuse</li>
          <li>Improper handling</li>
          <li>Deliberate damage</li>
        </ul>
        <p>is not covered.</p>
        
        <h3>9.9 Normal Wear and Tear</h3>
        <p>Normal deterioration resulting from ordinary use is not considered a manufacturing defect.</p>
        
        <h3>9.10 Cosmetic Damage</h3>
        <p>Cosmetic damage that does not affect the functional operation of the product is not covered.</p>
        <p>This may include normal scratches, surface marks, colour variation or similar cosmetic changes resulting from ordinary use.</p>
        
        <h3>9.11 Incompatible Equipment</h3>
        <p>Damage caused by using the product with equipment, chargers, cables, accessories, power sources or other devices that are incompatible with the product specifications is not covered.</p>
      </section>

      <section id="sec-10">
        <h2>10. PRODUCT COMPATIBILITY</h2>
        <p>Customers are responsible for ensuring that the product is suitable for their intended application and compatible with the equipment with which it is used.</p>
        <p>Where CONQRETE provides compatibility information, customers should follow the applicable product specifications and instructions.</p>
        <p>Damage caused by incompatible equipment or use outside stated specifications may not be covered.</p>
      </section>

      <section id="sec-11">
        <h2>11. COMMERCIAL OR INDUSTRIAL USE</h2>
        <p>Unless expressly stated otherwise for a particular product, the warranty applies to normal intended use.</p>
        <p>Damage resulting from abnormal, excessive, abusive, unsafe or unintended commercial or industrial use may not be covered where such use is inconsistent with the product's stated specifications or intended application.</p>
      </section>

      <section id="sec-12">
        <h2>12. WARRANTY DOES NOT COVER DATA</h2>
        <p>Where a product stores, transmits or interacts with data, the customer is responsible for backing up their data.</p>
        <p>CONQRETE is not responsible for loss of data resulting from repair, replacement, testing or other warranty service, to the extent permitted by applicable law.</p>
      </section>

      <section id="sec-13">
        <h2>13. REPLACEMENT PRODUCTS</h2>
        <p>Where CONQRETE provides a replacement, the replacement may be the same model or an equivalent model depending on availability and applicable circumstances.</p>
        <p>A replacement does not automatically create a new six-month warranty period unless required by applicable law or expressly stated by CONQRETE.</p>
      </section>

      <section id="sec-14">
        <h2>14. NO CASH ALTERNATIVE</h2>
        <p>Where a valid warranty claim is approved, CONQRETE may generally choose an applicable repair or replacement remedy rather than providing a cash payment, except where a refund or other remedy is required under applicable law.</p>
      </section>

      <section id="sec-15">
        <h2>15. WARRANTY EXCLUSIONS AND LEGAL RIGHTS</h2>
        <p>This Warranty Policy describes CONQRETE's voluntary limited warranty.</p>
        <p>Nothing in this Warranty Policy is intended to exclude, restrict or waive any statutory consumer rights or remedies that cannot legally be excluded or limited.</p>
        <p>Where applicable law provides a consumer with rights beyond this limited warranty, those rights remain unaffected.</p>
      </section>

      <section id="sec-16">
        <h2>16. WARRANTY CLAIM DENIAL</h2>
        <p>A warranty claim may be denied where CONQRETE reasonably determines that:</p>
        <ul>
          <li>The warranty period has expired;</li>
          <li>The product is not a genuine CONQRETE product;</li>
          <li>Proof of purchase cannot reasonably be established;</li>
          <li>The claimed issue is not a manufacturing defect;</li>
          <li>The product has been damaged through misuse;</li>
          <li>The product has been physically damaged;</li>
          <li>The product has suffered liquid damage;</li>
          <li>The product has been modified or tampered with;</li>
          <li>The product has been repaired by an unauthorised person;</li>
          <li>The damage resulted from incompatible equipment;</li>
          <li>The damage resulted from incorrect electrical conditions;</li>
          <li>The claim otherwise falls outside the scope of this Warranty Policy.</li>
        </ul>
        <p>Where a claim is denied, CONQRETE may communicate the applicable reason to the customer.</p>
      </section>

      <section id="sec-17">
        <h2>17. CONTACT FOR WARRANTY CLAIMS</h2>
        <p>CONQRETE CORP PVT LTD<br/>Warranty Support<br/>Email: <a href="mailto:ask@conqrete.in">ask@conqrete.in</a><br/>Phone / WhatsApp: +91 9022281117<br/>Support Hours: 10:00 AM &ndash; 5:00 PM<br/>Working Days: Monday &ndash; Friday</p>
      </section>
    </LegalPage>
  );
}
