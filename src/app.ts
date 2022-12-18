/* eslint-disable no-underscore-dangle */
/* eslint-disable no-redeclare */

// TypeScript In-Depth

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ================================================================

// 02. Types Basics

enum Category { 'JavaScript', 'CSS', 'HTML', 'TypeScript', 'Angular' }

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

function getAllBooks(): readonly Book[] {
    const books = <const>[
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true, category: Category.JavaScript },
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false, category: Category.JavaScript },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: false, category: Category.CSS },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true, category: Category.JavaScript }
    ];
    return books;
}

// console.log(getAllBooks());


function logFirstAvailable(books: readonly Book[] = getAllBooks()): void { // ## + readonly!!!
    console.log(`Number of books: ${books.length}`);
    const title = books.find(({ available }) => available === true)?.title;// деструктуризація + ?.
    console.log(`First available book: ${title}`);
}

// logFirstAvailable(getAllBooks());

function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    return books.filter(({ category }) => category === inputCategory).map(({ title }) => title);
}

function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

// logBookTitles(getBookTitlesByCategory(Category.CSS));

function getBooksAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

// console.log(getBooksAuthorByIndex(0));

function calcTotalPages(): void {
    const data = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];
    const r = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);

    console.log(r);
};

// calcTotalPages();

// 03. Functions

// Task 03.01. Function Type

// Створіть функцію createCustomerID(), яка приймає ім'я клієнта (name: string) та його ідентифікатор (id: number)
// та повертає конкатенацію цих значень у вигляді рядка.
// Об’явіть змінну myID рядкового типу та викличте функцію зі значеннями Ann, 10. Отримане значення виведіть у консоль.

function createCustomerID(name: string, id: number): string {
    return `${name} ${id}`;
}

let myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// Об’явіть змінну idGenerator і вкажіть тип функції createCustomerID().
// Надайте цій змінній функціональний вираз, використовуючи стрілочну функцію.
// Тіло подібне до функції createCustomerID().
// Надайте змінній idGenerator функцію createCustomerID() та викличте її.
// Отримане значення виведіть у консоль.

// let idGenerator: (name: string, id: number) => string; // 1й спосіб задання функціонального типу
let idGenerator: typeof createCustomerID; // 2й спосіб задання функціонального типу
idGenerator = (name: string, id: number) => `${name} ${id}`;
idGenerator = createCustomerID;

// // const a = typeof createCustomerID;
// console.log(idGenerator('Boris', 20));

// Task 03.02. Optional, Default and Rest Parameters

// Створіть функцію createCustomer(), яка приймає три параметри:
// name: string – обов'язковий
// age: number – необов'язковий
// city: string – необов'язковий
// Функція повинна виводити ім'я клієнта в консоль, а також, якщо заданий вік, вона повинна додатково виводити вік у консоль.
// Якщо задане місто, то додатково має виводити місто у консоль. Викличте цю функцію з одним, двома та трьома аргументами.

function createCustomer(name: string, age?: number, city?: string): void {
    let result: string = name;
    if (age) {
        result += ` ${age}`;
    }
    if (city) {
        result += ` ${city}`;
    }
    console.log(result);
}
// createCustomer('Stas');
// createCustomer('Stas', 35);
// createCustomer('Stas', 35, 'Sumy');

// Внесіть зміни до функції getBookTitlesByCategory() – додайте для параметра значення за замовчуванням Category.JavaScript.
// Викличте цю функцію без аргументів.
// console.log(getBookTitlesByCategory());

// Внесіть зміни до функції logFirstAvailable() – додайте для параметра значення за замовчуванням – виклик функції getAllBooks().
// Викличте цю функцію без аргументів.
// logFirstAvailable();

// Створіть функцію getBookByID(), яка приймає id книжки та повертає книжку. Використовуйте функцію getAllBooks(),
// метод масиву find() та стрілочну функцію. Викличте функцію та передайте їй 1.

