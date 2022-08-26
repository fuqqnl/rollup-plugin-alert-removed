# rollup-plugin-alert-removed
将项目中的`alert代码`打包时去掉，防止带到线上，对线上有损

## 安装方法

```
// npm
npm install rollup-plugin-alert-removed --save-dev

// yarn
yarn add rollup-plugin-alert-removed

```

## 使用方法

```
// rollup.config.js
import alertRemoved from 'rollup-plugin-alert-removed';

export default {
    ...
    plugins: [
        alertRemoved({
            include: /src/,
            exclude: /node_modules/
        })
    ]
}

```

## options

### include
`type: RegExp`

include定义要把哪个文件夹中的文件纳入处理范围。

### exclude
`type: RegExp`

exclude定义要把哪个文件夹中的文件排除出要处理的范围。

### extentions
`type: Array<string>`
extentions为可选参数，默认为`['js']`

