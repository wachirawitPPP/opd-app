'use client'

import { RadioGroup, Radio } from '@nextui-org/radio';
import React, { FormEvent, useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import axios from 'axios';
//import { Customer } from '@/types/interface';

const SuicideForm = (customer: any)  => {
  const [formData, setFormData] = useState({})
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
  const [visible, setVisible] = useState(false);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [isSecondOptionSelected, setIsSecondOptionSelected] = useState(false);
  const [totalScoreDetail, setTotalScoreDetail] = useState('')
  const [isShowbtn, setIsShowbtn] = useState(false)
  const [customerID, setCustomerID] = useState<any | null>('')
  
  useEffect(() => {
    console.log("customerform3", customer)
    setCustomerID(customer.customer)
    setFormData(customer) 

  },[customer])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let total = 0;
    formData.forEach((value) => {
      total += parseInt(value as string, 10);
    });

    setTotalScore(total);
    console.log(total); // You can process the result as needed

    if (total === 0) {
      setIsShowbtn(true)
      setTotalScoreDetail(`ไม่มีแนวโน้มฆ่าตัวตายในปัจจุบัน`)
    } else if (total >= 7 && total <= 12) {
      setIsShowbtn(true)
      setTotalScoreDetail('มีแนวโน้มที่จะฆ่าตัวตายในปัจจุบัน ระดับน้อย ระดับน้อย')
    } else if (total >= 9 && total <= 16) {
      setIsShowbtn(true)
      setTotalScoreDetail('มีแนวโน้มที่จะฆ่าตัวตายในปัจจุบัน ระดับปานกลาง')
    } else if (total >= 17) {
      setIsShowbtn(true)
      setTotalScoreDetail('มีแนวโน้มที่จะฆ่าตัวตายในปัจจุบัน ระดับรุนแรง')
    } 
  };


  const handleSecondOptionChange = (value: string) => {
    setIsSecondOptionSelected(value === "6");
  };

  const hadleNextQuestion = async () => {
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
      if (response.status == 200) {
        window.location.href = "/"
      }
    }) 
  } 
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); 
  return (
    <div className='w-full p-5'>
      <form onSubmit={handleSubmit}>
        <div className='w-12/12'>
          <p className='py-2'>1.คิดอยากตาย หรือ คิดว่าตายไปจะดีกว่า</p>
          <RadioGroup
            orientation="vertical"
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="1">มี</Radio>
          </RadioGroup>
        </div>
        <div className='w-12/12'>
          <p className='py-2'>2.อยากทาร้ายตัวเอง หรือ ทาให้ตัวเองบาดเจ็บ</p>
          <RadioGroup
            orientation="vertical"

          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="2">มี</Radio>
          </RadioGroup>
        </div>
        <small className='py-2 text-small font-semibold leading-none text-default-600'>ในระยะเวลาช่วง 1 เดือนที่ผ่านมารวมวันนี้ จากข้อ 3 - 5</small>
        <div className='w-12/12'>
          <p className='py-2'>3.คิดเกี่ยวกับการฆ่าตัวตาย</p>

          <RadioGroup
            orientation="vertical"
            onValueChange={handleSecondOptionChange}
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="6">มี</Radio>
          </RadioGroup>

          <p className='py-2'>ท่านสามารถควบคุมความอยากฆ่าตัวตายที่ท่านคิดอยู่นั้นได้หรือไม่ หรือ บอกได้ไหมว่าคงจะไม่ทาตามความคิดนั้นในขณะนี้</p>
          <RadioGroup
            orientation="vertical"
            isDisabled={!isSecondOptionSelected}
          >
            <Radio value="0">ได้</Radio>
            <Radio value="8">ไม่ได้</Radio>
          </RadioGroup>
        </div>

        <div className='w-12/12'>
          <p className='py-2'>4.มีแผนการที่จะฆ่าตัวตาย</p>
          <RadioGroup
            orientation="vertical"
            isDisabled={!isSecondOptionSelected}
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="8">มี</Radio>
          </RadioGroup>
        </div>

        <div className='w-12/12'>
          <p className='py-2'>5.ได้เตรียมการที่จะทาร้ายตนเองหรือเตรียมการจะฆ่าตัวตายโดยตั้งใจว่าจะให้ตายจริง ๆ</p>
          <RadioGroup
            orientation="vertical"
            isDisabled={!isSecondOptionSelected}
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="9">มี</Radio>
          </RadioGroup>
        </div>

        <div className='w-12/12'>
          <p className='py-2'>6.ได้ทาให้ตนเองบาดเจ็บแต่ไม่ตั้งใจที่จะทาให้เสียชีวิต</p>
          <RadioGroup
            orientation="vertical"
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="4">มี</Radio>
          </RadioGroup>
        </div>

        <div className='w-12/12'>
          <p className='py-2'>7.ได้พยายามฆ่าตัวตายโดยคาดหวัง/ตั้งใจที่จะให้ตาย</p>
          <RadioGroup
            orientation="vertical"
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="10">มี</Radio>
          </RadioGroup>
        </div>
        <small className='py-2 text-small font-semibold leading-none text-default-600'>ในระยะเวลา ตลอดชีวิตที่ผ่านมา</small>
        <div className='w-12/12'>
          <p className='py-2'>8.ท่านเคยพยายามฆ่าตัวตาย</p>
          <RadioGroup
            orientation="vertical"
          >
            <Radio value="0">ไม่มี</Radio>
            <Radio value="4">มี</Radio>
          </RadioGroup>
        </div>

        {/* <div className="mt-4 text-center">
          {isShowbtn !== true && (
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Submit
            </button>
          )}

          {isShowbtn !== false && (
            <button type="button" onClick={hadleNextQuestion} className="px-4 mx-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              Send answer
            </button>
          )}
        </div> */}
        {totalScore !== null && (
                    // <div className="mt-4 text-center">
                    //   <p className="text-xl">Evaluation results: {totalScoreDetail} </p>
                    //   {totalScore >= 1 && (<p className="text-xl text-warning" color="danger"> ให้ประเมินต่อด้วยแบบประเมิน โรคซึมเศร้า 9Q</p>)}
                    //   Total Score: {totalScore}
                    // </div> 
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full bg-red-200 dark:bg-red-500">
                            <thead>
                                <tr className="w-full bg-red-300 dark:bg-red-600">
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
                    {totalScore !== null && totalScore >= 17 && (<p className="py-2 text-md text-danger text-center" >** ส่งต่อโรงพยาบาลมีจิตแพทย์ด่วน **</p>)}
                    {isShowbtn !== true && (
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            ส่ง
                        </button>
                    )}

                    {isShowbtn !== false && (
                        <button type="button" onClick={hadleNextQuestion} className="px-4 mx-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                            ยืนยันส่งคำตอบ
                        </button>
                    )}
                </div>
      </form>
      {/* {totalScore !== null && (
        // <div className="mt-4 text-center">
        //   <p className="text-xl">Total Score:  {totalScore === 0 && 'ไม่มีแนวโน้มฆ่าตัวตายในปัจจุบัน'}
        //     {totalScore >= 1 && totalScore <= 8 && 'มีแนวโน้มที่จะฆ่าตัวตายในปัจจุบัน ระดับน้อย'}
        //     {totalScore >= 9 && totalScore <= 16 && 'มีแนวโน้มที่จะฆ่าตัวตายในปัจจุบัน ระดับปานกลาง'}
        //     {totalScore >= 17 && 'มีแนวโน้มที่จะฆ่าตัวตายในปัจจุบัน ระดับรุนแรง'}</p>

        //     Total Score: {totalScore}
        // </div> 
        <div className="mt-4 text-center">
          <p className="text-xl">Evaluation results:  {totalScoreDetail} </p>
          Total Score: {totalScore}
        </div>
      )} */}
    </div>
  );
}

export default SuicideForm;
