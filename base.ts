import {
  RakutenAPI,
  RakutenAPIClientError,
  RakutenEnv,
  RakutenURL,
} from "./mod.ts";

export type Query = Record<string, unknown>;

const queryTemplate = {
  format: "json",
  callback: undefined,
  formatVersion: 2,
};

export type QueryOption = Record<string, unknown>;

export class API {
  readonly appId: string;
  private readonly endpoint: URL;

  constructor({ appId, path }: { appId: string; path: string }) {
    this.appId = appId;
    this.endpoint = RakutenURL.API.Endpoint(path);

    this.appIdCheck();
  }

  async _get(query: Query) {
    const url = this.endpoint;

    url.searchParams.append("applicationId", this.appId);

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });

    Object.entries(queryTemplate).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });

    console.log(url.href);

    const res = await fetch(url.href);

    const json = await res.json();

    return json;
  }

  queryLeastCheck(options: QueryOption, least: string[]) {
    const { needAtLeastOneIn } = options;
    if (needAtLeastOneIn === undefined) {
      return;
    }

    const allEmpty = least.every((key) => {
      return Object.entries(options).find(([k, v]) =>
        k === key && v !== undefined
      );
    });
    if (allEmpty) {
      throw RakutenAPIClientError.PropertyMissing;
    }
  }

  appIdCheck() {
    if (this.appId === undefined) {
      throw RakutenAPIClientError.NoApplicationId;
    }
  }
}
