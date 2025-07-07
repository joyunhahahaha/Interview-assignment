import React, { useState } from "react";
import { ClientWithCompanyDetails, Company } from "../../types/information"; // ts 인터페이스 / 거래처 전체 정보 (Client + Company)를 안전하게 다루기 위해 불러옵니다.
import DatePicker from "react-datepicker";//날짜
import { ko } from "date-fns/locale"; //날짜

//뼈대(props)
interface EditClientProps { 
  client: ClientWithCompanyDetails | null; // 수정할 거래처 정보
  onCancel: () => void; // '취소'버튼 눌렀을 때 실행되는 함수 
  onSave: (updatedClient: ClientWithCompanyDetails) => void; //'저장' 눌렀을 때 정보 넘기는 함수
}

// edited 라는 변수에 복사된 거래처 정보를 담기 원본을 바로 바꾸지 않고 복사본을 수정
const EditClient: React.FC<EditClientProps> = ({ client, onCancel, onSave }) => { //React.FC<EditClientProps>: 이 컴포넌트가 EditClientProps 모양의 props를 받는다는 표시
  const [edited, setEdited] = useState<ClientWithCompanyDetails | null>( //edited : 화면에 띄울 수정 중인 데이터
    client && client.company
      ? {
        ...client,
        company: { ...client.company }, // client가 있으면 스프레드 연산자 ...로 깊은 복사 company : {...client.company} 까지 복사해서 원본 데이터 (client)를 건드리지 않고 edited만 바꿀 수 있게 함
      }
      : null
  );

  // 오류 처리 edited가 없으면 "잘못된 정보"라는 경고만 띄우고 더 아래 코드는 실행되지 않음
  if (!edited || !edited.company) {
    return <div className="text-red-500">잘못된 거래처 정보입니다.</div>;
  }

  // c는 edited.company를 가리키는 별명
  // 이제 계속 c.<필드명>으로 간단히 쓸 수 있다.
  const c = edited.company;

  // 입력 칸에 글자를 쓰면 handleChange가 호출 field에 맞는 회사 정보 (c.brn, c.ceo_name 등) 새 값 (e.target.value)으로 바꿔요
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, // e: 이벤트 객체 . e.target.value 에 새 입력값
    field: keyof Company //TS가 field를 Company 타입 키 중 하나로 제한 ("brn" 이나 "address"등)
  ) => {
    setEdited((prev) => //안전하게 이전 상태 (prev)를 가져와 새 객체를 만들어 덮어써요
      prev
        ? {
          ...prev,
          company: {
            ...prev.company,
            [field]: e.target.value, //객체 속성 동적 대입 -> 내가 클릭한 칸만 바뀜
          },
        }
        : null
    );
  };


  // 우편번호 검색
  //창에서 주소를 선택하면 setEdited로 우편번호(zipcode)와 주소(address)를 채워줌
  const callPostcode = () => {
    new (window as any).daum.Postcode({ // window.daum.Postcode :다음 API가 전역에 심어놓은 우편번호 검색창
      oncomplete: (data: any) => {  //사용주가 주소를 고르면 oncomplete 실행 -> data.zonecode, data.address를 edited.company에 채워줌
        setEdited((prev) =>
          prev
            ? {
                ...prev,
                company: {
                  ...prev.company,
                  zipcode: data.zonecode,
                  address: data.address,
                },
              }
            : prev
        );
      },
    }).open();
  };

  return (
    <div className="w-full">
      {/* 상단 제목 + 버튼 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold opacity-0">거래처 정보 수정</h2>
        <div className="flex gap-2">
          <button onClick={onCancel} className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] px-6 py-2 bg-white text-black rounded hover:bg-black hover:text-white">취소</button>
          <button
            onClick={() => edited && onSave(edited)}
            className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] px-6 py-2 bg-black text-white rounded  hover:bg-white hover:text-black"
          >
            저장
          </button>
        </div>
      </div>

      <div className="border bg-white rounded shadow max-h-[600px] overflow-y-scroll custom-scrollbar">
        <table className="w-full table-fixed border-collapse border border-gray-300 text-sm">
          <tbody>

            <tr>
              <td className="noto-sans-kr-superbold text-[#777777] leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 w-[20%] font-semibold text-[#777]">
                사업자등록번호<span className="text-red-600">*</span>
              </td>
              <td className="border px-2 py-2 w-[80%]" colSpan={3}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={c.brn}
                    onChange={(e) => handleChange(e, "brn")}
                    className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                  />
                  <button className="noto-sans-kr-normal text-black px-2 py-1 border rounded hover:bg-black hover:text-white transition">
                    사업자등록상태 조회
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold text-[#777777] leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">주민등록번호<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.resident_registration_number} onChange={(e) => handleChange(e, "resident_registration_number")} className="w-full border px-2 py-1 rounded" />
              </td>
              <td className="noto-sans-kr-superbold text-[#777777] leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">주민기재분<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <label className="mr-4">
                  <input type="radio" name="resident_type" value="부" checked={!c.resident_type} onChange={() => setEdited(prev => prev ? { ...prev, company: { ...prev.company, resident_type: false } } : null)} />
                  <span className="ml-1">부</span>
                </label>
                <label>
                  <input type="radio" name="resident_type" value="여" checked={c.resident_type} onChange={() => setEdited(prev => prev ? { ...prev, company: { ...prev.company, resident_type: true } } : null)} />
                  <span className="ml-1">여</span>
                </label>
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">대표자 성명<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.ceo_name} onChange={(e) => handleChange(e, "ceo_name")} className="w-full border px-2 py-1 rounded" />
              </td>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">총 사업장 번호<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.sub_business_number || ""} onChange={(e) => handleChange(e, "sub_business_number")} className="w-full border px-2 py-1 rounded" />
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">업종<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.business_type} onChange={(e) => handleChange(e, "business_type")} className="w-full border px-2 py-1 rounded" />
              </td>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">종목<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.item} onChange={(e) => handleChange(e, "item")} className="w-full border px-2 py-1 rounded" />
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">주소</td>
              <td className="border px-2 py-2" colSpan={3}>
                <div className="flex items-center gap-2 mb-2 noto-sans-kr-normal text-black">
                  <input
                    type="text"
                    value={c.zipcode}
                    onChange={(e) => handleChange(e, "zipcode")}
                    className="w-full border px-2 py-1 rounded"
                  />
                  <button onClick={callPostcode} className="noto-sans-kr-normal text-black px-2 py-1 border rounded hover:bg-black hover:text-white transition whitespace-nowrap">
                    우편번호 조회
                  </button>
                </div>
                <input
                  type="text"
                  value={c.address}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full border px-2 py-1 rounded noto-sans-kr-normal text-black"
                />
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">연락처<span className="text-red-600">*</span></td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.phone} onChange={(e) => handleChange(e, "phone")} className="w-full border px-2 py-1 rounded" />
              </td>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">팩스번호</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <input type="text" value={c.fax} onChange={(e) => handleChange(e, "fax")} className="w-full border px-2 py-1 rounded" />
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">담당(부서)원</td>
              <td className="border px-2 py-2" colSpan={3}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-24">부서명</span>
                  <input
                    type="text"
                    value={c.department}
                    onChange={(e) => handleChange(e, "department")}
                    className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                  />

                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-24">담장자</span>
                  <input
                    type="text"
                    value={c.manager}
                    onChange={(e) => handleChange(e, "manager")}
                    className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">인쇄할거래처명</td>
              <td className="border px-2 py-2" colSpan={3}>
                <input
                  type="text"
                  value={c.printable_company_name}
                  onChange={(e) => handleChange(e, "printable_company_name")}
                  className="w-full border px-2 py-1 rounded noto-sans-kr-normal text-black"
                />
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">담보설정액</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <div className="flex items-center gap-2 ">
                  <input type="text" value={c.guarantee_amount} onChange={(e) => handleChange(e, "guarantee_amount")} className="w-full border px-2 py-1 rounded" />
                  <span>원</span>
                </div>
              </td>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">여신한도액</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <div className="flex items-center gap-2 ">
                  <input type="text" value={c.credit_limit} onChange={(e) => handleChange(e, "credit_limit")} className="w-full border px-2 py-1 rounded" />
                  <span>원</span>
                </div>
              </td>
            </tr>


            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">입금 계좌 번호</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black " colSpan={3}>
                {/* 은행 */}
                <div className="flex items-center gap-2 mb-2">
                  <label className="w-20 shrink-0">은행</label>
                  <input
                    type="text"
                    value={c.bank}
                    onChange={(e) => handleChange(e, "bank")}
                    className="w-[200px] border px-2 py-1 rounded"
                  />
                </div>

                {/* 예금주 + 계좌번호 */}
                <div className="flex items-center gap-8">
                  {/* 예금주 */}
                  <div className="flex items-center gap-2">
                    <label className="w-20 shrink-0">예금주</label>
                    <input
                      type="text"
                      value={c.account_holder}
                      onChange={(e) => handleChange(e, "account_holder")}
                      className="w-[200px] border px-2 py-1 rounded"
                    />
                  </div>

                  {/* 계좌번호 */}
                  <div className="flex items-center gap-2">
                    <label className="w-20 shrink-0">계좌번호</label>
                    <input
                      type="text"
                      value={c.account_number}
                      onChange={(e) => handleChange(e, "account_number")}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">업체담당자이메일</td>
              <td className="border px-2 py-2" colSpan={3}>
                <input
                  type="text"
                  value={c.email}
                  onChange={(e) => handleChange(e, "email")}
                  className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                />
              </td>
            </tr>

            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">거래처 분류명</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black" colSpan={3}>

                <div className="flex items-center gap-2">

                  <input
                    type="text"
                    value={c.category1}
                    onChange={(e) => handleChange(e, "category1")}
                    className="w-full border px-2 py-1 rounded"
                  />


                  <input
                    type="text"
                    value={c.category2}
                    onChange={(e) => handleChange(e, "category2")}
                    className="w-full border px-2 py-1 rounded"
                  />

                </div>
              </td>
            </tr>
            <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">거래처 시작(종료)일</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black" colSpan={3}>
                <div className="flex items-center gap-4">
                  {/* 시작일 */}
                  <div className="flex items-center gap-2">
                    <span>시작일</span>
                    <DatePicker
                     selected={
                        c.contract_start
                          ? new Date(c.contract_start)
                          : null
                      }
                      onChange={(date) =>
                        handleChange(
                          {
                            target: {
                              value: date
                                ? date.toISOString().slice(0, 10)
                                : "",
                            },
                          } as any,
                          "contract_start"
                        )
                      }
                      dateFormat="yyyy-MM-dd"
                      locale={ko}
                      placeholderText="YYYY-MM-DD"
                      className="border px-2 py-1 rounded w-[150px]"
                    
                    />
                  </div>

                  {/* 종료일 */}
                  <div className="flex items-center gap-2">
                    <span>~ 종료일</span>
                    <DatePicker
                        selected={
                        c.contract_end ? new Date(c.contract_end) : null
                      }
                      onChange={(date) =>
                        handleChange(
                          {
                            target: {
                              value: date
                                ? date.toISOString().slice(0, 10)
                                : "",
                            },
                          } as any,
                          "contract_end"
                        )
                      }
                      dateFormat="yyyy-MM-dd"
                      locale={ko}
                      placeholderText="YYYY-MM-DD"
                      className="border px-2 py-1 rounded w-[150px]"
                    />
                  </div>
                </div>
              </td>
            </tr>
             <tr>
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">비고</td>
              <td className="border px-2 py-2" colSpan={3}>
                <input
                  type="text"
                  value={c.note}
                  onChange={(e) => handleChange(e, "note")}
                  className="w-full border px-2 py-1 rounded"
                />
              </td>
            </tr>
             <tr>
             
              <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">사용여부</td>
              <td className="border px-2 py-2 noto-sans-kr-normal text-black">
                <label className="mr-4">
                  <input type="radio" name="is_active" value="부" checked={!c.is_active} onChange={() => setEdited(prev => prev ? { ...prev, company: { ...prev.company, is_active: false } } : null)} />
                  <span className="ml-1">부</span>
                </label>
                <label>
                  <input type="radio" name="is_active" value="여" checked={c.is_active} onChange={() => setEdited(prev => prev ? { ...prev, company: { ...prev.company, is_active: true } } : null)} />
                  <span className="ml-1">여</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  onChange,
  field,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>, field: keyof Company) => void;
  field: keyof Company;
}) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e, field)}
      className="w-full border p-2 rounded"
    />
  </div>
);

export default EditClient;