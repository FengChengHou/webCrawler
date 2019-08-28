$(function() {
    var $from = $("#form_event").data("flyForm"); //表单对象
    $from.getControl("iblur").textbox({
        onBlur: function(val) {
            alert(val);
        }
    });
     $from.getControl("ichange").textbox({
        onChange: function() {
            alert($(this).val());
        }
    });
      $from.getControl("iempty").textbox({
        onEmpty: function() {
            alert("空即是？！");
        }
    });
});