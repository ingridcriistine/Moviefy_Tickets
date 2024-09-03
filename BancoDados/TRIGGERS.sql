use Moviefy_Tickets;

--  CLIENTE ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_cliente_inserido
after insert on Cliente
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Cliente ', new.Nome, ' ', new.Sobrenome, ' inserido.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_cliente_removido
before delete on Cliente
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Cliente ', old.Nome, ' ', old.Sobrenome, ' removido.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_cliente_editado
after update on Cliente
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Cliente ', new.Nome, ' ', new.Sobrenome, ' editado.'), CURDATE());
end;
// DELIMITER ;


-- FILME ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_filme_inserido
after insert on Filme
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Filme ', new.Titulo, ' inserido.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_filme_removido
before delete on Filme
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Filme ', old.Titulo, ' removido.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_filme_editado
after update on Filme
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Filme ', new.Titulo, ' editado.'), CURDATE());
end;
// DELIMITER ;


-- CINEMA ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_cinema_editado
after update on Cinema
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('As informações do cinema foram editadas.'), CURDATE());
end;
// DELIMITER ;


-- ENDEREÇO ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_endereco_inserido
after insert on Endereco
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Endereço ', new.Logradouro, 'CEP: ', new.Cep, ' inserido.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_endereco_removido
before delete on Endereco
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Endereço ', old.Logradouro, 'CEP: ', old.Cep, ' removido.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_endereco_editado
after update on Endereco
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Endereço ', new.Logradouro, 'CEP: ', new.Cep, ' editado.'), CURDATE());
end;
// DELIMITER ;


-- SESSÃO ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_sessao_inserida
after insert on Sessao
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Nova sessão do filme ', new.Titulo, 'inserida para a data ', new.DataHorario, '.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_sessao_removida
before delete on Sessao
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Sessão do filme ', old.Titulo, ' na data ', old.DataHorario, ' removida.'), CURDATE());
end;
// DELIMITER ;

DELIMITER //
create trigger log_sessao_editada
after update on Sessao
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Sessão do filme ', new.Titulo, ' na data ', new.DataHorario, ' editada.'), CURDATE());
end;
// DELIMITER ;


-- COMPRA ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_nova_compra
after insert on Compra
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Nova compra registrada'), CURDATE());
end;
// DELIMITER ;


-- GÊNERO ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
DELIMITER //
create trigger log_genero_inserido
after insert on Genero
for each row
begin
	insert into log_notificacoes values
    (DEFAULT, CONCAT('Gênero ', new.Nome, ' inserido.'), CURDATE());
end;
// DELIMITER ;

