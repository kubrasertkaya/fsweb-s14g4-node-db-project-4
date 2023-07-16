const db = require("../../data/db-config");

async function adimIdYeGoreIcindekilerGetir(adim_id) {
  /**
     * select ia.icindekiler_id, i.icindekiler_adi,ia.miktar from icindekiler_adim ia
        left join icindekiler i on i.icindekiler_id = ia.icindekiler_id
        left join adim a on a.adim_id = ia.adim_id
        where ia.adim_id = 2
     */
  let icindekiler = await db("icindekiler_adim as ia")
    .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
    .leftJoin("adim as a", "a.adim_id", "ia.adim_id")
    .select("ia.icindekiler_id", "i.icindekiler_adi", "ia.miktar")
    .where("ia.adim_id", adim_id);
  return icindekiler;
}

async function idyeGoreTarifGetir(tarif_id) {
  /**
     * select * from tarif t
    left join adim a on t.tarif_id = a.tarif_id
    left join icindekiler_adim ia on ia.adim_id = a.adim_id
    left join icindekiler i on i.icindekiler_id=ia.icindekiler_id
     */
  /*
        {
            "tarif_id" : 1,
            "tarif_adi": "Spagetti Bolonez",
            "kayit_tarihi": "2021-01-01 08:23:19.120",
            "adimlar": [
                {
                "adim_id": 11,
                "adim_sirasi": 1,
                "adim_talimati": "Büyük bir tencereyi orta ateşe koyun",
                "icindekiler": []
                },
                {
                "adim_id": 12,
                "adim_sirasi": 2,
                "adim_talimati": "1 yemek kaşığı zeytinyağı ekleyin",
                "icindekiler": [
                    { "icindekiler_id": 27, "icindekiler_adi": "zeytinyağı", "miktar": 0.014 }
                ]
                },
            ]
        }
    */

  const tarifler = await db("tarif as t")
    .leftJoin("adim as a", "a.tarif_id", "t.tarif_id")
    .leftJoin("icindekiler_adim as ia", "ia.adim_id", "a.adim_id")
    .leftJoin("icindekiler as i", "i.icindekiler_id", "ia.icindekiler_id")
    .select(
      "t.*",
      "a.adim_id",
      "a.adim_sirasi",
      "a.adim_talimati",
      "i.icindekiler_id",
      "i.icindekiler_adi",
      "ia.miktar"
    )
    .where("t.tarif_id", tarif_id);

  if (tarifler.length == 0) {
    return null;
  }

  let responseTarifModel = {
    tarif_id: tarifler[0].tarif_id,
    tarif_adi: tarifler[0].tarif_adi,
    kayit_tarihi: tarifler[0].kayit_tarihi,
    adimlar: [],
  };

  for (let i = 0; i < tarifler.length; i++) {
    const tarif = tarifler[i];
    let adimModel = {
      adim_id: tarif.adim_id,
      adim_sirasi: tarif.adim_sirasi,
      adim_talimati: tarif.adim_talimati,
      icindekiler: [],
    };
    if (!!tarif.icindekiler_id) {
      let fromDb = await adimIdYeGoreIcindekilerGetir(tarif.adim_id);
      adimModel.icindekiler = fromDb;
    }

    /* for (let j = 0; j < tarif.length; j++) {
            const item = tarif[j];
            if(!!item.icindekiler_id && tarif.adim_id == item.adim_id){
                let icindekiler_model={
                    icindekiler_id:item.icindekiler_id,
                    icindekiler_adi:item.icindekiler_adi,
                    miktar:item.miktar
                }
                adimModel.icindekiler.push(icindekiler_model);
            }
        }*/
    responseTarifModel.adimlar.push(adimModel);
  }

  return responseTarifModel;
}

module.exports = {
  idyeGoreTarifGetir,
};
