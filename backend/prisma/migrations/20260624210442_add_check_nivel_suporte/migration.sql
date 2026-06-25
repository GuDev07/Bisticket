-- Altera a tabela para adicionar a constraint de verificação
ALTER TABLE "Ticket" 
ADD CONSTRAINT "check_nivel_suporte_range" 
CHECK ("nivelSuporte" > 0 AND "nivelSuporte" < 4);