// Task 06.05. Dynamic Import Expression
// 1. Створіть у папці classes файл reader.ts та реалізуйте клас Reader, який містить такі властивості:
// a. name: string;
// b. books: Book[] = [];
// c. take(book: Book): void - метод додає книжку до масиву книжок.
// 2. Внесіть зміни до файлу classes/index.ts, додайте новий модуль.
// 3. Реалізуйте вираз динамічного імпорту за допомогою виразу top level await/Promise для
// завантаження всього з шляху './classes' як модуля. Завантаження реалізувати за умови, якщо
// деяка змінна набуває значення true.
// 4. Додайте до webpack.config.js об'єкт
// experiments: {
//  topLevelAwait: true
//  }
// 5. Створіть екземпляр класу Reader. Виведіть його в консоль.

import { Book } from '../interfaces';

export class Reader {
    name: string;
    books: Book[] = [];
    take(book: Book): void {
        this.books.push(book);
    }
}