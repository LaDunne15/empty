<template>
    <div>
        Додати користувача
        <p>
        <input type="text" v-model="name" placeholder="Введіть Ім'я" required>
        <input type="number" v-model="age" placeholder="Введіть вік" required>
        <button type="button" v-on:click="send">Записати</button>
        </p>
    </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'AddUser',
    data() {
    return {
      name: "",
      age: 0
    }
  },
  methods: {
    send: async function (){
      var params = {
        name: this.name,
        age: this.age
      };
      await axios.post('https://emp2.herokuapp.com/addUser',params)
      .then(() => {
        alert("Користувача додано")
        this.name = "";
        this.age = "";
      });
    
  }}
  ,
  mounted() {
    /*axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.name = response));
    */
  }
  }
</script>

<style scoped>
</style>
  