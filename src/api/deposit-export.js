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

  async exportSearch(body, result) {
    await Axios.post("export_deposit/search", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error);
      });
  },
  
  async create(body, result) {
    await Axios.post("export_deposit", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },

  
};
