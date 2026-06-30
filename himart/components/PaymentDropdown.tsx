"use client";

interface Props {
  items: string[];
  selected: string | null;
  placeholder: string;
  onSelect: (item: string) => void;
  onClose: () => void;
}

export default function PaymentDropdown({ items, selected, placeholder, onSelect }: Props) {
  return (
    <div
      className="relative rounded-[14px] overflow-hidden py-[2px]"
      style={{
        background: "rgba(245,245,245,0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0px 8px 40px 0px rgba(0,0,0,0.12), 0 0 0 0.5px rgba(0,0,0,0.08)",
      }}
    >
      <div className="px-[20px] py-[11px] border-b border-[rgba(0,0,0,0.08)]">
        <p className="text-[17px] leading-[20px] tracking-[-0.43px] text-[#bfbfbf]"
          style={{ fontFamily: "SF Pro, 'Noto Sans KR', sans-serif" }}>
          {placeholder}
        </p>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {items.map((item, i) => {
          const isSelected = item === selected;
          const isLast = i === items.length - 1;
          return (
            <button
              key={item}
              onClick={() => onSelect(item)}
              className={[
                "w-full flex items-center justify-between pl-[36px] pr-[16px] py-[11px] text-left active:bg-[rgba(0,0,0,0.05)]",
                isSelected ? "pl-[8px]" : "",
                !isLast ? "border-b border-[rgba(0,0,0,0.06)]" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-[4px]">
                {isSelected && (
                  <div className="w-[22px] flex items-center justify-center">
                    <svg fill="none" viewBox="0 0 18 14" width="18" height="14">
                      <path d="M1 7L6.5 12.5L17 1" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <span className="text-[17px] leading-[20px] tracking-[-0.43px] text-[#1a1a1a]"
                  style={{ fontFamily: "SF Pro, 'Noto Sans KR', sans-serif" }}>
                  {item}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
