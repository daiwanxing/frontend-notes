import type { SidebarConfig } from '@vuepress/theme-default';
import { defineUserConfig } from "@vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { docsearchPlugin } from "@vuepress/plugin-docsearch"

const sidebar: SidebarConfig = {
    '/guide': [
        {
            text: "指南",
            children: [
                '/guide/css-doc/index.md',
                '/guide/broswer-doc/index.md',
                '/guide/js-doc/index.md',
                '/guide/vue-doc/index.md',
                '/guide/ts-doc/README.md',
                '/guide/gd-map/README.md',
                "/guide/gsap/README.md",
                "/guide/mini-app/README.md"
            ]
        }
    ]
}

module.exports = defineUserConfig({
    title: '前端笔记小册',
    lang: "zh-CN",
    base: "/frontend-notes/",
    description: '总结、归纳、提炼',
    port: 8088,
    locales: {
        "/": {
            lang: "zh-CN",
            title: "前端笔记小册",
        },
    },
    bundler: viteBundler(),
    head: [
        ['link', { rel: 'icon', href: '/frontend-notes/whale-16x16.png', type: "image/png", sizes: "16x16" }],
        ['link', { rel: 'icon', href: '/frontend-notes/fav.png', type: "image/png", sizes: "32x32" }],
        ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0" }]
    ],
    // themeConfig 的配置项属于主题配置
    theme: defaultTheme({
        lastUpdated: true,
        lastUpdatedText: "上一次更新时间",
        logo: "/logo.png",
        repo: "https://github.com/daiwanxing/frontend-notes",
        repoLabel: "GitHub",
        sidebar: sidebar,
        editLink: false,
        contributors: false,
    }),
    plugins: [
        docsearchPlugin({
            apiKey: "599cec31baffa4868cae4e79f180729b",
            appId: "R2IYF7ETH7",
            indexName: "docsearch"
        })
    ],
});