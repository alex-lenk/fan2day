<!DOCTYPE html>
<html>
<head>
{include 'file:chunks/section/head.tpl'}
</head>
<body>
  <div class="container">
    {include 'file:chunks/section/header.tpl'}
    <section class="row">
      <article class="col-sm-8">
        {include 'file:chunks/section/content.tpl'}
      </article>
      <aside class="col-sm-4">
      </aside>
    </section>
    {include 'file:chunks/section/footer.tpl'}
  </div>
  {include 'file:chunks/section/scripts.tpl'}
</body>
</html>