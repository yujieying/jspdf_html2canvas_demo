$(function() {
    window.is_local_area = true; //true false
    window.app = new Vue({
        data:function() {
            return {
                local_mock:is_local_area? __uri('../js/mock/pdf_mock.json'):"",
                page_all_data:{}, //所有需要处理的页面数据
                pic_count_Data: [],
                picData: {},
                pdf_name:'hello.pdf', //默认名字
                button_text:"生成PDF并分享",
                has_company:false, // 有没公司
                link_short:''
            }
        },
        el: "#page_vue", 
        methods: {
            begin_fn(){
                let _this = this;
                if($(".downLoad_btn").hasClass('ready')){
                    $(".downLoad_btn").removeClass('ready');
                    
                    // theme.loading(true);
                    _this.download();
                }
            },
            // 渲染病种多结构
            readIll(item){
                // 段落模式
                if (item.disease_paragraph ) {
                    return item.disease_paragraph;
                } else {
                    // 列表模式
                    var html = '';
                    item.diseases.map(function(v,i){
                        html += '<div>'+(i+1)+'. '+v.parent+'</div>'
                    })
                    return html;
                }
            },
            // 本地模拟数据
            initPage(){
                var _this = this;
                window.pdf = new jsPDF('', 'pt', 'a4');
                $.get(_this.local_mock,function(res){
                    if (res.code == 200 && res.data ) {
                        _this.page_all_data = res.data;
                        _this.$nextTick(() => {
                            _this.first_init();
                        })
                    }
                },"json")
            },
            // 生成分享
            download() {
                let _this = this;
                // console.log('1111')
                //a4纸的尺寸[595,842]，html页面生成的canvas在pdf中图片的宽高
                if(window.blob ){
                    _this.button_text="分享PDF";
                    //已经生成了的直接分享
                    
                    // theme.loading(false);
                    $('.downLoad_btn').addClass('ready');
                    window.open(URL.createObjectURL(blob));
                    pdf.save(_this.pdf_name);

                    return false;
                }

                var element = $("#target"); // 这个dom元素是要导出pdf的div容器
                var w = element.width(); // 获得该容器的宽
                var h = element.height(); // 获得该容器的高
                var canvas = document.createElement("canvas");

                canvas.width = w * 2; // 将画布宽&&高放大两倍
                canvas.height = h * 2;
                var context = canvas.getContext("2d");
                context.scale(2, 2);

                // 【重要】关闭抗锯齿
                context.mozImageSmoothingEnabled = true;
                context.webkitImageSmoothingEnabled = true;
                context.msImageSmoothingEnabled = true;
                context.imageSmoothingEnabled = true;
                
                $('.pageSize_total').text(($('.page').size() - 1)); //页码
                var opts = {
                     useCORS: true, //开启跨域配置
                     // allowTaint: true,
                     // async: false,
                }
                for (let i = 0; i < $('.page').length; i++) {
                    // console.log('here' + i)
                    if (i >= 1) { $('.head,.footer').removeClass('hidex'); }
                    $('.page').eq(i).addClass('active').siblings().removeClass('active');
                    $('.pageSize_current').text(i);
                    html2canvas(element,opts).then(function(canvas) {
                        var contentWidth = canvas.width;
                        var contentHeight = canvas.height;
                        var position = 0;
                        var picName = 'pic_' + i;

                        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                        window.imgWidth = 595;
                        window.imgHeight = 592 / contentWidth * contentHeight;
                        // console.log(canvas);
                        var pageData = canvas.toDataURL('image/jpeg', 0.7);  //后面数值 0到1之间，  数值越小，所绘制出的图像越模糊

                        _this.pic_count_Data.push(pageData);
                        _this.picData[picName] = pageData;
                        
                    })
                }

                var timer = setInterval(function() {
                    if (_this.pic_count_Data.length >= $('.page').length) {
                        // console.log('保存')
                        clearInterval(timer);
                        for (var j = 0; j < _this.pic_count_Data.length; j++) {
                            var picName = 'pic_' + j;
                            if (j > 0) {
                                pdf.addPage();
                            }
                            pdf.addImage(_this.picData[picName], 'JPEG', 0, 0, imgWidth, imgHeight);
                            $('body').append('<img class="result_pic" src="'+_this.picData[picName]+'">')
                        }

                        
                        $('#target').hide();
                        $('.pageMark').hide();
                        // pdf.save('test.pdf'); 
                        window.blob = pdf.output("blob");
                        console.log(pdf);
                        
                        _this.button_text="分享PDF";

                        // if (与客户的交互时的转换格式) {
                        //     // window.base = _this.blobToDataURL(blob);
                        //     // window.shareLocal = base.result;
                        // } else {
                            $('.downLoad_btn').addClass('ready');
                            // theme.loading(false);
                            window.open(URL.createObjectURL(blob));
                            pdf.save(_this.pdf_name);
                        // }

                    }
                }, 100)
            },
            // 文件格式 
            blobToDataURL(blob, callback) {
                var a = new FileReader();
                // a.onload = function (e) { callback(e.target.result); }
                a.readAsDataURL(blob);
                return a;
            },
            // 页面过长时的处理  是各位所需要的
            renderOverpage($el) {
                // console.log(maxheight)
                let _this = this;
                let thisHeight = $el.height();
                let totalPage = 0;
                if (thisHeight > maxheight) {
                    totalPage = Math.ceil(thisHeight / maxheight);
                    // console.log(thisHeight);
                    // console.log('页面该分为' + Math.ceil(thisHeight / maxheight) + '页');
                    $el.attr('style', 'height:'+window.maxheight+'px;width:' + window.pWidth * totalPage + 'px;column-count: '+totalPage+'');
                    $el.find('ul').attr('style', 'height:'+window.maxheight+'px')
                    let $bEle = $el.eq(0); 

                    if (totalPage > 1) {
                        for (let w = 0; w < totalPage; w++) {
                            if(w>0){
                                $bEle.after($bEle.clone().css('left','-' + window.pWidth * (totalPage-w) + 'px'));
                            }
                        }
                    }
                }
            },
            // 渲染计算页面
            first_init(){
                let _this = this;
                
                window.pWidth = $('.page').eq(0).width();
                window.pHeight = $('.page').eq(0).height(); //一页pdf显示html页面生成的canvas高度;
                window.maxheight =  pHeight - 90 -70 ;//每个页面最大的高度

                _this.pdf_name = _this.page_all_data.plan_name +'-'+ _this.page_all_data.sex +'-'+ _this.page_all_data.years+'岁-保险计划书.pdf';
                if(_this.page_all_data.companyIntroduction && _this.page_all_data.companyIntroduction.name){
                    _this.has_company = true;
                }


                _this.renderOverpage($('.typeBaozhang'));
                _this.renderOverpage($('.typeIll'));


                setTimeout(function(){
                    // theme.loading(false);
                    $(".downLoad_btn").addClass('ready');
                },1000)
            }
        },
        created(){
            // theme.loading(true);
            this.initPage();
        },
        mounted() { 
            let _this = this;
        }
    })
});

