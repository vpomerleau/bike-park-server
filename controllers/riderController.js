const knexConfig = require("../knexfile").development;
const knex = require("knex")(knexConfig);

exports.index = (req, res) => {
  knex
    .select("*")
    .from("riders")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving riders: ${err}`));
};

exports.riderById = (_req, res) => {
  const { id } = _req.params;

  knex("riders")
    .where({ id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving rider: ${err}`));
};

exports.riderByEmail = (_req, res) => {
  const { email } = _req.params;

  knex("riders")
    .where({ email })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving rider: ${err}`));
};

exports.new = (req, res) => {
  knex("riders")
    .insert(req.body)
    .then(() => {
      res.status(201).send("Rider created");
    });
};
