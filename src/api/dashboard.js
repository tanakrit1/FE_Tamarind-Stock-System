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

  async getData(body, result) {
    await Axios.post("report/dashboard", body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error);
      });
  },
  

  
};
