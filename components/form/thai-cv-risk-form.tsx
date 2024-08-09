"use client";
import React, { useState, FormEvent } from "react";
import { Input, Switch, Button, Slider, Radio, RadioGroup, SliderValue, Card } from "@nextui-org/react";

interface FormData {
  SBP: string;
  DBP: string;
  Hypertension: string;
  HypertensionScore: string;
  age: string;
  gender: string;
  bmi: string;
  bp: string;
  diabetes_score: number;
  diabetes_score_details: string;
  diabetes_score_suggestion: string;
  family_history: string;
  waistline: string;
  smoking: boolean;
  diabetes: boolean;
  cholesterol: number | null;
  height: string;
  heart_score: number;
  heart_score_detail: string;
  heart_score_suggestion: string;
}

interface ThaiCVRiskFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (data: FormData, description: string) => void;
}

const ThaiCVRiskForm: React.FC<ThaiCVRiskFormProps> = ({ formData, setFormData, onSubmit }) => {
  const [waistValue, setWaistValue] = useState<SliderValue>(parseInt(formData.waistline));

  const [riskScore, setRiskScore] = useState("");
  const [riskGroup, setRiskGroup] = useState("");
 
  const [suggestion, setSuggestion] = useState<any>();

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: keyof FormData, value: SliderValue) => {
    setFormData((prev) => ({ ...prev, [name]: value.toString() }));
  };
  function calculateRisk(input:any, ln: 'th' | 'en' = 'th') {
    function convertDataType(data:any) {
      if (typeof data === 'number') {
        return data;
      } else {
        return parseFloat(data) || 0;
      }
    }

    const Gender = input.Gender === 'F' ? 0 : input.Gender === 'M' ? 1 : 99;

    const Age = convertDataType(input.Age);
    const Sbp = convertDataType(input.Sbp);
    const Dm = convertDataType(input.Dm);
    const TotalChol = convertDataType(input.TotalChol);
    const Hdl = convertDataType(input.Hdl);
    const Ldl = convertDataType(input.Ldl);
    const Smoking = convertDataType(input.Smoking);
    const Waist = convertDataType(input.Waist);
    const Height = convertDataType(input.Height);

    let WaistHeightRatio = 0;
    try {
      WaistHeightRatio = Waist / Height;
    } catch {
      WaistHeightRatio = 0;
    }

    let FullScore:any = 0 ;
    let CompareScore:any = 0;
    let PredictedRisk:any = 0;
    let CompareRisk:any = 0;
    const SurRoot = 0.964588;

    let CompareHdl, CompareWhr, CompareWc, CompareSbp;

    if (Gender === 1) {
      CompareHdl = 44;
      CompareWhr = 0.58125;
      CompareWc = 93;
      CompareSbp = Age > 60 ? 132 : 120;
    } else {
      CompareHdl = 49;
      CompareWhr = 0.52667;
      CompareWc = 79;
      CompareSbp = Age > 60 ? 130 : 115;
    }   

    if (Age > 1 && Sbp >= 70 && Gender !== 99 && Dm !== 99 && Smoking !== 99) {
      if (TotalChol !== 0) {
        FullScore =
          0.08183 * Age +
          0.39499 * Gender +
          0.02084 * Sbp +
          0.69974 * Dm +
          0.00212 * TotalChol +
          0.41916 * Smoking;
        PredictedRisk = 1 - Math.pow(SurRoot, Math.exp(FullScore - 7.04423));
        CompareScore =
          0.08183 * Age +
          0.39499 * Gender +
          0.02084 * CompareSbp +
          0.00212 * 200;
        CompareRisk = 1 - Math.pow(SurRoot, Math.exp(CompareScore - 7.04423));
      } else if (TotalChol === 0 && WaistHeightRatio > 0) {
        FullScore =
          0.079 * Age +
          0.128 * Gender +
          0.019350987 * Sbp +
          0.58454 * Dm +
          3.512566 * WaistHeightRatio +
          0.459 * Smoking;
        PredictedRisk = 1 - Math.pow(SurRoot, Math.exp(FullScore - 7.712325));
        CompareScore =
          0.079 * Age +
          0.128 * Gender +
          0.019350987 * CompareSbp +
          3.512566 * CompareWhr;
        CompareRisk = 1 - Math.pow(SurRoot, Math.exp(CompareScore - 7.712325));
      } else if (TotalChol === 0 && WaistHeightRatio === 0 && Waist > 0) {
        FullScore =
          0.08372 * Age +
          0.05988 * Gender +
          0.02034 * Sbp +
          0.59953 * Dm +
          0.01283 * Waist +
          0.459 * Smoking;
        PredictedRisk = 1 - Math.pow(SurRoot, Math.exp(FullScore - 7.31047));
        CompareScore =
          0.08372 * Age +
          0.05988 * Gender +
          0.02034 * CompareSbp +
          0.01283 * CompareWc;
        CompareRisk = 1 - Math.pow(SurRoot, Math.exp(CompareScore - 7.31047));
      }
    } else {
      FullScore = '99';
      PredictedRisk = '99';
      CompareScore = '99';
      CompareRisk = '99';
    }

    function RiskGroup(riskValue:any) {
      if (riskValue !== '99') {
        if (riskValue <= 0) {
          return 'Group0';
        } else if (riskValue < 0.1) {
          return 'Group1';
        } else if (0.1 <= riskValue && riskValue < 0.2) {
          return 'Group2';
        } else if (0.2 <= riskValue && riskValue < 0.3) {
          return 'Group3';
        } else if (0.3 <= riskValue && riskValue < 0.4) {
          return 'Group4';
        } else {
          return 'Group5';
        }
      }
      return 'undefined';
    }


    const suggestions:any = {
        Smoking: {
          th: ' เลิกบุหรี่',
          en: ' Quit smoking.',
        },
        Dm: {
          th: ' รักษาระดับน้ำตาลในเลือดให้อยู่ในเกณฑ์ปกติ',
          en: ' Maintain blood sugar level within normal range.',
        },
        Sbp: {
          th: ' ควบคุมระดับความดันโลหิตให้ดี',
          en: ' Control blood pressure.',
        },
        TotalChol: {
          th: ' เข้ารับการรักษาเพื่อลดโคเลสเตอรอลในเลือด',
          en: ' Intensify cholesterol-lowering therapy.',
        },
        Waist: {
          th: ' ลดน้ำหนักให้อยู่ในเกณฑ์ปกติ',
          en: ' Body weight lowering.',
        },
        Group0: {
          th: 'ไม่พบความเสี่ยง',
          en: 'No risk',
        },
        Group1: {
          th: 'จัดอยู่ในกลุ่มเสี่ยงน้อย',
          en: 'Classified as low risk',
        },
        Group2: {
          th: 'จัดอยู่ในกลุ่มเสี่ยงปานกลาง',
          en: 'Classified as medium risk',
        },
        Group3: {
          th: 'จัดอยู่ในกลุ่มเสี่ยงสูง',
          en: 'Classified as high risk',
        },
        Group4: {
          th: 'จัดอยู่ในกลุ่มเสี่ยงสูงมาก',
          en: 'Classified as very high risk',
        },
        Group5: {
          th: 'จัดอยู่ในกลุ่มเสี่ยงสูงอันตราย',
          en: 'Classified as dangerously high risk',
        },
        undefined: {
          th: 'ไม่สามารถคำนวณค่า CV Risk Score ได้',
          en: 'CV Risk score cannot be calculated',
        },
        NoRisk: {
          th: 'สามารถป้องกันการเกิดโรคหลอดเลือดหัวใจในอนาคตได้ด้วยการออกกำลังกายอย่างสม่ำเสมอ',
          en: 'Regular exercise could help you prevent atherosclerotic cardiovascular disease in the future.',
        },
        LowRisk: {
          th: 'เพื่อป้องกันการเกิดโรคหลอดเลือดในอนาคต ควรออกกำลังกายอย่างสม่ำเสมอ รับประทานผักผลไม้เป็นประจำ',
          en: 'It is reasonable to prevent atherosclerotic cardiovascular disease in the future by regular exercise, high fiber dietary.',
        },
        MedRisk: {
          th: 'ควรออกกำลังกายอย่างสม่ำเสมอ รับประทานผักผลไม้เป็นประจำ',
          en: 'You should have regular exercise, high fiber dietary.',
        },
        HighRisk: {
          th: 'ควรเข้ารับคำปรึกษาจากแพทย์ ในเบื้องต้นควรออกกำลังกายอย่างสม่ำเสมอ รับประทานผักผลไม้เป็นประจำ',
          en: 'You must visit the physician for a health checkup and receive proper therapy. You must have regular exercise, high fiber dietary.',
        },
        Recom: {
          th: ' และเข้ารับการตรวจสุขภาพประจำปีอย่างสม่ำเสมอ',
          en: ' and annual health checkup.',
        },
      };
    
      let Sug = '';
      let WholeSug = '';
    
      if (Smoking === 1 && suggestions.Smoking[ln]) {
        Sug += suggestions.Smoking[ln];
      }
      if (Dm === 1 && suggestions.Dm[ln]) {
        Sug += suggestions.Dm[ln];
      }
      if (Sbp >= 140 && suggestions.Sbp[ln]) {
        Sug += suggestions.Sbp[ln];
      }
      if (TotalChol >= 220 || Ldl >= 190 && suggestions.TotalChol[ln]) {
        Sug += suggestions.TotalChol[ln];
      }
    
      const Group = RiskGroup(PredictedRisk);
      const PredictedRiskValue =
        FullScore === '99' ? '99' : Math.round(PredictedRisk * 100 * 100) / 100;
      const CompareRiskValue =
        FullScore === '99' ? '99' : Math.round(CompareRisk * 100 * 100) / 100;
    
      if (Group === 'Group0') {
        WholeSug = suggestions.NoRisk[ln];
      } else if (Group === 'Group1') {
        WholeSug = suggestions.LowRisk[ln] + Sug + suggestions.Recom[ln];
      } else if (Group === 'Group2') {
        WholeSug = suggestions.MedRisk[ln] + Sug + suggestions.Recom[ln];
      } else if (Group === 'Group3' || Group === 'Group4' || Group === 'Group5') {
        WholeSug = suggestions.HighRisk[ln] + Sug;
      }

      let GroupDesc = '';
      if (suggestions[Group] && suggestions[Group][ln]) {
        GroupDesc = suggestions[Group][ln];
      }
 
      

    return {
    //   RiskScore: String(PredictedRiskValue),
    //   RiskGroup: Group,
    //   CompareRiskScore: String(CompareRiskValue),
    RiskScore: PredictedRiskValue.toString(),
    RiskGroup: GroupDesc,
    CompareRiskScore: CompareRiskValue.toString(),
    Suggestion: WholeSug,
    };
    
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let sex = '';
    if (formData.gender === '1') {
        sex = 'M';
    } else if (formData.gender === '2') {
        sex = 'F';
    }

    // Determine diabetes status
    let dm = formData.diabetes ? 1 : 0;

    // Determine smoking status
    let smoke = formData.smoking ? 1 : 0;

    // Prepare the input data for the risk calculation
    const inputData = {
        Age: parseInt(formData.age),
        Gender: sex,
        Sbp: parseInt(formData.SBP),
        Dm: dm,
        TotalChol: formData.cholesterol,
        // Hdl: hdl, // Uncomment and use if needed
        // Ldl: ldl, // Uncomment and use if needed
        Smoking: smoke,
        Waist: parseInt(formData.waistline),
        Height: parseInt(formData.height),
    };

      const result = calculateRisk(inputData);
    setRiskScore(result.RiskScore);
    setRiskGroup(result.RiskGroup);
    setSuggestion(result.Suggestion);
    setFormData((prevForm) => ({
      ...prevForm,
      heart_score:parseInt(riskScore),
      heart_score_detail:riskGroup,
      heart_score_suggestion:suggestion
  }));
   

  
    console.log("Form Data Submitted:", formData);
    onSubmit(formData, "Form submission description");
    const data ={
      Age: parseInt(formData.age),
      Gender: formData.gender,
      smoking: formData.smoking,
      diabetes: formData.diabetes,
      waistline: parseInt(formData.waistline),
      height: parseInt(formData.height),
      sbp: parseInt(formData.SBP),
      chol: formData.cholesterol


    }
    console.log(inputData);
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="อายุ"
            type="number"
            value={formData.age !== null ? formData.age.toString() : ""}
            onChange={(e) => handleChange("age", e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center mb-4">
          <h3 className="mr-4">เพศ</h3>
          <RadioGroup
            name="gender"
            className="flex"
            orientation="horizontal"
            value={formData.gender}
            onChange={(value) => handleChange("gender", value)}
          >
            <Radio value="1">ชาย</Radio>
            <Radio value="2">หญิง</Radio>
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
            showTooltip={true}
            size="sm"
            label="ความดันโลหิตตัวบน"
            value={parseInt(formData.SBP) || 0}
            minValue={0}
            maxValue={200}
            onChange={(value) => handleSliderChange("SBP", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-primary-100",
              filler: "bg-gradient-to-r from-primary-100 to-primary-500",
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
          <h3>{formData.SBP !== null ? formData.SBP : ""}</h3>
        </div>
        <div className="mb-4">
          <h3 className="mb-2">โคเรสเตอรอลรวม (Cholesterol)</h3>
          <Slider
            size="sm"
            label="โคเรสเตอรอลรวม"
            value={formData.cholesterol || 0}
            minValue={0}
            maxValue={300}
            onChange={(value) => handleSliderChange("cholesterol", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500",
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
            value={parseInt(formData.waistline)}
            minValue={0}
            maxValue={200}
            onChange={(value: any) => handleSliderChange("waistline", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500",
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
          <h3>{formData.waistline !== null ? formData.waistline : ""}</h3>
        </div>
        <div className="mb-4">
          <h3 className="mb-2">ส่วนสูง</h3>
          <Slider
            size="sm"
            label="ส่วนสูง"
            value={parseInt(formData.height) || 0}
            minValue={0}
            maxValue={200}
            onChange={(value: any) => handleSliderChange("height", value)}
            classNames={{
              base: "max-w-md gap-3",
              track: "border-s-secondary-100",
              filler: "bg-gradient-to-r from-secondary-100 to-secondary-500",
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
        <div className="flex w-full flex-row justify-end">
          <Button type="submit" className="bg-primary text-white">
            แปลผล
          </Button>
        </div>
        <Card className='my-6'>
        <div className="flex flex-col m-4 ">
          <p className="text-lg font-semibold">Risk Score: <span className="text-lg font-normal">{riskScore} </span> </p>
          <p className="text-lg font-semibold">Risk Group: <span className="text-lg font-normal">{riskGroup}</span> </p>
          <p className="text-lg font-semibold">Suggestion: <span className="text-lg font-normal">{suggestion}</span></p>
        </div>
        </Card>
        
      </form>
    </div>
  );
};

export default ThaiCVRiskForm;
