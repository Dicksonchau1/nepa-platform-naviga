#!/bin/bash
set -e
cd /root/nepa-platform-naviga
echo "==> Fetching latest..."
git fetch origin
git checkout main
git pull origin main
echo "==> Installing..."
pnpm install --frozen-lockfile
echo "==> Building..."
pnpm build
echo "==> Backing up..."
sudo cp -r /var/www/aurasensehk.com /var/www/aurasensehk.com.bak-manual-$(date +%Y%m%d-%H%M%S)
echo "==> Deploying..."
sudo rsync -av --delete dist/ /var/www/aurasensehk.com/
sudo chown -R www-data:www-data /var/www/aurasensehk.com
sudo chmod -R 755 /var/www/aurasensehk.com
echo "==> Smoke test..."
HTTP_WWW=$(curl -k -s -o /dev/null -w "%{http_code}" https://www.aurasensehk.com/)
HTTP_BENCH=$(curl -k -s -o /dev/null -w "%{http_code}" https://www.aurasensehk.com/api/bench/latest)
echo "  www: HTTP $HTTP_WWW | bench: HTTP $HTTP_BENCH"
if [ "$HTTP_WWW" = "200" ] && [ "$HTTP_BENCH" = "200" ]; then
  echo "✅ Deploy successful"
else
  echo "❌ Deploy verification failed"
  exit 1
fi
