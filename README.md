# demo
├── README.md
├── build.sh
├── close.bat
├── css
│   └── index.less
├── fis-conf.js
├── gulpfile.js
├── html
│   └── pdf.html
├── img
│   ├── cover.jpg
│   └── cover_mark.jpg
├── js
│   ├── html2canvas.js
│   ├── jspdf.js
│   ├── index.es
│   └── mock
│       └── pdf_mock.json
├── package.json
└── 服务.bat


说两句：
关于环境： 是跑fis3的 比较旧。 

关于页面： 
1、页面有比较多的业务逻辑 存在很多用不上的赘余代码 有空再回来改下
2、主要是交代下 怎么利用column-count这个属性 解决超一屏被截断的问题。
页面首次加载完成 ，然后开始计算超长页面， 如果过长 我们利用column-count的排版 克隆多个 然后追加再该dom后面再平移过去
对于这个属性了解更多可以：https://segmentfault.com/a/1190000020320128

我这边的页面要求是移动端的 所以我用了viewport ,另外之前写 595的打印出来分辨率不是很够。
所以 改了1190， 这个整体布局还是有点问题不是很好,对于这方面是有待考核的。 

欢迎修改交流更正补充 Thanks



#hello
