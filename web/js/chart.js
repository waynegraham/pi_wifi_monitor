$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: 'speedtest.csv',
    dataType: 'text',
    success: function(data) {
      processData(data);
    }
  });

  setInterval(function() {

  })

  function processData(allText) {
    var allLinesArray = allText.split('\n');
    var allLinesArray = allText.split(/[\r?\n|\r|\n]+/);
    console.log('length', allLinesArray.length);
    if (allLinesArray.length > 0) {
      var dataPoints = [];
      var uploadPoints = [];
      for (var i = 1; i <= allLinesArray.length - 1; i++) {
        var rowData = allLinesArray[i].split(',');
        if (rowData && rowData.length > 1)

          dataPoints.push({
            label: rowData[0],
            y: parseInt(rowData[3])
          });
        uploadPoints.push({
          label: rowData[0],
          y: parseInt(rowData[4])
        });
      }

      chart.options.data[0].dataPoints = dataPoints;
      chart.options.data[1].dataPoints = uploadPoints;
      chart.render();
    }
  }

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,

    theme: "light2",
    axisX: {
      valueFormatString: "DD MMM,YY"
    },
    axisY: {
      includeZero: false,
      title: "Speed (in Mb/s)",
      suffix: " Mb"
    },
    title: {
      text: "WiFi Speed"
    },
    legend: {
      cursor: "pointer",

    },
    data: [{
        type: "line",
        name: "Download Speed",
        showInLegend: true,
        dataPoints: []
      },
      {
        type: "line",
        name: "Upload Speed",
        showInLegend: true,
        markerType: "square",
        dataPoints: []
      }
    ],

  });

});