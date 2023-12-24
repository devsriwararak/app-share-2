import React, { useEffect } from 'react'

const MyWongHome = ({data}) => {
//   useEffect(()=>{
// console.log(data);
//   },[data])
  return (
    <div>
      <h1 className='text-lg text-black'>ข้อมูลบ้านแชร์  {data.home}</h1>
      <p className='text-lg text-gray-700 mt-3'>ข้อมูลบ้านแชร์ จะดำเนินการในงวดที่ 3/3 ครับ</p>
     
    </div>
  )
}

export default MyWongHome