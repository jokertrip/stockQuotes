import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FlashList } from '@shopify/flash-list'
import { quotesStore } from '../stores/QuotesStore'
import QuoteItem from '../components/QuoteItem'
import QuoteHeader from '../components/QuoteHeader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
})

const QuotesScreen: React.FC = observer(() => {
  const [loading, setLoading] = useState(true)
  const { fetchQuotes, quotes, error } = quotesStore

  const prevQuotes = useRef([])

  useEffect(() => {
    prevQuotes.current = quotes
  }, [quotes])

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await fetchQuotes()
        setLoading(false)
      }
      void fetchData()
      const timerId = setInterval(() => {
        void fetchQuotes()
      }, 5000)

      return () => clearInterval(timerId)
    }, [fetchQuotes]),
  )

  const renderItem = ({ item, index }) => {
    return <QuoteItem item={item} prevItem={prevQuotes.current[index]} />
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <QuoteHeader />
          {error && <Text style={styles.errorText}>Error</Text>}
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
            <FlashList data={quotes} renderItem={renderItem} estimatedItemSize={53} />
          </View>
        </>
      )}
    </View>
  )
})

export default QuotesScreen
