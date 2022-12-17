// TypeScript In-Depth

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ================================================================

// 02. Types Basics

// 2.1

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
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: false, category: Category.JavaScript }
    ];
    return books;
}

console.log(getAllBooks());


function logFirstAvailable(books: readonly Book[]): void { // ## + readonly!!!
    console.log(`Number of books: ${books.length}`);
    const title = books.find(({ available }) => available === true)?.title;// деструктуризація + ?
    console.log(`First available book: ${title}`);
}

logFirstAvailable(getAllBooks());

function getBookTitlesCategory(inputCategory: Category): string[] {
    const books = getAllBooks();
    return books.filter(({ category }) => category === inputCategory).map(({ title }) => title);
}

function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

logBookTitles(getBookTitlesCategory(Category.CSS));

function getBooksAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

console.log(getBooksAuthorByIndex(0));

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

console.log('----------------------------------------');
calcTotalPages();


