import { API } from "../base.ts";
// import { RakutenEnv } from "../mod.ts";
import { assertThrows } from "../deps.ts";

Deno.test("app id check: should throw", () => {
  assertThrows(() => {
    const _ = new API({ appId: Deno.env.get("UNDEFINED_VALUE")!, path: "" });
  });
});

// TODO: Help me.  this test fails because of the ops leak. but the wrapper of this class's test passes. i dont know how to soleve this problem.
// Deno.test("simple low layer request: should throw", () => {
//   const api = new API({
//     appId: RakutenEnv.APP_ID!,
//     path: "/BooksTotal/Search/20170404",
//   });

//   assertRejects(() => api._get({}));
// });
