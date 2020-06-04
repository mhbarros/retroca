import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('item_category', table => {
    table.increments('id').primary();
    table.string('description', 80).notNullable().unique();
  });

};

export const down = async (knex: Knex) => {
  return knex.schema.dropSchema('item_category');
};
