import React from 'react';
import { TreeNode } from '../../types/tree';

interface GnbClosedProps {
  data: TreeNode[];
  onToggle: () => void;
  selectedId: number | null;
}

// GnbClosed는 GNB가 접힌 상태일 때 보여줄 UI data: 메뉴 데이터 (TreeNode[]) onToggle: GNB를 열기 위한 버튼 핸들러 selectedId: 현재 선택된 메뉴 ID
const GnbClosed: React.FC<GnbClosedProps> = ({ data, onToggle, selectedId }) => {
  // title에 따라 아이콘 이미지 경로 지정
  const getIconPath = (title: string): string => {
    switch (title) { 
      case '전표입력':
        return process.env.PUBLIC_URL +'/File_dock_light.png';
      case '기초정보등록':
        return process.env.PUBLIC_URL +'/Subtract.png';
      case '장부관리':
        return process.env.PUBLIC_URL +'/Book_light.png';
      case '전기분개제표등':
        return process.env.PUBLIC_URL +'/Folder_file_alt_light.png';
      case '결산 및 재무제표':
        return process.env.PUBLIC_URL +'/Form_light.png';
      case '세무포탈(베스트빌)':
        return process.env.PUBLIC_URL +'/desktop_light.png';
      case '고정자산 및 감가상각':
        return process.env.PUBLIC_URL +'/File_dock_light.png';
      case '세무대리':
        return process.env.PUBLIC_URL +'/User_cicrle_light.png';
      default:
        return process.env.PUBLIC_URL +'/File_dock_light.png';
    }
  };

  return (
    <aside className="z-50 absolute left-0 top-0 w-[60px] h-[2500px] bg-black text-white flex flex-col items-center">
      <button onClick={onToggle} className="my-4 text-sm">
        <img
          src={process.env.PUBLIC_URL + '/ic_drag.png'}
          alt="열기"
          className="w-6 h-6"
        />
      </button>

      <nav className="flex-1 w-full">
        <ul className="flex flex-col items-center">
          {data.map((item) => (
            <li // 각 메뉴 아이템 하나 group 하위 요소의 hover 동작을 컨트롤 하기 위해 사용
              key={item.id}
              className="relative group w-full flex justify-center py-4 hover:bg-gray-800"
            >
              {/* 메뉴명에 따라 지정된 아이콘 */}
              <img
                src={process.env.PUBLIC_URL + getIconPath(item.title)}
                alt={item.title}
                className="w-6 h-6"
              />

              {/* Hover 시 우측에 2차 메뉴 표시 */}
              {item.children && (
                <ul className="ml-4 rounded-[5px] absolute left-full top-0 bg-black text-white p-2 shadow-lg hidden group-hover:block z-10 min-w-[231px]">
                  <img className="w-3 h-5 relative right-4" src={process.env.PUBLIC_URL + '/Vector 513.png'}/> 
                  <li className="noto-sans-kr-superbold px-2 pb-6 text-white text-[18px]">{item.title}</li>
                  <div className='mb-2 w-[90%] h-[1.5px] bg-white mx-auto bg-opacity-30'></div>
                  {/* 자식 메뉴 리스트 반복  */}
                  {item.children.map((child) => (
                    <li
                      key={child.id}
                      className={`noto-sans-kr-superbold text-[14px] px-2 py-2 hover:bg-gray-100 cursor-pointer ${
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