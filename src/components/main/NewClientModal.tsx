// src/components/main/NewClientModal.tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { ClientWithCompanyDetails, Company } from "../../types/information";

// — 포맷팅 함수들 —
const formatBRN = (v: string) => {
    const d = v.replace(/\D/g, "");
    // 3-2-remaining
    return d.replace(
        /^(\d{0,3})(\d{0,2})(\d{0,5})/,
        (_m, p1, p2, p3) =>
            p2
                ? p3
                    ? `${p1}-${p2}-${p3}`
                    : `${p1}-${p2}`
                : p1
    );
};

const formatRRN = (v: string) => {
    const d = v.replace(/\D/g, "");
    return d.replace(/^(\d{0,6})(\d{0,7})/, (_m, p1, p2) =>
        p2 ? `${p1}-${p2}` : p1
    );
};

const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, "");
    return d.replace(
        /^(02|0[3-9]\d?)(\d{0,4})(\d{0,4})/,
        (_m, p1, p2, p3) =>
            p2 ? (p3 ? `${p1}-${p2}-${p3}` : `${p1}-${p2}`) : p1
    );
};
const formatAccountNumber = (v: string): string => {
  // 숫자만 남기고
  const digits = v.replace(/\D/g, "");
  // 4자리마다 하이픈
  return digits.replace(/(\d{4})(?=\d)/g, "$1-");
};

const formatCurrency = (v: string) => {
    const d = v.replace(/\D/g, "");
    const n = parseInt(d || "0", 10);
    return n.toLocaleString("ko-KR");
};
// ————————————————

interface NewClientModalProps {
    onClose: () => void;
    onSave: (client: ClientWithCompanyDetails) => void;
}

