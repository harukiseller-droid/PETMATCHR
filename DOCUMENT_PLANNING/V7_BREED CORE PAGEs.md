 V7_BREED CORE PAGEs
Dựa trên kiến trúc page types trong plan, một breed duy nhất như Golden Retriever sẽ tạo ra một hệ sinh thái nhiều page xoay quanh nó, không chỉ 1 “breed profile.”
 Mình liệt kê đầy đủ theo đúng logic Breed → Cost → Problems → Anxiety → Comparisons → Location → Lists → Funnel pages.
Mình sẽ chia theo nhóm và đưa ví dụ slug chuẩn để mày implement luôn.

1) BREED CORE PAGES (NỀN TẢNG)
Page
Purpose
Ví dụ URL
Breed Profile
Trang chính, scoring, pros/cons
/breeds/golden-retriever
Breed Data API
Data để AI trích
/api/breeds/golden-retriever.json

2 pages chính bắt buộc.

2) COST PAGES (PRIMARY AFFILIATE: INSURANCE)
Golden Retriever × các city trong dataset (giả sử 8 city ban đầu)
City
URL
NYC
/cost/golden-retriever/new-york-ny
LA
/cost/golden-retriever/los-angeles-ca
Chicago
/cost/golden-retriever/chicago-il
Miami
/cost/golden-retriever/miami-fl
Houston
/cost/golden-retriever/houston-tx
Seattle
/cost/golden-retriever/seattle-wa
Denver
/cost/golden-retriever/denver-co
Phoenix
/cost/golden-retriever/phoenix-az

→ 8 pages (số city tùy data)

3) PROBLEM / BEHAVIOR PAGES (PRIMARY: TRAINING COURSE)
Giả sử có ~12 vấn đề phổ biến
Issue
URL
Barking
/problems/golden-retriever/barking
Biting / mouthing
/problems/golden-retriever/biting
Separation anxiety
/problems/golden-retriever/separation-anxiety
Leash pulling
/problems/golden-retriever/pulling
Chewing
/problems/golden-retriever/chewing
Digging
/problems/golden-retriever/digging
No recall / training difficulty
/problems/golden-retriever/no-recall
Jumping on people
/problems/golden-retriever/jumping
Aggression
/problems/golden-retriever/aggression
Excessive shedding
/problems/golden-retriever/shedding
Hip problems mobility
/problems/golden-retriever/hip-mobility
Senior behavior changes
/problems/golden-retriever/senior-behavior

→ ~10–15 pages

4) ANXIETY / WELLNESS / CBD PAGES (PRIMARY: CBD PRODUCTS)
Golden Retriever × 4 anxiety types (ví dụ từ plan)
Anxiety Type
URL
Separation
/anxiety/golden-retriever/separation
Noise / fireworks
/anxiety/golden-retriever/noise
Travel stress
/anxiety/golden-retriever/travel
Aging / joint pain anxiety
/anxiety/golden-retriever/senior

→ 4 pages

5) LOCATION PAGES (PRIMARY: INSURANCE + COST)
Giả sử site có 50 city × 1 breed → 50 pages
Example
URL
Best vets for Golden Retriever in NYC
/locations/new-york-ny/golden-retriever
Miami
/locations/miami-fl/golden-retriever
Chicago
/locations/chicago-il/golden-retriever

→ n = số city trong DB (ví dụ 50)

6) COMPARISON PAGES (SEO + Insurance)
So với các breed khác trong danh sách (giả sử 80 breed → toán tử đối xứng = ~79, nhưng ta chọn top 20 relevant)
Comparison
URL
Golden Retriever vs Labrador
/compare/golden-retriever-vs-labrador
Golden Retriever vs German Shepherd
/compare/golden-retriever-vs-german-shepherd
Golden Retriever vs Poodle
/compare/golden-retriever-vs-poodle
Golden Retriever vs Bernese Mountain Dog
/compare/golden-retriever-vs-bernese

→ Thực tế: 20–40 pages tùy filter relevance
 (Plan nói tổng 200 comparison cho toàn site → trung bình ~2–5/breed nếu lọc theo trait overlap)
→ Với Golden Retriever hợp lý chọn ~20.

7) LIFESTYLE LIST PAGES (TOPICAL DISCOVERY)
Golden Retriever xuất hiện trên các trang list chung, không phải page riêng.
Ví dụ các list mà Golden Retriever được recommend:
List Page
URL
Vị trí
Best Dogs for Families
/lists/best-dogs-for-families
trong danh sách
Best Dogs for Apartments
/lists/best-dogs-for-apartments
có thể NOT recommended
Best Dogs for Beginners
/lists/best-dogs-for-beginners
Yes
Best Active Outdoor Dogs
/lists/active-outdoor-dogs
Yes
Best Dogs for Kids
/lists/kid-friendly-dogs
Yes
Best Dogs for Seniors
/lists/senior-friendly-dogs
Maybe

→ Không tạo page cho từng breed, nhưng breed xuất hiện trong ~6–10 lists.

8) FUNNEL & QUIZ PAGE ENTRIES
Không phải page theo breed, nhưng funnel route dựa breed data đổ vào output:
Funnel
Entry
URL
Cost/Insurance
Calculator prefilled
/cost/golden-retriever/new-york-ny?calculator=1
Behavior quiz
Redirect
/quiz/behavior-results?breed=golden-retriever
Anxiety quiz
Redirect
/quiz/anxiety-results?breed=golden-retriever

→ ~3–5 entry URLs.

TỔNG SỐ PAGE LIÊN QUAN CHO 1 BREED
Category
Approx Count
Breed Core
2
Cost Pages
8
Problem Pages
12
Anxiety Pages
4
Location Pages
50
Comparison Pages
20
Lists (appearances, not pages)
~8
Funnels / quiz entry
~3–5

👉 Tổng page riêng cho Golden Retriever: ~90 pages
Nếu scale đầy đủ 50 city + ~12 problems + ~20 comparisons
 → 80–120 page mỗi breed.
Đây chính là lý do 80 breeds → 2,500–3,500 pages.

