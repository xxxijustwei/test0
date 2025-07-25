import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    commit: process.env.GIT_COMMIT || "unknown",
  });
};
