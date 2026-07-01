"use client";

import { useState } from "react";
import Image from "next/image";
import DeliveryDatePicker from "../components/DeliveryDatePicker";
import PaymentDropdown from "../components/PaymentDropdown";
import imgBgTile from "../img/product-bg-tile.png";
import imgAircon from "../img/product-aircon.png";

const CARD_LIST = ["롯데카드", "신한카드", "KB국민카드", "삼성카드", "현대카드", "BC카드", "하나카드", "전북카드", "씨티카드", "NH농협카드", "수협카드"];
const INSTALLMENT_LIST = ["일시불", "무이자 2개월", "무이자 3개월", "무이자 4개월", "무이자 5개월", "6개월", "7개월", "8개월", "9개월", "10개월", "12개월"];

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 11 8" width="11" height="8">
      <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

export default function OrderPage({ onComplete, onBack }: Props) {
  const quantity = 1;
  const unitPrice = 549000;
  const originalPrice = 649000;
  const discount = 100000;
  const totalPrice = unitPrice * quantity;

  const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

  const [showPicker, setShowPicker] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<string | null>(null);
  const [showCardMenu, setShowCardMenu] = useState(false);
  const [showInstallmentMenu, setShowInstallmentMenu] = useState(false);

  const formatDeliveryDate = (d: Date) => {
    const yy = String(d.getFullYear()).slice(2);
    return `${yy}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  };

  const canOrder = deliveryDate !== null && selectedCard !== null && selectedInstallment !== null;

  return (
    <div className="relative size-full bg-white flex flex-col overflow-hidden" style={{ isolation: "isolate" }}>
      {/* Fixed header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] bg-white z-10 shrink-0">
        <div className="h-[60px] relative shrink-0 w-full">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-between px-[12px] py-[20px] relative size-full">
              <button
                onClick={onBack}
                className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]"
              >
                <div className="h-[16px] relative shrink-0 w-[8px]">
                  <div className="absolute inset-[-6.25%_-12.5%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 18">
                      <path d="M9 1L1 9L5 13L9 17" stroke="#333333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </button>
              <div className="flex flex-col font-['Pretendard:Bold',sans-serif] font-bold justify-center leading-[0] text-[#1a1a1a] text-[18px] text-center">
                <p className="leading-[normal]">주문/결제</p>
              </div>
              <div className="size-[20px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pt-[60px]">

        {/* 배송 정보 */}
        <div className="bg-white content-stretch flex flex-col gap-[8px] items-start p-[16px] relative shrink-0 w-full">
          <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[normal] text-[#1a1a1a] text-[17px] tracking-[-0.2px]">배송 정보</p>

          {/* Address type */}
          <div className="content-stretch flex items-center justify-between py-[8px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
              <div className="bg-[#1a1a1a] content-stretch flex flex-col items-center justify-center min-w-[40px] px-[8px] py-[6px] relative rounded-[99px] shrink-0 w-[48px]">
                <p className="font-['Pretendard:Medium',sans-serif] text-[13px] text-center text-white tracking-[-0.52px]">집</p>
              </div>
              <div className="content-stretch flex flex-col items-center justify-center min-w-[40px] px-[8px] py-[6px] relative rounded-[99px] shrink-0 w-[48px] border border-[#e5e5e5]">
                <p className="font-['Pretendard:Medium',sans-serif] text-[#999] text-[13px] text-center tracking-[-0.52px]">회사</p>
              </div>
            </div>
            <div className="bg-[#f0f0f0] content-stretch flex h-[30px] items-center justify-center px-[8px] relative rounded-[8px] shrink-0 w-[48px]">
              <p className="font-['Pretendard:Medium',sans-serif] text-[#777] text-[13px] text-center">변경</p>
            </div>
          </div>

          {/* Address card */}
          <div className="bg-[#f5f6f7] relative rounded-[8px] shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-start p-[16px] relative size-full">
              <div className="relative shrink-0 size-[18px]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d="M9.37562 15.1244C10.5381 14.1206 14 10.8706 14 7.74998C14 6.4239 13.4732 5.15213 12.5355 4.21445C11.5979 3.27677 10.3261 2.74998 9 2.74998C7.67392 2.74998 6.40215 3.27677 5.46447 4.21445C4.52678 5.15213 4 6.4239 4 7.74998C4 10.8706 7.46188 14.1206 8.62438 15.1244C8.73267 15.2058 8.8645 15.2498 9 15.2498C9.1355 15.2498 9.26733 15.2058 9.37562 15.1244Z" stroke="#DA291C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.14081" />
                  <path d="M9 9.62498C10.0355 9.62498 10.875 8.78552 10.875 7.74998C10.875 6.71445 10.0355 5.87498 9 5.87498C7.96447 5.87498 7.125 6.71445 7.125 7.74998C7.125 8.78552 7.96447 9.62498 9 9.62498Z" stroke="#DA291C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.14081" />
                </svg>
              </div>
              <div className="content-stretch flex flex-col gap-[4px] items-start text-[14px] tracking-[-0.56px] w-full">
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#333]">서울시 송파구 올림픽로 300</p>
                <p className="font-['Pretendard:Medium',sans-serif] text-[#666]">롯데월드타워 101동 3402호 (우) 05551</p>
                <p className="font-['Pretendard:Medium',sans-serif] text-[#666] whitespace-nowrap">홍길동 010-1234-5678</p>
              </div>
            </div>
          </div>

          {/* Delivery request */}
          <div className="bg-[#f5f6f7] relative rounded-[8px] shrink-0 w-full border border-white">
            <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative w-full">
                <div className="content-stretch flex items-center relative shrink-0">
                  <div className="relative shrink-0 size-[24px] mr-1">
                    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <circle cx="10" cy="12.4277" fill="#333333" r="6" />
                      <path d="M10 8.42773V14.4277" stroke="white" strokeWidth="1.5" />
                      <path d="M10 15.4277V16.4277" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#333] text-[14px] tracking-[-0.56px] whitespace-nowrap">배송 요청사항</p>
                </div>
                <div className="bg-white relative rounded-[8px] shrink-0 w-full border border-[#e9e9e9]">
                  <div className="flex flex-row justify-center size-full">
                    <div className="content-stretch flex items-start justify-between p-[8px] relative size-full">
                      <p className="font-['Pretendard:Medium',sans-serif] text-[#333] text-[14px] tracking-[-0.56px] whitespace-nowrap">문 앞에 놓아주세요. (공동현관 2030)</p>
                      <svg className="shrink-0" fill="none" viewBox="0 0 20 20" width="20" height="20">
                        <path d="M6 8.42773L10 12.4277L14 8.42773" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                  <div className="bg-[#da291c] relative rounded-[4px] shrink-0 size-[20px] flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <p className="font-['Pretendard:Medium',sans-serif] text-[#333] text-[14px] tracking-[-0.28px] whitespace-nowrap">안심번호 사용</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery date */}
          <div className={[
            "bg-[#f5f6f7] content-stretch flex flex-col gap-[12px] items-start p-[16px] relative rounded-[8px] shrink-0 w-full border",
            deliveryDate ? "border-transparent" : "border-[#ffdada]",
          ].join(" ")}>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                <div className="bg-[#333] content-stretch flex items-center justify-center overflow-clip relative rounded-[999px] shrink-0 size-[12px] mr-1">
                  <svg className="block" fill="none" viewBox="0 0 2 8" width="2" height="8">
                    <path d="M1 0V6" stroke="white" strokeWidth="1.5" />
                    <path d="M1 7V8" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#333] text-[14px] tracking-[-0.56px]">희망배송일</p>
                <span className="font-['Pretendard:Bold',sans-serif] font-bold text-[red] text-[14px] tracking-[-0.56px]">*</span>
                {deliveryDate && (
                  <div className="bg-[#fff0f0] h-full flex items-center justify-center rounded-[4px] px-[8px] py-[2px]">
                    <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#da291c] text-[14px] tracking-[-0.56px] whitespace-nowrap">
                      {formatDeliveryDate(deliveryDate)}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowPicker(true)}
                className={[
                  "content-stretch flex gap-[6px] h-[30px] items-center justify-center min-w-[48px] px-[12px] py-[6px] relative rounded-[4px] shrink-0",
                  deliveryDate
                    ? "border border-[#999]"
                    : "bg-white border border-[#e9e9e9]",
                ].join(" ")}
              >
                <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
                  <path d="M4.5384 0C4.68692 0 4.82936 0.0589998 4.93438 0.16402C5.0394 0.269041 5.0984 0.411479 5.0984 0.56V1.6072H11.112V0.5672C11.112 0.418679 11.171 0.276241 11.276 0.17122C11.381 0.0661998 11.5235 0.0072 11.672 0.0072C11.8205 0.0072 11.963 0.0661998 12.068 0.17122C12.173 0.276241 12.232 0.418679 12.232 0.5672V1.6072H14.4C14.8242 1.6072 15.2311 1.77566 15.5311 2.07555C15.8311 2.37543 15.9998 2.78219 16 3.2064V14.4008C15.9998 14.825 15.8311 15.2318 15.5311 15.5317C15.2311 15.8315 14.8242 16 14.4 16H1.6C1.17579 16 0.768947 15.8315 0.468912 15.5317C0.168877 15.2318 0.000212104 14.825 0 14.4008L0 3.2064C0.000212104 2.78219 0.168877 2.37543 0.468912 2.07555C0.768947 1.77566 1.17579 1.6072 1.6 1.6072H3.9784V0.5592C3.97861 0.410817 4.03771 0.268585 4.1427 0.163737C4.2477 0.0588899 4.39002 0 4.5384 0ZM1.12 6.1936V14.4008C1.12 14.4638 1.13242 14.5263 1.15654 14.5845C1.18066 14.6427 1.21602 14.6956 1.26059 14.7402C1.30516 14.7848 1.35808 14.8201 1.41631 14.8443C1.47455 14.8684 1.53697 14.8808 1.6 14.8808H14.4C14.463 14.8808 14.5255 14.8684 14.5837 14.8443C14.6419 14.8201 14.6948 14.7848 14.7394 14.7402C14.784 14.6956 14.8193 14.6427 14.8435 14.5845C14.8676 14.5263 14.88 14.4638 14.88 14.4008V6.2048L1.12 6.1936ZM5.3336 11.6952V13.028H4V11.6952H5.3336ZM8.6664 11.6952V13.028H7.3336V11.6952H8.6664ZM12 11.6952V13.028H10.6664V11.6952H12ZM5.3336 8.5136V9.8464H4V8.5136H5.3336ZM8.6664 8.5136V9.8464H7.3336V8.5136H8.6664ZM12 8.5136V9.8464H10.6664V8.5136H12ZM3.9784 2.7264H1.6C1.53697 2.7264 1.47455 2.73882 1.41631 2.76294C1.35808 2.78706 1.30516 2.82242 1.26059 2.86699C1.21602 2.91156 1.18066 2.96448 1.15654 3.02271C1.13242 3.08095 1.12 3.14337 1.12 3.2064V5.0744L14.88 5.0856V3.2064C14.88 3.14337 14.8676 3.08095 14.8435 3.02271C14.8193 2.96448 14.784 2.91156 14.7394 2.86699C14.6948 2.82242 14.6419 2.78706 14.5837 2.76294C14.5255 2.73882 14.463 2.7264 14.4 2.7264H12.232V3.4696C12.232 3.61812 12.173 3.76056 12.068 3.86558C11.963 3.9706 11.8205 4.0296 11.672 4.0296C11.5235 4.0296 11.381 3.9706 11.276 3.86558C11.171 3.76056 11.112 3.61812 11.112 3.4696V2.7264H5.0984V3.4624C5.0984 3.61092 5.0394 3.75336 4.93438 3.85838C4.82936 3.9634 4.68692 4.0224 4.5384 4.0224C4.38988 4.0224 4.24744 3.9634 4.14242 3.85838C4.0374 3.75336 3.9784 3.61092 3.9784 3.4624V2.7264Z" fill={deliveryDate ? "#999999" : "#333333"} />
                </svg>
                <p className={[
                  "font-['Pretendard:Medium',sans-serif] text-[13px] tracking-[-0.52px] whitespace-nowrap",
                  deliveryDate ? "text-[#999]" : "text-[#333]"
                ].join(" ")}>배송일 선택</p>
              </button>
            </div>
            <div className="bg-white relative rounded-[4px] shrink-0 w-full h-[32px] flex items-center justify-center border border-[#e9e9e9]">
              <p className="font-['Pretendard:Medium',sans-serif] text-[#666] text-[13px] tracking-[-0.52px] whitespace-nowrap">LG 퓨리케어 AI 360도 공기청정기 AS305DWWA</p>
            </div>
            <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <div className="bg-[#ddd] relative rounded-[4px] shrink-0 size-[20px] flex items-center justify-center">
                  <CheckIcon />
                </div>
                <p className="font-['Pretendard:Medium',sans-serif] text-[#222] text-[14px] tracking-[-0.28px] whitespace-nowrap">폐가전수거</p>
              </div>
              <div className="font-['Pretendard:Regular',sans-serif] text-[#666] text-[13px] tracking-[-0.52px] w-full">
                <ul className="list-disc ms-[19.5px]">
                  <li className="leading-[1.3]">폐가전을 무상 수거해드립니다.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f7] h-[8px] w-full" />

        {/* 상품 정보 */}
        <div className="bg-white content-stretch flex flex-col items-start pt-[12px] px-[16px] relative shrink-0 w-full">
          <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[normal] text-[#1a1a1a] text-[17px] tracking-[-0.2px]">상품 정보</p>
          <div className="content-stretch flex items-center py-[8px] relative shrink-0 w-full">
            <p className="font-['Pretendard:Medium',sans-serif] text-[#333] text-[13px] tracking-[-0.52px] whitespace-nowrap">총 {quantity}건 </p>
            <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
              <path d="M4 6L8 10L12 6" stroke="#666666" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="bg-white relative shrink-0 w-full pb-[16px]">
          <div className="content-stretch flex flex-col items-start justify-center px-[16px] relative size-full">
            <div className="content-stretch flex gap-[14px] items-start relative shrink-0 w-full">
              <div className="relative rounded-[6px] overflow-hidden shrink-0" style={{ width: 72, height: 72 }}>
                <Image src={imgBgTile} alt="" fill className="object-cover" />
                <div className="absolute inset-0 flex items-center justify-center p-[4px]">
                  <Image src={imgAircon} alt="에어컨" fill className="object-contain" />
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative">
                <p className="font-['Pretendard:SemiBold',sans-serif] h-[40px] leading-[1.3] overflow-hidden text-[#333] text-[15px] text-ellipsis tracking-[-0.6px] w-full">[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]</p>
                <div className="content-stretch flex gap-[4px] items-center w-full whitespace-nowrap">
                  <p className="font-['Pretendard:Regular',sans-serif] text-[#999] text-[12px] tracking-[-0.48px] line-through">{fmt(originalPrice)}</p>
                  <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#1a1a1a] text-[16px] tracking-[-0.64px]">{fmt(unitPrice)}</p>
                  <p className="font-['Pretendard:Medium',sans-serif] text-[#da291c] text-[12px] text-center">{quantity}개</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f7] h-[8px] w-full" />

        {/* 할인 선택 */}
        <div className="bg-white content-stretch flex items-start p-[16px] relative shrink-0 w-full">
          <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[normal] text-[#1a1a1a] text-[17px] tracking-[-0.2px]">할인 선택</p>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[8px] items-start justify-center overflow-clip pb-[16px] px-[16px] relative shrink-0 w-full">
          {/* Coupon row */}
          <div className="bg-white content-stretch flex items-center justify-between py-[10px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="bg-[#da231c] relative rounded-[4px] shrink-0 size-[20px] flex items-center justify-center">
                <CheckIcon />
              </div>
              <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[21px] text-[#222] text-[14px] whitespace-nowrap">최대할인쿠폰</p>
              <div className="bg-[#f0f0f0] relative rounded-[99px] shrink-0 px-[8px] py-[4px]">
                <p className="font-['Pretendard:Medium',sans-serif] text-[#666] text-[12px] tracking-[-0.48px] whitespace-nowrap">쿠폰선택</p>
              </div>
            </div>
            <div className="bg-[#f8f8f8] relative rounded-[2px] shrink-0 w-[100px] border border-[#e3e6ea] px-[16px] py-[6px]">
              <p className="font-['Pretendard:Medium',sans-serif] text-[#1a1a1a] text-[14px] text-right tracking-[-0.56px] whitespace-nowrap">100,000원</p>
            </div>
          </div>
          {/* LPOINT row */}
          <div className="bg-white content-stretch flex items-center justify-between py-[10px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
              <div className="bg-[#ddd] relative rounded-[4px] shrink-0 size-[20px] flex items-center justify-center">
                <CheckIcon />
              </div>
              <p className="font-['Pretendard:Medium',sans-serif] text-[#1a1a1a] text-[13px] tracking-[-0.52px] whitespace-nowrap">L.POINT</p>
              <p className="font-['Pretendard:Regular',sans-serif] text-[#666] text-[12px] tracking-[-0.48px] whitespace-nowrap">(보유 3,850P)</p>
            </div>
            <div className="bg-[#f8f8f8] relative rounded-[2px] shrink-0 w-[100px] border border-[#e3e6ea] px-[16px] py-[6px]">
              <p className="font-['Pretendard:Medium',sans-serif] text-[#1a1a1a] text-[14px] text-right tracking-[-0.56px] whitespace-nowrap">0 P</p>
            </div>
          </div>
          {/* Discount notes */}
          <div className="font-['Pretendard:Regular',sans-serif] text-[#666] text-[11px] tracking-[-0.44px] w-full">
            <ul className="list-disc">
              <li className="mb-0 ms-[16.5px] leading-[16px]">즉시할인 적용시, 포인트 / 적립금 사용이 불가합니다.</li>
              <li className="ms-[16.5px] leading-[16px]">카드 청구할인 혜택과 즉시할인 혜택은 중복 적용이 불가합니다.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#f5f6f7] h-[8px] w-full" />

        {/* 매장 직원 추천 코드 */}
        <div className="bg-white relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
            <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative size-full w-full">
              <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[normal] text-[#1a1a1a] text-[17px] tracking-[-0.2px]">매장 직원 추천 코드</p>
              <p className="font-['Pretendard:Regular',sans-serif] text-[#6b7280] text-[13px] whitespace-nowrap">상품을 상담받은 직원을 추천해주세요.</p>
              <div className="content-stretch flex gap-[8px] items-start pt-[14px] relative size-full w-full">
                <div className="bg-white flex-[278_0_0] h-[44px] min-w-px relative rounded-[10px] border border-[#e3e6ea] flex items-center px-[9px]">
                  <p className="font-['Pretendard:Regular',sans-serif] text-[12px] text-[rgba(26,26,26,0.5)]">상담원 이름 또는 추천인 코드를 입력해주세요.</p>
                </div>
                <div className="bg-[#666] h-[44px] relative rounded-[10px] shrink-0 w-[72px] flex items-center justify-center">
                  <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[21px] text-[14px] text-center text-white whitespace-nowrap">검색</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f7] h-[8px] w-full" />

        {/* 결제 수단 */}
        <div className="bg-white content-stretch flex items-start pt-[16px] px-[16px] relative shrink-0 w-full">
          <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[normal] text-[#1a1a1a] text-[17px] tracking-[-0.2px]">결제 수단</p>
        </div>
        <div className="bg-white content-stretch flex flex-col items-start justify-center p-[16px] relative shrink-0 w-full gap-[10px]">
          {/* L.PAY */}
          <div className="relative rounded-[10px] shrink-0 w-full border border-[#e3e6ea]">
            <div className="content-stretch flex items-center px-[16px] py-[12px] gap-[8px]">
              <div className="relative shrink-0 size-[18px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d="M0 3C0 1.34315 1.34315 0 3 0H15C16.6569 0 18 1.34315 18 3V15C18 16.6569 16.6569 18 15 18H3C1.34315 18 0 16.6569 0 15V3Z" fill="white" />
                  <circle cx="9" cy="9" r="6.5" stroke="#DDDDDD" strokeWidth="5" />
                </svg>
              </div>
              <p className="font-['Pretendard:Medium',sans-serif] text-[#666] text-[14px] tracking-[-0.56px] whitespace-nowrap">L.PAY</p>
            </div>
          </div>

          {/* 신용카드/체크카드 - selected */}
          <div className={[
            "relative rounded-[10px] shrink-0 w-full border",
            (selectedCard && selectedInstallment) ? "border-[#999999]" : "border-[#ffdada]",
          ].join(" ")}>
            <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
              <div className="content-stretch flex items-center gap-[8px] px-[16px] py-[12px] w-full">
                <div className="relative shrink-0 size-[18px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                    <path d="M0 3C0 1.34315 1.34315 0 3 0H15C16.6569 0 18 1.34315 18 3V15C18 16.6569 16.6569 18 15 18H3C1.34315 18 0 16.6569 0 15V3Z" fill="white" />
                    <circle cx="9" cy="9" r="6.5" stroke="#DA231C" strokeWidth="5" />
                  </svg>
                </div>
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#da231c] text-[15px] tracking-[-0.3px] whitespace-nowrap">신용카드 / 체크카드</p>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start pb-[16px] px-[16px] w-full">
                {/* 카드사 선택 */}
                <button
                  onClick={() => { setShowCardMenu((v) => !v); setShowInstallmentMenu(false); }}
                  className="bg-white h-[44px] relative rounded-[10px] shrink-0 w-full border border-[#e9e9e9] flex items-center justify-between px-[15px]"
                >
                  <p className={["text-[13px] tracking-[-0.3px] whitespace-nowrap", selectedCard ? "font-['Pretendard:SemiBold',sans-serif] font-semibold text-[#333]" : "font-['Pretendard:Regular',sans-serif] text-[#666]"].join(" ")}>
                    {selectedCard ?? "카드를 선택해주세요."}
                  </p>
                  <svg fill="none" viewBox="0 0 15 15" width="15" height="15" className={`transition-transform ${showCardMenu ? "rotate-180" : ""}`}>
                    <path d="M3.75 5.625L7.5 9.375L11.25 5.625" stroke="#999999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </button>
                {/* 할부 선택 */}
                <button
                  onClick={() => { setShowInstallmentMenu((v) => !v); setShowCardMenu(false); }}
                  className="bg-white h-[44px] relative rounded-[10px] shrink-0 w-full border border-[#e9e9e9] flex items-center justify-between px-[15px]"
                >
                  <p className={["text-[13px] tracking-[-0.3px] whitespace-nowrap", selectedInstallment ? "font-['Pretendard:SemiBold',sans-serif] font-semibold text-[#333]" : "font-['Pretendard:Regular',sans-serif] text-[#666]"].join(" ")}>
                    {selectedInstallment ?? "할부개월을 선택해주세요."}
                  </p>
                  <svg fill="none" viewBox="0 0 15 15" width="15" height="15" className={`transition-transform ${showInstallmentMenu ? "rotate-180" : ""}`}>
                    <path d="M3.75 5.625L7.5 9.375L11.25 5.625" stroke="#999999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </svg>
                </button>
                <div className="flex items-center justify-center w-full">
                  <p className="font-['Pretendard:Medium',sans-serif] text-[#999] text-[12px] tracking-[-0.48px] whitespace-nowrap">무이자 할부 안내</p>
                  <div className="relative rounded-[8px] shrink-0 size-[16px] border border-[#999] flex items-center justify-center ml-[4px]">
                    <p className="font-['Pretendard:Regular',sans-serif] text-[#999] text-[10px]">?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하이마트페이 */}
          <div className="bg-white content-stretch flex h-[52px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-full border border-[#e3e6ea]">
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
              <div className="relative shrink-0 size-[18px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
                  <path d="M0 3C0 1.34315 1.34315 0 3 0H15C16.6569 0 18 1.34315 18 3V15C18 16.6569 16.6569 18 15 18H3C1.34315 18 0 16.6569 0 15V3Z" fill="white" />
                  <circle cx="9" cy="9" r="6.5" stroke="#DDDDDD" strokeWidth="5" />
                </svg>
              </div>
              <p className="font-['Pretendard:Medium',sans-serif] text-[#666] text-[14px] text-center tracking-[-0.56px] whitespace-nowrap">하이마트페이</p>
            </div>
          </div>

          {/* 간편결제 */}
          <div className="bg-white content-stretch flex h-[52px] items-center px-[17px] py-px relative rounded-[12px] shrink-0 w-full border border-[#e3e6ea]">
            <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
              <div className="bg-[#e3e6ea] relative rounded-[9px] shrink-0 size-[18px] flex items-center justify-center border-2 border-[#e3e6ea]">
                <div className="bg-white relative rounded-[3px] shrink-0 size-[6px]" />
              </div>
              <p className="font-['Pretendard:Medium',sans-serif] text-[#666] text-[14px] text-center tracking-[-0.56px] whitespace-nowrap">간편결제</p>
              {/* 카카오페이 */}
              <div className="relative shrink-0 size-[28px]">
                <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" fill="#FFE617" r="14" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="13" height="12" fill="none" viewBox="0 0 12.6 11.9">
                    <path d="M6.30595 0C2.81983 0 0 2.28678 0 5.12384C0 6.95816 1.1898 8.57235 2.9864 9.47728C2.85552 9.97866 2.51048 11.3116 2.43909 11.5929C2.35581 11.9475 2.56997 11.9353 2.70085 11.8497C2.81983 11.7641 4.43796 10.639 5.12804 10.1499C5.50878 10.211 5.90142 10.2355 6.29405 10.2355C9.76827 10.2355 12.6 7.94868 12.6 5.11162C12.6 2.28678 9.78017 0 6.30595 0Z" fill="#381E1F" />
                  </svg>
                </div>
              </div>
              {/* 네이버페이 */}
              <div className="relative shrink-0 size-[28px]">
                <svg className="absolute block inset-0 size-full" fill="none" viewBox="0 0 28 28">
                  <circle cx="14" cy="14" fill="#54BF39" r="14" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="10" height="10" fill="none" viewBox="0 0 9.84078 9.48702">
                    <path d="M6.66823 5.07556L3.02567 0H0V9.48702H3.17255V4.41146L6.8151 9.48702H9.84078V0H6.66823V5.07556Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f7] h-[8px] w-full" />

        {/* 결제금액 확인 */}
        <div className="bg-white content-stretch flex items-start p-[16px] relative shrink-0 w-full">
          <p className="font-['Pretendard:Bold',sans-serif] font-bold leading-[normal] text-[#1a1a1a] text-[17px] tracking-[-0.2px]">결제금액 확인</p>
        </div>
        <div className="bg-white content-stretch flex flex-col gap-[8px] items-start justify-center pb-[16px] px-[16px] relative shrink-0 w-full">
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[10px] items-start py-[8px] relative size-full">
              {/* 총 상품가 */}
              <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                    <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#1a1a1a] text-[14px] tracking-[-0.56px] whitespace-nowrap">총 상품가</p>
                    <div className="-scale-y-100">
                      <svg fill="none" viewBox="0 0 18 18" width="18" height="18">
                        <path d="M5.5 7.42773L9.25 11.1777L13 7.42773" stroke="#999999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#1a1a1a] text-[18px] tracking-[-0.72px] whitespace-nowrap">{fmt(originalPrice * quantity)}</p>
                </div>
                <div className="bg-[#f7f7f7] relative rounded-[8px] shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative size-full">
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[#666] text-[14px] tracking-[-0.56px] whitespace-nowrap">상품가</p>
                      <p className="font-['Pretendard:Regular',sans-serif] text-[#333] text-[14px] tracking-[-0.56px] whitespace-nowrap">{fmt(originalPrice * quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 총 배송비 */}
              <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full">
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#1a1a1a] text-[14px] tracking-[-0.56px] whitespace-nowrap">총 배송비</p>
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#1a1a1a] text-[18px] tracking-[-0.72px] whitespace-nowrap">0원</p>
              </div>

              {/* 할인금액 */}
              <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex h-[24px] items-center justify-between relative shrink-0 w-full">
                  <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#1a1a1a] text-[14px] tracking-[-0.56px] whitespace-nowrap">할인금액</p>
                  <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#da231c] text-[18px] tracking-[-0.72px] whitespace-nowrap">-{fmt(discount * quantity)}</p>
                </div>
                <div className="bg-[#f7f7f7] relative rounded-[8px] shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[10px] items-start p-[16px] relative size-full">
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                      <p className="font-['Pretendard:Regular',sans-serif] text-[#666] text-[14px] tracking-[-0.56px] whitespace-nowrap">쿠폰</p>
                      <p className="font-['Pretendard:Regular',sans-serif] text-[#333] text-[14px] tracking-[-0.56px] whitespace-nowrap">-{fmt(discount * quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#D9D9D9] w-full" />

              {/* 최종 결제금액 */}
              <div className="content-stretch flex items-center justify-between py-[10px] relative shrink-0 w-full">
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#da231c] text-[15px] tracking-[-0.6px] whitespace-nowrap">최종 결제금액</p>
                <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#da231c] text-[24px] tracking-[-0.96px] whitespace-nowrap">{fmt(totalPrice)}</p>
              </div>

              {/* LPOINT 적립 */}
              <div className="bg-[#f7f7f7] relative rounded-[8px] shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#333] text-[14px] tracking-[-0.56px] whitespace-nowrap">
                      L.POINT <span className="font-['Pretendard:Regular',sans-serif] font-normal">적립 예정</span>
                    </p>
                    <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[#333] text-[18px] tracking-[-0.72px] whitespace-nowrap">+10,000P</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f7] h-[8px] w-full" />

        {/* 주문 동의 */}
        <div className="bg-white relative shrink-0 w-full">
          <div className="content-stretch flex flex-col items-start p-[16px] relative size-full">
            <div className="flex font-['Pretendard:Regular',sans-serif] items-start justify-between text-[13px] tracking-[-0.52px] whitespace-nowrap w-full">
              <p className="text-[#333]">주문 내용을 확인하였으며 결제에 동의합니다.</p>
              <p className="text-[#999] underline">보기</p>
            </div>
          </div>
        </div>

        {/* Bottom spacer for fixed button */}
        <div className="h-[84px]" />
      </div>

      {/* 결제하기 버튼 — fixed */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white flex flex-col items-start pb-[20px] pt-[10px] px-[16px] z-10 border-t border-[#e8e8e8]">
        <button
          disabled={!canOrder}
          onClick={onComplete}
          className="h-[54px] relative rounded-[12px] shrink-0 w-full transition-all flex items-center justify-center disabled:cursor-not-allowed"
          style={{ background: canOrder ? "#da231c" : "#cccccc" }}
        >
          <p className="font-['Pretendard:Bold',sans-serif] font-bold text-[18px] text-center text-white tracking-[-0.72px] whitespace-nowrap">{fmt(totalPrice)} 결제하기</p>
        </button>
      </div>

      {/* Card / Installment menus */}
      {(showCardMenu || showInstallmentMenu) && (
        <>
          <div
            className="absolute inset-0 z-30"
            onClick={() => { setShowCardMenu(false); setShowInstallmentMenu(false); }}
          />
          <div className="absolute left-[16px] right-[16px] z-40" style={{ top: showCardMenu ? "auto" : "auto", bottom: 100 }}>
            <PaymentDropdown
              items={showCardMenu ? CARD_LIST : INSTALLMENT_LIST}
              selected={showCardMenu ? selectedCard : selectedInstallment}
              placeholder={showCardMenu ? "카드사를 선택해 주세요." : "할부개월을 선택해 주세요."}
              onSelect={(value) => {
                if (showCardMenu) { setSelectedCard(value); setShowCardMenu(false); }
                else { setSelectedInstallment(value); setShowInstallmentMenu(false); }
              }}
              onClose={() => { setShowCardMenu(false); setShowInstallmentMenu(false); }}
            />
          </div>
        </>
      )}

      {/* Delivery date picker overlay */}
      {showPicker && (
        <div className="absolute inset-0 z-40">
          <DeliveryDatePicker
            onComplete={(date) => {
              setDeliveryDate(date);
              setShowPicker(false);
            }}
            onClose={() => setShowPicker(false)}
          />
        </div>
      )}
    </div>
  );
}
