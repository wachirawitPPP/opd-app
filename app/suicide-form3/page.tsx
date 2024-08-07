"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, Input, Button } from "@nextui-org/react";
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import SuicideForm3 from "@/components/form/suicide-form3";
import { IconCreditCardPay, IconSearch } from "@tabler/icons-react";

export default function DepressionTestPage() {
  const [idCard, setIdCard] = React.useState("");
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showSuicideForm, setShowSuicideForm] = React.useState(false);
  const fetchData=()=>{

  }

  const toggleSuicideForm = () => {
    setShowSuicideForm((prev) => !prev);
  };
  return (
    <div className="flex w-full flex-col">
      <Card className="w-full p-5 overflow-auto">
        <p className="text-lg flex justify-center font-bold">แบบประเมินการฆ่าตัวตาย 8 คำถาม</p>
        <div className="flex flex-row justify-between py-5 px-4">
          <Button className="bg-primary-200">ดึงข้อมูล<IconCreditCardPay stroke={2} /></Button>
          <Button onClick={toggleSuicideForm}>
          {showSuicideForm ? 'Hide' : 'Show'} SuicideForm3
          </Button>
          <div className="flex flex-row justify-end w-full gap-4">
            <Input 
              size="md" 
              placeholder="เลขบัตรประชาชน 13 หลัก" 
              className="w-4/12" 
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              isInvalid={error}
              errorMessage={errorMessage}
            />
            <Button onClick={fetchData}>ค้นหา <IconSearch stroke={1} /></Button>
          </div>
        </div>
        {/* <SuicideForm3 /> */}
        {showSuicideForm && <SuicideForm3 />}
      </Card>
    </div>
  );
}
