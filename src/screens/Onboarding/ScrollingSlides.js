// import React, { useRef, useState } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import ViewPager from '@react-native-community/viewpager';
// import { windowWidth, s, sv, isIOS } from 'utils/helpers';
// import { useNavigation } from '@react-navigation/native';
// import {
//   useSafeAreaInsets,
//   SafeAreaView,
// } from 'react-native-safe-area-context';

// export const slides = [
//   {
//     title: 'Free Calling',
//     description:
//       'A large of toll free numbers will\nallow you to make free calling\nto US and Canada.',
//     image: require('assets/illustration-01.png'),
//     imageStyle: { width: sv(382), height: sv(329) },
//   },
//   {
//     title: 'Quick Finding',
//     description:
//       'The Only Toll Free Directory\non Mobile APP. This application\nwill help you quickly find the\nnumber you need.',
//     image: require('assets/illustration-02.png'),
//     imageStyle: { width: sv(352), height: sv(318) },
//   },
//   {
//     title: '',
//     description: '',
//     image: require('assets/illustration-03.png'),
//     imageStyle: { width: sv(364), height: sv(291), marginTop: sv(55) },
//   },
// ];

// const Button = ({ text, onPress, disabled, variant = 'text' }) => {
//   const buttonStyle =
//     variant === 'text' ? styles.buttonVarText : styles.buttonPrimary;
//   const buttonTextStyle =
//     variant === 'text'
//       ? [styles.buttonText, disabled && styles.disabled]
//       : styles.buttonTextPrimary;
//   return (
//     <TouchableOpacity
//       activeOpacity={0.7}
//       disabled={disabled}
//       onPress={onPress}
//       style={buttonStyle}>
//       <Text style={buttonTextStyle}>{text}</Text>
//     </TouchableOpacity>
//   );
// };

// export const SlidesScreen = () => {
//   const [position, setPosition] = useState(0);
//   const pager = useRef();
//   const insets = useSafeAreaInsets();
//   const navigation = useNavigation();
//   return (
//     <>
//       <ViewPager
//         ref={pager}
//         horizontal
//         // scrollEnabled={false}
//         onPageSelected={e => setPosition(e.nativeEvent.position)}
//         style={styles.container}>
//         {slides.map((slide, index) => (
//           <SafeAreaView style={[styles.slide]}>
//             <View style={styles.top}>
//               <Image source={slide.image} style={slide.imageStyle} />
//             </View>
//             <View style={styles.bottom}>
//               <View style={styles.textContainer}>
//                 <Text style={styles.title}>{slide.title}</Text>
//                 <Text style={styles.description}>{slide.description}</Text>
//               </View>
//               {index === slides.length - 1 && (
//                 <Button
//                   variant="primary"
//                   text="Query immediately"
//                   onPress={() => navigation.navigate('Home')}
//                 />
//               )}
//             </View>
//           </SafeAreaView>
//         ))}
//       </ViewPager>

//       <View style={[styles.footer, { marginBottom: insets.bottom }]}>
//         <Button text="SKIP" onPress={() => navigation.navigate('Home')} />

//         <View style={styles.pager}>
//           {slides.map((_, index) => {
//             return (
//               <View
//                 key={index}
//                 style={[styles.dot, position === index && styles.activeDot]}
//               />
//             );
//           })}
//         </View>

//         <Button
//           text="NEXT"
//           onPress={() => pager.current.setPage(position + 1)}
//           disabled={position === slides.length - 1}
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: 'white' },
//   slide: {
//     width: windowWidth,
//     height: '100%',
//     backgroundColor: 'white',
//   },
//   top: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottom: { flex: 1 },
//   textContainer: {
//     marginHorizontal: s(44),
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: sv(24),
//     lineHeight: sv(28),
//     textTransform: 'capitalize',
//     color: '#515D86',
//     marginBottom: sv(25),
//   },
//   description: {
//     fontSize: sv(21),
//     lineHeight: sv(25),
//     color: '#545454',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: sv(20),
//     flexDirection: 'row',
//     width: '100%',
//     paddingHorizontal: s(20),
//   },
//   pager: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   dot: {
//     width: sv(12),
//     height: sv(12),
//     borderRadius: sv(6),
//     backgroundColor: '#C4C4C4',
//     marginHorizontal: s(7),
//   },
//   activeDot: {
//     backgroundColor: '#7384BF',
//   },

//   buttonPrimary: {
//     marginTop: sv(65),
//     width: sv(282),
//     height: sv(63),
//     backgroundColor: '#3A71FF',
//     borderRadius: s(30),
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonVarText: {
//     paddingHorizontal: s(16),
//     paddingVertical: s(5),
//   },
//   buttonText: {
//     fontWeight: isIOS ? '900' : 'bold',
//     fontSize: sv(20),
//     lineHeight: sv(25),
//     textTransform: 'uppercase',
//     color: '#6C6C6C',
//   },
//   buttonTextPrimary: {
//     fontWeight: isIOS ? '900' : 'bold',
//     fontSize: s(20),
//     lineHeight: s(25),
//     color: '#fff',
//   },
//   disabled: { color: '#ECECEC' },
// });
