"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner } from "@nextui-org/react";
import Head from 'next/head'
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import { IconCreditCardPay, IconSearch } from "@tabler/icons-react";
import axios from 'axios';

export default function DepressionTestPage() {
    interface Assessment {
        assessment_id: number;
        Questions_type: {
            question_type_name: string;
        };
        total_score: number;
        total_score_detail: string;
        suggestion: string | null;
    }
    const [idCard, setIdCard] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [customer, setCustomer] = React.useState<any | null>('')
    const [asmtsummary, setAsmtsummary] = React.useState<Assessment[] | null>([])
    const [asmtdate, setAsmtdate] = React.useState<any | null>('')
    const colors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'];

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
        if (idCard) {
            const idCardValue = idCard.replace(/-/g, '');
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/customers/${idCardValue}`).then((response) => {

                if (response.data.message == 'User found successfully') {
                    setCustomer(response.data.data)
                    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assment_summary/${response.data.data.id}`).then((response) => {
                        console.log("dataresponse", response.data.data) 
                        const sortDataById = response.data.data.sort((a: any, b: any) => a.question_type_id - b.question_type_id);
                        console.log(sortDataById)
                        setAsmtsummary(sortDataById)
                        const date = (response.data.data[0].date).substring(0, 10)
                        setAsmtdate(date)
                        setError(false)
                        setErrorMessage("")
                    })
                } else {
                    setError(true)
                    setErrorMessage("ไม่พบข้อมูลของหมายเลขบัตรประชาชานี้!")
                    setAsmtsummary([])
                    setAsmtdate('')
                    setCustomer('')
                }
                //console.log("Customer", customer) 
            })
        } else {
            setError(true)
            setErrorMessage("กรุณากรอกข้อมูลบัตรประชาชน 13 หลัก!")
        }
    }
    // console.log("Customer", customer)
    // console.log("summary", asmtsummary)
    return (
        <div className="flex w-full flex-col">
            <Card className="w-full p-5 overflow-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    สรุปผลการประเมิน</h1>
                <div className="flex flex-col lg:flex-row justify-between py-5 px-4">
                    <div className="flex lex-col lg:flex-row justify-end w-full gap-4">
                        <Input
                            size="md"
                            placeholder="เลขบัตรประชาชน 13 หลัก"
                            className="w-full lg:w-4/12 text-nowrap"
                            value={idCard}
                            isInvalid={error}
                            errorMessage={errorMessage}
                            onChange={handleInputChange}
                            maxLength={17} // Restrict to 17 characters including hyphens
                        />
                        <Button className="bg-primary text-white w-full w-12/12" onClick={fetchData}>ค้นหา <IconSearch stroke={1} /></Button>
                    </div>
                </div>
                {customer && asmtsummary && (
                    <div className="bg-gray-200 min-h-screen">
                        <Head>
                            <title>สรุปผลการประเมิน</title>
                        </Head>
                        <div className="max-w-7xl mx-auto p-4">
                            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                                <h2 className="text-2xl font-semibold mb-4">ข้อมูลส่วนตัว</h2>
                                <table className="min-w-full bg-default-100">
                                    <thead>
                                        {/* <tr className="w-full bg-default-200">
                                                            <th className="py-2 px-4 border">คะแนนรวม</th>
                                                            <th className="py-2 px-4 border">การแปลผล</th>
                                                        </tr> */}
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border font-semibold">ชื่อ-นามสกุล</td>
                                            <td className="py-2 px-4 border bg-default-200">
                                                {customer.firstname} {customer.lastname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border font-semibold">เลขบัตรประชาชน</td>
                                            <td className="py-2 px-4 border bg-default-200">
                                                {idCard}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 border font-semibold">เพศ</td>
                                            <td className="py-2 px-4 border bg-default-200">
                                                {customer.gender == 1 && ('ชาย')} {customer.gender == 2 && ('หญิง')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border font-semibold">วันเกิด</td>
                                            <td className="py-2 px-4 border bg-default-200">
                                                {customer.birthdate}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border font-semibold">อายุ</td>
                                            <td className="py-2 px-4 border bg-default-200">
                                                {customer.age}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="py-2 px-4 border font-semibold">วันที่ทำการประเมิน</td>
                                            <td className="py-2 px-4 border bg-default-200">
                                                {asmtdate}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {asmtsummary !== null && asmtsummary.map((item, index) => (
                                <div key={item.assessment_id} className="bg-white shadow-lg rounded-lg p-6 mb-6">
                                    <h2 className="text-lg font-semibold mb-4">{item.Questions_type.question_type_name}</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className={`${colors[index % colors.length]} p-4 rounded-lg`}>
                                            <h3 className="text-lg font-medium">คะแนนประเมิน</h3>
                                            <p className="mt-2 text-gray-700">ที่ได้: <span className="font-bold">{item.total_score}</span></p>
                                        </div>
                                        <div className={`${colors[index % colors.length]} p-4 rounded-lg`}>
                                            <h3 className="text-lg font-medium">การแปลผล</h3>
                                            <p className="mt-2 text-gray-700"><span className="font-bold">{item.total_score_detail}</span></p>
                                        </div>
                                        <div className={`${colors[index % colors.length]} p-4 rounded-lg`}>
                                            <h3 className="text-lg font-medium">คำแนะนำ</h3>
                                            <p className="mt-2 text-gray-700"><span className="font-bold">{item.suggestion == null ? '-' : item.suggestion}</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </Card>
        </div>
    );
}
