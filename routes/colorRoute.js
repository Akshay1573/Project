const express = require("express");
const { createColor, 
    updateColor, 
    deleteColor, 
    getColor, 
    getallColor } = require("../controller/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createColor)
router.put('/:id',authMiddleware,isAdmin,updateColor)
router.get('/:id',getColor)
router.get('/',getallColor)
router.delete('/:id',authMiddleware,isAdmin,deleteColor)

module.exports = router