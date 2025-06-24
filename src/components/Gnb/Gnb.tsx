import { TreeNode } from '../../types/tree';
import React, { useState } from 'react';
import GnbOpen from './GnbOpen';
import GnbClosed from './GnbClosed';
import menuData from '../../data/tree.json'; // JSON 구조



const Gnb = () => {
  const [isOpen, setIsOpen] = useState(true);                 // GNB 열림/닫힘
   const [selectedId, setSelectedId] = useState<number | null>(null); // 🔧 여기 수정

  const handleToggle = () => setIsOpen(prev => !prev);
  
  return isOpen ? (
    <GnbOpen
      data={menuData as TreeNode[]}
      onToggle={handleToggle}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
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

