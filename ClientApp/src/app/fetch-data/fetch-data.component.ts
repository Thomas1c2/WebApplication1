import { Component, Inject } from '@angular/core';
//import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import jspdf from 'jspdf';

import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Application[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Application[]>(baseUrl + 'application').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }


  latitude: number = 8.9806;
  longitude: number = 38.7578;

  map: any;

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([38.7578, 8.9806]),
        zoom: 8
      })
    });
  }


  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }  
}

interface Application {
  status: string;
  date: string;
  summary: string;
}
