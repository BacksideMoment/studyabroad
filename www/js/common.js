  document.addEventListener("deviceready", function(){
    FastClick.attach(document.body);
  }, false);
  
  
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
    })
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
  // 引数のhtmlにリダイレクトさせる
  function redirect(destination){
    var destination = destination;
    location.href = destination + '.html';
  }

