const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// GET root
router.get('/', function *() {
  this.body = "Ready to receive requests";
});

// General API route
router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

// GET all playlists
router.get('/api/playlists', function *() {
  this.body = db.playlists;
});

// GET the playlist with the specified playlist ID
router.get('/api/playlists/:playlistId', function *() {
  const id = parseInt(this.params.playlistId);
  this.body = db.playlists.find((playlist) => playlist.id == id);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started. Listening on port 3000...');
