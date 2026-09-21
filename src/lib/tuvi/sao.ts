/**
 * Danh sách các sao trong Tử Vi Đẩu Số.
 * Ported from Python lasotuvi (Sao.py), MIT license, (c) 2016 doanguyen.
 * https://github.com/doanguyen/lasotuvi
 */

export interface Sao {
  id: number;
  ten: string;
  nguHanh: "K" | "M" | "T" | "H" | "O";
  /**
   * 1: Chính tinh, 2: Phụ tinh, 3: Quý tinh, 4: Quyền tinh, 5: Phúc tinh,
   * 6: Văn tinh, 7: Đài các tinh, 8: Đào hoa tinh,
   * 11: Sát tinh, 12: Bại tinh, 13: Ám tinh, 14: Dâm tinh, 15: Hình tinh, 16: khác
   */
  loai: number;
  vongTrangSinh?: boolean;
  /** Miếu(M)/Vượng(V)/Đắc(Đ)/Bình(B)/Hãm(H) — gán khi an sao lên địa bàn */
  dacTinh?: "M" | "V" | "Đ" | "B" | "H";
}

function s(
  id: number,
  ten: string,
  nguHanh: Sao["nguHanh"],
  loai = 2,
  vongTrangSinh = false,
): Sao {
  return { id, ten, nguHanh, loai, vongTrangSinh };
}

// Tử vi tinh hệ
export const saoTuVi = s(1, "Tử vi", "O", 1);
export const saoLiemTrinh = s(2, "Liêm trinh", "H", 1);
export const saoThienDong = s(3, "Thiên đồng", "T", 1);
export const saoVuKhuc = s(4, "Vũ khúc", "K", 1);
export const saoThaiDuong = s(5, "Thái Dương", "H", 1);
export const saoThienCo = s(6, "Thiên cơ", "M", 1);

// Thiên phủ tinh hệ
export const saoThienPhu = s(7, "Thiên phủ", "O", 1);
export const saoThaiAm = s(8, "Thái âm", "T", 1);
export const saoThamLang = s(9, "Tham lang", "T", 1);
export const saoCuMon = s(10, "Cự môn", "T", 1);
export const saoThienTuong = s(11, "Thiên tướng", "T", 1);
export const saoThienLuong = s(12, "Thiên lương", "M", 1);
export const saoThatSat = s(13, "Thất sát", "K", 1);
export const saoPhaQuan = s(14, "Phá quân", "T", 1);

// Vòng Địa chi - Thái tuế
export const saoThaiTue = s(15, "Thái tuế", "H", 15);
export const saoThieuDuong = s(16, "Thiếu dương", "H", 5);
export const saoTangMon = s(17, "Tang môn", "M", 12);
export const saoThieuAm = s(18, "Thiếu âm", "T", 5);
export const saoQuanPhu3 = s(19, "Quan phù", "H", 12);
export const saoTuPhu = s(20, "Tử phù", "K", 12);
export const saoTuePha = s(21, "Tuế phá", "H", 12);
export const saoLongDuc = s(22, "Long đức", "T", 5);
export const saoBachHo = s(23, "Bạch hổ", "K", 12);
export const saoPhucDuc = s(24, "Phúc đức", "O", 5);
export const saoDieuKhach = s(25, "Điếu khách", "H", 12);
export const saoTrucPhu = s(26, "Trực phù", "K", 16);

// Vòng Thiên can - Lộc tồn
export const saoLocTon = s(27, "Lộc tồn", "O", 3);
export const saoBacSy = s(109, "Bác sỹ", "T", 5);
export const saoLucSi = s(28, "Lực sĩ", "H", 2);
export const saoThanhLong = s(29, "Thanh long", "T", 5);
export const saoTieuHao = s(30, "Tiểu hao", "H", 12);
export const saoTuongQuan = s(31, "Tướng quân", "M", 4);
export const saoTauThu = s(32, "Tấu thư", "K", 3);
export const saoPhiLiem = s(33, "Phi liêm", "H", 2);
export const saoHyThan = s(34, "Hỷ thần", "H", 5);
export const saoBenhPhu = s(35, "Bệnh phù", "O", 12);
export const saoDaiHao = s(36, "Đại hao", "H", 12);
export const saoPhucBinh = s(37, "Phục binh", "H", 13);
export const saoQuanPhu2 = s(38, "Quan phù", "H", 12);

// Vòng Tràng sinh
export const saoTrangSinh = s(39, "Tràng sinh", "T", 5, true);
export const saoMocDuc = s(40, "Mộc dục", "T", 14, true);
export const saoQuanDoi = s(41, "Quan đới", "K", 4, true);
export const saoLamQuan = s(42, "Lâm quan", "K", 7, true);
export const saoDeVuong = s(43, "Đế vượng", "K", 5, true);
export const saoSuy = s(44, "Suy", "T", 12, true);
export const saoBenh = s(45, "Bệnh", "H", 12, true);
export const saoTu = s(46, "Tử", "H", 12, true);
export const saoMo = s(47, "Mộ", "O", 2, true);
export const saoTuyet = s(48, "Tuyệt", "O", 12, true);
export const saoThai = s(49, "Thai", "O", 14, true);
export const saoDuong = s(50, "Dưỡng", "M", 2, true);

