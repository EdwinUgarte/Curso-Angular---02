import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-buscar-gif',
  templateUrl: './buscar-gif.component.html',
  styleUrls: ['./buscar-gif.component.css']
})
export class BuscarGifComponent {

  constructor(private gifsService: GifsService) { }

 @ViewChild('txtBuscar')// Leemos la referencia html y se la asignamos a una propiedad 
 txtBuscar!: ElementRef<HTMLInputElement>;
 // El ! se coloca para indicarle a typescript que esa propiedad no va a ser null

  buscar(){
    const valor = this.txtBuscar.nativeElement.value
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = ''
  }
}
