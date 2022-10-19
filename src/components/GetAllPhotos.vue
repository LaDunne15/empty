<template>
    <div>
        Додати зображення
        <p>
            <input type="text" v-model="name" placeholder="Name" name="name">
            <textarea v-model="desc" rows="2" placeholder="Description">
            </textarea>
            <input type="file" @change=uploadImage name="image">
            <button type="button" v-on:click="send">Завантажити</button>
        </p>


        
        <div v-for="img in imgs" :key="img._id">
            <h1>{{img.name}}</h1>
            <h2>{{img.desc}}</h2>
            <img class="image" :src="'data:'+img.img.contentType+';base64,'+img.img.data">
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'GetAllPhotos',
    data() {
    return {
        imgs:{},
        name:"",
        desc:"",
        img_p:"",
        file: ''
    }
},
methods: {
    uploadImage(e){
                this.file = e.target.files[0];
            },
    send: async function () {
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('desc', this.desc);
        formData.append('file', this.file);
        axios.post('https://emp2.herokuapp.com/upload',formData)
        .then(function (response) {
    //handle success
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
    }
}
,
mounted() {
    axios.get('https://emp2.herokuapp.com/image2')
    .then(response => (this.imgs = response.data.imgs));
}
}
</script>

<style scoped>
.image{
    height: 100px;
}
</style>