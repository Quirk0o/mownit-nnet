var express = require('express'),
    multer = require('multer'),
    router = express.Router(),
    fs = require('fs'),
    exec = require('child_process').exec;

router.post('/', [ multer({ dest: 'uploads' }), function(req, res, next) {

  var file = req.files.file,
      cmd = 'Rscript app/sim.R uploads/' + file.name;

  exec(cmd, function (err, stdout, stderr) {
    console.log(stdout);

    if (err !== null) {
      console.log(err);
    }

    fs.unlink(file.path, function (e) {
      if (e)
        console.error(e);
    });
  });

  var options = {
    root: '.',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = 'result.csv';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
}]);

module.exports = router;