var spatialstats = {
    "version": "0.1"
}

spatialstats.loadcsv = function(csv_data) {
    // load x,y,label data from csv data
    // note this doesn't open the file, it simply creates an array out of CSV data
    var retArr = new Array();
    var rows = csv_data.split('\n');
    
    if (typeof rows[0].split(',')[0] == 'string') { 
        // drop headers
        rows = rows.slice(1);
    }
    
    for(var idx=0; idx < rows.length-1; idx++) {
        var point = rows[idx].split(',');
        if (point.length == 3) {
            if (typeof point[2] == 'string') { 
                label = point[2]; 
            } else {
                label = parseFloat(point[2]);
            }
        } else {
            label = '0';
        }
        if (typeof retArr[label] == 'undefined') { retArr[label] = new Array(); }
        retArr[label].push(new Array(parseFloat(point[0]), parseFloat(point[1])) );
    }
    return retArr;
}

spatialstats.centroid = function (data) {
    // using x,y,label data calculate centroids of each group
    var centroids = new Array();
    
    for(var key in data) {
        if (data.hasOwnProperty(key)) {
            for (var idx=0; idx < data[key].length; idx++) {
                if (typeof centroids[key] == 'undefined') { centroids[key] = new Array(); centroids[key][0] = 0; centroids[key][1] = 0; }
                centroids[key][0] += data[key][idx][0];
                centroids[key][1] += data[key][idx][1];
            }
        }
    }
    
    for (var key in centroids) {
        if ( (data.hasOwnProperty(key)) && (centroids.hasOwnProperty(key)) ) {
            centroids[key][0] /= data[key].length;
            centroids[key][1] /= data[key].length;
        }
    }
return centroids;
}

spatialstats.vector_distance = function(x,y) {    
    return Math.pow(x[0] - y[0],2) + Math.pow(x[1] - y[1],2);
}

spatialstats.dispersion = function(data) {
    // using x,y,label data and centroids compute the dispersion for each label
    // dispersion is the average distance between each point and the centroid
    
    var centroids = (this).centroid(data);
    var distance = new Array();
    var counts = new Array();
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            for (var idx=0; idx < data[key].length; idx++) {
                // calculate average distance
                if (typeof distance[key] == 'undefined') { distance[key] = 0; counts[key] = 0;}
                var center_dist = (this).vector_distance(data[key][idx], centroids[key]);
                if (center_dist < 0) {
                    console.log(data[key][idx]);
                    console.log(centroids[key]);
                    console.log(center_dist);
                }
                distance[key] += center_dist;
            }
        }
    }
    
    for (var key in distance) {
        if (distance.hasOwnProperty(key)) {
            distance[key] /= data[key].length;
        }
    }
    
    return distance;
}
