// This is a JavaScript file
$(function(){
  getCurrentUser(); // ログイン済みかチェック
  
  $('#registBtn').click(function(){
    var email = $("#email").val();
    if ( email === '' ) {
      $("#flashMessage").empty()
                        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#email")
        .focus();
      return false;
    }
    var password = $("#password").val();
    if ( password === '' ) {
      $("#flashMessage").empty()
                        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> パスワードは必ず入力してください。</p></div>');
      $("#password").focus();
      return false;
    }
    // 登録済みかチェック
    
    userAdd(email, password);
  });
  $('#loginBtn').click(function(){
    var email = $("#email").val();
    if ( email === '' ) {
      $("#flashMessage").empty()
                        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> メールアドレスは必ず入力してください。</p></div>');
      $("#email")
        .focus();
      return false;
    }
    var password = $("#password").val();
    if ( password === '' ) {
      $("#flashMessage").empty()
                        .append('<div class="alert bg-red"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><p><i class="fa fa-close"></i> パスワードは必ず入力してください。</p></div>');
      $("#password").focus();
      return false;
    }
    // login
    login(email, password);
  });
});

var getCurrentUser = function(){
  // カレントユーザ情報の取得
  var currentUser = ncmb.User.getCurrentUser();
  if (currentUser) {
      console.log("ログイン中のユーザー: " + currentUser.get("userName"));
      redirect('top');
  } else {
      console.log("未ログインまたは取得に失敗");
  }

  // カレントユーザかどうかの確認
  var user = new ncmb.User();
  console.log(user.isCurrentUser()); // false
}
