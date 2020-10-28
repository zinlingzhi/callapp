import React from 'react';

import States from 'resources/states.json';

import PickerList from './index';

const StatePicker = ({
  visible,
  onClose,
  onSelect,
  selectedIndex,
  onReset,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <PickerList
      title="Select state"
      data={States}
      onClose={onClose}
      onSelect={onSelect}
      selectedIndex={selectedIndex}
      onReset={onReset}
      showReset={typeof selectedIndex === 'number'}
    />
  );
};

export default StatePicker;
