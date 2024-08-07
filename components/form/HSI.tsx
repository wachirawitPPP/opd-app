'use client'
import { Customer } from '@/types/interface';
import { RadioGroup, Radio } from '@nextui-org/radio';
import { Button, card, Card } from '@nextui-org/react';
import axios from 'axios';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface HSIProps {
    customer: Customer | null;
}

interface Question {
    question_type_id?: number
    question_type_name?: string
}



const HSI: React.FC<HSIProps> = ({ customer }) => {
    const [question, setQuestion] = useState<Question | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [summary, setSummary] = useState(0)
    const [sumDetail, setSumDetail] = useState("")
    const [cardDetail, setCardDetail] = useState("")

    const cardColor = (score: number) => {
        if (score <= 2) return "bg-green-500";
        else if (score >= 3 && score <= 4) return "bg-orange-500";
        else if (score >= 5 && score <= 6) return "bg-red-500";
        else return "bg-gray-500"; // This is an optional default case if the score is outside the expected range
    };


    const initialForm = {
        HSI1: 0,
        HSI2: 0,
    };

    const getQuestion = async (type: number) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assment_topic`);
            const data = response.data.data;
            setQuestion(data[type]);
        } catch (error) {
            console.error("Error fetching question", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getQuestion(4);
            if (customer) {
                setFormData(customer);
            }
        };

        fetchData();
    }, [customer]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const HSI1 = parseInt(formData.get('HSI1') as string, 10);
        const HSI2 = parseInt(formData.get('HSI2') as string, 10);

        const total_score = HSI1 + HSI2;
        let total_score_detail = "";

        setCardDetail(cardColor(total_score))

        if (total_score <= 2) {
            total_score_detail = "ติดนิโคตินระดับต่ำ";
        } else if (total_score <= 4) {
            total_score_detail = "ติดนิโคตินระดับปานกลาง";
        } else if (total_score <= 6) {
            total_score_detail = "ติดนิโคตินระดับสูง";
        }

        // Update state
        setSummary(total_score);
        setSumDetail(total_score_detail);

        const data = {
            customer_id: customer?.id || 0,
            question_type_id: 4,
            assmt_status: 1,
            total_score,
            total_score_detail
        };

        console.log("Data to submit:", data);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data);
            console.log("Response:", response.data);
            toast.success("บันทึกข้อมูลสำเร็จ")
            // Handle successful response
        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("ไม่สามารถบันทึกข้อมูลได้ ลองใหม่อีกครั้ง")
            // Handle error response
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='w-full py-4'>
                <p>{question?.question_type_name || ""}</p>
                <div className='w-full'>

                    <RadioGroup
                        name='HSI1'
                        label="1. คุณต้องสูบบุหรี่มวนแรกสุดภายในเวลาเท่าไรหลังตื่นนอนตอนเช้า"
                        orientation="horizontal"

                    >
                        <Radio value="3">ภายใน 5 นาทีหลังตื่น</Radio>
                        <Radio value="2">6 - 30 นาทีหลังตื่น</Radio>
                        <Radio value="1">มากกว่า 30 นาทีหลังตื่น</Radio>
                        <Radio value="0">มากกว่า 60 นาทีหลังตื่น</Radio>
                    </RadioGroup>
                    <p className='py-2'>2. โดยเฉลี่ยคุณสูบบุหรี่วันละกี่มวน ?</p>
                    <RadioGroup
                        name='HSI2'
                        orientation="horizontal"
                    >
                        <Radio value="0">ไม่เกิน 10 มวนต่อวัน</Radio>
                        <Radio value="1">11 - 20 มวนต่อวัน</Radio>
                        <Radio value="2">21 - 30 มวนต่อวัน</Radio>
                        <Radio value="3">มากกว่า 30 มวนต่อวัน</Radio>
                    </RadioGroup>


                </div>
                <div className='flex justify-end'>
                    <Button className='my-4 bg-primary text-white' type='submit'>แปรผล</Button>
                </div>

                {
                    (summary >= 0) &&
                    <Card className={cardDetail}>
                        <div className='p-4 flex justify-center'>
                            <p className='font-bold text-white'>ผลการทดสอบ: {sumDetail}</p>
                        </div>


                    </Card>
                }

            </div >
        </form>
    );
}

export default HSI;
