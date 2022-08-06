const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);

// Stripe test secret API key (for development - does not receive payments)
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let orderAmount = 0;
  items.map((item) => {
    const subtotal = item.price * item.quantity;
    orderAmount += subtotal;
  });

  return orderAmount * 100;
};

exports.new = async (req, res) => {
  const items = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  // create an entry in the transactions table
  // include transaction id
  // include rider email
  // include paymentIntent.status (pending, success, error)


  // for each item in the order
  items.map(item=>{
    // create a new entry in the rider products table
    // include rider.email
    // include paymentIntent.id as transaction id
    // include product id
    // include product quantity

  })

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  });
};