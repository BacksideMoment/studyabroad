// 読み込んだら発火
document.addEventListener("deviceready", function(){
}, false);

$(function(){
  FastClick.attach(document.body);
  
  $('#logoutBtn').click(function(){
    logout();
  });
});

// ncmbモジュールの読み込み
// mobile backendアプリとの連携
// SDKの初期化
var ncmb = new NCMB(
  "b1682262339cb0e6a7e6ee3d0884d627ba048eb6d952a108ef852abe5c926fde", // アプリケーションキー
  "200bea16e05ad9d81c45db7518d35cf4336310091c2f2ece9b6075ee42b718f9" // クライアントキー
);
//Userのインスタンスを作成
var user = new ncmb.User();

// 引数のhtmlにリダイレクトさせる
var redirect = function(destination){
  var destination = destination;
  location.href = destination + '.html';
}


var userAdd = function(email, password){
  // set
  user.set("userName", email)
      .set("password", password);
  
  // 新規登録
  user.signUpByAccount()
      .then(function(){
        // 登録後処理
        login(email, password)
        redirect('top');
      })
      .catch(function(err){
        // エラー処理
        return false;
      });
}
 
var login = function(email, password){
  console.log(email)
  // ユーザー名とパスワードでログイン
  ncmb.User.login(email, password)
      .then(function(data){
        // ログイン後処理
        redirect('top');
      })
      .catch(function(err){
        // エラー処理
      });
}

var logout = function(){
  // ログアウト
  ncmb.User.logout();
  redirect('index');
}
  
var registConfirm = function(email){
  ncmb.User.requestSignUpEmail("test@example.com")
       .then(function(data){
          // 送信後処理
       })
       .catch(function(err){
         // エラー処理
       });
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

