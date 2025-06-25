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
      <div className="flex justify-center items-center w-[90%] gap-6">
        <div className="flex justify-center items-center w-[300px] gap-2">
          <img src={process.env.PUBLIC_URL + '/1F4BB_Laptop 1'} alt="아이콘" className="w-12 h-12" />
          <h1 className="text-lg noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] ">거래처 등록</h1>
        </div>
        <div className="flex justify-center items-center w-[300px] gap-2">
          <img src="" alt="아이콘" className="w-6 h-6" />
          <h1 className="text-lg font-semibold">마이페이지</h1>
        </div>
        <div className="flex justify-center items-center w-[300px] gap-2">
          <img src="" alt="아이콘" className="w-6 h-6" />
          <h1 className="text-lg font-semibold">로그아웃</h1>
        </div>
      </div>

      {/* 검색 영역 */}
      <div className="flex justify-center items-center w-[90%] gap-4">
        <select className="border p-2 rounded">
          <option>전체</option>
        </select>
        <input type="text" placeholder="검색어를 입력해주세요" className="border p-2 rounded w-64" />
        <button className="bg-black text-white px-4 py-2 rounded">검색</button>
      </div>

      {/* 거래처 목록 + 상세/수정 패널 */}
      <div className="w-[90%] flex gap-4">
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
