<template>
<Nav/>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="row">
            <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="selCity">Select City :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <select class="form-control" id="selCity" v-model="selCity" @change="getHouseData(); getArea();">
                        <option value= '' disabled>Select a city</option>
                        <option v-for='data in cityList' :key='data.id' :value='data.id'>{{ data.city_name }}</option>
                    </select>
                </div>
                 <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1"></div>
                <label class="col-lg-1 col-md-1 col-sm-1 col-xs-1 control-label" for="search">Search :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <input type="text" class="form-control" v-model="txtSearch" id="search" @input="getHouseData();" placeholder="Search..." autocomplete="off"/>
                </div>
            </div>
            <input type="hidden" class="form-control" v-model="txtId" autocomplete="off"/>
            <div v-if="showForm" class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="selArea">Select Area :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <select class="form-control" id="selArea" v-model="selArea">
                        <option value= '' disabled>Select a area</option>
                        <option v-for='data in areaList' :key='data.id' :value='data.id'>{{ data.area_name }}</option>
                    </select>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="selType">Select Type :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <select class="form-control" id="selType" v-model="selType">
                        <option value= ''>Select a property type</option>
                        <option v-for='data in typeList' :key='data.id' :value='data.id'>{{ data.type }}</option>
                    </select>
                </div>
            </div>
            <div v-if="showForm" class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="txtHDAdvance">Advance Amount :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input type="text" class="form-control" v-model="txtHDAdvance" id="txtHDAdvance" placeholder="Enter Advance Amount" autocomplete="off"/>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="txtHDRentAmount">Rent Amount/Month :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input type="text" class="form-control" v-model="txtHDRentAmount" id="txtHDRentAmount" placeholder="Enter Amount/Month" autocomplete="off"/>
                </div>
            </div>
            <div v-if="showForm" class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="txtHDAvailableFromDate">Available From Date :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input type="text" class="form-control" v-model="txtHDAvailableFromDate" id="txtHDAvailableFromDate" placeholder="Enter Available From Date" autocomplete="off"/>
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="txtHDContactNo">Contact Number :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <input type="text" class="form-control" v-model="txtHDContactNo" id="txtHDContactNo" placeholder="Enter Contact Number" autocomplete="off"/>
                </div>
            </div>
            <div v-if="showForm" class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="txtHDDetailedAddress">Detailed Address :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                    <textarea type="text" class="form-control" v-model="txtHDDetailedAddress" id="txtHDDetailedAddress" placeholder="Enter Detailed Address" autocomplete="off" rows="1"></textarea>
                </div>
            </div>
             <div v-if="showForm" class="form-group">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <button type="buttion" @click="closeForm" class="btn btn-danger btn-sm"><i class="fa fa-times fa-sm"></i> close</button>&ensp;
                    <button type="buttion" @click="saveHDData" class="btn btn-primary btn-sm pull-right"><i class="fa fa-save fa-sm"></i> Save</button>
                </div>
             </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <br>
				<table class="table table-striped table-bordered" id="dtblHD">
                    <thead class="bg-primary">
                        <tr>
                            <th class="text-center text-white bg-primary">Sl.No</th>
                            <th class="text-center text-white bg-primary">User's Mail</th>
                            <th class="text-center text-white bg-primary">Contact No</th>
                            <th class="text-center text-white bg-primary" title="Available From">Avl From</th>
                            <th class="text-center text-white bg-primary">Type</th>
                            <th class="text-center text-white bg-primary">Area</th>
                            <th class="text-center text-white bg-primary">City</th>
                            <th class="text-center text-white bg-primary">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='data in houseList' :key='data.id'>
                            <td style="width:10%;" class="text-center">{{data.sl_no}}</td>
                            <td style="width:15%;" class="text-left">{{data.user.email}}</td>
                            <td style="width:10%;" class="text-left">{{data.contact_no}}</td>
                            <td style="width:10%;" class="text-left">{{data.from_date}}</td>
                            <td style="width:10%;" class="text-left">{{data.type.type}}</td>
                            <td style="width:15%;" class="text-left">{{data.area.area_name}}</td>
                            <td style="width:15%;" class="text-left">{{data.city.city_name}}</td>
                            <td style="width:10%;" class="text-center">
                                <button class="btn btn-warning btn-sm action-btn" @click="updateHD(data.id, data.area_id, data.type_id, data.advance, data.rent, data.from_date, data.contact_no, data.detailed_address)"><i class="fa fa-edit"></i></button>
                                &nbsp;
                                <button class="btn btn-danger btn-sm action-btn" @click="deleteHD(data.id)"><i class="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
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
           token: '',
           selCity: '',
           cityList: '',
           txtSearch: '',
           houseList: '',

           showForm: false,
           txtId: '',
           selArea: '',
           areaList: '',
           selType: '',
           typeList: '',
           txtHDAdvance: '',
           txtHDRentAmount: '',
           txtHDAvailableFromDate: '',
           txtHDContactNo: '',
           txtHDDetailedAddress: '',
           
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
    methods:{
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
        getHouseData(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const bodyParameters = {
            city_id: this.selCity,
            search: this.txtSearch
            };
            axios.post( 'auth/GetHouseDetailsList',bodyParameters,config)
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
        deleteHD(id){
            let text = 'Are you sure to delete ?'
            if (confirm(text) == true) {
               
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            const bodyParameters = {
                id: id,
            };
            axios.post( 'auth/DeleteHouse',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                        this.$toast.success(res.data.message, {
                            position: 'top'
                        })
                        const bodyParameters = {
                        city_id: this.selCity,
                        search: this.txtSearch
                        };
                        axios.post( 'auth/GetHouseDetailsList',bodyParameters,config)
                        .then(
                            res => {
                                this.houseList = res.data.aaData
                            }
                        ).catch(
                            err => {
                                console.log(err);
                            }
                        );
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
        },
        updateHD(id, area_id, type_id, advance, rent, from_date, contact_no, detailed_address){
            this.showForm = true;
            this.txtId = id
            this.selArea = area_id
            this.selType = type_id
            this.txtHDAdvance = advance
            this.txtHDRentAmount = rent
            this.txtHDAvailableFromDate = from_date
            this.txtHDContactNo = contact_no
            this.txtHDDetailedAddress = detailed_address
        },
        closeForm(){
            this.showForm = false;
        },
        saveHDData(){
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };
            const bodyParameters = {
                user_id: this.user_id,
                id: this.txtId,
                selCity: this.selCity,
                selArea: this.selArea,
                selHouseType: this.selType,
                txtAdvance: this.txtHDAdvance,
                txtRentAmount: this.txtHDRentAmount,
                txtAvailableFromDate: this.txtHDAvailableFromDate,
                txtContactNo: this.txtHDContactNo,
                txtDetailedAddress: this.txtHDDetailedAddress,
            };
            axios.post( 'auth/UpdateHouseDetails',bodyParameters,config)
            .then(
                res => {
                    if(res.data.status == 'Success'){
                            this.$toast.success(res.data.message, {
                                position: 'top'
                            })
                            this.showForm = false;

                            const bodyParameters = {
                            city_id: this.selCity,
                            search: this.txtSearch
                            };
                            axios.post( 'auth/GetHouseDetailsList',bodyParameters,config)
                            .then(
                                res => {
                                    this.houseList = res.data.aaData
                                }
                            ).catch(
                                err => {
                                    console.log(err);
                                }
                            );
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
    }
}
</script>

<style scoped>
.form-group {
  display: inline-flex;
  margin-top: 1%;
}
</style>