import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  private apiKey: string = 'cpqZdOmVcMzZSO2MzDN3dJnpjmZw7Csk';
  private endPoint = `http://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=`;
  private limit = '10';

  public  resultados: Gif[] = [];
  
  private _historial: string[] = [];
  
  get historial() {
    return [...this._historial];
  }


  constructor(private http: HttpClient) {
    
    let histStorage = localStorage.getItem('historial')

    if(histStorage) this._historial = JSON.parse(histStorage)!


    let resultStorage = localStorage.getItem('resultados');
    if(resultStorage){this.resultados = JSON.parse(resultStorage)}
    



  }
  


   buscarGifs(query: string) {

    query = query.trim().toUpperCase();

    if(query.trim().length === 0) return
    
    if (!this._historial.includes(query)) this._historial.unshift(query);

    if (this._historial.length > 10) this._historial.pop(); 
    
    localStorage.setItem('historial', JSON.stringify(this._historial))
    
    this.http.get<SearchGifsResponse>(`${this.endPoint.concat(query)}&limit=${this.limit}`)
             .subscribe((resp) => {
              this.resultados = resp.data;
              localStorage.setItem('resultados', JSON.stringify(resp.data));
             })


    //? Peticion con Async Await
    // let resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=cpqZdOmVcMzZSO2MzDN3dJnpjmZw7Csk&q=dbz');
    // let data = await resp.json();
    // console.log(data);
    
    
  }

}
