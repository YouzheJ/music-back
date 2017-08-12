# music-back-ts

--- 
### 一个音乐项目的后台应用系统

> 使用typescript: (可参考： https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

> 使用 react-create-app 搭项目(配置可参考：[http://www.jianshu.com/p/5e6c620ff4d6](http://www.jianshu.com/p/5e6c620ff4d6))， 搭配vscode的Easy Sass插件，实现样式和js的热加载

> 使用styled-components对样式进行组件化，结合babel-plugin-styled-components-named，在react-developer-tools中调试；typescript中此插件无效，需要使用typescript-plugin-styled-components: 
- 使用： 
  - 安装： typescript-plugin-styled-components
  - 在webpack.config.js中配置：
  
  ```js
  var createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

  var styledComponentsTransformer = createStyledComponentsTransformer();

  var config = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    // other loader's options
                    getCustomTransformers: () => ({ before: [styledComponentsTransformer] })
                }
            }
        ]
    }
  };
  ```

