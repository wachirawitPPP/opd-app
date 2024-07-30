"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import OpdTest from "@/components/opd-test";
import ThaiCVRiskForm from "@/components/thai-cv-risk-form";

export default function TestPage() {
  return (
    <div className="flex w-full flex-col">
      <Card className="w-full p-5">
        <Tabs aria-label="Options">
          <Tab key="test1" title="Test 1">
            <Card>
              <CardBody>
                <OpdTest></OpdTest>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="test2" title="Test 2">
            <Card>
              <CardBody>
                <ThaiCVRiskForm />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="test3" title="Test 3">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="test4" title="Test 4">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="test5" title="Test 5">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="test6" title="Test 6">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </Card>
    </div>
  );
}
