'use client';
import HSI from '@/components/form/HSI';
import FTND from '@/components/form/FTND'; // Make sure to import FTND component
import { Customer } from '@/types/interface';
import { Card, Input, Button, Spinner, CardBody, Tab, Tabs, Divider, DateInput } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HypertensionForm from '@/components/form/hypertension.-form';
import DiabetesForm from '@/components/form/diabetes';
import ThaiCVRiskForm from '@/components/form/thai-cv-risk-form';



interface FormData {
    SBP: string;
    DBP: string;
    Hypertension: string;
    HypertensionScore: string;
    age: string;
    gender: string;
    bmi: string;
    bp: string;
    diabetes_score: number
    diabetes_score_details: string
    family_history: string;
    waistline: string;
}

const RiskPage: React.FC = () => {
    const [idCard, setIdCard] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState<FormData>({
        SBP: '',
        DBP: '',
        Hypertension: 'ไม่มี',
        HypertensionScore: "",
        age: '',
        gender: '',
        bmi: '',
        bp: '',
        diabetes_score: 0,
        diabetes_score_details: "",
        family_history: 'ไม่มี',
        waistline: '',
    });
    const [submittedData, setSubmittedData] = useState<{ data: FormData; description: string } | null>(null);

    const fetchData = async () => {
        if (!/^\d{13}$/.test(idCard)) {
            setError(true);
            setErrorMessage("กรุณาใส่เลขบัตรประชาชน 13 หลัก");
            return;
        }
        setError(false);
        setErrorMessage("");

        setLoading(true); // Start loading
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${idCard}`);
            const data = response.data.data;

            if (response.data.message !== "User found successfully") {
                setCustomer(null);
                toast.error("ไม่พบหมายเลขบัตรประชาชน");
            } else {
                setCustomer(data);
                setFormData((prev) => ({
                    ...prev,
                    age: data.age,
                    gender: data.gender,
                    bmi: data.bmi,
                    bp: data.bp,
                    waistline: data.waistline
                }));
                console.log("res", response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleFormSubmit = (data: FormData, description: string) => {
        setSubmittedData({ data, description });
    };

    const handleSubmit = async () => {
        const hypertension = async () => {
            let total_score = 0;
            if (formData.HypertensionScore === 'ต่ำกว่าเกณฑ์') total_score = 0;
            else if (formData.HypertensionScore === 'ปกติ') total_score = 1;
            else if (formData.HypertensionScore === 'สูงกว่าเกณฑ์') total_score = 2;

            const data = {
                customer_id: customer?.id,
                question_type_id: 7, // Assuming 7 is the correct question_type_id for hypertension
                assmt_status: 1,
                total_score,
                total_score_detail: "",
            };

            console.log("Data to submit (Hypertension):", data);

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data);
                console.log("Response (Hypertension):", response.data);
                toast.success("บันทึกข้อมูลความดันโลหิตสูงสำเร็จ");
                // Handle successful response
            } catch (error) {
                console.error("Error submitting hypertension form", error);
                toast.error("ไม่สามารถบันทึกข้อมูลความดันโลหิตสูงได้ ลองใหม่อีกครั้ง");
                // Handle error response
            }
        };

        const diabetes = async () => {
            const data = {
                customer_id: customer?.id,
                question_type_id: 8, // Assuming 8 is the correct question_type_id for diabetes
                assmt_status: 1,
                total_score: formData.diabetes_score,
                total_score_detail: formData.diabetes_score_details,
            };

            console.log("Data to submit (Diabetes):", data);

            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data);
                console.log("Response (Diabetes):", response.data);
                toast.success("บันทึกข้อมูลเบาหวานสำเร็จ");
                // Handle successful response
            } catch (error) {
                console.error("Error submitting diabetes form", error);
                toast.error("ไม่สามารถบันทึกข้อมูลเบาหวานได้ ลองใหม่อีกครั้ง");
                // Handle error response
            }
        };

        // First call the hypertension function
        await hypertension();
        // Then call the diabetes function
        await diabetes();
    };




    return (
        <div className="flex w-full flex-col">
            <Card className="w-full p-5 overflow-auto">
                <p className="text-lg flex justify-center font-bold">แบบประเมินความเสี่ยงการเกิดโรคความดันโลหิตสูง โรคเบาหวานชนิดที่ 2 โรคหัวใจและหลอดเลือด</p>
                <div className="flex flex-col justify-end w-full gap-4 sm:flex sm:flex-row sm:justify-end py-2">
                    <ToastContainer />
                    <div className='flex flex-col w-full sm:w-6/12'>
                        <p>เลขบัตรประจำตัวประชาชน: <span className="text-primary-500">{customer?.id_card ?? "-"}</span></p>
                        <p>ชื่อ: <span className="text-primary-500">{customer?.firstname ?? "-"} {customer?.lastname}</span> </p>
                        <p>อายุ: <span className="text-primary-500"> {customer?.age ?? "-"}</span> ปี</p>
                    </div>
                    <div className="flex flex-col justify-end w-full gap-4 sm:flex sm:flex-row sm:justify-end">
                        <Input
                            type='number'
                            size="md"
                            placeholder="เลขบัตรประชาชน 13 หลัก"
                            className="w-full sm:w-4/12"
                            value={idCard}
                            onChange={(e) => setIdCard(e.target.value)}
                            isInvalid={error}
                            errorMessage={errorMessage}
                        />
                        <Button className="bg-primary text-white" onClick={fetchData}>
                            ค้นหา <IconSearch stroke={1} />
                        </Button>
                    </div>
                </div>

                <Divider className="my-4" />
                <p className='text-large'>1. แบบประเมินความเสี่ยงการเกิดโรคความดันโลหิตสูง</p>
                <HypertensionForm formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} />
                <Divider className="my-4" />
                <p className='text-large'>2. แบบประเมินความเสี่ยงการเกิดโรคเบาหวานชนิดที่ 2</p>
                <DiabetesForm formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} />
                {/* {submittedData && (
                    <div className="mt-4">
                        <p className="text-lg font-bold">Submitted Data:</p>
                        <pre>{JSON.stringify(submittedData.data, null, 2)}</pre>
                        <p className="text-lg font-bold">Risk Description:</p>
                        <p>{submittedData.description}</p>
                    </div>
                )} */}
                {/* <Divider className="my-4" />
                <ThaiCVRiskForm/> */}
                <Divider className="my-4" />
                <div className='flex w-full flex-row justify-end mb-4'>

                    <Button onClick={handleSubmit} className="bg-primary w-full  text-white sm:w-3/12">
                        บันทึกผล
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default RiskPage;
