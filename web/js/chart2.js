// refresh page every 10 minutes
setTimeout(function() {
  window.location.reload(1);
}, 10 * 60000);

// Adapted from https://www.createwithdata.com/chartjs-and-csv/
d3.csv('speedtest.csv').then(makeChart);

function makeChart(speeds) {

  var color = Chart.helpers.color;

  var speedLabels = speeds.map(function(line) {
    return line.Time
  });

  var downloadData = speeds.map(function(line) {
    return line.Down
  });

  var uploadData = speeds.map(function(line) {
    return line.Up
  });

  var pingData = speeds.map(function(line) {
    return line.Ping
  });

  var downMean = d3.mean(speeds, function(mean) {
    return mean.Down;
  });

  var upMean = d3.mean(speeds, function(mean) {
    return mean.Up;
  });

  var pingMean = d3.mean(speeds, function(mean) {
    return mean.Ping;
  });

  var statistics = new Chart('statistics', {
    type: 'horizontalBar',
    data: {
      labels: ['Download', 'Upload', 'Ping'],
      datasets: [{
        label: 'Average Speed',
        backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
        borderColor: window.chartColors.orange,
        data: [downMean, upMean, pingMean]
      }],

    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'MB/s'
          },
        }],
      }
    }
  });

  var chart = new Chart('chart', {
    type: 'line',
    data: {
      labels: speedLabels,
      datasets: [{
          data: downloadData,
          label: 'Download Speed',
          fill: false,
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
        },
        {
          data: uploadData,
          label: 'Upload Speed',
          fill: false,
          backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
          borderColor: window.chartColors.blue,
        },
        {
          data: pingData,
          label: 'Ping Speed',
          fill: false,
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
        },
      ]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          type: 'time',
          scaleLabel: {
            display: true,
            labelString: 'Time'
          },
          distribution: 'series',
          ticks: {
            source: 'data',
            autoskip: true
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'MB/s'
          }
        }]
      }
    }
  });
}