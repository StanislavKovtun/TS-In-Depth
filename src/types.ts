import { Book, Person } from './interfaces';

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