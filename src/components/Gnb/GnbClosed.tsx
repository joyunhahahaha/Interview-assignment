import React from 'react';
import { TreeNode } from '../../types/tree';

interface GnbClosedProps {
  data: TreeNode[];
  onToggle: () => void;
  selectedId: number | null;
}

const GnbClosed: React.FC<GnbClosedProps> = ({ data, onToggle, selectedId }) => {
  return (
    <aside className="w-[60px] h-screen bg-black text-white flex flex-col items-center">
      <button onClick={onToggle} className="my-4 text-sm">
        열기
      </button>

      <nav className="flex-1 w-full">
        <ul className="flex flex-col items-center">
          {data.map((item) => (
            <li
              key={item.id}
              className="relative group w-full flex justify-center py-4 hover:bg-gray-800"
            >
              {/* 아이콘 자리 (예시로 텍스트만) */}
              <span className="text-xs">{item.title[0]}</span>

              {/* Hover 시 우측에 Second-Depth 표시 */}
              {item.children && (
                <ul className="absolute left-full top-0 bg-white text-black p-2 shadow-lg hidden group-hover:block z-10 min-w-[160px]">
                  {item.children.map((child) => (
                    <li
                      key={child.id}
                      className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                        child.id === selectedId ? 'font-bold' : ''
                      }`}
                    >
                      {child.title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default GnbClosed;