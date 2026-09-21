import { describe, expect, it } from "vitest";
import { lapLaSo, type LapLaSoInput } from "../lapLaSo";

/**
 * Các case dưới đây được đối chiếu trực tiếp bằng cách chạy thư viện gốc
 * lasotuvi (Python, https://github.com/doanguyen/lasotuvi) với cùng input.
 */
interface Case {
  ten: string;
  input: LapLaSoInput;
  cungMenh: number;
  cungThan: number;
  saoTheoCung: Record<number, string[]>;
  dacTinh: Record<string, string>;
}

const cases: Case[] = [
  {
    ten: "nam, 24/10/1991, giờ Ngọ (7)",
    input: { ngay: 24, thang: 10, nam: 1991, gioSinh: 7, gioiTinh: 1, duongLich: true, timeZone: 7 },
    cungMenh: 5,
    cungThan: 5,
    saoTheoCung: {
      1: ["Thiên lương", "Đại hao", "Tử phù", "Nguyệt đức", "Mộ", "Tả phù", "Văn tinh", "Thai phụ", "Thiên giải", "Đào hoa"],
      2: ["Liêm trinh", "Thất sát", "Bệnh phù", "Tuế phá", "Tử", "Thiên hư", "Phá toái"],
      3: ["Hỷ thần", "Long đức", "Bệnh", "Hữu bật", "Thiên việt", "Thiên hỷ", "Đường phù"],
      4: ["Phi liêm", "Bạch hổ", "Suy", "Hỏa tinh", "Phượng các", "Giải thần", "Địa giải", "Lưu hà"],
      5: ["Thiên đồng", "Tấu thư", "Phúc đức", "Thiên đức", "Đế vượng", "Linh tinh", "Văn xương", "Tam thai", "Quả tú", "Thiên la", "Hóa kỵ"],
      6: ["Vũ khúc", "Phá quân", "Tướng quân", "Điếu khách", "Lâm quan", "Địa kiếp", "Địa không", "Thiên phúc", "Thiên hình", "Quốc ấn", "Thiên mã", "Đẩu quân"],
      7: ["Thái Dương", "Tiểu hao", "Trực phù", "Quan đới", "Thiên khôi", "Hóa quyền", "Thiên trù"],
      8: ["Thiên phủ", "Thanh long", "Thái tuế", "Mộc dục", "Ân quang", "Thiên quý", "Hoa cái"],
      9: ["Thiên cơ", "Thái âm", "Lực sĩ", "Thiếu dương", "Thiên không", "Tràng sinh", "Đà la", "Hồng loan", "Cô thần", "Phong cáo", "Kiếp sát"],
      10: ["Tử vi", "Tham lang", "Lộc tồn", "Bác sỹ", "Tang môn", "Thai", "Thiên quan", "Thiên riêu", "Thiên y", "Thiên thương"],
      11: ["Cự môn", "Quan phù", "Thiếu âm", "Dưỡng", "Kình dương", "Văn Khúc", "Bát tọa", "Địa võng", "Hóa lộc", "Hóa khoa"],
      12: ["Thiên tướng", "Phục binh", "Quan phù", "Tuyệt", "Long trì", "Thiên khốc", "Thiên tài", "Thiên thọ", "Thiên sứ"],
    },
    dacTinh: {
      "Thiên lương|1": "V",
      "Liêm trinh|2": "Đ",
      "Thất sát|2": "Đ",
      "Thiên hư|2": "Đ",
      "Thiên đồng|5": "H",
      "Linh tinh|5": "Đ",
      "Văn xương|5": "H",
      "Hóa kỵ|5": "Đ",
      "Vũ khúc|6": "H",
      "Phá quân|6": "H",
      "Địa kiếp|6": "Đ",
      "Địa không|6": "Đ",
      "Thiên mã|6": "Đ",
      "Thái Dương|7": "M",
      "Thiên cơ|9": "V",
      "Thái âm|9": "V",
      "Đà la|9": "H",
      "Tử vi|10": "B",
      "Tham lang|10": "H",
      "Thiên riêu|10": "Đ",
      "Cự môn|11": "H",
      "Kình dương|11": "Đ",
      "Văn Khúc|11": "Đ",
      "Thiên tướng|12": "Đ",
      "Hỏa tinh|4": "Đ",
    },
  },
  {
    ten: "nữ, 15/3/2000, giờ Tỵ (10)",
    input: { ngay: 15, thang: 3, nam: 2000, gioSinh: 10, gioiTinh: -1, duongLich: true, timeZone: 7 },
    cungMenh: 7,
    cungThan: 1,
    saoTheoCung: {
      1: ["Cự môn", "Bệnh phù", "Bạch hổ", "Thai", "Bát tọa", "Đẩu quân"],
      2: ["Thiên tướng", "Hỷ thần", "Phúc đức", "Thiên đức", "Dưỡng", "Văn Khúc", "Văn xương", "Thiên việt", "Quả tú", "Đường phù", "Thiên sứ", "Phá toái"],
      3: ["Thiên đồng", "Thiên lương", "Phi liêm", "Điếu khách", "Tuyệt", "Địa không", "Tam thai", "Thiên khốc", "Thiên riêu", "Thiên y", "Thiên mã", "Hóa khoa", "Thiên trù"],
      4: ["Vũ khúc", "Thất sát", "Tấu thư", "Trực phù", "Mộ", "Thai phụ", "Hóa quyền"],
      5: ["Thái Dương", "Tướng quân", "Thái tuế", "Tử", "Thiên thọ", "Quốc ấn", "Thiên la", "Hoa cái", "Hóa lộc"],
      6: ["Tiểu hao", "Thiếu dương", "Thiên không", "Bệnh", "Hỏa tinh", "Tả phù", "Thiên quý", "Thiên hỷ", "Cô thần", "Kiếp sát"],
      7: ["Thiên cơ", "Thanh long", "Tang môn", "Suy", "Phượng các", "Giải thần", "Thiên phúc"],
      8: ["Tử vi", "Phá quân", "Lực sĩ", "Thiếu âm", "Đế vượng", "Đà la", "Linh tinh", "Thiên khôi"],
      9: ["Lộc tồn", "Bác sỹ", "Quan phù", "Lâm quan", "Địa kiếp", "Long trì", "Địa giải", "Lưu hà"],
      10: ["Thiên phủ", "Quan phù", "Tử phù", "Nguyệt đức", "Quan đới", "Kình dương", "Hữu bật", "Ân quang", "Đào hoa"],
      11: ["Thái âm", "Phục binh", "Tuế phá", "Mộc dục", "Thiên hư", "Thiên tài", "Thiên hình", "Thiên giải", "Địa võng", "Hóa kỵ"],
      12: ["Liêm trinh", "Tham lang", "Đại hao", "Long đức", "Tràng sinh", "Hồng loan", "Thiên quan", "Văn tinh", "Phong cáo", "Thiên thương"],
    },
    dacTinh: {
      "Cự môn|1": "V",
      "Thiên tướng|2": "Đ",
      "Văn Khúc|2": "Đ",
      "Văn xương|2": "Đ",
      "Thiên đồng|3": "M",
      "Thiên lương|3": "V",
      "Địa không|3": "Đ",
      "Thiên riêu|3": "Đ",
      "Thiên mã|3": "Đ",
      "Vũ khúc|4": "Đ",
      "Thất sát|4": "H",
      "Thái Dương|5": "V",
      "Hỏa tinh|6": "Đ",
      "Thiên cơ|7": "Đ",
      "Tử vi|8": "Đ",
      "Phá quân|8": "V",
      "Đà la|8": "Đ",
      "Linh tinh|8": "H",
      "Kình dương|10": "H",
      "Thái âm|11": "M",
      "Hóa kỵ|11": "Đ",
      "Liêm trinh|12": "H",
      "Tham lang|12": "H",
    },
  },
];

describe.each(cases)("lapLaSo — đối chiếu với lasotuvi (Python) gốc: $ten", (c) => {
  const { diaBan } = lapLaSo(c.input);

  it("xác định đúng cung Mệnh và cung Thân", () => {
    expect(diaBan.cungMenh).toBe(c.cungMenh);
    expect(diaBan.cungThan).toBe(c.cungThan);
  });

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])("cung địa bàn số %i có đúng danh sách sao", (viTri) => {
    const cung = diaBan.thapNhiCung[viTri];
    const tenSao = cung.cungSao.map((s) => s.ten);
    expect(tenSao.sort()).toEqual([...c.saoTheoCung[viTri]].sort());
  });

  it("gán đúng đặc tính miếu/vượng/đắc/hãm cho các sao then chốt", () => {
    for (let viTri = 1; viTri <= 12; viTri++) {
      const cung = diaBan.thapNhiCung[viTri];
      for (const sao of cung.cungSao) {
        const key = `${sao.ten}|${viTri}`;
        if (key in c.dacTinh) {
          expect(sao.dacTinh).toBe(c.dacTinh[key]);
        }
      }
    }
  });
});
