
drop database MoviefyTickets;

insert into ClassificacoesIndicativas values ( 'L', getdate(), getdate()), ( '10', getdate(), getdate()), ( '12', getdate(), getdate()), ( '16', getdate(), getdate()), ( '18', getdate(), getdate());

select * from ClassificacoesIndicativas;

insert into Generos values ( 'Romance', getdate(), getdate()),
( 'Comédia', getdate(), getdate()),
( 'Terror', getdate(), getdate()),
( 'Ação', getdate(), getdate()),
( 'Aventura', getdate(), getdate()),
( 'Ficção Científica', getdate(), getdate()),
( 'Drama', getdate(), getdate()),
( 'Fantasia', getdate(), getdate());

select * from Generos;

select * from Filmes;


insert into Franquia values ('Cinemark', GETDATE(), GETDATE()), ('UCI', GETDATE(), GETDATE()), ('Cinesystem', GETDATE(), GETDATE()), ('Cinepolis', GETDATE(), GETDATE());

select * from franquia;

insert into Salas values(1, GETDATE(), GETDATE(), 1), (3, GETDATE(), GETDATE(), 1), (6, GETDATE(), GETDATE(), 1);

select * from CinemaLocals;

select * from Enderecos;

SELECT [IDCinemaLocal], [Nome], [Preco], [Foto], [createdAt], [updatedAt], [IDFranquia] FROM [CinemaLocals] AS [CinemaLocal] ORDER BY [CinemaLocal].[createdAt] DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;