"use client";
import React, { useState } from "react";
import { Card, Input, Button, CircularProgress, Spinner } from "@nextui-org/react";
import CustomerRegistor from "@/components/customer-registor";
import { IconSearch, IconCreditCardPay } from '@tabler/icons-react';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

import { Oval } from 'react-loader-spinner'; // Import the loader

import { Customer } from "@/types/interface";
import { ToastContainer, Bounce, toast } from "react-toastify";

export default function AppraisalPage() {
  const [idCard, setIdCard] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [customerList, setCustomerList] = useState({})
  const [isCreate, setIsCreate] = useState(false)

  const isValidDate = (dateString: string) => {
    console.log(Date.parse(dateString))
    return !isNaN(Date.parse(dateString));
  };

  const validateAndSetCustomerData = (data: any) => {
    if (data.birth_date && !isValidDate(data.birth_date)) {
      data.birth_date = null; // Or set a default date
    }
    setCustomer(data);
  };

  const getCustomerList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers`);
      const data = response.data.data;
      setCustomerList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }
  const fetchData = async () => {
    // Validate ID card input
    if (!/^\d{13}$/.test(idCard)) {
      setError(true);
      setErrorMessage("กรุณาใส่เลขบัตรประชาชน 13 หลัก");
      return;
    }
    setError(false);
    setErrorMessage("");

    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${idCard}`,
      );
      const data = response.data.data;

      setCustomer(data)
      setCardData(null);
      setIsCreate(false)
      console.log("res", response);


    } catch (error) {
      console.error('Error fetching data:', error);

    } finally {
      setLoading(false); // Stop loading
    }
  };

  const getCardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8008/reader");
      const data = response.data.card_data;
      const citizenCode = data.citizen_code;

      if (citizenCode) {
        try {
          const checkResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${citizenCode}`);
          if (checkResponse.data.message === 'User found successfully') {
            setCustomer(checkResponse.data.data);
            setCardData(null)
            setIsCreate(false)
          } else if (checkResponse.data.message === 'User Not found') {
            setCardData(data);
            setCustomer(null)
            setIsCreate(true)
          }
        } catch (error) {
          // if (error === 404) {
          //   setCardData(data);
          // } else {
          //   console.error('Error checking customer status:', checkError);
            toast.error('ไม่สามารถดึงข้อมูลได้ ลองใหม่อีกครั้ง');
          // }
          console.log(error)
        }
      } else if (response.data.card_data.birth_date) {
        setCardData(data)

      } else {
        if (response.data.status === "error") {
          toast.error('ไม่สามารถอ่านบัตรได้ ลองใหม่อีกครั้ง');
        }
      }

      console.log("res", response.data.status);
      console.log('Card data fetched:', response.data.card_data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('ไม่สามารถอ่านบัตรได้ ลองใหม่อีกครั้ง');
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <div className="flex w-full flex-col">

      <Card className="w-full p-5 overflow-auto">
        <p className="text-lg flex justify-center font-bold">แบบคัดกรองสุขภาพรายบุคคล Personal Health Screening</p>
        <div className="flex flex-col justify-end w-full gap-4 sm:flex sm:flex-row sm:justify-end py-2">
          <Button className="bg-pink-500 w-full sm:w-4/12 text-white" onClick={getCardData}>ดึงข้อมูล<IconCreditCardPay stroke={2} /></Button>
          <ToastContainer />
          <div className="flex flex-col justify-end w-full gap-4 sm:flex sm:flex-row sm:justify-end">
            <Input
              size="md"
              placeholder="เลขบัตรประชาชน 13 หลัก"
              className="w-full sm:w-4/12"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              isInvalid={error}
              errorMessage={errorMessage}
            />
            <Button className="bg-primary text-white" onClick={fetchData}>ค้นหา <IconSearch stroke={1} /></Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-5">
            <Spinner size="lg" className="w-full" />
          </div>
        ) : (
          <CustomerRegistor customer={customer} cardData={cardData} create={isCreate} />
        )}
      </Card>
    </div>
  );
}
