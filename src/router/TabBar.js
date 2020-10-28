import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { sv, s } from 'utils/helpers';

const MARGIN = s(25);
export const TabBar = props => {
  const { state, descriptors, navigation, position } = props;
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        const labelStyle = {
          color: isFocused ? '#7384BF' : '#6C6C6C',
          fontWeight: isFocused ? 'bold' : 'normal',
        };

        const lineStyle = { opacity: isFocused ? opacity : 0 };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            activeOpacity={0.9}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <View>
              <Animated.Text style={[styles.tabLabel, labelStyle]}>
                {label}
              </Animated.Text>

              <Animated.View style={[styles.indicator, lineStyle]} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomRightRadius: MARGIN,
    borderBottomLeftRadius: MARGIN,
    // paddingHorizontal: MARGIN,
    height: sv(60),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tab: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  tabLabel: {
    fontSize: s(17),
  },
  indicator: {
    marginTop: 3,
    height: 1.5,
    backgroundColor: '#7384BF',
  },
});
