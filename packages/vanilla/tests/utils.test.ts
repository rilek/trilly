import { describe, it, expect } from "vitest";
import { getField } from "../src/utils";

function parseContainer(container: null | undefined): null;
function parseContainer(container: { data: any } | any[]): Map<string, any>;

function parseContainer(container: { data: any } | any[] | null | undefined) {
  if (!container) return null;
  const data = (container as any)?.data || (container as any[]);

  const fields = new Map<string, any>();

  for (const field of data) {
    const val = field.value;
    fields.set(
      field.name,
      val.constructor === Object
        ? parseContainer([val])
        : Array.isArray(val)
          ? Array.isArray(val[0])
            ? val.map((v) => parseContainer(v))
            : parseContainer(val)
          : val,
    );
  }

  return fields;
}

const testContainer = {
  data: [
    { name: "Simple field", value: "Hello, World!" },
    {
      name: "Section field",
      value: [
        { name: "title", value: "Hello, World!" },
        { name: "description", value: "This is a test description" },
      ],
    },
    {
      name: "List field",
      value: [[{ name: "Item 1", value: 1 }], [{ name: "Item 2", value: 2 }]],
    },
  ],
};

describe("Fields JSON to Map conversion", () => {
  it("should safely return null if container is empty", () => {
    expect(parseContainer(null)).toBeNull();
  });

  it("should safely return undefined if key is not found", () => {
    const fields = parseContainer(testContainer);
    expect(fields.get("Non existing field")).toBeUndefined();
  });

  it("should correctly parse container data to map", () => {
    const fields = parseContainer(testContainer);

    expect(fields).toBeInstanceOf(Map);
  });

  it("should correctly parse simple fields", () => {
    const fields = parseContainer(testContainer);

    expect(fields.get("Simple field")).toBe("Hello, World!");
  });

  it("should correctly parse section fields", () => {
    const fields = parseContainer(testContainer);

    const section = fields.get("Section field");

    expect(section.get("title")).toBe("Hello, World!");
    expect(section.get("description")).toBe("This is a test description");
  });

  it("should correctly parse list fields", () => {
    const fields = parseContainer(testContainer);

    const list = fields.get("List field");

    expect(list[0].get("Item 1")).toBe(1);
    expect(list[1].get("Item 2")).toBe(2);
  });
});

describe("Getting field from container", () => {
  it("should safely return undefined if container is empty", () => {
    const container = null;
    expect(getField(container, "fake-field-name")).toBeUndefined();
  });

  it("should safely return undefined if field is not found", () => {
    const container = new Map<string, any>();
    expect(getField(container, "fake-field-name")).toBeUndefined();
  });

  it("should correctly return field value", () => {
    const container = new Map<string, any>();
    container.set("fake-field-name", "fake-field-value");

    expect(getField(container, "fake-field-name")).toBe("fake-field-value");
  });
});
