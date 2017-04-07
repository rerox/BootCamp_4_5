/**
 * Created by Kamil on 2016-12-27.
 */
export class Car {
    private id : number;

    constructor(id : number, public CarName : string, public CarPower: number = 0) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.CarName;
    }

    public setName(newName: string) {
        this.CarName = newName;
    }

    public setPower(newPower: number) {
        this.CarPower = newPower;
    }
}

