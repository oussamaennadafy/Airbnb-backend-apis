const express = require("express");
const router = express.Router();

// middlewares
const { aliasTopPlaces } = require("./../middlewares/userMiddlewares");
const { protect } = require("../middlewares/authMiddlewares");

// route handlres
const {
  getAllPlaces,
  getOnePlace,
  createPlace,
  uploadPlaceImages,
  updatePlace,
  deletePlace,
} = require("./../controllers/placeController");

router.route("/top-5-cheap").get(aliasTopPlaces, getAllPlaces);

// router.route("/monthly-plan/:year").get(getMonthlyPlan);

router.route("/:id").get(getOnePlace).delete(deletePlace).patch(updatePlace);

router
  .route("/")
  .get(protect, getAllPlaces)
  .post(uploadPlaceImages, createPlace);

// router.route("/categories/:category")
//  .get(getPlacesByCategory)

module.exports = router;
