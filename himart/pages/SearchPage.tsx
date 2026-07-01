"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import imgProductMain from "../img/product-main.png";
import imgDetailImage from "../img/product-detail.png";
import imgReviewThumbnail from "../img/review-thumb.png";
import imgVacuumBespoke from "../img/vacuum-bespoke.png";
import imgVacuumSlimfit from "../img/vacuum-slimfit.png";
import imgVacuumJet from "../img/vacuum-jet.png";
import imgBannerAnsimcare from "../img/banner-ansimcare.png";
import imgAircon from "../img/product-aircon.png";
import imgLgAircon from "../img/product-lg-airconditioner.png";

// ─── Types ───────────────────────────────────────────────────────
type Screen = "main" | "results" | "noresult" | "detail";
type Tab = "info" | "spec" | "review" | "qna";

// ─── Hangul IME ───────────────────────────────────────────────────
const CHO  = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const CHO_IDX: Record<string,number>  = Object.fromEntries(CHO.map((c,i) => [c,i]));
const JUNG_IDX: Record<string,number> = Object.fromEntries(JUNG.map((v,i) => [v,i]));
const JONG_IDX: Record<string,number> = Object.fromEntries(JONG.map((f,i) => f ? [f,i] : []).filter(Boolean) as [string,number][]);
const JONG_TO_CHO: Record<number,number> = {1:0,2:1,4:2,7:3,8:5,16:6,17:7,19:9,20:10,21:11,22:12,23:14,24:15,25:16,26:17,27:18};

type IMEState = { cho: number; jung?: number; jong?: number } | null;

function makeSyl(cho: number, jung: number, jong = 0) {
  return String.fromCharCode(0xAC00 + cho * 21 * 28 + jung * 28 + jong);
}
function renderIME(s: IMEState): string {
  if (!s) return "";
  if (s.jung === undefined) return CHO[s.cho];
  if (s.jong === undefined) return makeSyl(s.cho, s.jung);
  return makeSyl(s.cho, s.jung, s.jong);
}
function pressKey(key: string, committed: string, ime: IMEState): { committed: string; ime: IMEState } {
  const isV = key in JUNG_IDX, isC = key in CHO_IDX;
  if (!isV && !isC) return { committed, ime };
  if (!ime) return isC ? { committed, ime: { cho: CHO_IDX[key] } } : { committed: committed + makeSyl(11, JUNG_IDX[key]), ime: null };
  if (ime.jung === undefined) return isC ? { committed: committed + CHO[ime.cho], ime: { cho: CHO_IDX[key] } } : { committed, ime: { cho: ime.cho, jung: JUNG_IDX[key] } };
  if (isC) {
    if (ime.jong === undefined) { const ji = JONG_IDX[key]; return ji !== undefined ? { committed, ime: { ...ime, jong: ji } } : { committed: committed + makeSyl(ime.cho, ime.jung), ime: { cho: CHO_IDX[key] } }; }
    return { committed: committed + makeSyl(ime.cho, ime.jung, ime.jong), ime: { cho: CHO_IDX[key] } };
  }
  if (ime.jong !== undefined) { const newCho = JONG_TO_CHO[ime.jong]; return newCho !== undefined ? { committed: committed + makeSyl(ime.cho, ime.jung), ime: { cho: newCho, jung: JUNG_IDX[key] } } : { committed: committed + makeSyl(ime.cho, ime.jung, ime.jong), ime: { cho: 11, jung: JUNG_IDX[key] } }; }
  return { committed: committed + makeSyl(ime.cho, ime.jung), ime: { cho: 11, jung: JUNG_IDX[key] } };
}
function backspace(committed: string, ime: IMEState): { committed: string; ime: IMEState } {
  if (ime) { if (ime.jong !== undefined) return { committed, ime: { cho: ime.cho, jung: ime.jung } }; if (ime.jung !== undefined) return { committed, ime: { cho: ime.cho } }; return { committed, ime: null }; }
  return { committed: committed.slice(0, -1), ime: null };
}

