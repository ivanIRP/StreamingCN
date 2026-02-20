-- Base de Datos: MoviesDB
-- Para importar en phpMyAdmin

CREATE DATABASE IF NOT EXISTS `MoviesDB` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `MoviesDB`;

-- Tabla Peliculas
CREATE TABLE `Peliculas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(200) NOT NULL,
  `Sinopsis` text NOT NULL,
  `Categoria` varchar(100) NOT NULL,
  `Anio` int(11) NOT NULL,
  `LinkPelicula` varchar(500) DEFAULT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar 10 películas
INSERT INTO `Peliculas` (`Id`, `Nombre`, `Sinopsis`, `Categoria`, `Anio`, `LinkPelicula`, `FechaRegistro`) VALUES
(1, 'El Padrino', 'La historia de la familia Corleone bajo el mando de Vito Corleone. Un clásico del cine sobre el poder, la familia y la mafia italiana en Nueva York.', 'Drama', 1972, 'https://www.imdb.com/title/tt0068646/', NOW()),
(2, 'Inception', 'Un ladrón que roba secretos del subconsciente durante el sueño recibe la tarea inversa de plantar una idea en la mente de un CEO.', 'Ciencia Ficción', 2010, 'https://www.imdb.com/title/tt1375666/', NOW()),
(3, 'Pulp Fiction', 'Historias entrelazadas de crimen, violencia y redención en Los Ángeles. Una obra maestra de Quentin Tarantino.', 'Crimen', 1994, 'https://www.imdb.com/title/tt0110912/', NOW()),
(4, 'Interestelar', 'Un grupo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.', 'Ciencia Ficción', 2014, 'https://www.imdb.com/title/tt0816692/', NOW()),
(5, 'The Dark Knight', 'Batman debe enfrentarse al Joker, un criminal psicópata que busca sumir a Gotham City en el caos absoluto.', 'Acción', 2008, 'https://www.imdb.com/title/tt0468569/', NOW()),
(6, 'Forrest Gump', 'La vida extraordinaria de Forrest Gump, un hombre con un coeficiente intelectual bajo pero con un gran corazón que vive momentos históricos.', 'Drama', 1994, 'https://www.imdb.com/title/tt0109830/', NOW()),
(7, 'Matrix', 'Un hacker descubre que la realidad que conoce es una simulación creada por máquinas para controlar a la humanidad.', 'Ciencia Ficción', 1999, 'https://www.imdb.com/title/tt0133093/', NOW()),
(8, 'El Señor de los Anillos: La Comunidad del Anillo', 'Frodo Bolsón emprende un viaje épico para destruir el Anillo Único y salvar la Tierra Media del poder del oscuro Señor Sauron.', 'Fantasía', 2001, 'https://www.imdb.com/title/tt0120737/', NOW()),
(9, 'Parásitos', 'Una familia pobre se infiltra en la vida de una familia rica con consecuencias inesperadas. Ganadora del Oscar a Mejor Película.', 'Suspenso', 2019, 'https://www.imdb.com/title/tt6751668/', NOW()),
(10, 'Gladiador', 'Un general romano es traicionado y obligado a convertirse en gladiador para vengarse del corrupto emperador Cómodo.', 'Acción', 2000, 'https://www.imdb.com/title/tt0172495/', NOW());
