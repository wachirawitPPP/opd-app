const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();


const getCustomers = async () => {
    return prisma.customers.findMany({ 
    });
};

const RegisterCustomers = async (customers)=> {
    return prisma.customers.create({
      data: {
        firstname: customers.firstname,
        lastname: customers.lastname,
        station_code: customers.station_code,
        station_name: customers.station_name,
        register_date: customers.register_date,
        id_card: customers.id_card,
        passport_id: customers.passport_id,
        prefix: customers.prefix, 
        firstname: customers.firstname,
        lastname: customers.lastname,
        firstname_en: customers.firstname_en,
        gender:customers.gender,
        lastname_en: customers.lastname_en,
        tel: customers.tel,
        contact_line: customers.contact_line,
        birthdate: customers.birthdate,
        religion: customers.religion,
        religion_other: customers.religion_other,
        nation: customers.nation,
        nation_origin: customers.nation_origin,
        marital_status: customers.marital_status,
        edu_level: customers.edu_level,
        occupation: customers.occupation,
        personal_status_address: customers.personal_status_address,
        community_status: customers.community_status,
        special_rights: customers.special_rights,
        special_rights_other: customers.special_rights_other,
        treatment_rights: customers.treatment_rights,
        treatment_rights_other: customers.treatment_rights_other,
        selfcare: customers.selfcare,
        disease: customers.disease,
        allergic: customers.allergic,
        allergic_detail: customers.allergic_detail,
        isallergic: customers.isallergic,
        food_allergic: customers.food_allergic,
        food_allergic_detail: customers.food_allergic_detail,
        isfood_allergic: customers.isfood_allergic,
        family_history: customers.family_history,
        weight: customers.weight,
        height: customers.height,
        waistline: customers.waistline,
        age: customers.age,
        bp: customers.bp,
        bmi: customers.bmi,
        weight_age: customers.weight_age,
        height_age: customers.height_age,
        weight_height: customers.weight_height,
        risk_summary: customers.risk_summary,
        health_summary: customers.health_summary,
      } 
    })
}

const updateCustomer = async (id, customers) => {
  const customer = await prisma.customers.findUnique({
    where: { id: parseInt(id) }
  });

  if (!customer) {
    throw new Error('Customer not found');
  }

  return prisma.customers.update({
    where: { id: parseInt(id) },
    data: {
      firstname: customers.firstname,
      lastname: customers.lastname,
      station_code: customers.station_code,
      station_name: customers.station_name,
      register_date: customers.register_date,
      id_card: customers.id_card,
      passport_id: customers.passport_id,
      prefix: customers.prefix, 
      firstname_en: customers.firstname_en,
      lastname_en: customers.lastname_en,
      tel: customers.tel,
      contact_line: customers.contact_line,
      birthdate: customers.birthdate,
      religion: customers.religion,
      religion_other: customers.religion_other,
      nation: customers.nation,
      nation_origin: customers.nation_origin,
      marital_status: customers.marital_status,
      edu_level: customers.edu_level,
      occupation: customers.occupation,
      personal_status_address: customers.personal_status_address,
      community_status: customers.community_status,
      special_rights: customers.special_rights,
      special_rights_other: customers.special_rights_other,
      treatment_rights: customers.treatment_rights,
      treatment_rights_other: customers.treatment_rights_other,
      selfcare: customers.selfcare,
      disease: customers.disease,
      allergic: customers.allergic,
      allergic_detail: customers.allergic_detail,
      isallergic: customers.isallergic,
      food_allergic: customers.food_allergic,
      food_allergic_detail: customers.food_allergic_detail,
      isfood_allergic: customers.isfood_allergic,
      family_history: customers.family_history,
      weight: customers.weight,
      height: customers.height,
      waistline: customers.waistline,
      age: customers.age,
      gender:customers.gender,
      bp: customers.bp,
      bmi: customers.bmi,
      weight_age: customers.weight_age,
      height_age: customers.height_age,
      weight_height: customers.weight_height,
      risk_summary: customers.risk_summary,
      health_summary: customers.health_summary,
    }
  });
};

const getCustomerByIdCard = async (id_card) => {
  console.log(id_card)
    return prisma.customers.findFirst({
      where: {
        id_card: id_card,
      },
    })
};

const getCustomerListByIdCard = async (body) => {
  console.log(body.id_card)
  return prisma.customers.findMany({
    where: {
      id_card:{
        startsWith: body.id_card
      }
    },
  })
}




module.exports = {
    getCustomers,
    RegisterCustomers,
    getCustomerByIdCard,
    getCustomerListByIdCard,
    updateCustomer
};
