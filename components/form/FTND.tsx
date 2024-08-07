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



const FTND: React.FC<HSIProps> = ({ customer }) => {
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
        const FTND1 = parseInt(formData.get('FTND1') as string, 10);
        const FTND2 = parseInt(formData.get('FTND2') as string, 10);
        const FTND3 = parseInt(formData.get('FTND3') as string, 10);
        const FTND4 = parseInt(formData.get('FTND4') as string, 10);
        const FTND5 = parseInt(formData.get('FTND5') as string, 10);
        const FTND6 = parseInt(formData.get('FTND6') as string, 10);

        const total_score = FTND1 + FTND2 + FTND3 + FTND4 + FTND5 + FTND6;
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
            customer_id: customer?.id,
            question_type_id: 6,
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
            <div className='w-full py-4 gap-6'>
                <p>{question?.question_type_name || ""}</p>
                <div className='w-full'>
                <p className='py-2'>1. โดยปกติคุณสูบบุหรี่วันละกี่มวน ?</p>
                    <RadioGroup
                        name='FTND1'
                    >
                        <Radio value="0">10 มวน หรือ น้อยกว่า</Radio>
                        <Radio value="1">10 - 11 มวน</Radio>
                        <Radio value="2">21 - 30 มวน</Radio>
                        <Radio value="3">มากกว่า 31 มวน</Radio>
                    </RadioGroup>
                    <p className='py-2'>2. หลังตื่นนอนเช้าคุณสูบบุหรี่มวนแรกเมื่่อใด ?</p>
                    <RadioGroup
                        name='FTND2'
                  
                    >
                        <Radio value="0">มากกว่า 60 นาทีหลังตื่นนอน</Radio>
                        <Radio value="1">31 - 60 นาทีหลังตื่นนอน</Radio>
                        <Radio value="2">6 - 30 นาทีหลังตื่นนอน</Radio>
                        <Radio value="3">ภายใน 5 นาที หลังตื่นนอน</Radio>
                    </RadioGroup>
                    <p className='py-2'>3. คุณสูบบุหรี่จัดในชั่วโมงแรกหลังตื่นนอน โดยสูบมากกว่าในช่วงอื่นของวัน ?</p>
                    <RadioGroup
                        name='FTND3'
                
                    >
                        <Radio value="0">ไม่ใช่</Radio>
                        <Radio value="1">ใช่</Radio>
                       
                    </RadioGroup>
                    <p className='py-2'>4. การสูบบุหรี่มวนใดที่คุณคิดว่าเลิกยากมากที่สุด  ?</p>
                    <RadioGroup
                        name='FTND4'
          
                    >
                        <Radio value="0">มวนอื่น ๆ ระหว่างวัน</Radio>
                        <Radio value="1">มวนแรกในตอนเช้า</Radio>
                    </RadioGroup>
                    <p className='py-2'>5.คุณสูบบุหรี่ลำบากหรือยุ่งยากหรือไม่ ที่ต้องอยู่ในเขตปลอดบุหรี่ เช่น โรงภาพยนตร์รถเมล์ ร้านอาหาร ?</p>
                    <RadioGroup
                        name='FTND5'
     
                    >
                        <Radio value="0">ไม่รู้สึกลำบาก</Radio>
                        <Radio value="1">รู้สึกลำบาก</Radio>
                        
                    </RadioGroup>
                    <p className='py-2'>6.คุณยังต้องสูบบุหรี่แม้มีอาการ เจ็บป่วยต้องนอนพักรักษาตัว หรือยังต้องสูบ แม้จะมีอาการไข้หวัดที่ทำให้หายใจลำบาก?</p>
                    <RadioGroup
                        name='FTND6'
     
                    >
                        <Radio value="0"> ไม่ใช่</Radio>
                        <Radio value="1">ใช่</Radio>
                        
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

export default FTND;
