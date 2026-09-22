"use client";

import { useMemo } from "react";
import { luanDaiVan, TEN_CHU_DE, type KetQuaVan, type MucDoVan } from "@/lib/tuvi/luanGiaiVan";
import type { LaSoResult } from "@/lib/tuvi/lapLaSo";
import { tuoiMu } from "@/lib/tuvi/luuNien";

const mauMucDo: Record<MucDoVan, string> = {
  cat: "text-emerald-700 dark:text-emerald-400",
  hung: "text-red-600 dark:text-red-400",
  luuY: "text-zinc-700 dark:text-zinc-300",
};

function NoiDungVan({ v }: { v: KetQuaVan }) {
  if (v.ketQua.length === 0) {
    return (
      <p className="mt-1 text-xs italic text-zinc-500">
        Giai đoạn bình thường, chưa có bộ sao đặc biệt theo giáo trình.
      </p>
    );
  }
  return (
    <ul className="mt-1 list-disc pl-5">
      {v.ketQua.map((k) => (
        <li key={k.chuDe} className={mauMucDo[k.mucDo]}>
          <span className="font-medium">{TEN_CHU_DE[k.chuDe]}:</span> {k.noiDung}
        </li>
      ))}
    </ul>
  );
}

function TieuDeVan({ v, nhan }: { v: KetQuaVan; nhan?: string }) {
  return (
    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
      {v.tuoiTu} – {v.tuoiDen} tuổi · cung {v.tenCung}
      {nhan && (
        <span className="ml-2 text-xs font-medium text-amber-700 dark:text-amber-400">({nhan})</span>
      )}
    </span>
  );
}

export function DaiVanPanel({ laSo, namXem }: { laSo: LaSoResult; namXem: number }) {
  const cacVan = useMemo(() => luanDaiVan(laSo.diaBan).filter((v) => v.tuoiTu <= 92), [laSo]);
  const tuoi = tuoiMu(namXem, laSo.namAmLich);

  // Chưa tới vận đầu tiên (tuổi nhỏ hơn tuổi khởi vận) thì coi vận đầu là "kế tiếp".
  const viTriHienTai = cacVan.findIndex((v) => tuoi >= v.tuoiTu && tuoi <= v.tuoiDen);
  const viTriKeTiep = viTriHienTai >= 0 ? viTriHienTai + 1 : cacVan.findIndex((v) => v.tuoiTu > tuoi);
  const nhanVan = (i: number) =>
    i === viTriHienTai ? "đang ở đại vận này" : i === viTriKeTiep ? "vận kế tiếp" : undefined;

  const noiBat = [viTriHienTai, viTriKeTiep].filter((i) => i >= 0 && i < cacVan.length);

  return (
    <section className="w-full max-w-4xl">
      <h2 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">Luận đại vận</h2>
      <p className="mb-3 text-xs text-zinc-500">
        Mỗi đại vận kéo dài 10 năm, xét theo bộ sao trong tam phương tứ chính, trong đó sao chủ phải
        nằm ngay cung đại vận. Mỗi chủ đề chỉ xét ở độ tuổi phù hợp: học vấn đến khoảng 35 tuổi,
        tình duyên 18–50, con cái 20–50, tài lộc từ 18. Chỉ mang tính tham khảo.
      </p>

      <div className="flex flex-col gap-2">
        {noiBat.map((i) => (
          <div
            key={cacVan[i].cungSo}
            className={`rounded-lg border p-3 text-sm ${
              i === viTriHienTai
                ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                : "border-black/10 bg-white dark:border-white/10 dark:bg-white/5"
            }`}
          >
            <TieuDeVan v={cacVan[i]} nhan={nhanVan(i)} />
            <NoiDungVan v={cacVan[i]} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <p className="text-xs font-medium text-zinc-500">Các đại vận khác (bấm để xem)</p>
        {cacVan.map((v, i) =>
          noiBat.includes(i) ? null : (
            <details
              key={v.cungSo}
              className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
            >
              <summary className="cursor-pointer select-none">
                <TieuDeVan v={v} />
                <span className="ml-2 text-xs text-zinc-500">
                  {v.ketQua.length > 0 ? `${v.ketQua.length} chủ đề` : "bình thường"}
                </span>
              </summary>
              <NoiDungVan v={v} />
            </details>
          ),
        )}
      </div>
    </section>
  );
}
