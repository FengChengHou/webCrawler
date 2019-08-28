'use strict';
$.widget('fly.handleForm', {
    defaultElement: 'form',
	options: {
        data: [],
        columns: [],
        beforeRemove: function(){return true;}
	},

	_create: function () {
        var self = this;
        self._$layout = $(self._tmpl).addClass('fly-grid');
        self._$header = self._$layout.find('.fly-table-header');
        self._$body = self._$layout.find('.fly-table-body');
        self._$empty = self._$layout.find('.fly-grid-empty');

        self._$header.html(self._renderHeader());
        var _$trs = self._$body.empty();
        for(var i = 0, len = self.options.data.length; i < len; i++){
            var _item = self.options.data[i],
                _$tr = $('<tr>').append(self._renderRow(_item)).data(_item);
            _$tr.find('td:last').addClass('fly-table-tr-last');
            _$trs.append(_$tr);
        }
	},

	_init: function () {
        this.element.html(this._$layout);
        this._initControl();
        this._addEvent();
        this._updateState();
	},
    
	_setOption: function ( key, value ) {
		this._super(key, value);
	},

	_destroy: function () {},
    
    _addEvent: function () {
        var self = this;
        $(self._$layout).on('click', '.operation', function () {
            var _$that = $(this);
            if (_$that.hasClass('add')) {
                self._add.call(self, _$that);
            }else if (_$that.hasClass('remove')) {
                self._remove.call(self, _$that);
            }
        });
    },

    _renderHeader: function () {
        var _columns = this.options.columns,
            _rowTr = '',
            _self = this,
            $that = _self.element;

        _rowTr += '<th width="40"><a class="operation add" href="javascript:;" title="增加"></a></th>',
        $.each(_columns, function(index, item){
            var _temTd = '', _width = item.width && item.width != '' ? item.width : 'auto';
            _rowTr += '<th width="'+ _width +'" title="'+item.title+'"><div>'+item.title+'</div></th>';
        });
        return _rowTr;
    },

    _renderRow: function (data) {
        var _columns = this.options.columns,
            _rowTr = '',
            _self = this,
            $that = _self.element;

        _rowTr += '<td width="40"><a class="operation remove" href="javascript:;" title="增加"></a></td>',
        $.each(_columns, function(index, item){
            var _value = {value: (data ? data[item.name] : "")};
            _rowTr += '<td ><div data-fly-handleform data-fly-options="this.text">'+ $.FUI.json.toJSON($.extend({}, item, _value)) +'</div></td>';
        });
        
        return _rowTr;
    },
    /**
     * 控件的渲染 貌似比想象中的复杂
     * 主要是值的绑定
     * @return {[type]} [description]
     */
    _initControl: function () {

        this._$layout.find('[data-fly-handleform]').each(function(){
            var _opts = $(this).text();
            $(this).textbox($.FUI.utils.parseOptions(_opts));
        });

       /* if(this.options.type != 'text')
            $.fn[this.options.type].call(this.control, this.options);
        else
            this.control.textbox(this.options);*/
    },
    // 添加行
    _add: function ($dom) {
        var self = this,
            _$tr = $('<tr></tr>').append(self._renderRow()),
            _trClass = '';
        _$tr.find('td:last').addClass('fly-table-tr-last');
        _$tr.appendTo( self._$body);
        self._updateState();
        self._initControl();
    },
    // 删除行
    _remove: function ($dom) {
        if( this.options.beforeRemove && 
            this.options.beforeRemove() == true){
            $dom.closest('tr').remove();
            this._updateState();    
        }
    },
    _updateState: function(){
        var _$trs = this._$body.find('tr');
        _$trs.each(function(i, item){
            var _trClass = '';
            if(i % 2 == 0)
                _trClass = 'fly-table-tr-odd';
            else
                _trClass = 'fly-table-tr-even';

            $(this).removeClass('fly-table-tr-odd fly-table-tr-even').addClass(_trClass);
        });

        if(_$trs.length)
            this._$empty.hide();
        else
            this._$empty.show();
        
    },
    _tmpl: [
        '<form data-fly-form action="">',
            '<div class="fly-grid-body">',
                '<table class="fly-table" cellspacing="0" cellpadding="0">',
                    '<thead class="fly-table-header">',
                    '</thead>',
                    '<tbody class="fly-table-body" id="cbsxlist_cont">',
                          
                    '</tbody>',
                '</table>',
                '<div class="fly-grid-empty">暂无数据展示</div>',
            '</div>',
        '</form>'
    ].join('')
});

$.FUI.ready(function(context) {
    $('[data-fly-handlerform]', context).each(function() {
        var opts = $(this).data('flyOptions');
        if(opts == 'this.text') opts = $(this).text();
        $(this).form(UI.utils.parseOptions(opts));
    });
});