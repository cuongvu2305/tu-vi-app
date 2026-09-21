/**
 * Bảng Thiên Can, Địa Chi và các hàm dịch cung / ngũ hành.
 * Ported from Python lasotuvi (AmDuong.py), MIT license, (c) 2016 doanguyen.
 * https://github.com/doanguyen/lasotuvi
 */
import { jdFromDate, lunarToSolar, solarToLunar } from "./lich";

export interface ThienCan {
  id: number;
  tenCan: string | null;
  nguHanh: "K" | "M" | "T" | "H" | "O" | null;
  vitriDiaBan: number | null;
  amDuong: 1 | -1 | null;
}

/** index 0 unused, 1..10 = Giáp..Quý */
export const thienCan: ThienCan[] = [
  { id: 0, tenCan: null, nguHanh: null, vitriDiaBan: null, amDuong: null },
  { id: 1, tenCan: "Giáp", nguHanh: "M", vitriDiaBan: 3, amDuong: 1 },
  { id: 2, tenCan: "Ất", nguHanh: "M", vitriDiaBan: 4, amDuong: -1 },
  { id: 3, tenCan: "Bính", nguHanh: "H", vitriDiaBan: 6, amDuong: 1 },
  { id: 4, tenCan: "Đinh", nguHanh: "H", vitriDiaBan: 7, amDuong: -1 },
  { id: 5, tenCan: "Mậu", nguHanh: "O", vitriDiaBan: 6, amDuong: 1 },
  { id: 6, tenCan: "Kỷ", nguHanh: "O", vitriDiaBan: 7, amDuong: -1 },
  { id: 7, tenCan: "Canh", nguHanh: "K", vitriDiaBan: 9, amDuong: 1 },
  { id: 8, tenCan: "Tân", nguHanh: "K", vitriDiaBan: 10, amDuong: -1 },
  { id: 9, tenCan: "Nhâm", nguHanh: "T", vitriDiaBan: 12, amDuong: 1 },
  { id: 10, tenCan: "Quý", nguHanh: "T", vitriDiaBan: 1, amDuong: -1 },
];

export interface DiaChi {
  id: number;
  tenChi: string;
  tenHanh: string;
  menhChu?: string;
  thanChu?: string;
  amDuong: 1 | -1 | 0;
}

/** index 0 unused, 1..12 = Tý..Hợi */
export const diaChi: DiaChi[] = [
  { id: 0, tenChi: "", tenHanh: "", amDuong: 0 },
  { id: 1, tenChi: "Tý", tenHanh: "T", menhChu: "Tham lang", thanChu: "Linh tinh", amDuong: 1 },
  { id: 2, tenChi: "Sửu", tenHanh: "O", menhChu: "Cự môn", thanChu: "Thiên tướng", amDuong: -1 },
  { id: 3, tenChi: "Dần", tenHanh: "M", menhChu: "Lộc tồn", thanChu: "Thiên lương", amDuong: 1 },
  { id: 4, tenChi: "Mão", tenHanh: "M", menhChu: "Văn khúc", thanChu: "Thiên đồng", amDuong: -1 },
  { id: 5, tenChi: "Thìn", tenHanh: "O", menhChu: "Liêm trinh", thanChu: "Văn xương", amDuong: 1 },
  { id: 6, tenChi: "Tỵ", tenHanh: "H", menhChu: "Vũ khúc", thanChu: "Thiên cơ", amDuong: -1 },
  { id: 7, tenChi: "Ngọ", tenHanh: "H", menhChu: "Phá quân", thanChu: "Hỏa tinh", amDuong: 1 },
  { id: 8, tenChi: "Mùi", tenHanh: "O", menhChu: "Vũ khúc", thanChu: "Thiên tướng", amDuong: -1 },
  { id: 9, tenChi: "Thân", tenHanh: "K", menhChu: "Liêm trinh", thanChu: "Thiên lương", amDuong: 1 },
  { id: 10, tenChi: "Dậu", tenHanh: "K", menhChu: "Văn khúc", thanChu: "Thiên đồng", amDuong: -1 },
  { id: 11, tenChi: "Tuất", tenHanh: "O", menhChu: "Lộc tồn", thanChu: "Văn xương", amDuong: 1 },
  { id: 12, tenChi: "Hợi", tenHanh: "T", menhChu: "Cự môn", thanChu: "Thiên cơ", amDuong: -1 },
];

