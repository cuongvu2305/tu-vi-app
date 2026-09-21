export interface MucLichSu {
  ten: string;
  ngay: number;
  thang: number;
  nam: number;
  gio: number;
  gioiTinh: 1 | -1;
  luc: number;
}

const KHOA = "tuvi:lichSu";
const TOI_DA = 10;

export function docLichSuRaw(): string {
  try {
    return localStorage.getItem(KHOA) ?? "[]";
  } catch {
    return "[]";
  }
}

export function parseLichSu(raw: string): MucLichSu[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function docLichSu(): MucLichSu[] {
  return parseLichSu(docLichSuRaw());
}

const SU_KIEN = "tuvi:lichSu:doi";

export function dangKyLichSu(cb: () => void): () => void {
  window.addEventListener(SU_KIEN, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(SU_KIEN, cb);
    window.removeEventListener("storage", cb);
  };
}

function ghi(ds: MucLichSu[]): void {
  try {
    localStorage.setItem(KHOA, JSON.stringify(ds));
  } catch {
    // localStorage bị chặn hoặc đầy: bỏ qua, lịch sử chỉ là tiện ích phụ
  }
  window.dispatchEvent(new Event(SU_KIEN));
}

const trung = (a: MucLichSu, b: MucLichSu) =>
  a.ten === b.ten &&
  a.ngay === b.ngay &&
  a.thang === b.thang &&
  a.nam === b.nam &&
  a.gio === b.gio &&
  a.gioiTinh === b.gioiTinh;

export function luuLichSu(muc: Omit<MucLichSu, "luc">): void {
  const moi = { ...muc, luc: Date.now() };
  const ds = [moi, ...docLichSu().filter((m) => !trung(m, moi))].slice(0, TOI_DA);
  ghi(ds);
}

export function xoaMucLichSu(muc: MucLichSu): void {
  ghi(docLichSu().filter((m) => !trung(m, muc)));
}

export function xoaTatCaLichSu(): void {
  ghi([]);
}

export function linkLaSo(m: MucLichSu): string {
  const p = new URLSearchParams({
    ten: m.ten,
    ngay: String(m.ngay),
    thang: String(m.thang),
    nam: String(m.nam),
    gio: String(m.gio),
    gioiTinh: String(m.gioiTinh),
  });
  return `/la-so?${p.toString()}`;
}
