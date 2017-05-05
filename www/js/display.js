// This is a JavaScript file

$(function(){
  setLocalStrage();
  var display = new checkURL();
});


checkURL = function (){
  console.log(location.href);
}
setLocalStrage = function()
{
  // 書き込むデータをJSON形式で指定
	var userData = {email: 'sugimoto-s@arukikata.jp', password: 'sugi'};
	// localStorage.setItem(キー名,値)で書き込む
	// ※ オブジェクトを直接指定できるかはブラウザによるらしいのでJSON.stringify()を使う。
	localStorage.setItem('user', JSON.stringify(userData));
  var user = localStorage.getItem('user');
  console.log(user);
}