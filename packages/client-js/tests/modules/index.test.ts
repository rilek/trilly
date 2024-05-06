import t from "tap";
import { TrillyClient, createTrillyClient } from "../../src/index";

const testConfig = {
  apiUrl: "http://localhost:3000",
  accountId: "123",
  // applicationId: "456",
};

const testContext = {
  userId: "asd"
};

t.test("Initial setup", (t) => {
  const client = createTrillyClient({ ...testConfig, context: testContext });

  t.equal(client instanceof TrillyClient, true);

  t.same(client.getConfig(), testConfig);
  t.same(client.getContext(), testContext);

  t.end();
});

t.test("Update context", (t) => {
  const client = createTrillyClient({ ...testConfig, context: testContext });

  const newContext = {
    userId: "new-user"
  };

  client.updateContext(newContext);

  t.same(newContext["userId"], client.getContext()["userId"]);

  t.end();
});

const testFetch: typeof fetch = async (url, options) => {
  if (typeof url === "string" && url.match(/http[s]?:\/\/[^\/]+\/api\/v1\/collections\/(^)+/))
    return new Response(JSON.stringify({ data: [] }));

  return new Response(JSON.stringify({ data: [] }));
}

t.test("Fetch collection", async (t) => {
  const client = new TrillyClient({ ...testConfig, context: testContext, advanced: { fetchFunction: testFetch } });
  const collection = await client.fetchCollection("test-connection");

  t.hasProp(collection, "data");

  t.end();
});
