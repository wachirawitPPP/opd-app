'use client'
import { DatePicker, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

const inputWidth = "sm:w-4/12 py-2 px-2 ";

interface HealthScreenComponentProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    customer?: any;
}

const HealthScreenComponent: React.FC<HealthScreenComponentProps> = ({ formData, setFormData, customer }) => {
    useEffect(() => {
        if (customer) {
            setFormData((prevFormData: any) => ({ ...prevFormData, ...customer }));
        }
    }, [customer, setFormData]);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
    };

    return (
        <div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0">
                <Input
                    className={inputWidth}
                    name="station_code"
                    onChange={handleInputChange}
                    size="sm"
                    label="รหัสหน่วยบริการ"
                    value={formData.station_code || ''}
                />
                <Input
                    name="station_name"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="ชื่อหน่วยบริการ"
                    value={formData.station_name || ''}
                />
                <DatePicker
                    name="register_date"
                    className={inputWidth}
                    size="sm"
                    label="วันที่สำรวจ"
                    variant="bordered"
                    showMonthAndYearPickers
                    // value={parseDate(formData.register_date)} // Implement parseDate function if necessary
                    // onChange={(date) => handleDateChange('register_date', date)} // Implement handleDateChange if necessary
                />
            </div>
            <div className="flex w-full flex-wrap py-3 md:flex-nowrap mb-6 md:mb-0">
                <Input
                    name="id_card"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="เลขบัตรประจำตัวประชาชน"
                    value={formData.id_card || ''}
                />
                <Input
                    name="passport_id"
                    className={inputWidth}
                    onChange={handleInputChange}
                    size="sm"
                    label="เลขที่บัตรต่างด้าว (Passport)"
                    value={formData.passport_id || ''}
                />
            </div>
        </div>
    );
};

export default HealthScreenComponent;
