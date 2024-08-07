'use client'
import HSI from '@/components/form/HSI';
import FTND from '@/components/form/FTND'; // Make sure to import FTND component
import { Customer } from '@/types/interface';
import { Card, Input, Button, Spinner } from '@nextui-org/react';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NicotineTestPage = () => {
    const [idCard, setIdCard] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isHsi, setIsHsi] = useState(false);
    const [isFTND, setIsFTND] = useState(false);

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
                console.log("res", response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="flex w-full flex-col">
            <Card className="w-full p-5 overflow-auto">
                <p className="text-lg flex justify-center font-bold">แบบประเมินระดับการเสพติดนิโคติน</p>
                <div className="flex flex-col justify-end w-full gap-4 sm:flex sm:flex-row sm:justify-end py-2">
                    <ToastContainer />
                    <div className='flex flex-col w-full sm:w-6/12'>
                        <p>เลขบัตรประจำตัวประชาชน: {customer?.id_card}</p>
                        <p>ชื่อ: {customer?.firstname} {customer?.lastname}</p>
                        <p>อายุ: {customer?.age}</p>
                    </div>
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
                        <Button className="bg-primary text-white" onClick={fetchData}>
                            ค้นหา <IconSearch stroke={1} />
                        </Button>
                    </div>
                </div>
                <div className='flex flex-row justify-center gap-6 py-4'>
                    <p className='font-bold text-md'>สามารถทำได้หลายวิธี โดยสามารถเลือกวิธีใดก็ได้ที่สะดวก</p>
                </div>
                <div className='flex flex-col justify-center gap-6 sm:flex-row'>
                    <Button
                        color='primary'
                        onClick={() => {
                            setIsHsi(true);
                            setIsFTND(false);
                        }}
                        isDisabled={customer == null}
                    >
                        Heaviness of Smoking Index (HSI)
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => {
                            setIsHsi(false);
                            setIsFTND(true);
                        }}
                        isDisabled={customer == null}
                    >
                        The Fagerstrom Test for Nicotine Dependence (FTND)
                    </Button>
                </div>
                {loading ? (
                    <div className="flex justify-center py-5">
                        <Spinner size="lg" className="w-full" />
                    </div>
                ) : (
                    <>
                        {isHsi && <HSI customer={customer} />}
                        {isFTND && <FTND customer={customer} />}
                    </>
                )}
            </Card>
        </div>
    );
}

export default NicotineTestPage;
