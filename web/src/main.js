import * as d3 from "d3"; // https://www.npmjs.com/package/d3
import _ from 'lodash';
import * as ss from "simple-statistics"; // https://www.npmjs.com/package/simple-statistics
import "./style.css";

//https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
// import Chart from 'chart.js/auto';

const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

d3.csv("speedtest.csv").then(makeChart);

function makeChart(speeds) {
    // console.log("speeds", speeds);

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

    let down_regression = calcLinear(speeds);
    let upload_regression = calcLinear(speeds);
    let ping_regression = calcLinear(speeds);

}
/*
 * Calculate a linear regression for a scatter plot.
 *
 * @see https://bl.ocks.org/HarryStevens/be559bed98d662f69e68fc8a7e0ad097
 *
 * @param {Array} data The data points
 * @param {String} x The column of data plotted on your x-axis
 * @param {String} y The column of data plotted on your y-axis
 * @param {Integer} minX The minimum value of your x-axis
 * @param {Integer} minY The minimum value of your y-axis
 * 
 * @return The linear points
 */
function calcLinear(data, x = "Date", y = "Download", minX = 0, minY = 0) {
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

        // console.log("sum", pt);
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
        let value = m * x + b2;
        linear_points.push(value);
    });

    return linear_points;
}
