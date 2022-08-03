const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const knex = require("knex")(require("./knexfile"));
const nocache = require("nocache");
const { messagesRouter } = require("./messages/messages.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10) || 8080;
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

// Stripe test secret API key (for development - does not receive payments)
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

const app = express();
const apiRouter = express.Router();

app.use(express.static("public"));
app.use(express.json());
app.set("json spaces", 2);

// Auth0

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "default-src": ["'none'"],
        "frame-ancestors": ["'none'"],
      },
    },
    frameguard: {
      action: "deny",
    },
  })
);
app.use((req, res, next) => {
  res.contentType("application/json; charset=utf-8");
  next();
});
app.use(nocache());

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

// Database queries

// get all products
app.get("/products", (req, res) => {
  knex
    .select("*")
    .from("products")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send("Error getting products");
    });
});

// Stripe payment

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 2000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`🚲 Listening on port ${PORT}`);
});
