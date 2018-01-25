import { AfterViewInit, Component } from '@angular/core';

import * as d3 from 'd3-selection';
import { scaleLinear } from 'd3-scale';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.css',
    './style.css'
  ]
})
export class DashboardComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {
    const blue_to_brown = scaleLinear()
      .domain([9, 50])
      .range(['steelblue', 'brown'])
      .interpolate(d3.interpolateLab);

    const color = d => blue_to_brown(d['economy (mpg)']);

    const parcoords = d3.parcoords()('#example')
      .color(color)
      .alpha(0.4);

    // load csv file and create the chart
    d3.csv('data/cars.csv', data => {
      parcoords
        .data(data)
        .hideAxis(['name'])
        .render()
        .brushMode('1D-axes');  // enable brushing

      // create data table, row hover highlighting
      const grid = d3.divgrid();
      d3.select('#grid')
        .datum(data.slice(0, 10))
        .call(grid)
        .selectAll('.row')
        .on({
          'mouseover': d => parcoords.highlight([d]),
          'mouseout': parcoords.unhighlight
        });

      // update data table on brush event
      parcoords.on('brush', d => {
        d3.select('#grid')
          .datum(d.slice(0, 10))
          .call(grid)
          .selectAll('.row')
          .on({
            'mouseover': _d => parcoords.highlight([_d]),
            'mouseout': parcoords.unhighlight
          });
      });
    });
  }
}
