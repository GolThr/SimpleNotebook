var s_username;
var s_email;
var currentBookId;
var currentNoteJson;

function init() {
    s_username = sessionStorage.getItem('username');
    s_email = sessionStorage.getItem('email');
    if(s_username == '' || s_username == undefined){
        location.href = 'login.html';
    }
    $('.show_s_username').text(s_username);
    greeting();
    currentBookId = '1';
    getNotesList(currentBookId);
}

function greeting() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var h = myDate.getHours();//获取当前小时数(0-23)
    var m = myDate.getMinutes();//获取当前分钟数(0-59)
    // var s = myDate.getSeconds();//获取当前秒
    var week = myDate.getDay();
    var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var greetStr = "";
    var dateStr = "";
    if(h > 3 && h <= 8){
        greetStr += "早上";
    }else if(h > 8 && h <= 12){
        greetStr += "上午";
    }else  if(h > 12 && h <= 18){
        greetStr += "下午";
    }else{
        greetStr += "晚上";
    }
    greetStr = greetStr + "好，" + s_username + "。";
    dateStr = year + "年" + mon + "月" + date + "日" + weeks[week];
    $('.greeting').text(greetStr);
    $('.today_date').text(dateStr);
}

function getNotesList(type) {
    var data = {"user_id":s_email,"book_id":type};
    //LoginAjax
    console.log("Ajax: index-GetData");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/GetNotes.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg[1].length >= 0){
                renderingNoteList(msg[1]);
            }else{

            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function renderingNoteList(msg) {
    console.log(msg);
    $('#note_list_content').html('');
    for(var i in msg){
        $("#note_list_content").append('<div class="note_item" index="'+msg[i].note_id+'" onclick="showNoteItem($(this))">\n' +
            '                    <img class="note_ico" src="images/notes.png" alt="note_ico">\n' +
            '                    <div class="note_info_content">\n' +
            '                        <h5 class="note_list_title">'+msg[i].title+'</h5>\n' +
            '                        <p class="note_info">'+msg[i].content+'</p>\n' +
            '                    </div>\n' +
            '                </div>');
    }
}

function changeView(view) {
    if(view=='home'){
        $('#home').show();
        $('#noteItemShow').hide();
        $('#noteItemEdit').hide();
        $('#booksShow').hide();
        $('#todosShow').hide();
    }else if(view == 'show_note'){
        $('#home').hide();
        $('#noteItemShow').show();
        $('#noteItemEdit').hide();
        $('#booksShow').hide();
        $('#todosShow').hide();
    }else if(view == 'edit_note'){
        $('#home').hide();
        $('#noteItemShow').hide();
        $('#noteItemEdit').show();
        $('#booksShow').hide();
        $('#todosShow').hide();
    }else if(view == 'show_book'){
        $('#home').hide();
        $('#noteItemShow').hide();
        $('#noteItemEdit').hide();
        $('#booksShow').show();
        $('#todosShow').hide();
    }else if(view == 'show_todo'){
        $('#home').hide();
        $('#noteItemShow').hide();
        $('#noteItemEdit').hide();
        $('#booksShow').hide();
        $('#todosShow').show();
    }
}

function onAddBtn() {
    document.getElementById("add_btn").src = "images/ic_add_green.png";
}
function leaveAddBtn() {
    $("#add_btn").attr("src", "images/ic_add.png");
}
function onSearchBtn() {
    $("#search_btn").attr("src", "images/ic_search_green.png");
}
function leaveSearchBtn() {
    $("#search_btn").attr("src", "images/ic_search.png");
}
function onMask() {
    $(".add_note_icon_mask").text("换图标");
}
function leaveMask() {
    $(".add_note_icon_mask").text("");
}
function onAddNoteBtn() {
    $("#add_dialog_pop").fadeIn("fast");
    $("#add_dialog_body").animate({width:'300px', height:'300px'}, "fast", function () {
        $(".add_pop_inner").fadeIn("fast");
    })
}
$("#add_dialog_pop").click(function () {
    $(".add_pop_inner").hide();
    $("#add_dialog_body").animate({width:'1px', height:'1px'}, "fast")
    $("#add_dialog_pop").fadeOut("fast");
})
$("#add_dialog_body").click(function (event) {
    event.stopPropagation();
})

function getNoteItem(note_id) {
    changeView('show_note');
    var data = {"user_id":s_email,"note_id":note_id};
    //Ajax
    console.log("Ajax: index-ShowNoteItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/GetNoteItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                currentNoteJson = msg;
                $('#note_title').text(msg.title);
                $('#note_content').html(marked(msg.content));
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function showNoteItem(obj) {
    // obj.css({'background': '#fff'});
    getNoteItem(obj.attr('index'));
}

function modifyNoteItem() {
    var m_title = $.trim($('#note_edit_title').val());
    var m_content = $.trim($('#note_edit_content').text());
    var data = {"user_id":s_email,"note_id":currentNoteJson.note_id,"m_title":m_title,"m_content":m_content};
    //Ajax
    console.log("Ajax: index-ModifyNoteItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/UpdateNoteInfo.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            getNoteItem(currentNoteJson.note_id);
            getNotesList(currentBookId);
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function onEditNote() {
    changeView('edit_note');
    $('#note_edit_title').val(currentNoteJson.title);
    $('#note_edit_content').text(currentNoteJson.content);
}