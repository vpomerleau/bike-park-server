/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// import seed data files, arrays of objects
const productData = require("../seed_data/product");
const riderData = require("../seed_data/rider");

exports.seed = function (knex) {
  return knex("products")
    .del()
    .then(() => {
      return knex("products").insert(productData);
    })
    .then(() => {
      return knex("riders").del();
    })
    .then(() => {
      return knex("riders").insert(riderData);
    });
  // repeat for other tables
  // .then(() => {
  //   return knex('inventory').del();
  // })
  // .then(() => {
  //   return knex('inventory').insert(inventoryData);
  // });
};
