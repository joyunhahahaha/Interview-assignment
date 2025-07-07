// src/components/main/ClientList.tsx
import React from "react";
import { ClientWithCompanyDetails } from "../../types/information";
// ClientWithCompanyDetails 타입: code, brn, name, type 필드에다가 company 정보까지 있는 객체

interface Props {
  clients: ClientWithCompanyDetails[]; //거래처 목록 배열
  selectedCode: string; // 현재 선택된 거래처의 code
  onSelect: (c: ClientWithCompanyDetails) => void; // 거래처 클릭 시 부모에 선택을 알려주는 함수
  onNew: () => void; // 등록 버튼 클릭 시 모달 열기 등 호출 할 함수
}

const ClientList: React.FC<Props> = ({ clients, selectedCode, onSelect, onNew }) => {
  // 사업자등록번호(숫자 10자리)를 "123-45-67890" 형태로 바꿔 주는 함수
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
            {/* clients 배열을 순회하면서 한 행씩 렌더링 */}
            {clients.map((c, i) => (
              <tr
                key={c.code} // React가 각 행을 구분할 고유 키
                onClick={() => onSelect(c)} // 행 클릭하면 해당 거래처 c 를 부모로 전달
                className={`cursor-pointer hover:bg-gray-50 ${
                  c.code === selectedCode ? "bg-gray-200 font-semibold" : ""   // 만약 이 행의 코드가 선택된 코드와 같다면, 진한 회색 배경·굵은 글씨
                }`}
              >
                <td className="py-4 border">{clients.length - i}</td> {/* 순번 : 맨 위가 가장 마지막 아이템이므로 (clients.length - i) */}
                <td className="py-4 border"><input type="checkbox" /></td>
                <td className="py-4 border">{c.code}</td>
                <td className="py-4 border">{c.company.printable_company_name}</td>
                <td className="py-4 border">{formatBRN(c.brn)}</td> {/* 사업자등록번호 : formatBRN으로 하이픈 추가 */}
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


