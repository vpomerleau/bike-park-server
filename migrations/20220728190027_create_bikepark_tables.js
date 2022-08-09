exports.up = function (knex) {
    return knex.schema
      .createTable('riders', (table) => {
        table.increments('id').primary();
        table.string('email').unique().notNullable();
        table.string('first_name');
        table.string('last_name');
        table.date('birthday');
      })
      .createTable('products', (table)=>{
        table.increments('id').primary();
        table.boolean('active').notNullable().defaultTo(true);
        table.string('name').notNullable();
        table.string('description');
        table.integer('price').unsigned().notNullable();
      })
      .createTable('transactions', (table)=>{
        table.increments('id').primary();
        table.string('stripe_payment_id').unique().notNullable();
        table.string('transaction_status').notNullable();
        table.timestamp('date_created').defaultTo(knex.fn.now());
        table.integer('rider_id').unsigned();
        table.foreign('rider_id').references('id').inTable('riders').onUpdate("CASCADE").onDelete("CASCADE");
      })
      .createTable('rider_product', (table)=>{
        table.string('id').unique().primary();
        table.integer('rider_id').unsigned().notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.integer('transaction_id').unsigned().notNullable;
        table.integer('quantity').unsigned().notNullable();
        table.foreign('rider_id').references('id').inTable('riders').onUpdate("CASCADE").onDelete("CASCADE");
        table.foreign('product_id').references('id').inTable('products').onUpdate("CASCADE").onDelete("CASCADE");
        table.foreign('transaction_id').references('id').inTable('transactions').onUpdate("CASCADE").onDelete("CASCADE");
      })
  };
  
  exports.down = function (knex) {
    // chain tables according to foreign keys (tables with fkey first)
    return knex.schema.dropTable('rider_product').dropTable('transactions').dropTable('products').dropTable('riders'); 
  };
  