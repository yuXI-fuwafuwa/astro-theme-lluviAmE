---
title: "Hello World in LluviAmE"
description: "示例文章，展示如何让图片和文章文件一起放在内容仓库中。"
date: 2026-04-12
tags: ["hello", "astro", "lluviame"]
draft: false
image: "./hello-cover.svg"
---

# 欢迎使用 LluviAmE 主题

这是一个极致轻量、实用主义、专注于阅读和创作体验的 Astro 静态博客主题。

## 核心架构

推荐将文章和图片作为一个独立的 Git Submodule 挂载到 `src/content/blog/`，实现主题代码和个人文章资产的完全解耦，方便未来无痛迁移。

### 代码高亮测试

下面是一段测试代码：

```javascript
function hello() {
  console.log("Hello, LluviAmE!");
  return true === false; // 连字测试
}
```

### 数学公式测试

行内公式示例：$E = mc^2$。

块级公式示例：

$$
\int_{0}^{1} x^2 \, dx = \frac{1}{3}
$$

> 这是一段引用块。

## 结语

享受写作吧！
