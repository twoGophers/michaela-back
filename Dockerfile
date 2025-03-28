# Используем официальный Node.js образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --omit=dev

# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Открываем порт
EXPOSE 4000

# Запускаем приложение
CMD ["node", "dist/main"]
