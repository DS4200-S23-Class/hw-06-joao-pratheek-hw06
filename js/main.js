/*
D3 Code 
Joao & Pratheek 
Modified: 02/23/2023
*/

// dimensions of the frame  
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 500;

// margins of the Frame 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

// sets dimensions of visualizations within the frame
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

// selects the vis1 element and appends an svg element
const FRAME1 = d3.select("#vis1")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// builds first scatter plot
function build_interative_scatter1() {

// reads data from the csv file
d3.csv("data/iris.csv").then((data) => {

  // finds max X and Y values in the csv data
  // cast to int type when string in the csv
  const MAX_X = d3.max(data, (d) => { return parseInt(d.Sepal_Length); });

  const MAX_Y = d3.max(data, (d) => { return parseInt(d.Petal_Length); });
  
  // defines scale function that maps X and Y data values 
  // (domain) to pixel values (range)
  const X_SCALE = d3.scaleLinear() 
                    .domain([0, 8])
                    .range([0, VIS_WIDTH]); 

  const Y_SCALE = d3.scaleLinear() 
                    .domain([7, 0]) 
                    .range([0, VIS_HEIGHT]); 

  // uses X and Y scales to plot the points
  FRAME1.selectAll("circle")  
      .data(data)
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE(d.Sepal_Length) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE(d.Petal_Length) + MARGINS.top); })  
        .attr("r", 5)
        .attr("fill", (d) => { 
          if (d.Species === "setosa") {
            return "green";
          } else if (d.Species === "versicolor") {
            return "red";
          } else {
            return "blue";
          } 
        })
        .attr("opacity", 0.5)
        .attr("class", "point");

  // adds an X and Y axis to the vis  
  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE)) 
          .attr("font-size", '15px');

  FRAME1.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + MARGINS.top + ")") 
        .call(d3.axisLeft(Y_SCALE)) 
          .attr("font-size", '15px'); 
  });
}

// calls function 
build_interative_scatter1();

// selects the vis1 element and appends an svg element
const FRAME2 = d3.select("#vis2")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// builds first scatter plot
function build_interative_scatter2() {

// reads data from the csv file
d3.csv("data/iris.csv").then((data2) => {

  // finds max X and Y values in the csv data
  // cast to int type when string in the csv
  const MAX_X2 = d3.max(data2, (d) => { return parseInt(d.Sepal_Width); });

  const MAX_Y2 = d3.max(data2, (d) => { return parseInt(d.Petal_Width); });
  
  // defines scale function that maps X and Y data values 
  // (domain) to pixel values (range)
  const X_SCALE2 = d3.scaleLinear() 
                    .domain([0, 5])
                    .range([0, VIS_WIDTH]); 

  const Y_SCALE2 = d3.scaleLinear() 
                    .domain([3, 0]) 
                    .range([0, VIS_HEIGHT]); 

  // uses X and Y scales to plot the points
  FRAME2.selectAll("circle")  
      .data(data2)
      .enter()       
      .append("circle")  
        .attr("cx", (d) => { return (X_SCALE2(d.Sepal_Width) + MARGINS.left); }) 
        .attr("cy", (d) => { return (Y_SCALE2(d.Petal_Width) + MARGINS.top); })  
        .attr("r", 5)
        .attr("fill", (d) => { 
          if (d.Species === "setosa") {
            return "green";
          } else if (d.Species === "versicolor") {
            return "red";
          } else {
            return "blue";
          } 
        })
        .attr("opacity", 0.5)
        .attr("class", "point");

  // adds an X and Y axis to the vis  
  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE2)) 
          .attr("font-size", '15px');

  FRAME2.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + MARGINS.top + ")") 
        .call(d3.axisLeft(Y_SCALE2)) 
          .attr("font-size", '15px'); 
  });
}

// calls function 
build_interative_scatter2();

// builds bar graph
function build_interative_bar_graph() {

// selects the vis1 element and appends an svg element
const FRAME3 = d3.select("#vis3")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// reads data from the csv file
d3.csv("data/iris.csv").then((data3) => {
  
  // defines scale function that maps X and Y data values 
  // (domain) to pixel values (range)
  const X_SCALE3 = d3.scaleBand() 
                    .domain(["setosa", "versicolor", "virginica"])
                    .range([0, VIS_WIDTH])
                    .padding(0.2);

  const Y_SCALE3 = d3.scaleBand() 
                  .domain([100, 0])
                  .range([0, VIS_HEIGHT])
                  .padding(0.2);

  // uses X and Y scales to plot the rectangles
  FRAME3.selectAll("rect")  
      .data(data3)
      .enter()       
      .append("rect")  
        .attr("x", (d) => { return (X_SCALE3(d.Species) + MARGINS.left); }) 
        .attr("y", 50) 
        .attr("width", X_SCALE3.bandwidth())
        .attr("height", VIS_HEIGHT - 60)
        .attr("opacity", 0.5)
        .attr("fill", (d) => { 
          if (d.Species === "setosa") {
            return "green";
          } else if (d.Species === "versicolor") {
            return "red";
          } else {
            return "blue";
          } 
        });

  // adds an X and Y axis to the vis  
  FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + (VIS_HEIGHT + MARGINS.top) + ")") 
        .call(d3.axisBottom(X_SCALE3)) 
          .attr("font-size", '15px');

  FRAME3.append("g") 
        .attr("transform", "translate(" + MARGINS.left + 
              "," + MARGINS.top + ")") 
        .call(d3.axisLeft(Y_SCALE3)) 
          .attr("font-size", '15px'); 
  });
}

// calls function 
build_interative_bar_graph();