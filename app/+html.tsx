import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="OSV — dark gothic magazine. Essays, interviews, and cultural signal."
        />
        <meta property="og:site_name" content="OSV" />
        <meta property="og:type" content="website" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="OSV Magazine"
          href="/rss.xml"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <ScrollViewStyleReset />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @font-face {
                font-family: "Anton";
                src: url("/fonts/Anton-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: "BebasNeue";
                src: url("/fonts/BebasNeue-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: "UnifrakturCook";
                src: url("/fonts/UnifrakturCook-Bold.ttf") format("truetype");
                font-weight: 700;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: "GreatVibes";
                src: url("/fonts/GreatVibes-Regular.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: "Inter";
                src: url("/fonts/Inter-Regular.otf") format("opentype");
                font-weight: 400;
                font-style: normal;
                font-display: swap;
              }
              @font-face {
                font-family: "Inter";
                src: url("/fonts/Inter-Bold.otf") format("opentype");
                font-weight: 700;
                font-style: normal;
                font-display: swap;
              }
              html, body, #root { min-height: 100%; }
              body {
                margin: 0;
                background: #000000;
                font-family: Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif;
                color: #FFFFFF;
              }
              html[data-theme="light"] body,
              html[data-theme="light"] #root {
                background: #FFFFFF !important;
                color: #000000 !important;
              }
              html[data-theme="dark"] body,
              html[data-theme="dark"] #root {
                background: #000000 !important;
                color: #FFFFFF !important;
              }
              a { color: inherit; text-decoration: none; }
              .osv-grain {
                pointer-events: none;
                position: fixed;
                inset: 0;
                z-index: 60;
                opacity: 0.07;
                mix-blend-mode: overlay;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
              }
              .osv-prose {
                font-family: Inter, Helvetica Neue, Helvetica, Arial, sans-serif;
                font-size: 1.05rem;
                line-height: 1.7;
                color: inherit;
              }
              .osv-prose p { margin: 0 0 1rem; }
              .osv-prose h2 {
                font-family: Anton, Impact, sans-serif;
                font-weight: 400;
                letter-spacing: 0.04em;
                text-transform: uppercase;
                font-size: 2rem;
                margin: 1.75rem 0 0.75rem;
                color: #E60000;
              }
              .osv-prose h3 {
                font-family: Anton, Impact, sans-serif;
                font-weight: 400;
                letter-spacing: 0.03em;
                text-transform: uppercase;
                font-size: 1.35rem;
                margin: 1.4rem 0 0.6rem;
              }
              .osv-prose a { color: #E60000; text-decoration: underline; }
              .osv-prose blockquote {
                border-left: 3px solid #E60000;
                margin: 1rem 0;
                padding-left: 1rem;
                font-style: italic;
              }
              .osv-prose ul, .osv-prose ol {
                padding-left: 1.25rem;
                margin: 0 0 1rem;
              }
              .lg\\:flex { display: none; }
              .lg\\:hidden { display: flex; }
              @media (min-width: 1024px) {
                .lg\\:flex { display: flex !important; }
                .lg\\:hidden { display: none !important; }
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem("osv-theme");
                  var mode = "dark";
                  if (saved === "light") mode = "light";
                  else if (saved === "system") {
                    mode = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
                      ? "dark" : "light";
                  } else if (saved === "dark") mode = "dark";
                  var bg = mode === "dark" ? "#000000" : "#FFFFFF";
                  var fg = mode === "dark" ? "#FFFFFF" : "#000000";
                  var root = document.documentElement;
                  root.setAttribute("data-theme", mode);
                  root.style.backgroundColor = bg;
                  document.addEventListener("DOMContentLoaded", function () {
                    document.body.style.backgroundColor = bg;
                    document.body.style.color = fg;
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div class="osv-grain" aria-hidden="true"></div>
        {children}
      </body>
    </html>
  );
}
