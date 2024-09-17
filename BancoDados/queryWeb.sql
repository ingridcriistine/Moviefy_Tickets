
drop database MoviefyTickets;
create database MoviefyTickets;

insert into ClassificacoesIndicativas values ( 'L', getdate(), getdate()), ( '10', getdate(), getdate()), ( '12', getdate(), getdate()), ( '16', getdate(), getdate()), ( '18', getdate(), getdate());

insert into TipoClientes values ('Administrador', GETDATE(), getdate()), ('Usuario', getdate(), getdate());

insert into TipoIngressos values ('Inteira 3D', 100, GETDATE(), getdate()), ('Meia 3D', 50, getdate(), getdate()), ('Inteira 2D', 80, GETDATE(), getdate()), ('Meia 2D', 40, GETDATE(), getdate());

insert into Pagamentos values ('Pix', GETDATE(), getdate()), ('Cartão de Crédito', getdate(), getdate()), ('Cartão de Débito', getdate(), getdate()), ('Boleto', getdate(), getdate());

insert into Generos values ( 'Romance', getdate(), getdate()),
( 'Comedia', getdate(), getdate()),
( 'Terror', getdate(), getdate()),
( 'Acao', getdate(), getdate()),
( 'Aventura', getdate(), getdate()),
( 'Ficao Cientifica', getdate(), getdate()),
( 'Drama', getdate(), getdate()),
( 'Fantasia', getdate(), getdate());

insert into Franquia values ('Cinemark', GETDATE(), GETDATE()), ('UCI', GETDATE(), GETDATE()), ('Cinesystem', GETDATE(), GETDATE()), ('Cinepolis', GETDATE(), GETDATE());

insert into Assentos values ('A1', GETDATE(), getdate()), ('A2', GETDATE(), getdate()), ('A3', GETDATE(), getdate()), ('A4', GETDATE(), getdate()), ('A5', GETDATE(), getdate());
insert into Assentos values ('B1', GETDATE(), getdate()), ('B2', GETDATE(), getdate()), ('B3', GETDATE(), getdate()), ('B4', GETDATE(), getdate()), ('B5', GETDATE(), getdate());
insert into Assentos values ('C1', GETDATE(), getdate()), ('C2', GETDATE(), getdate()), ('C3', GETDATE(), getdate()), ('C4', GETDATE(), getdate()), ('C5', GETDATE(), getdate());
insert into Assentos values ('D1', GETDATE(), getdate()), ('D2', GETDATE(), getdate()), ('D3', GETDATE(), getdate()), ('D4', GETDATE(), getdate()), ('D5', GETDATE(), getdate());
insert into Assentos values ('E1', GETDATE(), getdate()), ('E2', GETDATE(), getdate()), ('E3', GETDATE(), getdate()), ('E4', GETDATE(), getdate()), ('E5', GETDATE(), getdate());

insert into Salas values(1, GETDATE(), GETDATE()), (3, GETDATE(), GETDATE()), (6, GETDATE(), GETDATE());
insert into Salas values(2, GETDATE(), GETDATE()), (4, GETDATE(), GETDATE()), (5, GETDATE(), GETDATE());

select * from CinemaLocals;

select * from Enderecos;

select * from TipoClientes;

SELECT [IDCinemaLocal], [Nome], [Preco], [Foto], [createdAt], [updatedAt], [IDFranquia] FROM [CinemaLocals] AS [CinemaLocal] ORDER BY [CinemaLocal].[createdAt] DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;


 SELECT [IDCliente], [Nome], [DataNascimento], [CPF], [Email], [Senha], [Foto], [IDTipo] FROM [Clientes] AS [Clientes] WHERE [Clientes].[Email] = N'admin@moviefy.com' ORDER BY [Clientes].[IDCliente] OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY;