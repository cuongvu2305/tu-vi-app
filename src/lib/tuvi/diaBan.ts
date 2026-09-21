/**
 * Địa bàn 12 cung: cấu trúc, cung Mệnh/Thân, đại/tiểu hạn, đặc tính miếu/vượng/đắc/hãm.
 * Ported from Python lasotuvi (DiaBan.py), MIT license, (c) 2016 doanguyen.
 * https://github.com/doanguyen/lasotuvi
 */
import { diaChi, dichCung, khoangCachCung } from "./canChi";
import type { Sao } from "./sao";

export interface CungDiaBan {
  cungSo: number;
  hanhCung: string;
  cungTen: string;
  cungSao: Sao[];
  cungAmDuong: 1 | -1;
  cungThan: boolean;
  cungChu?: string;
  cungDaiHan?: number;
  cungTieuHan?: string;
  tuanTrung?: boolean;
  trietLo?: boolean;
}

const hanhCungBang = [
  "",
  "Thủy",
  "Thổ",
  "Mộc",
  "Mộc",
  "Thổ",
  "Hỏa",
  "Hỏa",
  "Thổ",
  "Kim",
  "Kim",
  "Thổ",
  "Thủy",
];

function taoCungDiaBan(cungID: number): CungDiaBan {
  return {
    cungSo: cungID,
    hanhCung: hanhCungBang[cungID],
    cungTen: diaChi[cungID].tenChi,
    cungSao: [],
    cungAmDuong: cungID % 2 === 0 ? -1 : 1,
    cungThan: false,
  };
}

/** Bảng miếu (M)/vượng (V)/đắc (Đ)/bình (B)/hãm (H) theo sao, tính theo vị trí cung 1..12. */
const maTranDacTinh: Record<number, (string | null)[]> = {
  1: [null, "B", "Đ", "M", "B", "V", "M", "M", "Đ", "M", "B", "V", "B"],
  2: [null, "V", "Đ", "V", "H", "M", "H", "V", "Đ", "V", "H", "M", "H"],
  3: [null, "V", "H", "M", "Đ", "H", "Đ", "H", "H", "M", "H", "H", "Đ"],
  4: [null, "V", "M", "V", "Đ", "M", "H", "V", "M", "V", "Đ", "M", "H"],
  5: [null, "H", "Đ", "V", "V", "V", "M", "M", "Đ", "H", "H", "H", "H"],
  6: [null, "Đ", "Đ", "H", "M", "M", "V", "Đ", "Đ", "V", "M", "M", "H"],
  8: [null, "V", "Đ", "H", "H", "H", "H", "H", "Đ", "V", "M", "M", "M"],
  9: [null, "H", "M", "Đ", "H", "V", "H", "H", "M", "Đ", "H", "V", "H"],
  10: [null, "V", "H", "V", "M", "H", "H", "V", "H", "Đ", "M", "H", "Đ"],
  11: [null, "V", "Đ", "M", "H", "V", "Đ", "V", "Đ", "M", "H", "V", "Đ"],
  12: [null, "V", "Đ", "V", "V", "M", "H", "M", "Đ", "V", "H", "M", "H"],
  13: [null, "M", "Đ", "M", "H", "H", "V", "M", "Đ", "M", "H", "H", "V"],
  14: [null, "M", "V", "H", "H", "Đ", "H", "M", "V", "H", "H", "Đ", "H"],
  51: [null, "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"],
  52: [null, "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"],
  55: [null, "H", "H", "Đ", "Đ", "Đ", "Đ", "Đ", "H", "H", "H", "H", "H"],
  56: [null, "H", "H", "Đ", "Đ", "Đ", "Đ", "Đ", "H", "H", "H", "H", "H"],
  57: [null, "H", "Đ", "H", "Đ", "H", "Đ", "H", "Đ", "H", "H", "Đ", "Đ"],
  58: [null, "H", "Đ", "H", "Đ", "H", "Đ", "H", "Đ", "H", "H", "Đ", "Đ"],
  53: [null, "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"],
  54: [null, "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"],
  95: [null, null, "Đ", null, null, "Đ", null, null, "Đ", null, null, "Đ", null],
  36: [null, null, null, "Đ", "Đ", null, null, null, null, "Đ", "Đ", null, null],
  30: [null, null, null, "Đ", "Đ", null, null, null, null, "Đ", "Đ", null, null],
  69: [null, "Đ", "Đ", null, "Đ", null, null, "Đ", "Đ", null, "Đ", null, null],
  70: [null, "Đ", "Đ", null, "Đ", null, null, "Đ", "Đ", null, "Đ", null, null],
  98: [null, null, null, "Đ", null, null, "Đ", null, null, null, null, null, null],
  73: [null, null, null, "Đ", "Đ", null, null, null, null, "Đ", "Đ", null, null],
  74: [null, null, null, "Đ", "Đ", null, null, null, null, null, "Đ", "Đ", null],
};

