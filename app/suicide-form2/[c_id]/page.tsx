"use client";
import React, { useEffect } from "react";
import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
import SuicideForm2 from "@/components/form/suicide-form2";
import { useParams } from 'next/navigation'
import axios from 'axios';
export default function DepressionTestPage() {
  const [customer, setCustomer] = React.useState<any>('')
  const params = useParams<{ c_id: string; item: string }>()
  const [idCard, setIdCard] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  console.log(params)

  const formatIdCard = (value: string) => {
    const formattedValue = value.replace(/\D/g, '') // Remove all non-numeric characters
      .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5'); // Apply the format

    return formattedValue;
  };

  useEffect(() => {
    const c_id = parseInt(params.c_id)

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${c_id}`).then((response) => {
      if (response.data.message == 'User found successfully') {
        setCustomer(response.data.data)
        setIdCard(formatIdCard(response.data.data.id_card));
      }
      console.log("Customer", response)
    })
  }, [])
  const fetchData = () => {

  }


  return (
    <div className="flex w-full flex-col">
      <Card className="w-full p-5 overflow-auto">
        <p className="text-lg flex justify-center font-bold">แบบประเมินโรคซึมเศร้า 9 คาถาม (9Q)</p>
        <div className="flex flex-col lg:flex-row justify-between py-5 px-4">
          <div className='flex flex-col w-full sm:w-6/12'>
            <p>เลขบัตรประจำตัวประชาชน: {idCard}</p>
            <p>ชื่อ: {customer?.firstname} {customer?.lastname}</p>
            <p>อายุ: {customer?.age}</p>
          </div>
        </div>
        <SuicideForm2 />

      </Card>
    </div>
  );
}
