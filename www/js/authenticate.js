// jQuery
$(function(){
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
    // 登録処理
  	$.ajax({
			type: 'GET',
			url: URL_POST_REGISTER,
			data:{
				email: email,
				password: password
			},
			dataType: 'jsonp', // クロスドメイン通信のためjsonpを使う
			jsonp : 'callbackRegister' // コールバックパラメータ名の指定
  	});
  });
  
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
  }
});