function ganDacTinh(viTriDiaBan: number, sao: Sao): void {
  const hang = maTranDacTinh[sao.id];
  if (!hang) return;
  const dt = hang[viTriDiaBan];
  if (dt === "M" || dt === "V" || dt === "Đ" || dt === "B" || dt === "H") {
    sao.dacTinh = dt;
  }
}

export const tenCung12 = [
  "Mệnh",
  "Phụ mẫu",
  "Phúc đức",
  "Điền trạch",
  "Quan lộc",
  "Nô bộc",
  "Thiên di",
  "Tật Ách",
  "Tài Bạch",
  "Tử tức",
  "Phu thê",
  "Huynh đệ",
] as const;

export class DiaBan {
  thangSinhAmLich: number;
  gioSinhAmLich: number;
  thapNhiCung: CungDiaBan[];
  cungMenh!: number;
  cungThan!: number;
  cungNoboc!: number;
  cungTatAch!: number;

  constructor(thangSinhAmLich: number, gioSinhAmLich: number) {
    this.thangSinhAmLich = thangSinhAmLich;
    this.gioSinhAmLich = gioSinhAmLich;
    this.thapNhiCung = Array.from({ length: 13 }, (_, i) => taoCungDiaBan(i));
    this.nhapCungChu();
    this.nhapCungThan();
  }

  private nhapCungChu(): void {
    this.cungThan = dichCung(3, this.thangSinhAmLich - 1, this.gioSinhAmLich - 1);
    this.cungMenh = dichCung(3, this.thangSinhAmLich - 1, -this.gioSinhAmLich + 1);
    this.cungNoboc = dichCung(this.cungMenh, 5);
    this.cungTatAch = dichCung(this.cungMenh, 7);

    const cungChuThapNhiCung: { tenCung: string; cungSoDiaBan: number }[] = tenCung12.map(
      (ten, idx) => ({
        tenCung: ten,
        cungSoDiaBan: dichCung(this.cungMenh, idx),
      }),
    );
    for (const cc of cungChuThapNhiCung) {
      this.thapNhiCung[cc.cungSoDiaBan].cungChu = cc.tenCung;
    }
  }

  private nhapCungThan(): void {
    this.thapNhiCung[this.cungThan].cungThan = true;
  }

  nhapDaiHan(cucSo: number, gioiTinh: 1 | -1): this {
    for (const cung of this.thapNhiCung.slice(1)) {
      const khoangCach = khoangCachCung(cung.cungSo, this.cungMenh, gioiTinh);
      cung.cungDaiHan = cucSo + khoangCach * 10;
    }
    return this;
  }

  nhapTieuHan(khoiTieuHan: number, gioiTinh: 1 | -1, chiNam: number): this {
    const viTriCungTy1 = dichCung(khoiTieuHan, -gioiTinh * (chiNam - 1));
    for (const cung of this.thapNhiCung.slice(1)) {
      const khoangCach = khoangCachCung(cung.cungSo, viTriCungTy1, gioiTinh);
      cung.cungTieuHan = diaChi[khoangCach + 1].tenChi;
    }
    return this;
  }

  nhapSao(cungSo: number, ...saos: Sao[]): this {
    for (const sao of saos) {
      // Các hằng số sao trong `sao.ts` là singleton dùng chung giữa mọi lần lập lá số,
      // nên phải nhân bản trước khi gán đặc tính riêng cho lá số này (tránh rò rỉ state
      // giữa các lần gọi lapLaSo, tương đương việc bản gốc Python dùng sao.__dict__ snapshot).
      const banSao: Sao = { ...sao };
      ganDacTinh(cungSo, banSao);
      this.thapNhiCung[cungSo].cungSao.push(banSao);
    }
    return this;
  }

  nhapTuan(cung1: number, cung2: number): this {
    this.thapNhiCung[cung1].tuanTrung = true;
    this.thapNhiCung[cung2].tuanTrung = true;
    return this;
  }

  nhapTriet(cung1: number, cung2: number): this {
    this.thapNhiCung[cung1].trietLo = true;
    this.thapNhiCung[cung2].trietLo = true;
    return this;
  }
}
