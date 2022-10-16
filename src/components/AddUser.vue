<template>
    <div>
        Сторінка

        <input type="text" v-model="name" placeholder="Введіть Ім'я" required>
        <input type="number" v-model="age" placeholder="Введіть вік" required>
        <button type="button" v-on:click="send">Записати</button>
        {{name}}

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
      await axios.post('http://emp2.herokuapp.com/ora',params)
      .then(response => (this.name = response));
    
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
  