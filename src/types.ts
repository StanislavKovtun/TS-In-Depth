import { createCustomer } from './functions';
import { Author, Book, Person } from './interfaces';

// export type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

export type BookProperties = keyof Book;
export type PersonBook = Person & Book; // перетин
export type BookOrUndefined = Book | undefined; // об'єднання
export type BookRequiredFields = Required<Book>;
export type UpdatedBook = Partial<Book>;
export type AuthorWoEmail = Omit<Author, 'email'>;
export type СreateCustomerFunctionType = typeof createCustomer;
export type fn = (a: string, b: number, c: boolean) => symbol;
export type Param1<T> = T extends (a: infer R, b: number, c: boolean) => symbol ? R : never;
export type Param2<T> = T extends (a: string, b: infer R, c: boolean) => symbol ? R : never;
export type Param3<T> = T extends (a: string, b: number, c: infer R) => symbol ? R : never;

export type P1 = Param1<fn>;
export type P2 = Param2<fn>;
export type P3 = Param3<fn>;

// export type RequiredProps<T extends object> = {
//    [prop in keyof T]: {} extends Pick<T, prop> ? never : prop
// };

export type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? never : prop
}[keyof T];

export type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? prop : never
}[keyof T];

type BookRequiredProps = RequiredProps<Book>;
type BookOptionalProps = OptionalProps<Book>;

export type RemoveProps<T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

export type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
export type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;

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

