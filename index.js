const express = require('express');
const dbConnect = require('./config/dbConnect');
const app= express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter =require('./routes/authRoute');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieparser = require('cookie-parser');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const categoryRouter = require('./routes/prodcategoryRoute')
const blogcategoryRouter = require('./routes/blogCatRoute')
const brandRouter = require('./routes/brandRoute')
const colorRouter = require('./routes/colorRoute')
const enqRouter = require('./routes/enqRoute')
const couponRouter = require('./routes/couponRoute')
const morgan = require('morgan')

dbConnect()

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieparser());


app.use("/api/user", authRouter)
app.use("/api/product", productRouter)
app.use("/api/blog",blogRouter)
app.use("/api/category", categoryRouter)
app.use("/api/blogcategory", blogcategoryRouter)
app.use("/api/brand",brandRouter)
app.use("/api/coupon",couponRouter)
app.use("/api/color",colorRouter)
app.use("/api/enquiry",enqRouter)

app.use(notFound);
app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`server started at port num : ${PORT}`)})