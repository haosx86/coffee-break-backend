import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL ?? 'mongodb://localhost/nest'),
    CoffeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
