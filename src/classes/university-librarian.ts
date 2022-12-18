import * as Interfasces from './../interfaces';

class UniversityLibrarian implements Interfasces.Librarian {
    name: string;
    email: string;
    department: string;
    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    }
}

export { UniversityLibrarian };