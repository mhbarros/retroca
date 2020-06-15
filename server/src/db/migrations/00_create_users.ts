import Knex from 'knex';

export const up = async (knex: Knex) => {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary();
    table.string('name', 40).notNullable();
    table.string('email', 80).notNullable().unique();
    table.string('phone', 14);
    table.string('password', 60).notNullable();
    table.string('city', 60);
    table.string('uf', 2);
    table.decimal('latitude', 10, 8);
    table.decimal('longitude', 11, 8);
  });
}

export const down = async (knex: Knex) => {
  return knex.schema.dropTable('user');
}
