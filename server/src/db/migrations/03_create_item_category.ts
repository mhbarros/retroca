import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('item_category', table => {
    table.integer('id_item').notNullable();
    table.integer('id_category_item').notNullable();
  });

};

export const down = async (knex: Knex) => {
  return knex.schema.dropSchema('item_category');
};
