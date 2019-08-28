$(function() {
    $("#itree").tree({  
            data: [
                { text: '节点1', children: [
                    { text: '节点1.1' },
                    { text: '节点1.2' },
                    { text: '节点1.3', children: [
                         { text: '节点1.3.1' },
                         { text: '节点1.3.2' }
                    ]
                    },
                    { text: '节点1.4' }
                 ]
                },
                { text: '节点2' },
                { text: '节点3' },
                { text: '节点4' }
            ]
    });
var $fromt = $("#form_tree").data("flyForm"); //表单对象
$fromt.getControl("itree").combobox({
    isShowClear: true,
    tree: {
        data: '../json/treeData2.txt',
        textField: "name",
        valueField: "code",
        checkbox: false,
        onBeforeSelect: function(e, node) {
            //处理常见的逻辑 比如只能选子节点等等
            if (node.data.level == "4") {
                return true;
            }
            return false;
        }
    }
});
});