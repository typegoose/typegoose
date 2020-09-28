import { assertion } from '../../src/internal/utils';
import {
  DocumentType,
  getClass,
  getDiscriminatorModelForClass,
  getModelForClass,
  isDocument,
  ModelOptions,
  mongoose,
  Pre,
  prop,
  Prop,
  Ref
} from '../../src/typegoose';
import { DisAbove, DisAboveModel, DisMain, DisMainModel } from '../models/discriminators';
import { Default, DefaultModel, DisciminatedUserModel, ROLE, Visitor, VisitorModel } from '../models/discriminatorsWithGenerics';

it('should make use of discriminators', async () => {
  const disMainDoc = await DisMainModel.create({ main1: 'hello DMM' } as DisMain);
  const disAboveDoc = await DisAboveModel.create({ main1: 'hello DAM', above1: 'hello DAM' } as DisAbove);
  expect(disMainDoc).not.toBeUndefined();
  expect(disMainDoc.main1).toEqual('hello DMM');
  expect(disMainDoc).not.toHaveProperty('above1');
  expect(disMainDoc.__t).toBeUndefined();

  expect(disAboveDoc).not.toBeUndefined();
  expect(disAboveDoc.main1).toEqual('hello DAM');
  expect(disAboveDoc.above1).toEqual('hello DAM');
  expect(disAboveDoc.__t).toEqual('DisAbove');
});

it('"getDiscriminatorModelForClass" should return the same model if already defined', () => {
  class TestSameModelDiscriminator { }

  const model = getModelForClass(TestSameModelDiscriminator);

  const dummymodel = mongoose.model('DummyModel', new mongoose.Schema());

  const newmodel = getDiscriminatorModelForClass(dummymodel, TestSameModelDiscriminator);

  expect(newmodel).toEqual(model);
});

