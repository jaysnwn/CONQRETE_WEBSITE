export type Category = 'ALL' | 'GENERAL' | 'ORDERS & PAYMENTS' | 'SHIPPING' | 'RETURNS & REFUNDS' | 'WARRANTY' | 'PRODUCTS' | 'SUPPORT';

export const CATEGORIES: Category[] = [
  'ALL',
  'GENERAL',
  'ORDERS & PAYMENTS',
  'SHIPPING',
  'RETURNS & REFUNDS',
  'WARRANTY',
  'PRODUCTS',
  'SUPPORT'
];

export interface FAQ {
  id: string;
  category: Category;
  question: string;
  answer: string[];
  highlight?: string;
  links?: { text: string; url: string }[];
}

export const FAQ_DATA: FAQ[] = [
  {
    id: '01',
    category: 'GENERAL',
    question: 'What is CONQRETE?',
    answer: [
      'CONQRETE is a technology and electronics brand focused on everyday power and connectivity products, including chargers, adapters, data cables and power banks.',
      'We design our products with a focus on reliable performance, practical functionality and modern design.'
    ]
  },
  {
    id: '02',
    category: 'GENERAL',
    question: 'Where can I buy CONQRETE products?',
    answer: [
      'CONQRETE products are available through our official website at www.conqrete.in and through authorised sales channels.',
      'For authenticity and warranty protection, we recommend purchasing from CONQRETE or an authorised seller.'
    ],
    links: [
      { text: 'www.conqrete.in', url: 'https://www.conqrete.in' }
    ]
  },
  {
    id: '03',
    category: 'GENERAL',
    question: 'Do you ship across India?',
    answer: [
      'Yes. CONQRETE currently ships across India.',
      'Delivery is generally completed within 3–6 business days, depending on the delivery location and logistics conditions.'
    ]
  },
  {
    id: '04',
    category: 'GENERAL',
    question: 'Are the prices shown on the website inclusive of GST?',
    answer: [
      'Yes. Product prices displayed on the CONQRETE website include applicable GST.'
    ]
  },
  {
    id: '05',
    category: 'ORDERS & PAYMENTS',
    question: 'What payment methods do you accept?',
    answer: [
      'We currently support: UPI, Credit cards, Debit cards, Net banking, Wallets, EMI, and Cash on Delivery.',
      'Available payment options may vary depending on your order and location.'
    ]
  },
  {
    id: '06',
    category: 'ORDERS & PAYMENTS',
    question: 'Is Cash on Delivery available?',
    answer: [
      'Cash on Delivery may be available for eligible locations and orders.',
      'Availability can vary depending on the delivery location, order value and other operational factors.'
    ]
  },
  {
    id: '07',
    category: 'ORDERS & PAYMENTS',
    question: 'How do I know if my order has been placed successfully?',
    answer: [
      'After successfully placing an order, you should receive an order confirmation through the contact details provided during checkout.',
      'You can also view your order information through your CONQRETE account, where available.',
      'If you have made a payment but have not received an order confirmation, contact us.'
    ],
    links: [
      { text: 'ask@conqrete.in', url: 'mailto:ask@conqrete.in' }
    ]
  },
  {
    id: '08',
    category: 'ORDERS & PAYMENTS',
    question: 'Can I cancel my order?',
    answer: [
      'You can contact us as soon as possible after placing your order to request cancellation.',
      'Cancellation may be possible if your order has not yet been processed or dispatched.',
      'Once an order has been dispatched, cancellation may no longer be possible.'
    ]
  },
  {
    id: '09',
    category: 'ORDERS & PAYMENTS',
    question: 'Can I change my delivery address after placing an order?',
    answer: [
      'Yes, you can contact us and request an address change before delivery.',
      'We will try to accommodate the request where operationally possible.',
      'Once an order has been dispatched, an address change may not always be possible.'
    ]
  },
  {
    id: '10',
    category: 'ORDERS & PAYMENTS',
    question: "My payment was successful, but my order wasn't confirmed. What should I do?",
    answer: [
      "Don't place the order again immediately.",
      "Contact our support team with your payment/order details so that we can check the transaction."
    ],
    highlight: 'Email: ask@conqrete.in | WhatsApp/Phone: +91 9022281117'
  },
  {
    id: '11',
    category: 'SHIPPING',
    question: 'How long does delivery take?',
    answer: [
      'Orders are generally delivered within 3–6 business days.',
      'Actual delivery time may vary depending on your location, courier serviceability, weather, public holidays and other logistical circumstances.'
    ]
  },
  {
    id: '12',
    category: 'SHIPPING',
    question: 'Which courier will deliver my order?',
    answer: [
      'We use multiple logistics partners depending on the destination and operational requirements.',
      'These may include: Delhivery, Shadowfax, Ecom Express, Shiprocket, and DTDC.',
      'The courier assigned to your order may vary.'
    ]
  },
  {
    id: '13',
    category: 'SHIPPING',
    question: 'How much does shipping cost?',
    answer: [
      'Shipping is FREE for orders of ₹999 or more.',
      'For orders below ₹999, a flat ₹50 shipping charge applies.',
      'The applicable shipping charge will be displayed at checkout.'
    ]
  },
  {
    id: '14',
    category: 'SHIPPING',
    question: 'Can I track my order?',
    answer: [
      'Yes. Where tracking is available, tracking information may be provided through your order details, email, SMS or WhatsApp.',
      'Tracking information is provided by the applicable logistics provider and may take some time to update after dispatch.'
    ]
  },
  {
    id: '15',
    category: 'SHIPPING',
    question: 'What should I do if my package arrives damaged or appears tampered with?',
    answer: [
      'If the package appears opened, tampered with or severely damaged, do not accept the delivery where reasonably possible.',
      'If you accept the package, take clear photographs/video of the package and contact CONQRETE within 24 hours of delivery.'
    ],
    highlight: 'Report transit damage within 24 hours. Email: ask@conqrete.in | WhatsApp: +91 9022281117'
  },
  {
    id: '16',
    category: 'SHIPPING',
    question: 'What if I entered the wrong delivery address?',
    answer: [
      'Contact us immediately.',
      'If the order has not yet been delivered, we may be able to change the address depending on the shipment status.',
      'If the order has already been successfully delivered to the address provided during checkout, we may not be able to provide a refund for an incorrect address, subject to applicable law.'
    ]
  },
  {
    id: '17',
    category: 'RETURNS & REFUNDS',
    question: 'Do you accept returns?',
    answer: [
      'Yes.',
      'Eligible products can generally be returned within 7 days of delivery.',
      'Returns are subject to our Shipping & Returns Policy.'
    ],
    links: [
      { text: 'Shipping & Returns Policy', url: '/shipping-returns' }
    ]
  },
  {
    id: '18',
    category: 'RETURNS & REFUNDS',
    question: 'What products/issues are eligible for a return?',
    answer: [
      'Returns may be accepted where:',
      '• The wrong product was delivered',
      '• The product was damaged during transit',
      '• The product was defective on arrival',
      '• An item or essential component was missing',
      'The issue may need to be verified before the return is approved.'
    ]
  },
  {
    id: '19',
    category: 'RETURNS & REFUNDS',
    question: 'Can I return a product if I simply changed my mind?',
    answer: [
      'Generally, no.',
      'CONQRETE does not generally accept returns solely because a customer changed their mind or no longer wants the product.',
      'This does not affect any mandatory rights available under applicable law.'
    ]
  },
  {
    id: '20',
    category: 'RETURNS & REFUNDS',
    question: 'How long do I have to request a return?',
    answer: [
      'Eligible returns should generally be requested within 7 days of delivery.',
      'For transit damage, we strongly recommend reporting the issue within 24 hours of delivery with photographs/video of the package.'
    ]
  },
  {
    id: '21',
    category: 'RETURNS & REFUNDS',
    question: 'Who pays for return shipping?',
    answer: [
      'For an approved eligible return caused by an issue attributable to CONQRETE, such as a wrong product, transit damage or defective-on-arrival product, CONQRETE will bear the applicable return shipping cost.'
    ]
  },
  {
    id: '22',
    category: 'RETURNS & REFUNDS',
    question: 'How will I receive my refund?',
    answer: [
      'Approved refunds are generally issued to the original payment method.',
      'For Cash on Delivery orders, we may request bank details or other information necessary to process the refund.'
    ]
  },
  {
    id: '23',
    category: 'RETURNS & REFUNDS',
    question: 'How long does a refund take?',
    answer: [
      'Approved refunds are generally processed within 5–7 business days after approval.',
      'The actual time for the amount to appear in your account may depend on your bank, card issuer, UPI provider or payment service provider.'
    ]
  },
  {
    id: '24',
    category: 'WARRANTY',
    question: 'Do CONQRETE products come with a warranty?',
    answer: [
      'Yes.',
      'All CONQRETE products are covered by a 6-month warranty against manufacturing defects, subject to the CONQRETE Warranty Policy.'
    ],
    links: [
      { text: 'Warranty Policy', url: '/warranty-policy' }
    ]
  },
  {
    id: '25',
    category: 'WARRANTY',
    question: 'What does the 6-month warranty cover?',
    answer: [
      'The warranty covers eligible manufacturing defects and workmanship defects occurring under normal and intended use during the warranty period.'
    ]
  },
  {
    id: '26',
    category: 'WARRANTY',
    question: 'What is not covered under warranty?',
    answer: [
      'The warranty does not generally cover damage caused by physical damage, accidental damage, liquid/water damage, burn marks, electrical surges, incorrect voltage, improper installation, misuse, negligence, abuse, modification or tampering, unauthorised repair, normal wear and tear, cosmetic damage, incompatible equipment or accessories, or use contrary to product instructions.',
      'Please refer to the complete Warranty Policy for details.'
    ],
    links: [
      { text: 'Warranty Policy', url: '/warranty-policy' }
    ]
  },
  {
    id: '27',
    category: 'WARRANTY',
    question: 'When does my warranty start?',
    answer: [
      'The 6-month warranty begins from the date of purchase, generally established through your invoice or order record.'
    ]
  },
  {
    id: '28',
    category: 'WARRANTY',
    question: 'What do I need to make a warranty claim?',
    answer: [
      'You may be asked to provide:',
      '• Invoice or order number',
      '• Product details',
      '• Serial number, where applicable',
      '• Description of the issue',
      '• Photographs or Video demonstrating the issue, where necessary'
    ]
  },
  {
    id: '29',
    category: 'WARRANTY',
    question: 'What happens after I submit a warranty claim?',
    answer: [
      'Our team will review the information and may ask you to provide additional details or return the product for inspection.',
      'If the issue is determined to be a covered manufacturing defect, CONQRETE may, at its discretion and subject to applicable law: Repair the product or replace it with the same or an equivalent product.'
    ]
  },
  {
    id: '30',
    category: 'WARRANTY',
    question: 'Who pays shipping for an approved warranty claim?',
    answer: [
      'For an approved warranty claim involving a covered manufacturing defect, CONQRETE will bear the applicable shipping costs for the warranty process.'
    ]
  },
  {
    id: '31',
    category: 'WARRANTY',
    question: 'Is the warranty transferable?',
    answer: [
      'No.',
      'The CONQRETE warranty is non-transferable and applies to the original purchaser, subject to applicable law.'
    ]
  },
  {
    id: '32',
    category: 'PRODUCTS',
    question: 'How do I know which charger is right for my device?',
    answer: [
      'Check the charging requirements and compatibility information for your device before purchasing.',
      'Each CONQRETE product page should provide the relevant specifications, output capabilities and compatibility information where applicable.',
      "If you're unsure, contact our support team before purchasing."
    ]
  },
  {
    id: '33',
    category: 'PRODUCTS',
    question: 'Can I use CONQRETE chargers with devices from other brands?',
    answer: [
      'In general, CONQRETE chargers are designed to work with compatible devices that meet the charger\'s stated specifications and supported charging protocols.',
      'Always check the product specifications and your device\'s requirements before use.'
    ]
  },
  {
    id: '34',
    category: 'PRODUCTS',
    question: 'Can I use any cable with a CONQRETE charger?',
    answer: [
      'Cable compatibility depends on the charger, cable and device.',
      'For best performance, use a cable that supports the required charging protocol, power rating and connector type.',
      'Refer to the specifications of the individual products for compatibility information.'
    ]
  },
  {
    id: '35',
    category: 'PRODUCTS',
    question: 'Why is my device charging slower than expected?',
    answer: [
      'Charging speed can depend on several factors, including: device compatibility, charger output, cable capability, charging protocol, battery condition, device temperature, device usage while charging, and manufacturer limitations.',
      'A charger capable of a particular output does not necessarily mean every connected device will charge at that maximum rate.'
    ]
  },
  {
    id: '36',
    category: 'SUPPORT',
    question: 'Do I need an account to place an order?',
    answer: [
      'If guest checkout is enabled, you may be able to place an order without creating an account.',
      'Creating an account can make it easier to manage your orders and access your order history.'
    ]
  },
  {
    id: '37',
    category: 'SUPPORT',
    question: 'I forgot my account password. What should I do?',
    answer: [
      'Use the password-reset option on the login page.',
      'If you continue to experience problems accessing your account, contact us.'
    ],
    links: [
      { text: 'ask@conqrete.in', url: 'mailto:ask@conqrete.in' }
    ]
  },
  {
    id: '38',
    category: 'SUPPORT',
    question: 'How can I contact CONQRETE?',
    answer: [
      'You can contact us through:',
      'Email: ask@conqrete.in',
      'Phone / WhatsApp: +91 9022281117',
      'Support Hours: 10:00 AM – 5:00 PM Monday – Friday'
    ],
    links: [
      { text: 'Contact Support', url: '/contact' }
    ]
  },
  {
    id: '39',
    category: 'SUPPORT',
    question: 'Where can I find your legal policies?',
    answer: [
      'You can find our policies below:'
    ],
    links: [
      { text: 'Privacy Policy', url: '/privacy-policy' },
      { text: 'Terms of Use', url: '/terms-of-use' },
      { text: 'Warranty Policy', url: '/warranty-policy' },
      { text: 'Shipping & Returns Policy', url: '/shipping-returns' }
    ]
  }
];
