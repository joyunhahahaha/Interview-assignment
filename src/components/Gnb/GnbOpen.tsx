import React, { useState } from 'react';
import { TreeNode } from '../../types/tree';

interface GnbOpenProps {
  data: TreeNode[];
  onToggle: () => void;
  selectedId: number | null;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}

interface IconInfo {
  src: string;
  width: number;
  height: number;
}

const GnbOpen: React.FC<GnbOpenProps> = ({
  data,
  onToggle,
  selectedId,
  setSelectedId,
}) => {
  const [openMenus, setOpenMenus] = useState<number[]>([]);

  const toggleMenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const getIconInfo = (title: string): IconInfo => {
    switch (title) {
      case '전표입력':
        return { src: '/File_dock_light.png', width: 23, height: 23 };
      case '기초정보등록':
        return { src: '/Subtract.png', width: 22, height: 22 };
      case '장부관리':
        return { src: '/Book_light.png', width: 23, height: 23 };
      case '전기분개제표등':
        return { src: '/Folder_file_alt_light.png', width: 24, height: 24 };
      case '결산 및 재무제표':
        return { src: '/Rectangle 25.png', width: 22, height: 22 };
      case '세무포탈(베스트빌)':
        return { src: '/desktop_light.png', width: 22, height: 22 };
      case '고정자산 및 감가상각':
        return { src: '/File_dock_light.png', width: 24, height: 24 };
      case '세무대리':
        return { src: '/User_cicrle_light.png', width: 24, height: 24 };
      default:
        return { src: '/File_dock_light.png', width: 24, height: 24 };
    }
  };

  return (
    <aside className="w-[280px] h-screen bg-black text-white">
      {/* 헤더 */}
      <div className="flex w-60 justify-between items-center mx-auto pt-2 pb-2 px-1 h-16">
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

      {/* 구분선 */}
      <div className="w-full h-[6px] bg-white bg-opacity-10" />

      {/* 메뉴 리스트 */}
      <ul>
        {data.map((item) => {
          const { src, width, height } = getIconInfo(item.title);
          return (
            <li key={item.id} className="px-6 py-3">
              {/* 1차 메뉴 */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleMenu(item.id)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={process.env.PUBLIC_URL + src}
                    alt="icon"
                    style={{ width, height }}
                  />
                  <span className="text-[18px] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px]">
                    {item.title}
                  </span>
                </div>
                {item.children && (
                  <img
                    src={process.env.PUBLIC_URL + '/Vector 12 (Stroke).png'}
                    alt="화살표"
                    className={`w-4 h-3 transition-transform duration-300 ${
                      openMenus.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>

              {/* 2차 메뉴 (토글) */}
              {item.children && openMenus.includes(item.id) && (
                <ul className="mt-2 ml-6 space-y-1">
                  {item.children.map((child) => (
                    <li
                      key={child.id}
                      onClick={() => setSelectedId(child.id)}
                      className={`noto-sans-kr-normal text-[14px] px-2 py-1 rounded cursor-pointer transition ${
                        selectedId === child.id
                          ? 'bg-white text-black font-bold'
                          : 'hover:bg-white hover:text-black'
                      }`}
                    >
                      {child.title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default GnbOpen;