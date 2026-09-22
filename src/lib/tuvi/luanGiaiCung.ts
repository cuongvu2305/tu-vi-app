/**
 * Luận giải theo 12 cung dựa trên chương "Luận về 12 cung" của giáo trình
 * "Tử Vi Luận Giải Đoán Số Mệnh" (Đỗ Đức Đạt). Nội dung được diễn đạt lại,
 * chuyển thành bộ quy tắc: mỗi quy tắc khớp khi các sao trong cung thỏa điều kiện.
 *
 * Lưu ý: đây là tri thức tham khảo về Tử Vi, không phải kết luận chắc chắn về tương lai
 * hay chẩn đoán y khoa/pháp lý.
 */
import type { CungDiaBan } from "./diaBan";

export type MucDo = "cat" | "hung" | "luuY";

export interface QuyTac {
  /** Tất cả các sao này phải có trong cung. */
  du?: string[];
  /** Có ít nhất `it` (mặc định 1) sao trong nhóm này. */
  nhom?: string[];
  it?: number;
  /** Tất cả các sao này phải có mặt VÀ ở thế hãm địa. */
  ham?: string[];
  /** Ít nhất một sao trong nhóm có mặt VÀ ở thế hãm địa. */
  hamMot?: string[];
  /** Tất cả các sao này phải có mặt VÀ ở thế miếu/vượng/đắc. */
  dac?: string[];
  /** Cung địa bàn (1 = Tý ... 12 = Hợi) phải nằm trong danh sách. */
  viTri?: number[];
  /** Cung phải nằm trong Tuần hoặc Triệt. */
  tuanTriet?: boolean;
  mucDo: MucDo;
  noiDung: string;
}

export interface LuanCung {
  tongQuan: string;
  luuY: string[];
  quyTac: QuyTac[];
}

const SAO_SAT = ["Kình dương", "Đà la", "Hỏa tinh", "Linh tinh"];
const KHONG_KIEP = ["Địa không", "Địa kiếp"];
const HAO = ["Tiểu hao", "Đại hao"];

