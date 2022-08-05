const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);

// exports.index = (_req, res) => {

//   knex('riders')
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error retrieving riders: ${err}`)
//     );
// };

// exports.new = (req, res) => {
//   knex('riders')
//     .insert(req.body)
//     .then(() => {
//       res.status(201).send('Rider created');
//     });
// };