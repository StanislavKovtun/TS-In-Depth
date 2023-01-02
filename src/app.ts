// TypeScript In-Depth

import { ReferenceItem, UL, RefBook, Library, Shelf } from './classes';
import { Category } from './enums';
import { Author, Book, Librarian, Logger, Magazine } from './interfaces';
import { BookRequiredFields, PersonBook, UpdatedBook, СreateCustomerFunctionType } from './types';
// import RefBook from './classes/encyclopedia';
import {
    printRefBook, calcTotalPages, getAllBooks,
    getBooksAuthorByIndex, getBookTitlesByCategory, purge, getObjectProperty, createCustomer
} from './functions';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ================================================================

// 02. Types Basics
// console.log(getAllBooks());
// logFirstAvailable(getAllBooks());
// calcTotalPages();

// 03. Functions
// Task 03.01. Function Type

// Створіть функцію createCustomerID(), яка приймає ім'я клієнта (name: string) та його ідентифікатор (id: number)
// та повертає конкатенацію цих значень у вигляді рядка.
// Об’явіть змінну myID рядкового типу та викличте функцію зі значеннями Ann, 10. Отримане значення виведіть у консоль.

// let myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// Об’явіть змінну idGenerator і вкажіть тип функції createCustomerID().
// Надайте цій змінній функціональний вираз, використовуючи стрілочну функцію.
// Тіло подібне до функції createCustomerID().
// Надайте змінній idGenerator функцію createCustomerID() та викличте її.
// Отримане значення виведіть у консоль.

// let idGenerator: (name: string, id: number) => string; // 1й спосіб задання функціонального типу
// let idGenerator: typeof createCustomerID; // 2й спосіб задання функціонального типу
// idGenerator = (name: string, id: number) => `${name} ${id}`;
// idGenerator = createCustomerID;

// // const a = typeof createCustomerID;
// console.log(idGenerator('Boris', 20));

// Task 03.02. Optional, Default and Rest Parameters

// Створіть функцію createCustomer(), яка приймає три параметри:
// name: string – обов'язковий
// age: number – необов'язковий
// city: string – необов'язковий
// Функція повинна виводити ім'я клієнта в консоль, а також, якщо заданий вік, вона повинна додатково виводити вік у консоль.
// Якщо задане місто, то додатково має виводити місто у консоль. Викличте цю функцію з одним, двома та трьома аргументами.

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

// console.log(getBookByID(1));

// Створіть функцію сheckoutBooks(), яка приймає два параметри:
// customer: string
// bookIDs: number[] – змінне значення ідентифікаторів книжок (рест параметр)
// Функція повинна перевірити доступність кожної книжки, заданої ідентифікатором, та повернути масив найменувань (title) книжок,
// які є доступними. (available = true). Використовуйте функцію getBookById().
// Також функція повинна виводити в консоль ім'я заданого клієнта.


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

// Викличте функцію bookTitleTransform() двічі і передайте їй рядкове та числове значення.

// console.log(bookTitleTransform('Learn TS'));
// console.log(bookTitleTransform(123));

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

// 2. Внесіть зміни до інтерфейсу Book: використовуйте оголошений інтерфейс DamageLogger для поля
// markDamaged.

// +

// 3. Оголосіть змінну logDamage, використовуючи оголошений раніше інтерфейс DamageLogger.
// Створіть функцію, яка задовольняє цьому інтерфейсу, і надайте її оголошеній змінній. Викличте
// функцію.

// onst logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);

// logDamage('missing back cover');

// Task 04.03. Extending Interface

// 1. Оголосіть інтерфейс Person, який містить дві рядкові властивості – name і email.

// 2. Оголосіть інтерфейс Author на основі інтерфейсу Person, який розширює вказаний інтерфейс
// числовою властивістю numBooksPublished.

// 3. Оголосіть інтерфейс Librarian на основі інтерфейсу Person, який розширює цей інтерфейс двома
// властивостями:
// a. Рядкова властивість department
// b. Функція assistCustomer, яка приймає два рядкові параметри custName і bookTitle і
// нічого не повертає.

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

// type BookProperties = keyof Book | 'isbn';

