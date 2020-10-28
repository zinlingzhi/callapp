import React, { useEffect } from 'react';

import Cities from 'resources/cities.json';

import PickerList from './index';

const getCityData = region =>
  Cities[region]
    ? Cities[region]
        .filter(function(el, i, a) {
          return i === a.indexOf(el);
        })
        .map(item => ({
          label: item,
          value: item,
        }))
    : [];

const CityPicker = ({
  visible,
  region,
  onClose,
  onSelect,
  selectedIndex,
  cityAvailable,
}) => {
  const data = getCityData(region);
  useEffect(() => {
    if (typeof cityAvailable === 'function') {
      cityAvailable(data.length > 0);
    }
  }, [cityAvailable, data.length, region]);
  if (!visible) {
    return null;
  }
  return (
    <PickerList
      title="Select city"
      data={data}
      onClose={onClose}
      onSelect={onSelect}
      selectedIndex={selectedIndex}
    />
  );
};

export default CityPicker;
