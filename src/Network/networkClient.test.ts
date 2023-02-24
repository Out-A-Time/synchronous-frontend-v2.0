import { buildIndicatorRepository } from "./indicatorRepository";

describe("Network Client", () => {
  it("should get the indicators for 1W/1D", async () => {
    const expectedData = [
      {
        id: "candle_binance_BTC/USDT_1m",
        indicator: "candle",
        result: {
          close: "18977.07",
        },
      },
      {
        id: "rsi_binance_BTC/USDT_1w",
        indicator: "rsi",
        result: { value: "33.18430651728576" },
      },
      {
        id: "stoch_binance_BTC/USDT_1w",
        indicator: "stoch",
        result: { valueK: "19.91488812840153", valueD: "20.42503779798909" },
      },
    ];

    const mockGetRequest = jest.fn().mockImplementation(() => {
      return responseData;
    });

    const networkClient = {
      get: mockGetRequest,
    };

    const indicatorRepository = buildIndicatorRepository(networkClient);
    const data = await indicatorRepository.get1W();

    expect(mockGetRequest).toHaveBeenCalledWith(
      "http://someFakeURL.com/BTC_USDT/1W_1D"
    );

    expect(data).toEqual(expectedData);
  });
});

const responseData = import("./dataBTC_1W_1D.json");
