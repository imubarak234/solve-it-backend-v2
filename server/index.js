const express = require("express"); 
const env = require("./env.js");

// Dependencies
const path = require("path");

const nodeCron = require("node-cron");
const funcObj = require('./utils/functions.js');

/**
 * Import Routes
 */
const testRoutes = require('./routes/testRoutes.js');
const authRoutes = require("./routes/authRoutes.js");
const studentRoutes = require("./routes/studentRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const postRoutes = require('./routes/postRoutes.js');
const adminCategoryRoutes = require('./routes/admin/categoriesRoutes.js');
const schoolRoutes = require('./routes/admin/schoolRoutes.js');
const adminPostRoutes = require('./routes/admin/adminPostRoutes.js');
const roleRoutes = require('./routes/admin/roleRoutes.js');
const marketRoutes = require('./routes/marketPlaceRoutes.js')

const auth = require('./middlewares/jwt.js');
const rateLimit = require('express-rate-limit');


// Initialize express
const app = express();
const port = env?.port || 5001;

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}));

// Parse application json
app.use(express.json());
app.disable('x-powered-by')


// append request time to all request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

// Serve uploaded images statically
app.use("/api/v1/uploads", express.static(path.join(__dirname, "../uploads")));

// APIs 
// app.use('/admin', adminRoutes);
// app.use('/app', appRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

  
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/admin/category', adminCategoryRoutes);
app.use('/api/v1/admin/school', schoolRoutes);
app.use('/api/v1/admin/post', adminPostRoutes);
app.use('/api/v1/admin/roles', roleRoutes);
app.use('/api/v1/market-place', marketRoutes);






app.listen(port, () => {
    console.log(`Server up and running on port: ${port}.`)

    // nodeCron.schedule("59 * * * * *", updateRecords);
});