// 2. Реалізуйте функцію getProperty(), яка приймає два параметри:
// a. книжку
// b. назву властивості з інтерфейсу Book
// і повертає значення цієї властивості з переданого об'єкта, якщо це не функція, для функції
// повертає її ім'я. Використовуйте тип any для значення, що повертається.


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

// 2. Оголосіть змінну ref та проініціалізуйте її об'єктом ReferenceItem. Передайте значення для
// параметрів конструктора. Викличте метод printItem().

// const ref = new ReferenceItem('Test', 2022);
// console.log(ref);
// ref.printItem();

// 3. Закоментуйте конструктор, властивості title та year та реалізуйте створення властивостей через
// параметри конструктора (title - public, year - private).

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

// Task 05.02. Extending Classes
// 1. Створіть клас Encyclopedia як спадкоємця класу ReferenceItem. Додайте одну додаткову числову
// публічну властивість edition. Використайте параметри конструктора.

// 2. Оголосіть змінну refBook та створіть об'єкт Encyclopedia. Викличте метод printItem();

// const refBook: Encyclopedia = new Encyclopedia(1, 'Enc.', 2022, 123);
// const refBook: RefBook = new RefBook(1, 'Enc.', 2022, 123);
// refBook.printItem();

// 3. Перевизначте метод printItem(). Додайте ключове слово override. Нехай він робить те, що робив
// та додатково виводить рядок у консоль «Edition: edition (year)». Ви отримаєте помилку, що
// властивість year недоступна. Щоб властивість стала доступна, змініть модифікатор доступу в класі
// ReferenceItem з private на protected.

// +

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

// 2. Оголосіть змінну favoriteLibrarian за допомогою інтерфейсу Librarian і проініціалізуйте її за
// допомогою об'єкта, створеного класом UniversityLibrarian(). Жодних помилок при цьому не
// повинно виникати. Проініціалізуйте властивість name та викличте метод assistCustomer().

// const favoriteLibrarian1: Librarian = new UL.UniversityLibrarian();

// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn TS');

// Task 05.05. Intersection and Union Types
// 1. Створіть тип PersonBook. Використовуйте для цього інтерфейси Person, Book та перетин типів.

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

// console.log(personBook);

// 3. Створіть тип BookOrUndefined. Використовуйте для цього об'єднання інтерфейсу Book та
// undefined.

// 4. Замініть тип значення, що повертається у функції getBookByID() на BookOrUndefined.

// + BookOrUndefined

// 5. Створіть функцію setDefaultConfig(), яка приймає об'єкт options. Тип для об'єкта TOptions опишіть
// інтерфейсом з необов'язковими числовими властивостями duration і speed. Функція повинна
// встановлювати значення властивостей за замовчуванням та деякі значення, якщо вони не задані,
// використовуючи логічний оператор налового присвоєння та повертати об'єкт.

// console.log('------------------------------------------------------');

// 06. Modules and Namespaces

// Task 06.01. Using Namespaces
// 1. Створіть папку для нового проекту NamespaceDemo
// 2. Створіть файл utility-functions.ts
// 3. Створіть простір імен Utility
// 4. Створіть та експортуйте вкладений простір імен Fees
// 5. Створіть та експортуйте функцію calculateLateFee() у вкладеному просторі імен, яка приймає
// числовий параметр daysLate та повертає fee, обчислене як daysLate * 0.25;
// 6. Створіть та експортуйте функцію maxBooksAllowed() у просторі імен Utility, яка приймає один
// числовий параметр age. Якщо age < 12, то повертає 3 або 10.
// 7. Створіть функцію privateFunc(), яка виводить у консоль повідомлення «This is a private function»
// 8. Створіть файл app.ts. Додайте посилання на файл utility-functions.ts
// 9. Напишіть фрагмент коду, який використовує функції із простору імен.
// 10. Використайте ключове слово import та оголосіть аліас util для вкладеного простору імен.
// import util = Utility.Fees;
// 11. Запустіть компілятор та скомпілюйте лише tsc app.ts --target ES5. Створіть index.html
// Скористайтеся наступним фрагментом HTML:
// <html>
//  <head></head>
//  <body>
//  <script src="utility-functions.js"></script>
//  <script src="app.js"></script>
//  </body>
// </html>
// 12. Запустіть компілятор ще раз і вкажіть опцію --outFile bundle.js
// 13. Підключіть отриманий файл до index.html
// +

