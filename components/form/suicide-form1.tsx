'use client'

import { RadioGroup, Radio } from '@nextui-org/radio';
import React, { FormEvent, useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, useDisclosure } from "@nextui-org/react";
import { Customer } from '@/types/interface';
import axios from 'axios';

const SuicideForm = (customer: any) => {
  const [formData, setFormData] = useState({})
  const [questions, setQuestions] = useState<any[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [customerID, setCustomerID] = useState<any | null>('')
  const initialForm = {
    suicide1: 0,
    suicide2: 0,
    suicide3: 0,
    suicide4: 0,
    suicide5: 0,
    suicide6: 0,
    suicide7: 0,
    suicide8: 0,
  }

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
        console.log("Question", data.data[1].Questions)

        setQuestions(data.data[1].Questions);
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let total = 0;
    let errors: string[] = [];

    questions.forEach((question, index) => {
      const value = formData.get(`suicide${index + 1}`);
      if (!value) {
        errors.push(`กรุณาเลือกคำตอบสำหรับคำถามที่ ${index + 1}`);
      } else {
        total += parseInt(value as string, 10);
      }
    });

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    } else {
      setErrorMessages([]);
    }

    if (total >= 1) {
      setIsShowbtn(true)
      setTotalScoreDetail(`“เป็นผู้มีความเสี่ยง” หรือ “มีแนวโน้มที่จะเป็นโรคซึมเศร้า”`)
    } else {
      setTotalScoreDetail('ปกติ ไม่เป็นโรคซึมเศร้า')
      setIsShowbtn(true)
    }
    setTotalScore(total);
    console.log(total); // You can process the result as needed
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
    if (totalScore !== null && totalScore == 0) {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data).then((response) => {
        console.log(response)
        if (response.status == 200) {
          window.location.href = "/"
        }
      })
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/create_assment`, data).then((response) => {
        console.log(response)
        if (response.status == 200) {
          window.location.href = `/suicide-form2/${customer.customer.id_card}`
        }
      })
    }

    console.log("customer", customer)
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className='w-full p-5'>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.question_id} className='w-12/12'>
            <p className='py-2'>{index + 1}. {question.question_text}</p>
            <RadioGroup orientation="horizontal" name={`suicide${index + 1}`}>
              <Radio value="0">ไม่มี</Radio>
              <Radio value="1">มี</Radio>
            </RadioGroup>
          </div>
        ))}

        {errorMessages.length > 0 && (
          <div className="mt-4 text-center text-red-500">
            {errorMessages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        )}

        {totalScore !== null && (
          // <div className="mt-4 text-center">
          //   <p className="text-xl">Evaluation results: {totalScoreDetail} </p>
          //   {totalScore >= 1 && (<p className="text-xl text-warning" color="danger"> ให้ประเมินต่อด้วยแบบประเมิน โรคซึมเศร้า 9Q</p>)}
          //   Total Score: {totalScore}
          // </div>


          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full bg-indigo-100 dark:bg-indigo-500">
              <thead>
                <tr className="w-full bg-indigo-200 dark:bg-indigo-600">
                  <th className="py-2 px-4 border text-nowrap">คะแนนรวม</th>
                  <th className="py-2 px-4 border">การแปลผล</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border text-center">{totalScore <= 2 && ('-')} </td>
                  <td className="py-2 px-4 border text-center">
                    {totalScoreDetail}
                  </td>
                </tr>
                {/* <tr className="bg-orange-50">
      <td className="py-2 px-4 border">7-12</td>
      <td className="py-2 px-4 border">
        มีอาการของโรคซึมเศร้า <span className="font-bold">ระดับน้อย</span>
      </td>
    </tr>
    <tr>
      <td className="py-2 px-4 border">13-18</td>
      <td className="py-2 px-4 border">
        มีอาการของโรคซึมเศร้า <span className="font-bold">ระดับปานกลาง</span>
      </td>
    </tr>
    <tr className="bg-orange-50">
      <td className="py-2 px-4 border">&ge; 19</td>
      <td className="py-2 px-4 border">
        มีอาการของโรคซึมเศร้า <span className="font-bold">ระดับรุนแรง</span>
      </td>
    </tr> */}
              </tbody>
            </table> 
          </div>
        )}
        <div className="mt-4 text-center">
          {totalScore !== null && totalScore >= 1 && (<p className="py-2 text-md text-warning text-center" color="danger">** ให้ประเมินต่อด้วยแบบประเมิน โรคซึมเศร้า 9Q **</p>)}
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