/** Dịch cung ban đầu đi một số ô, luôn trả về giá trị trong khoảng 1..12. */
export function dichCung(cungBanDau: number, ...args: number[]): number {
  let cung = Math.trunc(cungBanDau);
  for (const so of args) {
    cung += Math.trunc(so);
  }
  const m = cung % 12;
  return m === 0 ? 12 : m < 0 ? m + 12 : m;
}

export function khoangCachCung(cung1: number, cung2: number, chieu = 1): number {
  if (chieu === 1) {
    return ((cung1 - cung2 + 12) % 12 + 12) % 12;
  }
  return ((cung2 - cung1 + 12) % 12 + 12) % 12;
}

/**
 * Chuyển ngày/tháng/năm dương lịch sang âm lịch.
 * Trả về [ngày âm, tháng âm, năm âm, tháng nhuận (0/1)].
 */
export function ngayThangNam(
  nn: number,
  tt: number,
  nnnn: number,
  duongLich = true,
  timeZone = 7,
): [number, number, number, number] {
  if (!(nn > 0 && nn < 32 && tt > 0 && tt < 13)) {
    throw new Error("Ngày, tháng, năm không chính xác.");
  }
  if (duongLich) {
    const l = solarToLunar(nn, tt, nnnn, timeZone);
    return [l.lunarDay, l.lunarMonth, l.lunarYear, l.lunarLeap];
  }
  return [nn, tt, nnnn, 0];
}

export function canChiNgay(
  nn: number,
  tt: number,
  nnnn: number,
  duongLich = true,
  timeZone = 7,
  thangNhuan = 0,
): [number, number] {
  let dd = nn,
    mm = tt,
    yyyy = nnnn;
  if (!duongLich) {
    [dd, mm, yyyy] = lunarToSolar(nn, tt, nnnn, thangNhuan, timeZone);
  }
  const jd = jdFromDate(dd, mm, yyyy);
  const canNgay = ((jd + 9) % 10) + 1;
  const chiNgay = ((jd + 1) % 12) + 1;
  return [canNgay, chiNgay];
}

/**
 * Trả về [canThang, canNam, chiNam] (đã ở dạng âm lịch nếu đầu vào là dương lịch).
 */
export function ngayThangNamCanChi(
  nn: number,
  tt: number,
  nnnn: number,
  duongLich = true,
  timeZone = 7,
): [number, number, number] {
  let tthang = tt,
    nnam = nnnn;
  if (duongLich) {
    const [, t, n] = ngayThangNam(nn, tt, nnnn, true, timeZone);
    tthang = t;
    nnam = n;
  }
  const canThang = ((nnam * 12 + tthang + 3) % 10) + 1;
  const canNamSinh = ((nnam + 6) % 10) + 1;
  const chiNam = ((nnam + 8) % 12) + 1;
  return [canThang, canNamSinh, chiNam];
}

export interface NguHanhInfo {
  id: number;
  tenHanh: string;
  cuc: number;
  tenCuc: string;
}

export function nguHanh(tenHanh: string): NguHanhInfo {
  switch (tenHanh) {
    case "K":
      return { id: 1, tenHanh: "Kim", cuc: 4, tenCuc: "Kim tứ Cục" };
    case "M":
      return { id: 2, tenHanh: "Mộc", cuc: 3, tenCuc: "Mộc tam Cục" };
    case "T":
      return { id: 3, tenHanh: "Thủy", cuc: 2, tenCuc: "Thủy nhị Cục" };
    case "H":
      return { id: 4, tenHanh: "Hỏa", cuc: 6, tenCuc: "Hỏa lục Cục" };
    case "O":
      return { id: 5, tenHanh: "Thổ", cuc: 5, tenCuc: "Thổ ngũ Cục" };
    default:
      throw new Error("Tên Hành phải thuộc Kim (K), Mộc (M), Thủy (T), Hỏa (H) hoặc Thổ (O)");
  }
}

