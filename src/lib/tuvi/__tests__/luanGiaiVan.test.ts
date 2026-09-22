import { describe, expect, it } from "vitest";
import { lapLaSo } from "../lapLaSo";
import { luanDaiVan, quyTacVan, tamPhuongTuChinh, TUOI_TOI_THIEU_HON_NHAN } from "../luanGiaiVan";
import * as saoModule from "../sao";

describe("luanGiaiVan — luận đại vận theo bộ sao trong giáo trình", () => {
  it("tam phương tứ chính: chính cung, xung chiếu, hai cung tam hợp", () => {
    expect(tamPhuongTuChinh(1).sort((a, b) => a - b)).toEqual([1, 5, 7, 9]);
    expect(tamPhuongTuChinh(9).sort((a, b) => a - b)).toEqual([1, 3, 5, 9]);
    expect(tamPhuongTuChinh(12).sort((a, b) => a - b)).toEqual([4, 6, 8, 12]);
  });

  it("mọi tên sao trong quy tắc đều có thật trong danh mục sao", () => {
    const tenHopLe = new Set<string>();
    for (const v of Object.values(saoModule)) {
      if (v && typeof v === "object" && "ten" in v) tenHopLe.add((v as { ten: string }).ten);
    }
    const sai: string[] = [];
    for (const q of quyTacVan) {
      for (const dk of q.dieuKien) {
        for (const t of dk.sao) if (!tenHopLe.has(t)) sai.push(t);
        expect(dk.it ?? dk.sao.length).toBeLessThanOrEqual(dk.sao.length);
      }
    }
    expect(sai).toEqual([]);
  });

  describe("lá số Vũ Quỳnh Anh (ảnh tham chiếu)", () => {
    const la = lapLaSo({ ngay: 6, thang: 12, nam: 2015, gioSinh: 4, gioiTinh: -1 });
    const cacVan = luanDaiVan(la.diaBan);

    it("12 đại vận, tăng dần từ 2 tuổi, mỗi vận 10 năm, khớp ảnh", () => {
      expect(cacVan).toHaveLength(12);
      expect(cacVan.map((v) => v.tuoiTu)).toEqual([2, 12, 22, 32, 42, 52, 62, 72, 82, 92, 102, 112]);
      expect(cacVan[0].tenCung).toBe("Mệnh");
      expect(cacVan[0].tuoiDen).toBe(11);
    });

    it("không xét hôn nhân, con cái cho đại vận bắt đầu trước 18 tuổi", () => {
      for (const v of cacVan.filter((x) => x.tuoiTu < TUOI_TOI_THIEU_HON_NHAN)) {
        expect(v.ketQua.filter((k) => k.chuDe === "honNhan" || k.chuDe === "conCai")).toEqual([]);
      }
    });

    it("đại vận 2-11 (cung Mệnh) có tín hiệu học vấn, công danh", () => {
      expect(cacVan[0].ketQua.some((k) => k.chuDe === "danhLoi")).toBe(true);
    });
  });
});
