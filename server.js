const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const nocache = require("nocache");
const { messagesRouter } = require("./messages/messages.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");

const productRoutes = require("./routes/productRouter");
const riderRoutes = require("./routes/riderRouter");
const stripeRoutes = require("./routes/stripeRouter");
const transactionRoutes = require("./routes/transactionRouter");
const productTransactionRoutes = require("./routes/productTransactionRouter");
const riderProductRoutes = require("./routes/riderProductRouter");

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT = parseInt(process.env.PORT, 10) || 8080;
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;

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
        "script-src": [
          "'self'",
          "https://checkout.stripe.com",
          "https://js.stripe.com",
        ],
        "connect-src": [
          "https://checkout.stripe.com",
          "https://api.stripe.com",
        ],
        "frame-src": [
          "https://checkout.stripe.com",
          "https://js.stripe.com",
          "https://hooks.stripe.com",
        ],
        "img-src": ["https://*.stripe.com"],
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

// Routes
app.use("/products", productRoutes);
app.use("/riders", riderRoutes);
app.use("/stripe", stripeRoutes);
app.use("/transaction", transactionRoutes);
app.use("/product-transaction", productTransactionRoutes);
app.use("/rider-product", riderProductRoutes);

app.use("/api", apiRouter);
apiRouter.use("/messages", messagesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(process.env.PORT | PORT, () => {
  console.log(`🚲 Listening on port ${PORT}`);
});
