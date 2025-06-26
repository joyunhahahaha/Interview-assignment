import React, { useState } from "react";
import ReactDOM from "react-dom"; // ✅ 추가
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import brnData from "../../data/brn.json";
import { ClientWithCompanyDetails, Company } from "../../types/information"; // ✅ 추가

interface NewClientModalProps {
    onClose: () => void;
    onSave: (client: ClientWithCompanyDetails) => void;
}

const NewClientModal: React.FC<NewClientModalProps> = ({ onClose, onSave }) => {
    const emptyCompany: Partial<Company> = {
        brn: "",
        resident_registration_number: "",
        ceo_name: "",
        sub_business_number: 0, // ✅ number 타입으로 맞춤
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
    const [company, setCompany] = useState<Partial<Company>>(emptyCompany);
    const [brnStatus, setBrnStatus] = useState<string | null>(null);
    const [brnError, setBrnError] = useState(false);

    const handleChange = <K extends keyof Company>(k: K, v: string) => {
        let value = v;
        if (["guarantee_amount", "credit_limit", "phone", "fax", "resident_registration_number"].includes(k)) {
            value = v.replace(/\D/g, "");
        }
        setCompany(prev => ({ ...prev, [k]: value }));
    };

    const lookupBRN = () => {
        const raw = company.brn?.replace(/\D/g, "");
        if (!raw) return;
        const found = (brnData as any[]).find(x => x.brn === raw);
        setBrnStatus(found ? found.status : null);
        setBrnError(!found);
    };

    const callPostcode = () => {
        new (window as any).daum.Postcode({
            oncomplete: (data: any) => {
                setCompany(prev => ({
                    ...prev,
                    zipcode: data.zonecode,
                    address: data.address,
                }));
            },
        }).open();
    };

    const canSave = !!company.brn && !!company.resident_registration_number;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded shadow p-6">
                <div className="flex justify-center w-full px-2 py-2 relative mb-12">
                    <h2 className="absolute left-0 text-xl mb-4 noto-sans-kr-superbold text-[18px] leading-[150%] tracking-[-0.5px]">거래처 신규등록</h2>
                    <button onClick={() => { onClose(); }} className="absolute right-0 flex items-center">
                        <img className="w-6 h-6" src={process.env.PUBLIC_URL + '/ic_close_b.png'} alt="닫기" />
                    </button>
                </div>
                <table className="w-full table-fixed border-collapse text-sm">
                    <tbody>
                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">사업자등록번호<span className="text-red-600">*</span></td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={company.brn || ""}
                                        onChange={e => handleChange("brn", e.target.value)}
                                        className="noto-sans-kr-normal w-full border px-2 py-1 rounded"
                                        placeholder="000-00-00000"
                                    />
                                    <button
                                        className="w-52 noto-sans-kr-superbold px-4 py-1 border rounded hover:bg-black hover:text-white"
                                        onClick={lookupBRN}
                                    >사업자등록상태 조회</button>
                                </div>
                                {brnStatus && (
                                    <div className="mt-2 text-gray-700">• {company.brn} – {brnStatus}</div>
                                )}
                                {brnError && (
                                    <div className="mt-2 text-red-600">조회 실패</div>
                                )}
                            </td>
                        </tr>
                        {/* 주민등록번호 */}
                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">주민등록번호<span className="text-red-600">*</span></td>
                            <td className="border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.resident_registration_number || ""}
                                    onChange={e => handleChange("resident_registration_number", e.target.value)}
                                    className="noto-sans-kr-normal w-full border px-2 py-1 rounded"
                                    placeholder="1234561234567"
                                />
                            </td>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] border px-2 py-2 font-semibold bg-gray-50">주민기재분<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <label className="mr-4">
                                    <input type="radio" checked={company.resident_type === false} onChange={() => setCompany(p => ({ ...p, resident_type: false }))} /> 부
                                </label>
                                <label>
                                    <input type="radio" checked={company.resident_type === true} onChange={() => setCompany(p => ({ ...p, resident_type: true }))} /> 여
                                </label>
                            </td>
                        </tr>

                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">대표자 성명<span className="text-red-600">*</span></td>
                            <td className=" noto-sans-kr-normalborder px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.ceo_name || ""}
                                    onChange={e => handleChange("ceo_name", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] border px-2 py-2 font-semibold bg-gray-50">총 사업장 번호<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.sub_business_number || ""}
                                    onChange={e => handleChange("sub_business_number", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">업종<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.business_type || ""}
                                    onChange={e => handleChange("business_type", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] border px-2 py-2 font-semibold bg-gray-50">종목<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.item || ""}
                                    onChange={e => handleChange("item", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                        </tr>
                        {/* 주소 */}
                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">주소<span className="text-red-600">*</span></td>
                            <td className="noto-sans-kr-normal border px-2 py-2" colSpan={3}>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={company.zipcode || ""}
                                        className="w-1/4 border px-2 py-1 rounded"
                                        readOnly
                                    />
                                    <button className="noto-sans-kr-superbold px-3 py-1 border rounded hover:bg-black hover:text-white" onClick={callPostcode}>우편번호 조회</button>
                                </div>
                                <input
                                    type="text"
                                    value={company.address || ""}
                                    onChange={e => handleChange("address", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder="상세 주소"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">연락처</td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.phone || ""}
                                    onChange={e => handleChange("phone", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
                                />
                            </td>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] border px-2 py-2 font-semibold bg-gray-50">팩스번호</td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <input
                                    type="text"
                                    maxLength={13}
                                    value={company.fax || ""}
                                    onChange={e => handleChange("fax", e.target.value)}
                                    className="w-full border px-2 py-1 rounded"
                                    placeholder=""
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
                                        value={company.department || ""}
                                        onChange={e => handleChange("department", e.target.value)}
                                        className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                                    />

                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-24">담장자</span>
                                    <input
                                        type="text"
                                        value={company.manager || ""}
                                        onChange={e => handleChange("manager", e.target.value)}
                                        className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                                    />
                                </div>
                            </td>
                        </tr>


                        <tr>
                            <td className="noto-sans-kr-superbold  noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">인쇄할거래처명</td>
                            <td className="noto-sans-kr-normal border px-2 py-2" colSpan={3}>

                                <input
                                    type="text"
                                    value={company.printable_company_name || ""}
                                    onChange={e => handleChange("printable_company_name", e.target.value)}
                                    className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="text-[#777] bg-gray-50 border px-2 py-2 font-semibold">담보설정액</td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <div className="flex items-center gap-2 ">
                                    <input
                                        type="text"
                                        maxLength={13}
                                        value={company.guarantee_amount || ""}
                                        onChange={e => handleChange("guarantee_amount", e.target.value)}
                                        className="w-full border px-2 py-1 rounded"
                                        placeholder=""
                                    />
                                    <span>원</span>
                                </div>
                            </td>
                            <td className="text-[#777] border px-2 py-2 font-semibold bg-gray-50">여신한도액</td>
                            <td className="noto-sans-kr-normal border px-2 py-2">
                                <div className="flex items-center gap-2 ">
                                    <input
                                        type="text"
                                        maxLength={13}
                                        value={company.account_holder || ""}
                                        onChange={e => handleChange("account_holder", e.target.value)}
                                        className="w-full border px-2 py-1 rounded"
                                        placeholder=""
                                    />
                                    <span>원</span>
                                </div>
                            </td>
                        </tr>

                        {/* 입금계좌 */}
                        <tr>
                            <td className="noto-sans-kr-superbold  leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">입금 계좌 번호</td>
                            <td className="noto-sans-kr-normal border px-2 py-2 noto-sans-kr-normal text-black " colSpan={3}>

                                <div className="flex items-center gap-2 mb-2">
                                    <label className="w-20 shrink-0">은행</label>
                                    <input
                                        type="text"
                                        value={company.bank || ""} onChange={e => handleChange("bank", e.target.value)}
                                        className="w-[200px] border px-2 py-1 rounded"
                                    />
                                </div>


                                <div className="flex items-center gap-8">

                                    <div className="flex items-center gap-2">
                                        <label className="w-20 shrink-0">예금주</label>
                                        <input
                                            type="text"
                                            value={company.account_holder || ""} onChange={e => handleChange("account_holder", e.target.value)}
                                            className="w-[200px] border px-2 py-1 rounded"
                                        />
                                    </div>


                                    <div className="flex items-center gap-2">
                                        <label className="w-20 shrink-0">계좌번호</label>
                                        <input
                                            type="text"
                                            value={company.account_number || ""} onChange={e => handleChange("account_number", e.target.value)}
                                            className="w-full border px-2 py-1 rounded"
                                        />
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td className="noto-sans-kr-superbold  leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">업체담당자이메일</td>
                            <td className="noto-sans-kr-normal border px-2 py-2" colSpan={3}>

                                <input
                                    type="text"
                                    value={company.email || ""}
                                    onChange={e => handleChange("email", e.target.value)}
                                    className="noto-sans-kr-normal text-black w-full border px-2 py-1 rounded"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td className="noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold text-[#777]">거래처 분류명</td>
                            <td className="noto-sans-kr-normal border px-2 py-2 noto-sans-kr-normal text-black" colSpan={3}>

                                <div className="flex items-center gap-2">

                                    <input
                                        type="text"
                                        value={company.category1 || ""}
                                        onChange={e => handleChange("category1", e.target.value)}
                                        className="w-full border px-2 py-1 rounded"
                                    />


                                    <input
                                        type="text"
                                        value={company.category2 || ""}
                                        onChange={e => handleChange("category2", e.target.value)}
                                        className="w-full border px-2 py-1 rounded"
                                    />

                                </div>
                            </td>
                        </tr>

                        {/* 계약일 */}
                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">거래처 시작(종료)일</td>
                            <td className="noto-sans-kr-normal border px-2 py-2" colSpan={3}>
                                <div className="flex gap-4 items-center">
                                    <span className="noto-sans-kr-superbold">시작일</span>
                                    <DatePicker
                                        selected={company.contract_start ? new Date(company.contract_start) : null}
                                        onChange={(d: Date | null) => d && setCompany(p => ({ ...p, contract_start: d.toISOString().slice(0, 10) }))}
                                        dateFormat="yyyy-MM-dd"
                                        locale={ko}
                                        className="border px-2 py-1 rounded w-[150px]"
                                        placeholderText="YYYY-MM-DD"
                                    />
                                    <span className="noto-sans-kr-superbold">~ 종료일</span>
                                    <DatePicker
                                        selected={company.contract_end ? new Date(company.contract_end) : null}
                                        onChange={(d: Date | null) => d && setCompany(p => ({ ...p, contract_end: d.toISOString().slice(0, 10) }))}
                                        dateFormat="yyyy-MM-dd"
                                        locale={ko}
                                        className="border px-2 py-1 rounded w-[150px]"
                                        placeholderText="YYYY-MM-DD"
                                    />
                                </div>
                            </td>
                        </tr>
                        {/* 비고 및 사용여부 */}
                        <tr>
                            <td className="text-[#777] noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] bg-gray-50 border px-2 py-2 font-semibold">비고</td>
                            <td className=" noto-sans-kr-normalborder px-2 py-2" colSpan={3}>
                                <textarea className="w-full border px-2 py-1 rounded" rows={2} value={company.note || ""} onChange={e => handleChange("note", e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-[#777] bg-gray-50 border px-2 py-2 font-semibold">사용여부</td>
                            <td className="border px-2 py-2" colSpan={3}>
                                <label className="mr-4">
                                    <input type="radio" checked={company.is_active === false} onChange={() => setCompany(p => ({ ...p, is_active: false }))} /> 부
                                </label>
                                <label>
                                    <input type="radio" checked={company.is_active === true} onChange={() => setCompany(p => ({ ...p, is_active: true }))} /> 여
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-center gap-2 mt-4 items-center">
                    <button onClick={() => { onClose(); /* 상태 초기화도 같이 원하시면 여기서 초기화 로직 추가 */ }} className="border-black border noto-sans-kr-superbold leading-[150%] tracking-[-0.5px] px-6 py-2 bg-white text-black rounded hover:bg-black hover:text-white">취소</button>
                    <button disabled={!canSave} onClick={() => {
                        if (canSave) {
                            const newClient: ClientWithCompanyDetails = {
                                code: Date.now().toString(),
                                brn: company.brn!.replace(/\D/g, ""),
                                name: company.printable_company_name || "", // ✅ 추가
                                type: company.business_type || "",
                                company: company as Company,
                            };
                            onSave(newClient);
                            onClose();
                        }
                    }} className={`noto-sans-kr-superbold leading-[150%] tracking-[-0.5px]  rounded  px-6 py-2 ${canSave ? "bg-black text-white" : "bg-gray-300 text-gray-600"} rounded`}>
                        저장
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default NewClientModal;