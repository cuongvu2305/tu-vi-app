"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { danhSachGioSinh } from "@/lib/tuvi/gioSinh";

export function BirthForm() {
  const router = useRouter();
  const [hoTen, setHoTen] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gioSinh, setGioSinh] = useState("7");
  const [gioiTinh, setGioiTinh] = useState<"1" | "-1">("1");
  const [loi, setLoi] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoi(null);

    if (!ngaySinh) {
      setLoi("Vui lòng chọn ngày sinh dương lịch.");
      return;
    }
    const [namStr, thangStr, ngayStr] = ngaySinh.split("-");
    const params = new URLSearchParams({
      ten: hoTen,
      ngay: ngayStr,
      thang: thangStr,
      nam: namStr,
      gio: gioSinh,
      gioiTinh,
    });
    router.push(`/la-so?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-5 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="hoTen" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Họ và tên (không bắt buộc)
        </label>
        <input
          id="hoTen"
          type="text"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 dark:border-white/10 dark:bg-black/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="ngaySinh" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Ngày sinh (dương lịch)
        </label>
        <input
          id="ngaySinh"
          type="date"
          required
          value={ngaySinh}
          onChange={(e) => setNgaySinh(e.target.value)}
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 dark:border-white/10 dark:bg-black/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="gioSinh" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Giờ sinh
        </label>
        <select
          id="gioSinh"
          value={gioSinh}
          onChange={(e) => setGioSinh(e.target.value)}
          className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 dark:border-white/10 dark:bg-black/30"
        >
          {danhSachGioSinh.map((g) => (
            <option key={g.gio} value={g.gio}>
              Giờ {g.ten} ({g.khung})
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Giới tính</span>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="gioiTinh"
              value="1"
              checked={gioiTinh === "1"}
              onChange={() => setGioiTinh("1")}
            />
            Nam
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="gioiTinh"
              value="-1"
              checked={gioiTinh === "-1"}
              onChange={() => setGioiTinh("-1")}
            />
            Nữ
          </label>
        </div>
      </div>

      {loi && <p className="text-sm text-red-600 dark:text-red-400">{loi}</p>}

      <button
        type="submit"
        className="mt-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
      >
        Lập lá số
      </button>
    </form>
  );
}
