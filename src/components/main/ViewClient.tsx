// components/main/ViewClient.tsx
import React from "react";
import { ClientWithCompanyDetails } from "../../types/information";

interface ViewClientProps {
  client: ClientWithCompanyDetails;
  onEdit: () => void;
}

const ViewClient: React.FC<ViewClientProps> = ({ client, onEdit }) => {
  const c = client.company;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">거래처 조회</h2>
      <table className="w-full text-sm">
        <tbody>
          <tr><td>회사명</td><td>{c.printable_company_name}</td></tr>
          <tr><td>사업자등록번호</td><td>{formatBRN(c.brn)}</td></tr>
          <tr><td>대표자명</td><td>{c.ceo_name}</td></tr>
          <tr><td>업종</td><td>{c.business_type}</td></tr>
          <tr><td>종목</td><td>{c.item}</td></tr>
          <tr><td>주소</td><td>{c.address}</td></tr>
          <tr><td>연락처</td><td>{formatPhone(c.phone)}</td></tr>
          <tr><td>팩스</td><td>{formatPhone(c.fax)}</td></tr>
          <tr><td>이메일</td><td>{c.email}</td></tr>
          <tr><td>보증금</td><td>{formatCurrency(c.guarantee_amount)}</td></tr>
        </tbody>
      </table>
      <button onClick={onEdit} className="mt-4 px-4 py-2 bg-black text-white rounded">수정</button>
    </div>
  );
};

const formatBRN = (v: string) => v.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");
const formatPhone = (v: string) => v.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
const formatCurrency = (v: string) => parseInt(v).toLocaleString("ko-KR") + "원";

export default ViewClient;