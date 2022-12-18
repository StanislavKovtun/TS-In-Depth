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

namespace Utility {
    export namespace Fees {
        export function calculateLateFee(daysLate: number) {
            return daysLate * 0.25;
        }
    }

    export function maxBooksAllowed(age: number): number {
        return age < 12 ? 3 : 10;
    }

    function privateFunc(): void {
        console.log('this is a private function');
    }
}
