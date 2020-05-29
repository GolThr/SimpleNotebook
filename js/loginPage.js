$('.btn_login').click(function (e) {
    if(checkUser()){
        toLogin();
    }
});

function toLogin() {
    var username = $.trim($('#username').val());
    var pwd = $.trim($('#pwd').val());
    var data = {"username":username,"pwd":pwd};
    //LoginAjax
    console.log("Ajax: Login");
    console.log(data);
    $.ajax({
        url: "../server/login.php", //后台请求数据
        dataType: "json",
        data: {"intranet_ip":"1922.168.2.1","extranet_ip":"123.124.5.3"},
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            $("#response").html(msg.responseText);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
            $("#response").html(msg.responseText);
        }
    });
}
