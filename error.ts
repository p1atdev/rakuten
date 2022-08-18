/**
 * Rakuten API Client の実行時のエラー
 */
export class RakutenAPIClientError extends Error {
  private constructor(message: string) {
    super(`RakutenAPIClientError: ${message}`);
  }

  /**
   * 必要なプロパティが足りない
   */
  static readonly PropertyMissing = (keys: string[]) => {
    return new RakutenAPIClientError(
      `Property missing. Need at least one property in [${keys.join(", ")}]`,
    );
  };

  /**
   * テキストが長すぎる
   */
  static readonly TooLongText = new RakutenAPIClientError(
    "Text is too long. Max length is 128.",
  );

  /**
   * Application ID がない
   */
  static readonly InvalidApplicationId = new RakutenAPIClientError(
    "Invalid application id.",
  );
}

/**
 * Rakuten API のリクエスト時のエラー
 */
export class RakutenAPIRequestError extends Error {
  private constructor(message: string) {
    super(`RakutenAPIRequestError: ${message}`);
  }

  static readonly WrongParameter = (message: string) => {
    return new RakutenAPIRequestError(`Wrong parameter. ${message}`);
  };

  static readonly TooManyRequests = new RakutenAPIRequestError(
    "number of allowed requests has been exceeded for this API. please try again soon.",
  );
}
