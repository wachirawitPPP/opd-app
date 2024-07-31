import { Checkbox, DatePicker, Divider, Input, Radio, RadioGroup, Select, SelectItem, Button } from '@nextui-org/react';
import React, { useState, useEffect, FormEvent } from 'react';
import { I18nProvider } from "@react-aria/i18n";
import { DateValue, parseAbsoluteToLocal } from "@internationalized/date";

const prename = [
    { key: 'นาย', label: 'นาย' },
    { key: 'นางสาว', label: 'นางสาว' },
    { key: 'นาง', label: 'นาง' },
]

const religion = [
    { key: 'พุทธ', label: 'พุทธ' },
    { key: 'คริสต์', label: 'คริสต์' },
    { key: 'อิสลาม', label: 'อิสลาม' },
]

const CustomerRegistor = () => {
    const [date, setDate] = useState<DateValue | null>(null);
    const [isDeseases, setIsDeseases] = useState(true);
    const [isDrugAllergic, setIsDrugAllergic] = useState(true);
    const [isFoodAllergic, setIsFoodAllergic] = useState(true);
    const [isHeredity, setIsHeredity] = useState(true);

    useEffect(() => {
        setDate(parseAbsoluteToLocal(new Date().toISOString()));
    }, []);

    const handleFormSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        // Additional form data can be appended as needed
        formData.append('birthDate', date?.toString() || '');
        console.log(formData.values)

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Handle success response
                console.log('Form submitted successfully');
            } else {
                // Handle error response
                console.log('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className='border border-gray-300 p-4 my-2 rounded-lg overflow-auto'>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input name="serviceUnitCode" size="sm" label="รหัสหน่วยบริการ" />
                <Input name="serviceUnitName" size="sm" label="ชื่อหน่วยบริการ" />
                <DatePicker
                    size='sm'
                    label="Birth Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    value={date}
                    onChange={setDate}
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input name="nationalId" size="sm" label="เลขบัตรประจำตัวประชาชน" />
                <Input name="passportId" size="sm" label="เลขที่บัตรต่างด้าว (Passport)" />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select name="prename" size='sm' label="คำนำหน้า" placeholder="เลือกคำนำหน้า" className="max-w-36">
                    {prename.map((prename) => (
                        <SelectItem key={prename.key}>
                            {prename.label}
                        </SelectItem>
                    ))}
                </Select>
                <Input name="firstName" size="sm" label="ชื่อ" />
                <Input name="lastName" size="sm" label="นามสกุล" />
                <Input name="phone" size="sm" label="เบอร์โทรศัพท์" />
                <Input name="lineId" size="sm" label="line ID" />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input name="age" size="sm" className='md:w-3/12' label="อายุ" endContent={'ปี'} />
                <Input name="nationality" size="sm" defaultValue='ไทย' className='md:w-3/12' label="สัญชาติ" />
                <Input name="ethnicity" size="sm" defaultValue='ไทย' className='md:w-3/12' label="เชื้อชาติ" />
                <DatePicker
                    name="birthDate"
                    size='sm'
                    label="Birth Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    className='md:w-3/12'
                    value={date}
                    onChange={setDate}
                />
            </div>
            <Divider className='my-2' />
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select name="maritalStatus" size='sm' label="สถานภาพสมรส" placeholder="เลือกสถานภาพสมรส" className="md:w-4/12">
                    <SelectItem key={'โสด'}>โสด</SelectItem>
                    <SelectItem key={'คู่'}>คู่</SelectItem>
                    <SelectItem key={'หม้าย'}>หม้าย</SelectItem>
                    <SelectItem key={'หย่าร้าง'}>หย่าร้าง</SelectItem>
                    <SelectItem key={'แยกกันอยู่'}>แยกกันอยู่</SelectItem>
                    <SelectItem key={'สมณะเพศ'}>สมณะเพศ</SelectItem>
                </Select>
                <Select name="education" size='sm' label="การศึกษาสูงสุด" placeholder="เลือกการศึกษาสูงสุด" className="md:w-4/12">
                    <SelectItem key={'ไม่ได้รับการศึกษา'}>ไม่ได้รับการศึกษา</SelectItem>
                    <SelectItem key={'ก่อนประถมศึกษา'}>ก่อนประถมศึกษา</SelectItem>
                    <SelectItem key={'ประถมศึกษา'}>ประถมศึกษา</SelectItem>
                    <SelectItem key={'มัธยมศึกษาตอนต้น'}>มัธยมศึกษาตอนต้น</SelectItem>
                    <SelectItem key={'มัธยมศึกษาตอนปลาย/ปวช.'}>มัธยมศึกษาตอนปลาย/ปวช.</SelectItem>
                    <SelectItem key={'อนุปริญญา/ปวส.'}>อนุปริญญา/ปวส.</SelectItem>
                </Select>
                <Input name="occupation" size="sm" className='md:w-4/12' label="อาชีพ" />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select name="status" size='sm' label="สถานะบุคคล" placeholder="เลือกสถานะบุคคล" className="md:max-w-4/12 md:w-4/12">
                    <SelectItem key={'อาศัยอยู่ตรงกับทะเบียนบ้าน'}>อาศัยอยู่ตรงกับทะเบียนบ้าน</SelectItem>
                    <SelectItem key={'อาศัยอยู่ไม่ตรงกับทะเบียนบ้าน'}>อาศัยอยู่ไม่ตรงกับทะเบียนบ้าน</SelectItem>
                    <SelectItem key={'ไม่อยู่ในทะเบียนราษฎร์'}>ไม่อยู่ในทะเบียนราษฎร์</SelectItem>
                </Select>
                <Select name="communityStatus" size='sm'  label="สถานะชุมชน" placeholder="เลือกสถานะในชุมชน" selectionMode="multiple" className="md:w-4/12">
                    <SelectItem key={'ประชาชนทั่วไป'}>ประชาชนทั่วไป</SelectItem>
                    <SelectItem key={'ประธานชุมชน'}>ประธานชุมชน</SelectItem>
                    <SelectItem key={'กรรมการชุมชน'}>กรรมการชุมชน</SelectItem>
                    <SelectItem key={'อาสาสมัครสาธารณสุข'}>อาสาสมัครสาธารณสุข</SelectItem>
                    <SelectItem key={'ผู้ดูแลผู้ป่วยที่ผ่านการอบรม'}>ผู้ดูแลผู้ป่วยที่ผ่านการอบรม</SelectItem>
                    <SelectItem key={'ผู้ดูแลผู้ป่วยที่ไม่ผ่านการอบรม'}>ผู้ดูแลผู้ป่วยที่ไม่ผ่านการอบรม</SelectItem>
                    <SelectItem key={'อาสาสมัครอื่นๆ'}>อาสาสมัครอื่นๆ</SelectItem>
                </Select>
            </div>
            <Divider className='my-2' />
            <p className="w-full font-bold">การปฏิบัติตัวเมื่อเจ็บป่วยเล็กน้อย</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select name="mildIllnessTreatment1" size='sm' label="ซื้อยาจากร้านขายยา" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
                <Select name="mildIllnessTreatment2" size='sm' label="รักษาที่ศูนย์บริการสาธารณสุข" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
                <Select name="mildIllnessTreatment3" size='sm' label="รักษาแพทย์ทางเลือก" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select name="mildIllnessTreatment4" size='sm' label="คลินิกเอกชน" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
                <Select name="mildIllnessTreatment5" size='sm' label="โรงพยาบาลรัฐ" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
                <Select name="mildIllnessTreatment6" size='sm' label="โรงพยาบาลเอกชน" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select name="mildIllnessTreatment7" size='sm' label="ดูแลสุขภาพตนเอง" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
                <Select name="mildIllnessTreatment8" size='sm' label="อื่นๆ" placeholder="เลือกระดับ" className="md:w-4/12">
                    <SelectItem key={1}>1</SelectItem>
                    <SelectItem key={2}>2</SelectItem>
                    <SelectItem key={3}>3</SelectItem>
                </Select>
            </div>
            <Divider className='my-2' />
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">โรคประจำตัว</p>
                <Checkbox name="noChronicDiseases" defaultSelected={!isDeseases} onChange={() => setIsDeseases(!isDeseases)}>
                    ไม่มีโรคประจำตัว
                </Checkbox>
            </div>
            {isDeseases && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input name="chronicDiseases" size="sm" className='md:w-6/12' label="ระบุโรค" />
                    <RadioGroup name="diseaseControl" orientation="horizontal">
                        <Radio value="ควบคุมโรคได้">ควบคุมโรคได้</Radio>
                        <Radio value="ควบคุมโรคไม่ได้">ควบคุมโรคไม่ได้</Radio>
                    </RadioGroup>
                </div>
            )}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">แพ้ยา</p>
                <Checkbox name="noDrugAllergies" defaultSelected={!isDrugAllergic} onChange={() => setIsDrugAllergic(!isDrugAllergic)}>
                    ปฎิเสธการแพ้ยา/ไม่ทราบ
                </Checkbox>
            </div>
            {isDrugAllergic && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input name="drugAllergies" size="sm" className='md:w-6/12' label="ระบุชื่อยา" />
                    <Input name="drugAllergySymptoms" size="sm" className='md:w-6/12' label="อาการ" />
                </div>
            )}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">แพ้อาหาร</p>
                <Checkbox name="noFoodAllergies" defaultSelected={!isFoodAllergic} onChange={() => setIsFoodAllergic(!isFoodAllergic)}>
                    ปฎิเสธการแพ้อาหาร/ไม่ทราบ
                </Checkbox>
            </div>
            {isFoodAllergic && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input name="foodAllergies" size="sm" className='md:w-6/12' label="ระบุชื่ออาหาร" />
                    <Input name="foodAllergySymptoms" size="sm" className='md:w-6/12' label="อาการ" />
                </div>
            )}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">ประวัติครอบครัวสายตรง</p>
                <Checkbox name="noHeredityDiseases" defaultSelected={!isHeredity} onChange={() => setIsHeredity(!isHeredity)}>
                    ไม่มีโรคประจำตัว/โรคที่ถ่ายทอดทางพันธุกรรม
                </Checkbox>
            </div>
            {isHeredity && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input name="heredityDiseases" size="sm" className='md:w-6/12' label="ระบุชื่อโรค" />
                </div>
            )}
            <Divider className='my-2' />
            <p className="font-bold">ประเมินสุขภาพ</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input name="weight" size="sm" className='md:w-4/12' label="น้ำหนัก" endContent='กก.' />
                <Input name="height" size="sm" className='md:w-4/12' label="ส่วนสูง" endContent='ซม.' />
                <Input name="waistCircumference" size="sm" className='md:w-4/12' label="เส้นรอบเอว" endContent='ซม.' />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input name="bloodPressure" size="sm" className='md:w-6/12' label="ความดันโลหิต" endContent='มม.ปรอท' />
                <Input name="bmi" size="sm" className='md:w-6/12' label="BMI" />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Input name="weightToAge" size="sm" className='md:w-3/12' label="น้ำหนัก/อายุ" />
                <Input name="heightToAge" size="sm" className='md:w-3/12' label="ส่วนสูง/อายุ" />
                <Input name="weightToHeight" size="sm" className='md:w-3/12' label="น้ำหนัก/ส่วนสูง" />
            </div>
            <Divider className='my-2' />
            <p className="font-bold">ความเสี่ยงด้านสุขภาพ</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Checkbox name="pregnancyRisk">หญิงตั้งครรภ์</Checkbox>
                <Checkbox name="drugUseRisk">ใช้สารเสพติด</Checkbox>
                <Checkbox name="dietRisk">รับประทานอาหารรสหวาน มัน เค็ม</Checkbox>
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Checkbox name="exerciseRisk">ออกกำลังกายน้อยกว่า 3 วัน/สัปดาห์</Checkbox>
                <Checkbox name="smokingRisk">สูบบุหรี่</Checkbox>
                <Checkbox name="alcoholRisk">ติดเหล้า</Checkbox>
                <Checkbox name="stressRisk">เครียด</Checkbox>
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Checkbox name="vaccinationRisk">เด็กได้รับวัคซีนไม่ครบ</Checkbox>
                <Checkbox name="bedriddenRisk">ติดเตียง</Checkbox>
                <Checkbox name="weightRisk">อ้วน/ผอม</Checkbox>
                <Checkbox name="disabilityRisk">มีความพิการ</Checkbox>
                <Checkbox name="healthCheckRisk">ไม่เคยตรวจสุขภาพ</Checkbox>
            </div>
            <Divider className='my-2' />
            <p className="font-bold">สรุปภาวะสุขภาพ</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <RadioGroup name="healthSummary">
                    <Radio value="กลุ่มสุขภาพ">กลุ่มสุขภาพ</Radio>
                    <Radio value="กลุ่มที่ความเสี่ยงด้านสุขภาพ">กลุ่มที่ความเสี่ยงด้านสุขภาพ</Radio>
                    <Radio value="กลุ่มป่วยที่ควบคุมโรคได้">กลุ่มป่วยที่ควบคุมโรคได้</Radio>
                    <Radio value="กลุ่มป่วยที่ควบคุมโรคไม่ได้">กลุ่มป่วยที่ควบคุมโรคไม่ได้</Radio>
                </RadioGroup>
            </div>
            <div className="flex w-full justify-end mt-4">
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
}

export default CustomerRegistor;
