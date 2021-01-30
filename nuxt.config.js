module.exports={
  server:{
    host:'0.0.0.0',
    port:3000
  },
    router: {
        linkActiveClass:"active",
        extendRoutes(routes, resolve) {
          routes.splice(0);
          routes.push(...[
              {
                  path:"/",
                  component:resolve(__dirname,"pages/layout/"),
                  children:[
                      {
                          path:'',//默认子路由
                          name:"home",
                          component:resolve(__dirname,'pages/home/')
                      },
                      {
                        path:'/login',
                        name:"login",
                        component:resolve(__dirname,'pages/login/')
                      },
                      {
                        path:'/register',
                        name:"register",
                        component:resolve(__dirname,'pages/login/')
                      },
                      {
                        path:'/profile/:username',
                        name:"profile",
                        component:resolve(__dirname,'pages/profile/')
                      },
                      {
                        path:'/article/:slug',
                        name:"article",
                        component:resolve(__dirname,'pages/article/')
                      },
                      {
                        path:'/setting',
                        name:"setting",
                        component:resolve(__dirname,'pages/setting/')
                      },
                      {
                        path:'/edit',
                        name:"edit",
                        component:resolve(__dirname,'pages/edit/')
                      },
                  ]
              }
          ])
        }
      },

      //注册插件
      plugins:[
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
      ]
}