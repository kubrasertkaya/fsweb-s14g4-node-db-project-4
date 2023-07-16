/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("tarif", (t) => {
      t.increments("tarif_id");
      t.string("tarif_adi").notNullable();
      t.timestamp("kayit_tarihi").defaultTo(knex.fn.now());
    })
    .createTable("adim", (t) => {
      t.increments("adim_id");
      t.integer("adim_sirasi").notNullable();
      t.string("adim_talimati").notNullable();
      t.integer("tarif_id")
        .references("tarif_id")
        .inTable("tarif")
        .onDelete("CASCADE") //RESTRICT
        .onUpdate("CASCADE"); //RESTRICT
    })
    .createTable("icindekiler", (t) => {
      t.increments("icindekiler_id");
      t.string("icindekiler_adi").notNullable();
    })
    .createTable("icindekiler_adim", (t) => {
      t.increments("icindekiler_adim_id");
      t.decimal("miktar").notNullable();
      t.integer("icindekiler_id")
        .references("icindekiler_id")
        .inTable("icindekiler");
      t.integer("adim_id").references("adim_id").inTable("adim");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("icindekiler_adim")
    .dropTableIfExists("icindekiler")
    .dropTableIfExists("adim")
    .dropTableIfExists("tarif");
};
