<template>
    <div>
    <!-- 头部 -->
     <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <nuxt-link exact class="nav-link" to="/">Home</nuxt-link>
          </li>

          <template v-if="user">
          <li class="nav-item">
               <nuxt-link exact class="nav-link" to="/edit"> 
                    <i class="ion-compose"></i>&nbsp;New Post
               </nuxt-link>
          </li>
          <li class="nav-item">
                 <nuxt-link exact class="nav-link" to="/setting"> 
                    <i class="ion-gear-a"></i>&nbsp;Settings
               </nuxt-link>
          </li>
               <li class="nav-item">
            <nuxt-link class="nav-link" :to="{
                name:'profile',
                params:{
                    username:user.username
                }
               
            }" >
                 <img class="user-pic" :src="user.image">
                {{user.username}}
            </nuxt-link>
            </li>
          </template>
          <template v-else>
          <li class="nav-item">
                <nuxt-link class="nav-link" to="/register"> 
                    Sign up
               </nuxt-link>
          </li>
                <li class="nav-item">
                <nuxt-link class="nav-link" to="/login"> 
                    Sign in
               </nuxt-link>
          </li>
         </template>
        </ul>
      </div>
    </nav>
    <!-- 子路由 -->
    <nuxt-child></nuxt-child>
    <!-- 底部 -->
    <footer>
        <div class="container">
            <a href="/" class="logo-font">conduit</a>
            <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
            </span>
        </div>
    </footer>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:"Layout",
    mounted(){
        console.log(this,1111)
    },
    computed:{
        ...mapState(['user'])
    }
}
</script>

<style>

</style>