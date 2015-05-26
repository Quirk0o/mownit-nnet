
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

    .controller('ChartController', [ '$scope', 'Simulate', 'CSVParse', 'HighChart',
      function ($scope, Simulate, CSVParse, HighChart) {

      this.charts = [];
      this.output = [];

      var self = this;
      Simulate.success(function (data) {
        CSVParse.success(function (data, headers) {

          output = headers.filter(function (header, index) {
            return header.includes('net_');
          });
          var netdif = headers.filter(function (header, index) {
            return header.includes('netdif_');
          });
          var input = headers.diff(output).diff(netdif);


          var config = {
            series: []
          };

          netdif.forEach(function (header) {
            var series = {
              data: [],
              name: header
            };
            data.forEach(function (row) {
              series.data.push(row[header]);
            });

            config.series.push(series);
          });

          self.charts.push(HighChart.mkchart('column', 'Błędy względne', config.series));

          input.forEach(function (header) {
            var chart = HighChart.mkchart('scatter', header, []);

            var show = true;
            output.forEach(function (output) {
              var series = {
                data: [],
                name: output,
                visible: show
              };
              show = false;

              data.forEach(function (row) {
                if (!isNaN(row[header]))
                  series.data.push([ row[header], row[output] ]);
              });

              chart.config.series.push(series);
            });

            self.charts.push(chart);
          });
        });

        CSVParse.parse(data, self.config);
      });

    }]);