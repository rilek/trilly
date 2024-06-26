import { describe, it, expect } from "vitest";
import { TrillyClient, createTrillyClient } from "../src/index";

const testConfig = {
  apiUrl: "http://localhost:3000",
  apiKey: "fake-api-key",
};

const testContext = {
  userId: "fake-user-id",
};

const testContainer = {
  key: "fake-container",
  data: [{ name: "Simple field", value: "Hello, World!" }],
};

const testFetch: typeof fetch = async (url, options) => {
  if (
    typeof url === "string" &&
    url.match(/http[s]?:\/\/[^\/]+\/api\/v1\/collections\/[^\/]+\/[^\/]+/)
  )
    return new Response(JSON.stringify({ data: testContainer }));
  return new Response(JSON.stringify({ data: [testContainer] }));
};

describe("Initial setup", () => {
  it("should correctly initialize client with configurations", () => {
    const client = createTrillyClient({ ...testConfig, context: testContext });

    expect(client).toBeInstanceOf(TrillyClient);
    expect(client.getConfig()).toEqual(testConfig);
    expect(client.getContext()).toEqual(testContext);
  });
});

describe("Update context", () => {
  it("should correctly update context of client", () => {
    const client = createTrillyClient({ ...testConfig, context: testContext });
    const newContext = {
      userId: "new-user",
    };

    client.setContext(newContext);

    expect(client.getContext().userId).toEqual(newContext.userId);
  });
});

describe("Fetch collection", () => {
  it("should fetch collection data", async () => {
    const client = new TrillyClient({
      ...testConfig,
      context: testContext,
      advanced: { fetchFunction: testFetch },
    });

    const collection = await client.fetchCollection("test-connection");

    expect(collection).toHaveProperty("data");
  });

  it("should return arraof of Map instances", async () => {
    const client = new TrillyClient({
      ...testConfig,
      context: testContext,
      advanced: { fetchFunction: testFetch },
    });

    const collection = await client.fetchCollection("test-connection");

    for (const item of collection.data) {
      expect(item).toBeInstanceOf(Map);
    }
  });
});