// function getBookByID(id: Book['id']): Book | undefined {
function getBookByID(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

// console.log(getBookByID(1));

// Створіть функцію сheckoutBooks(), яка приймає два параметри:
// customer: string
// bookIDs: number[] – змінне значення ідентифікаторів книжок (рест параметр)
// Функція повинна перевірити доступність кожної книжки, заданої ідентифікатором, та повернути масив найменувань (title) книжок,
// які є доступними. (available = true). Використовуйте функцію getBookById().
// Також функція повинна виводити в консоль ім'я заданого клієнта.

function сheckoutBooks(customer: string, ...bookIDs: number[]) {
    console.log(`Customer name: ${customer}`);
    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
}

// console.log(сheckoutBooks('Customer1', 1, 3, 4));
// console.log(сheckoutBooks('Customer1'));
// console.log(сheckoutBooks('Customer1', ...[1, 3, 4])); // варіант як передати массив в параметр

// Об’явіть змінну myBooks та збережіть у ній результат виклику функції сheckoutBooks('Ann', 1, 2, 4). Виведіть результат у консоль.

// let myBooks = сheckoutBooks('Ann', 1, 2, 4);

// Task 03.03. Function Overloading

// Додайте в першому рядку app.ts опцію для ESLint /* eslint-disable no-redeclare */. Ця опція необхідна для оголошення кількох сигнатур функцій з однаковими іменами

// +

// Створіть функцію getTitles(), яка може приймати 1 або 2 параметри:
// якщо функція приймає 1 параметр, він може бути або string (author), або boolean (available)
// якщо функція приймає 2 параметри, вони повинні бути id та available.
// Функція повинна повертати масив книг за автором, чи за доступністю, чи за id та доступністю.
// Для реалізації функції створіть три сигнатури з різними типами параметрів та реалізацію з рест параметром типу any[]
// або unknown[] або [string | boolean] | [number, boolean].
// Функція повинна аналізувати кількість і типи параметрів за допомогою оператора typeof і формувати результуючий масив з масиву,
// отриманого за допомогою функції getAllBooks(), аналізуючи властивості: book.author, book.available, book.id.

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
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
};
// console.log(getTitles(1, true));
// console.log(getTitles(true));
// console.log(getTitles(false));
// console.log(getTitles(2, false));
// console.log(getTitles('Lea Verou'));

// Оголосіть змінну checkedOutBooks та викличте функцію getTitles(false). Виведіть результат у консоль.

// let checkedOutBooks = getTitles(false);
// console.log(checkedOutBooks);

// Task 03.04. Assertion Functions

// Створіть функцію-ствердження assertStringValue(), яка приймає один параметр типу any.
// Функція повинна перевіряти, чи є тип переданого аргументу рядком.
// Якщо ні, то генерувати виняток "value should have been a string".

function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('value should have been a string');
    }
}

// Створіть функцію bookTitleTransform(), яка приймає один параметр – назву книжки (тип параметру any).
// За допомогою assertStringValue перевіряє, чи назва книжки дійсно є рядком,
// і якщо так, то повертає перевертень цього рядка,
// використовуючи спред оператор і методи масиву reverse() і join().

function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

// Викличте функцію bookTitleTransform() двічі і передайте їй рядкове та числове значення.

// console.log(bookTitleTransform('Learn TS'));
// console.log(bookTitleTransform(123));

// console.log('------------------------------------------------------');

// ================================================================

// 04. Interfaces

// Task 04.01. Defining an Interface

// ================================================================

// 1. Оголосіть інтерфейс Book, який включає такі поля:
// a. id - число
// b. title - рядок
// c. author - рядок
// d. available - логічний
// e. category – категорія

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void; // варіант 1 (властивість)
    // markDamaged?(reason: string): void; // варіант 2 (метод)
    markDamaged?: DamageLogger; // варіант 3
}

// 2. Внесіть зміни в функцію getAllBooks(), вкажіть тип змінної books і тип значення, що повертається,
// використовуючи оголошений вище інтерфейс Book. Додайте модифікатор readonly. Видаліть
// тимчасово id у книжки та побачите, що з'явиться помилка.

// +

// 3. Внесіть зміни в функцію getBookByID(), вкажіть тип Book['id'] для параметра id, а також вкажіть тип
// значення, що повертається, використовуючи оголошений вище інтерфейс Book. Можливо,
// доведеться додати об'єднання з типом undefined, оскільки метод find, якщо не знайде елемент,
// поверне undefined.

// +

// 4. Створіть функцію printBook(), яка на вхід приймає книгу та виводить у консоль фразу book.title + by
// + book.author. Використайте інтерфейс Book для типу параметра.

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

