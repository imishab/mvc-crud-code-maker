var express = require("express");
var userHelper = require("../helper/userHelper");
var adminHelper = require("../helper/adminHelper");

var router = express.Router();

const verifySignedIn = (req, res, next) => {
  if (req.session.signedIn) {
    next();
  } else {
    res.redirect("/signin");
  }
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  let user = req.session.user;
  let cartCount = null;
  if (user) {
    let userId = req.session.user._id;
    cartCount = await userHelper.getCartCount(userId);
  }
  userHelper.getAllProducts().then((products) => {
    res.render("users/home", { admin: false, products, user, cartCount });
  });
});

/////////////////////////////////

router.get("/add-product", function (res) {
  res.render("/", { admin: false });
});

router.post("/add-product", function (req, res) {
  adminHelper.addProduct(req.body, (id) => {
    res.redirect("/");
  });
});

router.get("/delete-product/:id", function (req, res) {
  let productId = req.params.id;
  adminHelper.deleteProduct(productId).then((response) => {
    res.redirect("/");
  });
});






module.exports = router;
