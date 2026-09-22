import { describe, expect, it } from "vitest";
import { lapLaSo } from "../lapLaSo";
import { danhGiaCung, luanGiaiCung } from "../luanGiaiCung";

const tenCung12 = [
  "Mệnh", "Phụ mẫu", "Phúc đức", "Điền trạch", "Quan lộc", "Nô bộc",
  "Thiên di", "Tật Ách", "Tài Bạch", "Tử tức", "Phu thê", "Huynh đệ",
];

describe("luanGiaiCung — bộ quy tắc từ giáo trình", () => {
  it("có dữ liệu cho đủ 12 cung với tên khớp với cungChu của địa bàn", () => {
    for (const ten of tenCung12) {
      expect(luanGiaiCung[ten], ten).toBeDefined();
      expect(luanGiaiCung[ten].tongQuan.length).toBeGreaterThan(20);
    }
    const la = lapLaSo({ ngay: 6, thang: 12, nam: 2015, gioSinh: 4, gioiTinh: -1 });
    const tenTrongLaSo = la.diaBan.thapNhiCung.slice(1).map((c) => c.cungChu);
    expect(tenTrongLaSo.sort()).toEqual([...tenCung12].sort());
  });

  it("chỉ dùng tên sao có thật trong danh mục sao của app (tránh gõ sai tên)", async () => {
    const saoModule = await import("../sao");
    const tenHopLe = new Set<string>();
    for (const v of Object.values(saoModule)) {
      if (v && typeof v === "object" && "ten" in v) tenHopLe.add((v as { ten: string }).ten);
    }
    const sai: string[] = [];
    for (const [cung, luan] of Object.entries(luanGiaiCung)) {
      for (const q of luan.quyTac) {
        for (const t of [...(q.du ?? []), ...(q.nhom ?? []), ...(q.ham ?? []), ...(q.hamMot ?? []), ...(q.dac ?? [])]) {
          if (!tenHopLe.has(t)) sai.push(`${cung}: ${t}`);
        }
      }
    }
    expect(sai).toEqual([]);
  });

  describe("lá số Vũ Quỳnh Anh (ảnh tham chiếu)", () => {
    const la = lapLaSo({ ngay: 6, thang: 12, nam: 2015, gioSinh: 4, gioiTinh: -1 });
    const layCung = (ten: string) => {
      const c = la.diaBan.thapNhiCung.find((x) => x?.cungChu === ten)!;
      return danhGiaCung(c, ten)!;
    };

    it("Tài Bạch: Thái âm hãm và Cô/Quả", () => {
      const r = layCung("Tài Bạch");
      expect(r.ghiChu.join(" ")).toMatch(/Thái âm hãm/);
      expect(r.ghiChu.join(" ")).toMatch(/Cô\/Quả/);
    });

    it("Thiên di: có sát tinh hãm (Đà la hãm ở Dần)", () => {
      expect(layCung("Thiên di").hung.join(" ")).toMatch(/Sát tinh/);
    });

    it("Tật Ách: Thiên phủ và Lộc tồn", () => {
      const r = layCung("Tật Ách").ghiChu.join(" ");
      expect(r).toMatch(/Thiên phủ/);
      expect(r).toMatch(/Lộc tồn/);
    });

    it("luôn trả về tổng quan và không lỗi cho cả 12 cung", () => {
      for (const ten of tenCung12) {
        const r = layCung(ten);
        expect(r.tongQuan).toBeTruthy();
      }
    });
  });

  it("danhGiaCung trả về null cho tên cung không có trong giáo trình", () => {
    const la = lapLaSo({ ngay: 6, thang: 12, nam: 2015, gioSinh: 4, gioiTinh: -1 });
    expect(danhGiaCung(la.diaBan.thapNhiCung[1], "Không tồn tại")).toBeNull();
  });
});
