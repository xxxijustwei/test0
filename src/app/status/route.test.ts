import { describe, expect, test } from "vitest";
import { GET } from "./route";
import { NextResponse } from "next/server";

describe("Status API", () => {
  test("should return status response with correct format", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response).toBeInstanceOf(NextResponse);
    expect(data).toHaveProperty("ok", true);
    expect(data).toHaveProperty("ts");
    expect(data).toHaveProperty("commit");
    expect(() => new Date(data.ts)).not.toThrow();
    expect(typeof data.commit).toBe("string");
  });
});
