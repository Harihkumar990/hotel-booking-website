const express = require("express");
const HotelController = require("../controllers/hotelroutercontroller");
const router = express.Router();

router.route("/hotels").get(HotelController.hotel)
router.route("/HotelDataSend").post(HotelController.HotelSendData)
router.route("/HotelCategory").post(HotelController.Category);
router.route("/hotel/search/:id").get(HotelController.SerachHotel);
module.exports = router;