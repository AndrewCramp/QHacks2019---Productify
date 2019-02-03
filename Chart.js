window.onload = function() {
 
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "My Web Browsing Stats!",
            horizontalAlign:"center"
        },
        data: [{
            type: "doughnut",
            startAngle: 150,
            indexLabelFontSize: 10,
            indexLabel: "   {label}-#percent%",
            toolTipContent: "<b>{label}:</b> {y} hours (#percent%)",
            dataPoints: [
                {y: 500, label: "Productive"},
                {y: 290, label: "Social Media"},
                {y: 340, label: "Entertainment"}
            ]
        }]
    });
    chart.render();
     
    }       