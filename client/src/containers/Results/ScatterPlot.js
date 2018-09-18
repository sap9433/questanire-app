import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default class ScatterPlot extends Component {
  render() {
    let employeeData = [
      [150.2, 47.6], [162.6, 54.5], [175.8, 71.3]
    ];
    employeeData = employeeData.map(function modifier(eachVal) { 
      return [eachVal[0] * Math.random(), eachVal[1] * Math.random()]; 
    });
    let candidateData = [
      [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
      [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
      [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
      [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
      [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
      [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
    ];
    candidateData = candidateData.map(function modifier(eachVal) { 
      return [eachVal[0] * Math.random(), eachVal[1] * Math.random()]; 
    });

    const options = {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        title: {
          enabled: true,
          text: 'Your Team Data'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: 'Candidates Data'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} , {point.y} '
          }
        }
      },
      series: [{
        name: 'Your Team',
        color: 'rgba(223, 83, 83, .5)',
        data: employeeData,
        marker: {
          symbol: 'circle',
          radius: 70,
        },

      }, 
      {
        name: 'Candidate',
        color: 'rgba(248, 206, 8, .5)',
        data: candidateData,
        marker: {
          symbol: 'circle',
          radius: 15,
        }
      }],
      credits: {
        enabled: false
      }
    };
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    );
  }
}
