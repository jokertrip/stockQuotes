import { makeAutoObservable, runInAction } from 'mobx'

interface RawQuote {
  symbol: string
  open: string
  low: string
  high: string
  close: string
  quantity: string
  amount: string
  tradeCount: number
  startTime: number
  closeTime: number
  displayName: string
  dailyChange: string
  bid: string
  bidQuantity: string
  ask: string
  askQuantity: string
  ts: number
  markPrice: string
}

interface TransformedQuote {
  ticker: string
  last: string
  highestBid: string
  percentChange: string
}

class QuotesStore {
  quotes: TransformedQuote[] = []
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  fetchQuotes = async () => {
    this.error = null
    try {
      const response = await fetch('https://api.poloniex.com/markets/ticker24h')
      const data = await response.json()
      runInAction(() => {
        this.quotes = data.map(
          (item: RawQuote): TransformedQuote => ({
            ticker: item.displayName,
            last: !item.markPrice
              ? ''
              : parseFloat(item.markPrice)
                  .toFixed(8)
                  .replace(/\.?0+$/, ''),
            highestBid: !item.high
              ? ''
              : parseFloat(item.high)
                  .toFixed(8)
                  .replace(/\.?0+$/, ''),
            percentChange: (parseFloat(item.dailyChange) * 100).toFixed(2) + '%',
          }),
        )
      })
    } catch (error) {
      runInAction(() => {
        this.error = 'Error'
      })
      console.log('Error details: ', error)
    }
  }
}

export const quotesStore = new QuotesStore()
