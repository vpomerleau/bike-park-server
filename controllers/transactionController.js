const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig);

exports.index = (req, res) => {
  knex
    .select("*")
    .from("transactions")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving list of transactions: ${err}`)
    );
};

exports.transactionById = (_req, res) => {
  const id = _req.params;

  knex("transactions")
    .where("stripe_payment_id", id)
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving list of transactions: ${err}`)
    );
};

exports.new = (req, res) => {
  const { cart_details, stripe_payment_id, transaction_status, rider_id } =
    req.body;
  const transactionDetails = {
    rider_id: rider_id,
    transaction_status: transaction_status,
    stripe_payment_id: stripe_payment_id,
  };
  const cart = JSON.parse(cart_details);

  knex("transactions")
    .insert(transactionDetails)
    .onConflict("stripe_payment_id")
    .ignore()
    .then(() => {
      knex("transactions")
        .select("id")
        .where("stripe_payment_id", stripe_payment_id)
        .then((transaction) => {
          const transaction_id = transaction[0].id;
          Array.from(cart).forEach((item) => {
            const rider_product_id = `${transaction_id}-${item.id}`;
            knex("rider_product")
              .insert({
                id: rider_product_id,
                rider_id: rider_id,
                transaction_id: transaction_id,
                product_id: item.id,
                quantity: item.quantity,
              })
              .onConflict("id")
              .ignore()
              .then()
          });
          res.status(200).json(transaction_id);
        })
    });
};
