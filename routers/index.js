const { Router } = require('express');
const router = Router();


//-1 client routes
const blogRoutes = require('./blogRoutes');
router.use(blogRoutes);


module.exports = router;