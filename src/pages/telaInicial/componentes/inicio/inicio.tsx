import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBullhorn } from 'react-icons/fa';
import './inicio.css';

const novidades = [
    { title: 'Semana Cultural', detail: 'Participe da Semana Cultural de 20 a 25 de Março' },
    { title: 'Feira de Ciências', detail: 'Inscrições abertas para a Feira de Ciências até 30 de Março' },
    { title: 'Campanha do Agasalho', detail: 'Doe roupas para a campanha até 10 de Abril' },
    { title: 'Novo Laboratório de Informática', detail: 'Visite o novo laboratório equipado com computadores de última geração.' },
    { title: 'Aulas de Música', detail: 'Inscreva-se nas novas aulas de música oferecidas pela escola.' },
    { title: 'Programa de Intercâmbio', detail: 'Participe do programa de intercâmbio estudantil no exterior.' },
    { title: 'Palestra sobre Meio Ambiente', detail: 'Assista à palestra com especialistas em sustentabilidade no dia 22 de Abril.' },
    { title: 'Concurso de Redação', detail: 'Mostre seu talento no concurso de redação até 1º de Maio.' },
    { title: 'Clube de Leitura', detail: 'Junte-se ao clube de leitura para discutir obras literárias.' },
    { title: 'Treinamento de Primeiros Socorros', detail: 'Aprenda técnicas básicas de primeiros socorros.' },
    { title: 'Exposição de Arte', detail: 'Confira as obras dos alunos na exposição anual de arte.' },
    { title: 'Projeto de Voluntariado', detail: 'Engaje-se em atividades voluntárias na comunidade.' },
    { title: 'Campeonato de Xadrez', detail: 'Inscreva-se para o campeonato interno de xadrez.' },
    { title: 'Oficina de Teatro', detail: 'Participe da oficina e desenvolva suas habilidades cênicas.' },
    { title: 'Maratona de Matemática', detail: 'Teste seus conhecimentos na maratona que acontecerá em 15 de Maio.' }
];

const Inicio: React.FC = () => {
    return (
        <Container fluid className="py-5 bg-light">
            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Novidades</h2>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <div
                        className="scroll-container shadow-lg p-3 mx-auto"
                        style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                            borderRadius: '15px',
                            border: '1px solid #ddd',
                            padding: '20px',
                            marginLeft: '5%',
                            marginRight: '5%'
                        }}
                    >
                        {novidades.map((novidade, index) => (
                            <Card
                                key={index}
                                className="mb-4 shadow-sm"
                                style={{
                                    borderRadius: '15px',
                                    padding: '15px',
                                    minHeight: '150px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Card.Body>
                                    <Card.Title className="text-secondary d-flex align-items-center justify-content-center mb-3">
                                        <FaBullhorn className="me-2" />
                                        {novidade.title}
                                    </Card.Title>
                                    <Card.Text className="text-center">{novidade.detail}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Inicio;
