"use client";

import { useState } from "react";
import Image from "next/image";
import himartLogo from "../img/himart-logo.png";

// ── 공통 서브 컴포넌트 ────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-3 h-[30px] shrink-0 bg-white">
      <span className="text-[13px] font-semibold text-[#1a1a1a]">9:27</span>
      <div className="flex items-center gap-1">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="3" width="3" height="9" rx="1" fill="#1a1a1a" />
          <rect x="5" y="2" width="3" height="10" rx="1" fill="#1a1a1a" />
          <rect x="10" y="0" width="3" height="12" rx="1" fill="#1a1a1a" />
          <rect x="15" y="0" width="3" height="12" rx="1" fill="#1a1a1a" opacity="0.3" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.4C10.5 2.4 12.7 3.4 14.3 5L16 3.3C13.9 1.3 11.1 0 8 0C4.9 0 2.1 1.3 0 3.3L1.7 5C3.3 3.4 5.5 2.4 8 2.4Z" fill="#1a1a1a" />
          <path d="M8 5.6C9.7 5.6 11.2 6.3 12.3 7.4L14 5.7C12.4 4.1 10.3 3.2 8 3.2C5.7 3.2 3.6 4.1 2 5.7L3.7 7.4C4.8 6.3 6.3 5.6 8 5.6Z" fill="#1a1a1a" />
          <circle cx="8" cy="10" r="2" fill="#1a1a1a" />
        </svg>
        <div className="flex items-center">
          <div className="border border-[#1a1a1a] rounded-[3px] w-[22px] h-[12px] p-[1.5px]">
            <div className="bg-[#1a1a1a] rounded-[1.5px] h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BackBtn({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex items-center h-[60px] px-3 shrink-0">
      <button onClick={onClick} className="p-2">
        <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
          <path d="M8 1L1 8L8 15" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function Cb({ checked, onChange, size = 20 }: { checked: boolean; onChange: () => void; size?: number }) {
  return (
    <button onClick={onChange} style={{ width: size, height: size, minWidth: size }}
      className={`rounded-[4px] flex items-center justify-center transition-colors ${checked ? "bg-[#da231c]" : "bg-white border border-[#ccc]"}`}>
      {checked && (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="relative shrink-0 rounded-full transition-colors"
      style={{ width: 28, height: 16, background: on ? "#da231c" : "#ccc" }}>
      <div className="absolute top-[2px] rounded-full bg-white transition-all"
        style={{ width: 12, height: 12, left: on ? 14 : 2 }} />
    </button>
  );
}

// ── 화면 1: 로그인 ────────────────────────────────────────────────
function LoginScreen({ onLogin, onSignup }: { onLogin: () => void; onSignup: () => void }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);
  const active = id.length > 0 && pw.length > 0;

  return (
    <div className="flex flex-col size-full bg-white font-['Pretendard',sans-serif]">
      <StatusBar />
      <BackBtn />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col px-4 pt-5">
          <div className="flex flex-col items-center gap-[7px] py-[6px]">
            <Image src={himartLogo} alt="LOTTE HIMART" className="h-[32px] w-auto object-contain" draggable={false} />
            <p className="text-[20px] font-bold text-[#1a1a1a] leading-[22.5px]">L.POINT 로그인</p>
          </div>

          <div className="mt-3 h-[52px] border border-[#e3e6ea] rounded-[8px]">
            <input className="size-full px-[17px] text-[14px] outline-none bg-transparent placeholder:text-[#c0c0c0]"
              placeholder="아이디 또는 이메일" value={id} onChange={e => setId(e.target.value)} />
          </div>

          <div className="mt-3 h-[52px] border border-[#e3e6ea] rounded-[8px]">
            <input type="password" className="size-full px-[17px] text-[14px] outline-none bg-transparent placeholder:text-[#c0c0c0]"
              placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} />
          </div>

          <button onClick={active ? onLogin : undefined}
            className="mt-3 h-[52px] rounded-[8px] w-full bg-[#da231c] text-white font-bold text-[18px] transition-opacity"
            style={{ opacity: active ? 1 : 0.9 }}>
            로그인
          </button>

          <div className="mt-2 flex items-center justify-between pt-1 pr-2 pb-2">
            <button onClick={() => setAutoLogin(!autoLogin)} className="flex items-center gap-2">
              <span className={`rounded-[4px] flex items-center justify-center size-[16px] ${autoLogin ? "bg-[#da291c]" : "bg-white border border-[#ccc]"}`}>
                {autoLogin && (
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                    <path d="M1 3.5L4 6.5L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[14px] text-[#222] tracking-[-0.28px]">자동 로그인</span>
            </button>
            <p className="text-[12px] text-[#999] text-right">
              <span>아이디 찾기 </span>
              <span className="text-[#eaeaea]">ㅣ</span>
              <span> 비밀번호 찾기 </span>
              <span className="text-[#eaeaea]">ㅣ</span>
              <button onClick={onSignup} className="text-[12px] text-[#999]">회원가입</button>
            </p>
          </div>

          <div className="border-b-2 border-[rgba(229,229,229,0.5)]" />

          <div className="mt-5 pt-6 flex items-center justify-center">
            <span className="text-[12px] text-[#999]">간편하게 시작</span>
          </div>

          <div className="mt-3 py-3 flex items-center justify-center gap-5">
            <button className="size-[40px] rounded-full bg-[#FEE500] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 22 20" fill="none">
                <path d="M11 0C4.9 0 0 3.9 0 8.7C0 11.7 1.9 14.3 4.8 16L3.5 20L8.2 17.3C9.1 17.5 10 17.5 11 17.5C17.1 17.5 22 13.6 22 8.7C22 3.9 17.1 0 11 0Z" fill="#3C1E1E" />
              </svg>
            </button>
            <button className="size-[40px] rounded-full bg-[#03C75A] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                <path d="M9.1 8.4L6.7 5H5V11H6.9V7.6L9.3 11H11V5H9.1V8.4Z" fill="white" />
              </svg>
            </button>
            <button className="size-[40px] rounded-full bg-[#1e1e1e] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 18 22" fill="none">
                <rect x="2" y="1" width="14" height="20" rx="2" stroke="white" strokeWidth="1.5" />
                <circle cx="9" cy="18" r="1" fill="white" />
              </svg>
            </button>
          </div>

          <div className="mt-5 border-b-2 border-[rgba(229,229,229,0.5)]" />
          <div className="mt-4 flex items-center justify-end pb-6">
            <span className="text-[12px] text-[#999]">비회원 주문조회</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 팝업: 약관동의 신청 ───────────────────────────────────────────
function TermsPopup({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
      <div className="bg-white rounded-[8px] w-[320px] overflow-hidden">
        <div className="px-6 py-5">
          <p className="text-[16px] font-bold text-center text-[#1a1a1a] mb-4">하이마트 약관동의 신청</p>
          <p className="text-[14px] text-[#444] text-center leading-relaxed">
            L.POINT 통합회원이시군요,<br />
            <span className="font-bold text-[#1a1a1a]">하이마트 약관동의</span>만 하시면 회원가입이<br />완료됩니다.
          </p>
        </div>
        <div className="flex border-t border-[#eee]">
          <button onClick={onCancel} className="flex-1 h-[50px] text-[15px] text-white font-medium bg-[#999]">취소</button>
          <button onClick={onConfirm} className="flex-1 h-[50px] text-[15px] text-white font-medium bg-[#da231c]">확인</button>
        </div>
      </div>
    </div>
  );
}

// ── 화면 3: 약관 동의 ────────────────────────────────────────────
function TermsScreen({ onSubmit }: { onSubmit: () => void }) {
  const [allCheck, setAllCheck] = useState(false);
  const [hi, setHi] = useState([false, false]);
  const [hiParent, setHiParent] = useState(false);
  const [sel, setSel] = useState([false, false, false]);
  const [selParent, setSelParent] = useState(false);
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(false);
  const [push, setPush] = useState(false);

  const syncAll = (next: boolean) => {
    setAllCheck(next); setHiParent(next); setHi([next, next]);
    setSelParent(next); setSel([next, next, next]);
    setSms(next); setEmail(next); setPush(next);
  };
  const toggleHiParent = () => {
    const next = !hiParent; setHiParent(next); setHi([next, next]);
    setAllCheck(next && selParent);
  };
  const toggleHiSub = (i: number) => {
    const next = hi.map((v, idx) => idx === i ? !v : v); setHi(next);
    const p = next.every(Boolean); setHiParent(p); setAllCheck(p && selParent);
  };
  const toggleSelParent = () => {
    const next = !selParent; setSelParent(next); setSel([next, next, next]);
    setSms(next); setEmail(next); setPush(next); setAllCheck(next && hiParent);
  };
  const toggleSelSub = (i: number) => {
    const next = sel.map((v, idx) => idx === i ? !v : v); setSel(next);
    const p = next.every(Boolean); setSelParent(p); setAllCheck(p && hiParent);
  };
  const canSubmit = hi[0] && hi[1];

  return (
    <div className="flex flex-col size-full bg-white">
      <StatusBar />
      <BackBtn />
      <div className="flex-1 overflow-y-auto px-4">
        <p className="text-[18px] text-[#1a1a1a] leading-snug mt-2 mb-6">
          하이마트 회원가입에 필요한<br /><span className="font-bold">약관을 동의</span>해 주세요
        </p>
        <button onClick={() => syncAll(!allCheck)} className="flex items-center gap-3 w-full py-3 border-b border-[#f0f0f0]">
          <Cb checked={allCheck} onChange={() => syncAll(!allCheck)} />
          <span className="text-[15px] font-bold text-[#1a1a1a]">전체동의</span>
        </button>

        <div className="mt-4">
          <button onClick={toggleHiParent} className="flex items-center gap-2 mb-3">
            <Cb checked={hiParent} onChange={toggleHiParent} />
            <span className="text-[14px] font-bold text-[#1a1a1a]">하이마트</span>
            <span className="text-[13px] text-[#da231c]">(필수)</span>
          </button>
          <div className="ml-4 bg-[#fafafa] rounded-[6px] p-3 flex flex-col gap-3">
            {[{ text: "하이마트 회원약관", tag: "(필수)" }, { text: "개인정보 필수사항 수집이용 동의", tag: "(필수)" }].map((item, i) => (
              <button key={i} onClick={() => toggleHiSub(i)} className="flex items-center gap-3">
                <Cb checked={hi[i]} onChange={() => toggleHiSub(i)} size={18} />
                <span className="text-[13px] text-[#333]">{item.text}</span>
                <span className="text-[12px] text-[#da231c]">{item.tag}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <button onClick={toggleSelParent} className="flex items-center gap-2 mb-3">
            <Cb checked={selParent} onChange={toggleSelParent} />
            <span className="text-[14px] font-bold text-[#1a1a1a]">선택 동의</span>
            <span className="text-[13px] text-[#999]">(선택)</span>
          </button>
          <div className="ml-4 bg-[#fafafa] rounded-[6px] p-3 flex flex-col gap-3">
            <button onClick={() => toggleSelSub(0)} className="flex items-center gap-3">
              <Cb checked={sel[0]} onChange={() => toggleSelSub(0)} size={18} />
              <span className="text-[13px] text-[#333]">개인정보 선택사항 수집이용 동의</span>
              <span className="text-[12px] text-[#999]">(선택)</span>
            </button>
            <button onClick={() => toggleSelSub(1)} className="flex items-center gap-3">
              <Cb checked={sel[1]} onChange={() => toggleSelSub(1)} size={18} />
              <span className="text-[13px] text-[#333]">마케팅 수신 동의</span>
              <span className="text-[12px] text-[#999]">(선택)</span>
            </button>
            <div className="ml-6 flex flex-col gap-2">
              {[{ label: "SMS(문자)", on: sms, toggle: () => setSms(!sms) }, { label: "이메일", on: email, toggle: () => setEmail(!email) }, { label: "앱 푸시", on: push, toggle: () => setPush(!push) }].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <Toggle on={item.on} onChange={item.toggle} />
                  <span className="text-[13px] text-[#555]">{item.label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => toggleSelSub(2)} className="flex items-center gap-3">
              <Cb checked={sel[2]} onChange={() => toggleSelSub(2)} size={18} />
              <span className="text-[13px] text-[#333]">개인정보 유효기간</span>
              <span className="text-[12px] text-[#999]">(선택)</span>
            </button>
            <div className="flex items-center gap-[16px] pl-[30px] pt-[6px]">
              <div className="flex items-center gap-[4px]">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4 8L11 1" stroke="#555" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"/></svg>
                <span className="text-[12px] text-[#555]">1년</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4 8L11 1" stroke="#555" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4"/></svg>
                <span className="text-[12px] text-[#555]">탈퇴 시 파기</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-6" />
      </div>
      <div className="px-4 pb-6 pt-3 shrink-0 bg-white border-t border-[#f0f0f0]">
        <button onClick={canSubmit ? onSubmit : undefined}
          className="h-[52px] w-full rounded-[6px] text-white font-bold text-[16px] transition-opacity"
          style={{ background: "#da231c", opacity: canSubmit ? 1 : 0.5 }}>
          가입하기
        </button>
      </div>
    </div>
  );
}

// ── 팝업: 가입완료 ────────────────────────────────────────────────
function CompletePopup({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
      <div className="bg-white rounded-[8px] w-[320px] overflow-hidden">
        <div className="px-6 py-6">
          <p className="text-[16px] font-bold text-center text-[#1a1a1a] mb-4">하이마트 회원가입 완료</p>
          <p className="text-[14px] text-[#444] text-center leading-relaxed">
            가입한 정보로<br />로그인되어 메인으로 이동됩니다.
          </p>
        </div>
        <div className="border-t border-[#eee]">
          <button onClick={onConfirm} className="w-full h-[50px] text-[15px] text-white font-medium bg-[#da231c]">확인</button>
        </div>
      </div>
    </div>
  );
}

// ── LoginPage (루트) ──────────────────────────────────────────────
type Step = "login" | "popup-terms" | "terms" | "popup-complete";

export default function LoginPage({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>("login");

  return (
    <div className="size-full bg-white overflow-hidden">
      <div className="relative size-full">
        {(step === "login" || step === "popup-terms") && (
          <LoginScreen onLogin={() => setStep("popup-terms")} onSignup={() => setStep("popup-terms")} />
        )}
        {(step === "terms" || step === "popup-complete") && (
          <TermsScreen onSubmit={() => setStep("popup-complete")} />
        )}
        {step === "popup-terms" && (
          <TermsPopup onCancel={() => setStep("login")} onConfirm={() => setStep("terms")} />
        )}
        {step === "popup-complete" && (
          <CompletePopup onConfirm={onComplete} />
        )}
      </div>
    </div>
  );
}
