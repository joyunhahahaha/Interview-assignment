import React from "react";
import { ClientWithCompanyDetails } from "../../types/information";

interface ViewClientProps {
  client: ClientWithCompanyDetails;
  onEdit: () => void;
}

const ViewClient: React.FC<ViewClientProps> = ({ client, onEdit }) => {
  const c = client.company;

  return (
   <div className="w-full">
  {/* 상단 제목 + 수정 버튼 */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold opacity-0">거래처 정보</h2>
    <button
      onClick={onEdit}
      className="border-gray-300 noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] px-6 py-2 bg-white text-black rounded hover:bg-black hover:text-white"
    >
      수정
    </button>
  </div>

  {/* 정보 테이블 */}
  <div className="border bg-white rounded shadow max-h-[600px] overflow-y-scroll custom-scrollbar">
    <table className="leading-[150%] tracking-[-0.5px] noto-sans-kr-normal w-full table-fixed border-collapse border border-gray-300 text-sm">
      <tbody>
         <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">사업자등록번호<span className="text-red-600">*</span></td>
          <td className="border px-2 py-2" colSpan={3}>{formatBRN(c.brn)}</td>
        </tr>
         <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">주민등록번호<span className="text-red-600">*</span></td>
          <td className="border px-2 py-4">{formatSSN(c.resident_registration_number)}</td>
          <td className="w-32 border border-gray-300 px-2 py-4 bg-gray-50 noto-sans-kr-superbold text-[#777777]">주민기재분<span className="text-red-600">*</span></td>
          <td className="border border-gray-300 px-2 py-4">{c.resident_type ? "여" : "부"}</td>
        </tr>

         <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">대표자 성명<span className="text-red-600">*</span></td>
          <td className="border px-2 py-4">{c.ceo_name}</td>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">총 사업장 번호<span className="text-red-600">*</span></td>
          <td className="border px-2 py-4">{c.sub_business_number}</td>
        </tr>

        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777] ">업종<span className="text-red-600">*</span></td>
          <td className="border px-2 py-4">{c.business_type}</td>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777] ">종목<span className="text-red-600">*</span></td>
          <td className="border px-2 py-4">{c.item}</td>
        </tr>

        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777] ">주소<span className="text-red-600">*</span></td>
          <td className="border px-2 py-2" colSpan={3}>{formatZipcode(c.zipcode)}{c.address}</td>
        </tr>

        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">연락처</td>
          <td className="border px-2 py-4">{formatPhone(c.phone)}</td>
          <td className="w-32 border border-gray-300 px-2 py-4 bg-gray-50 noto-sans-kr-superbold text-[#777777]">팩스번호</td>
          <td className="border border-gray-300 px-2 py-4">{formatPhone(c.fax)}</td>
        </tr>
          <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">담당(부서)사원</td>
          <td className="border px-2 py-2" colSpan={3}>{c.printable_company_name} <span>/</span> {c.manager}</td>
        </tr>
         <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">인쇄할거래처명</td>
          <td className="border px-2 py-2" colSpan={3}>{c.printable_company_name}</td>
        </tr>
        
        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">담보설정액</td>
          <td className="border px-2 py-4">{formatCurrency(c.guarantee_amount)}</td>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">여신한도액</td>
          <td className="border px-2 py-4">{formatCurrency(c.credit_limit)}</td>
        </tr>
         <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">입금 계좌 번호</td>
          <td className="border px-2 py-4" colSpan={3}>{c.bank} <br/> <span>예금주 </span>{c.account_holder} <span>/</span> <span>계좌번호 </span>{c.account_number}</td>
        </tr>
      
          <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">업체담당자이메일</td>
          <td className="border px-2 py-2" colSpan={3}>{c.email}</td>
        </tr>
      
       <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">거래처 분류명</td>
          <td className="border px-2 py-2" colSpan={3}>{c.category1} <span>/</span> {c.category2}</td>
        </tr>
       
        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">거래처 시작(종료)일</td>
          <td className="border px-2 py-2" colSpan={3}>{c.contract_start} <span>-</span> {c.contract_end}</td>
        </tr>
     
        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">비고</td>
          <td className="border px-2 py-4" colSpan={3}>{c.note}</td>
        </tr>

        <tr>
          <td className="bg-gray-50 border px-2 py-4 noto-sans-kr-superbold text-[#777777]">사용여부</td>
          <td className="border px-2 py-4" colSpan={3}>{c.is_active ? "여" : "부"}</td>
        </tr>
       
      </tbody>
    </table>
  </div>
</div>
  );
};

const TableRow = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b border-gray-200">
    <td className="w-1/4 bg-gray-50 px-3 py-2 font-semibold">{label}</td>
    <td className="w-3/4 px-3 py-2">{value}</td>
  </tr>
);

const formatBRN = (v: string) => v.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");
const formatSSN = (v: string) => v.replace(/^(\d{6})(\d{7})$/, "$1-$2");
const formatPhone = (v: string) => v.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
const formatCurrency = (v: string): string => {
  const cleaned = v.replace(/,/g, ""); // 콤마 제거
  const numeric = parseInt(cleaned, 10); // 숫자로 변환
  return numeric.toLocaleString("ko-KR") + "원"; // 콤마 넣고 "원" 붙이기
};
const formatZipcode = (v: string) => `(${v}) `;

export default ViewClient;
