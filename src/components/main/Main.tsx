import React, { useEffect, useState } from "react";
import { Client, ClientWithCompanyDetails } from "../../types/information";
import ViewClient from "./ViewClient";
import EditClient from "./EditClient";
import ClientList from "./ClientList";
import clientsData from "../../data/clients.json";
import companiesData from "../../data/companies.json";

const Main: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [clientsWithDetails, setClientsWithDetails] = useState<ClientWithCompanyDetails[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientWithCompanyDetails | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // 조회/수정 화면 전환용 상태

  useEffect(() => {
    const enrichedClients = clients
      .map((client) => {
        const company = companiesData.find((c) => c.brn === client.brn);
        if (!company) return null;
        return {
          ...client,
          company,
        };
      })
      .filter((c): c is ClientWithCompanyDetails => c !== null)
      .sort((a, b) => a.code.localeCompare(b.code)); // ✅ 코드 기준 오름차순 정렬

    setClientsWithDetails(enrichedClients);

    if (!selectedClient && enrichedClients.length > 0) {
      setSelectedClient(enrichedClients[0]);
    }
  }, [clients]);

  const handleSelectClient = (client: ClientWithCompanyDetails) => {
    setSelectedClient(client);
    setIsEditMode(false);
  };

  const handleEditClient = () => setIsEditMode(true);
  const handleCancelEdit = () => setIsEditMode(false);

  const handleSaveEdit = (updatedClient: ClientWithCompanyDetails) => {
    const updatedClients = clientsWithDetails.map((c) =>
      c.code === updatedClient.code ? updatedClient : c
    );
    setClientsWithDetails(updatedClients);
    setSelectedClient(updatedClient);
    setIsEditMode(false);
  };

  return (
    <div className="main-container flex flex-col items-center gap-6 w-full">
      {/* 상단 메뉴 */}
      <div className="ml-14 flex justify-between items-center w-[90%] gap-6 mt-6">
        <div className="flex justify-between items-center max-w-[140px] w-[140px]">
          <img src={process.env.PUBLIC_URL + '/1F4BB_Laptop 1.png'} alt="아이콘" className="w-12 h-12" />
          <h1 className="text-[17px] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] ">거래처 등록</h1>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="cursor-pointer flex justify-between items-center max-w-[90px] w-[90px]">
            <img src={process.env.PUBLIC_URL + '/ic_mypage.png'} alt="아이콘" className="w-6 h-6" />
            <h1 className="noto-sans-kr-semibold leading-[150%] tracking-[-0.5px] text-[14px] font-semibold text-[#777777]">마이페이지</h1>
          </div>
          <div className="cursor-pointer flex justify-between items-center max-w-[80px] w-[80px]">
            <img src={process.env.PUBLIC_URL + '/Union.png'} alt="아이콘" className="w-6 h-6" />
            <h1 className="noto-sans-kr-semibold leading-[150%] tracking-[-0.5px] text-[14px] font-semibold text-[#777777]">로그아웃</h1>
          </div>
        </div>
      </div>

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
            src="/search.png"
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
        <button className="bg-black text-white px-4 py-2 rounded text-sm whitespace-nowrap">
          검색
        </button>
      </div>

      {/* 거래처 목록 + 상세/수정 패널 */}
      <div className="ml-14 w-[90%] flex gap-4">
        <ClientList
          clients={clientsWithDetails}
          selectedCode={selectedClient?.code || ""}
          onSelect={handleSelectClient}
        />
        <div className="flex-1 border p-4 bg-white rounded shadow">
          {selectedClient && selectedClient.company ? (
            isEditMode ? (
              <EditClient
                client={selectedClient}
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
              />
            ) : (
              <ViewClient
                client={selectedClient}
                onEdit={handleEditClient}
              />
            )
          ) : (
            <div className="text-gray-500">선택된 거래처가 없거나 회사 정보가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