// Task 06.02. Export and Import
// 1. Створіть файл enums.ts, перенесіть до нього enum Category. Додайте експорт в кінці файлу.
// 2. Створіть файл interfaces.ts та
// a. перенесіть до нього інтерфейси: Book, DamageLogger, Person, Author, Librarian
// b. додайте імпорт Category
// c. додайте експорт інтерфейсів Book, DamageLogger, Person, Author, Librarian, TOptions в
// кінці файлу. Експортуйте DamageLogger під назвою Logger
// 3. Створіть новий файл classes.ts та перенесіть до нього класи: UniversityLibrarian, ReferenceItem.
// a. Додайте імпорт інтерфейсів як цілого модуля з ім'ям Interfaces
// b. Змініть опис класу UniversityLibrarian, щоб він реалізовував інтерфейс
// Interfaces.Librarian
// c. Додайте експорт в кінці файлу та експортуйте обидва класи.
// 4. Створіть файл types.ts і перенесіть у нього типи: BookProperties, PersonBook, BookOrUndefined.
// a. Додайте імпорт інтерфейсів Book та Person
// b. Експортуйте типи із модуля.
// 5. Створіть файл functions.ts та перенесіть усі функції.
// a. Додайте імпорт інтерфейсу Book, enum Category, типів BookProperties,
// BookOrUndefined
// b. Додайте експорт всіх функцій (не обов'язково)
// 6. Внесіть зміни до файлу app.ts
// a. Додайте імпорт категорій, інтерфейсів Book, Logger, Author, Librarian, класів
// UniversityLibrarian, ReferenceItem, типу PersonBook та всіх функцій.
// b. Змініть тип змінної logDamage на Logger (Task 04.02)
// +

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

const refBook: RefBook = new RefBook(1, 'Enc.', 2022, 123);
// printRefBook(refBook);

// 7. Створіть екземпляр класу UniversityLibrarian та знову викличте для нього функцію printRefBook

const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);

// Task 06.04. Re-Export
// 1. Створіть папку classes і перемістіть файл encyclopedia.ts до неї.
// 2. Рознесіть класи UniversityLibrarian і ReferenceItem по різних файлах і перемістіть в папку classes.
// 3. Видаліть файл classes.ts
// 4. Створіть файл classes/index.ts і додайте до нього реекспорт класів Encyclopedia, ReferenceItem,
// використовуючи конструкцію export *, export { default as …} відповідно, а також додайте
// реекспорт класу UniversityLibrarian, використовуючи конструкцію export * as UL.
// 5. Виправте імпорти у файлі app.ts
// 6. Виправте створення екземпляра класу UniversityLibrarian у завданні Task 05.04. та Task 06.03
// +

// Task 06.05. Dynamic Import Expression
// 1. Створіть у папці classes файл reader.ts та реалізуйте клас Reader, який містить такі властивості:
// a. name: string;
// b. books: Book[] = [];
// c. take(book: Book): void - метод додає книжку до масиву книжок.
// 2. Внесіть зміни до файлу classes/index.ts, додайте новий модуль.
// 3. Реалізуйте вираз динамічного імпорту за допомогою виразу top level await/Promise для
// завантаження всього з шляху './classes' як модуля. Завантаження реалізувати за умови, якщо
// деяка змінна набуває значення true.

// // const flag = true;
// const flag = false;

// if (flag) {
//    import('./classes')
//        .then(o => {
//            const reader = new o.Reader();
//            reader.name = 'Anna';
//            reader.take(getAllBooks()[0]);
//            console.log(reader);
//        })
//        .catch(err => console.log(err))
//        .finally(() => console.log('Complete!'));
// }

// const flag = true;

// if (flag) {
//    const o = await import('./classes');
//    const reader = new o.Reader();
//    reader.name = 'Anna';
//    reader.take(getAllBooks()[0]);
//    console.log(reader);
// }

// 4. Додайте до webpack.config.js об'єкт
// experiments: {
//  topLevelAwait: true
//  }
// +

// 5. Створіть екземпляр класу Reader. Виведіть його в консоль.
// +

