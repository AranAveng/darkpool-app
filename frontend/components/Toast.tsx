"use client";

type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed right-6 top-20 z-[100] rounded-xl border border-white/10 bg-[#111827] px-5 py-3 text-sm text-white shadow-2xl">
      {message}
    </div>
  );
}