import Axios from "axios";

export default {
  config_authen() {
    return {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
  },

  async search(body, result) {
    await Axios.post('/transaction_export/search', body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },

  async create(body, result) {
    await Axios.post('/transaction_export', body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },
};