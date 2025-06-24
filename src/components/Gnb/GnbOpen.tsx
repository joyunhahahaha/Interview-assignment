import React, { useState } from 'react';
import { TreeNode } from '../../types/tree';

interface GnbOpenProps {
  data: TreeNode[];
  onToggle: () => void;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}

const GnbOpen: React.FC<GnbOpenProps> = ({
  data,
  onToggle,
  selectedId,
  setSelectedId,
}) => {
  const [openMenus, setOpenMenus] = useState<number[]>([]); // 열린 메뉴 ID 목록

  const toggleMenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-[280px] h-screen bg-black text-white">
      <div className="flex w-60 justify-between items-center mx-auto pt-2 pb-2 px-2 h-16">
        <h1 className="text-white text-[24px] leading-[150%] tracking-[-0.5px] font-bold">
          전체 메뉴
        </h1>
        <button onClick={onToggle}>
          <img
            src={process.env.PUBLIC_URL + '/ic_close.png'}
            alt="닫기"
            className="w-6 h-6"
          />
        </button>
      </div>

      <div className="w-full h-[6px] bg-white bg-opacity-10" />

      <ul>
        {data.map((item) => (
          <li key={item.id} className="px-4 py-2">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleMenu(item.id)}>
              <div className="flex items-center gap-2">
                <img
                  src={process.env.PUBLIC_URL + '/File_dock_light.png'} // 나중에 item.title에 따라 다르게
                  alt="icon"
                  className="w-4 h-4"
                />
                <span>{item.title}</span>
              </div>
              {item.children && (
                <img
                  src={process.env.PUBLIC_URL + '/Vector 12 (Stroke).png'}
                  alt="화살표"
                  className={`w-3 h-3 transition-transform duration-300 ${
                    openMenus.includes(item.id) ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>

            {item.children && openMenus.includes(item.id) && (
              <ul className="mt-2 ml-6 space-y-1">
                {item.children.map((child) => (
                  <li
                    key={child.id}
                    onClick={() => setSelectedId(child.id)}
                    className={`px-2 py-1 rounded cursor-pointer hover:bg-white hover:text-black transition ${
                      selectedId === child.id ? 'bg-white text-black font-bold' : ''
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
    </aside>
  );
};

export default GnbOpen;