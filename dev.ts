export class RakutenDev {
  private DEBUG_MODE = (): boolean => {
    if (Deno.env.get("RAKUTEN_DEBUG") === "true") {
      return true;
    } else {
      return false;
    }
  };

  log = (...args: unknown[]): void => {
    if (this.DEBUG_MODE()) {
      console.log(...args);
    }
  };
}
