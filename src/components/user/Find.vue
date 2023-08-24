<template>
    <Nav/>
    <div class="row">
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selCity">Select City :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selCity" v-model="selCity" @change="getArea(); getHouseList();">
                    <option value= '' disabled>Select a city</option>
                    <option v-for='data in cityList' :key='data.id' :value='data.id'>{{ data.city_name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selArea">Select Area :</label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selArea" v-model="selArea" @change="getHouseList();">
                    <option value= ''>Select a area</option>
                    <option v-for='data in areaList' :key='data.id' :value='data.id'>{{ data.area_name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selType">Select Type :</label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selType" v-model="selType" @change="getHouseList();">
                    <option value= ''>Select a property type</option>
                    <option v-for='data in typeList' :key='data.id' :value='data.id'>{{ data.type }}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="row">
        <div v-for='data in houseList' :key='data.id' class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="card bg-dark">
                <b class="text-white" style="text-align:left; padding-left:5%;">
                    <li><i class = "fa fa-home"></i>&nbsp;<span class = "nav-item">{{data.type.type}}</span></li>
                    <li><span class = "nav-item">Available From: {{data.from_date}}</span></li>
                    <li><span class = "nav-item">Area: {{data.area.area_name}}</span></li>
                    <li><span class = "nav-item">Address: {{data.detailed_address}}</span></li>
                    <li><span class = "nav-item">Advance Amount: {{data.advance}}</span></li>
                    <li><span class = "nav-item">Rent Per Month: {{data.rent}}</span></li>
                    <li><span class = "nav-item">Posted By: {{data.user.name}}</span></li>
                    <li><span class = "nav-item">Contact No: {{data.contact_no}}</span></li>
                </b>
            </div>
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
        //City List
        axios.get( 'auth/GetCity',config)
        .then(
            res => {
                this.cityList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
        //Property Type List
        axios.get( 'auth/GetType',config)
        .then(
            res => {
                this.typeList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    },
 methods: {
    getArea(){
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
          city_id: this.selCity
        };
        axios.post( 'auth/GetArea',bodyParameters,config)
        .then(
            res => {
                this.areaList = res.data.aaData
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    },
    getHouseList(){
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        const bodyParameters = {
          city: this.selCity,
          area: this.selArea,
          type: this.selType
        };
        axios.post( 'auth/GetAvailableHouseList',bodyParameters,config)
        .then(
            res => {
                this.houseList = res.data.aaData
                console.log(houseList);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }
 }
}
</script>

<style>

</style>