# 从零创建React项目
## 技术栈
  webpack5 + react17 + ts + babel7 + eslint7

## 构建步骤

### 基本配置
1. ​`npm init -y`

2. `npm i webpack webpack-cli webpack-merge -D`
   
3. `npm i html-webpack-plugin -D`
   > 可以在打包时自动生成对应的 index.html文件

   配置：
   ```js
    // webpack.config.js
    const HTMLWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        mode:'development',
        plugins:[
            new HTMLWebpackPlugin({
                title:'webpack-learn'
            })
        ],
        output:{
            path: path.resolve(__dirname, 'dist'),
            clean: true, // 表示每次打包时都会首先清除旧文件
        }
    }
   ```

### 加载各种资源(css,image,font...)
1. 加载Json文件
   >webpack 默认支持json文件
   使用：
   ```js
   import data from './data.json'
   ```

2. 加载css文件
   >可以使用import加载css文件
   
   注意：如果在package.json中配置了"sideEffects":false，使用import './[name].js'方式引入的css文件将会失效(使用import )，改为"sideEffects":['*.css']即可

   安装：`npm i -D style-loader css-loader`

   配置：
   ```js
    // webpack.config.js
    // 无需引入 style-loader 和 css-loader
    module.exports = {
        mode:'development',
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            }
          ]
        }
    }
   ```
3. 加载图片和字体
   安装：`npm i -D file-loader`

   配置：
   ```js
    // webpack.config.js
    // 无需引入 style-loader 和 css-loader
    module.exports = {
        mode:'development',
        module: {
          rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            },
          ]
        }
    }
   ```

   使用:
   ```js
    import image from './image.png'
   ```
   ```css
    @font-face {
        font-family: 'MyFont';
        src: url('./my-font.woff2') format('woff2'),
             url('./my-font.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }

    .hello {
        color: red;
        font-family: 'MyFont';
        background: url('./icon.png');
    }
   ```

### 优化
1. tree-shaking：用于清除引入但未使用的模块
    + 配置：
  
      有两个地方可以配置：
      1. `webpack.config.js`:module.exports.optimization.sideEffects
      2. `package.json`:{}.sideEffects
   
     `webpack.config.js`中的`sideEffects`的默认值为true，表示开启tree-shaking功能，并接受`package.json`中的`sideEffects`的值。如果`webpack.config.js`中的`sideEffects`的值为false，则表示关闭tree-shaking功能。
    
    + 注意：有些情况不支持tree-shaking
      ```js
        // 1
        import stuff from './stuff'; //  引入但未被使用，清除
        doSomething(); 
        // 2
        import stuff from './stuff'; //  引入而且被使用，保留
        doSomething(stuff);
        // 3
        import './stuff'; //  这种方式引入会被webpack识别成未被使用，清除，所以sideEffects设置为[*.css]就可以避免css文件被错误清除
        doSomething();
        // 
        import { debounce } from 'lodash'; // 模块引入，支持tree-shaking
        import debounce from 'lodash/lib/debounce'; // 具体路径引入，支持tree-shaking
        import _ from 'lodash'; // 完整引入，不支持tree-shaking
        import 'lodash' //与第3条作对比，这种方式引入整个库，不支持tree-shaking
      ```

### 创建开发环境
#### 使用sourse-map
1. sourse-map仅用于开发环境，设置`mode:'development'`
2. 选择sourse-map类型
   ```js
    module.exports = {
      devtool: 'source-map',
    }
   ```

#### 监听代码更新
1. 使用观察模式
   在webpack命令后面添加后缀即可，`webpack --watch`
   ```json
    {
      "scripts": {
        "build": "webpack",
        "watch": "webpack --watch",
      }
    }
   ```
2. 使用`webpack-dev-server`
   >webpack-dev-server 将通过 http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename] 访问打包文件。

   1. npm install --save-dev webpack-dev-server
   2. webpack.config.js
   ```js
    module.exports = {
      devServer: {
        port:8080,
        contentBase: './dist',
      }
    }
   ```
   3. package.json
   ```json
    {
      "scripts": {
        "build": "webpack",
        "start": "webpack serve --open",
      }
    }
   ```
3. 使用`webpack-dev-middleware`
   1. npm install --save-dev webpack-dev-middleware
   2. 新建server.js
      ```js
      const express = require('express');
      const webpack = require('webpack');
      const webpackDevMiddleware = require('webpack-dev-middleware');

      const app = express();
      const config = require('./webpack.config.js');
      const compiler = webpack(config);

      // 告知 express 使用 webpack-dev-middleware，
      // 以及将 webpack.config.js 配置文件作为基础配置。
      app.use(
        webpackDevMiddleware(compiler, {
          publicPath: config.output.publicPath,
        })
      );

      // 将文件 serve 到 port 3000。
      app.listen(3000, function () {
        console.log('Example app listening on port 3000!\n');
      });
      ```
   3. 修改webpack.config.js
   ```js
    module.exports = {
      devServer: {
        port:8080,
        contentBase: './dist',
      }
    }
   ```
   1. 修改package.json
   ```json
    {
      "scripts": {
        "build": "webpack",
        "server": "node server.js",
      }
    }
   ```


### 打包优化
#### 使用打包分析工具
安装：
```shell
  npm install webpack-bundle-analyzer –save-dev
```
配置：webpack.config.js
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  plugins:[
    new BundleAnalyzerPlugin()
  ]
}
```
启动：npm start 或 npm build 即可