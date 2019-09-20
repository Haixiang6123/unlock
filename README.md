# unlock
帮看一亩三分地的脚本

## 怎么用

### 第一步
在 index.js 里设置你的用户名和密码。

```javascript
document.querySelector('#ls_username').value = '一亩三分地用户名';
document.querySelector('#ls_password').value = '一亩三分地密码';
```

### 第二步
在 links.txt 里粘贴要访问的一亩三分地链接。

### 第三步
终端运行

```
$ npm install

$ node index.js
```