export const luanGiaiCung: Record<string, LuanCung> = {
  "Mệnh": {
    tongQuan:
      "Mệnh là gốc của lá số, liên hệ mật thiết với mọi cung khác: thể chất, tướng mạo, tính tình, chuyên môn, quyền lộc, tai họa, bệnh tật và thăng trầm đều bắt đầu từ đây.",
    luuY: [
      "Tướng mạo thực tế không nhất thiết khớp hoàn toàn với ý nghĩa sao; cần xem cả tướng số lẫn lá số.",
    ],
    quyTac: [
      { nhom: ["Thiên tướng", "Thái âm", "Thiên phủ", "Tử vi", "Văn Khúc", "Văn xương", "Long trì", "Phượng các", "Thanh long", "Đào hoa", "Hồng loan", "Thiên hình"], it: 2, mucDo: "luuY", noiDung: "Có nhiều sao chỉ nét ưa nhìn, duyên dáng về ngoại hình." },
      { nhom: ["Tham lang", "Thiên riêu", "Thai", "Đào hoa", "Mộc dục", "Thiên không"], it: 2, mucDo: "luuY", noiDung: "Có nhiều sao thiên về tình cảm, đào hoa; cần chú ý giữ chừng mực trong tình cảm." },
      { du: ["Thiên đồng", "Thiên riêu"], mucDo: "luuY", noiDung: "Thiên đồng gặp Thiên riêu: tình cảm dễ thay đổi, hay dỗi hờn." },
      { nhom: ["Tử vi", "Thiên phủ", "Thiên hình", "Thiên đức", "Nguyệt đức", "Long đức", "Phúc đức", "Hóa kỵ", "Lộc tồn"], it: 2, mucDo: "luuY", noiDung: "Có các sao giúp tiết chế, kín đáo trong chuyện tình cảm." },
      { nhom: ["Lưu hà", "Bạch hổ", "Thái tuế", "Tấu thư", "Văn xương", "Văn Khúc", "Hóa khoa", "Cự môn"], it: 2, mucDo: "cat", noiDung: "Có các sao về ăn nói: nói năng lưu loát, có khiếu hùng biện, thuyết phục." },
      { nhom: ["Thiên đồng", "Thiên trù", "Hóa lộc", "Lực sĩ", "Thiên tướng"], it: 2, mucDo: "luuY", noiDung: "Có các sao về ẩm thực: thích ăn ngon, sành ăn uống." },
      { nhom: ["Hóa kỵ", "Thiên hình", "Liêm trinh", "Thiên cơ", "Tham lang", "Phá quân", "Cự môn", "Phục binh", "Thiên không"], it: 2, mucDo: "luuY", noiDung: "Có nhiều sao chỉ tính hay ghen, đa nghi trong quan hệ." },
      { nhom: [...KHONG_KIEP, "Cự môn", "Hóa kỵ", "Cô thần", "Quả tú", "Đẩu quân", "Lộc tồn"], it: 3, mucDo: "luuY", noiDung: "Có các sao chỉ nét tính toán, dè dặt về tiền bạc, dễ bị cho là kẹt sỉ." },
      { nhom: ["Hóa kỵ", "Đà la", "Thái tuế", "Phục binh", "Lưu hà"], it: 2, mucDo: "luuY", noiDung: "Có các sao chỉ tính hay nói nhiều, dễ mất lòng vì lời nói." },
      { du: ["Cô thần"], mucDo: "luuY", noiDung: "Cô thần: cá tính mạnh, thích tự lập, không muốn dựa dẫm." },
    ],
  },

  "Phụ mẫu": {
    tongQuan:
      "Gia đình là cái nôi hình thành nhân cách. Cung này nói về phúc ấm, mối quan hệ với cha mẹ và bề trên. Thái Dương đại diện cha, Thái âm đại diện mẹ, dù nằm ở cung nào; cung nhị hợp với Phụ mẫu là bên nhà bố mẹ vợ/chồng.",
    luuY: [
      "Cha hay mẹ mất trước chỉ nên xem để tham khảo; muốn chính xác phải xem lá số của chính người đó.",
      "Phụ mẫu đẹp nhưng Tật Ách có Hóa kỵ thì khó hưởng của cải cha mẹ để lại.",
      "Cần các sao thọ, thủ chiếu ở thế miếu/vượng thì cha mẹ mới sống lâu và con được nhờ ân đức.",
    ],
    quyTac: [
      { du: ["Thiên khôi", "Thiên việt"], mucDo: "cat", noiDung: "Khôi Việt: cha mẹ có địa vị, được bề trên nâng đỡ." },
      { nhom: ["Văn xương", "Văn Khúc", "Tả phù", "Hữu bật"], it: 2, mucDo: "cat", noiDung: "Xương Khúc, Tả Hữu: quan hệ với cha mẹ thuận hòa, được nhiều thuận lợi." },
      { du: ["Thiên cơ", "Hóa kỵ"], viTri: [12, 1, 2], mucDo: "hung", noiDung: "Thiên cơ gặp Hóa kỵ ở Hợi/Tý/Sửu: con và cha mẹ dễ xung khắc." },
      { du: ["Thiên cơ", "Thiên lương"], mucDo: "cat", noiDung: "Cơ Lương hội họp: quan hệ tốt đẹp, được che chở." },
      { du: ["Lộc tồn"], nhom: KHONG_KIEP, mucDo: "hung", noiDung: "Lộc tồn gặp Không/Kiếp: dễ hao tán, khó giữ gia sản của cha mẹ." },
      { du: ["Hữu bật", "Thiên tướng"], mucDo: "cat", noiDung: "Bật, Tướng: xuất thân gia đình nền nếp, có danh giá." },
      { nhom: ["Hỏa tinh", "Linh tinh"], mucDo: "hung", noiDung: "Hỏa/Linh: dễ hình khắc, cô đơn, ít gần gũi cha mẹ." },
      { nhom: ["Kình dương", "Đà la"], mucDo: "hung", noiDung: "Kình/Đà: cha mẹ và con dễ bất đồng quan điểm." },
      { nhom: ["Cự môn", "Liêm trinh", "Vũ khúc", "Thất sát", "Phá quân", "Tham lang"], it: 2, mucDo: "luuY", noiDung: "Nhóm sao mạnh, cứng: dễ xa cách, chia ly hoặc ít được cha mẹ nuôi dưỡng sát sao." },
      { ham: ["Cự môn"], mucDo: "hung", noiDung: "Cự môn hãm: dễ xa cách chia ly hoặc khó hòa hợp với cha mẹ." },
      { du: ["Phá quân"], mucDo: "luuY", noiDung: "Phá quân: dễ xa cách, cha mẹ khó nhận hoặc ít gắn bó." },
      { nhom: HAO, mucDo: "luuY", noiDung: "Hao tinh: dễ xa cách hoặc hao tổn liên quan đến cha mẹ." },
      { dac: ["Thiên lương"], mucDo: "cat", noiDung: "Thiên lương vượng: cha mẹ hưởng phúc, con được che chở." },
      { tuanTriet: true, mucDo: "luuY", noiDung: "Có Tuần/Triệt: theo giáo trình, xa quê hoặc ra nước ngoài lập nghiệp thường dễ làm nên." },
    ],
  },

  "Phúc đức": {
    tongQuan:
      "Cung Phúc đức thể hiện đời sống tinh thần, phúc phần, họ hàng, tổ tiên và mồ mả. Cây có cội, sông có nguồn: đây là gốc của cơ may cho các cung khác, đặc biệt là Tài bạch (cung xung chiếu).",
    luuY: [
      "Thân cư Phúc đức: cần đặc biệt chú trọng nội tộc, việc thờ cúng và truyền thống gia đình.",
      "Người có cung Phúc đẹp thường khó đi định cư nước ngoài, dễ gặp trục trặc.",
    ],
    quyTac: [
      { du: ["Thiên đồng", "Thiên phúc"], mucDo: "cat", noiDung: "Đồng gặp Thiên phúc: tinh thần thư thái, ít tai họa; nếu Thiên đồng bị Hóa kỵ, Thiên phúc giúp giảm phiền não." },
      { du: ["Thiên phúc"], mucDo: "cat", noiDung: "Thiên phúc: tâm ý vui vẻ, ít lo âu, khó khăn tinh thần được hóa giải." },
      { du: ["Thiên đồng"], nhom: ["Cự môn"], mucDo: "hung", noiDung: "Thiên đồng đi cùng Cự môn: không giữ được cái an nhàn, phúc phần kém đi." },
      { du: ["Cô thần"], mucDo: "luuY", noiDung: "Cô thần: cá tính mạnh, thích tự lập; dễ cô độc." },
      { nhom: ["Thiên khốc", "Thiên hư"], mucDo: "luuY", noiDung: "Khốc/Hư: tâm trạng dễ bi quan." },
      { nhom: ["Địa kiếp", "Địa không"], mucDo: "luuY", noiDung: "Không/Kiếp: đời sống tinh thần nhiều biến động, cần tu dưỡng để tâm an." },
      { du: ["Thiên đồng", "Hóa kỵ", "Phá toái"], mucDo: "hung", noiDung: "Đồng, Kỵ, Phá toái: dễ thất tình, sầu khổ." },
      { nhom: ["Thiên đức", "Nguyệt đức", "Long đức", "Phúc đức"], it: 2, mucDo: "cat", noiDung: "Nhiều sao Đức: tai ách được giải trừ, tiết chế được tính buông thả." },
      { nhom: ["Tang môn", "Bạch hổ", "Điếu khách"], it: 2, mucDo: "luuY", noiDung: "Tang/Hổ/Khách: họ hàng nhiều biến cố, nên chú ý sức khỏe người thân." },
    ],
  },

  "Điền trạch": {
    tongQuan:
      "Điền trạch là nơi cất giữ tiền, thể hiện sự giàu có thật sự và tình cảnh an cư. Cung này xung chiếu với Tử tức, nên hai cung ảnh hưởng nhau về chuyện con cái.",
    luuY: [
      "Đang mong con hoặc chuyện con cái chưa thuận, nên xem lại nhà ở và phong thủy.",
      "Điền trạch được xem là cường cung của nữ mệnh: nơi ở, sự an lạc lúc trung niên và sự chăm lo của con cái.",
    ],
    quyTac: [
      { du: ["Phá quân"], mucDo: "hung", noiDung: "Phá quân: dễ tán tài, khó giữ tài sản tổ truyền." },
      { du: ["Tham lang", "Thiên riêu"], mucDo: "hung", noiDung: "Tham lang, Thiên riêu: gia đạo dễ thất vận về nhà cửa, tài sản." },
      { du: ["Cô thần"], mucDo: "luuY", noiDung: "Cô thần: chủ về giữ nhà, ít người chung sống." },
      { du: ["Tang môn", "Quốc ấn", "Hóa lộc"], mucDo: "cat", noiDung: "Tang môn, Quốc ấn, Hóa lộc: có khả năng được thừa hưởng tài sản tổ truyền." },
      { nhom: ["Đào hoa", "Hồng loan"], du: ["Thiên quý", "Ân quang"], mucDo: "cat", noiDung: "Đào Hồng cùng Quý Ân: có thể được người thân bên ngoại cho tài sản." },
      { du: ["Cự môn", "Thiên cơ"], mucDo: "cat", noiDung: "Cự Cơ: giàu có, đời sống sung túc." },
      { nhom: ["Thiên phủ", "Vũ khúc"], mucDo: "cat", noiDung: "Thiên phủ, Vũ khúc: nhiều nhà cửa, đất đai." },
      { du: ["Hồng loan"], mucDo: "cat", noiDung: "Hồng loan: ruộng đất, nhà cửa thuận lợi." },
      { nhom: ["Tử vi", "Thiên đồng", "Thái Dương", "Thái âm"], it: 2, mucDo: "cat", noiDung: "Tử vi, Đồng, Nhật, Nguyệt: nhà cửa, tài sản hanh thông." },
      { dac: ["Thiên đồng", "Tham lang"], mucDo: "cat", noiDung: "Đồng, Tham miếu vượng: tay trắng dựng nên cơ nghiệp." },
      { nhom: HAO, du: ["Địa không"], mucDo: "hung", noiDung: "Hao, Địa không: khó giữ vườn ruộng, nhà cửa." },
      { du: ["Tang môn"], nhom: ["Linh tinh", "Hỏa tinh"], mucDo: "hung", noiDung: "Tang môn gặp Linh/Hỏa: cẩn thận hỏa hoạn, chập điện." },
      { du: ["Tang môn", "Bạch hổ"], mucDo: "luuY", noiDung: "Tang môn, Bạch hổ: nhà cửa chỉ vừa đủ ở." },
    ],
  },

  "Quan lộc": {
    tongQuan:
      "Quan lộc chỉ sự nghiệp, công danh và con đường thăng tiến. Cần xem cung có đắc cách, có bị phá cách không. Ngày nay nam nữ đều có thể hưởng chức quyền như nhau.",
    luuY: [
      "Người xưa có câu: thanh quan trung lương lưu danh, hôn quan gian tà tiếng xấu. Lá số cũng phản ánh phẩm chất, đức hạnh.",
    ],
    quyTac: [
      { nhom: ["Lưu hà", "Thái tuế", "Tấu thư", "Hóa khoa", "Thiên hình", "Văn xương", "Văn Khúc", "Thái Dương", "Thái âm", "Thiên khôi", "Thiên việt", "Thiên cơ", "Thiên lương", "Long trì", "Phượng các"], it: 3, mucDo: "luuY", noiDung: "Hợp nghề giảng dạy, giáo dục, học thuật." },
      { nhom: ["Cự môn", "Thái tuế", "Thiên hình", "Hóa kỵ"], it: 2, mucDo: "luuY", noiDung: "Hợp nghề luật, tranh biện." },
      { nhom: ["Phục binh", "Thiên không", "Hóa kỵ", "Tang môn", "Bạch hổ", "Thiên khốc", "Thiên hư"], it: 3, mucDo: "luuY", noiDung: "Hợp con đường chính trị, hành chính công, làm việc với bộ máy." },
      { nhom: ["Thiên tướng", "Tấu thư", "Đà la", "Tả phù", "Hữu bật"], it: 3, mucDo: "luuY", noiDung: "Hợp nghề viết lách, dịch thuật, văn chương." },
      { nhom: ["Tham lang", "Phá quân", "Thiên đồng", "Thiên lương", "Thái âm", "Hóa lộc", "Thiên mã", "Lộc tồn"], it: 3, mucDo: "luuY", noiDung: "Hợp buôn bán, kinh doanh, thương mại." },
      { nhom: ["Thiên cơ", "Thái âm", "Thiên đồng", "Thiên lương", "Thiên tướng", "Thiên y", "Quan phù", "Thiên phúc", "Tả phù", "Hữu bật"], it: 3, mucDo: "luuY", noiDung: "Hợp nghề y, chăm sóc sức khỏe." },
      { nhom: ["Long trì", "Phượng các", "Hóa lộc", "Thiên cơ", "Hồng loan", "Đào hoa"], it: 3, mucDo: "luuY", noiDung: "Hợp nghệ thuật, thẩm mỹ, sáng tạo." },
      { nhom: ["Thái Dương", "Thái âm", "Thiếu dương", "Thiếu âm", "Linh tinh", "Hỏa tinh"], it: 3, mucDo: "luuY", noiDung: "Hợp lĩnh vực điện, ánh sáng, kỹ thuật." },
      { dac: ["Thất sát"], mucDo: "cat", noiDung: "Thất sát đắc/miếu: quyền uy, có thể giữ chức trưởng, hợp lãnh đạo mạnh mẽ." },
      { du: ["Tham lang", "Vũ khúc"], mucDo: "cat", noiDung: "Vũ Tham: công danh đến muộn nhưng bền, hợp con đường kiên trì." },
      { du: ["Thái Dương", "Thái âm"], mucDo: "cat", noiDung: "Nhật Nguyệt cùng cung Quan: chức quyền thuận lợi (nhưng ở Sửu/Mùi thì kém sáng)." },
      { du: ["Thiên quan", "Thiên tướng"], mucDo: "cat", noiDung: "Thiên quan, Thiên tướng: đức trọng tài hiền, được tín nhiệm." },
      { nhom: ["Đào hoa", "Hồng loan"], mucDo: "cat", noiDung: "Đào/Hồng: công danh, tiếng tăm đến sớm." },
      { du: ["Tấu thư", "Bác sỹ"], mucDo: "cat", noiDung: "Tấu thư, Bác sỹ: rộng đường học vấn, hợp con nhà nề nếp." },
      { du: ["Phong cáo", "Thiên tướng"], mucDo: "cat", noiDung: "Phong cáo, Thiên tướng: được lộc nước, có danh vị." },
      { du: ["Địa không", "Thiên tướng"], mucDo: "hung", noiDung: "Thiên tướng gặp Không: sự nghiệp gian truân, nhiều trắc trở." },
      { du: ["Địa kiếp", "Thiên tướng"], mucDo: "hung", noiDung: "Thiên tướng gặp Kiếp: sự nghiệp gian truân, nhiều trắc trở." },
      { du: ["Thiên khôi", "Thiên việt"], mucDo: "cat", noiDung: "Khôi Việt: được quý nhân nâng đỡ trong sự nghiệp." },
      { du: ["Tả phù", "Hữu bật"], mucDo: "cat", noiDung: "Tả Hữu: có người trợ lực đắc lực." },
      { nhom: ["Văn xương", "Văn Khúc", "Long trì", "Phượng các"], it: 2, mucDo: "cat", noiDung: "Xương Khúc, Long Phượng: công danh thiên về văn chương, học vấn." },
      { nhom: ["Vũ khúc", "Tham lang", "Thất sát", "Phá quân"], it: 2, mucDo: "luuY", noiDung: "Vũ Tham Sát Phá: công danh thiên về võ nghiệp, hành động, xông pha." },
      { du: ["Phá quân", "Phá toái"], mucDo: "luuY", noiDung: "Phá quân, Phá toái: ưa mạo hiểm, hợp môi trường nhiều biến động." },
      { nhom: ["Hỏa tinh", "Linh tinh"], du: ["Thiên mã"], mucDo: "luuY", noiDung: "Hỏa/Linh hợp Mã: hợp cơ khí, vận tải, di chuyển." },
      { du: ["Hóa lộc", "Thiên mã"], mucDo: "cat", noiDung: "Lộc Mã: cơ hội tốt, hợp làm ăn, di chuyển." },
    ],
  },

  "Nô bộc": {
    tongQuan:
      "Nô bộc nói về quan hệ với thuộc hạ, đồng nghiệp, bạn bè và người thân quen. Câu cũ: giàu vì bạn, sang vì vợ. Cung này xung chiếu với Huynh đệ nên xem hai cung cùng nhau.",
    luuY: [
      "Cung Nô quá đẹp so với Mệnh, Tài, Quan thì dễ làm trợ lý, cánh tay phải cho người quyền quý.",
      "Nghề bác sĩ, công an, luật sư thường có cung Nô kém; giáo viên, tri thức thường có cung Nô đẹp.",
    ],
    quyTac: [
      { du: ["Hóa quyền"], mucDo: "luuY", noiDung: "Hóa quyền: người dưới hoặc người thân cận có khuynh hướng lấn quyền." },
      { du: ["Đào hoa"], mucDo: "luuY", noiDung: "Đào hoa: quan hệ tình cảm với người quen dễ phức tạp." },
      { du: ["Vũ khúc", "Thiên tướng"], nhom: ["Tả phù", "Hữu bật"], mucDo: "cat", noiDung: "Vũ, Tướng, Tả Hữu: nói được nhiều người nghe, có uy với cấp dưới." },
      { du: ["Phá quân", "Vũ khúc"], mucDo: "hung", noiDung: "Phá quân, Vũ khúc: đề phòng bị phản bội, cần chọn người kỹ." },
      { du: ["Cự môn"], mucDo: "hung", noiDung: "Cự môn: dễ bị oán trách, thị phi từ người dưới hoặc bạn bè." },
      { nhom: ["Kình dương", "Đà la", "Hóa kỵ"], it: 2, mucDo: "hung", noiDung: "Kình/Đà/Kỵ: bạn bè, thuộc hạ khó lường, dễ bất hòa." },
      { nhom: ["Thiên lương", "Thiên cơ"], it: 1, du: ["Tả phù", "Hữu bật"], mucDo: "cat", noiDung: "Cơ Lương với Tả Hữu: kết giao rộng, được nhiều người giúp đỡ." },
      { du: ["Tham lang", "Liêm trinh", "Thiên tướng"], mucDo: "hung", noiDung: "Tham, Liêm, Tướng: tuổi trẻ dễ bôn ba, chuốc oán từ người xung quanh." },
    ],
  },

  "Thiên di": {
    tongQuan:
      "Thiên di cho thấy tài năng khi ra xã hội, cách hành động, quan hệ người với người và cơ hội lập thân. Cung này xung chiếu với Mệnh nên ảnh hưởng qua lại rất đậm.",
    luuY: [
      "Ở Thiên di hay bất kỳ cung nào, sao ở thế miếu/đắc địa mới phát huy tốt: đây là nguyên tắc chung.",
    ],
    quyTac: [
      { du: ["Thiên cơ"], mucDo: "cat", noiDung: "Thiên cơ: ra ngoài gặp quý nhân; ở nhà thì hay có thị phi, ít được coi trọng." },
      { du: ["Tử vi"], nhom: ["Tả phù", "Hữu bật"], mucDo: "cat", noiDung: "Tử vi có Tả/Hữu: ra đời được phò trợ." },
      { du: ["Thiên cơ", "Cự môn"], mucDo: "cat", noiDung: "Cơ, Cự: càng chủ động, di chuyển càng tốt." },
      { du: ["Thiên cơ", "Thiên lương"], mucDo: "cat", noiDung: "Cơ Lương: ra ngoài xứng ý, thuận lợi." },
      { du: ["Thái âm"], mucDo: "cat", noiDung: "Thái âm: xoay sở, làm ăn ngoài xã hội đạt kết quả." },
      { hamMot: SAO_SAT, mucDo: "hung", noiDung: "Sát tinh (Kình/Đà/Hỏa/Linh) ở thế hãm: ra ngoài vất vả, dễ lưu lạc, thân tâm khó an." },
      { dac: ["Thái Dương"], mucDo: "cat", noiDung: "Thái Dương đắc: ra ngoài phát phúc; đừng nên ru rú ở nhà." },
      { du: ["Thiên khôi", "Thiên việt"], mucDo: "cat", noiDung: "Khôi Việt: ra ngoài gặp quý nhân, bạn bè hỗ trợ." },
      { nhom: ["Đào hoa", "Hồng loan", "Hỷ thần", "Hoa cái"], it: 2, mucDo: "luuY", noiDung: "Nhiều sao đào hoa: được yêu mến ngoài xã hội, nhưng dễ vướng tình cảm." },
      { du: ["Hóa lộc", "Thiên mã"], mucDo: "cat", noiDung: "Lộc Mã: có tài lộc từ nơi xa, ngoại tài." },
      { du: ["Vũ khúc", "Tham lang"], mucDo: "cat", noiDung: "Vũ Tham: phát tài ở nơi khác, phương xa." },
      { nhom: ["Văn xương", "Văn Khúc", "Tả phù", "Hữu bật"], it: 2, mucDo: "cat", noiDung: "Xương Khúc, Tả Hữu: gặp quý nhân giúp đỡ khi ra ngoài." },
      { ham: ["Phá quân"], mucDo: "hung", noiDung: "Phá quân hãm: đời hay gặp thị phi ngoài xã hội." },
      { ham: ["Thất sát"], mucDo: "hung", noiDung: "Thất sát hãm: ngoài xã hội hay gặp thị phi, va chạm." },
      { du: ["Cự môn", "Thất sát"], mucDo: "hung", noiDung: "Cự, Sát: bôn ba, lao tâm khổ trí." },
      { nhom: ["Liêm trinh", "Cự môn", "Hóa kỵ"], it: 3, mucDo: "hung", noiDung: "Liêm, Cự, Kỵ: nhiều rắc rối, dễ gặp thị phi." },
      { nhom: ["Phục binh", "Thái tuế", "Thiên hình"], it: 2, mucDo: "hung", noiDung: "Phục binh, Thái tuế, Thiên hình: dễ tranh cạnh, khó vui vẻ." },
      { du: ["Thiên riêu", "Hóa kỵ"], mucDo: "hung", noiDung: "Riêu, Kỵ: ra ngoài dễ bị chê bai, ít được yêu quý." },
      { du: ["Thiên cơ", "Thiên mã"], ham: ["Thiên cơ"], mucDo: "hung", noiDung: "Cơ, Mã hãm: long đong, chạy đôn chạy đáo mà chưa vững." },
      { du: ["Đào hoa", "Thiên mã"], mucDo: "luuY", noiDung: "Đào, Mã: hay giao du, kết bạn rộng." },
      { du: ["Địa không", "Địa kiếp"], mucDo: "hung", noiDung: "Không, Kiếp: đi xa dễ gặp khó khăn, cô đơn, thiếu người thân." },
      { du: ["Quan phù", "Thiên hình"], nhom: ["Thái tuế", "Tuế phá"], mucDo: "hung", noiDung: "Quan phù, Thiên hình, Tuế: ra xa dễ vướng pháp lý, hình ngục." },
    ],
  },

  "Tật Ách": {
    tongQuan:
      "Tật Ách (Giải ách) cho biết tình trạng sức khỏe, bệnh tật và hạn họa. Liều thuốc tốt nhất là nụ cười và sự thanh thản: bệnh tòng khẩu nhập, họa tòng khẩu xuất.",
    luuY: [
      "Cảm xúc ảnh hưởng nội tạng: vui quá hại tim, lo hại tỳ, buồn hại phổi, sợ hại thận, giận hại gan.",
      "Nội dung chỉ mang tính tham khảo theo Tử Vi, không thay thế chẩn đoán và tư vấn của bác sĩ.",
    ],
    quyTac: [
      { du: ["Tử vi"], mucDo: "luuY", noiDung: "Tử vi: chú ý dạ dày, tỳ vị." },
      { du: ["Thiên cơ"], mucDo: "luuY", noiDung: "Thiên cơ: chú ý gan mật, nội tiết." },
      { du: ["Thái Dương"], mucDo: "luuY", noiDung: "Thái Dương: chú ý tim, mắt, tuần hoàn, thần kinh." },
      { du: ["Vũ khúc"], mucDo: "luuY", noiDung: "Vũ khúc: chú ý phổi, khí quản, hô hấp." },
      { du: ["Thiên đồng"], mucDo: "luuY", noiDung: "Thiên đồng: chú ý bàng quang, bài tiết, tiêu hóa." },
      { du: ["Liêm trinh"], mucDo: "luuY", noiDung: "Liêm trinh: chú ý nóng trong, phụ khoa, tuần hoàn." },
      { du: ["Thiên phủ"], mucDo: "luuY", noiDung: "Thiên phủ: chú ý dạ dày, khoang miệng; tuy nhiên sách cũng nói Thiên phủ ở cung Giải thường ít bệnh nặng." },
      { du: ["Thái âm"], mucDo: "luuY", noiDung: "Thái âm: chú ý thận, sinh dục, âm hư." },
      { du: ["Tham lang"], mucDo: "luuY", noiDung: "Tham lang: chú ý gan mật, nội tiết." },
      { du: ["Thiên tướng"], mucDo: "luuY", noiDung: "Thiên tướng: chú ý gan, hệ bài tiết." },
      { du: ["Cự môn"], mucDo: "luuY", noiDung: "Cự môn: chú ý lá lách, các tật ngầm, u nhọt, sẹo." },
      { du: ["Thiên lương"], mucDo: "luuY", noiDung: "Thiên lương: chú ý dạ dày, vùng ngực." },
      { du: ["Thất sát"], mucDo: "luuY", noiDung: "Thất sát: chú ý hô hấp." },
      { du: ["Phá quân"], mucDo: "luuY", noiDung: "Phá quân: chú ý bệnh sinh dục." },
      { du: ["Lộc tồn"], mucDo: "luuY", noiDung: "Lộc tồn: chú ý tỳ vị." },
      { du: ["Thái tuế", "Thiên hình"], mucDo: "hung", noiDung: "Tuế, Hình: cần tránh thị phi, vướng pháp lý." },
    ],
  },

  "Tài Bạch": {
    tongQuan:
      "Tiền là nguồn sống, nên Tài bạch là cung trọng yếu. Tài tốt mà Mệnh dở chỉ đủ an thân; Mệnh vượng mà Tài xấu thì Mệnh cũng bị ảnh hưởng. Tài liên hệ chặt với Phúc đức (xung chiếu) và Điền trạch.",
    luuY: [
      "Phúc đức là gốc cơ may cho Tài: Tài vượng mà Phúc kém thì cơ nghiệp phải gian lao mới thành.",
      "Tài, Phúc tốt mà Điền quá dở dễ không tụ tài; Phúc và Điền đều hãm dù Tài vượng cũng chỉ sung túc một thời.",
    ],
    quyTac: [
      { nhom: ["Tử vi", "Thiên phủ", "Thái âm", "Vũ khúc", "Hóa lộc", "Lộc tồn"], it: 2, mucDo: "cat", noiDung: "Có các sao tài tinh, tiền bạc dễ vào, bền vững." },
      { du: ["Hóa lộc", "Lộc tồn"], mucDo: "cat", noiDung: "Song Lộc: tiền của dồi dào." },
      { du: ["Cự môn"], viTri: [1, 7], mucDo: "luuY", noiDung: "Cự môn ở Tý/Ngọ: tiền đến qua cạnh tranh, kinh doanh khéo (cách 'thạch trung ẩn ngọc')." },
      { du: ["Tham lang"], mucDo: "luuY", noiDung: "Tham lang: hay nhận tiền từ người khác, nguồn tiền không cố định." },
      { du: ["Thiên cơ"], mucDo: "luuY", noiDung: "Thiên cơ: kiếm tiền bằng trí tuệ, khả năng tự kiến tạo." },
      { dac: ["Thái Dương"], mucDo: "cat", noiDung: "Thái Dương miếu/đắc: có khả năng làm giàu." },
      { du: ["Thiên đồng"], mucDo: "luuY", noiDung: "Thiên đồng: tiền đến muộn, phát muộn." },
      { ham: ["Thái âm"], mucDo: "luuY", noiDung: "Thái âm hãm: không giàu lớn nhưng đủ sung túc." },
      { du: ["Liêm trinh"], mucDo: "luuY", noiDung: "Liêm trinh: có thể phát nhanh nhưng dễ đi vào con đường thiếu chính đáng; cần giữ chuẩn mực." },
      { du: ["Thiên tướng"], mucDo: "cat", noiDung: "Thiên tướng: kiếm tiền trung thực, bền." },
      { dac: ["Thất sát"], mucDo: "luuY", noiDung: "Thất sát đắc: có thể phát mạnh nhưng cũng dễ thăng trầm, phát nhanh mất nhanh." },
      { ham: ["Phá quân"], mucDo: "hung", noiDung: "Phá quân hãm: tiền lên xuống thất thường, dễ hao tán." },
      { nhom: HAO, mucDo: "hung", noiDung: "Song Hao: dễ hao tổn, khó giữ tiền." },
      { du: ["Thiên khôi", "Thiên việt"], mucDo: "cat", noiDung: "Khôi Việt: gặp may từ quý nhân trong chuyện tiền bạc." },
      { du: ["Thiên riêu"], mucDo: "hung", noiDung: "Thiên riêu: dễ mê cờ bạc, chi tiêu theo cảm xúc." },
      { nhom: ["Cô thần", "Quả tú"], mucDo: "luuY", noiDung: "Cô/Quả: khó khoáng đạt trong sử dụng tiền, hay lỡ cơ hội." },
      { du: ["Hồng loan", "Thiên hỷ"], mucDo: "luuY", noiDung: "Hồng loan, Thiên hỷ: có lúc phát nhờ may rủi, nhưng không nên dựa vào cờ bạc." },
    ],
  },

  "Tử tức": {
    tongQuan:
      "Tử tức nói về con cái: có con nối dõi hay không, con có đắc lực và làm rạng rỡ tôn tộc hay không, những nỗi buồn về con. Cung này xung chiếu với Điền trạch.",
    luuY: [
      "Mệnh bình thường mà Tử tức tốt thì con thường hơn cha mẹ.",
      "Câu xưa: Mệnh hung mà Tử tức cát thì cuối cùng vẫn cát; Mệnh cát mà Tử tức hung thì cuối cùng vẫn hung.",
    ],
    quyTac: [
      { nhom: [...SAO_SAT, ...KHONG_KIEP, "Hóa kỵ"], it: 3, mucDo: "hung", noiDung: "Nhiều sát tinh ở Tử tức: chuyện con cái nhiều lo toan, dễ hình khắc hoặc con khó dạy." },
      { nhom: ["Tử vi", "Thiên phủ", "Thiên khôi", "Thiên việt", "Văn xương", "Văn Khúc", "Tả phù", "Hữu bật", "Long đức", "Phúc đức", "Thiên đức", "Nguyệt đức"], it: 2, mucDo: "cat", noiDung: "Có thiện tinh, quý tinh: con cái thông tuệ, thành đạt, có tiền đồ." },
      { nhom: ["Vũ khúc", "Thất sát", "Tham lang", "Phá quân", "Địa không", "Kình dương", "Đà la", "Hỏa tinh", "Linh tinh", "Tang môn", "Bạch hổ", "Cô thần", "Quả tú", "Đẩu quân", "Hóa kỵ", "Thiên hình"], it: 3, mucDo: "luuY", noiDung: "Nhiều yếu tố cản trở: đường con cái có thể muộn hoặc gặp khó khăn hơn bình thường." },
      { du: ["Thai", "Thái Dương", "Thái âm"], mucDo: "luuY", noiDung: "Thai cùng Nhật Nguyệt: theo giáo trình có khả năng sinh đôi." },
      { tuanTriet: true, mucDo: "luuY", noiDung: "Có Tuần/Triệt: chuyện con cái dễ chậm hoặc có chuyển biến ngược so với dự đoán." },
    ],
  },

  "Phu thê": {
    tongQuan:
      "Phu Thê cho thấy quan hệ hôn nhân có thuận hòa không, số lần hôn nhân, chia ly hay góa, người bạn đời đảm hay đoảng, giàu hay nghèo. Mệnh bình thường mà cung phối tuyệt đẹp thì nhờ hôn nhân mà khá giả.",
    luuY: [
      "Muốn biết vợ/chồng đảm hay đoảng, giàu hay nghèo: chủ yếu xem cung Phu Thê.",
      "Mệnh tốt, phối cung đẹp nhưng cung xung chiếu (Quan lộc) có Hóa kỵ, Đà la thì vợ chồng dễ sống trong nghi kỵ.",
      "Mệnh và phối cung đều tốt nhưng vận hạn gặp nhiều hung sát tinh xung phá có thể ảnh hưởng hôn nhân.",
    ],
    quyTac: [
      { du: ["Tử vi", "Thiên phủ"], mucDo: "luuY", noiDung: "Tử Phủ đồng cung: nên kết hôn muộn; lấy sớm gặp người hung hãn dễ chia lìa." },
      { du: ["Thiên cơ", "Thiên lương"], mucDo: "cat", noiDung: "Cơ Lương: người bạn đời hiền hậu, thông minh." },
      { hamMot: ["Thái Dương", "Thái âm"], mucDo: "hung", noiDung: "Nhật/Nguyệt hãm ở Phu Thê: khó bền duyên." },
      { hamMot: ["Thái Dương", "Thái âm"], nhom: ["Kình dương", "Hóa kỵ"], mucDo: "hung", noiDung: "Nhật/Nguyệt hãm gặp Kình/Kỵ: dễ ly biệt." },
      { du: ["Cự môn", "Thái Dương"], viTri: [3, 9], mucDo: "hung", noiDung: "Cự Nhật ở Dần/Thân: người bạn đời hay ngang ngạnh, đời sống lứa đôi dễ bất an." },
      { du: ["Tham lang", "Đào hoa", "Hóa lộc"], mucDo: "hung", noiDung: "Tham, Đào, Lộc: dễ có rắc rối tình cảm, thiếu chung thủy." },
      { nhom: ["Cô thần", "Quả tú"], du: ["Hồng loan"], mucDo: "hung", noiDung: "Cô/Quả gặp Hồng loan: dễ cô đơn, góa bụa khi vận hạn xấu." },
      { nhom: KHONG_KIEP, mucDo: "luuY", noiDung: "Không/Kiếp: tình duyên dễ đứt đoạn, dang dở; cần thận trọng." },
    ],
  },

  "Huynh đệ": {
    tongQuan:
      "Cung Huynh đệ (cung Bào) xem quan hệ anh chị em ruột thịt. Vì xung chiếu với Nô bộc, nên kết hợp sao hai cung để hiểu thêm về bạn bè tri kỷ, thuộc hạ và người đồng liêu cộng tác.",
    luuY: [
      "Nên xem cả cung Nô bộc (đối cung) để thấy đầy đủ về quan hệ ngang hàng trong và ngoài gia đình.",
    ],
    quyTac: [
      { nhom: ["Tả phù", "Hữu bật", "Thiên khôi", "Thiên việt", "Thiên tướng", "Thiên lương"], it: 2, mucDo: "cat", noiDung: "Nhiều cát tinh: anh chị em hòa thuận, hỗ trợ nhau." },
      { nhom: [...SAO_SAT, ...KHONG_KIEP, "Hóa kỵ"], it: 2, mucDo: "hung", noiDung: "Sát tinh ở Huynh đệ: anh chị em dễ bất hòa, mỗi người một hướng." },
    ],
  },
};

