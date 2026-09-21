"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { danhSachGioSinh } from "@/lib/tuvi/gioSinh";
import {
  dangKyLichSu,
  docLichSuRaw,
  linkLaSo,
  parseLichSu,
  xoaMucLichSu,
  xoaTatCaLichSu,
} from "@/lib/tuvi/lichSu";

export function LichSuXem() {
  const raw = useSyncExternalStore(dangKyLichSu, docLichSuRaw, () => "[]");
  const ds = useMemo(() => parseLichSu(raw), [raw]);

  if (ds.length === 0) return null;

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Đã xem gần đây</h2>
        <button
          onClick={xoaTatCaLichSu}
          className="text-xs text-zinc-500 underline hover:text-red-600"
        >
          Xóa tất cả
        </button>
      </div>
      <ul className="flex flex-col gap-1.5">
        {ds.map((m) => {
          const gio = danhSachGioSinh.find((g) => g.gio === m.gio);
          return (
            <li
              key={`${m.ten}-${m.ngay}-${m.thang}-${m.nam}-${m.gio}-${m.gioiTinh}`}
              className="flex items-center justify-between rounded-lg border border-black/10 bg-white/70 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            >
              <Link href={linkLaSo(m)} className="flex-1 hover:text-amber-700">
                <span className="font-medium">{m.ten || "Không tên"}</span>
                <span className="ml-2 text-xs text-zinc-500">
                  {m.ngay}/{m.thang}/{m.nam} · giờ {gio?.ten} · {m.gioiTinh === 1 ? "Nam" : "Nữ"}
                </span>
              </Link>
              <button
                aria-label="Xóa"
                onClick={() => xoaMucLichSu(m)}
                className="ml-2 text-zinc-400 hover:text-red-600"
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
