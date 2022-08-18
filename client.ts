import { BooksClient } from "./mod.ts";

export class RakutenAPI {
  private readonly appId: string;

  constructor(appId: string) {
    this.appId = appId;
  }

  /**
   * Books Endpoint
   */
  Books = (): BooksClient => {
    return new BooksClient(this.appId);
  };
}
