$(function() {
    var $fromi = $("#form_init").data("flyForm"); //表单对象
    $fromi.getControl("init2").combobox({
        data: combobox1
    });

    var $fromc = $("#form_clear").data("flyForm"); //表单对象
    $fromc.getControl("clear").combobox({
        isShowClear: true,
        tip: '文本框还原态',
        chear: function() {
            alert("?即是空！");
        }
    });
    var $fromt = $("#form_tree").data("flyForm"); //表单对象
    $fromt.getControl("itree").combobox({
        isShowClear: true,
        tree: {
            data: '../json/treeData2.txt',
            textField: "name",
            valueField: "code",
            checkbox: false,
            isLeaf: function(node) {
                // debugger;
                if (!node) return true;

                if (node.code) {
                    if (node.code.length == 15) {
                        return true;
                    }
                }
                return false;
            },
            onBeforeSelect: function(e, node) {
                if (node.data.code.length == 15) {
                    return true;
                }
                return false;
            }
        }
    });
    var $froms = $("#form_select").data("flyForm"); //表单对象
    $froms.getControl("iselect").combobox({
        data: [{
            mc: '已采用',
            dm: '1'
        }, {
            mc: '未采用',
            dm: '2'
        }, {
            mc: '未审核',
            dm: '3'
        }],
        valueField: 'dm',
        textField: 'mc',
        tip: '请选择未审核，有惊喜！',
        onSelect: function(data) {
            if(data.dm=="3"){
                $("#form_select input[name=ieffect]").addClass("disabled").attr("disabled",true);
            }else{
                $("#form_select input[name=ieffect]").removeClass("disabled").attr("disabled",false);
            }
        }
    });
});