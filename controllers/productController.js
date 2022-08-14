const knexConfig = require("../knexfile-example").development;
const knex = require('knex')(knexConfig);

exports.index = (req, res) => {
  knex
    .select("*")
    .from("products")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving products: ${err}`));
};

exports.new = (req, res) => {
  knex('products')
    .insert(req.body)
    .then(() => {
      res.status(201).send('Product created');
    });
};
