'use client'

import { RadioGroup, Radio } from '@nextui-org/radio';
import React, { FormEvent, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Customer } from '@/types/interface';
import axios from 'axios';

const SuicideForm = (customer: any) => {
    const [formData, setFormData] = useState({});
    const [questions, setQuestions] = useState<any[]>([]);
    const [values, setValues] = useState<any>({
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        question6: null,
        question7: null,
        question8: null,
        question9: null,
    });
    const [errors, setErrors] = useState<any>({
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
        question8: false,
        question9: false,
    });

    useEffect(() => {
        if (customer) {
            setFormData(customer)
            setCustomerID(customer.customer)
        }

        // Fetch questions from the API
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/assment_topic`);
                const data = await response.json();
                console.log("Question", data.data[2].Questions)
                setQuestions(data.data[2].Questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [customer]);

    const [visible, setVisible] = useState(false);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [isShowbtn, setIsShowbtn] = useState(false);
    const [totalScoreDetail, setTotalScoreDetail] = useState('');
    const [customerID, setCustomerID] = useState<any | null>('')
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        let total = 0;
        let formIsValid = true;
        const newErrors: any = {};

        Object.keys(values).forEach((question) => {
            if (values[question] === null) {
                formIsValid = false;
                newErrors[question] = true;
            } else {
                newErrors[question] = false;
            }
        });
        setErrors(newErrors);

        if (!formIsValid) {
            return;
        }

        formData.forEach((value) => {
            total += parseInt(value as string, 10);
        });

        if (total < 7) {
            setIsShowbtn(true);
            setTotalScoreDetail(`ไม่มีอาการของโรคซึมเศร้าหรือมีอาการของโรคซึมเศร้าระดับน้อยมาก`);
        } else if (total >= 7 && total <= 12) {
            setIsShowbtn(true);
            setTotalScoreDetail('มีอาการของโรคซึมเศร้า ระดับน้อย');
        } else if (total >= 13 && total <= 18) {
            setIsShowbtn(true);
            setTotalScoreDetail('มีอาการของโรคซึมเศร้า ระดับปานกลาง');
        } else if (total >= 19) {
            setIsShowbtn(true);
            setTotalScoreDetail('มีอาการของโรคซึมเศร้า ระดับรุนแรง');
        }
        setTotalScore(total);
        console.log(total); // You can process the result as needed
    };

    const handleRadioChange = (question: string, value: string) => {
        setValues((prevValues: any) => ({ ...prevValues, [question]: value }));
        setErrors((prevErrors: any) => ({ ...prevErrors, [question]: false }));
    };

    const handleNextQuestion = async () => {
        console.log("test", totalScoreDetail)
        const data = {
            customer_id: customerID.id,
            question_type_id: 3,
            assmt_status: 1,
            total_score: totalScore,
            total_score_detail: totalScoreDetail
        }
        console.log("data", data)

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data).then((response) => {
            console.log(response)
            if (response.status === 200) {
                window.location.href = `/suicide-form3/${customer.customer.id_card}`
            }
        });
    } 

    return (
        <div className='w-full p-5'>
            <form onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={question.question_id} className='w-12/12'>
                        <p className='py-2'>{index + 1}. {question.question_text}</p>
                        <RadioGroup
                            orientation="vertical"
                            name={`suicide${index + 1}`}
                            value={values[`question${index + 1}`]}
                            onChange={(e) => handleRadioChange(`question${index + 1}`, e.target.value)}
                            color={errors[`question${index + 1}`] ? 'danger' : 'primary'}
                        >
                            <Radio value="0">ไม่มีเลย</Radio>
                            <Radio value="1">เป็นบางวัน 1-7 วัน</Radio>
                            <Radio value="2">เป็นบ่อย {'>'} 7วัน</Radio>
                            <Radio value="3">เป็นทุกวัน</Radio>
                        </RadioGroup>
                        {errors[`question${index + 1}`] && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                    </div>
                ))}
                {totalScore !== null && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full bg-orange-100 dark:bg-orange-500">
                            <thead>
                                <tr className="w-full bg-orange-200 dark:bg-orange-600">
                                    <th className="py-2 px-4 border">คะแนนรวม</th>
                                    <th className="py-2 px-4 border">การแปลผล</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border text-center">{totalScore}</td>
                                    <td className="py-2 px-4 border text-center">
                                        {totalScoreDetail}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-4 text-center">
                    {totalScore !== null && totalScore >= 7 && (<p className="py-2 text-md text-warning text-center" color="danger">** ให้ประเมินแนวโน้มการฆ่าตัวตาย ด้วย 8Q **</p>)}
                    {!isShowbtn && (
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            ส่ง
                        </button>
                    )}
                    {isShowbtn && (
                        <button type="button" onClick={handleNextQuestion} className="px-4 mx-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            ยืนยันส่งคำตอบ
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default SuicideForm;
