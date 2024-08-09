import React, { useEffect, useState } from 'react';
import { Input, Button, Card, Select, SelectItem } from '@nextui-org/react';

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

const scoreClassName   = (score: number) => {
    if (score <= 2) return "text-green-500";
    else if (score >= 3 && score <= 5) return "text-yellow-500";
    else if (score >= 6 && score <= 8) return "text-orange-500";
    else if ( score >= 6) return "text-red-500";
    else return "text-gray-500"; // This is an optional default case if the score is outside the expected range
};

interface DiabetesFormProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onSubmit: (data: FormData, description: string) => void;
}

const DiabetesForm: React.FC<DiabetesFormProps> = ({ formData, setFormData, onSubmit }) => {
    const [riskDescription, setRiskDescription] = useState('');
    const [score, setScore] = useState(0)
    const [scoreColor, setScoreColor] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateRiskScore = () => {
        let score = 0;

        // Age
        const age = parseInt(formData.age);
        if (age >= 34 && age <= 39) score += 0;
        else if (age >= 40 && age <= 44) score += 0;
        else if (age >= 45 && age <= 49) score += 1;
        else if (age >= 50) score += 2;

        // Gender
        if (formData.gender === '1') score += 2;
        else if (formData.gender === '2') score += 0;

        // BMI
        const bmi = parseFloat(formData.bmi);
        if (bmi < 23) score += 0;
        else if (bmi >= 23 && bmi < 27.5) score += 3;
        else if (bmi >= 27.5) score += 5;

        // Waistline
        const waistline = parseFloat(formData.waistline);
        if ((formData.gender === '1' && waistline >= 90) || (formData.gender === '2' && waistline >= 80)) score += 2;
        else score += 0;

        // Blood Pressure
        if (formData.Hypertension === 'มี') score += 2;
        else if (formData.Hypertension === 'ไม่มี') score += 0;

        // Family History of Diabetes
        if (formData.family_history === 'มี') score += 4;
        else if (formData.family_history === 'ไม่มี') score += 0;

        return score;
    };

    const getRiskDescription = (score: number): string => {
        if (score >= 0 && score <= 2) {
            return "ความเสี่ยงต่ำ, โอกาสเกิดเบาหวาน 1/20";
        } else if (score >= 3 && score <= 5) {
            return "ความเสี่ยงปานกลาง, โอกาสเกิดเบาหวาน 1/12";
        } else if (score >= 6 && score <= 8) {
            return "ความเสี่ยงสูง, โอกาสเกิดเบาหวาน 1/17";
        } else if (score > 8) {
            return "ความเสี่ยงสูงมาก, โอกาสเกิดเบาหวาน 1/3 - 1/4";
        } else {
            return "";
        }
    };

    const getSuggestion = (score: number): string =>{
        if (score >= 0 && score <= 2) {
            return "ออกกำลังกายสม่ำเสมอ, ควบคุมน้ำหนักให้อยู่ในเกณฑ์ที่เหมาะสม";
        } else if (score >= 3 && score <= 5) {
            return "ออกกำลังกายสม่ำเสมอ, ควบคุมน้ำหนักให้อยู่ในเกณฑ์ที่เหมาะสม, ตรวจความดันโลหิต, ตรวจระดับน้ำตาลในเลือด, ควรประเมินความเสี่ยงซ้ำทุก 1-3 ปี";
        } else if (score >= 6 && score <= 8) {
            return "ควบคุมอาหารและออกกำลังกายสม่ำเสมอ, ควบคุมน้ำหนักให้อยู่ในเกณฑ์ที่เหมาะสม, ตรวจความดันโลหิต, ตรวจระดับน้ำตาลในเลือด, ควรประเมินความเสี่ยงซ้ำทุก 1-3 ปี";
        } else if (score > 8) {
            return "ควบคุมอาหารและออกกำลังกายสม่ำเสมอ, ควบคุมน้ำหนักให้อยู่ในเกณฑ์ที่เหมาะสม, ตรวจความดันโลหิต, ตรวจระดับน้ำตาลในเลือด, ควรประเมินความเสี่ยงซ้ำทุก 1 ปี";
        } else {
            return "";
        }
    }


    const handleSubmit = () => {
        const score = calculateRiskScore();
        const description = getRiskDescription(score);
        const suggestion = getSuggestion(score)
        setRiskDescription(description);
        setScore(score);
        setScoreColor(scoreClassName(score))
        onSubmit(formData, description);
        setFormData((prevForm) => ({
            ...prevForm,
            diabetes_score: (score),
            diabetes_score_details: (description),
            diabetes_score_suggestion: suggestion
        }));

    };
    const handleSexStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setFormData((prevForm) => ({
            ...prevForm,
            gender: (selectedValue),
        }));
    };
    const handleHypertensionStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setFormData((prevForm) => ({
            ...prevForm,
            Hypertension: (selectedValue),
        }));
    };
    const handleFamilyHistoryChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setFormData((prevForm) => ({
            ...prevForm,
            family_history: (selectedValue),
        }));
    };

    // useEffect(() => {
    //     const score = calculateRiskScore();
    //     const description = getRiskDescription(score);
    //     setRiskDescription(description);
    //     setScore(score);
    //     setScoreColor(scoreClassName(score))
    //     onSubmit(formData, description);
    //     // setFormData((prevForm) => ({
    //     //     ...prevForm,
    //     //     diabetes_score: (score),
    //     //     diabetes_score_details: (description)
    //     // }));
    // }, [formData]);

    return (
        <div className="flex w-full flex-wrap py-3 mb-6 md:mb-0">
            <Input
                name="age"
                label="อายุ"
                value={formData.age}
                onChange={handleChange}
                endContent="ปี"
                className="w-full p-4 sm:w-4/12"
            />
            <Select
                name="gender"
           
                className="w-full p-4 sm:w-4/12"
                label="เพศ"
                placeholder="เลือกเพศ"

                selectedKeys={[formData.gender]}
                onSelectionChange={(keys) => handleSexStatusChange(Array.from(keys) as string[])}
            >
                <SelectItem key="ไม่ระบุ">ไม่ระบุ</SelectItem>
                <SelectItem key="1">ชาย</SelectItem>
                <SelectItem key="2">หญิง</SelectItem>
            </Select>
            
            <Input
                name="bmi"
                label="ดัชนีมวลกาย"
                value={formData.bmi}
                onChange={handleChange}
                className="p-4 sm:w-4/12"
            />
            <Input
                name="waistline"
                label="รอบเอว"
                value={formData.waistline}
                onChange={handleChange}
                className="w-full p-4 sm:w-4/12"
            />
           <Select
                name="Hypertension"
            
                className="w-full p-4 sm:w-4/12"
                label="ความดันโลหิต"
                placeholder="ระบุ"

                selectedKeys={[formData.Hypertension]}
                onSelectionChange={(keys) => handleHypertensionStatusChange(Array.from(keys) as string[])}
            >
                <SelectItem key="มี">มี</SelectItem>
                <SelectItem key="ไม่มี">ไม่มี</SelectItem>
            </Select>
            <Select
                name="family_history"
                
                className="w-full p-4 sm:w-4/12"
                label="ประวัติโรคเบาหวานในญาติสายตรง(พ่อ แม่ พี่ น้อง)"
                placeholder="ระบุ"

                selectedKeys={[formData.family_history]}
                onSelectionChange={(keys) => handleFamilyHistoryChange(Array.from(keys) as string[])}
            >
                <SelectItem key="มี">มี</SelectItem>
                <SelectItem key="ไม่มี">ไม่มี</SelectItem>
            </Select>
            <div className='flex w-full flex-row justify-end'>

            <Button onClick={handleSubmit} className="bg-primary text-white ">
                    แปลผล
                </Button>
            </div>

            <div className="w-full mt-4">
               
            {score>0 && <Card className='my-6'>
                    <div className='p-4'>
                        <p className="text-lg font-bold">ผลการประเมินความเสี่ยงโรคเบาหวานชนิดที่ 2:</p>
                        <p>ผลรวม: <span className={scoreColor}>{score} คะแนน</span> </p>
                        <p>คำแนะนำ:  <span className={scoreColor}>{riskDescription} </span> </p>
                    </div>
                </Card>}
               





            </div>
        </div>
    );
};

export default DiabetesForm;
