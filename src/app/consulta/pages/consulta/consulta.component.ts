import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../../services/consulta.service';
import { Datos, Filtro } from '../../interfaces/consulta.interfaces';
import { AplicaService } from '../../services/aplica.service';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
})
export class ConsultaComponent implements OnInit{


  aux: Datos [] = [];
  datos: Datos[] = [];
  linea: number = 0;
  config: any;
  tooltip: string =''
  filtro: Filtro = {
    cliente: "",
    referencia: '',
    usuario: '',
    fecha1: "",
    fecha2: "",
    tipo: "",
    estado: []
  };

  private HEIGTH_ROW: number = 38;
  private SPACE: number = 3;

  constructor(private consultaService:ConsultaService, private aplicaService: AplicaService){
    this.config = {
    itemsPerPage: this.getIntemsPerPage(),
    currentPage: 1,
    totalItems: this.datos.length,
  };
    this.tooltip = '<strong>test</strong>';
  }
  
  
  ngOnInit(): void {
    
    this.consultaService.consulta()
    .subscribe((datos) =>{
      this.aux = datos; 
      this.datos = this.aux;
      this.linea=this.aux.length;
    });
    
    
    this.aplicaService.getFiltroObservable()
    .subscribe((filtros) => {
      this.Filtrar(filtros)});
      
    } 

    Filtrar(filtros:Filtro){
      this.aplicaService.filtrar(filtros).
      subscribe(data => {
          this.datos = data
          this.linea = this.datos.length
        });

    }

    getIntemsPerPage() {
      return Math.round(window.innerHeight / this.HEIGTH_ROW) - this.SPACE;
    }
    
  }




