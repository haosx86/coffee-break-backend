import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Coffee } from './schemas/coffee.schema';
import { CoffeeDescription } from './models/coffeeDescription.model';
import { CoffeeImage } from './models/coffeeImage.model';

const COFFEE_DESC_ENDPOINT =
  'https://random-data-api.com/api/coffee/random_coffee';

const COFFEE_IMG_ENDPOINT = 'https://loremflickr.com/json/500/500/coffee,bean';

@Injectable()
export class CoffeeService {
  constructor(@InjectModel(Coffee.name) private coffeeModel: Model<Coffee>) {}

  async getCoffee(id?: string) {
    let coffee = await this.coffeeModel
      .findOne(
        id ? { _id: { $gt: new ObjectId(id) } } : {},
        {},
        { sort: { _id: 1 } },
      )
      .exec();

    if (!coffee) {
      coffee = await this.coffeeModel.create(await this.fetchNewCoffee());
    }

    return coffee;
  }

  incrementCoffeeLikes(id: string) {
    return this.coffeeModel
      .findOneAndUpdate(
        { _id: { $gt: new ObjectId(id) } },
        {
          $inc: {
            likes: 1,
          },
        },
      )
      .exec();
  }

  async fetchNewCoffee(): Promise<Coffee> {
    try {
      const [coffeeImage, coffeeDescription] = await Promise.all([
        (await fetch(COFFEE_IMG_ENDPOINT)).json() as Promise<CoffeeImage>,
        (
          await fetch(COFFEE_DESC_ENDPOINT)
        ).json() as Promise<CoffeeDescription>,
      ]);

      return {
        blendName: coffeeDescription.blend_name,
        origin: coffeeDescription.origin,
        variety: coffeeDescription.variety,
        notes: coffeeDescription.notes.split(', '),
        intensifier: coffeeDescription.intensifier,
        imageURL: coffeeImage.file,
        likes: 0,
      };
    } catch (error) {
      console.error('Fetching coffee data has failed', error);
    }
  }
}
