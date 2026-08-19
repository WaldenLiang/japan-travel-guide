# GitHub Pages 部署说明

本目录已经准备好 GitHub Pages 静态站点：

- `index.html`：默认入口，会跳转到攻略页面
- `japan-travel-guide.html`：攻略正文
- `.nojekyll`：确保 `_shared/` 目录能被 GitHub Pages 正常发布
- `_shared/`、`assets/`：字体、图表脚本等静态资源

## 部署命令

先登录 GitHub CLI：

```bash
gh auth login --hostname github.com --git-protocol https --web
```

然后在本目录执行：

```bash
gh repo create japan-travel-guide --public --source=. --remote=origin --push
gh api -X POST repos/:owner/japan-travel-guide/pages \
  -f source.branch=main \
  -f source.path=/
```

部署完成后访问：

```text
https://<你的 GitHub 用户名>.github.io/japan-travel-guide/
```

如果 `gh api` 提示 Pages 已存在，可改用：

```bash
gh api -X PUT repos/:owner/japan-travel-guide/pages \
  -f source.branch=main \
  -f source.path=/
```
