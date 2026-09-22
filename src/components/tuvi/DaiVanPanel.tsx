"use client";

import { useMemo } from "react";
import { luanDaiVan, TEN_CHU_DE, type MucDoVan } from "@/lib/tuvi/luanGiaiVan";
import type { LaSoResult } from "@/lib/tuvi/lapLaSo";

const mauMucDo: Record<MucDoVan, string> = {
  cat: "text-emerald-700 dark:text-emerald-400",
  hung: "text-red-600 dark:text-red-400",
  luuY: "text-zinc-700 dark:text-zinc-300",
};

/** Tuổi mụ (tuổi âm) tại một năm dương lịch. */
function tuoiMu(namXem: number, namAmLich: number) {
  return namXem - namAmLich + 1;
}

export function DaiVanPanel({ laSo, namXem }: { laSo: LaSoResult; namXem?: number }) {
  const cacVan = useMemo(() => luanDaiVan(laSo.diaBan).filter((v) => v.tuoiTu <= 92), [laSo]);
  const tuoi = tuoiMu(namXem ?? new Date().getFullYear(), laSo.namAmLich);

  return (
    <section className="w-full max-w-3xl">
      <h2 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-50">Luận đại vận</h2>
      <p className="mb-3 text-xs text-zinc-500">
        Mỗi đại vận kéo dài 10 năm, xét theo các sao trong tam phương tứ chính của cung đại vận. Chỉ
        mang tính tham khảo, không phải dự đoán chắc chắn. Tình duyên và con cái chỉ xét từ tuổi 18.
      </p>
      <div className="flex flex-col gap-2">
        {cacVan.map((v) => {
          const hienTai = tuoi >= v.tuoiTu && tuoi <= v.tuoiDen;
          return (
            <div
              key={v.cungSo}
              className={`rounded-lg border p-3 text-sm ${
                hienTai
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                  : "border-black/10 bg-white dark:border-white/10 dark:bg-white/5"
              }`}
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">
                {v.tuoiTu} – {v.tuoiDen} tuổi · cung {v.tenCung}
                {hienTai && (
                  <span className="ml-2 text-xs font-medium text-amber-700 dark:text-amber-400">
                    (đang ở đại vận này)
                  </span>
                )}
              </p>
              {v.ketQua.length > 0 ? (
                <ul className="mt-1 list-disc pl-5">
                  {v.ketQua.map((k, i) => (
                    <li key={i} className={mauMucDo[k.mucDo]}>
                      <span className="font-medium">{TEN_CHU_DE[k.chuDe]}:</span> {k.noiDung}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-xs italic text-zinc-500">
                  Giai đoạn bình thường, chưa có bộ sao đặc biệt theo giáo trình.
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
