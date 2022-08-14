const knexConfig = require("../knexfile-example").development;
const knex = require("knex")(knexConfig);

exports.index = (req, res) => {
  knex
    .select("*")
    .from("product_transaction")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving list of all rider products: ${err}`));
};

exports.productsForOneTransaction = (_req, res) => {
  const { transactionId } = _req.params;

  knex("product_transaction")
    .where({ transaction_id:transactionId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving rider products: ${err}`));
};

exports.new = (req, res) => {
  knex("product_transaction")
    .insert(req.body)
    .then(() => {
      res.status(201).send("Product transaction added");
    });
};
