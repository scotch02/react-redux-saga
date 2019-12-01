export default class Privat {
  /*
curl --header "Content-Type: application/json;charset=utf-8"  --request GET 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
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

    return response.json()
  }

  static getUsefulData(privatDataArr) {
    const btcItem = privatDataArr.find(({ ccy }) => ccy === "BTC")
    const usdItem = privatDataArr.find(({ ccy }) => ccy === "USD")
    const rurItem = privatDataArr.find(({ ccy }) => ccy === "RUR")

    const btc = parseFloat(btcItem.sale)
    const usd = parseFloat(usdItem.sale)
    const rur = parseFloat(rurItem.sale)

    const pairs = [
      {
        currency: "BTC",
        baseCurrency: "USD",
        sale: btc
      },
      {
        currency: "BTC",
        baseCurrency: "UAH",
        sale: btc * usd
      },
      {
        currency: "BTC",
        baseCurrency: "RUR",
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
          currency: "ETH",
          baseCurrency: "USD",
          sale: 153.86
        },
        {
          currency: "ETH",
          baseCurrency: "UAH",
          sale: 3696.39
        },
        {
          currency: "ETH",
          baseCurrency: "RUR",
          sale: 9842.52
        }
      ],
      ...[
        {
          currency: "XRP",
          baseCurrency: "USD",
          sale: 0.22609
        },
        {
          currency: "XRP",
          baseCurrency: "UAH",
          sale: 5.47
        },
        {
          currency: "XRP",
          baseCurrency: "RUR",
          sale: 15.151
        }
      ]
    ]
  }
}
