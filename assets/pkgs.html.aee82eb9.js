import{_ as t,r as d,o as s,c as i,b as e,d as r,a as n,e as o}from"./app.9ea0554d.js";const c={},l=n('<h2 id="\u76EE\u524D\u5E38\u7528\u7684\u5305\u7BA1\u7406\u5DE5\u5177\u6709npm\u3001yarn\u5DF2\u7ECF\u6700\u65B0\u51FA\u6765\u7684pnpm-\u5B83\u4EEC\u7684\u8BDE\u751F\u662F\u4E3A\u4E86\u89E3\u51B3\u524D\u7AEF\u9879\u76EE\u4E2D\u5404\u4E2A\u5E93\u4E4B\u524D\u7684\u4F9D\u8D56\u7E41\u6742\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u76EE\u524D\u5E38\u7528\u7684\u5305\u7BA1\u7406\u5DE5\u5177\u6709npm\u3001yarn\u5DF2\u7ECF\u6700\u65B0\u51FA\u6765\u7684pnpm-\u5B83\u4EEC\u7684\u8BDE\u751F\u662F\u4E3A\u4E86\u89E3\u51B3\u524D\u7AEF\u9879\u76EE\u4E2D\u5404\u4E2A\u5E93\u4E4B\u524D\u7684\u4F9D\u8D56\u7E41\u6742\u7684\u95EE\u9898" aria-hidden="true">#</a> \u76EE\u524D\u5E38\u7528\u7684\u5305\u7BA1\u7406\u5DE5\u5177\u6709npm\u3001yarn\u5DF2\u7ECF\u6700\u65B0\u51FA\u6765\u7684pnpm\uFF0C\u5B83\u4EEC\u7684\u8BDE\u751F\u662F\u4E3A\u4E86\u89E3\u51B3\u524D\u7AEF\u9879\u76EE\u4E2D\u5404\u4E2A\u5E93\u4E4B\u524D\u7684\u4F9D\u8D56\u7E41\u6742\u7684\u95EE\u9898</h2><h3 id="yarn-\u548C-npm-\u5B89\u88C5\u7BA1\u7406\u4F9D\u8D56\u6240\u6267\u884C\u7684cmd\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#yarn-\u548C-npm-\u5B89\u88C5\u7BA1\u7406\u4F9D\u8D56\u6240\u6267\u884C\u7684cmd\u533A\u522B" aria-hidden="true">#</a> yarn \u548C npm \u5B89\u88C5\u7BA1\u7406\u4F9D\u8D56\u6240\u6267\u884C\u7684cmd\u533A\u522B</h3><table><thead><tr><th></th><th>yarn</th><th style="text-align:center;">npm</th></tr></thead><tbody><tr><td>\u5B89\u88C5\u6240\u6709\u4F9D\u8D56</td><td>yarn install / yarn</td><td style="text-align:center;">npm install / npm i</td></tr><tr><td>\u5B89\u88C5\u5355\u4E2A\u4F9D\u8D56</td><td>yarn add package-name</td><td style="text-align:center;">npm install package-name</td></tr><tr><td>\u5378\u8F7D\u5355\u4E2A\u4F9D\u8D56</td><td>yarn remove package-name</td><td style="text-align:center;">npm uninstall package-name</td></tr><tr><td>\u5347\u7EA7\u67D0\u4E2A\u4F9D\u8D56</td><td>yarn upgrade package-name</td><td style="text-align:center;">npm update package-name</td></tr></tbody></table><p>\u6CE8\u610F\uFF1A\u5728yarn1.<em>\u4E2D\u662F\u517C\u5BB9<code>.npmrc</code>\u6587\u4EF6\u7684\u4E14<code>.npmrc</code>\u4F18\u5148\u7EA7\u9AD8\u4E8E<code>.yarnrc</code>\uFF0C\u4F46\u662Fyarn2.</em>(\u53C8\u540D yarn Berry)\u5F00\u59CB\u4E0D\u518D\u652F\u6301<code>.npmrc</code>\u548C<code>.yarnrc</code>\uFF0C\u800C\u662F\u7528<code>.yarnrc.yml</code>\u4F5C\u4E3A\u66FF\u4EE3\u3002</p><p>\u800C\u4E14<code>.yarnrc.yml</code>\u548C<code>.npmrc</code>\u7684\u914D\u7F6E\u6587\u4EF6\u8BED\u6CD5\u683C\u5F0F\u4E0D\u540C,</p><p><code>.yarnrc.yml</code>: <code>&quot;strict-ssl&quot;: false</code> <br><code>.npmrc</code>: <code>strict-ssll=false</code></p>',6),p={href:"https://blog.logrocket.com/javascript-package-managers-compared/#brief-history-javascript-package-managers",target:"_blank",rel:"noopener noreferrer"},m=o("pnpm\u3001npm\u3001yarn\u4E09\u8005\u4E4B\u95F4\u7684\u533A\u522B"),h=n(`<h2 id="\u73B0\u5728\u5C31\u505C\u6B62\u4F7F\u7528yarn-classic\u548Cnpm-\u6362\u4E0A\u6700\u65B0\u7684pnpm" tabindex="-1"><a class="header-anchor" href="#\u73B0\u5728\u5C31\u505C\u6B62\u4F7F\u7528yarn-classic\u548Cnpm-\u6362\u4E0A\u6700\u65B0\u7684pnpm" aria-hidden="true">#</a> \u73B0\u5728\u5C31\u505C\u6B62\u4F7F\u7528yarn classic\u548Cnpm\uFF0C\u6362\u4E0A\u6700\u65B0\u7684pnpm!</h2><p>\u4E00\u4E2A\u65B0\u4E8B\u7269\u7684\u8BDE\u751F\u5F80\u5F80\u5C31\u6709\u5176\u5B58\u5728\u7684\u610F\u4E49\uFF0C\u8FC7\u53BB\u5E38\u7528\u7684\u5305\u7BA1\u7406\u5DE5\u5177\u4E00\u822C\u90FD\u662Fnpm\u6216\u8005yarn\u3002\u73B0\u5728\u6211\u4EEC\u53C8\u591A\u4E86\u4E00\u79CD\u65B0\u7684\u9009\u62E9\uFF1Apnpm</p><p>pnpm\u76F8\u6BD4yarn \u548C npm \u4F5C\u4E3A\u5305\u7BA1\u7406\u5DE5\u5177\u771F\u7684\u662F\u6709\u592A\u591A\u5389\u5BB3\u7684\u5730\u65B9\u53EF\u4EE5\u540A\u6253\u5176\u4ED6\u4E24\u4F4D\u4E86\u3002</p><ol><li>\u8D85\u5FEB\u7684\u5B89\u88C5\u901F\u5EA6\u4EE5\u53CA\u8282\u7701\u5927\u91CF\u7684\u78C1\u76D8\u5B58\u50A8\u7A7A\u95F4</li></ol><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>Suppose you have 10 projects that use the exact same dependencies, then when using npm or Yarn, you will keep copies of those 10 exact dependencies on disk. When you have enough projects or dependencies, your disk can burst.

And pnpm uses content-addressable storage technology. This technique maximizes the use of disk space. Specifically this:

When a dependency is not installed, pnpm will download it and place it in a unified location. Then add to the project via hard link. Similarly, when this dependency is also used in other projects, it will also be hard-linked to the corresponding location. Of course, this is all based on the version applicable. If the version is not applicable, then the new one will be downloaded and used.

It can be said that it uses hard links cleverly to save disk space. And it installs faster!
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>\u62E5\u6709\u4E00\u4E2A\u975Eflat\u7684node_modules\u76EE\u5F55</li></ol><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code>When installing dependencies, npm and Yarn Classic try to elevate all packages to the root of node_modules whenever possible. Therefore, dependencies not listed in package.json are accessible in the project code.

In contrast to pnpm, it uses symbolic links to ensure that only those dependencies listed in package.json are accessible in the project code. This avoids silly bugs and avoids repeated installations.

It would take a lot of time to explain the details of how it works, so I put it in another article. If you are interested in it, please check it out.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li></li></ol>`,8);function u(y,v){const a=d("ExternalLinkIcon");return s(),i("div",null,[l,e("p",null,[e("a",p,[m,r(a)])]),h])}var g=t(c,[["render",u],["__file","pkgs.html.vue"]]);export{g as default};
