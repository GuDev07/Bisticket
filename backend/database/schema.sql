use bisticket;

create type tipo_usuario as enum('cliente', 'suporte_1', 'suporte_2', 'suporte_3');
create type status_ticket as enum('aberto', 'em_andamento', 'resolvido', 'fechado');
create type prioridade_ticket as enum('alta', 'media', 'baixa');

create table if not exists users (
    id serial primary key,
    tipo tipo_usuario not null default 'cliente',
    nome varchar(64) not null,
    email varchar(255) not null unique,
    senha varchar(255) not null,
    created_at timestamp default current_timestamp
);

create table if not exists tickets (
    id serial primary key,
    titulo varchar(64) not null,
    descricao text not null,
    status status_ticket not null default 'aberto',
    prioridade prioridade_ticket not null default 'baixa',
    usuario_id int not null,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp,
    foreign key (usuario_id) references users(id)
);

create table if not exists comentarios (
    id serial primary key,
    texto text not null,
    usuario_id int not null,
    ticket_id int not null,
    created_at timestamp default current_timestamp,
    foreign key (usuario_id) references users(id),
    foreign key (ticket_id) references tickets(id)
);