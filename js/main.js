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
            return "orange";
          } else {
            return "blue";
          } 
        })
        .attr("opacity", 0.4)
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
            return "orange";
          } else {
            return "blue";
          } 
        })
        .attr("opacity", 0.4)
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

  // adds brush event listener to the vis
  const brush = d3.brush()
      .extent([[MARGINS.left, MARGINS.top], [MARGINS.left + VIS_WIDTH, MARGINS.top + VIS_HEIGHT]])
      .on("brush", brushHandler);

  FRAME2.append("g")
      .call(brush);

  // defines brush handler function
  function brushHandler(event) {
      
      const selection = event.selection;
      
      const selectedPoints = [];

      // iterates over all points and checks if they're in the selection
      FRAME2.selectAll(".point").each(function(d) {
          const x = parseFloat(d3.select(this).attr("cx"));
          const y = parseFloat(d3.select(this).attr("cy"));
          if (x >= selection[0][0] && x <= selection[1][0] && y >= selection[0][1] && y <= selection[1][1]) {
              selectedPoints.push(d);
              d3.select(this)
                  .attr("opacity", 1)
                  .attr("stroke", "red")
                  .attr("stroke-width", 2);
          } else {
              d3.select(this)
                  .attr("opacity", 0.4)
                  .attr("stroke", "none");
        }
      });
    } 
  });
}

// calls function 
build_interative_scatter2();

// builds bar graph
function build_interactive_bar_graph() {

// selects the vis1 element and appends an svg element
const FRAME3 = d3.select("#vis3")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// reads data from the csv file
d3.csv("data/iris.csv").then((data3) => {

  const dataset = data3.map(d => ({ species: d.Species, count: 50}));
  
  // defines scale function that maps X and Y data values 
  // (domain) to pixel values (range)
  const X_SCALE3 = d3.scaleBand() 
                    .domain(dataset.map(d => d.species))
                    .range([0, VIS_WIDTH])
                    .padding(0.2);

  const Y_SCALE3 = d3.scaleLinear() 
                  .domain([0, 60])
                  .range([VIS_HEIGHT, 0]);

  // uses X and Y scales to plot the rectangles
  FRAME3.selectAll("rect")  
      .data(dataset)
      .enter()       
      .append("rect")  
        .attr("x", (d) => X_SCALE3(d.species) + MARGINS.left) 
        .attr("y", (d) => Y_SCALE3(d.count) + MARGINS.top)
        .attr("width", X_SCALE3.bandwidth())
        .attr("height", (d) => VIS_HEIGHT - Y_SCALE3(d.count))
        .attr("opacity", 0.4) 
        .attr("fill", (d) => { 
          if (d.species === "setosa") {
            return "green";
          } else if (d.species === "versicolor") {
            return "orange";
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
build_interactive_bar_graph();