import Axios from 'axios';

export default {
    config_authen() {
      return {
        'Content-Type': 'application/json',
      }
    },

    async onLogin(param, result) {
        await Axios.post(`/auth/sign-in`, param, this.config_authen()).then((response) => {
            result(response.data)
        }).catch((response) => {
            result(response.response)
        })
    },

    
}