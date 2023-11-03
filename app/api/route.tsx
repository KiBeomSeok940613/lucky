import { NextRequest, NextResponse } from "next/server";

interface Content  {
    name: string;
    keyword?: string;
    desc: string;
    index: string;
  };
  
  interface DateDetail  {
    title: string;
    date: string;
    content: Content[];
  };
  
  interface UserData  {
    year: string;
    constellation: string;
  };
  
  interface Result  {
    day: DateDetail;
    tomorrow: DateDetail;
    month: DateDetail;
    userData: UserData;
  };
  
  interface JsonResponse {
    result: Result;
    resultMSG: string;
  };



export const GET = async (req: NextRequest) : 
Promise<NextResponse> => {
   
    const query = req.nextUrl.searchParams
    
    const gender = query.get("gender");
    const birthDate = query.get("birthdate");
    const month = query.get("month");
    const time = query.get("time");
    console.log(gender, birthDate, month, time)
    const res = await fetch(`https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver?_callback=window.__jindo2_callback._fortune_my_0&gender=${gender}&birth=${birthDate}&solarCal=${month}&time=${time}`);
    

    function convert(str: string): JsonResponse | null {
        const fixedStr = str
        .replace(/^window\.__jindo2_callback\._fortune_my_0\(/, '').replace(/\);$/, '');
    
        try {
          const parsedJson: JsonResponse = JSON.parse(fixedStr.replace(/([\w]+) ?:/g, '"$1":'));
          if (parsedJson) {
              return parsedJson;
          } else {
              return null;
          }
      } catch (error) {
          return null;
      }
    }
    const  resTxt = await res.text
    const resultData = convert(await res.text())
    
    return NextResponse.json(resultData);
}

    // get("타입을 가져온다.") 파라미터 

    // https://m.search.naver.com/p/csearch/dcontent/external_api/json_todayunse_v2.naver
    // 이 이주소로 데이터를 가져와서 그것을 클라이언트 에게 다시 뿌린다.
    
  