import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [ItemsModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
