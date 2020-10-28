import { Alert } from 'react-native';

export const validate = (data, list = [], isCityAvailable) => {
  const labels = {
    phonenumber: 'Phone number',
    companyname: 'Company name',
    region: 'State',
    city: 'City',
  };
  // const { phonenumber, companyname, region, city } = data;

  // const unfilled = Object.entries(data)
  //   .filter(([key, val]) => {
  //     if (key === 'city' && !isCityAvailable && data?.region) {
  //       return false;
  //     } else if (!val) {
  //       return true;
  //     }
  //   })
  //   .map(([k, v]) => labels[k]);

  // if (unfilled.length) {
  //   Alert.alert(
  //     `Please fill in ${
  //       unfilled.length === 1 ? 'this field:' : 'these fields'
  //     }`,
  //     `${unfilled.join(', ')}`,
  //   );
  //   return false;
  // }

  if (!data.companyname) {
    Alert.alert('', 'Please enter company name');
    return false;
  }

  const keys = [];
  const p = list.filter(i => {
    if (i.phonenumber === data.phonenumber) {
      keys.push(labels.phonenumber);
    }
    if (i.companyname === data.companyname) {
      keys.push(labels.companyname);
    }
    return (
      i.phonenumber === data.phonenumber || i.companyname === data.companyname
    );
  });

  if (keys.length) {
    const names = keys.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    Alert.alert(
      '',
      `Contact with given ${
        names.length === 1 ? names[0] : `${names[0]} and ${names[1]}`
      } already exists`,
    );
    return false;
  }
  return true;
};