// Lục sát - Kình dương, Đà la
export const saoDaLa = s(51, "Đà la", "K", 11);
export const saoKinhDuong = s(52, "Kình dương", "K", 11);

// Địa không - Địa kiếp
export const saoDiaKhong = s(53, "Địa không", "H", 11);
export const saoDiaKiep = s(54, "Địa kiếp", "H", 11);

// Hỏa tinh - Linh tinh
export const saoLinhTinh = s(55, "Linh tinh", "H", 11);
export const saoHoaTinh = s(56, "Hỏa tinh", "H", 11);

// Văn xương - Văn khúc
export const saoVanXuong = s(57, "Văn xương", "K", 6);
export const saoVanKhuc = s(58, "Văn Khúc", "T", 6);

// Thiên khôi - Thiên Việt
export const saoThienKhoi = s(59, "Thiên khôi", "H", 6);
export const saoThienViet = s(60, "Thiên việt", "H", 6);

// Tả phù - Hữu bật
export const saoTaPhu = s(61, "Tả phù", "O", 2);
export const saoHuuBat = s(62, "Hữu bật", "O", 2);

// Long trì - Phượng các
export const saoLongTri = s(63, "Long trì", "T", 3);
export const saoPhuongCac = s(64, "Phượng các", "O", 3);

// Tam thai - Bát tọa
export const saoTamThai = s(65, "Tam thai", "M", 7);
export const saoBatToa = s(66, "Bát tọa", "T", 7);

// Ân quang - Thiên quý
export const saoAnQuang = s(67, "Ân quang", "M", 3);
export const saoThienQuy = s(68, "Thiên quý", "O", 3);

// Sao đôi khác
export const saoThienKhoc = s(69, "Thiên khốc", "T", 12);
export const saoThienHu = s(70, "Thiên hư", "T", 12);
export const saoThienDuc = s(71, "Thiên đức", "H", 5);
export const saoNguyetDuc = s(72, "Nguyệt đức", "H", 5);
export const saoThienHinh = s(73, "Thiên hình", "H", 15);
export const saoThienRieu = s(74, "Thiên riêu", "T", 13);
export const saoThienY = s(75, "Thiên y", "T", 5);
export const saoQuocAn = s(76, "Quốc ấn", "O", 6);
export const saoDuongPhu = s(77, "Đường phù", "M", 4);
export const saoDaoHoa = s(78, "Đào hoa", "M", 8);
export const saoHongLoan = s(79, "Hồng loan", "T", 8);
export const saoThienHy = s(80, "Thiên hỷ", "T", 5);
export const saoThienGiai = s(81, "Thiên giải", "H", 5);
export const saoDiaGiai = s(82, "Địa giải", "O", 5);
export const saoGiaiThan = s(83, "Giải thần", "M", 5);
export const saoThaiPhu = s(84, "Thai phụ", "K", 6);
export const saoPhongCao = s(85, "Phong cáo", "O", 4);
export const saoThienTai = s(86, "Thiên tài", "O", 2);
export const saoThienTho = s(87, "Thiên thọ", "O", 5);
export const saoThienThuong = s(88, "Thiên thương", "O", 12);
export const saoThienSu = s(89, "Thiên sứ", "T", 12);
export const saoThienLa = s(90, "Thiên la", "O", 12);
export const saoDiaVong = s(91, "Địa võng", "O", 12);
export const saoHoaKhoa = s(92, "Hóa khoa", "T", 5);
export const saoHoaQuyen = s(93, "Hóa quyền", "T", 4);
export const saoHoaLoc = s(94, "Hóa lộc", "M", 3);
export const saoHoaKy = s(95, "Hóa kỵ", "T", 13);
export const saoCoThan = s(96, "Cô thần", "O", 13);
export const saoQuaTu = s(97, "Quả tú", "O", 13);
export const saoThienMa = s(98, "Thiên mã", "H", 3);
export const saoPhaToai = s(99, "Phá toái", "H", 12);
export const saoThienQuan = s(100, "Thiên quan", "H", 5);
export const saoThienPhuc = s(101, "Thiên phúc", "H", 5);
export const saoLuuHa = s(102, "Lưu hà", "T", 12);
export const saoThienTru = s(103, "Thiên trù", "O", 5);
export const saoKiepSat = s(104, "Kiếp sát", "H", 11);
export const saoHoaCai = s(105, "Hoa cái", "K", 14);
export const saoVanTinh = s(106, "Văn tinh", "H", 6);
export const saoDauQuan = s(107, "Đẩu quân", "H", 5);
export const saoThienKhong = s(108, "Thiên không", "T", 11);

/** 14 chính tinh, dùng cho luận giải và hiển thị nổi bật trên lá số. */
export const chinhTinhList: Sao[] = [
  saoTuVi,
  saoLiemTrinh,
  saoThienDong,
  saoVuKhuc,
  saoThaiDuong,
  saoThienCo,
  saoThienPhu,
  saoThaiAm,
  saoThamLang,
  saoCuMon,
  saoThienTuong,
  saoThienLuong,
  saoThatSat,
  saoPhaQuan,
];
