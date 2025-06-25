import React from "react";
import { ClientWithCompanyDetails } from "../../types/information";

interface Props {
  clients: ClientWithCompanyDetails[];
  selectedCode: string;
  onSelect: (client: ClientWithCompanyDetails) => void;
}

const ClientList: React.FC<Props> = ({ clients, selectedCode, onSelect }) => {
  return (
    <div className="w-[45%] border rounded shadow">
      {/* 등록 버튼 */}
      <div className="flex justify-end p-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">등록</button>
      </div>

      {/* 테이블 헤더 */}
      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="w-12">No</th>
            <th className="w-12">✔</th>
            <th className="w-24">코드</th>
            <th>거래처명</th>
            <th className="w-32">등록번호</th>
            <th className="w-20">유형</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={client.code}
              onClick={() => onSelect(client)}
              className={`cursor-pointer hover:bg-gray-100 text-center ${
                client.code === selectedCode ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <td>{clients.length - index}</td>
              <td>
                <input type="checkbox" className="cursor-pointer" />
              </td>
              <td>{client.code}</td>
              <td className="text-left pl-2">{client.company?.printable_company_name}</td>
              <td>{formatBRN(client.brn)}</td>
              <td>{client.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 사업자번호 하이픈 자동처리
const formatBRN = (brn: string) => brn.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");

export default ClientList;
