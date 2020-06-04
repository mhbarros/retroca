import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.table('item_category', table => {
    table.string('icon', 40);
  })
};

export const down = async (knex: Knex) => {
  return knex.schema.table('item_category', table => {
    table.dropColumn('icon');
  })
};
