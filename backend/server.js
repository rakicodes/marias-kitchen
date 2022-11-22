const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config(); 
const { errorHandler } = require('./middleware/error')
const PORT = process.env.PORT || 2525;
const connectDB = require('./config/db')

const recipeRoutes = require("./routes/recipe")
const userRoutes = require("./routes/user")

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/recipes', recipeRoutes)
app.use('/api/users', userRoutes)



app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))