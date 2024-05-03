import Axios from 'axios';

const apiAuthenLogin = `/Authen/UserLogin`

export default {
    config_authen() {
      return {
        'Content-Type': 'application/json',
        headers:{
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    },

    onLogin(parm, sucess) {
        Axios.post(apiAuthenLogin, parm, this.config_authen()).then((response) => {
          sucess(response.data)
        }).catch((response) => {
          sucess(response)
        })
    },

    
}