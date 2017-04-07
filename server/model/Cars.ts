/**
 * Created by Kamil on 2016-12-27.
 */
import * as CarsModel from './Car';

export class Cars {
    private CarsList: Array<CarsModel.Car>;

    constructor(products: Array<CarsModel.Car> = []) {
        this.CarsList = new Array<CarsModel.Car>();

        products.forEach(
            (Car) => this.CarsList.push(Car)
        );
    }

    public list(): Array<CarsModel.Car> {
        return this.CarsList;
    }

    public delete(carId: number): Boolean {
        let deleted: Boolean = false;

        this.CarsList = this.CarsList.filter(
            (Car: CarsModel.Car) => {
                deleted = deleted || Car.getId() === carId;
                return Car.getId() !== carId;
            }
        );

        return deleted;
    }
    public add(CarName : string, CarQuery : number) : Array<CarsModel.Car>  {
        let CarIds : Array<number> = this.CarsList.map(
            (Car) => Car.getId()
        );
        let CarId : number = Math.max(...CarIds) + 1;

        let Car = new CarsModel.Car(CarId, CarName, CarQuery);

        this.CarsList.push(Car);

        return this.CarsList;
    }

    public fetch(CarId: number): CarsModel.Car {
        return CarId && this.CarsList.filter(
                (Car: CarsModel.Car) => Car.getId() === CarId
            ).shift();
    }

    public find(CarQuery: string): CarsModel.Car {
        let CarId: number = parseInt(CarQuery);
        CarQuery = CarQuery.toLowerCase();

        return this.CarsList.filter(
            (Car: CarsModel.Car) => Car.getId() === CarId
            || Car.getName().toLowerCase() === CarQuery
        ).shift();
    }

}
