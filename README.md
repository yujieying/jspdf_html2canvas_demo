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
└── �\233�\205�fis3以�\217\212�\200�\220��\206\205置�\234\215�\212��\231�.bat


说两句：
关于环境： 是跑fis的 比较旧。 

关于页面： 主要是 利用了column-count这个属性。
页面首次加载完成 ，然后开始计算超长页面， 如果过长 我们利用column-count的排版 克隆多个 然后追加再该dom后面再平移过去

我这边的页面要求是移动端的 所以我用了viewport ,另外之前写 595的打印出来分辨率不是很够。
所以 改了1190， 这个整体布局还是有点问题不是很好  大家有没更优质的  欢迎交流 
#hello
