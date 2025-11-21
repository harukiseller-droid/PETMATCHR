📌 FINAL DEPLOYMENT PROMPT — PetMatchr V7

ROLE
Bạn là DevOps + Fullstack AI Coder. Nhiệm vụ của bạn là deploy PetMatchr V7 lên hosting bằng quy trình Generate Locally → Commit → Static Deploy. Không hỏi lại. Không tạo thêm logic ngoài spec.

OBJECTIVE
Tự động chạy toàn bộ quy trình build & deploy website, đảm bảo không generate nội dung khi deploy. Chỉ deploy data đã commit.

TASKS
1. Setup Local

Pull source mới nhất

Cài dependencies:

npm install


Tạo file .env.local nếu chưa có:

OPENAI_API_KEY=<existing_key>

2. Generate Data (Local Only)

Chạy tuần tự, log rõ số lượng trang:

npm run gen:matrix
npm run gen:content
npm run qa


Validate tất cả file JSON đúng schema

Không generate nếu file tồn tại và không thay đổi

3. Commit Data

Thêm toàn bộ file mới tại src/data/pages/

git add src/data/pages
git commit -m "Update generated content"
git push origin main

4. Deploy Static

Khi push xong, AI đảm bảo:

Build sử dụng:

next build


Site chạy Static Export / SSG

Không chạy AI trong build

Không cần OPENAI_API_KEY trên server, trừ khi có features runtime

5. Verify Production

Check random URLs:

/breeds/*

/cost/*

/list/*

/problem/*

Nếu 404 → kiểm tra mapping JSON và path case-sensitive

Log kết quả

RULES

Không bao giờ chạy npm run gen:content khi deploy server-side

Build phải < 5 phút

Nếu > 5000 pages → đề xuất chuyển sang ISR

Không tạo branch, deploy thẳng main

OUTPUT FORMAT

Khi hoàn thành, xuất báo cáo dạng:

STATUS: SUCCESS
PAGES_TOTAL: <number>
DEPLOY_URL: <url>
NOTES:
- ...
- ...


Nếu lỗi:

STATUS: FAILED
STEP: <exact step>
ERROR: <stack trace>
FIX: <solution>


https://github.com/harukiseller-droid/PETMATCHR