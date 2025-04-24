import axios from "axios";

const ACCESS_KEY =
  "V42N0uJ5BvYpg6DEoOmaW7oQ1c0bn-KaKVZLkafTPvU";
const BASE_URL = "https://api.unsplash.com";

export const searchImages = async (
  query,
  per_page,
  page
) => {
  const response = await axios.get(
    `${BASE_URL}/search/photos`,
    {
      params: {
        query,
        per_page,
        page,
      },
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    }
  );

  return response.data.results;
};
