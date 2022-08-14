const knexConfig = require("../knexfile");
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
  const { id } = _req.params;
  console.log(id);

  knex("rider_product")
    .join("products", "rider_product.product_id", "=", "products.id")
    .select("products.name","rider_product.quantity")
    .where({ "rider_id": id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving rider products: ${err}`)
    );
};

exports.new = (req, res) => {
  const riderProductInfo = req.body;

  knex("rider_product")
    .insert(riderProductInfo)
    .onConflict("id")
    .ignore()
    .then(() => {
      knex("rider_product")
        .select("*")
        .where("rider_id", riderProductInfo.rider_id)
        .then((data) => {
          res.status(201).send(data);
        });
    });
};
