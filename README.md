# HOLYCORES 官网

当前维护版本采用 **Visual Studio + ASP.NET Core / .NET 10**，静态页面可由 GitHub Pages 托管。

## 用 Visual Studio 管理

1. 安装支持 .NET 10 的 Visual Studio 与“ASP.NET 和 Web 开发”工作负载。
2. 打开根目录 `HolyCores.slnx`，将 `HolyCores.Web` 设为启动项目。
3. 按 F5 运行，浏览器打开实验室。主页为 `http://localhost:5188/`。

也可运行：

```powershell
dotnet run --project src/HolyCores.Web
```

## 源码入口

- `src/HolyCores.Web/wwwroot/`：唯一的当前网页源码目录，直接编辑 HTML、CSS、JavaScript 和图片。
- `wwwroot/index.html` / `en.html`：中文及英文首页。
- `wwwroot/lab.html` / `en-lab.html`：实验室，两套演示原生上下展开，使用官网风格。
- `wwwroot/assets/style.css`：官网公共样式。
- `Program.cs`：本地 .NET 静态文件服务器；不存在的页面返回 404。

保留了 38 个页面及本地图片。现有 `.html` 链接保持不变，相对资源路径支持 GitHub Pages 项目路径。导航目前保存在各 HTML 页头；新增菜单时应同步中文、英文及手机导航。

## 构建和发布

```powershell
dotnet build HolyCores.slnx --configuration Release
pwsh -File scripts/Publish-Static.ps1
```

静态导出脚本使用 PowerShell 7、Python 3 和 .NET 10。它校验所有页面的本地链接，构建 .NET 项目，再将网站文件导出到 `artifacts/pages/`。该目录只含静态网页资源，不含服务器程序、工程或历史设计文件。

`.github/workflows/pages.yml` 在 main 分支相关源码更新后自动构建。仓库变量 `PAGES_ENABLED=true` 时自动发布 GitHub Pages；不启用时仍会提供可下载的网页构建产物。Pages 的 Source 设置为 GitHub Actions。

GitHub Pages 只托管静态网页；.NET 用于本地调试或其他支持 ASP.NET Core 的服务器，GitHub Pages 上不运行 C# 服务。页面现有外部平台链接保持原样。

## 旧版文件

`bootstrap-studio/` 是历史设计和迁移来源，**不再是当前维护入口**，也不参与新发布流程。原 `app/`、`worker/`、Node/Vinext 配置和 `.openai/hosting.json` 仅保留历史兼容，新 .NET / Pages 流程不使用它们。不要从旧的 Bootstrap Studio 工程覆盖新源码。

本次发布使用 GitHub Pages 默认网址；Holycores.com 的 DNS 不由本流程修改。
