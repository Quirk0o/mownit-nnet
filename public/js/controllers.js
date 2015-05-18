
angular.module('simApp')

    .controller('InputController', [ '$scope', 'Simulate', function ($scope, Simulate) {

      this.getProgress = Simulate.getProgress;

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

    .controller('ChartController', [ '$scope', 'Simulate', 'CSVParse', function ($scope, Simulate, CSVParse) {

      this.config = {
        options: {
          chart: {
            type: 'scatter'
          },
          title: {
            text: 'Wyniki symulacji'
          }
        },
        series: []
      };

      var self = this;
      Simulate.success(function (data) {
        CSVParse.success(function (data, headers) {
          console.log(headers);
          console.log(data);

          var input = [ 'immunological_time_span', 'bite_transfer', 'mahalanobis', 'immunological_maturity',
            'good_agent_energy' ];

          input.forEach(function (header) {
            var series = {};
            series.data = [];
            series.name = header;

            data.forEach(function (row) {
              series.data.push([ row[header], row['net_iemas_fitness'] ]);
            });

            self.config.series.push(series);
            console.log(series);
          });
        });

        CSVParse.parse(data, self.config);
      });

    }]);