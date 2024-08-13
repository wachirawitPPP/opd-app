'use client' 
import { Checkbox, DatePicker, Input, Card, Select, SelectItem, Button } from '@nextui-org/react'; 
import React, { useEffect, useState } from 'react'; 
import { IconCircleCheck } from '@tabler/icons-react' 
const OnlineRegister = () => { 
    return (
        <Card className="w-full p-5 overflow-auto">
            <div className='flex justify-center' >
                <IconCircleCheck className='text-success' size={42} stroke={2} />
            </div>
            <span className='text-xl text-center font-bold'>ลงทะเบียนสำเร็จ</span>
            <small className='py-2 text-center text-small font-semibold leading-none text-default-600'>ท่านสามารถปิดหน้าต่างนี้เพื่อออกจากการลงทะเบียนเมื่อเสร็จสิ้นแล้ว</small>
        </Card>
    );
}; 
export default OnlineRegister;
