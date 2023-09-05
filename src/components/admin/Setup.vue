<template>
<Nav/>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 bg-white">
        <button @click="tabCity" :class="styleCity">City/Town</button>
        &nbsp;
        <button @click="tabArea" :class="styleArea">Area</button>
        &nbsp;
        <button @click="tabType" :class="styleType">Type</button>
    </div>
    <div class="tab-content"><br>
        <div class="row" v-if="showCity">
            <div v-if="showCityForm" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="hidden" class="form-control" v-model="txtCityId" autocomplete="off"/>
                <div class="form-group">
                    <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtCityName">City Name :&nbsp;<span class="text-danger">*</span></label>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="text" class="form-control" v-model="txtCityName" id="txtCityName" placeholder="Enter City Name" autocomplete="off"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label">Status :&nbsp;<span class="text-danger">*</span></label>
                    <input type="radio" value="1" v-model="txtCityStatus"/><i class='fa fa-check' style='color:green; font-weight:bolder'></i>
                    &ensp;&ensp;&ensp;
                    <input type="radio" value="0" v-model="txtCityStatus"/><i class='fa fa-times' style='color:red; font-weight:bolder'></i>
                </div>
                <div class="form-group">
                    <br>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <button type="buttion" @click="closeForm" class="btn btn-warning"><i class="fa fa-times fa-lg"></i> close</button>&ensp;
                        <button type="buttion" @click="saveCityData" class="btn btn-primary pull-right"><i class="fa fa-save fa-lg"></i> Save</button>
                    </div>
                </div>
                <br>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button @click="addCity" class="btn btn-success btn-sm"><i class="fa fa-plus"></i>&nbsp;Add</button>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center text-white bg-primary">Sl.No</th>
                            <th class="text-center text-white bg-primary">City/Town</th>
                            <th class="text-center text-white bg-primary">Status</th>
                            <th class="text-center text-white bg-primary">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='data in cityList' :key='data.id'>
                            <td style="width:10%;" class="text-center">{{data.sl_no}}</td>
                            <td style="width:50%;" class="text-left">{{data.city_name}}</td>
                            <td v-if="data.status == 1" style="width:20%;" class="text-center"><i class='fa fa-check' style='color:green; font-weight:bolder'></i></td>
                            <td v-else style="width:20%;" class="text-center"><i class='fa fa-times' style='color:red; font-weight:bolder'></i></td>
                            <td style="width:20%;" class="text-center">
                                <button class="btn btn-warning btn-sm action-btn" @click="updateCity(data.id, data.city_name, data.status)"><i class="fa fa-edit"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row" v-if="showArea">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                    <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selCity">Select City :&nbsp;<span class="text-danger">*</span></label>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <select class="form-control" id="selCity" v-model="selCity" @change="getAreaData();">
                            <option value= '' disabled>Select a city</option>
                            <option v-for='data in areaCityList' :key='data.id' :value='data.id'>{{ data.city_name }}</option>
                        </select>
                    </div>
                </div>
                <br>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center text-white bg-primary">Sl.No</th>
                            <th class="text-center text-white bg-primary">City/Town</th>
                            <th class="text-center text-white bg-primary">Area</th>
                            <th class="text-center text-white bg-primary">Status</th>
                            <th class="text-center text-white bg-primary">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='data in areaList' :key='data.id'>
                            <td style="width:10%;" class="text-center">{{data.sl_no}}</td>
                            <td style="width:25%;" class="text-left">{{data.city.city_name}}</td>
                            <td style="width:25%;" class="text-left">{{data.area_name}}</td>
                            <td v-if="data.status == 1" style="width:20%;" class="text-center"><i class='fa fa-check' style='color:green; font-weight:bolder'></i></td>
                            <td v-else style="width:20%;" class="text-center"><i class='fa fa-times' style='color:red; font-weight:bolder'></i></td>
                            <td style="width:20%;" class="text-center">
                                <button class="btn btn-warning btn-sm action-btn" @click="updateArea(data.id, data.area_name, data.status)"><i class="fa fa-edit"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row" v-if="showType">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center text-white bg-primary">Sl.No</th>
                            <th class="text-center text-white bg-primary">Prperty Type</th>
                            <th class="text-center text-white bg-primary">Status</th>
                            <th class="text-center text-white bg-primary">Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import isAdmin from '../../composables/isAdmin.js'
