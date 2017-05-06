updateEmail = function(newEmail){
  return monaca.cloud.User.saveProperties({"email": newEmail});
}  

$(function(){
  FastClick.attach(document.body);
  $('#updateEmail').click(function(){
    var newEmail = $('#newEmail').val();
    alert(newEmail);
    if ( newEmail === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-ban"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#newEmail").focus();
      return false;
    }
    alert(updateEmail(newEmail));
    /*
    monaca.cloud.User.login("me@example.com", "password")
.then(function()
{
   return monaca.cloud.User.saveProperty("nickname", "John");
})
.then(function()
{
   cosole.log("Your nickname was changed");
})*/
    
  });
});


/*
// FastClick
document.addEventListener("deviceready", function(){
  FastClick.attach(document.body);
}, false);

// define
var URL_POST_REGISTER = 'https://studyabroad.co.jp:studyabroad7205@www-s.studyabroad.co.jp/admin/hybridApp/register/';
var URL_POST_LOGIN = 'https://studyabroad.co.jp:studyabroad7205@www-s.studyabroad.co.jp/admin/hybridApp/login/';

// 引数のhtmlにリダイレクトさせる
function redirect(destination, params){
  var destination = destination;
  location.href = destination + '.html';
}
  // jQuery
  $(function() {
    
//    $('.main-header').append(header);
//    $('.main-sidebar').append(sidebar);
    
    
    // autoLogin
    monaca.cloud.User.autoLogin()
      .done(function(res){
        var userName = res.user._username;
        $('#userName').text(userName);
      })
      .fail(function(){
      });
      
    // logout
    $('#logout').click(function(){
      monaca.cloud.User.logout()
        .done(function(res){
          redirect('index');
        })
        .fail(function(){
        });
    });
    
    $('#updatePassword').click(function(){
      var oldPassword = $('#oldPassword').val();
      if ( oldPassword === '' ) {
        $("#flashMessage")
          .empty()
          .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-check"></i> 現在のパスワードは必ず入力してください。</p></div>');
        $("#oldPassword").focus();
        return false;
      }
      var newPassword = $('#newPassword').val();
      if ( newPassword === '' ) {
        $("#flashMessage")
          .empty()
          .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-check"></i> 新しく設定するパスワードは必ず入力してください。</p></div>');
        $("#newPassword").focus();
        return false;
      }
      
      // パスワード更新処理
      monaca.cloud.User.updatePassword(oldPassword, newPassword)
        .done(function(res){
          $('#flashMessage')
            .empty()
            .append('<div class="alert bg-aqua"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-smile-o"></i> パスワードの変更が完了しました。</p></div>');
        })
        .fail(function(err){
          $("#flashMessage")
            .empty()
            .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-check"></i> 入力されたパスワードに誤りがあります。</p></div>');
          return false;
        });
    });
    
    $('#blogPostFormBtn').click(function(){
      var href = 'https://www.studyabroad.co.jp/counsel/counsel.php';
      var desk = $('#BlogSeminarDesk').val();
      alert(desk);
//      var form = $('#blogPostForm');
//      var query = form.serialize();
//      var param = form.serializeArray();
      
//      $.each(param, function( i, v) {
//      alert(i);
//      alert(v);
//        var field = i;
//        var value = v;
//    	});
      
      
      // ajax
      $.ajax(
        {
          type: 'POST',
          url: href,
          data: {
          'desk': desk
        },
        dataType: 'json',
        success: function(res){
          alert(res);
        },
        error: function(err){
          alert(err);
        } 
      }
      );


      return false;
    });
  });

// ログイン済みかの認証を行う
  function isAuthenticated(){
    monaca.cloud.User.autoLogin()
      .done(function(res){
        redirect('top');  
      })
      .fail(function(error){
        // jQuery
        $(function() {
          // ログインボタンが押されたら
          $("#login").click(function(){
            $("#errors").empty();
            var email = $("#email").val();
            if ( email === '' ) {
              $("#flashMessage")
                .empty()
                .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> メールアドレスは必ず入力してください。</p></div>');
              $("#email").focus();
              return false;
            }
            var password = $("#password").val();
            if ( password === '') {
              $("#flashMessage")
                .empty()
                .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> パスワードは必ず入力してください。</p></div>');
              $("#password").focus();
              return false;
              
            }
            // ログイン可能かチェック
            monaca.cloud.User.login(email, password)
              .done(function(){ // 成功なら
                monaca.cloud.User.autoLogin()
                  .done(function(){ // ログイン成功
                    redirect('top');
                  })
                  .fail(function(error){ // ログイン失敗
                    $("#flashMessage")
                      .empty()
                      .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ログインできません。</p></div>');
                    return false;
                  });
              })
              .fail(function(err){ // 失敗なら
                $("#flashMessage")
                  .empty()
                  .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ログインできません。</p></div>');
                return false;
              });
          })
        });
      });
  }


*/