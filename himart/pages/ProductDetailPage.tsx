"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import imgProductMain from "../img/product-main.png";
import imgDetailImage from "../img/product-detail.png";
import imgReviewThumbnail from "../img/review-thumb.png";

interface Props {
  onBack: () => void;
  onCart: () => void;
  onBuy: () => void;
}

type Tab = "info" | "spec" | "review" | "qna";

const TABS: { id: Tab; label: string }[] = [
  { id: "info",   label: "상세정보" },
  { id: "spec",   label: "스펙비교" },
  { id: "review", label: "리뷰(1,234)" },
  { id: "qna",    label: "Q&A" },
];

const UNIT_PRICE = 549000;

// ── Shared helper components ──────────────────────────────────────────────────
const Divider = () => <div className="h-[8px] bg-[#e8e8e8]"/>;

function InfoCircleIcon({ color = "#AEAEB2" }: { color?: string }) {
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

function ChevronDownIcon({ color = "#1A1A1A", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className="shrink-0">
      <path d="M5.5 7L9 10.5L12.5 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronRightIcon({ color = "#767676" }: { color?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="shrink-0">
      <path d="M4 2L7 5.5L4 9" stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDownCircleButton() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <mask id="path-1-inside-1" fill="white">
        <path d="M0 14C0 6.268 6.268 0 14 0C21.732 0 28 6.268 28 14C28 21.732 21.732 28 14 28C6.268 28 0 21.732 0 14Z"/>
      </mask>
      <path d="M0 14C0 6.268 6.268 0 14 0C21.732 0 28 6.268 28 14C28 21.732 21.732 28 14 28C6.268 28 0 21.732 0 14Z" fill="white"/>
      <path d="M0 14M28 14M14 0M14 28V27C6.82 27 1 21.18 1 14H-1C-1 22.284 5.716 29 14 29V28ZM28 14H27C27 21.18 21.18 27 14 27V29C22.284 29 29 22.284 29 14H28ZM14 0V1C21.18 1 27 6.82 27 14H29C29 5.716 22.284-1 14-1V0ZM14 0V-1C5.716-1-1 5.716-1 14H1C1 6.82 6.82 1 14 1V0Z" fill="#E5E5E5" mask="url(#path-1-inside-1)"/>
      <path d="M9.625 12.25L14 16.625L18.375 12.25" stroke="#767676" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ProductDetailPage({ onBack, onCart, onBuy }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [showSheet, setShowSheet] = useState(false);
  const [qty, setQty] = useState(1);
  const [showCartToast, setShowCartToast] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const navRef    = useRef<HTMLDivElement>(null);
  const [navH, setNavH] = useState(0);

  const sectionRefs: Record<Tab, React.RefObject<HTMLDivElement | null>> = {
    info:   useRef<HTMLDivElement>(null),
    spec:   useRef<HTMLDivElement>(null),
    review: useRef<HTMLDivElement>(null),
    qna:    useRef<HTMLDivElement>(null),
  };

  useLayoutEffect(() => {
    if (navRef.current) setNavH(navRef.current.offsetHeight);
  }, []);

  // Intersection observer for active tab tracking
  useEffect(() => {
    if (!scrollRef.current) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActiveTab(e.target.getAttribute("data-tab") as Tab);
      });
    }, { root: scrollRef.current, rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    Object.values(sectionRefs).forEach(r => { if (r.current) observer.observe(r.current); });
    return () => observer.disconnect();
  }, []);

  function scrollTo(tab: Tab) {
    setActiveTab(tab);
    const el = sectionRefs[tab].current;
    if (el && scrollRef.current) {
      const off = el.getBoundingClientRect().top - scrollRef.current.getBoundingClientRect().top
                  + scrollRef.current.scrollTop - navH;
      scrollRef.current.scrollTo({ top: off, behavior: "smooth" });
    }
  }

  function handleAddToCart() {
    setShowSheet(false);
    setShowCartToast(true);
    setTimeout(() => setShowCartToast(false), 2000);
  }

  return (
    <div className="size-full flex flex-col font-['Pretendard',sans-serif] relative overflow-hidden">

      {/* ── Scroll area ── */}
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
                  <path d="M6.73 10.1L15.27 5.9" stroke="#1A1A1A" strokeWidth="1.558" strokeLinecap="round"/>
                  <path d="M6.73 11.9L15.27 16.1" stroke="#1A1A1A" strokeWidth="1.558" strokeLinecap="round"/>
                </svg>
              </button>
              {/* Cart */}
              <button onClick={onCart} className="p-[4px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M2 3H4.5L7 14.5H16.5L19.5 5.5H7" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.558"/>
                  <circle cx="9" cy="18" r="1.5" fill="#1A1A1A"/>
                  <circle cx="15.5" cy="18" r="1.5" fill="#1A1A1A"/>
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
            <span className="text-[12px] font-semibold text-white tracking-[-0.2px]">1/5</span>
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
            <span className="text-[13px] text-[#ff1344] tracking-[1px]">★★★★<span className="text-[#e5e5e5]">★</span></span>
            <span className="text-[13px] font-bold text-[#1a1a1a]">4.9</span>
            <span className="text-[13px] text-[#767676]">(리뷰 14)</span>
            <div className="ml-auto">
              <span className="bg-[#ffecec] text-[#ff1344] text-[12px] font-medium px-[10px] py-[5px] rounded-[999px]">전문가 상담 가능 ›</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="px-[20px] py-[16px] bg-white mt-[8px]">
          <p className="text-[13px] text-[#aeaeb2] line-through mb-[2px]">619,000원</p>
          <div className="flex items-baseline gap-[8px] mb-[16px]">
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
            <div className="flex items-center justify-between gap-[6px] pb-[4px]">
              <div className="flex items-center gap-[7px]">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0">
                  <path d="M8.50065 15.5827C8.50065 15.5827 14.1673 12.7493 14.1673 8.49935V3.54102L8.50065 1.41602L2.83398 3.54102V8.49935C2.83398 12.7493 8.50065 15.5827 8.50065 15.5827Z" stroke="#486EF6" strokeWidth="1.41667" strokeLinecap="round" strokeLinejoin="round"/>
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
            <div className="flex items-center justify-between gap-[6px] pb-[4px]">
              <div className="flex items-center gap-[6px]">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0">
                  <path d="M0.708496 2.83337V7.08337H4.9585" stroke="#486EF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2.48641 10.625C2.94569 11.9286 3.81619 13.0476 4.96675 13.8135C6.11731 14.5793 7.4856 14.9505 8.86546 14.8711C10.2453 14.7916 11.562 14.2659 12.6171 13.3731C13.6722 12.4804 14.4086 11.2688 14.7152 9.92116C15.0219 8.57347 14.8823 7.16262 14.3174 5.90118C13.7526 4.63974 12.793 3.59605 11.5834 2.92736C10.3738 2.25867 8.97964 2.00121 7.61098 2.19377C6.24232 2.38634 4.97331 3.01849 3.99516 3.99498L0.708496 7.08332" stroke="#486EF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-[14px] font-bold text-[#486ef6]">가전교체 가입 신청</span>
              </div>
              <CheckedBox/>
            </div>
            <p className="text-[12px] text-[#1a1a1a] leading-[1.5]">매년 신상품을 반값 수준 교체 가능! 서비스 기간 내 A/S 연장보증 혜택제공</p>
          </div>
          <div className="flex items-center gap-[6px]">
            <InfoCircleIcon color="#AEAEB2"/>
            <span className="text-[13px] font-bold text-[#767676]">해당 서비스는 구매 시점에만 가입 가능합니다.</span>
          </div>
        </div>

        <Divider/>

        {/* 구성품 보기 */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[12px] bg-white opacity-80">
          <div className="flex items-center gap-[6px]">
            <span className="text-[17px] font-bold text-[#1a1a1a]">구성품 보기</span>
            <ChevronDownIcon/>
          </div>
          <p className="text-[13px] font-bold text-[#767676] leading-[1.4]">
            [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
          </p>
          <div className="bg-[#f5f6f7] rounded-[10px] px-[14px] py-[8px]">
            <p className="text-[13px] text-[#444] leading-[1.5]">
              플럭스 인버터벽걸이 에어컨 8평 (26.0㎡) [전국기본설치] 하이워런티_결합(75만이하)_플럭스
            </p>
          </div>
        </div>

        <Divider/>

        {/* 결제수단 할인 혜택 확인 */}
        <div className="px-[20px] py-[16px] flex flex-col gap-[12px] bg-white opacity-80">
          <div className="flex items-center gap-[6px]">
            <span className="text-[17px] font-bold text-[#1a1a1a]">결제수단 할인 혜택 확인</span>
            <InfoCircleIcon color="#AEAEB2"/>
          </div>
          <div className="flex items-start gap-[6px] flex-wrap">
            <span className="bg-[#f5f6f7] text-[#222] text-[11px] font-semibold rounded-[14px] px-[9px] py-[5px] shrink-0">즉시할인</span>
            {["삼성 7%","신한 7%","카카오페이 7%","KB국민 7%","롯데 6%","현대 5%","하나 5%","네이버페이 4%"].map((c,i) => (
              <span key={i} className="border border-[#e5e5e5] text-[#222] text-[11px] font-medium rounded-[14px] px-[10px] py-[6px]">{c}</span>
            ))}
          </div>
          <p className="text-[13px] text-[#767676] leading-[1.4]">
            혜택별 유의사항을 꼭 확인해주세요. 상품별 즉시할인은 주문/결제 단계에서 해당 즉시 할인을 선택해야 적용됩니다.
          </p>
          <div className="bg-[#f5f6f7] rounded-[10px] px-[14px] py-[8px] flex flex-col">
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
              <ChevronRightIcon color="#767676"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[6px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] pt-px shrink-0">특별혜택</span>
            <div className="flex-1 bg-[#f5f6f7] rounded-[8px] px-[12px] py-[9px] flex items-center justify-between">
              <span className="text-[14px] text-[#222]">L.POINT(앱구매한정) 10,000점</span>
              <InfoCircleIcon color="#AEAEB2"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[6px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] pt-px shrink-0">추가혜택</span>
            <div className="flex-1 bg-[#f5f6f7] rounded-[8px] px-[12px] py-[9px] flex items-center justify-between">
              <span className="text-[14px] text-[#222]">최대 6개월 무이자 할부</span>
              <InfoCircleIcon color="#AEAEB2"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[4px]">
            <span className="w-[52px] shrink-0"/>
            <div className="flex-1 bg-[#f5f6f7] rounded-[8px] px-[12px] py-[9px] flex items-center justify-between">
              <span className="text-[14px] text-[#222]">L.POINT 통합회원 795점 적립(0.05%)</span>
              <InfoCircleIcon color="#AEAEB2"/>
            </div>
          </div>
          <div className="flex items-start gap-[14px] py-[8px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] pt-px shrink-0">배송</span>
            <span className="text-[14px] font-semibold text-[#1a1a1a]">하이마트 직접 배송 · 무료배송</span>
          </div>
          <div className="flex items-start gap-[14px]">
            <span className="w-[52px] shrink-0"/>
            <p className="text-[13px] text-[#767676] leading-[1.4]">
              상품/지역/물류 사정에 따라 배송지연 발생할 수 있음. 도서산간(제주 포함)의 경우, 추가 배송비 발생 가능
            </p>
          </div>
        </div>

        <Divider/>

        {/* Tabs + content */}
        <div className="relative">

          {/* Sticky tab bar */}
          <div className="sticky z-10 bg-white border-b border-[#eee] flex" style={{ top: navH }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => scrollTo(tab.id)} className="flex-1 py-[14px] text-[15px] relative">
                <span className={activeTab === tab.id ? "font-semibold text-[#da231c]" : "font-medium text-[#666]"}>
                  {tab.label}
                </span>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da231c]"/>}
              </button>
            ))}
          </div>

          {/* 상세정보 */}
          <div ref={sectionRefs.info as React.RefObject<HTMLDivElement>} data-tab="info" className="bg-white">
            <div className="px-[20px] py-[16px]">
              <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[12px]">상세정보</h3>
            </div>
            <div className="relative">
              <Image src={imgDetailImage} alt="상품 상세" className="w-full object-cover" style={{ display: "block" }}/>
              <div className="px-[20px] py-[16px]">
                <button className="w-full h-[48px] bg-white border border-[#666] rounded-[10px] flex items-center justify-center gap-[4px]">
                  <span className="text-[14px] font-semibold text-[#666]">상품상세 더보기</span>
                  <ChevronDownIcon color="#666666" size={14}/>
                </button>
              </div>
            </div>
          </div>

          <Divider/>

          {/* 스펙비교 */}
          <div ref={sectionRefs.spec as React.RefObject<HTMLDivElement>} data-tab="spec" className="bg-white">
            <div className="px-[20px] py-[16px]">
              <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[16px]">알고 구매하면 좋은 스펙</h3>
              {[
                { label:"종류",       value:"벽걸이형" },
                { label:"냉방면적",   value:"26.0㎡ (8평)" },
                { label:"인버터여부", value:"인버터" },
                { label:"냉매종류",   value:"R410A" },
                { label:"냉방능력",   value:"2.80kW" },
                { label:"소비전력",   value:"870W" },
                { label:"에너지효율", value:"1등급" },
                { label:"색상",       value:"화이트" },
              ].map((s,i) => (
                <div key={i} className="flex items-center justify-between py-[10px] border-b border-[#f0f0f0] last:border-0">
                  <span className="text-[14px] text-[#1a1a1a]">{s.label}</span>
                  <span className="text-[14px] font-bold text-[#1a1a1a]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <Divider/>

          {/* 스펙별 랭킹 */}
          <div className="bg-white px-[20px] py-[16px] flex flex-col gap-[14px]">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold text-[#1a1a1a]">스펙별 랭킹</h3>
              <div className="flex items-center gap-[2px]">
                <span className="text-[12px] font-medium text-[#767676]">자세히 비교하기</span>
                <ChevronRightIcon/>
              </div>
            </div>
            <div className="flex items-center gap-[7px] overflow-x-auto pb-[2px]">
              <span className="shrink-0 bg-[#666] text-white text-[11px] rounded-[999px] px-[13px] py-[8px] flex items-center gap-[5px]">
                가격대 <span className="font-medium">450,000 ~ 550,000</span>
              </span>
              {["종류","냉방면적","모터 ›","소비전력(월) ›"].map((c,i) => (
                <span key={i} className="shrink-0 border border-[#e5e5e5] text-[#1a1a1a] text-[13px] rounded-[999px] px-[13px] py-[8px]">{c}</span>
              ))}
            </div>
            {[
              { rank: 1, brand: "PLUX", name: "[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설.. ", price: "649,000원", benefit: "500,570원",
                tags: [["종류","벽걸이형"],["냉방면적","26㎡"],["편의기능","자동건조 | 타이머"],["모터","인버터"],["출시년도","2025년"],["e효율등급","3등급"]] },
              { rank: 2, brand: "캐리어", name: "인버터 벽걸이에어컨 EARB-0081FAWSD (26.0㎡) [전국기본설치비 포함]", price: "680,000원", benefit: "616,000원",
                tags: [["종류","벽걸이형"],["냉방면적","26㎡"],["편의기능","타이머 | 리모컨"],["모터","인버터"],["출시년도","2024년"],["e효율등급","5등급"]] },
            ].map((p,i) => (
              <div key={i} className="flex flex-col gap-[12px]">
                <div className="flex gap-[14px]">
                  <div className="relative w-[84px] h-[84px] rounded-[8px] border border-[#ebebeb] bg-[#f5f6f7] shrink-0 overflow-hidden">
                    <Image src={imgProductMain} alt={p.name} fill className="object-cover"/>
                    {i === 0 && (
                      <span className="absolute bottom-[6px] left-1/2 -translate-x-1/2 bg-[rgba(60,60,60,0.86)] rounded-[6px] px-[8px] py-[4px] text-[8.5px] font-medium text-white whitespace-nowrap">지금 보고있는상품</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[7px] mb-[2px]">
                      <span className="size-[18px] rounded-[5px] bg-[#1a1a1a] text-white text-[11px] font-bold flex items-center justify-center">{p.rank}</span>
                      <span className="text-[13px] text-[#767676]">{p.brand}</span>
                    </div>
                    <p className="text-[15px] font-semibold text-[#1a1a1a] leading-[1.4] line-clamp-2">{p.name}</p>
                    <p className="text-[16px] font-extrabold text-[#1a1a1a] mt-[5px]">{p.price}</p>
                    <div className="flex items-baseline gap-[6px]">
                      <span className="text-[16px] font-extrabold text-[#ff1344]">{p.benefit}</span>
                      <span className="text-[13px] text-[#1a1a1a]">최대혜택가</span>
                    </div>
                  </div>
                </div>
                <div className="border border-[#e5e5e5] rounded-[12px] px-[12px] py-[8px] flex items-center gap-[8px]">
                  <div className="flex-1 flex flex-col gap-[8px] min-w-0">
                    {[p.tags.slice(0,3), p.tags.slice(3,6)].map((row,r) => (
                      <div key={r} className="flex items-center gap-[4px] flex-wrap">
                        {row.map(([label,value],j) => (
                          <span key={j} className="text-[10px] flex items-center gap-[4px]">
                            <span className="text-[#999]">{label}</span><span className="text-[#333]">{value}</span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                  <ChevronDownCircleButton/>
                </div>
              </div>
            ))}
          </div>

          <Divider/>

          {/* 리뷰 */}
          <div ref={sectionRefs.review as React.RefObject<HTMLDivElement>} data-tab="review" className="bg-white">
            <div className="px-[20px] py-[16px]">
              <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[12px]">상품 리뷰</h3>
              <div className="flex items-center gap-[12px] mb-[12px]">
                <span className="text-[18px] text-[#da231c] tracking-[1px]">★★★★★</span>
                <span className="text-[24px] font-bold text-[#da231c]">4.2 (1,234)</span>
              </div>
              <div className="bg-[#f5f6f7] rounded-[8px] py-[8px] px-[11px] text-center mb-[12px]">
                <span className="text-[13px] text-[#767676]">사진/동영상 리뷰 70P / 최대 200P 적립 가능</span>
              </div>
              <div className="flex gap-[10px] overflow-x-auto pb-[4px] mb-[4px]">
                <div className="shrink-0 size-[74px] rounded-[8px] overflow-hidden bg-[#f5f6f7] relative">
                  <Image src={imgReviewThumbnail} alt="리뷰 사진" fill className="object-cover"/>
                </div>
              </div>
              {[
                { name:"김철수", rating:5, date:"2024.05.12", content:"설치도 빠르고 냉방 효과가 정말 좋아요! 5년 무상 AS도 마음에 들어요." },
                { name:"이영희", rating:5, date:"2024.04.28", content:"가성비 최고! 조용하고 전기세도 많이 안 나옵니다." },
                { name:"박지민", rating:4, date:"2024.04.15", content:"냉방이 잘 되고 설치기사님도 친절했어요." },
              ].map((r,i) => (
                <div key={i} className="py-[14px] border-b border-[#f0f0f0] last:border-0">
                  <div className="flex items-center justify-between mb-[6px]">
                    <div className="flex items-center gap-[8px]">
                      <div className="w-[32px] h-[32px] rounded-full bg-[#e5e5e5] flex items-center justify-center text-[14px] font-bold text-[#767676]">{r.name[0]}</div>
                      <div>
                        <p className="text-[13px] font-semibold text-[#1a1a1a]">{r.name}</p>
                        <p className="text-[11px] text-[#999]">{r.date}</p>
                      </div>
                    </div>
                    <span className="text-[12px] text-[#ff1344]">{"★".repeat(r.rating)}</span>
                  </div>
                  <p className="text-[13px] text-[#444] leading-[1.6]">{r.content}</p>
                </div>
              ))}
              <button className="w-full h-[46px] bg-white border border-[#666] rounded-[10px] flex items-center justify-center mt-[8px]">
                <span className="text-[14px] font-bold text-[#666]">리뷰 전체보기</span>
              </button>
            </div>
          </div>

          <Divider/>

          {/* Q&A + 상품 필수 정보 */}
          <div ref={sectionRefs.qna as React.RefObject<HTMLDivElement>} data-tab="qna" className="bg-white">
            <div className="px-[20px] py-[16px]">
              <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[16px]">상품 문의 (42)</h3>
              {[
                { q:"설치비 포함인가요?",           a:"네, 전국기본설치비가 포함된 상품입니다." },
                { q:"배송 기간은 얼마나 걸리나요?", a:"하이마트 직접 배송으로 주문 후 평균 2-3일 내 완료됩니다." },
                { q:"반품 기준은 어떻게 되나요?",   a:"설치 전 제품은 7일 이내 반품 가능합니다." },
              ].map((item,i) => (
                <div key={i} className="py-[14px] border-b border-[#f0f0f0] last:border-0">
                  <div className="flex items-start gap-[8px] mb-[8px]">
                    <span className="shrink-0 w-[20px] h-[20px] rounded-full bg-[#1a1a1a] text-white text-[11px] font-bold flex items-center justify-center">Q</span>
                    <p className="text-[14px] font-semibold text-[#1a1a1a]">{item.q}</p>
                  </div>
                  <div className="flex items-start gap-[8px]">
                    <span className="shrink-0 w-[20px] h-[20px] rounded-full bg-[#ff1344] text-white text-[11px] font-bold flex items-center justify-center">A</span>
                    <p className="text-[13px] text-[#444] leading-[1.6]">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-[20px] pb-[12px]">
              <h3 className="text-[17px] font-bold text-[#1a1a1a] py-[10px]">상품 필수 정보</h3>
              {["교환/환불 안내","주의사항"].map((label,i) => (
                <div key={i} className="flex items-center justify-between py-[13px] border-t border-[#eee]">
                  <span className="text-[15px] text-[#1a1a1a]">{label}</span>
                  <ChevronRightIcon color="#1A1A1A"/>
                </div>
              ))}
            </div>
          </div>

        </div>
        {/* end tabs */}

        <Divider/>

        {/* 다른 고객들이 함께본 상품 */}
        <div className="bg-white px-[20px] py-[16px]">
          <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-[14px]">다른 고객들이 함께본 상품이에요</h3>
          <div className="flex gap-[10px] overflow-x-auto pb-[4px]">
            {[
              { name:"LG전자 휘센 벽걸이에어컨\n18평형", price:"849,000원", badge:"10%" },
              { name:"삼성전자 무풍에어컨\n벽걸이 14평", price:"699,000원", badge:"8%" },
              { name:"캐리어 인버터\n벽걸이에어컨 10평", price:"429,000원", badge:"5%" },
            ].map(({ name, price, badge },i) => (
              <div key={i} className="shrink-0 w-[120px] flex flex-col">
                <div className="w-[120px] h-[120px] rounded-[10px] bg-[#f5f6f7] flex items-center justify-center mb-[8px] relative overflow-hidden">
                  <Image src={imgProductMain} alt={name} fill className="object-contain p-[8px]"/>
                  <span className="absolute top-[6px] left-[6px] bg-[#da231c] text-white text-[10px] font-bold px-[5px] py-[2px] rounded-[4px]">{badge}</span>
                </div>
                <p className="text-[12px] text-[#333] leading-tight whitespace-pre-line mb-[4px]">{name}</p>
                <p className="text-[13px] font-bold text-[#1a1a1a]">{price}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider/>

        {/* 지금 주목해야할 인기상품 */}
        <div className="bg-white px-[20px] py-[16px] mb-[20px]">
          <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-[14px]">지금 주목해야할 인기상품이에요</h3>
          <div className="flex gap-[10px] overflow-x-auto pb-[4px]">
            {[
              { name:"LG 오브제컬렉션\n벽걸이에어컨 7평", price:"월 62,100원", badge:"구독" },
              { name:"삼성 무풍에어컨\n벽걸이 6평 인버터", price:"529,000원", badge:"15%" },
              { name:"위니아 인버터\n벽걸이 에어컨", price:"319,000원", badge:"20%" },
            ].map(({ name, price, badge },i) => (
              <div key={i} className="shrink-0 w-[120px] flex flex-col">
                <div className="w-[120px] h-[120px] rounded-[10px] bg-[#f5f6f7] flex items-center justify-center mb-[8px] relative overflow-hidden">
                  <Image src={imgProductMain} alt={name} fill className="object-contain p-[8px]"/>
                  <span className="absolute top-[6px] left-[6px] bg-[#1a1a1a] text-white text-[10px] font-bold px-[5px] py-[2px] rounded-[4px]">{badge}</span>
                </div>
                <p className="text-[12px] text-[#333] leading-tight whitespace-pre-line mb-[4px]">{name}</p>
                <p className="text-[13px] font-bold text-[#1a1a1a]">{price}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      {/* end scroll area */}

      {/* ── Bottom bar ── */}
      <div className="shrink-0 bg-white border-t border-[#e5e5e5] z-20">
        <div className="flex items-center gap-[6px] px-[14px] pt-[11px] pb-[10px]">
          {/* 선물하기 */}
          <button className="w-[48px] h-[48px] rounded-[8px] bg-[#1a1a1a] flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M17.4167 7.33398H4.58333C3.57081 7.33398 2.75 8.1548 2.75 9.16732V17.4173C2.75 18.4298 3.57081 19.2507 4.58333 19.2507H17.4167C18.4292 19.2507 19.25 18.4298 19.25 17.4173V9.16732C19.25 8.1548 18.4292 7.33398 17.4167 7.33398Z" stroke="white" strokeWidth="1.46667"/>
              <path d="M2.75 10.9993H19.25M11 7.33268V19.2493M11 7.33268C11 7.33268 10.0833 3.66602 7.79167 3.66602C5.5 3.66602 5.5 7.33268 7.79167 7.33268M11 7.33268C11 3.66602 11.9167 3.66602 14.2083 3.66602C16.5 3.66602 16.5 7.33268 14.2083 7.33268" stroke="white" strokeWidth="1.46667" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* 전문가 가전상담 */}
          <button className="w-[114px] h-[48px] rounded-[8px] border border-[#1a1a1a] flex items-center justify-center shrink-0">
            <span className="text-[13px] font-bold text-[#1a1a1a]">전문가 가전상담</span>
          </button>
          {/* 구매하기 */}
          <button onClick={() => setShowSheet(true)} className="flex-1 h-[48px] bg-[#da231c] rounded-[8px] flex items-center justify-center">
            <span className="text-white text-[16px] font-bold">구매하기</span>
          </button>
        </div>
      </div>

      {/* ── Bottom Sheet ── */}
      {showSheet && (
        <div
          className="absolute inset-0 z-30"
          onClick={e => { if (e.target === e.currentTarget) setShowSheet(false); }}
        >
          {/* 딤 배경 */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowSheet(false)}/>
          {/* 시트 */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-tl-[20px] rounded-tr-[20px] shadow-[0px_-6px_14px_rgba(20,22,30,0.14)] border-t border-[#e3e6ea]">
            <div className="pt-[14px] pb-[20px] px-[16px]">
              {/* 드래그 바 */}
              <div className="flex justify-center mb-[10px]">
                <div className="w-[40px] h-[4px] bg-[#c2c6cd] rounded-full cursor-pointer" onClick={() => setShowSheet(false)}/>
              </div>
              {/* 상품명 */}
              <div className="bg-[#f2f4f7] rounded-tl-[8px] rounded-tr-[8px] px-[8px] py-[8px]">
                <p className="text-[10px] text-black leading-normal">
                  PLUX [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
                </p>
              </div>
              {/* 수량 + 금액 */}
              <div className="bg-[#f2f4f7] rounded-bl-[8px] rounded-br-[8px] px-[8px] py-[8px] flex items-center gap-[6px]">
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
              {/* 합계 */}
              <div className="flex items-center justify-end gap-[6px] pt-[24px]">
                <span className="text-[13px] text-[#6b7280]">합계</span>
                <span className="text-[19px] font-extrabold text-[#e5002b] tracking-[-0.3px]">{(UNIT_PRICE * qty).toLocaleString()}원</span>
              </div>
              {/* 버튼 */}
              <div className="flex gap-[8px] pt-[12px]">
                <button onClick={handleAddToCart} className="w-[176px] h-[48px] bg-white border border-[#1a1a1a] rounded-[8px] flex items-center justify-center">
                  <span className="text-[15px] font-bold text-[#1a1a1a]">장바구니</span>
                </button>
                <button onClick={() => { setShowSheet(false); onBuy(); }} className="flex-1 h-[48px] bg-[#1a1a1a] rounded-[8px] flex items-center justify-center">
                  <span className="text-[15px] font-bold text-white">바로구매</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 장바구니 담기 토스트 ── */}
      {showCartToast && (
        <div className="absolute left-[16px] right-[16px] bottom-[84px] z-40">
          <div className="bg-[rgba(26,26,26,0.9)] rounded-[7px] flex items-center justify-center p-[10px] h-[52px]">
            <span className="text-[14px] text-white tracking-[-0.045em] text-center">장바구니에 상품이 담았습니다.</span>
          </div>
        </div>
      )}

    </div>
  );
}
