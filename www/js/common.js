
// ユーザーデータ取得
getUserDate = function(){
  var user = [];
  user['id'] = window.localStorage.getItem('id');
  user['email'] = window.localStorage.getItem('email');
  user['password'] = window.localStorage.getItem('password');
  return user;
}

// デバイスが準備完了になったら発火
document.addEventListener('deviceready', function(){
  var user = new getUserDate();
//  new isAuthenticated();
  }, false);
  
if ( document.getElementById('main-header') !== null ){
  // header
  var headerElm = document.getElementById('main-header');
  headerElm.innerHTML = header;
  // sidebar
  var sidebarElm = document.getElementById('main-sidebar');
  sidebarElm.innerHTML = sidebar;
  // logout modal
  var logoutModalElm = document.getElementById('logoutModal');
  logoutModalElm.innerHTML = logoutModal;
}

// error
setMessage = function(str, color, icon){
  var message = [];
  message.push('<div class="alert bg-' + color + '">');
  message.push('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>');
  message.push('<p><i class="fa fa-' + icon + '"></i> ' + str + '</p>');
  message.push('</div>');
  return message;
}

postDiary = function(title, body){
  var flashMessageElement = document.getElementById('flashMessage');
  var user = new getUserDate();
  var Diary = monaca.cloud.Collection("diary");
  var oid = user['id'];
  var permission = {};
  permission[oid] = "r";
  Diary.insert({user_id: oid, title: title, body: body}, permission)
  .done(function(res){
    var errMsg = '<h4>投稿が完了しました！！<h4><br><a href="diaryList.html" class="btn btn-block bg-orange">みんなの日記を見る</a><a href="myDiaryList.html" class="btn btn-block bg-maroon">自分が投稿した日記一覧</a>';
    flashMessageElement.innerHTML = setMessage(errMsg, 'aqua', 'check').join("");
    return;
  })
  .fail(function(err){
    var errMsg = 'ブログの投稿が出来ませんでした。<br>再度お試しください';
    flashMessageElement.innerHTML = setMessage(errMsg, 'red', 'ban').join("");
    setTimeout("redirect('diary')", 3000);
    return false;
  });
}

postCheckDiary = function(){
  var flashMessageElement = document.getElementById('flashMessage');
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;
  // title
  if ( title === '' ) {
    var errMsg = 'タイトルは必ず入力してください。';
    flashMessageElement.innerHTML = setMessage(errMsg, 'red', 'ban').join("");
    return false;
  }
  // body
  if ( body === '' ) {
    var errMsg = '内容は必ず入力してください。';
    flashMessageElement.innerHTML = setMessage(errMsg, 'red', 'ban').join("");
    return false;
  }
  postDiary(title, body);
}

getMyDiaryList = function(){
  var user = new getUserDate();
  var Diary = monaca.cloud.Collection("diary");
  var Criteria = 'user_id == "' + user['id'] + '"';
  var Order = "_createdAt DESC";
  
  
  Diary.find(Criteria, Order, {propertyNames: ["title", "body", "_createdAt"]})
  .done(function(res)
  {
    var list = [];
    list.push('<table class="table table-striped">');
    list.push('<thead>');
    list.push('<tr>');
    list.push('<th>タイトル</th>');
    list.push('<th>登校時間</th>');
    list.push('</tr>');
    list.push('</thead>');
    list.push('<tbody>');
    for( var i = 0; i < res.totalItems; i++ ) {
    console.log(res.items[i].title);
    console.log(res.items[i]._createdAt);
      list.push('<tr>');
      list.push('<td>' + res.items[i].title + '</td>');
      list.push('<td>' + res.items[i]._createdAt + '</td>');
      list.push('</tr>');
    }
    list.push('</tbody>');
    list.push('</table>');
    console.log(list.join(""));
    var myDiaryList = document.getElementById('myDiaryList');
    myDiaryList.innerHTML = list.join("");
    
    return;
  })
  .fail(function(err)
  {
     console.log("Err#" + err.code +": " + err.message);
  });

}


/*
  monaca.cloud.User.autoLogin()
    .done(function(res){
      var users = [];
      users['name'] = res.user._username;
      users['email'] = res.user._email;
      users['password'] = res.user._password;
      redirect('top');  
    })
    .fail(function(err){
      alert(err.message);
      return false;
    });*/
updateEmail = function(newEmail){
  return monaca.cloud.User.saveProperties({"email": newEmail});
}  

$(function(){
  //fastclick
  FastClick.attach(document.body);
  
  $('#logoutBtn').click(function(){
    monaca.cloud.User.logout()
      .done(function(res){
         redirect('index');
         return false;
      })
      .fail(function(err){
         console.log("Err#" + err.code +": " + err.message);
         return false;
      });
  });
  
  $('#updateEmail').click(function(){
    var newEmail = $('#newEmail').val();
    if ( newEmail === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-ban"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#newEmail").focus();
      return false;
    }
  });
});


