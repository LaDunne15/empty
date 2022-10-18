<template>
    <div>
        <p><button v-on:click="back">&#8592;Назад</button></p>
        Редагувати користувача
        <p>
        <input type="text" v-model="user.name" placeholder="Введіть Ім'я" required>
        <input type="number" v-model="user.age" placeholder="Введіть вік" required>
        <button type="button" v-on:click="edit">Змінити</button>
        </p>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
    name: 'EditUser',
    props: {
    id: String
    },
    data() {
    return {
        user:[]
    }
    },
    methods: {
        edit: async function() {
            var params = {
                name: this.user.name,
                age: this.user.age
            };
            await axios.put('http://localhost:3000/updateUser/'+this.id,params)
            .then(response => {
                alert(response.data.msg)
            });
        },
        back: function() {
            router.go(-1)
        }
    },
    mounted() {
    axios.get('http://localhost:3000/getUser/'+this.id)
    .then(response => (this.user = response.data.user));
    }
}
</script>
<style scoped>
</style>
