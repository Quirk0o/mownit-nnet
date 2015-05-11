
angular.module('simApp')

    .controller('InputController', [ '$scope', 'Simulate', function ($scope, Simulate) {

      this.progress = Simulate.getProgress;

      var self = this;
      $scope.$watch(angular.bind(this, function () {
        return this.files;
      }), function(value) {
        self.simulate(value);
      });

      this.simulate = function (files) {
        if (!files || !files.length) return;
        var file = files[0];

        Simulate.upload(file);
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