const banMenh: Record<string, string> = {
  K1: "HẢI TRUNG KIM",
  T1: "GIÁNG HẠ THỦY",
  H1: "TÍCH LỊCH HỎA",
  O1: "BÍCH THƯỢNG THỔ",
  M1: "TANG ÐỐ MỘC",
  T2: "ÐẠI KHÊ THỦY",
  H2: "LƯ TRUNG HỎA",
  O2: "THÀNH ÐẦU THỔ",
  M2: "TÒNG BÁ MỘC",
  K2: "KIM BẠCH KIM",
  H3: "PHÚ ÐĂNG HỎA",
  O3: "SA TRUNG THỔ",
  M3: "ÐẠI LÂM MỘC",
  K3: "BẠCH LẠP KIM",
  T3: "TRƯỜNG LƯU THỦY",
  K4: "SA TRUNG KIM",
  T4: "THIÊN HÀ THỦY",
  H4: "THIÊN THƯỢNG HỎA",
  O4: "LỘ BÀN THỔ",
  M4: "DƯƠNG LIỄU MỘC",
  T5: "TRUYỀN TRUNG THỦY",
  H5: "SƠN HẠ HỎA",
  O5: "ÐẠI TRẠCH THỔ",
  M5: "THẠCH LỰU MỘC",
  K5: "KIẾM PHONG KIM",
  H6: "SƠN ÐẦU HỎA",
  O6: "ỐC THƯỢNG THỔ",
  M6: "BÌNH ÐỊA MỘC",
  K6: "XOA XUYẾN KIM",
  T6: "ÐẠI HẢI THỦY",
};

/** matranNapAm[chi][can] = "<Hành><nhóm>" hoặc null nếu ô rỗng. index theo diaChi id (1..12) và thienCan id (1..10) */
const matranNapAm: (string | null)[][] = [
  [],
  [null, "K1", null, "T1", null, "H1", null, "O1", null, "M1", null],
  [null, null, "K1", null, "T1", null, "H1", null, "O1", null, "M1"],
  [null, "T2", null, "H2", null, "O2", null, "M2", null, "K2", null],
  [null, null, "T2", null, "H2", null, "O2", null, "M2", null, "K2"],
  [null, "H3", null, "O3", null, "M3", null, "K3", null, "T3", null],
  [null, null, "H3", null, "O3", null, "M3", null, "K3", null, "T3"],
  [null, "K4", null, "T4", null, "H4", null, "O4", null, "M4", null],
  [null, null, "K4", null, "T4", null, "H4", null, "O4", null, "M4"],
  [null, "T5", null, "H5", null, "O5", null, "M5", null, "K5", null],
  [null, null, "T5", null, "H5", null, "O5", null, "M5", null, "K5"],
  [null, "H6", null, "O6", null, "M6", null, "K6", null, "T6", null],
  [null, null, "H6", null, "O6", null, "M6", null, "K6", null, "T6"],
];

/**
 * Ngũ hành nạp âm của năm sinh (bản mệnh).
 * @param chiId Số thứ tự Địa Chi (Tý=1,...)
 * @param canId Số thứ tự Thiên Can (Giáp=1,...)
 */
export function nguHanhNapAm(chiId: number, canId: number, xuatBanMenh = false): string {
  const nh = matranNapAm[chiId]?.[canId];
  if (!nh) throw new Error("Không tìm được ngũ hành nạp âm");
  return xuatBanMenh ? banMenh[nh] : nh[0];
}

/** Python-style floor modulo: result always has the same sign as `n` (or 0). */
function floorMod(a: number, n: number): number {
  return ((a % n) + n) % n;
}

export function timCuc(viTriCungMenhTrenDiaBan: number, canNamSinh: number): string {
  const canThangGieng = (canNamSinh * 2 + 1) % 10;
  let canThangMenh = (floorMod(viTriCungMenhTrenDiaBan - 3, 12) + canThangGieng) % 10;
  if (canThangMenh === 0) canThangMenh = 10;
  return nguHanhNapAm(viTriCungMenhTrenDiaBan, canThangMenh);
}

export function timTuVi(cuc: number, ngaySinhAmLich: number): number {
  let cungDan = 3;
  const cucBanDau = cuc;
  if (![2, 3, 4, 5, 6].includes(cuc)) {
    throw new Error("Số cục phải là 2, 3, 4, 5, 6");
  }
  while (cuc < ngaySinhAmLich) {
    cuc += cucBanDau;
    cungDan += 1;
  }
  let saiLech = cuc - ngaySinhAmLich;
  if (Math.abs(saiLech % 2) === 1) {
    saiLech = -saiLech;
  }
  return dichCung(cungDan, saiLech);
}

