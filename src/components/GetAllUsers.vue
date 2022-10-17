<template>
    <div>
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
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'GetAllUsers',
    data() {
    return {
        users:[]
    }
},
methods: {
    
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