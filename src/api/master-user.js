import Axios from "axios";

const apiLine = `/user`;
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
    await Axios.post('/user/search', body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response);
      });
  },

  async create(body, result) {
    await Axios.post('user', body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },

  update(params, result) {
    const body = {
      sessionEmpID: sessionInfo.id,
      body: params,
      module: "update",
    };
    Axios.post(apiLine, body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },

  delete(params, result) {
    const body = {
      sessionEmpID: sessionInfo.id,
      body: params,
      module: "delete",
    };
    Axios.post(apiLine, body, this.config_authen())
      .then((response) => {
        result(response.data);
      })
      .catch((error) => {
        result(error.response.data);
      });
  },
};
