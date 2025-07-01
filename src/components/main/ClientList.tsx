// src/components/main/ClientList.tsx
import React from "react";
import { ClientWithCompanyDetails } from "../../types/information";

interface Props {
  clients: ClientWithCompanyDetails[];
  selectedCode: string;
  onSelect: (c: ClientWithCompanyDetails) => void;
  onNew: () => void;
}

const ClientList: React.FC<Props> = ({ clients, selectedCode, onSelect, onNew }) => {
  const formatBRN = (v: string) => v.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");

  return (
    <div className="w-[45%]">
      <div className="flex justify-end mb-4">
        <button onClick={onNew} className="px-6 py-2 bg-black text-white rounded">
          등록
        </button>
      </div>
      <div className="border rounded shadow bg-white max-h-[600px] overflow-y-auto">
        <table className="w-full text-center table-fixed text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="w-12 border">No</th>
              <th className="w-12 border">✔</th>
              <th className="w-24 border">코드</th>
              <th className="border">거래처명</th>
              <th className="w-32 border">등록번호</th>
              <th className="w-20 border">유형</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, i) => (
              <tr
                key={c.code}
                onClick={() => onSelect(c)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  c.code === selectedCode ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                <td className="py-4 border">{clients.length - i}</td>
                <td className="py-4 border"><input type="checkbox" /></td>
                <td className="py-4 border">{c.code}</td>
                <td className="py-4 border">{c.company.printable_company_name}</td>
                <td className="py-4 border">{formatBRN(c.brn)}</td>
                <td className="py-4 border">{c.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;