import axios from 'axios'

export default {
    components:{
        Nav
    },
    data(){
        return{
            token:'',
            user_id:'',
            showCity: true,
            showArea: false,
            showType: false,
            styleCity: 'btn btn-danger btn-sm',
            styleArea: 'btn btn-dark btn-sm',
            styleType: 'btn btn-dark btn-sm',

            cityList: '',
            showCityForm: false,
            txtCityId: '',
            txtCityName: '',
            txtCityStatus: '',

            selCity:'',
            areaCityList:'',
            areaList:'',
        }
    },

    mounted() { 
        if(isAdmin() == 0){
            this.$router.push({ name: 'sign_in'})
        }

        this.token = JSON.parse(localStorage.getItem('token'))
        this.user_id = JSON.parse(localStorage.getItem('user_id'))
        
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        };
        axios.get('auth/GetCityList',config)
        .then(
            res => {
                this.cityList = res.data.aaData
                this.areaCityList = res.data.aaData1
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    },
    methods:{
        tabCity(){
            this.showCity = true
            this.showArea = false
            this.showType = false
            this.styleCity = 'btn btn-danger btn-sm'
            this.styleArea = 'btn btn-dark btn-sm'
            this.styleType = 'btn btn-dark btn-sm'
        },
        tabArea(){
            this.showCity = false
            this.showArea = true
            this.showType = false
            this.styleCity = 'btn btn-dark btn-sm'
            this.styleArea = 'btn btn-danger btn-sm'
            this.styleType = 'btn btn-dark btn-sm'
        },
        tabType(){
            this.showCity = false
            this.showArea = false
            this.showType = true
            this.styleCity = 'btn btn-dark btn-sm'
            this.styleArea = 'btn btn-dark btn-sm'
            this.styleType = 'btn btn-danger btn-sm'
        },
        addCity(){
            this.showCityForm = true;
            this.txtCityId = '';
            this.txtCityName = '';
            this.txtCityStatus = 1
        },
        closeForm(){
            this.showCityForm = false;
        },
        updateCity(id, city_name, city_status){
            this.txtCityId = id
            this.txtCityName = city_name
            if(city_status == 1){
                this.txtCityStatus = 1
            }else{
                this.txtCityStatus = 0
            }
            this.showCityForm = true;
        },
        saveCityData(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const bodyParameters = {
                id: this.user_id,
                city_id: this.txtCityId,
                city_name: this.txtCityName,
                city_status: this.txtCityStatus,
            };
            axios.post( 'auth/SaveCity',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.showCityForm = false;
                        
                    }else if(res.data.status == 'Error'){
                        this.$toast.warning(res.data.message, {
                            position: 'top'
                        })
                    }else{
                        this.$toast.warning('Sorry something went wrong', {
                            position: 'top'
                        })
                    }
                    setTimeout(this.$toast.clear, 1000)
                    this.txtCityId= '',
                    this.txtCityName= '',
                    this.txtCityStatus= ''
                    axios.get('auth/GetCityList',config)
                        .then(
                            res => {
                                this.cityList = res.data.aaData
                                this.areaCityList = res.data.aaData1
                            }
                        ).catch(
                            err => {
                                console.log(err);
                            }
                        );
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                );
        },
        getAreaData(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const bodyParameters = {
            city_id: this.selCity
            };
            axios.post( 'auth/GetAreaList',bodyParameters,config)
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
    }
}
</script>

<style>
</style>