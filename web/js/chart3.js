d3.csv("speedtest.csv").then(makeChart);

function makeChart(speeds) {
  console.log("speeds", speeds);

  let color = Chart.helpers.color;

  let speedLabels = speeds.map(function (line) {
    return line.Date;
  });

  let downloadData = speeds.map(function (line) {
    return line.Download;
  });

  let uploadData = speeds.map(function (line) {
    return line.Upload;
  });

  let pingData = speeds.map(function (line) {
    return line.Ping;
  });

  let downMean = d3.mean(speeds, function (mean) {
    return mean.Download;
  });

  let upMean = d3.mean(speeds, function (mean) {
    return mean.Upload;
  });

  let pingMean = d3.mean(speeds, function (mean) {
    return mean.Ping;
  });

  let downMin = d3.min(speeds, function (data) {
    return data.Download;
  });

  let upMin = d3.min(speeds, function (data) {
    return data.Upload;
  });

  let pingMin = d3.min(speeds, function (data) {
    return data.Ping;
  });

  let down_regression = calcLinear(speeds, "Date", "Download", 0, downMin);
  let upload_regression = calcLinear(speeds, "Date", "Upload", 0, upMin);
  let ping_regression = calcLinear(speeds, "Date", "Upload", 0, pingMin);

  const statistics = new Chart("statistics", {
    type: "horizontalBar",
    data: {
      labels: ["Download", "Upload", "Ping"],
      datasets: [
        {
          label: "Average Speed",
          backgroundColor: color(window.chartColors.orange)
            .alpha(0.5)
            .rgbString(),
          borderColor: window.chartColors.orange,
          data: [downMean, upMean, pingMean],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "MB/s",
            },
          },
        ],
      },
    },
  });

  let chart = new Chart('chart', {
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
          display: false,
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
  console.log("chart", chart);
}

function calcLinear(data, x, y, minX, minY) {
  let n = data.length;
  let pts = [];

  data.forEach(function (d, i) {
    var obj = {};
    // obj.x = d[x];
    obj.x = i;
    obj.y = d[y];
    obj.mult = obj.x * obj.y; // todo NaN
    pts.push(obj);
  });

  let sum = 0.0;
  let xSum = 0.0;
  let ySum = 0.0;
  let sumSq = 0.0;

  pts.forEach(function (pt) {
    sum = sum + pt.mult;
    xSum = xSum + parseFloat(pt.x);
    ySum = ySum + parseFloat(pt.y);
    sumSq = sumSq + pt.x * pt.x;

    console.log("sum", pt);
  });

  let a = sum * n;
  let b = xSum * ySum;
  let c = sumSq * n;
  let d = xSum * xSum;

  let m = (a - b) / (c - d);

  let e = ySum;
  let f = m * xSum;
  let b2 = (e - f) / n;

  let linear_points = [];

  data.forEach(function (d, x) {
    value = m * x + b2;
    linear_points.push(value);
  });

  return linear_points;
}
