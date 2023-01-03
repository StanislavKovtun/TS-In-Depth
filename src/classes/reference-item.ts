/* eslint-disable no-underscore-dangle */

import { timeout } from '../decorators';

abstract class ReferenceItem {

    #id: number;

    private _publisher: string;

    get publisher(): string {
        return this._publisher.toUpperCase();
    };

    set publisher(newPublisher: string) {
        this._publisher = newPublisher;
    }

    static department: string = 'Default department';

    constructor(
        id: number,
        public title: string,
        protected year: number
    ) {
        this.#id = id;
        console.log('Creating a new ReferenceItem...');
    }
    @timeout(2000)
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        //    console.log(ReferenceItem.department);
        //    console.log(Object.getPrototypeOf(this)); // приклад способу як дістатисть до прототипу
        //    console.log(Object.getPrototypeOf(this).constructor.department); // приклад способу як дістатисть до прототипу
    }

    getID(): number {
        return this.#id;
    };

    abstract printCitation(): void;
}

export { ReferenceItem };