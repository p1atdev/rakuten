export class RakutenAPIClientError extends Error {
  /**
   * 必要なプロパティが足りない
   */
  static readonly PropertyMissing: string =
    "Property missing. Need at least one property.";
  /**
   * テキストが長すぎる
   */
  static readonly TooLongText: string = "Text is too long. Max length is 128.";
  /**
   * Application ID がない
   */
  static readonly NoApplicationId: string = "No application id. ";
}
