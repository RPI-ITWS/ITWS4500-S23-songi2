  import React, { useEffect, useRef, useState } from 'react';
  import * as d3 from 'd3';
  import "./css/visiualization.css"

  const VisualData = () => {
    const chartRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [teamId, setTeamId] = useState('');

    useEffect(() => {
      fetch('/node/db')
        .then((response) => response.json())
        .then((data) => {
          // Calculate the average age for each position in all the players
          const allPlayers = data.flatMap((team) => team.response[0].players);
          //flatMap will get all the data from every player
          const groups = d3.group(allPlayers, (d) => d.position);

          const averages = [];
          groups.forEach((players, position) => {
            const averageAge = d3.mean(players, (d) => d.age);
            averages.push({ position, averageAge });
          });

          // console.log(averages);

          // Define the color scale based on position
          const colorScale = d3.scaleOrdinal()
            .domain(averages.map((d) => d.position))
            .range(d3.schemeCategory10);

          // Draw the chart
          const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', 400)
            .attr('height', 300);

          // Set up the scales
          const xScale = d3
            .scaleBand()
            .domain(averages.map((d) => d.position))
            .range([50, 350])
            .padding(0.2);

          const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(averages, (d) => d.averageAge)])
            .range([250, 50]);

          // Draw the bars
          svg
            .selectAll('rect')
            .data(averages)
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.position))
            .attr('y', (d) => yScale(d.averageAge))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => 250 - yScale(d.averageAge))
            .attr('fill', (d) => colorScale(d.position));


          // Add axes
          const xAxis = d3.axisBottom(xScale);
          const yAxis = d3.axisLeft(yScale);

          svg.append('g').attr('transform', 'translate(0, 250)').call(xAxis);

          svg.append('g').attr('transform', 'translate(50, 0)').call(yAxis);

          setIsLoading(false);
        });
    }, []);

    const handleTeamGraph = async (event) => {
      event.preventDefault();

      if (!teamId || teamId < 1 || teamId > 101) {
        alert('Please enter a valid team ID. Ranging from 1 to 101');
        return;
      }

      const response = await fetch(`/node/db/${teamId}`);
      const data = await response.json();
      const players = data.response[0].players;
    
      // Calculate the average age for each position in the selected team
      const groups = d3.group(players, (d) => d.position);
    
      const team_averages = [];
      groups.forEach((players, position) => {
        const averageAge = d3.mean(players, (d) => d.age);
        team_averages.push({ position, averageAge });
      });
    
      console.log(team_averages);
    
      // Define the color scale based on position
      const colorScale = d3.scaleOrdinal()
        .domain(team_averages.map((d) => d.position))
        .range(d3.schemeCategory10);
    
      // Clear the chart
      d3.select(chartRef.current).select('svg').selectAll('*').remove();
    
      // Draw the chart
      const svg = d3
        .select(chartRef.current)
        .select('svg')
        .attr('width', 400)
        .attr('height', 300);
    
      // Set up the scales
      const xScale = d3
        .scaleBand()
        .domain(team_averages.map((d) => d.position))
        .range([50, 350])
        .padding(0.2);
    
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(team_averages, (d) => d.averageAge)])
        .range([250, 50]);
    
      // Draw the bars
      svg
        .selectAll('rect')
        .data(team_averages)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.position))
        .attr('y', (d) => yScale(d.averageAge))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => 250 - yScale(d.averageAge))
        .attr('fill', (d) => colorScale(d.position));
    
      // Add axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
    
      svg.append('g').attr('transform', 'translate(0, 250)').call(xAxis);
      svg.append('g').attr('transform', 'translate(50, 0)').call(yAxis);
    };

    const handleAverageGraph = async (event) => {
      event.preventDefault();
      const response = await fetch('/node/db');
      const data = await response.json();
    
      // Calculate the average age for each team
      const teamAverages = data.map((team) => {
        const players = team.response[0].players;
        const averageAge = d3.mean(players, (d) => d.age);
        return { team: team.name, averageAge };
      });
    
      console.log(teamAverages);
    
      // Clear the chart
      d3.select(chartRef.current).select('svg').selectAll('*').remove();
    
      // Draw the chart
      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', 400)
        .attr('height', 300);
    
      // Set up the scales
      const xScale = d3
        .scaleLinear()
        .domain([0, teamAverages.length - 1])
        .range([50, 350]);
    
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(teamAverages, (d) => d.averageAge)])
        .range([250, 50]);
    
      // Draw the scatter plot points
      svg
        .selectAll('circle')
        .data(teamAverages)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(i))
        .attr('cy', (d) => yScale(d.averageAge))
        .attr('r', 5)
        .attr('fill', 'steelblue');
    
      // Add x-axis labels for each team
      svg
        .selectAll('text')
        .data(teamAverages)
        .enter()
        .append('text')
        .attr('x', (d, i) => xScale(i))
        .attr('y', 280)
        .attr('text-anchor', 'middle')
        .text((d) => d.team);
    
      // Add axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
    
      svg.append('g').attr('transform', 'translate(0, 250)').call(xAxis);
      svg.append('g').attr('transform', 'translate(50, 0)').call(yAxis);
    };
    

    const handleTeamIdChange = (event) => {
      setTeamId(event.target.value);
    };

    //This is to make sure the data is fetched before it is rendered
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="visual-background">
        <div className="container text-center my-5 py-5">
            <h1>Data About Average Age of Players</h1>
          </div>
        <div ref={chartRef} className='my-5'></div>
        <div className="row">
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary" onClick={handleAverageGraph}>Scatter Plot for Average Age</button>
        </div>
        <div className="col-md-6">
          <label>
            Enter team ID:
            <input type="text" value={teamId} onChange={handleTeamIdChange} />
          </label>
          <button type="submit" className="btn btn-warning" onClick={handleTeamGraph}>Get Graph for Team</button>
        </div>
      </div>
      </div>
    );
  };

  export default VisualData;
