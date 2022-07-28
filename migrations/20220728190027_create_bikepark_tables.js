exports.up = function (knex) {
    return knex.schema
      .createTable('rider', (table) => { // fill with table columns
        table.increments('id').primary();
        // table.string('name').notNullable();
        // table.string('position').notNullable().defaultTo('Store Manager');
        // table.string('manager').notNullable();
        // table.string('address').notNullable();
        // table.string('phone').notNullable();
        // table.string('email').notNullable();
        // table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      // repeat for other tables (e.g., bookings, product, etc.)
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('rider'); // chain databases according to foreign keys (tables with fkey first)
  };
  