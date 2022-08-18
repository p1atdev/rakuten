import { API } from "../base.ts";
import { RakutenEnv } from "../mod.ts";
import { assertThrows } from "../deps.ts";

Deno.test("app id check: should throw", () => {
  assertThrows(() => {
    const _ = new API({ appId: Deno.env.get("UNDEFINED_VALUE")!, path: "" });
  });
});

Deno.test("simple low layer request: should json", async () => {
  const api = new API({
    appId: RakutenEnv.APP_ID!,
    path: "/BooksTotal/Search/20170404",
  });
  const json = await api._get({});
});
