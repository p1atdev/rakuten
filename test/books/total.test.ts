import { BooksTotal } from "../../books/mod.ts";
import { RakutenEnv } from "../../mod.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertRejects,
} from "../../deps.ts";

Deno.test("BooksTotal: missing property", () => {
  const client = new BooksTotal(RakutenEnv.APP_ID!);

  assertRejects(() => client.get({}));
});

Deno.test("BooksTotal: search with keyword", async () => {
  const client = new BooksTotal(RakutenEnv.APP_ID!);

  const testCase: Map<string, string> = new Map([
    ["TypeScript", "9784297127473"],
    ["ダンジョン飯", "9784047370463"],
    ["スノウ　クラッシュ", "9784150123543"],
    ["夏目漱石", "9784101010137"],
  ]);

  for (const [keyword, isbn] of testCase) {
    const res = await client.get({
      keyword: keyword,
    });

    assertArrayIncludes(res.Items.map((i) => i.isbn), [isbn]);

    // sleep for 0.2 seconds to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});

Deno.test("BooksTotal: search with isbn", async () => {
  const client = new BooksTotal(RakutenEnv.APP_ID!);

  const testCase: Map<string, string> = new Map([
    ["9784297127473", "技術評論社"],
    ["9784047370463", "KADOKAWA"],
    ["9784150123543", "早川書房"],
    ["9784101010137", "新潮社"],
  ]);

  for (const [isbn, publisherName] of testCase) {
    const res = await client.get({
      isbnjan: isbn,
    });

    assertEquals(res.Items[0].publisherName, publisherName);

    // sleep for 0.2 seconds to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
