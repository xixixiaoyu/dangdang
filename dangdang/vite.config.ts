import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import dotenv, { DotenvParseOutput } from "dotenv";

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  console.log("当前在什么环境运行项目:", mode.mode);

  //  拼接当前环境文件名
  const envFileName: string = ".env";
  const curEnvFileName = `${envFileName}.${mode.mode}`;
  // fs.readFileSync：读取环境文件key-value数据到缓存对象，
  // dotenv.parse 读取缓存对象到envConf对象中。
  const envConf: DotenvParseOutput = dotenv.parse(
    fs.readFileSync(curEnvFileName)
  );
  const curEnv: string = mode.mode;
  let server: Record<string, any> = {};
  if (curEnv === "development") {
    // 开发环境
    server = {
      port: envConf.VITE_PORT,
      host: envConf.VITE_HOST,
      proxy: {
        [envConf.VITE_BASE_URL]: {
          target: envConf.VITE_PROXY_DOMAIN,
        },
      },
    };
  } else if (curEnv === "production") {
    // 生产环境
    server = {
      port: envConf.VITE_PORT,
      host: envConf.VITE_HOST,
    };
  }
  return {
    plugins: [vue()],
    server,
  };
});
