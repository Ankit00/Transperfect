const express = require('express');

const {newEntry,getProduct,updateProduct,deleteProduct} = require("../Controllers/dataController");

const router = express.Router();

router.route('/uploadData').post(newEntry);

router.route('/getProduct').get(getProduct);

router.route('/updateProduct').patch(updateProduct);

router.route('/deleteProduct').delete(deleteProduct);

module.exports = router;