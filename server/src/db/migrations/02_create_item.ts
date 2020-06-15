import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('item', table => {
    table.increments('id').primary();
    table.string('description', 80).notNullable().comment('0-New 1-Used');
    table.string('condition', 1).notNullable();
    table.integer('id_user').references('id').inTable('user').notNullable();
  });
};

export const down = async (knex: Knex) => {
  return knex.schema.dropTable('item');
};
