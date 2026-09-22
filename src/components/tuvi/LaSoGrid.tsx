"use client";

import { useMemo, useState } from "react";
import { canCuaCung, diaChi, thienCan } from "@/lib/tuvi/canChi";
import type { CungDiaBan } from "@/lib/tuvi/diaBan";
import type { LaSoResult } from "@/lib/tuvi/lapLaSo";
import { nhomSaoLuuTheoCung, tenCanChiNam, tinhSaoLuuNien, tuoiMu } from "@/lib/tuvi/luuNien";
import type { Sao } from "@/lib/tuvi/sao";
import { thongTinLaSo } from "@/lib/tuvi/thongTinLaSo";
import { danhSachGioSinh } from "@/lib/tuvi/gioSinh";
import { PalaceDetail } from "./PalaceDetail";

/**
 * Vị trí 12 cung trên lưới 4x4 kiểu bàn cờ cổ điển: Tỵ Ngọ Mùi Thân ở hàng trên,
 * Dần Sửu Tý Hợi ở hàng dưới, ô giữa 2x2 dành cho thông tin lá số.
 */
const viTriLuoi: Record<number, { row: number; col: number }> = {
  6: { row: 1, col: 1 },
  7: { row: 1, col: 2 },
  8: { row: 1, col: 3 },
  9: { row: 1, col: 4 },
  5: { row: 2, col: 1 },
  10: { row: 2, col: 4 },
  4: { row: 3, col: 1 },
  11: { row: 3, col: 4 },
  3: { row: 4, col: 1 },
  2: { row: 4, col: 2 },
  1: { row: 4, col: 3 },
  12: { row: 4, col: 4 },
};

/** Màu chữ theo ngũ hành của sao, giống cách lá số truyền thống tô màu. */
const mauNguHanh: Record<string, string> = {
  K: "text-slate-500 dark:text-slate-400",
  M: "text-green-700 dark:text-green-400",
  T: "text-blue-700 dark:text-blue-400",
  H: "text-red-600 dark:text-red-400",
  O: "text-amber-700 dark:text-amber-500",
};

function tenSaoDayDu(sao: Sao) {
  return sao.dacTinh ? `${sao.ten}(${sao.dacTinh})` : sao.ten;
}

interface CungProps {
  cung: CungDiaBan;
  canNam: number;
  saoLuu: { ten: string }[];
}

