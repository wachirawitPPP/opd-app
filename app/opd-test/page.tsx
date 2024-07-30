'use client'

import React, { FormEvent, useState } from 'react';

interface Column {
  key: string;
  label: string;
}

interface RowData {
  key: number;
  question: string;
}

const FormPage: React.FC = () => {
  const rows: string[] = [
    'กลัวทำงานผิดพลาด',
    'ไปไม่ถึงเป้าหมายที่วางไว้',
    'ครอบครัวมีความขัดแย้งกันในเรื่องเงินหรือเรื่องงานในบ้าน',
    'เป็นกังวลกับเรื่องสารพิษหรือมลภาวะในอากาศ น้ำ เสียง และดิน',
    'รู้สึกว่าต้องแข่งขันหรือเปรียบเทียบ',
    'เงินไม่พอใช้จ่าย',
    'กล้ามเนื้อเกร็งหรือปวด',
    'ปวดหัวจากความตึงเครียด',
    'ปวดหลัง',
    'ความอยากอาหารเปลี่ยนแปลง',
    'ปวดศีรษะข้างเดียว',
    'รู้สึกตกกังวล',
    'รู้สึกขัดข้องใจ',
    'รู้สึกโกรธ หรือพฤติผิด',
    'รู้สึกเศร้า',
    'ความจำไม่ดี',
    'รู้สึกสับสน'
  ];

  const columns: Column[] = [
    { key: 'question', label: 'ข้อที่ คำถามในระยะ 6 เดือน ที่ผ่านมา' },
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '4', label: '4' },
    { key: '5', label: '5' }
  ];

  const data: RowData[] = rows.map((row, index) => ({
    key: index + 1,
    question: `${index + 1}. ${row}`
  }));

  const [totalScore, setTotalScore] = useState<number | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    let total = 0;
    formData.forEach((value) => {
      total += parseInt(value as string, 10);
    });
    setTotalScore(total);
    console.log(total); // You can process the result as needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">แบบวัดความเครียด กรมสุขภาพจิต</h1>
      <form onSubmit={handleSubmit}>
        <table className="min-w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="border border-gray-400 px-4 py-2 bg-gray-100">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.key}>
                <td className="border border-gray-400 px-4 py-2">
                  {item.question}
                </td>
                {[1, 2, 3, 4, 5].map((val) => (
                  <td key={val} className="border border-gray-400 px-4 py-2 text-center">
                    <input type="radio" name={`question-${item.key}`} value={val} required className="w-6 h-6 " />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-center">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Submit
          </button>
        </div>
      </form>
      {totalScore !== null && (
        <div className="mt-4 text-center">
          <p className="text-xl">Total Score: {totalScore}</p>
        </div>
      )}
    </div>
  );
};

export default FormPage;
