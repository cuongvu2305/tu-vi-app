/**
 * An sao Lưu niên (vận hạn của năm đang xem), phủ thêm lên lá số bản mệnh.
 * Phần mở rộng biên soạn riêng — lasotuvi gốc chỉ tính lá số bản mệnh.
 *
 * Bộ 9 sao lưu dưới đây được đối chiếu với lá số mẫu của tuvivietnam.vn
 * (xem `__tests__/luuNien.test.ts`): vòng Thái Tuế lưu chỉ lấy 3 sao trọng yếu
 * (Thái Tuế, Tang Môn, Bạch Hổ), vòng Lộc Tồn lưu lấy Lộc Tồn - Kình - Đà,
 * cùng Thiên Mã, Thiên Khốc, Thiên Hư lưu.
 */
import { dichCung, diaChi, thienCan, timThienMa } from "./canChi";

export interface SaoLuuNien {
  ten: string;
  cungSo: number;
}

/**
 * Can/Chi của năm xem. Quy ước: số năm được dùng trực tiếp như nhãn năm âm lịch,
 * giống cách phần mềm tử vi hiển thị "Năm xem: 2026 — Bính Ngọ".
 */
export function canChiNamXem(namXem: number): { can: number; chi: number } {
  return { can: ((namXem + 6) % 10) + 1, chi: ((namXem + 8) % 12) + 1 };
}

export function tenCanChiNam(namXem: number): string {
  const { can, chi } = canChiNamXem(namXem);
  return `${thienCan[can].tenCan} ${diaChi[chi].tenChi}`;
}

/** Tuổi mụ (tuổi âm) tại năm xem. */
export function tuoiMu(namXem: number, namSinhAmLich: number): number {
  return namXem - namSinhAmLich + 1;
}

/** Tính 9 sao lưu niên cho năm xem, dựa trên Can/Chi của năm đó. */
export function tinhSaoLuuNien(namXem: number): SaoLuuNien[] {
  const { can: canXem, chi: chiXem } = canChiNamXem(namXem);

  // Vòng Thái Tuế lưu: gốc tại chi năm xem, Tang Môn +2, Bạch Hổ +8 (như vòng Thái Tuế bản mệnh)
  const locTon = thienCan[canXem].vitriDiaBan as number;

  return [
    { ten: "Thái tuế", cungSo: chiXem },
    { ten: "Tang môn", cungSo: dichCung(chiXem, 2) },
    { ten: "Bạch hổ", cungSo: dichCung(chiXem, 8) },
    // Vòng Lộc Tồn lưu: Lộc Tồn tại vị trí địa bàn của Can năm xem, Kình +1, Đà -1
    { ten: "Lộc tồn", cungSo: locTon },
    { ten: "Kình dương", cungSo: dichCung(locTon, 1) },
    { ten: "Đà la", cungSo: dichCung(locTon, -1) },
    { ten: "Thiên mã", cungSo: timThienMa(chiXem) },
    // Khốc - Hư lưu: cùng công thức bản mệnh nhưng lấy chi năm xem
    { ten: "Thiên khốc", cungSo: dichCung(7, -chiXem + 1) },
    { ten: "Thiên hư", cungSo: dichCung(7, chiXem - 1) },
  ];
}

/** Gom sao lưu niên theo cung địa bàn (1..12) để tiện render. */
export function nhomSaoLuuTheoCung(ds: SaoLuuNien[]): Record<number, SaoLuuNien[]> {
  const kq: Record<number, SaoLuuNien[]> = {};
  for (const s of ds) (kq[s.cungSo] ??= []).push(s);
  return kq;
}
