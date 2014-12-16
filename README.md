simplespatialjs
===============

Simple spatial descriptive statistics (2D)

Example
=======
```javascript
  var csv_data = "1,2,0\n1,2,0\n1,2,0\n7,3,abc\n6,10,abc\n";
  var d_array = spatialstats.loadcsv(csv_data);
  var centroids = spatialstats.centroid(d_array));
  var dispersion = spatialstats.dispersion(d_array));
```

Documentation
=============
Download simplespatial.js and source it in your code (the object is 'spatialstats').  The code takes as input a csv file organized with "x,y,label" data and can then compute centroids and dispersion for each label.  For now only four functions:

<ul>
  <li> loadcsv() - Pass CSV data as a string (not a file) to get an array of points keyed by label </li>
  <li> vector_distance()  - Compute the distance between any two 2d points </li>
  <li> centroids()  - Compute the centroids of each class</li>
  <li> dispersion() - Compute the dispersion (average distance to center) for each class </li>
</ul>
