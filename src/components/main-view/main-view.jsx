import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([
    { 
    id: 1, 
    Title: 'Kings of the Road',
    Description: 'KINGS OF THE ROAD is about a friendship between two men: Bruno, aka “King of the Road” (Rüdiger Vogler), who repairs film projectors and travels along the inner-German border in his truck, and the psychologist Robert, aka “Kamikaze” (Hanns Zischler), who is fleeing from his own past.',
    Director: {
      firstName: 'Wim',
      lastName: 'Wenders',
      Bio: 'Wim Wenders (b. 1945) is a film director, writer, and photographer. He is a professor of film at The European Graduate School / EGS and Professor für Narrativen Film at the Hochschule für bildende Künste Hamburg.',
      dateOfBirth: 1923
    },
    Year: 1976,
    Genres: [
      {
        Name: 'Road-Movie',
        Description: 'A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives.'
      }
    ],
    ImagePath: 'https://www.themoviedb.org/t/p/w1280/x2WvLtMJZ6OPz3GEhbEE1V29Pis.jpg'
    },
    { 
    id: 2,
    Title: 'Radio On',
    Description: 'In 1970s Britain, a man drives from London to Bristol to investigate his brothers death, and the purpose of his trip is offset by his encounters with a series of odd people.',
    Director: {
      firstName: 'Chris',
      lastName: 'Petit',
      Bio: "Chris Petit is an English novelist and filmmaker. During the 1970's he was the film editor for Time Out and wrote for Melody Maker.",
      dateOfBirth: 1947
    },
    Year: 1979,
    Genres: [
      {
        Name: 'Road-Movie',
        Description: 'A road movie is a film genre in which the main characters leave home on a road trip, typically altering the perspective from their everyday lives.'
      }
    ],
    ImagePath: 'https://www.themoviedb.org/t/p/w1280/jaKTAV3wuHRklubTFVPNgPOGeIs.jpg'
     },
    { 
    id: 3, 
    Title: 'Vagabond',
    Description: "A young woman's body is found frozen in a ditch. Through flashbacks and interviews, we see the events that led to her inevitable death.",
    Director: {
      firstName: 'Agnes',
      lastName: 'Varda',
      Bio: 'Agnes Varda was a Belgian-born French film director, screenwriter, photographer, and artist. Her pioneering work was central to the development of the widely influential French New Wave film movement of the 1950s and 1960s.',
      dateOfBirth: 1893,
      dateOfDeath: 1987
    },
    Year: 1985,
    Genres: [
      {
        Name: 'Drama',
        Description: 'Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience.'
      }
    ],
    ImagePath: 'https://www.themoviedb.org/t/p/w1280/2KFfwiPct1hwqi9dkKqoom0BenC.jpg'
     },
    { 
    id: 4, 
    Title: 'Leningrad Cowboys Go America',
    Description: 'Siberian rock band Leningrad Cowboys go to the USA in pursuit of fame.',
    Director: {
      firstName: 'Aki',
      lastName: 'Kaurismäki',
      Bio: "Aki Kaurismäki is a Finnish film director and screenwriter. He has been described as Finland's best known film director.",
      dateOfBirth: 1957
    },
    Year: 1989,
    Genres: [
      {
        Name: 'Comedy',
        Description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through the amusement.'
      }
    ],
    ImagePath: 'https://www.themoviedb.org/t/p/w1280/6lJj3w5ebOkrsNx6sJXyNuWDJIB.jpg' 
    },
    { 
    id: 5, 
    Title: 'Locke',
    Description: 'Ivan Locke, a dedicated family man and successful construction manager, receives a phone call on the eve of the biggest challenge of his career that sets in motion a series of events that threaten his carefully cultivated existence.',
    Director: {
      firstName: 'Steven',
      lastName: 'Knight',
      Bio: 'Steven Knight is a British screenwriter and film director. He is best known for screenplays he wrote for the films Dirty Pretty Things (2002) and Eastern Promises (2007), and also directed as well as written the film Locke (2013).',
      dateOfBirth: 1946
    },
    Year: 2013,
    Genres: [
      {
        Name: 'Drama',
        Description: 'Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience.'
      }
    ],
    ImagePath: 'https://www.themoviedb.org/t/p/w1280/mZTMFDk5VRQuvkJaCFFAXFV65G6.jpg'
    }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
      }
    
      return (
        <div>
                {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
        </div>
      );
    };