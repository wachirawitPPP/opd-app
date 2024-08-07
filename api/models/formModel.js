const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const getAssmentTopics = async ()=> {
    return prisma.questions_type.findMany({
        include: {
            Questions: true
        }
    })
}


const createCustomerAssmtform = async  (assmtform)=> {
    const date = new Date()
    const datestr = new Date(date).toISOString()
        return prisma.assessments.create({
            data: {
                customer_id: assmtform.customer_id,
                question_type_id: assmtform.question_type_id,
                assmt_status: assmtform.assmt_status,
                date: datestr,
                total_score: parseInt(assmtform.total_score),
                total_score_detail: assmtform.total_score_detail,
                suggestion: assmtform.suggestion
            }
        })
}

const getAssmtSummaryByCustomerId = async (c_id)=>{
    return prisma.assessments.findMany({
         where: {
            customer_id : parseInt(c_id) 
         },
         include: {
            //Customers: true,
            Questions_type: true
         }
    })
}


module.exports = {
    getAssmentTopics,
    createCustomerAssmtform,
    getAssmtSummaryByCustomerId
};
