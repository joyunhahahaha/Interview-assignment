import React, { useEffect, useState } from 'react';
import { Client, ClientWithCompanyDetails } from "../../types/information";
import ViewClient from "./ViewClient";
import EditClient from "./EditClient";
import clientsData from "../../data/clients.json";
import companiesData from "../../data/companies.json";

const Main: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(clientsData);
  const [clientsWithDetails, setClientsWithDetails] = useState<ClientWithCompanyDetails[]>([]);
  const [selectedClient, setSelectedClient] = useState<ClientWithCompanyDetails | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const enrichedClients = clients.map((client) => {
      const company = companiesData.find((c) => c.brn === client.brn);
      return {
        ...client,
        company: company || {
          brn: "",
          resident_registration_number: "",
          resident_type: false,
          ceo_name: "",
          sub_business_number: 0,
          business_type: "",
          item: "",
          zipcode: "",
          address: "",
          phone: "",
          fax: "",
          department: "",
          manager: "",
          printable_company_name: "",
          guarantee_amount: "",
          credit_limit: "",
          bank: "",
          account_holder: "",
          account_number: "",
          email: "",
          category1: "",
          category2: "",
          contract_start: "",
          contract_end: "",
          note: "",
          is_active: true,
        },
      };
    });
    setClientsWithDetails(enrichedClients);
    if (enrichedClients.length > 0) {
      setSelectedClient(enrichedClients[0]);
    }
  }, [clients]);

  const handleEditClient = () => {
    setIsEditMode(true);
  };

  const handleSaveEdit = (updatedClient: ClientWithCompanyDetails) => {
    setClients((prev) =>
      prev.map((client) =>
        client.code === updatedClient.code ? updatedClient : client
      )
    );
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  return (
    <div className="main-container flex flex-col items-center gap-6">
      {/* 상단 메뉴 영역 */}
      <div className="flex justify-center items-center w-[90%] gap-6">
        <div className="flex justify-center items-center w-[300px] gap-2">
          <img src="" alt="아이콘" className="w-6 h-6" />
          <h1 className="text-lg font-semibold">거래처 등록</h1>
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
          <option>회사명</option>
          <option>사업자등록번호</option>
        </select>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="border p-2 rounded w-64"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          검색
        </button>
      </div>

      {/* 화면 전환 영역 */}
      <div className="w-full max-w-4xl mt-8">
        {selectedClient && !isEditMode && (
          <ViewClient client={selectedClient} onEdit={handleEditClient} />
        )}
        {selectedClient && isEditMode && (
          <EditClient
            client={selectedClient}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Main;