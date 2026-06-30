"use client";

interface Props {
  onSearch: () => void;
  onCart: () => void;
  onMy: () => void;
}

export default function HomePage({ onSearch, onCart, onMy }: Props) {
  const categories = [
    { label: "최대 32%", bg: "#fff0f0", icon: "🏷️" },
    { label: "플럭스", bg: "#f0f4ff", icon: "⚡" },
    { label: "인증중고", bg: "#f0fff4", icon: "✅" },
    { label: "소모품", bg: "#fffbf0", icon: "🔧" },
    { label: "Apple", bg: "#f5f5f7", icon: "" },
    { label: "에어컨", bg: "#f0f8ff", icon: "❄️" },
    { label: "TV", bg: "#fafafa", icon: "📺" },
  ];

  return (
    <div className="flex flex-col size-full bg-white font-['Pretendard',sans-serif] overflow-hidden">
      {/* 상태바 */}
      <div className="flex items-center justify-between px-3 h-[30px] shrink-0 bg-white">
        <span className="text-[13px] font-semibold text-[#1a1a1a]">9:27</span>
        <div className="flex items-center gap-1">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#1a1a1a"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#1a1a1a"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#1a1a1a"/><rect x="15" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 2.4C10.5 2.4 12.7 3.4 14.3 5L16 3.3C13.9 1.3 11.1 0 8 0C4.9 0 2.1 1.3 0 3.3L1.7 5C3.3 3.4 5.5 2.4 8 2.4Z" fill="#1a1a1a"/><path d="M8 5.6C9.7 5.6 11.2 6.3 12.3 7.4L14 5.7C12.4 4.1 10.3 3.2 8 3.2C5.7 3.2 3.6 4.1 2 5.7L3.7 7.4C4.8 6.3 6.3 5.6 8 5.6Z" fill="#1a1a1a"/><circle cx="8" cy="10" r="2" fill="#1a1a1a"/></svg>
          <div className="border border-[#1a1a1a] rounded-[3px] w-[22px] h-[12px] p-[1.5px]"><div className="bg-[#1a1a1a] rounded-[1.5px] h-full w-full"/></div>
        </div>
      </div>

      {/* 헤더 */}
      <div className="shrink-0 h-[44px] bg-white flex items-center px-4 gap-2 border-b border-[#f0f0f0]">
        <button className="flex items-center gap-1">
          <span className="text-[15px] font-bold text-[#1a1a1a]">쉬워지는 곳</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
        <div className="relative flex items-center ml-2 shrink-0"
          style={{ width: 116, height: 33, background: "#fafafa", borderRadius: 17, boxShadow: "inset 0 0 0 1px #e6e6e6" }}>
          <button className="flex-1 h-full rounded-[17px] bg-[#111111] text-white text-[13px] font-bold">쇼핑</button>
          <button className="flex-1 h-full text-[#797B7D] text-[13px] font-medium">안심케어</button>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C11 2 6 4.5 6 10V15L4 17H18L16 15V10C16 4.5 11 2 11 2Z" stroke="#1a1a1a" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 17C9 18.1 9.9 19 11 19C12.1 19 13 18.1 13 17" stroke="#1a1a1a" strokeWidth="1.4"/></svg>
          </button>
          <button onClick={onCart}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 3H5L7.5 14H16.5L19 6H7" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="17.5" r="1.5" fill="#1a1a1a"/><circle cx="15" cy="17.5" r="1.5" fill="#1a1a1a"/></svg>
          </button>
        </div>
      </div>

      {/* 검색바 */}
      <button onClick={onSearch} className="shrink-0 mx-3 my-[8px] h-[46px] bg-white border border-[#585858] rounded-[8px] flex items-center pl-4 pr-3 gap-3">
        <span className="text-[14px] text-[#959595] flex-1 text-left truncate">삼성가전 20% 혜택 + 카드 최대 12% 할인</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="9.5" cy="9.5" r="7" stroke="#111111" strokeWidth="1.6"/><path d="M15 15L19 19" stroke="#111111" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 5V17M6 5V17M9 5V17M12 5V17M15 5V17M19 5V17" stroke="#111111" strokeWidth="1.4" strokeLinecap="round"/></svg>
      </button>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* 메인 배너 */}
        <div className="relative w-full h-[200px] bg-[#1b2d52] overflow-hidden">
          <div className="absolute right-0 top-0 w-[160px] h-full opacity-20">
            <div className="absolute right-[-20px] top-[-20px] w-[180px] h-[180px] rounded-full bg-[#4a7af7]"/>
            <div className="absolute right-[20px] top-[40px] w-[120px] h-[120px] rounded-full bg-[#6b9bff]"/>
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[#2a4a8f] flex items-center justify-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="20" r="8" stroke="#7aabff" strokeWidth="2"/><path d="M20 60V40C20 35 25 32 30 32C35 32 40 35 40 40V60" stroke="#7aabff" strokeWidth="2.5" strokeLinecap="round"/><path d="M10 42H20M40 42H50" stroke="#7aabff" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <div className="absolute left-5 bottom-5">
            <p className="text-[11px] text-[#7aabff] mb-1 font-medium">기획전</p>
            <p className="text-white text-[18px] font-bold leading-[1.3]">여름맞이 건강 피트니스<br/>홈 웰니스 기획전</p>
            <p className="text-[#aac4ff] text-[11px] mt-1">쿠폰 최대적용+카드 추가 할인</p>
          </div>
          <div className="absolute right-3 bottom-3 bg-black/40 rounded-full px-[8px] py-[3px]">
            <span className="text-white text-[11px] font-medium">17 / 25</span>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex items-start px-3 py-4 overflow-x-auto">
          {categories.map(({ label, bg, icon }) => (
            <button key={label} className="flex flex-col items-center gap-[6px] shrink-0 w-[64px]">
              <div className="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center text-[22px]" style={{ background: bg }}>
                {icon || <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4C14 4 8 4 6 10C4 16 6 20 8 22C10 24 14 24 14 24C14 24 18 24 20 22C22 20 24 16 22 10C20 4 14 4 14 4Z" fill="#1a1a1a"/><path d="M10 18C10 18 12 20 14 20C16 20 18 18 18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              </div>
              <span className="text-[10px] text-[#555] text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
        <div className="h-[6px] bg-[#f5f6f7]"/>

        {/* 3단 배너 */}
        <div className="flex gap-[8px] px-3 py-3">
          {[
            { badge: "최대 12%OFF", title: "하이마트세일", bg: "#fff5f5", dot: "#da231c" },
            { badge: "최대 81%OFF", title: "전시특가", bg: "#f5f8ff", dot: "#2255cc" },
            { badge: "간편 견적담기", title: "나만의 조립PC", bg: "#f5fff8", dot: "#228844" },
          ].map(({ badge, title, bg, dot }) => (
            <button key={title} className="flex-1 rounded-[10px] px-[10px] py-[10px] text-left" style={{ background: bg }}>
              <div className="w-[6px] h-[6px] rounded-full mb-[5px]" style={{ background: dot }}/>
              <p className="text-[10px] font-semibold" style={{ color: dot }}>{badge}</p>
              <p className="text-[12px] font-bold text-[#1a1a1a] mt-[2px] leading-tight">{title}</p>
            </button>
          ))}
        </div>
        <div className="h-[6px] bg-[#f5f6f7]"/>

        {/* 삼성 가전 카드 */}
        <div className="px-3 py-4">
          <div className="rounded-[12px] bg-[#f0f4ff] p-4 flex items-center justify-between">
            <div>
              <p className="text-[13px] text-[#2255cc] font-medium">삼성 가전, 하이마트에서</p>
              <p className="text-[16px] font-bold text-[#1a1a1a] leading-snug mt-[2px]">제일 싸게 사는 법</p>
              <p className="text-[11px] text-[#666] mt-1">20% 기본 혜택에 최대 12% 다 합친 방기</p>
            </div>
            <div className="w-[70px] h-[70px] rounded-[10px] bg-[#1a1a1a] flex items-center justify-center shrink-0">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="4" y="8" width="28" height="20" rx="2" stroke="white" strokeWidth="1.5"/><path d="M12 28V32M24 28V32M8 32H28" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><circle cx="18" cy="18" r="5" stroke="#4a9eff" strokeWidth="1.5"/></svg>
            </div>
          </div>
        </div>
        <div className="h-[6px] bg-[#f5f6f7]"/>

        {/* 오늘의 특가 */}
        <div className="px-3 py-4 pb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[15px] font-bold text-[#1a1a1a]">오늘의 특가</span>
            <button className="text-[12px] text-[#999]">전체보기 &gt;</button>
          </div>
          <div className="flex gap-[10px] overflow-x-auto pb-1">
            {[
              { name: "LG 휘센 스탠드\n에어컨 23평", price: "1,899,000", badge: "최대 20%", color: "#e8f4ff" },
              { name: "삼성 비스포크\n냉장고 4도어", price: "2,590,000", badge: "특별할인", color: "#fff0e8" },
              { name: "LG 오브제컬렉션\n세탁기 25kg", price: "1,290,000", badge: "L포인트↑", color: "#f0f8e8" },
            ].map(({ name, price, badge, color }) => (
              <button key={name} className="shrink-0 w-[130px] text-left" onClick={onCart}>
                <div className="w-[130px] h-[130px] rounded-[10px] flex items-center justify-center mb-2 relative" style={{ background: color }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none"><rect x="8" y="15" width="44" height="30" rx="3" fill="#ddd"/><rect x="12" y="19" width="36" height="22" rx="2" fill="#1a1a1a"/><circle cx="30" cy="30" r="8" stroke="#4a9eff" strokeWidth="1.5"/><rect x="20" y="45" width="20" height="3" rx="1.5" fill="#ddd"/></svg>
                  <span className="absolute top-2 left-2 bg-[#da231c] text-white text-[10px] px-[6px] py-[2px] rounded-full font-semibold">{badge}</span>
                </div>
                <p className="text-[12px] text-[#333] leading-tight whitespace-pre-line">{name}</p>
                <p className="text-[13px] font-bold text-[#1a1a1a] mt-1">{price}원</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 바텀 탭 */}
      <div className="shrink-0 border-t border-[#f0f0f0] flex bg-white">
        {[
          { label: "홈", active: true, onClick: undefined as (() => void) | undefined, icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10L11 3L19 10V19H14V14H8V19H3V10Z" fill="#da231c"/></svg> },
          { label: "카테고리", active: false, onClick: undefined, icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="4" width="7" height="7" rx="1" stroke="#999" strokeWidth="1.5"/><rect x="12" y="4" width="7" height="7" rx="1" stroke="#999" strokeWidth="1.5"/><rect x="3" y="13" width="7" height="7" rx="1" stroke="#999" strokeWidth="1.5"/><rect x="12" y="13" width="7" height="7" rx="1" stroke="#999" strokeWidth="1.5"/></svg> },
          { label: "L.Point", active: false, onClick: undefined, icon: <div className="w-[36px] h-[22px] bg-[#da231c] rounded-full flex items-center justify-center"><span className="text-white text-[9px] font-bold">L.P</span></div> },
          { label: "안심케어", active: false, onClick: undefined, icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3L4 6V12C4 16 7.5 19.5 11 21C14.5 19.5 18 16 18 12V6L11 3Z" stroke="#999" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 11L10 13L14 9" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { label: "마이", active: false, onClick: onMy, icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="#999" strokeWidth="1.5"/><path d="M3 20C3 16.7 6.6 14 11 14C15.4 14 19 16.7 19 20" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/></svg> },
        ].map(({ label, active, icon, onClick }) => (
          <button key={label} onClick={onClick} className="flex-1 py-2 flex flex-col items-center gap-[2px]">
            {icon}
            <span className={`text-[10px] ${active ? "text-[#da231c] font-bold" : "text-[#999]"}`}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
