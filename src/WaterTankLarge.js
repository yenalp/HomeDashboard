import React from 'react';
// import logo from './logo.svg';
import './App.css';

// import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
// import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 4 - Including the chart type
import Widgets from 'fusioncharts/fusioncharts.widgets';

// Step 5 - Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
import axios from 'axios';

// Step 6 - Adding the chart as dependency to the core fusioncharts
ReactFusioncharts.fcRoot(FusionCharts, Widgets, FusionTheme);

// Resolves charts dependancy
Charts(FusionCharts);

// Step 7 - Creating the JSON object to store the chart configurations
const dataSourceCylinder = {
    "chart": {
      "lowerlimit": "0",
      "upperlimit": "100",
      "lowerlimitdisplay": "Empty",
      "upperlimitdisplay": "Full",
      "numbersuffix": " %",
      "cylfillcolor": "#0099fd",
      "plottooltext": "Water Level: <b>100%</b>",
      "cylfillhoveralpha": "85",
      "theme": "candy",
      "cylradius": "300",
      "cylheight": "350",
      "showValue": "0",
      "majorTMNumber": "10",
      "adjustTM": "1",
    },
    "value": "0",
    "annotations": {
          "autoscale": "1",
          "groups": [
              {
                  "id": "range",
                  "items": [
                      {
                          "id": "rangeText",
                          "type": "Text",
                          "fontSize": "45",
                          "fillcolor": "#ffffff",
                          "text": "0%",
                          "x": "$chartCenterX-45",
                          "y": "$chartEndY-35"
                      }
                  ]
              }
          ]
      }
  };


const eventsCylinder = {
    "rendered": function(evtObj, argObj) {
        var gaugeRef = evtObj.sender;
        gaugeRef.chartInterval = setInterval(function() {
	    // Get the water pressure from the server
	    axios.get('http://localhost:4000/api/v1/water-level')
    		.then(response => {
    		    // var fuelVolume = response.data.percent;
    		    var consVolume = response.data.percent;
			    gaugeRef.feedData("&value=" + consVolume);
			    // fuelVolume = consVolume;
		    });
        }, 5000);
    },
    //Using real time update event to update the annotation
    "realTimeUpdateComplete": function(evt, arg) {
	    let annotations = evt.sender.annotations,
            dataVal = evt.sender.getData();
            // colorVal = (dataVal >= 70) ? "#6caa03" : ((dataVal <= 25) ? "#e44b02" : "#f8bd1b");
            //Updating value
            annotations && annotations.update('rangeText', {
                "text": Math.floor(dataVal) + "%"
            });
    },
    "disposed": function(evt, arg) {
        clearInterval(evt.sender.chartInterval);
    }
};  

function WaterLevelCylinder() {
        return (
          <ReactFusioncharts
            type="cylinder"
            width="100%"
            height="100%"
            dataFormat="JSON"
            dataSource={dataSourceCylinder}
            events =  {eventsCylinder}
          />
        );
}

// export default App;
export default WaterLevelCylinder
