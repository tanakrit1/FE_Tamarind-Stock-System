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

 
  async searchSupplierImport(body, result) {
    await Axios.post("transaction_import/search", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },
  async createSupplierImport(body, result) {
    await Axios.post("transaction_import", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },
};
