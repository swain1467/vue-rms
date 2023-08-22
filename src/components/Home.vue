<template>
  <div class="row">
    <div @click="goToSignIn" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="card bg-success text-white text-center">
          <b>
            <i class="fa fa-sign-in"></i><span class = "nav-item"> Sign In</span>
          </b>
				</div>
		</div>
    <div @click="goToSignUp" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="card bg-warning text-white text-center">
          <b>
            <i class="fa fa-plus"></i><span class = "nav-item"> Sign Up</span>
          </b>
				</div>
		</div>
    <div @click="goToChangePassword" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="card bg-danger text-white text-center">
          <b>
            <i class="fa fa-key"></i><span class = "nav-item"> Change Password</span>
          </b>
				</div>
		</div>
    <div @click="goToHome" class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
				<div class="card bg-dark text-white text-center">
          <b>
            <i class="fa fa-home"></i><span class = "nav-item"> Home</span>
          </b>
				</div>
		</div>
  </div>
</template>

<script>
export default {
  methods:{
        goToSignIn(){
            this.$router.push({ name: 'sign_in'})
        },
        goToSignUp(){
            this.$router.push({ name: 'sign_up'})
        },
        goToChangePassword(){
            this.$router.push({ name: 'change_password'})
        },
        goToHome(){
            this.$router.push({ name: 'home'})
        }
    }
}
</script>

<style scoped>
.card{
  margin-top: 10%;
  height: 120px;
  padding-top: 50px;
  border-radius: 5% 5%;
}
.card:hover {
    -ms-transform: scale(0.8);
    /* IE 9 */
    -webkit-transform: scale(0.8);
    /* Safari 3-8 */
    transform: scale(0.8);
    transition: 0.5s;
}
</style>