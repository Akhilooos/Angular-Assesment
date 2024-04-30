
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Countryresponse } from '../countryresponse';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[HttpClient]
})
export class HomeComponent implements OnInit {

  countryData: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';

  url = "https://coronavirus.m.pipedream.net/"

  constructor(private http:HttpClient){
    console.log("Page is loaded")
  }

  ngOnInit(): void {
    this.http.get<Countryresponse>(this.url).subscribe(data => {
      this.countryData = data['rawData'];
      console.log(this.countryData);
    }); 
 }
 
 search(): void {
  console.log(this.searchText)
  if (!this.searchText) {
    this.filteredData = this.countryData;
  } else {
    this.filteredData = this.countryData.filter(country =>
      country.Country_Region.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
}