"use client";

import { useState } from "react";
import Image from "next/image";
import { svgCart } from "../components/svg-paths";
import imgProductThumb from "../img/product-thumb.png";

interface Props {
  onOrder: () => void;
  onHome: () => void;
}

const UNIT_PRICE = 549000;

function SvgIcon({ d, size = 24, color = "#1a1a1a", viewBox = "0 0 24 24" }: { d: string; size?: number; color?: string; viewBox?: string }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none">
      <path d={d} fill={color} />
    </svg>
  );
}

export default function CartPage({ onOrder, onHome }: Props) {
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState(true);
  const [open, setOpen] = useState(true);

  const totalPrice = qty * UNIT_PRICE;

  return (
    <div className="flex flex-col size-full bg-[#f5f6f7] font-['Pretendard',sans-serif] overflow-hidden">
      {/* 상태바 */}
      <div className="flex items-center justify-between px-3 h-[30px] shrink-0 bg-white">
        <span className="text-[13px] font-semibold text-[#1a1a1a]">9:27</span>
        <div className="flex items-center gap-1">
          {svgCart.wifi && <SvgIcon d={svgCart.wifi} size={18} viewBox="0 0 24 24" />}
          <div className="border border-[#1a1a1a] rounded-[3px] w-[22px] h-[12px] p-[1.5px]"><div className="bg-[#1a1a1a] rounded-[1.5px] h-full w-full"/></div>
        </div>
      </div>

      {/* 헤더 */}
      <div className="shrink-0 h-[44px] bg-white flex items-center justify-between px-[16px] border-b border-[#f0f0f0]">
        <button onClick={onHome} className="p-[4px]">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M8 1L1 8L8 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[16px] font-bold text-[#1a1a1a]">장바구니</span>
        <div className="w-[33px]" />
      </div>

      {/* 전체선택 */}
      <div className="shrink-0 bg-white flex items-center justify-between px-[16px] py-[12px]">
        <button className="flex items-center gap-[8px]" onClick={() => setSelected(!selected)}>
          <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors ${selected ? "border-[#da231c] bg-[#da231c]" : "border-[#ccc] bg-white"}`}>
            {selected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          <span className="text-[14px] text-[#333]">전체선택 (1/1)</span>
        </button>
        <button className="text-[13px] text-[#999]">선택삭제</button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-[8px] py-[8px]">
        {/* 매장 섹션 */}
        <div className="bg-white">
          <button className="w-full flex items-center justify-between px-[16px] py-[14px]" onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-[8px]">
              <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors ${selected ? "border-[#da231c] bg-[#da231c]" : "border-[#ccc]"}`}>
                {selected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <div className="flex items-center gap-[6px]">
                {svgCart.home && <SvgIcon d={svgCart.home} size={16} viewBox="0 0 24 24" color="#555"/>}
                <span className="text-[14px] font-bold text-[#1a1a1a]">강남대로점</span>
              </div>
            </div>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <path d="M1 1L7 7L13 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div className="border-t border-[#f0f0f0] px-[16px] py-[16px]">
              <div className="flex gap-[12px]">
                <div className="w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors mt-[2px]" style={{ borderColor: selected ? "#da231c" : "#ccc", background: selected ? "#da231c" : "white" }}>
                  {selected && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 3.5L3.5 6L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div className="flex-1">
                  <div className="flex gap-[12px]">
                    <div className="w-[80px] h-[80px] rounded-[8px] overflow-hidden bg-[#f5f6f7] shrink-0 relative">
                      <Image src={imgProductThumb} alt="에어컨" className="object-cover" fill />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] text-[#333] leading-snug mb-[4px]">[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH</p>
                      <p className="text-[13px] font-bold text-[#1a1a1a]">{(UNIT_PRICE).toLocaleString()}원</p>
                    </div>
                    <button onClick={() => {}} className="shrink-0 self-start">
                      {svgCart.trash && <SvgIcon d={svgCart.trash} size={20} viewBox="0 0 24 24" color="#aaa" />}
                    </button>
                  </div>
                  <div className="mt-[12px] flex items-center justify-between">
                    <div className="flex items-center border border-[#e0e0e0] rounded-[6px] overflow-hidden h-[32px]">
                      <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-[32px] h-full flex items-center justify-center bg-[#f5f5f5] border-r border-[#e0e0e0]">
                        <span className="text-[16px] text-[#555] leading-none">−</span>
                      </button>
                      <span className="w-[36px] text-center text-[14px] font-medium text-[#1a1a1a]">{qty}</span>
                      <button onClick={() => setQty(q => q + 1)} className="w-[32px] h-full flex items-center justify-center bg-[#f5f5f5] border-l border-[#e0e0e0]">
                        <span className="text-[16px] text-[#555] leading-none">+</span>
                      </button>
                    </div>
                    <span className="text-[14px] font-bold text-[#1a1a1a]">{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 주문예상금액 */}
        <div className="bg-white px-[16px] py-[16px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">주문 예상 금액</p>
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#555]">상품금액</span>
              <span className="text-[14px] text-[#1a1a1a]">{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#555]">배송비</span>
              <span className="text-[14px] text-[#da231c]">무료</span>
            </div>
            <div className="h-[1px] bg-[#f0f0f0]" />
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1a1a1a]">합계</span>
              <span className="text-[16px] font-extrabold text-[#da231c]">{totalPrice.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 주문 버튼 */}
      <div className="shrink-0 bg-white border-t border-[#f0f0f0] px-[16px] py-[12px]">
        <button onClick={onOrder} className="w-full h-[52px] rounded-[8px] bg-[#da231c] flex items-center justify-center">
          <span className="text-[16px] font-bold text-white">총 {totalPrice.toLocaleString()}원 주문하기</span>
        </button>
      </div>
    </div>
  );
}
