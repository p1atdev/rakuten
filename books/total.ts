import { API, Query, QueryOption } from "../base.ts";

type Availability = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type AvailabilityText =
  | "all"
  | "available"
  | "in3to7days"
  | "in4to9days"
  | "orderOnly"
  | "preorder"
  | "stockChecking";
export const availabilityTextToNumber = (
  text?: AvailabilityText,
): Availability | undefined => {
  switch (text) {
    case "all":
      return 0;
    case "available":
      return 1;
    case "in3to7days":
      return 2;
    case "in4to9days":
      return 3;
    case "orderOnly":
      return 4;
    case "preorder":
      return 5;
    case "stockChecking":
      return 6;
    default:
      return undefined;
  }
};

type Flag = 0 | 1;
const boolToFlag = (
  bool?: boolean,
): Flag | undefined => (bool === undefined ? undefined : (bool ? 1 : 0));

type Sort =
  | "standard"
  | "sales"
  | "+releaseDate"
  | "-releaseDate"
  | "+itemPrice"
  | "-itemPrice"
  | "reviewCount"
  | "reviewAverage";
type SortText =
  | "standard"
  | "sales"
  | "oldestPublished"
  | "newestPublished"
  | "lowestPrice"
  | "highestPrice"
  | "reviewCount"
  | "reviewAverage";
export const sortTextToNumber = (sort?: SortText): Sort | undefined => {
  switch (sort) {
    case "standard":
      return "standard";
    case "sales":
      return "sales";
    case "oldestPublished":
      return "+releaseDate";
    case "newestPublished":
      return "-releaseDate";
    case "lowestPrice":
      return "+itemPrice";
    case "highestPrice":
      return "-itemPrice";
    case "reviewCount":
      return "reviewCount";
    case "reviewAverage":
      return "reviewAverage";
    default:
      return undefined;
  }
};

interface BooksTotalQuery extends Query {
  keyword?: string;
  booksGenreId?: number;
  isbnjan?: string;
  hits?: number;
  page?: number;
  availability?: Availability;
  outOfStackFlag?: Flag;
  chirayomiFlag?: Flag;
  sort?: Sort;
  limitedFlag?: Flag;
  field?: Flag;
  carrier?: Flag;
  orFlag?: Flag;
  NGKeyword?: string;
  genreInformationFlag?: Flag;
  affiliateId?: string;
}

export interface BooksTotalQueryOptions extends QueryOption {
  /**
   * 検索キーワード
   * UTF-8でURLエンコードした文字列検索キーワード全体は半角で128文字以内で指定する必要があります。
   * 検索キーワードは半角スペースで区切ることができ、デフォルトではAND条件 (すべてのキーワードが含まれるものを検索 ) になります。
   * もし、OR条件 (いずれかのキーワードが含まれるものを検索) を利用したい場合は、 orFlag を 1 に設定してください。
   * 各検索キーワードは半角2文字 もしくは 全角1文字 以上で指定する必要があります。
   * また例外として、各検索キーワードがひらがな・カタカナ・記号の場合は2文字以上で指定する必要があります。
   * (*1)検索キーワード、楽天ブックスジャンルID、ISBNコード/JANコードのいずれかが指定されていることが必須です。
   */
  keyword?: string;

  /**
   * 楽天ブックスジャンルID
   * 楽天ブックスにおけるジャンルを特定するためのID
   * （楽天市場のジャンルIDとは違うので注意してください）
   * ジャンルのIDやジャンル名、ジャンルの親子関係を調べたい場合は、「楽天ブックスジャンル検索API(BooksGenre/Search)」をご利用ください。
   * (*1)検索キーワード、楽天ブックスジャンルID、ISBNコード/JANコードのいずれかが指定されていることが必須です。
   *
   * デフォルト値： 000
   */
  booksGenreId?: number;

  /**
   * ISBNコード/JANコード
   * ※「-」ハイフンなどを取り除いた数字のみ13桁でリクエストしてください
   * (*1)検索キーワード、楽天ブックスジャンルID、ISBNコード/JANコードのいずれかが指定されていることが必須です。
   * (*2)ISBNコード/JANコードの入力があった場合、検索キーワードと楽天ブックスジャンルIDへの入力は無効となります
   */
  isbnjan?: string;
  hits?: number;
  page?: number;
  availability?: AvailabilityText;
  outOfStackFlag?: boolean;
  chirayomiFlag?: boolean;
  sort?: SortText;
  limitedFlag?: boolean;
  field?: boolean;
  carrier?: boolean;
  orFlag?: boolean;
  NGKeyword?: string;
  genreInformationFlag?: boolean;
  affiliateId?: string;
}

export class BooksTotal extends API {
  constructor(appId: string) {
    super({
      appId: appId,
      path: "/BooksBook/Search/20170404",
    });
  }

  async get(options: BooksTotalQueryOptions) {
    this.queryLeastCheck(options, ["keyword", "booksGenreId", "isbnjan"]);

    const query: BooksTotalQuery = {
      ...options,
      availability: availabilityTextToNumber(options.availability),
      outOfStackFlag: boolToFlag(options.outOfStackFlag),
      chirayomiFlag: boolToFlag(options.chirayomiFlag),
      sort: sortTextToNumber(options.sort),
      limitedFlag: boolToFlag(options.limitedFlag),
      field: boolToFlag(options.field),
      carrier: boolToFlag(options.carrier),
      orFlag: boolToFlag(options.orFlag),
      genreInformationFlag: boolToFlag(options.genreInformationFlag),
    };

    return await this._get(query);
  }
}
