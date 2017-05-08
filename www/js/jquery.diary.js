// This is a JavaScript file
$(function(){
  // post
  $('#diaryPostBtn').click(function(){
    var error = [];
    // title
    var title = $('#title').val();
    if ( title === '' ) {
      error.push('<div class="alert bg-red">');
      error.push('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>');
      error.push('<p><i class="fa fa-ban"></i> タイトルは必ず入力してください。</p>');
      error.push('</div>');
      $("#flashMessage")[0].innerHTML = error.join("");
      $("#title").focus();
      return false;
    }
    // content
    var content = $('#content').val();
    if ( content === '' ) {
      error.push('<div class="alert bg-red">');
      error.push('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>');
      error.push('<p><i class="fa fa-ban"></i> 内容は必ず入力してください。</p>');
      error.push('</div>');
      $("#flashMessage")[0].innerHTML = error.join("");
      $('#content').focus();
      return false;
    }
    
    // add
    var Diary = monaca.cloud.Collection("diary");
    var oid = monaca.cloud.User._oid;
    alert(oid);
    return false;
    var friendUserOid = "x00000000-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    var permission = {};
    permission[friendUserOid] = "r";
    
    Diary.insert({title: 'Any title', body: 'Hello World'}, permission)
    .done(function(result)
    {
       console.log("Inserted!");
    })
    .fail(function(err)
    {
       console.log("Err#" + err.code +": " + err.message);
    });


  });
});

// user
getUserData = function(){
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
    });
    
}
var user = getUserData();
console.log(user);
