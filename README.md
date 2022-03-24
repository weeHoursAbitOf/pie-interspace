# pie-interspace
  项目名称：空间项目前端项目
  开发框架：vue+iview
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

项目目录介绍：
components目录： 组件目录，所有组件都归属于components目录下，按模块在components目录下建子目录
assets目录：存放静态文件，项目中所有的静态文件都放在该目录下，某一个模块静态文件过多时在assets文件夹新建子目录存放便于后期维护。
config目录：存放配置文件
mixins目录：分发 Vue 组件中的可复用功能，大项目或者复用功能多时使用。
router目录：存放路由配置文件，可以在该目录下建子目录分模块配置路由，配置路由时建议使用按需加载的形式配置
store目录：用于vuex文件存放，项目大模块多时可以建子目录，便于维护
styles目录：存放 常量（统一颜色值、边距）、基础样式 、公用样式文件 （variables.less 常量配置）
utils目录：存放公用方法文件
views目录：存放页面文件，按模块在该目录下建子目录，分模块管理
vue.config文件：配置文件，配置webpack等
api目录：封装好的接口方法，页面直接调用避免不同的人在页面上各种不同的写法，造成难以维护，按模块在api目录下建子目录


接口联调:
对接接口时要根据接口返回的状态码做不同的逻辑处理，不能以乐观的方式去对接接口，尤其操作类（增加、删除、改）接口对接时需要有相应提示

代码管理
主分支（master)、开发分支（dev）