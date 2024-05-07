import { TinyEmitter } from "tiny-emitter";
import { IConfig, IMutableContext, IStaticConfig } from "./types";
import { DEFAULT_API_URL } from "./const";

export function createTrillyClient(props: IConfig) {
  return new TrillyClient(props);
}

export class TrillyClient extends TinyEmitter {
  private context: IMutableContext = {};
  private apiUrl = DEFAULT_API_URL;
  private apiKey: string;
  private _isInitialized = false;
  private _isInitializing = false;
  private fetch?: typeof fetch;

  public get isInitialized() {
    return this._isInitialized;
  }

  public get isInitializing() {
    return this._isInitializing;
  }

  constructor({ apiKey, apiUrl, context, advanced }: IConfig) {
    super();

    if (!apiKey) throw new Error("accountId is required");

    this.apiKey = apiKey;
    if (apiUrl) this.apiUrl = apiUrl;
    if (context) this.context = context;

    if (advanced) {
      const { fetchFunction } = advanced;

      if (fetchFunction) this.fetch = fetchFunction;
    }
  }

  public getContext(): IMutableContext {
    return { ...this.context };
  }

  public getConfig(): IStaticConfig {
    return {
      apiKey: this.apiKey,
      // applicationId: this.applicationId,
      apiUrl: this.apiUrl,
    };
  }

  public setContext(newContext: IMutableContext) {
    this.context = { ...newContext };
    this.emit("context:set", newContext, { context: newContext });
  }

  public setContextField(
    newContext: IMutableContext,
    field: string,
    value: unknown,
  ) {
    this.context = { ...newContext, [field]: value };
    this.emit("context:setField", newContext, { field, value });
  }

  public async fetchCollection(collectionName: string) {
    const url = new URL(`${this.apiUrl}/api/v1/collections/${collectionName}`);

    const result = await (this.fetch || fetch)(url, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ context: this.context }),
    });

    return await result.json();
  }

  public async fetchContainer(containerName: string, collectionName?: string) {
    const isSingle = !collectionName;

    const suffix = isSingle
      ? `containers/${containerName}`
      : `collections/${collectionName}/${containerName}`;

    const url = new URL(`${this.apiUrl}/api/v1/${suffix}`);

    const result = await (this.fetch || fetch)(url, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ context: this.context }),
    });
    return await result.json();
  }

  // Utils
  public on(event: any, callback: (...args: any) => void, ctx?: unknown) {
    return super.on(event, callback, ctx);
  }

  public off(event: any, callback: (...args: any) => void) {
    return super.off(event, callback);
  }

  public emit(event: any, ...args: unknown[]) {
    return super.emit(event, args);
  }

  public get headers() {
    return {
      "Trilly-Api-Key": this.apiKey,
    };
  }
}
