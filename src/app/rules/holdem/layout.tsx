import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NL Hold'em",
};

export default function HoldemRules({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}