export function timTrangSinh(cucSo: number): number {
  switch (cucSo) {
    case 6:
      return 3; // Hỏa lục cục -> Dần
    case 4:
      return 6; // Kim tứ cục -> Tỵ
    case 2:
    case 5:
      return 9; // Thủy nhị cục, Thổ ngũ cục -> Thân
    case 3:
      return 12; // Mộc tam cục -> Hợi
    default:
      throw new Error("Không tìm được cung an sao Trường sinh");
  }
}

export function timHoaLinh(
  chiNamSinh: number,
  gioSinh: number,
  gioiTinh: 1 | -1,
  amDuongNamSinh: 1 | -1,
): [number, number] {
  let khoiCungHoaTinh: number, khoiCungLinhTinh: number;
  if ([3, 7, 11].includes(chiNamSinh)) {
    khoiCungHoaTinh = 2;
    khoiCungLinhTinh = 4;
  } else if ([1, 5, 9].includes(chiNamSinh)) {
    khoiCungHoaTinh = 3;
    khoiCungLinhTinh = 11;
  } else if ([6, 10, 2].includes(chiNamSinh)) {
    khoiCungHoaTinh = 11;
    khoiCungLinhTinh = 4;
  } else if ([12, 4, 8].includes(chiNamSinh)) {
    khoiCungHoaTinh = 10;
    khoiCungLinhTinh = 11;
  } else {
    throw new Error("Không thể khởi cung tìm Hỏa-Linh");
  }

  const namNu = gioiTinh * amDuongNamSinh;
  let viTriHoaTinh: number, viTriLinhTinh: number;
  if (namNu === -1) {
    viTriHoaTinh = dichCung(khoiCungHoaTinh + 1, -1 * gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh - 1, gioSinh);
  } else {
    viTriHoaTinh = dichCung(khoiCungHoaTinh - 1, gioSinh);
    viTriLinhTinh = dichCung(khoiCungLinhTinh + 1, -1 * gioSinh);
  }
  return [viTriHoaTinh, viTriLinhTinh];
}

export function timThienKhoi(canNam: number): number {
  const khoiViet = [null, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
  const v = khoiViet[canNam];
  if (v == null) throw new Error("Không tìm được vị trí Khôi-Việt");
  return v;
}

export function timThienQuanThienPhuc(canNam: number): [number, number] {
  const thienQuan = [null, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
  const thienPhuc = [null, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
  const q = thienQuan[canNam];
  const p = thienPhuc[canNam];
  if (q == null || p == null) throw new Error("Không tìm được Quan-Phúc");
  return [q, p];
}

export function timCoThan(chiNam: number): number {
  if ([12, 1, 2].includes(chiNam)) return 3;
  if ([3, 4, 5].includes(chiNam)) return 6;
  if ([6, 7, 8].includes(chiNam)) return 9;
  return 12;
}

export function timThienMa(chiNam: number): number {
  const demNghich = chiNam % 4;
  switch (demNghich) {
    case 1:
      return 3;
    case 2:
      return 12;
    case 3:
      return 9;
    case 0:
      return 6;
    default:
      throw new Error("Không tìm được Thiên mã");
  }
}

export function timPhaToai(chiNam: number): number {
  const demNghich = chiNam % 3;
  switch (demNghich) {
    case 0:
      return 6;
    case 1:
      return 10;
    case 2:
      return 2;
    default:
      throw new Error("Không tìm được Phá toái");
  }
}

export function timTriet(canNam: number): [number, number] {
  if ([1, 6].includes(canNam)) return [9, 10];
  if ([2, 7].includes(canNam)) return [7, 8];
  if ([3, 8].includes(canNam)) return [5, 6];
  if ([4, 9].includes(canNam)) return [3, 4];
  if ([5, 10].includes(canNam)) return [1, 2];
  throw new Error("Không tìm được Triệt");
}

export function timLuuTru(canNam: number): [number, number] {
  const luuHa = [null, 10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
  const thienTru = [null, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
  const lh = luuHa[canNam];
  const tt = thienTru[canNam];
  if (lh == null || tt == null) throw new Error("Không tìm được Lưu - Trù");
  return [lh, tt];
}
