import { ImageResponse } from "next/og";
import { DATA } from "@/data/resume";

// Static export has no request at runtime. Reading `request.url` makes the
// route fail prerender (`dynamic = "error"`). The site never links here;
// Open Graph uses `/images/suoluetu.webp`. This file is the same default
// image `/api/og` returned when `title` was omitted. `?title=` cannot vary
// on nginx because the file is baked once.
export const dynamic = "force-static";

export async function GET() {
  const title = DATA.username;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "40px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {title}
          </h1>
          <h2
            style={{
              fontSize: "30px",
              color: "#666",
              textAlign: "center",
            }}
          >
            Full-stack engineer · React / Next.js specialist
          </h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
