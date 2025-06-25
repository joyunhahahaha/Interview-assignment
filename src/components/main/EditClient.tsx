import React, { useState } from "react";
import { ClientWithCompanyDetails, Company } from "../../types/information";

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

  return (
    <div className="w-full">
      {/* 상단 제목 + 버튼 */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-xl font-bold">거래처 정보 수정</h2>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 border rounded">취소</button>
          <button
            onClick={() => edited && onSave(edited)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            저장
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <Field label="회사명" value={c.printable_company_name} onChange={handleChange} field="printable_company_name" />
        <Field label="사업자등록번호" value={c.brn} onChange={handleChange} field="brn" />
        <Field label="주민등록번호" value={c.resident_registration_number} onChange={handleChange} field="resident_registration_number" />
        <Field label="대표자명" value={c.ceo_name} onChange={handleChange} field="ceo_name" />
        <Field label="부서" value={c.department} onChange={handleChange} field="department" />
        <Field label="담당자" value={c.manager} onChange={handleChange} field="manager" />
        <Field label="업종" value={c.business_type} onChange={handleChange} field="business_type" />
        <Field label="종목" value={c.item} onChange={handleChange} field="item" />
        <Field label="우편번호" value={c.zipcode} onChange={handleChange} field="zipcode" />
        <Field label="주소" value={c.address} onChange={handleChange} field="address" />
        <Field label="연락처" value={c.phone} onChange={handleChange} field="phone" />
        <Field label="팩스번호" value={c.fax} onChange={handleChange} field="fax" />
        <Field label="이메일" value={c.email} onChange={handleChange} field="email" />
        <Field label="보증금" value={c.guarantee_amount} onChange={handleChange} field="guarantee_amount" />
        <Field label="한도금액" value={c.credit_limit} onChange={handleChange} field="credit_limit" />
        <Field label="은행명" value={c.bank} onChange={handleChange} field="bank" />
        <Field label="예금주" value={c.account_holder} onChange={handleChange} field="account_holder" />
        <Field label="계좌번호" value={c.account_number} onChange={handleChange} field="account_number" />
        <Field label="업종분류1" value={c.category1} onChange={handleChange} field="category1" />
        <Field label="업종분류2" value={c.category2} onChange={handleChange} field="category2" />
        <Field label="계약시작일" value={c.contract_start} onChange={handleChange} field="contract_start" />
        <Field label="계약종료일" value={c.contract_end} onChange={handleChange} field="contract_end" />
        <div className="col-span-2">
          <label className="block font-medium mb-1">비고</label>
          <textarea
            value={c.note}
            onChange={(e) => handleChange(e, "note")}
            className="w-full border p-2 rounded resize-none"
            rows={3}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">사용여부</label>
          <select
            value={c.is_active ? "여" : "부"}
            onChange={(e) =>
              setEdited((prev) =>
                prev
                  ? {
                      ...prev,
                      company: {
                        ...prev.company,
                        is_active: e.target.value === "여",
                      },
                    }
                  : null
              )
            }
            className="w-full border p-2 rounded"
          >
            <option value="여">여</option>
            <option value="부">부</option>
          </select>
        </div>
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