// 5. Оголосіть змінну myBook і надайте їй наступний об'єкт
// {
//  id: 5,
//  title: 'Colors, Backgrounds, and Gradients',
//  author: 'Eric A. Meyer',
//  available: true,
//  category: Category.CSS,
//  year: 2015,
//  copies: 3
// }

let myBook: Book = {
    // let myBook = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // markDamaged: (reason: string) => console.log(`Damaged: ${reason}`) // варіант 1
    markDamaged(reason: string) {
        console.log(`Damaged: ${reason}`); // варіант 2
    }
    // year: 2015,
    // copies: 3
};

// 6. Викличте функцію printBook() та передайте їй myBook. Жодних помилок при цьому не повинно з'являтися.

// printBook(myBook);

// 7. Додайте до інтерфейсу Book властивість pages: number. Ви отримаєте помилку у функції
// getAllBooks(). Щоб помилка не виникала, зробіть властивість необов'язковою.

// +

// 8. Вкажіть явно для змінної myBook тип Book. Ви знову отримаєте помилку. Видаліть властивості
// year, copies. Додайте властивість pages: 200.

// +

// 9. Додайте в інтерфейс Book необов'язкову властивість markDamaged, яка є методом. Метод
// приймає на вхід рядковий параметр reason і нічого не повертає. Додайте цей метод до myBook.
// Метод повинен виводити рядок `Damaged: ${reason}`. Викличте цей метод та передайте рядок
// 'missing back cover'.

// myBook.markDamaged('missing back cover');

// Task 04.02. Defining an Interface for Function Types

// 1. Оголосіть інтерфейс DamageLogger, який описуватиме тип функції, яка приймає один рядковий
// параметр і нічого не повертає.

// ?? ...який описуватиме тип функції... ??

interface DamageLogger {
    (reason: string): void;
}

// 2. Внесіть зміни до інтерфейсу Book: використовуйте оголошений інтерфейс DamageLogger для поля
// markDamaged.

// +

// 3. Оголосіть змінну logDamage, використовуючи оголошений раніше інтерфейс DamageLogger.
// Створіть функцію, яка задовольняє цьому інтерфейсу, і надайте її оголошеній змінній. Викличте
// функцію.

const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);

// logDamage('missing back cover');

// Task 04.03. Extending Interface

// 1. Оголосіть інтерфейс Person, який містить дві рядкові властивості – name і email.

interface Person {
    name: string;
    email: string;
}

// 2. Оголосіть інтерфейс Author на основі інтерфейсу Person, який розширює вказаний інтерфейс
// числовою властивістю numBooksPublished.

interface Author extends Person {
    numBooksPublished: number;
}

// 3. Оголосіть інтерфейс Librarian на основі інтерфейсу Person, який розширює цей інтерфейс двома
// властивостями:
// a. Рядкова властивість department
// b. Функція assistCustomer, яка приймає два рядкові параметри custName і bookTitle і
// нічого не повертає.

interface Librarian extends Person {
    department: string;
    // assistCustomer(custName: string, bookTitle: string): void; // v1
    assistCustomer: (custName: string, bookTitle: string) => void; // v2
}

// 4. Оголосіть змінну favoriteAuthor, використовуючи інтерфейс Author, задайте значення у вигляді
// літерала об'єкта.

const favoriteAuthor: Author = {
    name: 'Stas',
    email: 'mail@com.ua',
    numBooksPublished: 10
};

// 5. Оголосіть змінну favoriteLibrarian, використовуючи інтерфейс Librarian, задайте значення у вигляді
// літерала об'єкта

// const favoriteLibrarian: Librarian = {
//     name: 'Vika',
//     email: 'www@post.ua',
//     department: 'dep',
//     assistCustomer: null, // ?
// };

// favoriteLibrarian.department = 'Department';

// Task 04.04. Optional Chaining

// 1. Оголосіть змінну offer наступного виду:
// const offer: any = {
//  book: {
//  title: 'Essential TypeScript',
//  },
// };

const offer: any = {
    book: {
        title: 'Essential TypeScript',
    },
};

// 2. Виведіть у консоль значення таких виразів, використовуючи оператор optional chaining (?.)
// a. offer.magazine
// b. offer.magazine.getTitle()
// c. offer.book.getTitle()
// d. offer.book.authors[0]

// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle());
// console.log(offer.book.getTitle?.()); // is not a function (...undefined)
// console.log(offer.book.authors?.[0]);
// console.log(offer.book.authors?.[10]?.val);

// Task 04.05. Keyof Operator
// 1. Оголосіть тип BookProperties, який включає властивості інтерфейсу Book, використовуючи keyof
// оператор.

type BookProperties = keyof Book;
// type BookProperties = keyof Book | 'isbn';

// 2. Реалізуйте функцію getProperty(), яка приймає два параметри:
// a. книжку
// b. назву властивості з інтерфейсу Book
// і повертає значення цієї властивості з переданого об'єкта, якщо це не функція, для функції
// повертає її ім'я. Використовуйте тип any для значення, що повертається.

function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}

// 3. Викличте цю функцію тричі зі значенням другого параметра: title, markDamaged, isbn

// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn')); // error

// console.log('------------------------------------------------------');

// ================================================================
// 05. Classes
// ================================================================

// Task 05.01. Creating and Using Classes
// 1. Створіть клас ReferenceItem, який містить:
// a. Рядкову властивість title
// b. Числову властивість year
// c. Конструктор з двома параметрами: рядковий параметр newTitle, числовий параметр
// newYear, який у консоль виводить рядок 'Creating a new ReferenceItem...' та ініціалізує
// властивості.
// d. Метод printItem() без параметрів, що нічого не повертає. Цей метод повинен
// виводити рядок "title was published in year" в консоль.

// class ReferenceItem {
//     title: string;
//     year: number;
//     constructor(newTitle: string, newYear: number) {
//         console.log('Creating a new ReferenceItem...');
//         this.title = newTitle;
//         this.year = newYear;
//     };
//     printItem(): void {
//         console.log(`${this.title} was published in ${this.year}`);
//     };
// }

// 2. Оголосіть змінну ref та проініціалізуйте її об'єктом ReferenceItem. Передайте значення для
// параметрів конструктора. Викличте метод printItem().

// const ref = new ReferenceItem('Test', 2022);
// console.log(ref);
// ref.printItem();

// 3. Закоментуйте конструктор, властивості title та year та реалізуйте створення властивостей через
// параметри конструктора (title - public, year - private).

// class ReferenceItem {

//     private _publisher: string;

//     get publisher(): string {
//         return this._publisher.toUpperCase();
//     };

//     set publisher(newPublisher: string) {
//         this._publisher = newPublisher;
//     }

//     constructor(
//         // public title: string,
//         public readonly title: string,
//         private year: number
//     ) {
//         console.log('Creating a new ReferenceItem...');
//     }
//     printItem(): void {
//         console.log(`${this.title} was published in ${this.year}`);
//     };
// }

// const ref = new ReferenceItem('Java Script', 2022);
// console.log(ref);
// ref.printItem();

// 4. Створіть приватну (“soft private”) рядкову властивість _publisher.
// a. Додайте гетер publisher, який перетворює властивість _publisher у верхній регістр і
// повертає його.
// b. Додайте сеттер publisher, який приймає рядковий параметр newPublisher і встановлює
// значення властивості _publisher в значення цього параметра.
// c. Проініціалізуйте властивість ref.publisher будь-яким рядковим значенням і виведіть
// його в консоль. Результат має бути у верхньому регістрі.

// ref.publisher = 'some text'; // getter
// console.log(ref.publisher); // setter

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
        // private year: number // 5.2
        protected year: number // 5.2
    ) {
        this.#id = id;
        console.log('Creating a new ReferenceItem...');
    }
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
        console.log(Object.getPrototypeOf(this)); // приклад способу як дістатисть до прототипу
        console.log(Object.getPrototypeOf(this).constructor.department); // приклад способу як дістатисть до прототипу
    }

    getID(): number {
        return this.#id;
    };

    abstract printCitation(): void;
}

// const ref = new ReferenceItem(1, 'Java Script', 2022);
// console.log(ref);

// 5. Створіть приватну (“hard private”) числову властивість id.
// a. Внесіть зміни до конструктора для ініціалізації цієї властивості.
// b. Додайте метод getID(), який повинен повертати значення властивості id.
// c. Виведіть об'єкт у консоль.
// d. Викличте метод getID().

// console.log(ref.getID());

