const fetchImg = async (imageName, page) => {
  const API_KEY = '38270540-a530076f6446dfae15d3982e2';
  return await fetch(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
};
const api = { fetchImg };
export default api;
