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

type FieldType =
  | undefined
  | null
  | string
  | number
  | boolean
  | Map<string, any>
  | Array<FieldType>;

type GetFieldOpts = {
  returnObject: boolean;
};

type GetField = {
  <T>(
    content: undefined | null,
    fieldName: string,
    opts: GetFieldOpts,
  ): undefined;

  <T>(
    content: Map<string, any>,
    fieldName: string,
    opts: GetFieldOpts,
  ): T extends any ? T : FieldType | undefined;
};

export const getField: GetField = (
  content,
  fieldName,
  { returnObject = false },
) => {
  if (!content) return undefined;

  const data = content.get(fieldName);

  if (!(data instanceof Map)) return data;

  return returnObject ? Object.fromEntries(data) : data;
};