const DAC_TOT = new Set(["M", "V", "Đ"]);

function saoTrongCung(cung: CungDiaBan, ten: string) {
  return cung.cungSao.find((s) => s.ten === ten);
}

function khopQuyTac(cung: CungDiaBan, q: QuyTac): boolean {
  if (q.viTri && !q.viTri.includes(cung.cungSo)) return false;
  if (q.tuanTriet && !(cung.tuanTrung || cung.trietLo)) return false;
  if (q.du && !q.du.every((t) => saoTrongCung(cung, t))) return false;
  if (q.nhom && q.nhom.length > 0) {
    const dem = q.nhom.filter((t) => saoTrongCung(cung, t)).length;
    if (dem < (q.it ?? 1)) return false;
  }
  if (q.ham && !q.ham.every((t) => saoTrongCung(cung, t)?.dacTinh === "H")) return false;
  if (q.hamMot && !q.hamMot.some((t) => saoTrongCung(cung, t)?.dacTinh === "H")) return false;
  if (q.dac && !q.dac.every((t) => DAC_TOT.has(saoTrongCung(cung, t)?.dacTinh ?? ""))) return false;
  return true;
}

export interface KetQuaCung {
  tongQuan: string;
  luuY: string[];
  cat: string[];
  hung: string[];
  ghiChu: string[];
}

/** Áp dụng bộ quy tắc của giáo trình lên một cung cụ thể của lá số. */
export function danhGiaCung(cung: CungDiaBan, tenCung: string): KetQuaCung | null {
  const luan = luanGiaiCung[tenCung];
  if (!luan) return null;
  const cat: string[] = [];
  const hung: string[] = [];
  const ghiChu: string[] = [];
  for (const q of luan.quyTac) {
    if (!khopQuyTac(cung, q)) continue;
    const dich = q.mucDo === "cat" ? cat : q.mucDo === "hung" ? hung : ghiChu;
    if (!dich.includes(q.noiDung)) dich.push(q.noiDung);
  }
  return { tongQuan: luan.tongQuan, luuY: luan.luuY, cat, hung, ghiChu };
}
