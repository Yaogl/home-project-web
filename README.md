# home-project-web

Vue3 企业官网前台。

---

## 线上环境

http://47.100.25.182?tenant=demo

---

## 本地开发

```powershell
npm install
npm run dev
```

访问：http://localhost:5174?tenant=demo

需先启动 [home-project-api](https://github.com/Yaogl/home-project-api)。

---

## 部署构建

```bash
npm run build
```

将 `dist/` 部署到 Nginx（如 `/var/www/web/dist`，端口 80）。
