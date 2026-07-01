"use client";

import { useState } from "react";
import Image from "next/image";
import imgBgTile from "../img/product-bg-tile.png";
import imgAircon from "../img/product-aircon.png";

interface Props {
  onOrder: () => void;
  onHome: () => void;
}

const UNIT_PRICE = 549000;
const ORIGINAL_PRICE = 649000;
const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

function Checkbox({ checked, onChange, size = 20 }: { checked: boolean; onChange?: () => void; size?: number }) {
  return (
    <button
      onClick={onChange}
      className="relative rounded-[4px] shrink-0 flex items-center justify-center transition-colors"
      style={{
        width: size,
        height: size,
        background: checked ? "#da231c" : "white",
        border: checked ? "none" : "1.5px solid #d1d1d1",
      }}
    >
      {checked && (
        <svg fill="none" viewBox="0 0 11 8" width={Math.round(size * 0.6)} height={Math.round(size * 0.44)}>
          <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}

type Tab = "일반" | "스마트픽" | "구독";

export default function CartPage({ onOrder, onHome }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("일반");
  const [qty, setQty] = useState(1);
  const [allChecked, setAllChecked] = useState(true);
  const [itemChecked, setItemChecked] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const totalPrice = UNIT_PRICE * qty;

  const toggleAll = () => {
    const next = !allChecked;
    setAllChecked(next);
    setItemChecked(next);
  };

  const toggleItem = () => {
    const next = !itemChecked;
    setItemChecked(next);
    setAllChecked(next);
  };

  return (
    <div className="bg-white relative size-full flex flex-col overflow-hidden">
      {/* 메뉴바 */}
      <div className="h-[60px] shrink-0 w-full bg-white flex items-center justify-between px-[12px]">
        <button className="flex items-center justify-center w-[20px] h-[20px]">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L5 13L9 17" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <p className="font-bold text-[18px] text-black">장바구니</p>
        <button onClick={onHome} className="flex items-center justify-center p-[4px]">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M2.875 10.5423L11.5 3.83398L20.125 10.5423" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.62917" />
            <path d="M4.79102 9.10352V19.166H18.2077V9.10352" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.62917" />
          </svg>
        </button>
      </div>

      {/* 탭 바 */}
      <div className="shrink-0 h-[46px] flex items-stretch w-full border-b border-[#eee]">
        {(["일반", "스마트픽", "구독"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 relative flex items-center justify-center"
          >
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da231c]" />
            )}
            <span
              className={`text-[16px] leading-[19.5px] ${
                activeTab === tab ? "font-bold text-[#da231c]" : "text-[#6b7280]"
              }`}
            >
              {tab === "일반" ? "일반(1)" : tab}
            </span>
          </button>
        ))}
      </div>

      {/* 전체선택 행 */}
      <div className="shrink-0 flex items-center justify-between px-[20px] py-[12px] w-full border-b border-[#eee]">
        <div className="flex gap-[8px] items-center">
          <Checkbox checked={allChecked} onChange={toggleAll} />
          <p className="font-bold text-[#222] text-[14px]">전체선택</p>
        </div>
        <button
          onClick={() => { setItemChecked(false); setAllChecked(false); }}
          className="bg-[#f0f0f0] h-[30px] px-[8px] flex items-center justify-center rounded-[8px] w-[68px]"
        >
          <p className="text-[#777] text-[13px]">선택삭제</p>
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {/* 매장 헤더 */}
        <div className="h-[54px] flex items-center justify-between px-[20px] w-full">
          <div className="flex gap-[8px] items-center">
            <Checkbox checked={allChecked} onChange={toggleAll} />
            <p className="font-bold text-[#222] text-[14px]">하이마트</p>
          </div>
          <button onClick={() => setCollapsed((v) => !v)} className="flex items-center gap-[4px]">
            <span className="text-[#777] text-[13px]">{collapsed ? "펼치기" : "접기"}</span>
            <svg
              fill="none"
              viewBox="0 0 13 13"
              width="13"
              height="13"
              className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""}`}
            >
              <path d="M2.4375 8.125L6.5 4.0625L10.5625 8.125" stroke="#767676" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.38125" />
            </svg>
          </button>
        </div>

        {/* 무료배송 배지 */}
        {!collapsed && (
          <div className="bg-[#f5f6f7] px-[20px] py-[10px] w-full">
            <p className="text-[#767676] text-[13px] tracking-[-0.2px]">무료배송</p>
          </div>
        )}

        {/* 상품 카드 */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            collapsed ? "max-h-0" : "max-h-[500px]"
          }`}
        >
          <div className="border-y border-[#e8e8e8] w-full">
            <div className="flex flex-col p-[16px]">
              <div className="flex gap-[12px] items-start w-full">
                <Checkbox checked={itemChecked} onChange={toggleItem} />
                <div className="flex flex-1 flex-col gap-[16px] items-start min-w-0">
                  <div className="flex gap-[14px] items-start w-full">
                    {/* 상품 이미지 (배경타일 + 에어컨) */}
                    <div
                      className="relative rounded-[6px] shrink-0 overflow-hidden"
                      style={{ width: 78, height: 78, background: "#f7f7f7" }}
                    >
                      <Image src={imgBgTile} alt="" fill className="object-cover opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center p-[6px]">
                        <Image src={imgAircon} alt="에어컨" fill className="object-contain" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-[8px] min-w-0">
                      <p className="font-semibold leading-[1.35] text-[#333] text-[15px] tracking-[-0.6px] line-clamp-2">
                        [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
                      </p>
                      <div className="flex flex-col gap-[4px]">
                        <p className="text-[#999] text-[12px] tracking-[-0.48px] line-through">
                          {ORIGINAL_PRICE.toLocaleString("ko-KR")}원
                        </p>
                        <div className="flex font-bold gap-[4px] items-center text-[18px] tracking-[-0.72px]">
                          <span className="text-[#1a1a1a]">15%</span>
                          <span className="text-[#da231c]">{fmt(UNIT_PRICE)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 수량 + 삭제 */}
                  <div className="flex items-center justify-between w-full">
                    <div
                      className="flex items-center rounded-[8px]"
                      style={{ height: 34, border: "1px solid #e5e5e5" }}
                    >
                      <button
                        onClick={() => qty > 1 && setQty((q) => q - 1)}
                        className="flex items-center justify-center px-[12px] h-full disabled:opacity-30"
                        disabled={qty <= 1}
                      >
                        <span className="text-[#1a1a1a] text-[18px] leading-none select-none">−</span>
                      </button>
                      <div
                        className="flex items-center justify-center w-[34px] h-full"
                        style={{ borderLeft: "1px solid #e5e5e5", borderRight: "1px solid #e5e5e5" }}
                      >
                        <span className="font-semibold text-[#1a1a1a] text-[14px]">{qty}</span>
                      </div>
                      <button
                        onClick={() => setQty((q) => q + 1)}
                        className="flex items-center justify-center px-[12px] h-full"
                      >
                        <span className="text-[#1a1a1a] text-[18px] leading-none select-none">+</span>
                      </button>
                    </div>

                    <button
                      onClick={() => { setItemChecked(false); setAllChecked(false); }}
                      className="flex items-center justify-center rounded-[8px]"
                      style={{ width: 34, height: 34, border: "1px solid #e5e5e5" }}
                      aria-label="삭제"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 18 18">
                        <path
                          d="M3 4.5H15M6.75 4.5V3H11.25V4.5M4.5 4.5L5.25 15H12.75L13.5 4.5"
                          stroke="#1A1A1A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.125"
                          opacity="0.55"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[160px]" />
      </div>

      {/* 하단 푸터 */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-[#e8e8e8]">
        {/* 접기 화살표 */}
        <div className="flex items-center justify-center pt-[6px] pb-[2px]">
          <svg fill="none" viewBox="0 0 20 10" width="20" height="10">
            <path d="M2 8L10 2L18 8" stroke="#C2C6CD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        </div>

        {/* 합계 행 */}
        <div className="flex items-center justify-between px-[16px] py-[6px] text-[#da231c]">
          <span className="text-[14px] tracking-[-0.2px]">총 {itemChecked ? qty : 0}건</span>
          <div className="flex gap-[8px] items-center">
            <span className="text-[14px] tracking-[-0.2px]">합계</span>
            <span className="font-extrabold text-[21px] tracking-[-0.2px]">
              {fmt(itemChecked ? totalPrice : 0)}
            </span>
          </div>
        </div>

        {/* 주문하기 버튼 */}
        <div className="px-[16px] pb-[16px]">
          <button
            onClick={onOrder}
            disabled={!itemChecked}
            className="bg-[#da231c] h-[54px] rounded-[10px] w-full flex items-center justify-center disabled:bg-[#ccc]"
          >
            <span className="font-bold text-[17px] text-white">주문하기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
