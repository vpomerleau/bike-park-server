const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

exports.index = (req, res) => {
  knex
    .select("*")
    .from("rider_product")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving list of all rider products: ${err}`)
    );
};

exports.productsForOneRider = (_req, res) => {
  const { riderId } = _req.params;

  knex("rider_product")
    .where({ rider_id: riderId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving rider products: ${err}`)
    );
};

exports.new = (req, res) => {
  knex("rider_product")
    .insert(req.body)
    .then(() => {
      knex("rider_product")
        .select("product_id", "quantity")
        .where("rider_id", req.body.rider_id)
        .then((data) => {
          res.status(201).send(data);
        });
    });
};
