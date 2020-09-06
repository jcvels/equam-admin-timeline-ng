import { Component, OnInit } from '@angular/core';
import { DataProviderService } from 'src/app/service/data-provider.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor ( private data:DataProviderService ) { }

  ngOnInit(): void
  {
    this.data.processListEventEmitter.subscribe( data =>
      {
        if( data != null )
        {
          this.processFoundList = data;
          this.calcDashboard();
          this.found = true;
          this.form = false;
        }
        else
        {
          this.showError();
        }
        this.waiting = false;
      }
    );
  }
  
  form:boolean = true;
  found:boolean = false;
  timeline:boolean = false;
  error:boolean = false;

  apiurl:string;
  waiting:boolean = false;

  customerEmail:string = "jpauvels@gmail.com";
  companyName:string = "Facebook";

  processFoundList:any = [];
  processTimeLine:any = [];

  germ:any = {};
  repic1:any = {};
  repic2:any = {};
  rust:any = {};
  plant:any = {}

  calcTrees:number = 0;
  calcCO2:number = 0;
  calcArea:number = 0;

  searchByCompany()
  {
    this.processFoundList = this.data.listOne( 'searchByCompany', this.companyName );
    this.waiting = true;
  }

  searchByMail()
  {
    this.processFoundList = this.data.listOne( 'searchByMail', this.customerEmail );
    this.waiting = true;
  }

  showError()
  {
    this.form = false;
    this.error = true;
  }

  calcDashboard()
  {
    let sum:number = 0;
    
    this.processFoundList.forEach( item =>
      {
        sum += Number( item.product.qtty );
      }
    );

    this.calcTrees = sum;
    this.calcCO2 = sum * 6 * 30; /* 6 kg de Dioxido de Carbono por día */
    this.calcArea = sum * 3; /* un árbol ocupa un promedio de 3m2 */
  }

  viewTimeline( data )
  {
    this.apiurl = this.data.getConfigInfo('apiurl');
    this.processTimeLine = data;

    this.germ = this.processTimeLine.updates.filter( item => item.type == 'germ')[0];
    this.repic1 = this.processTimeLine.updates.filter( item => item.type == 'repic1')[0];
    this.repic2 = this.processTimeLine.updates.filter( item => item.type == 'repic2')[0];
    this.rust = this.processTimeLine.updates.filter( item => item.type == 'rust')[0];
    this.plant = this.processTimeLine.updates.filter( item => item.type == 'plant')[0];

    this.timeline = true; this.found = false;
  }

  backToFound()
  {
    this.timeline = false; this.found = true;
  }

  resetSearch()
  {
    this.form = true;
    this.found = false;
    this.timeline = false;
    this.error = false;
    this.customerEmail = "jpauvels@gmail.com";
    this.companyName = "Facebook";
    this.processFoundList = [];
    this.processTimeLine = [];
    this.calcTrees = 0;
    this.calcCO2 = 0;
    this.calcArea = 0;
    this.germ = {};
    this.repic1 = {};
    this.repic2 = {};
    this.rust = {};
    this.plant = {}
  }

}
