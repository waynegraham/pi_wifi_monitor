// refresh page every 10 minutes
setTimeout(function() {
  window.location.reload(1);
}, 10 * 60000);

// see https://bl.ocks.org/HarryStevens/be559bed98d662f69e68fc8a7e0ad097
function calcLinear(data, x, y, minX, minY) {
  /////////
  //SLOPE//
  /////////

  // n = data points
  var n = data.length;

  var pts = [];

  data.forEach(function(d, i) {
    var obj = {};
    // obj.x = d[x];
    obj.x = i;
    obj.y = d[y];
    obj.mult = obj.x * obj.y; // todo NaN
    pts.push(obj);
  });

  // Let a equal n times the summation of all x-values multiplied by their corresponding y-values
  // Let b equal the sum of all x-values times the sum of all y-values
  // Let c equal n times the sum of all squared x-values
  // Let d equal the squared sum of all x-values
  var sum = 0.0;
  var xSum = 0.0;
  var ySum = 0.0;
  var sumSq = 0.0;
  pts.forEach(function(pt) {
    sum = sum + pt.mult;
    xSum = xSum + parseFloat(pt.x);
    ySum = ySum + parseFloat(pt.y);
    sumSq = sumSq + (pt.x * pt.x);
  });

  var a = sum * n;
  var b = xSum * ySum;
  var c = sumSq * n;
  var d = xSum * xSum;

  // Plug the values that you calculated for a, b, c, and d into the following equation to calculate the slope
  // slope = m = (a - b) / (c - d)
  var m = (a - b) / (c - d);

  // console.log('slope', m);

  /////////////
  //INTERCEPT//
  /////////////

  // Let e equal the sum of all y-values
  var e = ySum;

  // Let f equal the slope times the sum of all x-values
  var f = m * xSum;

  // Plug the values you have calculated for e and f into the following equation for the y-intercept
  // y-intercept = b = (e - f) / n
  var b = (e - f) / n;

  console.log('equation', "y = " + m + "x + " + b);
  console.log('equation', "x = ( y - " + b + " ) / " + m);

  var linear_points = [];

  data.forEach(function(d, x) {
    value = (m * x) + b;
    linear_points.push(value);
  });

  return linear_points;
  // console.log(linear_points);

  // return {
  //   ptA: {
  //     x: data[minX].Time,
  //     y: (minY - b) / m
  //   },
  //   ptB: {
  //     x: data[data.length - 1].Time,
  //     y: m * minX + b
  //   }
  // }
}

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

  var downMin = d3.min(speeds, function(data) {
    return data.Down;
  });

  var upMin = d3.min(speeds, function(data) {
    return data.Up;
  });

  var pingMin = d3.min(speeds, function(data) {
    return data.Ping;
  });

  // var downMax = d3.max(speeds, function(data) {
  //   return data.Down;
  // });

  // linear regression; x is a timeseries, so start at 0 and use array position
  var down_regression = calcLinear(speeds, "Time", "Down", 0, downMin);
  var upload_regression = calcLinear(speeds, "Time", "Up", 0, upMin);
  var ping_regression = calcLinear(speeds, "Time", "Ping", 0, pingMin);


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
          showLine: false,
          fill: false,
          backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
          borderColor: window.chartColors.red,
        },
        {
          data: uploadData,
          label: 'Upload Speed',
          fill: false,
          showLine: false,
          backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
          borderColor: window.chartColors.blue,
        },
        {
          data: pingData,
          label: 'Ping Speed',
          fill: false,
          showLine: false,
          backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
          borderColor: window.chartColors.green,
        },
        {
          data: down_regression,
          label: 'Download Speed Regression',
          borderDash: [10, 5],
          fill: false,
          borderColor: window.chartColors.red
        },
        {
          data: upload_regression,
          label: 'Upload Speed Regression',
          borderDash: [10, 5],
          fill: false,
          borderColor: window.chartColors.blue
        },
        {
          data: ping_regression,
          label: 'Ping Speed Regression',
          borderDash: [10, 5],
          fill: false,
          borderColor: window.chartColors.green
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