const NewClientModal: React.FC<NewClientModalProps> = ({ onClose, onSave }) => {
    const empty: Partial<Company> = {
        brn: "",
        resident_registration_number: "",
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
        is_active: false,
        resident_type: false,
    };
    const [c, setC] = useState<Partial<Company>>(empty);
    const [brnStatus, setBrnStatus] = useState<string | null>(null);
    const [brnError, setBrnError] = useState(false);

      // BusinessStatusModal 상태
  const [isStatusOpen, setIsStatusOpen] = useState(false);

    /** 
     * 10자리 숫자만 채워지면 무조건 정상 처리 
     */
    const lookupBRN = () => {
        const raw = c.brn?.replace(/\D/g, "") || "";
        if (raw.length === 10) {
            setBrnStatus("정상");
            setBrnError(false);
        } else {
            setBrnStatus(null);
            setBrnError(true);
        }
    };

    const callPostcode = () => {
        new (window as any).daum.Postcode({
            oncomplete: (data: any) => {
                setC((prev) => ({
                    ...prev,
                    zipcode: data.zonecode,
                    address: data.address,
                }));
            },
        }).open();
    };
      // 저장 가능: brn 세팅 + 주민번호 입력
  const canSave = !!c.brn && !!c.resident_registration_number;

    // 저장 가능: 사업자 상태 조회 성공 + 주민번호 입력
    // const canSave = !!brnStatus && !!c.resident_registration_number;

    return ReactDOM.createPortal(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded shadow p-6">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">거래처 신규등록</h2>
                    <button onClick={onClose}>
                        <img
                            src={process.env.PUBLIC_URL + "/ic_close_b.png"}
                            alt="닫기"
                            className="w-6 h-6"
                        />
                    </button>
                </div>

                <table className="w-full table-fixed border-collapse text-sm">
                    <tbody>
                        {/* 사업자등록번호 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                사업자등록번호<span className="text-red-600">*</span>
                            </td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={c.brn || ""}
                                        onChange={(e) =>
                                            setC((p) => ({ ...p, brn: formatBRN(e.target.value) }))
                                        }
                                        className="flex-1 border px-2 py-1 rounded"
                                        placeholder="000-00-00000"
                                    />
                                    <button
                                        className="px-4 py-1 border rounded hover:bg-black hover:text-white"
                                        onClick={() => setIsStatusOpen(true)}
                                        // onClick={lookupBRN}
                                    >
                                        사업자등록상태 조회
                                    </button>
                                </div>
                                {brnStatus && (
                                    <div className="mt-2 text-gray-700">
                                        • {c.brn} – {brnStatus}
                                    </div>
                                )}
                                {brnError && (
                                    <div className="mt-2 text-red-600">조회 실패 (10자리만 입력)</div>
                                )}
                            </td>
                        </tr>

                        {/* 주민등록번호 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                주민등록번호<span className="text-red-600">*</span>
                            </td>
                            <td className="border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={14}
                                    value={c.resident_registration_number || ""}
                                    onChange={(e) =>
                                        setC((p) => ({
                                            ...p,
                                            resident_registration_number: formatRRN(e.target.value),
                                        }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="000101-1234567"
                                />
                            </td>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                주민기재분<span className="text-red-600">*</span>
                            </td>
                            <td className="border px-2 py-2">
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        checked={c.resident_type === false}
                                        onChange={() =>
                                            setC((p) => ({ ...p, resident_type: false }))
                                        }
                                    />{" "}
                                    부
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        checked={c.resident_type === true}
                                        onChange={() =>
                                            setC((p) => ({ ...p, resident_type: true }))
                                        }
                                    />{" "}
                                    여
                                </label>
                            </td>
                        </tr>

                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">대표자 성명<span className="text-red-600">*</span></td>
                            <td className=" noto-sans-kr-normalborder px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={14}
                                    value={c.ceo_name || ""}
                                    onChange={(e) =>
                                        setC((p) => ({
                                            ...p,
                                            ceo_name: e.target.value,
                                        }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] border px-2 py-2 font-semibold bg-gray-50">총 사업장 번호<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <input
                                    type="number"
                                    //  값이 없으면 빈 문자열, 있으면 숫자를 보여줍니다
                                    value={c.sub_business_number ?? ""}
                                    onChange={e =>
                                        setC(prev => ({
                                            ...prev,
                                            // valueAsNumber 가 NaN 이면 0 으로 대체
                                            sub_business_number: Number.isNaN(e.target.valueAsNumber)
                                                ? 0
                                                : e.target.valueAsNumber
                                        }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="총 사업장 번호"
                                />
                            </td>
                        </tr>

                         <tr>
                             <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">업종<span className="text-red-600">*</span></td>
                             <td className="noto-sans-kr-normal border px-2 py-2">
                                 <input
                                    type="text"
                                    maxLength={14}
                                    value={c.business_type || ""}
                                    onChange={(e) =>
                                        setC((p) => ({
                                            ...p,
                                            business_type: e.target.value,
                                        }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] border px-2 py-2 font-semibold bg-gray-50">종목<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                               <input
                                    type="text"
                                    maxLength={14}
                                    value={c.item || ""}
                                    onChange={(e) =>
                                        setC((p) => ({
                                            ...p,
                                            item: e.target.value,
                                        }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                        </tr>

                        {/* 주소 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                주소<span className="text-red-600">*</span>
                            </td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={c.zipcode || ""}
                                        readOnly
                                        className="w-1/4 border px-2 py-1 rounded"
                                    />
                                    <button
                                        className="px-3 py-1 border rounded hover:bg-black hover:text-white"
                                        onClick={callPostcode}
                                    >
                                        우편번호 조회
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={c.address || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, address: e.target.value }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="상세 주소"
                                />
                            </td>
                        </tr>

                        {/* 연락처 / 팩스 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                연락처
                            </td>
                            <td className="border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={c.phone || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                            </td>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                팩스번호
                            </td>
                            <td className="border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={c.fax || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, fax: formatPhone(e.target.value) }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                            </td>
                        </tr>

                         <tr>
                             <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] noto-sans-kr-superbold  bg-gray-50 border px-2 py-2 font-semibold text-[#777]">담당(부서)원</td>
                             <td className="noto-sans-kr-normal border px-2 py-2" colSpan={3}>
                                 <div className="flex items-center gap-2 mb-2">
                                     <span className="w-24">부서명</span>
                                      <input
                                    type="text"
                                    maxLength={13}
                                    value={c.department || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, department: e.target.value }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />

                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-24">담장자</span>
                                    <input
                                    type="text"
                                    maxLength={13}
                                    value={c.manager || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, manager: e.target.value }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                                </div>
                            </td>
                        </tr>
                        <tr>
                             <td className="noto-sans-kr-superbold  noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">인쇄할거래처명</td>
                             <td className="noto-sans-kr-normal border px-2 py-2" colSpan={3}>

                                  <input
                                    type="text"
                                    maxLength={13}
                                    value={c.printable_company_name || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, printable_company_name: e.target.value }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                            </td>
                        </tr>

                        {/* 보증금 / 한도금액 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                담보설정액
                            </td>
                            <td className="border px-2 py-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formatCurrency(c.guarantee_amount || "")}
                                        onChange={(e) =>
                                            setC((p) => ({
                                                ...p,
                                                guarantee_amount: e.target.value.replace(/,/g, ""),
                                            }))
                                        }
                                        className="w-full border px-2 py-1 rounded"
                                    />
                                    <span>원</span>
                                </div>
                            </td>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                여신한도액
                            </td>
                            <td className="border px-2 py-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={formatCurrency(c.credit_limit || "")}
                                        onChange={(e) =>
                                            setC((p) => ({
                                                ...p,
                                                credit_limit: e.target.value.replace(/,/g, ""),
                                            }))
                                        }
                                        className="w-full border px-2 py-1 rounded"
                                    />
                                    <span>원</span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                             <td className="noto-sans-kr-superbold  leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">입금 계좌 번호</td>
                             <td className="noto-sans-kr-normal border px-2 py-2 noto-sans-kr-normal text-black " colSpan={3}>

                                 <div className="flex items-center gap-2 mb-2">
                                     <label className="w-20 shrink-0">은행</label>
                                     <input
                                    type="text"
                                    maxLength={13}
                                    value={c.bank || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, bank: e.target.value }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                                </div>


                                <div className="flex items-center gap-8">

                                    <div className="flex items-center gap-2">
                                        <label className="w-20 shrink-0">예금주</label>
                                        <input
                                    type="text"
                                    maxLength={13}
                                    value={c.account_holder || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, account_holder: e.target.value }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                                    </div>


                                    <div className="flex items-center gap-2">
                                        <label className="w-20 shrink-0">계좌번호</label>
                                       <input
                                    type="text"
                                    maxLength={13}
                                    value={c.account_number || ""}
                                    onChange={(e) =>
                                        setC((p) => ({ ...p, account_number: formatAccountNumber(e.target.value) }))
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        {/* 계약일 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                거래처 시작(종료)일
                            </td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <div className="flex items-center gap-4">
                                    <span>시작일</span>
                                    <DatePicker
                                        selected={c.contract_start ? new Date(c.contract_start) : null}
                                        onChange={(d) =>
                                            d &&
                                            setC((p) => ({
                                                ...p,
                                                contract_start: d.toISOString().slice(0, 10),
                                            }))
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        locale={ko}
                                        className="border px-2 py-1 rounded w-[150px]"
                                        placeholderText="YYYY-MM-DD"
                                    />
                                    <span>~ 종료일</span>
                                    <DatePicker
                                        selected={c.contract_end ? new Date(c.contract_end) : null}
                                        onChange={(d) =>
                                            d &&
                                            setC((p) => ({
                                                ...p,
                                                contract_end: d.toISOString().slice(0, 10),
                                            }))
                                        }
                                        dateFormat="yyyy-MM-dd"
                                        locale={ko}
                                        className="border px-2 py-1 rounded w-[150px]"
                                        placeholderText="YYYY-MM-DD"
                                    />
                                </div>
                            </td>
                        </tr>

                        {/* 비고 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                비고
                            </td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <textarea
                                    className="w-full border px-2 py-1 rounded"
                                    rows={2}
                                    value={c.note || ""}
                                    onChange={(e) => setC((p) => ({ ...p, note: e.target.value }))}
                                />
                            </td>
                        </tr>

                        {/* 사용여부 */}
                        <tr>
                            <td className="bg-gray-50 border px-2 py-2 font-semibold text-[#777]">
                                사용여부
                            </td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <label className="mr-4">
                                    <input
                                        type="radio"
                                        checked={c.is_active === false}
                                        onChange={() => setC((p) => ({ ...p, is_active: false }))}
                                    />{" "}
                                    부
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        checked={c.is_active === true}
                                        onChange={() => setC((p) => ({ ...p, is_active: true }))}
                                    />{" "}
                                    여
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border rounded hover:bg-black hover:text-white"
                    >
                        취소
                    </button>
                    <button
                        disabled={!canSave}
                        onClick={() => {
                            if (!canSave) return;
                            const newClient: ClientWithCompanyDetails = {
                                code: Date.now().toString(),
                                name: c.printable_company_name || "",
                                brn: (c.brn || "").replace(/\D/g, ""),
                                type: c.business_type || "",
                                company: c as Company,
                            };
                            onSave(newClient);
                            onClose();
                        }}
                        className={`px-6 py-2 rounded ${canSave
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }`}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
        {/* 사업자등록상태 조회용 모달 */}
      {isStatusOpen && (
        <BusinessStatusModal
          onClose={() => setIsStatusOpen(false)}
          onConfirm={(foundBrn) => {
            // 모달에서 “확인” 눌렀을 때 메인 BRN에 반영
            setC((p) => ({ ...p, brn: formatBRN(foundBrn) }));
            setIsStatusOpen(false);
          }}
        />
      )}
    </>,
    document.body

  );
};

