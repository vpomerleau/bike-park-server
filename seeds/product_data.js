/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const productData = require('../seed_data/product');

exports.seed = function (knex) {
  return knex('products')
    .del()
    .then(()=>{
      return knex('products').insert(productData);
    })
    // repeat for other tables
    // .then(() => {
    //   return knex('inventory').del();
    // })
    // .then(() => {
    //   return knex('inventory').insert(inventoryData);
    // });
};