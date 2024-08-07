
const User = require("../models/userModel")

 const getUserByRole = async (req,res) => {
   const {role} = req.body

   try {
    const user = await User.getUserByRole({role})
    res.status(200).json({message: "User found successfully", data: user})
   } catch (error) {
    console.error(error)
    res.status(500).json({message: "failed to get user", error})
   }
 }

 const updateUser =  async (req, res) => {
  const id = req.params.id
  const {name, username, password ,role,departmentId,hospitalId,email,image} = req.body
  try {
    await User.updateUser(id,{name, username, password, role, departmentId,hospitalId, email, image})
    res.status(200).json({message: "User updated successfully"})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "User update failed",error: error.message})
  }
 }

 const createUser = async (req,res ) => {
  const {name, username, password ,role,departmentId,hospitalId,email,image} = req.body
  console.log(name,username)
  try {
      await User.createUser({name,username, password ,role,departmentId,hospitalId,email,image});
      res.status(201).json({message: "User created successfully"})
  } catch (error) {
      console.error(error);
      res.status(500).json({message:"User creation failed"})
  }
}

const adminCreateUser = async (req, res) => {
  const {name, username, password, role, departmentId,departmentName, hospitalId, email, image} = req.body
  
  try {
      await User.adminCreateUser({name, username, password, role, departmentId,departmentName, hospitalId, email, image});
      res.status(201).json({message: "User created successfully"})
  } catch (error) {
      console.error(error);
      res.status(500).json({message:"User creation failed"})
  }
}

 const updateUserStatus = async (req, res) => {
    const id = req.params.id
    const {isActive} = req.body
    try {
        const response = await User.updateUserStatus(id, {isActive})
        res.status(200).json({message: "User status updated successfully",response})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "User status updated failed", error})
    }
 }

 const getUserByHospitalId = async (req, res) => {
   const {hospitalId} = req.body
   
   try {
    const user = await User.getUserByHospitalId({hospitalId})
    res.status(200).json({message: "User found successfully", data: user})
   } catch (error) {
    console.error(error)
    res.status(500).json({message: "failed to get user", error})
   }
 }
 
 module.exports ={
    getUserByRole,
    updateUserStatus,
    getUserByHospitalId,
    createUser,
    updateUser,
    adminCreateUser
 }