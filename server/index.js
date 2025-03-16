// import express from 'express';
// import env from './server/env.js';
// import adminRoutes from './server/routes/admin.js';
// import appRoutes from './server/routes/app.js';
// import { bulkToDB, getAllInstitution } from './server/controllers/request.js';

const express = require("express"); 
const env = require("./env.js");
const adminRoutes = require("./routes/admin.js");
const appRoutes = require("./routes/app.js");
//const { bulkToDB, getAllInstitution } = require("./server/controllers/request.js");
const nodeCron = require("node-cron");
const funcObj = require('./utils/functions.js');
const testRoutes = require('./routes/testRoutes.js');
const authRoutes = require("./routes/authRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require('./routes/postRoutes.js');
const adminCategoryRoutes = require('./routes/admin/categoriesRoutes.js');
const schoolRoutes = require('./routes/admin/schoolRoutes.js');
const adminPostRoutes = require('./routes/admin/adminPostRoutes.js')
// const 

// Initialize express
const app = express();
const port = env?.port || 5001;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

// Parse application json
app.use(express.json());

// APIs 
// app.use('/admin', adminRoutes);
// app.use('/app', appRoutes);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/admin/category', adminCategoryRoutes);
app.use('/api/v1/admin/school', schoolRoutes);
app.use('/api/v1/admin/post', adminPostRoutes);




app.listen(port, () => {
    console.log(`Server up and running on port: ${port}.`)

    // nodeCron.schedule("59 * * * * *", updateRecords);
});