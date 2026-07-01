"use client";

import { useState } from "react";
import Image from "next/image";
import DeliveryDatePicker from "../components/DeliveryDatePicker";
import PaymentDropdown from "../components/PaymentDropdown";
import imgBgTile from "../img/product-bg-tile.png";
import imgAircon from "../img/product-aircon.png";

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

const UNIT_PRICE = 549000;
const ORIGINAL_PRICE = 649000;
const CARD_OPTIONS = ["현대카드", "삼성카드", "신한카드", "KB국민카드", "롯데카드", "하나카드", "우리카드", "BC카드"];
const INSTALL_OPTIONS = ["일시불", "2개월", "3개월", "6개월", "12개월", "24개월"];

function RedCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="rounded-[4px] shrink-0 flex items-center justify-center transition-colors"
      style={{
        width: 20,
        height: 20,
        background: checked ? "#da231c" : "white",
        border: checked ? "none" : "1.5px solid #d1d1d1",
      }}
    >
      {checked && (
        <svg fill="none" viewBox="0 0 11 8" width="12" height="9">
          <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}

function GrayCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="rounded-[4px] shrink-0 flex items-center justify-center transition-colors"
      style={{
        width: 20,
        height: 20,
        background: checked ? "#555" : "white",
        border: checked ? "none" : "1.5px solid #d1d1d1",
      }}
    >
      {checked && (
        <svg fill="none" viewBox="0 0 11 8" width="12" height="9">
          <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}

const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

export default function OrderPage({ onComplete, onBack }: Props) {
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addressTab, setAddressTab] = useState<"집" | "회사">("집");
  const [safeNumChecked, setSafeNumChecked] = useState(false);
  const [wastePickup, setWastePickup] = useState(false);
  const [maxCoupon, setMaxCoupon] = useState(true);
  const [lpointChecked, setLpointChecked] = useState(false);
  const [couponInput] = useState("100,000원");
  const [lpointInput] = useState("0 P");
  const [selectedCard, setSelectedCard] = useState<string | null>("현대카드");
  const [selectedInstall, setSelectedInstall] = useState<string | null>("3개월");
  const [showCardDrop, setShowCardDrop] = useState(false);
  const [showInstallDrop, setShowInstallDrop] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [discountExpanded, setDiscountExpanded] = useState(false);
  const [recommendCode, setRecommendCode] = useState("");

  const productPrice = UNIT_PRICE;
  const discountAmt = 100000;
  const finalPrice = productPrice - discountAmt;

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][d.getDay()]})`;

  const canOrder = deliveryDate !== null && selectedCard !== null && selectedInstall !== null;

  return (
    <div className="bg-white relative size-full flex flex-col overflow-hidden">
      {/* 고정 헤더 */}
      <div className="shrink-0 w-full bg-white z-10">
        {/* 메뉴바 */}
        <div className="h-[60px] flex items-center justify-between px-[12px] border-b border-[#eee]">
          <button onClick={onBack} className="flex items-center justify-center w-[20px] h-[20px]">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L5 13L9 17" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </button>
          <p className="font-bold text-[18px] text-black">주문/결제</p>
          <div className="w-[24px]" />
        </div>
      </div>

      {/* 스크롤 본문 */}
      <div className="flex-1 overflow-y-auto bg-[#f5f6f7]">

        {/* ── 배송 정보 ── */}
        <div className="bg-white mb-[8px]">
          <div className="px-[20px] pt-[20px] pb-[4px] flex items-center justify-between">
            <p className="font-bold text-[#1a1a1a] text-[16px]">배송 정보</p>
          </div>

          {/* 집/회사 탭 */}
          <div className="px-[20px] py-[12px] flex gap-[8px]">
            {(["집", "회사"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAddressTab(tab)}
                className="px-[16px] h-[32px] rounded-[16px] text-[14px] font-medium transition-colors"
                style={{
                  background: addressTab === tab ? "#da231c" : "#f0f0f0",
                  color: addressTab === tab ? "white" : "#555",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 주소 카드 */}
          <div className="mx-[20px] mb-[12px] bg-[#f5f6f7] rounded-[10px] p-[14px] flex items-start justify-between">
            <div>
              <p className="font-bold text-[#222] text-[15px] mb-[4px]">롯데월드타워 101동</p>
              <p className="text-[#555] text-[13px] leading-[1.4]">서울시 송파구 올림픽로 300</p>
              <p className="text-[#555] text-[13px]">롯데월드타워 101동 3402호</p>
            </div>
            <button className="text-[#da231c] text-[13px] font-medium border border-[#da231c] rounded-[6px] px-[12px] h-[30px] flex items-center shrink-0">
              변경
            </button>
          </div>

          {/* 배송 요청 */}
          <div className="mx-[20px] mb-[16px] bg-[#f5f6f7] rounded-[10px] p-[14px]">
            <div className="flex items-center justify-between mb-[10px]">
              <p className="text-[#1a1a1a] text-[14px] font-medium">문 앞에 놓아주세요</p>
              <button>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-[8px]">
              <GrayCheckbox checked={safeNumChecked} onChange={() => setSafeNumChecked((v) => !v)} />
              <p className="text-[#555] text-[13px]">안심번호 사용</p>
            </div>
          </div>
        </div>

        {/* ── 희망배송일 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <div className="flex items-center justify-between mb-[12px]">
            <p className="font-bold text-[#1a1a1a] text-[16px]">희망배송일</p>
          </div>
          <div
            className="rounded-[10px] p-[14px] flex items-center justify-between"
            style={{ border: deliveryDate ? "1px solid #e5e5e5" : "1px solid #da231c" }}
          >
            <div>
              <p className="text-[#555] text-[13px] mb-[2px]">[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨</p>
              <p className={`text-[14px] font-medium ${deliveryDate ? "text-[#1a1a1a]" : "text-[#999]"}`}>
                {deliveryDate ? formatDate(deliveryDate) : "날짜를 선택해주세요"}
              </p>
            </div>
            <button
              onClick={() => setShowDatePicker(true)}
              className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-[#f0f0f0]"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="13" rx="1.5" stroke="#555" strokeWidth="1.2" />
                <path d="M2 7H16M6 1.5V4.5M12 1.5V4.5" stroke="#555" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* 폐가전수거 */}
          <div className="flex items-center gap-[8px] mt-[12px]">
            <GrayCheckbox checked={wastePickup} onChange={() => setWastePickup((v) => !v)} />
            <p className="text-[#555] text-[13px]">폐가전 수거 신청</p>
          </div>
        </div>

        {/* ── 상품 정보 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[16px] mb-[14px]">상품 정보</p>
          <div className="flex gap-[12px] items-start">
            <div className="relative rounded-[6px] overflow-hidden shrink-0" style={{ width: 72, height: 72, background: "#f7f7f7" }}>
              <Image src={imgBgTile} alt="" fill className="object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center p-[4px]">
                <Image src={imgAircon} alt="에어컨" fill className="object-contain" />
              </div>
              {/* 수량 배지 */}
              <div className="absolute top-[4px] right-[4px] w-[18px] h-[18px] rounded-full bg-[#da231c] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">1</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#333] text-[13px] leading-[1.4] mb-[6px] line-clamp-2">
                [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
              </p>
              <p className="text-[#999] text-[12px] line-through mb-[2px]">{fmt(ORIGINAL_PRICE)}</p>
              <p className="font-bold text-[#da231c] text-[15px]">{fmt(productPrice)}</p>
            </div>
          </div>
        </div>

        {/* ── 할인 선택 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[16px] mb-[14px]">할인 선택</p>

          {/* 최대할인쿠폰 */}
          <div className="flex items-center gap-[10px] mb-[12px]">
            <RedCheckbox checked={maxCoupon} onChange={() => setMaxCoupon((v) => !v)} />
            <span className="text-[#222] text-[14px] font-medium">최대할인쿠폰</span>
            <div className="flex-1" />
            <button className="bg-[#f0f0f0] rounded-[16px] px-[12px] h-[28px] text-[13px] text-[#555]">쿠폰선택</button>
          </div>
          <div className="bg-[#f5f6f7] rounded-[8px] px-[14px] py-[10px] mb-[16px] flex items-center justify-between">
            <span className="text-[#555] text-[13px]">할인 금액</span>
            <span className="font-bold text-[#1a1a1a] text-[14px]">{couponInput}</span>
          </div>

          {/* L.POINT */}
          <div className="flex items-center gap-[10px] mb-[8px]">
            <GrayCheckbox checked={lpointChecked} onChange={() => setLpointChecked((v) => !v)} />
            <span className="text-[#222] text-[14px] font-medium">L.POINT</span>
            <span className="text-[#999] text-[12px]">보유 3,850P</span>
          </div>
          <div className="bg-[#f5f6f7] rounded-[8px] px-[14px] py-[10px] flex items-center justify-between">
            <span className="text-[#555] text-[13px]">사용 포인트</span>
            <span className="text-[#1a1a1a] text-[14px]">{lpointInput}</span>
          </div>
        </div>

        {/* ── 매장 직원 추천 코드 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[16px] mb-[12px]">매장 직원 추천 코드</p>
          <div className="flex gap-[8px]">
            <input
              type="text"
              value={recommendCode}
              onChange={(e) => setRecommendCode(e.target.value)}
              placeholder="추천 코드를 입력해주세요"
              className="flex-1 border border-[#e5e5e5] rounded-[8px] px-[14px] h-[44px] text-[14px] outline-none"
            />
            <button className="bg-[#f0f0f0] rounded-[8px] px-[16px] h-[44px] text-[14px] text-[#555] shrink-0">검색</button>
          </div>
        </div>

        {/* ── 결제 수단 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[16px] mb-[14px]">결제 수단</p>

          {/* L.PAY */}
          <div className="flex items-center justify-between py-[10px] border-b border-[#f0f0f0]">
            <div className="flex items-center gap-[10px]">
              <div className="w-[36px] h-[20px] rounded-[4px] bg-[#da231c] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">L.PAY</span>
              </div>
              <span className="text-[#1a1a1a] text-[14px]">L.PAY</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
            </svg>
          </div>

          {/* 신용카드/체크카드 (선택됨) */}
          <div className="py-[10px] border-b border-[#f0f0f0]">
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-[10px]">
                <div className="w-[16px] h-[16px] rounded-full border-[2px] border-[#da231c] flex items-center justify-center">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#da231c]" />
                </div>
                <span className="text-[#da231c] font-medium text-[14px]">신용카드/체크카드</span>
              </div>
            </div>
            {/* 카드 선택 드롭다운 */}
            <div className="relative mb-[8px]">
              <button
                onClick={() => { setShowCardDrop((v) => !v); setShowInstallDrop(false); }}
                className="w-full flex items-center justify-between border border-[#e5e5e5] rounded-[8px] px-[14px] h-[44px]"
              >
                <span className="text-[14px] text-[#1a1a1a]">{selectedCard || "카드를 선택해주세요"}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5L7 9L11 5" stroke="#888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                </svg>
              </button>
              {showCardDrop && (
                <div className="absolute left-0 right-0 top-full z-20 mt-[4px]">
                  <PaymentDropdown
                    items={CARD_OPTIONS}
                    selected={selectedCard}
                    placeholder="카드 선택"
                    onSelect={(v) => { setSelectedCard(v); setShowCardDrop(false); }}
                    onClose={() => setShowCardDrop(false)}
                  />
                </div>
              )}
            </div>
            {/* 할부 선택 */}
            <div className="relative">
              <button
                onClick={() => { setShowInstallDrop((v) => !v); setShowCardDrop(false); }}
                className="w-full flex items-center justify-between border border-[#e5e5e5] rounded-[8px] px-[14px] h-[44px]"
              >
                <span className="text-[14px] text-[#1a1a1a]">{selectedInstall || "할부를 선택해주세요"}</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5L7 9L11 5" stroke="#888" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
                </svg>
              </button>
              {showInstallDrop && (
                <div className="absolute left-0 right-0 top-full z-20 mt-[4px]">
                  <PaymentDropdown
                    items={INSTALL_OPTIONS}
                    selected={selectedInstall}
                    placeholder="할부 선택"
                    onSelect={(v) => { setSelectedInstall(v); setShowInstallDrop(false); }}
                    onClose={() => setShowInstallDrop(false)}
                  />
                </div>
              )}
            </div>
          </div>

          {/* 하이마트페이 */}
          <div className="flex items-center justify-between py-[10px] border-b border-[#f0f0f0]">
            <div className="flex items-center gap-[10px]">
              <div className="w-[16px] h-[16px] rounded-full border-[1.5px] border-[#ccc]" />
              <span className="text-[#1a1a1a] text-[14px]">하이마트페이</span>
            </div>
          </div>

          {/* 간편결제 */}
          <div className="py-[12px]">
            <p className="text-[#999] text-[12px] mb-[10px]">간편결제</p>
            <div className="flex gap-[10px]">
              <button className="flex flex-col items-center gap-[4px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#FEE500] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#3C1E1E]">카카오</span>
                </div>
                <span className="text-[11px] text-[#555]">카카오페이</span>
              </button>
              <button className="flex flex-col items-center gap-[4px]">
                <div className="w-[44px] h-[44px] rounded-full bg-[#03C75A] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">N</span>
                </div>
                <span className="text-[11px] text-[#555]">네이버페이</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 결제금액 확인 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[16px] mb-[14px]">결제금액 확인</p>

          {/* 총 상품가 (접기 가능) */}
          <div className="flex items-center justify-between py-[8px]">
            <button
              onClick={() => setPriceExpanded((v) => !v)}
              className="flex items-center gap-[4px]"
            >
              <span className="text-[#555] text-[14px]">총 상품가</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${priceExpanded ? "rotate-180" : ""}`}>
                <path d="M3 5L7 9L11 5" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
              </svg>
            </button>
            <span className="text-[#1a1a1a] text-[14px]">{fmt(productPrice)}</span>
          </div>
          {priceExpanded && (
            <div className="bg-[#f5f6f7] rounded-[8px] p-[12px] mb-[4px]">
              <div className="flex justify-between text-[13px] text-[#555]">
                <span>[5년무상AS] 에어컨 PLX-RAC0825CHWH</span>
                <span>{fmt(productPrice)}</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-[8px]">
            <span className="text-[#555] text-[14px]">총 배송비</span>
            <span className="text-[#1a1a1a] text-[14px]">0원</span>
          </div>

          {/* 할인금액 (접기 가능) */}
          <div className="flex items-center justify-between py-[8px]">
            <button
              onClick={() => setDiscountExpanded((v) => !v)}
              className="flex items-center gap-[4px]"
            >
              <span className="text-[#555] text-[14px]">할인금액</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`transition-transform ${discountExpanded ? "rotate-180" : ""}`}>
                <path d="M3 5L7 9L11 5" stroke="#999" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3" />
              </svg>
            </button>
            <span className="text-[#da231c] text-[14px]">-{fmt(discountAmt)}</span>
          </div>
          {discountExpanded && (
            <div className="bg-[#f5f6f7] rounded-[8px] p-[12px] mb-[4px]">
              <div className="flex justify-between text-[13px] text-[#555]">
                <span>쿠폰 할인</span>
                <span className="text-[#da231c]">-{fmt(discountAmt)}</span>
              </div>
            </div>
          )}

          <div className="h-[1px] bg-[#e8e8e8] my-[8px]" />

          <div className="flex items-center justify-between py-[8px]">
            <span className="font-bold text-[#1a1a1a] text-[16px]">최종 결제금액</span>
            <span className="font-extrabold text-[#da231c] text-[24px]">{fmt(finalPrice)}</span>
          </div>

          <div className="flex items-center justify-between py-[4px]">
            <span className="text-[#555] text-[13px]">L.POINT 적립</span>
            <span className="text-[#1a1a1a] text-[13px]">+10,000P</span>
          </div>
        </div>

        {/* 동의 문구 */}
        <div className="px-[20px] py-[12px] mb-[8px]">
          <p className="text-[#999] text-[12px] leading-[1.6] text-center">
            위 주문 내용을 확인하였으며, 결제에 동의합니다.
          </p>
        </div>

        <div className="h-[80px]" />
      </div>

      {/* 결제하기 버튼 */}
      <div className="shrink-0 bg-white border-t border-[#e8e8e8] px-[20px] py-[12px]">
        <button
          onClick={onComplete}
          disabled={!canOrder}
          className="w-full h-[54px] rounded-[12px] flex items-center justify-center transition-colors"
          style={{ background: canOrder ? "#da231c" : "#ccc" }}
        >
          <span className="font-bold text-[17px] text-white">결제하기</span>
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
