import Axios from 'axios';

export default {
    config_authen() {
      return {
        'Content-Type': 'application/json',
      }
    },

    onLogin(parm, sucess) {
        Axios.post(`/auth/sign-in`, parm, this.config_authen()).then((response) => {
          sucess(response.data)
        }).catch((response) => {
          sucess(response)
        })
    },

    
}