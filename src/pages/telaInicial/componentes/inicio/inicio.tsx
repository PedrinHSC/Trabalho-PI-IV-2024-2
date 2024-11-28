import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBullhorn } from 'react-icons/fa';
import './inicio.css';

const Inicio: React.FC = () => {
    interface Novidade {
        id: number;
        titulo: string;
        descricao: string;
    }

    const [novidades, setNovidades] = useState<Novidade[]>([]);

    useEffect(() => {
        fetchNovidades();
    }, []);

    const fetchNovidades = async () => {
        try {
            const response = await fetch('http://localhost:5000/novidades');
            if (response.ok) {
                const data = await response.json();
                setNovidades(data.novidade)
            } else {
                console.error('Erro ao buscar os dados:', response.statusText);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <Container fluid className="py-5 bg-light">
            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Novidades</h2>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <div
                        className="scroll-container shadow-lg p-3 mx-auto"
                        style={{
                            maxHeight: '73vh',
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
                                        {novidade.titulo}
                                    </Card.Title>
                                    <Card.Text className="text-center">{novidade.descricao}</Card.Text>
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
