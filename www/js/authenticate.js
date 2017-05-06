
// 引数のhtmlにリダイレクトさせる
redirect = function(destination){
  var destination = destination;
  location.href = destination + '.html';
}
// 登録処理
register = function(email, password){
  alert(email);
  // 重複チェック
//  monaca.cloud.User.validate(email)
//  .done(function(res){
//    console.log("Validation passed!");

    monaca.cloud.User.register(email, password)
      .done(function(res){
        monaca.cloud.User.login(email, password)
          .done(function(){ // 成功なら
            monaca.cloud.User.autoLogin()
              .done(function(){ // ログイン成功
              })
              .fail(function(error){ // ログイン失敗
                $("#flashMessage")
                  .empty()
                  .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ログインできません。</p></div>');
                return false;
              });
          })
          .fail(function(err){ // 失敗なら
          });
        $("#flashMessage")
          .empty()
          .append('<div class="alert bg-aqua"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ご登録ありがとうございます。<br>ログイン後のページへ移動します。</p></div>');
        setTimeout("redirect('top')", 3000);
      })
      .fail(function(err){
        $("#flashMessage")
          .empty()
          .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> 申し訳ありません。<br>登録が失敗しました。<br>再度お試しください</p></div>');
        return false;
      });
//  })
//  .fail(function(err){
//    console.log("Err#" + err.code +": " + err.message);
//  });

}
// ログインチェック
isLogin = function(email, password){
  console.log(email);
  monaca.cloud.User.login(email, password)
    .done(function(){ // 成功なら
      monaca.cloud.User.autoLogin()
        .done(function(){ // ログイン成功
          redirect('top');
        })
        .fail(function(error){ // ログイン失敗
          $("#flashMessage")
            .empty()
            .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ログインできません。<br>メールアドレスかパスワードが間違っています。</p></div>');
          return false;
        });
    })
    .fail(function(err){ // 失敗なら
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ログインできません。<br>メールアドレスかパスワードが間違っています</p></div>');
      return false;
    });
}
// 自動ログインチェック
isAuthenticated = function(){
  monaca.cloud.User.autoLogin()
    .done(function(res){
      var users = [];
      users['name'] = res.user._username;
      users['email'] = res.user._email;
      users['password'] = res.user._password;
      redirect('top');  
    })
    .fail(function(error){
      return false;
    });
}
// jQuery
$(function(){
  // 自動ログイン
  isAuthenticated();
  redirect('blog');
  $('#loginFormBtn').click(function(){
    // メアドチェック
    var email = $("#email").val();
    if ( email === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-ban"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#email")
        .focus();
      return false;
    }
    // パスワードチェック
    var password = $("#password").val();
    if ( password === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> パスワードは必ず入力してください。</p></div>');
      $("#password").focus();
      return false;
    }
    // ログインチェック
    isLogin(email, password);
  })
  // 登録処理
  $('#registerFormBtn').click(function(){
    // メアドチェック
    var email = $("#email").val();
    if ( email === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-ban"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#email")
        .focus();
      return false;
    }
    // パスワードチェック
    var password = $("#password").val();
    if ( password === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> パスワードは必ず入力してください。</p></div>');
      $("#password").focus();
      return false;
    }
    // ユーザー登録
    register(email, password);
  });
  /*
  // 登録処理後のレスをサーバーから受け取る
  callbackRegister = function(json){
    switch (json) {
      case 'false': // 登録ができなかったら
        var err = document.getElementById('error');
        err.innerHTML = '<div class="alert bg-red" role="alert">登録が出来ませんでした。</div>';
        return false;
        break;
        
      case 'dupricate': // 既に登録されていたら
        var err = document.getElementById('error');
        err.innerHTML = '<div class="alert bg-red" role="alert">入力されたメールアドレスは登録済みです。<br>ログイン画面からログインしてください。</div>';
        window.setTimeout("redirect('index')", 3000);
        break;
        
      case 'true': // 登録成功なら
        var err = document.getElementById('error');
        err.innerHTML = '<div class="alert bg-aqua" role="alert">ユーザー登録が完了しました。<br>ご登録ありがとうございます。</div>';
        window.setTimeout("redirect('top')", 3000);
        break;
    }
    return;
  }
  
  // ログイン処理
  $('#loginFormBtn').click(function(){
    // メアドチェック
    var email = $("#email").val();
    if ( email === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-ban"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#email")
        .focus();
      return false;
    }
    // パスワードチェック
    var password = $("#password").val();
    if ( password === '' ) {
      $("#flashMessage")
        .empty()
        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> パスワードは必ず入力してください。</p></div>');
      $("#password").focus();
      return false;
    }
    // 登録処理
    $.ajax({
			type: 'GET',
			url: URL_POST_LOGIN,
			data:{
				email: email,
				password: password
			},
			dataType: 'jsonp', // クロスドメイン通信のためjsonpを使う
			jsonp : 'callbackLogin' // コールバックパラメータ名の指定
  	});
  });

  callbackLogin = function(json){
    switch (json) {
      case 'false': // 登録がなかったら
        var err = document.getElementById('error');
        err.innerHTML = '<div class="alert bg-red" role="alert">入力されたメールアドレスは登録されていません。<br>サインイン画面からユーザー登録してください。</div>';
        window.setTimeout("redirect('register')", 3000);
        break;
        
      case 'true': // 登録があれば
        redirect('top');
        break;
    }
    return;
  }*/
});
