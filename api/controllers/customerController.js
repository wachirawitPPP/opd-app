const Customers = require("../models/customerModel")

const getCustomers = async (req,res) => {  
    try { 
     const customer = await Customers.getCustomers()
     res.status(200).json({message: "User found successfully", data: customer})
    } catch (error) {
     console.error(error)
     res.status(500).json({message: "failed to get user", error})
    }
  }

  const getCustomerByIdCard = async (req,res) => {
    const id_card = req.params.id_card
    try {
     const customer = await Customers.getCustomerByIdCard(id_card)
     console.log(customer)
     if(customer !== null ){ 
       res.status(200).json({message: "User found successfully", data: customer})
     } else {
      res.status(200).json({message: "User Not found", data: customer})
     }
    } catch (error) {
     console.error(error)
     res.status(500).json({message: "failed to get user", error})
    }
  }
  const getCustomerListByIdCard = async (req,res) => {
    try {
     const customer = await Customers.getCustomerListByIdCard(req.body)
     res.status(200).json({message: "User found successfully", data: customer})
    } catch (error) {
     console.error(error)
     res.status(500).json({message: "failed to get user", error})
    }
  }

  const updateCustomer = async (req, res) => {
    const id = req.params.id
   
    try {
     const customer = await Customers.updateCustomer(id, req.body)
     res.status(200).json({message: "User updated successfully", data: customer})
    } catch (error) {
     console.error(error)
     res.status(500).json({message: "failed to update user", error})
    }
  }

  const RegisterCustomers = async (req,res)=> {
    const {
      station_code,
      station_name,
      register_date,
      id_card,
      passport_id,
      prefix, 
      firstname,
      lastname,
      firstname_en,
      lastname_en,
      tel,
      contact_line,
      birthdate,
      religion,
      religion_other,
      nation,
      nation_origin,
      marital_status,
      edu_level,
      occupation,
      personal_status_address,
      community_status,
      special_rights,
      special_right_other,
      treatment_rights,
      treatment_right_other,
      selfcare,
      disease,
      allergic,
      food_allergic,
      family_history,
      weight,
      height,
      waistline,
      bp,
      bmi,
      weight_age,
      height_age,
      weight_height,
      risk_summary,
      health_summary
    } = req.body
    try {
      console.log(firstname,lastname)
      console.log(req.body)
      const register_customer = await Customers.RegisterCustomers(req.body)
      res.status(200).json({ message:"Registerd Sucessfully", data: register_customer})
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "failed to resigter customer!", error: err})
    }
  }
module.exports = {
    getCustomers,
    RegisterCustomers,
    getCustomerByIdCard,
    getCustomerListByIdCard,
    updateCustomer
    
}    