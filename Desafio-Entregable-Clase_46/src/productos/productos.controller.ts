import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    const producto = this.productosService.create(createProductoDto);
    return { mensaje: 'Producto creado de forma correcta', producto };
  }

  @Get()
  findAll() {
    const productos = this.productosService.findAll();
    return { mensaje: 'Productos encontrados', productos };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const producto = this.productosService.findOne(+id);
    if (!producto) {
      return { mensaje: 'Producto no encontrado' };
    } else {
      return { mensaje: 'Producto encontrado', producto };
    }
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductoDto: UpdateProductoDto,
  ) {
    const producto = this.productosService.findOne(+id);
    if (!producto) {
      return { mensaje: 'Producto no encontrado' };
    } else {
      const productoActualizado = this.productosService.update(
        +id,
        updateProductoDto,
      );
      return { mensaje: 'Producto actualizado', productoActualizado };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const producto = this.productosService.findOne(+id);
    if (!producto) {
      return { mensaje: 'Producto no encontrado' };
    } else {
      const productos = this.productosService.remove(+id);
      return { mensaje: 'Producto eliminado', productos };
    }
  }
}
