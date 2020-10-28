import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { sv, s } from 'utils/helpers';

const WINDOW_HEIGHT = Dimensions.get('window').height;
export const BOX_MAX_HEIGHT = WINDOW_HEIGHT * 0.55;
export const BOX_MIN_HEIGHT = WINDOW_HEIGHT * 0.22;

const ITEM_HEIGHT = sv(40);
const ItemsList = ({
  data,
  onSelect,
  selectedIndex,
  title,
  onClose,
  onReset,
  showReset,
  loading,
}) => {
  const [curRow, setCurRow] = useState(selectedIndex);

  const handlePress = row => {
    if (onSelect) {
      onSelect(row);
    }
    setCurRow(row.index);
  };

  const renderItem = ({ item, index }) => {
    const isSelected = index === curRow;
    const selectRowStyle = {
      borderTopWidth: index ? 1 : 0,
      backgroundColor: isSelected ? 'rgba(115, 132, 191, 0.6)' : 'white',
    };
    const selectedRowTextStyle = {
      fontSize: isSelected ? sv(16) : sv(14),
      color: isSelected ? 'white' : 'black',
      fontWeight: isSelected ? 'bold' : 'normal',
    };
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handlePress({ item, index })}
        style={{ height: ITEM_HEIGHT }}>
        <View style={[styles.row, selectRowStyle]}>
          <Text style={selectedRowTextStyle}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator color="#7384BF" size="large" style={{ flex: 1 }} />
      );
    }
    return (
      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={data.length ? styles.listContent : { flex: 1 }}
        stickyHeaderIndices={[curRow]}
        initialNumToRender={15}
        initialScrollIndex={curRow}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={{ fontSize: s(16) }}>Nothing found here!</Text>
          </View>
        }
      />
    );
  };
  return (
    <View style={{ height: data.length ? BOX_MAX_HEIGHT : BOX_MIN_HEIGHT }}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {renderContent()}

      <View style={styles.footer}>
        <TouchableOpacity onPress={onClose} style={styles.footerButton}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        {showReset && (
          <TouchableOpacity
            onPress={onReset}
            hitSlop={{ top: 15, right: 15, left: 15, bottom: 15 }}
            style={styles.resetButton}>
            <Text style={styles.resetText}>reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  header: {
    paddingVertical: s(10),
  },
  title: {
    fontSize: sv(18),
    fontWeight: 'bold',
    color: '#7384BF',
    textAlign: 'center',
  },
  listContent: {},
  row: {
    backgroundColor: 'white',
    borderTopColor: '#ececec',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: s(20),
  },
  footer: {
    flexDirection: 'row',
    marginTop: sv(15),
    marginBottom: sv(15),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerButton: {
    backgroundColor: '#7384BF',
    width: s(75),
    height: sv(30),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: sv(14) },
  resetButton: { position: 'absolute', right: 25 },
  resetText: { fontSize: s(15), color: '#7384BF', fontWeight: 'bold' },
  emptyList: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
