import { API, Query, QueryOption, Result } from "../mod.ts";

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
   * ?????????????????????
   * UTF-8???URL?????????????????????????????????????????????????????????????????????128???????????????????????????????????????????????????
   * ?????????????????????????????????????????????????????????????????????????????????????????????AND?????? (????????????????????????????????????????????????????????? ) ??????????????????
   * ?????????OR?????? (????????????????????????????????????????????????????????????) ?????????????????????????????? orFlag ??? 1 ??????????????????????????????
   * ?????????????????????????????????2?????? ???????????? ??????1?????? ?????????????????????????????????????????????
   * ???????????????????????????????????????????????????????????????????????????????????????????????????2???????????????????????????????????????????????????
   * (*1)??????????????????????????????????????????????????????ID???ISBN?????????/JAN????????????????????????????????????????????????????????????????????????
   */
  keyword?: string;

  /**
   * ??????????????????????????????ID
   * ??????????????????????????????????????????????????????????????????ID
   * ??????????????????????????????ID?????????????????????????????????????????????
   * ???????????????ID??????????????????????????????????????????????????????????????????????????????????????????????????????????????????API(BooksGenre/Search)??????????????????????????????
   * (*1)??????????????????????????????????????????????????????ID???ISBN?????????/JAN????????????????????????????????????????????????????????????????????????
   *
   * ????????????????????? 000
   */
  booksGenreId?: string;

  /**
   * ISBN?????????/JAN?????????
   * ??????-???????????????????????????????????????????????????13???????????????????????????????????????
   * (*1)??????????????????????????????????????????????????????ID???ISBN?????????/JAN????????????????????????????????????????????????????????????????????????
   * (*2)ISBN?????????/JAN?????????????????????????????????????????????????????????????????????????????????????????????ID????????????????????????????????????
   */
  isbnjan?: string;

  /**
   * 1?????????????????????????????????
   * 1??????30???????????????
   */
  hits?: number;

  /**
   * ???????????????
   * 1??????100???????????????
   */
  page?: number;

  /**
   * ????????????
   * all: ??????????????????
   * available: ????????????
   * in3to7days: ??????3???7??????????????????
   * in3to9days: ??????3???9??????????????????
   * orderOnly: ????????????????????????
   * preorder: ???????????????
   * stockChecking: ???????????????????????????
   */
  availability?: AvailabilityText;

  /**
   * ?????????????????????????????????????????????
   * false: ?????????????????????????????????????????????????????????????????????????????????
   * true: ??????????????????????????????????????????????????????????????????????????????
   */
  outOfStackFlag?: boolean;

  /**
   * ?????????????????????
   * false: ??????????????????
   * true: ???????????????????????????
   */
  chirayomiFlag?: boolean;

  /**
   * ?????????
   * standard: ??????
   * sales: ???????????????
   * oldestPublished: ?????????(??????)
   * newestPublished: ?????????(?????????)
   * lowestPrice: ???????????????
   * highestPrice: ???????????????
   * reviewCount: ??????????????????????????????
   * reviewAverage: ?????????????????????(??????)?????????
   *
   * ???????????????: standard
   */
  sort?: SortText;

  /**
   * ???????????????
   * ???????????????????????????????????????????????????????????????????????????????????????????????????
   * false: ??????????????????
   * true: ?????????????????????
   */
  limitedFlag?: boolean;

  /**
   * ?????????????????????
   * false: ????????????????????????????????????????????????????????????????????????????????????????????????
   * true: ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
   */
  field?: boolean;

  /**
   * ????????????
   * PC??????????????????????????????????????????????????????????????????????????????
   * false: PC
   * true: ????????????
   */
  carrier?: boolean;

  /**
   * OR???????????????
   * ???????????????????????????????????????????????????AND?????????OR???????????????????????????????????????
   * ???????????????(A and B) or C??????????????????????????????????????????????????????
   *
   * false: AND??????
   * true: OR??????
   */
  orFlag?: boolean;

  /**
   * ?????????????????????
   * ????????????????????????????????????????????????
   * ?????????????????????????????????????????????????????????
   */
  NGKeyword?: string;

  /**
   * ?????????????????????????????????????????????
   * false: ?????????????????????????????????????????????????????????
   * true: ??????????????????????????????????????????????????????
   */
  genreInformationFlag?: boolean;

  /**
   * ?????????????????????ID
   * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????ID????????????????????????
   * ???????????????API??????????????????????????????????????????????????????ID?????????????????????
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
