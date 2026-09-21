/**
 * Nội dung luận giải cơ bản cho 12 cung và 14 chính tinh.
 * Đây là nội dung tổng hợp/biên soạn mới (không port từ lasotuvi — thư viện gốc
 * chỉ cung cấp thuật toán an sao, không có phần luận giải).
 */

export const yNghiaCung: Record<string, string> = {
  "Mệnh": "Cung phản ánh bản chất, tính cách, tư chất và vận mệnh tổng quát của một đời người.",
  "Phụ mẫu": "Cung nói về quan hệ với cha mẹ, bề trên, cấp trên và phúc ấm được thừa hưởng.",
  "Phúc đức": "Cung thể hiện đời sống tinh thần, phúc phần, sự an nhàn và cả di truyền/phúc đức tổ tiên.",
  "Điền trạch": "Cung liên quan đến nhà cửa, đất đai, tài sản cố định và môi trường sống.",
  "Quan lộc": "Cung nói về sự nghiệp, công danh, con đường thăng tiến trong công việc.",
  "Nô bộc": "Cung phản ánh quan hệ bạn bè, đồng nghiệp, người giúp việc và các mối quan hệ ngang hàng.",
  "Thiên di": "Cung nói về việc đi xa, thay đổi môi trường sống/làm việc, các cơ hội và rủi ro khi ra ngoài xã hội.",
  "Tật Ách": "Cung thể hiện sức khỏe, bệnh tật và những vấn đề về thân thể.",
  "Tài Bạch": "Cung phản ánh tiền bạc, khả năng kiếm tiền và quản lý tài chính.",
  "Tử tức": "Cung nói về con cái, khả năng sinh sản và quan hệ với con cháu.",
  "Phu thê": "Cung phản ánh hôn nhân, tình duyên và người bạn đời.",
  "Huynh đệ": "Cung nói về anh chị em ruột thịt và quan hệ với những người cùng thế hệ trong gia đình.",
};

export interface LuanGiaiSao {
  tomTat: string;
  tot: string;
  xau: string;
}

