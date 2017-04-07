/**
 * Created by Kamil on 2016-12-27.
 */
import * as express from 'express';
import * as Car from '../model/Car';
import * as CarsModel from '../model/Cars';

export class Cars {
    private CarsList : CarsModel.Cars;

    public static routes() : express.Router {
        let router : express.Router = express.Router();
        let CarsRoute : Cars = new Cars();

        router.get('/cars/', CarsRoute.index.bind(CarsRoute));
        router.post('/cars/', CarsRoute.add.bind(CarsRoute));
        router.put('/cars/:car_id', CarsRoute.update.bind(CarsRoute));
        router.delete('/cars/:car_id', CarsRoute.delete.bind(CarsRoute));
        router.post('/cars/delete/:car_id', CarsRoute.delete.bind(CarsRoute));
        router.post('/cars/update/:car_id', CarsRoute.update.bind(CarsRoute));
        router.get('/cars/:car', CarsRoute.find.bind(CarsRoute));

        return router;
    }

    constructor() {
        this.CarsList = new CarsModel.Cars([
            new Car.Car(1, 'Lamborghini Gallardo', 570),
            new Car.Car(2, 'Lamborghini Aventador', 700),
            new Car.Car(3, 'Audi RS7',560),
            new Car.Car(4, 'Lexus LFA',560)
        ]);
    }

    public index(req : express.Request, res : express.Response) {
        res.json(this.CarsList.list());
    }

    public add(req : express.Request, res : express.Response) {
        let CarName : string = req.body.CarName;
        let CarPower : number = parseInt(req.body.CarPower) || 0;

        if (!CarName) {
            res.status(500).send('Car not found');
            return;
        }

        res.json(this.CarsList.add(CarName, CarPower));
    }

    public delete(req : express.Request, res : express.Response) {
        let CarId : number = parseInt(req.params.CarId);
        let wasDeleted : Boolean = this.CarsList.delete(CarId);

        if (!wasDeleted) {
            res.status(404).send('Car not found');
            return;
        } else {
            res.json({success: true});
        }
    }

    public update(req: express.Request, res: express.Response) {
        let CarId: number = parseInt(req.params.CarId);
        let Car: Car.Car = this.CarsList.fetch(CarId);
        let CarName: string = req.body.CarName;
        let CarPower: string = req.body.CarPower;

        if (!Car) {
            res.status(404).send('Product not found');
            return;
        }

        if (CarName !== undefined) {
            Car.setName(CarName);
        }

        if (CarPower !== undefined) {
            Car.setPower(parseInt(CarPower, 10));
        }

        if(CarId === 1) {
            res.status(500).send(`You can't edit this car!`)
        }

        res.json(Car);
    }

    public find(req : express.Request, res : express.Response) {
        let CarQuery : string = req.params.Car;
        let Car : Car.Car = this.CarsList.find(CarQuery);

        if (!Car) {
            res.status(404).send('Car not found');
            return;
        }

        res.json(Car);
    }



}