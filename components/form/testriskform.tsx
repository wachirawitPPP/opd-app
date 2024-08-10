"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody, Input, Button, Slider, Checkbox} from "@nextui-org/react"; 
import OpdTest from "@/components/form/opd-test";
import ThaiCVRiskForm from "@/components/form/thai-cv-risk-form";
import SuicideForm1 from "@/components/form/suicide-form1";
import { IconCreditCardPay, IconSearch } from "@tabler/icons-react";
import axios from 'axios';

  

export default function TestRiskForm() {
    const [age, setAge] = useState(36);
  const [gender, setGender] = useState("F");
  const [sbp, setSbp] = useState(120);
  const [dm, setDm] = useState(1);
  const [totalChol, setTotalChol] = useState(230);
  const [hdl, setHdl] = useState(10);
  const [ldl, setLdl] = useState(160);
  const [smoking, setSmoking] = useState(0);
  const [waist, setWaist] = useState(120);
  const [height, setHeight] = useState(165);

  const [riskScore, setRiskScore] = useState("");
  const [riskGroup, setRiskGroup] = useState("");
 
  const [suggestion, setSuggestion] = useState<any>();
    

  // Function to calculate risk
  function calculateRisk(input:any, ln: 'th' | 'en' = 'th') {
    function convertDataType(data:any) {
      if (typeof data === 'number') {
        return data;
      } else {
        return parseFloat(data) || 0;
      }
    }

    const Gender = input.Gender === 'F' ? 0 : 1;

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

    if (Age > 1 && Sbp >= 70 && Dm !== 99 && Smoking !== 99) {
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

  const handleCalculateRisk = () => {
    const inputData = {
      Age: age,
      Gender: gender,
      Sbp: sbp,
      Dm: dm,
      TotalChol: totalChol,
      Hdl: hdl,
      Ldl: ldl,
      Smoking: smoking,
      Waist: waist,
      Height: height,
    };

    const result = calculateRisk(inputData);
    // setRiskScore(result.RiskScore);
    // setRiskGroup(result.RiskGroup);
    setRiskScore(result.RiskScore);
    setRiskGroup(result.RiskGroup);
    setSuggestion(result.Suggestion);
    
  };
    return (
        <div className="container mx-auto p-4">
        {/* Form Fields Here */}
        <div className="flex justify-center mb-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCalculateRisk}
          >
            คำนวณความเสี่ยง
          </button>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Risk Score: {riskScore}</p>
          <p className="text-lg font-semibold">Risk Group: {riskGroup}</p>
          <p className="text-lg font-semibold">Suggestion: {suggestion}</p>
        </div>
      </div>
    );
}
