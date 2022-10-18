import axios from 'axios';

const baseUrl = '/api/feedbacks';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const config = () => {
  return {
    headers: {
      Authorization: token
    }
  };
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (feedback) => {
  const res = await axios.post(baseUrl, feedback, config());
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, config());
  return res.data;
};

const likeFeedback = async (id) => {
  const res = await axios.put(`${baseUrl}/likes/${id}`, {}, config());
  return res.data;
};

export { getAll, create, setToken, remove, likeFeedback };
