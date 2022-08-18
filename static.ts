import "https://deno.land/std@0.152.0/dotenv/load.ts";

export class RakutenURL {
  private readonly url: string;

  static API = new RakutenURL(
    "https://app.rakuten.co.jp/services/api",
  );

  constructor(url: string) {
    this.url = url;
  }

  Endpoint(path: string) {
    return `${this.url}${path}`;
  }
}

export class RakutenEnv {
  static APP_ID = Deno.env.get("RAKUTEN_APP_ID");
}
