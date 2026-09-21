/** 12 giờ Địa Chi và khung giờ 24h tương ứng, dùng cho lựa chọn giờ sinh trên form. */
export const danhSachGioSinh = [
  { gio: 1, ten: "Tý", khung: "23:00 - 00:59" },
  { gio: 2, ten: "Sửu", khung: "01:00 - 02:59" },
  { gio: 3, ten: "Dần", khung: "03:00 - 04:59" },
  { gio: 4, ten: "Mão", khung: "05:00 - 06:59" },
  { gio: 5, ten: "Thìn", khung: "07:00 - 08:59" },
  { gio: 6, ten: "Tỵ", khung: "09:00 - 10:59" },
  { gio: 7, ten: "Ngọ", khung: "11:00 - 12:59" },
  { gio: 8, ten: "Mùi", khung: "13:00 - 14:59" },
  { gio: 9, ten: "Thân", khung: "15:00 - 16:59" },
  { gio: 10, ten: "Dậu", khung: "17:00 - 18:59" },
  { gio: 11, ten: "Tuất", khung: "19:00 - 20:59" },
  { gio: 12, ten: "Hợi", khung: "21:00 - 22:59" },
] as const;

/** Suy ra giờ Địa Chi (1-12) từ giờ 24h (0-23). */
export function gioSinhTuGio24(gio24: number): number {
  return Math.floor(((gio24 + 1) % 24) / 2) + 1;
}
