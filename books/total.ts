import { API, Query, QueryOption, Result } from "../base.ts";

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
  booksGenreId?: string;
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
  booksGenreId?: string;

  /**
   * ISBNコード/JANコード
   * ※「-」ハイフンなどを取り除いた数字のみ13桁でリクエストしてください
   * (*1)検索キーワード、楽天ブックスジャンルID、ISBNコード/JANコードのいずれかが指定されていることが必須です。
   * (*2)ISBNコード/JANコードの入力があった場合、検索キーワードと楽天ブックスジャンルIDへの入力は無効となります
   */
  isbnjan?: string;

  /**
   * 1ページあたりの取得件数
   * 1から30までの整数
   */
  hits?: number;

  /**
   * 取得ページ
   * 1から100までの整数
   */
  page?: number;

  /**
   * 在庫状況
   * all: すべての商品
   * available: 在庫あり
   * in3to7days: 通常3～7日程度で発送
   * in3to9days: 通常3～9日程度で発送
   * orderOnly: メーカー取り寄せ
   * preorder: 予約受付中
   * stockChecking: メーカーに在庫確認
   */
  availability?: AvailabilityText;

  /**
   * 品切れ等購入不可商品表示フラグ
   * false: 品切れや販売終了など購入不可の商品は結果に表示させない
   * true: 品切れや販売終了など購入不可の商品を結果に表示させる
   */
  outOfStackFlag?: boolean;

  /**
   * チラよみフラグ
   * false: すべての商品
   * true: チラよみの商品のみ
   */
  chirayomiFlag?: boolean;

  /**
   * ソート
   * standard: 標準
   * sales: 売れている
   * oldestPublished: 発売日(古い)
   * newestPublished: 発売日(新しい)
   * lowestPrice: 価格が安い
   * highestPrice: 価格が高い
   * reviewCount: レビューの件数が多い
   * reviewAverage: レビューの評価(平均)が高い
   *
   * デフォルト: standard
   */
  sort?: SortText;

  /**
   * 限定フラグ
   * ※限定版商品には期間限定・数量限定・予約限定などの商品が含まれます
   * false: すべての商品
   * true: 限定版商品のみ
   */
  limitedFlag?: boolean;

  /**
   * 検索フィールド
   * false: 検索対象が広い（同じ検索キーワードでも多くの検索結果が得られる）
   * true: 検索対象範囲が限定される（同じ検索キーワードでも少ない検索結果が得られる）
   */
  field?: boolean;

  /**
   * キャリア
   * PC用の情報を返すのか、モバイル用の情報を返すのかを選択
   * false: PC
   * true: モバイル
   */
  carrier?: boolean;

  /**
   * OR検索フラグ
   * 複数キーワードが設定された場合に、AND検索、OR検索のいずれかが選択可能。
   * ※ただし、(A and B) or Cといった複雑な検索条件設定は指定不可
   *
   * false: AND検索
   * true: OR検索
   */
  orFlag?: boolean;

  /**
   * 除外キーワード
   * 検索結果から除外したいキーワード
   * 使用するには検索キーワードの入力が必須
   */
  NGKeyword?: string;

  /**
   * ジャンルごとの商品数取得フラグ
   * false: ジャンルごとの商品数の情報を取得しない
   * true: ジャンルごとの商品数の情報を取得する
   */
  genreInformationFlag?: boolean;

  /**
   * アフィリエイトID
   * このエンドポイントがアフィリエーションをサポートしている場合、ここでアフィリエイトIDを入力できます。
   * その場合、APIレスポンスのリンクにはアフィリエイトIDが含まれます。
   */
  affiliateId?: string;
}

export class BooksTotal extends API {
  constructor(appId: string) {
    super({
      appId: appId,
      path: "/BooksTotal/Search/20170404",
    });
  }

  async get(options: BooksTotalQueryOptions): Promise<BooksTotalResult> {
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

export interface BooksTotalResult extends Result {
  GenreInformation: unknown[];
  Items: BooksTotalResultItem[];
  carrier: number;
  count: number;
  first: number;
  hits: number;
  last: number;
  page: number;
  pageCount: number;
}

export interface BooksTotalResultItem {
  affiliateUrl: string;
  artistName: string;
  author: string;
  availability: string;
  booksGenreId: string;
  chirayomiUrl: string;
  discountPrice: number;
  discountRate: number;
  hardware: string;
  isbn: string;
  itemCaption: string;
  itemPrice: number;
  itemUrl: string;
  jan: string;
  label: string;
  largeImageUrl: string;
  limitedFlag: number;
  listPrice: number;
  mediumImageUrl: string;
  os: string;
  postageFlag: number;
  publisherName: string;
  reviewAverage: string;
  reviewCount: number;
  salesDate: string;
  smallImageUrl: string;
  title: string;
}
