const Handlebars = require('handlebars');

Handlebars.registerHelper('userid', function(user_id) {
   if(user_id === app.user.id) {
      return '<h5 style="color:#000"><span style="color:#236167" class="glyphicon glyphicon-user"></span> You Claimed</h5>';
   } else {
      return '<h5 style="color:#000"><span style="color:#236167" class="glyphicon glyphicon-user"></span> {{user.name}} Claimed</h5>';
   }
});
