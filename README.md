# Astro Theme: LluviAmE

## 简介

LluviAmE 是一个偏极简、以阅读和写作为中心的 Astro 博客主题。安装后会直接提供这些页面：

- `/`
- `/blog/`
- `/blog/[id]/`
- `/tags/`
- `/tags/[tag]/`
- `/rss.xml`

主题内置：

- 深浅色模式
- 标签页
- RSS
- Sitemap
- Pagefind 搜索

## 安装

先安装主题包：

```sh
npm install astro-theme-lluviame
```

在 `astro.config.mjs` 中启用主题：

```js
import { defineConfig } from 'astro/config';
import lluviame from 'astro-theme-lluviame';

export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [
    lluviame({
      title: '你的站点名',
      description: '你的站点描述',
      lang: 'zh-CN',
      ogImage: '/og-image.png',
      home: {
        headline: '你好，我是 ...',
        intro: '这里写首页简介。',
        links: [
          { text: 'GitHub', href: 'https://github.com/your-name' },
          { text: 'X', href: 'https://x.com/your-name' },
        ],
      },
    }),
  ],
});
```

在 `src/content.config.ts` 中注册博客内容集合：

```ts
import { blogCollection } from 'astro-theme-lluviame/content';

export const collections = {
  blog: blogCollection(),
};
```

把文章放到 `src/content/blog/` 下，然后运行：

```sh
npm run dev
```

## 你现在可以做什么

### 修改站点信息

可以在 `astro.config.mjs` 中修改这些内容：

- `title`
- `description`
- `lang`
- `ogImage`
- `home.headline`
- `home.intro`
- `home.links`

### 编写和管理文章

文章放在 `src/content/blog/` 下，支持 `.md` 和 `.mdx`。主题会读取这些 frontmatter 字段：

- `title`
- `description`
- `date`
- `tags`
- `draft`
- `image`

示例：

```md
---
title: "文章标题"
description: "文章摘要"
date: 2026-04-14
tags: ["随笔", "Astro"]
draft: false
image: "./cover.png"
---
```

### 让文章仓库独立出来

如果你想把文章仓库作为 Git submodule 挂到主题项目里，推荐直接挂到 `src/content/blog/`。  
文章和文章使用的图片可以放在同一个仓库里，一起迁移和维护。

### 扩展 frontmatter

可以在自己的 `src/content.config.ts` 中扩展 schema。  
但主题内部当前只会读取：

- `title`
- `description`
- `date`
- `tags`
- `draft`
- `image`

新增字段可以被校验和存储，但不会自动显示到页面上。

## 关于图片

图片分成两类：

- `ogImage`：全站默认分享图
- `image`：单篇文章的分享图

它们当前会用于：

- `og:image`
- `twitter:image`
- 链接分享预览

它们当前不会自动显示成文章封面图。

### 文章图片怎么放

推荐把图片直接放在文章文件旁边，并使用相对路径：

```text
src/content/blog/
  hello-world.md
  hello-cover.png
```

```md
image: "./hello-cover.png"
```

如果文章在子目录中，也一样按文章文件的相对路径写：

```text
src/content/blog/travel/
  japan.md
  japan-cover.png
```

```md
image: "./japan-cover.png"
```

### 默认分享图怎么放

`ogImage` 继续使用站点路径或完整 URL，例如：

```js
ogImage: '/og-image.png'
```

或者：

```js
ogImage: 'https://example.com/og-image.png'
```

## 需要注意

这个版本目前还没有开放这些覆盖方式：

- 全局 CSS 变量覆盖
- 组件样式覆盖
- 页面结构覆盖
- 使用新增 frontmatter 字段直接改写页面渲染

如果要改这些部分，当前做法是 fork 主题源码后再修改。
