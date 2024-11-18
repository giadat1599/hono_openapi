/* eslint-disable ts/ban-ts-comment */

import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import fs from "node:fs";
import { afterAll, beforeAll, describe, expect, expectTypeOf, it } from "vitest";

import createApp, { createTestApp } from "@/lib/create-app";

import router from "./tasks.index";

const client = testClient(createApp().route("/", router));

describe("tasks list", () => {
  beforeAll(async () => {
    execSync("npx drizzle-kit migrate");
  });

  afterAll(async () => {
    fs.rmSync("test.db", { force: true });
  });

  it("responds with an array", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/tasks");
    const result = await response.json();
    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });

  it("responds with an array using testClient", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks.$get();
    const json = await response.json();

    expectTypeOf(json).toBeArray();
  });

  it("validates the id param", async () => {
    const response = await client.tasks[":id"].$get({ param: { id: "what" } });

    expect(response.status).toBe(422);
  });

  it("validates the body when creating", async () => {
    const response = await client.tasks.$post({
      // @ts-expect-error
      json: {
        name: "Learn vitest",
      },
    });

    expect(response.status).toBe(422);
  });
});
