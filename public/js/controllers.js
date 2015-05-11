
angular.module('simApp')

    .controller('InputController', [ '$scope', 'Upload', function ($scope, Upload) {

      this.progress = 0;

      var self = this;
      $scope.$watch(angular.bind(this, function () {
        return this.files;
      }), function(value) {
        self.upload(value);
      });

      this.upload = function (files) {
        if (!files || !files.length) return;

        var file = files[0];

        Upload.upload({
          url: 'upload',
          file: file

        }).progress(function (e) {
          self.progress = parseInt(100.0 * e.loaded / e.total);

        }).success(function () {
        });
      };
    }])

    .controller('ChartController', [ function () {

      this.config = {
        chart: {
          type: 'scatter'
        },
        title: {
          text: 'Wyniki symulacji'
        }
      };
    }]);