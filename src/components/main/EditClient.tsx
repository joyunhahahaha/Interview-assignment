import React, { useState } from "react";
import { ClientWithCompanyDetails, Company } from "../../types/information";
import DatePicker from "react-datepicker";//날짜
import { ko } from "date-fns/locale"; //날짜

interface EditClientProps {
  client: ClientWithCompanyDetails | null;
  onCancel: () => void;
  onSave: (updatedClient: ClientWithCompanyDetails) => void;
}

const EditClient: React.FC<EditClientProps> = ({ client, onCancel, onSave }) => {
  const [edited, setEdited] = useState<ClientWithCompanyDetails | null>(
    client && client.company
      ? {
        ...client,
        company: { ...client.company },
      }
      : null
  );

  if (!edited || !edited.company) {
    return <div className="text-red-500">잘못된 거래처 정보입니다.</div>;
  }

  const c = edited.company;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: keyof Company
  ) => {
    setEdited((prev) =>
      prev
        ? {
          ...prev,
          company: {
            ...prev.company,
            [field]: e.target.value,
          },
        }
        : null
    );
  };


  // 우편번호 검색
  const callPostcode = () => {
    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {
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