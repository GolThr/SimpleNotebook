var s_username;
var s_email;
var currentBookId;
var currentBookTitle;
var currentNoteJson;

function init() {
    s_username = sessionStorage.getItem('username');
    s_email = sessionStorage.getItem('email');
    if(s_username == '' || s_username == undefined){
        location.href = 'login.html';
    }
    $('.show_s_username').text(s_username);
    greeting();
    getNotesList('1', '记事本');
    getTodayTodos();
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

function getNotesList(book_id, book_title) {
    var data = {"user_id":s_email,"book_id":book_id};
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
            if(msg[1].length > 0){
                currentBookId = book_id;
                currentBookTitle = book_title;
                $('#search_input').attr('placeholder', '在 '+book_title+' 中搜索...');
                renderingNoteList(msg[1]);
            }else{
                currentBookId = book_id;
                currentBookTitle = book_title;
                $('#search_input').attr('placeholder', '在 '+book_title+' 中搜索...');
                renderingNoteListNone();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function renderingNoteList(msg) {
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

function renderingNoteListNone() {
    $('#note_list_content').html('');
    $("#note_list_content").append('<div class="note_item_none_content">\n' +
        '                    <img class="note_item_none_ico" src="images/ic_list_none.png">\n' +
        '                </div>');
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

function hideAddDialog(){
    $(".add_pop_inner").hide();
    $("#add_dialog_body").animate({width:'1px', height:'1px'}, "fast")
    $("#add_dialog_pop").fadeOut("fast");
}

$("#add_dialog_pop").click(function () {
    hideAddDialog();
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
    var m_content = $.trim($('#note_edit_content').val());
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
            if(msg.successful == '1'){
                getNoteItem(currentNoteJson.note_id);
                getNotesList(currentBookId, currentBookTitle);
            }
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
    $('#note_edit_content').val(currentNoteJson.content);
    $('#finish_edit_note').removeAttr('onclick');
    $('#finish_edit_note').attr('onclick', 'modifyNoteItem()');
}

function deleteNoteItem() {
    var data = {"user_id":s_email,"note_id":currentNoteJson.note_id};
    //Ajax
    console.log("Ajax: index-DeleteNoteItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/DeleteNoteItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getNotesList(currentBookId, currentBookTitle);
                changeView('home');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function addNoteItem() {
    var title = $.trim($('#note_edit_title').val());
    var content = $.trim($('#note_edit_content').val());
    var data = {"user_id":s_email,"book_id":currentBookId,"title":title,"content":content};
    //Ajax
    console.log("Ajax: index-AddNoteItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/AddNoteItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getNotesList(currentBookId, currentBookTitle);
                changeView('home');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function onCreateNote() {
    var title = $.trim($('#new_note_name').val());
    hideAddDialog();
    changeView('edit_note');
    $('#note_edit_title').val(title);
    $('#note_edit_content').val('开始您的创作...');
    $('#finish_edit_note').removeAttr('onclick');
    $('#finish_edit_note').attr('onclick', 'addNoteItem()');
}

function getBooksList() {
    var data = {"user_id":s_email};
    //LoginAjax
    console.log("Ajax: index-GetBooksList");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/GetBooks.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg[1].length > 0){
                renderingBookList(msg[1]);
            }else{

            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function renderingBookList(msg) {
    $('#books_list').html('');
    for(var i in msg){
        $("#books_list").append('<div class="book_item_content" index="'+msg[i].book_id+'" bookname="'+msg[i].title+'" onclick="showBookItem($(this))">\n' +
            '                    <div class="book_title_content">\n' +
            '                    <img class="book_item_delete_btn" index="'+msg[i].book_id+'" src="images/ic_delete.png" style="display: none" onclick="deleteBookItem($(this))"/>\n' +
            '                        <span class="book_item_title">'+msg[i].title+'</span>\n' +
            '                    </div>\n' +
            '                    <span class="book_item_date">'+msg[i].date.substring(0,10)+'</span>\n' +
            '                </div>');
    }
    $('#books_list_dialog').html('');
    for(var i in msg){
        $("#books_list_dialog").append('<div class="book_item_content" index="'+msg[i].book_id+'" bookname="'+msg[i].title+'" onclick="moveNoteItem($(this))">\n' +
            '                    <div class="book_title_content">\n' +
            '                        <span class="book_item_title">'+msg[i].title+'</span>\n' +
            '                    </div>\n' +
            '                    <span class="book_item_date">'+msg[i].date.substring(0,10)+'</span>\n' +
            '                </div>');
    }
}

function showBooksList() {
    changeView('show_book');
    getBooksList();
}

function showBookItem(obj) {
    getNotesList(obj.attr('index'), obj.attr('bookname'));
}

function hideBookAddDialog(){
    $(".book_add_pop_inner").hide();
    $("#book_add_dialog_body").animate({width:'1px', height:'1px'}, "fast")
    $("#book_add_dialog_pop").fadeOut("fast");
}

$("#book_add_dialog_pop").click(function () {
    hideBookAddDialog();
})
$("#book_add_dialog_body").click(function (event) {
    event.stopPropagation();
})

function addBookItem() {
    $("#book_add_dialog_pop").fadeIn("fast");
    $("#book_add_dialog_body").animate({width:'300px', height:'300px'}, "fast", function () {
        $(".book_add_pop_inner").fadeIn("fast");
    })
}

function onCreateBook() {
    var title = $.trim($('#book_new_name').val());
    hideBookAddDialog();
    var data = {"user_id":s_email,"title":title};
    //Ajax
    console.log("Ajax: index-OnCreateBook");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/AddBookItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getBooksList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function deleteBookItem(obj) {
    var book_id = obj.attr('index');
    var data = {"user_id":s_email,"book_id":book_id};
    //Ajax
    console.log("Ajax: index-DeleteNoteItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/DeleteBookItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getNotesList('1', '记事本');
                getBooksList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function onDeleteBook() {
    $('.book_item_delete_btn').show();
}

function hideBookChooseDialog(){
    $("#choose_book_dialog_body").fadeOut("fast");
    $("#choose_book_dialog_pop").fadeOut("fast");
}

$("#choose_book_dialog_pop").click(function () {
    hideBookChooseDialog();
})
$("#choose_book_dialog_body").click(function (event) {
    event.stopPropagation();
})

function onMoveNote() {
    $("#choose_book_dialog_pop").fadeIn("fast");
    $("#choose_book_dialog_body").fadeIn("fast");
    getBooksList();
}

function moveNoteItem(obj) {
    var book_id = obj.attr('index');
    var data = {"user_id":s_email,"note_id":currentNoteJson.note_id,"book_id":book_id};
    //Ajax
    console.log("Ajax: index-MoveNoteItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/MoveNoteItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                hideBookChooseDialog();
                getNotesList(currentBookId, currentBookTitle);
                changeView('home');
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function renderingTodoListNone() {
    $('#todos_list').html('');
    $("#todos_list").append('<div class="home_today_todos" id="today_todo_list">\n' +
        '                    <div class="nothing_todo">\n' +
        '                        <img class="nothing_todo_icon" src="images/ic_nothing_todo.png" alt="nothingToDo"/>\n' +
        '                        <span class="nothing_todo_text">没有要做的事情哦</span>\n' +
        '                    </div>\n' +
        '                </div>');
}

function renderingTodoList(msg) {
    $('#todos_list').html('');
    for(var i in msg){
        var class_add = '';
        var hide_add = '';
        if(msg[i].finished == '1'){
            class_add = 'to_do_item_finished';
            hide_add = 'visibility: hidden;';
        }
        $("#todos_list").append('<div class="todo_item_content '+class_add+'" index="'+msg[i].todo_id+'" onclick="getTodoItem($(this))">\n' +
            '                    <span class="todo_item_title">'+msg[i].title+'</span>\n' +
            '                    <span class="todo_item_info">'+msg[i].content+'</span>\n' +
            '                    <span class="todo_item_date">'+msg[i].date.substring(0,10)+'</span>\n' +
            '                    <span class="todo_item_finish_date">'+msg[i].finish_time.substring(0,10)+'</span>\n' +
            '                    <img class="todo_item_delete_btn" index="'+msg[i].todo_id+'" src="images/ic_complete.png" onclick="completeTodoItem($(this));event.stopPropagation();" style="'+hide_add+'"/>\n' +
            '                    <img class="todo_item_delete_btn" index="'+msg[i].todo_id+'" src="images/ic_del_trash.png" onclick="deleteTodoItem($(this));event.stopPropagation();"/>\n' +
            '                </div>');
    }
}

function getTodosList() {
    var data = {"user_id":s_email};
    //Ajax
    console.log("Ajax: index-GetTodosList");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/GetTodos.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg[1].length > 0){
                renderingTodoList(msg[1]);
            }else{
                renderingTodoListNone();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function showTodosList() {
    changeView('show_todo');
    getTodosList();
}

function hideTodoAddDialog(){
    $(".todo_add_pop_inner").hide();
    $("#todo_add_dialog_body").animate({width:'1px', height:'1px'}, "fast")
    $("#todo_add_dialog_pop").fadeOut("fast");
}

$("#todo_add_dialog_pop").click(function () {
    hideTodoAddDialog();
})
$("#todo_add_dialog_body").click(function (event) {
    event.stopPropagation();
})

function addTodoItem() {
    $("#todo_add_dialog_pop").fadeIn("fast");
    $("#todo_add_dialog_body").animate({width:'300px', height:'300px'}, "fast", function () {
        $(".todo_add_pop_inner").fadeIn("fast");
    })
}

function onCreateTodo() {
    var title = $.trim($('#todo_new_name').val());
    var content = $.trim($('#todo_new_info').val());
    var finish_time = $.trim($('#todo_new_date').val());
    hideTodoAddDialog();
    var data = {"user_id":s_email,"title":title,"content":content,"finish_time":finish_time};
    //Ajax
    console.log("Ajax: index-OnCreateTodo");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/AddTodoItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getTodosList();
            }else{
                alert('添加失败，请检查日期输入是否正确！！！')
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}


function deleteTodoItem(obj) {
    var todo_id = obj.attr('index');
    var data = {"user_id":s_email,"todo_id":todo_id};
    //Ajax
    console.log("Ajax: index-DeleteTodoItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/DeleteTodoItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getTodosList();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function hideTodoShowDialog(){
    $("#show_todo_dialog_body").fadeOut("fast");
    $("#show_todo_dialog_pop").fadeOut("fast");
}

$("#show_todo_dialog_pop").click(function () {
    hideTodoShowDialog();
})
$("#show_todo_dialog_body").click(function (event) {
    event.stopPropagation();
})

function showTodoItem(msg) {
    $("#show_todo_dialog_pop").fadeIn("fast");
    $("#show_todo_dialog_body").fadeIn("fast");
    $('#show_todo_dialog_title').text('');
    $('#show_todo_date').text('');
    $('#show_todo_finish').text('');
    $('#show_todo_info').text('');
    $('#show_todo_dialog_title').text(msg.title);
    $('#show_todo_date').text(msg.date.substring(0,10));
    $('#show_todo_finish').text(msg.finish_time.substring(0,10));
    $('#show_todo_info').text(msg.content);
}

function getTodoItem(obj) {
    var todo_id = obj.attr('index');
    var data = {"user_id":s_email,"todo_id":todo_id};
    //Ajax
    console.log("Ajax: index-GetTodoItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/GetTodoItem.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                showTodoItem(msg);
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function getTodayTodos() {
    var data = {"user_id":s_email};
    //Ajax
    console.log("Ajax: index-GetTodayTodos");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/GetTodayTodos.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg[1].length > 0){
                renderingTodayTodos(msg[1]);
            }else{
                renderingTodayTodosNone();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function renderingTodayTodos(msg) {
    $('#today_todo_list').html('');
    for(var i in msg){
        var class_add = '';
        var style_add = '';
        var finishedStr = '完成';
        if(msg[i].finished == '1'){
            class_add = 'to_do_item_finished';
            style_add = 'background: #b9f1e2;color: rgba(182, 182, 182, 0.8);';
            finishedStr = '已完成! ';
        }
        $("#today_todo_list").append('<div class="today_todo_item '+class_add+'" index="'+msg[i].todo_id+'" onclick="getTodoItem($(this))" style="'+style_add+'">\n' +
            '                        <div class="today_todo_content">\n' +
            '                            <span class="today_todo_item_title">'+msg[i].title+'</span>\n' +
            '                            <span class="today_todo_item_info">'+msg[i].content+'</span>\n' +
            '                        </div>\n' +
            '                        <span class="today_todo_item_complete" index="'+msg[i].todo_id+'" onclick="completeTodoItem($(this));event.stopPropagation();">'+finishedStr+'</span>\n' +
            '                    </div>');
    }
}

function renderingTodayTodosNone() {
    $('#today_todo_list').html('');
    $("#today_todo_list").append('<div class="nothing_todo">\n' +
        '                        <img class="nothing_todo_icon" src="images/ic_nothing_todo.png" alt="nothingToDo"/>\n' +
        '                        <span class="nothing_todo_text">今天还没有要做的事情哦</span>\n' +
        '                    </div>');
}

function completeTodoItem(obj) {
    var todo_id = obj.attr('index');
    var data = {"user_id":s_email,"todo_id":todo_id};
    //Ajax
    console.log("Ajax: index-CompleteTodoItem");
    console.log(data);
    $.ajax({
        url: "/SimpleNotebook/server/UpdateTodoInfo.php", //后台请求数据
        dataType: "json",
        data: data,
        type: "POST",
        success: function (msg) {
            console.log("success!");
            console.log(msg);
            if(msg.successful == '1'){
                getTodosList();
                getTodayTodos();
            }
        },
        error: function (msg) {
            console.log("error!");
            console.log(msg);
        }
    });
}

function onCompleteTodoBtn(obj) {

}
