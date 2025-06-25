import React, { useState } from "react";
import { ClientWithCompanyDetails, Company } from "../../types/information";

interface EditClientProps {
  client: ClientWithCompanyDetails | null;
  onCancel: () => void;
  onSave: (updatedClient: ClientWithCompanyDetails) => void;
}

const EditClient: React.FC<EditClientProps> = ({ client, onCancel, onSave }) => {
  // 🧩 Hook은 무조건 최상단에서 실행
  const [edited, setEdited] = useState<ClientWithCompanyDetails | null>(
    client && client.company
      ? {
          ...client,
          company: { ...client.company },
        }
      : null
  );

  // ✅ 렌더링 시 edited가 null이면 안내 메시지 보여줌
  if (!edited || !edited.company) {
    return <div className="text-red-500">잘못된 거래처 정보입니다.</div>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">거래처 수정</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={edited.company.printable_company_name}
          onChange={(e) => handleInputChange(e, "printable_company_name")}
          placeholder="회사명"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={edited.company.brn}
          onChange={(e) => handleInputChange(e, "brn")}
          placeholder="사업자등록번호"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={edited.company.ceo_name}
          onChange={(e) => handleInputChange(e, "ceo_name")}
          placeholder="대표자명"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={edited.company.phone}
          onChange={(e) => handleInputChange(e, "phone")}
          placeholder="연락처"
          className="border p-2 rounded"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={onCancel} className="px-4 py-2 border rounded">
          취소
        </button>
        <button
          onClick={() => edited && onSave(edited)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EditClient;