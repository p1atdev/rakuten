# Rakuten API Client

[Rakuten API Client](https://webservice.rakuten.co.jp/documentation) for Deno

![deno compatibility](https://shield.deno.dev/deno/^1.24)
[![deno module](https://shield.deno.dev/x/rakuten)](https://deno.land/x/rakuten)
![Test](https://github.com/p1atdev/rakuten/actions/workflows/test.yaml/badge.svg)

> **Warning**
> This project is currently in beta. There might still be breaking changes. Please be careful to use this.

# Supported Endpoints

-   [ ] Ichiba
-   [ ] Books
    -   [x] Total
    -   [ ] Book
    -   [ ] CD
    -   [ ] BooksDVD
    -   [ ] ForeignBook
    -   [ ] Magazine
    -   [ ] Game
    -   [ ] Software
    -   [ ] Genre
-   [ ] Travel
-   [ ] Recipe
-   [ ] Kobo
-   [ ] GORA

# Usage

First you have to get Application ID from [here](https://webservice.rakuten.co.jp/app/create) for free.

## BooksTotal

```ts
import { RakutenAPI, RakutenEnv } from "https://deno.land/x/rakuten/mod.ts"

const client = new RakutenAPI(RakutenEnv.APP_ID!) // RakutenEnv.APP_ID loads RAKUTENN_APP_ID. Or you can pass your app id directly

const res = await client.Books().Total().get({
    keyword: "TypeScript",
    hits: 3,
})

assertEquals(res.Items.length, 3)

console.log(res.Items.map((i) => i.title)) // response type supported

// Output sample:
// [
//   "プロを目指す人のためのTypeScript入門　安全なコードの書き方から高度な型の使い方まで",
//   "TypeScriptとReact/Next.jsでつくる実践Webアプリケーション開発",
//   "プログラミングTypeScript"
// ]
```
