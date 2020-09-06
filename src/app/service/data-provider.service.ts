import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

/*
 *    Para cada tabla a consultar se debera agregar:
 *    1) una url en el array routes.
 *    2) crear un Event Emitter.
 *    3) agregar el nombre de la ruta en el swicht-case de la función emitData.
 */

@Injectable({ providedIn: 'root' })

export class DataProviderService
{
  /* user data --->> TO DO Cambiar los componentes al metodo getUserInfo y getConfigInfo en vez de acceder a las variables publicas <<--- */
  public user:any = { "username":"public" };
  public config:any = { "apiurl":"" }; 

  /* event emitters */
  processListEventEmitter = new EventEmitter();
  
  manufacturersEventEmitter = new EventEmitter();
  destinationsEventEmitter = new EventEmitter();
  companiesEventEmitter = new EventEmitter();
  productsEventEmitter = new EventEmitter();
  plansEventEmitter = new EventEmitter();
  
  updatesEventEmitter = new EventEmitter();
  
  /* proporciona la ruta correcta en funcion del tipo de consulta --->> TO DO: Mejorar performance utilizando un switch case <<--- */
  private getRoute( name:string )
  {
    /* routes for each data type */
    let routes:any = 
    {
      "searchByMail":           this.getConfigInfo('apiurl') + "/data/timeline/searchByMail.php",
      "searchByCompany":        this.getConfigInfo('apiurl') + "/data/timeline/searchByCompany.php"
    };

    /* retorna la ruta solicitada */
    return routes[name]; 
  }

  /* make emit depens on given event emitter */
  private emitData( route:string, data:any )
  {
    switch( route )
    {
      case 'searchByMail':      this.processListEventEmitter.emit( data );                  break;
      case 'searchByCompany':   this.processListEventEmitter.emit( data );                  break;
      default:                  console.error( "RUTA NO DEFINIDA" );                        break;
    }
  }
  
  constructor( private http:HttpClient ) { this.getLocalConfig(); }

  /* uses get method to obtain complete list of elements from api */
  public list( route:string )
  {
    this.http.get( this.getRoute(route), { headers: this.getHeaders() } )
      .subscribe( data =>
      {
        this.emitData( route, data["values"] );
      }
    );
  }

  /* uses get method to obtain one element from api */
  public listOne( route:string, id:string )
  {
    this.http.get( this.getRoute(route) + "?filter=" + id, { headers: this.getHeaders() } )
      .subscribe( data =>
      {
        this.emitData( route, data["values"] );
        return data["values"];
      }
    );
  }

  /* retuns headers for http connection */
  private getHeaders()
  {
    /* appkey */
    let appkey = '90d34c97c0f71bd781b3e575d0efd868';

    /* http headers */
    let headers = new HttpHeaders( { 'appkey' : appkey, 'appuser' : this.user.username } );

    /* retun */
    return headers;
  }

  /* obtiene los parametros indicados en el archivo config.json */
  private getLocalConfig()
  {
    this.http.get( '/assets/config.json').subscribe(
      data => { this.config = data; },
      (error) => console.error('No se puede encontrar el archivo de configuración: ' + error )
    );
  }

  /* obtiene la configuración actual */
  public getConfigInfo( req:string )
  {
    return this.config[req];
  }

  /* obtiene la configuración actual */
  public getUserInfo( req:string )
  {
    return this.user[req];
  }

}
