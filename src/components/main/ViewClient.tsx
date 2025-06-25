import React from "react";
import { ClientWithCompanyDetails } from "../../types/information";

interface ViewClientProps {
  client: ClientWithCompanyDetails;
  onEdit: () => void;
}

const ViewClient: React.FC<ViewClientProps> = ({ client, onEdit }) => {
  const c = client.company;

  return (
    <div className="w-full ">
      {/* 상단 제목 + 수정 버튼 */}
      <div className="flex justify-between items-center  mb-4">
        <h2 className="text-xl font-bold opacity-0">거래처 정보</h2>
        <button
          onClick={onEdit}
          className="border-gray-300 noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] px-6 py-2 bg-white text-black rounded hover:bg-black hover:text-white"
        >
          수정
        </button>
      </div>

      {/* 정보 테이블 */}
      <div className="border p-4 bg-white rounded shadow">
      <table className="w-full table-fixed border border-gray-300 text-sm">
        <tbody>
          <TableRow label="회사명" value={c.printable_company_name} />
          <TableRow label="사업자등록번호" value={formatBRN(c.brn)} />
          <TableRow label="주민등록번호" value={formatSSN(c.resident_registration_number)} />
          <TableRow label="대표자명" value={c.ceo_name} />
          <TableRow label="업종" value={c.business_type} />
          <TableRow label="종목" value={c.item} />
          <TableRow label="우편번호" value={c.zipcode} />
          <TableRow label="주소" value={c.address} />
          <TableRow label="연락처" value={formatPhone(c.phone)} />
          <TableRow label="팩스" value={formatPhone(c.fax)} />
          <TableRow label="부서" value={c.department} />
          <TableRow label="담당자" value={c.manager} />
          <TableRow label="이메일" value={c.email} />
          <TableRow label="보증금" value={formatCurrency(c.guarantee_amount)} />
          <TableRow label="여신한도" value={formatCurrency(c.credit_limit)} />
          <TableRow label="은행명" value={c.bank} />
          <TableRow label="예금주" value={c.account_holder} />
          <TableRow label="계좌번호" value={c.account_number} />
          <TableRow label="업종분류1" value={c.category1} />
          <TableRow label="업종분류2" value={c.category2} />
          <TableRow label="계약시작일" value={c.contract_start} />
          <TableRow label="계약종료일" value={c.contract_end} />
          <TableRow label="비고" value={c.note} />
          <TableRow label="사용여부" value={c.is_active ? "여" : "부"} />
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
const formatCurrency = (v: string) => parseInt(v, 10).toLocaleString("ko-KR") + "원";

export default ViewClient;
