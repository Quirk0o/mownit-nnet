
angular.module('simApp')
    .factory('Simulate', [ 'Upload', function (Upload) {

      var progress = 0,
          result;

      var self = this;
      return {
        upload: function (file) {
          if (!file) return;

          Upload.upload({
            url: 'upload',
            file: file

          }).progress(function (e) {
            self.progress = parseInt(100.0 * e.loaded / e.total);

          }).success(function (data) {
            self.result = data;
          });
        },
        getProgress: function () {
          return progress;
        },
        getResult: function () {
          return result;
        }
      }

    }])

    .factory('CSVParse', function () {

      var config = {
        delimiter: '',
        newline: '',
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (res) {
          data = res.data;
          headers = res.meta.fields;
        },
        error: function (err) {
          console.error(err);
        }
      };

      var data, headers;

      return {
        parse: function (file) {
          Papa.parse(file, config);
        },
        getData: function () {
          return data;
        },
        getHeaders: function () {
          return headers;
        }
      }
    });