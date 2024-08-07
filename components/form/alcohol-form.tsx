'use client'

import { RadioGroup, Radio } from '@nextui-org/radio';
import React, { FormEvent, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Customer } from '@/types/interface';
import axios from 'axios';

const SuicideForm = (customer: any) => {
    const [formData, setFormData] = useState({})
    const [questions, setQuestions] = useState([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [customerID, setCustomerID] = useState<any | null>('')
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
                console.log("Question", data.data[6].Questions)

                setQuestions(data.data[6].Questions);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [customer])

    const [visible, setVisible] = useState(false);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [isShowbtn, setIsShowbtn] = useState(false)
    const [totalScoreDetail, setTotalScoreDetail] = useState('')
    const [suggestion, setSuggestion] = useState('')
    const [isSecondOptionSelected, setIsSecondOptionSelected] = useState(false);
    const [values, setValues] = useState<any | null>({
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        question6: null,
        question7: null,
    });
    const [errors, setErrors] = useState({
        question2: false,
        question3: false,
        question4: false,
        question5: false,
        question6: false,
        question7: false,
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let formIsValid = true;
        const newErrors:any = {};

        if (isSecondOptionSelected) {
            Object.keys(values).forEach((question) => {
                if (values[question] === null) {
                    formIsValid = false;
                    newErrors[question] = true;
                } else {
                    newErrors[question] = false;
                }
            });
        }

        setErrors(newErrors);

        if (formIsValid) {
            const formData = new FormData(event.target as HTMLFormElement);
            let total = 0;
            formData.forEach((value) => {
                total += parseInt(value as string, 10);
            }); 

            if (total <= 10) {
                setIsShowbtn(true)
                setTotalScoreDetail(`ระดับความเสี่ยงต่ำ (Lower risk) การดื่มในขณะนี้มีความเสี่ยงต่ำต่อการเกิดปัญหาจากการดื่มสุรา แต่ในอนาคตหากดื่มมากกว่านี้มีโอกาสเพิ่มความเสี่ยงที่จะเกิดปัญหาจากการดื่มสุราได้`) 
            } else if(total >= 11 && total <= 26) {
                setIsShowbtn(true)
                setTotalScoreDetail('ระดับความเสี่ยงปานกลาง (Moderate risk) มีความเสี่ยงปานกลางต่อสุขภาพและปัญหาอื่นๆ หรืออาจเริ่มมีปัญหาบางอย่างเกิดขึ้นแล้วการดื่มสุราอย่างต่อเนื่องลักษณะเช่นนี้จะก่อให้เกิดปัญหาสุขภาพและปัญหาอื่นๆ เพิ่มขึ้นได้ในอนาคตรวมถึงเสี่ยงต่อการติดสุราได้โดยเฉพาะในคนที่เคยมีปัญหาจากการดื่มสุราหรือเคยติดสุรามาก่อน') 
            } else if(total >= 27) {
                setIsShowbtn(true)
                setTotalScoreDetail('ระดับความเสี่ยงสูง (High risk) บ่งชี้ว่ามีความเสี่ยงสูงต่อการติดสุราแล้ว หรือติดสุราแล้ว หรือกำลังประสบปัญหาสุขภาพสังคม การเงิน กฎหมาย สัมพันธ์กับการดื่มสุรา') 
            }
            setTotalScore(total);
            console.log(total); // You can process the result as needed
        }
    };

    const handleSecondOptionChange = (value: string) => {
        setIsSecondOptionSelected(value === "1");
    };

    const handleRadioChange = (question: string, value: string) => {
        setValues((prevValues:any) => ({ ...prevValues, [question]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [question]: false }));
    };

    const handleNextQuestion = async () => {
        console.log("test", totalScoreDetail)
        const data = {
            customer_id: customerID.id,
            question_type_id: 2,
            assmt_status: 1,
            total_score: totalScore,
            total_score_detail: totalScoreDetail
        }
        console.log("data", data)
        let formIsValid = true;
        const newErrors:any = {};
        if (isSecondOptionSelected) {
            Object.keys(values).forEach((question) => {
                if (values[question] === null) {
                    formIsValid = false;
                    newErrors[question] = true;
                    setIsShowbtn(false)
                } else {
                    newErrors[question] = false;
                    
                }
            });
        }

        setErrors(newErrors);
    
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data).then((response) => {
          console.log(response)
          if (response.status == 200) {
            window.location.href = "/"
          }
        })
        console.log("customer", customer) 
    }

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className='w-full p-5'>
            <span className='text-balance'> <span className='underline font-bold'>คำชี้แจง</span> คำถามแต่ละข้อต่อไปนี้จะถามถึงประสบการณ์การดื่มเครื่องดื่มแอลกอฮอล์ในช่วง 3 เดือนที่ผ่านมา โดยเครื่องดื่มแอลกอฮอล์ หมายถึง สุรา เบียร์ เหล้า สาโท กระแช่ ไวน์ เป็นต้น <span className='underline font-bold'>ขอให้ตอบตามความเป็นจริง</span>
            </span>
            <form onSubmit={handleSubmit}>
                <div className='py-2 lg:w-12/12'>
                    <span className='text-balance'> 1.ตลอดชีวิตที่ผ่านมา คุณ <span className='underline'>เคยดื่ม</span> เครื่องดื่มแอลกอฮอล์ หรือไม่ (หรือเคยดื่มแต่หยุดดื่มมาแล้ว 1 ปี ขึ้นไป)</span>
                    <RadioGroup
                        orientation="vertical"
                        onValueChange={handleSecondOptionChange}  
                    >
                        <Radio value="0">ไม่เคย (ยุติการประเมิน)</Radio>
                        <Radio value="1">เคย</Radio>
                    </RadioGroup>
                </div>
                {isSecondOptionSelected && (
                    <>
                        <div className='py-2 lg:w-12/12'>
                            <span className='text-balance'> 2.ในช่วง 3 เดือนที่ผ่านมาคุณ <span className='underline'>ดื่ม</span> เครื่องดื่มแอลกอฮอล์ บ่อยเพียงไร</span>
                            <RadioGroup
                                orientation="vertical"
                                value={values.question2}
                                onChange={(e) => handleRadioChange('question2', e.target.value)}
                                color={errors.question2 ? 'danger' : 'primary'}
                            >
                                <Radio value="0">ไม่เคย</Radio>
                                <Radio value="2">ครั้งสองครั้ง</Radio>
                                <Radio value="3">ทุกเดือน</Radio>
                                <Radio value="4">ทุกสัปดาห์</Radio>
                                <Radio value="6">เกือบทุกวัน</Radio>
                            </RadioGroup>
                            {errors.question2 && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                        </div>

                        <div className='py-2 lg:w-12/12'>
                            <span className='text-balance'> 3.ในช่วง 3 เดือนที่ผ่านมาคุณเคย <span className='underline'>รู้สึกอยากดื่ม</span> เครื่องดื่มแอลกอฮอล์ <span className='underline'>อย่างมาก</span> บ่อยเพียงไร</span>
                            <RadioGroup
                                orientation="vertical"
                                value={values.question3}
                                onChange={(e) => handleRadioChange('question3', e.target.value)}
                                color={errors.question3 ? 'danger' : 'primary'}
                            >
                                <Radio value="0">ไม่เคย</Radio>
                                <Radio value="3">ครั้งสองครั้ง</Radio>
                                <Radio value="4">ทุกเดือน</Radio>
                                <Radio value="5">ทุกสัปดาห์</Radio>
                                <Radio value="6">เกือบทุกวัน</Radio>
                            </RadioGroup>
                            {errors.question3 && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                        </div>  

                        <div className='py-2 lg:w-12/12'>
                            <span className='text-balance'> 4.ในช่วง 3 เดือนที่ผ่านมา การดื่มเครื่องดื่มแอลกอฮอล์ทำให้คุณ <span className='underline'>เกิดปัญหา</span> สุขภาพ ครอบครัว สังคม กฎหมาย หรือการเงิน บ่อยเพียงไร</span>
                            <RadioGroup
                                orientation="vertical"
                                value={values.question4}
                                onChange={(e) => handleRadioChange('question4', e.target.value)}
                                color={errors.question4 ? 'danger' : 'primary'}
                            >
                                <Radio value="0">ไม่เคย</Radio>
                                <Radio value="4">ครั้งสองครั้ง</Radio>
                                <Radio value="5">ทุกเดือน</Radio>
                                <Radio value="6">ทุกสัปดาห์</Radio>
                                <Radio value="7">เกือบทุกวัน</Radio>
                            </RadioGroup>
                            {errors.question4 && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                        </div>  

                        <div className='py-2 lg:w-12/12'>
                            <span className='text-balance'> 5.ในช่วง 3 เดือนที่ผ่านมาคุณ <span className='underline'>ไม่สามารถทำกิจกรรมที่คุณควรจะทำได้ตามปกติ</span> เนื่องจากคุณดื่มเครื่องดื่มแอลกอฮอล์ บ่อยเพียงไร</span>
                            <RadioGroup
                                orientation="vertical"
                                value={values.question5}
                                onChange={(e) => handleRadioChange('question5', e.target.value)}
                                color={errors.question5 ? 'danger' : 'primary'}
                            >
                                <Radio value="0">ไม่เคย</Radio>
                                <Radio value="5">ครั้งสองครั้ง</Radio>
                                <Radio value="6">ทุกเดือน</Radio>
                                <Radio value="7">ทุกสัปดาห์</Radio>
                                <Radio value="8">เกือบทุกวัน</Radio>
                            </RadioGroup>
                            {errors.question5 && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                        </div>  

                        <div className='py-2 lg:w-12/12'>
                            <span className='text-balance'> 6.ตลอดชีวิตที่ผ่านมา เพื่อนฝูง ญาติ หรือคนอื่น <span className='underline'>เคยแสดงความกังวลหรือตักเตือนคุณ</span> เกี่ยวกับการดื่มเครื่องดื่มแอลฮอล์ของคุณ หรือไม่</span>
                            <RadioGroup
                                orientation="vertical"
                                value={values.question6}
                                onChange={(e) => handleRadioChange('question6', e.target.value)}
                                color={errors.question6 ? 'danger' : 'primary'}
                            >
                                <Radio value="0">ไม่เคย</Radio>
                                <Radio value="6">เคย, ในช่วง 3 เดือนที่ผ่านมา</Radio>
                                <Radio value="3">เคย, ก่อน 3 เดือนที่ผ่านมา</Radio>
                            </RadioGroup>
                            {errors.question6 && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                        </div>  

                        <div className='py-2 lg:w-12/12'>
                            <span className='text-balance'> 7.ตลอดชีวิตที่ผ่านมาคุณ <span className='underline'>เคยพยายามหยุดหรือลดการดื่ม</span> เครื่องดื่มแอลกอฮอล์ให้น้อยลงแต่ทำไม่สำเร็จ หรือไม่</span>
                            <RadioGroup
                                orientation="vertical"
                                value={values.question7}
                                onChange={(e) => handleRadioChange('question7', e.target.value)}
                                color={errors.question7 ? 'danger' : 'primary'}
                            >
                                <Radio value="0">ไม่เคย</Radio>
                                <Radio value="6">เคย, ในช่วง 3 เดือนที่ผ่านมา</Radio>
                                <Radio value="3">เคย, ก่อน 3 เดือนที่ผ่านมา</Radio>
                            </RadioGroup>
                            {errors.question7 && <p style={{ color: 'red' }}>กรุณาเลือกคำตอบ</p>}
                        </div>  
                    </>
                )}

                {totalScore !== null && (  
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full bg-blue-200 dark:bg-blue-500">
                            <thead>
                                <tr className="w-full bg-blue-300 dark:bg-blue-600">
                                    <th className="py-2 px-4 border text-nowrap">คะแนนรวม</th>
                                    <th className="py-2 px-4 border">การแปลผล</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border text-center">{totalScore}</td>
                                    <td className="py-2 px-4 border ">
                                        {totalScoreDetail}
                                    </td> 
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-4 text-center"> 
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
