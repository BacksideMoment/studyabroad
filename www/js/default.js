// ini set

var header = ( function(){/*
<nav class="navbar navbar-static-top">
  <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
    <span class="icon-bar"></span>
  </a>
  <div class="navbar-custom-menu">
    <ul class="nav navbar-nav">
      <li class="dropdown notifications-menu">
        <a href="notify.html" class="dropdown-toggle" data-toggle="dropdown">
          <i class="fa fa-bell-o"></i>
          <span class="label bg-red">10</span>
        </a>
        <ul class="dropdown-menu">
          <li class="header">You have 10 notifications</li>
        </ul>
      </li>
      <li>
        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
      </li>
    </ul>
  </div>
</nav>
*/}).toString().match(/(?:\/\*(?:[\s\S]*?)\*\/)/).pop().replace(/^\/\*/, "").replace(/\*\/$/, "");

var sidebar = (function() {/*
<section class="sidebar"> 
  <ul class="sidebar-menu">
    <li class="header"><ins class="text-white"><p id="userName"></p></ins></li>
    <li class="treeview">
      <a href="top.html">
        <i class="fa fa-home"></i> <span>TOP</span>
      </a>
      
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-gears"></i> <span>ユーザー設定</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-down pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="updatePassword.html">
            <i class="fa fa-exclamation"></i> パスワードの変更
          </a>
        </li>
        <li>
          <a href="configure/password.html">
            <i class="fa fa-envelope"></i> メールアドレスの変更
          </a>
        </li>
      </ul>
    </li>
    <li class="treeview">
      <a href="diary.html">
        <i class="fa fa-edit"></i> <span>日記関連</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-down pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="diary.html">
            <i class="fa fa-pencil"></i> 日記を書く
          </a>
        </li>
        <li>
          <a href="diaryList.html">
            <i class="fa fa-list"></i> 投稿した日記一覧
          </a>
        </li>
        <li>
          <a href="diaryList.html">
            <i class="fa fa-check"></i> みんなの日記を見る
          </a>
        </li>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-calendar"></i> <span>スケジュール関連</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-down pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="scedule/add.html">
            <i class="fa fa-pencil"></i> スケジュールを書く
          </a>
        </li>
        <li>
          <a href="scedule/list.html">
            <i class="fa fa-list"></i> スケジュールを確認する
          </a>
        </li>
      </ul>
    </li>
    <li class="treeview">
      <a type="button" href="#" data-toggle="modal" data-target="#logoutModal">
        <i class="fa fa-sign-out"></i> <span> ログアウト</span>
      </a>
    </li>
  </ul>
</section>
*/}).toString().match(/(?:\/\*(?:[\s\S]*?)\*\/)/).pop().replace(/^\/\*/, "").replace(/\*\/$/, "");

var logoutModal = (function() {/*
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header bg-red">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title" id="myModalLabel"><strong><i class="fa fa-exclamation"></i> Log out</strong></h4>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default pull-left" data-dismiss="modal"><strong>Close</strong></button>
      <button id="logoutBtn" type="button" class="btn btn-lg bg-red col-md-4"><i class="fa fa-check"></i> <strong>ログアウトする</strong></button>
    </div>
  </div>
</div>
*/}).toString().match(/(?:\/\*(?:[\s\S]*?)\*\/)/).pop().replace(/^\/\*/, "").replace(/\*\/$/, "");