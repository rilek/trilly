const isObject = (value: unknown): value is Record<string, unknown> =>
  (value as any).constructor === Object;

export function parseContainer(container: null | undefined, opts?: any): null;
export function parseContainer(
  container: { data: any[] } | any[],
  opts: { returnObject: false } | undefined,
): Map<string, any>;

export function parseContainer(
  container: { data: any[] } | any[],
  opts?: { returnObject: true },
): Record<string, any>;

export function parseContainer(
  container: { data: any } | any[] | null | undefined,
  opts: any = {},
) {
  if (!container) return null;

  const { returnObject } = opts;
  const data = ((container as any)?.data || container) as {
    name: string;
    value: unknown;
  }[];

  if (returnObject) {
    return data.reduce((acc, { name, value }) => {
      return {
        ...acc,
        [name]: isObject(value)
          ? parseContainer([value], opts)
          : Array.isArray(value)
            ? Array.isArray(value[0])
              ? value.map((v) => parseContainer(v, opts))
              : parseContainer(value, opts)
            : value,
      };
    }, {});
  }

  const fields = new Map<string, any>();

  for (const field of data) {
    const val = field.value;

    fields.set(
      field.name,
      isObject(val)
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
    opts?: GetFieldOpts,
  ): undefined;

  <T>(
    content: Map<string, any>,
    fieldName: string,
    opts?: GetFieldOpts,
  ): T extends any ? T : FieldType | undefined;
};

export const getField: GetField = (
  content,
  fieldName,
  { returnObject } = { returnObject: false },
) => {
  if (!content) return undefined;

  const data =
    content instanceof Map ? content.get(fieldName) : content[fieldName];

  if (!(data instanceof Map)) return data;

  return returnObject ? Object.fromEntries(data) : data;
};
