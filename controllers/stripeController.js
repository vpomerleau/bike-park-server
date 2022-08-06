const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

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
  const stringifiedCart = JSON.stringify(items);
  const calculatedAmount = calculateOrderAmount(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculatedAmount,
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      cart: stringifiedCart,
    },
  });

  res.send({
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    transactionStatus: paymentIntent.status,
    calculatedAmount: calculatedAmount,
  });
};

exports.paymentDetails = async (_req, res) => {
  const paymentIntentId = _req.params;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId.id);

  res.send(paymentIntent);
};
