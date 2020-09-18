import { getModelForClass, index, prop, Ref } from '../../src/typegoose';

export class RatingCar {
  @prop({ required: true })
  public carModel!: string;
}

export class RatingUser {
  @prop({ required: true })
  public name!: string;
}

@index({ car: 1, user: 1 }, { unique: true })
export class Rating {
  @prop({ ref: RatingCar, required: true })
  public car!: Ref<RatingCar>;

  @prop({ ref: RatingUser, required: true })
  public user!: Ref<RatingUser>;

  @prop({ required: true })
  public stars!: number;
}

export const RatingCarModel = getModelForClass(RatingCar);
export const RatingUserModel = getModelForClass(RatingUser);
export const RatingModel = getModelForClass(Rating);
