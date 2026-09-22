/**
 * Luận đại vận theo các "bộ sao" trong giáo trình "Tử Vi Luận Giải Đoán Số Mệnh"
 * (Đỗ Đức Đạt): phần Đoán hạn kết hôn/sinh con và Đoán hạn phát tài lộc.
 * Nội dung được diễn đạt lại thành bộ quy tắc.
 *
 * Cách áp dụng: lấy toàn bộ sao thuộc tam phương tứ chính của cung đại vận
 * (chính cung, cung xung chiếu và hai cung tam hợp), rồi kiểm tra từng bộ sao.
 *
 * Lưu ý: chỉ mang tính tham khảo. Mục đoán hạn tang/chết trong giáo trình được
 * cố ý KHÔNG đưa vào ứng dụng.
 */
import type { DiaBan } from "./diaBan";

export type ChuDe = "taiLoc" | "danhLoi" | "honNhan" | "conCai";
export type MucDoVan = "cat" | "hung" | "luuY";

interface DieuKien {
  sao: string[];
  /** Số sao tối thiểu phải có trong nhóm (mặc định: tất cả). */
  it?: number;
}

export interface QuyTacVan {
  chuDe: ChuDe;
  /** Tất cả các điều kiện đều phải thỏa. */
  dieuKien: DieuKien[];
  mucDo: MucDoVan;
  noiDung: string;
}

export const TEN_CHU_DE: Record<ChuDe, string> = {
  taiLoc: "Tài lộc",
  danhLoi: "Học vấn, công danh",
  honNhan: "Tình duyên, hôn nhân",
  conCai: "Con cái",
};

/** Đại vận chỉ được xét chủ đề hôn nhân, con cái nếu bắt đầu từ tuổi này trở đi. */
export const TUOI_TOI_THIEU_HON_NHAN = 18;

const SAO_HON_NHAN_CAN_TRO = ["Thái tuế", "Thiên hình", "Phá toái", "Kiếp sát", "Hóa kỵ", "Tang môn", "Địa kiếp", "Địa không"];
const SAO_HON_NHAN_KHO = ["Lộc tồn", "Đẩu quân", "Cô thần", "Quả tú", "Thiên hư", "Thiên khốc"];

