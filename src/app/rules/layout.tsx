import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules",
};

export default function HoldemRules({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
