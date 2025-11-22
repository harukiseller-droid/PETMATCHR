# Hướng Dẫn Quản Trị Viên: Quy Trình Xử Lý Dữ Liệu & Tạo Nội Dung

Tài liệu này hướng dẫn chi tiết các bước để xử lý dữ liệu thô, tạo danh sách trang (matrix), và tự động tạo nội dung cho website PetMatchr.

## Tổng Quan Quy Trình

1.  **Parse Data:** Chuyển đổi dữ liệu thô từ `INPUT_DATA_RAW` sang định dạng chuẩn JSON trong `input_data`.
2.  **Generate Matrix:** Tạo file "bản vẽ" (`pageMatrix.json`) chứa danh sách tất cả các trang cần tạo.
3.  **Generate Content:** Chạy AI để viết nội dung cho từng trang dựa trên bản vẽ.

---

## Bước 1: Parse Dữ Liệu Thô (Parse Raw Data)

Bước này lấy các file Markdown (`.md`) từ thư mục `INPUT_DATA_RAW` và chuyển đổi chúng thành các file JSON có cấu trúc trong thư mục `input_data`.

**Khi nào cần chạy:**
*   Khi bạn cập nhật nội dung trong `INPUT_DATA_RAW` (ví dụ: thêm giống chó mới, cập nhật giá cả, thêm bệnh mới).

**Cách thực hiện:**

1.  Mở Terminal (Command Prompt hoặc PowerShell) tại thư mục gốc của dự án.
2.  Chạy lệnh sau:

```bash
npx ts-node scripts/parse-raw-data.ts
```

**Kết quả:**
*   Các file JSON trong thư mục `input_data` sẽ được cập nhật (ví dụ: `breeds.json`, `costs.json`, `problems.json`, v.v.).
*   Màn hình sẽ hiển thị các thông báo như "Parsing popularity...", "Parsing health problems...", "Done!".

---

## Bước 2: Tạo Ma Trận Trang (Generate Page Matrix)

Bước này đọc dữ liệu từ `input_data` và xác định tất cả các trang web cần được tạo ra. Ví dụ: Nếu có 100 giống chó và 50 thành phố, nó sẽ tạo ra danh sách các trang Giống chó, trang Chi phí (Giống x Thành phố), trang So sánh, v.v.

**Khi nào cần chạy:**
*   Sau khi chạy Bước 1 (Parse Data).
*   Khi bạn muốn thay đổi cấu trúc trang hoặc thêm các loại trang mới.

**Cách thực hiện:**

1.  Tại Terminal, chạy lệnh:

```bash
npm run gen:matrix
```

**Kết quả:**
*   Tạo ra file `pageMatrix.json` tại thư mục gốc.
*   File này chứa danh sách hàng ngàn trang với thông tin chi tiết (slug, loại trang, từ khóa, dữ liệu đầu vào).
*   Terminal sẽ báo: "Generated page matrix with [số lượng] items."

---

## Bước 3: Tạo Nội Dung (Generate Content)

Đây là bước quan trọng nhất. Hệ thống sẽ đọc file `pageMatrix.json` và sử dụng AI (Hybrid LLM) để viết nội dung chi tiết cho từng trang chưa tồn tại.

**Khi nào cần chạy:**
*   Sau khi chạy Bước 2.
*   Khi bạn muốn tạo nội dung cho các trang mới.

**Cách thực hiện:**

1.  Tại Terminal, chạy lệnh:

```bash
npm run gen:content
```

**Lưu ý quan trọng:**
*   Quy trình này có thể mất nhiều thời gian tùy thuộc vào số lượng trang.
*   Script sẽ chạy theo từng lô (batch) để tránh quá tải.
*   Nếu một trang đã tồn tại trong `src/data_v7/pages`, nó sẽ **BỎ QUA** để tránh ghi đè nội dung cũ. Nếu muốn tạo lại, bạn cần xóa file JSON tương ứng của trang đó trước.

**Kết quả:**
*   Các file nội dung JSON sẽ được tạo trong `src/data_v7/pages/[loại_trang]/`.
*   Ví dụ: `src/data_v7/pages/breed/golden-retriever.json`.

---

## Tóm Tắt Các Lệnh

| Bước | Mục Đích | Lệnh |
| :--- | :--- | :--- |
| **1** | Cập nhật dữ liệu thô | `npx ts-node scripts/parse-raw-data.ts` |
| **2** | Tạo danh sách trang | `npm run gen:matrix` |
| **3** | Viết nội dung (AI) | `npm run gen:content` |

## Kiểm Tra Kết Quả (QA)

Sau khi tạo nội dung, bạn có thể chạy các lệnh kiểm tra chất lượng:

*   **Kiểm tra chung:** `npm run qa`
*   **Kiểm tra SEO:** `npm run qa:seo`
*   **Kiểm tra nội dung:** `npm run qa:content`
