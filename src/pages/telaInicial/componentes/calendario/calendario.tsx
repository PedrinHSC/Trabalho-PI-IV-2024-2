import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR'; // Idioma em português
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuração do localizer usando date-fns
const locales = {
    'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const messages = {
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    allDay: 'Dia inteiro',
    week: 'Semana',
    work_week: 'Semana útil',
    day: 'Dia',
    month: 'Mês',
    previous: 'Anterior',
    next: 'Próximo',
    yesterday: 'Ontem',
    tomorrow: 'Amanhã',
    today: 'Hoje',
    agenda: 'Agenda',
    noEventsInRange: 'Nenhum evento neste período.',
    showMore: (count: number) => `+ ver mais (${count})`,
};

// Lista de feriados do Brasil (exemplo simples, você pode expandir)
const feriadosBrasil = [
    { title: 'Ano Novo', date: new Date(2024, 0, 1) },
    { title: 'Carnaval', date: new Date(2024, 1, 13) },
    { title: 'Páscoa', date: new Date(2024, 3, 31) },
    { title: 'Dia do Trabalho', date: new Date(2024, 4, 1) },
    { title: 'Independência do Brasil', date: new Date(2024, 8, 7) },
    { title: 'Nossa Senhora Aparecida', date: new Date(2024, 9, 12) },
    { title: 'Proclamação da República', date: new Date(2024, 10, 15) },
    { title: 'Natal', date: new Date(2024, 11, 25) },
    // Adicione mais feriados conforme necessário
];

const Calendario: React.FC = () => {
    const events = [
        ...feriadosBrasil.map(feriado => ({
            title: feriado.title,
            start: feriado.date,
            end: feriado.date,
            allDay: true,
        }))
    ];

    return (
        <div style={{ height: 545 }}>
            <Calendar
                localizer={localizer}
                messages={messages}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                defaultDate={new Date()}
                style={{ height: 500 }}
            />
        </div>
    );
};

export default Calendario;
