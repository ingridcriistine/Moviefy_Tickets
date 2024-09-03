DELIMITER //
create procedure pr_cliente_compra ()
begin
	select C.Nome 'Cliente',
		I.fk_Sessao_id 'Sessão do ingresso',
        T.Tipo 'Tipo do ingresso',
		CN.precoIngresso*(T.porcentagem/100) 'Preço ingresso'
	from ingresso I
		inner join Compra CR on CR.numero = I.fk_Compra_Numero
		inner join Cliente C on CR.fk_Cliente_id = C.id
        inner join Sessao S on I.fk_Sessao_id = S.id
        inner join Cinema CN on CN.id = S.fk_Cinema_id
        inner join TipoIngresso T on I.fk_TipoIngresso_id = T.id;
end
// DELIMITER ;

DROP PROCEDURE pr_cliente_compra;

call pr_cliente_compra();