import { ReferenceItem } from './reference-item';

export default class Encyclopedia extends ReferenceItem {
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