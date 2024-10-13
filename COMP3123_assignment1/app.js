const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes'); 
const employeeRoutes = require('./routes/employeeRoutes'); 

const app = express();

connectDB();

app.use(express.json()); 


app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/emp', employeeRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
