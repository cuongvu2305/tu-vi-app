import { describe, expect, it } from "vitest";
import { lapLaSo } from "../lapLaSo";

/**
 * Đối chiếu với lá số tham chiếu trên diễn đàn Tử Vi Việt Nam (tuvivietnam.vn):
 * Vũ Quỳnh Anh, nữ, sinh 06/12/2015 dương lịch = 25/10 Ất Mùi, giờ Mão (06h30).
 * Mệnh Thiên Đồng - Thiên Lương tại Thân, Thân cư Thiên Di (Dần), Thủy nhị cục,
 * bản mệnh Sa trung kim, Âm nữ (thuận), Âm Dương nghịch lý.
 *
 * Số cung địa bàn: 1 = Tý, 2 = Sửu, 3 = Dần, 4 = Mão, 5 = Thìn, 6 = Tỵ,
 * 7 = Ngọ, 8 = Mùi, 9 = Thân, 10 = Dậu, 11 = Tuất, 12 = Hợi.
 */
const input = { ngay: 6, thang: 12, nam: 2015, gioSinh: 4, gioiTinh: -1 as const, duongLich: true, timeZone: 7 };

describe("lá số Vũ Quỳnh Anh (ảnh tham chiếu tuvivietnam.vn)", () => {
  const la = lapLaSo(input);
  const { diaBan } = la;
  const saoCung = (viTri: number) => diaBan.thapNhiCung[viTri].cungSao.map((s) => s.ten);

  it("chuyển đúng sang âm lịch: 25/10 năm Ất Mùi", () => {
    expect(la.ngayAmLich).toBe(25);
    expect(la.thangAmLich).toBe(10);
    expect(la.namAmLich).toBe(2015);
  });

  it("xác định Mệnh tại Thân, Thân tại Dần", () => {
    expect(diaBan.cungMenh).toBe(9);
    expect(diaBan.cungThan).toBe(3);
  });

  it("Thủy nhị cục, bản mệnh Sa trung kim", () => {
    expect(la.cucSo).toBe(2);
    expect(la.tenCuc).toMatch(/Thủy/);
    expect(la.banMenh).toMatch(/Sa trung kim/i);
  });

  it("đại vận: Mệnh khởi 2 tuổi, thuận chiều 10 năm mỗi cung", () => {
    const daiHan: Record<number, number> = {
      9: 2, 10: 12, 11: 22, 12: 32, 1: 42, 2: 52, 3: 62, 4: 72, 5: 82, 6: 92, 7: 102, 8: 112,
    };
    for (const [viTri, tuoi] of Object.entries(daiHan)) {
      expect(diaBan.thapNhiCung[Number(viTri)].cungDaiHan).toBe(tuoi);
    }
  });

  it("14 chính tinh đúng cung", () => {
    const chinhTinh: Record<number, string[]> = {
      6: ["Liêm trinh", "Tham lang"],
      7: ["Cự môn"],
      8: ["Thiên tướng"],
      9: ["Thiên đồng", "Thiên lương"],
      10: ["Vũ khúc", "Thất sát"],
      11: ["Thái Dương"],
      12: [],
      1: ["Thiên cơ"],
      2: ["Tử vi", "Phá quân"],
      3: [],
      4: ["Thiên phủ"],
      5: ["Thái âm"],
    };
    const tenChinhTinh = new Set(
      ["Tử vi", "Liêm trinh", "Thiên đồng", "Vũ khúc", "Thái Dương", "Thiên cơ", "Thiên phủ", "Thái âm",
       "Tham lang", "Cự môn", "Thiên tướng", "Thiên lương", "Thất sát", "Phá quân"],
    );
    for (const [viTri, ds] of Object.entries(chinhTinh)) {
      const thucTe = saoCung(Number(viTri)).filter((t) => tenChinhTinh.has(t));
      expect(thucTe.sort()).toEqual([...ds].sort());
    }
  });

  it("đặc tính miếu/vượng/đắc/hãm của chính tinh", () => {
    const dacTinh: Record<string, string> = {
      "Liêm trinh|6": "H", "Tham lang|6": "H", "Cự môn|7": "V", "Thiên tướng|8": "Đ",
      "Thiên đồng|9": "M", "Thiên lương|9": "V", "Vũ khúc|10": "Đ", "Thất sát|10": "H",
      "Thái Dương|11": "H", "Thiên cơ|1": "Đ", "Tử vi|2": "Đ", "Phá quân|2": "V",
      "Thiên phủ|4": "B", "Thái âm|5": "H",
    };
    for (const [key, dt] of Object.entries(dacTinh)) {
      const [ten, viTri] = key.split("|");
      const sao = diaBan.thapNhiCung[Number(viTri)].cungSao.find((s) => s.ten === ten);
      expect(sao, key).toBeDefined();
      expect(sao?.dacTinh, key).toBe(dt);
    }
  });

  it("Tứ hóa năm Ất: Cơ Lộc, Lương Quyền, Tử Khoa, Âm Kỵ", () => {
    expect(saoCung(1)).toContain("Hóa lộc");
    expect(saoCung(9)).toContain("Hóa quyền");
    expect(saoCung(2)).toContain("Hóa khoa");
    expect(saoCung(5)).toContain("Hóa kỵ");
  });

  it("các phụ tinh then chốt đúng cung", () => {
    const kyVong: Record<number, string[]> = {
      1: ["Thiên khôi", "Hỏa tinh"],
      2: ["Tả phù", "Hữu bật"],
      3: ["Địa kiếp", "Đà la"],
      4: ["Lộc tồn", "Bạch hổ"],
      5: ["Kình dương"],
      7: ["Thiên hình", "Thiên trù"],
      8: ["Văn Khúc", "Văn xương", "Linh tinh"],
      9: ["Thiên việt", "Địa không", "Hồng loan"],
      10: ["Thai phụ"],
      11: ["Thiên riêu", "Địa võng"],
      12: ["Long trì", "Quốc ấn"],
    };
    for (const [viTri, ds] of Object.entries(kyVong)) {
      for (const ten of ds) {
        expect(saoCung(Number(viTri)), `${ten} @${viTri}`).toContain(ten);
      }
    }
  });
});
