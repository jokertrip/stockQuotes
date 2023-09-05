import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
  },
  cell: {
    minWidth: '25%',
    textAlign: 'center',
    margin: 2,
  },
})

type Quote = {
  ticker: string
  last: number
  highestBid: number
  percentChange: number
}

type Props = {
  item: Quote
  prevItem?: Quote
}

const QuoteItem: React.FC<Props> = ({ item, prevItem }) => {
  const [currentItem, setCurrentItem] = useState(item)
  const tickerFade = new Animated.Value(1)
  const lastFade = new Animated.Value(1)
  const highestBidFade = new Animated.Value(1)
  const percentChangeFade = new Animated.Value(1)

  const animateField = (fadeAnim, prevValue, currentValue) => {
    if (prevValue !== currentValue) {
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentItem(item)

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start()
      })
    }
  }

  useEffect(() => {
    if (prevItem) {
      animateField(tickerFade, prevItem.ticker, item.ticker)
      animateField(lastFade, prevItem.last, item.last)
      animateField(highestBidFade, prevItem.highestBid, item.highestBid)
      animateField(percentChangeFade, prevItem.percentChange, item.percentChange)
    }
  }, [item, prevItem])

  return (
    <View style={styles.row}>
      <Animated.View style={{ opacity: tickerFade }}>
        <Text style={[styles.cell]}>{currentItem.ticker}</Text>
      </Animated.View>
      <Animated.View style={{ opacity: lastFade }}>
        <Text style={[styles.cell]}>{currentItem.last}</Text>
      </Animated.View>
      <Animated.View style={{ opacity: highestBidFade }}>
        <Text style={[styles.cell]}>{currentItem.highestBid}</Text>
      </Animated.View>
      <Animated.View style={{ opacity: percentChangeFade }}>
        <Text style={[styles.cell]}>{currentItem.percentChange}</Text>
      </Animated.View>
    </View>
  )
}

export default QuoteItem
