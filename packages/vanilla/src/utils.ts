export function parseContainer(container: null | undefined): null;
export function parseContainer(
  container: { data: any } | any[],
): Map<string, any>;

export function parseContainer(
  container: { data: any } | any[] | null | undefined,
) {
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

type GetField = {
  (container: undefined | null, fieldName: string): undefined;
  (
    container: Map<string, any>,
    fieldName: string,
  ): Map<string, any> | undefined;
};

export const getField: GetField = (container, fieldName) => {
  if (!container) return undefined;
  return container.get(fieldName);
};
