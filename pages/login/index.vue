<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin? "Sign in" : "Sign up"}}</h1>
        <p class="text-xs-center">
          <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
          <nuxt-link v-else to="/login">Have an account?</nuxt-link>
        </p>

        <ul class="error-messages">
        <template v-for="(messages,filed) in errors">
            <li :key="index" v-for="(message,index) in messages">
                {{filed}} {{message}}
          </li>
        </template>
     
        </ul>

        <form @submit.prevent="onSubmit()">
          <fieldset v-if="!isLogin" class="form-group">
            <input  v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input  v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button  class="btn btn-lg btn-primary pull-xs-right">
            {{isLogin? "Sign in" : "Sign up"}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {login,register} from "/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
    middleware:"noAuthenticated",//在路由匹配之前先进行处理
    name:"Login",
    data(){
        return {
            user:{
                email:"",
                password:"",
                username:"" 
            },
            errors:{}
        }
    },
    methods:{
          async onSubmit(){
              if(this.isLogin){//登录
                    login({
                        user:this.user
                    }).then(x=>{
                        Cookie.set("user",x.data.user);
                        console.log(x.data.user)
                        this.$store.commit("setUser",x.data.user)
                        
                        this.$router.push("/")
                    }).catch(err=>{
                        this.errors = err.response.data.errors;
                    })
              }else{//注册
                register({
                    user:this.user
                }).then(x=>{
                // this.$router.push("/")
                }).catch(err=>{
                    this.errors = err.response.data.errors;
                })
              }
      
            // const {data} = await login({
            //     user:this.user
            // })
            // this.$router.push("/")
        }
    },
    computed:{
        isLogin(){
            return this.$route.name === 'login'
        }
    }
}
</script>

<style>

</style>