// Task 06.06. Type-Only Imports and Exports
// 1. Створіть у папці classes файл library.ts та реалізуйте клас Library, який містить такі властивості:
// a. Id: number
// b. name: string
// c. address: string
// 2. Внесіть зміни до файлу classes/index.ts. Експортуйте тип Library. Використовуйте конструкцію
// export type {…}
// 3. Імпортуйте Library в app.ts. Оголосіть змінну за допомогою Library.

// let library: Library = {
//    id: 1,
//    address: '',
//    name: 'Anna'
// };

// let library: Library = new Library();

// 4. Створіть екземпляр класу Library. Ви повинні отримати помилку. Закоментуйте рядок.
// +
// 5. Оголосіть змінну, вкажіть тип Library. Проініціалізуйте літералом, виведіть у консоль.
// console.log(library);

// 07. Generics
// Task 07.01. Generic Functions
// 1. Створіть у файлі functions.ts дженерик (загальну) функцію purge(), яка приймає один параметр –
// дженерик масив inventory та повертає дженерик масив того ж типу, що містить елементи
// початкового масиву без двох перших елементів. Експортуйте цю функцію.
// 2. Імпортуйте цю функцію у програму.
// 3. Додайте категорію Software у файл enums.ts.
// 4. Оголосіть змінну inventory, що містить наступний масив книг
// [
// { id: 10, title: 'The C Programming Language';
// { id: 11, title: 'Code Complete', author: 'Steve McConnell', можливий: true, category:
// Category.Software },
// { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true,
// категорії: Category.Software },
// { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true,
// категорії: Category.Software }
// ];
const inventory = [
    {
        id: 10, title: 'The C Programming Language', author: 'Steve McConnell', available: true, category:
            Category.Software
    },
    {
        id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category:
            Category.Software
    },
    {
        id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true,
        category: Category.Software
    },
    {
        id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true,
        category: Category.Software
    }
];

// 5. Викличте функцію purge() та передайте їй ці дані. Виведіть результат у консоль.

// const result1 = purge<Book>(inventory);
// console.log(result1);
// const result2 = purge(inventory);
// console.log(result2);

// 6. Викличте цю функцію, але з числовим масивом і знову виведіть результат у консоль.

const result3 = purge<number>([1, 2, 3]);
// console.log(result3);

// Task 07.02. Generic Interfaces and Classes
// 1. Створіть інтерфейс Magazine, який містить дві рядкові властивості, title, publisher та додайте його
// у файл interfaces.ts. Експортуйте цей інтерфейс.
// +
// 2. Створіть файл classes/shelf.ts і, використовуючи експорт за замовчуванням, реалізуйте дженерик
// клас Shelf:
// a. додайте приватну властивість items, яка є масивом елементів типу Т.
// b. додайте метод add(), який приймає один параметр item типу T і додає його в масив.
// Нічого не повертає.
// c. додайте метод getFirst(), який нічого не приймає, і повертає перший елемент із items.
// +
// 3. Додайте реекспорт у файл classes/index.ts
// 4. Імпортуйте цей клас і інтерфейс Magazine в app.ts.
// 5. Закоментуйте код, який відноситься до функції purge(), крім змінної inventory
// 6. Створіть полку bookShelf і збережіть усі книжки з inventory на полку. Отримайте першу книжку і
// виведіть її назву в консоль.

// const bookShelf: Shelf<Book> = new Shelf<Book>();
const bookShelf = new Shelf<Book>();
inventory.forEach(book => bookShelf.add(book));
// console.log(bookShelf.getFirst().title);

// 7. Об'явіть змінну magazines, яка містить наступні дані:
// [
// { title: 'Programming Language Monthly', видавець: 'Code Mags' },
// { title: 'Literary Fiction Quarterly', видавець: 'College Press' },
// { title: 'Five Points', видавець: 'GSU' }
// ];

const magazines: Magazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];

// 8. Створіть полку magazineShelf і помістіть усі ці журнали на полку. Отримайте перший журнал і
// виведіть його в консоль.

const magazineShelf = new Shelf<Magazine>();
magazines.forEach(magazine => magazineShelf.add(magazine));
// console.log(magazineShelf.getFirst().title);


