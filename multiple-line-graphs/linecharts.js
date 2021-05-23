
function cleanNames(names)
{
    cutEquals = names.substr(0, names.indexOf("="))
    return cutEquals;
}
function timeConv(date)
{
    formatter = d3.timeParse("%Y-%m-%d");
    return formatter(date);
}

//---------------------------//

const dataset = d3.csv("boardgame_ratings.csv");
dataset.then(function(data) {
    const slices = data.columns.slice(1).map(function(id) {
        return {
            id: cleanNames(id),
            values: data.map(function(d){
                return {
                    date: timeConv(d.date),
                    value: +d[id]
                };
            })
        };
    
    });


//subbing into 2 groups//

// count //
var slices_count = slices.filter((item, index) => {
    return index % 2 === 0;
})
// rank //
var slices_rank = slices.filter((item, index) => {
    return index % 2 !== 0;
})

//-----Dimensions----//

var margin = {top: 100, right: 200, bottom: 100, left: 100};
var width = 1000;
var height = 500;
//----------------//
console.log(slices); 
console.log(slices_count); 
console.log(slices_rank);  



//----------------------SCALES & AXES------------------------------//


var yScale = d3.scaleLinear()
                   .domain([0,
                            d3.max(data, function(d) {return Math.max(d["Catan=count"], d["Dominion=count"], d["Codenames=count"], d["Terraforming Mars=count"], d["Gloomhaven=count"], d["Magic: The Gathering=count"], d["Dixit=count"], d["Monopoly=count"]);})])
                   .range([height, 0]);

var xScale = d3.scaleTime()
                   .domain([d3.min(data, function(d) {return timeConv(d["date"]); }),
                            d3.max(data, function(d) {return timeConv(d["date"]); })])
                   .range([0, width]);

var yAxis = d3.axisLeft()
                .scale(yScale);

var xAxis = d3.axisBottom()
    .ticks(d3.timeMonth.every(3))
    .tickFormat(d3.timeFormat("%b %d"))
    .scale(xScale);

//color scheme is Tableau10 from : https://observablehq.com/@d3/color-schemes
var color = d3.scaleOrdinal().range(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]);


//------------------- 3 A ---------------------//

//Create SVG -----------
var question3Asvg = d3.select("div#question3Asvg").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//add and edit x-axis
question3Asvg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("font-weight",900)
            .style("text-anchor", "middle")
            .text("Month")
// add and edit y-axis
question3Asvg.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .append("text")
            .attr("x", -height/2)
            .attr("y", -70)
            .attr("font-weight",900)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Num of Ratings")

// create the lines themselves
var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.value); });

//lines using the data that was created getting only count variables in pre processing section
const question3AsvgLines = question3Asvg.selectAll("lines")
                                    .data(slices_count)
                                    .enter()
                                    .append("g");

// creating counter for ids
var id = 0;
var ids = function()
    {
    return "line-"+id++;
    }
//line
question3AsvgLines.append("path")
                .attr("class", ids)
                .style("stroke", function(d) { return color(d.id); })
                .attr("d", function(d) { return line(d.values); });

//name at the end of the line
question3AsvgLines.append("text")
                .datum(function(d) {
                        return {
                        id: d.id,
                        value: d.values[d.values.length - 1]};
                        })
                .attr("transform", function(d)
                        {
                        return "translate(" + (xScale(d.value.date) + 5)
                        + "," + yScale(d.value.value) + ")";
                        })
                .style("stroke", function(d) { return color(d.id); })
                .text(function(d) { return d.id; })


//adding title 
var chartTitle = question3Asvg.append("text")
        .attr("x", 300)
        .attr("y", -50)
        .text("Number of Ratings 2016-2020")
        .attr("x", width/2)
        .attr("y", -50)
        .attr("font-weight",900)
        .attr("font-size","30")
        .attr("font-family", "sans-serif") 
        .style("text-anchor", "middle");
        
// el fin de numero uno....in reality part 3.a



//------------------- 3 B ---------------------//

//Create SVG ----------- same as Part A
var question3Bsvg = d3.select("div#question3Bsvg").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//add and edit x-axis ------same as part A
question3Bsvg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("font-weight",900)
            .style("text-anchor", "middle")
            .text("Month")
// add and edit y-axis --- same as part A
question3Bsvg.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .append("text")
            .attr("x", -height/2)
            .attr("y", -70)
            .attr("font-weight",900)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Num of Ratings")

// create the lines themselves -- again, same as part A
var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.value); });

//lines using the data that was created getting only count variables in pre processing section
const question3BsvgLines = question3Bsvg.selectAll("lines")
                                    .data(slices_count)
                                    .enter()
                                    .append("g");

// creating counter for ids
var id = 0;
var ids = function()
    {
    return "line-"+id++;
    }
