const knexConfig = require("../knexfile").development;
const knex = require('knex')(knexConfig);

exports.index = (req, res) => {
  knex
    .select("*")
    .from("transactions")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving list of transactions: ${err}`));
};

exports.transactionById = (_req, res) => {
  const id = _req.params;

  knex('transactions')
    .where('stripe_payment_id',id)
    .select('*')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving list of transactions: ${err}`));
};

exports.new = (req, res) => {
  knex('transactions')
    .insert(req.body)
    .then(() => {
      res.status(201).send('Transaction recorded');
    });
};
