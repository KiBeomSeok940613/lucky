'use client'




import Image from 'next/image'
// 중괄호는 이름을 바꿀 수 가 없다.
import React, {useState} from 'react'



export default function Home() {
  const[gender, setGender] = useState<string>("");
  const[birthDate, setBirthDate] = useState<string>("");
  const[month, setMonth] = useState<string>("1")
  const[time, setTime] = useState<string>("")
  
  const[resultToday, setResultToday] = useState(null)
  const[resulttomorrow, setResultTomorrow] = useState(null)
  const[resltMonth, setResultMonth] = useState(null)

  const fetchData = async ()=>{
    const res = await fetch(`/api?gender=${gender}&birthdate=${birthDate}&month=${month}$time=${time}`);
    const data = await res.json();
    
    setResultToday(data.result.day)
    setResultTomorrow(data.result.tomorrow)
    setResultMonth(data.result.month)
    console.log(data.result.day)
    console.log(data.result.tomorrow)
    console.log(data.result.month)
  
  }


  const birthChange = ((e: React.ChangeEvent <HTMLInputElement>)=>{
    
    const value = e.target.value;
    if(value.length <= 8 && /^[0-9]*$/.test(value)){
        setBirthDate(value)
    }
  }) 

  return (
  <>
  
    <div className='w-full text-center'>
      <span >성별</span>
      <button onClick={()=>{setGender("m")}}>남자</button>
      <button onClick={()=>{setGender("f")}}>여자</button>
      <button onClick={()=>{setGender("mf")}}>논바이너리</button>
    </div>
    
    <div>
      <span>생년월일</span>
      <input type='text' onChange={birthChange} value={birthDate} placeholder='생년월일(8자리)'></input>
    </div>
      <span>달</span>
      <select value={month} onChange={(e)=>setMonth(e.target.value)}>
        <option value="1">양력</option>
        <option value="2">양력 평달</option>
        <option value="3">음력 윤달</option>
      </select>

      <div>
        <span>시간</span>
        <select value={time} onChange={(e)=>{setTime(e.target.value)}}>
          <option value="">모름</option>
          <option value="0">23:30~ 01:29</option>
          <option value="1">1:30~ 03:29</option>
          <option value="2">3:30~ 05:29</option>
          <option value="3">5:30~ 07:29</option>
          <option value="4">7:30~ 09:29</option>
          <option value="5">9:30~ 11:29</option>
          <option value="6">11:30~ 13:29</option>
          <option value="7">13:30~ 15:29</option>
          <option value="8">15:30~ 17:29</option>
          <option value="9">17:30~ 19:29</option>
          <option value="10">19:30~ 21:29</option>
          <option value="11">21:30~ 23:29</option>``
        </select>
      </div>
     


    <div>
      <p>성별 : {gender}</p>
      <p>생년월일 : {birthDate}</p>
      <p>달 : {month}</p>
      <p>시간 : {time}</p>
    </div>
    
    {/*resultData && resultData.day.title*/}
    <button onClick={fetchData} className='border px-5 py-2 text-center w-full'>확인</button>

  </>
  )
}
