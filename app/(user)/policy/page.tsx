import React from 'react'

export default function page() {
  return (
    <main className='bg-green-100 p-16'>
      <section className='md:max-w-screen-lg mx-auto pt-8'>
      <h1 className='text-5xl font-bold text-center uppercase mb-4'>Our Policy</h1>
      <p className='text-lg text-center mb-16'>Take a moment to review our comprehensive policy to understand how we prioritize your privacy and security</p>
        <div className='bg-slate-50 p-8 rounded-xl relative mb-8'>
          <h1 className='bg-yellow-10 absolute -top-3 text-white-100 px-4 py-1 rounded-xl font-semibold'>Ordering and Payment</h1>
          <p className='text-black-100'>Shopping at STAD & CO should be a breeze! To ensure a smooth experience, we require customers to be 18 years old or older with a valid payment method. We accept a variety of convenient options, including. Once you finalize your order, you'll receive a confirmation email with all the details, providing peace of mind throughout the process.</p>
        </div>

        <div className='bg-slate-50 p-8 rounded-xl relative mb-8'>
          <h1 className='bg-yellow-10 absolute -top-3 text-white-100 px-4 py-1 rounded-xl font-semibold'>Pricing and Shipping</h1>
          <p className='text-black-100'>Transparency is key at STAD & CO. All our product prices are clearly displayed in riel to avoid confusion. While we strive for consistency, we reserve the right to adjust pricing without prior notice. To help you budget effectively, shipping costs are calculated based on your order total and destination. You'll see the exact shipping cost before finalizing your purchase. Estimated delivery times are also readily available on our dedicated shipping information page.</p>
        </div>

        <div className='bg-slate-50 p-8 rounded-xl relative mb-8'>
          <h1 className='bg-yellow-10 absolute -top-3 text-white-100 px-4 py-1 rounded-xl font-semibold'>Returns and Exchanges</h1>
          <p className='text-black-100'>We understand that sometimes things don't work out quite as planned.  STAD & CO offers a customer-friendly return and exchange policy for most items, lasting 7 days from the receipt of your order.  For a full refund, simply ensure the returned item is unused and in its original condition with tags attached.  Detailed information regarding return processing and any potential restocking fees can be found on our returns and exchanges page.</p>
        </div>

        <div className='bg-slate-50 p-8 rounded-xl relative mb-8'>
          <h1 className='bg-yellow-10 absolute -top-3 text-white-100 px-4 py-1 rounded-xl font-semibold'>Privacy and Security</h1>
          <p className='text-black-100'>Your privacy is a top priority at STAD & CO. We are committed to protecting your personal information and have a comprehensive Privacy Policy outlining exactly how we collect, use, and disclose your data.  This policy is easily accessible on our website for complete transparency.</p>
        </div>

        <div className='bg-slate-50 p-8 rounded-xl relative mb-8'>
          <h1 className='bg-yellow-10 absolute -top-3 text-white-100 px-4 py-1 rounded-xl font-semibold'>Intellectual Property</h1>
          <p className='text-black-100'>The content you see on our online store, including text, graphics, logos, and images, is the intellectual property of STAD & CO or its licensors.  Copyright and other intellectual property laws safeguard this content.</p>
        </div>

      </section>

    </main>
  )
}