// Task 07.03. Generic Constraints
// 1. Внесіть зміни в клас Shelf:
// a. додайте метод find(), який приймає рядковий параметр title і повертає перший
// знайдений елемент на полці типу Т.
// +
// b. додайте метод printTitles(), який виводить у консоль назву того, що знаходиться на
// полці.
// Після додавання цих методів ви повинні отримати помилку, оскільки властивість title не існує.
// +
// 2. У файлі interfaces.ts створіть інтерфейс ShelfItem, який повинен містити всі необхідні властивості,
// які повинен мати тип T, а саме title.
// +

// 3. Додайте дженерик обмеження для класу, розширив тип T.
// +

// 4. Викличте метод printTitles() для журналів.
// magazineShelf.printTitles();

// 5. Знайдіть журнал 'Five Points' і виведіть його в консоль.
// console.log(magazineShelf.find('Five Points'));

// 6. Створіть функцію getObjectProperty(). Додайте два параметра типу TObject, TKey. Додайте
// обмеження на другий параметр, щоб значення були тільки ключами об’єкта типу TObject,
// використовуючи оператор keyof. Для значення, яке повертається, вкажіть тип TObject[TKey] |
// string. Тіло функції аналогічне тілу функції getProperty(). Викличте цю функцію.

// console.log(getObjectProperty(magazines[0], 'publisher'));
// console.log(getObjectProperty(magazines[0], 'title'));
// console.log(getObjectProperty(inventory[1], 'category'));

// Task 07.04. Utility Types
// 1. Оголосіть аліас типу BookRequiredFields у файлі types.ts, використовуючи інтерфейс Book та
// утиліту Required.
// +
// 2. Оголосіть змінну типу BookRequiredFields та надайте їй відповідний об'єкт.
const bookRequiredFields: BookRequiredFields = {
    author: 'Anna',
    available: false,
    category: Category.Angular,
    id: 1,
    markDamaged: null,
    pages: 200,
    title: 'Learn Angular'
};

// 3. Оголосіть аліас типу UpdatedBook, використовуючи інтерфейс Book та утиліту Partial
// +
// 4. Оголосіть змінну updatedBook і надайте їй відповідний об'єкт.
const updatedBook: UpdatedBook = {
    id: 1,
    pages: 300
};
// 5. Оголосіть аліас типу AuthorWoEmail, використовуючи інтерфейс Author та утиліту Omit.
// +
// 6. Оголосіть аліас СreateCustomerFunctionType для функціонального типу функції createCustomer.
// +
// 7. Оголосіть змінну, використовуючи аліас типу СreateCustomerFunctionType і утиліту Parameters,
// викличте функцію createCustomer, передавши цю змінну.

let params: Parameters<СreateCustomerFunctionType>;
params = ['Anna', 30, 'Sumy'];
// createCustomer(...params); // спред оператор

// Task 07.05. Mapped Types, Utility Types, Conditional Types
// 1. Оголосіть у файлі types.ts аліас fn для функціонального типу функції, яка приймає три параметри з
// типами string, number, boolean і повертає тип symbol.
// +
// 2. Оголосіть аліаси типів Param1<T>, Param2<T>, Param3<T>, які повертають тип першого, другого та
// третього параметрів функції відповідно.
// +
// 3. Оголосіть аліаси P1, P2, P3 та отримайте типи першого, другого та третього параметрів типу fn.
// +

// Автор: Olena_Hlukhovska@epam.com
// 4. Створіть утиліти RequiredProps<T> та OptionalProps<T> у файлі types.ts, які повертають union тип
// required та optional властивостей об'єкта. Використовуйте mapped type для перебору ключів T та
// conditional type для трансформації значень ключів типу T. Додайте дженерик обмеження для T
// розширивши тип object у RequiredProps та OptionalProps.
// +
// 5. Оголосіть аліас типу BookRequiredProps та BookOptionalProps, використовуючи інтерфейс Book та
// утиліти RequiredProps та OptionalProps. Спробуйте замість Book передати примітивний тип.
// +
// 6. Створіть утиліту RemoveProps <T extends object, TProps extends keyof T>, яка видаляє властивості
// TProps з переданого типу T.
// +
// 7. Оголосіть аліас типу BookRequiredPropsType та BookOptionalPropsType, використовуючи
// інтерфейс Book, аліаси типу BookRequiredProps та BookOptioalProps та утиліту RemoveProps
// Спробуйте замість Book передати Author.
// +

console.log('------------------------------------------------------');

