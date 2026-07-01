"use client";

import Image from "next/image";
import imgBgTile from "../img/product-bg-tile.png";
import imgAircon from "../img/product-aircon.png";
import imgPurifier from "../img/product-lg-purifier.png";
import imgSamsungKimchi from "../img/product-samsung-kimchi.png";
import imgCuckooKimchi from "../img/product-cuckoo-kimchi.png";

interface Props {
  onContinue: () => void;
}

const PRODUCTS = [
  {
    name: "LG전자 디오스 정수기 WD502ASB",
    price: "390,000원",
    originalPrice: "529,000원",
    img: imgPurifier,
    badge: "최대혜택가",
  },
  {
    name: "삼성전자 비스포크 김치플러스 4도어 김치냉장고",
    price: "1,290,000원",
    originalPrice: "1,890,000원",
    img: imgSamsungKimchi,
    badge: "최대혜택가",
  },
  {
    name: "쿠쿠 스탠드형 김치냉장고 FR-BD482MPI",
    price: "월 56,544원",
    originalPrice: "월 77,544원",
    img: imgCuckooKimchi,
    badge: "60개월/안심케어1",
  },
  {
    name: "LG전자 디오스 정수기 WD502ASB",
    price: "390,000원",
    originalPrice: "529,000원",
    img: imgPurifier,
    badge: "최대혜택가",
  },
];

export default function PaymentCompletePage({ onContinue }: Props) {
  return (
    <div className="bg-white size-full flex flex-col overflow-hidden">
      {/* 메뉴바 */}
      <div className="h-[60px] shrink-0 flex items-center justify-between px-[12px] border-b border-[#eee]">
        <div className="w-[28px]" />
        <p className="font-bold text-[18px] text-black">주문완료</p>
        <button className="flex items-center justify-center p-[4px]">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M2.875 10.5423L11.5 3.83398L20.125 10.5423" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.62917" />
            <path d="M4.79102 9.10352V19.166H18.2077V9.10352" stroke="#1A1A1A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.62917" />
          </svg>
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto bg-[#f5f6f7]">

        {/* 주문 완료 아이콘 + 문구 */}
        <div className="bg-white flex flex-col items-center py-[28px] px-[20px] mb-[8px]">
          <div className="relative mb-[16px]">
            {/* 트럭 아이콘 배경 */}
            <div className="w-[64px] h-[64px] rounded-[32px] bg-[#f5f6f7] flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M2 8H20V22H2V8Z" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M20 12H26L30 17V22H20V12Z" stroke="#222222" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="8" cy="24" r="2.5" stroke="#222222" strokeWidth="1.5" />
                <circle cx="24" cy="24" r="2.5" stroke="#222222" strokeWidth="1.5" />
              </svg>
            </div>
            {/* 체크 배지 */}
            <div className="absolute -top-[6px] -right-[6px] w-[26px] h-[26px] rounded-[13px] bg-[#e5002b] flex items-center justify-center">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
              </svg>
            </div>
          </div>
          <p className="font-extrabold text-[20px] text-[#1a1a1a] mb-[4px]">주문완료 되었습니다.</p>
          <p className="text-[#777] text-[14px]">배송 준비 후 순차적으로 배송됩니다.</p>
        </div>

        {/* 주문 요약 카드 */}
        <div className="bg-[#f5f6f7] rounded-[12px] mx-[16px] mb-[12px] overflow-hidden">
          {/* 배송지 */}
          <div className="bg-white rounded-[10px] mx-[10px] mt-[10px] p-[14px] flex items-start gap-[10px]">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path d="M8 0C4.7 0 2 2.7 2 6C2 10.5 8 18 8 18C8 18 14 10.5 14 6C14 2.7 11.3 0 8 0Z" fill="#da231c" />
              <circle cx="8" cy="6" r="2.5" fill="white" />
            </svg>
            <div>
              <p className="font-bold text-[#1a1a1a] text-[14px] mb-[2px]">서울시 송파구 올림픽로 300</p>
              <p className="text-[#555] text-[13px]">롯데월드타워 101동 3402호</p>
            </div>
          </div>

          {/* 상품 행 */}
          <div className="px-[10px] py-[12px] flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <div
                className="relative rounded-[6px] overflow-hidden shrink-0"
                style={{ width: 44, height: 44, background: "#e3e3e3" }}
              >
                <Image src={imgBgTile} alt="" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center p-[2px]">
                  <Image src={imgAircon} alt="에어컨" fill className="object-contain" />
                </div>
              </div>
              <div>
                <p className="text-[#333] text-[13px] leading-[1.35] line-clamp-1">
                  [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨
                </p>
                <p className="text-[#999] text-[12px] mt-[2px]">1개</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-90">
              <path d="M6 4L10 8L6 12" stroke="#aaa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
            </svg>
          </div>

          {/* 버튼 2개 */}
          <div className="flex gap-[8px] px-[10px] pb-[10px]">
            <button className="h-[40px] rounded-[8px] border border-[#1a1a1a] flex items-center justify-center" style={{ width: 138 }}>
              <span className="font-medium text-[14px] text-[#1a1a1a]">주문 상세보기</span>
            </button>
            <button onClick={onContinue} className="flex-1 h-[40px] rounded-[8px] bg-[#da231c] flex items-center justify-center">
              <span className="font-medium text-[14px] text-white">계속 쇼핑하기</span>
            </button>
          </div>

          {/* 안내 문구 */}
          <div className="px-[14px] py-[12px] flex flex-col gap-[6px]">
            {[
              "L.POINT는 주문 완료 후 적립됩니다.",
              "주문 내역은 마이페이지 > 주문배송조회에서 확인하실 수 있습니다.",
              "배송기사님의 연락처는 출발 당일 문자로 발송됩니다.",
            ].map((txt, i) => (
              <div key={i} className="flex items-start gap-[6px]">
                <span className="text-[#aaa] text-[12px] mt-[1px]">•</span>
                <p className="text-[#777] text-[12px] leading-[1.5]">{txt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 결제금액 확인 카드 */}
        <div className="bg-[#f5f6f7] rounded-[12px] mx-[16px] mb-[12px] p-[16px]">
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[#555] text-[14px]">총 결제금액</span>
            <span className="font-extrabold text-[#da231c] text-[20px]">449,000원</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#555] text-[14px]">L.POINT 적립</span>
            <span className="text-[#1a1a1a] text-[14px]">+10,000P</span>
          </div>
        </div>

        {/* 최근 관심 & 장바구니 상품 */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[16px] mb-[14px]">최근 관심 &amp; 장바구니 상품</p>
          <div className="flex gap-[10px] overflow-x-auto pb-[4px]">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="shrink-0 w-[120px] flex flex-col">
                <div
                  className="w-[120px] h-[120px] rounded-[10px] overflow-hidden relative mb-[8px]"
                  style={{ background: "#f5f6f7" }}
                >
                  <Image src={p.img} alt={p.name} fill className="object-contain p-[8px] opacity-80" />
                </div>
                <p className="text-[#333] text-[11px] leading-tight line-clamp-2 mb-[4px]">{p.name}</p>
                <p className="text-[#999] text-[11px] line-through mb-[1px]">{p.originalPrice}</p>
                <p className="font-bold text-[#1a1a1a] text-[12px]">{p.price}</p>
                <span className="text-[#da231c] text-[10px] mt-[2px]">{p.badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[20px]" />
      </div>
    </div>
  );
}
