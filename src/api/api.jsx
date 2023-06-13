// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const API_KEY = '34184264-bef212f74d125a108f5aa9f77';

// export async function fetchImg(name, page) {
//   const { data } = await axios(
//     `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );

//   return data;
// }

import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34184264-bef212f74d125a108f5aa9f77';

export async function fetchImg(name, page) {
  const response = await axios(
    `?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
}
