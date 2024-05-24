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
  container: { data: any[] } | any[] | null | undefined,
  opts: any = {},
) {
  if (!container) return null;

  const { returnObject } = opts;
  const isFullContainer = (container as any)?.data;
  const rawData = ((container as any)?.data || container) as {
    name: string;
    value: unknown;
  }[];

  if (returnObject) {
    const data = rawData.reduce((acc, { name, value }) => {
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

    if (isFullContainer) return { ...container, data };
    return data;
  }

  const data = new Map<string, any>();

  for (const field of rawData) {
    const val = field.value;

    data.set(
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

  if (isFullContainer) return { ...container, data };

  return data;
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
    content: { data: Map<string, any> } | Map<string, any>,
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
  const data = (content as any)?.data || content;

  const result = data instanceof Map ? data.get(fieldName) : data[fieldName];

  if (!(result instanceof Map)) return result;

  return returnObject ? Object.fromEntries(result) : result;
};
