"use client";

import Image from "next/image";
import { svgComplete } from "../components/svg-paths";
import imgProductThumb from "../img/product-thumb.png";

interface Props {
  onContinue: () => void;
}

function SvgIcon({ d, size = 20, color = "#888", viewBox = "0 0 24 24" }: { d: string; size?: number; color?: string; viewBox?: string }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none">
      <path d={d} fill={color} />
    </svg>
  );
}

const RELATED = [
  { name: "삼성 비스포크 냉장고 4도어", price: "2,590,000", color: "#fff0e8" },
  { name: "LG 오브제 세탁기 25kg", price: "1,290,000", color: "#f0f8e8" },
  { name: "다이슨 에어랩 멀티스타일러", price: "699,000", color: "#f5f0ff" },
  { name: "LG 퓨리케어 공기청정기", price: "490,000", color: "#f0f4ff" },
];

export default function PaymentCompletePage({ onContinue }: Props) {
  const orderNum = "HM202406300001";
  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="flex flex-col size-full bg-[#f5f6f7] font-['Pretendard',sans-serif] overflow-hidden">
      {/* 상태바 */}
      <div className="flex items-center justify-between px-3 h-[30px] shrink-0 bg-white">
        <span className="text-[13px] font-semibold text-[#1a1a1a]">9:27</span>
        <div className="flex items-center gap-1">
          {svgComplete.wifi && <SvgIcon d={svgComplete.wifi} size={18} viewBox="0 0 24 24" />}
          <div className="border border-[#1a1a1a] rounded-[3px] w-[22px] h-[12px] p-[1.5px]"><div className="bg-[#1a1a1a] rounded-[1.5px] h-full w-full"/></div>
        </div>
      </div>

      {/* 헤더 */}
      <div className="shrink-0 h-[44px] bg-white flex items-center justify-center border-b border-[#f0f0f0]">
        <span className="text-[16px] font-bold text-[#1a1a1a]">결제 완료</span>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* 완료 헤더 */}
        <div className="bg-white px-[20px] py-[24px] flex flex-col items-center gap-[12px] mb-[8px]">
          <div className="w-[72px] h-[72px] rounded-full bg-[#fff0f0] flex items-center justify-center">
            {svgComplete.package ? (
              <SvgIcon d={svgComplete.package} size={40} viewBox="0 0 48 48" color="#da231c" />
            ) : (
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="6" y="12" width="28" height="22" rx="2" stroke="#da231c" strokeWidth="2"/>
                <path d="M14 12V8C14 6.3 15.3 5 17 5H23C24.7 5 26 6.3 26 8V12" stroke="#da231c" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 21H26M14 26H22" stroke="#da231c" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </div>
          <div className="text-center">
            <p className="text-[18px] font-bold text-[#1a1a1a] mb-[4px]">주문이 완료되었습니다!</p>
            <p className="text-[13px] text-[#999]">주문번호 {orderNum}</p>
            <p className="text-[13px] text-[#999] mt-[2px]">{dateStr}</p>
          </div>
          {svgComplete.check && (
            <div className="flex items-center gap-[6px] bg-[#f0fff4] rounded-full px-[14px] py-[6px]">
              <SvgIcon d={svgComplete.check} size={16} viewBox="0 0 24 24" color="#22c55e" />
              <span className="text-[13px] font-semibold text-[#22c55e]">결제 확인 완료</span>
            </div>
          )}
        </div>

        {/* 배송지 / 상품 요약 카드 */}
        <div className="bg-white px-[16px] py-[16px] mb-[8px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">주문 상세</p>

          <div className="flex items-start gap-[8px] mb-[14px] pb-[14px] border-b border-[#f0f0f0]">
            {svgComplete.location && <SvgIcon d={svgComplete.location} size={18} viewBox="0 0 24 24" color="#da231c"/>}
            <div>
              <p className="text-[14px] font-semibold text-[#1a1a1a] mb-[2px]">배송지</p>
              <p className="text-[13px] text-[#555]">서울특별시 강남구 테헤란로 123 하이마트빌딩 101호</p>
              <p className="text-[13px] text-[#555] mt-[1px]">김철수 · 010-1234-5678</p>
            </div>
          </div>

          <div className="flex gap-[12px] mb-[14px] pb-[14px] border-b border-[#f0f0f0]">
            <div className="w-[72px] h-[72px] rounded-[8px] overflow-hidden bg-[#f5f6f7] shrink-0 relative">
              <Image src={imgProductThumb} alt="에어컨" className="object-cover" fill />
            </div>
            <div className="flex-1">
              <p className="text-[12px] text-[#999] mb-[2px]">플럭스</p>
              <p className="text-[13px] text-[#333] leading-snug mb-[6px]">[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨</p>
              <p className="text-[14px] font-bold text-[#1a1a1a]">549,000원</p>
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            {[["결제수단", "신용카드 (현대카드 3개월)"], ["배송비", "무료"], ["최종 결제금액", "529,000원"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <span className="text-[13px] text-[#999]">{k}</span>
                <span className={`text-[13px] ${k === "최종 결제금액" ? "font-bold text-[#da231c]" : "text-[#333]"}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 연관 상품 */}
        <div className="bg-white px-[16px] py-[16px] mb-[8px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">함께 구매하면 좋은 상품</p>
          <div className="flex gap-[10px] overflow-x-auto pb-[4px]">
            {RELATED.map(({ name, price, color }) => (
              <button key={name} className="shrink-0 w-[120px] text-left">
                <div className="w-[120px] h-[120px] rounded-[10px] flex items-center justify-center mb-[8px]" style={{ background: color }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="6" y="12" width="36" height="24" rx="2" fill="#ddd"/><rect x="10" y="15" width="28" height="18" rx="1.5" fill="#1a1a1a"/><circle cx="24" cy="24" r="6" stroke="#4a9eff" strokeWidth="1.5"/><rect x="16" y="36" width="16" height="2.5" rx="1.25" fill="#ddd"/></svg>
                </div>
                <p className="text-[11px] text-[#333] leading-tight line-clamp-2 mb-[4px]">{name}</p>
                <p className="text-[12px] font-bold text-[#1a1a1a]">{price}원</p>
              </button>
            ))}
          </div>
        </div>

        <div className="h-[12px]" />
      </div>

      {/* 쇼핑 계속 버튼 */}
      <div className="shrink-0 bg-white border-t border-[#f0f0f0] px-[16px] py-[12px]">
        <button onClick={onContinue} className="w-full h-[52px] rounded-[8px] bg-[#1a1a1a] flex items-center justify-center">
          <span className="text-[16px] font-bold text-white">쇼핑 계속하기</span>
        </button>
      </div>
    </div>
  );
}
