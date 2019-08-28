$(function() {
    var $from = $("#form_date").data("flyForm"); //表单对象
    $from.getControl("time").datepicker({
        onBlur: function(obj,val) {
            alert(val);
        }
    });
});