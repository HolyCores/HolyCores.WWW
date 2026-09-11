# HOLYCORES 官网

官网为全静态多页面网站，使用 HTML、CSS 和浏览器端 JavaScript，无需 .NET、Node 服务端或数据库。

## 本地预览

在项目根目录运行（需要 Python 3）：

```powershell
python -m http.server 5188 --bind 127.0.0.1 --directory site
```

打开 http://127.0.0.1:5188/ 。也可使用任意静态文件服务器将 `site/` 作为网站根目录。

## 当前源码

- `site/`：唯一的当前官网源码目录。
- `site/index.html` / `site/en.html`：中英文首页。
- `site/lab.html` / `site/en-lab.html`：实验室及浏览器端演示。
- `site/assets/`：样式、图片及品牌资源。

现有 38 个页面、相对资源路径和 `.html` 导航保持不变。直接编辑静态文件即可，浏览器刷新后生效。

## 静态校验与打包

```powershell
python scripts/build-static.py
```

脚本先校验页面引用，再生成 `dist/`，其中只有静态网站文件。`scripts/Publish-Static.ps1` 为兼容入口，同样只生成本地文件，不执行发布。

GitHub Pages 使用 `.github/workflows/pages.yml` 手动发布：在 GitHub Actions 中运行 Publish HolyCores to GitHub Pages。工作流校验并打包 `site/`，发布 `dist/`。普通推送不会自动发布。Sites 配置同样指向静态输出，不修改域名或 DNS。

## 历史文件

`bootstrap-studio/` 保留历史设计与未提交改动，不参与当前网站构建。`app/`、`worker/` 以及 Vinext 配置为旧版实现，不参与静态网站运行。根目录 npm 的 dev/start/build/test 命令均指向当前静态网站；旧版依赖暂留供历史源码参考，无需安装即可使用上述 Python 命令。原 .NET 工程和解决方案已移除。
