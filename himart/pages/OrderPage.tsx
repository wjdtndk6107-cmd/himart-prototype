"use client";

import { useState } from "react";
import Image from "next/image";
import { svgOrder } from "../components/svg-paths";
import DeliveryDatePicker from "../components/DeliveryDatePicker";
import PaymentDropdown from "../components/PaymentDropdown";
import imgProductThumb from "../img/product-thumb.png";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const UNIT_PRICE = 549000;
const CARD_OPTIONS = ["현대카드", "삼성카드", "신한카드", "KB국민카드", "롯데카드", "하나카드", "우리카드", "BC카드"];
const INSTALLMENT_OPTIONS = ["일시불", "2개월", "3개월", "6개월", "12개월", "24개월"];
const PAYMENT_METHODS = ["신용카드/체크카드", "롯데카드 (LPOINT Pay)", "무통장입금", "휴대폰결제", "토스페이", "네이버페이", "카카오페이"];

function SvgIcon({ d, size = 20, color = "#888", viewBox = "0 0 24 24" }: { d: string; size?: number; color?: string; viewBox?: string }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none">
      <path d={d} fill={color} />
    </svg>
  );
}

export default function OrderPage({ onComplete, onBack }: Props) {
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [qty] = useState(1);
  const [couponDiscount] = useState(20000);
  const [lpointUsed, setLpointUsed] = useState(0);
  const [lpointAvail] = useState(12500);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedInstall, setSelectedInstall] = useState<string | null>(null);
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [showInstallDropdown, setShowInstallDropdown] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("신용카드/체크카드");
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const productPrice = UNIT_PRICE * qty;
  const totalDiscount = couponDiscount + lpointUsed;
  const finalPrice = Math.max(0, productPrice - totalDiscount);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][d.getDay()]})`;

  return (
    <div className="flex flex-col size-full bg-[#f5f6f7] font-['Pretendard',sans-serif] overflow-hidden">
      {/* 상태바 */}
      <div className="flex items-center justify-between px-3 h-[30px] shrink-0 bg-white">
        <span className="text-[13px] font-semibold text-[#1a1a1a]">9:27</span>
        <div className="flex items-center gap-1">
          {svgOrder.wifi && <SvgIcon d={svgOrder.wifi} size={18} viewBox="0 0 24 24"/>}
          <div className="border border-[#1a1a1a] rounded-[3px] w-[22px] h-[12px] p-[1.5px]"><div className="bg-[#1a1a1a] rounded-[1.5px] h-full w-full"/></div>
        </div>
      </div>

      {/* 헤더 */}
      <div className="shrink-0 h-[44px] bg-white flex items-center justify-between px-[16px] border-b border-[#f0f0f0]">
        <button onClick={onBack} className="p-[4px]">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M8 1L1 8L8 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-[16px] font-bold text-[#1a1a1a]">주문서</span>
        <div className="w-[33px]" />
      </div>

      {/* 스크롤 본문 */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* 배송지 */}
        <div className="bg-white mb-[8px] px-[16px] py-[16px]">
          <div className="flex items-center justify-between mb-[12px]">
            <p className="text-[15px] font-bold text-[#1a1a1a]">배송지</p>
            <button className="flex items-center gap-[4px]">
              {svgOrder.edit && <SvgIcon d={svgOrder.edit} size={14} viewBox="0 0 24 24" />}
              <span className="text-[13px] text-[#999]">변경</span>
            </button>
          </div>
          <div className="flex items-start gap-[8px]">
            {svgOrder.location && <SvgIcon d={svgOrder.location} size={18} viewBox="0 0 24 24" color="#da231c"/>}
            <div>
              <p className="text-[14px] font-semibold text-[#1a1a1a]">김철수 (010-1234-5678)</p>
              <p className="text-[13px] text-[#555] mt-[2px]">서울특별시 강남구 테헤란로 123 하이마트빌딩 101호</p>
              <span className="inline-block bg-[#ffecec] text-[#da231c] text-[11px] font-semibold px-[6px] py-[2px] rounded-full mt-[6px]">기본배송지</span>
            </div>
          </div>
        </div>

        {/* 희망배송일 */}
        <div className="bg-white mb-[8px] px-[16px] py-[16px]">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-bold text-[#1a1a1a]">희망배송일</p>
            <button className="flex items-center gap-[4px]" onClick={() => setShowDatePicker(true)}>
              {svgOrder.calendar && <SvgIcon d={svgOrder.calendar} size={16} viewBox="0 0 24 24" />}
              <span className="text-[13px] text-[#da231c]">{deliveryDate ? formatDate(deliveryDate) : "날짜 선택"}</span>
            </button>
          </div>
          {!deliveryDate && (
            <p className="text-[12px] text-[#999] mt-[8px]">희망배송일을 지정하지 않을 경우 최대한 빠른 날짜에 배송됩니다.</p>
          )}
        </div>

        {/* 주문상품 */}
        <div className="bg-white mb-[8px] px-[16px] py-[16px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">주문 상품</p>
          <div className="flex gap-[12px]">
            <div className="w-[80px] h-[80px] rounded-[8px] overflow-hidden bg-[#f5f6f7] shrink-0 relative">
              <Image src={imgProductThumb} alt="에어컨" className="object-cover" fill />
            </div>
            <div className="flex-1">
              <p className="text-[13px] text-[#333] leading-snug mb-[6px]">[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH</p>
              <p className="text-[12px] text-[#999] mb-[4px]">수량 {qty}개</p>
              <p className="text-[14px] font-bold text-[#1a1a1a]">{productPrice.toLocaleString()}원</p>
            </div>
          </div>
        </div>

        {/* 쿠폰/L포인트 */}
        <div className="bg-white mb-[8px] px-[16px] py-[16px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">할인 혜택</p>
          <div className="flex items-center justify-between py-[10px] border-b border-[#f0f0f0]">
            <span className="text-[14px] text-[#333]">쿠폰 할인</span>
            <div className="flex items-center gap-[8px]">
              <span className="text-[14px] font-bold text-[#da231c]">-{couponDiscount.toLocaleString()}원</span>
              <button className="text-[13px] text-[#999] border border-[#e0e0e0] rounded-[4px] px-[8px] py-[3px]">변경</button>
            </div>
          </div>
          <div className="flex items-center justify-between py-[10px]">
            <span className="text-[14px] text-[#333]">L.POINT 사용</span>
            <div className="flex items-center gap-[8px]">
              <span className="text-[12px] text-[#999]">보유 {lpointAvail.toLocaleString()}P</span>
              <button className="text-[13px] text-[#999] border border-[#e0e0e0] rounded-[4px] px-[8px] py-[3px]"
                onClick={() => setLpointUsed(p => p > 0 ? 0 : Math.min(lpointAvail, finalPrice + lpointUsed))}>
                {lpointUsed > 0 ? `${lpointUsed.toLocaleString()}P 취소` : "전액사용"}
              </button>
            </div>
          </div>
        </div>

        {/* 결제 수단 */}
        <div className="bg-white mb-[8px] px-[16px] py-[16px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">결제 수단</p>
          <div className="relative">
            <button onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
              className="w-full flex items-center justify-between border border-[#e0e0e0] rounded-[8px] px-[14px] py-[12px]">
              <span className="text-[14px] text-[#1a1a1a]">{selectedPayment}</span>
              {svgOrder.chevron && <SvgIcon d={svgOrder.chevron} size={14} viewBox="0 0 24 24" />}
            </button>
            {showPaymentDropdown && (
              <div className="absolute left-0 right-0 top-full z-10 mt-[4px]">
                <PaymentDropdown
                  items={PAYMENT_METHODS}
                  selected={selectedPayment}
                  placeholder="결제수단 선택"
                  onSelect={(v) => { setSelectedPayment(v); setShowPaymentDropdown(false); }}
                  onClose={() => setShowPaymentDropdown(false)}
                />
              </div>
            )}
          </div>

          {selectedPayment === "신용카드/체크카드" && (
            <div className="mt-[12px] flex flex-col gap-[8px]">
              <div className="relative">
                <button onClick={() => { setShowCardDropdown(!showCardDropdown); setShowInstallDropdown(false); }}
                  className="w-full flex items-center justify-between border border-[#e0e0e0] rounded-[8px] px-[14px] py-[12px]">
                  <span className="text-[14px] text-[#1a1a1a]">{selectedCard || "카드 선택"}</span>
                  {svgOrder.chevron && <SvgIcon d={svgOrder.chevron} size={14} viewBox="0 0 24 24" />}
                </button>
                {showCardDropdown && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-[4px]">
                    <PaymentDropdown
                      items={CARD_OPTIONS}
                      selected={selectedCard}
                      placeholder="카드 선택"
                      onSelect={(v) => { setSelectedCard(v); setShowCardDropdown(false); }}
                      onClose={() => setShowCardDropdown(false)}
                    />
                  </div>
                )}
              </div>
              <div className="relative">
                <button onClick={() => { setShowInstallDropdown(!showInstallDropdown); setShowCardDropdown(false); }}
                  className="w-full flex items-center justify-between border border-[#e0e0e0] rounded-[8px] px-[14px] py-[12px]">
                  <span className="text-[14px] text-[#1a1a1a]">{selectedInstall || "할부 선택"}</span>
                  {svgOrder.chevron && <SvgIcon d={svgOrder.chevron} size={14} viewBox="0 0 24 24" />}
                </button>
                {showInstallDropdown && (
                  <div className="absolute left-0 right-0 top-full z-10 mt-[4px]">
                    <PaymentDropdown
                      items={INSTALLMENT_OPTIONS}
                      selected={selectedInstall}
                      placeholder="할부 선택"
                      onSelect={(v) => { setSelectedInstall(v); setShowInstallDropdown(false); }}
                      onClose={() => setShowInstallDropdown(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 최종 금액 */}
        <div className="bg-white mb-[8px] px-[16px] py-[16px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mb-[12px]">최종 결제금액</p>
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#555]">상품금액</span>
              <span className="text-[14px] text-[#1a1a1a]">{productPrice.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#555]">쿠폰 할인</span>
              <span className="text-[14px] text-[#da231c]">-{couponDiscount.toLocaleString()}원</span>
            </div>
            {lpointUsed > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#555]">L.POINT 사용</span>
                <span className="text-[14px] text-[#da231c]">-{lpointUsed.toLocaleString()}원</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#555]">배송비</span>
              <span className="text-[14px] text-[#da231c]">무료</span>
            </div>
            <div className="h-[1px] bg-[#f0f0f0]" />
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-[#1a1a1a]">최종 결제금액</span>
              <span className="text-[18px] font-extrabold text-[#da231c]">{finalPrice.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="h-[12px]" />
      </div>

      {/* 결제 버튼 */}
      <div className="shrink-0 bg-white border-t border-[#f0f0f0] px-[16px] py-[12px]">
        <button onClick={onComplete} className="w-full h-[52px] rounded-[8px] bg-[#da231c] flex items-center justify-center">
          <span className="text-[16px] font-bold text-white">{finalPrice.toLocaleString()}원 결제하기</span>
        </button>
      </div>

      {/* 날짜 피커 오버레이 */}
      {showDatePicker && (
        <div className="absolute inset-0 z-30">
          <DeliveryDatePicker
            onComplete={(date) => { setDeliveryDate(date); setShowDatePicker(false); }}
            onClose={() => setShowDatePicker(false)}
          />
        </div>
      )}
    </div>
  );
}
