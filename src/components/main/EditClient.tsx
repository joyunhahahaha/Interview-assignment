import React, { useState } from "react";
import { ClientWithCompanyDetails, Company } from "../../types/information"; // 타입 정의

interface EditClientProps {
  client: ClientWithCompanyDetails;
  onCancel: () => void; // 취소 버튼 클릭 시 호출
  onSave: (updatedClient: ClientWithCompanyDetails) => void; // 저장 버튼 클릭 시 호출
}

const EditClient: React.FC<EditClientProps> = ({ client, onCancel, onSave }) => {
  const [editedClient, setEditedClient] = useState<ClientWithCompanyDetails>({
    ...client,
    company: client.company || {
      brn: "",
      resident_registration_number: "",
      resident_type: false,
      ceo_name: "",
      sub_business_number: 0,
      business_type: "",
      item: "",
      zipcode: "",
      address: "",
      phone: "",
      fax: "",
      department: "",
      manager: "",
      printable_company_name: "",
      guarantee_amount: "",
      credit_limit: "",
      bank: "",
      account_holder: "",
      account_number: "",
      email: "",
      category1: "",
      category2: "",
      contract_start: "",
      contract_end: "",
      note: "",
      is_active: true,
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Company) => {
    setEditedClient((prevState) => ({
      ...prevState,
      company: {
        ...(prevState.company || {}),
        [field]: e.target.value,
      },
    }));
  };

  const handleSave = () => {
    if (editedClient.company) {
      onSave(editedClient); // 수정된 클라이언트 저장
    }
  };

  return (
    <div className="edit-client">
      <h2>사업자 정보 수정</h2>
      <div>
        <label>
          <span>회사명:</span>
          <input
            type="text"
            value={editedClient.company?.printable_company_name || ""}
            onChange={(e) => handleInputChange(e, "printable_company_name")}
          />
        </label>
        <label>
          <span>사업자등록번호:</span>
          <input
            type="text"
            value={editedClient.company?.brn || ""}
            onChange={(e) => handleInputChange(e, "brn")}
          />
        </label>
        <label>
          <span>대표자명:</span>
          <input
            type="text"
            value={editedClient.company?.ceo_name || ""}
            onChange={(e) => handleInputChange(e, "ceo_name")}
          />
        </label>
        <label>
          <span>연락처:</span>
          <input
            type="text"
            value={editedClient.company?.phone || ""}
            onChange={(e) => handleInputChange(e, "phone")}
          />
        </label>
      </div>
      <div className="actions">
        <button onClick={onCancel} className="btn-cancel">취소</button>
        <button onClick={handleSave} className="btn-save">저장</button>
      </div>
    </div>
  );
};

export default EditClient;