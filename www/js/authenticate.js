// ログイン処理
isLogin = function(email, password){
  var flashMessageElement = document.getElementById('flashMessage');
  monaca.cloud.User.login(email, password)
    .done(function(){ // 成功なら
      monaca.cloud.User.autoLogin()
        .done(function(){ // ログイン成功
          redirect('top');
        })
        .fail(function(error){ // ログイン失敗
          var errMsg = 'ログインできません。<br>メールアドレスかパスワードが間違っています。';
          flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
          return false;
        });
    })
    .fail(function(err){ // 失敗なら
      var errMsg = 'ログインできません。<br>メールアドレスかパスワードが間違っています。';
      flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
      return false;
    });
}

// ログインチェック
loginCheck = function(){
  var flashMessageElement = document.getElementById('flashMessage');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // email
  if ( email === '' ) {
    var errMsg = 'メールアドレスは必ず入力してください。';
    flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
    return false;
  }
  // password
  if ( password === '' ) {
    var errMsg = 'パスワードは必ず入力してください。';
    flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
    return false;
  }
  isLogin(email, password);
}

// 登録前チェック
registCheck = function(){
  var flashMessageElement = document.getElementById('flashMessage');
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  // email
  if ( email === '' ) {
    var errMsg = 'メールアドレスは必ず入力してください。';
    flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
    return false;
  }
  // password
  if ( password === '' ) {
    var errMsg = 'パスワードは必ず入力してください。';
    flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
    return false;
  }
  regist(email, password);
}

// 登録処理
regist = function(email, password){
  var flashMessageElement = document.getElementById('flashMessage');

// 重複チェック
//  monaca.cloud.User.validate(email)
//  .done(function(res){
//    console.log("Validation passed!");

  monaca.cloud.User.register(email, password)
    .done(function(res){
      monaca.cloud.User.login(email, password)
        .done(function(){ // 成功なら
          monaca.cloud.User.autoLogin(res)
            .done(function(){ // ログイン成功
              setDataLocalStrage(res.user._id, res.user._email, res.user._password);
              flashMessageElement.innerHTML = '<div class="alert bg-aqua"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> ご登録ありがとうございます。<br>ログイン後のページへ移動します。</p></div>';
              setTimeout("redirect('top')", 3000);
            })
            .fail(function(error){ // ログイン失敗
              var errMsg = 'ログインできません。';
              flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
              return false;
            });
        })
        .fail(function(err){ // 失敗なら
        });
    })
    .fail(function(err){
      var errMsg = '申し訳ありません。<br>登録が失敗しました。<br>再度お試しください';
      flashMessageElement.innerHTML = setErrorMessage(errMsg).join("");
      return false;
    });
}

setDataLocalStrage = function(id, email, password){
  window.localStorage.setItem("id", id);
  window.localStorage.setItem("email", email);
  window.localStorage.setItem("password", password);
  return;
}

// 引数のhtmlにリダイレクトさせる
redirect = function(destination){
  var destination = destination;
  location.href = destination + '.html';
}
// 自動ログインチェック
isAuthenticated = function(){
  monaca.cloud.User.autoLogin()
    .done(function(res){
      redirect('top');  
    })
    .fail(function(err){
      return false;
    });
}
// jQuery
$(function(){
  // 自動ログイン
  isAuthenticated();
//  redirect('diary');

/*
  $('#loginFormBtn').click(function(){
    var error = [];
    $("#flashMessage").empty();
    // メアドチェック
    var email = $("#email").val();
    if ( email === '' ) {
      var errMsg = 'メールアドレスは必ず入力してください。';
      $("#flashMessage")[0].innerHTML = setErrorMessage(errMsg).join("");
      $("#email").focus();
      return false;
    }
    // パスワードチェック
    var password = $("#password").val();
    if ( password === '' ) {
      var errMsg = 'パスワードは必ず入力してください。';
      $("#flashMessage")[0].innerHTML = setErrorMessage(errMsg).join("");
      $("#email").focus();
      return false;
    }
    // ログインチェック
    isLogin(email, password);
  })*/
  /*
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
  */
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
