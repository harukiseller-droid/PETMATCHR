https://petmatchr.vercel.app/
https://github.com/harukiseller-droid/PETMATCHR

https://petmatchr.vercel.app/admin/content-matrix


🔍 Cách xem link đúng hiện tại
vercel ls
vercel list petmatchr
=====================
git add src/app/lists/[slug]/page.tsx
git commit -m "fix import for list page routing"
git push
vercel --prod

=====================
git add src/app/page.tsx
git commit -m "update homepage content"
git push origin main
vercel --prod

========================
Muốn commit tất cả thay đổi trong repo thay vì chỉ 1 file:

git add .
git commit -m "update content + clear cache deploy"
git push origin main
vercel --prod --force

=====================
1/ make sure các url của các page mới generate phải auto đươc link chính xác từ main page của từng Breeds theo đúng plan
2/ start from main page Golden Retriever: user có thể đi đến từng page của bread đó.
all page liên quan tới 1 loai breed nào đó phải được link với nhau thành flow
