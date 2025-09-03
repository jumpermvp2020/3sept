# === Базовый образ с Node.js ===
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat

# === Установка зависимостей ===
FROM base AS deps
WORKDIR /app

# Устанавливаем pnpm глобально
RUN npm install -g pnpm

# Копируем файлы для установки зависимостей
COPY package.json pnpm-lock.yaml* ./

# Устанавливаем зависимости (кешируется при неизменных package.json)
RUN pnpm install --frozen-lockfile

# === Сборка приложения ===
FROM base AS builder
WORKDIR /app

# Устанавливаем pnpm
RUN npm install -g pnpm

# Копируем зависимости из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules

# Копируем исходный код
COPY . .

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Собираем статические файлы (next build с output: "export")
RUN pnpm build

# === Продакшн образ ===
FROM base AS runner
WORKDIR /app

# Настройки окружения
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем статические файлы из builder этапа
COPY --from=builder --chown=nextjs:nodejs /app/out ./out

# Устанавливаем serve для раздачи статических файлов
RUN npm install -g serve

# Переключаемся на непривилегированного пользователя
USER nextjs

# Открываем порт
EXPOSE 3000
ENV PORT 3000

# Healthcheck для мониторинга
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Запускаем сервер для статических файлов
# Опции: -s (spa mode), -l (listen on port), --cors (enable CORS)
CMD ["serve", "-s", "out", "-l", "3000", "--cors"]
