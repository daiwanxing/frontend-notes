"use strict";(self.webpackChunkfrontend_notes=self.webpackChunkfrontend_notes||[]).push([[402],{3757:(e,a,t)=>{t.r(a),t.d(a,{data:()=>n});const n={key:"v-7b6688b0",path:"/nuxt-doc/",title:"nuxt 是一个基于Vue的服务端渲染框架",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"路由",slug:"路由",children:[]},{level:2,title:"nuxt概念",slug:"nuxt概念",children:[]}],filePathRelative:"nuxt-doc/index.md",git:{updatedTime:162627481e4}}},1056:(e,a,t)=>{t.r(a),t.d(a,{default:()=>s});const n=(0,t(6252).uE)('<h1 id="nuxt-是一个基于vue的服务端渲染框架" tabindex="-1"><a class="header-anchor" href="#nuxt-是一个基于vue的服务端渲染框架" aria-hidden="true">#</a> nuxt 是一个基于Vue的服务端渲染框架</h1><h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h2><p>根据pages目录结构自动生成vue-router模块的路由配置，通过<code>&lt;nuxt-link&gt;</code>可以在页面之间使用路由。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token operator">&lt;</span>nuxt<span class="token operator">-</span>link to<span class="token operator">=</span><span class="token string">&quot;/&quot;</span><span class="token operator">&gt;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>nuxt中定义带参数的动态路由，需要创建下划线为前缀的Vue文件或目录</p><h2 id="nuxt概念" tabindex="-1"><a class="header-anchor" href="#nuxt概念" aria-hidden="true">#</a> nuxt概念</h2><p>基本算是弄懂了nuxt这个框架是怎么运行的，nuxt会在服务端跑一遍得到一个html文件后，转到浏览器再跑一遍。服务端的Vue有专属的钩子函数，比如query，head,fetch，asyncdata等等...</p><p>nuxt服务端，有两个生命周期钩子，<code>beforeCreate</code>和<code>created</code>，<code>asyncData</code>这个钩子函数用来提前获取服务端的数据并注入到data对象, <code>beforeCreate</code>和<code>created</code>是同时运行在客户端和服务端中。</p>',8),s={render:function(e,a){return n}}}}]);