import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  // Load Fraunces italic from the Next.js font cache.
  // next/font/google downloads fonts at build time into .next/static/media/
  // We fall back to a fetched copy if the cache path isn't accessible.
  let fontData: ArrayBuffer | null = null;

  try {
    // Try fetching from Google Fonts at build time
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,400&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)" } }
    ).then((r) => r.text());

    const match = css.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/);
    if (match) {
      fontData = await fetch(match[1]).then((r) => r.arrayBuffer());
    }
  } catch {
    // Network unavailable at build time — fall back to local copy if present
    try {
      fontData = await readFile(
        join(process.cwd(), "public", "fonts", "fraunces-italic.woff2")
      ).then((b) => b.buffer as ArrayBuffer);
    } catch {
      // Will render with fallback serif
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#A8505F",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: fontData ? "Fraunces" : "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 22,
            color: "#FBF7F2",
            lineHeight: 1,
            letterSpacing: "-0.01em",
            paddingTop: 2,
          }}
        >
          m
        </span>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Fraunces",
                data: fontData,
                style: "italic",
                weight: 400,
              },
            ],
          }
        : {}),
    }
  );
}
