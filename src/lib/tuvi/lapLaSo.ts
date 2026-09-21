/**
 * Hàm chính lập lá số Tử Vi: an toàn bộ sao lên địa bàn 12 cung.
 * Ported from Python lasotuvi (App.py::lapDiaBan), MIT license, (c) 2016 doanguyen.
 * https://github.com/doanguyen/lasotuvi
 */
import {
  dichCung,
  ngayThangNam,
  ngayThangNamCanChi,
  nguHanh,
  nguHanhNapAm,
  thienCan,
  diaChi,
  timCoThan,
  timCuc,
  timHoaLinh,
  timLuuTru,
  timPhaToai,
  timThienKhoi,
  timThienMa,
  timThienQuanThienPhuc,
  timTrangSinh,
  timTriet,
  timTuVi,
} from "./canChi";
import { DiaBan } from "./diaBan";
import * as Sao from "./sao";

export interface LapLaSoInput {
  ngay: number;
  thang: number;
  nam: number;
  /** Giờ sinh theo 12 giờ Địa Chi: 1 = Tý (23h-1h), 2 = Sửu, ..., 12 = Hợi */
  gioSinh: number;
  /** 1 = Nam, -1 = Nữ */
  gioiTinh: 1 | -1;
  duongLich?: boolean;
  timeZone?: number;
}

export interface LaSoResult {
  diaBan: DiaBan;
  cucSo: number;
  tenCuc: string;
  banMenh: string;
  canNam: number;
  chiNam: number;
  tenNamAm: string;
  ngayAmLich: number;
  thangAmLich: number;
  namAmLich: number;
  thangNhuan: boolean;
}

