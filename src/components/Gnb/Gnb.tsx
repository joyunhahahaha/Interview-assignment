import { TreeNode } from '../../types/tree';
import React, { useState } from 'react';
import GnbOpen from './GnbOpen';
import GnbClosed from './GnbClosed';
import menuData from '../../data/tree.json'; // JSON 구조



const Gnb = () => {
  const [isOpen, setIsOpen] = useState(true);                 // GNB 열림/닫힘
   const [selectedId, setSelectedId] = useState<number | null>(null); // 현재 선택된 메뉴 항목의 ID를 저장하는 상태 (없으면 null)

  const handleToggle = () => setIsOpen(prev => !prev); // 열림 / 닫힘 상태를 토글하는 함수 버튼 클릭 시 실행
  
  return isOpen ? ( // isOpen이 true 면 열림 컴포넌트인 <GnbOpen />을렌더링 false면 닫힘 컴포넌트인 <GnbClosed />를 렌더링
    <GnbOpen
      data={menuData as TreeNode[]} //props data :메뉴 데이터(tree.json)   
      onToggle={handleToggle}       // onToggle :GNB 열기 / 닫기 버튼함수
      selectedId={selectedId}       // selectedId : 현재 선택된 메뉴 ID
      setSelectedId={setSelectedId} // 메뉴 항목 클릭 시 선택 ID를 바꿔주는 함수
    />
  ) : (
    <GnbClosed
      data={menuData as TreeNode[]}
      onToggle={handleToggle}
      selectedId={selectedId}
    />
  );
};

export default Gnb;

