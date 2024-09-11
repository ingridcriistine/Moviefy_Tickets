
drop database MoviefyTickets;

insert into ClassificacoesIndicativas values ( 'L', getdate(), getdate()), ( '10', getdate(), getdate()), ( '12', getdate(), getdate()), ( '16', getdate(), getdate()), ( '18', getdate(), getdate());

insert into TipoClientes values ('Administrador', GETDATE(), getdate()), ('Usu�rio', getdate(), getdate());

insert into TipoClientes values ('Pix', GETDATE(), getdate()), ('Cartão de crédito', getdate(), getdate());

select * from ClassificacoesIndicativas;

insert into Generos values ( 'Romance', getdate(), getdate()),
( 'Com�dia', getdate(), getdate()),
( 'Terror', getdate(), getdate()),
( 'A��o', getdate(), getdate()),
( 'Aventura', getdate(), getdate()),
( 'Fic��o Cient�fica', getdate(), getdate()),
( 'Drama', getdate(), getdate()),
( 'Fantasia', getdate(), getdate());

select * from Generos;

select * from Filmes;


insert into Franquia values ('Cinemark', GETDATE(), GETDATE()), ('UCI', GETDATE(), GETDATE()), ('Cinesystem', GETDATE(), GETDATE()), ('Cinepolis', GETDATE(), GETDATE());

select * from franquia;

insert into Salas values(1, GETDATE(), GETDATE()), (3, GETDATE(), GETDATE()), (6, GETDATE(), GETDATE());

select * from CinemaLocals;

select * from Enderecos;

select * from Clientes;

SELECT [IDCinemaLocal], [Nome], [Preco], [Foto], [createdAt], [updatedAt], [IDFranquia] FROM [CinemaLocals] AS [CinemaLocal] ORDER BY [CinemaLocal].[createdAt] DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;


 SELECT [IDCliente], [Nome], [DataNascimento], [CPF], [Email], [Senha], [Foto], [IDTipo] FROM [Clientes] AS [Clientes] WHERE [Clientes].[Email] = N'admin@moviefy.com' ORDER BY [Clientes].[IDCliente] OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;