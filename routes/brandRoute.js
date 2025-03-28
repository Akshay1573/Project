const express = require("express");
const { createBrand, 
    updateBrand, 
    deleteBrand, 
    getBrand, 
    getallBrand } = require("../controller/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createBrand)
router.put('/:id',authMiddleware,isAdmin,updateBrand)
router.get('/:id',getBrand)
router.get('/',getallBrand)
router.delete('/:id',authMiddleware,isAdmin,deleteBrand)

module.exports = router