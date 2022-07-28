exports.up = function (knex) {
    return knex.schema
      .createTable('rider', (table) => { // fill with table columns
        // table.increments('id').primary();
        // table.string('name').notNullable();
        // table.string('position').notNullable().defaultTo('Store Manager');
        // table.string('manager').notNullable();
        // table.string('address').notNullable();
        // table.string('phone').notNullable();
        // table.string('email').notNullable();
        // table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('booking', (table) => { // fill with table columns
        // table.increments('id').primary();
        // table.string('name').notNullable();
        // table.string('description').notNullable();
        // table
        //   .integer('warehouse_id')
        //   .unsigned()
        //   .notNullable()
        //   .references('id')
        //   .inTable('warehouse')
        //   .onUpdate('CASCADE')
        //   .onDelete('CASCADE');
        // table.integer('quantity').notNullable().defaultTo(0);
        // table.string('status').notNullable();
        // table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
      // repeat for other tables (e.g., product, etc.)
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('booking').dropTable('rider'); // chain databases according to foreign keys
  };
  