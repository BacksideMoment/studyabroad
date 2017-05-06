// ini set

var nav = ( function(){/*
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
*/}).toString().replace(/(\n)/g, '').split('*')[1];

var header = (function() {/*
<nav class="navbar navbar-static-top">
  <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
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
*/}).toString().replace(/(\n)/g, '').split('*')[1];

var sidebar = (function() {/*
<section class="sidebar">
  <div class="user-panel">
    <div class="pull-left image">
      <img src="../../dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
    </div>
    <div class="pull-left info">
      <p id="userName"></p>
    </div>
  </div>
  <ul class="sidebar-menu">
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
      <a href="#">
        <i class="fa fa-edit"></i> <span>ブログ関連</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-down pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="blog/add.html">
            <i class="fa fa-pencil"></i> ブログを書く
          </a>
        </li>
        <li>
          <a href="bolg/list.html">
            <i class="fa fa-list"></i> 最新のブログを見る
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

      <a type="button" href="#" data-toggle="modal" data-target="#myModal">
        <i class="fa fa-sign-out"></i> <span> ログアウト</span>
      </a>
    </li>
  </ul>
</section>
<!-- /.sidebar -->
*/}).toString().replace(/(\n)/g, '').split('*')[1];