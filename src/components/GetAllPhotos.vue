<template>
    <div>
            <div class="addEnt">    
            <span>Додати зображення</span>
            <span>Назва:</span>
            <input type="text" v-model="name" placeholder="Введіть назву" name="name">
            <span>Опис:</span>
            <textarea v-model="desc" rows="2" placeholder="Введіть опис">
            </textarea>
            <span>Файл зображення:</span>
            <input type="file" @change=uploadImage name="image">
            <button v-on:click="send">Завантажити</button>
            </div>


        
        <div v-for="img in imgs" :key="img._id" class="imagediv">
            <button disabled>Редагувати</button>
            <img class="image" :src="'data:'+img.img.contentType+';base64,'+img.img.data">
            <span>{{img.name}}</span>
            <p>{{img.desc}}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router'
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
    console.log(response);
        router.go()
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
    .then(response => (this.imgs = response.data.imgs.reverse()));
}
}
</script>

<style scoped>




.imagediv{
    border: 5px dashed rgb(190, 190, 182);
    margin-bottom: 15px;
    border-radius: 15px;
    position: relative;
}

.imagediv>img{
    width: 100%;
    margin-top: 15px;
}

.imagediv>span{
    margin-left: 10px;
    font-size: 20px;
}
.imagediv>p{
    margin-left: 10px;
    font-size: 15px;
}

.imagediv>button{
    position: absolute;
    top: 10px;
    left: 100%;
    transform: translate(-90px);
    opacity: 0.7;
}
</style>