export const quyTacVan: QuyTacVan[] = [
  // ----- Tài lộc, công danh -----
  {
    chuDe: "taiLoc",
    dieuKien: [
      { sao: ["Tử vi", "Thiên phủ", "Vũ khúc", "Thiên tướng"], it: 2 },
      { sao: ["Long trì", "Phượng các", "Hóa lộc", "Lộc tồn", "Tả phù", "Hữu bật"], it: 4 },
    ],
    mucDo: "cat",
    noiDung: "Tử, Phủ, Vũ, Tướng hội Long Phượng, Lộc, Tả Hữu: nhiều may mắn, có quý nhân phù trợ, đời sống giàu có, sung túc.",
  },
  {
    chuDe: "danhLoi",
    dieuKien: [
      { sao: ["Thiên cơ", "Thái âm", "Thiên đồng", "Thiên lương"], it: 3 },
      { sao: ["Hóa khoa", "Hóa quyền", "Hóa lộc", "Tướng quân", "Quốc ấn", "Thai phụ", "Phong cáo", "Thiên khôi", "Thiên việt", "Tả phù", "Hữu bật"], it: 4 },
    ],
    mucDo: "cat",
    noiDung: "Cơ, Nguyệt, Đồng, Lương hội nhiều cát tinh (Khoa Quyền Lộc, Ấn, Cáo, Khôi Việt, Tả Hữu): thuận lợi thi cử, đỗ đạt, thăng tiến; tay trắng vẫn sinh tài.",
  },
  {
    chuDe: "taiLoc",
    dieuKien: [
      { sao: ["Cự môn", "Thái Dương"] },
      { sao: ["Hóa lộc", "Lộc tồn"] },
      { sao: ["Tràng sinh", "Đế vượng", "Tả phù", "Hữu bật"], it: 2 },
    ],
    mucDo: "cat",
    noiDung: "Cự Nhật hội song Lộc, Tràng sinh/Đế vượng, Tả Hữu: phát tài, lộc dồi dào, việc thuận ý.",
  },
  {
    chuDe: "danhLoi",
    dieuKien: [
      { sao: ["Thiên cơ", "Thái âm", "Thiên đồng", "Thiên lương"], it: 3 },
      { sao: ["Văn xương", "Văn Khúc"] },
      { sao: ["Đào hoa", "Hồng loan"], it: 1 },
      { sao: ["Hóa khoa", "Hóa quyền", "Hóa lộc"], it: 2 },
    ],
    mucDo: "cat",
    noiDung: "Cơ, Nguyệt, Đồng, Lương hội Xương Khúc, Đào Hồng, Khoa Quyền Lộc: học hành, thi cử đạt kết quả cao, danh giá.",
  },
  {
    chuDe: "taiLoc",
    dieuKien: [
      { sao: ["Thất sát", "Phá quân", "Liêm trinh", "Tham lang"], it: 2 },
      { sao: ["Long trì", "Phượng các"] },
      { sao: ["Tả phù", "Hữu bật"] },
      { sao: ["Thiên khôi", "Thiên việt"], it: 1 },
    ],
    mucDo: "cat",
    noiDung: "Sát, Phá, Liêm, Tham hội Long Phượng, Tả Hữu, Khôi Việt: có thể phát đột ngột, mạnh mẽ.",
  },
  {
    chuDe: "taiLoc",
    dieuKien: [
      { sao: ["Cự môn", "Thiên cơ", "Thiên đồng", "Thiên lương"], it: 3 },
      { sao: ["Tả phù", "Hữu bật"] },
      { sao: ["Hóa quyền", "Hóa lộc"] },
      { sao: ["Thiên khôi", "Thiên việt"], it: 1 },
    ],
    mucDo: "cat",
    noiDung: "Cự, Cơ, Đồng, Lương hội Tả Hữu, Quyền Lộc, Khôi Việt: hợp buôn bán, làm ăn, có thể khá giả.",
  },

  // ----- Hôn nhân -----
  {
    chuDe: "honNhan",
    dieuKien: [
      { sao: ["Thất sát", "Phá quân", "Liêm trinh"], it: 2 },
      { sao: ["Đào hoa"] },
    ],
    mucDo: "cat",
    noiDung: "Sát/Phá/Liêm gặp Đào hoa: có chuyện yêu đương, tình cảm.",
  },
  {
    chuDe: "honNhan",
    dieuKien: [{ sao: ["Tả phù", "Hữu bật", "Hồng loan", "Thiên hỷ"] }],
    mucDo: "cat",
    noiDung: "Tả Hữu, Hồng loan, Thiên hỷ: dấu hiệu song hỷ, thuận lợi chuyện lập gia đình.",
  },
  {
    chuDe: "honNhan",
    dieuKien: [{ sao: ["Long trì", "Phượng các", "Hỷ thần"] }],
    mucDo: "cat",
    noiDung: "Long Phượng, Hỷ thần: có tin vui về tình duyên.",
  },
  {
    chuDe: "honNhan",
    dieuKien: [{ sao: ["Đào hoa", "Hồng loan", "Thái Dương", "Thái âm"] }],
    mucDo: "cat",
    noiDung: "Đào, Hồng, Nhật, Nguyệt: duyên lành, thuận chuyện hôn nhân.",
  },
  {
    chuDe: "honNhan",
    dieuKien: [{ sao: ["Vũ khúc", "Thiên riêu", "Hóa lộc", "Thiên mã", "Đào hoa"] }],
    mucDo: "cat",
    noiDung: "Vũ, Riêu, Lộc, Mã, Đào: dễ có duyên mới, tình cảm phát triển.",
  },
  {
    chuDe: "honNhan",
    dieuKien: [{ sao: SAO_HON_NHAN_CAN_TRO, it: 4 }],
    mucDo: "hung",
    noiDung: "Có nhiều sao cản trở hôn nhân (Tuế, Hình, Kỵ, Tang, Không/Kiếp...): chuyện tình cảm dễ trắc trở, nên thận trọng.",
  },
  {
    chuDe: "honNhan",
    dieuKien: [{ sao: SAO_HON_NHAN_KHO, it: 3 }],
    mucDo: "luuY",
    noiDung: "Lộc tồn, Đẩu quân, Cô Quả, Khốc Hư: chuyện lập gia đình có thể chậm hoặc còn nhiều cân nhắc.",
  },

  // ----- Con cái -----
  {
    chuDe: "conCai",
    dieuKien: [{ sao: ["Thiên phủ", "Thiên tướng", "Long trì", "Phượng các", "Thai"] }],
    mucDo: "cat",
    noiDung: "Phủ, Tướng, Long Phượng, Thai: thuận lợi chuyện có con.",
  },
  {
    chuDe: "conCai",
    dieuKien: [{ sao: ["Thái Dương", "Thái âm", "Thiên khôi", "Thiên việt", "Đào hoa", "Hồng loan"] }],
    mucDo: "cat",
    noiDung: "Nhật Nguyệt, Khôi Việt, Đào Hồng: tin vui về con cái.",
  },
  {
    chuDe: "conCai",
    dieuKien: [{ sao: ["Thanh long", "Đế vượng", "Thai"] }],
    mucDo: "cat",
    noiDung: "Thanh long, Đế vượng, Thai: hạn có con, vui vẻ.",
  },
  {
    chuDe: "conCai",
    dieuKien: [{ sao: ["Thiên quan", "Thiên phúc", "Tả phù", "Hữu bật", "Hồng loan", "Thiên hỷ"] }],
    mucDo: "cat",
    noiDung: "Quan, Phúc, Tả Hữu, Hồng Hỷ: chuyện con cái thuận lợi, có phúc.",
  },
  {
    chuDe: "conCai",
    dieuKien: [{ sao: ["Thanh long", "Long trì", "Thiên mã", "Tràng sinh"] }],
    mucDo: "cat",
    noiDung: "Thanh long, Long trì, Mã gặp Tràng sinh: có tin vui về con cái.",
  },
  {
    chuDe: "conCai",
    dieuKien: [{ sao: ["Hỷ thần", "Thiên quan", "Thiên phúc", "Tấu thư"] }],
    mucDo: "cat",
    noiDung: "Hỷ thần, Quan, Phúc, Tấu thư: tin vui, có phúc về con cái.",
  },
];

