# 開発用 Next.js コンテナ
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# create-next-app を使えるようにする
RUN npm install -g create-next-app

# ポート
EXPOSE 3000

# コンテナ起動時に Next.js プロジェクトを自動生成して起動
CMD bash -c "\
if [ ! -f package.json ]; then \
  npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --use-npm \
  --no-src-dir \
  --import-alias '@/*' \
  --yes; \
fi && npm run dev"