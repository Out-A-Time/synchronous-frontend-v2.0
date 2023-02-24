interface NetworkClient {
  get(uri: string): Promise<any>;
}

interface Indicator {}

interface IndicatorRepository {
  get1W(): Promise<Indicator[]>;
}

export async function buildIndicatorRepository(
  networkClient: NetworkClient
): IndicatorRepository {
  const results = await networkClient.get(
    "http://someFakeURL.com/BTC_USDT/1W_1D"
  );

  return {
    async get1W(): Promise<Indicator[]> {
      console.log(results);

      const indicators = results.filter(
        (indicator): Indicator => indicator.id.includes("_1w") === true
      );

      return indicators;
    },
  };
}
