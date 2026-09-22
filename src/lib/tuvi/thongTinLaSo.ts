/**
 * Các thông tin tổng hợp hiển thị ở ô giữa lá số: chủ Mệnh/chủ Thân,
 * quan hệ sinh khắc Mệnh - Cục, âm dương thuận/nghịch lý, Thân cư cung nào.
 */
import { diaChi, nguHanh } from "./canChi";
import type { LaSoResult } from "./lapLaSo";

/** Thứ tự tương sinh: Kim → Thủy → Mộc → Hỏa → Thổ → Kim. */
const sinhKeTiep: Record<string, string> = { K: "T", T: "M", M: "H", H: "O", O: "K" };
/** Thứ tự tương khắc: Kim → Mộc → Thổ → Thủy → Hỏa → Kim. */
const khacKeTiep: Record<string, string> = { K: "M", M: "O", O: "T", T: "H", H: "K" };

export type QuanHeMenhCuc =
  | "Mệnh sinh Cục"
  | "Cục sinh Mệnh"
  | "Mệnh khắc Cục"
  | "Cục khắc Mệnh"
  | "Mệnh Cục đồng hành";

export function quanHeMenhCuc(hanhMenh: string, hanhCuc: string): QuanHeMenhCuc {
  if (hanhMenh === hanhCuc) return "Mệnh Cục đồng hành";
  if (sinhKeTiep[hanhMenh] === hanhCuc) return "Mệnh sinh Cục";
  if (sinhKeTiep[hanhCuc] === hanhMenh) return "Cục sinh Mệnh";
  if (khacKeTiep[hanhMenh] === hanhCuc) return "Mệnh khắc Cục";
  return "Cục khắc Mệnh";
}

export interface ThongTinLaSo {
  /** "Dương Nam" / "Âm Nữ" ... theo âm dương năm sinh và giới tính. */
  amDuongMenh: string;
  /** Cung Mệnh hợp âm dương với bản thân hay không. */
  amDuongThuanLy: boolean;
  quanHeMenhCuc: QuanHeMenhCuc;
  chuMenh: string;
  chuThan: string;
  /** Tên cung mà Thân an vào, ví dụ "Thiên di". */
  thanCu: string;
  hanhCucDayDu: string;
}

export function thongTinLaSo(laSo: LaSoResult): ThongTinLaSo {
  const { diaBan, chiNam, gioiTinh } = laSo;
  const amDuongNam = diaChi[chiNam].amDuong;
  const cungMenh = diaBan.thapNhiCung[diaBan.cungMenh];

  return {
    amDuongMenh: `${amDuongNam === 1 ? "Dương" : "Âm"} ${gioiTinh === 1 ? "Nam" : "Nữ"}`,
    // Thuận lý khi âm dương của cung Mệnh cùng tính với âm dương năm sinh.
    amDuongThuanLy: cungMenh.cungAmDuong === amDuongNam,
    quanHeMenhCuc: quanHeMenhCuc(laSo.hanhBanMenh, laSo.hanhCuc),
    // Chủ Mệnh / chủ Thân tra theo địa chi năm sinh (cách an cổ điển).
    chuMenh: diaChi[chiNam].menhChu ?? "",
    chuThan: diaChi[chiNam].thanChu ?? "",
    thanCu: diaBan.thapNhiCung[diaBan.cungThan].cungChu ?? "",
    hanhCucDayDu: nguHanh(laSo.hanhCuc).tenCuc,
  };
}
