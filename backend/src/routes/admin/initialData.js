const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const router = express.Router();

router.post("/initialdata", initialData); //validate login
module.exports = router;