/** Tam phương tứ chính của một cung địa bàn (1..12): chính cung, xung chiếu, hai cung tam hợp. */
export function tamPhuongTuChinh(cungSo: number): number[] {
  const chuyen = (d: number) => ((((cungSo - 1 + d) % 12) + 12) % 12) + 1;
  return [cungSo, chuyen(6), chuyen(4), chuyen(8)];
}

function tapSaoTamPhuong(diaBan: DiaBan, cungSo: number): Set<string> {
  const tap = new Set<string>();
  for (const c of tamPhuongTuChinh(cungSo)) {
    for (const s of diaBan.thapNhiCung[c].cungSao) tap.add(s.ten);
  }
  return tap;
}

function thoaDieuKien(tap: Set<string>, dk: DieuKien): boolean {
  const dem = dk.sao.filter((t) => tap.has(t)).length;
  return dem >= (dk.it ?? dk.sao.length);
}

export interface KetQuaVan {
  cungSo: number;
  tenCung: string;
  tuoiTu: number;
  tuoiDen: number;
  ketQua: { chuDe: ChuDe; mucDo: MucDoVan; noiDung: string }[];
}

/**
 * Luận 12 đại vận của lá số, sắp theo tuổi tăng dần.
 * Chủ đề hôn nhân và con cái chỉ được xét với đại vận bắt đầu từ tuổi 18 trở lên.
 */
export function luanDaiVan(diaBan: DiaBan): KetQuaVan[] {
  const ketQua: KetQuaVan[] = [];
  for (const cung of diaBan.thapNhiCung.slice(1)) {
    if (cung.cungDaiHan === undefined) continue;
    const tuoiTu = cung.cungDaiHan;
    const tuoiDen = tuoiTu + 9;
    const tap = tapSaoTamPhuong(diaBan, cung.cungSo);
    const trongVan: KetQuaVan["ketQua"] = [];
    for (const q of quyTacVan) {
      if ((q.chuDe === "honNhan" || q.chuDe === "conCai") && tuoiTu < TUOI_TOI_THIEU_HON_NHAN) continue;
      if (q.dieuKien.every((dk) => thoaDieuKien(tap, dk))) {
        trongVan.push({ chuDe: q.chuDe, mucDo: q.mucDo, noiDung: q.noiDung });
      }
    }
    ketQua.push({
      cungSo: cung.cungSo,
      tenCung: cung.cungChu ?? cung.cungTen,
      tuoiTu,
      tuoiDen,
      ketQua: trongVan,
    });
  }
  return ketQua.sort((a, b) => a.tuoiTu - b.tuoiTu);
}
