import { BooksClient } from "../../books/mod.ts";
import { RakutenEnv } from "../../mod.ts";
import { assertArrayIncludes } from "../../deps.ts";

Deno.test("BooksClient: Total", async () => {
  const books = new BooksClient(RakutenEnv.APP_ID!);

  const testCase: Map<string, string> = new Map([
    ["TypeScript", "9784297127473"],
    ["ダンジョン飯", "9784047370463"],
    ["スノウ　クラッシュ", "9784150123543"],
    ["夏目漱石", "9784101010137"],
  ]);

  for (const [keyword, isbn] of testCase) {
    const res = await books.Total().get({
      keyword: keyword,
    });

    assertArrayIncludes(res.Items.map((i) => i.isbn), [isbn]);

    // sleep for 0.2 seconds to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
