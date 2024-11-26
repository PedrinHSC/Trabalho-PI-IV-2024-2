import { faClock, faEnvelope, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './Contato.css';

const Contato: React.FC = () => {
    return (
        <Container className="py-4 d-flex flex-column align-items-center">
            <h2 className="text-center">Contato</h2>
            <div className="contact-cards">
                <Card className="shadow-lg contact-card">
                    <Card.Body className="text-center">
                        <FontAwesomeIcon icon={faPhoneAlt} size="4x" className="text-primary" />
                        <Card.Title>Telefone</Card.Title>
                        <Card.Text>(27) 1234-5678</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="shadow-lg contact-card">
                    <Card.Body className="text-center">
                        <FontAwesomeIcon icon={faEnvelope} size="4x" className="text-primary" />
                        <Card.Title>Email</Card.Title>
                        <Card.Text>contato@escolavix.com.br</Card.Text>
                    </Card.Body>
                </Card>
                <Card className="shadow-lg contact-card">
                    <Card.Body className="text-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" className="text-primary" />
                        <Card.Title>Endereço</Card.Title>
                        <Card.Text>
                            Rua Alegria de Viver, 45<br />
                            Jardim da Educação, Vitória - ES<br />
                            CEP: 29000-000
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="shadow-lg contact-card">
                    <Card.Body className="text-center">
                        <FontAwesomeIcon icon={faClock} size="4x" className="text-primary" />
                        <Card.Title>Horário de Atendimento</Card.Title>
                        <Card.Text>
                            Segunda a Sexta: 08:00 às 18:00<br />
                            Sábado: 09:00 às 13:00
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default Contato;
