// components/main/ClientList.tsx
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
      <table className="w-full table-fixed text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="w-12">No</th>
            <th className="w-24">코드</th>
            <th>거래처명</th>
            <th>등록번호</th>
            <th>유형</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr
              key={client.code}
              onClick={() => onSelect(client)}
              className={`cursor-pointer hover:bg-gray-100 ${
                client.code === selectedCode ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <td className="text-center">{clients.length - index}</td>
              <td className="text-center">{client.code}</td>
              <td>{client.company?.printable_company_name}</td>
              <td className="text-center">{formatBRN(client.brn)}</td>
              <td className="text-center">{client.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 사업자번호 하이픈 자동처리
const formatBRN = (brn: string) => brn.replace(/^(\\d{3})(\\d{2})(\\d{5})$/, "$1-$2-$3");

export default ClientList;