//line
question3BsvgLines.append("path")
                .attr("class", ids)
                .style("stroke", function(d) { return color(d.id); })
                .attr("d", function(d) { return line(d.values); });

//name at the end of the line
question3BsvgLines.append("text")
                .datum(function(d) {
                        return {
                        id: d.id,
                        value: d.values[d.values.length - 1]};
                        })
                .attr("transform", function(d)
                        {
                        return "translate(" + (xScale(d.value.date) + 5)
                        + "," + yScale(d.value.value) + ")";
                        })
                .style("stroke", function(d) { return color(d.id); })
                .text(function(d) { return d.id; })


///getting the data for the dots, that will then be added to the line object to create the dots on the lines
///getting teh data from the previously splided ranks/counts
//creating circlCount because we dont want a cirlce at every point, but every 3rd like the x-axis, with the value showing in text not width
// Catan, codenames, mars, gloomhaven
var index = [0,2,3,4]
sliced_ranked_values = []
for(var i = 0; i < slices_rank.length; i++)
{
    if( index.includes(i) )
    {
        for(var j = 0; j < slices_rank[i].values.length; j++)
        {
            if ((j + 1) % 3 == 0)
            {
                var local =
                {
                    id: slices_rank[i].id,
                    values: []
                }
                slices_rank[i].values[j]["id"] = slices_count[i].id;
                slices_rank[i].values[j]["circleCount"] = slices_count[i].values[j].value
                local.values.push(slices_rank[i].values[j])
                sliced_ranked_values.push(local)
            }

        }
    }
}
///adding the circles to the line graph object from the derived count value as the Y
var circles = question3BsvgLines.selectAll("circle")
                        .data(sliced_ranked_values)
                        .enter()
                        .append("g")
                        .selectAll("circle")
                        .data(function(d){ return d.values; })
                        .enter()
                        .append("circle")
                        .attr("cx", function(d) { return xScale(d.date); })
                        .attr("cy", function(d) { return yScale(d.circleCount) })
                        .attr("r", 15)
                        .style("fill", function(d) { return color(d.id)})

//getting the pesky little rank values to appear on the circles 
var circle_rank_text = question3BsvgLines.selectAll("text.value")
                                        .data(sliced_ranked_values)
                                        .enter()
                                        .append("g")
                                        .selectAll("text.value")
                                        .data(function(d) {return d.values;})
                                        .enter()
                                        .append("text")
                                        .attr("x", function(d) {return xScale(d.date) - 12;})
                                        .attr("y", function(d) {return yScale(d.circleCount) +5})
                                        .text(function(d) {return d.value})
                                        .style("fill","white")
                                        .style("font-size","15px")

// away from the line, to the svg as a whole again for details
//adding title 
var title_chart = question3BsvgLines.append("text")
        .attr("x", 300)
        .attr("y", -50)
        .text("Number of Ratings 2016-2020 with Rankings")
        .attr("x", width/2)
        .attr("y", -50)
        .attr("font-weight",900)
        .attr("font-size","30")
        .attr("font-family", "sans-serif") 
        .style("text-anchor", "middle");

// adding the legend that they wanted
var leg_circ = question3Bsvg.append("circle")
                            .attr("r","25")
                            .attr("cx", 1120)
                            .attr("cy", 475)

var leg_circ_words = question3Bsvg.append("text")
                            .attr("x",1105)
                            .attr("y",480)
                            .text("rank")
                            .style("fill","white")
var leg_title = question3Bsvg.append("text")
                            .attr("x",1050)
                            .attr("y",515)
                            .text("BoardGameGeek Rank")


        
// el fin de numero dos....in reality part 3.b



//------------------- 3 C-1 ---------------------//
// C and D shoudl be almost the exact same as B except adjustments made to the Y axis scale
// need to change to have square root here


var yScale_sqrt = d3.scaleSqrt()
                   .domain([0,
                            d3.max(data, function(d) {return Math.max(d["Catan=count"], d["Dominion=count"], d["Codenames=count"], d["Terraforming Mars=count"], d["Gloomhaven=count"], d["Magic: The Gathering=count"], d["Dixit=count"], d["Monopoly=count"]);})])
                   .range([height, 0]);

var yAxis_sqrt = d3.axisLeft()
        .scale(yScale_sqrt);
//Create SVG ----------- same as Part A,B
var question3Csvg = d3.select("div#question3Csvg").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//add and edit x-axis ------same as part A,B
question3Csvg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("font-weight",900)
            .style("text-anchor", "middle")
            .text("Month")
// add and edit y-axis --- same as part A,B
question3Csvg.append("g")
            .attr("class", "axis")
            .call(yAxis_sqrt)
            .append("text")
            .attr("x", -height/2)
            .attr("y", -70)
            .attr("font-weight",900)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Num of Ratings")

//create lines
var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale_sqrt(d.value); });

