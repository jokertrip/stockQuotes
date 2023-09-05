import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderRadius: 15,
    margin: 5,
    borderWidth: 2,
  },
  cell: {
    minWidth: '25%',
    textAlign: 'center',
  },
})

const QuoteHeader: React.FC = () => {
  return (
    <View style={styles.row}>
      <Text style={[styles.cell]}>Name</Text>
      <Text style={[styles.cell]}>Current</Text>
      <Text style={[styles.cell]}>High</Text>
      <Text style={[styles.cell]}>Change</Text>
    </View>
  )
}

export default QuoteHeader