/** Luận giải tổng quát theo từng chính tinh — áp dụng ý nghĩa của sao khi luận cho bất kỳ cung nào nó đóng. */
export const luanGiaiChinhTinh: Record<string, LuanGiaiSao> = {
  "Tử vi": {
    tomTat: "Đế tinh, chủ về quyền uy, lãnh đạo, tự tôn và khả năng quy tụ người khác.",
    tot: "Khi đắc địa: có khí chất lãnh đạo, được người khác nể trọng, sự nghiệp vững vàng.",
    xau: "Khi hãm địa hoặc vô chính diệu phù trợ: dễ cô độc, bảo thủ, tự cao quá mức, thiếu người hỗ trợ.",
  },
  "Liêm trinh": {
    tomTat: "Sao chủ về nguyên tắc, quyết đoán, mang cả hai mặt chính trực và cực đoan.",
    tot: "Đắc địa: cương trực, quyết đoán, giỏi xử lý công việc phức tạp, có uy trong tập thể.",
    xau: "Hãm địa: nóng nảy, dễ vướng thị phi, kiện tụng, quan hệ dễ căng thẳng.",
  },
  "Thiên đồng": {
    tomTat: "Phúc tinh, chủ về sự hiền hòa, an nhàn, tình cảm và hưởng thụ cuộc sống.",
    tot: "Đắc địa: tính tình ôn hòa, dễ được quý mến, cuộc sống êm đềm, ít sóng gió.",
    xau: "Hãm địa: thiếu ý chí phấn đấu, dễ ỷ lại, an phận quá mức dẫn đến trì trệ.",
  },
  "Vũ khúc": {
    tomTat: "Tài tinh, chủ về ý chí, quyết đoán trong tài chính và công việc thực tế.",
    tot: "Đắc địa: giỏi kiếm tiền, quản lý tài chính tốt, làm việc quyết đoán, hiệu quả.",
    xau: "Hãm địa: tính khí cứng nhắc, dễ vì tiền mà cô độc, quan hệ tình cảm trắc trở.",
  },
  "Thái Dương": {
    tomTat: "Chủ về danh vọng, sự nghiệp, năng lượng dương và ảnh hưởng tới người khác (đặc biệt nam giới/cha).",
    tot: "Đắc địa (ban ngày): sự nghiệp rạng rỡ, hào phóng, được nhiều người biết đến và giúp đỡ.",
    xau: "Hãm địa (ban đêm): vất vả trong sự nghiệp, dễ hữu danh vô thực, sức khỏe mắt/tim cần chú ý.",
  },
  "Thiên cơ": {
    tomTat: "Cơ mưu tinh, chủ về trí tuệ, sự linh hoạt, khả năng tính toán và thích nghi.",
    tot: "Đắc địa: thông minh, nhanh nhạy, giỏi lập kế hoạch, thích hợp với công việc trí óc.",
    xau: "Hãm địa: đa mưu nhưng thiếu kiên định, dễ thay đổi, lo nghĩ nhiều gây hao tổn tinh thần.",
  },
  "Thiên phủ": {
    tomTat: "Kho tàng tinh, chủ về sự ổn định, khả năng tích lũy, tính cẩn trọng và bao dung.",
    tot: "Đắc địa: có khả năng quản lý, tích lũy tài sản tốt, được tin cậy, cuộc sống ổn định.",
    xau: "Hãm địa/cô đơn: dễ bảo thủ, cứng nhắc, thiếu quyết đoán khi cần đổi mới.",
  },
  "Thái âm": {
    tomTat: "Chủ về sự tinh tế, tình cảm, nội tâm và liên quan tới nữ giới/mẹ, tài sản âm (bất động sản, tích lũy).",
    tot: "Đắc địa (ban đêm): tình cảm sâu sắc, tinh tế, có duyên với tài lộc và bất động sản.",
    xau: "Hãm địa: đa sầu đa cảm, dễ u uất, tài vận không ổn định, vất vả về đường gia đạo.",
  },
  "Tham lang": {
    tomTat: "Đào hoa tinh, chủ về tham vọng, quảng giao, đa tài nhưng cũng đa dục.",
    tot: "Đắc địa: năng động, giỏi giao tiếp, nhiều tài lẻ, có duyên trong kinh doanh/đối ngoại.",
    xau: "Hãm địa: dễ sa vào hưởng lạc, thiếu kiên định, đường tình duyên phức tạp.",
  },
  "Cự môn": {
    tomTat: "Ám tinh, chủ về khẩu tài, tranh biện nhưng cũng dễ thị phi, nghi kỵ.",
    tot: "Đắc địa: ăn nói sắc sảo, giỏi thuyết phục, phù hợp nghề nghiệp liên quan đến ngôn luận, luật, giảng dạy.",
    xau: "Hãm địa: dễ vướng lời qua tiếng lại, hiềm khích, nghi ngờ người khác, khó giữ hòa khí.",
  },
  "Thiên tướng": {
    tomTat: "Ấn tinh, chủ về sự trung thành, hỗ trợ, khéo léo trong đối nhân xử thế.",
    tot: "Đắc địa: được quý nhân phù trợ, giỏi làm cầu nối, đáng tin cậy, hợp làm tham mưu/quản lý.",
    xau: "Hãm địa hoặc gặp sát tinh: dễ phụ thuộc người khác, thiếu chính kiến riêng.",
  },
  "Thiên lương": {
    tomTat: "Ấm tinh, chủ về sự che chở, nguyên tắc, khả năng giải quyết khó khăn/hóa giải tai họa.",
    tot: "Đắc địa: nhân hậu, có uy tín, giỏi cố vấn/giải quyết vấn đề, thường gặp may khi hoạn nạn.",
    xau: "Hãm địa: dễ cô độc, khó tính, đôi khi lạnh lùng, xa cách với người xung quanh.",
  },
  "Thất sát": {
    tomTat: "Sát tinh chủ về uy quyền, quyết đoán mạnh mẽ, thích hành động và đương đầu thử thách.",
    tot: "Đắc địa: quả cảm, quyết đoán, có chí lớn, thích hợp lập nghiệp riêng, chỉ huy.",
    xau: "Hãm địa: dễ nóng vội, liều lĩnh, cuộc đời nhiều biến động, dễ xung đột.",
  },
  "Phá quân": {
    tomTat: "Sát tinh chủ về sự phá cách, thay đổi, dám nghĩ dám làm nhưng cũng dễ bất ổn.",
    tot: "Đắc địa: dám đột phá, tiên phong, thích hợp khởi nghiệp, tạo dựng cái mới.",
    xau: "Hãm địa: hao tốn tiền của, đời sống nhiều xáo trộn, quan hệ gia đình dễ sóng gió.",
  },
};

const dacTinhMoTa: Record<string, string> = {
  M: "miếu địa (rất vượng)",
  V: "vượng địa (vượng)",
  Đ: "đắc địa (tốt)",
  B: "bình hòa (trung bình)",
  H: "hãm địa (kém)",
};

export function moTaDacTinh(dacTinh?: string): string | null {
  if (!dacTinh) return null;
  return dacTinhMoTa[dacTinh] ?? null;
}
