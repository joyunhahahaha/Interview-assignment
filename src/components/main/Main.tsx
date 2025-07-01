// src/components/main/Main.tsx
import React, { useEffect, useState } from "react";
import { Client, ClientWithCompanyDetails } from "../../types/information";
import ViewClient from "./ViewClient";
import EditClient from "./EditClient";
import ClientList from "./ClientList";
import NewClientModal from "./NewClientModal";
import clientsData from "../../data/clients.json";
import companiesData from "../../data/companies.json";

const Main: React.FC = () => {
  // 1) 번들 JSON → ClientWithCompanyDetails[]
  const initial: ClientWithCompanyDetails[] = clientsData
    .map(c => {
      const company = companiesData.find(x => x.brn === c.brn);
      return company ? { ...c, company } : null;
    })
    .filter((x): x is ClientWithCompanyDetails => !!x)
    .sort((a, b) => a.code.localeCompare(b.code));

  // 2) state 초기화: localStorage 우선 → 없으면 initial
  const [clientsWithDetails, setClientsWithDetails] = useState<
    ClientWithCompanyDetails[]
  >(() => {
    const stored = localStorage.getItem("clientsWithDetails");
    return stored
      ? JSON.parse(stored)
      : initial;
  });

  const [selectedClient, setSelectedClient] = useState<ClientWithCompanyDetails | null>(
    clientsWithDetails[0] ?? null
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // 3) 목록이 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(
      "clientsWithDetails",
      JSON.stringify(clientsWithDetails)
    );
  }, [clientsWithDetails]);

  // 4) 리스트 클릭 → 상세로 선택
  const handleSelectClient = (c: ClientWithCompanyDetails) => {
    setSelectedClient(c);
    setIsEditMode(false);
  };
  const handleEdit = () => setIsEditMode(true);
  const handleCancel = () => setIsEditMode(false);

  // 5) 수정 저장
  const handleSaveEdit = (updated: ClientWithCompanyDetails) => {
    setClientsWithDetails(prev =>
      prev.map(x => (x.code === updated.code ? updated : x))
    );
    setSelectedClient(updated);
    setIsEditMode(false);
  };

  // 6) 신규 저장 (코드 자동 부여는 이전 예시 그대로)
  const handleSaveNew = (newClient: ClientWithCompanyDetails) => {
    const maxNum = clientsWithDetails
      .map(c => parseInt(c.code.slice(1), 10))
      .reduce((a, b) => Math.max(a, b), 0);
    const nextCode = `C${String(maxNum + 1).padStart(3, "0")}`;
    const clientWithCode = { ...newClient, code: nextCode };

    setClientsWithDetails(prev => [...prev, clientWithCode]);
    setSelectedClient(clientWithCode);
    setIsNewModalOpen(false);
  };

  return (
    <div className="main-container flex flex-col items-center gap-6 w-full">
      {/* 상단 메뉴 */}
      <div className="ml-14 flex justify-between items-center w-[90%] gap-6 mt-6">
        <div className="flex justify-between items-center max-w-[140px] w-[140px]">
          <img src={process.env.PUBLIC_URL + '/1F4BB_Laptop 1.png'} alt="아이콘" className="w-12 h-12" />
          <h1 className="text-[17px] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] ">거래처 등록</h1>
        </div>         <div className="flex justify-between items-center gap-4">           <div className="cursor-pointer flex justify-between items-center max-w-[90px] w-[90px]">             <img src={process.env.PUBLIC_URL + '/ic_mypage.png'} alt="아이콘" className="w-6 h-6" />             <h1 className="noto-sans-kr-semibold leading-[150%] tracking-[-0.5px] text-[14px] font-semibold text-[#777777]">마이페이지</h1>           </div>           <div className="cursor-pointer flex justify-between items-center max-w-[80px] w-[80px]">             <img src={process.env.PUBLIC_URL + '/Union.png'} alt="아이콘" className="w-6 h-6" />             <h1 className="noto-sans-kr-semibold leading-[150%] tracking-[-0.5px] text-[14px] font-semibold text-[#777777]">로그아웃</h1>           </div>         </div>       </div>

      {/* 검색 영역 */}
      <div className="ml-14 bg-white rounded-sm px-4 py-2 flex justify-between items-center w-[90%] border border-gray-300 gap-4">
        {/* 셀렉트박스 */}
        <select
          className="w-44 text-sm px-3 py-2 rounded border border-gray-300 "
        >
          <option>전체</option>
        </select>

        {/* 구분선 */}
        <div className="bg-[#f4f4f4] w-[1px] h-8" />

        {/* 검색 input */}
        <div className="relative w-full max-w-[64rem]">
          <img
            src={process.env.PUBLIC_URL + "/search.png"}
            alt="검색"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded text-sm"
          />
        </div>

        {/* 검색 버튼 */}
        <button className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-black text-white px-6 py-2 rounded text-sm whitespace-nowrap">
          검색
        </button>
      </div>

      <div className="ml-14 w-[90%] flex gap-4">
        <ClientList
          clients={clientsWithDetails}
          selectedCode={selectedClient?.code || ""}
          onSelect={handleSelectClient}
          onNew={() => setIsNewModalOpen(true)}
        />

        {isNewModalOpen && (
          <NewClientModal
            onClose={() => setIsNewModalOpen(false)}
            onSave={handleSaveNew}
          />
        )}

        <div className="flex-1">
          {selectedClient ? (
            isEditMode ? (
              <EditClient
                client={selectedClient}
                onCancel={handleCancel}
                onSave={handleSaveEdit}
              />
            ) : (
              <ViewClient client={selectedClient} onEdit={handleEdit} />
            )
          ) : (
            <div>선택된 거래처가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;


