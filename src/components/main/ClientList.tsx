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


// import React from "react";
// import { ClientWithCompanyDetails } from "../../types/information";

// interface Props {
//   clients: ClientWithCompanyDetails[];
//   selectedCode: string;
//   onSelect: (client: ClientWithCompanyDetails) => void;
//   onNew: () => void; // ✅ 추가
// }

// const ClientList: React.FC<Props> = ({ clients, selectedCode, onSelect, onNew }) => {
//   return (
//  <div className="w-[45%] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px]">
//   {/* 등록 버튼 */}
//   <div className="flex justify-end mb-4">
//     <button onClick={onNew} className="px-6 py-2 bg-black text-white rounded">등록</button>
//   </div>

//   {/* 테이블 영역 */}
//   <div className="border rounded shadow bg-white max-h-[600px] overflow-y-scroll custom-scrollbar">
//     <table className="text-center w-full table-fixed text-sm border-collapse">
//       <thead className="bg-gray-100 sticky top-0 z-10 text-[#777777] noto-sans-kr-semibold">
//         <tr>
//           <th className="w-12 py-2 border border-gray-200">No</th>
//           <th className="w-12 py-2 border border-gray-200">✔</th>
//           <th className="w-24 py-2 border border-gray-200">코드</th>
//           <th className="py-2 border border-gray-200">거래처명</th>
//           <th className="w-32 py-2 border border-gray-200">등록번호</th>
//           <th className="w-20 py-2 border border-gray-200">유형</th>
//         </tr>
//       </thead>
//       <tbody>
//         {clients.map((client, index) => (
//           <tr
//             key={client.code}
//             onClick={() => onSelect(client)}
//             className={`noto-sans-kr-normal text-black text-center cursor-pointer hover:bg-gray-50 ${
//               client.code === selectedCode ? "bg-gray-200 font-semibold" : ""
//             }`}
//           >
//             <td className="text-center py-4 border border-gray-200">{clients.length - index}</td>
//             <td className="text-center py-4 border border-gray-200">
//               <input type="checkbox" className="cursor-pointer" />
//             </td>
//             <td className="text-center py-4 border border-gray-200">{client.code}</td>
//             <td className="text-center py-4 pl-2 border border-gray-200">
//               {client.company?.printable_company_name}
//             </td>
//             <td className="text-center py-4 border border-gray-200">{formatBRN(client.brn)}</td>
//             <td className="text-center py-4 border border-gray-200">{client.type}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>
//   );
// };

// // 사업자번호 하이픈 자동처리
// const formatBRN = (brn: string) => brn.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3");

// export default ClientList;
