import express from 'express'
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectdb from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import formidable from 'express-formidable'


//configure env
dotenv.config()

//database config
connectdb()

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(formidable());

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/products', productRoute)


//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>")
})

//PORT 
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white)
})