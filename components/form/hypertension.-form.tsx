import { Card, CardBody, DateInput, Input, Tab, Tabs, Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
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
const scoreClassName   = (score: string) => {
  if (score == "ต่ำกว่าเกณฑ์") return "text-red-500";
  else if (score == "ปกติ") return "text-green-500";
  else if (score == "สูงกว่าเกณฑ์") return "text-red-500";
  else return "text-gray-500"; // This is an optional default case if the score is outside the expected range
};

interface HypertensionFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (data: FormData, description: string) => void;
}

const HypertensionForm: React.FC<HypertensionFormProps> = ({ formData, setFormData, onSubmit }) => {
  const [result, setResult] = useState('');
  const [scoreColor, setScoreColor] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const calculateHypertensionScore = () => {
    const SBP = parseInt(formData.SBP);
    const DBP = parseInt(formData.DBP);

    if (SBP < 120 || DBP < 80) {
      return "ต่ำกว่าเกณฑ์";
    } else if ((SBP >= 120 && SBP <= 129) && (DBP >= 80 && DBP <= 84)) {
      return "ปกติ";
    } else if ((SBP > 130) || (DBP > 85)) {
      return "สูงกว่าเกณฑ์";
    }  else {
      return "";
    }
  };

  const handleSubmit = () => {
    const description = calculateHypertensionScore();
    
    setResult(description);
    onSubmit(formData, description);
    setScoreColor(scoreClassName(description));
    setFormData((prevForm) => ({
      ...prevForm,
      HypertensionScore: (description),
  }));
  };

//   useEffect(() => {
  
//     const description = 'calculateHypertensionScore();'
    
//     setResult(description);
//     onSubmit(formData, description);
//   //   setFormData((prevForm) => ({
//   //     ...prevForm,
//   //     HypertensionScore: (description),
//   // }));
// }, [formData]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex">
        <Input 
          name="SBP" 
          label="SBP" 
          endContent="มม.ปรอท"
          value={formData.SBP}
          onChange={handleChange}
          className="w-full p-4 sm:w-4/12" 
        />
        <Input 
          name="DBP" 
          label="DBP" 
          endContent="มม.ปรอท" 
          value={formData.DBP}
          onChange={handleChange}
          className="w-full p-4 sm:w-4/12" 
        />
      </div>
      <div className='flex w-full flex-row justify-end'>

<Button onClick={handleSubmit} className="bg-primary text-white">
        แปลผล
    </Button>
</div>
    
      {result && (
        <Card className='my-6'>
           <div className="p-4">
          <p className="text-lg font-bold">ผลการประเมินความเสี่ยงโรคความดันโลหิต:</p>
          <p className={scoreColor}> {result}</p>
        </div> </Card>
       
      )}
    </div>
  );
}

export default HypertensionForm;
