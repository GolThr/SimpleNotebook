document.writeln('<div class="header">\n' +
    '    <div class="header_left" onclick="changeView(\'home\');getTodayTodos();">\n' +
    '        <img class="logo" src="images/logo.png">\n' +
    '        <p class="title">简单记事本</p>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="header_right">\n' +
    '        <div class="username" style="display: block" onmouseover="over();" onmouseleave="leave();">\n' +
    '            <div class="show_user">\n' +
    '                <img src="images/head_default_boy.png" alt="head" style="width: 25px; height: 25px"/>\n' +
    '                <a class="show_s_username"></a>\n' +
    '            </div>\n' +
    '            <div class="user_info_pop" id="user_info_pop" style="display: none;">\n' +
    '                <div class="pop_arrow">\n' +
    '                    <img src="images/pop_arrow.png" alt="arrow" style="width: 15px; height: 8px; margin-left: 155px;"/>\n' +
    '                </div>\n' +
    '                <div class="user_info_inner">\n' +
    '                    <div class="user_info_header">\n' +
    '                        <img src="images/head_default_boy.png" alt="head"/>\n' +
    '                        <a class="show_s_username"></a>\n' +
    '                    </div>\n' +
    '                    <div class="user_action_list">\n' +
    '                        <a id="personal" href="javascript:;">个人资料</a>\n' +
    '                        <a id="changePWD" href="javascript:;">修改密码</a>\n' +
    '                        <a id="help" href="javascript:;">帮助中心</a>\n' +
    '                        <a id="logout" href="javascript:;">退出</a>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');

function over() {
    //document.getElementById("user_info_pop").style.display = "inline";
    $("#user_info_pop").stop();
    $("#user_info_pop").slideDown("fast");
}
function leave() {
    //document.getElementById("user_info_pop").style.display = "none";
    $("#user_info_pop").stop();
    $("#user_info_pop").slideUp("fast");
}

$('#logout').click(function (e) {
    sessionStorage.clear();
    location.href = 'login.html';
});
