const express = require("express");
const { createCategory, 
    updateCategory, 
    deleteCategory, 
    getCategory, 
    getallCategory } = require("../controller/blogCatCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createCategory)
router.put('/:id',authMiddleware,isAdmin,updateCategory)
router.get('/:id',getCategory)
router.get('/',getallCategory)
router.delete('/:id',authMiddleware,isAdmin,deleteCategory)

module.exports = router