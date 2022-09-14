import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Login';
  chart: [];  
  constructor() { }
  ngOnInit(): void {

  }
  ngAfterViewInit() {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.chart = new Chart(ctx, {});
  }
}
