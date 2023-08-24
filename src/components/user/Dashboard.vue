<template>
<Nav/>
<div class="row">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card bg-primary">
            <router-link :to="{name: 'find'}">
                <b class="text-white">
                    <i class = "fa fa-home"></i><br>
                    <span class = "nav-item">Find A House</span><br>
                    <span class = "nav-item">Or</span><br>
                    <i class = "fa fa-building"></i><br>
                    <span class = "nav-item">Commercial Place</span><br>
                </b>
            </router-link>
        </div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div class="card bg-success">
            <router-link :to="{name: 'post'}">
                <b class="text-white">
                    <i class = "fa fa-home"></i><br>
                    <span class = "nav-item">Post A House</span><br>
                    <span class = "nav-item">Or</span><br>
                    <i class = "fa fa-building"></i><br>
                    <span class = "nav-item">Commercial Place</span><br>
                </b>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
    components:{
        Nav
    },
    data(){
        return{
            user_name:'',
            user_type:'',
            user_id:'',

            showEmail: true,
        }
    },

    mounted() { 
      this.user_name = JSON.parse(localStorage.getItem('user_name'))
      this.user_id = JSON.parse(localStorage.getItem('user_id'))
      this.user_name = JSON.parse(localStorage.getItem('user_name'))
    },

    methods:{
        
    }
}
</script>

<style>

</style>