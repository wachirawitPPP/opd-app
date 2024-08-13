'use client'
import { parseDate } from '@internationalized/date';
import { Checkbox, DatePicker, Input, Card, Select, SelectItem, Button } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'; 
const initialForm = {
    station_name: '',
    firstname: '',
    lastname: '',
    age: '',
    gender: '3',
    id_card: '',
    phone: '',
    disease: '',
    disease_name: '',
    disease_detail: '',
    allergic_name: '',
    allergic_details: '',
    isallergic: '',
    sex: '',
    birthday: '2000-01-01',
    special_rights: "ไม่ระบุ",
    special_rights_other: "",
    sbp:"",
    dbp:''
};

const inputWidth = "px-2 py-2";


const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
const validateIdCard = (id_card: string) => /^\d{13}$/.test(id_card);
const OnlineRegister = () => {
    const [otherSpecialRights, setOtherSpecialRights] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [birthDate, setBirthDate] = useState(parseDate(form.birthday));
    const [isDrugAllergic, setIsDrugAllergic] = useState(false);
    const [isDisease, setIsDisease] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [idCard, setIdCard] = useState('')
    const [errors, setErrors] = useState({
        station_name: '',
        firstname: '',
        lastname: '',
        id_card: '',
        phone: '',
        allergic_name: '',
        allergic_details: '',
        disease_name: '',
        disease_detail: '',
        age: '',
        gender: '',
        special_rights: '',
        special_rights_other: '',
    });

    const router = useRouter();

    useEffect(() => {
        const isRegistered = sessionStorage.getItem('isRegistered');
        if (isRegistered) {
            router.replace('/online-registor-success');
        }
    }, []);

    const calculateAge = (birthDate: Date) => {
        const today = new Date();
        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        if (ageDays < 0) {
            ageMonths--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            ageDays += prevMonth.getDate();
        }

        return {
            years: ageYears,
            months: ageMonths,
            days: ageDays,
        };
    };

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setForm((prev) => ({ ...prev, [name]: value }));

    };

    const handleSpecialRightsStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            special_rights: selectedValue,
        }));

        setOtherSpecialRights(selectedValue === "อื่นๆ");
    };


    const formatIdCard = (value: string) => {
        const formattedValue = value.replace(/\D/g, '') // Remove all non-numeric characters
            .replace(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/, '$1-$2-$3-$4-$5'); // Apply the format

        return formattedValue;
    };

    const handleInputChangeIdCard = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters

        if (value.length > 13) {
            value = value.substring(0, 13); // Limit input length to 13 digits
        }

        setIdCard(formatIdCard(value))

        const { name, values }: any = e.currentTarget;
        setForm((prev) => ({ ...prev, [name]: values }));
    };
    const handleSexStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            gender: (selectedValue),
        }));
    };

    // useEffect(() => {
    //     if (birthDate) {
    //         const age = calculateAge(new Date(birthDate.year, birthDate.month - 1, birthDate.day));
    //         setForm((prev) => ({
    //             ...prev,
    //             age: `${age.years}`,
    //         }));
    //     }
    // }, [birthDate]);

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setBirthDate(parseDate(date.toISOString().split('T')[0]));
            const age = calculateAge(date);
            setForm((prev) => ({
                ...prev,
                birthday: date.toISOString().split('T')[0],
                age: `${age.years} ปี ${age.months} เดือน ${age.days} วัน`,
            }));
        } else {
            setForm((prev) => ({ ...prev, birthday: '', age: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!form.station_name) newErrors.station_name = 'กรุณากรอกชื่อหน่วยงาน';
        if (!form.firstname) newErrors.firstname = 'กรุณากรอกชื่อจริง';
        if (!form.lastname) newErrors.lastname = 'กรุณากรอกนามสกุล';
        if (!form.gender || form.gender === '3') newErrors.gender = 'กรุณาเลือกเพศ'; // Validate gender selection
        if (!form.special_rights|| form.special_rights === 'ไม่ระบุ') newErrors.special_rights = 'กรุณาเลือกสิทธิการรักษา'; // Validate special rights selection
        //if (!form.id_card || !validateIdCard(form.id_card)) newErrors.id_card = 'กรุณากรอกเลขบัตรประจำตัวประชาชนให้ถูกต้อง';
        if (!idCard) newErrors.id_card = 'กรุณากรอกเลขบัตรประจำตัวประชาชนให้ถูกต้อง';
        if (!form.phone || !validatePhone(form.phone)) newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';
        if (isDrugAllergic && (!form.allergic_name || !form.allergic_details)) {
            newErrors.allergic_name = 'กรุณากรอกข้อมูลแพ้ยาให้ครบถ้วน';
            newErrors.allergic_details = 'กรุณากรอกข้อมูลแพ้ยาให้ครบถ้วน';
        }
        if (isDisease && (!form.disease_name || !form.disease_detail)) {
            newErrors.disease_name = 'กรุณากรอกข้อมูลโรคประจำตัวให้ครบถ้วน';
            newErrors.disease_detail = 'กรุณากรอกข้อมูลโรคประจำตัวให้ครบถ้วน';
        }
        if (!form.age) newErrors.age = 'กรุณาระบุวันเกิด';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fotmatDate = (string: any) => {
        if (string != null) {
            let year = string.substring(0, 4);
            let sumYear = year.substring(0, 10);
            let mount = string.substring(5, 7);
            let day = string.substring(8, 10);
            const time = new Date(string).toLocaleString("th-TH").substring(9, 15);
            var months_th_mini = [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "12",
                "12",
            ];
            let date =
                sumYear + "-" + months_th_mini[mount - 1] + "-" + day + " " + time;
            return date;
        } else {
            return string;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate form data
        if (!validateForm()) {
            return;
        }

        const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
        const age = calculateAge(birthDateObj);
        const idCardFormat = idCard.replace(/-/g, '');
        const dates = new Date()
        const appt_date = dates.toISOString()

        const data = {
            station_name: form.station_name,
            firstname: form.firstname,
            lastname: form.lastname,
            age: `${age.years}`,
            id_card: idCardFormat,
            phone: form.phone,
            gender: form.gender,
            disease: {
                disease_name: form.disease_name,
                disease_detail: form.disease_detail,
            },
            allergic: {
                allergic_name: form.allergic_name,
                allergic_details: form.allergic_details,
                isallergic: isDrugAllergic,
            },
            birthdate: birthDateObj.toISOString().substring(0, 10),
            appointmentDate: appt_date,
            appt_register_status: 2,
            special_rights: form.special_rights,
            special_rights_other: form.special_rights_other,
        };
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/register/customers`,
                data,
            );
            Swal.fire({
                icon: 'success',
                title: 'ลงทะเบียนสำเร็จ',
                allowOutsideClick: false,
                showCancelButton: false,
                confirmButtonText: "ยืนยัน",
            }).then((result: any) => {
                if (result.isConfirmed) {
                    //router.push('/');
                    sessionStorage.setItem('isRegistered', 'true');
                    router.replace('/online-registor-success');
                }
            });;
            console.log(data);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลงทะเบียน");
        }

        console.log(data);

    };

    return (
        <Card className="w-full p-5 overflow-auto">
            <div className="flex flex-col justify-center pb-12 ">
                <p className='text-lg flex justify-center font-semibold mb-3'>แบบฟอร์มลงทะเบียนล่วงหน้า Online</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row">
                        <Input
                            name="station_name"
                            className={inputWidth}
                            onChange={handleInputChange}
                            size="sm"
                            label="ชื่อหน่วยงาน"
                            value={form.station_name}
                            isInvalid={!!errors.station_name}
                            errorMessage={errors.station_name}
                        />
                        <Input
                            name="firstname"
                            className={inputWidth}
                            onChange={handleInputChange}
                            size="sm"
                            label="ชื่อจริง"
                            value={form.firstname}
                            isInvalid={!!errors.firstname}
                            errorMessage={errors.firstname}
                        />
                        <Input
                            name="lastname"
                            className={inputWidth}
                            onChange={handleInputChange}
                            size="sm"
                            label="นามสกุล"
                            value={form.lastname}
                            isInvalid={!!errors.lastname}
                            errorMessage={errors.lastname}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row">

                        <DatePicker
                            name="birthdate"
                            size="sm"
                            label="วันเกิด"
                            variant="bordered"
                            className={inputWidth}
                            value={birthDate}
                            isInvalid={!!errors.age}
                            errorMessage={errors.age}
                            showMonthAndYearPickers
                            onChange={(value) => {
                                if (value) {
                                    setBirthDate(value);
                                    const age = calculateAge(new Date(value.year, value.month - 1, value.day));
                                    setForm((prev) => ({
                                        ...prev,
                                        age: `${age.years} ปี ${age.months} เดือน ${age.days} วัน`,
                                    }));
                                }
                            }}
                        />
                        <Input
                            isReadOnly={true}
                            name="age"
                            className={inputWidth}
                            size="sm"
                            label="อายุ"
                            color='default'
                            value={form.age}
                           
                        />
                        <Select
                            name="sex"
                            size="sm"
                            className={inputWidth}
                            label="เพศ"
                            placeholder="เลือกเพศ"
                            selectedKeys={[form.gender]}
                            onSelectionChange={(keys) => handleSexStatusChange(Array.from(keys) as string[])}
                            isInvalid={!!errors.gender}
                            errorMessage={errors.gender}
                        >
                            <SelectItem key="3">ไม่ระบุ</SelectItem>
                            <SelectItem key="1">ชาย</SelectItem>
                            <SelectItem key="2">หญิง</SelectItem>
                        </Select>
                    </div>
                    <div className="flex flex-col sm:flex-row">
                        <Input
                            name="id_card"
                            className={inputWidth}
                            onChange={handleInputChangeIdCard}
                            size="sm"
                            label="เลขบัตรประจำตัวประชาชน"
                            value={idCard}
                            isInvalid={!!errors.id_card}
                            errorMessage={errors.id_card}
                            maxLength={17}
                        />
                        <Input
                            name="phone"
                            className={inputWidth}
                            onChange={handleInputChange}
                            size="sm"
                            label="เบอร์โทรศัพท์"
                            value={form.phone}
                            isInvalid={!!errors.phone}
                            errorMessage={errors.phone}
                        />

                        <Select
                            name="special_rights"
                            size="sm"
                            label="สิทธิการรักษา"
                            placeholder="เลือกสิทธิการรักษา"
                            className={inputWidth}
                            selectedKeys={[form.special_rights]}
                            onSelectionChange={(keys) => handleSpecialRightsStatusChange(Array.from(keys) as string[])}
                            isInvalid={!!errors.special_rights}
                            errorMessage={errors.special_rights}
                        >
                            <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                            <SelectItem key="ประกันสุขภาพถ้วนหน้า/บัตรทอง">ประกันสุขภาพถ้วนหน้า/บัตรทอง</SelectItem>
                            <SelectItem key="ประกันสังคม">ประกันสังคม</SelectItem>
                            <SelectItem key="ข้าราชการ">ข้าราชการ</SelectItem>
                            <SelectItem key="รัฐวิสาหกิจ">รัฐวิสาหกิจ</SelectItem>
                            <SelectItem key="อื่นๆ">อื่นๆ</SelectItem>
                        </Select>
                        {otherSpecialRights && (
                            <Input className={inputWidth} value={form.special_rights_other} name="special_rights_other" onChange={handleInputChange} size="sm" label="ระบุสิทธิการรักษา" />
                        )}
                    </div>
                    <div className="flex flex-row py-4 px-2">
                        <p className="font-bold">แพ้ยา</p>
                        <Checkbox
                            name="noDrugAllergies"
                            isSelected={isDrugAllergic == false}
                            onValueChange={() => setIsDrugAllergic(!isDrugAllergic)}
                            className='ml-2'
                        >
                            ไม่มี
                        </Checkbox>
                        <Checkbox
                            name="noDrugAllergies"
                            isSelected={isDrugAllergic}
                            onValueChange={() => setIsDrugAllergic(!isDrugAllergic)}
                            className='ml-2'
                        >
                            มีอาการแพ้ยา
                        </Checkbox>

                    </div>
                    {isDrugAllergic && (
                        <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input
                                name="allergic_name"
                                size="sm"
                                className="md:w-6/12 px-2"
                                label="ระบุชื่อยา"
                                value={form.allergic_name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.allergic_name}
                                errorMessage={errors.allergic_name}
                            />
                            <Input
                                name="allergic_details"
                                size="sm"
                                className="md:w-6/12 px-2"
                                label="อาการ"
                                value={form.allergic_details}
                                onChange={handleInputChange}
                                isInvalid={!!errors.allergic_details}
                                errorMessage={errors.allergic_details}
                            />
                        </div>
                    )}
                    <div className="flex flex-row py-4 px-2">
                        <p className="font-bold">โรคประจำตัว</p>
                        <Checkbox
                            name="noDrugAllergies"
                            isSelected={isDisease == false}
                            onValueChange={() => setIsDisease(!isDisease)}
                            className='ml-2'
                        >
                            ไม่มี
                        </Checkbox>
                        <Checkbox
                            name="noDrugAllergies"
                            isSelected={isDisease}
                            onValueChange={() => setIsDisease(!isDisease)}
                            className='ml-2'
                        >
                            มีโรคประจำตัว
                        </Checkbox>
                    </div>
                    {isDisease && (
                        <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Input
                                name="disease_name"
                                size="sm"
                                className="md:w-6/12 px-2"
                                label="ระบุชื่อโรคประจำตัว"
                                value={form.disease_name}
                                onChange={handleInputChange}
                                isInvalid={!!errors.disease_name}
                                errorMessage={errors.disease_name}
                            />
                            <Input
                                name="disease_detail"
                                size="sm"
                                className="md:w-6/12 px-2"
                                label="อาการ"
                                value={form.disease_detail}
                                onChange={handleInputChange}
                                isInvalid={!!errors.disease_detail}
                                errorMessage={errors.disease_detail}
                            />
                        </div>
                    )}

                    <div className='flex justify-center'>
                        <Button type="submit" className="flex items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded ">
                            ลงทะเบียน
                        </Button>

                    </div>

                </form>
            </div> 
        </Card>
      
    );
};

export default OnlineRegister;
