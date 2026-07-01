"use client";

import { useState } from "react";

type Step = "popup" | "calendar";

interface Props {
  onComplete: (date: Date) => void;
  onClose: () => void;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isPast(date: Date, today: Date) {
  const d = new Date(date); d.setHours(0, 0, 0, 0);
  const t = new Date(today); t.setHours(0, 0, 0, 0);
  return d < t;
}

function CalendarView({ onClose, onComplete }: { onClose: () => void; onComplete: (d: Date) => void }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState<Date | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), current: false });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ date: new Date(year, month, d), current: true });
  while (cells.length % 7 !== 0)
    cells.push({ date: new Date(year, month + 1, cells.length - firstDay - daysInMonth + 1), current: false });

  const weeks: { date: Date; current: boolean }[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20" onClick={onClose}>
      <div
        className="bg-white border border-[#cdcdcd] rounded-[4px] overflow-hidden w-[277px]"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-[16px] py-[16px]">
          <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="size-[20px] flex items-center justify-center">
            <svg viewBox="0 0 10 16" width="7" height="10" fill="none">
              <path d="M9 1L1 8L9 15" stroke="#4E4E4E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex gap-[8px] items-center">
            <span className="font-medium text-[#333] text-[15px]">{year}년</span>
            <span className="font-medium text-[#333] text-[15px]">{month + 1}월</span>
          </div>
          <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="size-[20px] flex items-center justify-center">
            <svg viewBox="0 0 10 16" width="7" height="10" fill="none">
              <path d="M1 1L9 8L1 15" stroke="#4E4E4E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between px-[16px] pb-[12px]">
          {DAYS.map((d, i) => (
            <div key={d} className="w-[28px] flex items-center justify-center">
              <span className="text-[13px]" style={{ color: i === 0 || i === 6 ? "#fababe" : "#999" }}>{d}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-[8px] px-[16px] pb-[12px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex items-center justify-between">
              {week.map(({ date, current }, di) => {
                const isToday = isSameDay(date, today);
                const isSelected = selected ? isSameDay(date, selected) : false;
                const past = isPast(date, today);
                const isSun = di === 0;
                const isSat = di === 6;
                const dim = !current || past;
                let textColor = "#4e4e4e";
                if (isSun || isSat) textColor = "#fababe";
                if (isSelected) textColor = "white";
                return (
                  <button key={di} onClick={() => { if (current && !past) setSelected(date); }}
                    disabled={!current || past}
                    className="relative size-[28px] flex items-center justify-center">
                    {isSelected && <span className="absolute inset-0 rounded-full bg-[#4e4e4e]" />}
                    {isToday && !isSelected && <span className="absolute inset-0 rounded-full border border-[#4e4e4e]" />}
                    <span className="relative text-[15px] text-center" style={{ color: textColor, opacity: dim && !isSelected ? 0.3 : 1 }}>
                      {date.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="border-t border-[#cdcdcd] flex items-center justify-between px-[16px] py-[12px]">
          <button onClick={onClose} className="bg-white border border-[#cdcdcd] rounded-[4px] px-[8px] py-[4px]">
            <span className="font-medium text-[#999] text-[15px]">닫기</span>
          </button>
          <button onClick={() => { if (selected) onComplete(selected); }} disabled={!selected}
            className="bg-[#333] rounded-[4px] px-[8px] py-[4px] disabled:opacity-40">
            <span className="font-medium text-white text-[15px]">완료</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoPopup({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  const items = [
    <>상품 재고 상황에 따라 입력하신 <span className="font-bold text-[#006dda]">희망배송일과 다른 날짜</span>에 <span className="font-bold text-[#006dda]">배송</span>받으실 수 있습니다.</>,
    <><span className="font-bold text-[#006dda]">전시/미개봉특가상품</span> 등 일부 상품은 별도 <span className="font-bold text-[#006dda]">해피콜 및 상품 준비/포장</span> 등의 일정이 소요되므로 입력하신 <span className="font-bold text-[#006dda]">희망배송일과 다른 날짜에 배송</span>받으실 수 있습니다</>,
    <>배송기사님의 설치를 진행하는 경우, 방문시간 지정을 위해 배송 전일 오후 별도 연락이 진행됩니다. (오늘설치의 경우, 주문 당일 오후 연락 예정)<br /><span className="font-bold text-[#006dda]">(히마마트 안심케어(가전클리닝) 서비스 희망일 전일 연락 예정)</span></>,
    <><span className="font-bold text-[#006dda]">LG, 삼성전자</span> 배송는 <span className="font-bold text-[#006dda]">업체배송의 경우 배송일 확정 시 업체에서 배송일 안내 알림톡이 발송</span>됩니다.</>,
    <>택배배송의 경우 희망배송일이 적용되지 않습니다.</>,
    <>물류 휴무일엔 배송이 불가합니다.</>,
    <>하이마트 안심케어 가전클리닝 다품목 구매서비스 희망일은 동일 날짜로만 지정 가능합니다.</>,
  ];

  return (
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] z-20 flex items-start justify-center pt-[162px]">
      <div
        className="bg-white rounded-[8px] w-[360px] max-h-[520px] flex flex-col overflow-hidden mx-[15px]"
        style={{ boxShadow: "0px 4px 1px rgba(0,0,0,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[12px] items-start px-[16px] pt-[16px] pb-[8px]">
          <p className="font-bold leading-[24px] text-[#333] text-[16px]">배송 /설치 관련 안내</p>
          <p className="font-medium leading-[16px] text-[#e00] text-[14px]">배송 유의 사항</p>
        </div>
        <div className="flex-1 overflow-y-auto px-[16px] pb-[16px] flex flex-col gap-[8px]">
          {items.map((item, i) => (
            <div key={i} className="flex gap-[6px] items-start">
              <span className="shrink-0 text-[#333] text-[13px] leading-[20px] pt-px">•</span>
              <p className="text-[#333] text-[13px] leading-[20px]">{item}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center px-[16px] pb-[16px]">
          <button
            onClick={onConfirm}
            className="bg-[#333] h-[40px] rounded-[4px] w-full flex items-center justify-center"
          >
            <span className="font-bold text-[16px] text-white">확인</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DeliveryDatePicker({ onComplete, onClose }: Props) {
  const [step, setStep] = useState<Step>("popup");
  return (
    <>
      {step === "popup" && <InfoPopup onConfirm={() => setStep("calendar")} onClose={onClose} />}
      {step === "calendar" && <CalendarView onClose={onClose} onComplete={onComplete} />}
    </>
  );
}
