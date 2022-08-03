exports.up = function (knex) {
    return knex.schema
      .createTable('riders', (table) => {
        table.increments('id').unsigned().primary();
        table.string('email').notNullable();
        table.string('first_name');
        table.string('last_name');
        table.date('birthday');
      })
      .createTable('products', (table)=>{
        table.increments('id').unsigned().primary();
        table.boolean('active').notNullable().defaultTo(true);
        table.string('name').notNullable();
        table.string('description');
        // add restrictions, terms?
        table.integer('price').unsigned().notNullable();
        // move pricing to separate table? for payment tiers, e.g., adult, student, young child?
        // need to also add pricing currency, unit
      })
      .createTable('rider_product', (table)=>{
        table.increments('id').unsigned().primary();
        table.integer('quantity').unsigned().notNullable();
        table.integer('rider_id').unsigned();
        table.integer('product_id').unsigned();
        table.foreign('rider_id').references('id').inTable('riders').onUpdate("CASCADE").onDelete("CASCADE");
        table.foreign('product_id').references('id').inTable('products').onUpdate("CASCADE").onDelete("CASCADE");
      })
      // repeat for other tables (transactions, product_transaction, rider_transaction, account, rider_account, waivers, checkins...)
  };
  
  exports.down = function (knex) {
    // chain tables according to foreign keys (tables with fkey first)
    return knex.schema.dropTable('rider_product').dropTable('products').dropTable('riders'); 
  };
  