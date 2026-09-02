import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { HydrationProvider } from "@/components/HydrationProvider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Raise UP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = null;

                  var store = localStorage.getItem('poker-timer');
                  if (store) {
                    var parsed = JSON.parse(store);
                    theme = parsed?.state?.theme ?? null;
                  }

                  if (!theme) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    theme = prefersDark ? 'navy' : 'light';
                  }

                  document.documentElement.classList.remove('navy');
                  if (theme === 'navy') {
                    document.documentElement.classList.add('navy');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <HydrationProvider>{children}</HydrationProvider>
      </body>
    </html>
  );
}
