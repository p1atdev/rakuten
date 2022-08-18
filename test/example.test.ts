import { assertEquals } from "../deps.ts";
import { RakutenAPI, RakutenEnv } from "../mod.ts";

Deno.test("example: BooksTotal search", async () => {
  const client = new RakutenAPI(RakutenEnv.APP_ID!);

  const res = await client.Books().Total().get({
    keyword: "TypeScript",
    hits: 3,
  });

  assertEquals(res.Items.length, 3);

  console.log(res.Items.map((i) => i.title));

  // Output sample:
  // [
  //   "プロを目指す人のためのTypeScript入門　安全なコードの書き方から高度な型の使い方まで",
  //   "TypeScriptとReact/Next.jsでつくる実践Webアプリケーション開発",
  //   "プログラミングTypeScript"
  // ]
});
