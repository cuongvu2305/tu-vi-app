import { describe, expect, it } from "vitest";
import { canCuaCung, canCuaGio, chiCuaThang, diaChi, thienCan } from "../canChi";
import { lapLaSo } from "../lapLaSo";
import { nhomSaoLuuTheoCung, tenCanChiNam, tinhSaoLuuNien, tuoiMu } from "../luuNien";
import { thongTinLaSo } from "../thongTinLaSo";

/**
 * Đối chiếu với ảnh lá số mẫu của tuvivietnam.vn:
 * Vũ Quỳnh Anh, nữ, 06/12/2015 dương (25/10 Ất Mùi), giờ Mão, năm xem 2026.
 */
const laSo = lapLaSo({
  ngay: 6,
  thang: 12,
  nam: 2015,
  gioSinh: 4,
  gioiTinh: -1,
  duongLich: true,
  timeZone: 7,
});
const NAM_XEM = 2026;

describe("sao lưu niên năm 2026 (Bính Ngọ)", () => {
  const theoCung = nhomSaoLuuTheoCung(tinhSaoLuuNien(NAM_XEM));
  const tenSao = (cungSo: number) => (theoCung[cungSo] ?? []).map((s) => s.ten);

  it("năm xem 2026 là Bính Ngọ, chủ lá số 12 tuổi", () => {
    expect(tenCanChiNam(NAM_XEM)).toBe("Bính Ngọ");
    expect(tuoiMu(NAM_XEM, laSo.namAmLich)).toBe(12);
  });

  // Vị trí đọc trực tiếp từ ảnh: L.Thái Tuế + L.Kình Dương ở Ngọ, L.Tang Môn +
  // L.Thiên Mã ở Thân, L.Lộc Tồn ở Tỵ, L.Đà La ở Thìn, L.Bạch Hổ ở Dần,
  // L.Thiên Khốc + L.Thiên Hư ở Tý.
  it.each([
    [6, "Lộc tồn"],
    [7, "Thái tuế"],
    [7, "Kình dương"],
    [9, "Tang môn"],
    [9, "Thiên mã"],
    [5, "Đà la"],
    [3, "Bạch hổ"],
    [1, "Thiên khốc"],
    [1, "Thiên hư"],
  ])("cung %i có sao lưu %s", (cungSo, ten) => {
    expect(tenSao(cungSo)).toContain(ten);
  });

  it("chỉ an đúng 9 sao lưu", () => {
    expect(tinhSaoLuuNien(NAM_XEM)).toHaveLength(9);
  });
});

describe("can chi tháng / ngày / giờ", () => {
  it("tháng 10 Ất Mùi là Đinh Hợi", () => {
    expect(thienCan[laSo.canThang].tenCan).toBe("Đinh");
    expect(diaChi[laSo.chiThang].tenChi).toBe("Hợi");
    expect(chiCuaThang(10)).toBe(12);
  });

  it("ngày 06/12/2015 là Bính Thìn", () => {
    expect(thienCan[laSo.canNgay].tenCan).toBe("Bính");
    expect(diaChi[laSo.chiNgay].tenChi).toBe("Thìn");
  });

  it("giờ Mão của ngày Bính là Tân Mão", () => {
    expect(thienCan[laSo.canGio].tenCan).toBe("Tân");
    expect(diaChi[laSo.chiGio].tenChi).toBe("Mão");
    expect(canCuaGio(3, 1)).toBe(5); // ngày Bính khởi giờ Mậu Tý
  });
});

describe("can của 12 cung theo Ngũ Hổ Độn (năm Ất)", () => {
  // Ảnh mẫu: M.Dần, K.Mão, C.Thìn, T.Tỵ, N.Ngọ, Q.Mùi, G.Thân, Á.Dậu, B.Tuất, Đ.Hợi, M.Tí, K.Sửu
  it.each([
    [3, "Mậu"],
    [4, "Kỷ"],
    [5, "Canh"],
    [6, "Tân"],
    [7, "Nhâm"],
    [8, "Quý"],
    [9, "Giáp"],
    [10, "Ất"],
    [11, "Bính"],
    [12, "Đinh"],
    [1, "Mậu"],
    [2, "Kỷ"],
  ])("cung %i mang can %s", (chi, ten) => {
    expect(thienCan[canCuaCung(laSo.canNam, chi)].tenCan).toBe(ten);
  });
});

describe("tiểu hạn và tháng hạn in ở đáy mỗi cung", () => {
  it.each([
    [6, "Mão", 10],
    [7, "Dần", 11],
    [8, "Sửu", 12],
    [9, "Tý", 1],
    [10, "Hợi", 2],
    [11, "Tuất", 3],
    [12, "Dậu", 4],
    [1, "Thân", 5],
    [2, "Mùi", 6],
    [3, "Ngọ", 7],
    [4, "Tỵ", 8],
    [5, "Thìn", 9],
  ])("cung %i: tiểu hạn %s, tháng %i", (cungSo, chi, thang) => {
    const cung = laSo.diaBan.thapNhiCung[cungSo];
    expect(cung.cungTieuHan).toBe(chi);
    expect(cung.cungThangHan).toBe(thang);
  });
});

describe("thông tin tổng hợp ở ô giữa lá số", () => {
  const tt = thongTinLaSo(laSo);

  it("Âm Nữ, âm dương nghịch lý, Mệnh sinh Cục, Thân cư Thiên di", () => {
    expect(tt.amDuongMenh).toBe("Âm Nữ");
    expect(tt.amDuongThuanLy).toBe(false);
    expect(tt.quanHeMenhCuc).toBe("Mệnh sinh Cục");
    expect(tt.thanCu).toBe("Thiên di");
  });

  it("chủ Thân là Thiên tướng (tra theo chi năm sinh Mùi)", () => {
    expect(tt.chuThan).toBe("Thiên tướng");
  });
});
