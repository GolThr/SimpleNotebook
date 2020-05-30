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
        url: "/SimpleNotebook/server/Login.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                sessionStorage.clear();
                sessionStorage.setItem('username', msg.nickname);
                sessionStorage.setItem('email', username);
                location.href = 'index.html';
            }else if(msg.successful == '0'){
                alert('密码错误');
            }else{
                location.href = 'login_failed.html';
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}
