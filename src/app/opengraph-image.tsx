import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const alt = "Minza By Nazia Junaid";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // OpenGraph still uses the PNG (renamed to minza-logo-fallback.png).
  // The new SVG logo is for the live site only — OG image generation needs a
  // raster source.
  const logoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public", "minza-logo-fallback.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#B8C9A0",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Minza By Nazia Junaid" height={460} />
      </div>
    ),
    { ...size },
  );
}
