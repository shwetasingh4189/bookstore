//import {BOOKLIST} from './data-db'


const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3090;

const BOOKLIST = [
  {
        id: 1,
        title: 'Pride and Prejudice',
        description: `Since its immediate success in 1813,Pride and Prejudice has remained one of the most popular novels in the English language`,
        author: 'Jane Austen',
        genre: 'Romantic',
        sold: 5000,
        dateOfPublication: new Date('10/10/2000'),
        iconUrl:'https://blog.timesunion.com/localarts/files/2017/02/pride-and-prejudice-1.jpg',
        language: 'English',
        country: 'United Kingdom',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
   {
        id: 2,
        title: 'Crime and Punishment',
        description: 'Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse',
        author: 'Fyodor D',
        genre: ' Philosophical fiction',
        sold: 3000,
        dateOfPublication: new Date('12/31/2002'),
        iconUrl:'https://imgv2-1-f.scribdassets.com/img/word_document/342870203/original/0f5318de2d/1571483150?v=1',
        language: 'Dutch',
        country: 'The Netherlands',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
   {
        id: 3,
        title: 'Hamlet',
        description: 'Among Shakespeares plays.Hamlet is considered by many his masterpiece.',
        author: 'William Shakespeare',
        genre: 'Literature',
        sold: 5,
        dateOfPublication: new Date('08/01/2005'),
        iconUrl:'https://ccsbooks.co.uk/wp-content/uploads/2019/10/9781910619704-scaled.jpg',
        language: 'English',
        country: 'United Kingdom',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
   {
        id: 4,
        title: 'Loving God with All Your Mind',
        description: 'Elizabeth lets women know that loving the Lord involves action! ',
        author: 'Elizabeth George',
        genre: 'Christian Living',
        sold: 5,
        dateOfPublication: new Date('01/01/2005'),
        iconUrl:'https://d2y24eux71xwor.cloudfront.net/Images/Production/Content/SeriesBanner/981.jpg',
        language: 'English',
        country: 'United Kingdom',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
  {
        id: 5,
        title: 'Something to Hide',
        description: 'Detective Sergeant Barbara Havers and Detective Inspector Thomas Lynley are back in the next Lynley novel from #1 New York Times bestselling author Elizabeth George.',
        author: 'Elizabeth George',
        genre: 'Mystery',
        sold: 5,
        dateOfPublication: new Date('01/01/2006'),
        iconUrl:'https://pictures.abebooks.com/isbn/9780340767108-us.jpg',
        language: 'English',
        country: 'United Kingdom',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
  {
        id: 6,
        title: 'The Picture of Dorian Gray',
        description: 'In a London studio, two men contemplate the portrait of another—younger and more beautiful—man.',
        author: 'Oscar Wilde',
        genre: 'Horror',
        sold: 5,
        dateOfPublication: new Date('01/31/2002'),
        iconUrl:'https://3.bp.blogspot.com/-d-OLHe9Atqk/UGsdof7T9eI/AAAAAAAAAMA/J1UzHOZtqvs/s1600/ThePictureofDorianGray.jpg',
        language: 'English',
        country: 'United Kingdom',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
  {
        id: 7,
        title: 'Harry Starke',
        description: 'For an ex-cop turned private investigator, I’ve carved out a pretty nice life for myself.',
        author: 'Blair Howard',
        genre: 'Mystery',
        sold: 5,
        dateOfPublication: new Date('01/31/1986'),
        iconUrl:'https://images-na.ssl-images-amazon.com/images/I/519%2BetXtT2L._SY346_.jpg',
        language: 'German',
        country: 'Germany',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    },
   {
        id:8,
        title: 'The Break Line',
        description: 'British intelligence operative and hardened assassin, Max McLean, battles a nightmarish enemy in this stunning debut thriller from an award winning war correspondent.',
        author: 'James Brabazon',
        genre: 'Thriller',
        sold: 5,
        dateOfPublication: new Date('01/31/1988'),
        iconUrl:'https://culturefly.co.uk/wp-content/uploads/2018/07/the-break-line.jpg',
        language: 'French',
        country: 'France',
        mediaType: 'Print',
        publisher: 'T. Egerton, Whitehall',
        rating: 4
    }
  ];
app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/bookstore/dist/bookstore/"));

app.get('/api/books', (req, res) => {
  res.status(200).json({payload:Object.values(BOOKLIST)});
});

app.get('/api/books/'+`:id`, (req, res) => {
  const bookId = req.params["id"];

  const books = Object.values(BOOKLIST);

  const book = books.find(book => book.id == bookId);

  res.status(200).json(book);
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/bookstore/dist/bookstore/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
