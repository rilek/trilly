export interface IStaticConfig {
  apiKey: string;
  apiUrl?: string;
  storagePrefix?: string;
}

export type IMutableContext = Record<string, unknown>;

export interface IAdvancedConfig {
  advanced?: {
    fetchFunction: typeof fetch;
  };
}

export interface IContextConfig {
  context?: IMutableContext;
}

export type IConfig = IStaticConfig & IContextConfig & IAdvancedConfig;
