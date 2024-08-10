import { parseDate } from '@internationalized/date';
import { Checkbox, DateInput, DatePicker, Input } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const initialForm = {
    firstname: '',
    lastname: '',
    age: '',
    id_card: '',
    phone: '',
    disease: '',
    disease_name: '',
    disease_detail: '',
    allergic_name: '',
    allergic_details: '',
    isallergic: '',
    birthday: '2000-12-24',
};

const inputWidth = "px-2";

const OnlineRegister = () => {
    const [form, setForm] = useState(initialForm);
    const [birthDate, setBirthDate] = useState(parseDate(form.birthday));
    const [isDrugAllergic, setIsDrugAllergic] = useState(false);
    const [isDisease, setIsDisease] = useState(false);

    const router = useRouter();

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
                age: `${age.years} years ${age.months} months ${age.days} days`,
            }));
        } else {
            setForm((prev) => ({ ...prev, birthday: '', age: '' }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
        const age = calculateAge(birthDateObj);

        const data = {
            firstname: form.firstname,
            lastname: form.lastname,
            age: `${age.years} years ${age.months} months ${age.days}`,
            id_card: form.id_card,
            phone: form.phone,
            disease: {
                disease_name: form.disease_name,
                disease_detail: form.disease_detail,
            },
            allergic: {
                allergic_name: form.allergic_name,
                allergic_details: form.allergic_details,
                isallergic: isDrugAllergic,
            },
            birthday: birthDateObj,
            appointmentDate: new Date(),
            appt_register_status: 2,
        };
        // try {
        //     const response = await axios.post(
        //         `${process.env.NEXT_PUBLIC_API_URL}/register/customers`,
        //         data,
        //     );
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'บันทึกข้อมูลสำเร็จ',
        //         allowOutsideClick: false,
        //         showCancelButton: false,
        //         confirmButtonText: "กลับสู่หน้าหลัก",
        //     }).then((result: any) => {
        //         if (result.isConfirmed) {
        //             router.push('/');
        //         }
        //     });;
        //     console.log(response);
        // } catch (error) {
        //     console.error("Error submitting form:", error);
        // }

        console.log(data);
    };

    return (
        <div className="flex flex-col">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row py-4">
                    <Input
                        name="firstname"
                        className={inputWidth}
                        onChange={handleInputChange}
                        size="sm"
                        label="ชื่อจริง"
                        value={form.firstname}
                    />
                    <Input
                        name="lastname"
                        className={inputWidth}
                        onChange={handleInputChange}
                        isInvalid = {!form.lastname}
                        size="sm"
                        label="นามสกุล"
                        value={form.lastname}
                    />
                    <DatePicker
                        name="birthdate"
                        size="sm"
                        label="วันเกิด"
                        variant="bordered"
                        className={inputWidth}
                        value={birthDate}
                        onChange={(value) => {setBirthDate(value)
                            if (birthDate) {
                                const age = calculateAge(new Date(birthDate.year, birthDate.month, birthDate.day));
                                setForm((prev) => ({
                                    ...prev,
                                    age: `${age.years}`,
                                }));
                                console.log(new Date(birthDate.year, birthDate.month, birthDate.day))
                            }
                        }}
                    />
                    <Input
                        isDisabled={true}
                        name="age"
                        className={inputWidth}
                        size="sm"
                        label="อายุ"
                        value={form.age}
                    />
                </div>
                <div className="flex flex-row py-4">
                    <Input
                        name="id_card"
                        className={inputWidth}
                        onChange={handleInputChange}
                        size="sm"
                        label="เลขบัตรประจำตัวประชาชน"
                        value={form.id_card}
                    />
                    <Input
                        name="phone"
                        className={inputWidth}
                        onChange={handleInputChange}
                        size="sm"
                        label="เบอร์โทรศัพท์"
                        value={form.phone}
                    />
                </div>
                <div className="flex flex-row py-4 px-2">
                    <p className="font-bold">แพ้ยา</p>
                    <Checkbox
                        name="noDrugAllergies"
                        isSelected={isDrugAllergic}
                        onValueChange={() => setIsDrugAllergic(!isDrugAllergic)}
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
                        />
                        <Input
                            name="allergic_details"
                            size="sm"
                            className="md:w-6/12 px-2"
                            label="อาการ"
                            value={form.allergic_details}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="flex flex-row py-4 px-2">
                    <p className="font-bold">โรคประจำตัว</p>
                    <Checkbox
                        name="noDrugAllergies"
                        isSelected={isDisease}
                        onValueChange={() => setIsDisease(!isDisease)}
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
                        />
                        <Input
                            name="disease_detail"
                            size="sm"
                            className="md:w-6/12 px-2"
                            label="อาการ"
                            value={form.disease_detail}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default OnlineRegister;
