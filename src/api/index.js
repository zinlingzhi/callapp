const API_URL = 'https://www.call1800.org/rest';

const request = (endpoint, config) =>
  new Promise((resolve, reject) => {
    return fetch(API_URL + endpoint, config)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.success) {
          resolve(responseJson.payload);
        } else {
          reject('Nothing found');
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const getIndustries = () => {
  return request('/industry').then(data => {
    return data.map(item => ({
      ...item,
      label: item.name,
      value: item.name,
    }));
  });
};

export const getCompanies = (params = {}, offset = 0, limit = 25) => {
  const url = `/toll/search?limit=${limit}&offset=${offset}`;
  const filter = Object.entries(params)
    .filter(([field, value]) => !!value)
    .map(([field, value]) => {
      const item = { field, value };
      if (field === 'companyname') {
        item.type = '%%';
      }
      return item;
    });
  const config = {
    method: 'POST',
    body: JSON.stringify({
      query: [{ filter }],
      orderBy: 'companyname',
    }),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  // const filter = [
  //   {
  //     field: 'companyname',
  //     value: 'Adams',
  //     type: '%%',
  //   },
  //   {
  //     field: 'state',
  //     value: 'TX',
  //   },
  // ];
  return request(url, config);
  // fetch(`${API_URL}/toll/search?limit=${limit}&offset=${page * limit}`, {
  //   method: 'POST',
  //   data: { query: [{ filter }], orderDesc: true },
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.success) {
  //       items = items.concat(data.payload.data);
  //       if (data.payload.total > data.payload.offset + data.payload.limit) {
  //         getCompaniesFetch(searchRequest, resolve, reject, page + 1, items);
  //       } else {
  //         // serviceResponse(items, searchRequest, resolve, reject);
  //       }
  //     } else {
  //       reject(data.message);
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     reject(error);
  //   });
};

// return new Promise((resolve, reject) => {
//   return fetch(API_URL + '/industry')
//     .then(response => response.json())
//     .then(responseJson => {
//       console.log(responseJson);

//       if (responseJson.success) {
//         resolve(
//           responseJson.payload.map(item => ({
//             ...item,
//             label: item.name,
//             value: item.name,
//           })),
//         );
//       } else {
//         reject('No data found');
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       reject(error);
//     });
// });
