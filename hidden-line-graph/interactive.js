


//----- Reading in the data ----//

const dataset = d3.csv("average-rating.csv");
dataset.then(function(data) {
    const slices = data.columns.map(function(id) {
        return {
            id: id,
            values: data.map(function(d){
                return {
                    name: d.name,
                    year: d.year,
                    average_rating: Math.floor(d.average_rating),
                    users_rated : +d.users_rated

                };
            })
        };
    
    });
// keeping only one of all (same)
const all_data = slices[0].values
// getting the years we want
var filtered_year = all_data.filter(function(years) {
    return years.year == "2015" || years.year == "2016" || years.year == "2017" || years.year == "2018" || years.year == "2019";
});

console.log(filtered_year)

//console.log(filtered_year)
var nested_data = d3.nest()
    .key(function(d) { return d.year; }).sortKeys(d3.ascending)
    .key(function(d) { return d.average_rating; }).sortKeys(d3.ascending)

    .rollup(function(average_rating) { return average_rating.length;})//.map(function(d) {return {d.year}})
    // .map(function(d) {return {d.year}})


    .entries(filtered_year);

console.log(nested_data)
//console.log(nested_data[0]['values'][0]['key'])


// filling in the 0's where needed 

for(let i = 0, l = 5; i < l; i++) { //this loop iterates over 2015-2019
    var first_data = nested_data[i].values; //the values (as an array) for each year
    var yy = nested_data[i].key;
     //just getting the year itself to append later to empties
    var known_keys = []; //emtpy array that will hold the bins after next loop
    //console.log(first_data.length)
    //console.log(nested_data[i].values[i])
    for(let z = 0, l = first_data.length; z < l; z++) { //loops from 0 to length of already have bins per year
        var next_level = String(first_data[z].key); //the bin that we have already per year 
        var current_object = first_data[z];
        //console.log(current_object)
        var year_object = {"year":String(yy)};
        //console.log(yy)
        let employee = Object.assign(current_object, year_object);
        //console.log(employee)
        //next_obj = current_object.push({"year":String(yy)})
        //console.log(next_obj)
        known_keys.push(next_level++); //appending these known bins to an array in outer loop
        //console.log(known_keys)
    }
        for(let m = 0, l = 10; m < l; m++) 
            {//console.log(String(j));
                //console.log(known_keys)
                if (!known_keys.includes(m)){

                    first_data.push({"key":String(m), "value":0, "year":String(yy)});
        }
    }

    //console.log("out")
}


//getting them to sort one year at a time
//2015
nested_data[0].values.sort(function(a, b) {
    return (new Number(a.key) - new Number(b.key));
    });
//2016
nested_data[1].values.sort(function(a, b) {
    return (new Number(a.key) - new Number(b.key));
    });
//2017
nested_data[2].values.sort(function(a, b) {
    return (new Number(a.key) - new Number(b.key));
    });

//2018
nested_data[3].values.sort(function(a, b) {
    return (new Number(a.key) - new Number(b.key));
    });

//2019
nested_data[4].values.sort(function(a, b) {
    return (new Number(a.key) - new Number(b.key));
    });







//-----Dimensions----//

var margin = {top: 100, right: 200, bottom: 100, left: 100};
var width = 1000;
var height = 500;

//---- Color ----//
var color = d3.scaleOrdinal().range(["#1f77b4","#ff7f0e","#2ca02c","#d62728","#9467bd"])
  


//--------------------- SCALES & AXES -----------------------------//


var yScale = d3.scaleLinear()
                   .domain([0,
                            d3.max(all_data, function(d) {return Math.max(d.users_rated)/100;})]) //will change "users_rated" to count once make count method
                   .range([height, 0]);

var xScale = d3.scaleLinear()
                   .domain([0,
                            9])
                   .range([0, width]);
                //    .domain([d3.min(data, function(d) {return d.average_rating }),
                //     d3.max(data, function(d) {return d.average_rating})])

                    

var yAxis = d3.axisLeft()
                .scale(yScale);

var xAxis = d3.axisBottom()
    //.ticks(d3.every(1))
    .scale(xScale);



//----------- Making the SVG --------//   
var q4 = d3.select("div#q4").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//add and edit x-axis
q4.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("font-weight",900)
            .style("text-anchor", "middle")
            .text("Rating")
// add and edit y-axis
q4.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .append("text")
            .attr("x", -height/2)
            .attr("y", -70)
            .attr("font-weight",900)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Count")




//lines using the data that was created getting only count variables in pre processing section
const q4Lines = q4.selectAll("lines")
                            .data(nested_data)
                            .enter()
                            .append("g");
// create the lines themselves
var line = d3.line()
            .x(function(d) { return xScale(d.key); }) //rank
            .y(function(d) { return yScale(d.value); }); //count

// creating counter for ids
var id = 0;
var ids = function()
    {
    return "line-"+id++;
    }
//line
q4Lines.append("path")
                .attr("class", ids)
                .style("stroke", function(d) { return color(d.key); })
                .attr("d", function(d) { return line(d.values); });


var circles = q4Lines.selectAll("circle")
                .data(nested_data)
                .enter()
                .append("g")
                .selectAll("circle")
                .data(function(d){ return d.values; })
                .enter()
                .append("circle")
                .attr("cx", function(d) { return xScale(d.key); })
                .attr("cy", function(d) { return yScale(d.value) })
                .attr("r", 6)
                .style("fill", function(d) { return color(d.year)})
                .attr("year", function(d) {return d.year;})
                .attr("rating", function(d) {return d.key;})
                .on('mouseover', handleMouseOver)
                .on("mouseout", handleMouseOut); ///adding the mice action

               



// adding the legend that they wanted
//15
var circle_15 = q4.append("circle")
                            .attr("r","8")
                            .attr("cx", 980)
                            .attr("cy", 45)
                            .style("fill","#1f77b4")
var leg_15 = q4.append("text")
                            .attr("x",1000)
                            .attr("y",50)
                            .text("2015")
                            .attr("font-family", "sans-serif")

//16
var circle_16 = q4.append("circle")
                            .attr("r","8")
                            .attr("cx", 980)
                            .attr("cy", 70)
                            .style("fill","#ff7f0e")
var leg_16 = q4.append("text")
                            .attr("x",1000)
                            .attr("y",75)
                            .text("2016")
                            .attr("font-family", "sans-serif")

//17
var circle_17 = q4.append("circle")
                            .attr("r","8")
                            .attr("cx", 980)
                            .attr("cy", 95)
                            .style("fill","#2ca02c")
var leg_17 = q4.append("text")
                            .attr("x",1000)
                            .attr("y",100)
                            .text("2017")
                            .attr("font-family", "sans-serif")
//18 
var circle_18 = q4.append("circle")
                            .attr("r","8")
                            .attr("cx", 980)
                            .attr("cy", 120)
                            .style("fill","#d62728")
var leg_18 = q4.append("text")
                            .attr("x",1000)
                            .attr("y",125)
                            .text("2018")
                            .attr("font-family", "sans-serif")
//19
var circle_19 = q4.append("circle")
                            .attr("r","8")
                            .attr("cx", 980)
                            .attr("cy", 145)
                            .style("fill","#9467bd")
var leg_19 = q4.append("text")
                            .attr("x",1000)
                            .attr("y",150)
                            .text("2019")    
                            .attr("font-family", "sans-serif")                        




var title_chart = q4Lines.append("text")
        .attr("x", 300)
        .attr("y", -50)
        .text("Board Games by Rating 2015-2019")
        .attr("x", width/2)
        .attr("y", -50)
        .attr("font-weight",900)
        .attr("font-size","30")
        .attr("font-family", "sans-serif") 
        .style("text-anchor", "middle");




////---- clean data ----///
// var test_y = "2019"
// var test_val = 6;
var circle_data =filtered_year;

function clean_data(circle_data,test_y,test_val) {

    var second_graph_data = circle_data.filter(function(i) {
        return i.year == test_y && i.average_rating == test_val;
    });

    second_graph_data.sort(function(a, b) {
        return (a.users_rated) - (b.users_rated);
    }).reverse();
    second_graph_data = second_graph_data.slice(0, 5);

    second_graph_data = second_graph_data.sort(function(a, b) {
        return a.value - b.value;
    }).reverse();
    //console.log(second_graph_data[2].name);
    


    //second_graph_data=second_graph_data.map(function(d) { return d.name.substring(0,10)});
    //console.log(second_graph_data[2].name);

    return second_graph_data;
}
                                

// ------ MOUSE TIME ------ //


//window.bdata = [];

function handleMouseOver(d, i) {
    d3.select(this).transition()
         .duration('100')
         .attr("r", 18) //change size of circle
         var year = String(d3.select(this).attr('year'))
         var rating = d3.select(this).attr("rating")

         console.log(year)
         console.log(rating)
        var second_graph_data =clean_data(circle_data,year,rating);
        console.log(second_graph_data)

        // this part condtionally shows only if thr rating is not = to 0 ///
        if (rating !== 1) {
            q4_2.transition() //show graph below
            .duration(100)
            .style("opacity", 1)
            update_bar(second_graph_data);
        } else {
            q4_2.transition() //show graph below
            .duration(100)
            .style("opacity", 0)


        }


}

function handleMouseOut(d, i) {
    d3.select(this).transition()
         .duration('200')
         .attr("r", 6) //get circle back to default size 
        q4_2.transition() //show graph below
        .duration(200)
        .style("opacity", 0);
        //unshows then removes so that when new one is made it does not append but reaplces the spot //
         d3.select("div#q4_2").selectAll("rect").remove();
         d3.select("div#q4_2").selectAll("text").remove();
         d3.select("div#q4_2").selectAll("line").remove();      
         d3.select("div#q4_2").selectAll("path").remove();     
}


// var test_pull_mouse = {"key":"6", "value":28,"year":"2019"};

// console.log(bdata);

// console.log(test_pull_mouse);






///---------------- INTERACTIVE BAR CHART TIME ------------////
var bmargin = {top: 30, right: 200, bottom: 50, left: 200};
var bwidth = 800;
var bheight = 225;

var q4_2 = d3.select("div#q4_2").append("svg")
            .attr("width", bwidth + bmargin.left + bmargin.right)
            .attr("height", bheight + bmargin.top + bmargin.bottom)
            .append("g")
            .attr("transform", "translate(" + bmargin.left+ "," + bmargin.top + ")")
            .style("opacity", 0); /// starts at 0 so that it does not show at the openign of file






/// --- entering into the appending land where the new graph is created --- ///
function update_bar(second_graph_data) {


    var yScale_2 = d3.scaleBand()
                    .domain(second_graph_data.map(function(d) { return d.name.substring(0,10) })) //substring to 10
                    .range([bheight, 0]) 
                    .padding(.1);

    var xScale_2 = d3.scaleLinear()
                    .domain([0,d3.max(second_graph_data, function(d) {return d.users_rated})])
                    .range([0, bwidth]);

        

    var yAxis_2 = d3.axisLeft()
                    .scale(yScale_2);

    var xAxis_2 = d3.axisBottom()
                    .scale(xScale_2);


    //dynamic variables for graph titles 
    var year_title= String(second_graph_data[0].year)
    var rate_title= String(second_graph_data[0].average_rating)


    //add and edit x-axis
    q4_2.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(0," + bheight + ")")
                    .call(xAxis_2)
                    .append("text")
                    .attr("x", bwidth/2)
                    .attr("y", 50)
                    .attr("font-weight",900)
                    .style("text-anchor", "middle")
                    .text("Number of Users")
    // add and edit y-axis
    q4_2.append("g")
                    .attr("class", "axis")
                    .call(yAxis_2)
                    .append("text")
                    .attr("x", -bheight/2)
                    .attr("y", -120)
                    .attr("font-weight",900)
                    .attr("transform", "rotate(-90)")
                    .style("text-anchor", "middle")
                    .text("Games")
                    .attr("font-size","10")

    // bars
    q4_2.selectAll(".bar")
                    .data(second_graph_data)
                    .enter()
                    .append("rect")
                    .attr("transform","translate(-70,0)")
                    //.attr("class", "bar")
                    .attr("x", 71)//function(d) { return  height -xScale_2(d.users_rated); })
                    .attr("y", function(d) { return yScale_2(d.name.substring(0,10)); })
                    .attr("width", function(d) { return xScale_2(d.users_rated); })
                    .attr("height", yScale_2.bandwidth() )
                    .attr("fill", "#fdcdac");


    // make titel more dynamic 
    var title_chart = q4_2.append("text")
                        // .attr("x", 30)
                        // .attr("y", -50)
                        .text("Top 5 Most Rated Games for Year " +year_title+" with Rating "+ String(rate_title))
                        .attr("x", bwidth/2)
                        .attr("y", 0)
                        .attr("font-weight",900)
                        .attr("font-size","20")
                        .attr("font-family", "sans-serif") 
                        .style("text-anchor", "middle");


}

//------- todo el fin ------ //
});

