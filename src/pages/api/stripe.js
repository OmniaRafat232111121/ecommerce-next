import Stripe from 'stripe';
// import Cors from 'cors'
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.cartItems);
    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
              { shipping_rate: 'shr_1My4LQF4L88dYPyZ4jBwWAZ1' },
            ],
            line_items: req.body.map((item) => {
              const img = item.image[0].asset._ref;
              const newImage = img.replace('image-',
               'https://cdn.sanity.io/images/tfv6nuvs/production/').replace('-webp', '.webp');
    
              return {
                price_data: { 
                  currency: 'usd',
                  product_data: { 
                    name: item.name,
                    images: [newImage],
                  },
                  unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                  enabled:true,
                  minimum: 1,
                },
                quantity: item.quantity
              }
            }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
          };

    
      // Create Checkout Sessions from body params.
      res.status(200).send(
        //session
         await stripe.checkout.sessions.create(params)
      );
      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}