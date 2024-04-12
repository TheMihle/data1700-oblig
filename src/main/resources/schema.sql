CREATE TABLE IF NOT EXISTS Orders (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    movie VARCHAR(64) NOT NULL,
    amount SMALLINT NOT NULL,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    phoneNumber VARCHAR(12) NOT NULL,
    email VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS Movies (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(128) NOT NULL
);

INSERT INTO Movies (title) VALUES ('Interstellar'),
        ('Arrival'),
        ('Captain Philips'),
        ('Everything Everywhere All At Once'),
        ('Parasite'),
        ('Dune: Part one'),
        ('Dune: Part two');