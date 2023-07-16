const router = require("express").Router();
const mw = require("./tarif-middleware");

router.get("/:id", mw.validateTarifId, (req, res, next) => {
  try {
    res.json(req.existTarif);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
