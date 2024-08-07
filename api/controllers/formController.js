const formModel = require("../models/formModel")



const getAssmentTopics = async (req,res) => { 
  const q_type_id = req.params.question_type_id
    try { 
     const getAssmentTopics = await formModel.getAssmentTopics()
     res.status(200).json({message: "found data", data: getAssmentTopics})
    } catch (error) {
     console.error(error)
     res.status(500).json({message: "failed to get user", error})
    }
  }


  const createCustomerAssmtform = async (req,res) => { 
    const { customer_id, question_type_id, assmt_status , date, total_score, total_score_detail, suggestion} = req.body 
   
      try { 
       const create = await formModel.createCustomerAssmtform({
        customer_id, question_type_id, assmt_status , date, total_score, total_score_detail, suggestion
       })
       console.log(create) 
       res.status(200).json({message: "create successfully", data: create})
      } catch (error) {
       console.error(error)
       res.status(500).json({message: "failed to create Assessment Customer Form", error })
      }
    }

    const getAssmtSummaryByCustomerId = async (req,res)=>{
      const c_id = req.params.customer_id
      try { 
        const getAssmentSummary = await formModel.getAssmtSummaryByCustomerId(c_id)
        res.status(200).json({message: "found data", data: getAssmentSummary})
       } catch (error) {
        console.error(error)
        res.status(500).json({message: "failed to get user", error})
       }
    }


module.exports = {
    getAssmentTopics,
    createCustomerAssmtform,
    getAssmtSummaryByCustomerId
}   