interface BusinessStatusModalProps {
  onClose: () => void;
  onConfirm: (brn: string) => void;
}


const BusinessStatusModal: React.FC<BusinessStatusModalProps> = ({ onClose, onConfirm }) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const doLookup = async () => {
    setError(false);
    setStatus(null);
    try {
      const data: { brn: string; status: string }[] = (await import("../../data/brn.json")).default;
      const raw = input.replace(/\D/g, "");
      const found = data.find((x) => x.brn === raw);
      if (found) setStatus(found.status);
      else setError(true);
    } catch {
      setError(true);
    }
  };

  const handleClose = () => {
    setInput("");
    setError(false);
    setStatus(null);
    onClose();
  };

  const handleConfirm = () => {
    if (status) onConfirm(input.replace(/\D/g, ""));
    setInput("");
    setStatus(null);
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[60]">
        <div className="bg-white w-[400px] rounded shadow p-6">
          <h3 className="text-lg font-semibold mb-4">사업자등록상태 조회</h3>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border px-2 py-1 rounded mb-3"
            placeholder="사업자 등록번호 입력"
          />
          <button onClick={doLookup} className="w-full bg-black text-white px-3 py-1 rounded mb-4">
            조회
          </button>
          {status && (
            <div className="mb-4 p-3 bg-gray-100 rounded">
              <p>사업자등록번호: {input}</p>
              <p>등록상태: {status}</p>
            </div>
          )}
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded">조회 실패</div>}
          <div className="flex justify-end gap-2">
            <button onClick={handleClose} className="px-4 py-1 border rounded hover:bg-gray-200">
              초기화
            </button>
            {status && (
              <button onClick={handleConfirm} className="px-4 py-1 bg-black text-white rounded">
                확인
              </button>
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};


export default NewClientModal;


