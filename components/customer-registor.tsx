import {
    Checkbox,
    DatePicker,
    Divider,
    Input,
    Radio,
    RadioGroup,
    Select,
    SelectItem,
    Button,
    CheckboxGroup,
    DateInput,
    Selection,
    Autocomplete,
    AutocompleteItem
} from "@nextui-org/react";
import React, { useState, useEffect, FormEvent } from "react";
import {
    DateValue,
    parseAbsoluteToLocal,
    parseDate,
    parseDateTime,
} from "@internationalized/date";
import axios from "axios";
import { Customer } from "@/types/interface";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface CustomerRegistorProps {
    customer: Customer | null;
    cardData: any;
    create: boolean // or undefined if you want to handle the case where customer might not be passed
}

type Prename = {
    key: string;
    label: string;
};

const prenames: Prename[] = [
    { key: "นาย", label: "นาย" },
    { key: "นางสาว", label: "นางสาว" },
    { key: "นาง", label: "นาง" },
];

const CustomerRegistor: React.FC<CustomerRegistorProps> = ({ customer, cardData, create }) => {
    const router = useRouter();
    const [date, setDate] = useState<DateValue | null>(null);
    const [isDeseases, setIsDeseases] = useState(false);
    const [isDeseasesControll, setIsDeseasesControll] = useState(true);
    const [isDrugAllergic, setIsDrugAllergic] = useState(false);
    const [isFamilyDisease, setIsFamilyDisease] = useState(false);
    const [isFoodAllergic, setIsFoodAllergic] = useState(false);
    const [isHeredity, setIsHeredity] = useState(false);
    const [otherReligion, setOtherReligion] = useState(false);
    const [otherSpecialRights, setOtherSpecialRights] = useState(false);
    const [otherTreatments, setOtherTreatments] = useState(false);
    const [riskSummary, setriskSummary] = useState([""]);
    const [communityStatus, setCommunityStatus] = useState<Selection>(new Set(["ประชาชนทั่วไป"]));
    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [birthDate, setBirthDate] = useState(parseDate("2024-01-01"))


    const inputWidth = "sm:w-4/12 py-2 px-2 "



    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = String(dateNow.getMonth() + 1).padStart(2, '0');
    const day = String(dateNow.getDate()).padStart(2, '0');
    const dateNowFormat = `${year}-${month}-${day}`;
    console.log(dateNowFormat);





    const initialForm = {
        id_card: "",
        firstname: "",
        lastname: "",
        station_code: "",
        station_name: "",
        tel: "",
        contact_line: "",
        age: "",
        nation: "ไทย",
        nation_origin: "ไทย",
        prefix: "ไม่ระบุ",
        sex: "ไม่ระบุ",
        religion: "พุทธ",
        birthdate: "2024-01-01",
        register_date: dateNowFormat,
        marital_status: "ไม่ระบุ",
        personal_status_address: "ไม่ระบุ",
        community_status: "ไม่ระบุ",
        occupation: "",
        edu_level: "ไม่ระบุ",
        food_allergic: {
            isAllergic: false,
            name: "",
            detail: ""
        },
        allergic: {
            isAllergic: false,
            name: "",
            detail: ""
        },
        disease: {
            isDisease: false,
            canControll: true,
            name: ""
        },
        family_history: {
            isFamilyDisease: false,
            name: ""
        },

        selfcare1: "ไม่ระบุ",
        selfcare2: "ไม่ระบุ",
        selfcare3: "ไม่ระบุ",

        food_name: "",
        food_detail: "",
        allergic_name: "",
        allergic_detail: "",
        disease_name: "",
        family_history_disease: "",
        weight: 0,
        height: 0,
        waistline: 0,
        bp: "",
        weight_age: 0,
        weight_height: 0,
        height_age: 0,
        bmi: 0,
        religion_other: "",
        special_rights: "ไม่ระบุ",
        special_rights_other: "",
        treatment_rights: "ไม่ระบุ",
        treatment_rights_other: "",
        health_summary: "กลุ่มสุขภาพปกติ",
    }


    // State variables for form fields
    const [form, setForm] = useState(initialForm);

    console.log(form)

    useEffect(() => {



        if (customer !== null) {
            setIsCreate(true)
            setIsEdit(false)
            setBirthDate(parseDate(customer.birthdate || dateNowFormat))
            setForm(initialForm)
            customer.religion === "อื่นๆ" ? setOtherReligion(true) : setOtherReligion(false)
            customer.special_rights === "อื่นๆ" ? setOtherSpecialRights(true) : setOtherSpecialRights(false)
            customer.treatment_rights === "อื่นๆ" ? setOtherTreatments(true) : setOtherTreatments(false)
            setriskSummary(customer.risk_summary || [""])
            setCommunityStatus(customer.community_status || new Set<string>(["ประชาชนทั่วไป"]));
            setIsFoodAllergic(customer.food_allergic?.isAllergic ?? false)
            setForm({
                id_card: customer.id_card || "",
                firstname: customer.firstname || "",
                lastname: customer.lastname || "",
                station_code: customer.station_code || "",
                station_name: customer.station_name || "",
                tel: customer.tel || "",
                age: customer.age || "",
                contact_line: customer.contact_line || "",
                nation: customer.nation || "ไทย",
                nation_origin: "ไทย",
                prefix: customer.prefix || "ไม่ระบุ",
                sex: customer.gender || "ไม่ระบุ",
                religion: customer.religion || "พุทธ",
                birthdate: customer.birthdate || dateNowFormat,
                register_date: customer.register_date || dateNowFormat,
                marital_status: customer.marital_status || "ไม่ระบุ",
                personal_status_address: customer.personal_status_address || "ไม่ระบุ",
                community_status: "ไม่ระบุ",
                occupation: customer.occupation || "ไม่ระบุ",
                edu_level: customer.edu_level || "ไม่ระบุ",

                selfcare1: customer.selfcare?.selfcare1 || "ไม่ระบุ",
                selfcare2: customer.selfcare?.selfcare2 || "ไม่ระบุ",
                selfcare3: customer.selfcare?.selfcare3 || "ไม่ระบุ",

                food_allergic: {
                    isAllergic: customer.food_allergic?.isAllergic ?? false,
                    name: customer.food_allergic?.name || '',
                    detail: customer.food_allergic?.detail || ''
                },
                allergic: {
                    isAllergic: customer.allergic?.isAllergic ?? false,
                    name: customer.allergic?.name || '',
                    detail: customer.allergic?.detail || ''
                },
                disease: {
                    isDisease: customer.disease?.isDeseases ?? false,
                    canControll: customer.disease?.canControll ?? true,
                    name: customer.disease?.name || ''
                },
                family_history: {
                    isFamilyDisease: customer.family_history?.isFamilyDisease ?? false,
                    name: customer.family_history?.name || ''
                },
                food_name: customer.food_allergic?.name || '',
                food_detail: customer.food_allergic?.detail || '',
                allergic_name: customer.allergic?.name || '',
                allergic_detail: customer.allergic?.detail || '',
                disease_name: customer.disease?.name || '',
                family_history_disease: customer.family_history?.name || '',
                weight: customer.weight || 0,
                height: customer.height || 0,
                waistline: customer.waistline || 0,
                bp: customer.bp || "",
                weight_age: customer.weight_age || 0,
                weight_height: customer.weight_height || 0,
                height_age: customer.height_age || 0,
                bmi: customer.bmi || 0,
                religion_other: customer.religion_other || "",
                special_rights: customer.special_rights || "ไม่ระบุ",
                special_rights_other: customer.special_rights_other || "",
                treatment_rights: customer.treatment_rights || "ไม่ระบุ",
                treatment_rights_other: customer.treatment_rights_other || "",
                health_summary: customer.health_summary || "",
            });
        }

    }, [customer]);

    useEffect(() => {
        if (cardData !== null) {
            setIsEdit(true)
            setIsCreate(false)
            setForm(initialForm)
            setOtherReligion(false)


            let birth_year = parseInt(cardData.birth_date.substring(0, 4)) - 543;
            let birth_month = parseInt(cardData.birth_date.substring(4, 6)); // Corrected index
            let birth_day = parseInt(cardData.birth_date.substring(6, 8));
            // Format the date string to YYYY-MM-DD
            let finalBirthdateString =
                birth_year +
                "-" +
                String(birth_month).padStart(2, "0") +
                "-" +
                String(birth_day).padStart(2, "0");

            console.log(parseDate(finalBirthdateString));

            const dateAge = new Date(finalBirthdateString).getTime();

            const timeNow = Date.now();
            const ageInMilliseconds = timeNow - dateAge;
            const ageDate = new Date(ageInMilliseconds);

            const age = Math.abs(ageDate.getUTCFullYear() - 1970); // 1970 is the Unix epoch start year

            console.log("Age:", age);
            setBirthDate(parseDate(finalBirthdateString))

            setForm((prevForm) => ({
                ...prevForm,
                id_card: cardData.citizen_code || "",
                firstname: cardData.th_firstname || "",
                lastname: cardData.th_lastname || "",
                birthdate: finalBirthdateString,
                age: age.toString(),
                sex: cardData.gender || "ไม่ระบุ",
                marital_status: "ไม่ระบุ"

            }));

        }
    }, [cardData]);

    useEffect(() => {
        setDate(parseAbsoluteToLocal(new Date().toISOString()));
    }, []);
    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;

        setForm((prev) => ({ ...prev, [name]: value }));
        console.log(name, value);
    };





    const handleCheckboxInputChange = (event: React.FormEvent<HTMLInputElement>, field: string) => {
        const { name, value } = event.currentTarget;

        setForm((prev) => ({ ...prev, [field]: { [name]: value } }));
        console.log(name, value);
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);


        const birthDateStr = birthDate.year + '-' + birthDate.month + '-' + birthDate.day

        const numberConvert = (value: string) => {
            return parseFloat(value) || 0.00
        }




        let data = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            tel: formData.get("tel"),
            age: formData.get("age"),
            nation: formData.get("nation"),
            nation_origin: formData.get("nation_origin"),
            prefix: formData.get('prefix'),
            sex: formData.get('sex'),
            birthdate: formData.get('birthdate'),
            firstname_th: formData.get("firstname"),
            lastname_th: formData.get("lastname"),
            religion: formData.get("religion"),
            id_card: formData.get("id_card"),
            passport_id: formData.get("passport_id"),
            contact_line: formData.get("contact_line"),
            register_date: null,
            personal_status_address: formData.get("personal_status_address"),
            community_status: Array.from(communityStatus),
            marital_status: formData.get("marital_status"),
            edu_level: formData.get("edu_level"),
            occupation: formData.get("occupation"),
            station_name: formData.get("station_name"),
            station_code: formData.get("station_code"),
            food_allergic: {
                isAllergic: isFoodAllergic,
                name: formData.get("food_name"),
                detail: formData.get("food_detail"),
            },
            allergic: {
                isAllergic: isDrugAllergic,
                name: formData.get("allergic_name"),
                detail: formData.get("allergic_detail"),
            },
            disease: {
                isDeseases: isDeseases,
                canControll: isDeseasesControll,
                name: formData.get("disease_name"),
            },
            family_history: {
                isFamilyDisease: isFamilyDisease,
                name: formData.get("family_history_disease")
            },
            selfcare: {
                selfcare1: formData.get("selfcare1"),
                selfcare2: formData.get("selfcare2"),
                selfcare3: formData.get("selfcare3"),
            },
            weight: numberConvert(formData.get("weight") as string),
            height: numberConvert(formData.get("height") as string),
            bp: formData.get("bp"),
            waistline: numberConvert(formData.get("waistline") as string),
            bmi: numberConvert(formData.get("bmi") as string),
            weight_height: (formData.get("weight_height") as string),
            weight_age: (formData.get("weight_age") as string),
            height_age: (formData.get("height_age") as string),
            religion_other: formData.get("religion_other"),
            special_rights: formData.get("special_rights"),
            special_rights_other: formData.get("special_rights_other"),
            treatment_rights: formData.get("treatment_rights"),
            treatment_rights_other: formData.get("treatment_rights_other"),
            risk_summary: riskSummary,
            health_summary: formData.get("health_summary")

            // personal_status_address: formData.get("personal_status_address"),
            // community_status:formData.get("community_status")
        };
        if (create) {



            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/register/customers`,
                    data,
                );
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: "กลับสู่หน้าหลัก",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        router.push('/');
                    }
                });;
                console.log(response);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        } else {
            try {
                const response = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/customers/${customer?.id}`,
                    data,
                );
                Swal.fire({
                    icon: 'success',
                    title: 'บันทึกข้อมูลสำเร็จ',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonText: "กลับสู่หน้าหลัก",
                }).then((result: any) => {
                    if (result.isConfirmed) {
                        router.push('/');
                    }
                });;
                console.log(response);
            } catch (error) {
                console.error("Error submitting form:", error);
            }
        }

        console.log(create)

        console.log(data);


    };
    const handleMaritalStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            marital_status: selectedValue,
        }));
    };
    const handlePrefixStatusChange = (keys: string[]) => {

        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            prefix: selectedValue,
        }));
    };
    const handleReligionStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            religion: selectedValue,
        }));

        setOtherReligion(selectedValue === "อื่นๆ");
    };
    const handleSpecialRightsStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            special_rights: selectedValue,
        }));

        setOtherSpecialRights(selectedValue === "อื่นๆ");
    };
    const handleTreatmentRightsStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            treatment_rights: selectedValue,
        }));

        setOtherTreatments(selectedValue === "อื่นๆ");
    };
    const handleSexStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            sex: (selectedValue),
        }));
    };
    const handleEducationChange = (keys: string[]) => {
        const selectedValue = keys[0];

        setForm((prevForm) => ({
            ...prevForm,
            edu_level: selectedValue,
        }));
    };
    const handlePersonalAddressStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            personal_status_address: selectedValue,
        }));
    };
    const bmiCal = (weight: number, height: number): string => {

        const heightInMeters = height / 100; // Assuming height is provided in centimeters

        // Calculate BMI
        const bmi = weight / (heightInMeters ** 2);

        if (bmi < 0 || bmi == null) {
            return "0"
        } else {
            return bmi.toFixed(2);
        }

    };
    const valuePervalue = (v1: number, v2: number): string => {

        const sum = v1 / v2;
        return sum.toFixed(2)
    }
    const handleComunityStatusChange = (keys: string[]) => {
        const selectedValue = keys[0];
        setForm((prevForm) => ({
            ...prevForm,
            community_status: selectedValue,
        }));
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="border border-gray-300 p-4 my-2 rounded-lg overflow-auto"
        >
            {/* <Button onClick={handleChange}>Fetch Data</Button> */}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Input
                    className={inputWidth}
                    name="station_code"
                    onChange={handleInputChange}
                    size="sm"
                    label="รหัสหน่วยบริการ"
                    value={form.station_code}
                />
                <Input
                    name="station_name"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="ชื่อหน่วยบริการ"
                    value={form.station_name}
                />
                <DatePicker
                    name="register_date"
                    className={inputWidth}
                    size="sm"
                    label="วันที่สำรวจ"
                    variant="bordered"
                    showMonthAndYearPickers
                    value={parseDate(form.register_date)}
                    onChange={setDate}
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                {/* <Input
                    name="id_card"
                    className={inputWidth}
                    onChange={handleIdCardChange}
                    size="sm"
                    label="เลขบัตรประจำตัวประชาชน"
                    value={form.id_card}
                /> */}

                <Input
                    name="id_card"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="เลขบัตรประจำตัวประชาชน"
                    value={form.id_card}
                />
                <Input
                    name="passport_id"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="เลขที่บัตรต่างด้าว (Passport)"
                // value={form.passport_id}
                />



                <Select
                    name="sex"
                    size="sm"
                    className={inputWidth}
                    label="เพศ"
                    placeholder="เลือกเพศ"

                    selectedKeys={[form.sex]}
                    onSelectionChange={(keys) => handleSexStatusChange(Array.from(keys) as string[])}
                >
                    <SelectItem key="ไม่ระบุ">ไม่ระบุ</SelectItem>
                    <SelectItem key="1">ชาย</SelectItem>
                    <SelectItem key="2">หญิง</SelectItem>
                </Select>
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Select
                    name="prefix"
                    size="sm"
                    label="คำนำหน้า"
                    placeholder="เลือกคำนำหน้า"
                    className={inputWidth}
                    selectedKeys={[form.prefix]}
                    onSelectionChange={(keys) => handlePrefixStatusChange(Array.from(keys) as string[])}
                >
                    <SelectItem key="ไม่ระบุ">ไม่ระบุ</SelectItem>
                    <SelectItem key="นาย">นาย</SelectItem>
                    <SelectItem key="นาง">นาง</SelectItem>
                    <SelectItem key="นางสาว">นางสาว</SelectItem>
                    <SelectItem key="เด็กชาย">เด็กชาย</SelectItem>
                    <SelectItem key="เด็กหญิง">เด็กหญิง</SelectItem>

                </Select>
                <Input
                    name="firstname"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="ชื่อ"
                    value={form.firstname}
                />
                <Input
                    name="lastname"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="นามสกุล"
                    value={form.lastname}
                />
                <Input
                    name="tel"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="เบอร์โทรศัพท์"
                    value={form.tel}
                />
                <Input
                    name="contact_line"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="line ID"
                    value={form.contact_line}
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0">

                <Input
                    name="nation"

                    onChange={handleInputChange}
                    size="sm"
                    value={form.nation}
                    className={inputWidth}
                    label="สัญชาติ"
                />
                <Input
                    name="nation_origin"
                    onChange={handleInputChange}
                    size="sm"
                    value={form.nation_origin}
                    className={inputWidth}
                    label="เชื้อชาติ"
                />
                <DateInput
                    name="birthdate"
                    size="sm"
                    label="Birth Date"
                    variant="bordered"

                    className={inputWidth}
                    value={birthDate}
                    onChange={(value) => { setBirthDate(value) }}
                />
                <Input
                    name="age"
                    onChange={handleInputChange}
                    size="sm"
                    className={inputWidth}
                    label="อายุ"
                    value={form.age}
                    endContent={"ปี"}
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 " >
                <Select name="religion" size="sm" label=" ศาสนา" placeholder="เลือกศาสนา" className={inputWidth} selectedKeys={[form.religion]} onSelectionChange={(keys) => handleReligionStatusChange(Array.from(keys) as string[])}>
                    <SelectItem key="ไม่ระบุ">ไม่ระบุ</SelectItem>
                    <SelectItem key="พุทธ">พุทธ</SelectItem>
                    <SelectItem key="คริสต์">คริสต์</SelectItem>
                    <SelectItem key="อิสลาม">อิสลาม</SelectItem>
                    <SelectItem key="ฮินดู">ฮินดู</SelectItem>
                    <SelectItem key="อื่นๆ">อื่นๆ</SelectItem>
                </Select>
                {otherReligion && (
                    <Input className={inputWidth} value={form.religion_other} name="religion_other" onChange={handleInputChange} size="sm" label="ระบุศาสนา" />
                )}
            </div>

            <Divider className="my-2" />
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Select
                    name="marital_status"
                    size="sm"
                    label="สถานภาพสมรส"
                    placeholder="เลือกสถานภาพสมรส"
                    className={inputWidth}
                    selectedKeys={[form.marital_status]}
                    onSelectionChange={(keys) => handleMaritalStatusChange(Array.from(keys) as string[])}
                >
                    <SelectItem key="ไม่ระบุ">ไม่ระบุ</SelectItem>
                    <SelectItem key="โสด">โสด</SelectItem>
                    <SelectItem key="คู่">คู่</SelectItem>
                    <SelectItem key="หม้าย">หม้าย</SelectItem>
                    <SelectItem key="หย่าร้าง">หย่าร้าง</SelectItem>
                    <SelectItem key="แยกกันอยู่">แยกกันอยู่</SelectItem>
                    <SelectItem key="สมณะเพศ">สมณะเพศ</SelectItem>
                </Select>
                <Select
                    name="edu_level"
                    size="sm"
                    label="การศึกษาสูงสุด"
                    placeholder="เลือกการศึกษาสูงสุด"
                    className={inputWidth}
                    selectedKeys={[form.edu_level]}
                    onSelectionChange={(keys) => handleEducationChange(Array.from(keys) as string[])}
                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key={"ไม่ได้รับการศึกษา"}>ไม่ได้รับการศึกษา</SelectItem>
                    <SelectItem key={"ก่อนประถมศึกษา"}>ก่อนประถมศึกษา</SelectItem>
                    <SelectItem key={"ประถมศึกษา"}>ประถมศึกษา</SelectItem>
                    <SelectItem key={"มัธยมศึกษาตอนต้น"}>มัธยมศึกษาตอนต้น</SelectItem>
                    <SelectItem key={"มัธยมศึกษาตอนปลาย/ปวช."}>
                        มัธยมศึกษาตอนปลาย/ปวช.
                    </SelectItem>
                    <SelectItem key={"อนุปริญญา/ปวส."}>อนุปริญญา/ปวส.</SelectItem>
                    <SelectItem key={"ปริญญาตรี"}>ปริญญาตรี</SelectItem>
                    <SelectItem key={"ปริญญาโท"}>ปริญญาโท</SelectItem>
                    <SelectItem key={"ปริญญาเอก"}>ปริญญาเอก</SelectItem>
                </Select>
                <Input
                    name="occupation"
                    onChange={handleInputChange}
                    size="sm"
                    value={form.occupation}
                    className={inputWidth}
                    label="อาชีพ"
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Select
                    name="personal_status_address"
                    size="sm"
                    label="สถานะบุคคล"
                    placeholder="เลือกสถานะบุคคล"
                    className={inputWidth}
                    selectedKeys={[form.personal_status_address]}
                    onSelectionChange={(keys) => handlePersonalAddressStatusChange(Array.from(keys) as string[])}


                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key={"อาศัยอยู่ตรงกับทะเบียนบ้าน"}>
                        อาศัยอยู่ตรงกับทะเบียนบ้าน
                    </SelectItem>
                    <SelectItem key={"อาศัยอยู่ไม่ตรงกับทะเบียนบ้าน"}>
                        อาศัยอยู่ไม่ตรงกับทะเบียนบ้าน
                    </SelectItem>
                    <SelectItem key={"ไม่อยู่ในทะเบียนราษฎร์"}>
                        ไม่อยู่ในทะเบียนราษฎร์
                    </SelectItem>
                </Select>
                <Select
                    name="community_status"
                    size="sm"
                    label="สถานะในชุมชน"
                    placeholder="เลือกสถานะในชุมชน"
                    selectionMode="multiple"
                    className="sm:w-8/12 px-2 py-2"
                    selectedKeys={communityStatus}
                    onSelectionChange={setCommunityStatus}
                >

                    <SelectItem key={"ประชาชนทั่วไป"}>ประชาชนทั่วไป</SelectItem>
                    <SelectItem key={"ประธานชุมชน"}>ประธานชุมชน</SelectItem>
                    <SelectItem key={"กรรมการชุมชน"}>กรรมการชุมชน</SelectItem>
                    <SelectItem key={"อาสาสมัครสาธารณสุข"}>อาสาสมัครสาธารณสุข</SelectItem>
                    <SelectItem key={"ผู้ดูแลผู้ป่วยที่ผ่านการอบรม"}>ผู้ดูแลผู้ป่วยที่ผ่านการอบรม</SelectItem>
                    <SelectItem key={"ผู้ดูแลผู้ป่วยที่ไม่ผ่านการอบรม"}>ผู้ดูแลผู้ป่วยที่ไม่ผ่านการอบรม</SelectItem>

                </Select>
            </div>

            <Divider className="my-2" />
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap md mb-6 md:mb-0 ">
                <Select
                    name="special_rights"
                    size="sm"
                    label="สิทธิการรักษา"
                    placeholder="เลือกสิทธิการรักษา"
                    className="sm:w-6/12 py-2 px-2"
                    selectedKeys={[form.special_rights]}
                    onSelectionChange={(keys) => handleSpecialRightsStatusChange(Array.from(keys) as string[])}
                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key="ประกันสุขภาพถ้วนหน้า/บัตรทอง">ประกันสุขภาพถ้วนหน้า/บัตรทอง</SelectItem>
                    <SelectItem key="ประกันสังคม">ประกันสังคม</SelectItem>
                    <SelectItem key="ข้าราชการ">ข้าราชการ</SelectItem>
                    <SelectItem key="รัฐวิสาหกิจ">รัฐวิสาหกิจ</SelectItem>
                    <SelectItem key="อื่นๆ">อื่นๆ</SelectItem>
                </Select>
                {otherSpecialRights && (
                    <Input className="sm:w-6/12 py-2 px-2" value={form.special_rights_other} name="special_rights_other" onChange={handleInputChange} size="sm" label="ระบุสิทธิการรักษา" />
                )}



            </div>

            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Select
                    name="treatment_rights"
                    size="sm"
                    label="การสิทธิการรักษา"
                    placeholder="เลือกการสิทธิการรักษา"
                    className="sm:w-6/12 py-2 px-2"
                    selectedKeys={[form.treatment_rights]}
                    onSelectionChange={(keys) => handleTreatmentRightsStatusChange(Array.from(keys) as string[])}
                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key="รับบริการตามสถานพยาบาลตามสิทธิ">รับบริการตามสถานพยาบาลตามสิทธิ</SelectItem>
                    <SelectItem key="รับบริการที่สถานพยาบาลอื่นๆ(ชำระเงินเอง/ประกันสุขภาพ)">รับบริการที่สถานพยาบาลอื่นๆ(ชำระเงินเอง/ประกันสุขภาพ)</SelectItem>
                    <SelectItem key="ไม่เคยเข้ารับบริการ">ไม่เคยเข้ารับบริการ</SelectItem>
                    <SelectItem key="อื่นๆ">อื่นๆ</SelectItem>
                </Select>
                {otherTreatments && (
                    <Input className="sm:w-6/12 py-2 px-2" value={form.treatment_rights_other} name="treatment_rights_other" onChange={handleInputChange} size="sm" label="ระบุการสิทธิการรักษา" />
                )}

            </div>
            <Divider className="my-2" />
            <p className="w-full font-bold">การปฏิบัติตัวเมื่อเจ็บป่วยเล็กน้อย (ปฎิบัติบ่อยที่สุด 1-3 ตามลำดับ)</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Select
                    name="selfcare1"
                    size="sm"
                    label="อันดับ 1"
                    placeholder=""
                    className={inputWidth}
                    selectedKeys={[form.selfcare1]}
                    onSelectionChange={(keys) => {
                        const value = Array.from(keys) as string[]
                        const selectedValue = value[0]
                        setForm((prevForm) => ({
                            ...prevForm,
                            selfcare1: selectedValue,
                        }));
                    }}
                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key={"ซื้อยาจากร้านขายยา"}>ซื้อยาจากร้านขายยา</SelectItem>
                    <SelectItem key={"รักษาที่ศูนย์บริการสาธารณสุข"}>รักษาที่ศูนย์บริการสาธารณสุข</SelectItem>
                    <SelectItem key={"รักษาแพทย์ทางเลือก"}>รักษาแพทย์ทางเลือก</SelectItem>
                    <SelectItem key={"คลินิกเอกชน"}>คลินิกเอกชน</SelectItem>
                    <SelectItem key={"โรงพยาบาลรัฐ"}>โรงพยาบาลรัฐ</SelectItem>
                    <SelectItem key={"โรงพยาบาลเอกชน"}>โรงพยาบาลเอกชน</SelectItem>
                    <SelectItem key={"ดูแลสุขภาพตนเอง"}>ดูแลสุขภาพตนเอง</SelectItem>

                </Select>
                <Select
                    name="selfcare2"
                    size="sm"
                    label="อันดับ 2"
                    placeholder=""
                    className={inputWidth}
                    selectedKeys={[form.selfcare2]}
                    onSelectionChange={(keys) => {
                        const value = Array.from(keys) as string[]
                        const selectedValue = value[0]
                        setForm((prevForm) => ({
                            ...prevForm,
                            selfcare2: selectedValue,
                        }));
                    }}
                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key={"ซื้อยาจากร้านขายยา"}>ซื้อยาจากร้านขายยา</SelectItem>
                    <SelectItem key={"รักษาที่ศูนย์บริการสาธารณสุข"}>รักษาที่ศูนย์บริการสาธารณสุข</SelectItem>
                    <SelectItem key={"รักษาแพทย์ทางเลือก"}>รักษาแพทย์ทางเลือก</SelectItem>
                    <SelectItem key={"คลินิกเอกชน"}>คลินิกเอกชน</SelectItem>
                    <SelectItem key={"โรงพยาบาลรัฐ"}>โรงพยาบาลรัฐ</SelectItem>
                    <SelectItem key={"โรงพยาบาลเอกชน"}>โรงพยาบาลเอกชน</SelectItem>
                    <SelectItem key={"ดูแลสุขภาพตนเอง"}>ดูแลสุขภาพตนเอง</SelectItem>

                </Select>
                <Select
                    name="selfcare3"
                    size="sm"
                    label="อันดับ 3"
                    placeholder=""
                    className={inputWidth}
                    selectedKeys={[form.selfcare3]}
                    onSelectionChange={(keys) => {
                        const value = Array.from(keys) as string[]
                        const selectedValue = value[0]
                        setForm((prevForm) => ({
                            ...prevForm,
                            selfcare3: selectedValue,
                        }));
                    }}
                >
                    <SelectItem key={"ไม่ระบุ"}>ไม่ระบุ</SelectItem>
                    <SelectItem key={"ซื้อยาจากร้านขายยา"}>ซื้อยาจากร้านขายยา</SelectItem>
                    <SelectItem key={"รักษาที่ศูนย์บริการสาธารณสุข"}>รักษาที่ศูนย์บริการสาธารณสุข</SelectItem>
                    <SelectItem key={"รักษาแพทย์ทางเลือก"}>รักษาแพทย์ทางเลือก</SelectItem>
                    <SelectItem key={"คลินิกเอกชน"}>คลินิกเอกชน</SelectItem>
                    <SelectItem key={"โรงพยาบาลรัฐ"}>โรงพยาบาลรัฐ</SelectItem>
                    <SelectItem key={"โรงพยาบาลเอกชน"}>โรงพยาบาลเอกชน</SelectItem>
                    <SelectItem key={"ดูแลสุขภาพตนเอง"}>ดูแลสุขภาพตนเอง</SelectItem>

                </Select>


            </div>
            <Divider className="my-2" />
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">โรคประจำตัว</p>
                <Checkbox
                    name="noChronicDiseases"
                    isSelected={!form.disease.isDisease}
                    onValueChange={() => {
                        setForm((prevForm) => ({
                            ...prevForm,
                            disease: {
                                ...prevForm.disease,
                                isDisease: !prevForm.disease.isDisease
                            }
                        })),
                            setIsDeseases(!form.disease.isDisease)
                    }}
                >
                    ไม่มีโรคประจำตัว
                </Checkbox>
            </div>
            {form.disease.isDisease && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        name="disease_name"
                        size="sm"
                        className="md:w-6/12"
                        label="ระบุโรค"
                        value={form.disease_name}
                        onChange={handleInputChange}
                    />
                    <RadioGroup
                        name="diseaseControl"
                        orientation="horizontal"
                        value={form.disease.canControll.toString()}
                        onValueChange={(value) => {
                            if (value === "true") {
                                setForm((prevForm) => ({
                                    ...prevForm,
                                    disease: {
                                        ...prevForm.disease,
                                        canControll: true
                                    }
                                }))
                                setIsDeseasesControll(true)
                            } else if (value === "false") {
                                setForm((prevForm) => ({
                                    ...prevForm,
                                    disease: {
                                        ...prevForm.disease,
                                        canControll: false
                                    }
                                }))
                                setIsDeseasesControll(false)
                            }
                        }}>
                        <Radio value="true">ควบคุมโรคได้</Radio>
                        <Radio value="false">ควบคุมโรคไม่ได้</Radio>
                    </RadioGroup>
                </div>
            )}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">แพ้ยา</p>
                <Checkbox
                    name="noDrugAllergies"
                    isSelected={!form.allergic.isAllergic}
                    onValueChange={() => {
                        setForm((prevForm) => ({
                            ...prevForm,
                            allergic: {
                                ...prevForm.food_allergic,
                                isAllergic: !prevForm.allergic.isAllergic
                            }
                        })),
                            setIsDrugAllergic(!form.allergic.isAllergic)
                    }}
                >
                    ปฎิเสธการแพ้ยา/ไม่ทราบ
                </Checkbox>
            </div>
            {form.allergic.isAllergic && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        name="allergic_name"
                        size="sm"
                        className="md:w-6/12"
                        label="ระบุชื่อยา"
                        value={form.allergic_name}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="allergic_detail"
                        size="sm"
                        className="md:w-6/12"
                        label="อาการ"
                        value={form.allergic_detail}
                        onChange={handleInputChange}
                    />
                </div>
            )}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">แพ้อาหาร</p>
                <Checkbox
                    name="noFoodAllergies"
                    className={inputWidth}
                    isSelected={!form.food_allergic.isAllergic}
                    onValueChange={() => {
                        setForm((prevForm) => ({
                            ...prevForm,
                            food_allergic: {
                                ...prevForm.food_allergic,
                                isAllergic: !prevForm.food_allergic.isAllergic
                            }
                        })),
                            setIsFoodAllergic(!form.food_allergic.isAllergic)
                    }}

                >
                    ปฎิเสธการแพ้อาหาร/ไม่ทราบ
                </Checkbox>
            </div>
            {form.food_allergic.isAllergic && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        name="food_name"
                        size="sm"
                        className="md:w-6/12"
                        onChange={handleInputChange}
                        value={form.food_name}
                        label="ระบุชื่ออาหาร"

                    />
                    <Input
                        name="food_detail"
                        size="sm"
                        className="md:w-6/12"
                        label="อาการ"
                        onChange={handleInputChange}
                        value={form.food_detail}
                    />
                </div>
            )}
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <p className="font-bold">ประวัติครอบครัวสายตรง</p>
                <Checkbox
                    name="family_history"
                    isSelected={!form.family_history.isFamilyDisease}
                    onValueChange={() => {
                        setForm((prevForm) => ({
                            ...prevForm,
                            family_history: {
                                ...prevForm.family_history,
                                isFamilyDisease: !prevForm.family_history.isFamilyDisease
                            }
                        })),
                            setIsFamilyDisease(!form.family_history.isFamilyDisease)
                    }}

                >
                    ไม่มีโรคประจำตัว/โรคที่ถ่ายทอดทางพันธุกรรม
                </Checkbox>
            </div>
            {form.family_history.isFamilyDisease && (
                <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Input
                        name="family_history_disease"
                        size="sm"
                        className="md:w-6/12"
                        label="ระบุชื่อโรค"
                        onChange={handleInputChange}
                        value={form.family_history_disease}
                    />
                </div>
            )}
            <Divider className="my-2" />
            <p className="font-bold">ประเมินสุขภาพ</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">


                <Input
                    name="height"
                    size="sm"
                    className={inputWidth}
                    label="ส่วนสูง"
                    endContent="ซม."
                    onChange={handleInputChange}
                    value={form.height.toString()}
                />
                <Input
                    name="weight"
                    size="sm"
                    type="number"
                    className={inputWidth}
                    label="น้ำหนัก"
                    endContent="กก."
                    onChange={handleInputChange}
                    value={form.weight.toString()}
                />

                <Input
                    name="waistline"
                    size="sm"
                    type="number"
                    className={inputWidth}
                    label="เส้นรอบเอว"
                    endContent="ซม."
                    onChange={handleInputChange}
                    value={form.waistline.toString()}
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 ">
                <Input
                    name="bp"
                    size="sm"
                    className={inputWidth}
                    label="ความดันโลหิต"
                    value={form.bp}
                    endContent="มม.ปรอท"
                    onChange={handleInputChange}
                />
                <Input
                    name="bmi" size="sm"
                    className={inputWidth}
                    label="BMI"
                    value={isNaN(parseInt(bmiCal(form.weight, form.height))) ? "0" : bmiCal(form.weight, form.height)}
                    onChange={handleInputChange} />

            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0">
                <Input
                    name="weight_age"
                    size="sm"
                    className={inputWidth}
                    value={valuePervalue(form.weight, parseInt(form.age))}
                    label="น้ำหนัก/อายุ"
                />
                <Input
                    name="height_age"
                    size="sm"
                    value={valuePervalue(form.height, parseInt(form.age))}
                    label="ส่วนสูง/อายุ"
                    className={inputWidth}
                />
                <Input
                    name="weight_height"
                    size="sm"
                    value={valuePervalue(form.weight, form.height)}
                    className={inputWidth}
                    label="น้ำหนัก/ส่วนสูง"
                />
            </div>
            <Divider className="my-2" />
            <p className="font-bold">ความเสี่ยงด้านสุขภาพ</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <CheckboxGroup
                    label="Select cities"
                    orientation="horizontal"
                    value={riskSummary}
                    className="w-8/12"
                    onValueChange={setriskSummary}

                >
                    <Checkbox value="หญิงตั้งครรภ์">หญิงตั้งครรภ์</Checkbox>
                    <Checkbox value="ใช้สารเสพติด">ใช้สารเสพติด</Checkbox>
                    <Checkbox value="อาหารรสจัด">รับประทานอาหารรสหวาน มัน เค็ม</Checkbox>
                    <Checkbox value="สูบบุหรี่">สูบบุหรี่</Checkbox>
                    <Checkbox value="ติดเหล้า">ติดเหล้า</Checkbox>
                    <Checkbox value="เครียด">เครียด</Checkbox>
                    <Checkbox value="เด็กได้รับวัคซีนไม่ครบ">เด็กได้รับวัคซีนไม่ครบ</Checkbox>
                    <Checkbox value="ติดเตียง">ติดเตียง</Checkbox>
                    <Checkbox value="อ้วน/ผอม">อ้วน/ผอม</Checkbox>
                    <Checkbox value="มีความพิการ">มีความพิการ</Checkbox>
                    <Checkbox value="ไม่เคยตรวจสุขภาพ">ไม่เคยตรวจสุขภาพ</Checkbox>
                </CheckboxGroup>
            </div>
            <Divider className="my-2" />
            <p className="font-bold">สรุปภาวะสุขภาพ</p>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0 gap-4">
                <RadioGroup
                    name="health_summary"
                    value={form.health_summary}
                    onValueChange={(value) => {
                        setForm((prevForm) => ({
                            ...prevForm,
                            health_summary: value
                        }))
                    }}
                >

                    <Radio value="กลุ่มสุขภาพปกติ">กลุ่มสุขภาพปกติ</Radio>
                    <Radio value="กลุ่มที่ความเสี่ยงด้านสุขภาพ">
                        กลุ่มที่ความเสี่ยงด้านสุขภาพ
                    </Radio>
                    <Radio value="กลุ่มป่วยที่ควบคุมโรคได้">
                        กลุ่มป่วยที่ควบคุมโรคได้
                    </Radio>
                    <Radio value="กลุ่มป่วยที่ควบคุมโรคไม่ได้">
                        กลุ่มป่วยที่ควบคุมโรคไม่ได้
                    </Radio>
                </RadioGroup>
            </div>
            <div className="flex w-full justify-end mt-4">
                <Button className="bg-primary" size="lg" type="submit"> บันทึกข้อมูล</Button>
            </div>
        </form>
    );
};

export default CustomerRegistor;
