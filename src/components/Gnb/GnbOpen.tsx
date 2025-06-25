import React, { useState } from 'react';
import { TreeNode } from '../../types/tree';

interface GnbOpenProps { //props 정의 
  data: TreeNode[];       // data : 메뉴 데이터 (트리 구조)
  onToggle: () => void;   // onToggle :닫기 버튼 눌렀을 때 실행되는 함수
  selectedId: number | null; // selectedId :현재 선택된 하위 메뉴의 ID
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>; //setSelectedId: 선택된 ID를 바꾸는 함수
}

interface IconInfo { // 각 아이콘의 이미지 경로와 크기를 담기 위한 타입
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
  const [openMenus, setOpenMenus] = useState<number[]>([]); // 어떤 1차 메뉴들이 열려 있는지를 저장하는 상태 


  // 이미 열려 있으면 닫고 (filter) 아니면 새로 열기 (push)
  const toggleMenu = (id: number) => {
    setOpenMenus((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };


  // title에 따라 다른 이미지 경로와 크기 리턴
  const getIconInfo = (title: string): IconInfo => {
    switch (title) {
      case '전표입력':
        return { src: process.env.PUBLIC_URL +'/File_dock_light.png', width: 23, height: 23 };
      case '기초정보등록':
        return { src: process.env.PUBLIC_URL +'/Subtract.png', width: 22, height: 22 };
      case '장부관리':
        return { src: process.env.PUBLIC_URL +'/Book_light.png', width: 23, height: 23 };
      case '전기분개제표등':
        return { src: process.env.PUBLIC_URL +'/Folder_file_alt_light.png', width: 24, height: 24 };
      case '결산 및 재무제표':
        return { src: process.env.PUBLIC_URL +'/Rectangle 25.png', width: 22, height: 22 };
      case '세무포탈(베스트빌)':
        return { src: process.env.PUBLIC_URL +'/desktop_light.png', width: 22, height: 22 };
      case '고정자산 및 감가상각':
        return { src: process.env.PUBLIC_URL +'/File_dock_light.png', width: 24, height: 24 };
      case '세무대리':
        return { src: process.env.PUBLIC_URL +'/User_cicrle_light.png', width: 24, height: 24 };
      default:
        return { src: process.env.PUBLIC_URL +'/File_dock_light.png', width: 24, height: 24 };
    }
  };

  return (
    <aside className="w-[280px] h-[2500px] bg-black text-white">
      {/* 헤더 */}
      <div className="flex w-52 justify-between items-center mx-auto pt-2 pb-2 px-2 h-16">
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
        {/* data는 json으로 전달된 메뉴 목록 map()으로 각 메뉴 데이터를 하나씩 꺼내서 <li>에 렌더링 */}
        {data.map((item) => {
          const { src, width, height } = getIconInfo(item.title); //아이콘 정보
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
                {/* item.children이 있는 경우에만 화살표 아이콘 표시
                메뉴가 열려 있을 때 회전 (상하 뒤집힘)  */}
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
              {/* 하위 메뉴가 있고, 현재 메뉴가 열려있을 때만 렌더링 */}
              {item.children && openMenus.includes(item.id) && (
                <ul className="mt-2 ml-6 space-y-1">
                  {item.children.map((child) => (
                    <li
                      key={child.id}
                      onClick={() => setSelectedId(child.id)} //클릭시 setSelectedId(child.id) 실행 선택된 메뉴 스타일 변경
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