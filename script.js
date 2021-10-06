function plotGraph() {
    try {
        // Compiling f(x) into readable equation
        const fx = document.getElementById('function').value;                
        const eq = math.compile(fx);

        //Evaluate f(x) for different plot points of x & y
        const xVal = math.range(-10, 10, 0.1).toArray();
        const yVal = xVal.map(function (x) {
            return eq.evaluate({x: x})
        })

        //Render plot for f(x) graph
        const trace = {
            x: xVal,
            y: yVal,
            type: 'line'
        }

        // Upper, Lower, n
        const upper = document.getElementById('upper').value;
        const lower = document.getElementById('lower').value;
        var n = document.getElementById('n').value;

        //Ensure n is between 4-10
        if (n < 4) {
            n = 4;
        } 
        else if (n > 10) {
            n = 10;
        }

        //Calculate h
        const h = (upper-lower)/n;

        //Compute sum of first and last terms of equation
        //Do this because middle terms will all be multiplied by 2
        let sum = eq.evaluate({x: upper}) + eq.evaluate({x: lower});

        //Compute middle terms
        for (i = 1; i < n; i++) {
            let scope = {x: lower+i*h};
            sum += (2*eq.evaluate(scope));
        }

        const tArea = (h/2)*sum;
        document.getElementById("area").innerHTML = "Trapezoidal Rule Area ≈ " + tArea;

        //Find y-values
        const yLower = eq.evaluate({x: lower});
        const yUpper = eq.evaluate({x: upper});

        //Render plot for Trapzoidal Area
        const trace2 = {
            x: [lower, lower, upper, upper], 
            y: [0, yLower, yUpper, 0],
            fill: 'toself',
            fillcolor: '#5CABF5'
        }
        
        Plotly.newPlot('plot', [trace, trace2]);
    }
    catch (err) {
        console.error(err);
        alert(err);
    }            
}

document.getElementById('form').onsubmit = function(event) {
    event.preventDefault();
    plotGraph();
}