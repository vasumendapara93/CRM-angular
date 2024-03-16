import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import * as ApexCharts from 'apexcharts';
import { ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title : ApexTitleSubtitle = {}
  chart : ApexChart  = {
    type : 'pie'
  }
  series : ApexNonAxisChartSeries = []

  ngOnInit(): void {
      this.initializeChartOptions()
  }

  initializeChartOptions(){
    this.title = {
      text : "Totle Sales"
    } 
    this.chart = {
      width: 380,
        type: "donut"
    },
    this.series = [44, 55, 41]
  }
}
