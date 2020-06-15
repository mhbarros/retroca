import Knex from 'knex';

export const seed = async (knex: Knex) => {
  await knex('category_item').insert([
    {description: "PS4", icon: 'cat_ps4.svg'},
    {description: "Xbox One", icon: 'cat_xbox_one.svg'},
    {description: "PC", icon: 'cat_pc.svg'},
    {description: "PS3", icon: 'cat_ps3.svg'},
    {description: "Xbox 360", icon: 'cat_xbox_360.svg'},
    {description: "Nintendo Switch", icon: 'cat_nintendo_switch.svg'},
  ]);
}
