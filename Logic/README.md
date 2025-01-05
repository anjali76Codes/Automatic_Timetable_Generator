rm .env
 add .env to gitignore

git rm --cached .env
git commit -m "Stop tracking .env file"
git push origin main