(function(){
    var valid = {};

        valid.sfzh = {
            title: '身份证号',
            required: true,
            defineValid: function(val){
                // debugger;
                var validData = valid.idcard.valid(val);
                
                return validData.pass;
            }
        };

        valid.sfzh_notrequired = {
            title: '身份证号',
            required: false,
            defineValid: function(val){
                var validData = valid.idcard.valid(val);
                return validData.pass;
            }
        };

        valid.lxfs = {
            title: '联系方式',
            max: 15,
            required: true,
            pattern: /(^(\d{3,4}-)?\d{7,8})$|(^[0-9]*\d{11}$)/i
        };

        valid.lxdh = {
            title: '联系电话',
            required: true,
            max: 15,
            pattern: /(^(\d{3,4}-)?\d{7,8})$|(^[0-9]*\d{11}$)/i
        };

        valid.lxdhBackup = {
            title: '联系电话',
            max: 15
        };

        /* 收入 */
        valid.shouru = {
            type: 'number',
            step: '1',
            min: 0,
            max: 1000000,
            required: true
        };

        valid.nl = {
            title: '年龄',
            type: 'number',
            step: '1',
            min: 1,
            max: 120,
            required: true
        };

        valid.yhkh = {
            title: '银行卡号',
            max: 20,
            pattern: /^$|(^[0-9]\d{0,19}$)/i
        };

        valid.yhkhBackup = {
            title: '银行卡号',
            max: 20,
            pattern: /(^[0-9]\d{0,19}$)/i,
            required: true
        };

        /* 对身份证号码的校验 */
        valid.idcard = (function () {

            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   
            var city = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江 ",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北 ",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏 ",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "新疆",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外 "
            };

            function IdCardValidate(idCard) {
                var result = {
                    pass: false,
                    tip: '身份证格式错误',
                    data: null
                }, data = {};
                
                //去掉字符串头尾空格
                idCard = trim(idCard.replace(/ /g, ""));     
                
                //空值
                if(!idCard){
                    result.tip = "身份证号不能为空";
                    result.pass = false;
                    result.isEmpty = true;
                    return result;
                }
                
                //省份编码校验  by ddqian2  需求变更
                /*if(!city[idCard.substr(0,2)]){
                    result.tip = "地址编码错误";
                    result.pass = false;
                    return result;
                }*/
                
                if (idCard.length == 15) {
                    
                    //进行15位身份证的验证
                    if(isValidityBrithBy15IdCard(idCard)){
                        result.pass = true;
                    }
                    
                } else if (idCard.length == 18) {
                    
                    //进行18位身份证的基本验证和第18位的验证
                    var a_idCard = idCard.split("");  
                    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { 
                        result.pass = true;
                    }
                    
                }
                
                if(result.pass){
                    result.tip = "身份证格式正确";
                    data.xb = getSex(idCard);
                    data.csny = getBirth(idCard);
                    data.nl = getAge(idCard);
                    result.data = data;
                }
                
                return result;
            }
            /**  
             * 判断身份证号码为18位时最后的验证位是否正确
             * @param a_idCard 身份证号码数组
             * @return
             */
            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0; // 声明加权求和变量   
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i]; // 加权求和   
                }
                valCodePosition = sum % 11; // 得到验证码所位置   
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                } else {
                    return false;
                }
            }
            /**  
             * 验证18位数身份证号码中的生日是否是有效生日
             * @param idCard 18位书身份证字符串
             * @return
             */
            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 这里用getFullYear()获取年份，避免千年虫问题   
                if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            /**  
             * 验证15位数身份证号码中的生日是否是有效生日
             * @param idCard15 15位书身份证字符串
             * @return
             */
            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法   
                if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                    return false;
                } else {
                    return true;
                }
            }
            
            //去掉字符串头尾空格   
            function trim(str) {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }

            /**  
             * 通过身份证判断是男是女
             */
            function getSex(idCard) {
                idCard = trim(idCard.replace(/ /g, "")); // 对身份证号码做处理。包括字符间有空格。   
                if (idCard.length == 15) {
                    if (idCard.substring(14, 15) % 2 == 0) {
                        return 2;
                    } else {
                        return 1;
                    }
                } else if (idCard.length == 18) {
                    if (idCard.substring(14, 17) % 2 == 0) {
                        return 2;
                    } else {
                        return 1;
                    }
                } else {
                    return null;
                }
            }
            
            /**  
             * 通过身份证获取生日
             */
            function getBirth(idCard) {
                idCard = trim(idCard.replace(/ /g, ""));  
                if (idCard.length == 15) {
                    var year = idCard.substring(6, 8);
                    var month = idCard.substring(8, 10);
                    var day = idCard.substring(10, 12);
                    return '19' + year + month + day;
                } else if (idCard.length == 18) {
                    var year = idCard.substring(6, 10);
                    var month = idCard.substring(10, 12);
                    var day = idCard.substring(12, 14);
                    return year + month + day;
                } else {
                    return null;
                }
            }
            
            /**  
             * 通过身份证获取年龄
             */
            function getAge(idCard) {
                var year1;
                idCard = trim(idCard.replace(/ /g, "")); 
                
                if (idCard.length == 15) {
                    year1 = Number('19' + idCard.substring(6, 8));
                } else if (idCard.length == 18) {
                    year1 = Number(idCard.substring(6, 10));
                } else {
                    return null;
                }
                
                var year2 = (new Date()).getFullYear();
                
                return (year2 - year1);
            }
            
            return {
                valid: IdCardValidate,
                getAge:getAge,
                getSex:getSex,
                getBirth:getBirth
            };

        })();
    window.valid = valid;
})();
    
