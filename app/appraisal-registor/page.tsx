"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import CustomerRegistor from "@/components/customer-registor";

export default function AppraisalPage() {
  return (
    <div className="flex w-full flex-col">
    <Card className="w-full p-5 overflow-auto">
        
        <p className="text-lg flex justify-center font-bold">แบบคัดกรองสุขภาพรายบุคคล Personal Health Screening</p>
        <CustomerRegistor />
      </Card>
    </div>
  );
}
