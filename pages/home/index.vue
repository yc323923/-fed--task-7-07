<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">Aspen tech</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li v-if="user" class="nav-item">
              <nuxt-link exact :to="{
                name:'home',
                query:{
                  tab:'your_feed'
                }
                }"  class="nav-link" :class="{active:tab==='your_feed'}" >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link :to="{
                name:'home',
                query:{
                  tab:'global_feed'
                }
                }" exact  :class="{active:tab==='global_feed'}" class="nav-link" >Global Feed</nuxt-link >
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link exact  :to="{
                name:'home',
                query:{
                  tag:tag,
                  tab:'tag'
                }
                }"  v-if="tag" :class="{active:tab==='tag'}" class="nav-link"  >#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

          <div v-for="(article) in articles" :key= "article.slug"  class="article-preview">
            <div class="article-meta">
              <nuxt-link :to="{
                name:'profile',
                params:{
                  username:article.author.username
                }
              }"><img :src="article.author.image" /></nuxt-link >
              <div class="info">
                <nuxt-link :to="{
                name:'profile',
                params:{
                  username:article.author.username
                }
              }" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt | date}}</span>
              </div>
              <button :disabled="article.disabled" @click="onFavoriate(article)"  :class=" {active:article.favorited}" class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
              name:'article',
              params:{
                slug:article.slug
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
      
      <!-- 页码 -->
    <nav>
      <ul class="pagination">

        <li class="page-item" :class="{active:item===page}" :key="item" v-for="item in totalPage">

          <nuxt-link class="page-link " :to="{
            name:'home',
            query:{
              page:item,
              tag:tag,
              tab:tab
            }
          }">{{item}}</nuxt-link>

        </li>

      </ul>
    </nav>
      <!--  -->
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{
              name:'home',
              query:{
                tag:item,
                tab:'tag'
              }
            }" v-for="(item,index) in tags" :key="index" href="" class="tag-pill tag-default">{{item}}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles, getFeedArticles,addFavorite,deleteFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
    name:"Home",
    watchQuery:['page','tag','tab'],
    async asyncData({query,store}){
      const {state} = store;
      const page = Number.parseInt(query.page||1)
      const limit =3
      const tab = query.tab || 'global_feed'
      const loadArticles = (tab=== 'your_feed' && state.user)? getFeedArticles:getArticles
      // const tags= tagData.
      const [articleRes,tagRes] = await Promise.all([
        loadArticles({
          limit,
          offset:(page-1)*limit,
          tag:query.tag
        }) ,
        getTags()
        ])
      articleRes.data.articles.forEach(x => {
        x.disabled = false;
      });
      return {
        articles:articleRes.data.articles,
        articlesCount:articleRes.data.articlesCount,
        page,
        limit,
        tab:query.tab || 'global_feed',
        tag:query.tag,
        tags:tagRes.data.tags
      }
    },

    methods:{
      async onFavoriate(article){
        article.disabled = true;
        if(article.favorited){
           await deleteFavorite(article.slug)
          article.favorited = false;
           article.favoritesCount--;
        }else{
          await addFavorite(article.slug)
          article.favorited = true;
          article.favoritesCount++;
        }
          article.disabled = false;  
         
      }
    },

    computed:{
       ...mapState(['user']),
      totalPage(){
        return Math.ceil(this.articlesCount/this.limit)
      }
    }

}
</script>

<style>

</style>