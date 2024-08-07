"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import SuicideForm2 from "@/components/form/suicide-form2";
import { IconCreditCardPay, IconSearch } from "@tabler/icons-react";

export default function DepressionTestPage() {
  const [idCard, setIdCard] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const fetchData=()=>{

  }
  return (
    <div className="flex w-full flex-col">
      <Card className="w-full p-5 overflow-auto">
        <p className="text-lg flex justify-center font-bold">แบบประเมินโรคซึมเศร้า 9 คาถาม (9Q)</p>
        <div className="flex flex-row justify-between py-5 px-4">
        </div>
        <SuicideForm2/>
        
      </Card>
    </div>
  );
}
