# Astro Theme: LluviAmE

LluviAmE 是一个追求视觉轻量化的 Astro 主题  

---

## 使用教程

克隆该项目，并安装依赖  
```sh
npm install
``` 

所有的博客文章都存放在 `src/content/blog/` 目录下，支持 `.md` 和 `.mdx` 格式  

Markdown 文件需要在文件顶部添加 Frontmatter 元数据   

```markdown
---
title: "哈基米"
date: 1234-01-16
tags: ["随笔", "Astro"]
draft: false

---

这是我的第一篇文章内容...
```

推荐使用 git submodule 管理文章内容，便于无痛切换博客主题  
```bash
# 删除默认的空目录
rm -rf src/content/blog

# 添加你自己的文章仓库作为 submodule
git submodule add https://你的文章仓库.git src/content/blog
```

准备好发布时运行构建命令  
```sh
npm run build
```

你能在 `dist/` 文件夹下看到你的静态页面  

---

## 项目说明

### 目录结构

```text
├── src/
│   ├── components/    # 独立的可复用 UI 组件 (如 Navbar, SEO, TOC, Search)
│   ├── content/       # 内容集合配置与 Markdown 存放处
│   ├── layouts/       # 页面基础布局 (BaseLayout)
│   ├── pages/         # 路由页面 (Home, Blog 列表, Tags 分类, RSS)
│   ├── styles/        # 全局样式文件
│   └── env.d.ts       # TypeScript 类型声明
├── astro.config.mjs   # Astro 核心配置文件
└── tsconfig.json      # TypeScript 配置
```

### 1. 修改站点基础信息

在 `astro.config.mjs` 中修改 `site` 属性为你自己的域名：

```javascript
export default defineConfig({
  site: 'https://你的域名.com', // 必须修改，用于生成 Sitemap 和 RSS
  // ...
});
```

### 2. 修改主页内容

主页的内容位于 `src/pages/index.astro`  
可以修改 `<section class="intro">` 和 `<section class="links">` 中的 HTML 内容来更新你的自我介绍和友情链接

### 3. 全局样式

所有的全局变量和样式都定义在 `src/styles/global.css` 中。你可以轻松修改配色方案、字体大小和最大宽度：

```css
:root {
  --font-base: 'Courier New', Courier, monospace, sans-serif; /* 正文字体 */
  --font-code: 'Maple Mono', 'Courier New', Courier, monospace, sans-serif; /* 代码块字体 */
  --color-bg: #ffffff;      /* 亮色模式背景 */
  --color-text: #000000;    /* 亮色模式文字 */
  /* ... */
}

html[data-theme='dark'] {
  --color-bg: #121212;      /* 暗色模式背景 */
  --color-text: #e0e0e0;    /* 暗色模式文字 */
  /* ... */
}
```

### 4. 修改 Markdown 渲染与代码高亮主题

代码高亮主题在 `astro.config.mjs` 中配置。默认使用了 GitHub 的双色主题：

```javascript
markdown: {
  shikiConfig: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
},
```
你可以将其修改为 Shiki 支持的任何其他主题  

### 5. 调整文章 Frontmatter 结构

如果你需要在 Markdown 中添加更多的元数据（如 `description`, `coverImage` 等），你需要修改 `src/content.config.ts` 中的 Zod schema：

```typescript
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    // 在这里添加新的字段，例如：
    // description: z.string().optional(),
  }),
});
```
修改 Schema 后，你可以在 `src/pages/blog/[id].astro` 中通过 `post.data.description` 获取并渲染它  