//lines using the data that was created getting only count variables in pre processing section
const question3CsvgLines = question3Csvg.selectAll("lines")
                                    .data(slices_count)
                                    .enter()
                                    .append("g");

// creating counter for ids
var id = 0;
var ids = function()
    {
    return "line-"+id++;
    }
//line
question3CsvgLines.append("path")
                .attr("class", ids)
                .style("stroke", function(d) { return color(d.id); })
                .attr("d", function(d) { return line(d.values); });

//name at the end of the line
question3CsvgLines.append("text")
                .datum(function(d) {
                        return {
                        id: d.id,
                        value: d.values[d.values.length - 1]};
                        })
                .attr("transform", function(d)
                        {
                        return "translate(" + (xScale(d.value.date) + 5)
                        + "," + yScale_sqrt(d.value.value) + ")";
                        })
                .style("stroke", function(d) { return color(d.id); })
                .text(function(d) { return d.id; })


///getting the data for the dots, that will then be added to the line object to create the dots on the lines
///getting teh data from the previously splided ranks/counts
//creating circlCount because we dont want a cirlce at every point, but every 3rd like the x-axis, with the value showing in text not width
// Catan, codenames, mars, gloomhaven

//same as part B
var index = [0,2,3,4]
sliced_ranked_values = []
for(var i = 0; i < slices_rank.length; i++)
{
    if( index.includes(i) )
    {
        for(var j = 0; j < slices_rank[i].values.length; j++)
        {
            if ((j + 1) % 3 == 0)
            {
                var local =
                {
                    id: slices_rank[i].id,
                    values: []
                }
                slices_rank[i].values[j]["id"] = slices_count[i].id;
                slices_rank[i].values[j]["circleCount"] = slices_count[i].values[j].value
                local.values.push(slices_rank[i].values[j])
                sliced_ranked_values.push(local)
            }

        }
    }
}
///adding the circles to the line graph object from the derived count value as the Y
//same as part B
var circles = question3CsvgLines.selectAll("circle")
                        .data(sliced_ranked_values)
                        .enter()
                        .append("g")
                        .selectAll("circle")
                        .data(function(d){ return d.values; })
                        .enter()
                        .append("circle")
                        .attr("cx", function(d) { return xScale(d.date); })
                        .attr("cy", function(d) { return yScale_sqrt(d.circleCount) })
                        .attr("r", 15)
                        .style("fill", function(d) { return color(d.id)})

//getting the pesky little rank values to appear on the circles 
//same as part B
var circle_rank_text = question3CsvgLines.selectAll("text.value")
                                        .data(sliced_ranked_values)
                                        .enter()
                                        .append("g")
                                        .selectAll("text.value")
                                        .data(function(d) {return d.values;})
                                        .enter()
                                        .append("text")
                                        .attr("x", function(d) {return xScale(d.date) - 12;})
                                        .attr("y", function(d) {return yScale_sqrt(d.circleCount) +5})
                                        .text(function(d) {return d.value})
                                        .style("fill","white")
                                        .style("font-size","15px")

// away from the line, to the svg as a whole again for details
//same as part B
//adding title 
var title_chart = question3CsvgLines.append("text")
        .attr("x", 300)
        .attr("y", -50)
        .text("Number of Ratings 2016-2020 (Square Root Scale)")
        .attr("x", width/2)
        .attr("y", -50)
        .attr("font-weight",900)
        .attr("font-size","30")
        .attr("font-family", "sans-serif") 
        .style("text-anchor", "middle");

// adding the legend that they wanted
//same as part B
var leg_circ = question3Csvg.append("circle")
                            .attr("r","25")
                            .attr("cx", 1120)
                            .attr("cy", 475)

var leg_circ_words = question3Csvg.append("text")
                            .attr("x",1105)
                            .attr("y",480)
                            .text("rank")
                            .style("fill","white")
var leg_title = question3Csvg.append("text")
                            .attr("x",1050)
                            .attr("y",515)
                            .text("BoardGameGeek Rank")

// el fin de numero tres....in reality part 3.c-1


//------------------- 3 C-2 ---------------------//
// C and D shoudl be almost the exact same as B except adjustments made to the Y axis scale


// create the lines themselves -- need to change to have log  here


var yScale_log = d3.scaleLog()
                   .domain([1e-6,
                            d3.max(data, function(d) {return Math.max(d["Catan=count"], d["Dominion=count"], d["Codenames=count"], d["Terraforming Mars=count"], d["Gloomhaven=count"], d["Magic: The Gathering=count"], d["Dixit=count"], d["Monopoly=count"]);})])
                   .range([height, 0]);

var yAxis_log = d3.axisLeft()
        .scale(yScale_log);
