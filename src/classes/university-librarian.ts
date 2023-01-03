import { format, logger, logMethod, logParameter, sealed, writable } from '../decorators';
import * as Interfasces from './../interfaces';

// @sealed('UniversityLibrarian')
// @logger
class UniversityLibrarian implements Interfasces.Librarian {
    @format()
    name: string;
    email: string;
    department: string;
    @logMethod
    assistCustomer(@logParameter custName: string, @logParameter bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    }

    @writable(true)
    assistFaculty(): void {
        console.log('Assist faculty');
    }

    @writable(false)
    teachCommunity(): void {
        console.log('Teach community');
    }
}

export { UniversityLibrarian };