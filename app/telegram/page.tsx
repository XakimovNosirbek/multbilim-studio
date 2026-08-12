import type { Metadata } from "react";
import { TelegramDashboard } from "./TelegramDashboard";

export const metadata: Metadata = { title: "Telegram Admin — MultBilim", robots: { index: false, follow: false } };

export default function TelegramPage() { return <TelegramDashboard />; }
