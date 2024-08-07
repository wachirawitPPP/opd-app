const express = require('express');

const authController = require('./controllers/authController') 
const CustomerController = require('./controllers/customerController') 
const middleware = require('./middlewares/middleware')
const router = express.Router();
/* formModel */
const FormController = require('./controllers/formController') 

//----------------Auth Login---------------------
router.post("/register",authController.register); 
router.post("/login",authController.login);
 
//----------------Customer-----------------------
router.get("/customers",middleware.verifyToken,CustomerController.getCustomers)
router.get("/customers/:id_card",CustomerController.getCustomerByIdCard)
router.post("/register/customers",CustomerController.RegisterCustomers) 
router.post("/customers",CustomerController.getCustomerByIdCard)
router.put("/customers/:id",CustomerController.updateCustomer)

router.post("/customers-list",CustomerController.getCustomerListByIdCard)

//----------------Assessment Form-----------------
router.get("/assment_topic",FormController.getAssmentTopics)
router.post("/create_assment", FormController.createCustomerAssmtform)
router.get("/assment_summary/:customer_id", FormController.getAssmtSummaryByCustomerId)

 


module.exports = router;