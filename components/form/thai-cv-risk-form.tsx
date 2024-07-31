"use client";
import React, { useState, FormEvent } from "react";
import { Input, Switch, Button, Slider, ButtonGroup, Tooltip, Radio, RadioGroup } from "@nextui-org/react";

interface FormData {
  age: number | null;
  sex: string;
  smoking: boolean;
  diabetes: boolean;
  systolicBP: number | null;
  cholesterol: number | null;
  waist: number | null;
  height: number | null;
}

const ThaiCVRiskForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: null,
    sex: "",
    smoking: false,
    diabetes: false,
    systolicBP: null,
    cholesterol: null,
    waist: null,
    height: null,
  });

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="w-full mx-auto p-8  rounded-lg">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-4">ข้อมูลที่จำเป็น (ต้องการทุกช่อง)</h3>

        <div className="mb-4">
          <Input
            label="อายุ"
            type="number"
            value={formData.age !== null ? formData.age.toString() : ""}
            onChange={(e) => handleChange("age", Number(e.target.value))}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4">เพศ</h3>
          <RadioGroup className="flex" 
        //   onChange={(value) => handleChange("sex", value)}
          >
            <Radio
              value="male"
            //   onChange={(value) => handleChange("sex", value)}
            >
              ชาย
            </Radio>
            <Radio
              value="female"
            //   onChange={(value) => handleChange("sex", value)}
            >
              หญิง
            </Radio>
          </RadioGroup>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4">สูบบุหรี่</h3>
          <Switch
            checked={formData.smoking}
            onChange={(e) => handleChange("smoking", e.target.checked)}
          />
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4">เป็นโรคเบาหวาน</h3>
          <Switch
            checked={formData.diabetes}
            onChange={(e) => handleChange("diabetes", e.target.checked)}
          />
        </div>
        <div className="mb-4">
          <h3 className="mb-2">ความดันโลหิตตัวบน</h3>
          <Slider
            size="sm"
            label="ความดันโลหิตตัวบน"
            value={formData.systolicBP || 0}
            minValue={0}
            maxValue={200}
            onChange={(value) => handleChange("systolicBP", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
          />
          <h3>{formData.systolicBP !== null ? formData.systolicBP : ""}</h3>
        </div>
        <div className="mb-4">
          <h3 className="mb-2">โคเรสเตอรอลรวม (Cholesterol)</h3>
          <Slider
            size="sm"
            label="โคเรสเตอรอลรวม"
            value={formData.cholesterol || 0}
            minValue={0}
            maxValue={300}
            onChange={(value) => handleChange("cholesterol", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
          />
          <h3>{formData.cholesterol !== null ? formData.cholesterol : ""}</h3>
        </div>
        <div className="mb-4">
          <h3 className="mb-2">วัดรอบเอว</h3>
          <Slider
            size="sm"
            label="วัดรอบเอว"
            value={formData.waist || 0}
            minValue={0}
            maxValue={100}
            onChange={(value) => handleChange("waist", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
          />
          <h3>{formData.waist !== null ? formData.waist : ""}</h3>
        </div>
        <div className="mb-4">
          <h3 className="mb-2">ส่วนสูง</h3>
          <Slider
            size="sm"
            label="ส่วนสูง"
            value={formData.height||0}
            minValue={0}
            maxValue={200}
            onChange={(value:any) => handleChange("height", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
            }}
            renderThumb={(props) => (
              <div
                {...props}
                className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
              >
                <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
              </div>
            )}
          />
          <h3>{formData.height !== null ? formData.height : ""}</h3>
        </div>
        <div className="text-right">
          <Button type="submit">แสดงผล</Button>
        </div>
      </form>
    </div>
  );
};

export default ThaiCVRiskForm;