export function lapLaSo(input: LapLaSoInput): LaSoResult {
  const { gioSinh, gioiTinh } = input;
  const duongLich = input.duongLich ?? true;
  const timeZone = input.timeZone ?? 7;

  let nn = input.ngay;
  let tt = input.thang;
  let nnnn = input.nam;
  let thangNhuan = 0;

  if (duongLich) {
    [nn, tt, nnnn, thangNhuan] = ngayThangNam(nn, tt, nnnn, true, timeZone);
  }
  const [, canNam, chiNam] = ngayThangNamCanChi(nn, tt, nnnn, false, timeZone);

  const diaBan = new DiaBan(tt, gioSinh);

  const amDuongNamSinh = thienCan[canNam].amDuong as 1 | -1;
  const amDuongChiNamSinh = diaChi[chiNam].amDuong as 1 | -1;

  const hanhCuc = timCuc(diaBan.cungMenh, canNam);
  const cuc = nguHanh(hanhCuc);
  const cucSo = cuc.cuc;

  // Dương Nam - Âm Nữ theo chiều thuận; Âm Nam - Dương Nữ theo chiều nghịch
  diaBan.nhapDaiHan(cucSo, (gioiTinh * amDuongChiNamSinh) as 1 | -1);

  const khoiHan = dichCung(11, -3 * (chiNam - 1));
  diaBan.nhapTieuHan(khoiHan, gioiTinh, chiNam);

  // Tử vi tinh hệ
  const viTriTuVi = timTuVi(cucSo, nn);
  diaBan.nhapSao(viTriTuVi, Sao.saoTuVi);

  const viTriLiemTrinh = dichCung(viTriTuVi, 4);
  diaBan.nhapSao(viTriLiemTrinh, Sao.saoLiemTrinh);

  const viTriThienDong = dichCung(viTriTuVi, 7);
  diaBan.nhapSao(viTriThienDong, Sao.saoThienDong);

  const viTriVuKhuc = dichCung(viTriTuVi, 8);
  diaBan.nhapSao(viTriVuKhuc, Sao.saoVuKhuc);

  const vitriThaiDuong = dichCung(viTriTuVi, 9);
  diaBan.nhapSao(vitriThaiDuong, Sao.saoThaiDuong);

  const viTriThienCo = dichCung(viTriTuVi, 11);
  diaBan.nhapSao(viTriThienCo, Sao.saoThienCo);

  // Thiên phủ tinh hệ
  const viTriThienPhu = dichCung(3, 3 - viTriTuVi);
  diaBan.nhapSao(viTriThienPhu, Sao.saoThienPhu);

  const viTriThaiAm = dichCung(viTriThienPhu, 1);
  diaBan.nhapSao(viTriThaiAm, Sao.saoThaiAm);

  const viTriThamLang = dichCung(viTriThienPhu, 2);
  diaBan.nhapSao(viTriThamLang, Sao.saoThamLang);

  const viTriCuMon = dichCung(viTriThienPhu, 3);
  diaBan.nhapSao(viTriCuMon, Sao.saoCuMon);

  const viTriThienTuong = dichCung(viTriThienPhu, 4);
  diaBan.nhapSao(viTriThienTuong, Sao.saoThienTuong);

  const viTriThienLuong = dichCung(viTriThienPhu, 5);
  diaBan.nhapSao(viTriThienLuong, Sao.saoThienLuong);

  const viTriThatSat = dichCung(viTriThienPhu, 6);
  diaBan.nhapSao(viTriThatSat, Sao.saoThatSat);

  const viTriPhaQuan = dichCung(viTriThienPhu, 10);
  diaBan.nhapSao(viTriPhaQuan, Sao.saoPhaQuan);

  // Vòng Lộc tồn
  const viTriLocTon = thienCan[canNam].vitriDiaBan as number;
  diaBan.nhapSao(viTriLocTon, Sao.saoLocTon, Sao.saoBacSy);

  const amDuongNamNu = (gioiTinh * amDuongNamSinh) as 1 | -1;
  diaBan.nhapSao(dichCung(viTriLocTon, 1 * amDuongNamNu), Sao.saoLucSi);
  diaBan.nhapSao(dichCung(viTriLocTon, 2 * amDuongNamNu), Sao.saoThanhLong);
  diaBan.nhapSao(dichCung(viTriLocTon, 3 * amDuongNamNu), Sao.saoTieuHao);
  diaBan.nhapSao(dichCung(viTriLocTon, 4 * amDuongNamNu), Sao.saoTuongQuan);
  diaBan.nhapSao(dichCung(viTriLocTon, 5 * amDuongNamNu), Sao.saoTauThu);
  diaBan.nhapSao(dichCung(viTriLocTon, 6 * amDuongNamNu), Sao.saoPhiLiem);
  diaBan.nhapSao(dichCung(viTriLocTon, 7 * amDuongNamNu), Sao.saoHyThan);
  diaBan.nhapSao(dichCung(viTriLocTon, 8 * amDuongNamNu), Sao.saoBenhPhu);
  diaBan.nhapSao(dichCung(viTriLocTon, 9 * amDuongNamNu), Sao.saoDaiHao);
  diaBan.nhapSao(dichCung(viTriLocTon, 10 * amDuongNamNu), Sao.saoPhucBinh);
  diaBan.nhapSao(dichCung(viTriLocTon, 11 * amDuongNamNu), Sao.saoQuanPhu2);

  // Vòng Địa chi - Thái tuế
  const viTriThaiTue = chiNam;
  diaBan.nhapSao(viTriThaiTue, Sao.saoThaiTue);
  diaBan.nhapSao(dichCung(viTriThaiTue, 1), Sao.saoThieuDuong, Sao.saoThienKhong);
  diaBan.nhapSao(dichCung(viTriThaiTue, 2), Sao.saoTangMon);
  diaBan.nhapSao(dichCung(viTriThaiTue, 3), Sao.saoThieuAm);
  diaBan.nhapSao(dichCung(viTriThaiTue, 4), Sao.saoQuanPhu3);
  diaBan.nhapSao(dichCung(viTriThaiTue, 5), Sao.saoTuPhu, Sao.saoNguyetDuc);
  diaBan.nhapSao(dichCung(viTriThaiTue, 6), Sao.saoTuePha);
  diaBan.nhapSao(dichCung(viTriThaiTue, 7), Sao.saoLongDuc);
  diaBan.nhapSao(dichCung(viTriThaiTue, 8), Sao.saoBachHo);
  diaBan.nhapSao(dichCung(viTriThaiTue, 9), Sao.saoPhucDuc, Sao.saoThienDuc);
  diaBan.nhapSao(dichCung(viTriThaiTue, 10), Sao.saoDieuKhach);
  diaBan.nhapSao(dichCung(viTriThaiTue, 11), Sao.saoTrucPhu);

  // Vòng ngũ hành cục Tràng sinh
  const viTriTrangSinh = timTrangSinh(cucSo);
  diaBan.nhapSao(viTriTrangSinh, Sao.saoTrangSinh);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 1), Sao.saoMocDuc);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 2), Sao.saoQuanDoi);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 3), Sao.saoLamQuan);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 4), Sao.saoDeVuong);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 5), Sao.saoSuy);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 6), Sao.saoBenh);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 7), Sao.saoTu);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 8), Sao.saoMo);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * 9), Sao.saoTuyet);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * -1), Sao.saoThai);
  diaBan.nhapSao(dichCung(viTriTrangSinh, amDuongNamNu * -2), Sao.saoDuong);

  // An sao đôi: Kình dương - Đà la
  diaBan.nhapSao(dichCung(viTriLocTon, -1), Sao.saoDaLa);
  const viTriKinhDuong = dichCung(viTriLocTon, 1);
  diaBan.nhapSao(viTriKinhDuong, Sao.saoKinhDuong);

  // Không - Kiếp
  const viTriDiaKiep = dichCung(11, gioSinh);
  diaBan.nhapSao(viTriDiaKiep, Sao.saoDiaKiep);
  const viTriDiaKhong = dichCung(12, 12 - viTriDiaKiep);
  diaBan.nhapSao(viTriDiaKhong, Sao.saoDiaKhong);

  const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(chiNam, gioSinh, gioiTinh, amDuongNamSinh);
  diaBan.nhapSao(viTriHoaTinh, Sao.saoHoaTinh);
  diaBan.nhapSao(viTriLinhTinh, Sao.saoLinhTinh);

  const viTriLongTri = dichCung(5, chiNam - 1);
  diaBan.nhapSao(viTriLongTri, Sao.saoLongTri);
  diaBan.nhapSao(dichCung(2, 2 - viTriLongTri), Sao.saoPhuongCac, Sao.saoGiaiThan);

  const viTriTaPhu = dichCung(5, tt - 1);
  diaBan.nhapSao(viTriTaPhu, Sao.saoTaPhu);
  diaBan.nhapSao(dichCung(2, 2 - viTriTaPhu), Sao.saoHuuBat);

  const viTriVanKhuc = dichCung(5, gioSinh - 1);
  diaBan.nhapSao(viTriVanKhuc, Sao.saoVanKhuc);
  const viTriVanXuong = dichCung(2, 2 - viTriVanKhuc);
  diaBan.nhapSao(viTriVanXuong, Sao.saoVanXuong);

  const viTriTamThai = dichCung(5, tt + nn - 2);
  diaBan.nhapSao(viTriTamThai, Sao.saoTamThai);
  diaBan.nhapSao(dichCung(2, 2 - viTriTamThai), Sao.saoBatToa);

  const viTriAnQuang = dichCung(viTriVanXuong, nn - 2);
  diaBan.nhapSao(viTriAnQuang, Sao.saoAnQuang);
  diaBan.nhapSao(dichCung(2, 2 - viTriAnQuang), Sao.saoThienQuy);

  const viTriThienKhoi = timThienKhoi(canNam);
  diaBan.nhapSao(viTriThienKhoi, Sao.saoThienKhoi);
  diaBan.nhapSao(dichCung(5, 5 - viTriThienKhoi), Sao.saoThienViet);

  diaBan.nhapSao(dichCung(7, chiNam - 1), Sao.saoThienHu);
  diaBan.nhapSao(dichCung(7, -chiNam + 1), Sao.saoThienKhoc);

  diaBan.nhapSao(dichCung(diaBan.cungMenh, chiNam - 1), Sao.saoThienTai);
  diaBan.nhapSao(dichCung(diaBan.cungThan, chiNam - 1), Sao.saoThienTho);

  const viTriHongLoan = dichCung(4, -chiNam + 1);
  diaBan.nhapSao(viTriHongLoan, Sao.saoHongLoan);
  diaBan.nhapSao(dichCung(viTriHongLoan, 6), Sao.saoThienHy);

  const [viTriThienQuan, viTriThienPhuc] = timThienQuanThienPhuc(canNam);
  diaBan.nhapSao(viTriThienQuan, Sao.saoThienQuan);
  diaBan.nhapSao(viTriThienPhuc, Sao.saoThienPhuc);

  const viTriThienHinh = dichCung(10, tt - 1);
  diaBan.nhapSao(viTriThienHinh, Sao.saoThienHinh);
  diaBan.nhapSao(dichCung(viTriThienHinh, 4), Sao.saoThienRieu, Sao.saoThienY);

  const viTriCoThan = timCoThan(chiNam);
  diaBan.nhapSao(viTriCoThan, Sao.saoCoThan);
  diaBan.nhapSao(dichCung(viTriCoThan, -4), Sao.saoQuaTu);

  const viTriVanTinh = dichCung(viTriKinhDuong, 2);
  diaBan.nhapSao(viTriVanTinh, Sao.saoVanTinh);
  const viTriDuongPhu = dichCung(viTriVanTinh, 2);
  diaBan.nhapSao(viTriDuongPhu, Sao.saoDuongPhu);
  diaBan.nhapSao(dichCung(viTriDuongPhu, 3), Sao.saoQuocAn);

  diaBan.nhapSao(dichCung(viTriVanKhuc, 2), Sao.saoThaiPhu);
  diaBan.nhapSao(dichCung(viTriVanKhuc, -2), Sao.saoPhongCao);

  diaBan.nhapSao(dichCung(9, 2 * tt - 2), Sao.saoThienGiai);
  diaBan.nhapSao(dichCung(viTriTaPhu, 3), Sao.saoDiaGiai);

  diaBan.nhapSao(5, Sao.saoThienLa);
  diaBan.nhapSao(11, Sao.saoDiaVong);
  diaBan.nhapSao(diaBan.cungNoboc, Sao.saoThienThuong);
  diaBan.nhapSao(diaBan.cungTatAch, Sao.saoThienSu);

  // Vòng Thiên mã
  const viTriThienMa = timThienMa(chiNam);
  diaBan.nhapSao(viTriThienMa, Sao.saoThienMa);
  diaBan.nhapSao(dichCung(viTriThienMa, 2), Sao.saoHoaCai);
  const viTriKiepSat = dichCung(viTriThienMa, 3);
  diaBan.nhapSao(viTriKiepSat, Sao.saoKiepSat);
  diaBan.nhapSao(dichCung(viTriKiepSat, 4), Sao.saoDaoHoa);

  diaBan.nhapSao(timPhaToai(chiNam), Sao.saoPhaToai);

  diaBan.nhapSao(dichCung(chiNam, -tt + gioSinh), Sao.saoDauQuan);

  // Tứ Hóa
  let viTriHoaLoc: number,
    viTriHoaQuyen: number,
    viTriHoaKhoa: number,
    viTriHoaKy: number;
  switch (canNam) {
    case 1:
      viTriHoaLoc = viTriLiemTrinh;
      viTriHoaQuyen = viTriPhaQuan;
      viTriHoaKhoa = viTriVuKhuc;
      viTriHoaKy = vitriThaiDuong;
      break;
    case 2:
      viTriHoaLoc = viTriThienCo;
      viTriHoaQuyen = viTriThienLuong;
      viTriHoaKhoa = viTriTuVi;
      viTriHoaKy = viTriThaiAm;
      break;
    case 3:
      viTriHoaLoc = viTriThienDong;
      viTriHoaQuyen = viTriThienCo;
      viTriHoaKhoa = viTriVanXuong;
      viTriHoaKy = viTriLiemTrinh;
      break;
    case 4:
      viTriHoaLoc = viTriThaiAm;
      viTriHoaQuyen = viTriThienDong;
      viTriHoaKhoa = viTriThienCo;
      viTriHoaKy = viTriCuMon;
      break;
    case 5:
      viTriHoaLoc = viTriThamLang;
      viTriHoaQuyen = viTriThaiAm;
      viTriHoaKhoa = dichCung(2, 2 - viTriTaPhu); // Hữu bật
      viTriHoaKy = viTriThienCo;
      break;
    case 6:
      viTriHoaLoc = viTriVuKhuc;
      viTriHoaQuyen = viTriThamLang;
      viTriHoaKhoa = viTriThienLuong;
      viTriHoaKy = viTriVanKhuc;
      break;
    case 7:
      viTriHoaLoc = vitriThaiDuong;
      viTriHoaQuyen = viTriVuKhuc;
      viTriHoaKhoa = viTriThienDong;
      viTriHoaKy = viTriThaiAm;
      break;
    case 8:
      viTriHoaLoc = viTriCuMon;
      viTriHoaQuyen = vitriThaiDuong;
      viTriHoaKhoa = viTriVanKhuc;
      viTriHoaKy = viTriVanXuong;
      break;
    case 9:
      viTriHoaLoc = viTriThienLuong;
      viTriHoaQuyen = viTriTuVi;
      viTriHoaKhoa = viTriThienPhu;
      viTriHoaKy = viTriVuKhuc;
      break;
    case 10:
      viTriHoaLoc = viTriPhaQuan;
      viTriHoaQuyen = viTriCuMon;
      viTriHoaKhoa = viTriThaiAm;
      viTriHoaKy = viTriThamLang;
      break;
    default:
      throw new Error("Can năm không hợp lệ");
  }
  diaBan.nhapSao(viTriHoaLoc, Sao.saoHoaLoc);
  diaBan.nhapSao(viTriHoaQuyen, Sao.saoHoaQuyen);
  diaBan.nhapSao(viTriHoaKhoa, Sao.saoHoaKhoa);
  diaBan.nhapSao(viTriHoaKy, Sao.saoHoaKy);

  // An Lưu Hà - Thiên Trù
  const [viTriLuuHa, viTriThienTru] = timLuuTru(canNam);
  diaBan.nhapSao(viTriLuuHa, Sao.saoLuuHa);
  diaBan.nhapSao(viTriThienTru, Sao.saoThienTru);

  // An Tuần, Triệt
  const ketThucTuan = dichCung(chiNam, 10 - canNam);
  const viTriTuan1 = dichCung(ketThucTuan, 1);
  const viTriTuan2 = dichCung(viTriTuan1, 1);
  diaBan.nhapTuan(viTriTuan1, viTriTuan2);

  const [viTriTriet1, viTriTriet2] = timTriet(canNam);
  diaBan.nhapTriet(viTriTriet1, viTriTriet2);

  return {
    diaBan,
    cucSo,
    tenCuc: cuc.tenCuc,
    banMenh: nguHanhNapAm(chiNam, canNam, true),
    canNam,
    chiNam,
    tenNamAm: `${thienCan[canNam].tenCan} ${diaChi[chiNam].tenChi}`,
    ngayAmLich: nn,
    thangAmLich: tt,
    namAmLich: nnnn,
    thangNhuan: thangNhuan === 1,
  };
}
