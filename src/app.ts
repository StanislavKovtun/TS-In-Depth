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

type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

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

function getBookByID(id: number): Book {
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




