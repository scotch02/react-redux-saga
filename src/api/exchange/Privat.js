export default class Privat {
  /*
curl --include --header "Content-Type: application/json;charset=utf-8"  --request GET "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
[
    {
        "ccy":"USD",
        "base_ccy":"UAH",
        "buy":"23.85000",
        "sale":"24.15000"
    },
    {
        "ccy":"EUR",
        "base_ccy":"UAH",
        "buy":"26.15000",
        "sale":"26.65000"
    },
    {
        "ccy":"RUR",
        "base_ccy":"UAH",
        "buy":"0.34200",
        "sale":"0.37900"
    },
    {
        "ccy":"BTC",
        "base_ccy":"USD",
        "buy":"6829.3806",
        "sale":"7548.2628"
    }
]  
*/

  static async getExchange() {
    /*     const requestUrl =
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
 */

    const requestUrl = "p24api/pubinfo?json&exchange&coursid=5"
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    })

    if (!response.ok) {
      const { status, statusText } = response
      throw new Error({
        requestUrl,
        method: "GET",
        status,
        statusText
      })
    }

    const jsonStr = await response.text()

    return JSON.parse(jsonStr, (key, value) => {
      if (key === "sale") {
        return parseFloat(value)
      }
      return value
    })
  }

  static getUsefulData(privatDataArr) {
    const { sale: btc } = privatDataArr.find(({ ccy }) => ccy === "BTC")
    const { sale: usd } = privatDataArr.find(({ ccy }) => ccy === "USD")
    const { sale: rur } = privatDataArr.find(({ ccy }) => ccy === "RUR")

    const pairs = [
      {
        coin: "BTC",
        currency: "USD",
        sale: btc
      },
      {
        coin: "BTC",
        currency: "UAH",
        sale: btc * usd
      },
      {
        coin: "BTC",
        currency: "RUR",
        sale: (btc * usd) / rur
      }
    ]

    return pairs
  }

  static enrichWithFakePairs(pairs) {
    return [
      ...pairs,
      ...[
        {
          coin: "ETH",
          currency: "USD",
          sale: 153.86
        },
        {
          coin: "ETH",
          currency: "UAH",
          sale: 3696.39
        },
        {
          coin: "ETH",
          currency: "RUR",
          sale: 9842.52
        }
      ],
      ...[
        {
          coin: "XRP",
          currency: "USD",
          sale: 0.22609
        },
        {
          coin: "XRP",
          currency: "UAH",
          sale: 5.47
        },
        {
          coin: "XRP",
          currency: "RUR",
          sale: 15.151
        }
      ]
    ]
  }
}
