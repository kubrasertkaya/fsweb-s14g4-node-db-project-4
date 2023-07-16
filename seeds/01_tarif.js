/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defaultTarif = [
  { tarif_adi: "Spagetti Bolonez" },
  { tarif_adi: "Mantı" },
];
const defaultAdim = [
  {
    adim_id: 1,
    adim_sirasi: 1,
    adim_talimati: "Büyük bir tencereyi orta ateşe koyun",
    tarif_id: 1,
  },
  {
    adim_id: 2,
    adim_sirasi: 2,
    adim_talimati: "1 yemek kaşığı zeytinyağı ekleyin",
    tarif_id: 1,
  },
  { adim_id: 3, adim_sirasi: 3, adim_talimati: "Tuz ekleyin", tarif_id: 1 },

  {
    adim_id: 4,
    adim_sirasi: 1,
    adim_talimati: "tencereyi orta ateşe koyun",
    tarif_id: 2,
  },
  {
    adim_id: 5,
    adim_sirasi: 2,
    adim_talimati: "zeytinyağı ekleyin",
    tarif_id: 2,
  },
  { adim_id: 6, adim_sirasi: 3, adim_talimati: "Tuz ekleyin", tarif_id: 2 },
];
const defaultIcindekiler = [
  { icindekiler_adi: "zeytinyağı" },
  { icindekiler_adi: "tuz" },
];
const defaultIcindekilerAdimlar = [
  { icindekiler_id: 1, adim_id: 2, miktar: 0.5 },
  { icindekiler_id: 1, adim_id: 5, miktar: 1 },
  { icindekiler_id: 2, adim_id: 3, miktar: 5 },
  { icindekiler_id: 2, adim_id: 6, miktar: 10 },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tarif").truncate();
  await knex("adim").truncate();
  await knex("icindekiler").truncate();
  await knex("icindekiler_adim").truncate();

  await knex("tarif").insert(defaultTarif);
  await knex("adim").insert(defaultAdim);
  await knex("icindekiler").insert(defaultIcindekiler);
  await knex("icindekiler_adim").insert(defaultIcindekilerAdimlar);
};
