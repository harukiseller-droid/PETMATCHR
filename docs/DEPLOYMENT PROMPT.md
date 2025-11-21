https://petmatchr.vercel.app/
https://github.com/harukiseller-droid/PETMATCHR

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


vercel --prod --force



=====================