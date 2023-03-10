import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent  {
  
  get historial() {
   return [...this.gifsService.historial];
  }

  select: string = '';
  constructor(private gifsService: GifsService) {}


  buscar(item: string){
    this.gifsService.buscarGifs(item);
  }

}
