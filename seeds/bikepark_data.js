/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const riderData = require('../seed_data/rider');

exports.seed = function (knex) {
  return knex('rider') // this table doesn't exit yet
    .del()
    .then(function () {
      return knex('rider').insert(riderData);
    })
    // repeat for other tables
    // .then(() => {
    //   return knex('inventory').del();
    // })
    // .then(() => {
    //   return knex('inventory').insert(inventoryData);
    // });
};