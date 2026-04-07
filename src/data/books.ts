export interface AvailableBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

export const availableBooks: AvailableBook[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://picsum.photos/id/101/150/200',
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://picsum.photos/id/102/150/200',
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://picsum.photos/id/103/150/200',
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://picsum.photos/id/104/150/200',
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    coverImage: 'https://picsum.photos/id/105/150/200',
  },
  {
    id: '6',
    title: 'Moby Dick',
    author: 'Herman Melville',
    coverImage: 'https://picsum.photos/id/106/150/200',
  },
];