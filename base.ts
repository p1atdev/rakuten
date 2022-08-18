import {
  RakutenAPIClientError,
  RakutenAPIRequestError,
  RakutenURL,
} from "./mod.ts";

export type Query = Record<string, unknown>;

const queryTemplate = {
  format: "json",
  callback: undefined,
  formatVersion: 2,
};

export type QueryOption = Record<string, unknown>;

export type Result = Record<string, unknown>;

export class API {
  readonly appId: string;
  private readonly endpoint: string;

  constructor({ appId, path }: { appId: string; path: string }) {
    this.appId = appId;
    this.endpoint = RakutenURL.API.Endpoint(path);

    this.appIdCheck();
  }

  async _get(query: Query) {
    const url = new URL(this.endpoint);

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

    // TODO: comment out this line
    console.log(url.href);

    const res = await fetch(url.href);

    const json = await res.json();

    switch (json.error) {
      case undefined: {
        break;
      }
      case "wrong_parameter": {
        throw RakutenAPIRequestError.WrongParameter(json.error_description);
      }
      case "too_many_requests": {
        throw RakutenAPIRequestError.TooManyRequests;
      }
      default: {
        break;
      }
    }

    return json;
  }

  queryLeastCheck(options: QueryOption, least: string[]) {
    const allEmpty = least.every((key) => {
      return Object.entries(options).find(([k, v]) =>
        k === key && v !== undefined
      ) === undefined;
    });

    if (allEmpty) {
      throw RakutenAPIClientError.PropertyMissing(least);
    }
  }

  appIdCheck() {
    if (this.appId === undefined) {
      throw RakutenAPIClientError.InvalidApplicationId;
    }
  }
}
