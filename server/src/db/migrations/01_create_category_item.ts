import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('category_item', table => {
    table.increments('id').notNullable().primary();
    table.string('description', 80).notNullable().unique();
    table.string('icon', 40);
  })
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable('category_item');
};
