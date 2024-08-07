'use client';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import React from 'react';
import { IconArrowRight } from '@tabler/icons-react';

const HomeMenu = () => {
  return (
    <div className='flex w-full flex-row  flex-wrap justify-center'>
  
      <div className="flex flex-row w-full justify-center flex-wrap py-3  md:mb-0 gap-7 sm:justify-center">
      <Link href='/appraisal-registor' className='w-full sm:w-4/12 flex justify-center' passHref>
          <Card className="w-full py-4 h-28 bg-gradient-to-r bg-purple-500 hover:bg-purple-300 transition-transform duration-100 ease-in-out transform hover:scale-105">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-larg font-bold">แบบคัดกรองสุขภาพรายบุคคล</p>
              <small className="text-default-200">คลิกเพื่อเข้าสู่แบบคัดกรอง</small>
            </CardHeader>
           
          </Card>
        </Link>
        <Link href='/nicotine-test' className='w-full h-28 sm:w-4/12 flex justify-center' passHref>
        <Card className="w-full py-4 h-28 bg-gradient-to-r bg-blue-700 hover:bg-blue-300 transition-transform duration-100 ease-in-out transform hover:scale-105">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-larg font-bold">แบบประเมินระดับการเสพติดนิโคติน</p>
              <small className="text-default-200">คลิกเพื่อเข้าสู่แบบคัดกรอง</small>
            </CardHeader>
          </Card>
        </Link>
        
      </div>
      <div className="flex flex-row w-full justify-center flex-wrap py-3  md:mb-0 gap-7 sm:justify-center">
      <Link href='/risk' className='w-full sm:w-4/12 flex justify-center' passHref>
      <Card className="w-full py-4 h-28 bg-gradient-to-r bg-yellow-500 hover:bg-yellow-300 transition-transform duration-100 ease-in-out transform hover:scale-105">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-larg font-bold">แบบประเมินความเสี่ยงการเกิดโรคความดันโลหิตสูง โรคเบาหวาน</p>
              <small className="text-default-200">คลิกเพื่อเข้าสู่แบบคัดกรอง</small>
            </CardHeader>
           
          </Card>
        </Link>
        <Link href='/suicide-form1' className='w-full sm:w-4/12 flex justify-center' passHref>
        <Card className="w-full py-4 h-28 bg-gradient-to-r bg-sky-500 hover:bg-sky-300 transition-transform duration-100 ease-in-out transform hover:scale-105">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-larg font-bold">แบบคัดกรองโรคซึมเศร้า</p>
              <small className="text-default-200">คลิกเพื่อเข้าสู่แบบคัดกรอง</small>
            </CardHeader>
            
          </Card>
        </Link>
      </div>
      <div className="flex w-full justify-center flex-wrap py-3 md:flex-nowrap md:mb-0 gap-7 sm:justify-center">
      <Link href='/alcohol-form' className='w-full sm:w-4/12 flex justify-center' passHref>
      <Card className="w-full py-4 h-28 bg-gradient-to-r bg-pink-500 hover:bg-pink-300 transition-transform duration-100 ease-in-out transform hover:scale-105">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-larg font-bold">แบบประเมินแอลกอฮอล์</p>
              <small className="text-default-200">คลิกเพื่อเข้าสู่แบบคัดกรอง</small>
            </CardHeader>
          </Card>
        </Link>
       
        <Link href='/assmnt-summary' className='w-full sm:w-4/12 flex justify-center' passHref>
        <Card className="w-full py-4 h-28 bg-gradient-to-r bg-lime-500 hover:bg-lime-300 transition-transform duration-100 ease-in-out transform hover:scale-105">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-larg font-bold">สรุปผล</p>
              <small className="text-default-200">คลิกเพื่อเข้าสู่แบบคัดกรอง</small>
            </CardHeader>
            
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default HomeMenu;
