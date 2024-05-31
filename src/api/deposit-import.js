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

 
  async searchDepositImport(body, result) {
    await Axios.post("import_deposit/search", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },
  async createDepositImport(body, result) {
    await Axios.post("import_deposit", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },
};
