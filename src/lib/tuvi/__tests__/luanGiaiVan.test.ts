import { describe, expect, it } from "vitest";
import { lapLaSo } from "../lapLaSo";
import {
  boSaoUngVan,
  luanDaiVan,
  quyTacVan,
  tamPhuongTuChinh,
  vanHopTuoi,
  type ChuDe,
} from "../luanGiaiVan";
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

    it("đại vận 2-11 (cung Mệnh) có tín hiệu học vấn, công danh", () => {
      expect(cacVan[0].ketQua.some((k) => k.chuDe === "danhLoi")).toBe(true);
    });
  });

  describe("khung tuổi theo chủ đề (so với tuổi giữa của vận)", () => {
    it.each<[ChuDe, number, boolean]>([
      ["danhLoi", 2, true],
      ["danhLoi", 32, false],
      ["danhLoi", 64, false],
      ["honNhan", 12, false],
      ["honNhan", 14, true],
      ["honNhan", 44, true],
      ["honNhan", 54, false],
      ["conCai", 14, false],
      ["taiLoc", 12, false],
      ["taiLoc", 64, true],
    ])("%s ở vận bắt đầu %i tuổi: %s", (chuDe, tuoiTu, ky) => {
      expect(vanHopTuoi(chuDe, tuoiTu, tuoiTu + 9)).toBe(ky);
    });
  });

  it("sao chủ của bộ phải nằm ngay cung đại vận, không chỉ ở tam phương", () => {
    const bo = quyTacVan.find((q) => q.chuDe === "danhLoi")!;
    const tamPhuong = new Set([
      "Thiên cơ", "Thái âm", "Thiên đồng", "Hóa khoa", "Hóa quyền", "Hóa lộc", "Quốc ấn",
    ]);
    expect(boSaoUngVan(bo, tamPhuong, new Set(["Thiên cơ"]))).toBe(true);
    expect(boSaoUngVan(bo, tamPhuong, new Set(["Hóa khoa"]))).toBe(false);
  });

  it("trên nhiều lá số: mỗi vận tối đa 1 mục mỗi chủ đề, không mục nào lệch khung tuổi", () => {
    for (let nam = 1950; nam <= 2020; nam += 7) {
      for (const [ngay, thang] of [[3, 2], [17, 6], [28, 11]]) {
        for (const gioSinh of [1, 4, 7, 10]) {
          for (const gioiTinh of [1, -1] as const) {
            const la = lapLaSo({ ngay, thang, nam, gioSinh, gioiTinh });
            for (const v of luanDaiVan(la.diaBan)) {
              const cacChuDe = v.ketQua.map((k) => k.chuDe);
              expect(new Set(cacChuDe).size).toBe(cacChuDe.length);
              for (const k of v.ketQua) expect(vanHopTuoi(k.chuDe, v.tuoiTu, v.tuoiDen)).toBe(true);
            }
          }
        }
      }
    }
  });
});
