/* eslint-disable no-underscore-dangle */
import { positiveInteger } from '../decorators';
import { ReferenceItem } from './reference-item';

export default class Encyclopedia extends ReferenceItem {

    private _copies: number;

    @positiveInteger
    get copies(): number {
        return this._copies;
    }

    // @positiveInteger - тульки 1: для гетера або для сетера!
    set copies(value: number) {
        this._copies = value;
    }

    constructor(
        newNumber: number,
        newTitle: string,
        newYear: number,
        public edition: number
    ) {
        super(newNumber, newTitle, newYear);
    }

    override printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation() {
        console.log(`${this.title} ${this.year}`);
    }
}