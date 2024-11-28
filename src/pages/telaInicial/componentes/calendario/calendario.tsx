import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendario.css';

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

const initialEvents = [
    { title: 'Ano Novo', start: new Date(2024, 0, 1), end: new Date(2024, 0, 1), allDay: true },
    { title: 'Carnaval', start: new Date(2024, 1, 13), end: new Date(2024, 1, 13), allDay: true },
];

const Calendario: React.FC = () => {
    const [events, setEvents] = useState(initialEvents);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        fetch('http://localhost:5000/eventos')
            .then((response) => response.json())
            .then((data) => {
                if (data.eventos) {
                    const eventosComData = data.eventos.map((evento: any) => ({
                        ...evento,
                        start: new Date(evento.start),
                        end: new Date(evento.end),
                    }));
                    setEvents(eventosComData);
                }
            })
            .catch((error) => console.error('Erro ao carregar eventos:', error));
    };

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        const title = prompt('Digite o título do evento:');
        if (title) {
            const newEvent = { title, start, end, allDay: true };

            setEvents([...events, newEvent]);

            fetch('http://localhost:5000/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
            })
                .then((response) => response.json())
                .then((data) => console.log('Evento adicionado:', data))
                .catch((error) => console.error('Erro ao adicionar evento:', error));
        }
    };

    const handleDeleteEvent = () => {
        if (selectedEvent) {
            fetch(`http://localhost:5000/eventos/${selectedEvent._id}`, { method: 'DELETE' })
                .then((response) => {
                    if (response.ok) {
                        setEvents(events.filter(event => event !== selectedEvent));
                        setSelectedEvent(null);
                        setIsModalOpen(false);
                    }
                })
                .catch((error) => console.error('Erro ao excluir o evento:', error));
        }
    };

    return (
        <div style={{ height: 600 }}>
            <Calendar
                localizer={localizer}
                messages={messages}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                selectable
                style={{ height: 500 }}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(event) => {
                    console.log('Evento selecionado:', event);
                    setSelectedEvent(event);
                    setIsModalOpen(true);
                }}
            />
            {isModalOpen && selectedEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Excluir Evento</h2>
                        <p>Você tem certeza que deseja excluir o evento "{selectedEvent.title}"?</p>
                        <button style={{ backgroundColor: 'Red' }} onClick={handleDeleteEvent}>Excluir</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendario;
