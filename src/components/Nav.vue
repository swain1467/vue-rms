<template>
  <br>
    <div class="row">
        <div class="text-center col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <button v-if="open_nav" class="action-btn btn btn-warning btn-md pull-left" id="navBar" @click="openNav()"><i class="fa fa-times text-white"></i></button>
            <button v-else class="action-btn btn btn-warning btn-md pull-left" id="navBar" @click="openNav()"><i class="fa fa-bars text-white"></i></button>
            <span class="btn-xs btn btn-warning text-white" style="font-size: 16px; border-radius: 15%;">
                <b>Hi {{user_name}} <i class="fa fa-user fa-lg"></i></b>
            </span>
            <button @click="signOut()" class="action-btn btn btn-warning btn-md pull-right"><i  class="fa fa-power-off text-white"></i></button>
        </div>
    </div>
    <br>
    <div id="mySidepanel" class="sidepanel">
        <h4><router-link :to="{name: 'user_dashboard'}">Dashboard</router-link></h4>
        <h4><router-link :to="{name: 'find'}">Find</router-link></h4>
        <h4><router-link :to="{name: 'post'}">Post</router-link></h4>
        <h4><router-link :to="{name: 'post_history'}">Post History</router-link></h4>
        <h4 v-if="user_type === 'ADMIN'"><router-link :to="{name: 'admin_dashboard'}">Admin Dashboard</router-link></h4>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            user_name:'',
            user_type:'',
            open_nav: false,
            token:''
        }
    },

    mounted() { 
    this.user_name = JSON.parse(localStorage.getItem('user_name'))
    this.user_type = JSON.parse(localStorage.getItem('user_type'))
    this.token = JSON.parse(localStorage.getItem('token'))
    const config = {
        headers: { Authorization: `Bearer ${this.token}` }
        };
    axios.get( 
        'auth/Me',
        config
    ).then(
            res => {
                if(res.data != '1'){
                    this.$router.push({ name: 'sign_in'})
                }
            }
    ).catch(
            err => {
            this.$router.push({ name: 'sign_in'})
            }
    );
    },

    methods:{
        openNav() {
            let x = document.getElementById("mySidepanel");
            if (x.style.width === "100%") {
                this.open_nav = false
                x.style.width = "0";
            } else {
                this.open_nav = true
                x.style.width = "100%";
            }
        },
        signOut(){
            let text = 'Are you sure? want to logout.'
            if (confirm(text) == true) {
                localStorage.clear()
                this.$toast.success('You have signed out', {
                    position: 'top'
                })
                setTimeout(this.$toast.clear, 1000)
                this.$router.push({ name: 'sign_in'})
            }
        }
    }
}
</script>

<style scoped>

/* Common User styles */
.sidepanel {
    width: 0;
    position: fixed;
    z-index: 2;
    height: 90%;
    left: 0;
    background-color: #eea236;
    opacity: 0.9;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidepanel a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    display: block;
    /* transition: 0.3s; */
}

.sidepanel a:hover {
    color: #000;
}
</style>>