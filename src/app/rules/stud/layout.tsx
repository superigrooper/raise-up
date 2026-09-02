import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seven-Card Stud",
};

export default function HoldemRules({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
