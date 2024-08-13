'use client'
import React, { useState } from 'react';
import { Button, Input, Spacer, } from '@nextui-org/react';
import axios from 'axios';
import CustomerRegistor from '@/components/customer-registor';
import HealthScreenComponent from '@/components/form/health-screen';



const Step1: React.FC<{
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    nextStep: () => void;
    onSubmit: (data: FormData, description: string) => void;
    customer: any
}> = ({ formData, setFormData, nextStep,customer }) => {
    console.log(customer)
    return (
        <>
           <HealthScreenComponent customer={customer} formData={formData} setFormData={setFormData}/>
            <Spacer y={1} />
            <Button onClick={nextStep}>Next</Button>
        </>
    );
};

const Step2: React.FC<{
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    prevStep: () => void;
    nextStep: () => void;
}> = ({ formData, setFormData, prevStep, nextStep }) => {
    return (
        <>
            <h4>Step 2: Contact Information</h4>
            <Spacer y={1} />
            <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Spacer y={1} />
            <div >
                <Button onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>Next</Button>
            </div>
        </>
    );
};

const Step3: React.FC<{
    formData: any;
    prevStep: () => void;
    submitForm: () => void;
}> = ({ formData, prevStep, submitForm }) => {
    return (
        <>
            <h4>Step 3: Review and Submit</h4>
            <h4>First Name: {formData.firstname}</h4>
            <h4>Last Name: {formData.lastname}</h4>
            <h4>Phone: {formData.phone}</h4>
            <h4>Phone: {formData.id_card}</h4>
            <h4>Phone: {formData.birthdate}</h4>
            <h4>Phone: {formData.gender}</h4>
            <h4>Phone: {formData.phone}</h4>
            <Spacer y={1} />
            <div className="justify-between">
                <Button onClick={prevStep}>Back</Button>
                <Button onClick={submitForm}>Submit</Button>
            </div>
        </>
    );
};


const MultiStepForm: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [customer ,setCustomer] = useState<any>({})
    const [formData, setFormData] = useState<any>({
        id_card: "",
        firstname: "",
        lastname: "",
        station_code: "",
        station_name: "",
        tel: "",
        contact_line: "",
        age: "",
        nation: "ไทย",
        nation_origin: "ไทย",
        prefix: "ไม่ระบุ",
        sex: "ไม่ระบุ",
        religion: "พุทธ",
        birthdate: "2001-12-29",
        register_date: "2001-12-29",
        marital_status: "ไม่ระบุ",
        personal_status_address: "ไม่ระบุ",
        community_status: "ไม่ระบุ",
        occupation: "",
        edu_level: "ไม่ระบุ",
        food_allergic: {
            isAllergic: false,
            name: "",
            detail: ""
        },
        allergic: {
            isAllergic: false,
            name: "",
            detail: ""
        },
        disease: {
            isDisease: false,
            canControll: true,
            name: ""
        },
        // family_history: {
        //     isFamilyDisease: false,
        //     name: ""
        // },

        selfcare1: "ไม่ระบุ",
        selfcare2: "ไม่ระบุ",
        selfcare3: "ไม่ระบุ",

        food_name: "",
        food_detail: "",
        allergic_name: "",
        allergic_detail: "",
        disease_name: "",
        family_history_disease: "",
        weight: 0,
        height: '0',
        waistline: '0',
        bp: "",
        weight_age: 0,
        weight_height: 0,
        height_age: 0,
        bmi: '',
        religion_other: "",
        special_rights: "ไม่ระบุ",
        special_rights_other: "",
        treatment_rights: "ไม่ระบุ",
        treatment_rights_other: "",
        health_summary: "กลุ่มสุขภาพปกติ",
        firstName: '',
        lastName: '',
        phone: '',
        SBP: '',
        DBP: '',
        Hypertension: '',
        HypertensionScore: '',
        gender: '',
        diabetes_score: 0,
        diabetes_score_details: '',
        diabetes_score_suggestion: '',
        smoking: false,
        diabetes: false,
        cholesterol: 0,
        heart_score: 0,
        heart_score_detail: '',
        heart_score_suggestion: '',
    });

    console.log(formData)

    const getCustomerData = async () => {
        const idCard ='1300201263110'
        try {
          const response = await  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${idCard}`,
          );
          const data = response.data.data;
          setCustomer(data)
          console.log("res", response);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const handleFormSubmit = (data: FormData) => {
        // setSubmittedData({ data, description });
    };

    console.log(customer)
    

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const submitForm = () => {
        alert('Form Submitted!');
        // Handle form submission logic here
    };

    return (
        <div className='w-full'>
        <div className='flex justify-end'>
            <Button onClick={getCustomerData} >ดึงข้อมูล</Button>
        </div>
            {step === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} customer={customer} onSubmit={handleFormSubmit} />}
            {step === 2 && <Step2 formData={formData} setFormData={setFormData} prevStep={prevStep} nextStep={nextStep} />}
            {step === 3 && <Step3 formData={formData} prevStep={prevStep} submitForm={submitForm} />}
        </div>
    );
};

export default MultiStepForm;
