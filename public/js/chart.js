        var ctx = document.getElementById("myChart").getContext("2d");

        var data = [];
        var Colors = {};
        Colors.names = {
            aqua: "#00ffff",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            black: "#000000",
            blue: "#0000ff",
            brown: "#a52a2a",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgrey: "#a9a9a9",
            darkgreen: "#006400",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkviolet: "#9400d3",
            fuchsia: "#ff00ff",
            gold: "#ffd700",
            green: "#008000",
            indigo: "#4b0082",
            khaki: "#f0e68c",
            lime: "#00ff00",
            magenta: "#ff00ff",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            orange: "#ffa500",
            purple: "#800080",
            violet: "#800080",
            red: "#ff0000",
        };

        Colors.random = function() {
            var result;
            var count = 0;
            for (var prop in this.names)
                if (Math.random() < 1 / ++count)
                    result = prop;
            return result;
        };

        for (var i = 0; i < votes.length; i++) {
            data.push({
                'value': votes[i],
                'label': options[i],
                'color': Colors.random()
            });
        }
        
        //console.log("Data",data);
        var myDoughnutChart = new Chart(ctx).Doughnut(data, {
            legendTemplate : '<ul id="legend">'
                  +'<% for (var i=0; i<data.length; i++) { %>'
                    +'<li class="legendEntry" style="color:<%=data[i].color%>;">'
                    +'<span class="noColor"><% if (data[i].label) { %><%= data[i].label %><% } %></span>'
                  +'</li>'
                +'<% } %>'
              +'</ul>'
        });
        
        
        
        
        $("#legend").html(myDoughnutChart.generateLegend());