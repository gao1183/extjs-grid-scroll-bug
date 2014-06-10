var koa = require('koa')  
, route = require('koa-route')
, app = module.exports = koa()
, serve = require('koa-static')
, total = 10000000;

app.use(serve('.'));
app.use(route.get('/list', list));  

function *list() {  
  var start = this.request.query.start;
  var limit = this.request.query.limit;
  var results = [];
  for (var i=0; i<limit; i++) {
      var row = parseInt(start) + i;
      if (row < total) {
        results.push({row:row});
      }
  }
  var res = yield { results: results, success: true, total: total} ;
  this.body = res;
}

var port = Number(process.env.PORT || 3000);
console.log('starting app on port ' + port);
if (!module.parent) app.listen(port);
