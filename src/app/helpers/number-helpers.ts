import {Axis} from "../models/chart-entity.model";
import {faker} from "@faker-js/faker";

export function generateRandomData(): Axis[] {
  const data: Axis[] = [];
  const maxCount = randomInteger(10, 20);
  let date = faker.date.past({years: randomInteger(5, 10)});
  for (let i = 0; i < maxCount; i++) {
    date = faker.date.future({refDate: date});
    data.push({
      date,
      value: randomInteger(20, 120)
    });
  }
  return data;
}

export function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
