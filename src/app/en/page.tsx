import type { Metadata, Viewport } from "next";
import { PhysixHome } from "@/features/physix/home";

export const metadata: Metadata = {
  title: { absolute: "PhysiX · Physiotherapy" },
  description: "Physiotherapy, movement and recovery.",
};
export const viewport: Viewport = { themeColor: "#f7fbfa" };
export default function Page() {
  return <PhysixHome locale="en" />;
}
