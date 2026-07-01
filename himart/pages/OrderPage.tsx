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
const fmt = (n: number) => n.toLocaleString("ko-KR") + "원";

function RedCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="rounded-[4px] shrink-0 flex items-center justify-center"
      style={{ width: 20, height: 20, background: checked ? "#da231c" : "white", border: checked ? "none" : "1.5px solid #d1d1d1" }}>
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
    <button onClick={onChange} className="rounded-[4px] shrink-0 flex items-center justify-center"
      style={{ width: 20, height: 20, background: checked ? "#888" : "white", border: checked ? "none" : "1.5px solid #d1d1d1" }}>
      {checked && (
        <svg fill="none" viewBox="0 0 11 8" width="12" height="9">
          <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      )}
    </button>
  );
}

function InfoIcon() {
  return (
    <div className="w-[18px] h-[18px] rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0">
      <span className="text-white text-[11px] font-bold leading-none">!</span>
    </div>
  );
}

function ChevronDown({ color = "#888" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5L7 9L11 5" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
    </svg>
  );
}

export default function OrderPage({ onComplete, onBack }: Props) {
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [addressTab, setAddressTab] = useState<"집" | "회사">("집");
  const [safeNumChecked, setSafeNumChecked] = useState(true);
  const [wastePickup, setWastePickup] = useState(true);
  const [maxCoupon, setMaxCoupon] = useState(true);
  const [lpointChecked, setLpointChecked] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>("현대카드");
  const [selectedInstall, setSelectedInstall] = useState<string | null>("3개월");
  const [showCardDrop, setShowCardDrop] = useState(false);
  const [showInstallDrop, setShowInstallDrop] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [discountExpanded, setDiscountExpanded] = useState(false);
  const [productExpanded, setProductExpanded] = useState(true);
  const [recommendCode, setRecommendCode] = useState("");

  const discountAmt = 100000;
  const finalPrice = UNIT_PRICE - discountAmt;

  const formatDate = (d: Date) =>
    `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${["일", "월", "화", "수", "목", "금", "토"][d.getDay()]})`;

  const canOrder = deliveryDate !== null && selectedCard !== null && selectedInstall !== null;

  return (
    <div className="bg-white relative size-full flex flex-col overflow-hidden">
      {/* 헤더 */}
      <div className="shrink-0 h-[60px] flex items-center justify-between px-[16px] border-b border-[#eee] bg-white">
        <button onClick={onBack} className="flex items-center justify-center w-[20px] h-[20px]">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path d="M9 1L1 9L5 13L9 17" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        <p className="font-bold text-[18px] text-black">주문/결제</p>
        <div className="w-[20px]" />
      </div>

      {/* 스크롤 본문 */}
      <div className="flex-1 overflow-y-auto bg-[#f5f6f7]">

        {/* ── 배송 정보 ── */}
        <div className="bg-white mb-[8px] px-[20px] pt-[20px] pb-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[17px] mb-[14px]">배송 정보</p>

          {/* 집/회사 탭 + 변경 버튼 */}
          <div className="flex items-center gap-[8px] mb-[14px]">
            {(["집", "회사"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAddressTab(tab)}
                className="h-[36px] px-[20px] rounded-[18px] text-[14px] font-medium transition-colors"
                style={
                  addressTab === tab
                    ? { background: "#1a1a1a", color: "white", border: "none" }
                    : { background: "white", color: "#888", border: "1.5px solid #ddd" }
                }
              >
                {tab}
              </button>
            ))}
            <div className="flex-1" />
            <button className="h-[34px] px-[14px] rounded-[8px] border border-[#ccc] flex items-center justify-center">
              <span className="text-[13px] text-[#555]">변경</span>
            </button>
          </div>

          {/* 주소 카드 */}
          <div className="bg-[#f5f6f7] rounded-[10px] p-[16px] mb-[10px]">
            <div className="flex items-start gap-[8px]">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" className="shrink-0 mt-[1px]">
                <path d="M9 0C4.6 0 1 3.6 1 8C1 13.4 9 22 9 22C9 22 17 13.4 17 8C17 3.6 13.4 0 9 0Z" fill="#da231c" />
                <circle cx="9" cy="8" r="3" fill="white" />
              </svg>
              <div className="flex flex-col gap-[3px]">
                <p className="font-bold text-[#1a1a1a] text-[15px]">서울시 송파구 올림픽로 300</p>
                <p className="text-[#666] text-[13px]">롯데월드타워 101동 3402호 (우) 05551</p>
                <p className="text-[#666] text-[13px]">홍길동 010-1234-5678</p>
              </div>
            </div>
          </div>

          {/* 배송 요청사항 카드 */}
          <div className="bg-[#f5f6f7] rounded-[10px] p-[16px]">
            <div className="flex items-center gap-[6px] mb-[12px]">
              <InfoIcon />
              <p className="font-bold text-[#1a1a1a] text-[14px]">배송 요청사항</p>
            </div>
            {/* 드롭다운 */}
            <button className="w-full h-[46px] bg-white rounded-[8px] border border-[#e5e5e5] flex items-center justify-between px-[14px] mb-[12px]">
              <span className="text-[13px] text-[#1a1a1a]">문 앞에 놓아주세요. (공동현관 2030)</span>
              <ChevronDown />
            </button>
            {/* 안심번호 사용 */}
            <div className="flex items-center gap-[8px]">
              <RedCheckbox checked={safeNumChecked} onChange={() => setSafeNumChecked((v) => !v)} />
              <span className="text-[#1a1a1a] text-[14px]">안심번호 사용</span>
            </div>
          </div>
        </div>

        {/* ── 희망배송일 ── */}
        <div
          className="bg-white mb-[8px] mx-0 rounded-none"
          style={{ border: "none" }}
        >
          <div
            className="mx-[16px] my-[0px] rounded-[10px] p-[16px]"
            style={{ border: `1.5px solid ${deliveryDate ? "#e5e5e5" : "#da231c"}` }}
          >
            {/* 희망배송일 헤더 */}
            <div className="flex items-center justify-between mb-[12px]">
              <div className="flex items-center gap-[6px]">
                <InfoIcon />
                <p className="font-bold text-[#1a1a1a] text-[14px]">
                  희망배송일 <span className="text-[#da231c]">*</span>
                </p>
              </div>
              <button
                onClick={() => setShowDatePicker(true)}
                className="flex items-center gap-[6px] h-[34px] px-[12px] rounded-[8px] border border-[#ccc]"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="#555" strokeWidth="1.1" />
                  <path d="M1 6H13M4 1V3.5M10 1V3.5" stroke="#555" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <span className="text-[13px] text-[#555]">
                  {deliveryDate ? formatDate(deliveryDate) : "배송일 선택"}
                </span>
              </button>
            </div>

            {/* 상품명 텍스트 박스 */}
            <div className="w-full h-[44px] bg-white border border-[#e5e5e5] rounded-[8px] flex items-center px-[14px] mb-[12px]">
              <span className="text-[13px] text-[#555]">[5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH</span>
            </div>

            {/* 폐가전수거 */}
            <div className="flex items-center gap-[8px] mb-[4px]">
              <GrayCheckbox checked={wastePickup} onChange={() => setWastePickup((v) => !v)} />
              <span className="text-[#1a1a1a] text-[14px]">폐가전수거</span>
            </div>
            {wastePickup && (
              <div className="ml-[28px]">
                <p className="text-[#888] text-[12px]">• 폐가전을 무상 수거해드립니다.</p>
              </div>
            )}
          </div>
          <div className="py-[8px]" />
        </div>

        {/* ── 상품 정보 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <button
            onClick={() => setProductExpanded((v) => !v)}
            className="flex items-center gap-[6px] mb-[14px]"
          >
            <p className="font-bold text-[#1a1a1a] text-[17px]">상품 정보</p>
            <span className="text-[#555] text-[14px]">총 1건</span>
            <ChevronDown color={productExpanded ? "#1a1a1a" : "#888"} />
          </button>

          {productExpanded && (
            <div className="flex gap-[12px] items-start">
              {/* 이미지 */}
              <div className="relative rounded-[6px] overflow-hidden shrink-0" style={{ width: 72, height: 72, background: "#f7f7f7" }}>
                <Image src={imgBgTile} alt="" fill className="object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center p-[4px]">
                  <Image src={imgAircon} alt="에어컨" fill className="object-contain" />
                </div>
                <div className="absolute top-[4px] right-[4px] w-[18px] h-[18px] rounded-full bg-[#da231c] flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">1</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                {/* PLUX 브랜드명 */}
                <div className="flex items-center gap-[4px] mb-[4px]">
                  <span className="text-[11px] font-bold text-[#555] tracking-[0.5px]">PLUX</span>
                </div>
                <p className="text-[#333] text-[13px] leading-[1.4] mb-[6px] line-clamp-2">
                  [5년무상AS] 26.0㎡ 인버터 벽걸이 에어컨 PLX-RAC0825CHWH [전국기본설치비 포함]
                </p>
                <p className="text-[#999] text-[12px] line-through mb-[2px]">{fmt(ORIGINAL_PRICE)}</p>
                <p className="font-bold text-[#da231c] text-[15px]">{fmt(UNIT_PRICE)}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── 할인 선택 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[17px] mb-[14px]">할인 선택</p>

          {/* 최대할인쿠폰 */}
          <div className="flex items-center gap-[10px] mb-[10px]">
            <RedCheckbox checked={maxCoupon} onChange={() => setMaxCoupon((v) => !v)} />
            <span className="text-[#1a1a1a] text-[14px] font-medium">최대할인쿠폰</span>
            <div className="flex-1" />
            <button className="bg-[#f0f0f0] rounded-[16px] px-[14px] h-[30px] text-[13px] text-[#555]">쿠폰선택</button>
          </div>
          <div className="bg-[#f5f6f7] rounded-[8px] px-[14px] py-[10px] mb-[16px] flex items-center justify-between">
            <span className="text-[#555] text-[13px]">할인 금액</span>
            <span className="font-bold text-[#1a1a1a] text-[14px]">100,000원</span>
          </div>

          {/* L.POINT */}
          <div className="flex items-center gap-[10px] mb-[8px]">
            <GrayCheckbox checked={lpointChecked} onChange={() => setLpointChecked((v) => !v)} />
            <span className="text-[#1a1a1a] text-[14px] font-medium">L.POINT</span>
            <span className="text-[#999] text-[12px]">보유 3,850P</span>
          </div>
          <div className="bg-[#f5f6f7] rounded-[8px] px-[14px] py-[10px] flex items-center justify-between">
            <span className="text-[#555] text-[13px]">사용 포인트</span>
            <span className="text-[#1a1a1a] text-[14px]">0 P</span>
          </div>
        </div>

        {/* ── 매장 직원 추천 코드 ── */}
        <div className="bg-white mb-[8px] px-[20px] py-[16px]">
          <p className="font-bold text-[#1a1a1a] text-[17px] mb-[12px]">매장 직원 추천 코드</p>
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
          <p className="font-bold text-[#1a1a1a] text-[17px] mb-[14px]">결제 수단</p>

          {/* L.PAY */}
          <div className="flex items-center justify-between py-[12px] border-b border-[#f0f0f0]">
            <div className="flex items-center gap-[10px]">
              <div className="w-[38px] h-[22px] rounded-[4px] bg-[#da231c] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold tracking-[0.5px]">L.PAY</span>
              </div>
              <span className="text-[#1a1a1a] text-[14px]">L.PAY</span>
            </div>
            <ChevronDown color="#ccc" />
          </div>

          {/* 신용카드/체크카드 (선택됨) */}
          <div className="py-[12px] border-b border-[#f0f0f0]">
            <div className="flex items-center gap-[10px] mb-[12px]">
              <div className="w-[18px] h-[18px] rounded-full border-[2.5px] border-[#da231c] flex items-center justify-center">
                <div className="w-[8px] h-[8px] rounded-full bg-[#da231c]" />
              </div>
              <span className="text-[#da231c] font-bold text-[14px]">신용카드/체크카드</span>
            </div>
            {/* 카드 선택 */}
            <div className="relative mb-[8px]">
              <button
                onClick={() => { setShowCardDrop((v) => !v); setShowInstallDrop(false); }}
                className="w-full h-[46px] border border-[#e5e5e5] rounded-[8px] flex items-center justify-between px-[14px]"
              >
                <span className="text-[14px] text-[#1a1a1a]">{selectedCard || "카드를 선택해주세요"}</span>
                <ChevronDown />
              </button>
              {showCardDrop && (
                <div className="absolute left-0 right-0 top-full z-20 mt-[4px]">
                  <PaymentDropdown items={CARD_OPTIONS} selected={selectedCard} placeholder="카드 선택"
                    onSelect={(v) => { setSelectedCard(v); setShowCardDrop(false); }}
                    onClose={() => setShowCardDrop(false)} />
                </div>
              )}
            </div>
            {/* 할부 선택 */}
            <div className="relative">
              <button
                onClick={() => { setShowInstallDrop((v) => !v); setShowCardDrop(false); }}
                className="w-full h-[46px] border border-[#e5e5e5] rounded-[8px] flex items-center justify-between px-[14px]"
              >
                <span className="text-[14px] text-[#1a1a1a]">{selectedInstall || "할부를 선택해주세요"}</span>
                <ChevronDown />
              </button>
              {showInstallDrop && (
                <div className="absolute left-0 right-0 top-full z-20 mt-[4px]">
                  <PaymentDropdown items={INSTALL_OPTIONS} selected={selectedInstall} placeholder="할부 선택"
                    onSelect={(v) => { setSelectedInstall(v); setShowInstallDrop(false); }}
                    onClose={() => setShowInstallDrop(false)} />
                </div>
              )}
            </div>
          </div>

          {/* 하이마트페이 */}
          <div className="flex items-center gap-[10px] py-[12px] border-b border-[#f0f0f0]">
            <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#ccc]" />
            <span className="text-[#1a1a1a] text-[14px]">하이마트페이</span>
          </div>

          {/* 간편결제 */}
          <div className="pt-[12px]">
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
          <p className="font-bold text-[#1a1a1a] text-[17px] mb-[14px]">결제금액 확인</p>

          <div className="flex items-center justify-between py-[8px]">
            <button onClick={() => setPriceExpanded((v) => !v)} className="flex items-center gap-[4px]">
              <span className="text-[#555] text-[14px]">총 상품가</span>
              <ChevronDown color={priceExpanded ? "#1a1a1a" : "#aaa"} />
            </button>
            <span className="text-[#1a1a1a] text-[14px]">{fmt(UNIT_PRICE)}</span>
          </div>
          {priceExpanded && (
            <div className="bg-[#f5f6f7] rounded-[8px] p-[12px] mb-[4px] flex justify-between text-[13px] text-[#555]">
              <span>[5년무상AS] 에어컨 PLX-RAC0825CHWH</span>
              <span>{fmt(UNIT_PRICE)}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-[8px]">
            <span className="text-[#555] text-[14px]">총 배송비</span>
            <span className="text-[#1a1a1a] text-[14px]">0원</span>
          </div>

          <div className="flex items-center justify-between py-[8px]">
            <button onClick={() => setDiscountExpanded((v) => !v)} className="flex items-center gap-[4px]">
              <span className="text-[#555] text-[14px]">할인금액</span>
              <ChevronDown color={discountExpanded ? "#1a1a1a" : "#aaa"} />
            </button>
            <span className="text-[#da231c] text-[14px]">-{fmt(discountAmt)}</span>
          </div>
          {discountExpanded && (
            <div className="bg-[#f5f6f7] rounded-[8px] p-[12px] mb-[4px] flex justify-between text-[13px] text-[#555]">
              <span>쿠폰 할인</span>
              <span className="text-[#da231c]">-{fmt(discountAmt)}</span>
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
        <div className="px-[20px] py-[12px]">
          <p className="text-[#999] text-[12px] leading-[1.6] text-center">
            위 주문 내용을 확인하였으며, 결제에 동의합니다.
          </p>
        </div>

        <div className="h-[80px]" />
      </div>

      {/* 결제하기 버튼 */}
      <div className="shrink-0 bg-white border-t border-[#e8e8e8] px-[16px] py-[12px]">
        <button
          onClick={onComplete}
          disabled={!canOrder}
          className="w-full h-[54px] rounded-[12px] flex items-center justify-center"
          style={{ background: canOrder ? "#da231c" : "#ccc" }}
        >
          <span className="font-bold text-[17px] text-white">
            {fmt(UNIT_PRICE)} 결제하기
          </span>
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
