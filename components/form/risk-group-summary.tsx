"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import SuicideForm1 from "@/components/form/suicide-form1";
import { IconCreditCardPay, IconSearch } from "@tabler/icons-react";
import axios from 'axios';

interface risksummary {
    assessment_id: number;
    Questions_type: {
        question_type_name: string;
    };
    total_score: number;
    total_score_detail: string;
    suggestion: string | null;
}

export default function DepressionTestPage(customer: any) {
    const [idCard, setIdCard] = React.useState("");
    const [error, setError] = React.useState(false);
    const [risksummary, setRisksummary] = useState<risksummary[]>([])
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/assment_summary/${customer.customer?.id}`).then((response) => {
            console.log("CustomerGET", response)
            if (response.data.data.length > 0) {
                const specificItems = response.data.data.filter((item: any) =>
                    item.Questions_type.question_type_name === "แบบประเมินความเสี่ยงการเกิดโรคเบาหวานชนิดที่ 2" ||
                    item.Questions_type.question_type_name === "แบบประเมินความเสี่ยงการเกิดโรคความดันโลหิตสูง"
                );
                setRisksummary(specificItems)
                console.log("Specific Items:", specificItems);

            }
        })
        console.log("customer", customer.customer?.id)
    }, [customer])

    console.log("risksummary", risksummary)
    return (
        <div className="flex w-full flex-col">
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-xl font-bold mb-6 text-center">สรุปผลการประเมิน</h1>  
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> 
                        {risksummary !== null && risksummary.map((item, index) => (
                            <div className="bg-blue-100 dark:bg-blue-400 p-4 rounded-lg">
                                <h3 className=" font-bold text-gray-700">{item.Questions_type.question_type_name}</h3>
                                <p className="mt-2 text-gray-700">ระดับ: <span className="font-bold text-danger">{item.total_score_detail}</span></p>
                                <p className="mt-2 text-gray-700">คำแนะนำ: <span className="font-bold">{item.suggestion ==null &&('-')} {item.suggestion}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