function OCung({ cung, canNam, saoLuu }: CungProps) {
  const chinhTinh = cung.cungSao.filter((s) => s.loai === 1);
  const trangSinh = cung.cungSao.find((s) => s.vongTrangSinh);
  const phuTinh = cung.cungSao.filter((s) => s.loai !== 1 && !s.vongTrangSinh);
  const can = thienCan[canCuaCung(canNam, cung.cungSo)];

  // Chia phụ tinh thành 2 cột như lá số giấy: cột trái lấp trước, cột phải phần còn lại.
  const nua = Math.ceil((phuTinh.length + saoLuu.length) / 2);
  const cotTrai = phuTinh.slice(0, nua);
  const cotPhai = [
    ...phuTinh.slice(nua).map((s) => ({ ten: tenSaoDayDu(s), nguHanh: s.nguHanh, luu: false })),
    ...saoLuu.map((s) => ({ ten: `L.${s.ten}`, nguHanh: "", luu: true })),
  ];

  return (
    <div className="flex h-full flex-col justify-between gap-1 p-1 text-[10px] leading-tight sm:text-[11px]">
      <div>
        <div className="flex items-baseline justify-between gap-1">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">
            {can.chuCaiDau}.{cung.cungTen}
          </span>
          <span className="truncate font-bold uppercase tracking-tight text-zinc-900 dark:text-zinc-100">
            {cung.cungChu}
            {cung.cungThan && <span className="text-amber-700 dark:text-amber-500"> ‹THÂN›</span>}
          </span>
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">{cung.cungDaiHan}</span>
        </div>

        <div className="mt-0.5 text-center">
          {chinhTinh.map((s) => (
            <div key={s.id} className="font-bold text-red-700 dark:text-red-400">
              {tenSaoDayDu(s)}
            </div>
          ))}
        </div>

        <div className="mt-0.5 flex justify-between gap-1">
          <div className="flex flex-col">
            {cotTrai.map((s) => (
              <span key={s.id} className={mauNguHanh[s.nguHanh]}>
                {tenSaoDayDu(s)}
              </span>
            ))}
          </div>
          <div className="flex flex-col text-right">
            {cotPhai.map((s, i) => (
              <span
                key={i}
                className={s.luu ? "text-zinc-400 dark:text-zinc-500" : mauNguHanh[s.nguHanh]}
              >
                {s.ten}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-1 text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          {(cung.tuanTrung || cung.trietLo) && (
            <span className="rounded bg-zinc-800 px-1 text-[9px] font-medium text-white dark:bg-zinc-200 dark:text-zinc-900">
              {cung.tuanTrung ? "Tuần" : "Triệt"}
            </span>
          )}
          {cung.cungTieuHan}
        </span>
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{trangSinh?.ten}</span>
        <span>Tháng {cung.cungThangHan}</span>
      </div>
    </div>
  );
}

function OGiua({
  laSo,
  hoTen,
  namXem,
}: {
  laSo: LaSoResult;
  hoTen?: string;
  namXem: number;
}) {
  const tt = thongTinLaSo(laSo);
  const gio = danhSachGioSinh.find((g) => g.gio === laSo.chiGio);
  const canChi = (can: number, chi: number) =>
    `${thienCan[can].tenCan} ${diaChi[chi].tenChi}`;

  const dong = (nhan: string, giaTri: string, phu?: string) => (
    <div className="flex gap-2">
      <span className="w-20 shrink-0 font-medium text-zinc-600 dark:text-zinc-400">{nhan}</span>
      <span className="flex-1 text-zinc-900 dark:text-zinc-100">{giaTri}</span>
      {phu && <span className="w-24 shrink-0 text-blue-700 dark:text-blue-400">{phu}</span>}
    </div>
  );

  return (
    <div className="flex h-full flex-col justify-center gap-1 overflow-auto p-3 text-[11px] sm:text-xs">
      <p className="mb-1 text-center text-sm font-bold text-zinc-900 dark:text-zinc-50">
        LÁ SỐ TỬ VI
      </p>
      {dong("Họ tên:", hoTen || "—")}
      {dong("Năm:", String(laSo.namDuongLich), laSo.tenNamAm)}
      {dong(
        "Tháng:",
        `${laSo.thangDuongLich} (${laSo.thangAmLich}${laSo.thangNhuan ? " nhuận" : ""})`,
        canChi(laSo.canThang, laSo.chiThang),
      )}
      {dong("Ngày:", `${laSo.ngayDuongLich} (${laSo.ngayAmLich})`, canChi(laSo.canNgay, laSo.chiNgay))}
      {dong("Giờ:", `${gio?.ten} (${gio?.khung})`, canChi(laSo.canGio, laSo.chiGio))}
      {dong("Năm xem:", `${namXem} — ${tuoiMu(namXem, laSo.namAmLich)} tuổi`, tenCanChiNam(namXem))}
      <div className="my-1 border-t border-black/10 dark:border-white/10" />
      {dong("Âm Dương:", tt.amDuongMenh)}
      {dong("Mệnh:", laSo.banMenh)}
      {dong("Cục:", tt.hanhCucDayDu)}
      {dong("Chủ Mệnh:", tt.chuMenh)}
      {dong("Chủ Thân:", tt.chuThan)}
      <div className="mt-1 flex flex-col text-blue-700 dark:text-blue-400">
        <span>Âm Dương {tt.amDuongThuanLy ? "thuận lý" : "nghịch lý"}</span>
        <span>{tt.quanHeMenhCuc}</span>
        <span>Thân cư {tt.thanCu}</span>
      </div>
    </div>
  );
}

export function LaSoGrid({
  laSo,
  hoTen,
  namXem,
}: {
  laSo: LaSoResult;
  hoTen?: string;
  namXem: number;
}) {
  const [cungDangChon, setCungDangChon] = useState<number | null>(null);
  const cacCung = laSo.diaBan.thapNhiCung.slice(1);
  const saoLuuTheoCung = useMemo(() => nhomSaoLuuTheoCung(tinhSaoLuuNien(namXem)), [namXem]);

  const vienCung = (cung: CungDiaBan) =>
    cung.cungThan
      ? "border-amber-500 bg-amber-50/60 dark:bg-amber-950/20"
      : "border-black/15 bg-white dark:border-white/15 dark:bg-white/5";

  return (
    <div className="w-full max-w-4xl">
      {/* Bàn cờ 4x4 truyền thống, cuộn ngang trên màn hình hẹp */}
      <div className="overflow-x-auto">
        <div className="grid min-w-160 grid-cols-4 grid-rows-[repeat(4,minmax(9rem,auto))] gap-px bg-black/15 dark:bg-white/15">
          {cacCung.map((cung) => (
            <button
              key={cung.cungSo}
              onClick={() => setCungDangChon(cung.cungSo)}
              style={{ gridRow: viTriLuoi[cung.cungSo].row, gridColumn: viTriLuoi[cung.cungSo].col }}
              className={`overflow-hidden border text-left transition-colors hover:brightness-95 ${vienCung(cung)}`}
            >
              <OCung
                cung={cung}
                canNam={laSo.canNam}
                saoLuu={saoLuuTheoCung[cung.cungSo] ?? []}
              />
            </button>
          ))}

          <div
            style={{ gridRow: "2 / span 2", gridColumn: "2 / span 2" }}
            className="border border-black/15 bg-amber-50/40 dark:border-white/15 dark:bg-white/5"
          >
            <OGiua laSo={laSo} hoTen={hoTen} namXem={namXem} />
          </div>
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
