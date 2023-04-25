import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import usa from "./usa.json";
import tip from "d3-tip"; // import d3-tip library

const Map = () => {
  const svgRef = useRef(null);
  const air_tempRef = useRef(null);
  const stressRef = useRef(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch(`/data`);
    const data = await response.json();
    setData(data);
    const svg = d3.select(svgRef.current);
    const airTempSvg = d3.select(air_tempRef.current);
    const stressSVG = d3.select(stressRef.current);
    // Define the projection to use (in this case, Albers USA)
    const projection = d3.geoAlbersUsa().fitSize([800, 400], usa);
    // Define the path generator
    const pathGenerator = d3.geoPath(projection);
    // Define the color scale based on the wind speed values
    const colorScale = d3
      .scaleSequential(d3ScaleChromatic.interpolateReds)
      .domain([0, 3]); // assuming wind speed ranges from 0 to 10
      const airTempColorScale = d3
      .scaleSequential(d3ScaleChromatic.interpolateBlues)
      .domain([277, 285]);
    const stressColorScale = d3 
      .scaleSequential(d3ScaleChromatic.interpolateGreens)
      .domain([-0.004, 0.11]);

      const tooltip = tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        const city = d.fromElement.__data__.city_name || d.srcElement.__data__.windspeed || "";
        const state = d.fromElement.__data__.state || d.srcElement.__data__.windspeed || "";
        const windspeed = d.fromElement.__data__["windspeed"] || d.srcElement.__data__["windspeed"] || "N/A";
        const airtemp = d.fromElement.__data__["air_temp"] || d.srcElement.__data__["air_temp"] || "N/A";
        const windystress = d.fromElement.__data__["stress"] || d.srcElement.__data__["stress"] || "N/A";
        return `<strong>${city}, ${state}</strong><br>Wind Speed: ${windspeed}<br>Air Temperature: ${airtemp}<br>Wind Stress: ${windystress}`;
      })
      .style("background-color", "white")
      .style("padding", "0 10px");
    
    // Add the tooltip to the SVG
    svg.call(tooltip);

    // Draw the states
    svg
      .selectAll("path")
      .data(usa.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("stroke", "white")
      .attr("fill", (d) => {
        // Find the corresponding data point for this state
        let dataPoint = data.find((p) => p.state === d.properties.name);
        // If there is no data for this state, return grey
        if (!dataPoint) return "lightgrey";
        // Otherwise, return the color based on the wind speed value
        return colorScale(dataPoint["windspeed"]);
      })
      .attr("opacity", 0.8);

      svg.append("text")
      .attr("x", 400)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .attr("font-size", "24px")
      .text("Wind Speed Heatmap");

    // Plot the points
    svg
      .selectAll("circle")
      .data(
        data.filter(
          (d) =>
            ["Pennsylvania", "New Jersey", "New York", "Connecticut", "Rhode Island", "Massachusetts", "Vermont", "New Hampshire", "Maine"].includes(
              d.state
            ) && d.state
        )
      )
      .enter()
      .append("circle")
      .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
      .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
      .attr("r", 2)
      .attr("fill", (d) => colorScale(d["windspeed"]))
      .on("mouseover", function(d) {
        tooltip.show(d, this);
        console.log(d);
    })    
      .on("mouseout", tooltip.hide); // hide tooltip on mouseout

//-----------------------------------------------------

          // Draw the states
      airTempSvg
        .selectAll("path")
        .data(usa.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("stroke", "white")
        .attr("fill", (d) => {
          // Find the corresponding data point for this state
          let dataPoint = data.find((p) => p.state === d.properties.name);
          // If there is no data for this state, return grey
          if (!dataPoint) return "lightgrey";
          // Otherwise, return the color based on the wind speed value
          return airTempColorScale(dataPoint["air_temp"]);
        })
        .attr("opacity", 0.8);

        airTempSvg.append("text")
        .attr("x", 400)
        .attr("y", 50)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .text("Air Temperature HeatMap");

  // Plot the points
  airTempSvg
    .selectAll("circle")
    .data(
      data.filter(
        (d) =>
          ["Pennsylvania", "New Jersey", "New York", "Connecticut", "Rhode Island", "Massachusetts", "Vermont", "New Hampshire", "Maine"].includes(
            d.state
          ) && d.state
      )
    )
    .enter()
    .append("circle")
    .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
    .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
    .attr("r", 2)
    .attr("fill", (d) => airTempColorScale(d["air_temp"]))
    .on("mouseover", function(d) {
      tooltip.show(d, this);
      console.log(d);
  })    
    .on("mouseout", tooltip.hide); // hide tooltip on mouseout

//-----------------------------------------------------

    // Draw the states
    stressSVG
    .selectAll("path")
    .data(usa.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("stroke", "white")
    .attr("fill", (d) => {
      // Find the corresponding data point for this state
      let dataPoint = data.find((p) => p.state === d.properties.name);
      // If there is no data for this state, return grey
      if (!dataPoint) return "lightgrey";
      // Otherwise, return the color based on the wind speed value
      return stressColorScale(dataPoint["stress"]);
    })
    .attr("opacity", 0.8);

    stressSVG.append("text")
    .attr("x", 400)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "24px")
    .text("Wind Stress Heatmap");

    stressSVG
    .selectAll("circle")
    .data(
      data.filter(
        (d) =>
          ["Pennsylvania", "New Jersey", "New York", "Connecticut", "Rhode Island", "Massachusetts", "Vermont", "New Hampshire", "Maine"].includes(
            d.state
          ) && d.state
      )
    )
    .enter()
    .append("circle")
    .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
    .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
    .attr("r", 2)
    .attr("fill", (d) => stressColorScale(d["stress"]))
    .on("mouseover", function(d) {
      tooltip.show(d, this);
      console.log(d);
  })    
    .on("mouseout", tooltip.hide); // hide tooltip on mouseout


  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
<div className="justify-content-center my-2">
  <div style={{display: 'block',marginLeft: '350px'}}>
    <svg ref={svgRef} width={800} height={400}></svg>
  </div>
  <div style={{display: 'block',marginLeft: '350px'}}>
    <svg ref={air_tempRef} width={800} height={400}></svg>
  </div>
  <div style={{display: 'block',marginLeft: '350px'}}>
    <svg ref={stressRef} width={2000} height={500}></svg>
  </div>
</div>

    </>
  );

};

export default Map;
