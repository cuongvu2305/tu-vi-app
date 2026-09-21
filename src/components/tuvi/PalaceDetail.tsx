"use client";

import type { CungDiaBan } from "@/lib/tuvi/diaBan";
import { luanGiaiChinhTinh, moTaDacTinh, yNghiaCung } from "@/lib/tuvi/luanGiai";

export function PalaceDetail({ cung, onClose }: { cung: CungDiaBan; onClose: () => void }) {
  const chinhTinh = cung.cungSao.filter((s) => s.loai === 1);
  const phuTinh = cung.cungSao.filter((s) => s.loai !== 1);
  const tenCung = cung.cungChu ?? cung.cungTen;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Cung {tenCung} ({cung.cungTen})
            </h2>
            {cung.cungThan && (
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                Cung an Thân
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm text-zinc-500 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Đóng
          </button>
        </div>

        {yNghiaCung[tenCung] && (
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{yNghiaCung[tenCung]}</p>
        )}

        {chinhTinh.length > 0 ? (
          <div className="flex flex-col gap-3">
            {chinhTinh.map((sao, i) => {
              const lg = luanGiaiChinhTinh[sao.ten];
              const dacTinhText = moTaDacTinh(sao.dacTinh);
              return (
                <div
                  key={i}
                  className="rounded-lg border border-black/10 p-3 dark:border-white/10"
                >
                  <p className="font-semibold text-red-700 dark:text-red-400">
                    {sao.ten}
                    {dacTinhText ? ` — ${dacTinhText}` : ""}
                  </p>
                  {lg && (
                    <div className="mt-1 flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
                      <p>{lg.tomTat}</p>
                      <p className="text-emerald-700 dark:text-emerald-400">{lg.tot}</p>
                      <p className="text-red-600 dark:text-red-400">{lg.xau}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm italic text-zinc-500">Cung vô chính diệu (không có chính tinh).</p>
        )}

        {phuTinh.length > 0 && (
          <div className="mt-4">
            <p className="mb-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Phụ tinh:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {phuTinh.map((sao, i) => (
                <span
                  key={i}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {sao.ten}
                  {sao.dacTinh ? ` (${sao.dacTinh})` : ""}
                </span>
              ))}
            </div>
          </div>
        )}

        {(cung.tuanTrung || cung.trietLo) && (
          <p className="mt-3 text-xs text-zinc-500">
            {cung.tuanTrung && "Cung nằm trong Tuần. "}
            {cung.trietLo && "Cung nằm trong Triệt."}
          </p>
        )}
      </div>
    </div>
  );
}
