<template>
    <div>
        Список користувачів
        <div>
            <table border="1">
                <tr>
                    <td>
                        ID
                    </td>
                    <td>
                        Ім'я
                    </td>
                    <td>
                        Вік
                    </td>
                </tr>
                <tr v-for="user in users" :key="user._id">
                    <td>
                        {{user._id}}
                    </td>
                    <td>
                        {{user.name}}
                    </td>
                    <td>
                        {{user.age}}
                    </td>
                    <td>
                        <button type="button" v-on:click="send(user._id)">Вибрати</button>
                    </td>
                    <td>
                        <button type="button" v-on:click="remove(user._id)">Видалити</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
export default {
    name: 'GetAllUsers',
    data() {
    return {
        users:[]
    }
},
methods: {
    send: function(id){
        router.push({ name: 'editUser', params: { id } })
    },
    
    remove: async function(id){
        await axios.delete('https://emp2.herokuapp.com/removeUser/'+id).
        then(response => {
            axios.get('https://emp2.herokuapp.com/getUsers')
            .then(response => {
                this.users = response.data.users
            });
            alert(response.data.msg);
        });
        
    }
}
,
mounted() {
    axios.get('https://emp2.herokuapp.com/getUsers')
    .then(response => (this.users = response.data.users));
}
}
</script>

<style scoped>
</style>