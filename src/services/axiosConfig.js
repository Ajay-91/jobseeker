import axios from "axios";

const axiosConfig = async (method, url, reqBody) => {
  let axiosObj = {
    method: method,
    url: url,
    data: reqBody,
  };
  return await axios(axiosObj)
    .then((Res) => {
      return Res;
    })
    .catch((Err) => {
      return Err;
    });
};

export default axiosConfig;
