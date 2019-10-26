import axios from 'axios'
axios.defaults.baseURL='https://192.168.1.240/api/iR6hsMmrMoGShVbc1eko6oU5nvVXpM7j4GjQYs37'
export default{
    getGroupState() {
        return axios.get('/groups')
    },
    adjustGroup(id, data){
        return axios.put('/groups/' + id +  '/action', data)
    },
    


}