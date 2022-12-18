// Task 06.06. Type-Only Imports and Exports
// 1. Створіть у папці classes файл library.ts та реалізуйте клас Library, який містить такі властивості:
// a. Id: number
// b. name: string
// c. address: string
// 2. Внесіть зміни до файлу classes/index.ts. Експортуйте тип Library. Використовуйте конструкцію
// export type {…}
// 3. Імпортуйте Library в app.ts. Оголосіть змінну за допомогою Library.
// 4. Створіть екземпляр класу Library. Ви повинні отримати помилку. Закоментуйте рядок.
// 5. Оголосіть змінну, вкажіть тип Library. Проініціалізуйте літералом, виведіть у консоль.

export class Library {
    id: number;
    name: string;
    address: string;
}