//Create SVG ----------- same as Part A,B
var question3Dsvg = d3.select("div#question3Dsvg").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//add and edit x-axis ------same as part A,B
question3Dsvg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width/2)
            .attr("y", 50)
            .attr("font-weight",900)
            .style("text-anchor", "middle")
            .text("Month")
// add and edit y-axis --- same as part A,B
question3Dsvg.append("g")
            .attr("class", "axis")
            .call(yAxis_log)
            .append("text")
            .attr("x", -height/2)
            .attr("y", -70)
            .attr("font-weight",900)
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "middle")
            .text("Num of Ratings")


var line = d3.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale_log(d.value); });

//lines using the data that was created getting only count variables in pre processing section
const question3DsvgLines = question3Dsvg.selectAll("lines")
                                    .data(slices_count)
                                    .enter()
                                    .append("g");

// creating counter for ids
var id = 0;
var ids = function()
    {
    return "line-"+id++;
    }
//line
question3DsvgLines.append("path")
                .attr("class", ids)
                .style("stroke", function(d) { return color(d.id); })
                .attr("d", function(d) { return line(d.values); });

//name at the end of the line
question3DsvgLines.append("text")
                .datum(function(d) {
                        return {
                        id: d.id,
                        value: d.values[d.values.length - 1]};
                        })
                .attr("transform", function(d)
                        {
                        return "translate(" + (xScale(d.value.date) + 5)
                        + "," + yScale_log(d.value.value) + ")";
                        })
                .style("stroke", function(d) { return color(d.id); })
                .text(function(d) { return d.id; })


///getting the data for the dots, that will then be added to the line object to create the dots on the lines
///getting teh data from the previously splided ranks/counts
//creating circlCount because we dont want a cirlce at every point, but every 3rd like the x-axis, with the value showing in text not width
// Catan, codenames, mars, gloomhaven

//same as part B
var index = [0,2,3,4]
sliced_ranked_values = []
for(var i = 0; i < slices_rank.length; i++)
{
    if( index.includes(i) )
    {
        for(var j = 0; j < slices_rank[i].values.length; j++)
        {
            if ((j + 1) % 3 == 0)
            {
                var local =
                {
                    id: slices_rank[i].id,
                    values: []
                }
                slices_rank[i].values[j]["id"] = slices_count[i].id;
                slices_rank[i].values[j]["circleCount"] = slices_count[i].values[j].value
                local.values.push(slices_rank[i].values[j])
                sliced_ranked_values.push(local)
            }

        }
    }
}
///adding the circles to the line graph object from the derived count value as the Y
//same as part B
var circles = question3DsvgLines.selectAll("circle")
                        .data(sliced_ranked_values)
                        .enter()
                        .append("g")
                        .selectAll("circle")
                        .data(function(d){ return d.values; })
                        .enter()
                        .append("circle")
                        .attr("cx", function(d) { return xScale(d.date); })
                        .attr("cy", function(d) { return yScale_log(d.circleCount) })
                        .attr("r", 15)
                        .style("fill", function(d) { return color(d.id)})

//getting the pesky little rank values to appear on the circles 
//same as part B
var circle_rank_text = question3DsvgLines.selectAll("text.value")
                                        .data(sliced_ranked_values)
                                        .enter()
                                        .append("g")
                                        .selectAll("text.value")
                                        .data(function(d) {return d.values;})
                                        .enter()
                                        .append("text")
                                        .attr("x", function(d) {return xScale(d.date) - 12;})
                                        .attr("y", function(d) {return yScale_log(d.circleCount) +5})
                                        .text(function(d) {return d.value})
                                        .style("fill","white")
                                        .style("font-size","15px")

// away from the line, to the svg as a whole again for details
//same as part B
//adding title 
var title_chart = question3DsvgLines.append("text")
        .attr("x", 300)
        .attr("y", -50)
        .text("Number of Ratings 2016-2020 (Log Scale)")
        .attr("x", width/2)
        .attr("y", -50)
        .attr("font-weight",900)
        .attr("font-size","30")
        .attr("font-family", "sans-serif") 
        .style("text-anchor", "middle");

// adding the legend that they wanted
//same as part B
var leg_circ = question3Dsvg.append("circle")
                            .attr("r","25")
                            .attr("cx", 1120)
                            .attr("cy", 475)

var leg_circ_words = question3Dsvg.append("text")
                            .attr("x",1105)
                            .attr("y",480)
                            .text("rank")
                            .style("fill","white")
var leg_title = question3Dsvg.append("text")
                            .attr("x",1050)
                            .attr("y",515)
                            .text("BoardGameGeek Rank")

// adding that little George P. Burdell signet
var gt_username = question3Dsvg.append("text")
                                .attr("x",1000)
                                .attr("y",575)
                                .attr("font-family", "sans-serif") 
                                .text("akoretchko3")


// el fin de numero cautro....in reality part 3.c-2


//------- todo el fin ------ //
});