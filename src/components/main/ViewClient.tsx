import React from "react";
import { ClientWithCompanyDetails } from "../../types/information"; // 타입 정의

interface ViewClientProps {
  client: ClientWithCompanyDetails;
  onEdit: () => void; // 수정 버튼 클릭 시 호출
}

const ViewClient: React.FC<ViewClientProps> = ({ client, onEdit }) => {
  return (
    <div className="view-client">
      <h2>사업자 정보 조회</h2>
      <div>
        <p><strong>회사명:</strong> {client.company?.printable_company_name}</p>
        <p><strong>사업자등록번호:</strong> {client.company?.brn}</p>
        <p><strong>대표자명:</strong> {client.company?.ceo_name}</p>
        <p><strong>사업 종류:</strong> {client.company?.business_type}</p>
        <p><strong>사업 아이템:</strong> {client.company?.item}</p>
        <p><strong>주소:</strong> {client.company?.address}</p>
        <p><strong>전화:</strong> {client.company?.phone}</p>
        <p><strong>팩스:</strong> {client.company?.fax}</p>
        <p><strong>이메일:</strong> {client.company?.email}</p>
        <p><strong>보증금:</strong> {client.company?.guarantee_amount}</p>
      </div>
      <button onClick={onEdit} className="btn-edit w-11 h-20 bg-black text-white"
       style={{ backgroundColor: 'black', color: 'white', padding: '10px', borderRadius: '5px' }}
     >수정</button> {/* 수정 버튼 */}
    </div>
  );
};

export default ViewClient;