describe('Generic Discriminators', () => {
  it('should use DefaultModel when setting role to "ROLE.DEFAULT"', async () => {
    const instance: DocumentType<Default> = await DisciminatedUserModel.create({
      role: ROLE.DEFAULT,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.constructor).toEqual(DefaultModel);
    expect(instance.schema.path('profile')).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
    expect((instance as any).visitor).toBeUndefined();
    expect(instance.default).toEqual('sth');
    expect((instance.profile as any).test).toBeUndefined();
    expect(instance.profile!.lastName).toEqual('sth');
  });

  it('should work when using "DefaultModel" directly', async () => {
    const instance: DocumentType<Default> = await DefaultModel.create({
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.constructor).toEqual(DefaultModel);
    expect(instance.schema.path('profile')).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
    expect(instance.role).toEqual(ROLE.DEFAULT);
    expect((instance as any).visitor).toBeUndefined();
    expect(instance.default).toEqual('sth');
    expect((instance.profile as any).test).toBeUndefined();
    expect(instance.profile!.lastName).toEqual('sth');
  });

  it('should use VisitorModel when setting role to "ROLE.VISITOR"', async () => {
    const instance: DocumentType<Visitor> = await DisciminatedUserModel.create({
      role: ROLE.VISITOR,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', firstName: 'sth' }
    } as Visitor);
    expect(instance.constructor).toEqual(VisitorModel);
    expect(instance.schema.path('profile')).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
    expect(instance.role).toEqual(ROLE.VISITOR);
    expect(instance.visitor).toEqual('sth');
    expect((instance as any).default).toBeUndefined();
    expect((instance.profile as any).test).toBeUndefined();
    expect((instance.profile as any).lastName).toBeUndefined();
    expect(instance.profile!.firstName).toEqual('sth');
  });
});


it('should pass all mongoose discriminator tests', async () => {
  // Repeat tests on https://mongoosejs.com/docs/discriminators.html

  let eventValidationCalls = 0;
  let clickedLinkEventValidationCalls = 0;

  @ModelOptions({
    schemaOptions: {
      discriminatorKey: 'kind'
    }
  })
  @Pre('validate', (next) => {
    ++eventValidationCalls;
    next();
  })
  class Event {
    public kind?: string;

    @Prop()
    public time?: Date;
  }

  @Pre('validate', (next) => {
    ++clickedLinkEventValidationCalls;
    next();
  })
  class ClickedLinkEvent extends Event {
    @Prop()
    public url?: string;
  }

  class SignedUpEvent extends Event {
    @Prop()
    public user?: string;
  }

  class SubEvent extends Event {
    @Prop({ type: Event, discriminators: () => [ClickedLinkEvent, SignedUpEvent, SubEvent] })
    public events: Event[];
  }

  class EventList {
    @Prop({ type: Event, discriminators: () => [ClickedLinkEvent, SignedUpEvent, SubEvent] })
    public events: Event[];
  }

  class Shape {
    @Prop()
    public name: string;
  }

  class Circle extends Shape {
    @Prop()
    public radius: number;
  }

  class Square extends Shape {
    @Prop()
    public side: number;
  }

  class ShapeTest {
    @Prop({ discriminators: () => [Circle, Square] })
    public shape: Shape;
  }

  const EventModel = getModelForClass(Event);
  const ClickedLinkEventModel = getDiscriminatorModelForClass(EventModel, ClickedLinkEvent);
  const SignedUpEventModel = getDiscriminatorModelForClass(EventModel, SignedUpEvent);
  const SubEventModel = getDiscriminatorModelForClass(EventModel, SubEvent);
  const EventListModel = getModelForClass(EventList);

  const ShapeModel = getModelForClass(Shape);
  const CircleModel = getDiscriminatorModelForClass(ShapeModel, Circle);
  const SquareModel = getDiscriminatorModelForClass(ShapeModel, Square);
  const ShapeTestModel = getModelForClass(ShapeTest);

  // https://mongoosejs.com/docs/discriminators.html#using-discriminators-with-model-create
  const events = await Promise.all([
    EventModel.create<DocumentType<ClickedLinkEvent>>({ time: Date.now(), url: 'google.com' }),
    ClickedLinkEventModel.create({ time: Date.now(), url: 'google.com' }),
    SignedUpEventModel.create({ time: Date.now(), user: 'testuser' })
  ]);

  const [genericEvent, clickedEvent, signedUpEvent] = events;

  // https://mongoosejs.com/docs/discriminators.html#the-model-discriminator-function
  expect(genericEvent).not.toHaveProperty('url');
  expect(clickedEvent).toHaveProperty('url', 'google.com');

  // https://mongoosejs.com/docs/discriminators.html#discriminators-save-to-the-event-models-collection
  const eventCount = await EventModel.countDocuments().exec();
  expect(eventCount).toEqual(3);

  // https://mongoosejs.com/docs/discriminators.html#discriminator-keys
  expect(getClass(genericEvent)).toEqual(Event);
  expect(genericEvent).toHaveProperty('kind', undefined);
  expect(getClass(clickedEvent)).toEqual(ClickedLinkEvent);
  expect(clickedEvent).toHaveProperty('kind', 'ClickedLinkEvent');
  expect(getClass(signedUpEvent)).toEqual(SignedUpEvent);
  expect(signedUpEvent).toHaveProperty('kind', 'SignedUpEvent');

  // https://mongoosejs.com/docs/discriminators.html#discriminators-add-the-discriminator-key-to-queries
  const clickedEvents = await ClickedLinkEventModel.find().exec();
  expect(clickedEvents).toHaveLength(1);
  expect(clickedEvents[0]._id).toEqual(clickedEvent._id);
  expect(clickedEvents[0].url).toEqual('google.com');

  // https://mongoosejs.com/docs/discriminators.html#discriminators-copy-pre-and-post-hooks
  expect(eventValidationCalls).toEqual(3);
  expect(clickedLinkEventValidationCalls).toEqual(1);

  // https://mongoosejs.com/docs/discriminators.html#embedded-discriminators-in-arrays
  const eventList = await EventListModel.create({ events });
  expect(eventList.events).toHaveLength(3);
  expect(getClass(eventList.events[0])).toEqual(Event);
  expect(getClass(eventList.events[1])).toEqual(ClickedLinkEvent);
  expect(getClass(eventList.events[2])).toEqual(SignedUpEvent);

  // https://mongoosejs.com/docs/discriminators.html#recursive-embedded-discriminators-in-arrays
  const subEvent = await SubEventModel.create({
    events: [
      ...events,
      await SubEventModel.create({ events })
    ]
  });
  expect(subEvent.events).toHaveLength(4);
  expect(subEvent.events[3]).toHaveProperty('events');

  // https://mongoosejs.com/docs/discriminators.html#single-nested-discriminators
  const [circle, square] = await Promise.all([
    ShapeTestModel.create({ shape: new CircleModel({ radius: 5 }) }),
    ShapeTestModel.create({ shape: new SquareModel({ side: 10 }) })
  ]);
  expect(circle).toHaveProperty(['shape', 'radius'], 5);
  expect(square).toHaveProperty(['shape', 'side'], 10);
});

it('should work with references [typegoose#385]', () => {
  // this is an typegoose version of "setting to discriminator (gh-4935)" in mongoose
  class Buyer {
    @prop()
    public name?: string;

    @prop({ ref: () => Vehicle })
    public vehicle?: Ref<Vehicle>;
  }
  class Vehicle {
    @prop()
    public name?: string;
  }
  class Car extends Vehicle {
    @prop()
    public model?: string;
  }

  const BuyerModel = getModelForClass(Buyer);
  const VehicleModel = getModelForClass(Vehicle);
  const CarModel = getDiscriminatorModelForClass(VehicleModel, Car);

  const eleanor = new CarModel({ name: 'Eleanor', model: 'Shelby Mustang GT' });
  const nick = new BuyerModel({ name: 'Nicolas', vehicle: eleanor });

  expect(nick.vehicle).not.toBeUndefined();
  expect(nick.vehicle).toEqual(eleanor);
  expect(nick.vehicle).toBeInstanceOf(CarModel);
  assertion(isDocument(nick.vehicle), new Error('Expect "nick.vehicle" to be an document'));
  expect(nick.vehicle.name).toEqual('Eleanor');
});
