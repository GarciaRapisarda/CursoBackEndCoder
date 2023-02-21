import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@Injectable()
export class ProductosService {
  productos: Array<Producto>;
  constructor() {
    this.productos = [];
  }

  create(createProductoDto: CreateProductoDto) {
    const id = this.generarId();
    const productoNuevo = { id, ...createProductoDto };
    this.productos.push(productoNuevo);
    return productoNuevo;
  }
  findAll(): Array<Producto> {
    return this.productos;
  }

  findOne(id: number) {
    return this.productos.find((p) => p.id === id);
  }
  update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto = this.productos.find((p) => p.id === id);
    const indice = this.productos.indexOf(producto);
    const productoActualizado = { id, ...updateProductoDto };
    this.productos.splice(indice, 1, productoActualizado);
    return productoActualizado;
  }

  remove(id: number) {
    const producto = this.productos.find((p) => p.id === id);
    const indice = this.productos.indexOf(producto);
    this.productos.splice(indice, 1);
    return this.productos;
  }

  private generarId(): number {
    return this.productos.length === 0
      ? 1
      : this.productos[this.productos.length - 1].id + 1;
  }
}
