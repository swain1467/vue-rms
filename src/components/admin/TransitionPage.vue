<template>
<Nav/>
<div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div class="row">
            <div class="form-group">
                <label class="col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label" for="selCity">Select City :&nbsp;<span class="text-danger">*</span></label>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <select class="form-control" id="selCity" v-model="selCity" @change="getHouseData();">
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
                            <th class="text-center text-white bg-primary">Status</th>
                            <th class="text-center text-white bg-primary">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='data in houseList' :key='data.id'>
                            <td style="width:5%;" class="text-center">{{data.sl_no}}</td>
                            <td style="width:15%;" class="text-left">{{data.user.email}}</td>
                            <td style="width:10%;" class="text-left">{{data.contact_no}}</td>
                            <td style="width:10%;" class="text-left">{{data.from_date}}</td>
                            <td style="width:10%;" class="text-left">{{data.type.type}}</td>
                            <td style="width:15%;" class="text-left">{{data.area.area_name}}</td>
                            <td style="width:15%;" class="text-left">{{data.city.city_name}}</td>
                            <td v-if="data.status == 1" style="width:5%;" class="text-center"><i class='fa fa-check' style='color:green; font-weight:bolder'></i></td>
                            <td v-else style="width:5%;" class="text-center"><i class='fa fa-times' style='color:red; font-weight:bolder'></i></td>
                            <td style="width:10%;" class="text-center">
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
           cityList: '',
           selCity: '',
           txtSearch: '',
           houseList: '',
        }
    },

    mounted() { 
        if(isAdmin() == 0){
            this.$router.push({ name: 'sign_in'})
        }

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
    },
    methods:{
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
        }
    }
}
</script>

<style scoped>
.form-group {
  display: inline-flex;
}
</style>