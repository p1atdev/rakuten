import { BooksTotal } from "./mod.ts";
export class BooksClient {
  private readonly appId: string;

  constructor(appId: string) {
    this.appId = appId;
  }

  /**
   * BooksTotal Endpoint
   */
  Total = (): BooksTotal => {
    return new BooksTotal(this.appId);
  };
}
