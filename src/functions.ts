/* eslint-disable no-redeclare */

import { Category } from './enums';
import { Book, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: false, category: Category.CSS },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];
    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void { // ## + readonly!!!
    console.log(`Number of books: ${books.length}`);
    const title = books.find(({ available }) => available === true)?.title;// деструктуризація + ?.
    console.log(`First available book: ${title}`);
}

export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    return books.filter(({ category }) => category === inputCategory).map(({ title }) => title);
}

export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

// logBookTitles(getBookTitlesByCategory(Category.CSS));

export function getBooksAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

// console.log(getBooksAuthorByIndex(0));

export function calcTotalPages(): void {
    const data = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];
    const r = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);

    console.log(r);
}

export function createCustomerID(name: string, id: number): string {
    return `${name} ${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    let result: string = name;
    if (age) {
        result += ` ${age}`;
    }
    if (city) {
        result += ` ${city}`;
    }
    console.log(result);
}

export function getBookByID(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIDs: number[]) {
    console.log(`Customer name: ${customer}`);
    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg)
                .map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg)
                .map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            // ця перевірка не обов'язкова, так як у нас тільки одна відповідна сигнатура
            return books.filter(book => book.id === id && book.available === available)
                .map(book => book.title);
        }
    }
}

export function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('value should have been a string');
    }
}

function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('Function is not an instance of RefBook');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}

export function setDefaultConfig(options: TOptions) {
    options.duration ??= 100;
    options.speed ??= 60;
    return options;
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

// Task 06.03. Default Export
// 1. Створіть файл encyclopedia.ts та перемістіть до нього клас Encyclopedia. Додайте імпорт
// ReferenceItem. Додайте експорт за замовчуванням.
// 2. Імпортуйте цей клас у app.ts як RefBook
// 3. Внесіть зміни до коду завдання Task 05.02.
// 4. / Автор: Yevhen_Zakharevych@epam.com /. Створіть функцію-ствердження умови
// assertRefBookInstance в модулі functions.ts Функція повинна приймати condition: any та повертати
// тип asserts condition. Якщо умова не виконується, функція повинна генерувати виняток «It is not
// an instance of RefBook» .
// 5. Створіть та експортуйте функцію printRefBook(data: any): void, яка використовує функцію
// assertRefBookInstance та викликає метод printItem() у екземпляра RefBook. Умову перевірки
// задайте за допомогою оператора instanceof
// 6. Імпортуйте функцію printRefBook в app.ts та викличте для екземпляра класу RefBook.
// 7. Створіть екземпляр класу UniversityLibrarian та знову викличте для нього функцію printRefBook


