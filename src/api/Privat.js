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
    const requestUrl =
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
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
}
