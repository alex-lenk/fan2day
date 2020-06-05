<header class="page-header row">
  <div class="col-sm-4">
    <h2>
      <a href="{'site_url' | config}" id="logo">
        <nobr><span class="glyphicon glyphicon-send" style="margin-right: 0.5em"></span>{'site_name' | config}</nobr>
      </a>
    </h2>
  </div>
  <div class="col-sm-4">
    <p style="margin-top: 27px;">
      {'address' | config}
    </p>
  </div>
  <div class="col-sm-4">
    <h2 class="text-right">
      <nobr><a href="tel:{'phone' | config | preg_replace : '/[^0-9+]/' : ''}">{'phone' | config}</a></nobr>
    </h2>
  </div>
</header>
<nav class="navbar navbar-default container row">
  {'pdoMenu' | snippet : [
    'startId' => 0,
    'level' => 1,
    'resources' => '',
    'outerClass' => 'nav navbar-nav'
  ]}
</nav>
