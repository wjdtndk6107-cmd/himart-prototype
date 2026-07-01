"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import imgProductMain from "../img/product-main.png";
import imgDetailImage from "../img/product-detail.png";

interface Props {
  onBack: () => void;
  onCart: () => void;
  onBuy: () => void;
}

type Tab = "info" | "spec" | "review";

const TABS: { id: Tab; label: string }[] = [
  { id: "info", label: "상세정보" },
  { id: "spec", label: "스펙비교" },
  { id: "review", label: "리뷰(1,234)" },
];

function InfoCircle({ color = "#AEAEB2" }: { color?: string }) {
  return (
    <div className="shrink-0 size-[15px] rounded-full border flex items-center justify-center" style={{ borderColor: color }}>
      <span className="text-[10px] font-bold leading-none" style={{ color }}>i</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" className="shrink-0 mt-[2px]">
      <path d="M1 4.5L4 7.5L10 1.5" stroke="#486EF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CheckedBox() {
  return (
    <div className="shrink-0 size-[20px] rounded-[4px] bg-[#dddddd] flex items-center justify-center">
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
        <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

const Divider = () => <div className="h-[8px] bg-[#e8e8e8]" />;

export default function ProductDetailPage({ onBack, onCart, onBuy }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [showSheet, setShowSheet] = useState(false);
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const UNIT_PRICE = 549000;

  function handleAddToCart() {
    setShowSheet(false);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onCart();
    }, 1200);
  }

  return (
    <div className="size-full flex flex-col font-['Pretendard',sans-serif] relative overflow-hidden">
      {/* Scroll area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">

        {/* Sticky nav */}
        <div ref={navRef} className="sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between px-[12px] py-[16px]">
            <button onClick={onBack} className="flex items-center justify-center w-[20px] h-[20px]">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
                <path d="M9 1L1 9L5 13L9 17" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex items-center gap-[10px]">
              {/* Home */}
              <button className="p-[4px]">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <path d="M2.875 10.5423L11.5 3.83398L20.125 10.5423" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.629"/>
                  <path d="M4.79102 9.10352V19.166H18.2077V9.10352" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.629"/>
                </svg>
              </button>
              {/* Share */}
              <button className="p-[4px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="5" cy="11" r="2" stroke="#1A1A1A" strokeWidth="1.558"/>
                  <circle cx="17" cy="5" r="2" stroke="#1A1A1A" strokeWidth="1.558"/>
                  <circle cx="17" cy="17" r="2" stroke="#1A1A1A" strokeWidth="1.558"/>
                  <path d="M7 10L15 6" stroke="#1A1A1A" strokeWidth="1.558" strokeLinecap="round"/>
                  <path d="M7 12L15 16" stroke="#1A1A1A" strokeWidth="1.558" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Cart */}
              <button onClick={onCart} className="p-[4px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 3H5.5L8 15H16L19 6H7" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.558"/>
                  <circle cx="9" cy="18.5" r="1.5" fill="#1A1A1A"/>
                  <circle cx="15" cy="18.5" r="1.5" fill="#1A1A1A"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Product image */}
        <div className="w-full aspect-square bg-[#f5f6f7] relative">
          <Image src={imgProductMain} alt="PLUX 에어컨" fill className="object-contain"/>
          <div className="absolute left-[16px] bottom-[17px] bg-[rgba(0,0,0,0.62)] rounded-[999px] flex items-center gap-[5px] px-[11px] py-[6px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#ff4d4d] shrink-0"/>
            <span className="text-[12px] font-medium text-white tracking-[-0.2px]">지금 48명이 보는 중</span>
          </div>
          <div className="absolute right-[16px] bottom-[17px] bg-[rgba(0,0,0,0.55)] rounded-[999px] px-[11px] py-[5px]">
            <span className="text-[12px] font-semibold text-white">1/5</span>
          </div>
        </div>

        {/* Brand & title */}
        <div className="px-[20px] py-[16px] bg-white">
          <div className="flex items-center justify-between mb-[6px]">
            <div className="flex items-center gap-[4px]">
              <span className="text-[#767676] text-[13px]">PLUX</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M4 2L8 5.5L4 9" stroke="#767676" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex gap-[8px]">
              <button className="p-[2px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 19L4 12C2.5 10 2.5 7 4.5 5.5C6.5 4 9 4.5 11 7C13 4.5 15.5 4 17.5 5.5C19.5 7 19.5 10 18 12L11 19Z" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="p-[2px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="5" cy="11" r="2" stroke="#888" strokeWidth="1.2"/>
                  <circle cx="17" cy="5" r="2" stroke="#888" strokeWidth="1.2"/>
                  <circle cx="17" cy="17" r="2" stroke="#888" strokeWidth="1.2"/>
                  <path d="M7 10L15 6M7 12L15 16" stroke="#888" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
          <h1 className="text-[18px] font-semibold text-[#1a1a1a] tracking-[-0.2px] leading-[1.4] mb-[4px]">
            [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
          </h1>
          <p className="text-[13px] text-[#808080] tracking-[-0.2px]">모델명 PLX-RAC0825CHWH</p>
          <div className="flex items-center gap-[6px] mt-[8px]">
            <span className="text-[13px] text-[#ff1344] tracking-[1px]">
              ★★★★<span className="text-[#e5e5e5]">★</span>
            </span>
            <span className="text-[13px] font-bold text-[#1a1a1a]">4.9</span>
            <span className="text-[13px] text-[#767676]">(리뷰 14)</span>
            <div className="ml-auto">
              <span className="bg-[#ffecec] text-[#ff1344] text-[12px] font-medium px-[10px] py-[5px] rounded-[999px]">전문가 상담 가능 ›</span>
            </div>
          </div>
        </div>

        {/* Price section */}
        <div className="px-[20px] py-[16px] bg-white mt-[8px]">
          <p className="text-[13px] text-[#aeaeb2] line-through mb-[2px]">619,000원</p>
          <div className="flex items-baseline gap-[10px] mb-[16px]">
            <span className="text-[24px] font-bold text-[#ff1344]">15%</span>
            <span className="text-[26px] font-extrabold text-[#1a1a1a]">549,000원</span>
          </div>
          {/* 최대 혜택가 */}
          <div className="border border-[#ff9797] rounded-[10px] flex items-center justify-between px-[15px] py-[13px] mb-[8px]">
            <span className="text-[13px] font-semibold text-[#1a1a1a]">최대 혜택가</span>
            <div className="flex items-center gap-[10px]">
              <span className="text-[17px] font-extrabold text-[#ff1344]">500,570원</span>
              <span className="bg-[#ffecec] text-[#ff1344] text-[12px] font-medium px-[10px] py-[5px] rounded-[999px]">혜택보기 ›</span>
            </div>
          </div>
          {/* 구독가능 */}
          <div className="border border-[#e5e5e5] rounded-[10px] px-[15px] py-[13px]">
            <div className="flex items-center gap-[8px]">
              <span className="bg-[#222] text-white text-[12px] font-semibold px-[7px] py-[3px] rounded-[5px] shrink-0">구독가능</span>
              <p className="text-[13px] text-[#ff1344] font-bold flex-1">
                최대혜택가 월 3,805원<span className="font-normal text-[#1a1a1a]"> ~ / 36개월</span>
              </p>
              <span className="text-[11px] text-[#767676] shrink-0">더보기 ›</span>
            </div>
            <p className="text-[13px] text-[#1a1a1a] mt-[4px] leading-[1.5]">ㄴ37만원 상당 케어 서비스, AS연장보증</p>
            <div className="mt-[12px] bg-[#ffecec] rounded-[8px] py-[11px] text-center text-[13px] font-semibold text-[#ff1344]">
              할인에 케어를 더한 구독으로 구매하기 ›
            </div>
          </div>
        </div>

        <Divider/>

        {/* 하이마트 안심 케어 */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[14px] bg-white">
          <h2 className="text-[17px] font-bold text-[#1a1a1a]">하이마트 안심 케어</h2>
          {/* 하이 워런티 */}
          <div className="bg-[#eef3ff] border border-[#c5d4fd] rounded-[12px] px-[16px] py-[12px]">
            <div className="flex items-center justify-between pb-[4px]">
              <div className="flex items-center gap-[7px]">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0">
                  <path d="M8.50065 15.5827C8.50065 15.5827 14.1673 12.7493 14.1673 8.49935V3.54102L8.50065 1.41602L2.83398 3.54102V8.49935C2.83398 12.7493 8.50065 15.5827 8.50065 15.5827Z" stroke="#486EF6" strokeWidth="1.42" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[14px] font-bold text-[#486ef6]">하이 워런티</span>
              </div>
              <CheckedBox/>
            </div>
            <div className="flex items-start gap-[6px] pt-[10px]">
              <CheckIcon/>
              <p className="text-[12px] font-bold text-[#1a1a1a] leading-[1.5]">28,000원 한 번 결제로 최대 5년까지 A/S 무상 보증 기간 연장</p>
            </div>
            <div className="flex items-start gap-[6px] pt-[5px]">
              <CheckIcon/>
              <p className="text-[12px] text-[#1a1a1a] leading-[1.5]">소액으로 수리비 걱정 안심 해결!(가전구매 시 가입 가능)</p>
            </div>
            <div className="flex items-start gap-[6px] pt-[5px]">
              <CheckIcon/>
              <p className="text-[12px] text-[#1a1a1a] leading-[1.5]">보상한도 내 수리비 횟수 무제한 보장</p>
            </div>
          </div>
          {/* 가전교체 가입 신청 */}
          <div className="bg-[#eef3ff] border border-[#e5e5e5] rounded-[12px] px-[16px] py-[14px]">
            <div className="flex items-center justify-between pb-[4px]">
              <div className="flex items-center gap-[6px]">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0">
                  <path d="M0.708496 2.83337V7.08337H4.9585" stroke="#486EF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.48641 10.625C2.94569 11.9286 3.81619 13.0476 4.96675 13.8135C6.11731 14.5793 7.4856 14.9505 8.86546 14.8711C10.2453 14.7916 11.562 14.2659 12.6171 13.3731C13.6722 12.4804 14.4086 11.2688 14.7152 9.92116C15.0219 8.57347 14.8823 7.16262 14.3174 5.90118C13.7526 4.63974 12.793 3.59605 11.5834 2.92736C10.3738 2.25867 8.97964 2.00121 7.61098 2.19377C6.24232 2.38634 4.97331 3.01849 3.99516 3.99498L0.708496 7.08332" stroke="#486EF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[14px] font-bold text-[#486ef6]">가전교체 가입 신청</span>
              </div>
              <CheckedBox/>
            </div>
            <p className="text-[12px] text-[#1a1a1a] leading-[1.5] mt-[4px]">매년 신상품을 반값 수준 교체 가능! 서비스 기간 내 A/S 연장보증 혜택제공</p>
          </div>
          <div className="flex items-center gap-[6px]">
            <InfoCircle color="#AEAEB2"/>
            <span className="text-[13px] font-bold text-[#767676]">해당 서비스는 구매 시점에만 가입 가능합니다.</span>
          </div>
        </div>

        <Divider/>

        {/* 구성품 보기 */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[12px] bg-white">
          <div className="flex items-center gap-[6px]">
            <span className="text-[17px] font-bold text-[#1a1a1a]">구성품 보기</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5.5 7L9 10.5L12.5 7" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-[13px] font-bold text-[#767676] leading-[1.4]">
            [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
          </p>
          <div className="bg-[#f5f6f7] rounded-[10px] px-[14px] py-[8px]">
            <p className="text-[13px] text-[#444] leading-[1.5]">
              플럭스 인버터벽걸이 에어컨 8평 (26.0㎡) [전국기본설치]<br/>
              하이워런티_결합(75만이하)_플럭스
            </p>
          </div>
        </div>

        <Divider/>

        {/* 결제수단 할인 혜택 확인 */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[12px] bg-white">
          <div className="flex items-center gap-[6px]">
            <span className="text-[17px] font-bold text-[#1a1a1a]">결제수단 할인 혜택 확인</span>
            <InfoCircle color="#AEAEB2"/>
          </div>
          <div className="flex items-start gap-[6px] flex-wrap">
            <span className="bg-[#f5f6f7] text-[#222] text-[11px] font-semibold rounded-[14px] px-[9px] py-[5px] shrink-0">즉시할인</span>
            {["삼성 7%","신한 7%","카카오페이 7%","KB국민 7%","롯데 6%","현대 5%","하나 5%","네이버페이 4%"].map((c) => (
              <span key={c} className="border border-[#e5e5e5] text-[#222] text-[11px] font-medium rounded-[14px] px-[10px] py-[6px]">{c}</span>
            ))}
          </div>
          <p className="text-[13px] text-[#767676] leading-[1.4]">
            혜택별 유의사항을 꼭 확인해주세요.<br/>
            상품별 즉시할인은 주문/결제 단계에서 해당 즉시 할인을 선택해야 적용됩니다.
          </p>
          <div className="bg-[#f5f6f7] rounded-[10px] px-[14px] py-[8px]">
            <p className="text-[13px] font-bold text-[#444] leading-[1.54]">가전을 쉽게 최대 60개월 나눠 결제</p>
            <p className="text-[13px] text-[#767676] leading-[1.54]">롯데 개인 신용카드로 5만원 이상 48개월/60개월 할부 결제 시 연 8%원리금 균등 상환</p>
          </div>
        </div>

        <Divider/>

        {/* 배송 · 혜택 */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[10px] bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold text-[#1a1a1a]">배송 · 혜택</h2>
            <div className="flex items-center gap-[2px]">
              <span className="text-[12px] font-medium text-[#767676]">자세히 보기</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M4 2L7 5.5L4 9" stroke="#767676" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[6px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] shrink-0">특별혜택</span>
            <div className="flex-1 bg-[#f5f6f7] rounded-[8px] px-[12px] py-[9px] flex items-center justify-between">
              <span className="text-[14px] text-[#222]">L.POINT(앱구매한정) 10,000점</span>
              <InfoCircle color="#AEAEB2"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[6px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] shrink-0">추가혜택</span>
            <div className="flex-1 bg-[#f5f6f7] rounded-[8px] px-[12px] py-[9px] flex items-center justify-between">
              <span className="text-[14px] text-[#222]">최대 6개월 무이자 할부</span>
              <InfoCircle color="#AEAEB2"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px]">
            <span className="w-[52px] shrink-0"/>
            <div className="flex-1 bg-[#f5f6f7] rounded-[8px] px-[12px] py-[9px] flex items-center justify-between">
              <span className="text-[13px] text-[#222]">L.POINT 통합회원 795점 적립(0.05%)</span>
              <InfoCircle color="#AEAEB2"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[8px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] shrink-0">배송</span>
            <span className="text-[14px] font-semibold text-[#1a1a1a]">하이마트 직접 배송 · 무료배송</span>
          </div>
          <div className="flex items-start gap-[14px]">
            <span className="w-[52px] shrink-0"/>
            <p className="text-[13px] text-[#767676] leading-[1.4]">
              상품/지역/물류 사정에 따라 배송지연 발생할 수 있음<br/>
              도서산간(제주 포함)의 경우, 추가 배송비 발생 가능
            </p>
          </div>
        </div>

        <Divider/>

        {/* Tab bar + content */}
        <div>
          <div className="sticky z-10 bg-white border-b border-[#eee] flex" style={{ top: 60 }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex-1 py-[14px] text-[15px] relative">
                <span className={activeTab === tab.id ? "font-semibold text-[#da231c]" : "font-medium text-[#666]"}>
                  {tab.label}
                </span>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da231c]"/>}
              </button>
            ))}
          </div>

          {/* 상세정보 */}
          <div className="bg-white">
            <div className="px-[20px] py-[16px]">
              <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[12px]">상세정보</h3>
            </div>
            <Image src={imgDetailImage} alt="상품 상세" className="w-full object-cover"/>
            <div className="px-[20px] py-[16px]">
              <button className="w-full h-[48px] bg-white border border-[#666] rounded-[10px] flex items-center justify-center gap-[4px]">
                <span className="text-[14px] font-semibold text-[#666]">상품상세 더보기</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M4 5L7 8L10 5" stroke="#666" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="h-[80px]"/>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[#eee] bg-white px-[16px] py-[10px] flex gap-[8px] items-center">
        <button className="shrink-0 w-[44px] h-[44px] flex flex-col items-center justify-center gap-[2px]">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3.5 11L7 4H15L18.5 11H14L13 13H9L8 11H3.5Z" stroke="#1A1A1A" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M3.5 11H18.5V19H3.5V11Z" stroke="#1A1A1A" strokeWidth="1.4" strokeLinejoin="round"/>
          </svg>
          <span className="text-[9px] text-[#1a1a1a]">전문가 가전상담</span>
        </button>
        <button
          className="flex-1 h-[50px] bg-[#1a1a1a] rounded-[10px] flex items-center justify-center"
          onClick={() => setShowSheet(true)}
        >
          <span className="text-[16px] font-bold text-white">구매하기</span>
        </button>
      </div>

      {/* Bottom sheet */}
      {showSheet && (
        <div className="absolute inset-0 z-30" onClick={e => { if (e.target === e.currentTarget) setShowSheet(false); }}>
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSheet(false)}/>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-tl-[20px] rounded-tr-[20px] shadow-lg">
            <div className="pt-[14px] pb-[20px] px-[16px]">
              <div className="flex justify-center mb-[10px]">
                <div className="w-[40px] h-[4px] bg-[#c2c6cd] rounded-full" onClick={() => setShowSheet(false)}/>
              </div>
              <div className="bg-[#f2f4f7] rounded-t-[8px] px-[8px] py-[8px]">
                <p className="text-[10px] text-black leading-normal">
                  PLUX [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
                </p>
              </div>
              <div className="bg-[#f2f4f7] rounded-b-[8px] px-[8px] py-[8px] flex items-center gap-[6px]">
                <div className="bg-white h-[34px] w-[84px] rounded-[6px] border border-[#e3e6ea] flex items-center">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-[28px] h-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7H11" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </button>
                  <div className="flex-1 h-full border-l border-r border-[#e3e6ea] flex items-center justify-center">
                    <span className="text-[14px] font-semibold text-[#1a1a1a]">{qty}</span>
                  </div>
                  <button onClick={() => setQty(q => q + 1)} className="w-[28px] h-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3V11M3 7H11" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </button>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-[14px] font-bold text-[#1a1a1a]">{(UNIT_PRICE * qty).toLocaleString()}원</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-[6px] pt-[24px]">
                <span className="text-[13px] text-[#6b7280]">합계</span>
                <span className="text-[19px] font-extrabold text-[#e5002b]">{(UNIT_PRICE * qty).toLocaleString()}원</span>
              </div>
              <div className="flex gap-[8px] pt-[12px]">
                <button onClick={handleAddToCart} className="w-[176px] h-[48px] bg-white border border-[#1a1a1a] rounded-[8px] flex items-center justify-center">
                  <span className="text-[15px] font-bold text-[#1a1a1a]">장바구니</span>
                </button>
                <button onClick={onBuy} className="flex-1 h-[48px] bg-[#1a1a1a] rounded-[8px] flex items-center justify-center">
                  <span className="text-[15px] font-bold text-white">바로구매</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 장바구니 담기 토스트 */}
      {showToast && (
        <div className="absolute left-4 right-4 bottom-[80px] z-40">
          <div className="bg-[rgba(26,26,26,0.9)] rounded-[7px] flex items-center justify-center p-[10px] h-[52px]">
            <span className="text-[14px] text-white tracking-[-0.045em] text-center">장바구니에 상품이 담겼습니다.</span>
          </div>
        </div>
      )}
    </div>
  );
}
