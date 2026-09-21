"use client";

import { useState } from "react";
import type { CungDiaBan } from "@/lib/tuvi/diaBan";
import type { LaSoResult } from "@/lib/tuvi/lapLaSo";
import { PalaceDetail } from "./PalaceDetail";

/**
 * Vị trí 12 cung trên lưới 4x4 kiểu bàn cờ cổ điển, đi ngược chiều kim đồng hồ
 * bắt đầu từ Tỵ (góc trên-trái) theo đúng thứ tự Địa Chi Tý..Hợi.
 * Ô giữa (hàng 2-3, cột 2-3) dành cho thông tin bản mệnh.
 */
const viTriLuoi: Record<number, { row: number; col: number }> = {
  6: { row: 1, col: 1 }, // Tỵ
  7: { row: 1, col: 2 }, // Ngọ
  8: { row: 1, col: 3 }, // Mùi
  9: { row: 1, col: 4 }, // Thân
  5: { row: 2, col: 1 }, // Thìn
  10: { row: 2, col: 4 }, // Dậu
  4: { row: 3, col: 1 }, // Mão
  11: { row: 3, col: 4 }, // Tuất
  3: { row: 4, col: 1 }, // Dần
  2: { row: 4, col: 2 }, // Sửu
  1: { row: 4, col: 3 }, // Tý
  12: { row: 4, col: 4 }, // Hợi
};

function CungCellContent({ cung }: { cung: CungDiaBan }) {
  const chinhTinh = cung.cungSao.filter((s) => s.loai === 1);
  const phuTinh = cung.cungSao.filter((s) => s.loai !== 1);
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <span className="font-semibold text-zinc-800 dark:text-zinc-100">{cung.cungChu}</span>
        <span className="text-zinc-400">{cung.cungTen}</span>
      </div>
      {cung.cungThan && (
        <span className="text-[9px] font-medium text-amber-600 dark:text-amber-400">Thân cư</span>
      )}
      <div className="flex flex-wrap gap-x-1 gap-y-0.5">
        {chinhTinh.map((s, i) => (
          <span key={i} className="font-medium text-red-700 dark:text-red-400">
            {s.ten}
            {s.dacTinh ? `(${s.dacTinh})` : ""}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-zinc-500 dark:text-zinc-400">
        {phuTinh.map((s, i) => (
          <span key={i}>{s.ten}</span>
        ))}
      </div>
    </>
  );
}

function BanMenhInfo({ laSo, hoTen }: { laSo: LaSoResult; hoTen?: string }) {
  return (
    <>
      {hoTen && <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">{hoTen}</p>}
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        {laSo.ngayAmLich}/{laSo.thangAmLich}
        {laSo.thangNhuan ? " (nhuận)" : ""}/{laSo.namAmLich} âm lịch
      </p>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">Năm {laSo.tenNamAm}</p>
      <p className="text-xs font-medium text-amber-700 dark:text-amber-400">{laSo.tenCuc}</p>
      <p className="text-xs text-zinc-600 dark:text-zinc-400">Bản mệnh: {laSo.banMenh}</p>
    </>
  );
}

export function LaSoGrid({ laSo, hoTen }: { laSo: LaSoResult; hoTen?: string }) {
  const [cungDangChon, setCungDangChon] = useState<number | null>(null);
  const cacCung = laSo.diaBan.thapNhiCung.slice(1);

  return (
    <div className="w-full max-w-3xl">
      {/* Mobile: danh sách dọc, dễ đọc trên màn hình hẹp */}
      <div className="flex flex-col gap-2 sm:hidden">
        <div className="flex flex-col items-center gap-1 rounded-lg border border-black/10 bg-amber-50/60 p-3 text-center dark:border-white/10 dark:bg-white/5">
          <BanMenhInfo laSo={laSo} hoTen={hoTen} />
        </div>
        {cacCung.map((cung) => (
          <button
            key={cung.cungSo}
            onClick={() => setCungDangChon(cung.cungSo)}
            className={`flex flex-col items-start gap-0.5 rounded-lg border p-2.5 text-left text-xs leading-snug ${
              cung.cungThan
                ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                : "border-black/10 bg-white dark:border-white/10 dark:bg-white/5"
            }`}
          >
            <CungCellContent cung={cung} />
          </button>
        ))}
      </div>

      {/* Từ sm trở lên: bàn cờ 4x4 truyền thống */}
      <div className="hidden aspect-square grid-cols-4 grid-rows-4 gap-1 sm:grid">
        {cacCung.map((cung) => {
          const viTri = viTriLuoi[cung.cungSo];
          return (
            <button
              key={cung.cungSo}
              onClick={() => setCungDangChon(cung.cungSo)}
              style={{ gridRow: viTri.row, gridColumn: viTri.col }}
              className={`flex flex-col items-start gap-0.5 overflow-y-auto rounded-md border p-1.5 text-left text-[10px] leading-tight transition-colors sm:text-xs ${
                cung.cungThan
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                  : "border-black/10 bg-white hover:bg-amber-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              }`}
            >
              <CungCellContent cung={cung} />
            </button>
          );
        })}

        <div
          style={{ gridRow: "2 / span 2", gridColumn: "2 / span 2" }}
          className="flex flex-col items-center justify-center gap-1 rounded-md border border-black/10 bg-amber-50/60 p-3 text-center dark:border-white/10 dark:bg-white/5"
        >
          <BanMenhInfo laSo={laSo} hoTen={hoTen} />
        </div>
      </div>

      {cungDangChon !== null && (
        <PalaceDetail
          cung={laSo.diaBan.thapNhiCung[cungDangChon]}
          onClose={() => setCungDangChon(null)}
        />
      )}
    </div>
  );
}