// ─── Constants ───────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
  { id: "info", label: "상세정보" }, { id: "spec", label: "스펙비교" }, { id: "review", label: "리뷰(1,234)" }, { id: "qna", label: "Q&A" },
];
const AUTOCOMPLETE = ["에어팟","에어컨","lg전자 에어컨","에어컨 청소","에어프라이어","에브리봇 청소기","삼성전자 에어컨","에어컨 필터"];
const CATEGORIES = ["에어컨·계절가전 > 에어컨","냉장고·주방가전 > 에어프라이어·튀김기","소모품 > 에어컨소모품"];
const KB_ROWS = [
  ["ㅂ","ㅈ","ㄷ","ㄱ","ㅅ","ㅛ","ㅕ","ㅑ","ㅐ","ㅔ"],
  ["ㅁ","ㄴ","ㅇ","ㄹ","ㅎ","ㅗ","ㅓ","ㅏ","ㅣ"],
  ["⇧","ㅋ","ㅌ","ㅊ","ㅍ","ㅠ","ㅜ","ㅡ","⌫"],
];

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`, "gi");
  return <>{text.split(re).map((p,i) => re.test(p) ? <span key={i} className="text-[#ee0000] font-medium">{p}</span> : p)}</>;
}

// ─── 자동완성 ─────────────────────────────────────────────────────
function InlineAutocomplete({ query, onPick, onSearch }: { query: string; onPick: (s: string) => void; onSearch: () => void }) {
  const filtered = query ? AUTOCOMPLETE.filter(s => s.includes(query)) : AUTOCOMPLETE;
  return (
    <div className="size-full overflow-y-auto bg-white font-['Pretendard',sans-serif]">
      <div className="py-[16px]">
        <div className="px-[16px] py-[4px]"><span className="text-[12px] text-[#999] tracking-[0.44px] font-medium">카테고리 바로가기</span></div>
        {CATEGORIES.map((s, i) => {
          const [left, right] = s.split(" > ");
          return (
            <button key={i} onClick={() => { onPick(right); onSearch(); }} className="w-full flex items-center justify-between px-[16px] py-[10px]">
              <span className="text-[14px] text-[#222]">{left}{" > "}<Highlight text={right} query={query} /></span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4 2L7 5.5L4 9" stroke="#767676" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          );
        })}
      </div>
      <div className="bg-[#f7f7f7] h-[4px]" />
      <div>
        <div className="px-[16px] py-[4px] pt-[16px]"><span className="text-[12px] text-[#999] tracking-[0.44px] font-medium">자동완성</span></div>
        <div className="grid grid-cols-2">
          {filtered.map((s, i) => (
            <button key={i} onClick={() => { onPick(s); onSearch(); }} className="flex items-center justify-between px-[16px] py-[9px] h-[38px]">
              <span className="text-[14px] text-[#222]"><Highlight text={s} query={query} /></span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L8 8L12 12" stroke="#CDCDCD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"/><path d="M5 4L5 12" stroke="#CDCDCD" strokeLinecap="round" strokeWidth="1.2"/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 검색 메인 홈 ─────────────────────────────────────────────────
function SearchHomeBody({ onDetail }: { onDetail: () => void }) {
  const recentKeywords = ["에어컨", "보조배터리", "건조기"];
  const suggestedKeywords = ["냉장고", "스타일러", "에어플라이어", "그램 노트북"];
  const popularKeywords = ["에어컨", "선풍기", "무풍에어컨", "벽걸이에어컨", "스탠드 에어컨", "실링팬"];

  const recentProducts = [
    { brand: "LG전자", name: "디오스 오브제컬렉션 정수기", discount: "27%", price: "529,000", benefit: "390,000" },
    { brand: "삼성전자", name: "비스포크 김치플러스 4도어", discount: "27%", price: "1,890,000", benefit: "1,290,000" },
    { brand: "쿠쿠", name: "스탠드형 김치냉장고 300L", price: "77,544", benefit: "56,544", subscript: true },
    { brand: "LG전자", name: "디오스 오브제컬렉션 정수기", discount: "27%", price: "529,000", benefit: "390,000" },
  ];

  const aiProducts = [
    { img: imgVacuumBespoke, brand: "삼성전자", name: "BESPOKE AI 제트 Lite\n무선청소기", discount: "27%", price: "1,231,000", benefit: "1,181,760" },
    { img: imgVacuumSlimfit, brand: "쿠쿠", name: "슬림핏 청소기\nCVC-G08FF30NW", discount: "27%", price: "285,000" },
    { img: imgVacuumJet, brand: "삼성전자", name: "[제주지역한정]삼성\n청소기 제트 VS20C954AQB", discount: "27%", price: "529,000" },
  ];

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
      {/* 최근 검색어 */}
      <div className="px-[16px] py-[16px]">
        <div className="flex items-center justify-between mb-[10px]">
          <p className="text-[14px] font-bold text-[#1a1a1a]">최근 검색어</p>
          <button className="text-[12px] text-[#666]">전체 삭제</button>
        </div>
        <div className="flex flex-wrap gap-[8px]">
          {recentKeywords.map(kw => (
            <div key={kw} className="flex items-center gap-[4px] border border-[#e5e5e5] rounded-[999px] px-[14px] py-[9px] h-[32px]">
              <span className="text-[13px] text-[#1a1a1a]">{kw}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.083"/>
              </svg>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-[#f0f0f0]"/>

      {/* 추천 검색어 */}
      <div className="px-[16px] py-[16px]">
        <div className="flex items-center gap-[6px] mb-[10px]">
          <p className="text-[14px] font-bold text-[#1a1a1a]">추천 검색어</p>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM9 13.5C8.37868 13.5 7.875 12.9963 7.875 12.375C7.875 11.7537 8.37868 11.25 9 11.25C9.62132 11.25 10.125 11.7537 10.125 12.375C10.125 12.9963 9.62132 13.5 9 13.5ZM9.75 9.75H8.25V4.5H9.75V9.75Z" fill="#AEAEB2"/>
          </svg>
        </div>
        <div className="flex flex-wrap gap-[8px]">
          {suggestedKeywords.map(kw => (
            <div key={kw} className="flex items-center border border-[#e5e5e5] rounded-[999px] px-[14px] py-[9px] h-[33px]">
              <span className="text-[13px] text-[#1a1a1a]">{kw}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[4px] bg-[#f5f5f5]"/>

      {/* 최근 관심 & 장바구니 상품 */}
      <div className="px-[16px] py-[16px]">
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-[10px]">최근 관심 &amp; 장바구니 상품</p>
        <div className="flex gap-[10px] overflow-x-auto pb-[4px]">
          {recentProducts.map((p, i) => (
            <button key={i} onClick={onDetail} className="shrink-0 w-[120px] flex flex-col gap-[2px] text-left">
              <div className="w-[120px] h-[120px] rounded-[10px] bg-[#f5f6f7] flex items-center justify-center">
                <svg width="46" height="56" viewBox="0 0 46 56" fill="none">
                  <path d="M3 6C3 4.34315 4.34315 3 6 3H30L43 16V50C43 51.6569 41.6569 53 40 53H6C4.34315 53 3 51.6569 3 50V6Z" fill="#F2F4F6" stroke="#CDD3DA" strokeWidth="1.05"/>
                  <path d="M11.1 22.4H34.9" stroke="#CDD3DA" strokeWidth="0.875"/>
                  <path d="M11.1 38.5H34.9" stroke="#CDD3DA" strokeWidth="0.875"/>
                </svg>
              </div>
              <p className="text-[12px] text-[#767676] pt-[6px]">{p.brand}</p>
              <p className="text-[13px] text-[#1a1a1a] leading-[17.55px] line-clamp-2">{p.name}</p>
              {p.discount && (
                <div className="flex gap-[4px] items-center">
                  <span className="text-[13px] font-bold text-[#ff1344]">{p.discount}</span>
                  <span className="text-[13px] font-bold text-[#1a1a1a]">{p.price}원</span>
                </div>
              )}
              {!p.discount && <p className="text-[13px] font-bold text-[#1a1a1a]">{p.price}원</p>}
              {p.benefit && (
                <p className="text-[10px] text-[#ff1344]">{p.benefit}원 최대혜택가</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[4px] bg-[#f5f5f5]"/>

      {/* AI 가전 플래너 상품 추천 */}
      <div className="px-[16px] py-[16px]">
        <div className="flex items-center gap-[6px] mb-[10px] h-[18px]">
          <p className="text-[14px] font-bold text-[#1a1a1a]">AI 가전 플래너 상품 추천</p>
          <div className="flex items-center justify-center border border-[#aeaeb2] rounded-[7.5px] size-[15px]">
            <span className="text-[10px] font-bold text-[#aeaeb2]">i</span>
          </div>
        </div>
        <div className="flex gap-[7px] overflow-x-auto pb-[4px]">
          {aiProducts.map((p, i) => (
            <button key={i} onClick={onDetail} className="shrink-0 w-[120px] flex flex-col gap-[2px] text-left">
              <div className="w-[120px] h-[120px] rounded-[10px] bg-[#f5f6f7] relative">
                <Image src={p.img} alt={p.brand} className="object-contain rounded-[10px]" fill />
              </div>
              <p className="text-[12px] text-[#767676] pt-[6px]">{p.brand}</p>
              <div className="h-[35px] overflow-hidden">
                {p.name.split("\n").map((line, j) => (
                  <p key={j} className="text-[13px] text-[#1a1a1a] leading-[17.55px]">{line}</p>
                ))}
              </div>
              <div className="flex gap-[4px] items-center">
                {p.discount && <span className="text-[13px] font-bold text-[#ff1344]">{p.discount}</span>}
                <span className="text-[13px] font-bold text-[#1a1a1a]">{p.price}원</span>
              </div>
              {p.benefit && (
                <p className="text-[10px] text-[#ff1344]">{p.benefit}원 최대혜택가</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[4px] bg-[#f5f5f5]"/>

      {/* 최근 1시간 인기 검색어 */}
      <div className="px-[16px] py-[16px]">
        <div className="flex items-center justify-between mb-[10px] h-[18px]">
          <p className="text-[14px] font-bold text-[#1a1a1a]">최근 1시간 인기 검색어</p>
          <p className="text-[12px] text-[#999]">11:00 업데이트</p>
        </div>
        <div className="grid grid-cols-2 gap-x-[10px]">
          {popularKeywords.map((kw, i) => (
            <div key={kw} className="flex items-center gap-[8px] py-[8px] text-[14px] text-[#1a1a1a]">
              <span className="font-medium shrink-0">{i + 1}</span>
              <span>{kw}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[4px] bg-[#f5f5f5]"/>

      {/* 안심케어 서비스 */}
      <div className="px-[16px] py-[16px]">
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-[10px]">안심케어 서비스</p>
        <div className="relative w-full rounded-[4px] overflow-hidden" style={{ aspectRatio: "399/194" }}>
          <Image src={imgBannerAnsimcare} alt="안심케어 서비스" className="object-cover" fill />
        </div>
      </div>
    </div>
  );
}

// ─── 검색결과 없음 ────────────────────────────────────────────────
function NoResultScreen({ query, onViewSuggested }: { query: string; onViewSuggested: () => void }) {
  return (
    <div className="size-full overflow-y-auto bg-white font-['Pretendard',sans-serif]">
      <div className="px-[16px] pt-[20px]">
        <div className="rounded-[14px] bg-[#f7f7f7] flex flex-col items-center gap-[12px] px-[18px] py-[20px]">
          <div className="flex items-center justify-center gap-[10px] w-full">
            <div className="shrink-0 w-[36px] h-[36px] rounded-full bg-[rgba(238,238,238,0.93)] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#000" strokeWidth="1.5"/><path d="M12.6 12.6L16.2 16.2" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="text-[14px] text-[#6b7280]">&quot;{query}&quot; 검색 결과가 없어요</p>
              <div className="flex items-center gap-[6px] pt-[4px]">
                <span className="text-[13px] text-[#6b7280]">혹시</span>
                <span className="bg-[#eeeeee] text-[#1a1a1a] text-[13px] font-semibold px-[6px] py-[2px] rounded-[4px]">&quot;에어컨&quot;</span>
                <span className="text-[13px] text-[#6b7280]">을 찾으셨나요?</span>
              </div>
            </div>
          </div>
          <button onClick={onViewSuggested} className="w-full bg-[#eef3ff] border border-[#c5d4fd] rounded-[12px] px-[16px] py-[12px] flex items-center justify-center gap-[8px]">
            <span className="text-[14px] font-bold text-[#486ef6]">&quot;에어컨&quot; 결과 보기</span>
            <svg width="7" height="11" viewBox="0 0 7 11" fill="none"><path d="M1 1L6 5.5L1 10" stroke="#486EF6" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div className="px-[16px] pt-[16px] pb-[8px]">
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-[8px]">보다 정확한 맞춤 검색이 필요하다면?</p>
        <button className="w-full flex items-center gap-[4px] bg-[#edf6fd] border border-[#edf6fd] rounded-[8px] px-[16px] py-[8px]">
          <span className="text-[14px] leading-none shrink-0">💡</span>
          <span className="flex-1 text-left text-[13px] font-bold text-[#047bdb]">하이마트 AI 하비(HAVI)로 똑똑하게 검색해보기</span>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="shrink-0"><path d="M1 1L5 5L1 9" stroke="#047BDB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="px-[16px] pt-[16px]">
        <p className="text-[14px] font-bold text-[#1a1a1a] mb-[12px]">추천 검색어</p>
        <div className="flex flex-wrap gap-[8px]">
          {AUTOCOMPLETE.map(kw => (
            <button key={kw} className="border border-[#e5e5e5] rounded-[99px] px-[12px] py-[6px] text-[13px] text-[#333]">{kw}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 검색결과 ─────────────────────────────────────────────────────
const RESULT_PRODUCTS = [
  {
    brand: "PLUX",
    name: "[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]",
    price: "549,000",
    originalPrice: "649,000",
    discount: "15%",
    rating: "4.6",
    reviewCount: "43",
    tags: ["구독 가능", "가전 보험"],
    img: imgAircon,
  },
  {
    brand: "LG전자",
    name: "오브제 쿨 에어컨",
    price: "62,100",
    originalPrice: "87,000",
    discount: "10%",
    rating: "4.6",
    reviewCount: "43",
    tags: ["구독 가능", "가전 보험"],
    img: imgLgAircon,
  },
  {
    brand: "LG전자",
    name: "오브제 쿨 에어컨",
    price: "62,100",
    originalPrice: "87,000",
    discount: "10%",
    rating: "4.6",
    reviewCount: "43",
    tags: ["구독 가능", "가전 보험"],
    img: imgLgAircon,
  },
  {
    brand: "LG전자",
    name: "오브제 쿨 에어컨",
    price: "62,100",
    originalPrice: "87,000",
    discount: "10%",
    rating: "4.6",
    reviewCount: "43",
    tags: ["구독 가능", "가전 보험"],
    img: imgLgAircon,
  },
];

const FILTER_CHIPS = ["감사페스티벌", "가전 전문가 간편상담", "월납부 구독상품", "월납부 구독상품"];

const SPEC_FILTERS = [
  { label: "브랜드", options: ["삼성", "LG", "위니아", "캐리어"] },
  { label: "전체용량", options: ["~300L", "300~500L", { text: "500L~", hot: true }] },
  { label: "도어수", options: ["1도어", { text: "2도어", hot: true }, "4도어"] },
];

function ResultsScreen({ query, onDetail }: { query: string; onDetail: () => void }) {
  const [activeChip, setActiveChip] = useState(0);

  return (
    <div className="size-full overflow-y-auto bg-white">
      {/* 필터 칩 */}
      <div className="flex gap-[8px] px-[16px] py-[12px] overflow-x-auto shrink-0">
        {FILTER_CHIPS.map((chip, i) => (
          <button
            key={i}
            onClick={() => setActiveChip(i)}
            className="shrink-0 h-[34px] px-[14px] rounded-[999px] text-[13px] font-medium transition-colors"
            style={{
              background: activeChip === i ? "#da231c" : "white",
              color: activeChip === i ? "white" : "#333",
              border: activeChip === i ? "none" : "1px solid #ddd",
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* 가전 스펙 필터 */}
      <div className="border-t border-b border-[#eee] px-[16px] py-[4px]">
        <p className="text-[13px] font-bold text-[#1a1a1a] py-[10px]">가전 스펙 필터</p>
        {SPEC_FILTERS.map((row, ri) => (
          <div key={ri} className="flex items-center gap-[0px] py-[10px] border-t border-[#f0f0f0]">
            <span className="text-[13px] text-[#555] w-[60px] shrink-0">{row.label}</span>
            <div className="flex gap-[16px] flex-wrap">
              {row.options.map((opt, oi) => {
                const text = typeof opt === "string" ? opt : opt.text;
                const hot = typeof opt === "object" && opt.hot;
                return (
                  <div key={oi} className="relative flex items-center">
                    <span className="text-[13px] text-[#1a1a1a]">{text}</span>
                    {hot && (
                      <span className="absolute -top-[8px] -right-[20px] text-[9px] font-bold text-[#da231c]">HOT</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 정렬 바 */}
      <div className="flex items-center justify-between px-[16px] py-[10px] border-b border-[#eee]">
        <button className="flex items-center gap-[4px]">
          <div className="w-[16px] h-[16px] rounded-full border border-[#888] flex items-center justify-center">
            <span className="text-[10px] text-[#888] font-bold leading-none">+</span>
          </div>
          <span className="text-[13px] text-[#555]">상품비교</span>
        </button>
        <div className="flex items-center gap-[10px]">
          <button className="flex items-center gap-[4px]">
            <span className="text-[13px] text-[#1a1a1a] font-medium">판매랭킹순</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"/>
            </svg>
          </button>
          <button className="flex items-center justify-center w-[28px] h-[28px]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M5 10H15M8 15H12" stroke="#333" strokeLinecap="round" strokeWidth="1.4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 상품 리스트 */}
      <div className="divide-y divide-[#f0f0f0]">
        {RESULT_PRODUCTS.map((p, i) => (
          <button key={i} onClick={onDetail} className="w-full flex gap-[14px] px-[16px] py-[16px] text-left items-start">
            {/* 상품 이미지 */}
            <div className="shrink-0 w-[130px] h-[130px] bg-[#f5f6f7] rounded-[8px] relative overflow-hidden">
              <Image src={p.img} alt={p.brand} fill className="object-contain p-[8px]" />
            </div>
            {/* 상품 정보 */}
            <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
              <p className="text-[12px] text-[#888]">{p.brand}</p>
              <p className="text-[14px] text-[#1a1a1a] leading-[1.4] line-clamp-2">{p.name}</p>
              <p className="text-[12px] text-[#aaa] line-through">{p.originalPrice}</p>
              <div className="flex items-center gap-[4px]">
                <span className="text-[15px] font-bold text-[#1a1a1a]">{p.discount}</span>
                <span className="text-[15px] font-bold text-[#da231c]">{p.price}</span>
                <span className="text-[13px] text-[#da231c]">원</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <span className="text-[#f5a623] text-[12px]">★</span>
                <span className="text-[12px] text-[#555]">{p.rating} 리뷰 {p.reviewCount}</span>
              </div>
              <p className="text-[12px] text-[#888]">무료배송 | 기본설치비무료</p>
              <div className="flex gap-[6px] mt-[2px]">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-[#666] border border-[#ddd] rounded-[4px] px-[6px] py-[2px]">{tag}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 상품 상세 ────────────────────────────────────────────────────
const Divider = () => <div className="h-[8px] bg-[#e8e8e8]"/>;

function DetailScreen({ onBack, onBuy, onCart }: { onBack: () => void; onBuy: () => void; onCart: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = { info: useRef<HTMLDivElement>(null), spec: useRef<HTMLDivElement>(null), review: useRef<HTMLDivElement>(null), qna: useRef<HTMLDivElement>(null) };
  const navRef = useRef<HTMLDivElement>(null);
  const [navH, setNavH] = useState(0);
  useLayoutEffect(() => { if (navRef.current) setNavH(navRef.current.offsetHeight); }, []);

  const scrollTo = (tab: Tab) => {
    setActiveTab(tab);
    const el = sectionRefs[tab].current;
    if (el && scrollRef.current) {
      const off = el.getBoundingClientRect().top - scrollRef.current.getBoundingClientRect().top + scrollRef.current.scrollTop - navH;
      scrollRef.current.scrollTo({ top: off, behavior: "smooth" });
    }
  };

  return (
    <div className="size-full flex flex-col font-['Pretendard',sans-serif]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div ref={navRef} className="sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between px-[12px] py-[16px]">
            <button onClick={onBack} className="flex items-center justify-center w-[20px] h-[20px]">
              <svg width="10" height="18" viewBox="0 0 10 18" fill="none"><path d="M9 1L1 9L5 13L9 17" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex items-center gap-[10px]">
              <button className="p-[4px]">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 19L4 12C2.5 10 2.5 7 4.5 5.5C6.5 4 9 4.5 11 7C13 4.5 15.5 4 17.5 5.5C19.5 7 19.5 10 18 12L11 19Z" stroke="#888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="p-[4px]" onClick={onCart}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 3H5L7.5 14H16.5L19 6H7" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="17.5" r="1.5" fill="#1A1A1A"/><circle cx="15" cy="17.5" r="1.5" fill="#1A1A1A"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="w-full aspect-square bg-[#f5f6f7] relative">
          <Image src={imgProductMain} alt="PLUX 에어컨" className="w-full h-full object-contain" fill />
          <div className="absolute left-[16px] bottom-[17px] bg-[rgba(0,0,0,0.62)] rounded-[999px] flex items-center gap-[5px] px-[11px] py-[6px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[#ff4d4d] shrink-0"/>
            <span className="text-[12px] font-medium text-white tracking-[-0.2px]">지금 48명이 보는 중</span>
          </div>
          <div className="absolute right-[15.62px] bottom-[17px] bg-[rgba(0,0,0,0.55)] rounded-[999px] px-[11px] py-[5px]">
            <span className="text-[12px] font-semibold text-white">1/5</span>
          </div>
        </div>

        <div className="px-[20px] py-[16px] bg-white">
          <h1 className="text-[18px] font-semibold text-[#1a1a1a] tracking-[-0.2px] leading-[1.4] mb-[4px]">
            [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
          </h1>
          <p className="text-[13px] text-[#808080]">모델명 PLX-RAC0825CHWH</p>
          <div className="flex items-center gap-[6px] mt-[8px]">
            <span className="text-[13px] text-[#ff1344]">★★★★<span className="text-[#e5e5e5]">★</span></span>
            <span className="text-[13px] font-bold text-[#1a1a1a]">4.9</span>
            <span className="text-[13px] text-[#767676]">(리뷰 14)</span>
            <div className="ml-auto"><span className="bg-[#ffecec] text-[#ff1344] text-[12px] font-medium px-[10px] py-[5px] rounded-[999px]">전문가 상담 가능 ›</span></div>
          </div>
        </div>

        <div className="px-[20px] py-[16px] bg-white mt-[8px]">
          <p className="text-[13px] text-[#aeaeb2] line-through mb-[2px]">619,000원</p>
          <div className="flex items-baseline gap-[8px] mb-[16px]">
            <span className="text-[24px] font-bold text-[#ff1344]">15%</span>
            <span className="text-[26px] font-extrabold text-[#1a1a1a]">549,000원</span>
          </div>
          <div className="border border-[#ff9797] rounded-[10px] flex items-center justify-between px-[15px] py-[13px]">
            <span className="text-[13px] font-semibold text-[#1a1a1a]">최대 혜택가</span>
            <div className="flex items-center gap-[10px]">
              <span className="text-[17px] font-extrabold text-[#ff1344]">500,570원</span>
              <span className="bg-[#ffecec] text-[#ff1344] text-[12px] font-medium px-[10px] py-[5px] rounded-[999px]">혜택보기 ›</span>
            </div>
          </div>
        </div>

        <Divider/>

        <div className="px-[20px] py-[16px] flex flex-col gap-[12px] bg-white">
          <div className="flex items-center gap-[8px]">
            <span className="text-[17px] font-bold text-[#1a1a1a]">배송 · 혜택</span>
          </div>
          <div className="flex items-start gap-[14px] py-[4px]">
            <span className="text-[14px] font-medium text-[#222] w-[52px] shrink-0">배송</span>
            <span className="text-[14px] font-semibold text-[#1a1a1a]">하이마트 직접 배송 · 무료배송</span>
          </div>
        </div>

        <Divider/>

        <div className="relative">
          <div className="sticky z-10 bg-white border-b border-[#eee] flex" style={{ top: navH }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => scrollTo(tab.id)} className="flex-1 py-[14px] text-[15px] relative">
                <span className={activeTab===tab.id ? "font-semibold text-[#da231c]" : "font-medium text-[#666]"}>{tab.label}</span>
                {activeTab===tab.id && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#da231c]"/>}
              </button>
            ))}
          </div>

          <div ref={sectionRefs.info} className="bg-white">
            <div className="px-[20px] py-[16px]"><h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[12px]">상세정보</h3></div>
            <div className="relative">
              <Image src={imgDetailImage} alt="상품 상세" className="w-full object-cover" width={390} height={600} />
              <div className="absolute left-0 right-0 bottom-0 px-[20px] py-[16px]">
                <button className="w-full h-[48px] bg-white border border-[#666] rounded-[10px] flex items-center justify-center">
                  <span className="text-[14px] font-semibold text-[#666]">상품상세 더보기 ▾</span>
                </button>
              </div>
            </div>
          </div>

          <Divider/>

          <div ref={sectionRefs.spec} className="bg-white px-[20px] py-[16px]">
            <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[16px]">알고 구매하면 좋은 스펙</h3>
            {[["종류","벽걸이형"],["냉방면적","26.0㎡ (8평)"],["인버터여부","인버터"],["냉매종류","R410A"],["냉방능력","2.80kW"],["소비전력","870W"],["에너지효율","1등급"],["색상","화이트"]].map(([label, value], i) => (
              <div key={i} className="flex items-center justify-between py-[10px] border-b border-[#f0f0f0] last:border-0">
                <span className="text-[14px] text-[#1a1a1a]">{label}</span>
                <span className="text-[14px] font-bold text-[#1a1a1a]">{value}</span>
              </div>
            ))}
          </div>

          <Divider/>

          <div ref={sectionRefs.review} className="bg-white px-[20px] py-[16px]">
            <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[12px]">상품 리뷰</h3>
            <div className="flex items-center gap-[12px] mb-[12px]">
              <span className="text-[18px] text-[#da231c]">★★★★★</span>
              <span className="text-[24px] font-bold text-[#da231c]">4.2 (1,234)</span>
            </div>
            <div className="flex gap-[10px] overflow-x-auto pb-[4px] mb-[4px]">
              <div className="shrink-0 size-[74px] rounded-[8px] overflow-hidden bg-[#f5f6f7] relative">
                <Image src={imgReviewThumbnail} alt="리뷰 사진" className="object-cover" fill />
              </div>
            </div>
            {[{ name:"김철수", rating:5, date:"2024.05.12", content:"설치도 빠르고 냉방 효과가 정말 좋아요!" },{ name:"이영희", rating:5, date:"2024.04.28", content:"가성비 최고! 조용하고 전기세도 많이 안 나옵니다." }].map((r,i) => (
              <div key={i} className="py-[14px] border-b border-[#f0f0f0] last:border-0">
                <div className="flex items-center gap-[8px] mb-[6px]">
                  <div className="w-[32px] h-[32px] rounded-full bg-[#e5e5e5] flex items-center justify-center text-[14px] font-bold text-[#767676]">{r.name[0]}</div>
                  <div><p className="text-[13px] font-semibold text-[#1a1a1a]">{r.name}</p><p className="text-[11px] text-[#999]">{r.date}</p></div>
                  <span className="ml-auto text-[12px] text-[#ff1344]">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-[13px] text-[#444] leading-[1.6]">{r.content}</p>
              </div>
            ))}
          </div>

          <Divider/>

          <div ref={sectionRefs.qna} className="bg-white px-[20px] py-[16px]">
            <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-[16px]">상품 문의 (42)</h3>
            {[{ q:"설치비 포함인가요?", a:"네, 전국기본설치비가 포함된 상품입니다." },{ q:"배송 기간은?", a:"평균 2-3일 내 배송 완료됩니다." }].map((item,i) => (
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
        </div>

        <Divider/>
        <div className="h-[100px]" />
      </div>

      <div className="shrink-0 bg-white border-t border-[#e5e5e5] z-20">
        <div className="flex items-center gap-[6px] px-[14px] pt-[11px] pb-[10px]">
          <button onClick={onCart} className="w-[114px] h-[48px] rounded-[8px] border border-[#1a1a1a] flex items-center justify-center shrink-0">
            <span className="text-[15px] font-bold text-[#1a1a1a]">장바구니</span>
          </button>
          <button onClick={onBuy} className="flex-1 h-[48px] rounded-[8px] bg-[#da231c] flex items-center justify-center">
            <span className="text-[15px] font-bold text-white">바로구매</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 검색바 ──────────────────────────────────────────────────────
function SearchBar({ query, displayQuery, focused, onFocus, onKey, onBackspace, onSearch, onClear, onBack, showIcons, onCart }: {
  query: string; displayQuery: string; focused: boolean;
  onFocus: () => void; onKey: (k: string) => void; onBackspace: () => void;
  onSearch: () => void; onClear: () => void; onBack: () => void;
  showIcons?: boolean; onCart?: () => void;
}) {
  return (
    <div className="shrink-0 flex items-center px-[12px] py-[10px] gap-[8px] border-b border-[#f0f0f0] bg-white">
      <button onClick={onBack} className="p-[4px] shrink-0">
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M8 1L1 8L8 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button onClick={onFocus} className="flex-1 h-[40px] bg-[#f5f6f7] rounded-[999px] flex items-center px-[12px] gap-[8px] min-w-0">
        <span className={`flex-1 text-[14px] text-left truncate ${displayQuery ? "text-[#1a1a1a]" : "text-[#aaa]"}`}>
          {displayQuery || "검색어를 입력해주세요"}
        </span>
        {displayQuery && (
          <button onClick={(e) => { e.stopPropagation(); onClear(); }} className="shrink-0 w-[18px] h-[18px] rounded-full bg-[#c0c0c0] flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1L7 7M7 1L1 7" stroke="white" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </button>
        )}
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="shrink-0"><circle cx="7.5" cy="7.5" r="5.5" stroke="#888" strokeWidth="1.5"/><path d="M12 12L15 15" stroke="#888" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
      {showIcons ? (
        <>
          {/* 바코드 아이콘 */}
          <button className="shrink-0 p-[4px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="2" height="16" fill="#1a1a1a"/>
              <rect x="6" y="4" width="1" height="16" fill="#1a1a1a"/>
              <rect x="8.5" y="4" width="2" height="16" fill="#1a1a1a"/>
              <rect x="12" y="4" width="1" height="16" fill="#1a1a1a"/>
              <rect x="14" y="4" width="2" height="16" fill="#1a1a1a"/>
              <rect x="17" y="4" width="1" height="16" fill="#1a1a1a"/>
              <rect x="19" y="4" width="2" height="16" fill="#1a1a1a"/>
            </svg>
          </button>
          {/* 장바구니 아이콘 (뱃지) */}
          <button onClick={onCart} className="shrink-0 p-[4px] relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L7.5 16H17.5L20 7H7" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="19.5" r="1.5" fill="#1A1A1A"/>
              <circle cx="17" cy="19.5" r="1.5" fill="#1A1A1A"/>
            </svg>
            <span className="absolute -top-[1px] -right-[1px] w-[16px] h-[16px] rounded-full bg-[#da231c] flex items-center justify-center">
              <span className="text-white text-[9px] font-bold leading-none">1</span>
            </span>
          </button>
        </>
      ) : (
        <button onClick={onSearch} className="text-[14px] font-medium text-[#1a1a1a] shrink-0">검색</button>
      )}
    </div>
  );
}

// ─── 한글 키보드 ─────────────────────────────────────────────────
function HangeulKeyboard({ onKey, onBackspace, onSearch }: { onKey: (k: string) => void; onBackspace: () => void; onSearch: () => void }) {
  return (
    <div className="shrink-0 bg-[#d1d5db] pt-[8px] pb-[4px] px-[3px]">
      {KB_ROWS.map((row, ri) => (
        <div key={ri} className={`flex justify-center gap-[6px] mb-[8px] ${ri === 1 ? "px-[14px]" : ""}`}>
          {row.map((key) => {
            if (key === "⌫") return (
              <button key={key} onClick={onBackspace} className="flex-1 max-w-[42px] h-[42px] rounded-[5px] bg-[#aab4c0] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.3)]">
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none"><path d="M7 1L1 7L7 13M1 7H17" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            );
            if (key === "⇧") return (
              <button key={key} className="flex-1 max-w-[42px] h-[42px] rounded-[5px] bg-[#aab4c0] flex items-center justify-center shadow-[0_1px_0_rgba(0,0,0,0.3)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L2 8H5V14H11V8H14L8 2Z" fill="#1a1a1a"/></svg>
              </button>
            );
            return (
              <button key={key} onClick={() => onKey(key)} className="flex-1 max-w-[42px] h-[42px] rounded-[5px] bg-white text-[18px] text-[#1a1a1a] shadow-[0_1px_0_rgba(0,0,0,0.3)] active:bg-[#e5e5e5]">
                {key}
              </button>
            );
          })}
        </div>
      ))}
      <div className="flex gap-[6px] px-[3px] mb-[4px]">
        <button className="w-[86px] h-[42px] rounded-[5px] bg-[#aab4c0] text-[14px] text-[#1a1a1a] shadow-[0_1px_0_rgba(0,0,0,0.3)]">!@#</button>
        <button onClick={() => onKey(" ")} className="flex-1 h-[42px] rounded-[5px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]" />
        <button onClick={onSearch} className="w-[86px] h-[42px] rounded-[5px] bg-[#aab4c0] text-[14px] text-[#1a1a1a] shadow-[0_1px_0_rgba(0,0,0,0.3)]">검색</button>
      </div>
    </div>
  );
}

// ─── SearchPage (루트) ────────────────────────────────────────────
export default function SearchPage({ onHome, onCart, onDetail }: { onHome: () => void; onCart: () => void; onDetail?: () => void }) {
  const [screen, setScreen] = useState<Screen>("main");
  const [committed, setCommitted] = useState("");
  const [ime, setIme] = useState<IMEState>(null);
  const [finalQuery, setFinalQuery] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const displayQuery = committed + renderIME(ime);

  const handleKey = (key: string) => {
    if (key === " ") { setCommitted(prev => prev + renderIME(ime) + " "); setIme(null); return; }
    const result = pressKey(key, committed, ime);
    setCommitted(result.committed); setIme(result.ime);
  };
  const handleBackspace = () => { const r = backspace(committed, ime); setCommitted(r.committed); setIme(r.ime); };
  const handleSearch = () => {
    const q = displayQuery.trim();
    if (!q) return;
    setFinalQuery(q);
    setKeyboardOpen(false);
    setScreen(q.includes("에어") ? "results" : "noresult");
  };
  const handlePick = (s: string) => { setCommitted(s); setIme(null); };
  const handleClear = () => { setCommitted(""); setIme(null); };

  const showAutocomplete = keyboardOpen && displayQuery.length > 0;
  const showKeyboard = keyboardOpen;

  if (screen === "detail") {
    return (
      <div className="size-full">
        <DetailScreen onBack={() => setScreen("results")} onBuy={onCart} onCart={onCart} />
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-white font-['Pretendard',sans-serif] overflow-hidden">
      {/* 상태바 */}
      <div className="flex items-center justify-between px-3 h-[30px] shrink-0 bg-white">
        <span className="text-[13px] font-semibold text-[#1a1a1a]">9:27</span>
        <div className="flex items-center gap-1">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#1a1a1a"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#1a1a1a"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10" r="2" fill="#1a1a1a"/></svg>
          <div className="border border-[#1a1a1a] rounded-[3px] w-[22px] h-[12px] p-[1.5px]"><div className="bg-[#1a1a1a] rounded-[1.5px] h-full w-full"/></div>
        </div>
      </div>

      <SearchBar
        query={committed} displayQuery={displayQuery} focused={keyboardOpen}
        onFocus={() => setKeyboardOpen(true)}
        onKey={handleKey} onBackspace={handleBackspace} onSearch={handleSearch}
        onClear={handleClear}
        onBack={() => { if (screen !== "main") { setScreen("main"); setCommitted(""); setIme(null); } else { onHome(); } }}
        showIcons={screen === "results" && !keyboardOpen}
        onCart={onCart}
      />

      <div className="flex-1 min-h-0 overflow-hidden">
        {showAutocomplete ? (
          <InlineAutocomplete query={displayQuery} onPick={handlePick} onSearch={handleSearch} />
        ) : screen === "main" ? (
          <SearchHomeBody onDetail={() => onDetail ? onDetail() : setScreen("detail")} />
        ) : screen === "results" ? (
          <ResultsScreen query={finalQuery} onDetail={() => onDetail ? onDetail() : setScreen("detail")} />
        ) : (
          <NoResultScreen query={finalQuery} onViewSuggested={() => { setFinalQuery("에어컨"); setScreen("results"); }} />
        )}
      </div>

      {showKeyboard && (
        <HangeulKeyboard onKey={handleKey} onBackspace={handleBackspace} onSearch={handleSearch} />
      )}
    </div>
  );
}
