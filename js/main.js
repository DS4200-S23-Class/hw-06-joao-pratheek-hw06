/*
D3 Code 
Joao & Pratheek 
Modified: 02/28/2023
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
             return "brown";
           } else {
             return "blue";
           } 
          })
         .attr("opacity", 0.5)
         .attr("class", (d) => "unique-id" + d.id);

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

// selects the vis2 element and appends an svg element
const FRAME2 = d3.select("#vis2")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// builds first scatter plot
function build_interative_scatter2() {

  // reads data from the csv file
  d3.csv("data/iris.csv").then((data2) => {
  
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
              return "brown";
            } else {
              return "blue";
            }
          })
          .attr("opacity", 0.5)
          .attr("class", (d) => "unique-id" + d.id);

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

    // adds brushing to FRAME2
    FRAME2.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.brush()
            .extent([[0, 0], [VIS_WIDTH, VIS_HEIGHT]])
            .on("brush", handleBrush)
            .on("end", handleBrushEnd));

    // function to handle brushing over FRAME2
    function handleBrush(event) {

        const selection = event.selection;

        let selectedPoints = [];

        // selects all circles in FRAME2
        // adds/removes a class to each circle depending on brush
        FRAME2.selectAll("circle")
              .classed("selected", function(d) {
                const brushed = selection && isBrushed(selection, X_SCALE2(d.Sepal_Width), Y_SCALE2(d.Petal_Width));
                d3.select(this).classed("selected", brushed);
                if (brushed) {
                  selectedPoints.push(d.id);
                }
                return brushed;
              });

        // selects all circles in FRAME1
        // adds a class if id is in selectedPoints
        FRAME1.selectAll("circle")
              .classed("selected", function(d) {
                const isSelected = selectedPoints.includes(d.id);
                d3.select(this)
                  .classed("selected", isSelected);
                return isSelected;
              });

        // selects all rects in FRAME3
        // adds a class if id is in selectedPoints 
        FRAME3.selectAll("rect")
              .classed("selected", function(d) {
                const isSelected = selectedPoints.includes(d.id);
                d3.select(this)
                  .classed("selected", isSelected);
                return isSelected;
              });
          }

    // returns true or false depending on whether coordinates are in the brush
    function isBrushed(brush_coords, cx, cy) {
      const x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }

    // removes brush selection
    function handleBrushEnd(event) {
      if (!event.selection) {
        d3.selectAll(".selected").classed("selected", false);
      }
    }
  });
}

// calls function 
build_interative_scatter2();

// selects the vis3 element and appends an svg element
const FRAME3 = d3.select("#vis3")
                    .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// builds bar graph
function build_interactive_bar_graph() {

// reads data from the csv file
d3.csv("data/iris.csv").then((data3) => {

  // stores unique species from the dataset and gives them a count of 50
  const dataset = [];
  const uniqueSpecies = new Set(data3.map(d => d.Species));
  uniqueSpecies.forEach(Species => dataset.push({ Species, count: 50 }));

  // defines scale function that maps X and Y data values 
  // (domain) to pixel values (range)
  const X_SCALE3 = d3.scaleBand() 
                    .domain(["virginica", "versicolor", "setosa"])
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
          .attr("x", (d) => X_SCALE3(d.Species) + MARGINS.left) 
          .attr("y", (d) => Y_SCALE3(d.count) + MARGINS.top)
          .attr("width", X_SCALE3.bandwidth())
          .attr("height", (d) => VIS_HEIGHT - Y_SCALE3(d.count))
          .attr("fill", (d) => { 
            if (d.Species === "setosa") {
              return "green";
            } else if (d.Species === "versicolor") {
              return "brown";
            } else {
              return "blue";
            }
          })
          .attr("opacity", 0.5) 
          .attr("class", (d) => "unique-id" + d.id);

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


