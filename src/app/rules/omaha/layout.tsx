import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PL Omaha",
};

export default function HoldemRules({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
