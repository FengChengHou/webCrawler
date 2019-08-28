/*! Fly UI v0.5.0 | by Fly UI Team | (c) 2015 iFlytek, Inc. | Licensed under MIT | 2015-06-11 09:06:01 UTC */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');

            var tpl =
                '<div class="addressbox-item"><div class="addressbox-label"><%= name %></div><div class="addressbox-control"></div></div>';

            /**
             * 定义组合框控件
             */
            UI.widget('fly.addressbox', {
                defaultElement: '<div></div>',
                options: {
                    name: "", //表单name
                    tip: '请选择',
                    url: '',
                    appendTo: false, //需要插入的节点，默认为当前的textbox内部
                    valueField: 'value', //值字段
                    textField: 'text', //文本字段
                    initText: null, //初始文本
                    initValue: {},
                    onBeforeOpen: null,
                    onClear: null
                },

                _create: function() {
                    var name = this.options.name || UI.utils.generateGUID(
                        "address");

                    //渲染基础dom
                    if (!this.element.is('input')) {
                        this._createByDiv(name);
                    } else {
                        this._createByInput(name);
                    }

                    //提示语
                    this.textInput.val(this.options.tip);

                    //渲染下拉框dom
                    this._creatAddressBox();

                    this._render();

                    this._addEvents();
                },

                //根据div渲染
                _createByDiv: function(name) {
                    this.wrapper = this.element
                        .addClass("fly-addressbox");
                    this.trigger = $('<i>').addClass(
                        'fly-addressbox-arrow')
                        .appendTo(this.wrapper);
                    this.textInput =
                        $('<input>').addClass('text')
                        .attr('readonly', true)
                        .attr('type', 'text')
                        .attr('name', name + 'Txt')
                        .appendTo(this.wrapper)
                        .wrap('<em></em>');
                    /*
        this.valueInputOther = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Other')
            .insertAfter(this.textInput);
        this.valueInputZu = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Zu')
            .insertAfter(this.textInput);
        this.valueInputCun = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Cun')
            .insertAfter(this.textInput);
        this.valueInputXiang = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Xiang')
            .insertAfter(this.textInput);
        this.valueInputXian = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Xian')
            .insertAfter(this.textInput);
        this.valueInputShi = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Shi')
            .insertAfter(this.textInput);
        this.valueInputSheng = $('<input>').attr('type', 'hidden')
            .attr('name', name + 'Sheng')
            .insertAfter(this.textInput);
        */
                },

                //根据input渲染
                _createByInput: function(name) {},

                //渲染下拉框
                _creatAddressBox: function() {
                    this.addressWarpper = $('<div>').addClass(
                        'fly-addressbox-inner');

                    if (this.options.appendTo) {
                        this.addressWarpper.appendTo($(this.options.appendTo));
                    } else {
                        this.addressWarpper.appendTo(this.wrapper);
                    }
                },

                //初始化
                _init: function() {
                    var self = this;
                },

                //渲染控件
                _render: function() {
                    var self = this,
                        value = self.options.initValue;

                    self.addressWarpper.empty();

                    //省
                    self.sheng = $(_.template(tpl)({
                        name: '省'
                    })).appendTo(self.addressWarpper);
                    self.shengCombo = self.sheng.find(
                        '.addressbox-control').combobox({
                        name: self.options.name + 'Sheng',
                        data: self.options.url,
                        ajaxType: 'get',
                        onSelect: function(data) {
                            self.xian.hide();
                            self.xianCombo.combobox('clear');
                            self.xiang.hide();
                            self.xiangCombo.combobox('clear');
                            self.cun.hide();
                            self.cunCombo.combobox('clear');
                            self.zu.hide();
                            self.zuCombo.combobox('clear');
                            self.getData(data[self.options.valueField])
                                .done(function(res) {
                                    //if(res.flag && res.data.length){
                                    self.shi.show();
                                    self.shiCombo.combobox({
                                        data: res
                                    });
                                    //}else{
                                    //    self.shi.hide();
                                    //}
                                }).fail(function() {
                                    self.shi.hide();
                                });
                        }
                    });

                    //市
                    self.shi = $(_.template(tpl)({
                        name: '市'
                    })).appendTo(self.addressWarpper).hide();
                    self.shiCombo = self.shi.find('.addressbox-control')
                        .combobox({
                            name: self.options.name + 'Shi',
                            onSelect: function(data) {
                                self.xiang.hide();
                                self.cun.hide();
                                self.zu.hide();
                                self.getData(data[self.options.valueField])
                                    .done(function(res) {
                                        //if(res.flag && res.data.length){
                                        self.xian.show();
                                        self.xianCombo.combobox({
                                            data: res
                                        });
                                        //}else{
                                        //    self.xian.hide();
                                        //}
                                    }).fail(function() {
                                        self.xian.hide();
                                    });
                            }
                        });

                    //县(区)
                    self.xian = $(_.template(tpl)({
                        name: '县(区)'
                    })).appendTo(self.addressWarpper).hide();
                    self.xianCombo = self.xian.find(
                        '.addressbox-control').combobox({
                        name: self.options.name + 'Xian',
                        onSelect: function(data) {
                            self.cun.hide();
                            self.zu.hide();
                            self.getData(data[self.options.valueField])
                                .done(function(res) {
                                    //if(res.flag && res.data.length){
                                    self.xiang.show();
                                    self.xiangCombo.combobox({
                                        data: res
                                    });
                                    //}else{
                                    //    self.xiang.hide();
                                    //}
                                }).fail(function() {
                                    self.xiang.hide();
                                });
                        }
                    });

                    //乡(街道)
                    self.xiang = $(_.template(tpl)({
                        name: '乡(街道)'
                    })).appendTo(self.addressWarpper).hide();
                    self.xiangCombo = self.xiang.find(
                        '.addressbox-control').combobox({
                        name: self.options.name + 'Xiang',
                        onSelect: function(data) {
                            self.zu.hide();
                            self.getData(data[self.options.valueField])
                                .done(function(res) {
                                    //if(res.flag && res.data.length){
                                    self.cun.show();
                                    self.cunCombo.combobox({
                                        data: res
                                    });
                                    //}else{
                                    //    self.cun.hide();
                                    //}
                                }).fail(function() {
                                    self.cun.hide();
                                });
                        }
                    });

                    //村(社区)
                    self.cun = $(_.template(tpl)({
                        name: '村(社区)'
                    })).appendTo(self.addressWarpper).hide();
                    self.cunCombo = self.cun.find('.addressbox-control')
                        .combobox({
                            name: self.options.name + 'Cun',
                            onSelect: function(data) {
                                self.zu.hide();
                                self.getData(data[self.options.valueField])
                                    .done(function(res) {
                                        //if(res.flag && res.data.length){
                                        self.zu.show();
                                        self.zuCombo.combobox({
                                            data: res
                                        });
                                        //}else{
                                        //    self.zu.hide();
                                        //}
                                    }).fail(function() {
                                        self.zu.hide();
                                    });
                            }
                        });

                    //组(自然村)
                    self.zu = $(_.template(tpl)({
                        name: '组(自然村)'
                    })).appendTo(self.addressWarpper).hide();
                    self.zuCombo = self.zu.find('.addressbox-control').combobox({
                        name: self.options.name + 'Zu',
                        onSelect: function(data) {
                            self._update();
                        }
                    });

                    //其他
                    self.other = $(_.template(tpl)({
                        name: '其他'
                    })).appendTo(self.addressWarpper);
                    self.otherInput = $('<input>')
                        .attr('name', self.options.name + 'Other')
                        .appendTo(self.other.find('.addressbox-control'))
                        .wrap('<em class="other"></em>');

                    self._update();
                    self._addItemEvents();
                },

                getData: function(code) {
                    var self = this,
                        obj = new fly.utils.ajaxObj(),
                        options = $.extend({}, obj.options);

                    fly.utils.ajax.get(self.options.url, {
                        orgCode: code
                    }, 'text').done(function(data) {
                        data = fly.utils.toObj(data);

                        /*if(data.flag == 'true'){
                obj._done && obj._done(data);
            }else{
                obj._fail && obj._fail();
            }*/

                        obj._done && obj._done(data);

                    }).fail(function() {
                        obj._fail && obj._fail();
                    });

                    return obj;
                },

                //添加事件
                _addEvents: function() {
                    var self = this;
                    //下拉小箭头
                    self.trigger.click(function(e) {
                        e.stopPropagation();
                        if (self.wrapper.hasClass(
                            'fly-combobox-active')) {
                            self.clear();
                        } else {
                            self.open();
                        }
                    });
                    //点击文字框
                    self.textInput.click(function(e) {
                        self.open();
                    });

                },

                //添加事件
                _addItemEvents: function() {
                    var self = this;

                },


                //给document绑定事件，点击空白处收起
                _addDocumentEvent: function() {
                    var self = this;
                    $(document).unbind('click.flyui.addressbox')
                        .bind('click.flyui.addressbox', function(e) {
                            var target = $(e.target);
                            if (target.closest(self.addressWarpper)
                                .length == 0 && target.closest(self
                                    .wrapper).length == 0) {
                                self.close();
                            }
                        });
                },

                //定位下拉框 在appendTo为false时无效
                _position: function() {

                },

                //打开下拉框
                open: function() {
                    if (this.options.onBeforeOpen) {
                        if (this.options.onBeforeOpen() === false)
                            return;
                    }

                    $(document).trigger('click.flyui.addressbox');
                    this.addressWarpper.show();
                    this.wrapper.addClass("fly-addressbox-active");
                    this._position();
                    this._addDocumentEvent();
                },

                //关闭下拉框
                close: function() {
                    this.addressWarpper.hide();
                    this.wrapper.removeClass("fly-addressbox-active");
                    $(document).unbind('click.flyui.addressbox');
                },

                //清空
                clear: function() {

                },

                _setValue: function(value) {
                    var self = this;
                    self._update();
                },

                setValue: function(value) {
                    this._setValue(value);
                },

                _getValue: function() {
                    return this.valueInput.val();
                },

                getValue: function() {
                    return this._getValue();
                },

                setReadOnly: function() {
                    this.trigger.unbind();
                },

                _update: function() {

                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'disabled') {
                        if (value) {
                            this.wrapper.addClass(
                                'fly-addressbox-disabled');
                            this.textInput.attr('disabled', true);
                        } else {
                            this.wrapper.removeClass(
                                'fly-addressbox-disabled');
                            this.textInput.removeAttr('disabled');
                        }
                    }
                },
                _destroy: function() {

                }

            });

            UI.ready(function(context) {
                $('[data-fly-addressbox]', context).each(function() {
                    var $this = $(this);
                    var opts = $this.data('flyOptions');
                    if (opts == 'this.text') {
                        opts = $this.text();
                        $this.text('');
                    }
                    $this.addressbox(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.addressbox;

        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    2: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.button', {
                defaultElement: '<button>',
                options: {
                    disabled: null,
                    text: null
                },

                _create: function() {
                    this.element.addClass('btn');

                    if (this.options.cls) {
                        this.element.addClass('btn-' + this.options.cls);
                    } else {
                        this.element.addClass('btn-default');
                    }

                    if (this.options.disabled) {
                        this.element.attr('disabled', true).addClass(
                            'disabled');
                    }
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'text') {
                        if (value) this.element.text(value);
                    }

                    if (key == 'disabled') {

                        if (!value) {
                            this.element.removeAttr('disabled')
                                .removeClass('disabled');
                        } else {
                            this.element.attr('disabled', true)
                                .addClass('disabled');
                        }
                    }
                },

                refresh: function() {

                },

                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-button]', context).each(function() {
                    $(this).button(UI.utils.parseOptions($(this).data(
                        'flyOptions')));
                });
            });

            module.exports = UI.button;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    3: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');

            UI.widget('fly.checkbox', {
                defaultElement: '<div>',
                options: {
                    disabled: null,
                    textField: 'text',
                    valueField: 'value',
                    initValue: null,
                    onSelect: function() {},
                    data: []
                },

                /**
                 *
                 * @return {[type]} [description]
                 */
                _create: function() {
                    var self = this;

                    self._createTpl();

                    this.element.removeClass('fly-textbox').addClass(
                        'fly-checkbox').empty();

                    self.element.on('click', 'input:checkbox', function(
                        e) {
                        self._trigger('onSelect', e, self.getValue());
                    });

                    if (self.options.data.length) {
                        self._render();
                        if (self.options.initValue !== null) {
                            self.setValue(self.options.initValue);
                        }
                    } else {
                        $('<input>')
                            .attr('name', this.options.name)
                            .appendTo(self.element)
                            .wrap('<em></em>').addClass('checkbox');
                    }
                },

                /**
                 * create template
                 * @return
                 */
                _createTpl: function() {
                    // this.tpl = '<% _.each(data, function(item) { %>' + 
                    //     '<label><input type="checkbox" name="' + this.options.name + '" title="<%= item.' + this.options.textField + ' %>" value="<%= item.' + this.options.valueField + ' %>" /> <%= item.' + this.options.textField + ' %></label>' + 
                    //     '<% }); %>';
                    this.tpl = '<% _.each(data, function(item) { %>' +
                        '<label><input type="checkbox" name="' + this.options
                        .name +
                        '" title="<%= item.text %>" value="<%= item.value %>" /> <%= item.text %></label>' +
                        '<% }); %>';
                },

                /**
                 * render the DOM
                 * @return {[type]} [description]
                 */
                _render: function() {
                    var self = this,
                        curData = [],
                        curTextField = self.options.textField || "text",
                        curValueField = self.options.valueField ||
                        "value",
                        d;

                    $.each(self.options.data, function(i, item) {
                        curData.push({
                            text: item[curTextField],
                            value: item[curValueField]
                        });
                    })
                    d = {
                        data: curData
                    }
                    self.element.empty().append(_.template(self.tpl)(d));
                },

                _setOption: function(key, value) {
                    var self = this;
                    self._super(key, value);

                    if (key == 'data') {
                        self._render();
                    }

                    if (key == 'initValue') {
                        self.setValue(value);
                    }
                },

                /**
                 * set the value of checkbox
                 * @param {[type]} val [description]
                 */
                setValue: function(val) {
                    var $curEle = this.element,
                        curSelectedValue = val.split(",");
                    $.each(curSelectedValue, function(index, item) {
                        $curEle.find(':checkbox[value="' + item +
                            '"]').attr('checked', true);
                    });
                },

                /**
                 * get the value of checkbox
                 * @return {[type]} [description]
                 */
                getValue: function() {
                    return this.element.find(':checkbox:checked').val();
                },

                /**
                 * destroy the DOM
                 */
                _destroy: function() {
                    // TODO
                }
            });

            UI.ready(function(context) {
                $('[data-fly-checkbox]', context).each(function() {
                    $(this).checkbox(UI.utils.parseOptions($(this).data(
                        'flyOptions')));
                });
            });

            module.exports = UI.checkbox;

        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    4: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');

            /**
             * 定义组合框控件
             */
            UI.widget('fly.combobox', {
                defaultElement: '<div></div>',
                options: {
                    name: "", //表单name
                    data: "", //数据源 若为字符串则为url，或为数组，或为dao对象
                    ajaxType: 'post',
                    showItem: 6, //不出现滚动条是最多的显示条数
                    tree: null, //是否为树组合框
                    treeLeafOnly: true, //是否只选择叶子
                    isMultiSelect: false, //是否多选
                    isShowCheckBox: false, //是否选择复选框 暂未实现
                    isShowClear: false,
                    tip: '请选择',
                    appendTo: false, //需要插入的节点，默认为当前的textbox内部
                    split: ',', //多选的值的分隔符
                    readonly: false,

                    valueField: 'value', //值字段
                    textField: 'text', //文本字段
                    textTemplate: null, //文本模板（复杂要求下使用，并弃用textField）
                    initValue: null, //初始值
                    initText: null, //初始文本
                    valueFieldID: null, //手动设定隐藏value对应的id

                    onBeforeOpen: null,
                    onError: null,
                    onAfterRender: null,
                    onBeforeSelect: null,
                    onSelect: null,
                    onClear: null
                },

                _create: function() {
                    var name = this.options.name || UI.utils.generateGUID(
                        "text");

                    //渲染基础dom
                    if (!this.element.is('input')) {
                        this._createByDiv(name);
                    } else {
                        this._createByInput(name);
                    }

                    //提示语
                    this.textInput.val(this.options.tip);

                    //渲染下拉框dom
                    this._creatComboBox();

                    //渲染多选style
                    if (this.options.isMultiSelect)
                        this.wrapper.addClass('fly-combobox-multi');

                    if (this.options.isShowClear) {
                        this.wrapper.addClass('fly-combobox-clear');
                    }

                    this._addEvents();
                },

                //根据div渲染
                _createByDiv: function(name) {
                    var _uuid = UI.utils.generateGUID('combobox');
                    this.wrapper = this.element.addClass("fly-combobox");
                    this.trigger = $('<i>').addClass(
                        'fly-combobox-arrow')
                        .appendTo(this.wrapper);

                    this.textInput =
                        $('<input>').addClass('text')
                        .attr('readonly', true)
                        .attr('type', 'text')
                        .attr('name', name + 'Txt')
                        .appendTo(this.wrapper)
                        .wrap('<em></em>');
                    this.valueInput = this.options.valueFieldID ?
                        $("#" + this.options.valueFieldID) :
                        $('<input>').attr('type', 'hidden')
                        .attr('name', name)
                        .insertAfter(this.textInput);

                    this.textInput.attr('mind-accept', _uuid);
                    this.valueInput.attr('mind-target', _uuid);

                    if (this.options.readonly) {
                        this.wrapper.addClass('fly-combobox-disabled');
                        this.textInput.attr('disabled', true);
                    }
                },

                //根据input渲染
                _createByInput: function(name) {
                    this.textInput = this.element
                        .addClass("text").wrap(
                            "<div class='fly-combobox'><em></em></div>"
                    );
                    this.wrapper = this.textInput.parent().parent();
                    this.trigger = $('<i>').addClass(
                        'fly-combobox-arrow')
                        .prependTo(this.wrapper);

                    this.valueInput = this.options.valueFieldID ?
                        $("#" + this.options.valueFieldID) :
                        $('<input>').attr('type', 'hidden')
                        .attr('name', name)
                        .insertAfter(this.textInput);

                },

                //渲染下拉框
                _creatComboBox: function() {
                    this.comboWarpper = $('<div>').addClass(
                        'fly-combobox-inner');
                    this.comboContent = $('<ul>').appendTo(this.comboWarpper);

                    if (this.options.appendTo) {
                        this.comboWarpper.appendTo($(this.options.appendTo));
                    } else {
                        this.comboWarpper.appendTo(this.wrapper);
                    }
                },

                //初始化
                _init: function() {
                    var self = this;

                    //已渲染过
                    if (self.comboWarpper.hasClass('rendered')) return;

                    //显示方式为tree
                    if (self.options.tree && (typeof self.options.tree ==
                        'object')) {

                        /*var treeOption = {
                data: self.options.data,
                checkbox: self.options.isMultiSelect,
                autoCheckboxEven: self.options.autoCheckboxEven || false,
                valueField: self.options.valueField,
                textField: self.options.textField,
                isLeaf: self.options.isLeaf || null,
                onBeforeSelect: self.options.onBeforeSelect,
                onSelect: self.options.onSelect,
                onCheck: self.options.onCheck || function () {}
            };*/

                        if (typeof self.options.tree.data == 'string') {
                            /*treeOption.isLeaf = function(data) {
                    if (!data) return false;
                    return data.isleaf == "true";
                };*/
                            self.options.tree.delay = function(e) {
                                var data = e.data;
                                return {
                                    data: self.options.tree.data + '?' +
                                        self.options.tree
                                        .valueField +
                                        '=' + data[self.options.tree.valueField]
                                };
                            };
                        }

                        self.comboWarpper.addClass(
                            'fly-combobox-tree rendered');
                        //self.comboContent.tree(treeOption);
                        self.comboContent.tree(self.options.tree);
                        self._addTreeEvents();

                    } else {
                        //没有data
                        if (!self.options.data) return;

                        if (self.options.data instanceof Array) {
                            //直接渲染该数组
                            self.data = self.options.data;
                            self._render();
                        } else if (typeof self.options.data == 'string') {
                            //通过ajax请求该url
                            $.ajax({
                                url: self.options.data,
                                type: self.options.ajaxType,
                                dataType: "json",
                                success: function(data) {
                                    self.data = UI.utils.toObj(data);
                                    self._render();
                                },
                                error: function() {
                                    self.options.onError && self.options
                                        .onError();
                                }
                            });
                        } else {
                            //通过dao获取数据
                            //TODO
                        }
                    }
                },

                //渲染数据
                _render: function() {
                    var self = this,
                        values = self.options.initValue;

                    if (typeof values == 'undefined' || values == null) {
                        values = self.valueInput.val();
                    }

                    values = UI.utils.toString(values);
                    if (values.indexOf(self.options.split) > -1) {
                        values = values.split(self.options.split);
                    } else {
                        values = [values];
                    }

                    self.comboContent.empty();

                    $.each(self.data, function(i, item) {
                        var text = self.options.textTemplate ?
                            _.template(self.options.textTemplate)(
                                this.options) :
                            item[self.options.textField];
                        var $li = $('<li>').attr('title', text).text(
                                text)
                            .data('combo', item);
                        if (_.indexOf(values, UI.utils.toString(
                                item[self.options.valueField])) >=
                            0)
                            $li.addClass('selected');
                        $li.appendTo(self.comboContent);
                    });

                    self._update();
                    self._addItemEvents();
                    self.comboWarpper.addClass('rendered');
                    self.options.onAfterRender && self.options.onAfterRender(
                        self.data);

                    /* 默认值 */
                    self._update();
                },

                //渲染tree
                _renderTree: function() {

                },

                //添加事件
                _addEvents: function() {
                    var self = this;
                    //下拉小箭头
                    self.trigger.click(function(e) {
                        e.stopPropagation();
                        /* 判断输入框是否被禁用 */
                        if (self.textInput.is('[disabled]')) { //this.textInput
                            return false;
                        }

                        if ((self.wrapper.hasClass(
                                    'fly-combobox-multi') || self.wrapper
                                .hasClass('fly-combobox-clear')) &&
                            self.wrapper.hasClass(
                                'fly-combobox-active')) {
                            self.clear();
                        } else if (self.wrapper.hasClass(
                            'fly-combobox-active')) {
                            self.close();
                        } else {
                            self.open();
                        }
                    });
                    //点击文字框
                    self.textInput.click(function(e) {
                        self.open();
                    });
                    //给value框绑定setvalue事件，在赋值后触发该事件来重设value
                    self.valueInput.bind('setvalue', function() {
                        var value = self.valueInput.val();
                        self._setValue(value);
                    });

                    if (self.options.appendTo) {
                        $(window).resize(function() {
                            self._position();
                        });
                    }
                },

                //添加事件
                _addItemEvents: function() {
                    var self = this;
                    //下拉列表
                    self.comboContent.on('click', 'li', function() {
                        if (self.options.onBeforeSelect) {
                            if (self.options.onBeforeSelect($(this)
                                    .data('combo')) ===
                                false)
                                return;
                        }

                        if (!self.options.isMultiSelect) {
                            $(this).addClass('selected').siblings()
                                .removeClass(
                                    'selected');
                            self._update();
                            self.close();
                        } else {
                            if ($(this).hasClass('selected'))
                                $(this).removeClass('selected');
                            else
                                $(this).addClass('selected');
                            self._update();
                        }

                        self.options.onSelect && self.options.onSelect
                            .call(self, $(this).data(
                                'combo'));
                    });
                },

                _addTreeEvents: function() {
                    var self = this;
                    /*if(self.options.isMultiSelect){
            self.comboContent.tree({
                onCheck: function(node){
                    self.options.onSelect && self.options.onSelect(node.data);
                    self._update();
                }
            });
        }else{
            self.comboContent.tree({
                onSelect: function(node){
                    self.options.onSelect && self.options.onSelect(node.data);
                    self._update();
                    self.close();
                }
            });
        }*/

                    if (self.options.isMultiSelect) {
                        self.comboContent.tree({
                            onCheck: function(e, node) {
                                self.options.tree.onCheck && self.options
                                    .tree.onCheck(
                                        node.data);
                                self._update();
                            }
                        });
                    } else {
                        self.comboContent.tree({
                            onSelect: function(e, node) {
                                self.options.tree.onSelect && self.options
                                    .tree.onSelect(
                                        node.data);
                                self._update();
                                self.close();
                            }
                        });
                    }
                },

                //给document绑定事件，点击空白处收起
                _addDocumentEvent: function() {
                    var self = this;
                    $(document).unbind('click.flyui.combobox')
                        .bind('click.flyui.combobox', function(e) {
                            var target = $(e.target);
                            if (target.closest(self.comboWarpper).length ==
                                0 &&
                                target
                                .closest(self.wrapper).length == 0) {
                                self.close();
                            }
                        });
                },

                //定位下拉框 在appendTo为false时无效
                _position: function() {
                    var self = this;
                    if (self.options.appendTo) {
                        var wh = $(window).height(),
                            bh = document.body.scrollHeight;
                        var width, height, top, left;
                        var domHeight = wh > bh ? wh : bh;
                        var boxHeight = self.comboWarpper.height();
                        var offset = self.wrapper.offset();

                        width = self.wrapper.outerWidth();
                        height = self.wrapper.outerHeight();
                        top = offset.top + height;
                        left = offset.left;

                        if (top + boxHeight > domHeight) {
                            top = offset.top - boxHeight;
                        }

                        self.comboWarpper.css({
                            margin: "0",
                            left: left,
                            top: top,
                            width: self.options.width || width - 2
                        });
                    }
                },

                //打开下拉框
                open: function() {
                    if (this.options.onBeforeOpen) {
                        if (this.options.onBeforeOpen.call(this) ===
                            false)
                            return;
                    }

                    $(document).trigger('click.flyui.combobox');
                    this.comboWarpper.show();
                    this.wrapper.addClass("fly-combobox-active");
                    this._position();
                    this._addDocumentEvent();
                },

                //关闭下拉框
                close: function() {
                    var self = this;

                    if (self.options.valid) {
                        if (!UI.validate.isPass(self.valueInput, self.options
                            .valid)) {
                            return false;
                        }
                    }

                    this.comboWarpper.hide();
                    this.wrapper.removeClass("fly-combobox-active");
                    $(document).unbind('click.flyui.combobox');
                },

                //清空
                clear: function() {
                    this.selected = [];
                    this.valueInput.val('');
                    this.textInput.val(this.options.tip);
                    this.comboContent.find('.selected').removeClass(
                        'selected');
                    this.comboContent.find('.fly-checkbox').removeClass(
                        'fly-checkbox-checked').addClass(
                        'fly-checkbox-unchecked');
                },

                _setValue: function(value) {
                    var self = this,
                        values = value.split(self.options.split),
                        selectedNum = 0;

                    //TODO 需要根据显示状态去判断
                    if (self.options.tree) {

                    } else {
                        self.comboContent.find('li').each(function() {
                            var data = $(this).data('combo');

                            if (_.indexOf(values, UI.utils.toString(
                                data[self.options
                                    .valueField])) >= 0) {
                                $(this).addClass('selected');

                                selectedNum++;

                                if (!self.options.isMultiSelect) {
                                    $(this).siblings().removeClass(
                                        'selected');
                                    return false;
                                }
                            }
                        });
                    }

                    if (value && selectedNum == 0) {
                        return false;
                    }
                    self._update();
                },

                setValue: function(value) {
                    this._setValue(value);
                },

                _getValue: function() {
                    return this.valueInput.val();
                },

                getValue: function() {
                    return this._getValue();
                },

                setReadOnly: function() {
                    //this.trigger.unbind();
                },

                _update: function() {
                    var values = [],
                        texts = [],
                        self = this;
                    self.selected = [];

                    if (self.options.tree && (typeof self.options.tree ==
                        'object')) {
                        var tree = self.comboContent.data('flyTree'),
                            selectTreeNodes;
                        if (self.options.isMultiSelect) {
                            selectTreeNodes = tree.getChecked();
                        } else {
                            selectTreeNodes = tree.getSelected() ==
                                null ? [] : [tree.getSelected()];
                        }

                        /* 判断是否有数据 */
                        if (selectTreeNodes.length) {
                            $.each(selectTreeNodes, function(i, item) {
                                values.push(item.data[self.options.tree
                                    .valueField]);
                                texts.push(item.data[self.options.tree
                                    .textField]);
                                self.selected.push(item.data);
                            });
                        }
                    } else {
                        var $selected = self.comboContent.find(
                            '.selected');
                        $selected.each(function() {
                            var data = $(this).data('combo');
                            values.push(data[self.options.valueField]);
                            texts.push(data[self.options.textField]);
                            self.selected.push(data);
                        });
                    }

                    /*if(!self.options.tree){
            var $selected = self.comboContent.find('.selected');
            $selected.each(function() {
                var data = $(this).data('combo');
                values.push(data[self.options.valueField]);
                texts.push(data[self.options.textField]);
                self.selected.push(data);
            });
        }else{
            var tree = self.comboContent.data('FUITree'), selectTreeNodes;
            if(self.options.isMultiSelect)
                selectTreeNodes = tree.getChecked();
            else
                selectTreeNodes = [tree.getSelected()];
            $.each(selectTreeNodes, function(i, item){
                values.push(item.data[self.options.valueField]);
                texts.push(item.data[self.options.textField]);
                self.selected.push(item.data);
            });
        }*/

                    self.valueInput.val(values.join(self.options.split));
                    self.textInput.val(texts.join(self.options.split));
                    self.textInput.trigger('change');
                    if (values.length == 0) {
                        self.textInput.val(self.options.tip);
                    }
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'disabled') {
                        if (value) {
                            this.wrapper.addClass(
                                'fly-combobox-disabled');
                            this.textInput.attr('disabled', true);
                        } else {
                            this.wrapper.removeClass(
                                'fly-combobox-disabled');
                            this.textInput.removeAttr('disabled');
                        }
                    } else if (key == 'data') {
                        this.comboWarpper.removeClass('rendered');
                    }
                },

                _destroy: function() {

                }

            });

            UI.ready(function(context) {
                $('[data-fly-combobox]', context).each(function() {
                    var $this = $(this);
                    var opts = $this.data('flyOptions');
                    if (opts == 'this.text') {
                        opts = $this.text();
                        $this.text('');
                    }
                    $this.combobox(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.combobox;
        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    5: [
        function(require, module, exports) {
            'use strict';

            if (typeof $ === 'undefined') {
                throw new Error('flyUI requires jQuery');
            }

            var UI = $.FUI || {};
            var $win = $(window);
            var doc = window.document;
            var $html = $('html');

            UI.VERSION = '0.5.0';

            UI.support = {};

            // 监视DOM变动的接口 当DOM对象树发生任何变动的时候,Mutation Observer会得到通知
            UI.support.mutationobserver = (window.MutationObserver ||
                window.WebKitMutationObserver || null);

            /* 工具类 */
            UI.utils = {};

            /**
             * 数据格式
             * 基础数据格式
             * @class Model
             * @namespace Util
             */
            UI.utils.model = function(data) {
                /**
                 * 基础数据
                 */
                this.data = data;

                /**
                 * 得到数据，可以在这里做一些数据过滤和处理
                 */
                this.getData = function() {
                    return this.data;
                }

                /**
                 * 增加属性
                 * key 属性名
                 * value 属性值
                 * flag 是否不采取强制赋值 如果 flag == true 那么如果key已经存在就不会赋值，默认是false
                 */
                this.add = function(key, value, flag) {
                    flag = flag || false;
                    if (flag && this.data[key]) {
                        return;
                    }
                    this.data[key] = value;
                }
            };

            /**
             * dao链式调用所用对象
             * @class AjaxObj
             * @namespace Util
             */
            UI.utils.ajaxObj = function() {
                var obj = {};

                obj.done = function(callback) {
                    if (callback) this._done = callback;
                    return this;
                };

                obj.fail = function(callback) {
                    if (callback) this._fail = callback;
                    return this;
                };

                obj.empty = function(callback) {
                    if (callback) this._empty = callback;
                    return this;
                };

                obj.options = {
                    before: function() {},
                    after: function() {}
                };

                return obj;
            };

            /**
             * 数据加载
             * 直接调用jquery的ajax请求
             * @class Ajax
             * @namespace util
             */
            UI.utils.ajax = {

                //POST发送数据
                post: function(url, data, type) {
                    url = CONTEXTPATH + url;
                    type = type || 'json';
                    return $.ajax({
                        url: url,
                        data: data || {},
                        dataType: type || 'json',
                        type: 'POST'
                    });
                },

                //GET请求数据
                get: function(url, data, type) {
                    url = CONTEXTPATH + url;
                    type = type || 'json';
                    return $.ajax({
                        url: url,
                        cache: false,
                        data: data || {},
                        dataType: type || 'json',
                        type: 'GET'
                    });
                }
            };

            /**
             * 获取URL参数
             * @param name 参数名
             * @return 参数值，若没有该参数，则返回null
             */
            UI.utils.getQueryString = function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return '';
            };


            /**
             * Debounce function
             */
            UI.utils.debounce = function(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this;
                    var args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) {
                            func.apply(context, args);
                        }
                    };
                    var callNow = immediate && !timeout;

                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);

                    if (callNow) {
                        func.apply(context, args);
                    }
                };
            };

            /* 从data中格式化参数 */
            UI.utils.parseOptions = UI.utils.options = function(string) {
                if ($.isPlainObject(string)) {
                    return string;
                }

                var start = (string ? string.indexOf('{') : -1);
                var options = {};

                if (start != -1) {
                    try {
                        options = (new Function('',
                            'var json = ' + string.substr(start) +
                            '; return json;'))();
                    } catch (e) {}
                }

                return options;
            };

            /* 获取唯一guid */
            UI.utils.generateGUID = function(namespace) {
                var uid = namespace + '-' || 'fly-';

                do {
                    uid += Math.random().toString(36).substring(2, 7);
                } while (document.getElementById(uid));

                return uid;
            };

            /* 将json转换为object */
            UI.utils.toObj = function(json) {
                var data = json;
                if (typeof(data) == "string" &&
                    (data.indexOf('{') == 0 || data.indexOf('[') == 0)) {
                    data = eval('(' + data + ')');
                }
                return data;
            };

            /* 将number转换为string */
            UI.utils.toString = function(num) {
                var str = num;
                if (typeof str == "number") {
                    return str + '';
                }
                return str;
            };



            /**
             * 获取URL中的查询参数
             * @param name 参数名
             * @return 参数值，若没有该参数，则返回null
             */
            UI.utils.getQueryString = function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return '';
            };


            /* 精确计算 */
            UI.calculate = {};

            //加法函数
            UI.calculate.add = function(arg1, arg2) {
                var r1, r2, m;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                } catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2));
                return (arg1 * m + arg2 * m) / m;
            }

            //减法函数
            UI.calculate.sub = function(arg1, arg2) {
                var r1, r2, m, n;
                try {
                    r1 = arg1.toString().split(".")[1].length;
                } catch (e) {
                    r1 = 0;
                }
                try {
                    r2 = arg2.toString().split(".")[1].length;
                } catch (e) {
                    r2 = 0;
                }
                m = Math.pow(10, Math.max(r1, r2));
                //last modify by deeka
                //动态控制精度长度
                n = (r1 >= r2) ? r1 : r2;
                return ((arg1 * m - arg2 * m) / m).toFixed(n);
            }

            //乘法函数
            UI.calculate.mul = function(arg1, arg2) {
                var m = 0,
                    s1 = arg1.toString(),
                    s2 = arg2.toString();
                try {
                    m += s1.split(".")[1].length;
                } catch (e) {}
                try {
                    m += s2.split(".")[1].length;
                } catch (e) {}
                return Number(s1.replace(".", "")) * Number(s2.replace(".",
                    "")) / Math.pow(10, m);
            }

            //除法函数
            UI.calculate.div = function(arg1, arg2) {
                var t1 = 0,
                    t2 = 0,
                    r1, r2;
                try {
                    t1 = arg1.toString().split(".")[1].length;
                } catch (e) {}
                try {
                    t2 = arg2.toString().split(".")[1].length;
                } catch (e) {}
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return (r1 / r2) * Math.pow(10, t2 - t1);
            }



            // Dom mutation watchers
            UI.DOMWatchers = [];
            UI.DOMReady = false;
            UI.ready = function(callback) {
                UI.DOMWatchers.push(callback);
                if (UI.DOMReady) {
                    callback(document);
                }
            };

            UI.flyReady = function() {
                $(document).trigger('domready.flyui');
                UI.DOMReady = true;
            };

            $(document).on('domready.flyui', function() {
                $.each(UI.DOMWatchers, function(i, watcher) {
                    watcher(document);
                });
            });

            //准备弃用
            $.FUI = UI;

            window.fly = UI;

            if (typeof define === "function" && define.amd) {
                define("fly", [], function() {
                    return UI;
                });
            } else {
                $(function() {
                    UI.flyReady();
                });
            }

            module.exports = UI;
        }, {}
    ],
    6: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.datepicker', {
                options: {
                    type: 'datepicker',
                    dateFmt: 'yyyyMMdd', //yyyy/MM/dd HH:mm
                    minDate: '',
                    maxDate: '',
                    value: '',
                    id: '',
                    onBlur: function() {},
                    onValid: function() {}
                },

                _create: function() {
                    var self = this,
                        _options = {},
                        datePickerId = self.options.id ? self.options.id :
                        UI.utils.generateGUID("datepicker");

                    this.element.addClass(
                        'fly-textbox fly-textbox-datepicker').empty();
                    this.datePicker = $('<i/>').addClass('icon').appendTo(
                        this.element);
                    this.control = $('<input>')
                        .attr('type', 'text')
                        .attr('id', datePickerId)
                        .attr('readonly', true)
                        .attr('name', this.options.name)
                        .attr('value', self.options.value || '')
                        .appendTo(this.element)
                        .wrap('<em></em>').addClass('text');

                    _options.el = datePickerId;

                    if (self.options.dateFmt != '') {
                        _options.dateFmt = self.options.dateFmt;
                    }
                    if (self.options.minDate != '') {
                        _options.minDate = self.options.minDate;
                    }
                    if (self.options.maxDate != '') {
                        _options.maxDate = self.options.maxDate;
                    }

                    /* 绑定日期选择事件 */
                    //self.control.attr('onfocus', 'WdatePicker('+ UI.json.toJSON(_options) +')');

                    self.datePicker.attr('onclick', 'WdatePicker(' + UI
                        .json.toJSON(_options) + ')');

                    self.control.blur(function() {
                        self.options.onBlur(this, self.control.val());
                    });
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },

                refresh: function() {

                },
                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-datepicker]', context).each(function() {
                    $(this).datepicker(UI.utils.parseOptions($(this)
                        .data('flyOptions')));
                });
            });

            module.exports = UI.button;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    7: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.daterange', {

                options: {
                    dateFmt: 'yyyyMMdd',
                    startMinDate: '',
                    startMaxDate: '',
                    endMinDate: '',
                    endMaxDate: '',
                    startValue: '',
                    endValue: ''
                },

                _create: function() {
                    var self = this,
                        startOptions = {},
                        endOptions = {},
                        datePickerId = UI.utils.generateGUID(
                            "datepicker");

                    self.element.empty()
                        .addClass(
                            'fly-textbox fly-textrange fly-daterange')
                        .append('<em><i></i></em>');

                    self.start = $('<input/>')
                        .attr('type', 'text')
                        .attr('id', datePickerId + '-start')
                        .attr('readonly', true)
                        .attr('name', self.options.startName)
                        .attr('value', self.options.startValue || '')
                        .addClass('text start')
                        .appendTo(self.element.find('em'));

                    self.end = $('<input/>')
                        .attr('type', 'text')
                        .attr('id', datePickerId + '-end')
                        .attr('readonly', true)
                        .attr('name', self.options.endName)
                        .attr('value', self.options.endValue || '')
                        .addClass('text end')
                        .appendTo(self.element.find('em'));

                    if (self.options.dateFmt) {
                        startOptions.dateFmt = self.options.dateFmt;
                        endOptions.dateFmt = self.options.dateFmt;
                    }

                    //startOptions.onpicked = '';
                    startOptions.maxDate = '#F{$dp.$D("' + datePickerId +
                        '-end")}';
                    endOptions.minDate = '#F{$dp.$D("' + datePickerId +
                        '-start")}';

                    //替换双引号
                    var _startOption = UI.json.toJSON(startOptions).replace(
                        /\"/g, "'");
                    var _endOption = UI.json.toJSON(endOptions).replace(
                        /\"/g, "'");

                    /* 绑定日期选择事件 */
                    self.start.attr('onfocus', 'WdatePicker(' +
                        _startOption + ')');
                    self.end.attr('onfocus', 'WdatePicker(' +
                        _endOption + ')');


                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },

                refresh: function() {

                },

                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-daterange]', context).each(function() {
                    $(this).datepicker(UI.utils.parseOptions($(this)
                        .data(
                            'flyOptions')));
                });
            });

            module.exports = UI.button;
        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    8: [
        function(require, module, exports) {
            'use strict';

            /*!
             * artDialog 4.1.7
             * Date: 2013-03-03 08:04
             * http://code.google.com/p/artdialog/
             * (c) 2009-2012 TangBin, http://www.planeArt.cn
             *
             * This is licensed under the GNU LGPL, version 2.1 or later.
             * For details, see: http://creativecommons.org/licenses/LGPL/2.1/
             */


            var $ = (window.jQuery);

            //(function ($, window, undefined) {

            $.noop = $.noop || function() {}; // jQuery 1.3.2
            var _box, _thisScript, _skin, _path,
                _count = 0,
                _$window = $(window),
                _$document = $(document),
                _$html = $('html'),
                _elem = document.documentElement,
                _isIE6 = window.VBArray && !window.XMLHttpRequest,
                _isMobile = 'createTouch' in document && !('onmousemove' in
                    _elem) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
                _expando = 'artDialog' + +new Date;

            var artDialog = function(config, ok, cancel) {
                config = config || {};

                if (typeof config === 'string' || config.nodeType === 1) {
                    config = {
                        content: config,
                        fixed: !_isMobile
                    };
                };

                //将这里的this改为window
                var api,
                    defaults = artDialog.defaults,
                    elem = (window.nodeType === 1) && window || config.follow;

                config.follow = elem;

                // 合并默认配置
                for (var i in defaults) {
                    if (config[i] === undefined) config[i] = defaults[i];
                };

                // 兼容v4.1.0之前的参数，未来版本将删除此
                $.each({
                        ok: "yesFn",
                        cancel: "noFn",
                        close: "closeFn",
                        init: "initFn",
                        okVal: "yesText",
                        cancelVal: "noText"
                    },
                    function(i, o) {
                        config[i] = config[i] !== undefined ? config[i] :
                            config[o]
                    });

                // 返回跟随模式或重复定义的ID
                if (typeof elem === 'string') elem = $(elem)[0];
                config.id = elem && elem[_expando + 'follow'] || config
                    .id || _expando + _count;
                api = artDialog.list[config.id];
                if (elem && api) return api.follow(elem).zIndex().focus();
                if (api) return api.zIndex().focus();

                // 目前主流移动设备对fixed支持不好
                if (_isMobile) config.fixed = false;

                // 按钮队列
                if (!$.isArray(config.button)) {
                    config.button = config.button ? [config.button] : [];
                };
                if (ok !== undefined) config.ok = ok;
                if (cancel !== undefined) config.cancel = cancel;
                config.ok && config.button.push({
                    name: config.okVal,
                    callback: config.ok,
                    focus: true
                });
                config.cancel && config.button.push({
                    name: config.cancelVal,
                    callback: config.cancel
                });

                // zIndex全局配置
                artDialog.defaults.zIndex = config.zIndex;

                _count++;

                return artDialog.list[config.id] = _box ?
                    _box._init(config) : new artDialog.fn._init(config);
            };

            artDialog.fn = artDialog.prototype = {

                version: '4.1.7',

                closed: true,

                _init: function(config) {
                    var that = this,
                        DOM,
                        icon = config.icon,
                        iconBg = icon && (_isIE6 ? {
                            png: 'icons/' + icon + '.png'
                        } : {
                            backgroundImage: 'url(\'' + config.path +
                                '/icons/' + icon + '.png\')'
                        });

                    that.closed = false;
                    that.config = config;
                    that.DOM = DOM = that.DOM || that._getDOM();

                    DOM.wrap.addClass(config.skin);
                    DOM.close[config.cancel === false ? 'hide' : 'show']();
                    DOM.icon[0].style.display = icon ? '' : 'none';
                    DOM.iconBg.css(iconBg || {
                        background: 'none'
                    });
                    DOM.se.css('cursor', config.resize ? 'se-resize' :
                        'auto');
                    DOM.title.css('cursor', config.drag ? 'move' : 'auto');
                    DOM.content.css('padding', config.padding);

                    that[config.show ? 'show' : 'hide'](true)
                    that.button(config.button)
                        .title(config.title)
                        .content(config.content, true)
                        .size(config.width, config.height)
                        .time(config.time);

                    config.follow ? that.follow(config.follow) : that.position(
                        config.left, config.top);

                    that.zIndex().focus();
                    config.lock && that.lock();

                    that._addEvent();
                    that._ie6PngFix();
                    _box = null;

                    config.init && config.init.call(that, window);
                    return that;
                },

                /**
                 * 设置内容
                 * @param	{String, HTMLElement}	内容 (可选)
                 * @return	{this, HTMLElement}		如果无参数则返回内容容器DOM对象
                 */
                content: function(msg) {
                    var prev, next, parent, display,
                        that = this,
                        DOM = that.DOM,
                        wrap = DOM.wrap[0],
                        width = wrap.offsetWidth,
                        height = wrap.offsetHeight,
                        left = parseInt(wrap.style.left),
                        top = parseInt(wrap.style.top),
                        cssWidth = wrap.style.width,
                        $content = DOM.content,
                        content = $content[0];

                    that._elemBack && that._elemBack();
                    wrap.style.width = 'auto';

                    if (msg === undefined) return content;
                    if (typeof msg === 'string') {
                        $content.html(msg);
                    } else if (msg && msg.nodeType === 1) {

                        // 让传入的元素在对话框关闭后可以返回到原来的地方
                        display = msg.style.display;
                        prev = msg.previousSibling;
                        next = msg.nextSibling;
                        parent = msg.parentNode;
                        that._elemBack = function() {
                            if (prev && prev.parentNode) {
                                prev.parentNode.insertBefore(msg, prev.nextSibling);
                            } else if (next && next.parentNode) {
                                next.parentNode.insertBefore(msg, next);
                            } else if (parent) {
                                parent.appendChild(msg);
                            };
                            msg.style.display = display;
                            that._elemBack = null;
                        };

                        $content.html('');
                        content.appendChild(msg);
                        msg.style.display = 'block';

                    };

                    // 新增内容后调整位置
                    if (!arguments[1]) {
                        if (that.config.follow) {
                            that.follow(that.config.follow);
                        } else {
                            width = wrap.offsetWidth - width;
                            height = wrap.offsetHeight - height;
                            left = left - width / 2;
                            top = top - height / 2;
                            wrap.style.left = Math.max(left, 0) + 'px';
                            wrap.style.top = Math.max(top, 0) + 'px';
                        };
                        if (cssWidth && cssWidth !== 'auto') {
                            wrap.style.width = wrap.offsetWidth + 'px';
                        };
                        that._autoPositionType();
                    };

                    that._ie6SelectFix();
                    that._runScript(content);

                    return that;
                },

                /**
                 * 设置标题
                 * @param	{String, Boolean}	标题内容. 为false则隐藏标题栏
                 * @return	{this, HTMLElement}	如果无参数则返回内容器DOM对象
                 */
                title: function(text) {
                    var DOM = this.DOM,
                        wrap = DOM.wrap,
                        title = DOM.title,
                        className = 'aui_state_noTitle';

                    if (text === undefined) return title[0];
                    if (text === false) {
                        title.hide().html('');
                        wrap.addClass(className);
                    } else {
                        title.show().html(text || '');
                        wrap.removeClass(className);
                    };

                    return this;
                },

                /**
                 * 位置(相对于可视区域)
                 * @param	{Number, String}
                 * @param	{Number, String}
                 */
                position: function(left, top) {
                    var that = this,
                        config = that.config,
                        wrap = that.DOM.wrap[0],
                        isFixed = _isIE6 ? false : config.fixed,
                        ie6Fixed = _isIE6 && that.config.fixed,
                        docLeft = _$document.scrollLeft(),
                        docTop = _$document.scrollTop(),
                        dl = isFixed ? 0 : docLeft,
                        dt = isFixed ? 0 : docTop,
                        ww = _$window.width(),
                        wh = _$window.height(),
                        ow = wrap.offsetWidth,
                        oh = wrap.offsetHeight,
                        style = wrap.style;

                    if (left || left === 0) {
                        that._left = left.toString().indexOf('%') !== -1 ?
                            left : null;
                        left = that._toNumber(left, ww - ow);

                        if (typeof left === 'number') {
                            left = ie6Fixed ? (left += docLeft) : left + dl;
                            style.left = Math.max(left, dl) + 'px';
                        } else if (typeof left === 'string') {
                            style.left = left;
                        };
                    };

                    if (top || top === 0) {
                        that._top = top.toString().indexOf('%') !== -1 ?
                            top : null;
                        top = that._toNumber(top, wh - oh);

                        if (typeof top === 'number') {
                            top = ie6Fixed ? (top += docTop) : top + dt;
                            style.top = Math.max(top, dt) + 'px';
                        } else if (typeof top === 'string') {
                            style.top = top;
                        };
                    };

                    if (left !== undefined && top !== undefined) {
                        that._follow = null;
                        that._autoPositionType();
                    };

                    return that;
                },

                /**
                 *	尺寸
                 *	@param	{Number, String}	宽度
                 *	@param	{Number, String}	高度
                 */
                size: function(width, height) {
                    var maxWidth, maxHeight, scaleWidth, scaleHeight,
                        that = this,
                        config = that.config,
                        DOM = that.DOM,
                        wrap = DOM.wrap,
                        main = DOM.main,
                        wrapStyle = wrap[0].style,
                        style = main[0].style;

                    if (width) {
                        that._width = width.toString().indexOf('%') !== -1 ?
                            width : null;
                        maxWidth = _$window.width() - wrap[0].offsetWidth +
                            main[0].offsetWidth;
                        scaleWidth = that._toNumber(width, maxWidth);
                        width = scaleWidth;

                        if (typeof width === 'number') {
                            wrapStyle.width = 'auto';
                            style.width = Math.max(that.config.minWidth,
                                width) + 'px';
                            wrapStyle.width = wrap[0].offsetWidth + 'px'; // 防止未定义宽度的表格遇到浏览器右边边界伸缩
                        } else if (typeof width === 'string') {
                            style.width = width;
                            width === 'auto' && wrap.css('width', 'auto');
                        };
                    };

                    if (height) {
                        that._height = height.toString().indexOf('%') !== -
                            1 ? height : null;
                        maxHeight = _$window.height() - wrap[0].offsetHeight +
                            main[0].offsetHeight;
                        scaleHeight = that._toNumber(height, maxHeight);
                        height = scaleHeight;

                        if (typeof height === 'number') {
                            style.height = Math.max(that.config.minHeight,
                                height) + 'px';
                        } else if (typeof height === 'string') {
                            style.height = height;
                        };
                    };

                    that._ie6SelectFix();

                    return that;
                },

                /**
                 * 跟随元素
                 * @param	{HTMLElement, String}
                 */
                follow: function(elem) {
                    var $elem, that = this,
                        config = that.config;

                    if (typeof elem === 'string' || elem && elem.nodeType ===
                        1) {
                        $elem = $(elem);
                        elem = $elem[0];
                    };

                    // 隐藏元素不可用
                    if (!elem || !elem.offsetWidth && !elem.offsetHeight) {
                        return that.position(that._left, that._top);
                    };

                    var expando = _expando + 'follow',
                        winWidth = _$window.width(),
                        winHeight = _$window.height(),
                        docLeft = _$document.scrollLeft(),
                        docTop = _$document.scrollTop(),
                        offset = $elem.offset(),
                        width = elem.offsetWidth,
                        height = elem.offsetHeight,
                        isFixed = _isIE6 ? false : config.fixed,
                        left = isFixed ? offset.left - docLeft : offset.left,
                        top = isFixed ? offset.top - docTop : offset.top,
                        wrap = that.DOM.wrap[0],
                        style = wrap.style,
                        wrapWidth = wrap.offsetWidth,
                        wrapHeight = wrap.offsetHeight,
                        setLeft = left - (wrapWidth - width) / 2,
                        setTop = top + height,
                        dl = isFixed ? 0 : docLeft,
                        dt = isFixed ? 0 : docTop;

                    setLeft = setLeft < dl ? left :
                        (setLeft + wrapWidth > winWidth) && (left -
                        wrapWidth > dl) ? left - wrapWidth + width :
                        setLeft;

                    setTop = (setTop + wrapHeight > winHeight + dt) && (top -
                        wrapHeight > dt) ? top - wrapHeight : setTop;

                    style.left = setLeft + 'px';
                    style.top = setTop + 'px';

                    that._follow && that._follow.removeAttribute(expando);
                    that._follow = elem;
                    elem[expando] = config.id;
                    that._autoPositionType();
                    return that;
                },

                /**
	 * 自定义按钮
	 * @example
		button({
			name: 'login',
			callback: function () {},
			disabled: false,
			focus: true
		}, .., ..)
	 */
                button: function() {
                    var that = this,
                        ags = arguments,
                        DOM = that.DOM,
                        buttons = DOM.buttons,
                        elem = buttons[0],
                        strongButton = 'aui_state_highlight',
                        listeners = that._listeners = that._listeners || {},
                        list = $.isArray(ags[0]) ? ags[0] : [].slice.call(
                            ags);

                    if (ags[0] === undefined) return elem;
                    $.each(list, function(i, val) {
                        var name = val.name,
                            isNewButton = !listeners[name],
                            button = !isNewButton ?
                            listeners[name].elem :
                            document.createElement('button');

                        if (!listeners[name]) listeners[name] = {};
                        if (val.callback) listeners[name].callback =
                            val.callback;
                        if (val.className) button.className = val.className;
                        if (val.focus) {
                            that._focus && that._focus.removeClass(
                                strongButton);
                            that._focus = $(button).addClass(
                                strongButton);
                            that.focus();
                        };

                        // Internet Explorer 的默认类型是 "button"，
                        // 而其他浏览器中（包括 W3C 规范）的默认值是 "submit"
                        // @see http://www.w3school.com.cn/tags/att_button_type.asp
                        button.setAttribute('type', 'button');

                        button[_expando + 'callback'] = name;
                        button.disabled = !!val.disabled;

                        if (isNewButton) {
                            button.innerHTML = name;
                            listeners[name].elem = button;
                            elem.appendChild(button);
                        };
                    });

                    buttons[0].style.display = (list.length && that.config.showBtn) ?
                        '' : 'none';

                    that._ie6SelectFix();
                    return that;
                },

                /** 显示对话框 */
                show: function() {
                    this.DOM.wrap.show();
                    !arguments[0] && this._lockMaskWrap && this._lockMaskWrap
                        .show();
                    return this;
                },

                /** 隐藏对话框 */
                hide: function() {
                    this.DOM.wrap.hide();
                    !arguments[0] && this._lockMaskWrap && this._lockMaskWrap
                        .hide();
                    return this;
                },

                /** 关闭对话框 */
                close: function() {
                    if (this.closed) return this;

                    var that = this,
                        DOM = that.DOM,
                        wrap = DOM.wrap,
                        list = artDialog.list,
                        fn = that.config.close,
                        follow = that.config.follow;

                    that.time();
                    if (typeof fn === 'function' && fn.call(that, window) ===
                        false) {
                        return that;
                    };

                    that.unlock();

                    // 置空内容
                    that._elemBack && that._elemBack();
                    wrap[0].className = wrap[0].style.cssText = '';
                    DOM.title.html('');
                    DOM.content.html('');
                    DOM.buttons.html('');

                    if (artDialog.focus === that) artDialog.focus = null;
                    if (follow) follow.removeAttribute(_expando + 'follow');
                    delete list[that.config.id];
                    that._removeEvent();
                    that.hide(true)._setAbsolute();

                    // 清空除this.DOM之外临时对象，恢复到初始状态，以便使用单例模式
                    for (var i in that) {
                        if (that.hasOwnProperty(i) && i !== 'DOM') delete that[
                            i];
                    };

                    // 移除HTMLElement或重用
                    _box ? wrap.remove() : _box = that;

                    return that;
                },

                /**
                 * 定时关闭
                 * @param	{Number}	单位为秒, 无参数则停止计时器
                 */
                time: function(second) {
                    var that = this,
                        cancel = that.config.cancelVal,
                        timer = that._timer;

                    timer && clearTimeout(timer);

                    if (second) {
                        that._timer = setTimeout(function() {
                            that._click(cancel);
                        }, 1000 * second);
                    };

                    return that;
                },

                /** 设置焦点 */
                focus: function() {
                    try {
                        if (this.config.focus) {
                            var elem = this._focus && this._focus[0] ||
                                this.DOM.close[0];
                            elem && elem.focus();
                        }
                    } catch (e) {}; // IE对不可见元素设置焦点会报错
                    return this;
                },

                /** 置顶对话框 */
                zIndex: function() {
                    var that = this,
                        DOM = that.DOM,
                        wrap = DOM.wrap,
                        top = artDialog.focus,
                        index = artDialog.defaults.zIndex++;

                    // 设置叠加高度
                    wrap.css('zIndex', index);
                    that._lockMask && that._lockMask.css('zIndex', index -
                        1);

                    // 设置最高层的样式
                    top && top.DOM.wrap.removeClass('aui_state_focus');
                    artDialog.focus = that;
                    wrap.addClass('aui_state_focus');

                    return that;
                },

                /** 设置屏锁 */
                lock: function() {
                    if (this._lock) return this;

                    var that = this,
                        index = artDialog.defaults.zIndex - 1,
                        wrap = that.DOM.wrap,
                        config = that.config,
                        docWidth = _$document.width(),
                        docHeight = _$document.height(),
                        lockMaskWrap = that._lockMaskWrap || $(document.body
                            .appendChild(document.createElement('div'))),
                        lockMask = that._lockMask || $(lockMaskWrap[0].appendChild(
                            document.createElement('div'))),
                        domTxt = '(document).documentElement',
                        sizeCss = _isMobile ? 'width:' + docWidth +
                        'px;height:' + docHeight + 'px' :
                        'width:100%;height:100%',
                        ie6Css = _isIE6 ?
                        'position:absolute;left:expression(' + domTxt +
                        '.scrollLeft);top:expression(' + domTxt +
                        '.scrollTop);width:expression(' + domTxt +
                        '.clientWidth);height:expression(' + domTxt +
                        '.clientHeight)' : '';

                    that.zIndex();
                    wrap.addClass('aui_state_lock');

                    lockMaskWrap[0].style.cssText = sizeCss +
                        ';position:fixed;z-index:' + index +
                        ';top:0;left:0;overflow:hidden;' + ie6Css;
                    lockMask[0].style.cssText = 'height:100%;background:' +
                        config.background +
                        ';filter:alpha(opacity=0);opacity:0';


                    // 让IE6锁屏遮罩能够盖住下拉控件
                    if (_isIE6) lockMask.html(
                        '<iframe src="about:blank" style="width:100%;height:100%;position:absolute;' +
                        'top:0;left:0;z-index:-1;filter:alpha(opacity=0)"></iframe>'
                    );

                    lockMask.stop();
                    lockMask.bind('click', function() {
                        that._reset();
                    }).bind('dblclick', function() {
                        //that._click(that.config.cancelVal);
                    });

                    if (config.duration === 0) {
                        lockMask.css({
                            opacity: config.opacity
                        });
                    } else {
                        lockMask.animate({
                            opacity: config.opacity
                        }, config.duration);
                    };

                    that._lockMaskWrap = lockMaskWrap;
                    that._lockMask = lockMask;

                    that._lock = true;
                    return that;
                },

                /** 解开屏锁 */
                unlock: function() {
                    var that = this,
                        lockMaskWrap = that._lockMaskWrap,
                        lockMask = that._lockMask;

                    if (!that._lock) return that;
                    var style = lockMaskWrap[0].style;
                    var un = function() {
                        if (_isIE6) {
                            style.removeExpression('width');
                            style.removeExpression('height');
                            style.removeExpression('left');
                            style.removeExpression('top');
                        };
                        style.cssText = 'display:none';

                        _box && lockMaskWrap.remove();
                    };

                    lockMask.stop().unbind();
                    that.DOM.wrap.removeClass('aui_state_lock');
                    if (!that.config.duration) { // 取消动画，快速关闭
                        un();
                    } else {
                        lockMask.animate({
                            opacity: 0
                        }, that.config.duration, un);
                    };

                    that._lock = false;
                    return that;
                },

                // 获取元素
                _getDOM: function() {
                    var wrap = document.createElement('div'),
                        body = document.body;
                    wrap.style.cssText = 'position:absolute;left:0;top:0';
                    wrap.innerHTML = artDialog._templates;
                    body.insertBefore(wrap, body.firstChild);

                    var name, i = 0,
                        DOM = {
                            wrap: $(wrap)
                        },
                        els = wrap.getElementsByTagName('*'),
                        elsLen = els.length;

                    for (; i < elsLen; i++) {
                        name = els[i].className.split('aui_')[1];
                        if (name) DOM[name] = $(els[i]);
                    };

                    return DOM;
                },

                // px与%单位转换成数值 (百分比单位按照最大值换算)
                // 其他的单位返回原值
                _toNumber: function(thisValue, maxValue) {
                    if (!thisValue && thisValue !== 0 || typeof thisValue ===
                        'number') {
                        return thisValue;
                    };

                    var last = thisValue.length - 1;
                    if (thisValue.lastIndexOf('px') === last) {
                        thisValue = parseInt(thisValue);
                    } else if (thisValue.lastIndexOf('%') === last) {
                        thisValue = parseInt(maxValue * thisValue.split('%')[
                            0] / 100);
                    };

                    return thisValue;
                },

                // 让IE6 CSS支持PNG背景
                _ie6PngFix: _isIE6 ? function() {
                    var i = 0,
                        elem, png, pngPath, runtimeStyle,
                        path = artDialog.defaults.path + '/',
                        list = this.DOM.wrap[0].getElementsByTagName('*');

                    for (; i < list.length; i++) {
                        elem = list[i];
                        png = elem.currentStyle['png'];
                        if (png) {
                            pngPath = path + png;
                            runtimeStyle = elem.runtimeStyle;
                            runtimeStyle.backgroundImage = 'none';
                            runtimeStyle.filter =
                                "progid:DXImageTransform.Microsoft." +
                                "AlphaImageLoader(src='" + pngPath +
                                "',sizingMethod='crop')";
                        };
                    };
                } : $.noop,

                // 强制覆盖IE6下拉控件
                _ie6SelectFix: _isIE6 ? function() {
                    var $wrap = this.DOM.wrap,
                        wrap = $wrap[0],
                        expando = _expando + 'iframeMask',
                        iframe = $wrap[expando],
                        width = wrap.offsetWidth,
                        height = wrap.offsetHeight;

                    width = width + 'px';
                    height = height + 'px';
                    if (iframe) {
                        iframe.style.width = width;
                        iframe.style.height = height;
                    } else {
                        iframe = wrap.appendChild(document.createElement(
                            'iframe'));
                        $wrap[expando] = iframe;
                        iframe.src = 'about:blank';
                        iframe.style.cssText =
                            'position:absolute;z-index:-1;left:0;top:0;' +
                            'filter:alpha(opacity=0);width:' + width +
                            ';height:' + height;
                    };
                } : $.noop,

                // 解析HTML片段中自定义类型脚本，其this指向artDialog内部
                // <script type="text/dialog">/* [code] */</script>
                _runScript: function(elem) {
                    var fun, i = 0,
                        n = 0,
                        tags = elem.getElementsByTagName('script'),
                        length = tags.length,
                        script = [];

                    for (; i < length; i++) {
                        if (tags[i].type === 'text/dialog') {
                            script[n] = tags[i].innerHTML;
                            n++;
                        };
                    };

                    if (script.length) {
                        script = script.join('');
                        fun = new Function(script);
                        fun.call(this);
                    };
                },

                // 自动切换定位类型
                _autoPositionType: function() {
                    this[this.config.fixed ? '_setFixed' : '_setAbsolute'](); /////////////
                },


                // 设置静止定位
                // IE6 Fixed @see: http://www.planeart.cn/?p=877
                _setFixed: (function() {
                    _isIE6 && $(function() {
                        var bg = 'backgroundAttachment';
                        if (_$html.css(bg) !== 'fixed' && $('body')
                            .css(bg) !== 'fixed') {
                            _$html.css({
                                zoom: 1, // 避免偶尔出现body背景图片异常的情况
                                backgroundImage: 'url(about:blank)',
                                backgroundAttachment: 'fixed'
                            });
                        };
                    });

                    return function() {
                        var $elem = this.DOM.wrap,
                            style = $elem[0].style;

                        if (_isIE6) {
                            var left = parseInt($elem.css('left')),
                                top = parseInt($elem.css('top')),
                                sLeft = _$document.scrollLeft(),
                                sTop = _$document.scrollTop(),
                                txt = '(document.documentElement)';

                            this._setAbsolute();
                            style.setExpression('left', 'eval(' +
                                txt + '.scrollLeft + ' + (left -
                                    sLeft) + ') + "px"');
                            style.setExpression('top', 'eval(' +
                                txt + '.scrollTop + ' + (top - sTop) +
                                ') + "px"');
                        } else {
                            style.position = 'fixed';
                        };
                    };
                }()),

                // 设置绝对定位
                _setAbsolute: function() {
                    var style = this.DOM.wrap[0].style;

                    if (_isIE6) {
                        style.removeExpression('left');
                        style.removeExpression('top');
                    };

                    style.position = 'absolute';
                },

                // 按钮回调函数触发
                _click: function(name) {
                    var that = this,
                        fn = that._listeners[name] && that._listeners[name]
                        .callback;
                    return typeof fn !== 'function' || fn.call(that, window) !==
                        false ?
                        that.close() : that;
                },

                // 重置位置与尺寸
                _reset: function(test) {
                    var newSize,
                        that = this,
                        oldSize = that._winSize || _$window.width() *
                        _$window.height(),
                        elem = that._follow,
                        width = that._width,
                        height = that._height,
                        left = that._left,
                        top = that._top;

                    if (test) {
                        // IE6~7 window.onresize bug
                        newSize = that._winSize = _$window.width() *
                            _$window.height();
                        if (oldSize === newSize) return;
                    };

                    if (width || height) that.size(width, height);

                    if (elem) {
                        that.follow(elem);
                    } else if (left || top) {
                        that.position(left, top);
                    };
                },

                // 事件代理
                _addEvent: function() {
                    var resizeTimer,
                        that = this,
                        config = that.config,
                        isIE = 'CollectGarbage' in window,
                        DOM = that.DOM;

                    // 窗口调节事件
                    that._winResize = function() {
                        resizeTimer && clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function() {
                            that._reset(isIE);
                        }, 40);
                    };
                    _$window.bind('resize', that._winResize);

                    // 监听点击
                    DOM.wrap
                        .bind('click', function(event) {
                            var target = event.target,
                                callbackID;

                            if (target.disabled) return false; // IE BUG

                            if (target === DOM.close[0]) {
                                that._click(config.cancelVal);
                                return false;
                            } else {
                                callbackID = target[_expando +
                                    'callback'];
                                callbackID && that._click(callbackID);
                            };

                            that._ie6SelectFix();
                        })
                        .bind('mousedown', function() {
                            that.zIndex();
                        });
                },

                // 卸载事件代理
                _removeEvent: function() {
                    var that = this,
                        DOM = that.DOM;

                    DOM.wrap.unbind();
                    _$window.unbind('resize', that._winResize);
                }

            };

            artDialog.fn._init.prototype = artDialog.fn;
            $.fn.dialog = $.fn.artDialog = function() {
                var config = arguments;
                this[this.live ? 'live' : 'bind']('click', function() {
                    artDialog.apply(this, config);
                    return false;
                });
                return this;
            };



            /** 最顶层的对话框API */
            artDialog.focus = null;


            /** 获取某对话框API */
            artDialog.get = function(id) {
                return id === undefined ? artDialog.list : artDialog.list[
                    id];
            };

            artDialog.list = {};



            // 全局快捷键
            _$document.bind('keydown', function(event) {
                var target = event.target,
                    nodeName = target.nodeName,
                    rinput = /^INPUT|TEXTAREA$/,
                    api = artDialog.focus,
                    keyCode = event.keyCode;

                if (!api || !api.config.esc || rinput.test(nodeName))
                    return;

                keyCode === 27 && api._click(api.config.cancelVal);
            });


            /*
// 获取artDialog路径
_path = window['_artDialog_path'] || (function (script, i, me) {
	for (i in script) {
		// 如果通过第三方脚本加载器加载本文件，请保证文件名含有"artDialog"字符
		if (script[i].src && script[i].src.indexOf('artDialog') !== -1) me = script[i];
	};
	
	_thisScript = me || script[script.length - 1];
	me = _thisScript.src.replace(/\\/g, '/');
	return me.lastIndexOf('/') < 0 ? '.' : me.substring(0, me.lastIndexOf('/'));
}(document.getElementsByTagName('script')));



// 无阻塞载入CSS (如"artDialog.js?skin=aero")
_skin = _thisScript.src.split('skin=')[1];
if (_skin) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = _path + '/skins/' + _skin + '.css?' + artDialog.fn.version;
	_thisScript.parentNode.insertBefore(link, _thisScript);
};
*/


            // 触发浏览器预先缓存背景图片
            _$window.bind('load', function() {
                setTimeout(function() {
                    if (_count) return;
                    artDialog({
                        left: '-9999em',
                        time: 9,
                        fixed: false,
                        lock: false,
                        focus: false
                    });
                }, 150);
            });



            // 开启IE6 CSS背景图片缓存
            try {
                document.execCommand('BackgroundImageCache', false, true);
            } catch (e) {};




            // 使用uglifyjs压缩能够预先处理"+"号合并字符串
            // uglifyjs: http://marijnhaverbeke.nl/uglifyjs
            artDialog._templates =
                '<div class="aui_outer">' + '<table class="aui_border">' +
                '<tbody>' + '<tr>' + '<td class="aui_nw"></td>' +
                '<td class="aui_n"></td>' + '<td class="aui_ne"></td>' +
                '</tr>' + '<tr>' + '<td class="aui_w"></td>' +
                '<td class="aui_c">' + '<div class="aui_inner">' +
                '<table class="aui_dialog">' + '<tbody>' + '<tr>' +
                '<td colspan="2" class="aui_header">' +
                '<div class="aui_titleBar">' +
                '<div class="aui_title"></div>' +
                '<a class="aui_close" href="javascript:/*artDialog*/;">' +
                '\xd7' + '</a>' + '</div>' + '</td>' + '</tr>' + '<tr>' +
                '<td class="aui_icon">' + '<div class="aui_iconBg"></div>' +
                '</td>' + '<td class="aui_main">' +
                '<div class="aui_content"></div>' + '</td>' + '</tr>' +
                '<tr>' + '<td colspan="2" class="aui_footer">' +
                '<div class="aui_buttons"></div>' + '</td>' + '</tr>' +
                '</tbody>' + '</table>' + '</div>' + '</td>' +
                '<td class="aui_e"></td>' + '</tr>' + '<tr>' +
                '<td class="aui_sw"></td>' + '<td class="aui_s"></td>' +
                '<td class="aui_se"></td>' + '</tr>' + '</tbody>' +
                '</table>' + '</div>';



            /**
             * 默认配置
             */
            artDialog.defaults = {
                // 消息内容
                content: '<div class="aui_loading"><span>loading..</span></div>',
                title: '\u6d88\u606f', // 标题. 默认'消息'
                button: null, // 自定义按钮
                ok: null, // 确定按钮回调函数
                cancel: null, // 取消按钮回调函数
                init: null, // 对话框初始化后执行的函数
                close: null, // 对话框关闭前执行的函数
                okVal: '\u786E\u5B9A', // 确定按钮文本. 默认'确定'
                cancelVal: '\u53D6\u6D88', // 取消按钮文本. 默认'取消'
                width: 'auto', // 内容宽度
                height: 'auto', // 内容高度
                minWidth: 96, // 最小宽度限制
                minHeight: 32, // 最小高度限制
                padding: '20px 25px', // 内容与边界填充距离
                skin: '', // 皮肤名(预留接口,尚未实现)
                icon: null, // 消息图标名称
                time: null, // 自动关闭时间
                esc: true, // 是否支持Esc键关闭
                focus: true, // 是否支持对话框按钮自动聚焦
                show: true, // 初始化后是否显示对话框
                follow: null, // 跟随某元素(即让对话框在元素附近弹出)
                path: '', // artDialog路径
                lock: true, // 是否锁屏
                background: '#000', // 遮罩颜色
                opacity: .5, // 遮罩透明度
                duration: 300, // 遮罩透明度渐变动画速度
                fixed: false, // 是否静止定位
                left: '50%', // X轴坐标
                top: '38.2%', // Y轴坐标
                zIndex: 1997, // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
                resize: true, // 是否允许用户调节尺寸
                drag: true, // 是否允许用户拖动位置
                showBtn: true
            };

            window.artDialog = $.dialog = $.artDialog = artDialog;
            //}(this.art || this.jQuery && (this.art = jQuery), this));

            module.exports = artDialog;



        }, {}
    ],
    9: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);

            //------------------------------------------------
            // 对话框模块-拖拽支持（可选外置模块）
            //------------------------------------------------
            //;(function ($) {

            var _dragEvent, _use,
                _$window = $(window),
                _$document = $(document),
                _elem = document.documentElement,
                _isIE6 = !('minWidth' in _elem.style),
                _isLosecapture = 'onlosecapture' in _elem,
                _isSetCapture = 'setCapture' in _elem;

            // 拖拽事件
            $.dialog.dragEvent = function() {
                var that = this,
                    proxy = function(name) {
                        var fn = that[name];
                        that[name] = function() {
                            return fn.apply(that, arguments);
                        };
                    };

                proxy('start');
                proxy('move');
                proxy('end');
            };

            $.dialog.dragEvent.prototype = {

                // 开始拖拽
                onstart: $.noop,
                start: function(event) {
                    _$document
                        .bind('mousemove', this.move)
                        .bind('mouseup', this.end);

                    this._sClientX = event.clientX;
                    this._sClientY = event.clientY;
                    this.onstart(event.clientX, event.clientY);

                    return false;
                },

                // 正在拖拽
                onmove: $.noop,
                move: function(event) {
                    this._mClientX = event.clientX;
                    this._mClientY = event.clientY;
                    this.onmove(
                        event.clientX - this._sClientX,
                        event.clientY - this._sClientY
                    );

                    return false;
                },

                // 结束拖拽
                onend: $.noop,
                end: function(event) {
                    _$document
                        .unbind('mousemove', this.move)
                        .unbind('mouseup', this.end);

                    this.onend(event.clientX, event.clientY);
                    return false;
                }

            };

            _use = function(event) {
                var limit, startWidth, startHeight, startLeft, startTop,
                    isResize,
                    api = $.dialog.focus,
                    //config = api.config,
                    DOM = api.DOM,
                    wrap = DOM.wrap,
                    title = DOM.title,
                    main = DOM.main;

                // 清除文本选择
                var clsSelect = 'getSelection' in window ? function() {
                    window.getSelection().removeAllRanges();
                } : function() {
                    try {
                        document.selection.empty();
                    } catch (e) {};
                };

                // 对话框准备拖动
                _dragEvent.onstart = function(x, y) {
                    if (isResize) {
                        startWidth = main[0].offsetWidth;
                        startHeight = main[0].offsetHeight;
                    } else {
                        startLeft = wrap[0].offsetLeft;
                        startTop = wrap[0].offsetTop;
                    };

                    _$document.bind('dblclick', _dragEvent.end);
                    !_isIE6 && _isLosecapture ?
                        title.bind('losecapture', _dragEvent.end) :
                        _$window.bind('blur', _dragEvent.end);
                    _isSetCapture && title[0].setCapture();

                    wrap.addClass('aui_state_drag');
                    api.focus();
                };

                // 对话框拖动进行中
                _dragEvent.onmove = function(x, y) {
                    if (isResize) {
                        var wrapStyle = wrap[0].style,
                            style = main[0].style,
                            width = x + startWidth,
                            height = y + startHeight;

                        wrapStyle.width = 'auto';
                        style.width = Math.max(0, width) + 'px';
                        wrapStyle.width = wrap[0].offsetWidth + 'px';

                        style.height = Math.max(0, height) + 'px';

                    } else {
                        var style = wrap[0].style,
                            left = Math.max(limit.minX, Math.min(limit.maxX,
                                x + startLeft)),
                            top = Math.max(limit.minY, Math.min(limit.maxY,
                                y + startTop));

                        style.left = left + 'px';
                        style.top = top + 'px';
                    };

                    clsSelect();
                    api._ie6SelectFix();
                };

                // 对话框拖动结束
                _dragEvent.onend = function(x, y) {
                    _$document.unbind('dblclick', _dragEvent.end);
                    !_isIE6 && _isLosecapture ?
                        title.unbind('losecapture', _dragEvent.end) :
                        _$window.unbind('blur', _dragEvent.end);
                    _isSetCapture && title[0].releaseCapture();

                    _isIE6 && !api.closed && api._autoPositionType();

                    wrap.removeClass('aui_state_drag');
                };

                isResize = event.target === DOM.se[0] ? true : false;
                limit = (function() {
                    var maxX, maxY,
                        wrap = api.DOM.wrap[0],
                        fixed = wrap.style.position === 'fixed',
                        ow = wrap.offsetWidth,
                        oh = wrap.offsetHeight,
                        ww = _$window.width(),
                        wh = _$window.height(),
                        dl = fixed ? 0 : _$document.scrollLeft(),
                        dt = fixed ? 0 : _$document.scrollTop(),

                        // 坐标最大值限制
                        maxX = ww - ow + dl;
                    maxY = wh - oh + dt;

                    return {
                        minX: dl,
                        minY: dt,
                        maxX: maxX,
                        maxY: maxY
                    };
                })();

                _dragEvent.start(event);
            };

            // 代理 mousedown 事件触发对话框拖动
            _$document.bind('mousedown', function(event) {
                var api = $.dialog.focus;
                if (!api) return;

                var target = event.target,
                    config = api.config,
                    DOM = api.DOM;

                if (config.drag !== false && target === DOM.title[0] ||
                    config.resize !== false && target === DOM.se[0]) {
                    _dragEvent = _dragEvent || new $.dialog.dragEvent();
                    _use(event);
                    return false; // 防止firefox与chrome滚屏
                };
            });

            //})(this.art || this.jQuery && (this.art = jQuery));

            module.exports = _dragEvent;
        }, {}
    ],
    10: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);

            require('./core');
            require('./flyui');
            require('./ui.cookie');
            require('./ui.dateformat');
            require('./ui.json');
            require('./ui.template');
            require('./ui.validate');
            require('./ui.widget');
            require('./underscore');
            require('./addressbox');
            require('./button');
            require('./checkbox');
            require('./combobox');
            require('./dialog');
            require('./drag');
            require('./iframeTool');
            require('./form.element');
            require('./form');
            require('./grid');
            require('./mask');
            require('./pager');
            require('./placeholder');
            require('./radio');
            require('./suggestbox');
            require('./textbox');
            require('./idcard');
            require('./datepicker');
            require('./textarea');
            require('./daterange');
            require('./textrange');
            require('./tip');
            require('./tree');

            module.exports = $.FUI;

        }, {
            "./addressbox": 1,
            "./button": 2,
            "./checkbox": 3,
            "./combobox": 4,
            "./core": 5,
            "./datepicker": 6,
            "./daterange": 7,
            "./dialog": 8,
            "./drag": 9,
            "./flyui": 10,
            "./form": 12,
            "./form.element": 11,
            "./grid": 13,
            "./idcard": 14,
            "./iframeTool": 15,
            "./mask": 16,
            "./pager": 17,
            "./placeholder": 18,
            "./radio": 19,
            "./suggestbox": 20,
            "./textarea": 21,
            "./textbox": 22,
            "./textrange": 23,
            "./tip": 24,
            "./tree": 25,
            "./ui.cookie": 26,
            "./ui.dateformat": 27,
            "./ui.json": 28,
            "./ui.template": 29,
            "./ui.validate": 30,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    11: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');


            //标题模板
            var titleTpl =
                '<div class="label" title="<%= title %>"><% if (required) { %><i>*</i><% } %><%= title %></div>';

            UI.widget('fly.formElement', {
                options: {
                    required: false,
                    float: 'left',
                    type: 'text'
                },

                _create: function() {

                    this.element.addClass('fly-form-element').empty()
                        .append(_.template(titleTpl)(this.options));
                    this.control = $('<div>').addClass('control')
                        .appendTo(this.element);

                    //渲染不同的控件
                    if (this.options.type != 'text')
                        $.fn[this.options.type].call(this.control, this
                            .options);
                    else
                        this.control.textbox(this.options);

                    this._setOptions(this.options);
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    switch (key) {
                        case 'float':
                            this.element.css(key, value);
                            break;
                        case 'labelWidth':
                            this.element.children('.label').css({
                                "width": value
                            });
                            this.element.children('.control').css({
                                "marginLeft": value + 20
                            });
                            break;
                        case 'width':
                            if (value.indexOf('px') > 0)
                                this.element.css(key, value);
                            else if (value.indexOf('/') > 0)
                                this.element.css(key, (value.split('/')[
                                        0] / value.split('/')[1]) * 100 +
                                    '%');
                            else if (value == 'block' || value == '1')
                                this.element.css({
                                    'float': 'none',
                                    'width': 'auto'
                                });
                            else
                                this.element.css(key, value);
                            break;
                    }
                },

                refresh: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-form-element]', context).each(function() {
                    var opts = $(this).data('flyOptions');
                    if (opts == 'this.text') opts = $(this).text();
                    $(this).formElement(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.formElement;

        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    12: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');

            UI.widget('fly.form', {

                options: {},

                _create: function() {
                    if (this.element.is('form'))
                        this.element.addClass('fly-form');
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },

                getData: function(params, isMind) {

                    var $form = this.element,
                        $items = $form.find(
                            'input[name], textarea[name]'),
                        names = [],
                        data = {},
                        params = params || {},
                        model = params.model,
                        valid = params.valid;

                    //获取所有name
                    names = $items.map(function() {
                        return $(this).attr('name');
                    }).get();

                    //去重
                    names = _.uniq(names);

                    //序列化及校验
                    for (var i = 0, l = names.length; i < l; i++) {
                        var $item = $items.filter('[name="' + names[i] +
                                '"]'),
                            name = $item.attr('name'),
                            value = $.trim($item.val());

                        //has model
                        if (model && !model[name]) continue;

                        //has valid
                        if (valid && valid[name]) {
                            if (!UI.validate.isPass($item, valid[name],
                                isMind)) {
                                //验证不通过，跳出
                                return null;
                            }
                        }

                        if ($item.is(':checkbox') || $item.is(':radio')) {
                            data[name] = $item.filter(':checked').map(
                                function() {
                                    return $(this).val();
                                }).get();
                        } else {
                            data[name] = value;
                        }

                        /*
			if($item.is(':checkbox')){
				if(!$item.is(':checked')) continue;
				if(typeof(data[name]) != 'undefined'){
					if(typeof(data[name]) != 'object'){
						data[name] = [data[name], value];
					}else{
						data[name].push(value);
					}
				}else{
					data[name] = [value];
				}
			}else if($item.is(':radio')){
				if(!$item.is(':checked')) continue;
				data[name] = value;
			}else{
				data[name] = value;
			}
            */
                    }

                    return data;
                },

                setData: function(data, params) {
                    var self = this,
                        $form = self.element,
                        params = params || {},
                        model = params.model || {},
                        valid = params.valid || {};
                    for (var item in data) {
                        if (data.hasOwnProperty(item)) {

                            //暂时去掉
                            //if(model && !model[item]) continue;

                            var $control = $form.find('[name="' + item +
                                    '"]'),
                                control = self.getControl(item),
                                controlValid = valid[item],
                                type = $control.attr('type'),
                                val = data[item];
                            if (type == 'radio' || $control.is(
                                'checkbox')) {
                                $control.filter('[value="' + val + '"]')
                                    .attr('checked', true);
                            } else if (type == 'checkbox') {
                                $control.each(function() {
                                    if ($(self).val() == val) $(
                                        self).attr('checked',
                                        true);
                                });
                            } else {
                                $control.val(val).trigger('setvalue');
                            }
                        }
                    }
                },

                setValid: function(valid) {

                    var $form = this.element,
                        $items = $form.find(
                            ':input[name], textarea[name]'),
                        valid = valid || {};

                    for (var i = 0, l = $items.length; i < l; i++) {
                        var name = $items.eq(i).attr('name'),
                            controlValid = valid[name];

                        if (!controlValid || controlValid.validNow ===
                            false) continue;

                        var $control = $items.eq(i).parentsUntil(self.element,
                            '.control').first();
                        if ($control.hasClass('fly-textbox')) {
                            $control.textbox({
                                valid: controlValid
                            });
                        } else if ($control.hasClass('fly-combobox')) {
                            $control.combobox({
                                valid: controlValid
                            });
                        }
                    }

                },

                setReadOnly: function() {
                    this.element.find('input').attr('disabled', true).addClass(
                        'disabled');
                    this.element.find('textarea').attr('disabled', true)
                        .addClass('disabled');
                    //TODO 先这么狗血一下
                    this.element.find('.fly-combobox-arrow').unbind();
                    this.element.find('.read').unbind();
                },

                getControl: function(name) {
                    var self = this;
                    return self.element.find('[name="' + name + '"]').parentsUntil(
                        self.element, '.control').first();
                },

                getWidget: function(name) {

                },

                refresh: function() {

                },

                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-form]', context).each(function() {
                    var opts = $(this).data('flyOptions');
                    if (opts == 'this.text') opts = $(this).text();
                    $(this).form(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.form;

        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    13: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.grid', {
                options: {
                    /*
                     * 两种形式
                     * 1. 数据对象 {total:'',data:[]}  静态数据
                     * 2. URL 对应要设置 params
                     * */
                    data: '',
                    /* 
                     * 默认是必须包含pageIndex和pageSize的
                     *
                     **/
                    params: {
                        currentPageNo: 1,
                        pageSize: 10
                    },
                    columns: [],
                    contentId: '', //表格内容的ID 用于包含rowTemplate  这个属性与 colums互斥！！！！
                    rowTemplateId: '', // 模板的页面ID 或者 模板的name
                    formId: '',
                    /*
            <div id="flygridid">
                <table>
                    <thead>
                        <!-- 列头 -->
                        <tr><th><div></div></th></tr>
                    </thead>

                    <tbody id="">
                        <!-- 内容，根据rowTempl来填充 -->
                    </tbody>
                </table>
             </div>
         */
                    /*是否渲染翻页控件 false*/
                    hasPage: true, //true / false
                    isShowCheckBox: false,
                    emptyText: '',

                    onSelect: null,
                    onAjaxError: null,
                    onAjaxbeforeSend: null,
                    onAjaxSuccess: null,
                    onAfterRender: null,

                    errorTip: '数据请求失败！'
                },
                _$layout: null,
                _$header: null,
                _$body: null,
                _$colWidth: null,
                _$empty: null,
                _$pager: null,
                _dataTotal: 0,
                _data: [],
                _create: function() {
                    var _self = this,
                        $layout = null,
                        $header = null,
                        $body = null,
                        $pager = null,
                        $empty = null,
                        $that = _self.element;

                    if (_self.options.contentId && _self.options.contentId !=
                        '') {
                        $layout = $that;
                        $body = $layout.find('.fly-table-body');
                    } else {
                        $layout = $that.html(_self._tmpl);
                        $body = $layout.find('.fly-table-body');
                    }

                    _self._$header = $layout.find('.fly-table-header');;
                    _self._$body = $body;
                    $empty = $layout.find('.fly-grid-empty');
                    $pager = $layout.find('.fly-grid-pager');
                    if (!$empty.length) {
                        $empty = $('<div class="fly-grid-empty"></div>')
                            .text(_self.options.emptyText);
                        $empty.appendTo($layout);
                    }

                    if (_self.options.hasPage && $pager.length == 0) {
                        $pager = $('<div class="fly-grid-pager"></div>');
                        $pager.appendTo($layout);
                    }

                    _self._$pager = $pager;
                    _self._$empty = $empty;
                },

                _init: function() {
                    var _self = this,
                        _$trs = _self._$body.empty(); //$('<tbody>');

                    _self._dataPrepare();

                    // 渲染表头信息
                    if (_self.options.contentId && _self.options.contentId !=
                        '' && _self.options.rowTemplateId && _self.options
                        .rowTemplateId != '') {
                        /*似乎没什么要准备的*/
                        _self._$header.find('tr th:last').addClass(
                            'fly-table-tr-last');
                    } else {
                        var _$header = $('<tr>').append(_self._addHeader());
                        _$header.find('th:last').addClass(
                            'fly-table-tr-last');
                        _self._$header.html(_self._$colWidth);
                        _self._$header.eq(0).append(_$header);
                    }
                    _self._renderPager();
                    _self._bindEvent();
                    //只加载一次 
                    /*是否渲染全选按钮*/
                    if (_self.options.isShowCheckBox || $.grep(_self.options
                        .columns, function(item, i) {
                            return item.isShowCheckBox == true;
                        }).length) {
                        _self._checkAll($('.checked-all', _self.element));
                    }
                    //数据准备
                    _self._setData(true);
                },
                _render: function() {
                    var _self = this,
                        _$trs = _self._$body.empty(); //$('<tbody>');

                    // 提供行模板的情况
                    // 默认使用 jquery templ 监测有没有jquery tmpl
                    if (_self.options.contentId && _self.options.contentId !=
                        '' && _self.options.rowTemplateId && _self.options
                        .rowTemplateId != '') {
                        if (!$ || !$['tmpl']) {
                            /* 强制刷新 */
                            location.reload();
                            /*$.fly.tip({
                    type:'error',
                    text:'还未引用jquery tmpl模板引擎！'
                });*/
                            return false;
                        }
                        //$.tmpl('navTemplate', data.items).appendTo($nav);
                        for (var i = 0, l = _self._data.length; i < l; i++) {
                            _self._data[i]['$index'] = (_self.options.params
                                .currentPageNo - 1) * _self.options.params
                                .pageSize + i;
                        }
                        _$trs.append($(_self.options.rowTemplateId).tmpl(
                            _self._data));
                        _$trs.find('tr').each(function(i, tr) {
                            var _$tr = $(this);
                            _$tr.find('td:last').addClass(
                                'fly-table-tr-last');
                            /*添加奇偶行标识*/
                            if (i % 2 == 0) {
                                _$tr.addClass('fly-table-tr-odd');
                            } else {
                                _$tr.addClass('fly-table-tr-even');
                            }
                        });
                    } else {
                        // 没有提供 行模板的情况
                        for (var i = 0, len = _self._data.length; i <
                            len; i++) {
                            var _item = _self._data[i],
                                _$tr = $('<tr>').append(_self._addBodyRow(
                                    _item)).data(_item);
                            _$tr.find('td:last').addClass(
                                'fly-table-tr-last');
                            /*添加奇偶行标识*/
                            if (i % 2 == 0) {
                                _$tr.addClass('fly-table-tr-odd');
                            } else {
                                _$tr.addClass('fly-table-tr-even');
                            }
                            _$trs.append(_$tr);
                        }
                    }
                    //清除头部checkbox的勾选
                    if (_self._$header && _self._$header.find('input'))
                        _self._$header.find('input').removeAttr(
                            'checked');

                    //重新渲染分页
                    _self._pagerRefresh();
                    if (_$trs.find('td').length) {
                        _self._$empty.hide();
                        if (_self._$pager && _self.options.hasPage)
                            _self._$pager.data('flyPager').show();
                    } else {
                        _self._$empty.show();
                        if (_self._$pager && _self.options.hasPage)
                            _self._$pager.data('flyPager').hide();
                    }
                    //_self._$body.html(_$trs.html());
                    _self.options.onAfterRender && _self.options.onAfterRender
                        .call(_self);
                },
                /*为数据提填加索引  要根据当前索引和页码*/
                _dataPrepare: function() {
                    var _self = this;
                    for (var i = 0, len = _self._data.length; i < len; i++) {
                        _self._data[i].$index = i + 1 + (_self.options.params
                            .currentPageNo - 1) * _self.options.params.pageSize;
                    }
                },
                _addHeader: function() {
                    var _columns = this.options.columns,
                        _rowTr = '',
                        _self = this,
                        _mainHeader = '',
                        $that = _self.element;

                    $.each(_columns, function(index, item) {
                        var _temTd = '',
                            _width = item.width && item.width != '' ?
                            item.width : 'auto';
                        if (item.isShowCheckBox && item.isShowCheckBox ==
                            true) {
                            _temTd = '<th><div>' + item.header +
                                '</div><input data-target="' +
                                $that.attr('id') +
                                '" class="checked-all" type="checkbox" data-selector="[check$=\'' +
                                item.field + '\']" /></th>';
                        } else {
                            _temTd = '<th title="' + item.header +
                                '"><div>' + item.header +
                                '</div></th>';
                        }
                        /*设置列宽*/
                        if (!_self._$colWidth) {
                            _mainHeader += '<td width="' + _width +
                                '"></td>';
                        }
                        _rowTr += _temTd;
                    });

                    if (!_self._$colWidth) {
                        _self._$colWidth = '<tr>' + _mainHeader +
                            '</tr>';
                    }
                    return _rowTr;
                },
                _addBodyRow: function(rowData) {
                    var _columns = this.options.columns,
                        _rowTr = '',
                        _self = this;
                    $.each(_columns, function(index, item) {
                        var _temTd = '';
                        if (item.format && typeof(item.format) ==
                            'function') {
                            _temTd = '<td><div>' + item.format.call(
                                null, rowData) + '</div></td>';
                        } else if (item.isShowCheckBox && item.isShowCheckBox ==
                            true) {
                            _temTd =
                                '<td><div><input class="grid-check" type="checkbox" value="' +
                                rowData[item.field] + '" check="' +
                                item.field + '"/></div></td>';
                        } else if (item.serial && item.serial ==
                            true) {
                            _temTd = '<td><div>' + rowData['$index'] +
                                '</div></td>';
                        } else {
                            _temTd = '<td title="' + item.header +
                                '"><div>' + rowData[item.field] +
                                '</div></td>';
                        }
                        _rowTr += _temTd;
                    });
                    return _rowTr;
                },
                getRow: function($tr) {
                    return $tr.data();
                },
                setParam: function(params) {
                    var _self = this;
                    _self.options.params = $.extend(_self.options.params,
                        params || {});
                    // 触发_setData
                    _self._setData(false);
                },
                getData: function() {
                    //遍历勾选的行 返回数据
                    var _self = this,
                        _data = [];
                    if (_self._$body.find('tr').length) {
                        _self._$body.find('tr').each(function() {
                            var _$tr = $(this),
                                _$ck = _$tr.find(
                                    '.grid-check:enabled:checkbox');
                            if (_$ck.is(':checked')) {
                                _data.push(_self.getRow(_$tr));
                            }
                        });
                    }
                    return _data;
                },
                _setData: function(isInit) {
                    var _self = this;
                    /*
                     * 获取数据
                     * 1. 静态数据
                     * 2. ajax获取数据
                     */
                    if (typeof(_self.options.data) == 'string') {
                        //异步获取
                        $.ajax({
                            url: _self.options.data,
                            data: _self.options.params,
                            type: "post",
                            dataType: "text",
                            beforeSend: function() {
                                $('body').mask({
                                    content: '正在查询列表...'
                                });
                                _self.options.onAjaxbeforeSend &&
                                    _self.options.onAjaxbeforeSend();
                            },
                            success: function(data) {
                                $('body').mask('remove');
                                var data = UI.utils.toObj(data);

                                //处理list数据为page对象
                                if (data instanceof Array) {
                                    data = {
                                        total: data.length,
                                        rows: data
                                    };
                                }

                                if (typeof data == 'string' || data
                                    .rows == undefined) {
                                    $.fly.tip({
                                        type: 'error',
                                        text: _self.options.errorTip
                                    });
                                } else {
                                    _self._data = data.rows;
                                    _self._dataTotal = data.total;
                                    if (_self.data) _self.data.unshift({});

                                    _self.options.onAjaxSuccess &&
                                        _self.options.onAjaxSuccess(
                                            data);
                                    _self._render();
                                };
                            },
                            error: function() {
                                $('body').mask('remove');
                                $.fly.tip({
                                    type: 'error',
                                    text: _self.options.errorTip
                                });
                                _self.options.onAjaxError && _self.options
                                    .onAjaxError();
                            }
                        });
                    } else if (typeof(_self.options.data) == 'object' &&
                        _self.options.data.total != undefined && _self.options
                        .data.data != undefined) {
                        _self._data = _self.options.data.data;
                        _self._dataTotal = _self.options.data.total;
                        _self._render();
                    }
                },
                _renderPager: function() {
                    var _self = this;
                    if (_self.options.hasPage) {
                        /*TODO pager 对象返回值 需要验证*/
                        _self._$pager.pager({
                            total: _self._dataTotal,
                            pageSize: _self.options.params.pageSize,
                            pageIndex: _self.options.params.currentPageNo,
                            pageStyle: 'number',
                            callback: function(pageIndex, pageSize,
                                $pager) {
                                _self.setParam({
                                    currentPageNo: pageIndex,
                                    pageSize: pageSize
                                });
                            }
                        });
                    }
                },
                _pagerRefresh: function() {
                    var _self = this;
                    if (_self.options.hasPage && _self._$pager) {
                        _self._$pager.data('flyPager').refresh({
                            total: _self._dataTotal,
                            pageSize: _self.options.params.pageSize,
                            pageIndex: _self.options.params.currentPageNo
                        });
                    }
                },
                _bindEvent: function() {
                    /*
                     * TODO 根据是否是冻结列渲染不同的事件
                     */
                    this._normalEventBind();
                },
                _forzenEventBind: function() {
                    /*TODO*/
                },
                _normalEventBind: function() {
                    this._$body.on({
                        'mouseenter': function() {
                            $(this).addClass('fly-table-tr-hover');
                        },
                        'mouseleave': function() {
                            $(this).removeClass(
                                'fly-table-tr-hover');
                        }
                    }, 'tr');
                },
                _formSubmit: function() {
                    var _self = this;
                    //序列化JSON
                },
                _checkAll: function($dom) {
                    var _self = this,
                        $selectAll = $dom;
                    var $target = $("#" + $selectAll.data("target")),
                        selector = $selectAll.data("selector");
                    //全选
                    $selectAll.change(function() {
                        if (this.checked) {
                            $target.find("input:enabled:checkbox").filter(
                                selector).attr("checked", "checked");
                        } else {
                            $target.find("input:enabled:checkbox").filter(
                                selector).removeAttr("checked");
                        }
                    });

                    //已选中项目的选择和取消选择
                    $target.on("click", "input:checkbox", function() {
                        $selectAll.data("selectall", true);
                        $target.find("input:enabled:checkbox").filter(
                            selector).each(function() {
                            if (!this.checked) {
                                $selectAll.data("selectall",
                                    false);
                                $selectAll.removeAttr("checked");
                                return false;
                            }
                            _self.options.onSelect && _self.options
                                .onSelect.call(this);
                        });
                        if ($selectAll.data("selectall")) $selectAll
                            .attr("checked", "checked");
                    });
                },
                _tmpl: [
                    '<div class="fly-grid">',
                    '<div class="fly-grid-head">',
                    '<table class="fly-table" cellspacing="0" cellpadding="0">',
                    '<thead class="fly-table-header">',
                    '<!-- table width controll -->',
                    '<!-- table header ctn -->',
                    '</thead>',
                    '</table>',
                    '</div>',
                    '<div class="fly-grid-body">',
                    '<table class="fly-table" cellspacing="0" cellpadding="0">',
                    '<thead class="fly-table-header">',
                    '<!-- table width controll -->',
                    '</thead>',
                    '<tbody class="fly-table-body">',
                    '<!-- table content -->',
                    '</tbody>',
                    '</table>',
                    '</div>',
                    '<div class="fly-grid-empty">暂无数据展示</div>',
                    '<div class="fly-grid-pager">',
                    '<!-- pager -->',
                    '</div>',
                    '</div>'
                ].join('')
            });
            /* TODO */
            UI.ready(function(context) {
                $('[data-fly-grid]', context).each(function() {
                    var $this = $(this);
                    var opts = $this.data('flyOptions');
                    if (opts == 'this.text') {
                        opts = $this.text();
                        $this.text('');
                    }
                    $this.combobox(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.grid;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    14: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.idcard', {
                options: {
                    type: 'idcard',
                    onValid: function() {}
                },

                _create: function() {
                    var self = this;

                    //插入身份证识别控件
                    if (!document.getElementById('idCardOcr'))
                        $('body').append(
                            '<object classid="clsid:090457CB-DF21-41EB-84BB-39AAFC9E271A" ' +
                            'id="idCardOcr" codebase="*.cab#version=1,0,0,1" ' +
                            'width="0" height="0"></object>');

                    this.element.addClass(
                        'fly-textbox fly-textbox-idcard').empty();
                    this.read = $('<span>').addClass('read').text('读取')
                        .appendTo(this.element);
                    this.control = $('<input>')
                        .attr('type', 'text')
                        .attr('name', this.options.name)
                        .val(this.options.value)
                        .appendTo(this.element)
                        .wrap('<em></em>').addClass('text');
                    this.idInfo = {};

                    this.control.blur(function() {
                        self.valid();
                    });

                    this.read.click(function() {
                        self.ocr();
                    });
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },

                refresh: function() {

                },

                update: function() {
                    this.control.val('');

                    if (this.idInfo.no) {
                        this.control.val(this.idInfo.no);
                        this.valid();
                    }
                },

                ocr: function() {
                    var idCardOcr = document.getElementById('idCardOcr');
                    var rec = idCardOcr.IDCardRecognize();
                    var idInfo = {};
                    if (!rec) {
                        alert("识别失败，请重新放置身份证！");
                        return;
                    }

                    idInfo.name = idCardOcr.GetIDCardName();
                    idInfo.sex = idCardOcr.GetIDCardSex();
                    idInfo.nation = idCardOcr.GetIDCardNation();
                    idInfo.born = idCardOcr.GetIDCardBorn();
                    idInfo.addr = idCardOcr.GetIDCardAddr();
                    idInfo.no = idCardOcr.GetIDCardNo();
                    idInfo.police = idCardOcr.GetIDCardPolice();
                    idInfo.active = idCardOcr.GetIDCardActive();

                    this.idInfo = idInfo;
                    this.update();
                },

                valid: function() {
                    var info = this.idInfo.name ? this.idInfo : null;
                    var idnum = this.control.val();

                    //this.options.onValid && this.options.onValid(idnum, info);

                    this.options.onValid.call(this.control, idnum, info);
                },

                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-idcard]', context).each(function() {
                    $(this).idcard(UI.utils.parseOptions($(this).data(
                        'flyOptions')));
                });
            });

            module.exports = UI.button;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    15: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);

            //;(function ($, window, artDialog, undefined) {

            var _topDialog, _proxyDialog, _zIndex,
                _data = '@ARTDIALOG.DATA',
                _open = '@ARTDIALOG.OPEN',
                _opener = '@ARTDIALOG.OPENER',
                _winName = window.name = window.name ||
                '@ARTDIALOG.WINNAME' + +new Date,
                _isIE6 = window.VBArray && !window.XMLHttpRequest;

            $(function() {
                !window.jQuery && document.compatMode === 'BackCompat'
                // 不支持怪异模式，请用主流的XHTML1.0或者HTML5的DOCTYPE申明
                && alert(
                    'artDialog Error: document.compatMode === "BackCompat"'
                );
            });


            /** 获取 $.dialog 可跨级调用的最高层的 window 对象 */
            var _top = $.dialog.top = function() {
                var top = window,
                    test = function(name) {
                        try {
                            var doc = window[name].document; // 跨域|无权限
                            doc.getElementsByTagName; // chrome 本地安全限制
                        } catch (e) {
                            return false;
                        };

                        return window[name].$.dialog
                            // 框架集无法显示第三方元素
                            && doc.getElementsByTagName('frameset').length ===
                            0;
                    };

                if (test('top')) {
                    top = window.top;
                } else if (test('parent')) {
                    top = window.parent;
                };

                return top;
            }();
            $.dialog.parent = _top; // 兼容v4.1之前版本，未来版本将删除此


            _topDialog = _top.$.dialog;


            // 获取顶层页面对话框叠加值
            _zIndex = function() {
                return _topDialog.defaults.zIndex;
            };



            /**
             * 跨框架数据共享接口
             * @see		http://www.planeart.cn/?p=1554
             * @param	{String}	存储的数据名
             * @param	{Any}		将要存储的任意数据(无此项则返回被查询的数据)
             */
            $.dialog.data = function(name, value) {
                var top = $.dialog.top,
                    cache = top[_data] || {};
                top[_data] = cache;

                if (typeof(value) != 'undefined') {
                    //if (value !== undefined) {
                    cache[name] = value;
                } else {
                    return cache[name];
                };
                return cache;
            };


            /**
             * 数据共享删除接口
             * @param	{String}	删除的数据名
             */
            $.dialog.removeData = function(name) {
                var cache = $.dialog.top[_data];
                if (cache && cache[name]) delete cache[name];
            };


            /** 跨框架普通对话框 */
            $.dialog.through = _proxyDialog = function() {
                var api = _topDialog.apply(this, arguments);

                // 缓存从当前 window（可能为iframe）调出所有跨框架对话框，
                // 以便让当前 window 卸载前去关闭这些对话框。
                // 因为iframe注销后也会从内存中删除其创建的对象，这样可以防止回调函数报错
                if (_top !== window) $.dialog.list[api.config.id] = api;
                return api;
            };

            // 框架页面卸载前关闭所有穿越的对话框
            _top !== window && $(window).bind('unload', function() {
                var list = $.dialog.list,
                    config;
                for (var i in list) {
                    if (list[i]) {
                        config = list[i].config;
                        if (config) config.duration = 0; // 取消动画
                        list[i].close();
                        //delete list[i];
                    };
                };
            });


            /**
             * 弹窗 (iframe)
             * @param	{String}	地址
             * @param	{Object}	配置参数. 这里传入的回调函数接收的第1个参数为iframe内部window对象
             * @param	{Boolean}	是否允许缓存. 默认true
             */
            $.dialog.open = function(url, options, cache) {
                options = options || {};

                var api, DOM,
                    $content, $main, iframe, $iframe, $idoc, iwin, ibody,
                    top = $.dialog.top,
                    initCss =
                    'position:absolute;left:-9999em;top:-9999em;border:none 0;background:transparent',
                    loadCss = 'width:100%;height:100%;border:none 0';

                if (cache === false) {
                    var ts = +new Date,
                        ret = url.replace(/([?&])_=[^&]*/, "$1_=" + ts);
                    url = ret + ((ret === url) ? (/\?/.test(url) ? "&" :
                        "?") + "_=" + ts : "");
                };

                var load = function() {
                    var iWidth, iHeight,
                        loading = DOM.content.find('.aui_loading'),
                        aConfig = api.config;

                    $content.addClass('aui_state_full');

                    loading && loading.hide();

                    try {
                        iwin = iframe.contentWindow;
                        $idoc = $(iwin.document);
                        ibody = iwin.document.body;
                    } catch (e) { // 跨域
                        iframe.style.cssText = loadCss;

                        aConfig.follow ? api.follow(aConfig.follow) :
                            api.position(aConfig.left, aConfig.top);

                        options.init && options.init.call(api, iwin,
                            top);
                        options.init = null;
                        return;
                    };

                    // 获取iframe内部尺寸
                    iWidth = aConfig.width === 'auto' ? $idoc.width() +
                        (_isIE6 ? 0 : parseInt($(ibody).css(
                        'marginLeft'))) : aConfig.width;

                    iHeight = aConfig.height === 'auto' ? $idoc.height() :
                        aConfig.height;

                    // 适应iframe尺寸
                    setTimeout(function() {
                        iframe.style.cssText = loadCss;
                    }, 0); // setTimeout: 防止IE6~7对话框样式渲染异常
                    api.size(iWidth, iHeight);

                    // 调整对话框位置
                    aConfig.follow ? api.follow(aConfig.follow) : api.position(
                        aConfig.left, aConfig.top);

                    options.init && options.init.call(api, iwin, top);
                    options.init = null;
                };

                var config = {
                    zIndex: _zIndex(),
                    init: function() {
                        api = this;
                        DOM = api.DOM;
                        $main = DOM.main;
                        $content = DOM.content;

                        iframe = api.iframe = top.document.createElement(
                            'iframe');
                        iframe.src = url;
                        iframe.name = 'Open' + api.config.id;
                        iframe.style.cssText = initCss;
                        iframe.setAttribute('frameborder', 0, 0);
                        iframe.setAttribute('allowTransparency', true);

                        $iframe = $(iframe);
                        api.content().appendChild(iframe);
                        iwin = iframe.contentWindow;

                        try {
                            iwin.name = iframe.name;
                            $.dialog.data(iframe.name + _open, api);
                            $.dialog.data(iframe.name + _opener, window);
                        } catch (e) {};

                        $iframe.bind('load', load);
                    },
                    close: function() {
                        $iframe.css('display', 'none').unbind('load',
                            load);

                        if (options.close && options.close.call(this,
                            iframe.contentWindow, top) === false) {
                            return false;
                        };
                        $content.removeClass('aui_state_full');

                        // 重要！需要重置iframe地址，否则下次出现的对话框在IE6、7无法聚焦input
                        // IE删除iframe后，iframe仍然会留在内存中出现上述问题，置换src是最容易解决的方法
                        $iframe[0].src = 'about:blank';
                        $iframe.remove();

                        try {
                            $.dialog.removeData(iframe.name + _open);
                            $.dialog.removeData(iframe.name + _opener);
                        } catch (e) {};
                    }
                };

                // 回调函数第一个参数指向iframe内部window对象
                if (typeof options.ok === 'function') config.ok = function() {
                    return options.ok.call(api, iframe.contentWindow,
                        top);
                };
                if (typeof options.cancel === 'function') config.cancel =
                    function() {
                        return options.cancel.call(api, iframe.contentWindow,
                            top);
                    };

                delete options.content;

                for (var i in options) {
                    if (config[i] === undefined) config[i] = options[i];
                };

                return _proxyDialog(config);
            };


            /** 引用open方法扩展方法(在open打开的iframe内部私有方法) */
            $.dialog.open.api = $.dialog.data(_winName + _open);


            /** 引用open方法触发来源页面window(在open打开的iframe内部私有方法) */
            $.dialog.opener = $.dialog.data(_winName + _opener) || window;
            $.dialog.open.origin = $.dialog.opener; // 兼容v4.1之前版本，未来版本将删除此

            /** $.dialog.open 打开的iframe页面里关闭对话框快捷方法 */
            $.dialog.close = function() {
                var api = $.dialog.data(_winName + _open);
                api && api.close();
                return false;
            };

            // 点击iframe内容切换叠加高度
            _top != window && $(document).bind('mousedown', function() {
                var api = $.dialog.open.api;
                api && api.zIndex();
            });


            /**
             * Ajax填充内容
             * @param	{String}			地址
             * @param	{Object}			配置参数
             * @param	{Boolean}			是否允许缓存. 默认true
             */
            $.dialog.load = function(url, options, cache) {
                cache = cache || false;
                var opt = options || {};

                var config = {
                    zIndex: _zIndex(),
                    init: function(here) {
                        var api = this,
                            aConfig = api.config;

                        $.ajax({
                            url: url,
                            success: function(content) {
                                api.content(content);
                                opt.init && opt.init.call(api, here);
                            },
                            cache: cache
                        });

                    }
                };

                delete options.content;

                for (var i in opt) {
                    if (config[i] === undefined) config[i] = opt[i];
                };

                return _proxyDialog(config);
            };


            /**
             * 警告
             * @param	{String}	消息内容
             */
            $.dialog.alert = function(content, callback) {
                return _proxyDialog({
                    id: 'Alert',
                    zIndex: _zIndex(),
                    icon: 'warning',
                    fixed: true,
                    lock: true,
                    content: content,
                    ok: true,
                    close: callback
                });
            };


            /**
             * 确认
             * @param	{String}	消息内容
             * @param	{Function}	确定按钮回调函数
             * @param	{Function}	取消按钮回调函数
             */
            $.dialog.confirm = function(content, yes, no) {
                return _proxyDialog({
                    id: 'Confirm',
                    zIndex: _zIndex(),
                    icon: 'question',
                    fixed: true,
                    lock: true,
                    opacity: .1,
                    content: content,
                    ok: function(here) {
                        return yes.call(this, here);
                    },
                    cancel: function(here) {
                        return no && no.call(this, here);
                    }
                });
            };


            /**
             * 提问
             * @param	{String}	提问内容
             * @param	{Function}	回调函数. 接收参数：输入值
             * @param	{String}	默认值
             */
            $.dialog.prompt = function(content, yes, value) {
                value = value || '';
                var input;

                return _proxyDialog({
                    id: 'Prompt',
                    zIndex: _zIndex(),
                    icon: 'question',
                    fixed: true,
                    lock: true,
                    opacity: .1,
                    content: [
                        '<div style="margin-bottom:5px;font-size:12px">',
                        content,
                        '</div>',
                        '<div>',
                        '<input value="',
                        value,
                        '" style="width:18em;padding:6px 4px" />',
                        '</div>'
                    ].join(''),
                    init: function() {
                        input = this.DOM.content.find('input')[0];
                        input.select();
                        input.focus();
                    },
                    ok: function(here) {
                        return yes && yes.call(this, input.value,
                            here);
                    },
                    cancel: true
                });
            };


            /**
             * 短暂提示
             * @param	{String}	提示内容
             * @param	{Number}	显示时间 (默认1.5秒)
             */
            $.dialog.tips = function(content, time) {
                return _proxyDialog({
                        id: 'Tips',
                        zIndex: _zIndex(),
                        title: false,
                        cancel: false,
                        fixed: true,
                        lock: false
                    })
                    .content('<div style="padding: 0 1em;">' + content +
                        '</div>')
                    .time(time || 1.5);
            };


            // 增强$.dialog拖拽体验
            // - 防止鼠标落入iframe导致不流畅
            // - 对超大对话框拖动优化
            $(function() {
                var event = $.dialog.dragEvent;
                if (!event) return;

                var $window = $(window),
                    $document = $(document),
                    positionType = _isIE6 ? 'absolute' : 'fixed',
                    dragEvent = event.prototype,
                    mask = document.createElement('div'),
                    style = mask.style;

                style.cssText = 'display:none;position:' + positionType +
                    ';left:0;top:0;width:100%;height:100%;' +
                    'cursor:move;filter:alpha(opacity=0);opacity:0;background:#FFF';

                document.body.appendChild(mask);
                dragEvent._start = dragEvent.start;
                dragEvent._end = dragEvent.end;

                dragEvent.start = function() {
                    var DOM = $.dialog.focus.DOM,
                        main = DOM.main[0],
                        iframe = DOM.content[0].getElementsByTagName(
                            'iframe')[0];

                    dragEvent._start.apply(this, arguments);
                    style.display = 'block';
                    style.zIndex = $.dialog.defaults.zIndex + 3;

                    if (positionType === 'absolute') {
                        style.width = $window.width() + 'px';
                        style.height = $window.height() + 'px';
                        style.left = $document.scrollLeft() + 'px';
                        style.top = $document.scrollTop() + 'px';
                    };

                    if (iframe && main.offsetWidth * main.offsetHeight >
                        307200) {
                        main.style.visibility = 'hidden';
                    };
                };

                dragEvent.end = function() {
                    var dialog = $.dialog.focus;
                    dragEvent._end.apply(this, arguments);
                    style.display = 'none';
                    if (dialog) dialog.DOM.main[0].style.visibility =
                        'visible';
                };
            });

            //})(this.art || this.jQuery, this, this.$.dialog);

            module.exports = $.dialog;


        }, {}
    ],
    16: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');


            //遮罩模板
            var maskTpl = [
                '<div class="fly-mask">',
                '	<div class="fly-mask-background"><iframe scrolling="no" frameborder="0"></iframe></div>',
                '	<div class="fly-mask-content">',
                '		<div><i></i><em><%= content %></em></div>',
                '	</div>',
                '</div>'
            ].join('');

            UI.widget('fly.mask', {
                defaultElement: 'body',
                options: {
                    content: '正在加载中...'
                },

                _create: function() {
                    this.maskElement = $(_.template(maskTpl)(this.options));
                },

                _init: function() {
                    this.add();
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'effect') {
                        if (value == 'remove') {
                            this.remove();
                        }
                    } else if (key == 'content') {
                        this.maskElement.find('em').html(value);
                    }
                },

                _destroy: function() {},

                //定位
                _position: function() {
                    var width = this.element.outerWidth(),
                        height = this.element.outerHeight(),
                        position = 'absolute',
                        $content = this.maskElement.children(
                            '.fly-mask-content');

                    //对body遮罩时需要100%宽高
                    if (this.element.is('body')) {
                        width = height = '100%';
                        position = 'fixed';
                    }

                    this.maskElement.css({
                        position: position,
                        width: width,
                        height: height
                    });
                    $content.css({
                        marginLeft: 0 - $content.width() / 2,
                        marginTop: 0 - $content.height() / 2
                    });
                },

                add: function() {
                    if (!this.maskElement.data('count')) {
                        this.element.addClass('fly-has-mask');
                        this.maskElement.appendTo(this.element);
                        this._position();
                    }
                    this._add();
                },

                remove: function() {
                    this._remove();
                    if (!this.maskElement.data('count')) {
                        this.element.removeClass('fly-has-mask');
                        this.maskElement.remove();
                    }
                },

                removeAll: function() {
                    this.element.removeClass('fly-has-mask');
                    this.maskElement.remove();
                },

                //计数器+1
                _add: function() {
                    var num = this.maskElement.data('count') || 0;
                    this.maskElement.data('count', num + 1);
                },

                //计数器-1
                _remove: function() {
                    var num = this.maskElement.data('count') || 1;
                    this.maskElement.data('count', num - 1);
                }
            });

            module.exports = UI.mask;

        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    17: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.pager', {
                options: {
                    total: 0,
                    pageSize: 10,
                    pageIndex: 1,
                    numDisplayEntries: 4,
                    numEdgeEntries: 2,
                    linkTo: "#",
                    firstText: '<<',
                    lastText: '>>',
                    prevText: "<",
                    nextText: ">",
                    ellipseText: "...",
                    showFirst: false,
                    showLast: false,
                    prevShowAlways: true,
                    nextShowAlways: true,
                    showInfo: true,
                    showGoto: true,
                    showSizeChoose: false,
                    pageStyle: 'number',
                    /**/
                    callback: function() {
                        return false;
                    }
                },
                // 调用时要特殊考虑
                refresh: function(options) {
                    if (options.total) this.options.total = options.total;
                    if (options.pageSize) this.options.pageSize =
                        options.pageSize;
                    if (options.pageIndex) this._pageIndex = options.pageIndex -
                        1;
                    this._drawLinks();
                },
                _create: function() {
                    var _self = this,
                        opts = _self.options,
                        $layout = null;
                    // Extract pageIndex from options
                    _self._pageIndex = opts.pageIndex - 1;
                    // Create a sane value for maxentries and pageSize
                    opts.total = (!opts.total || opts.total < 0) ? 1 :
                        opts.total;
                    opts.pageSize = (!opts.pageSize || opts.pageSize <
                        0) ? 1 : opts.pageSize;

                    // Store DOM element for easy access from all inner functions
                    _self._$layout = $layout = $(_self._tmpl);
                    _self._$pageMesg = $layout.find('.pager-messg');
                    _self._$pageTurn = $layout.find('.pager-turn');
                    _self._$pageSize = $layout.find('.pager-size');
                    _self._$pageCtn = $layout.find('.pager-ctn');
                    _self._$pageNum = $layout.find('.pager-num');
                    _self._$pageInput = $layout.find('.pager-input');
                    _self._$pageGo = $layout.find('.pager-go');
                    _self._$pageSizeChoose = $layout.find(
                        '.pager-size-choose');
                    _self._$pageTotal = $layout.find('.pager-total');
                    _self._$pageCurrent = $layout.find('.pager-current');
                    _self._$pageFirst = $layout.find(
                        '[data-action="first"]');
                    _self._$pageLast = $layout.find(
                        '[data-action="last"]');
                    _self._$pagePrev = $layout.find(
                        '[data-action="prev"]');
                    _self._$pageNext = $layout.find(
                        '[data-action="next"]');

                    _self._$pageFirst.text(opts.firstText || '首页');
                    _self._$pageLast.text(opts.lastText || '尾页');
                    _self._$pagePrev.text(opts.prevText || '上一页');
                    _self._$pageNext.text(opts.nextText || '下一页');

                },

                _init: function() {
                    var $that = this.element,
                        opts = this.options;

                    if (!opts.showInfo || opts.pageStyle != 'number') {
                        this._$pageMesg.remove();
                    }
                    if (!opts.showGoto) {
                        this._$pageTurn.remove();
                    }
                    if (!opts.showSizeChoose) {
                        this._$pageSize.remove();
                    }

                    if (!opts.showFirst || !opts.showLast) {
                        this._$pageFirst.remove();
                        this._$pageLast.remove();
                    }
                    if (!opts.showSizeChoose) {
                        this._$pageSizeChoose.remove();
                    }
                    this._drawLinks();
                    this.element.empty().append(this._$layout);
                    this._eventBind();
                },
                /*
        对 refresh 做特殊处理
     */
                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'refresh') {
                        typeof(value) == 'function' ? this._refresh(
                            value()) : this._refresh(value);
                    }
                },
                /**
                 * 计算页码大小
                 */
                _numPages: function() {
                    return Math.ceil(this.options.total / this.options.pageSize);
                },
                /**
                 * Calculate start and end point of pagination links depending on
                 * pageIndex and numDisplayEntries.
                 * @return {Array}
                 */
                _getInterval: function() {
                    var neHalf = Math.ceil(this.options.numDisplayEntries /
                        2);
                    var np = this._numPages();
                    var upperLimit = np - this.options.numDisplayEntries;
                    var start = this._pageIndex > neHalf ? Math.max(
                        Math.min(this._pageIndex - neHalf,
                            upperLimit), 0) : 0;
                    var end = this._pageIndex > neHalf ? Math.min(this._pageIndex +
                        neHalf, np) : Math.min(this.options.numDisplayEntries,
                        np);
                    return [start, end];
                },
                /**
                 * This is the event handling function for the pagination links.
                 * @param {int} page_id The new page number
                 */
                _pageSelected: function(index, evt, size, force) {
                    force = force == undefined ? false : force;
                    size = size == undefined ? this.options.pageSize :
                        size;
                    if (index != this._pageIndex || force) {
                        //pageIndex = page_id;
                        //drawLinks();
                        var continuePropagation = this.options.callback
                            .call(this, index + 1, size, this.element);
                        if (evt.stopPropagation) {
                            evt.stopPropagation();
                        } else {
                            evt.cancelBubble = true;
                        }
                        return false;
                    }
                },
                // 限制跳转到某页 输入框的 文字  1~numPages() 之间 的整数
                _limitInput: function(ele, context) {
                    var val = $(ele).val();
                    val = val.replace(/\D/g, '');
                    if (val) {
                        val = parseInt(val);
                        if (val < 1) val = 1;
                        if (val > context._numPages()) val = context._numPages();
                    } else {
                        val = 1;
                    }
                    $(ele).val(val);
                },
                _eventBind: function() {
                    var _self = this;
                    // $pageCtn 内部的点击事件 全部用代理实现
                    _self._$pageCtn.on('click', 'span, a', function(e) {
                        var _$that = $(this),
                            _action = _$that.data('action'),
                            _isCurrent = _$that.hasClass('current'),
                            _isPageNum = e.target.tagName.toUpperCase() ==
                            'A' ? true : false,
                            _page_id = 0;
                        if (_isPageNum) {
                            _page_id = parseInt(_$that.attr('index'),
                                10);
                        }
                        if (_action) {
                            switch (_action) {
                                case 'first':
                                    _self._pageSelected(0, e);
                                    break;
                                case 'prev':
                                    if (_self._pageIndex > 0) {
                                        _self._pageSelected(_self._pageIndex -
                                            1, e);
                                    }
                                    break;
                                case 'next':
                                    if (_self._pageIndex < _self._numPages() -
                                        1) {
                                        _self._pageSelected(_self._pageIndex +
                                            1, e);
                                    }
                                    break;
                                case 'last':
                                    _self._pageSelected(_self._numPages() -
                                        1, e);
                                    break;
                                case 'goto':
                                    _self._pageSelected(_page_id, e);
                                    break;
                            }
                        }
                    });

                    // 输入验证及enter键支持
                    _self._$pageInput.keyup(function() {
                        _self._limitInput(this, _self);
                    });
                    _self._$pageInput[0].onafterpaste = function() {
                        _self._limitInput(this, _self);
                    };
                    // enter快捷键 支持
                    _self._$pageInput.bind("keydown keypress", function(
                        event) {
                        if (event.which === 13) {
                            _self._$pageGo.trigger('click');
                            event.preventDefault();
                        }
                    });
                    // 确定按钮事件 
                    _self._$pageGo.bind('click', function(e) {
                        _self._pageSelected(parseInt(_self._$pageInput
                            .val(), 10) - 1, e);
                    });

                    /*_self._$pageSizeChoose.change(function(e){
            _self._pageSelected(0, e, parseInt($(this).val(), 10), true);
        });*/

                    /*页码大小选择*/
                    var _$pageSizeList = $(_self.element).find(
                        '.pager-size-choose-list');

                    _self._$pageSizeChoose.unbind().bind('click',
                        function(e) {
                            var _$that = $(this);
                            _$pageSizeList.find('li').removeClass(
                                'selected').filter('[value="' + _$that.text() +
                                '"]').addClass('selected');
                            _$that.toggleClass('up');
                            if (_$that.hasClass('up')) {
                                _$pageSizeList.show();
                            } else {
                                _$pageSizeList.hide();
                            }
                            sizeListPositon();
                            e.stopPropagation();
                        });
                    //
                    _$pageSizeList.off().on('click', 'li', function(e) {
                        $(this).siblings().removeClass('selected');
                        _self._$pageSizeChoose.removeClass('up').text(
                            $(this).addClass('selected').text());
                        _$pageSizeList.hide();
                        /*出发选择事件*/
                        if ($(this).text() != _self.options.pageSize) {
                            _self._pageSelected(0, e, parseInt($(
                                this).val(), 10), true);
                        }
                    });

                    function sizeListPositon() {
                        var wh = $(window).height(),
                            bh = document.body.scrollHeight;
                        var width, height, top, left, itop;
                        var total = _$pageSizeList.find("li").length;
                        var domHeight = wh > bh ? wh : bh;
                        var boxHeight = _$pageSizeList.height();
                        var offset = _self._$pageSizeChoose.offset();

                        width = _self._$pageSizeChoose.outerWidth();
                        height = _self._$pageSizeChoose.outerHeight();
                        top = offset.top + height;
                        left = offset.left;
                        itop = 0 - (height + 18) / 2;

                        if (top + boxHeight > domHeight) {
                            top = offset.top - boxHeight;
                            itop = boxHeight + (height - 18) / 2;
                        }

                        _$pageSizeList.css({
                            left: left,
                            top: top,
                            width: width - 2
                        });
                    }
                    $("html").bind("click", function() {
                        _self._$pageSizeChoose.removeClass('up');
                        _$pageSizeList.hide();
                    });

                    $(window).resize(function() {
                        sizeListPositon();
                    });
                },
                /**
                 * This function inserts the pagination links into the container element
                 */
                _drawLinks: function() {
                    var _self = this;
                    var opts = _self.options;
                    _self._$pageNum.empty();
                    var interval = _self._getInterval();
                    var np = _self._numPages();
                    // This helper function returns a handler function that calls pageSelected with the right page_id
                    var getClickHandler = function(page_id) {
                        return function(evt) {
                            return _self._pageSelected(page_id,
                                evt);
                        }
                    };
                    // Helper function for generating a single link (or a span tag if it's the current page)
                    var appendItem = function(page_id, appendopts) {
                        page_id = page_id < 0 ? 0 : (page_id < np ?
                            page_id : np - 1); // Normalize page id to sane value
                        appendopts = $.extend({
                            text: page_id + 1,
                            classes: ""
                        }, appendopts || {});
                        if (page_id == _self._pageIndex) {
                            var lnk = $("<span class='current'>" +
                                (appendopts.text) + "</span>");
                        } else {
                            var lnk = $(
                                    "<a href='javascript:void(null);'>" +
                                    (appendopts.text) + "</a>")
                                .attr({
                                    //'href': opts.linkTo.replace(/__id__/,page_id),
                                    'index': page_id
                                }).data('action', 'goto');
                        }
                        if (appendopts.classes) {
                            lnk.addClass(appendopts.classes);
                        }
                        _self._$pageNum.append(lnk);
                    };
                    //根据翻页模式渲染主体部分
                    //1. 带数字
                    //2. 只有上一页下一页
                    if (opts.pageStyle == 'number') { //带数字的
                        // Generate starting points
                        if (interval[0] > 0 && opts.numEdgeEntries > 0) {
                            var end = Math.min(opts.numEdgeEntries,
                                interval[0]);
                            for (var i = 0; i < end; i++) {
                                appendItem(i);
                            }
                            if (opts.numEdgeEntries < interval[0] &&
                                opts.ellipseText) {
                                $("<span>" + opts.ellipseText +
                                    "</span>").appendTo(_self._$pageNum);
                            }
                        }
                        // Generate interval links
                        for (var i = interval[0]; i < interval[1]; i++) {
                            appendItem(i);
                        }
                        // Generate ending points
                        if (interval[1] < np && opts.numEdgeEntries > 0) {
                            if (np - opts.numEdgeEntries > interval[1] &&
                                opts.ellipseText) {
                                $("<span>" + opts.ellipseText +
                                    "</span>").appendTo(_self._$pageNum);
                            }
                            var begin = Math.max(np - opts.numEdgeEntries,
                                interval[1]);
                            for (var i = begin; i < np; i++) {
                                appendItem(i);
                            }
                        }
                    } else { //只有上一页和下一页的
                        $('<i class="pager-current">' + (_self._pageIndex +
                                1) + '</i>/<i class="pager-total">' +
                            opts.total + '</i>').appendTo(_self._$pageNum);
                    }

                    // 同步各模块的 数字
                    _self._$pageSizeChoose.text(opts.pageSize);
                    _self._$pageTotal.text(opts.total);
                    _self._$pageCurrent.text((_self._pageIndex + 1));
                    _self._$pageInput.val((_self._pageIndex + 1));
                    //禁用某些按钮
                    _self._$pageCtn.find('[data-action]').removeClass(
                        'current');
                    if (_self._pageIndex == 0) {
                        _self._$pageFirst.addClass('current');
                        _self._$pagePrev.addClass('current');
                    }
                    if (_self._pageIndex == (_self._numPages() - 1)) {
                        _self._$pageLast.addClass('current')
                        _self._$pageNext.addClass('current')
                    }
                },
                hide: function() {
                    $(this.element).hide();
                },
                show: function() {
                    $(this.element).show();
                },
                _tmpl: [
                    '<div class="fly-pager clearfix">',
                    '<span class="pager-operation">',
                    // '<span class="pager-messg">总共<i class="pager-total">100</i>条，第<i class="pager-current">1</i>页</span>',
                    // '<span class="pager-turn">跳转到&nbsp;&nbsp;<span class="pager-input-wrap"><input class="pager-input" type="text" value="1"></span>&nbsp;&nbsp;<span class="pager-go">确&nbsp;&nbsp;认</span></span>',
                    //'<span class="pager-messg">总共<i class="pager-total">100</i>条，第<i class="pager-current">1</i>页</span>',
                    '<span class="pager-turn">第&nbsp;<span class="pager-input-wrap"><input class="pager-input" type="text" value="1"></span>&nbsp;页&nbsp;&nbsp;<span class="pager-go">跳&nbsp;&nbsp;转</span></span>',
                    '<span class="pager-size">每页&nbsp;&nbsp;<span class="pager-size-choose"></span>&nbsp;&nbsp;条</span>',
                    '</span>',
                    '<span class="pager-ctn">',
                    '<span data-action="first">首页</span>',
                    '<span data-action="prev">上一页</span>',
                    '<span class="pager-num">',
                    /*翻页的内容*/
                    '</span>',
                    '<span data-action="next">下一页</span>',
                    '<span data-action="last">尾页</span>',
                    '</span>',
                    '<ul class="pager-size-choose-list">',
                    '<li value="10">10</li>',
                    '<li value="20">20</li>',
                    '<li value="30">30</li>',
                    '<li value="40">40</li>',
                    '<li value="50">50</li>',
                    '</ul>',
                    '</div>'
                ].join('')
            });
            module.exports = UI.pager;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    18: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.placeholder', {
                defaultElement: 'body',
                options: {
                    customClass: 'placeholder',
                    isInputSupported: false,
                    isTextareaSupported: false
                },
                _create: function() {
                    var _self = this;
                    var _options = this.options;

                    var isOperaMini = Object.prototype.toString.call(
                        window.operamini) == '[object OperaMini]';
                    _options.isInputSupported = 'placeholder' in
                        document.createElement('input') && !isOperaMini;
                    _options.isTextareaSupported = 'placeholder' in
                        document.createElement('textarea') && !
                        isOperaMini;
                    _options.valHooks = $.valHooks;
                    _options.propHooks = $.propHooks;

                    if (_options.isInputSupported && _options.isTextareaSupported) {
                        _options.input = _options.textarea = true;
                    } else {
                        _options.input = _options.isInputSupported;
                        _options.textarea = _options.isTextareaSupported;

                        if (!_options.isInputSupported) {
                            _options.valHooks.input = _self._hooks;
                            _options.propHooks.value = _self._hooks;
                        }
                        if (!_options.isTextareaSupported) {
                            _options.valHooks.textarea = _self._hooks;
                            _options.propHooks.value = _self._hooks;
                        }

                        /*TODO*/
                        $(function() {
                            // Look for forms
                            $(document).delegate('form',
                                'submit.placeholder', function() {
                                    // Clear the placeholder values so they don't get submitted
                                    var $inputs = $('.' + _options.customClass,
                                        this).each(function() {
                                        _self._clearPlaceholder(
                                            _self, this);
                                    });
                                    setTimeout(function() {
                                        $inputs.each(function() {
                                            _self._setPlaceholder(
                                                _self, this
                                            );
                                        });
                                    }, 10);
                                });
                        });

                        // Clear placeholder values upon page reload
                        $(window).bind('beforeunload.placeholder',
                            function() {
                                $('.' + _options.customClass).each(
                                    function() {
                                        this.value = '';
                                    });
                            });
                    }
                },

                _init: function() {
                    var _options = this.options;
                    var _self = this;
                    if (!_options.isInputSupported || !_options.isTextareaSupported) {
                        var $this = this.element;
                        $this
                            .filter((_options.isInputSupported ?
                                    'textarea' : ':input') +
                                '[placeholder]')
                            .not('.' + _options.customClass)
                            .bind({
                                'focus.placeholder': function(e) {
                                    _self._clearPlaceholder(_self,
                                        this, e);
                                },
                                'blur.placeholder': function() {
                                    _self._setPlaceholder(_self,
                                        this);
                                }
                            })
                            .data('placeholder-enabled', true)
                            .trigger('blur.placeholder');
                        return $this;
                    }
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },
                _destroy: function() {},
                _args: function(elem) {
                    // Return an object of element attributes
                    var newAttrs = {};
                    var rinlinejQuery = /^jQuery\d+$/;
                    $.each(elem.attributes, function(i, attr) {
                        if (attr.specified && !rinlinejQuery.test(
                            attr.name)) {
                            newAttrs[attr.name] = attr.value;
                        }
                    });
                    return newAttrs;
                },
                _clearPlaceholder: function(context, ele, event, value) {
                    var input = ele;
                    var $input = $(input);
                    if (input.value == $input.attr('placeholder') &&
                        $input.hasClass(context.options.customClass)) {
                        if ($input.data('placeholder-password')) {
                            $input = $input.hide().nextAll(
                                'input[type="password"]:first').show().attr(
                                'id', $input.removeAttr('id').data(
                                    'placeholder-id'));
                            // If `clearPlaceholder` was called from `$.valHooks.input.set`
                            if (event === true) {
                                return $input[0].value = value;
                            }
                            $input.focus();
                        } else {
                            input.value = '';
                            $input.removeClass(context.options.customClass);
                            input == context._safeActiveElement() &&
                                input.select();
                        }
                    }
                },
                _setPlaceholder: function(context, ele) {
                    var $replacement;
                    var input = ele;
                    var $input = $(input);
                    var id = input.id;
                    if (input.value === '') {
                        if (input.type === 'password') {
                            if (!$input.data('placeholder-textinput')) {
                                try {
                                    $replacement = $input.clone().attr({
                                        'type': 'text'
                                    });
                                } catch (e) {
                                    $replacement = $('<input>').attr($.extend(
                                        context._args(input), {
                                            'type': 'text'
                                        }));
                                }
                                $replacement
                                    .removeAttr('name')
                                    .data({
                                        'placeholder-password': $input,
                                        'placeholder-id': id
                                    })
                                    .bind('focus.placeholder', function(
                                        e) {
                                        context._clearPlaceholder(
                                            context, this, e);
                                    });
                                $input
                                    .data({
                                        'placeholder-textinput': $replacement,
                                        'placeholder-id': id
                                    })
                                    .before($replacement);
                            }
                            $input = $input.removeAttr('id').hide().prevAll(
                                'input[type="text"]:first').attr('id',
                                id).show();
                            // Note: `$input[0] != input` now!
                        }
                        $input.addClass(context.options.customClass);
                        $input[0].value = $input.attr('placeholder');
                    } else {
                        $input.removeClass(context.options.customClass);
                    }
                },
                _safeActiveElement: function() {
                    // Avoid IE9 `document.activeElement` of death
                    // https://github.com/mathiasbynens/jquery-placeholder/pull/99
                    try {
                        return document.activeElement;
                    } catch (exception) {}
                },
                _hooks: (function(that) {
                    return {
                        'get': function(element) {
                            var $element = $(element);

                            var $passwordInput = $element.data(
                                'placeholder-password');
                            if ($passwordInput) {
                                return $passwordInput[0].value;
                            }

                            return $element.data(
                                    'placeholder-enabled') &&
                                $element.hasClass('placeholder') ?
                                '' : element.value;
                        },
                        'set': function(element, value) {
                            var $element = $(element);

                            var $passwordInput = $element.data(
                                'placeholder-password');
                            if ($passwordInput) {
                                return $passwordInput[0].value =
                                    value;
                            }

                            if (!$element.data(
                                'placeholder-enabled')) {
                                return element.value = value;
                            }
                            if (value === '') {
                                element.value = value;
                                // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
                                if (element != that._safeActiveElement()) {
                                    // We can't use `triggerHandler` here because of dummy text/password inputs :(
                                    that._setPlaceholder.call(null,
                                        that, element);
                                }
                            } else if ($element.hasClass(that.options
                                .customClass)) {
                                that._clearPlaceholder.call(null,
                                    that, element, true, value) ||
                                    (element.value = value);
                            } else {
                                element.value = value;
                            }
                            // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
                            return $element;
                        }
                    };
                })(this)
            });

            module.exports = UI.placeholder;
        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    19: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');


            UI.widget('fly.radio', {
                defaultElement: '<div>',
                options: {
                    disabled: null,
                    textField: 'text',
                    valueField: 'value',
                    initValue: null,
                    onSelect: function() {},
                    data: []
                },

                _create: function() {
                    var self = this;

                    this._createTpl();

                    this.element.removeClass('fly-textbox').addClass(
                        'fly-radio').empty();

                    this.element.on('click', 'input:radio', function(e) {
                        self._trigger('onSelect', e, self.getValue());
                    });

                    if (this.options.data.length) {
                        this._render();
                        if (this.options.initValue !== null) {
                            this.setValue(this.options.initValue);
                        }
                    } else {
                        $('<input>')
                            .attr('name', this.options.name)
                            .appendTo(this.element)
                            .wrap('<em></em>').addClass('text');
                    }

                },

                _createTpl: function() {
                    this.tpl = '<% _.each(data, function(item) { %>' +
                        '<label><input type="radio" name="' + this.options
                        .name +
                        '" title="<%= item.' + this.options.textField +
                        ' %>" value="<%= item.' + this.options.valueField +
                        ' %>" /> <%= item.' + this.options.textField +
                        ' %></label>' +
                        '<% }); %>';
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'data') {
                        this._render();
                    }

                    if (key == 'initValue') {
                        this.setValue(value);
                    }
                },

                /*_setOptions: function() {
        this._createTpl();
    },*/

                refresh: function() {

                },

                setValue: function(val) {
                    this.element.find(':radio[value="' + val + '"]').attr(
                        'checked', true);
                },

                getValue: function() {
                    return this.element.find(':radio:checked').val();
                },

                _render: function() {
                    var d = {
                        data: this.options.data
                    };
                    this.element.empty().append(_.template(this.tpl)(d));
                },

                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-radio]', context).each(function() {
                    $(this).radio(UI.utils.parseOptions($(this).data(
                        'flyOptions')));
                });
            });

            module.exports = UI.button;
        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    20: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            //定义组合框控件
            UI.widget('fly.suggestbox', {
                defaultElement: '<div></div>',
                options: {
                    //表单name属性
                    name: '',
                    //数据源:若为字符串则为url，或为数组
                    data: '',
                    ajaxType: 'post',
                    //是否含有翻页
                    hasPage: false,
                    //是否一次请求全部数据 若为ture远程仅请求一次
                    hasWholeData: false,
                    //翻页数目
                    pageNum: 5,
                    //文本字段映射
                    textField: 'text',
                    //值字段映射
                    valueField: 'value',
                    //是否搜索关键字
                    searchField: '',
                    //值对应影藏输入域
                    valueInputId: '',
                    //需要插入的节点，默认为当前的textbox内部
                    appendTo: false,
                    //ajax失败时触发
                    onError: null,
                    //选择时触发
                    onSelect: null
                },

                _create: function() {
                    var name = this.options.name || this.element.attr(
                        "name") || "";
                    var _uuid = UI.utils.generateGUID('combobox');
                    if (this.element.is("input")) {
                        this.textInput = this.element.addClass("text").wrap(
                            "<div class='fly-suggest-wrapper'><em></em></div>"
                        );
                        this.wrapper = this.textInput.parent().parent();
                    } else {
                        this.wrapper = this.element.addClass(
                            "fly-suggest-wrapper");
                        this.textInput = $(
                            "<input type='text' class='text' name='" +
                            name + "Txt' />").appendTo(this.wrapper).wrap(
                            "<em></em>");
                    }
                    this.valueInput = this.options.valueInputId ?
                        $("#" + this.options.valueInputId) :
                        $('<input>').attr('type', 'hidden').attr('name',
                            name)
                        .insertAfter(this.textInput);

                    this.textInput.attr('mind-accept', _uuid);
                    this.valueInput.attr('mind-target', _uuid);
                },

                _init: function() {
                    var self = this;
                    self.params = {
                        pageSize: self.options.pageNum,
                        currentPageNo: 1
                    };
                    _render.call(self);
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'disabled') {
                        if (value)
                            this.element.attr('disabled', true)
                            .addClass('fly-suggest-disabled');
                        else
                            this.element.removeAttr('disabled')
                            .removeClass('fly-suggest-disabled');
                    }
                },

                _destroy: function() {

                },

                renderPage: function(key, total, pageCurrent) {
                    var self = this;
                    var pageSum = Math.ceil(total / self.options.pageNum);
                    var $page = self.box.find('.fly-suggest-pager').empty();
                    pageCurrent = pageCurrent || 1;

                    if (pageSum == 0) {
                        $('<span>没有记录！</span>').appendTo($page);
                        return;
                    }

                    $('<span><i>' + pageCurrent + '</i>/<b>' + pageSum +
                        '</b></span>').appendTo($page);

                    if (pageSum > 1 && pageCurrent > 1)
                        $(
                            '<a href="javascript:void(null)" class="fly-suggest-prev-btn">上一页</a>'
                        )
                        .appendTo($page).click(function() {
                            _getData.call(self, key, pageCurrent -
                                1);
                        });

                    if (pageSum > 1 && pageCurrent < pageSum)
                        $(
                            '<a href="javascript:void(null)" class="fly-suggest-next-btn">下一页</a>'
                        )
                        .appendTo($page).click(function() {
                            _getData.call(self, key, pageCurrent +
                                1);
                        });
                },

                renderList: function(data) {
                    var self = this;
                    var $suggestContent = self.box.find('ul');
                    $suggestContent.empty();

                    $.each(data, function(i, item) {
                        var text = item[self.options.textField];
                        var $li = $('<li>').attr('title', text).text(
                                text)
                            .data('suggest', item);

                        $li.appendTo($suggestContent);
                    });

                    setTimeout(function() {
                        _position.call(self);
                    }, 0);
                },

                //打开下拉框
                open: function() {
                    var self = this;
                    $(document).trigger('click.flyui.suggestbox');
                    self.box.show();
                    _position.call(self);
                    _addDocumentEvent.call(self);
                },

                //关闭下拉框
                close: function() {
                    var self = this;
                    self.box.hide();
                    $(document).unbind('click.flyui.suggestbox');
                }

            });

            function _render() {
                var self = this;
                var guid = UI.utils.generateGUID("suggestbox");
                var html = [
                    '<div class="fly-suggest-ctn" id="' + guid + '">',
                    '    <div class="fly-suggest-inner">',
                    '        <ul></ul>',
                    '    </div>',
                    '    <div class="fly-suggest-pager">',
                    '    </div>',
                    '</div>'
                ].join('');

                $("#" + guid).remove(); //二次渲染的时候清除之前的
                self.textInput.data("guid", guid);

                if (self.options.appendTo) {
                    self.box = $(html).appendTo($(this.options.appendTo));
                } else {
                    self.box = $(html).appendTo(this.wrapper);
                }

                if (!self.options.hasPage || typeof(self.options.data) !=
                    "string") {
                    self.box.find(".fly-suggest-pager").remove();
                }

                //是否一次加载全部数据
                if (typeof(self.options.data) == "string" && self.options.hasWholeData) {
                    $.ajax({
                        url: CONTEXTPATH + self.options.data,
                        type: self.options.ajaxType,
                        dataType: "json",
                        success: function(data) {
                            self.data = typeof(data) == "object" ? data :
                                eval("(" + data + ")");
                            self.renderList(self.data);
                        },
                        error: function() {
                            self.options.onError && self.options.onError();
                        }
                    });
                } else if (typeof(self.options.data) == "object") {
                    self.data = self.options.data;
                    self.renderList(self.data);
                }

                _addEvents.call(self);
            }

            function _position() {
                var self = this;
                if (self.options.appendTo) {
                    var wh = $(window).height(),
                        bh = document.body.scrollHeight;
                    var width, height, top, left;
                    var domHeight = wh > bh ? wh : bh;
                    var boxHeight = self.box.height();
                    var offset = self.wrapper.offset();

                    width = self.wrapper.outerWidth();
                    height = self.wrapper.outerHeight();
                    top = offset.top + height;
                    left = offset.left;

                    if (top + boxHeight > domHeight) {
                        top = offset.top - boxHeight;
                    }

                    self.box.css({
                        margin: "0",
                        left: left,
                        top: top,
                        width: self.options.width || width - 2
                    });
                }

            };

            function _addEvents() {
                var self = this;
                self.textInput.unbind();

                self.textInput
                    .click(function(e) {
                        var val = $(this).val();
                        _getData.call(self, val);
                        setTimeout(function() {
                            self.open();
                        }, 0);
                    })
                    .keyup(function() {
                        var val = $(this).val();
                        self.valueInput.val('');
                        _getData.call(self, val);
                    });

                self.box.click(function(e) {
                    e.stopPropagation();
                });

                self.box.find("ul").on("click", "li", function(e) {
                    e.stopPropagation();

                    var $li = $(this);
                    var item = $li.data("suggest")
                    var val = item[self.options.valueField];
                    var txt = item[self.options.textField];

                    self.options.onSelect && self.options.onSelect(item);
                    self.valueInput.val(val);
                    self.textInput.val(txt);
                    self.box.hide();
                });

                if (self.options.appendTo) {
                    $(window).resize(function() {
                        _position.call(self);
                    });
                }
            };

            function _addDocumentEvent() {
                var self = this;
                $(document).unbind('click.flyui.suggestbox')
                    .bind('click.flyui.suggestbox', function(e) {
                        var target = $(e.target);
                        if (target.closest(self.box).length == 0 &&
                            target.closest(self.wrapper).length == 0) {
                            self.close();
                        }
                    });
            }

            function _getData(key, pageNo) {
                var self = this;
                pageNo = pageNo || 1;
                self.params[self.options.searchField] = key;
                self.params['currentPageNo'] = pageNo;

                if (typeof(self.options.data) == "string" && !self.options.hasWholeData) {
                    $.ajax({
                        url: CONTEXTPATH + self.options.data,
                        type: self.options.ajaxType,
                        data: self.params,
                        dataType: "json",
                        success: function(data) {
                            data = typeof(data) == "object" ? data :
                                eval("(" + data + ")");
                            if (self.options.hasPage) {
                                self.renderPage(key, data.total, pageNo);
                            }
                            self.renderList(data.rows);
                        },
                        error: function() {
                            self.options.onError && self.options.onError();
                        }
                    });
                } else if (typeof(self.options.data) == "object") {
                    var localData = self.data;
                    if (key && key != "") {
                        localData = _searchLocal.call(self, key, localData);
                    }
                    self.renderList(localData);
                }

            }

            function _searchLocal(key, data) {
                var self = this;
                var result = [];
                if (key && key != "") {
                    for (var i = 0; i < data.length; i++) {
                        var obj = data[i];
                        if (obj[self.options.searchField].indexOf(key) > -1) {
                            result.push(obj);
                        }
                    }
                } else {
                    return data;
                }
                return result;
            }

            UI.ready(function(context) {
                $('[data-fly-suggestbox]', context).each(function() {
                    var $this = $(this);
                    var opts = $this.data('flyOptions');
                    if (opts == 'this.text') {
                        opts = $this.text();
                        $this.text("");
                    }
                    $this.suggestbox(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.suggestbox;
        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    21: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            //验证属性
            var validate = [
                'min',
                'max',
                'required',
                'step',
                'pattern',
                'multiple'
            ];

            UI.widget('fly.textarea', {
                options: {
                    disabled: null,
                    readonly: null,
                    value: '',
                    type: 'textarea',
                    /* textarea */
                    valid: {},
                    onBlur: function() {}
                },

                _create: function() {
                    var self = this;
                    this.element.addClass('fly-textbox').empty();

                    this.control = $('<textarea>')
                        .attr('name', this.options.name)
                        .text(this.options.value)
                        .appendTo(this.element)
                        .wrap('<em></em>').addClass('textarea');

                    if (self.options.readonly) {
                        self.control.attr('readonly', true);
                    }

                    self.control.blur(function() {
                        self._validate();
                    });
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'readonly') {
                        if (value) this.control.attr('readonly', true);
                        else this.control.removeAttr('readonly');
                    }

                    if (key == 'viewonly') {
                        if (value) this.element.html(this.control.val())
                            .addClass('viewonly');
                    }

                },

                refresh: function() {

                },

                setValue: function(val) {
                    this.control.val(val);
                },

                getValue: function() {
                    return this.control.val();
                },

                _validate: function() {
                    var self = this,
                        val = self.control.val();
                    if (UI.validate.isPass(self.control, self.option.valid)) {
                        self.options.onBlur.call(self.control, val);
                    }
                },

                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-textbox]', context).each(function() {
                    var opts = $(this).data('flyOptions');
                    if (opts == 'this.text') opts = $(this).text();
                    $(this).textbox(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.textbox;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    22: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            //验证属性
            var validate = [
                'min',
                'max',
                'required',
                'step',
                'pattern',
                'multiple'
            ];

            UI.widget('fly.textbox', {
                options: {
                    disabled: null,
                    readonly: null,
                    value: '',
                    type: 'text',
                    number: false,
                    /**
                     * number == true 时有效  格式化成
                     * false 3234
                     * 0 3,234
                     * 1 3,234.0
                     * 2 3,234.00
                     * 3 3,234.000
                     */
                    fraction: 2,
                    group: false,
                    valid: {},
                    onBlur: function() {}
                },

                _create: function() {
                    var self = this;
                    this.element.addClass('fly-textbox').empty();
                    this.control = $('<input>')
                        .attr('type', this.options.type)
                        .attr('name', this.options.name)
                        .val(this.options.value)
                        .appendTo(this.element)
                        .wrap('<em></em>').addClass('text');

                    if (self.options.readonly) {
                        self.control.attr('readonly', true);
                    }

                    if (self.options.number == true) {
                        self.control.data('number', self._fmtToNum(this
                            .options.value));
                        self._addEvent();
                    } else {
                        self.control.blur(function() {
                            self._validate();
                        });
                    }
                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);

                    if (key == 'readonly') {
                        if (value) this.control.attr('readonly', true);
                        else this.control.removeAttr('readonly');
                    }

                    if (key == 'viewonly') {
                        if (value) this.element.html(this.control.val())
                            .addClass(
                                'viewonly');
                    }

                },

                refresh: function() {

                },

                setValue: function(val) {
                    this.control.val(val);
                },

                getValue: function() {
                    return this.control.val();
                },

                _validate: function() {
                    var self = this,
                        val = self.control.val();
                    if (UI.validate.isPass(self.control, self.options.valid)) {
                        self.options.onBlur.call(self.control, val);
                    }
                },
                _addEvent: function() {
                    var self = this;
                    var timeout = null;
                    var formats = self._NUMBER_FORMATS;
                    // 限制输入
                    // 输入验证及enter键支持
                    self.control.bind({
                        focus: function() {
                            /* 将隐藏的值同步到显示框 */
                            if (timeout != null) {
                                clearTimeout(timeout);
                            }
                            if (self.control.val().indexOf(',') !=
                                -1) {
                                if (self.control.data('number') !=
                                    0 || self.control.val() == 0) {
                                    self.control.val(self.control.data(
                                        'number'));
                                }

                                /* 解决IE下光标自动移到最前面的bug */
                                var charLen = self.control.val().length,
                                    txtFocus = self.control[0];
                                if ($.browser.msie) {
                                    var range = txtFocus.createTextRange();
                                    range.move("character", charLen);
                                    range.select();
                                }
                            }
                        },
                        keyup: function() {
                            /* 验证输入数字或者小数点 */
                            var _val = self.control.val();
                            if (timeout != null) {
                                clearTimeout(timeout);
                            }
                            if (_val.indexOf('.') != -1) {
                                timeout = setTimeout(function() {
                                    self._limitInput();
                                }, 1500);
                            } else {
                                self._limitInput();
                            }
                        },
                        blur: function() {
                            /* 将数值同步到隐藏域，且格式化 */
                            if (timeout != null) {
                                clearTimeout(timeout);
                            }
                            self._limitInput();
                            var _groupSep = self.options.group ?
                                ',' : '',
                                _val = self.control.val() == '' ?
                                '' : self._formate(self.control.val(),
                                    formats.PATTERNS,
                                    _groupSep, '.', self.options.fraction
                                );
                            self.control.data('number', self._fmtToNum(
                                _val));
                            self.control.val(_val);
                            /*self.control.val()==''?'':self._numFixed(parseFloat(self.control.val()), self.options.fraction)*/
                        }
                    });
                },
                _limitInput: function() {
                    var self = this,
                        val = self.control.val(),
                        re = /^-?\d+(?=\.{0,1}\d+$|$)/;

                    if (val == '' || !re.test(val)) {
                        self.control.val("").trigger('change');
                    } else {
                        UI.validate.isPass(self.control, self.options.valid);
                    }
                },
                _fmtToNum: function(str) {
                    var num = parseFloat(str.replace(/,/ig, ''));
                    return isNaN(num) ? 0 : num;
                },
                _numFixed: function(num, degree) {
                    if (!num) return "0.00";
                    return num.toFixed(degree);
                },
                _formate: function(number, pattern, groupSep,
                    decimalSep, fractionSize) {
                    var DECIMAL_SEP = '.';
                    var isNegative = number < 0;
                    number = Math.abs(number);

                    var isInfinity = number === Infinity;
                    if (!isInfinity && !isFinite(number)) return '';

                    var numStr = number + '',
                        formatedText = '',
                        hasExponent = false,
                        parts = [];

                    if (isInfinity) formatedText = '\u221e';

                    if (!isInfinity && numStr.indexOf('e') !== -1) {
                        var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
                        if (match && match[2] == '-' && match[3] >
                            fractionSize + 1) {
                            number = 0;
                        } else {
                            formatedText = numStr;
                            hasExponent = true;
                        }
                    }

                    if (!isInfinity && !hasExponent) {
                        var fractionLen = (numStr.split(DECIMAL_SEP)[1] ||
                            '').length;

                        // determine fractionSize if it is not specified
                        if ((typeof fractionSize) == 'undefined') {
                            fractionSize = Math.min(Math.max(pattern.minFrac,
                                fractionLen), pattern.maxFrac);
                        }

                        // safely round numbers in JS without hitting imprecisions of floating-point arithmetics
                        // inspired by:
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
                        number = +(Math.round(+(number.toString() + 'e' +
                                fractionSize))
                            .toString() + 'e' + -fractionSize);

                        var fraction = ('' + number).split(DECIMAL_SEP);
                        var whole = fraction[0];
                        fraction = fraction[1] || '';

                        var i, pos = 0,
                            lgroup = pattern.lgSize,
                            group = pattern.gSize;

                        if (whole.length >= (lgroup + group)) {
                            pos = whole.length - lgroup;
                            for (i = 0; i < pos; i++) {
                                if ((pos - i) % group === 0 && i !== 0) {
                                    formatedText += groupSep;
                                }
                                formatedText += whole.charAt(i);
                            }
                        }

                        for (i = pos; i < whole.length; i++) {
                            if ((whole.length - i) % lgroup === 0 && i !==
                                0) {
                                formatedText += groupSep;
                            }
                            formatedText += whole.charAt(i);
                        }

                        // format fraction part.
                        while (fraction.length < fractionSize) {
                            fraction += '0';
                        }

                        if (fractionSize && fractionSize !== "0")
                            formatedText +=
                            decimalSep + fraction.substr(0,
                                fractionSize);
                    } else {
                        if (fractionSize > 0 && number < 1) {
                            formatedText = number.toFixed(fractionSize);
                            number = parseFloat(formatedText);
                        }
                    }

                    if (number === 0) {
                        isNegative = false;
                    }

                    parts.push(isNegative ? pattern.negPre : pattern.posPre,
                        formatedText,
                        isNegative ? pattern.negSuf : pattern.posSuf);
                    return parts.join('');

                },
                _NUMBER_FORMATS: {
                    DECIMAL_SEP: '.',
                    GROUP_SEP: ',',
                    PATTERNS: { // Decimal Pattern
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: '',
                        posSuf: '',
                        negPre: '-',
                        negSuf: '',
                        gSize: 3,
                        lgSize: 3
                    }
                },
                _destroy: function() {

                }
            });

            UI.ready(function(context) {
                $('[data-fly-textbox]', context).each(function() {
                    var opts = $(this).data('flyOptions');
                    if (opts == 'this.text') opts = $(this).text();
                    $(this).textbox(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.textbox;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    23: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.textrange', {

                options: {
                    min: '',
                    max: '',
                    startValue: '',
                    endValue: ''
                },

                _create: function() {
                    var self = this,
                        id = UI.utils.generateGUID("textrange");

                    self.element.empty()
                        .addClass('fly-textbox fly-textrange')
                        .append('<em><i></i></em>');

                    self.start = $('<input/>')
                        .attr('type', 'text')
                        .attr('id', id + '-start')
                        .attr('name', self.options.startName)
                        .attr('value', self.options.startValue || '')
                        .addClass('text start')
                        .appendTo(self.element.find('em'));

                    self.end = $('<input/>')
                        .attr('type', 'text')
                        .attr('id', id + '-end')
                        .attr('name', self.options.endName)
                        .attr('value', self.options.endValue || '')
                        .addClass('text end')
                        .appendTo(self.element.find('em'));

                },

                _init: function() {
                    this.refresh();
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },

                refresh: function() {

                },

                _destroy: function() {

                }
            });

            module.exports = UI.textrange;

        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    24: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.widget');

            UI.widget('fly.tip', {
                options: {
                    text: '',
                    type: 'success'
                },
                _create: function() {

                },
                _init: function() {
                    if (this.options.type) {
                        this._show();
                    }
                },
                _setOption: function() {
                    this._super(key, value);
                },
                _show: function() {
                    var $tip = $('<div class="fly-tip"><span><i></i>' +
                        this.options.text + '</span></div>');
                    var time = new Date().getTime();
                    $('body > .fly-tip').stop().remove();
                    $tip.data('time', time).appendTo('body').fadeOut(
                        4000, function() {
                            $(this).remove();
                        }).find('span').addClass(this.options.type);
                }
            });
            module.exports = UI.tip;
        }, {
            "./core": 5,
            "./ui.widget": 31
        }
    ],
    25: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            var _ = require('./underscore');
            require('./ui.widget');

            /**
             * 定义树控件
             */
            UI.widget('fly.tree', {
                defaultElement: '<div></div>',
                options: {
                    data: "", //数据源 若为字符串则为url，或为数组，或为dao对象
                    showItem: 6, //不出现滚动条是最多的显示条数
                    checkbox: true, //是否显示选择框
                    autoCheckboxEven: true, //是否自动选择上级
                    parentIcon: 'folder', //父节点图标
                    childIcon: 'leaf', //子节点图标
                    attribute: [],
                    treeLine: true, //显示树前面的虚线
                    single: false, //显示checkbox后，是否单选
                    statusName: '__status',

                    valueField: 'id', //值字段
                    parentValueField: null,
                    textField: 'text',
                    iconField: 'icon', //图标字段
                    btnClickToToggleOnly: true, //是否点击展开收缩
                    slide: true, //是否有动画

                    isLeaf: null, //判断是否是子节点
                    onBeforeExpand: function() {}, //展开前
                    onExpand: function() {}, //展开时
                    onBeforeCollapse: function() {}, //收起前
                    onCollapse: function() {}, //收起时
                    onBeforeSelect: function() {},
                    onSelect: function() {},
                    onBeforeCancelSelect: function() {},
                    onCancelSelect: function() {},
                    onBeforeAppend: function() {},
                    onAppend: function() {},
                    onAfterAppend: function() {},

                    onBeforeCheck: function() {},
                    onCheck: function() {}, //选中复选框
                    onSuccess: function() {},
                    onError: function() {},
                    onClick: function() {},

                    ajaxType: 'get',
                    render: null, //自定义函数
                    selectable: null, //可选择判断函数
                    /*
        是否展开 
            1,可以是true/false 
            2,也可以是数字(层次)N 代表第1层到第N层都是展开的，其他收缩
            3,或者是判断函数 函数参数e(data,level) 返回true/false

        优先级没有节点数据的isexpand属性高,并没有delay属性高
        */
                    isExpand: null,
                    /*
        是否延迟加载 
            1,可以是true/false 
            2,也可以是数字(层次)N 代表第N层延迟加载 
            3,或者是字符串(Url) 加载数据的远程地址
            4,如果是数组,代表这些层都延迟加载,如[1,2]代表第1、2层延迟加载
            5,再是函数(运行时动态获取延迟加载参数) 函数参数e(data,level),返回true/false或者{url:...,parms:...}

        优先级没有节点数据的delay属性高
        */
                    delay: null
                },

                _create: function() {
                    //渲染基础dom
                    if (!this.element.is('ul')) {
                        this.tree = $('<ul></ul>').appendTo(this.element);
                    } else {
                        this.tree = this.element;
                    }

                    this.tree.addClass('fly-tree');
                    this.sysAttribute = ['isexpand', 'ischecked',
                        'href', 'style'
                    ];
                    this.loading = $(
                        "<div class='fly-tree-loading'></div>");
                    this.tree.after(self.loading);
                    this.data = [];
                    this.maxOutlineLevel = 1;
                    this.treedataindex = 0;
                    this._applyTree();
                    this._setTreeEven();

                    this._render();
                },

                _init: function() {},

                //初始化
                _render: function() {
                    var self = this,
                        p = self.options;

                    if (!p.data) return;

                    if (p.data instanceof Array) {
                        //直接渲染该数组
                        //self.data = p.data;
                        self._setData(p.data);
                    } else if (typeof p.data == 'string') {
                        //通过ajax请求该url
                        self._setUrl(p.data);
                        /*
            $.ajax({
                url: p.data,
                type: "post",
                dataType: "json",
                success: function (data) {
                    //self.data = UI.utils.toObj(data);
                    //self._render();
                },
                error: function(){
                    p.onError && p.onError();
                }
            });
            */
                    } else {
                        //通过dao获取数据
                        //TODO
                    }
                },

                _setOption: function(key, value) {
                    this._super(key, value);
                },

                //销毁
                _destroy: function() {

                },

                _setTreeLine: function(value) {
                    if (value) this.tree.removeClass("fly-tree-noline");
                    else this.tree.addClass("fly-tree-noline");
                },
                _setParms: function() {
                    var self = this,
                        p = this.options;
                    if ($.isFunction(p.parms)) p.parms = p.parms();
                },
                reload: function(callback) {
                    var self = this,
                        p = this.options;
                    self.clear();
                    self.loadData(null, p.url, null, {
                        success: callback
                    });
                },
                _setUrl: function(url) {
                    var self = this,
                        p = this.options;
                    if (url) {
                        self.clear();
                        self.loadData(null, url);
                    }
                },
                _setData: function(data) {
                    if (data) {
                        this.clear();
                        this.append(null, data);
                    }
                },
                setData: function(data) {
                    this.set('data', data);
                },
                getData: function() {
                    return this.data;
                },
                //是否包含子节点
                hasChildren: function(treenodedata) {
                    if (this.options.isLeaf) return !this.options.isLeaf(
                        treenodedata);
                    return treenodedata.children ? true : false;
                },
                //获取父节点 数据
                getParent: function(treenode, level) {
                    var self = this;
                    treenode = self.getNodeDom(treenode);
                    var parentTreeNode = self.getParentTreeItem(
                        treenode, level);
                    if (!parentTreeNode) return null;
                    var parentIndex = $(parentTreeNode).attr(
                        "treedataindex");
                    return self._getDataNodeByTreeDataIndex(parentIndex);
                },
                //获取父节点
                getParentTreeItem: function(treenode, level) {
                    var self = this;
                    treenode = self.getNodeDom(treenode);
                    var treeitem = $(treenode);
                    if (treeitem.parent().hasClass("fly-tree"))
                        return null;
                    if (level == undefined) {
                        if (treeitem.parent().parent("li").length == 0)
                            return null;
                        return treeitem.parent().parent("li")[0];
                    }
                    var currentLevel = parseInt(treeitem.attr(
                        "outlinelevel"));
                    var currenttreeitem = treeitem;
                    for (var i = currentLevel - 1; i >= level; i--) {
                        currenttreeitem = currenttreeitem.parent().parent(
                            "li");
                    }
                    return currenttreeitem[0];
                },
                getChecked: function() {
                    var self = this,
                        p = this.options;
                    if (!this.options.checkbox) return null;
                    var nodes = [];
                    $(".fly-checkbox-checked", self.tree).parent().parent(
                        "li").each(
                        function() {
                            var treedataindex = parseInt($(this).attr(
                                "treedataindex"));
                            nodes.push({
                                target: this,
                                data: self._getDataNodeByTreeDataIndex(
                                    self.data,
                                    treedataindex)
                            });
                        });
                    return nodes;
                },
                refreshTree: function() {
                    var self = this,
                        p = this.options;
                    $.each(this.getChecked(), function(k, v) {
                        self._setParentCheckboxStatus($(v.target));
                    });
                },
                getSelected: function() {
                    var self = this,
                        p = this.options;
                    var node = {};
                    node.target = $(".fly-selected", self.tree).parent(
                        "li")[0];
                    if (node.target) {
                        var treedataindex = parseInt($(node.target).attr(
                            "treedataindex"));
                        node.data = self._getDataNodeByTreeDataIndex(
                            self.data, treedataindex);
                        return node;
                    }
                    return null;
                },
                //升级为父节点级别
                upgrade: function(treeNode) {
                    var self = this,
                        p = this.options;
                    $(".fly-note", treeNode).each(function() {
                        $(this).removeClass("fly-note").addClass(
                            "fly-expandable-open");
                    });
                    $(".fly-note-last", treeNode).each(function() {
                        $(this).removeClass("fly-note-last").addClass(
                            "fly-expandable-open");
                    });
                    $("." + self._getChildNodeClassName(), treeNode).each(
                        function() {
                            $(this)
                                .removeClass(self._getChildNodeClassName())
                                .addClass(self._getParentNodeClassName(
                                    true));
                        });
                },
                //降级为叶节点级别
                demotion: function(treeNode) {
                    var self = this,
                        p = this.options;
                    if (!treeNode && treeNode[0].tagName.toLowerCase() !=
                        'li') return;
                    var islast = $(treeNode).hasClass("fly-last");
                    $(".fly-expandable-open", treeNode).each(function() {
                        $(this).removeClass("fly-expandable-open")
                            .addClass(islast ? "fly-note-last" :
                                "fly-note");
                    });
                    $(".fly-expandable-close", treeNode).each(function() {
                        $(this).removeClass("fly-expandable-close")
                            .addClass(islast ? "fly-note-last" :
                                "fly-note");
                    });
                    $("." + self._getParentNodeClassName(true),
                        treeNode).each(function() {
                        $(this)
                            .removeClass(self._getParentNodeClassName(
                                true))
                            .addClass(self._getChildNodeClassName());
                    });
                },
                collapseAll: function() {
                    var self = this,
                        p = this.options;
                    $(".fly-expandable-open", self.tree).click();
                },
                expandAll: function() {
                    var self = this,
                        p = this.options;
                    $(".fly-expandable-close", self.tree).click();
                },
                loadData: function(node, url, param, e) {
                    var self = this,
                        p = this.options;
                    e = $.extend({
                        showLoading: function() {
                            self.loading.show();
                        },
                        success: function() {},
                        error: function() {},
                        hideLoading: function() {
                            self.loading.hide();
                        }
                    }, e || {});
                    var ajaxtype = p.ajaxType;
                    //解决树无法设置parms的问题
                    param = $.extend(($.isFunction(p.parms) ? p.parms() :
                            p.parms),
                        param);
                    //请求服务器
                    $.ajax({
                        type: ajaxtype,
                        url: url,
                        data: param,
                        dataType: 'json',
                        beforeSend: function() {
                            e.showLoading();
                        },
                        success: function(data) {
                            if (!data) return;
                            e.hideLoading();
                            self.append(node, data);
                            self._trigger('onSuccess', null, [{
                                data: data,
                                node: node
                            }]);
                            e.success(data);
                        },
                        error: function(XMLHttpRequest, textStatus,
                            errorThrown) {
                            try {
                                e.hideLoading();
                                self._trigger('onError', [
                                    XMLHttpRequest, textStatus,
                                    errorThrown
                                ]);
                                e.error(XMLHttpRequest, textStatus,
                                    errorThrown);
                            } catch (e) {

                            }
                        }
                    });
                },
                //清空
                clear: function() {
                    var self = this,
                        p = this.options;
                    self.toggleNodeCallbacks = [];
                    self.data = null;
                    self.data = [];
                    self.nodes = null;
                    self.tree.html("");
                },
                //parm [treeNode] dom节点(li)、节点数据 或者节点 dataindex
                getNodeDom: function(nodeParm) {
                    var self = this,
                        p = this.options;
                    if (nodeParm == null) return nodeParm;
                    if (typeof(nodeParm) == "string" || typeof(nodeParm) ==
                        "number") {
                        return $("li[treedataindex=" + nodeParm + "]",
                            self.tree).get(0);
                    } else if (typeof(nodeParm) == "object" &&
                        'treedataindex' in
                        nodeParm) //nodedata
                    {
                        return self.getNodeDom(nodeParm['treedataindex']);
                    }
                    return nodeParm;
                },
                hide: function(treeNode) {
                    var self = this,
                        p = this.options;
                    treeNode = self.getNodeDom(treeNode);
                    if (treeNode) $(treeNode).hide();
                },
                show: function(treeNode) {
                    var self = this,
                        p = this.options;
                    treeNode = self.getNodeDom(treeNode);
                    if (treeNode) $(treeNode).show();
                },
                //parm [treeNode] dom节点(li)、节点数据 或者节点 dataindex
                remove: function(treeNode) {
                    var self = this,
                        p = this.options;
                    treeNode = self.getNodeDom(treeNode);
                    var treedataindex = parseInt($(treeNode).attr(
                        "treedataindex"));
                    var treenodedata = self._getDataNodeByTreeDataIndex(
                        self.data,
                        treedataindex);
                    if (treenodedata) self._setTreeDataStatus([
                        treenodedata
                    ], 'delete');
                    var parentNode = self.getParentTreeItem(treeNode);
                    //复选框处理
                    if (p.checkbox) {
                        self._setParentCheckboxStatus($(treeNode));
                    }
                    $(treeNode).remove();
                    self._updateStyle(parentNode ? $("ul:first",
                        parentNode) : self.tree);
                },
                _updateStyle: function(ul) {
                    var self = this,
                        p = this.options;
                    var itmes = $(" > li", ul);
                    var treeitemlength = itmes.length;
                    if (!treeitemlength) return;
                    //遍历设置子节点的样式
                    itmes.each(function(i, item) {
                        if (i == 0 && !$(this).hasClass("fly-first"))
                            $(this).addClass("fly-first");
                        if (i == treeitemlength - 1 && !$(this).hasClass(
                            "fly-last"))
                            $(this).addClass("fly-last");
                        if (i == 0 && i == treeitemlength - 1)
                            $(this).addClass("fly-onlychild");
                        $("> div .fly-note,> div .fly-note-last",
                            this)
                            .removeClass("fly-note fly-note-last")
                            .addClass(i == treeitemlength - 1 ?
                                "fly-note-last" :
                                "fly-note");
                        self._setTreeItem(this, {
                            isLast: i == treeitemlength - 1
                        });
                    });
                },
                //parm [domnode] dom节点(li)、节点数据 或者节点 dataindex
                update: function(domnode, newnodedata) {
                    var self = this,
                        p = this.options;
                    domnode = self.getNodeDom(domnode);
                    var treedataindex = parseInt($(domnode).attr(
                        "treedataindex"));
                    nodedata = self._getDataNodeByTreeDataIndex(self.data,
                        treedataindex);
                    for (var attr in newnodedata) {
                        nodedata[attr] = newnodedata[attr];
                        if (attr == p.textField) {
                            $("> .fly-body > span", domnode).text(
                                newnodedata[attr]);
                        }
                    }
                },
                //增加节点集合
                //parm [newdata] 数据集合 Array
                //parm [parentNode] dom节点(li)、节点数据 或者节点 dataindex
                //parm [nearNode] 附加到节点的上方/下方(非必填)
                //parm [isAfter] 附加到节点的下方(非必填)
                append: function(parentNode, newdata, nearNode, isAfter) {
                    var self = this,
                        p = this.options;
                    parentNode = self.getNodeDom(parentNode);
                    if (self._trigger('onBeforeAppend', [parentNode,
                        newdata
                    ]) == false)
                        return false;
                    if (!newdata || !newdata.length) return false;
                    if (p.valueField && p.parentValueField)
                        newdata = self.arrayToTree(newdata, p.valueField,
                            p.parentValueField);
                    self._addTreeDataIndexToData(newdata);
                    self._setTreeDataStatus(newdata, 'add');
                    if (nearNode != null) {
                        nearNode = self.getNodeDom(nearNode);
                    }
                    self._trigger('onAppend', [parentNode, newdata])
                    self._appendData(parentNode, newdata);
                    if (parentNode == null) //增加到根节点
                    {
                        var gridhtmlarr = self._getTreeHTMLByData(
                            newdata, 1, [], true);
                        gridhtmlarr[gridhtmlarr.length - 1] =
                            gridhtmlarr[0] = "";
                        if (nearNode != null) {
                            $(nearNode)[isAfter ? 'after' : 'before'](
                                gridhtmlarr.join(
                                    ''));
                            self._updateStyle(parentNode ? $("ul:first",
                                parentNode) : self.tree);
                        } else {
                            //remove last node class
                            if ($("> li:last", self.tree).length > 0)
                                self._setTreeItem($("> li:last", self.tree)[
                                    0], {
                                    isLast: false
                                });
                            self.tree.append(gridhtmlarr.join(''));
                        }
                        $(".fly-body", self.tree).hover(function() {
                            $(this).addClass("fly-over");
                        }, function() {
                            $(this).removeClass("fly-over");
                        });
                        self._upadteTreeWidth();
                        self._trigger('onAfterAppend', [parentNode,
                            newdata
                        ])
                        return;
                    }
                    var treeitem = $(parentNode);
                    var outlineLevel = parseInt(treeitem.attr(
                        "outlinelevel"));

                    var hasChildren = $("> ul", treeitem).length > 0;
                    if (!hasChildren) {
                        treeitem.append(
                            "<ul class='fly-children'></ul>");
                        //设置为父节点
                        self.upgrade(parentNode);
                    }
                    var isLast = [];
                    for (var i = 1; i <= outlineLevel - 1; i++) {
                        var currentParentTreeItem = $(self.getParentTreeItem(
                            parentNode, i));
                        isLast.push(currentParentTreeItem.hasClass(
                            "fly-last"));
                    }
                    isLast.push(treeitem.hasClass("fly-last"));
                    var gridhtmlarr = self._getTreeHTMLByData(newdata,
                        outlineLevel + 1,
                        isLast, true);
                    gridhtmlarr[gridhtmlarr.length - 1] = gridhtmlarr[0] =
                        "";
                    if (nearNode != null) {
                        $(nearNode)[isAfter ? 'after' : 'before'](
                            gridhtmlarr.join(''));
                        self._updateStyle(parentNode ? $("ul:first",
                            parentNode) : self.tree);
                    } else {
                        //remove last node class  
                        if ($("> .fly-children > li:last", treeitem).length >
                            0)
                            self._setTreeItem($(
                                "> .fly-children > li:last",
                                treeitem)[0], {
                                isLast: false
                            });
                        $(">.fly-children", parentNode).append(
                            gridhtmlarr.join(''));
                    }
                    self._upadteTreeWidth();
                    $(">.fly-children .fly-body", parentNode).hover(
                        function() {
                            $(this).addClass("fly-over");
                        }, function() {
                            $(this).removeClass("fly-over");
                        });
                    self._trigger('onAfterAppend', [parentNode, newdata]);
                },
                //parm [nodeParm] dom节点(li)、节点数据 或者节点 dataindex
                cancelSelect: function(nodeParm) {
                    var self = this,
                        p = this.options;
                    var domNode = self.getNodeDom(nodeParm);
                    var treeitem = $(domNode);
                    var treedataindex = parseInt(treeitem.attr(
                        "treedataindex"));
                    var treenodedata = self._getDataNodeByTreeDataIndex(
                        self.data,
                        treedataindex);
                    var treeitembody = $(">div:first", treeitem);
                    if (p.checkbox)
                        $(".fly-checkbox", treeitembody).removeClass(
                            "fly-checkbox-checked")
                        .addClass("fly-checkbox-unchecked");
                    else
                        treeitembody.removeClass("fly-selected");
                    self._trigger('onCancelSelect', [{
                        data: treenodedata,
                        target: treeitem[0]
                    }]);
                },
                //选择节点(参数：条件函数、Dom节点或ID值)
                selectNode: function(selectNodeParm) {
                    var self = this,
                        p = this.options;
                    var clause = null;
                    if (typeof(selectNodeParm) == "function") {
                        clause = selectNodeParm;
                    } else if (typeof(selectNodeParm) == "object") {
                        var treeitem = $(selectNodeParm);
                        var treedataindex = parseInt(treeitem.attr(
                            "treedataindex"));
                        var treenodedata = self._getDataNodeByTreeDataIndex(
                            self.data,
                            treedataindex);
                        var treeitembody = $(">div:first", treeitem);
                        if (!treeitembody.length) {
                            treeitembody = $("li[treedataindex=" +
                                treedataindex +
                                "] >div:first", self.tree);
                        }
                        if (p.checkbox) {
                            $(".fly-checkbox", treeitembody).removeClass(
                                "fly-checkbox-unchecked").addClass(
                                "fly-checkbox-checked");
                        } else {
                            $("div.fly-selected", self.tree).removeClass(
                                "fly-selected");
                            treeitembody.addClass("fly-selected");
                        }
                        self._trigger('onSelect', [{
                            data: treenodedata,
                            target: treeitembody.parent().get(0)
                        }]);
                        return;
                    } else {
                        clause = function(data) {
                            if (!data[p.valueField]) return false;
                            return self._strTrim(data[p.valueField].toString()) ==
                                self._strTrim(
                                    selectNodeParm.toString());
                        };
                    }
                    $("li", self.tree).each(function() {
                        var treeitem = $(this);
                        var treedataindex = parseInt(treeitem.attr(
                            "treedataindex"));
                        var treenodedata = self._getDataNodeByTreeDataIndex(
                            self.data,
                            treedataindex);
                        if (clause(treenodedata, treedataindex)) {
                            self.selectNode(this);
                        } else {
                            //修复多选checkbox为true时调用该方法会取消已经选中节点的问题
                            if (!self.options.checkbox) {
                                self.cancelSelect(this);
                            }
                        }
                    });
                },
                getTextByID: function(id) {
                    var self = this,
                        p = this.options;
                    var data = self.getDataByID(id);
                    if (!data) return null;
                    return data[p.textField];
                },
                getDataByID: function(id) {
                    var self = this,
                        p = this.options;
                    var data = null;
                    $("li", self.tree).each(function() {
                        if (data) return;
                        var treeitem = $(this);
                        var treedataindex = parseInt(treeitem.attr(
                            "treedataindex"));
                        var treenodedata = self._getDataNodeByTreeDataIndex(
                            self.data,
                            treedataindex);
                        if (treenodedata[p.valueField].toString() ==
                            id.toString()) {
                            data = treenodedata;
                        }
                    });
                    return data;
                },
                arrayToTree: function(data, id, pid) //将ID、ParentID这种数据格式转换为树格式
                {
                    if (!data || !data.length) return [];
                    var targetData = []; //存储数据的容器(返回) 
                    var records = {};
                    var itemLength = data.length; //数据集合的个数
                    for (var i = 0; i < itemLength; i++) {
                        var o = data[i];
                        records[o[id]] = o;
                    }
                    for (var i = 0; i < itemLength; i++) {
                        var currentData = data[i];
                        var parentData = records[currentData[pid]];
                        if (!parentData) {
                            targetData.push(currentData);
                            continue;
                        }
                        parentData.children = parentData.children || [];
                        parentData.children.push(currentData);
                    }
                    return targetData;
                },
                //根据数据索引获取数据
                _getDataNodeByTreeDataIndex: function(data,
                    treedataindex) {
                    var self = this,
                        p = this.options;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].treedataindex == treedataindex)
                            return data[i];
                        if (data[i].children) {
                            var targetData = self._getDataNodeByTreeDataIndex(
                                data[i].children,
                                treedataindex);
                            if (targetData) return targetData;
                        }
                    }
                    return null;
                },
                //设置数据状态
                _setTreeDataStatus: function(data, status) {
                    var self = this,
                        p = this.options;
                    $(data).each(function() {
                        this[p.statusName] = status;
                        if (this.children) {
                            self._setTreeDataStatus(this.children,
                                status);
                        }
                    });
                },
                //设置data 索引
                _addTreeDataIndexToData: function(data) {
                    var self = this,
                        p = this.options;
                    $(data).each(function() {
                        if (this.treedataindex != undefined) return
                        ;
                        this.treedataindex = self.treedataindex++;
                        if (this.children) {
                            self._addTreeDataIndexToData(this.children);
                        }
                    });
                },
                _addToNodes: function(data) {
                    var self = this,
                        p = this.options;
                    self.nodes = self.nodes || [];
                    self.nodes.push(data);
                    if (!data.children) return;
                    $(data.children).each(function(i, item) {
                        self._addToNodes(item);
                    });
                },
                //添加项到self.data
                _appendData: function(treeNode, data) {
                    var self = this,
                        p = this.options;
                    var treedataindex = parseInt($(treeNode).attr(
                        "treedataindex"));
                    var treenodedata = self._getDataNodeByTreeDataIndex(
                        self.data,
                        treedataindex);
                    if (self.treedataindex == undefined) self.treedataindex =
                        0;
                    if (treenodedata && treenodedata.children ==
                        undefined) treenodedata
                        .children = [];
                    $(data).each(function(i, item) {
                        if (treenodedata)
                            treenodedata.children[treenodedata.children
                                .length] =
                            item;
                        else
                            self.data[self.data.length] = item;
                        self._addToNodes(item);
                    });
                },
                _setTreeItem: function(treeNode, options) {
                    var self = this,
                        p = this.options;
                    if (!options) return;
                    treeNode = self.getNodeDom(treeNode);
                    var treeItem = $(treeNode);
                    var outlineLevel = parseInt(treeItem.attr(
                        "outlinelevel"));
                    if (options.isLast != undefined) {
                        if (options.isLast == true) {
                            treeItem.removeClass("fly-last").addClass(
                                "fly-last");
                            $("> div .fly-note", treeItem).removeClass(
                                "fly-note").addClass(
                                "fly-note-last");
                            $(".fly-children li", treeItem)
                                .find(".fly-box:eq(" + (outlineLevel -
                                    1) + ")")
                                .removeClass("fly-line");
                        } else if (options.isLast == false) {
                            treeItem.removeClass("fly-last");
                            $("> div .fly-note-last", treeItem).removeClass(
                                "fly-note-last")
                                .addClass("fly-note");

                            $(".fly-children li", treeItem)
                                .find(".fly-box:eq(" + (outlineLevel -
                                    1) + ")")
                                .removeClass("fly-line")
                                .addClass("fly-line");
                        }
                    }
                },
                _upadteTreeWidth: function() {
                    var self = this,
                        p = this.options;
                    var treeWidth = self.maxOutlineLevel * 22;
                    if (p.checkbox) treeWidth += 22;
                    if (p.parentIcon || p.childIcon) treeWidth += 22;
                    treeWidth += p.nodeWidth;
                    self.tree.width(treeWidth);
                },
                _getChildNodeClassName: function() {
                    var self = this,
                        p = this.options;
                    return 'fly-tree-icon-' + p.childIcon;
                },
                _getParentNodeClassName: function(isOpen) {
                    var self = this,
                        p = this.options;
                    var nodeclassname = 'fly-tree-icon-' + p.parentIcon;
                    if (isOpen) nodeclassname += '-open';
                    return nodeclassname;
                },
                //判断节点是否展开状态,返回true/false
                _isExpand: function(o, level) {
                    var self = this,
                        p = this.options;
                    var isExpand = o.isExpand != null ? o.isExpand : (o
                        .isexpand !=
                        null ? o.isexpand : p.isExpand);
                    if (isExpand == null) return true;
                    if (typeof(isExpand) == "function") isExpand = p.isExpand({
                        data: o,
                        level: level
                    });
                    if (typeof(isExpand) == "boolean") return isExpand;
                    if (typeof(isExpand) == "string") return isExpand ==
                        "true";
                    if (typeof(isExpand) == "number") return isExpand >
                        level;
                    return true;
                },
                //获取节点的延迟加载状态,返回true/false (本地模式) 或者是object({url :'...',parms:null})(远程模式)
                _getDelay: function(o, level) {
                    var self = this,
                        p = this.options;
                    var delay = o.delay != null ? o.delay : p.delay;
                    if (delay == null) return false;
                    if (typeof(delay) == "function") delay = delay({
                        data: o,
                        level: level
                    });
                    if (typeof(delay) == "boolean") return delay;
                    if (typeof(delay) == "string") return {
                        url: delay
                    };
                    if (typeof(delay) == "number") delay = [delay];
                    if ($.isArray(delay)) return $.inArray(level, delay) !=
                        -1;
                    if (typeof(delay) == "object" && delay.data) return
                        delay;
                    return false;
                },
                //根据data生成最终完整的tree html
                _getTreeHTMLByData: function(data, outlineLevel, isLast,
                    isExpand) {
                    var self = this,
                        p = this.options;
                    if (self.maxOutlineLevel < outlineLevel)
                        self.maxOutlineLevel = outlineLevel;
                    isLast = isLast || [];
                    outlineLevel = outlineLevel || 1;
                    var treehtmlarr = [];
                    if (!isExpand) treehtmlarr.push(
                        '<ul class="fly-children" style="display:none">'
                    );
                    else treehtmlarr.push("<ul class='fly-children'>");
                    for (var i = 0; i < data.length; i++) {
                        var o = data[i];
                        var isFirst = i == 0;
                        var isLastCurrent = i == data.length - 1;
                        var delay = self._getDelay(o, outlineLevel);
                        var isExpandCurrent = delay ? false : self._isExpand(
                            o,
                            outlineLevel);

                        treehtmlarr.push('<li ');
                        if (o.treedataindex != undefined)
                            treehtmlarr.push('treedataindex="' + o.treedataindex +
                                '" ');
                        if (isExpandCurrent)
                            treehtmlarr.push('isexpand=' + o.isexpand +
                                ' ');
                        treehtmlarr.push('outlinelevel=' + outlineLevel +
                            ' ');
                        //增加属性支持
                        for (var j = 0; j < self.sysAttribute.length; j++) {
                            if ($(this).attr(self.sysAttribute[j]))
                                data[dataindex][self.sysAttribute[j]] =
                                $(this).attr(self.sysAttribute[
                                    j]);
                        }
                        for (var j = 0; j < p.attribute.length; j++) {
                            if (o[p.attribute[j]])
                                treehtmlarr.push(p.attribute[j] + '="' +
                                    o[p.attribute[
                                        j]] + '" ');
                        }

                        //css class
                        treehtmlarr.push('class="');
                        isFirst && treehtmlarr.push('fly-first ');
                        isLastCurrent && treehtmlarr.push('fly-last ');
                        isFirst && isLastCurrent && treehtmlarr.push(
                            'fly-onlychild ');
                        treehtmlarr.push('"');
                        treehtmlarr.push('>');
                        treehtmlarr.push('<div class="fly-body');
                        if (p.selectable && p.selectable(o) == false) {
                            treehtmlarr.push(' fly-unselectable');
                        }
                        treehtmlarr.push('">');
                        for (var k = 0; k <= outlineLevel - 2; k++) {
                            if (isLast[k]) treehtmlarr.push(
                                '<div class="fly-box"></div>');
                            else treehtmlarr.push(
                                '<div class="fly-box fly-line"></div>'
                            );
                        }
                        if (self.hasChildren(o)) {
                            if (isExpandCurrent) treehtmlarr.push(
                                '<div class="fly-box fly-expandable-open"></div>'
                            );
                            else treehtmlarr.push(
                                '<div class="fly-box fly-expandable-close"></div>'
                            );
                            if (p.checkbox) {
                                if (o.ischecked)
                                    treehtmlarr.push(
                                        '<div class="fly-box fly-checkbox fly-checkbox-checked"></div>'
                                    );
                                else
                                    treehtmlarr.push(
                                        '<div class="fly-box fly-checkbox fly-checkbox-unchecked"></div>'
                                    );
                            }
                            if (p.parentIcon) {
                                //node icon
                                treehtmlarr.push(
                                    '<div class="fly-box fly-tree-icon '
                                );
                                treehtmlarr.push(self._getParentNodeClassName(
                                        isExpandCurrent ? true : false) +
                                    " ");
                                if (p.iconField && o[p.iconField])
                                    treehtmlarr.push(
                                        'fly-tree-icon-none');
                                treehtmlarr.push('">');
                                if (p.iconField && o[p.iconField])
                                    treehtmlarr.push('<img src="' + o[p
                                            .iconField] +
                                        '" />');
                                treehtmlarr.push('</div>');
                            }
                        } else {
                            if (isLastCurrent) treehtmlarr.push(
                                '<div class="fly-box fly-note-last"></div>'
                            );
                            else treehtmlarr.push(
                                '<div class="fly-box fly-note"></div>'
                            );
                            if (p.checkbox) {
                                if (o.ischecked)
                                    treehtmlarr.push(
                                        '<div class="fly-box fly-checkbox fly-checkbox-checked"></div>'
                                    );
                                else
                                    treehtmlarr.push(
                                        '<div class="fly-box fly-checkbox fly-checkbox-unchecked"></div>'
                                    );
                            }
                            if (p.childIcon) {
                                //node icon 
                                treehtmlarr.push(
                                    '<div class="fly-box fly-tree-icon '
                                );
                                treehtmlarr.push(self._getChildNodeClassName() +
                                    " ");
                                if (p.iconField && o[p.iconField])
                                    treehtmlarr.push(
                                        'fly-tree-icon-none');
                                treehtmlarr.push('">');
                                if (p.iconField && o[p.iconField])
                                    treehtmlarr.push('<img src="' + o[p
                                            .iconField] +
                                        '" />');
                                treehtmlarr.push('</div>');
                            }
                        }
                        if (p.render) {
                            treehtmlarr.push('<span>' + p.render(o, o[p
                                    .textField]) +
                                '</span>');
                        } else {
                            treehtmlarr.push('<span>' + o[p.textField] +
                                '</span>');
                        }
                        treehtmlarr.push('</div>');
                        if (self.hasChildren(o)) {
                            var isLastNew = [];
                            for (var k = 0; k < isLast.length; k++) {
                                isLastNew.push(isLast[k]);
                            }
                            isLastNew.push(isLastCurrent);
                            if (delay) {
                                if (delay == true) {
                                    self.toggleNodeCallbacks.push({
                                        data: o,
                                        callback: function(dom, o) {
                                            var content = self._getTreeHTMLByData(
                                                o.children,
                                                outlineLevel +
                                                1, isLastNew,
                                                isExpandCurrent
                                            ).join('');
                                            $(dom).append(content);
                                            $(
                                                ">.fly-children .fly-body",
                                                dom).hover(
                                                function() {
                                                    $(this).addClass(
                                                        "fly-over");
                                                }, function() {
                                                    $(this).removeClass(
                                                        "fly-over");
                                                });
                                            self._removeToggleNodeCallback(
                                                o);
                                        }
                                    });
                                } else if (delay.data) {
                                    (function(o, url, parms) {
                                        self.toggleNodeCallbacks.push({
                                            data: o,
                                            callback: function(
                                                dom, o) {
                                                self.loadData(
                                                    dom, url,
                                                    parms, {
                                                        showLoading: function() {
                                                            $(
                                                                "div.fly-expandable-close:first",
                                                                dom
                                                            ).addClass(
                                                                "fly-box-loading"
                                                            );
                                                        },
                                                        hideLoading: function() {
                                                            $(
                                                                "div.fly-box-loading:first",
                                                                dom
                                                            ).removeClass(
                                                                "fly-box-loading"
                                                            );
                                                        }
                                                    });
                                                self._removeToggleNodeCallback(
                                                    o);
                                            }
                                        });
                                    })(o, delay.data, delay.parms);
                                }
                            } else {
                                treehtmlarr.push(self._getTreeHTMLByData(
                                    o.children,
                                    outlineLevel + 1, isLastNew,
                                    isExpandCurrent).join(
                                    ''));
                            }

                        }
                        treehtmlarr.push('</li>');
                    }
                    treehtmlarr.push("</ul>");
                    return treehtmlarr;

                },
                _removeToggleNodeCallback: function(nodeData) {
                    var self = this,
                        p = this.options;
                    for (var i = 0; i <= self.toggleNodeCallbacks.length; i++) {
                        if (self.toggleNodeCallbacks[i] && self.toggleNodeCallbacks[
                                i].data ==
                            nodeData) {
                            self.toggleNodeCallbacks.splice(i, 1);
                            break;
                        }
                    }
                },
                //根据简洁的html获取data
                _getDataByTreeHTML: function(treeDom) {
                    var self = this,
                        p = this.options;
                    var data = [];
                    $("> li", treeDom).each(function(i, item) {
                        var dataindex = data.length;
                        data[dataindex] = {
                            treedataindex: self.treedataindex++
                        };
                        data[dataindex][p.textField] = $(
                            "> span,> a", this).html();
                        for (var j = 0; j < self.sysAttribute.length; j++) {
                            if ($(this).attr(self.sysAttribute[j]))
                                data[dataindex][self.sysAttribute[j]] =
                                $(this).attr(g
                                    .sysAttribute[j]);
                        }
                        for (var j = 0; j < p.attribute.length; j++) {
                            if ($(this).attr(p.attribute[j]))
                                data[dataindex][p.attribute[j]] = $(
                                    this).attr(p.attribute[
                                    j]);
                        }
                        if ($("> ul", this).length > 0) {
                            data[dataindex].children = self._getDataByTreeHTML(
                                $(
                                    "> ul", this));
                        }
                    });
                    return data;
                },
                _applyTree: function() {
                    var self = this,
                        p = this.options;
                    self.data = self._getDataByTreeHTML(self.tree);
                    var gridhtmlarr = self._getTreeHTMLByData(self.data,
                        1, [], true);
                    gridhtmlarr[gridhtmlarr.length - 1] = gridhtmlarr[0] =
                        "";
                    self.tree.html(gridhtmlarr.join(''));
                    self._upadteTreeWidth();
                    $(".fly-body", self.tree).hover(function() {
                        $(this).addClass("fly-over");
                    }, function() {
                        $(this).removeClass("fly-over");
                    });
                },
                _getSrcElementByEvent: function(e) {
                    var self = this;
                    var obj = (e.target || e.srcElement);
                    var tag = obj.tagName.toLowerCase();
                    var jobjs = $(obj).parents().add(obj);
                    var fn = function(parm) {
                        for (var i = jobjs.length - 1; i >= 0; i--) {
                            if ($(jobjs[i]).hasClass(parm)) return
                                jobjs[i];
                        }
                        return null;
                    };
                    if (jobjs.index(this.tree) == -1) return {
                        out: true
                    };
                    var r = {
                        tree: fn("fly-tree"),
                        node: fn("fly-body"),
                        checkbox: fn("fly-checkbox"),
                        icon: fn("fly-tree-icon"),
                        text: tag == "span"
                    };
                    if (r.node) {
                        var treedataindex = parseInt($(r.node).parent()
                            .attr(
                                "treedataindex"));
                        r.data = self._getDataNodeByTreeDataIndex(self.data,
                            treedataindex);
                    }
                    return r;
                },
                _setTreeEven: function() {
                    var self = this,
                        p = this.options;
                    self.tree.click(function(e) {
                        var obj = (e.target || e.srcElement);
                        var treeitem = null;
                        if (obj.tagName.toLowerCase() == "a" || obj
                            .tagName.toLowerCase() ==
                            "span" || $(obj).hasClass("fly-box"))
                            treeitem = $(obj).parent().parent();
                        else if ($(obj).hasClass("fly-body"))
                            treeitem = $(obj).parent();
                        else
                            treeitem = $(obj);
                        if (!treeitem) return;
                        var treedataindex = parseInt(treeitem.attr(
                            "treedataindex"));
                        var treenodedata = self._getDataNodeByTreeDataIndex(
                            self.data,
                            treedataindex);
                        var treeitembtn = $("div.fly-body:first",
                            treeitem).find(
                            "div.fly-expandable-open:first,div.fly-expandable-close:first"
                        );
                        var clickOnTreeItemBtn = $(obj).hasClass(
                            "fly-expandable-open") || $(obj).hasClass(
                            "fly-expandable-close");
                        if (!$(obj).hasClass("fly-checkbox") && !
                            clickOnTreeItemBtn) {
                            if (!treeitem.hasClass(
                                "fly-unselectable")) {
                                if ($(">div:first", treeitem).hasClass(
                                        "fly-selected") &&
                                    p.needCancel) {
                                    if (self._trigger(
                                        'onBeforeCancelSelect',
                                        e, [{
                                            data: treenodedata,
                                            target: treeitem[
                                                0]
                                        }]) == false)
                                        return false;

                                    $(">div:first", treeitem).removeClass(
                                        "fly-selected");
                                    self._trigger('onCancelSelect',
                                        e, [{
                                            data: treenodedata,
                                            target: treeitem[0]
                                        }]);
                                } else {
                                    if (self._trigger(
                                        'onBeforeSelect', e, [{
                                            data: treenodedata,
                                            target: treeitem[
                                                0]
                                        }]) == false)
                                        return false;
                                    $(".fly-body", self.tree).removeClass(
                                        "fly-selected");
                                    $(">div:first", treeitem).addClass(
                                        "fly-selected");
                                    self._trigger('onSelect', e, [{
                                        data: treenodedata,
                                        target: treeitem[0]
                                    }])
                                }
                            }
                        }
                        //chekcbox even
                        if ($(obj).hasClass("fly-checkbox")) {
                            if (self._trigger('onBeforeCheck', e, [{
                                data: treenodedata,
                                target: treeitem[0]
                            }]) == false) {
                                return false;
                            }
                            if (p.autoCheckboxEven) {
                                //状态：未选中
                                if ($(obj).hasClass(
                                    "fly-checkbox-unchecked")) {
                                    $(obj).removeClass(
                                        "fly-checkbox-unchecked").addClass(
                                        "fly-checkbox-checked");
                                    $(".fly-children .fly-checkbox",
                                        treeitem)
                                        .removeClass(
                                            "fly-checkbox-incomplete fly-checkbox-unchecked"
                                    )
                                        .addClass(
                                            "fly-checkbox-checked");
                                    self._trigger('onCheck', e, [{
                                            data: treenodedata,
                                            target: treeitem[0]
                                        },
                                        true
                                    ]);
                                }
                                //状态：选中
                                else if ($(obj).hasClass(
                                    "fly-checkbox-checked")) {
                                    $(obj).removeClass(
                                        "fly-checkbox-checked").addClass(
                                        "fly-checkbox-unchecked");
                                    $(".fly-children .fly-checkbox",
                                        treeitem)
                                        .removeClass(
                                            "fly-checkbox-incomplete fly-checkbox-checked"
                                    )
                                        .addClass(
                                            "fly-checkbox-unchecked"
                                    );
                                    self._trigger('onCheck', e, [{
                                            data: treenodedata,
                                            target: treeitem[0]
                                        },
                                        false
                                    ]);
                                }
                                //状态：未完全选中
                                else if ($(obj).hasClass(
                                    "fly-checkbox-incomplete")) {
                                    $(obj).removeClass(
                                        "fly-checkbox-incomplete").addClass(
                                        "fly-checkbox-checked");
                                    $(".fly-children .fly-checkbox",
                                        treeitem)
                                        .removeClass(
                                            "fly-checkbox-incomplete fly-checkbox-unchecked"
                                    )
                                        .addClass(
                                            "fly-checkbox-checked");
                                    self._trigger('onCheck', e, [{
                                            data: treenodedata,
                                            target: treeitem[0]
                                        },
                                        true
                                    ]);
                                }
                                self._setParentCheckboxStatus(
                                    treeitem);
                            } else {
                                //状态：未选中
                                if ($(obj).hasClass(
                                    "fly-checkbox-unchecked")) {
                                    $(obj).removeClass(
                                        "fly-checkbox-unchecked").addClass(
                                        "fly-checkbox-checked");
                                    //是否单选
                                    if (p.single) {
                                        $(".fly-checkbox", self.tree)
                                            .not(obj).removeClass(
                                                "fly-checkbox-checked"
                                        ).addClass(
                                            "fly-checkbox-unchecked"
                                        );
                                    }
                                    self._trigger('onCheck', e, [{
                                            data: treenodedata,
                                            target: treeitem[0]
                                        },
                                        true
                                    ]);
                                }
                                //状态：选中
                                else if ($(obj).hasClass(
                                    "fly-checkbox-checked")) {
                                    $(obj).removeClass(
                                        "fly-checkbox-checked").addClass(
                                        "fly-checkbox-unchecked");
                                    self._trigger('onCheck', e, [{
                                            data: treenodedata,
                                            target: treeitem[0]
                                        },
                                        false
                                    ]);
                                }
                            }
                        }
                        //状态：已经张开
                        else if (treeitembtn.hasClass(
                            "fly-expandable-open") && (!p.btnClickToToggleOnly ||
                            clickOnTreeItemBtn)) {
                            if (self._trigger('onBbeforeCollapse',
                                e, [{
                                    data: treenodedata,
                                    target: treeitem[0]
                                }]) == false)
                                return false;
                            treeitembtn.removeClass(
                                "fly-expandable-open").addClass(
                                "fly-expandable-close");
                            if (p.slide)
                                $("> .fly-children", treeitem).slideToggle(
                                    'fast');
                            else
                                $("> .fly-children", treeitem).hide();
                            $("> div ." + self._getParentNodeClassName(
                                true), treeitem)
                                .removeClass(self._getParentNodeClassName(
                                    true))
                                .addClass(self._getParentNodeClassName());
                            self._trigger('onCollapse', e, [{
                                data: treenodedata,
                                target: treeitem[0]
                            }]);
                        }
                        //状态：没有张开
                        else if (treeitembtn.hasClass(
                            "fly-expandable-close") && (!p.btnClickToToggleOnly ||
                            clickOnTreeItemBtn)) {
                            if (self._trigger('onBeforeExpand', e, [{
                                data: treenodedata,
                                target: treeitem[0]
                            }]) == false)
                                return false;

                            $(self.toggleNodeCallbacks).each(
                                function() {
                                    if (this.data == treenodedata) {
                                        this.callback(treeitem[0],
                                            treenodedata);
                                    }
                                });
                            treeitembtn.removeClass(
                                "fly-expandable-close").addClass(
                                "fly-expandable-open");
                            var callback = function() {
                                self._trigger('onExpand', e, [{
                                    data: treenodedata,
                                    target: treeitem[0]
                                }]);
                            };
                            if (p.slide) {
                                $("> .fly-children", treeitem).slideToggle(
                                    'fast',
                                    callback);
                            } else {
                                $("> .fly-children", treeitem).show();
                                callback();
                            }
                            $("> div ." + self._getParentNodeClassName(),
                                treeitem)
                                .removeClass(self._getParentNodeClassName())
                                .addClass(self._getParentNodeClassName(
                                    true));
                        }
                        self._trigger('onClick', e, [{
                            data: treenodedata,
                            target: treeitem[0]
                        }]);
                    });
                },
                //递归设置父节点的状态
                _setParentCheckboxStatus: function(treeitem) {
                    var self = this,
                        p = this.options;
                    //当前同级别或低级别的节点是否都选中了
                    var isCheckedComplete = $(".fly-checkbox-unchecked",
                            treeitem.parent())
                        .length == 0;
                    //当前同级别或低级别的节点是否都没有选中
                    var isCheckedNull = $(".fly-checkbox-checked",
                            treeitem.parent()).length ==
                        0;
                    if (isCheckedComplete) {
                        treeitem.parent().prev().find(".fly-checkbox")
                            .removeClass(
                                "fly-checkbox-unchecked fly-checkbox-incomplete"
                        )
                            .addClass("fly-checkbox-checked");
                    } else if (isCheckedNull) {
                        treeitem.parent().prev().find("> .fly-checkbox")
                            .removeClass(
                                "fly-checkbox-checked fly-checkbox-incomplete"
                        )
                            .addClass("fly-checkbox-unchecked");
                    } else {
                        treeitem.parent().prev().find("> .fly-checkbox")
                            .removeClass(
                                "fly-checkbox-unchecked fly-checkbox-checked"
                        )
                            .addClass("fly-checkbox-incomplete");
                    }
                    if (treeitem.parent().parent("li").length > 0)
                        self._setParentCheckboxStatus(treeitem.parent()
                            .parent("li"));
                },

                _strTrim: function(str) {
                    if (!str) return str;
                    return str.replace(/(^\s*)|(\s*$)/g, '');
                }
            });

            UI.ready(function(context) {
                $('[data-fly-tree]', context).each(function() {
                    var $this = $(this);
                    var opts = $this.data('flyOptions');
                    if (opts == 'this.text') {
                        opts = $this.text();
                        $this.text('');
                    }
                    $this.tree(UI.utils.parseOptions(opts));
                });
            });

            module.exports = UI.combobox;
        }, {
            "./core": 5,
            "./ui.widget": 31,
            "./underscore": 32
        }
    ],
    26: [
        function(require, module, exports) {
            'use strict';

            var UI = require('./core');

            UI.cookie = {

                /**
                 *  设置cookie
                 *  @param name 名称
                 *  @param value 值
                 *  @param expires 过期时间
                 */
                setCookie: function(name, value, expires) {
                    var exp = new Date();

                    var argLen = arguments.length;
                    var expires = (argLen > 2) ? arguments[2] : null;
                    var path = (argLen > 3) ? arguments[3] : null;
                    var domain = (argLen > 4) ? arguments[4] : null;
                    var secure = (argLen > 5) ? arguments[5] : false;
                    if (expires) {
                        exp.setTime(exp.getTime() + this.formatExpires(
                            expires));
                    }
                    document.cookie = name + "=" + escape(value) + ((
                        expires == null) ? "" : ("; expires=" + exp.toGMTString())) +
                        ((path == null) ? "" : ("; path=" + path)) + ((
                        domain == null) ? "" : ("; domain=" + domain)) + ((
                        secure == true) ? "; secure" : "");
                },

                /**
                 *  获取cookie
                 *  @param name 名称
                 *  @return 对应值
                 */
                getCookie: function(name) {
                    if (document.cookie.length > 0) {
                        var start = document.cookie.indexOf(name + "=")
                        if (start > -1) {
                            start = start + name.length + 1;
                            var end = document.cookie.indexOf(";", start);
                            if (end == -1) {
                                end = document.cookie.length;
                            }
                            return unescape(document.cookie.substring(start,
                                end));
                        }
                    }
                    return "";
                },

                /**
                 *  删除cookie
                 *  @param name 名称
                 */
                delCookie: function(name) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1000);
                    var cval = this.getCookie(name);
                    if (cval && cval != "") {
                        document.cookie = name + "=" + cval + ";expires=" +
                            exp.toGMTString();
                    }
                },

                /**
                 *  格式化时间字符串
                 *  @param str 时间字符串，最后一位s-秒, h-时, d-天
                 *  @return 对应值
                 */
                formatExpires: function(str) {
                    if (/^[0-9]*$/.test(str)) {
                        return str * 1000;
                    }
                    var len = str.length;
                    var format = str.substring(len - 1, len);
                    var time = str.substring(0, len - 1) * 1;
                    switch (format) {
                        case "s":
                            return time * 1000;
                        case "h":
                            return time * 60 * 60 * 1000;
                        case "d":
                            return time * 24 * 60 * 60 * 1000;

                    }
                    return time;
                }
            };

            module.exports = UI.cookie;
        }, {
            "./core": 5
        }
    ],
    27: [
        function(require, module, exports) {
            'use strict';

            var UI = require('./core');

            UI.dateformat = {
                /**
                 * yyyy-MM-dd HH:mm:ss
                 */
                FORMAT_NORMAL: "yyyy-MM-dd hh:mm:ss",

                /**
                 * yyyy-MM-dd
                 */
                FORMAT_SHORT: "yyyy-MM-dd",

                /**
                 * yyyyMMddhhmmss
                 */
                FORMAT_NO_SIGN: "yyyyMMddhhmmss",

                /**
                 *  时间格式化
                 *  @param date 时间
                 *  @param format 格式
                 *  @return 格式化时间
                 */
                format: function(date, format) {
                    var nd = new Date(date);

                    var o = {
                        "M+": nd.getMonth() + 1, // month
                        "d+": nd.getDate(), // day
                        "h+": nd.getHours(), // hour
                        "m+": nd.getMinutes(), // minute
                        "s+": nd.getSeconds(), // second
                        "q+": Math.floor((nd.getMonth() + 3) / 3), // quarter
                        "S": nd.getMilliseconds()
                    };

                    if (/(y+)/.test(format)) {
                        format = format.replace(RegExp.$1, (nd.getFullYear() +
                            "").substr(4 - RegExp.$1.length));
                    }

                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1, RegExp.$1.length ==
                                1 ? o[k] : ("00" + o[k]).substr(("" + o[k])
                                    .length));
                        }
                    }
                    return format;
                },

                /**
                 *  解析时间字符串
                 *  @param str 时间字符串
                 *  @param format 解析格式
                 *  @return 时间对象
                 */
                parseDateComplex: function(str, format) {
                    var nd = new Date();
                    var realDate = "yyyy/MM/dd hh:mm:ss";
                    var o = {
                        "M+": nd.getMonth() + 1, // month
                        "d+": nd.getDate(), // day
                        "h+": 0, // hour
                        "m+": 0, // minute
                        "s+": 0 // second
                    };

                    var index = format.search(/(y+)/);
                    if (index > -1) {
                        var len = RegExp.$1.length;
                        var year = (nd.getFullYear() + "").substr(0, 4 -
                            len) + str.substr(index, len);
                        realDate = realDate.replace(/(y+)/, year);
                    }

                    for (var k in o) {
                        var reg = new RegExp("(" + k + ")");
                        var regIndex = format.search(reg);
                        var ret = "";
                        if (regIndex > -1) {
                            ret = str.substr(regIndex, RegExp.$1.length);
                        } else {
                            ret = o[k] + "";
                        }
                        ret = ("00" + ret).substr(ret.length);
                        realDate = realDate.replace(reg, ret);
                    }
                    return new Date(realDate);
                },

                /**
                 *  解析时间字符串(简化版)
                 *  @param str 简化时间字符串
                 *  @return 时间对象
                 */
                parseDate: function(str) {
                    if (arguments.length == 2) {
                        return this.parseDateComplex(arguments[0],
                            arguments[1]);
                    }
                    if (str && str != "") {
                        var st = str.substring(0, 4) + "/" + str.substring(
                                4, 6) + "/" + str.substring(6, 8) + " " +
                            str.substring(8, 10) + ":" + str.substring(10,
                                12) + ":" + str.substring(12, 14);
                        return new Date(st);
                    }
                },

                /**
                 *  改变时间格式
                 *  @param str 时间字符串
                 *  @param fromFmt 当前时间格式
                 *  @param toFmt 变化后时间格式
                 *  @return  变化格式后时间字符串
                 */
                formatDateComplex: function(str, fromFmt, toFmt) {
                    return this.format(this.parseDateComplex(str, fromFmt),
                        toFmt);
                },

                /**
                 *  改变时间格式(简化版)
                 *  @param str 简化时间字符串
                 *  @param toFmt 变化后时间格式
                 *  @return 格式化时间
                 */
                formatDate: function(str, toFmt) {
                    if (arguments.length == 3) {
                        return this.formatDateComplex(arguments[0],
                            arguments[1], arguments[2]);
                    }
                    return this.format(this.parseDate(str), toFmt);
                },

                /**
                 *  短时间格式
                 *  @param str 标准时间字符串
                 *  @return 简化时间字符串
                 */
                dateToShortStr: function(str) {
                    return str.replace(/[\s\-\:]/g, "");
                },

                /**
                 *  开始时间格式
                 *  @param str 时间字符串
                 *  @return 开始时间字符串
                 */
                dateToStartStr: function(str) {
                    var ret = this.dateToShortStr(str) + "000000";
                    return ret;
                },

                /**
                 *  结束时间格式
                 *  @param str 时间字符串
                 *  @return 结束时间字符串
                 */
                dateToEndStr: function(str) {
                    var ret = this.dateToShortStr(str) + "235959";
                    return ret;
                },

                /**
                 *  时间增加天数
                 *  @param date 时间
                 *  @param days 增加天数
                 *  @return 增加天数后时间
                 */
                addDayToDate: function(date, days) {
                    var nd = new Date(date);
                    nd.setDate(nd.getDate() + days);
                    return nd;
                },

                /**
                 *  时间增加小时
                 *  @param date 时间
                 *  @param hours 增加小时数
                 *  @return 增加小时后时间
                 */
                addHoursToDate: function(date, hours) {
                    var nd = new Date(date);
                    nd.setHours(nd.getHours() + parseInt(hours));
                    return nd;
                },

                /**
                 *  计算两个时间的天数差
                 *  @param d1 时间1
                 *  @param d2 时间2
                 *  @return 天数差
                 */
                dateDiff: function(d1, d2) {
                    var time = d2.getTime() - d1.getTime();
                    var days = parseInt(time / (1000 * 60 * 60 * 24));
                    return days;
                }
            };

            module.exports = UI.dateformat;
        }, {
            "./core": 5
        }
    ],
    28: [
        function(require, module, exports) {
            'use strict';

            var UI = require('./core');

            var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;

            var _meta = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

            UI.json = {
                /** jQuery.toJSON( json-serializble )
    Converts the given argument into a JSON respresentation.

    If an object has a "toJSON" function, that will be used to get the representation.
    Non-integer/string keys are skipped in the object, as are keys that point to a function.

    json-serializble:
    The *thing* to be converted.
    **/
                toJSON: function(o) {
                    if (typeof(JSON) == 'object' && JSON.stringify) {
                        var json = JSON.stringify(o);
                        //by jnx:过滤转批过程中空字符变成null字符
                        return json.replace(/null/gi, "null");
                    }
                    var type = typeof(o);

                    if (o === null)
                        return "null";

                    if (type == "undefined")
                        return undefined;

                    if (type == "number" || type == "boolean")
                        return o + "";

                    if (type == "string")
                        return $.quoteString(o);

                    if (type == 'object') {
                        if (typeof o.toJSON == "function")
                            return $.toJSON(o.toJSON());

                        if (o.constructor === Date) {
                            var month = o.getUTCMonth() + 1;
                            if (month < 10) month = '0' + month;

                            var day = o.getUTCDate();
                            if (day < 10) day = '0' + day;

                            var year = o.getUTCFullYear();

                            var hours = o.getUTCHours();
                            if (hours < 10) hours = '0' + hours;

                            var minutes = o.getUTCMinutes();
                            if (minutes < 10) minutes = '0' + minutes;

                            var seconds = o.getUTCSeconds();
                            if (seconds < 10) seconds = '0' + seconds;

                            var milli = o.getUTCMilliseconds();
                            if (milli < 100) milli = '0' + milli;
                            if (milli < 10) milli = '0' + milli;

                            return '"' + year + '-' + month + '-' + day +
                                'T' +
                                hours + ':' + minutes + ':' + seconds +
                                '.' + milli + 'Z"';
                        }

                        if (o.constructor === Array) {
                            var ret = [];
                            for (var i = 0; i < o.length; i++)
                                ret.push($.toJSON(o[i]) || "");

                            return "[" + ret.join(",") + "]";
                        }

                        var pairs = [];
                        for (var k in o) {
                            var name;
                            var type = typeof k;

                            if (type == "number")
                                name = '"' + k + '"';
                            else if (type == "string")
                                name = $.quoteString(k);
                            else
                                continue; //skip non-string or number keys

                            if (typeof o[k] == "function")
                                continue; //skip pairs where the value is a function.

                            var val = $.toJSON(o[k]);

                            pairs.push(name + ":" + val);
                        }

                        return "{" + pairs.join(", ") + "}";
                    }
                },

                /** jQuery.evalJSON(src)
    Evaluates a given piece of json source.
    **/
                evalJSON: function(src) {
                    if (typeof(JSON) == 'object' && JSON.parse)
                        return JSON.parse(src);
                    return eval("(" + src + ")");
                },

                /** jQuery.secureEvalJSON(src)
    Evals JSON in a way that is *more* secure.
    **/
                secureEvalJSON: function(src) {
                    if (typeof(JSON) == 'object' && JSON.parse)
                        return JSON.parse(src);

                    var filtered = src;
                    filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
                    filtered = filtered.replace(
                        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        ']');
                    filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

                    if (/^[\],:{}\s]*$/.test(filtered))
                        return eval("(" + src + ")");
                    else
                        throw new SyntaxError(
                            "Error parsing JSON, source is not valid.");
                },

                /** jQuery.quoteString(string)
    Returns a string-repr of a string, escaping quotes intelligently.  
    Mostly a support function for toJSON.

    Examples:
    >>> jQuery.quoteString("apple")
    "apple"

    >>> jQuery.quoteString('"Where are we going?", she asked.')
    "\"Where are we going?\", she asked."
    **/
                quoteString: function(string) {
                    if (string.match(_escapeable)) {
                        return '"' + string.replace(_escapeable, function(a) {
                            var c = _meta[a];
                            if (typeof c === 'string') return c;
                            c = a.charCodeAt();
                            return '\\u00' + Math.floor(c / 16).toString(
                                16) + (c % 16).toString(16);
                        }) + '"';
                    }
                    return '"' + string + '"';
                }
            };

            module.exports = UI.json;
        }, {
            "./core": 5
        }
    ],
    29: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');
            require('./ui.dateformat');

            /*!
             * Tempo Template Engine 2.1
             *
             * http://tempojs.com/
             */
            function TempoEvent(type, item, element) {
                'use strict';
                this.type = type;
                this.item = item;
                this.element = element;

                return this;
            }

            TempoEvent.Types = {
                RENDER_STARTING: 'render_starting',
                ITEM_RENDER_STARTING: 'item_render_starting',
                ITEM_RENDER_COMPLETE: 'item_render_complete',
                RENDER_COMPLETE: 'render_complete',
                BEFORE_CLEAR: 'before_clear',
                AFTER_CLEAR: 'after_clear'
            };


            var Tempo = (function(tempo) {
                'use strict';

                /*!
                 * Constants
                 */
                var NUMBER_FORMAT_REGEX = /(\d+)(\d{3})/;


                var _window;


                /*!
                 * Helpers
                 */
                var utils = {
                    memberRegex: function(obj) {
                        var member_regex = '(';
                        for (var member in obj) {
                            if (obj.hasOwnProperty(member)) {
                                if (member_regex.length > 1) {
                                    member_regex += '|';
                                }
                                member_regex += member;
                            }
                        }
                        return member_regex + ')[\\.]?' +
                            '(?!\\w)';
                    },

                    pad: function(val, pad, size) {
                        while (val.length < size) {
                            val = pad + val;
                        }
                        return val;
                    },

                    trim: function(str) {
                        return str.replace(/^\s*([\S\s]*?)\s*$/,
                            '$1');
                    },

                    startsWith: function(str, prefix) {
                        return (str.indexOf(prefix) === 0);
                    },

                    clearContainer: function(el) {
                        if (el !== null && el !== undefined &&
                            el.childNodes !== undefined) {
                            for (var i = el.childNodes.length -
                                1; i >= 0; i--) {
                                if (el.childNodes[i] !==
                                    undefined && el.childNodes[
                                        i].getAttribute !==
                                    undefined && (el.childNodes[
                                            i].getAttribute(
                                            'data-template') !==
                                        null || el.childNodes[i]
                                        .getAttribute(
                                            'data-template-for'
                                        ) !== null)) {
                                    el.childNodes[i].parentNode
                                        .removeChild(el.childNodes[
                                            i]);
                                }
                            }
                        }
                    },

                    isNested: function(el) {
                        var p = el.parentNode;
                        while (p) {
                            if (this.hasAttr(p, 'data-template') ||
                                this.hasAttr(p,
                                    'data-template-for')) {
                                return true;
                            }
                            p = p.parentNode;
                        }
                        return false;
                    },

                    equalsIgnoreCase: function(str1, str2) {
                        return str1.toLowerCase() === str2.toLowerCase();
                    },

                    getElement: function(template, html) {
                        if (navigator.appVersion.indexOf("MSIE") >
                            -1 && utils.equalsIgnoreCase(
                                template.tagName, 'tr')) {
                            // Wrapping to get around read-only innerHTML
                            var el = _window.document.createElement(
                                'div');
                            el.innerHTML = '<table><tbody>' +
                                html + '</tbody></table>';
                            var depth = 3;
                            while (depth--) {
                                el = el.lastChild;
                            }
                            el.setAttribute('data-template', '');
                            return el;
                        } else {
                            // No need to wrap
                            template.innerHTML = html;
                            return template;
                        }
                    },

                    typeOf: function(obj) {
                        if (typeof(obj) === "object") {
                            if (obj === null) {
                                return "null";
                            }
                            if (obj.constructor === ([]).constructor) {
                                return "array";
                            }
                            if (obj.constructor === (new Date())
                                .constructor) {
                                return "date";
                            }
                            if (obj.constructor === (new RegExp())
                                .constructor) {
                                return "regex";
                            }
                            if (typeof HTMLElement === "object" ?
                                obj instanceof HTMLElement :
                                obj && typeof obj === "object" &&
                                obj.nodeType === 1 && typeof obj
                                .nodeName === "string") {
                                return 'element';
                            }
                            if (typeof jQuery !== 'undefined' &&
                                obj instanceof jQuery) {
                                return 'jquery';
                            }
                            return "object";
                        }
                        return typeof(obj);
                    },

                    hasAttr: function(el, name) {
                        if (el !== undefined) {
                            if (el.hasAttribute !== undefined) {
                                return el.hasAttribute(name);
                            } else if (el.getAttribute !==
                                undefined) {
                                return el.getAttribute(name) !==
                                    null;
                            }
                        }

                        return false;
                    },

                    removeAttr: function(el, name) {
                        if (el !== undefined) {
                            el.setAttribute(name, '');
                            //                if (el.removeAttribute) {
                            //                    el.removeAttribute(name);
                            //                }
                        }
                    },

                    merge: function(obj1, obj2) {
                        var obj3 = {};

                        for (var attr1 in obj1) {
                            if (obj1.hasOwnProperty(attr1)) {
                                obj3[attr1] = obj1[attr1];
                            }
                        }

                        for (var attr2 in obj2) {
                            if (obj2.hasOwnProperty(attr2)) {
                                obj3[attr2] = obj2[attr2];
                            }
                        }
                        return obj3;
                    },
                    notify: function(listener, event) {
                        if (listener !== undefined && listener.length >
                            0) {
                            for (var i = 0; i < listener.length; i++) {
                                if (event.type === listener[i].type) {
                                    listener[i].listener(event);
                                }
                            }
                        }
                    },
                    container: function(container) {
                        if (utils.typeOf(container) ===
                            'string') {
                            if (container === '*') {
                                container = _window.document.getElementsByTagName(
                                    'html')[0];
                            } else {
                                container = _window.document.getElementById(
                                    container);
                            }
                        } else if (utils.typeOf(container) ===
                            'jquery' && container.length > 0) {
                            container = container[0];
                        }

                        return container;
                    },
                    arrayContains: function(array, obj) {
                        if (!Array.prototype.indexOf) {
                            for (var i = 0; i < this.length; i++) {
                                if (this[i] === obj) {
                                    return true;
                                }
                            }
                            return false;
                        } else {
                            return array.indexOf(obj) > -1;
                        }
                    }
                };

                function Templates(params, nestedItem) {
                    this.params = params;
                    this.defaultTemplate = null;
                    this.namedTemplates = {};
                    this.container = null;

                    this.nestedItem = nestedItem !== undefined ?
                        nestedItem : null;

                    this.escape = true;
                    this.var_brace_left = '\\{\\{';
                    this.var_brace_right = '\\}\\}';
                    this.tag_brace_left = '\\{%';
                    this.tag_brace_right = '%\\}';

                    this.dataIsMap = false;

                    this.attributes = {};

                    if (typeof params !== 'undefined') {
                        for (var prop in params) {
                            if (prop === 'var_braces') {
                                this.var_brace_left = params[prop].substring(
                                    0, params[prop].length / 2);
                                this.var_brace_right = params[prop]
                                    .substring(params[prop].length /
                                        2);
                            } else if (prop === 'tag_braces') {
                                this.tag_brace_left = params[prop].substring(
                                    0, params[prop].length / 2);
                                this.tag_brace_right = params[prop]
                                    .substring(params[prop].length /
                                        2);
                            } else if (typeof this[prop] !==
                                'undefined') {
                                this[prop] = params[prop];
                            }
                        }
                    }

                    return this;
                }

                Templates.prototype = {
                    load: function(file, callback) {
                        function contents(iframe) {
                            return iframe.contentWindow ? iframe.contentWindow
                                .document.documentElement.innerHTML :
                                iframe.contentDocument ? iframe.contentDocument
                                .body.innerHTML : iframe.document.body
                                .innerHTML;
                        }

                        if (_window.document.getElementById(file) !==
                            null) {
                            callback(contents(_window.document.getElementById(
                                file)));
                        } else {
                            var el = _window.document.createElement(
                                'iframe');
                            el.id = file;
                            el.name = file;
                            el.style.height = 0;
                            el.style.width = 0;
                            el.src = file;

                            if (el.attachEvent) {
                                el.attachEvent('onload', function() {
                                    callback(contents(el));
                                });
                            } else {
                                el.onload = function() {
                                    callback(contents(el));
                                };
                            }

                            _window.document.body.appendChild(el);
                        }
                    },
                    _insertTemplate: function(child, templates,
                        container, callback) {
                        return function(el) {
                            utils.removeAttr(child,
                                'data-template-file');
                            child.innerHTML = el;
                            templates.parse(container, callback);
                        };
                    },

                    parse: function(container, callback) {
                        this.container = container;
                        var children = container.getElementsByTagName(
                            '*');

                        var ready = true;

                        // Preprocessing for referenced templates
                        for (var i = 0; i < children.length; i++) {
                            if (ready === true && callback !==
                                undefined && utils.hasAttr(children[
                                    i], 'data-template-file')) {
                                var child = children[i];
                                if (child.getAttribute(
                                        'data-template-file').length >
                                    0) {
                                    var templates = this;
                                    ready = false;

                                    this.load(child.getAttribute(
                                            'data-template-file'),
                                        this._insertTemplate(child,
                                            templates, container,
                                            callback));
                                }
                            } else if (utils.hasAttr(children[i],
                                'data-template-fallback')) {
                                // Hiding the fallback template
                                children[i].style.display = 'none';
                            }
                        }

                        // Parsing
                        if (ready) {
                            var foundTemplates = {};
                            for (var s = 0; s < children.length; s++) {
                                if (children[s].getAttribute !==
                                    undefined) {
                                    if (utils.hasAttr(children[s],
                                            'data-template-for') &&
                                        children[s].getAttribute(
                                            'data-template-for').length >
                                        0 && this.nestedItem ===
                                        children[s].getAttribute(
                                            'data-template-for') &&
                                        !foundTemplates[this.nestedItem]
                                    ) {
                                        // Nested template
                                        this.createTemplate(
                                            children[s]);
                                        // Guards against recursion when child template has same name!
                                        foundTemplates[this.nestedItem] =
                                            true;
                                    } else if (utils.hasAttr(
                                            children[s],
                                            'data-template') && !
                                        utils.isNested(children[s])
                                    ) {
                                        // Normal template
                                        this.createTemplate(
                                            children[s]);
                                    }
                                }
                            }

                            // If there is no default template (data-template) then create one from container
                            //                if (this.defaultTemplate === null) {
                            //                    this.createTemplate(container);
                            //                }

                            utils.clearContainer(this.container);
                            if (callback !== undefined) {
                                callback(this);
                            }
                        }
                    },

                    createTemplate: function(node) {
                        var element = node.cloneNode(true);

                        // Clear display: none;
                        if (element.style.removeAttribute) {
                            element.style.removeAttribute('display');
                        } else if (element.style.removeProperty) {
                            element.style.removeProperty('display');
                        } else {
                            element.style.display = 'block';
                        }

                        // Remapping container element in case template
                        // is deep in container
                        this.container = node.parentNode;

                        // Element is a template
                        var nonDefault = false;
                        for (var a = 0; a < element.attributes.length; a++) {
                            var attr = element.attributes[a];
                            // If attribute
                            if (utils.startsWith(attr.name,
                                'data-if-')) {
                                var val;
                                if (attr.value === '') {
                                    val = true;
                                } else if (attr.value === 'null') {
                                    val = null;
                                } else {
                                    val = '\'' + attr.value + '\'';
                                }
                                this.namedTemplates[attr.name.substring(
                                        8, attr.name.length) + '==' +
                                    val] = element;
                                utils.removeAttr(element, attr.name);
                                nonDefault = true;
                            } else if (attr.name === 'data-has') {
                                this.namedTemplates[attr.value +
                                    '!==undefined'] = element;
                                utils.removeAttr(element, attr.name);
                                nonDefault = true;
                            } else if (attr.name ===
                                'data-from-map') {
                                this.dataIsMap = true;
                            } else if (!utils.startsWith(attr.name,
                                'data-template') && utils.startsWith(
                                attr.name, 'data-')) {
                                // Treat as an attribute for template
                                this.attributes[attr.name.substring(
                                    5, attr.name.length)] = attr.value;
                            }
                        }
                        // Setting as default template, last one wins
                        if (!nonDefault) {
                            this.defaultTemplate = element;
                        }
                    },

                    templateFor: function(i) {
                        for (var templateName in this.namedTemplates) {
                            if (eval('i.' + templateName)) {
                                return this.namedTemplates[
                                    templateName].cloneNode(
                                    true);
                            }
                        }
                        if (this.defaultTemplate) {
                            return this.defaultTemplate.cloneNode(
                                true);
                        }
                    }
                };


                /*!
                 * Renderer for populating containers with data using templates.
                 */
                function Renderer(templates) {
                    this.templates = templates;
                    this.listener = [];
                    this.started = false;
                    this.varRegex = new RegExp(this.templates.var_brace_left +
                        '[ ]?([A-Za-z0-9$\\._\\[\\]]*?)([ ]?\\|[ ]?.*?)?[ ]?' +
                        this.templates.var_brace_right, 'g');
                    this.tagRegex = new RegExp(this.templates.tag_brace_left +
                        '[ ]?([\\s\\S]*?)( [\\s\\S]*?)?[ ]?' + this
                        .templates.tag_brace_right +
                        '(([\\s\\S]*?)(?=' + this.templates.tag_brace_left +
                        '[ ]?end\\1[ ]?' + this.templates.tag_brace_right +
                        '))?', 'g');
                    this.filterSplitter = new RegExp('\\|[ ]?(?=' +
                        utils.memberRegex(this.filters) + ')', 'g');
                    this.errorHandler = null;
                    return this;
                }

                Renderer.prototype = {
                    when: function(type, listener) {
                        this.listener.push({
                            'type': type,
                            'listener': listener
                        });

                        return this;
                    },

                    _getValue: function(renderer, variable, i, t) {
                        var val = null;
                        // Handling tempo_info variable
                        if (utils.startsWith(variable, '_tempo.')) {
                            return eval('t.' + variable.substring(7,
                                variable.length));
                        }

                        if (variable === '.') {
                            val = eval('i');
                        } else if (variable === 'this' || variable.match(
                            /this[\\[\\.]/) !== null) {
                            val = eval('i' + variable.substring(4,
                                variable.length));
                        } else if (utils.typeOf(i) === 'array') {
                            val = eval('i' + variable);
                        } else {
                            val = eval('i.' + variable);
                        }

                        return val;
                    },

                    _replaceVariables: function(renderer, _tempo, i,
                        str) {
                        var self = this;
                        return str.replace(this.varRegex, function(
                            match, variable, args) {

                            try {
                                var val = renderer._getValue(
                                    renderer, variable,
                                    i, _tempo);
                                // Handle filters
                                if (args !== undefined &&
                                    args !== '') {
                                    var filters = utils.trim(
                                        utils.trim(args)
                                        .substring(1)).split(
                                        self.filterSplitter
                                    );
                                    for (var p = 0; p <
                                        filters.length; p++
                                    ) {
                                        var filter = utils.trim(
                                                filters[p]),
                                            filter_args, j =
                                            filter.indexOf(
                                                ' ');
                                        // If there is a space, there must be arguments
                                        if (~j) {
                                            filter_args =
                                                filter.substr(
                                                    j).replace(
                                                    /(^ *['"])|(['"] *$)/g,
                                                    '').split(
                                                    /['"] *, *['"]/
                                            );
                                            filter = filter
                                                .substr(0,
                                                    j);
                                        } else {
                                            filter_args = [];
                                        }
                                        val = renderer.filters[
                                            filter](val,
                                            filter_args);
                                    }
                                }

                                if (val !== undefined) {
                                    if (self.templates.escape) {
                                        val = self.filters.escape(
                                            val, {});
                                    }
                                    return val;
                                }
                            } catch (err) {
                                self._onError.call(self,
                                    err);
                            }

                            return '';
                        });
                    },

                    _replaceObjects: function(renderer, _tempo, i,
                        str, regex) {
                        return str.replace(regex, function(match,
                            variable, args) {
                            try {
                                var val = renderer._getValue(
                                    renderer, variable,
                                    i, _tempo);

                                if (val !== undefined) {
                                    if (utils.typeOf(val) ===
                                        'string') {
                                        return '\'' + val +
                                            '\'';
                                    } else {
                                        return val;
                                    }
                                }
                            } catch (err) {
                                self._onError.call(self,
                                    err);
                            }

                            return undefined;
                        });
                    },

                    _applyAttributeSetters: function(renderer, item,
                        str) {
                        // Adding a space in front of first part to make sure I don't get partial matches
                        return str.replace(
                            /(\b[A-z0-9]+?)(?:="[^"']*?"[^>]*?)data-\1="(.*?)"/g,
                            function(match, attr, data_value) {
                                if (data_value !== '') {
                                    return attr + '="' +
                                        data_value + '"';
                                }
                                return match;
                            });
                    },

                    _applyTags: function(renderer, item, str) {
                        return str.replace(this.tagRegex, function(
                            match, tag, args, body) {
                            if (renderer.tags.hasOwnProperty(
                                tag)) {
                                args = args.substring(args.indexOf(
                                    ' ')).replace(
                                    /^[ ]*|[ ]*$/g, '');
                                var filter_args = args.split(
                                    /(?:['"])[ ]?,[ ]?(?:['"])/
                                );
                                return renderer.tags[tag](
                                    renderer, item,
                                    match, filter_args,
                                    body);
                            } else {
                                return '';
                            }
                        });
                    },

                    starting: function(event) {
                        // Use this to manually fire the RENDER_STARTING event e.g. just before you issue an AJAX request
                        // Useful if you're not calling prepare immediately before render
                        this.started = true;
                        if (event === undefined) {
                            event = new TempoEvent(TempoEvent.Types
                                .RENDER_STARTING, undefined,
                                undefined);
                        }
                        utils.notify(this.listener, event);

                        return this;
                    },

                    _renderNestedItem: function(i, nested) {
                        var self = this;
                        return function(templates) {
                            var r = new Renderer(templates);
                            var data = null;

                            if (nested === '*' || i.hasOwnProperty(
                                nested.split('.')[0])) {
                                if (nested === '*') {
                                    data = i;
                                } else {
                                    data = eval('i.' + nested);
                                }

                                if (data) {
                                    try {
                                        if (utils.typeOf(data) ===
                                            'array') {
                                            for (var s = 0; s <
                                                data.length; s++
                                            ) {
                                                if (utils.typeOf(
                                                        data[s]
                                                    ) ===
                                                    'object') {
                                                    data[s]._parent =
                                                        function() {
                                                            return
                                                                i;
                                                    }()
                                                }
                                            }
                                        } else {
                                            data._parent =
                                                function() {
                                                    return i;
                                            }();
                                        }
                                    } catch (err) {
                                        self._onError.call(self,
                                            err);
                                    }
                                }
                            }
                            r.render(data);
                        };
                    },

                    renderItem: function(renderer, _tempo_info, i,
                        fragment) {
                        var memberRegex = new RegExp(
                            '(?:__[\\.]?)((_tempo|\\[|' + utils
                            .memberRegex(i) +
                            '|this)([A-Za-z0-9$\\._\\[\\]]+)?)',
                            'g');
                        var template = renderer.templates.templateFor(
                            i);
                        var tempo_info = utils.merge(_tempo_info,
                            renderer.templates.attributes);

                        // Clear attributes in case of recursive nesting (TODO: Probably need to clear more)
                        if (utils.hasAttr(template,
                            'data-template-for')) {
                            utils.removeAttr(template,
                                'data-template-for');
                        }
                        if (utils.hasAttr(template,
                            'data-template-file')) {
                            utils.removeAttr(template,
                                'data-template-file');
                        }

                        if (template && i) {
                            utils.notify(this.listener, new TempoEvent(
                                TempoEvent.Types.ITEM_RENDER_STARTING,
                                i, template));
                            var nestedDeclaration = template.innerHTML
                                .match(
                                    /data-template-for="([^"]+?)"/g
                                );
                            if (nestedDeclaration) {
                                for (var p = 0; p <
                                    nestedDeclaration.length; p++) {
                                    var nested = nestedDeclaration[
                                        p].match(
                                        /data-template-for="([^"]+?)"/
                                    );
                                    if (nested && nested[1]) {
                                        var t = new Templates(
                                            renderer.templates.params,
                                            nested[1]);
                                        try {
                                            t.parse(template, this._renderNestedItem(
                                                i, nested[1]));
                                        } catch (err) {
                                            this._onError.call(this,
                                                err);
                                        }
                                    }
                                }
                            }

                            // Processing template element attributes
                            for (var a = 0; a < template.attributes
                                .length; a++) {
                                var attr = template.attributes[a];
                                if (attr !== null && attr.specified &&
                                    attr.value !== null && attr.value
                                    .length > 0 && attr.name.match(
                                        /style|data-template.*/) ===
                                    null) {
                                    attr.value = this._applyTags(
                                        this, i, attr.value);
                                    attr.value = this._replaceVariables(
                                        this, tempo_info, i, attr.value
                                    );
                                }
                            }

                            // Dealing with HTML as a String from now on (to be reviewed)
                            // Attribute values are escaped in FireFox so making sure there are no escaped tags
                            var html = template.innerHTML.replace(
                                /%7B%7B/g, '{{').replace(
                                /%7D%7D/g, '}}');

                            // Tags
                            html = this._applyTags(this, i, html);

                            // Content
                            html = this._replaceVariables(this,
                                tempo_info, i, html);

                            // JavaScript objects
                            html = this._replaceObjects(this,
                                tempo_info, i, html, memberRegex);

                            html = this._applyAttributeSetters(this,
                                i, html);

                            fragment.appendChild(utils.getElement(
                                template, html));

                            utils.notify(this.listener, new TempoEvent(
                                TempoEvent.Types.ITEM_RENDER_COMPLETE,
                                i, template));
                        }
                    },

                    _createFragment: function(data) {
                        if (data) {
                            var tempo_info = {};
                            var fragment = _window.document.createDocumentFragment();

                            // If object then wrapping in an array
                            if (utils.typeOf(data) === 'object') {
                                if (this.templates.dataIsMap) {
                                    var mapped = [];
                                    for (var member in data) {
                                        if (data.hasOwnProperty(
                                                member) && member !==
                                            '_parent') {
                                            var pair = {};
                                            pair.key = member;
                                            pair.value = data[
                                                member];
                                            mapped.push(pair);
                                        }
                                    }
                                    data = mapped;
                                } else {
                                    data = [data];
                                }
                            }

                            for (var i = 0; i < data.length; i++) {
                                tempo_info.index = i;
                                tempo_info.first = i < 1;
                                tempo_info.last = i == data.length -
                                    1;
                                this.renderItem(this, tempo_info,
                                    data[i], fragment);
                            }

                            return fragment;
                        }

                        return null;
                    },

                    into: function(target) {
                        if (target !== undefined) {
                            this.templates.container = utils.container(
                                target);
                        }

                        return this;
                    },

                    render: function(data) {
                        // Check if starting event was manually fired
                        if (!this.started) {
                            this.starting(new TempoEvent(TempoEvent
                                .Types.RENDER_STARTING, data,
                                this.templates.container));
                        }

                        this.clear();
                        this.append(data);

                        return this;
                    },

                    append: function(data) {
                        // Check if starting event was manually fired
                        if (!this.started) {
                            this.starting(new TempoEvent(TempoEvent
                                .Types.RENDER_STARTING, data,
                                this.templates.container));
                        }

                        var fragment = this._createFragment(data);
                        if (fragment !== null && this.templates.container !==
                            null) {
                            if (fragment !== null) {
                                var ref = null;
                                for (var i = this.templates.container
                                    .childNodes.length; i >= 0; i--) {

                                    if (this.templates.container.childNodes[
                                            i] !== undefined &&
                                        this.templates.container.childNodes[
                                            i].getAttribute !==
                                        undefined && this.templates
                                        .container.childNodes[i].getAttribute(
                                            'data-after-template') !==
                                        null) {
                                        ref = this.templates.container
                                            .childNodes[i];
                                    }
                                }
                                if (ref === null) {
                                    ref = this.templates.container.lastChild;
                                }
                                if (ref !== null) {
                                    this.templates.container.insertBefore(
                                        fragment, ref);
                                } else {
                                    this.templates.container.appendChild(
                                        fragment);
                                }
                            }
                        }

                        utils.notify(this.listener, new TempoEvent(
                            TempoEvent.Types.RENDER_COMPLETE,
                            data, this.templates.container));

                        return this;
                    },

                    prepend: function(data) {
                        // Check if starting event was manually fired
                        if (!this.started) {
                            this.starting(new TempoEvent(TempoEvent
                                .Types.RENDER_STARTING, data,
                                this.templates.container));
                        }

                        var fragment = this._createFragment(data);
                        if (fragment !== null) {
                            var ref = null;
                            for (var i = 0; i < this.templates.container
                                .childNodes.length; i++) {
                                if (this.templates.container.childNodes[
                                        i] !== undefined && this.templates
                                    .container.childNodes[i].getAttribute !==
                                    undefined && this.templates.container
                                    .childNodes[i].getAttribute(
                                        'data-before-template') !==
                                    null) {
                                    ref = this.templates.container.childNodes[
                                        i];
                                }
                            }
                            if (ref === null) {
                                ref = this.templates.container.firstChild;
                            }
                            if (ref !== null) {
                                if (ref.nextSibling !== null && ref
                                    .getAttribute && ref.getAttribute(
                                        'data-before-template') !==
                                    null) {
                                    ref = ref.nextSibling;
                                }
                                this.templates.container.insertBefore(
                                    fragment, ref);
                            } else {
                                this.templates.container.appendChild(
                                    fragment);
                            }
                        }

                        utils.notify(this.listener, new TempoEvent(
                            TempoEvent.Types.RENDER_COMPLETE,
                            data, this.templates.container));

                        return this;
                    },

                    errors: function(errorHandler) {
                        this.errorHandler = errorHandler;
                        return this;
                    },

                    _onError: function(err) {
                        if (this.errorHandler !== null) {
                            this.errorHandler.call(this, err);
                        }
                    },

                    clear: function() {
                        utils.notify(this.listener, new TempoEvent(
                            TempoEvent.Types.BEFORE_CLEAR, {},
                            this.templates.container));
                        utils.clearContainer(this.templates.container);
                        utils.notify(this.listener, new TempoEvent(
                            TempoEvent.Types.AFTER_CLEAR, {},
                            this.templates.container));
                    },

                    tags: {
                        'if': function(renderer, i, match, args,
                            body) {
                            var member_regex = utils.memberRegex(i);

                            var expr = args[0].replace(/&amp;/g,
                                '&').replace(/&gt;/g, '>').replace(
                                /&lt;/g, '<');
                            expr = expr.replace(new RegExp(
                                member_regex, 'gi'), function(
                                match) {
                                return 'i.' + match;
                            });

                            var blockRegex = new RegExp(renderer.templates
                                .tag_brace_left +
                                '[ ]?else[ ]?' + renderer.templates
                                .tag_brace_right, 'g');
                            var blocks = body.split(blockRegex);

                            if (eval(expr)) {
                                return blocks[0];
                            } else if (blocks.length > 1) {
                                return blocks[1];
                            }

                            return '';
                        }
                    },

                    filters: {
                        'escape': function(value, args) {
                            return value.toString().replace(
                                /[&<>]/g, function(c) {
                                    return {
                                        '&': '&amp;',
                                        '<': '&lt;',
                                        '>': '&gt;'
                                    }[c] || c;
                                });
                        },
                        'encodeURI': function(value, args) {
                            return encodeURI(value.toString());
                        },
                        'decodeURI': function(value, args) {
                            return decodeURI(value.toString());
                        },
                        'truncate': function(value, args) {
                            if (value !== undefined) {
                                var len = 0;
                                var rep = '...';
                                if (args.length > 0) {
                                    len = parseInt(args[0], 10);
                                }
                                if (args.length > 1) {
                                    rep = args[1];
                                }
                                if (value.length > len - 3) {
                                    return value.substr(0, len - 3) +
                                        rep;
                                }
                                return value;
                            }
                        },
                        'format': function(value, args) {
                            if (value !== undefined) {
                                if (args.length === 1) {
                                    value = parseFloat(value + '').toFixed(
                                        parseInt(args[0], 10));
                                }
                                var x = (value + '').split('.');
                                var x1 = x[0];
                                var x2 = x.length > 1 ? '.' + x[1] :
                                    '';

                                while (NUMBER_FORMAT_REGEX.test(x1)) {
                                    x1 = x1.replace(
                                        NUMBER_FORMAT_REGEX, '$1' +
                                        ',' + '$2');
                                }

                                return x1 + x2;
                            }
                        },
                        'upper': function(value, args) {
                            return value.toUpperCase();
                        },
                        'lower': function(value, args) {
                            return value.toLowerCase();
                        },
                        'titlecase': function(value, args) {
                            var blacklist = [];
                            if (args !== undefined && args.length ===
                                1) {
                                blacklist = args[0].split(' ');
                            }
                            return value.replace(/\w[a-z]\S*/g,
                                function(m, i) {
                                    if (blacklist.length === 0 ||
                                        !(utils.arrayContains(
                                                blacklist, m) &&
                                            i > 0)) {
                                        return m.charAt(0).toUpperCase() +
                                            m.substr(1).toLowerCase();
                                    }
                                    return m;
                                });
                        },
                        'trim': function(value, args) {
                            return utils.trim(value);
                        },
                        'replace': function(value, args) {
                            if (value !== undefined && args.length ===
                                2) {
                                return value.replace(new RegExp(
                                    args[0], 'g'), args[1]);
                            }
                            return value;
                        },
                        'append': function(value, args) {
                            if (value !== undefined && args.length ===
                                1) {
                                return value + '' + args[0];
                            }
                            return value;
                        },
                        'prepend': function(value, args) {
                            if (value !== undefined && args.length ===
                                1) {
                                return args[0] + '' + value;
                            }
                            return value;
                        },
                        'join': function(value, args) {
                            if (args.length === 1 && value !==
                                undefined && utils.typeOf(value) ===
                                'array') {
                                return value.join(args[0]);
                            }
                            return value;
                        },
                        'default': function(value, args) {
                            if (value !== undefined && value !==
                                null) {
                                return value;
                            }
                            if (args.length === 1) {
                                return args[0];
                            }
                            return value;
                        },
                        'date': function(value, args) {
                            if (value !== undefined && args.length >=
                                1 && args.length <= 2) {
                                var date;
                                var format = args[0];
                                var isUTC = (args.length === 2 &&
                                    args[1] === 'UTC');

                                //date = new Date(value);
                                date = UI.dateformat.parseDate(
                                    value);

                                if (format === 'localedate') {
                                    return date.toLocaleDateString();
                                } else if (format === 'localetime') {
                                    return date.toLocaleTimeString();
                                } else if (format === 'date') {
                                    return date.toDateString();
                                } else if (format === 'time') {
                                    return date.toTimeString();
                                } else {
                                    var MONTHS = ['January',
                                        'February', 'March',
                                        'April', 'May', 'June',
                                        'July', 'August',
                                        'September', 'October',
                                        'November', 'December'
                                    ];
                                    var DAYS = ['Sunday', 'Monday',
                                        'Tuesday', 'Wednesday',
                                        'Thursday', 'Friday',
                                        'Saturday'
                                    ];
                                    var DATE_PATTERNS = {
                                        'YYYY': function(date) {
                                            return (isUTC ?
                                                date.getUTCFullYear() :
                                                date.getFullYear()
                                            );
                                        },
                                        'YY': function(date) {
                                            return (isUTC ?
                                                date.getUTCFullYear() :
                                                date.getFullYear()
                                            ).toFixed().substring(
                                                2);
                                        },
                                        'MMMM': function(date) {
                                            return MONTHS[(
                                                isUTC ?
                                                date.getUTCMonth() :
                                                date.getMonth()
                                            )];
                                        },
                                        'MMM': function(date) {
                                            return MONTHS[(
                                                isUTC ?
                                                date.getUTCMonth() :
                                                date.getMonth()
                                            )].substring(0,
                                                3);
                                        },
                                        'MM': function(date) {
                                            return utils.pad(((
                                                    isUTC ?
                                                    date
                                                    .getUTCMonth() :
                                                    date
                                                    .getMonth()
                                                ) + 1).toFixed(),
                                                '0', 2);
                                        },
                                        'M': function(date) {
                                            return (isUTC ?
                                                date.getUTCMonth() :
                                                date.getMonth()
                                            ) + 1;
                                        },
                                        'DD': function(date) {
                                            return utils.pad((
                                                    isUTC ?
                                                    date.getUTCDate() :
                                                    date.getDate()
                                                ).toFixed(),
                                                '0', 2);
                                        },
                                        'D': function(date) {
                                            return (isUTC ?
                                                date.getUTCDate() :
                                                date.getDate()
                                            );
                                        },
                                        'EEEE': function(date) {
                                            return DAYS[(isUTC ?
                                                date.getUTCDay() :
                                                date.getDay()
                                            )];
                                        },
                                        'EEE': function(date) {
                                            return DAYS[(isUTC ?
                                                date.getUTCDay() :
                                                date.getDay()
                                            )].substring(0,
                                                3);
                                        },
                                        'E': function(date) {
                                            return (isUTC ?
                                                date.getUTCDay() :
                                                date.getDay()
                                            );
                                        },
                                        'HH': function(date) {
                                            return utils.pad((
                                                    isUTC ?
                                                    date.getUTCHours() :
                                                    date.getHours()
                                                ).toFixed(),
                                                '0', 2);
                                        },
                                        'H': function(date) {
                                            return (isUTC ?
                                                date.getUTCHours() :
                                                date.getHours()
                                            );
                                        },
                                        'h': function(date) {
                                            var hours = (isUTC ?
                                                date.getUTCHours() :
                                                date.getHours()
                                            );
                                            return hours < 13 ?
                                                (hours === 0 ?
                                                    12 : hours) :
                                                hours - 12;
                                        },
                                        'mm': function(date) {
                                            return utils.pad((
                                                    isUTC ?
                                                    date.getUTCMinutes() :
                                                    date.getMinutes()
                                                ).toFixed(),
                                                '0', 2);
                                        },
                                        'm': function(date) {
                                            return (isUTC ?
                                                date.getUTCMinutes() :
                                                date.getMinutes()
                                            );
                                        },
                                        'ss': function(date) {
                                            return utils.pad((
                                                    isUTC ?
                                                    date.getUTCSeconds() :
                                                    date.getSeconds()
                                                ).toFixed(),
                                                '0', 2);
                                        },
                                        's': function(date) {
                                            return (isUTC ?
                                                date.getUTCSeconds() :
                                                date.getSeconds()
                                            );
                                        },
                                        'SSS': function(date) {
                                            return utils.pad((
                                                    isUTC ?
                                                    date.getUTCMilliseconds() :
                                                    date.getMilliseconds()
                                                ).toFixed(),
                                                '0', 3);
                                        },
                                        'S': function(date) {
                                            return (isUTC ?
                                                date.getUTCMilliseconds() :
                                                date.getMilliseconds()
                                            );
                                        },
                                        'a': function(date) {
                                            return (isUTC ?
                                                    date.getUTCHours() :
                                                    date.getHours()
                                                ) < 12 ? 'AM' :
                                                'PM';
                                        }
                                    };
                                    format = format.replace(
                                        /(\\)?(Y{2,4}|M{1,4}|D{1,2}|E{1,4}|H{1,2}|h|m{1,2}|s{1,2}|S{1,3}|a)/g,
                                        function(match, escape,
                                            pattern) {
                                            if (!escape) {
                                                if (DATE_PATTERNS.hasOwnProperty(
                                                    pattern)) {
                                                    return (
                                                        DATE_PATTERNS[
                                                            pattern
                                                        ](date)
                                                    );
                                                }
                                            }
                                            return pattern;
                                        });

                                    return format;
                                }
                            }

                            return '';
                        }
                    }
                };

                /*!
                 * Initialising Tempo with a Window object in case running inside Node.
                 */
                tempo.init = function(window) {
                    _window = window;

                    return this;
                };

                /*!
                 * Prepare a container for rendering, gathering templates and
                 * clearing afterwards.
                 */
                tempo.prepare = function(container, params,
                    callback) {
                    container = utils.container(container);

                    var templates = new Templates(params);
                    if (callback !== undefined) {
                        templates.parse(container, function(
                            templates) {
                            callback(new Renderer(templates));
                        });
                    } else {
                        templates.parse(container);
                        return new Renderer(templates);
                    }
                };

                tempo.exports = {
                    'templates': Templates,
                    'utils': utils
                };

                tempo.test = {
                    'utils': utils,
                    'templates': new Templates({}),
                    'renderer': new Renderer(new Templates({}))
                };


                // Default initialisation
                try {
                    tempo.init(window);
                } catch (e) {
                    exports.tempo = tempo;
                }

                return tempo;

            })(Tempo || {});


            UI.template = Tempo;

            module.exports = UI.template;

        }, {
            "./core": 5,
            "./ui.dateformat": 27
        }
    ],
    30: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');


            // 全角半角转换
            var DBC2SBC = function(str) {
                var result = '',
                    i, code;
                for (i = 0; i < str.length; i++) {
                    code = str.charCodeAt(i);
                    if (code >= 65281 && code <= 65373) {
                        result += String.fromCharCode(str.charCodeAt(i) -
                            65248);
                    } else if (code == 12288) {
                        result += String.fromCharCode(str.charCodeAt(i) -
                            12288 + 32);
                    } else {
                        result += str.charAt(i);
                    }
                }
                return result;
            };

            // 获取字符长度
            var getByteLen = function(val) {
                var len = 0;
                for (var i = 0; i < val.length; i++) {
                    var length = val.charCodeAt(i);
                    if (length >= 0 && length <= 128) {
                        len += 1;
                    } else {
                        len += 2;
                    }
                }
                return len;
            }

            // 自定义提示隐藏、绑定事件以及解绑事件
            $.testRemind = (function() {
                var winWidth = $(window).width();
                var fnMouseDown = function(e) {
                        if (!e || !e.target) return;
                        if (e.target.id !== $.testRemind.id && $(e.target)
                            .parents("#" +
                                $.testRemind.id).length === 0) {
                            $.testRemind.hide();
                        }
                    },
                    fnKeyDown = function(e) {
                        if (!e || !e.target) return;
                        if (e.target.tagName.toLowerCase() !== "body") {
                            $.testRemind.hide();
                        }
                    },
                    funResize = function() {
                        if (!$.testRemind.display) return;
                        var nowWinWidth = $(window).width();
                        if (Math.abs(winWidth - nowWinWidth) > 20) {
                            $.testRemind.hide();
                            winWidth = nowWinWidth;
                        }
                    };
                return {
                    id: "validateRemind",
                    display: false,
                    css: {},
                    hide: function() {
                        $("#" + this.id).remove();
                        this.display = false;
                        $(document).unbind({
                            mousedown: fnMouseDown,
                            keydown: fnKeyDown
                        });
                        $(window).unbind("resize", funResize);
                    },
                    bind: function() {
                        $(document).bind({
                            mousedown: fnMouseDown,
                            keydown: fnKeyDown
                        });
                        $(window).bind("resize", funResize);
                    }
                };
            })();

            // 全局对象，可扩展
            var OBJREG = {
                EMAIL: "^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$",
                NUMBER: "^\\-?\\d+(\\.\\d+)?$",
                URL: "^(http|https|ftp)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$",
                TEL: "^1\\d{10}$",
                ZIPCODE: "^\\d{6}$",
                "prompt": {
                    radio: "请选择一个选项",
                    checkbox: "如果要继续，请选中此框",
                    "select": "请选择列表中的一项",
                    email: "请输入电子邮件地址",
                    url: "请输入网站地址",
                    tel: "请输入手机号码",
                    number: "请输入数值",
                    date: "请输入日期",
                    pattern: "内容格式不符合要求",
                    empty: "请填写此字段",
                    multiple: "多条数据使用逗号分隔"
                }
            };

            $.html5Attr = function(ele, attr) {
                if (!ele || !attr) return undefined;
                // 为了向下兼容jQuery 1.4
                if (document.querySelector) {
                    return $(ele).attr(attr);
                } else {
                    // IE6, 7
                    var ret;
                    ret = ele.getAttributeNode(attr);
                    // Return undefined if nodeValue is empty string
                    return ret && ret.nodeValue !== "" ? ret.nodeValue :
                        undefined;
                }
            };

            $.validate = (function() {
                // 验证需要的子集方法 如是否为空，是否正则匹配，是否溢出
                return {
                    isSupport: (function() {
                        return $('<input type="email">').attr(
                            "type") === "email";
                    })(),
                    isEmpty: function(ele, value) {
                        value = value || $.html5Attr(ele, "placeholder");
                        var trimValue = ele.value;
                        if (ele.type !== "password") {
                            trimValue = $.trim(trimValue);
                        }
                        if (trimValue === "" || trimValue === value) {
                            return true;
                        }
                        return false;
                    },
                    isRegex: function(ele, type, regex, params) {
                        // 原始值和处理值
                        var inputValue = ele.value,
                            dealValue = inputValue,
                            type = type || ele.getAttribute("type") +
                            "";
                        type = type.replace(/\W+$/, "");

                        if (type !== "password") {
                            // 密码不trim前后空格，以及全半角转换
                            dealValue = DBC2SBC($.trim(inputValue));
                            //  文本框值改变，重新赋值
                            dealValue !== inputValue && $(ele).val(
                                dealValue);
                        }

                        // 获取正则表达式，pattern属性获取优先，然后通过type类型匹配。注意，不处理为空的情况
                        // 从 data-valid 对象中获取正则表达式！！！
                        regex = $(ele).data('valid')['pattern'];

                        regex = regex || (function() {
                            return $.html5Attr(ele, "pattern");
                        })() || (function() {
                            // 文本框类型处理，可能有管道符——多类型重叠，如手机或邮箱
                            return type && $.map(type.split("|"),
                                function(
                                    typeSplit) {
                                    var matchRegex = OBJREG[
                                        typeSplit.toUpperCase()
                                    ];
                                    if (matchRegex) return
                                        matchRegex;
                                }).join("|");
                        })();

                        if (dealValue === "" || !regex) {
                            return true;
                        }

                        // multiple多数据的处理
                        var isMultiple = $(ele).hasProp("multiple"),
                            //newRegExp = new RegExp(regex, params || 'i')
                            newRegExp = regex;
                        // number类型下multiple是无效的
                        if (isMultiple && !/^number|range$/i.test(type)) {
                            var isAllPass = true;
                            $.each(dealValue.split(","), function(i,
                                partValue) {
                                partValue = $.trim(partValue);
                                if (isAllPass && !newRegExp.test(
                                    partValue)) {
                                    isAllPass = false;
                                }
                            });
                            return isAllPass;
                        } else {
                            return newRegExp.test(dealValue);
                        }
                        return true;
                    },
                    isOverflow: function(ele) {
                        if (!ele) return false;

                        var validData = $(ele).data('valid');

                        var attrMin = validData.min,
                            attrMax = validData.max,
                            attrStep,
                            attrDataMin,
                            attrDataMax,
                            value = ele.value;

                        if (validData.type == 'number') {
                            value = Number(value);
                            attrStep = Number(validData.step) || 1;

                            if (isNaN(value)) {
                                $(ele).testRemind("值无效");
                            } else {
                                if (typeof(attrMin) != 'undefined' &&
                                    value < attrMin) {
                                    $(ele).testRemind("值必须大于或等于" +
                                        attrMin);
                                } else if (typeof(attrMax) !=
                                    'undefined' && value > attrMax) {
                                    $(ele).testRemind("值必须小于或等于" +
                                        attrMax);
                                } else if (typeof(attrStep) !=
                                    'undefined' && !/^\d+$/.test(Math.abs(
                                            (value -
                                                attrMin || 0)) /
                                        attrStep)) {
                                    $(ele).testRemind("值无效");
                                } else {
                                    return false;
                                }
                            }
                            ele.focus();
                            ele.select();
                        } else {
                            //attrDataMin = $(ele).attr("data-min"), attrDataMax = $(ele).attr("data-max");
                            if (typeof(attrMin) != 'undefined' && value
                                .length < attrMin) {
                                $(ele).testRemind("至少输入" + attrMin +
                                    "个字符");
                                ele.focus();
                            } else if (typeof(attrMax) != 'undefined' &&
                                value.length > attrMax) {
                                $(ele).testRemind("最多输入" + attrMax +
                                    "个字符");
                                $(ele).selectRange(attrMax, value.length);
                            } else {
                                return false;
                            }
                        }

                        return true;
                    },
                    defineValid: function(ele, type) {
                        // 原始值和处理值
                        var inputValue = ele.value,
                            dealValue = inputValue,
                            defineFun = null,
                            type = type || ele.getAttribute("type") +
                            "";
                        type = type.replace(/\W+$/, "");

                        if (type !== "password") {
                            // 密码不trim前后空格，以及全半角转换
                            dealValue = DBC2SBC($.trim(inputValue));
                            //  文本框值改变，重新赋值
                            dealValue !== inputValue && $(ele).val(
                                dealValue);
                        }

                        // 自定义验证
                        // 从 data-valid 对象中获取function！！！
                        defineFun = $(ele).data('valid')['defineValid'];
                        if (defineFun != null && typeof(defineFun ==
                            'function')) {
                            return defineFun.call(ele, inputValue);
                        } else {
                            return true;
                        }
                    },
                    isPass: function(elements, options, isMind) {
                        if (!elements) return true;
                        if (elements.length == 0) return true;

                        var params = $.extend({}, options || {});
                        elements.data('valid', params);

                        /*
            for(var o in params){
                if(params.hasOwnProperty(o)){
                    if(o == 'min' || o == 'max' || o == 'pattern' || o == 'step' || o == 'multiple' || o == 'placeholder'){
                        elements.attr(o, params[o]);
                    }else if(o == 'key' || o == 'target'){
                        elements.data(o, params[o]);
                    }
                }
            }*/

                        var self = this;
                        var allpass = true,

                            remind = function(control, type, tag) {
                                var key = params.key, //选择 or 输入
                                    text = params.title,
                                    placeholder = params.placeholder;
                                /* 判断是否添加提示 */
                                if (typeof isMind != 'undefined' && !
                                    isMind) {
                                    return false;
                                }
                                // 如果元素完全显示
                                if ($(control).isVisible()) {
                                    if (type == "radio" || type ==
                                        "checkbox") {
                                        $(control).testRemind(OBJREG.prompt[
                                            type], {
                                            align: "left"
                                        });
                                        control.focus();
                                    } else if (tag == "select" || tag ==
                                        "empty") {
                                        // 下拉值为空或文本框文本域等为空
                                        $(control).testRemind((tag ==
                                                "empty" && text) ?
                                            "您尚未输入" + text : OBJREG.prompt[
                                                tag]);
                                        control.focus();
                                    } else if (/^range|number$/i.test(
                                        type) && Number(
                                        control.value)) {
                                        // 整数值与数值的特殊提示
                                        $(control).testRemind("值无效");
                                        control.focus();
                                        control.select();
                                    } else {
                                        // 文本框文本域格式不准确
                                        // 提示文字的获取	
                                        var finalText = OBJREG.prompt[
                                            type] || OBJREG.prompt[
                                            "pattern"];
                                        if (text) {
                                            finalText = "您输入的" + text +
                                                "格式不准确";
                                        }
                                        if (type != "number" && $(
                                            control).hasProp(
                                            "multiple")) {
                                            finalText += "，" + OBJREG.prompt[
                                                "multiple"];
                                        }

                                        $(control).testRemind(finalText);
                                        control.focus();
                                        control.select();
                                    }
                                } else {
                                    // 元素隐藏，寻找关联提示元素, 并走label提示流(radio, checkbox除外)
                                    var selector = $(control).data(
                                        'valid').target;
                                    var target = $("#" + selector);
                                    if (target.size() == 0) {
                                        target = $("." + selector);
                                    }
                                    // 对 combobox 包含隐藏域的特殊处理
                                    if (target.size() == 0) {
                                        target = $("[mind-accept='" + $(
                                            control).attr(
                                            'mind-target') + "']");
                                    }
                                    var customTxt = "您尚未" + (key || (
                                        tag == "empty" ?
                                        "输入" : "选择")) + ((!
                                            /^radio|checkbox$/i.test(
                                                type) && text) ||
                                        "该项内容");
                                    if (target.size()) {
                                        if (target.offset().top < $(
                                            window).scrollTop()) {
                                            $(window).scrollTop(target.offset()
                                                .top -
                                                50);
                                        }
                                        target.testRemind(customTxt);
                                    } else {
                                        //alert(customTxt);
                                    }
                                }
                                return false;
                            };

                        elements.each(function() {
                            var el = this,
                                type = params.type || el.getAttribute(
                                    "type"),
                                tag = el.tagName.toLowerCase(),
                                isRequired = params.required || $(
                                    this).hasProp(
                                    "required");

                            if ($(el).is(':disabled') ||
                                $("[mind-accept='" + $(el).attr(
                                    'mind-target') + "']").is(
                                    ':disabled')) {
                                return true;
                            }
                            // type类型
                            if (type) {
                                var typeReplace = type.replace(
                                    /\W+$/, "");
                                if (!params.hasTypeNormally && $.validate
                                    .isSupport &&
                                    type != typeReplace) {
                                    // 如果表单元素默认type类型保留，去除某位空格或管道符
                                    try {
                                        el.type = typeReplace;
                                    } catch (e) {}
                                }
                                type = typeReplace;
                            }

                            if (allpass == false || el.disabled ||
                                type == 'submit' ||
                                type == 'reset' || type == 'file' ||
                                type ==
                                'image') return;
                            // 需要验证的有
                            // input文本框, type, required, pattern, max, min以及自定义个数限制data-min, data-max
                            // radio, checkbox
                            // select
                            // textarea
                            // 先从特殊的下手，如单复选框	
                            if (type == "radio" && isRequired) {
                                // 单选框，只需验证是否必选，同一name单选组只有要一个设置required即可
                                var eleRadios = el.name ? $(
                                        "input[type='radio'][name='" +
                                        el.name +
                                        "']") : $(el),
                                    radiopass = false;

                                eleRadios.each(function() {
                                    if (radiopass == false && $(
                                        this).is(
                                        ":checked")) { //20140609 Chvin
                                        radiopass = true;
                                    }
                                });

                                if (radiopass == false) {
                                    allpass = remind(eleRadios.get(
                                        0), type, tag);
                                }
                            } else if (type == "checkbox" &&
                                isRequired) {
                                var eleCheckboxs = el.name ? $(
                                        "input:checkbox[name='" +
                                        el.name + "']") : $(el),
                                    checkboxPass = false;

                                eleCheckboxs.each(function() {
                                    if (checkboxPass == false &&
                                        $(this).is(
                                            ":checked")) {
                                        checkboxPass = true;
                                    }
                                });

                                if (checkboxPass == false) {
                                    allpass = remind(eleCheckboxs.get(
                                        0), type, tag);
                                }

                                // 复选框是，只有要required就验证，木有就不管
                                // allpass = remind(el, type, tag);
                            } else if (tag == "select" &&
                                isRequired && !el.value) {
                                // 下拉框只要关心值
                                allpass = remind(el, type, tag);
                            } else if ((isRequired && self.isEmpty(
                                el))) {
                                remind(el, type, "empty");
                                allpass = false;
                            } else if (self.isOverflow(el)) {
                                // 最大值最小值, 个数是否超出的验证
                                allpass = false;
                            } else if (!(self.isRegex(el, type))) {
                                // 各种类型文本框以及文本域
                                // allpass为true表示是为空，为false表示验证不通过
                                remind(el, type, tag);
                                allpass = false;
                            } else if (!self.defineValid(el, type)) {
                                // 最后校验 自定义校验
                                allpass = false;
                                el.focus();
                            }
                        });

                        if (allpass) {
                            elements.removeClass('error');
                        } else {
                            elements.addClass('error');
                        }

                        return allpass;
                    }
                };
            })();

            $.fn.extend({
                isVisible: function() {
                    return $(this).attr("type") !== "hidden" && $(this)
                        .css("display") !==
                        "none" && $(this).css("visibility") !==
                        "hidden";
                },
                hasProp: function(prop) {
                    if (typeof prop !== "string") return undefined;
                    var hasProp = false;
                    if (document.querySelector) {
                        var attrProp = $(this).attr(prop);
                        if (attrProp !== undefined && attrProp !==
                            false) {
                            hasProp = true;
                        }
                    } else {
                        // IE6, IE7
                        var outer = $(this).get(0).outerHTML,
                            part = outer.slice(0, outer.search(
                                /\/?['"]?>(?![^<]*<['"])/));
                        hasProp = new RegExp("\\s" + prop + "\\b", "i")
                            .test(part);
                    }
                    return hasProp;
                },
                selectRange: function(start, end) {
                    var that = $(this).get(0);
                    if (that.createTextRange) {
                        var range = that.createTextRange();
                        range.collapse(true);
                        range.moveEnd('character', end);
                        range.moveStart('character', start);
                        range.select();
                    } else {
                        that.focus();
                        that.setSelectionRange(start, end);
                    }
                    return this;
                },
                testRemind: function(content, options) {
                    var defaults = {
                        size: 6, // 三角的尺寸
                        align: "center", //三角的位置，默认居中
                        css: {
                            maxWidth: 280,
                            backgroundColor: "#FFFFE0",
                            borderColor: "#F7CE39",
                            color: "#333",
                            fontSize: "12px",
                            padding: "5px 10px",
                            zIndex: 9002
                        }
                    };

                    options = options || {};
                    options.css = $.extend({}, defaults.css, options.css ||
                        $.testRemind
                        .css);

                    var params = $.extend({}, defaults, options || {});

                    // 如果元素不可见，不处理
                    if (!content || !$(this).isVisible()) return;

                    var objAlign = {
                            "center": "50%",
                            "left": "15%",
                            "right": "85%"
                        },
                        align = objAlign[params.align] || "50%";

                    params.css.position = "absolute";
                    params.css.top = "-99px";
                    params.css.border = "1px solid " + params.css.borderColor;

                    if ($("#" + $.testRemind.id).size()) $.testRemind.hide();

                    this.remind = $('<div id="' + $.testRemind.id +
                        '">' + content +
                        '</div>').css(params.css);
                    $(document.body).append(this.remind);

                    // IE6 max-width的处理
                    var maxWidth;
                    if (!window.XMLHttpRequest && (maxWidth = parseInt(
                            params.css.maxWidth)) &&
                        this.remind.width() > maxWidth) {
                        this.remind.width(maxWidth);
                    }

                    // 当前元素的位置，提示框的方向
                    var offset = $(this).offset(),
                        direction = "top";
                    if (!offset) return $(this);
                    var remindTop = offset.top - this.remind.outerHeight() -
                        params.size;
                    if (remindTop < $(document).scrollTop()) {
                        direction = "bottom";
                        remindTop = offset.top + $(this).outerHeight() +
                            params.size;
                    }

                    // 创建三角
                    var fnCreateCorner = function(beforeOrAfter) {
                        // CSS名称值与变量，主要用来mini后节约文件大小
                        var transparent = "transparent",
                            dashed = "dashed",
                            solid = "solid";

                        // CSS样式对象们
                        var cssWithDirection = {},
                            cssWithoutDirection = {
                                // 与方向无关的CSS
                                //left: align,
                                width: 0,
                                height: 0,
                                overflow: "hidden",
                                //marginLeft: (-1 * params.size) + "px",
                                borderWidth: params.size + "px",
                                position: "absolute"
                            },
                            cssFinalUsed = {};

                        // before颜色为边框色
                        // after为背景色
                        // 方向由direction决定
                        if (beforeOrAfter === "before") {
                            cssWithDirection = {
                                "top": {
                                    borderColor: [params.css.borderColor,
                                        transparent, transparent,
                                        transparent
                                    ].join(" "),
                                    borderStyle: [solid, dashed,
                                        dashed, dashed
                                    ].join(
                                        " "),
                                    top: 0
                                },
                                "bottom": {
                                    borderColor: [transparent,
                                        transparent, params.css
                                        .borderColor, ""
                                    ].join(" "),
                                    borderStyle: [dashed, dashed,
                                        solid, dashed
                                    ].join(
                                        " "),
                                    bottom: 0
                                }
                            };
                        } else if (beforeOrAfter === "after") {
                            cssWithDirection = {
                                "top": {
                                    borderColor: params.css.backgroundColor + [
                                        "",
                                        transparent, transparent,
                                        transparent
                                    ].join(" "),
                                    borderStyle: [solid, dashed,
                                        dashed, dashed
                                    ].join(
                                        " "),
                                    top: -1
                                },
                                "bottom": {
                                    borderColor: [transparent,
                                        transparent, params.css
                                        .backgroundColor, ""
                                    ].join(" "),
                                    borderStyle: [dashed, dashed,
                                        solid, dashed
                                    ].join(
                                        " "),
                                    bottom: -1
                                }
                            };
                        } else {
                            cssWithDirection = null;
                            cssWithoutDirection = null;
                            cssFinalUsed = null;
                            return null;
                        }

                        cssFinalUsed = $.extend({},
                            cssWithDirection[direction],
                            cssWithoutDirection);

                        return $('<' + beforeOrAfter + '></' +
                                beforeOrAfter + '>')
                            .css(cssFinalUsed);
                    };

                    // 限高
                    var cssOuterLimit = {
                        width: 2 * params.size,
                        left: align,
                        marginLeft: (-1 * params.size) + "px",
                        height: params.size,
                        textIndent: 0,
                        overflow: "hidden",
                        position: "absolute"
                    };
                    if (direction == "top") {
                        cssOuterLimit["bottom"] = -1 * params.size;
                    } else {
                        cssOuterLimit["top"] = -1 * params.size;
                    }

                    this.remind.css({
                        left: offset.left,
                        top: remindTop,
                        // marginLeft: ($(this).outerWidth() - this.remind.outerWidth()) * 0.5 + /*因为三角位置造成的偏移*/ this.remind.outerWidth() * (50 - parseInt(align)) / 100		
                        // 等于下面这个：
                        marginLeft: $(this).outerWidth() * 0.5 -
                            this.remind.outerWidth() *
                            parseInt(align) / 100
                    }).prepend($('<div></div>').css(cssOuterLimit).append(
                        fnCreateCorner("before")).append(
                        fnCreateCorner("after")));

                    $.testRemind.display = true;

                    // 绑定消除事件
                    $.testRemind.bind();

                    return $(this);
                }
            });


            UI.validate = $.validate;

            module.exports = UI.validate;
        }, {
            "./core": 5
        }
    ],
    31: [
        function(require, module, exports) {
            'use strict';

            var $ = (window.jQuery);
            var UI = require('./core');

            var widget_uuid = 0,
                widget_slice = Array.prototype.slice;

            $.cleanData = (function(orig) {
                return function(elems) {
                    var events, elem, i;
                    for (i = 0;
                        (elem = elems[i]) != null; i++) {
                        try {

                            // Only trigger remove when necessary to save time
                            events = $._data(elem, "events");
                            if (events && events.remove) {
                                $(elem).triggerHandler("remove");
                            }

                            // http://bugs.jquery.com/ticket/8235
                        } catch (e) {}
                    }
                    orig(elems);
                };
            })($.cleanData);

            $.widget = function(name, base, prototype) {
                var fullName, existingConstructor, constructor,
                    basePrototype,
                    // proxiedPrototype allows the provided prototype to remain unmodified
                    // so that it can be used as a mixin for multiple widgets (#8876)
                    proxiedPrototype = {},
                    namespace = name.split(".")[0];

                name = name.split(".")[1];
                fullName = namespace + "-" + name;

                if (!prototype) {
                    prototype = base;
                    base = $.Widget;
                }

                // create selector for plugin
                $.expr[":"][fullName.toLowerCase()] = function(elem) {
                    return !!$.data(elem, fullName);
                };

                $[namespace] = $[namespace] || {};
                existingConstructor = $[namespace][name];
                constructor = $[namespace][name] = function(options,
                    element) {
                    // allow instantiation without "new" keyword
                    if (!this._createWidget) {
                        return new constructor(options, element);
                    }

                    // allow instantiation without initializing for simple inheritance
                    // must use "new" keyword (the code above always passes args)
                    if (arguments.length) {
                        this._createWidget(options, element);
                    }
                };
                // extend with the existing constructor to carry over any static properties
                $.extend(constructor, existingConstructor, {
                    version: prototype.version,
                    // copy the object used to create the prototype in case we need to
                    // redefine the widget later
                    _proto: $.extend({}, prototype),
                    // track widgets that inherit from this widget in case this widget is
                    // redefined after a widget inherits from it
                    _childConstructors: []
                });

                basePrototype = new base();
                // we need to make the options hash a property directly on the new instance
                // otherwise we'll modify the options hash on the prototype that we're
                // inheriting from
                basePrototype.options = $.widget.extend({}, basePrototype.options);
                $.each(prototype, function(prop, value) {
                    if (!$.isFunction(value)) {
                        proxiedPrototype[prop] = value;
                        return;
                    }
                    proxiedPrototype[prop] = (function() {
                        var _super = function() {
                                return base.prototype[prop].apply(
                                    this, arguments);
                            },
                            _superApply = function(args) {
                                return base.prototype[prop].apply(
                                    this, args);
                            };
                        return function() {
                            var __super = this._super,
                                __superApply = this._superApply,
                                returnValue;

                            this._super = _super;
                            this._superApply = _superApply;

                            returnValue = value.apply(this,
                                arguments);

                            this._super = __super;
                            this._superApply = __superApply;

                            return returnValue;
                        };
                    })();
                });
                constructor.prototype = $.widget.extend(basePrototype, {
                    // TODO: remove support for widgetEventPrefix
                    // always use the name + a colon as the prefix, e.g., draggable:start
                    // don't prefix for widgets that aren't DOM-based
                    widgetEventPrefix: existingConstructor ? (
                        basePrototype.widgetEventPrefix || name) : name
                }, proxiedPrototype, {
                    constructor: constructor,
                    namespace: namespace,
                    widgetName: name,
                    widgetFullName: fullName
                });

                // If this widget is being redefined then we need to find all widgets that
                // are inheriting from it and redefine all of them so that they inherit from
                // the new version of this widget. We're essentially trying to replace one
                // level in the prototype chain.
                if (existingConstructor) {
                    $.each(existingConstructor._childConstructors, function(
                        i, child) {
                        var childPrototype = child.prototype;

                        // redefine the child widget using the same prototype that was
                        // originally used, but inherit from the new version of the base
                        $.widget(childPrototype.namespace + "." +
                            childPrototype.widgetName, constructor,
                            child._proto);
                    });
                    // remove the list of existing child constructors from the old constructor
                    // so the old child constructors can be garbage collected
                    delete existingConstructor._childConstructors;
                } else {
                    base._childConstructors.push(constructor);
                }

                $.widget.bridge(name, constructor);

                return constructor;
            };

            $.widget.extend = function(target) {
                var input = widget_slice.call(arguments, 1),
                    inputIndex = 0,
                    inputLength = input.length,
                    key,
                    value;
                for (; inputIndex < inputLength; inputIndex++) {
                    for (key in input[inputIndex]) {
                        value = input[inputIndex][key];
                        if (input[inputIndex].hasOwnProperty(key) && value !==
                            undefined) {
                            // Clone objects
                            if ($.isPlainObject(value)) {
                                target[key] = $.isPlainObject(target[key]) ?
                                    $.widget.extend({}, target[key], value) :
                                // Don't extend strings, arrays, etc. with objects
                                $.widget.extend({}, value);
                                // Copy everything else by reference
                            } else {
                                target[key] = value;
                            }
                        }
                    }
                }
                return target;
            };

            $.widget.bridge = function(name, object) {
                var fullName = object.prototype.widgetFullName || name;
                $.fn[name] = function(options) {
                    var isMethodCall = typeof options === "string",
                        args = widget_slice.call(arguments, 1),
                        returnValue = this;

                    // allow multiple hashes to be passed on init
                    options = !isMethodCall && args.length ?
                        $.widget.extend.apply(null, [options].concat(args)) :
                        options;

                    if (isMethodCall) {
                        this.each(function() {
                            var methodValue,
                                instance = $.data(this, fullName);
                            if (options === "instance") {
                                returnValue = instance;
                                return false;
                            }
                            if (!instance) {
                                return $.error(
                                    "cannot call methods on " +
                                    name +
                                    " prior to initialization; " +
                                    "attempted to call method '" +
                                    options + "'");
                            }
                            if (!$.isFunction(instance[options]) ||
                                options.charAt(0) === "_") {
                                return $.error("no such method '" +
                                    options + "' for " + name +
                                    " widget instance");
                            }
                            methodValue = instance[options].apply(
                                instance, args);
                            if (methodValue !== instance && methodValue !==
                                undefined) {
                                returnValue = methodValue &&
                                    methodValue.jquery ?
                                    returnValue.pushStack(methodValue.get()) :
                                    methodValue;
                                return false;
                            }
                        });
                    } else {
                        this.each(function() {
                            var instance = $.data(this, fullName);
                            if (instance) {
                                instance.option(options || {});
                                if (instance._init) {
                                    instance._init();
                                }
                            } else {
                                $.data(this, fullName, new object(
                                    options, this));
                            }
                        });
                    }

                    return returnValue;
                };
            };

            $.Widget = function( /* options, element */ ) {};
            $.Widget._childConstructors = [];

            $.Widget.prototype = {
                widgetName: "widget",
                widgetEventPrefix: "",
                defaultElement: "<div>",
                options: {
                    disabled: false,

                    // callbacks
                    create: null
                },
                _createWidget: function(options, element) {
                    element = $(element || this.defaultElement || this)[0];
                    this.element = $(element);
                    this.uuid = widget_uuid++;
                    this.eventNamespace = "." + this.widgetName + this.uuid;

                    this.bindings = $();
                    this.hoverable = $();
                    this.focusable = $();

                    if (element !== this) {
                        $.data(element, this.widgetFullName, this);
                        this._on(true, this.element, {
                            remove: function(event) {
                                if (event.target === element) {
                                    this.destroy();
                                }
                            }
                        });
                        this.document = $(element.style ?
                            // element within the document
                            element.ownerDocument :
                            // element is window or document
                            element.document || element);
                        this.window = $(this.document[0].defaultView ||
                            this.document[0].parentWindow);
                    }

                    this.options = $.widget.extend({},
                        this.options,
                        this._getCreateOptions(),
                        options);

                    this._create();
                    this._trigger("create", null, this._getCreateEventData());
                    this._init();
                },
                _getCreateOptions: $.noop,
                _getCreateEventData: $.noop,
                _create: $.noop,
                _init: $.noop,

                destroy: function() {
                    this._destroy();
                    // we can probably remove the unbind calls in 2.0
                    // all event bindings should go through this._on()
                    this.element
                        .unbind(this.eventNamespace)
                        .removeData(this.widgetFullName)
                    // support: jquery <1.6.3
                    // http://bugs.jquery.com/ticket/9413
                    .removeData($.camelCase(this.widgetFullName));
                    this.widget()
                        .unbind(this.eventNamespace)
                        .removeAttr("aria-disabled")
                        .removeClass(
                            this.widgetFullName + "-disabled " +
                            "ui-state-disabled");

                    // clean up events and states
                    this.bindings.unbind(this.eventNamespace);
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus");
                },
                _destroy: $.noop,

                widget: function() {
                    return this.element;
                },

                option: function(key, value) {
                    var options = key,
                        parts,
                        curOption,
                        i;

                    if (arguments.length === 0) {
                        // don't return a reference to the internal hash
                        return $.widget.extend({}, this.options);
                    }

                    if (typeof key === "string") {
                        // handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
                        options = {};
                        parts = key.split(".");
                        key = parts.shift();
                        if (parts.length) {
                            curOption = options[key] = $.widget.extend({},
                                this.options[key]);
                            for (i = 0; i < parts.length - 1; i++) {
                                curOption[parts[i]] = curOption[parts[i]] || {};
                                curOption = curOption[parts[i]];
                            }
                            key = parts.pop();
                            if (arguments.length === 1) {
                                return curOption[key] === undefined ? null :
                                    curOption[key];
                            }
                            curOption[key] = value;
                        } else {
                            if (arguments.length === 1) {
                                return this.options[key] === undefined ?
                                    null : this.options[key];
                            }
                            options[key] = value;
                        }
                    }

                    this._setOptions(options);

                    return this;
                },
                _setOptions: function(options) {
                    var key;

                    for (key in options) {
                        this._setOption(key, options[key]);
                    }

                    return this;
                },
                _setOption: function(key, value) {
                    this.options[key] = value;

                    /*
        if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}*/

                    return this;
                },

                enable: function() {
                    return this._setOptions({
                        disabled: false
                    });
                },
                disable: function() {
                    return this._setOptions({
                        disabled: true
                    });
                },

                _on: function(suppressDisabledCheck, element, handlers) {
                    var delegateElement,
                        instance = this;

                    // no suppressDisabledCheck flag, shuffle arguments
                    if (typeof suppressDisabledCheck !== "boolean") {
                        handlers = element;
                        element = suppressDisabledCheck;
                        suppressDisabledCheck = false;
                    }

                    // no element argument, shuffle and use this.element
                    if (!handlers) {
                        handlers = element;
                        element = this.element;
                        delegateElement = this.widget();
                    } else {
                        element = delegateElement = $(element);
                        this.bindings = this.bindings.add(element);
                    }

                    $.each(handlers, function(event, handler) {
                        function handlerProxy() {
                            // allow widgets to customize the disabled handling
                            // - disabled as an array instead of boolean
                            // - disabled class as method for disabling individual parts
                            if (!suppressDisabledCheck &&
                                (instance.options.disabled === true ||
                                    $(this).hasClass(
                                        "ui-state-disabled"))) {
                                return;
                            }
                            return (typeof handler === "string" ?
                                    instance[handler] : handler)
                                .apply(instance, arguments);
                        }

                        // copy the guid so direct unbinding works
                        if (typeof handler !== "string") {
                            handlerProxy.guid = handler.guid =
                                handler.guid || handlerProxy.guid || $.guid++;
                        }

                        var match = event.match(/^([\w:-]*)\s*(.*)$/),
                            eventName = match[1] + instance.eventNamespace,
                            selector = match[2];
                        if (selector) {
                            delegateElement.delegate(selector,
                                eventName, handlerProxy);
                        } else {
                            element.bind(eventName, handlerProxy);
                        }
                    });
                },

                _off: function(element, eventName) {
                    eventName = (eventName || "").split(" ").join(this.eventNamespace +
                        " ") +
                        this.eventNamespace;
                    element.unbind(eventName).undelegate(eventName);

                    // Clear the stack to avoid memory leaks (#10056)
                    this.bindings = $(this.bindings.not(element).get());
                    this.focusable = $(this.focusable.not(element).get());
                    this.hoverable = $(this.hoverable.not(element).get());
                },

                _delay: function(handler, delay) {
                    function handlerProxy() {
                        return (typeof handler === "string" ? instance[
                                handler] : handler)
                            .apply(instance, arguments);
                    }
                    var instance = this;
                    return setTimeout(handlerProxy, delay || 0);
                },

                _hoverable: function(element) {
                    this.hoverable = this.hoverable.add(element);
                    this._on(element, {
                        mouseenter: function(event) {
                            $(event.currentTarget).addClass(
                                "ui-state-hover");
                        },
                        mouseleave: function(event) {
                            $(event.currentTarget).removeClass(
                                "ui-state-hover");
                        }
                    });
                },

                _focusable: function(element) {
                    this.focusable = this.focusable.add(element);
                    this._on(element, {
                        focusin: function(event) {
                            $(event.currentTarget).addClass(
                                "ui-state-focus");
                        },
                        focusout: function(event) {
                            $(event.currentTarget).removeClass(
                                "ui-state-focus");
                        }
                    });
                },

                _trigger: function(type, event, data) {
                    var prop, orig,
                        callback = this.options[type];

                    data = data || {};
                    event = $.Event(event);
                    event.type = (type === this.widgetEventPrefix ?
                        type :
                        this.widgetEventPrefix + type).toLowerCase();
                    // the original event may come from any element
                    // so we need to reset the target on the new event
                    event.target = this.element[0];

                    // copy original event properties over to the new event
                    orig = event.originalEvent;
                    if (orig) {
                        for (prop in orig) {
                            if (!(prop in event)) {
                                event[prop] = orig[prop];
                            }
                        }
                    }

                    this.element.trigger(event, data);
                    return !($.isFunction(callback) &&
                        callback.apply(this.element[0], [event].concat(data)) ===
                        false ||
                        event.isDefaultPrevented());
                }
            };

            $.each({
                show: "fadeIn",
                hide: "fadeOut"
            }, function(method, defaultEffect) {
                $.Widget.prototype["_" + method] = function(element,
                    options, callback) {
                    if (typeof options === "string") {
                        options = {
                            effect: options
                        };
                    }
                    var hasOptions,
                        effectName = !options ?
                        method :
                        options === true || typeof options === "number" ?
                        defaultEffect :
                        options.effect || defaultEffect;
                    options = options || {};
                    if (typeof options === "number") {
                        options = {
                            duration: options
                        };
                    }
                    hasOptions = !$.isEmptyObject(options);
                    options.complete = callback;
                    if (options.delay) {
                        element.delay(options.delay);
                    }
                    if (hasOptions && $.effects && $.effects.effect[
                        effectName]) {
                        element[method](options);
                    } else if (effectName !== method && element[
                        effectName]) {
                        element[effectName](options.duration, options.easing,
                            callback);
                    } else {
                        element.queue(function(next) {
                            $(this)[method]();
                            if (callback) {
                                callback.call(element[0]);
                            }
                            next();
                        });
                    }
                };
            });

            $.FUI.widget = $.widget;

            module.exports = $.FUI.widget;
        }, {
            "./core": 5
        }
    ],
    32: [
        function(require, module, exports) {
            //     Underscore.js 1.7.0
            //     http://underscorejs.org
            //     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
            //     Underscore may be freely distributed under the MIT license.

            'use strict';

            var UI = require('./core');

            //(function() {

            // Baseline setup
            // --------------

            // Establish the root object, `window` in the browser, or `exports` on the server.
            var root = this;

            // Save the previous value of the `_` variable.
            var previousUnderscore = root._;

            // Save bytes in the minified (but not gzipped) version:
            var ArrayProto = Array.prototype,
                ObjProto = Object.prototype,
                FuncProto = Function.prototype;

            // Create quick reference variables for speed access to core prototypes.
            var
                push = ArrayProto.push,
                slice = ArrayProto.slice,
                toString = ObjProto.toString,
                hasOwnProperty = ObjProto.hasOwnProperty;

            // All **ECMAScript 5** native function implementations that we hope to use
            // are declared here.
            var
                nativeIsArray = Array.isArray,
                nativeKeys = Object.keys,
                nativeBind = FuncProto.bind,
                nativeCreate = Object.create;

            // Reusable constructor function for prototype setting.
            var Ctor = function() {};

            // Create a safe reference to the Underscore object for use below.
            var _ = function(obj) {
                if (obj instanceof _) return obj;
                if (!(this instanceof _)) return new _(obj);
                this._wrapped = obj;
            };

            // Export the Underscore object for **Node.js**, with
            // backwards-compatibility for the old `require()` API. If we're in
            // the browser, add `_` as a global object.
            if (typeof exports !== 'undefined') {
                if (typeof module !== 'undefined' && module.exports) {
                    exports = module.exports = _;
                }
                exports._ = _;
            } else {
                root._ = _;
            }

            // Current version.
            _.VERSION = '1.7.0';

            // Internal function that returns an efficient (for current engines) version
            // of the passed-in callback, to be repeatedly applied in other Underscore
            // functions.
            var optimizeCb = function(func, context, argCount) {
                if (context === void 0) return func;
                switch (argCount == null ? 3 : argCount) {
                    case 1:
                        return function(value) {
                            return func.call(context, value);
                        };
                    case 2:
                        return function(value, other) {
                            return func.call(context, value, other);
                        };
                    case 3:
                        return function(value, index, collection) {
                            return func.call(context, value, index,
                                collection);
                        };
                    case 4:
                        return function(accumulator, value, index,
                            collection) {
                            return func.call(context, accumulator,
                                value, index, collection);
                        };
                }
                return function() {
                    return func.apply(context, arguments);
                };
            };

            // A mostly-internal function to generate callbacks that can be applied
            // to each element in a collection, returning the desired result — either
            // identity, an arbitrary callback, a property matcher, or a property accessor.
            var cb = function(value, context, argCount) {
                if (value == null) return _.identity;
                if (_.isFunction(value)) return optimizeCb(value,
                    context, argCount);
                if (_.isObject(value)) return _.matches(value);
                return _.property(value);
            };
            _.iteratee = function(value, context) {
                return cb(value, context, Infinity);
            };

            // An internal function for creating assigner functions.
            var createAssigner = function(keysFunc) {
                return function(obj) {
                    var length = arguments.length;
                    if (length < 2 || obj == null) return obj;
                    for (var index = 0; index < length; index++) {
                        var source = arguments[index],
                            keys = keysFunc(source),
                            l = keys.length;
                        for (var i = 0; i < l; i++) {
                            var key = keys[i];
                            obj[key] = source[key];
                        }
                    }
                    return obj;
                };
            };

            // An internal function for creating a new object that inherits from another.
            var baseCreate = function(prototype) {
                if (!_.isObject(prototype)) return {};
                if (nativeCreate) return nativeCreate(prototype);
                Ctor.prototype = prototype;
                var result = new Ctor;
                Ctor.prototype = null;
                return result;
            };

            // Collection Functions
            // --------------------

            // The cornerstone, an `each` implementation, aka `forEach`.
            // Handles raw objects in addition to array-likes. Treats all
            // sparse array-likes as if they were dense.
            _.each = _.forEach = function(obj, iteratee, context) {
                if (obj == null) return obj;
                iteratee = optimizeCb(iteratee, context);
                var i, length = obj.length;
                if (length === +length) {
                    for (i = 0; i < length; i++) {
                        iteratee(obj[i], i, obj);
                    }
                } else {
                    var keys = _.keys(obj);
                    for (i = 0, length = keys.length; i < length; i++) {
                        iteratee(obj[keys[i]], keys[i], obj);
                    }
                }
                return obj;
            };

            // Return the results of applying the iteratee to each element.
            _.map = _.collect = function(obj, iteratee, context) {
                if (obj == null) return [];
                iteratee = cb(iteratee, context);
                var keys = obj.length !== +obj.length && _.keys(obj),
                    length = (keys || obj).length,
                    results = Array(length),
                    currentKey;
                for (var index = 0; index < length; index++) {
                    currentKey = keys ? keys[index] : index;
                    results[index] = iteratee(obj[currentKey], currentKey,
                        obj);
                }
                return results;
            };

            // **Reduce** builds up a single result from a list of values, aka `inject`,
            // or `foldl`.
            _.reduce = _.foldl = _.inject = function(obj, iteratee, memo,
                context) {
                if (obj == null) obj = [];
                iteratee = optimizeCb(iteratee, context, 4);
                var keys = obj.length !== +obj.length && _.keys(obj),
                    length = (keys || obj).length,
                    index = 0,
                    currentKey;
                if (arguments.length < 3) {
                    memo = obj[keys ? keys[index++] : index++];
                }
                for (; index < length; index++) {
                    currentKey = keys ? keys[index] : index;
                    memo = iteratee(memo, obj[currentKey], currentKey, obj);
                }
                return memo;
            };

            // The right-associative version of reduce, also known as `foldr`.
            _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
                if (obj == null) obj = [];
                iteratee = optimizeCb(iteratee, context, 4);
                var keys = obj.length !== +obj.length && _.keys(obj),
                    index = (keys || obj).length,
                    currentKey;
                if (arguments.length < 3) {
                    memo = obj[keys ? keys[--index] : --index];
                }
                while (index-- > 0) {
                    currentKey = keys ? keys[index] : index;
                    memo = iteratee(memo, obj[currentKey], currentKey, obj);
                }
                return memo;
            };

            // **Transform** is an alternative to reduce that transforms `obj` to a new
            // `accumulator` object.
            _.transform = function(obj, iteratee, accumulator, context) {
                if (accumulator == null) {
                    if (_.isArray(obj)) {
                        accumulator = [];
                    } else if (_.isObject(obj)) {
                        var Ctor = obj.constructor;
                        accumulator = baseCreate(typeof Ctor == 'function' &&
                            Ctor.prototype);
                    } else {
                        accumulator = {};
                    }
                }
                if (obj == null) return accumulator;
                iteratee = optimizeCb(iteratee, context, 4);
                var keys = obj.length !== +obj.length && _.keys(obj),
                    length = (keys || obj).length,
                    index, currentKey;
                for (index = 0; index < length; index++) {
                    currentKey = keys ? keys[index] : index;
                    if (iteratee(accumulator, obj[currentKey], currentKey,
                        obj) === false) break;
                }
                return accumulator;
            };

            // Return the first value which passes a truth test. Aliased as `detect`.
            _.find = _.detect = function(obj, predicate, context) {
                var key;
                if (obj.length === +obj.length) {
                    key = _.findIndex(obj, predicate, context);
                } else {
                    key = _.findKey(obj, predicate, context);
                }
                if (key !== void 0 && key !== -1) return obj[key];
            };

            // Return all the elements that pass a truth test.
            // Aliased as `select`.
            _.filter = _.select = function(obj, predicate, context) {
                var results = [];
                if (obj == null) return results;
                predicate = cb(predicate, context);
                _.each(obj, function(value, index, list) {
                    if (predicate(value, index, list)) results.push(
                        value);
                });
                return results;
            };

            // Return all the elements for which a truth test fails.
            _.reject = function(obj, predicate, context) {
                return _.filter(obj, _.negate(cb(predicate)), context);
            };

            // Determine whether all of the elements match a truth test.
            // Aliased as `all`.
            _.every = _.all = function(obj, predicate, context) {
                if (obj == null) return true;
                predicate = cb(predicate, context);
                var keys = obj.length !== +obj.length && _.keys(obj),
                    length = (keys || obj).length,
                    index, currentKey;
                for (index = 0; index < length; index++) {
                    currentKey = keys ? keys[index] : index;
                    if (!predicate(obj[currentKey], currentKey, obj)) return
                        false;
                }
                return true;
            };

            // Determine if at least one element in the object matches a truth test.
            // Aliased as `any`.
            _.some = _.any = function(obj, predicate, context) {
                if (obj == null) return false;
                predicate = cb(predicate, context);
                var keys = obj.length !== +obj.length && _.keys(obj),
                    length = (keys || obj).length,
                    index, currentKey;
                for (index = 0; index < length; index++) {
                    currentKey = keys ? keys[index] : index;
                    if (predicate(obj[currentKey], currentKey, obj)) return
                        true;
                }
                return false;
            };

            // Determine if the array or object contains a given value (using `===`).
            // Aliased as `includes` and `include`.
            _.contains = _.includes = _.include = function(obj, target,
                fromIndex) {
                if (obj == null) return false;
                if (obj.length !== +obj.length) obj = _.values(obj);
                return _.indexOf(obj, target, typeof fromIndex == 'number' &&
                    fromIndex) >= 0;
            };

            // Invoke a method (with arguments) on every item in a collection.
            _.invoke = function(obj, method) {
                var args = slice.call(arguments, 2);
                var isFunc = _.isFunction(method);
                return _.map(obj, function(value) {
                    return (isFunc ? method : value[method]).apply(
                        value, args);
                });
            };

            // Convenience version of a common use case of `map`: fetching a property.
            _.pluck = function(obj, key) {
                return _.map(obj, _.property(key));
            };

            // Convenience version of a common use case of `filter`: selecting only objects
            // containing specific `key:value` pairs.
            _.where = function(obj, attrs) {
                return _.filter(obj, _.matches(attrs));
            };

            // Convenience version of a common use case of `find`: getting the first object
            // containing specific `key:value` pairs.
            _.findWhere = function(obj, attrs) {
                return _.find(obj, _.matches(attrs));
            };

            // Return the maximum element (or element-based computation).
            _.max = function(obj, iteratee, context) {
                var result = -Infinity,
                    lastComputed = -Infinity,
                    value, computed;
                if (iteratee == null && obj != null) {
                    obj = obj.length === +obj.length ? obj : _.values(obj);
                    for (var i = 0, length = obj.length; i < length; i++) {
                        value = obj[i];
                        if (value > result) {
                            result = value;
                        }
                    }
                } else {
                    iteratee = cb(iteratee, context);
                    _.each(obj, function(value, index, list) {
                        computed = iteratee(value, index, list);
                        if (computed > lastComputed || computed === -
                            Infinity && result === -Infinity) {
                            result = value;
                            lastComputed = computed;
                        }
                    });
                }
                return result;
            };

            // Return the minimum element (or element-based computation).
            _.min = function(obj, iteratee, context) {
                var result = Infinity,
                    lastComputed = Infinity,
                    value, computed;
                if (iteratee == null && obj != null) {
                    obj = obj.length === +obj.length ? obj : _.values(obj);
                    for (var i = 0, length = obj.length; i < length; i++) {
                        value = obj[i];
                        if (value < result) {
                            result = value;
                        }
                    }
                } else {
                    iteratee = cb(iteratee, context);
                    _.each(obj, function(value, index, list) {
                        computed = iteratee(value, index, list);
                        if (computed < lastComputed || computed ===
                            Infinity && result === Infinity) {
                            result = value;
                            lastComputed = computed;
                        }
                    });
                }
                return result;
            };

            // Shuffle a collection, using the modern version of the
            // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
            _.shuffle = function(obj) {
                var set = obj && obj.length === +obj.length ? obj : _.values(
                    obj);
                var length = set.length;
                var shuffled = Array(length);
                for (var index = 0, rand; index < length; index++) {
                    rand = _.random(0, index);
                    if (rand !== index) shuffled[index] = shuffled[rand];
                    shuffled[rand] = set [index];
                }
                return shuffled;
            };

            // Sample **n** random values from a collection.
            // If **n** is not specified, returns a single random element.
            // The internal `guard` argument allows it to work with `map`.
            _.sample = function(obj, n, guard) {
                if (n == null || guard) {
                    if (obj.length !== +obj.length) obj = _.values(obj);
                    return obj[_.random(obj.length - 1)];
                }
                return _.shuffle(obj).slice(0, Math.max(0, n));
            };

            // Sort the object's values by a criterion produced by an iteratee.
            _.sortBy = function(obj, iteratee, context) {
                iteratee = cb(iteratee, context);
                return _.pluck(_.map(obj, function(value, index, list) {
                    return {
                        value: value,
                        index: index,
                        criteria: iteratee(value, index, list)
                    };
                }).sort(function(left, right) {
                    var a = left.criteria;
                    var b = right.criteria;
                    if (a !== b) {
                        if (a > b || a === void 0) return 1;
                        if (a < b || b === void 0) return -1;
                    }
                    return left.index - right.index;
                }), 'value');
            };

            // An internal function used for aggregate "group by" operations.
            var group = function(behavior) {
                return function(obj, iteratee, context) {
                    var result = {};
                    iteratee = cb(iteratee, context);
                    _.each(obj, function(value, index) {
                        var key = iteratee(value, index, obj);
                        behavior(result, value, key);
                    });
                    return result;
                };
            };

            // Groups the object's values by a criterion. Pass either a string attribute
            // to group by, or a function that returns the criterion.
            _.groupBy = group(function(result, value, key) {
                if (_.has(result, key)) result[key].push(value);
                else result[key] = [value];
            });

            // Indexes the object's values by a criterion, similar to `groupBy`, but for
            // when you know that your index values will be unique.
            _.indexBy = group(function(result, value, key) {
                result[key] = value;
            });

            // Counts instances of an object that group by a certain criterion. Pass
            // either a string attribute to count by, or a function that returns the
            // criterion.
            _.countBy = group(function(result, value, key) {
                if (_.has(result, key)) result[key]++;
                else result[key] = 1;
            });

            // Safely create a real, live array from anything iterable.
            _.toArray = function(obj) {
                if (!obj) return [];
                if (_.isArray(obj)) return slice.call(obj);
                if (obj.length === +obj.length) return _.map(obj, _.identity);
                return _.values(obj);
            };

            // Return the number of elements in an object.
            _.size = function(obj) {
                if (obj == null) return 0;
                return obj.length === +obj.length ? obj.length : _.keys(obj)
                    .length;
            };

            // Split a collection into two arrays: one whose elements all satisfy the given
            // predicate, and one whose elements all do not satisfy the predicate.
            _.partition = function(obj, predicate, context) {
                predicate = cb(predicate, context);
                var pass = [],
                    fail = [];
                _.each(obj, function(value, key, obj) {
                    (predicate(value, key, obj) ? pass : fail).push(
                        value);
                });
                return [pass, fail];
            };

            // Array Functions
            // ---------------

            // Get the first element of an array. Passing **n** will return the first N
            // values in the array. Aliased as `head` and `take`. The **guard** check
            // allows it to work with `_.map`.
            _.first = _.head = _.take = function(array, n, guard) {
                if (array == null) return void 0;
                if (n == null || guard) return array[0];
                return _.initial(array, array.length - n);
            };

            // Returns everything but the last entry of the array. Especially useful on
            // the arguments object. Passing **n** will return all the values in
            // the array, excluding the last N. The **guard** check allows it to work with
            // `_.map`.
            _.initial = function(array, n, guard) {
                return slice.call(array, 0, Math.max(0, array.length - (n ==
                    null || guard ? 1 : n)));
            };

            // Get the last element of an array. Passing **n** will return the last N
            // values in the array. The **guard** check allows it to work with `_.map`.
            _.last = function(array, n, guard) {
                if (array == null) return void 0;
                if (n == null || guard) return array[array.length - 1];
                return _.rest(array, Math.max(0, array.length - n));
            };

            // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
            // Especially useful on the arguments object. Passing an **n** will return
            // the rest N values in the array. The **guard**
            // check allows it to work with `_.map`.
            _.rest = _.tail = _.drop = function(array, n, guard) {
                return slice.call(array, n == null || guard ? 1 : n);
            };

            // Trim out all falsy values from an array.
            _.compact = function(array) {
                return _.filter(array, _.identity);
            };

            // Internal implementation of a recursive `flatten` function.
            var flatten = function(input, shallow, strict, startIndex) {
                var output = [],
                    idx = 0,
                    value;
                for (var i = startIndex || 0, length = input && input.length; i <
                    length; i++) {
                    value = input[i];
                    if (value && value.length >= 0 && (_.isArray(value) ||
                        _.isArguments(value))) {
                        //flatten current level of array or arguments object
                        if (!shallow) value = flatten(value, shallow,
                            strict);
                        var j = 0,
                            len = value.length;
                        output.length += len;
                        while (j < len) {
                            output[idx++] = value[j++];
                        }
                    } else if (!strict) {
                        output[idx++] = value;
                    }
                }
                return output;
            };

            // Flatten out an array, either recursively (by default), or just one level.
            _.flatten = function(array, shallow) {
                return flatten(array, shallow, false);
            };

            // Return a version of the array that does not contain the specified value(s).
            _.without = function(array) {
                return _.difference(array, slice.call(arguments, 1));
            };

            // Produce a duplicate-free version of the array. If the array has already
            // been sorted, you have the option of using a faster algorithm.
            // Aliased as `unique`.
            _.uniq = _.unique = function(array, isSorted, iteratee, context) {
                if (array == null) return [];
                if (!_.isBoolean(isSorted)) {
                    context = iteratee;
                    iteratee = isSorted;
                    isSorted = false;
                }
                if (iteratee != null) iteratee = cb(iteratee, context);
                var result = [];
                var seen = [];
                for (var i = 0, length = array.length; i < length; i++) {
                    var value = array[i],
                        computed = iteratee ? iteratee(value, i, array) :
                        value;
                    if (isSorted) {
                        if (!i || seen !== computed) result.push(value);
                        seen = computed;
                    } else if (iteratee) {
                        if (!_.contains(seen, computed)) {
                            seen.push(computed);
                            result.push(value);
                        }
                    } else if (!_.contains(result, value)) {
                        result.push(value);
                    }
                }
                return result;
            };

            // Produce an array that contains the union: each distinct element from all of
            // the passed-in arrays.
            _.union = function() {
                return _.uniq(flatten(arguments, true, true));
            };

            // Produce an array that contains every item shared between all the
            // passed-in arrays.
            _.intersection = function(array) {
                if (array == null) return [];
                var result = [];
                var argsLength = arguments.length;
                for (var i = 0, length = array.length; i < length; i++) {
                    var item = array[i];
                    if (_.contains(result, item)) continue;
                    for (var j = 1; j < argsLength; j++) {
                        if (!_.contains(arguments[j], item)) break;
                    }
                    if (j === argsLength) result.push(item);
                }
                return result;
            };

            // Take the difference between one array and a number of other arrays.
            // Only the elements present in just the first array will remain.
            _.difference = function(array) {
                var rest = flatten(arguments, true, true, 1);
                return _.filter(array, function(value) {
                    return !_.contains(rest, value);
                });
            };

            // Zip together multiple lists into a single array -- elements that share
            // an index go together.
            _.zip = function(array) {
                if (array == null) return [];
                var length = _.max(arguments, 'length').length;
                var results = Array(length);
                while (length-- > 0) {
                    results[length] = _.pluck(arguments, length);
                }
                return results;
            };

            // Complement of _.zip. Unzip accepts an array of arrays and groups
            // each array's elements on shared indices
            _.unzip = function(array) {
                return _.zip.apply(null, array);
            };

            // Converts lists into objects. Pass either a single array of `[key, value]`
            // pairs, or two parallel arrays of the same length -- one of keys, and one of
            // the corresponding values.
            _.object = function(list, values) {
                if (list == null) return {};
                var result = {};
                for (var i = 0, length = list.length; i < length; i++) {
                    if (values) {
                        result[list[i]] = values[i];
                    } else {
                        result[list[i][0]] = list[i][1];
                    }
                }
                return result;
            };

            // Return the position of the first occurrence of an item in an array,
            // or -1 if the item is not included in the array.
            // If the array is large and already in sort order, pass `true`
            // for **isSorted** to use binary search.
            _.indexOf = function(array, item, isSorted) {
                var i = 0,
                    length = array && array.length;
                if (typeof isSorted == 'number') {
                    i = isSorted < 0 ? Math.max(0, length + isSorted) :
                        isSorted;
                } else if (isSorted && length) {
                    i = _.sortedIndex(array, item);
                    return array[i] === item ? i : -1;
                }
                for (; i < length; i++)
                    if (array[i] === item) return i;
                return -1;
            };

            _.lastIndexOf = function(array, item, from) {
                var idx = array ? array.length : 0;
                if (typeof from == 'number') {
                    idx = from < 0 ? idx + from + 1 : Math.min(idx, from +
                        1);
                }
                while (--idx >= 0)
                    if (array[idx] === item) return idx;
                return -1;
            };

            // Returns the first index on an array-like that passes a predicate test
            _.findIndex = function(array, predicate, context) {
                predicate = cb(predicate, context);
                var length = array != null ? array.length : 0;
                for (var i = 0; i < length; i++) {
                    if (predicate(array[i], i, array)) return i;
                }
                return -1;
            };

            // Use a comparator function to figure out the smallest index at which
            // an object should be inserted so as to maintain order. Uses binary search.
            _.sortedIndex = function(array, obj, iteratee, context) {
                iteratee = cb(iteratee, context, 1);
                var value = iteratee(obj);
                var low = 0,
                    high = array.length;
                while (low < high) {
                    var mid = Math.floor((low + high) / 2);
                    if (iteratee(array[mid]) < value) low = mid + 1;
                    else high = mid;
                }
                return low;
            };

            // Generate an integer Array containing an arithmetic progression. A port of
            // the native Python `range()` function. See
            // [the Python documentation](http://docs.python.org/library/functions.html#range).
            _.range = function(start, stop, step) {
                if (arguments.length <= 1) {
                    stop = start || 0;
                    start = 0;
                }
                step = step || 1;

                var length = Math.max(Math.ceil((stop - start) / step), 0);
                var range = Array(length);

                for (var idx = 0; idx < length; idx++, start += step) {
                    range[idx] = start;
                }

                return range;
            };

            // Function (ahem) Functions
            // ------------------

            // Determines whether to execute a function as a constructor
            // or a normal function with the provided arguments
            var executeBound = function(sourceFunc, boundFunc, context,
                callingContext, args) {
                if (!(callingContext instanceof boundFunc)) return
                    sourceFunc.apply(context, args);
                var self = baseCreate(sourceFunc.prototype);
                var result = sourceFunc.apply(self, args);
                if (_.isObject(result)) return result;
                return self;
            };

            // Create a function bound to a given object (assigning `this`, and arguments,
            // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
            // available.
            _.bind = function(func, context) {
                if (nativeBind && func.bind === nativeBind) return
                    nativeBind.apply(func, slice.call(arguments, 1));
                if (!_.isFunction(func)) throw new TypeError(
                    'Bind must be called on a function');
                var args = slice.call(arguments, 2);
                return function bound() {
                    return executeBound(func, bound, context, this,
                        args.concat(slice.call(arguments)));
                };
            };

            // Partially apply a function by creating a version that has had some of its
            // arguments pre-filled, without changing its dynamic `this` context. _ acts
            // as a placeholder, allowing any combination of arguments to be pre-filled.
            _.partial = function(func) {
                var boundArgs = slice.call(arguments, 1);
                return function bound() {
                    var position = 0;
                    var args = boundArgs.slice();
                    for (var i = 0, length = args.length; i < length; i++) {
                        if (args[i] === _) args[i] = arguments[position++];
                    }
                    while (position < arguments.length) args.push(
                        arguments[position++]);
                    return executeBound(func, bound, this, this, args);
                };
            };

            // Bind a number of an object's methods to that object. Remaining arguments
            // are the method names to be bound. Useful for ensuring that all callbacks
            // defined on an object belong to it.
            _.bindAll = function(obj) {
                var i, length = arguments.length,
                    key;
                if (length <= 1) throw new Error(
                    'bindAll must be passed function names');
                for (i = 1; i < length; i++) {
                    key = arguments[i];
                    obj[key] = _.bind(obj[key], obj);
                }
                return obj;
            };

            // Memoize an expensive function by storing its results.
            _.memoize = function(func, hasher) {
                var memoize = function(key) {
                    var cache = memoize.cache;
                    var address = '' + (hasher ? hasher.apply(this,
                        arguments) : key);
                    if (!_.has(cache, address)) cache[address] = func.apply(
                        this, arguments);
                    return cache[address];
                };
                memoize.cache = {};
                return memoize;
            };

            // Delays a function for the given number of milliseconds, and then calls
            // it with the arguments supplied.
            _.delay = function(func, wait) {
                var args = slice.call(arguments, 2);
                return setTimeout(function() {
                    return func.apply(null, args);
                }, wait);
            };

            // Defers a function, scheduling it to run after the current call stack has
            // cleared.
            _.defer = _.partial(_.delay, _, 1);

            // Returns a function, that, when invoked, will only be triggered at most once
            // during a given window of time. Normally, the throttled function will run
            // as much as it can, without ever going more than once per `wait` duration;
            // but if you'd like to disable the execution on the leading edge, pass
            // `{leading: false}`. To disable execution on the trailing edge, ditto.
            _.throttle = function(func, wait, options) {
                var context, args, result;
                var timeout = null;
                var previous = 0;
                if (!options) options = {};
                var later = function() {
                    previous = options.leading === false ? 0 : _.now();
                    timeout = null;
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                };
                return function() {
                    var now = _.now();
                    if (!previous && options.leading === false) previous =
                        now;
                    var remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0 || remaining > wait) {
                        if (timeout) {
                            clearTimeout(timeout);
                            timeout = null;
                        }
                        previous = now;
                        result = func.apply(context, args);
                        if (!timeout) context = args = null;
                    } else if (!timeout && options.trailing !== false) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            };

            // Returns a function, that, as long as it continues to be invoked, will not
            // be triggered. The function will be called after it stops being called for
            // N milliseconds. If `immediate` is passed, trigger the function on the
            // leading edge, instead of the trailing.
            _.debounce = function(func, wait, immediate) {
                var timeout, args, context, timestamp, result;

                var later = function() {
                    var last = _.now() - timestamp;

                    if (last < wait && last >= 0) {
                        timeout = setTimeout(later, wait - last);
                    } else {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                            if (!timeout) context = args = null;
                        }
                    }
                };

                return function() {
                    context = this;
                    args = arguments;
                    timestamp = _.now();
                    var callNow = immediate && !timeout;
                    if (!timeout) timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                        context = args = null;
                    }

                    return result;
                };
            };

            // Returns the first function passed as an argument to the second,
            // allowing you to adjust arguments, run code before and after, and
            // conditionally execute the original function.
            _.wrap = function(func, wrapper) {
                return _.partial(wrapper, func);
            };

            // Returns a negated version of the passed-in predicate.
            _.negate = function(predicate) {
                return function() {
                    return !predicate.apply(this, arguments);
                };
            };

            // Returns a function that is the composition of a list of functions, each
            // consuming the return value of the function that follows.
            _.compose = function() {
                var args = arguments;
                var start = args.length - 1;
                return function() {
                    var i = start;
                    var result = args[start].apply(this, arguments);
                    while (i--) result = args[i].call(this, result);
                    return result;
                };
            };

            // Returns a function that will only be executed on and after the Nth call.
            _.after = function(times, func) {
                return function() {
                    if (--times < 1) {
                        return func.apply(this, arguments);
                    }
                };
            };

            // Returns a function that will only be executed up to (but not including) the Nth call.
            _.before = function(times, func) {
                var memo;
                return function() {
                    if (--times > 0) {
                        memo = func.apply(this, arguments);
                    }
                    if (times <= 1) func = null;
                    return memo;
                };
            };

            // Returns a function that will be executed at most one time, no matter how
            // often you call it. Useful for lazy initialization.
            _.once = _.partial(_.before, 2);

            // Object Functions
            // ----------------

            // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
            var hasEnumBug = !{
                toString: null
            }.propertyIsEnumerable('toString');
            var nonEnumerableProps = ['constructor', 'valueOf',
                'isPrototypeOf', 'toString',
                'propertyIsEnumerable', 'hasOwnProperty',
                'toLocaleString'
            ];

            function collectNonEnumProps(obj, keys) {
                var nonEnumIdx = nonEnumerableProps.length;
                var proto = typeof obj.constructor === 'function' ?
                    FuncProto : ObjProto;

                while (nonEnumIdx--) {
                    var prop = nonEnumerableProps[nonEnumIdx];
                    if (prop === 'constructor' ? _.has(obj, prop) : prop in
                        obj &&
                        obj[prop] !== proto[prop] && !_.contains(keys, prop)
                    ) {
                        keys.push(prop);
                    }
                }
            }

            // Retrieve the names of an object's own properties.
            // Delegates to **ECMAScript 5**'s native `Object.keys`
            _.keys = function(obj) {
                if (!_.isObject(obj)) return [];
                if (nativeKeys) return nativeKeys(obj);
                var keys = [];
                for (var key in obj)
                    if (_.has(obj, key)) keys.push(key);
                    // Ahem, IE < 9.
                if (hasEnumBug) collectNonEnumProps(obj, keys);
                return keys;
            };

            // Retrieve all the property names of an object.
            _.keysIn = function(obj) {
                if (!_.isObject(obj)) return [];
                var keys = [];
                for (var key in obj) keys.push(key);
                // Ahem, IE < 9.
                if (hasEnumBug) collectNonEnumProps(obj, keys);
                return keys;
            };

            // Retrieve the values of an object's properties.
            _.values = function(obj) {
                var keys = _.keys(obj);
                var length = keys.length;
                var values = Array(length);
                for (var i = 0; i < length; i++) {
                    values[i] = obj[keys[i]];
                }
                return values;
            };

            // Convert an object into a list of `[key, value]` pairs.
            _.pairs = function(obj) {
                var keys = _.keys(obj);
                var length = keys.length;
                var pairs = Array(length);
                for (var i = 0; i < length; i++) {
                    pairs[i] = [keys[i], obj[keys[i]]];
                }
                return pairs;
            };

            // Invert the keys and values of an object. The values must be serializable.
            _.invert = function(obj) {
                var result = {};
                var keys = _.keys(obj);
                for (var i = 0, length = keys.length; i < length; i++) {
                    result[obj[keys[i]]] = keys[i];
                }
                return result;
            };

            // Return a sorted list of the function names available on the object.
            // Aliased as `methods`
            _.functions = _.methods = function(obj) {
                var names = [];
                for (var key in obj) {
                    if (_.isFunction(obj[key])) names.push(key);
                }
                return names.sort();
            };

            // Extend a given object with all the properties in passed-in object(s).
            _.extend = createAssigner(_.keysIn);

            // Assigns a given object with all the own properties in the passed-in object(s)
            // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
            _.assign = createAssigner(_.keys);

            // Returns the first key on an object that passes a predicate test
            _.findKey = function(obj, predicate, context) {
                predicate = cb(predicate, context);
                var keys = _.keys(obj),
                    key;
                for (var i = 0, length = keys.length; i < length; i++) {
                    key = keys[i];
                    if (predicate(obj[key], key, obj)) return key;
                }
            };

            // Return a copy of the object only containing the whitelisted properties.
            _.pick = function(obj, iteratee, context) {
                var result = {},
                    key;
                if (obj == null) return result;
                if (_.isFunction(iteratee)) {
                    iteratee = optimizeCb(iteratee, context);
                    for (key in obj) {
                        var value = obj[key];
                        if (iteratee(value, key, obj)) result[key] = value;
                    }
                } else {
                    var keys = flatten(arguments, false, false, 1);
                    obj = new Object(obj);
                    for (var i = 0, length = keys.length; i < length; i++) {
                        key = keys[i];
                        if (key in obj) result[key] = obj[key];
                    }
                }
                return result;
            };

            // Return a copy of the object without the blacklisted properties.
            _.omit = function(obj, iteratee, context) {
                if (_.isFunction(iteratee)) {
                    iteratee = _.negate(iteratee);
                } else {
                    var keys = _.map(flatten(arguments, false, false, 1),
                        String);
                    iteratee = function(value, key) {
                        return !_.contains(keys, key);
                    };
                }
                return _.pick(obj, iteratee, context);
            };

            // Fill in a given object with default properties.
            _.defaults = function(obj) {
                if (!_.isObject(obj)) return obj;
                for (var i = 1, length = arguments.length; i < length; i++) {
                    var source = arguments[i];
                    for (var prop in source) {
                        if (obj[prop] === void 0) obj[prop] = source[prop];
                    }
                }
                return obj;
            };

            // Creates an object that inherits from the given prototype object.
            // If additional properties are provided then they will be added to the
            // created object.
            _.create = function(prototype, props) {
                var result = baseCreate(prototype);
                if (props) _.assign(result, props);
                return result;
            };

            // Create a (shallow-cloned) duplicate of an object.
            _.clone = function(obj) {
                if (!_.isObject(obj)) return obj;
                return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
            };

            // Invokes interceptor with the obj, and then returns obj.
            // The primary purpose of this method is to "tap into" a method chain, in
            // order to perform operations on intermediate results within the chain.
            _.tap = function(obj, interceptor) {
                interceptor(obj);
                return obj;
            };

            // Internal recursive comparison function for `isEqual`.
            var eq = function(a, b, aStack, bStack) {
                // Identical objects are equal. `0 === -0`, but they aren't identical.
                // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
                if (a === b) return a !== 0 || 1 / a === 1 / b;
                // A strict comparison is necessary because `null == undefined`.
                if (a == null || b == null) return a === b;
                // Unwrap any wrapped objects.
                if (a instanceof _) a = a._wrapped;
                if (b instanceof _) b = b._wrapped;
                // Compare `[[Class]]` names.
                var className = toString.call(a);
                if (className !== toString.call(b)) return false;
                switch (className) {
                    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
                    case '[object RegExp]':
                        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
                    case '[object String]':
                        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                        // equivalent to `new String("5")`.
                        return '' + a === '' + b;
                    case '[object Number]':
                        // `NaN`s are equivalent, but non-reflexive.
                        // Object(NaN) is equivalent to NaN
                        if (+a !== +a) return +b !== +b;
                        // An `egal` comparison is performed for other numeric values.
                        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                    case '[object Date]':
                    case '[object Boolean]':
                        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                        // millisecond representations. Note that invalid dates with millisecond representations
                        // of `NaN` are not equivalent.
                        return +a === +b;
                }

                var areArrays = className === '[object Array]';
                if (!areArrays) {
                    if (typeof a != 'object' || typeof b != 'object')
                        return false;

                    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
                    // from different frames are.
                    var aCtor = a.constructor,
                        bCtor = b.constructor;
                    if (aCtor !== bCtor && !(_.isFunction(aCtor) &&
                        aCtor instanceof aCtor &&
                        _.isFunction(bCtor) && bCtor instanceof bCtor
                    ) && ('constructor' in a && 'constructor' in b)) {
                        return false;
                    }
                }
                // Assume equality for cyclic structures. The algorithm for detecting cyclic
                // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
                var length = aStack.length;
                while (length--) {
                    // Linear search. Performance is inversely proportional to the number of
                    // unique nested structures.
                    if (aStack[length] === a) return bStack[length] ===
                        b;
                }

                // Add the first object to the stack of traversed objects.
                aStack.push(a);
                bStack.push(b);

                // Recursively compare objects and arrays.
                if (areArrays) {
                    // Compare array lengths to determine if a deep comparison is necessary.
                    length = a.length;
                    if (length !== b.length) return false;
                    // Deep compare the contents, ignoring non-numeric properties.
                    while (length--) {
                        if (!eq(a[length], b[length], aStack, bStack))
                            return false;
                    }
                } else {
                    // Deep compare objects.
                    var keys = _.keys(a),
                        key;
                    length = keys.length;
                    // Ensure that both objects contain the same number of properties before comparing deep equality.
                    if (_.keys(b).length !== length) return false;
                    while (length--) {
                        // Deep compare each member
                        key = keys[length];
                        if (!(_.has(b, key) && eq(a[key], b[key],
                            aStack, bStack))) return false;
                    }
                }
                // Remove the first object from the stack of traversed objects.
                aStack.pop();
                bStack.pop();
                return true;
            };

            // Perform a deep comparison to check if two objects are equal.
            _.isEqual = function(a, b) {
                return eq(a, b, [], []);
            };

            // Is a given array, string, or object empty?
            // An "empty" object has no enumerable own-properties.
            _.isEmpty = function(obj) {
                if (obj == null) return true;
                if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))
                    return obj.length === 0;
                for (var key in obj)
                    if (_.has(obj, key)) return false;
                return true;
            };

            // Is a given value a DOM element?
            _.isElement = function(obj) {
                return !!(obj && obj.nodeType === 1);
            };

            // Is a given value an array?
            // Delegates to ECMA5's native Array.isArray
            _.isArray = nativeIsArray || function(obj) {
                return toString.call(obj) === '[object Array]';
            };

            // Is a given variable an object?
            _.isObject = function(obj) {
                var type = typeof obj;
                return type === 'function' || type === 'object' && !!obj;
            };

            // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
            _.each(['Arguments', 'Function', 'String', 'Number', 'Date',
                'RegExp', 'Error'
            ], function(name) {
                _['is' + name] = function(obj) {
                    return toString.call(obj) === '[object ' + name +
                        ']';
                };
            });

            // Define a fallback version of the method in browsers (ahem, IE < 9), where
            // there isn't any inspectable "Arguments" type.
            if (!_.isArguments(arguments)) {
                _.isArguments = function(obj) {
                    return _.has(obj, 'callee');
                };
            }

            // Optimize `isFunction` if appropriate. Work around an IE 11 bug (#1621).
            // Work around a Safari 8 bug (#1929)
            if (typeof / . / != 'function' && typeof Int8Array != 'object') {
                _.isFunction = function(obj) {
                    return typeof obj == 'function' || false;
                };
            }

            // Is a given object a finite number?
            _.isFinite = function(obj) {
                return isFinite(obj) && !isNaN(parseFloat(obj));
            };

            // Is the given value `NaN`? (NaN is the only number which does not equal itself).
            _.isNaN = function(obj) {
                return _.isNumber(obj) && obj !== +obj;
            };

            // Is a given value a boolean?
            _.isBoolean = function(obj) {
                return obj === true || obj === false || toString.call(obj) ===
                    '[object Boolean]';
            };

            // Is a given value equal to null?
            _.isNull = function(obj) {
                return obj === null;
            };

            // Is a given variable undefined?
            _.isUndefined = function(obj) {
                return obj === void 0;
            };

            // Shortcut function for checking if an object has a given property directly
            // on itself (in other words, not on a prototype).
            _.has = function(obj, key) {
                return obj != null && hasOwnProperty.call(obj, key);
            };

            // Utility Functions
            // -----------------

            // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
            // previous owner. Returns a reference to the Underscore object.
            _.noConflict = function() {
                root._ = previousUnderscore;
                return this;
            };

            // Keep the identity function around for default iteratees.
            _.identity = function(value) {
                return value;
            };

            // Predicate-generating functions. Often useful outside of Underscore.
            _.constant = function(value) {
                return function() {
                    return value;
                };
            };

            _.noop = function() {};

            _.property = function(key) {
                return function(obj) {
                    return obj == null ? void 0 : obj[key];
                };
            };

            // Generates a function for a given object that returns a given property (including those of ancestors)
            _.propertyOf = function(obj) {
                return obj == null ? function() {} : function(key) {
                    return obj[key];
                };
            };

            // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
            _.matches = function(attrs) {
                var pairs = _.pairs(attrs),
                    length = pairs.length;
                return function(obj) {
                    if (obj == null) return !length;
                    obj = new Object(obj);
                    for (var i = 0; i < length; i++) {
                        var pair = pairs[i],
                            key = pair[0];
                        if (pair[1] !== obj[key] || !(key in obj))
                            return false;
                    }
                    return true;
                };
            };

            // Run a function **n** times.
            _.times = function(n, iteratee, context) {
                var accum = Array(Math.max(0, n));
                iteratee = optimizeCb(iteratee, context, 1);
                for (var i = 0; i < n; i++) accum[i] = iteratee(i);
                return accum;
            };

            // Return a random integer between min and max (inclusive).
            _.random = function(min, max) {
                if (max == null) {
                    max = min;
                    min = 0;
                }
                return min + Math.floor(Math.random() * (max - min + 1));
            };

            // A (possibly faster) way to get the current timestamp as an integer.
            _.now = Date.now || function() {
                return new Date().getTime();
            };

            // List of HTML entities for escaping.
            var escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#x27;',
                '`': '&#x60;'
            };
            var unescapeMap = _.invert(escapeMap);

            // Functions for escaping and unescaping strings to/from HTML interpolation.
            var createEscaper = function(map) {
                var escaper = function(match) {
                    return map[match];
                };
                // Regexes for identifying a key that needs to be escaped
                var source = '(?:' + _.keys(map).join('|') + ')';
                var testRegexp = RegExp(source);
                var replaceRegexp = RegExp(source, 'g');
                return function(string) {
                    string = string == null ? '' : '' + string;
                    return testRegexp.test(string) ? string.replace(
                        replaceRegexp, escaper) : string;
                };
            };
            _.escape = createEscaper(escapeMap);
            _.unescape = createEscaper(unescapeMap);

            // If the value of the named `property` is a function then invoke it with the
            // `object` as context; otherwise, return it.
            _.result = function(object, property, fallback) {
                var value = object == null ? void 0 : object[property];
                if (value === void 0) {
                    value = fallback;
                }
                return _.isFunction(value) ? value.call(object) : value;
            };

            // Generate a unique integer id (unique within the entire client session).
            // Useful for temporary DOM ids.
            var idCounter = 0;
            _.uniqueId = function(prefix) {
                var id = ++idCounter + '';
                return prefix ? prefix + id : id;
            };

            // By default, Underscore uses ERB-style template delimiters, change the
            // following template settings to use alternative delimiters.
            _.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };

            // When customizing `templateSettings`, if you don't want to define an
            // interpolation, evaluation or escaping regex, we need one that is
            // guaranteed not to match.
            var noMatch = /(.)^/;

            // Certain characters need to be escaped so that they can be put into a
            // string literal.
            var escapes = {
                "'": "'",
                '\\': '\\',
                '\r': 'r',
                '\n': 'n',
                '\u2028': 'u2028',
                '\u2029': 'u2029'
            };

            var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

            var escapeChar = function(match) {
                return '\\' + escapes[match];
            };

            // JavaScript micro-templating, similar to John Resig's implementation.
            // Underscore templating handles arbitrary delimiters, preserves whitespace,
            // and correctly escapes quotes within interpolated code.
            // NB: `oldSettings` only exists for backwards compatibility.
            _.template = function(text, settings, oldSettings) {
                if (!settings && oldSettings) settings = oldSettings;
                settings = _.defaults({}, settings, _.templateSettings);

                // Combine delimiters into one regular expression via alternation.
                var matcher = RegExp([
                    (settings.escape || noMatch).source, (settings.interpolate ||
                        noMatch).source, (settings.evaluate ||
                        noMatch).source
                ].join('|') + '|$', 'g');

                // Compile the template source, escaping string literals appropriately.
                var index = 0;
                var source = "__p+='";
                text.replace(matcher, function(match, escape, interpolate,
                    evaluate, offset) {
                    source += text.slice(index, offset).replace(escaper,
                        escapeChar);
                    index = offset + match.length;

                    if (escape) {
                        source += "'+\n((__t=(" + escape +
                            "))==null?'':_.escape(__t))+\n'";
                    } else if (interpolate) {
                        source += "'+\n((__t=(" + interpolate +
                            "))==null?'':__t)+\n'";
                    } else if (evaluate) {
                        source += "';\n" + evaluate + "\n__p+='";
                    }

                    // Adobe VMs need the match returned to produce the correct offest.
                    return match;
                });
                source += "';\n";

                // If a variable is not specified, place data values in local scope.
                if (!settings.variable) source = 'with(obj||{}){\n' +
                    source + '}\n';

                source = "var __t,__p='',__j=Array.prototype.join," +
                    "print=function(){__p+=__j.call(arguments,'');};\n" +
                    source + 'return __p;\n';

                try {
                    var render = new Function(settings.variable || 'obj',
                        '_', source);
                } catch (e) {
                    e.source = source;
                    throw e;
                }

                var template = function(data) {
                    return render.call(this, data, _);
                };

                // Provide the compiled source as a convenience for precompilation.
                var argument = settings.variable || 'obj';
                template.source = 'function(' + argument + '){\n' + source +
                    '}';

                return template;
            };

            // Add a "chain" function. Start chaining a wrapped Underscore object.
            _.chain = function(obj) {
                var instance = _(obj);
                instance._chain = true;
                return instance;
            };

            // OOP
            // ---------------
            // If Underscore is called as a function, it returns a wrapped object that
            // can be used OO-style. This wrapper holds altered versions of all the
            // underscore functions. Wrapped objects may be chained.

            // Helper function to continue chaining intermediate results.
            var result = function(instance, obj) {
                return instance._chain ? _(obj).chain() : obj;
            };

            // Add your own custom functions to the Underscore object.
            _.mixin = function(obj) {
                _.each(_.functions(obj), function(name) {
                    var func = _[name] = obj[name];
                    _.prototype[name] = function() {
                        var args = [this._wrapped];
                        push.apply(args, arguments);
                        return result(this, func.apply(_, args));
                    };
                });
            };

            // Add all of the Underscore functions to the wrapper object.
            _.mixin(_);

            // Add all mutator Array functions to the wrapper.
            _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice',
                'unshift'
            ], function(name) {
                var method = ArrayProto[name];
                _.prototype[name] = function() {
                    var obj = this._wrapped;
                    method.apply(obj, arguments);
                    if ((name === 'shift' || name === 'splice') && obj.length ===
                        0) delete obj[0];
                    return result(this, obj);
                };
            });

            // Add all accessor Array functions to the wrapper.
            _.each(['concat', 'join', 'slice'], function(name) {
                var method = ArrayProto[name];
                _.prototype[name] = function() {
                    return result(this, method.apply(this._wrapped,
                        arguments));
                };
            });

            // Extracts the result from a wrapped and chained object.
            _.prototype.value = function() {
                return this._wrapped;
            };

            // AMD registration happens at the end for compatibility with AMD loaders
            // that may not enforce next-turn semantics on modules. Even though general
            // practice for AMD registration is to be anonymous, underscore registers
            // as a named module because, like jQuery, it is a base library that is
            // popular enough to be bundled in a third party lib, but not be part of
            // an AMD load request. Those cases could generate an error when an
            // anonymous define() is called outside of a loader request.
            //if (typeof define === 'function' && define.amd) {
            //    define('underscore', [], function() {
            //      return _;
            //    });
            //  }
            //}.call(this));

            UI._ = _;

            module.exports = _;

        }, {
            "./core": 5
        }
    ]
}, {}, [10]);