// 6. Створіть статичну рядкову властивість department і проініціалізуйте її будь-яким значенням за
// замовчуванням. Внесіть зміни до методу printItem() – виводьте значення цієї статичної властивості
// у консоль.

// +
// ref.printItem();

console.log('------------------------------------------------------');

// Task 05.02. Extending Classes
// 1. Створіть клас Encyclopedia як спадкоємця класу ReferenceItem. Додайте одну додаткову числову
// публічну властивість edition. Використайте параметри конструктора.

class Encyclopedia extends ReferenceItem {
    // edition: number;
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

// 2. Оголосіть змінну refBook та створіть об'єкт Encyclopedia. Викличте метод printItem();

// const refBook = new Encyclopedia(1, 'Enc.', 2022, 123);
// refBook.printItem();

// 3. Перевизначте метод printItem(). Додайте ключове слово override. Нехай він робить те, що робив
// та додатково виводить рядок у консоль «Edition: edition (year)». Ви отримаєте помилку, що
// властивість year недоступна. Щоб властивість стала доступна, змініть модифікатор доступу в класі
// ReferenceItem з private на protected.

// +

// console.log('------------------------------------------------------');

// Task 05.03. Creating Abstract Classes
// 1. Внесіть зміни до класу ReferenceItem – зробіть його абстрактним.

// +
// const refBook = new Encyclopedia(1, 'Enc.', 2022, 123);
// refBook.printCitation();

// 2. Додайте абстрактний метод printCitation(), який не приймає параметрів і не повертає значення.
// Цей метод має бути без реалізації. Після цього Ви отримаєте помилку в класі Encyclopedia, яка
// повідомлятиме, що не реалізовано абстрактний метод.

// printCitation()

// 3. Додайте реалізацію методу printCitation до класу Encyclopedia. Метод повинен виводити в
// консоль рядок "title - year".

// +

// 4. Оголосіть змінну refBook та проініціалізуйте її об'єктом Encyclopedia. Викличте метод
// printCitation();

// const refBook = new Encyclopedia('Enc.', 123);
// refBook.printItem();

// Task 05.04. Interfaces for Class Types

// 1. Створіть клас UniversityLibrarian, який реалізує інтерфейс Librarian та реалізуйте всі необхідні
// властивості. Метод assistCustomer повинен виводити в консоль рядок `${this.name} is assisting
// ${custName} with book ${bookTitle}`.

class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;
    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    }
}

// 2. Оголосіть змінну favoriteLibrarian за допомогою інтерфейсу Librarian і проініціалізуйте її за
// допомогою об'єкта, створеного класом UniversityLibrarian(). Жодних помилок при цьому не
// повинно виникати. Проініціалізуйте властивість name та викличте метод assistCustomer().

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris', 'Learn TS');

// console.log('------------------------------------------------------');

// Task 05.05. Intersection and Union Types
// 1. Створіть тип PersonBook. Використовуйте для цього інтерфейси Person, Book та перетин типів.

type PersonBook = Person & Book; // перетин

// 2. Оголосіть змінну з типом PersonBook, проініціалізуйте її літералом, виведіть її в консоль.

const personBook: PersonBook = {
    name: 'Anna',
    author: 'Anna',
    available: false,
    category: Category.Angular,
    email: 'stas@gmail.com',
    id: 13,
    title: 'Test title'
};

console.log(personBook);

// 3. Створіть тип BookOrUndefined. Використовуйте для цього об'єднання інтерфейсу Book та
// undefined.

type BookOrUndefined = Book | undefined; // об'єднання

// 4. Замініть тип значення, що повертається у функції getBookByID() на BookOrUndefined.

// + BookOrUndefined

// 5. Створіть функцію setDefaultConfig(), яка приймає об'єкт options. Тип для об'єкта TOptions опишіть
// інтерфейсом з необов'язковими числовими властивостями duration і speed. Функція повинна
// встановлювати значення властивостей за замовчуванням та деякі значення, якщо вони не задані,
// використовуючи логічний оператор налового присвоєння та повертати об'єкт.

interface TOptions {
    duration?: number;
    speed?: number;
}

function setDefaultConfig(options: TOptions) {
    options.duration ??= 100;
    options.speed ??= 60;
    return options;
}

console.log('------------------------------------------------------');

