<template>
    <Nav/>
    <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th class="text-center text-white bg-success" title="House/Commercial Place">Type</th>
                        <th class="text-center text-white bg-success" title="Available From">Available From</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='data in houseList' :key='data.id'>
                        <td @click="editData(data.id)" style="width:50%;" class="text-left">{{data.type.type}}</td>
                        <td @click="editData(data.id)" style="width:50%;" class="text-center">{{data.from_date}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br>
</template>

<script>
import Nav from '@/components/Nav.vue'
import axios from 'axios'

export default {
components:{
        Nav,
    },
data() {
    return {
            token:'',
            selCity:'',
            cityList:'',
            selArea:'',
            areaList:'',
            selType:'',
            typeList:'',
            houseList:''
        }
  },

mounted(){
        this.token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
            user_id: JSON.parse(localStorage.getItem('user_id'))
        };
        axios.post( 'auth/GetHouseList',bodyParameters,config)
        .then(
            res => {
                this.houseList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    },
    methods:{
        editData(id){
            this.$router.push({ name: 'post_edit', params: { id: id }})
        }
    }
}
</script>

<style>

</style>