import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",                 // ✅ генерим /out
  images: { unoptimized: true },    // ✅ чтобы next/image работал без image-оптимайзера
  trailingSlash: true,              // (удобно для GH Pages/Netlify)
  // basePath: "/meme-3-sept",      // если деплоишь в под-путь (например, GH Pages)
};
export default nextConfig;