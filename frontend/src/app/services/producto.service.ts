import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  codigoProducto: string;
  nombre: string;
  descripcion: string;
  marca: string;
  categoria: string;
  precio: number;
  stock: number;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    console.log('Enviando POST a:', this.apiUrl);
    console.log('Datos enviados:', producto);
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  actualizarProducto(codigo: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${codigo}`, producto);
  }

  eliminarProducto(codigo: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }
}

