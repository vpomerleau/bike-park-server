exports.up = function (knex) {
    return knex.schema
      .createTable('riders', (table) => {
        table.increments('id').unsigned().primary();
        table.string('email').unique().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.date('birthday');
      })
      .createTable('products', (table)=>{
        table.increments('id').unsigned().primary();
        table.boolean('active').notNullable().defaultTo(true);
        table.string('name').notNullable();
        table.string('description');
        table.integer('price').unsigned().notNullable();
      })
      .createTable('rider_product', (table)=>{
        table.increments('id').unsigned().primary();
        table.integer('rider_id').unsigned();
        table.integer('product_id').unsigned();
        table.integer('quantity').unsigned().notNullable();
        table.foreign('rider_id').references('id').inTable('riders').onUpdate("CASCADE").onDelete("CASCADE");
        table.foreign('product_id').references('id').inTable('products').onUpdate("CASCADE").onDelete("CASCADE");
      })
      .createTable('transactions', (table)=>{
        table.increments('id').unsigned().primary();
        table.string('stripe_payment_id').unique().notNullable();
        table.string('transaction_status').notNullable();
        table.timestamp('date_created').defaultTo(knex.fn.now());
        table.integer('rider_id').unsigned();
        table.foreign('rider_id').references('id').inTable('riders').onUpdate("CASCADE").onDelete("CASCADE");
      })
      .createTable('product_transaction', (table)=>{
        table.increments('id').unsigned().primary();
        table.integer('transaction_id').unsigned().notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.foreign('transaction_id').references('id').inTable('transactions').onUpdate("CASCADE").onDelete("CASCADE");
        table.foreign('product_id').references('id').inTable('products').onUpdate("CASCADE").onDelete("CASCADE");
      })
      // repeat for other tables (product_transaction, rider_transaction, account, rider_account, waivers, checkins...)
  };
  
  exports.down = function (knex) {
    // chain tables according to foreign keys (tables with fkey first)
    return knex.schema.dropTable('product_transaction').dropTable('transactions').dropTable('rider_product').dropTable('products').dropTable('riders'); 
  };
  