"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { DaiVanPanel } from "@/components/tuvi/DaiVanPanel";
import { LaSoGrid } from "@/components/tuvi/LaSoGrid";
import { lapLaSo } from "@/lib/tuvi/lapLaSo";
import { luuLichSu } from "@/lib/tuvi/lichSu";

export default function LaSoPage() {
  return (
    <Suspense>
      <LaSoContent />
    </Suspense>
  );
}

function LaSoContent() {
  const searchParams = useSearchParams();

  const ngay = Number(searchParams.get("ngay"));
  const thang = Number(searchParams.get("thang"));
  const nam = Number(searchParams.get("nam"));
  const gio = Number(searchParams.get("gio") ?? "7");
  const gioiTinh = searchParams.get("gioiTinh") === "-1" ? -1 : 1;
  const hoTen = searchParams.get("ten") ?? undefined;
  const [namXem, setNamXem] = useState(() => new Date().getFullYear());

  const laSo = useMemo(() => {
    if (!ngay || !thang || !nam) return null;
    try {
      return lapLaSo({ ngay, thang, nam, gioSinh: gio, gioiTinh, duongLich: true, timeZone: 7 });
    } catch {
      return null;
    }
  }, [ngay, thang, nam, gio, gioiTinh]);

  useEffect(() => {
    if (!laSo) return;
    luuLichSu({ ten: hoTen ?? "", ngay, thang, nam, gio, gioiTinh });
  }, [laSo, hoTen, ngay, thang, nam, gio, gioiTinh]);

  if (!laSo) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Thông tin ngày sinh không hợp lệ hoặc chưa được cung cấp.
        </p>
        <Link href="/" className="text-amber-600 underline hover:text-amber-700">
          Quay lại nhập thông tin
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-6 px-4 py-10">
      <div className="flex w-full max-w-3xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Lá số Tử Vi{hoTen ? ` — ${hoTen}` : ""}
        </h1>
        <Link
          href="/"
          className="shrink-0 text-sm text-amber-600 underline hover:text-amber-700"
        >
          Lập lá số khác
        </Link>
      </div>
      <div className="flex w-full max-w-4xl flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-zinc-500">
          Chạm vào từng cung để xem luận giải. (M) Miếu, (V) Vượng, (Đ) Đắc, (B) Bình, (H) Hãm —
          sao chữ xám có tiền tố <span className="font-medium">L.</span> là sao lưu niên của năm
          xem.
        </p>
        <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          Năm xem hạn
          <input
            type="number"
            value={namXem}
            min={laSo.namAmLich}
            max={laSo.namAmLich + 120}
            onChange={(e) => setNamXem(Number(e.target.value))}
            className="w-24 rounded-md border border-black/15 bg-white px-2 py-1 text-sm dark:border-white/15 dark:bg-black/30"
          />
        </label>
      </div>
      <LaSoGrid laSo={laSo} hoTen={hoTen} namXem={namXem} />
      <DaiVanPanel laSo={laSo} namXem={namXem} />
    </div>
  );
}
