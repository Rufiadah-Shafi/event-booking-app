"use client";

import { use } from "react";
import EventDetails from "@/components/EventDetails";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <EventDetails eventId={Number(id)} />;
}
