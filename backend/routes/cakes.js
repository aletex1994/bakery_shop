const router = require("express").Router();
let CakePastry = require("../models/cakes.model");

router.route("/").get((req, res) => {
  CakePastry.find()
    .then((cakes) => res.json(cakes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const date = Date.parse(req.body.date);
  const name = req.body.name;
  const price = Number(req.body.price);
  const ingredients = req.body.ingredients;
  const onSale = Boolean(req.body.onSale);
  const quantity = Number(req.body.quantity);
  const images = req.body.images;

  const newCake = new CakePastry({
    date,
    name,
    price,
    ingredients,
    onSale,
    quantity,
    images,
  });

  newCake
    .save()
    .then(() => res.json("Cake successfully added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  CakePastry.findById(req.params.id)
    .then((cake) => res.json(cake))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  CakePastry.findByIdAndDelete(req.params.id)
    .then(() => res.json("Cake deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  CakePastry.findById(req.params.id)
    .then((cake) => {
      cake.date = Date.parse(req.body.date);
      cake.name = req.body.name;
      cake.price = Number(req.body.price);
      cake.ingredients = req.body.ingredients;
      cake.onSale = Boolean(req.body.onSale);
      cake.quantity = Number(req.body.quantity);
      cake.images = req.body.images;

      cake
        .save()
        .then(() => res.json("Cake updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
