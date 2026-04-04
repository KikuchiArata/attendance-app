FROM node:20-alpine

WORKDIR /app

# 依存インストール
COPY package*.json ./
RUN npm install

# ソースコピー
COPY . .

# 開発サーバ起動
EXPOSE 3000
CMD ["npm","run","dev"]