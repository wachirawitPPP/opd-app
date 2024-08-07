"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import AlcoholForm from "@/components/form/alcohol-form";
import { IconCreditCardPay, IconSearch } from "@tabler/icons-react";
import axios from 'axios';

export default function DepressionTestPage() {
  const [idCard, setIdCard] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [customer, setCustomer] = React.useState<any | null>('')
  const formatIdCard = (value: string) => {
    const formattedValue = value.replace(/\D/g, '') // Remove all non-numeric characters
      .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5'); // Apply the format

    return formattedValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters

    if (value.length > 13) {
      value = value.substring(0, 13); // Limit input length to 13 digits
    }

    setIdCard(formatIdCard(value));
  };

  const fetchData = () => {
    console.log("id_card", idCard)
    if (idCard) {
      const idCardValue = idCard.replace(/-/g, '');
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${idCardValue}`).then((response) => {
        console.log(response.data)
        if (response.data.message == 'User found successfully') {
          setCustomer(response.data.data)
          setError(false)
          setErrorMessage("")
        } else {
          setError(true)
          setErrorMessage("ไม่พบข้อมูลของหมายเลขบัตรประชาชานี้!")
          setCustomer('')
        }
        console.log("Customer", customer)
      })
    } else {
      setError(true)
      setErrorMessage("กรุณากรอกหมายเลขบัตรประชาชน 13 หลัก!")
    }

  }

  return (
    <div className="flex w-full flex-col">
      <Card className="w-full p-5 overflow-auto">
        <p className="text-lg flex justify-center font-bold">แบบประเมินแอลกอฮอล์</p>
        <div className="flex flex-col lg:flex-row justify-between py-5 px-4">
          <div className="flex flex-row justify-start w-full gap-4 mt-3">
            {customer && (<p className="text-md flex justify-left text-primary">{customer.prefix} {customer.firstname} {customer.lastname} | อายุ: {customer.age} | เพศ: {customer.gender == null && ('ไม่ระบุ')} {customer.gender == 1 && ('ชาย')} {customer.gender == 2 && ('หญิง')}</p>)}
          </div>
          <div className="flex flex-col lg:flex-row justify-end w-full gap-4 lg:mt-0 mt-3">
            <Input
              size="md"
              placeholder="เลขบัตรประชาชน 13 หลัก"
              className="w-full lg:w-4/12"
              value={idCard}
              onChange={handleInputChange}
              isInvalid={error}
              errorMessage={errorMessage}
              maxLength={17} // Restrict to 17 characters including hyphens
            />
            <Button className="w-full lg:w-auto bg-primary text-white" onClick={fetchData}>ค้นหา <IconSearch stroke={1} /></Button>
          </div>
        </div>
        {customer && <AlcoholForm customer={customer} />}
      </Card>
    </div>
  );
}
