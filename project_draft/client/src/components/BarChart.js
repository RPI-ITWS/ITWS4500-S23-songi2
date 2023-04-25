import React from 'react';
import c3 from 'c3';

function Chart ({states}) {
    var url = "http://localhost:3001/data";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        var jsonObj = JSON.parse(this.responseText);

        var speed = 0;
        var temp = 0;
        var stress = 0;

        //calculate average
        for (var i = 0; i < jsonObj.length; i++){
          speed += Number(jsonObj[i].windspeed);
          temp += Number(jsonObj[i].air_temp);
          stress += Number(Math.abs(jsonObj[i].stress));
        }

        speed = (speed / jsonObj.length).toFixed(3);
        temp = temp / jsonObj.length;
        stress = (stress / jsonObj.length).toFixed(3);
        temp = (temp - 273.15).toFixed(3);
        
        console.log(speed);
        console.log(temp);
        console.log(stress);

        //calculate input 1
        var input1 = states.first;
        var speed1 = 0;
        var temp1 = 0;
        var stress1 = 0;
        var count1 = 0;

        if (input1 != "Select State"){
          for (var i = 0; i < jsonObj.length; i++){
            if (jsonObj[i].state == input1){
              speed1 += Number(jsonObj[i].windspeed);
              temp1 += Number(jsonObj[i].air_temp);
              stress1 += Number(Math.abs(jsonObj[i].stress));
              count1++;
            }
          }
          speed1 = (speed1 / count1).toFixed(3);
          temp1 = temp1 / count1;
          stress1 = (stress1 / count1).toFixed(3);
          temp1 = (temp1 - 273.15).toFixed(3);
        }

        //calculate input 2
        var input2 = states.second;
        var speed2 = 0;
        var temp2 = 0;
        var stress2 = 0;
        var count2 = 0;

        if (input2 != "Select State"){
          for (var i = 0; i < jsonObj.length; i++){
            if (jsonObj[i].state == input2){
              speed2 += Number(jsonObj[i].windspeed);
              temp2 += Number(jsonObj[i].air_temp);
              stress2 += Number(Math.abs(jsonObj[i].stress));
              count2++;
            }
          }
          speed2 = (speed2 / count2).toFixed(3);
          temp2 = temp2 / count2;
          stress2 = (stress2 / count2).toFixed(3);
          temp2 = (temp2 - 273.15).toFixed(3);
        }


        if (input1 != "Select State" && input2 != "Select State"){
          c3.generate({
            bindto: '#chart',
            size: {
              height: 450,
              width: 600
            },
            data: {
              columns: [
                ['Average', speed, temp, stress],
                [input1, speed1, temp1, stress1],
                [input2, speed2, temp2, stress2]
              ],
              type: 'bar',
            },
            axis: {
              x: {
                height: 50,
                type: 'category',
                categories: ['Wind Speed (m/s)', 'Air Temperature (°C)', 'Stress (N/m2)']
              }
            }
          });
        }else if (input1 != "Select State"){
          c3.generate({
            bindto: '#chart',
            size: {
              height: 450,
              width: 600
            },
            data: {
              columns: [
                ['Average', speed, temp, stress],
                [input1, speed1, temp1, stress1]
              ],
              type: 'bar',
            },
            axis: {
              x: {
                height: 50,
                type: 'category',
                categories: ['Wind Speed (m/s)', 'Air Temperature (°C)', 'Stress (N/m2)']
              }
            }
          });
        }else if (input2 != "Select State"){
          c3.generate({
            bindto: '#chart',
            size: {
              height: 450,
              width: 600
            },
            data: {
              columns: [
                ['Average', speed, temp, stress],
                [input2, speed2, temp2, stress2]
              ],
              type: 'bar',
            },
            axis: {
              x: {
                height: 50,
                type: 'category',
                categories: ['Wind Speed (m/s)', 'Air Temperature (°C)', 'Stress (N/m2)']
              }
            }
          });
        }else{
          c3.generate({
            bindto: '#chart',
            size: {
              height: 450,
              width: 600
            },
            data: {
              columns: [
                ['Average', speed, temp, stress]
              ],
              type: 'bar',
            },
            axis: {
              x: {
                height: 50,
                type: 'category',
                categories: ['Wind Speed (m/s)', 'Air Temperature (°C)', 'Stress (N/m2)']
              }
            }
          });
        }
      }
    }

    xhttp.open("GET", url);
    xhttp.send();

    return( <div id="chart" />);
}

export default Chart;