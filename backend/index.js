// index.js
// Import necessary modules
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db.js')

const authRoutes = require('./routes/authRoute.js')
const adminRoutes = require('./routes/adminRoute.js')
const trainerRoutes = require('./routes/trainerRoute.js')
const clientRoutes = require('./routes/clientRoute.js')
const uploadRoutes = require('./routes/uploadRoutes.js')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')

const port = process.env.PORT || 5000
const ENV = process.env.NODE_ENV || "development"
connectDB()
// initialize app
const app = express()

// main function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/apiv1/auth', authRoutes);
app.use('/apiv1/admin', adminRoutes);
app.use('/apiv1/trainer', trainerRoutes);
app.use('/apiv1/client', clientRoutes);
app.use('/apiv1/upload', uploadRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

// start listening on port 6000
app.listen(port, () => {
    console.log(`Server started on port ${port}, in ${ENV} mode.`)
})