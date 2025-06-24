import React from 'react';
import {TreeNode} from '../../types/tree';

interface GnbOpenProps {
  data: TreeNode[];
  onToggle: () => void;
  selectedId: number | null; // ← 여기 수정
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>; // ← 여기도 수정
}

const  GnbOpen: React.FC<GnbOpenProps> = ({ data, onToggle, selectedId, setSelectedId }) => {
  return (
    <aside className='w-[280px] h-screen bg-black text-white'>
      <button onClick={onToggle}>닫기</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            {item.children && (
              <ul>
                {item.children.map((child) => (
                  <li key={child.id}>{child.title}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default GnbOpen