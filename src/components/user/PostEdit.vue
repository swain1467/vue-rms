<template>
    <Nav/>
    <div class="row">
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selCity">Select City :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selCity" v-model="selCity" @change="getArea()">
                    <option value= ''>Select a city</option>
                    <option v-for='data in cityList' :key='data.id' :value='data.id'>{{ data.city_name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selArea">Select Area :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selArea" v-model="selArea">
                    <option value= ''>Select a area</option>
                    <option v-for='data in areaList' :key='data.id' :value='data.id'>{{ data.area_name }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="selType">Select Type :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <select class="form-control" id="selType" v-model="selType">
                    <option value= ''>Select a property type</option>
                    <option v-for='data in typeList' :key='data.id' :value='data.id'>{{ data.type }}</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtAdvance">Advance :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control" v-model="txtAdvance" id="txtAdvance" placeholder="Enter Advance Amount" autocomplete="off"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtRentAmount">Rent :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control" v-model="txtRentAmount" id="txtRentAmount" placeholder="Enter Rent Amount/Month" autocomplete="off"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-5 control-label" for="txtAvailableFromDate">Available From :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control" v-model="txtAvailableFromDate" id="txtAvailableFromDate" placeholder="dd-Mon-yyyy" autocomplete="off"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtContactNo">Contact No :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <input type="text" class="form-control" v-model="txtContactNo" id="txtContactNo" placeholder="Enter Contact No." autocomplete="off"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 control-label" for="txtDetailedAddress">Address :&nbsp;<span class="text-danger">*</span></label>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <textarea type="text" class="form-control" v-model="txtDetailedAddress" id="txtDetailedAddress" placeholder="Enter Detailed Address" autocomplete="off" rows="3"></textarea>
            </div>
        </div>
        <div class="form-group">
            <br>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <button type="buttion" @click="$router.go(-1)" class="btn btn-success pull-right"><i class="fa fa-arrow-left fa-lg"></i></button>
                <button type="buttion" @click="deletePost" class="btn btn-danger"><i class="fa fa-trash fa-lg"></i></button>&ensp;
                <button type="buttion" @click="savePost" class="btn btn-dark"><i class="fa fa-pencil fa-lg"></i></button>
            </div>
        </div>
    </div>
    <br>
</template>

<script>
import { useRoute } from 'vue-router'
import Nav from '@/components/Nav.vue'
import axios from 'axios'

export default {
components:{
        Nav,
    },

data() {
    return {
            token:'',
            id:'',
            selCity:'',
            cityList:'',
            selArea:'',
            areaList:'',
            selType:'',
            typeList:'',

            txtAdvance:'',
            txtRentAmount:'',
            txtAvailableFromDate:'',
            txtContactNo:'',
            txtDetailedAddress:'',
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

        //Property Data
        const route = useRoute()
        this.id = route.params.id
        const bodyParameters = {
            id: this.id
        };
        axios.post( 'auth/GetHouseData',bodyParameters,config)
        .then(
            res => {
                this.houseList = res.data.aaData

                this.selCity = this.houseList[0].city_id
                this.selArea = this.houseList[0].area_id
                this.selType = this.houseList[0].type_id
                
                this.txtAdvance = this.houseList[0].advance
                this.txtRentAmount = this.houseList[0].rent
                this.txtAvailableFromDate = this.houseList[0].from_date
                this.txtContactNo = this.houseList[0].contact_no
                this.txtDetailedAddress = this.houseList[0].detailed_address
                // Area Drop down
                const bodyParams = {
                city_id: this.selCity
                };
                axios.post( 'auth/GetArea',bodyParams,config)
                .then(
                    res => {
                        this.areaList = res.data.aaData
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
        //Save post property
        savePost(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: this.id,
                selCity: this.selCity,
                selArea: this.selArea,
                selHouseType: this.selType,

                txtAdvance: this.txtAdvance,
                txtRentAmount: this.txtRentAmount,
                txtAvailableFromDate: this.txtAvailableFromDate,
                txtContactNo: this.txtContactNo,
                txtDetailedAddress: this.txtDetailedAddress,
                user_id: JSON.parse(localStorage.getItem('user_id'))
            
            };
            axios.post( 'auth/UpdateHouse',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'post_history'})
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
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                );
        },
        //Save post property
        deletePost(){
            let text = 'Are you sure to delete ?'
            if (confirm(text) == true) {
               
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: this.id,
            
            };
            axios.post( 'auth/DeleteHouse',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        this.$router.push({ name: 'post_history'})
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
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                ); 
            }
        }
    }
}
</script>

<style>

</style>