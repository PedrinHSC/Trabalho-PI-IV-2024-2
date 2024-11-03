import React, { useState, useEffect, useRef } from 'react';
import './materias.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, Card, CardContent, Typography, TextField, CircularProgress, Modal, Snackbar } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Materias: React.FC = () => {
    const [selectedMateria, setSelectedMateria] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null); // Ref for scroll to bottom

    const materias = ['Português', 'Matemática', 'História', 'Geografia', 'Física', 'Biologia', 'Química'];

    const genAI = new GoogleGenerativeAI("AIzaSyACARutO6F7B0FBmxezOldxokEpXWdUb34");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const formatResponse = (response: string) => {
        const lines = response.split('\n');
        let formattedHTML = '';
    
        lines.forEach((line) => {
            // Substitui texto entre ** por texto em negrito
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            
            if (line.startsWith('*')) {
                // Listas
                formattedHTML += `<li>${line.replace('* ', '')}</li>`;
            } else {
                // Parágrafos normais
                formattedHTML += `<p>${line}</p>`;
            }
        });
    
        return formattedHTML;
    };
    
    

    const handleAskQuestion = async (materia: string) => {
        if (userInput.trim()) {
            setLoading(true);
            try {
                const chat = model.startChat({
                    history: [
                        {
                            role: "user",
                            parts: [{ text: `Pergunta sobre ${materia}: ${userInput}` }],
                        },
                    ],
                });

                const result = await chat.sendMessage(userInput);
                const formattedResponse = formatResponse(result.response.text());

                // Atualiza a conversa específica da matéria
                setChatResponse((prev) => ({
                    ...prev,
                    [materia]: [
                        ...(prev[materia] || []),
                        { type: 'user', text: userInput },
                        { type: 'gpt', text: formattedResponse },
                    ],
                }));

                setUserInput('');
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
                setSnackbarMessage("Erro ao obter resposta. Tente novamente.");
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleOpenChat = (materia: string) => {
        setSelectedMateria(materia);
        setUserInput('');
    };

    const handleCloseChat = () => {
        setSelectedMateria(null);
        setChatResponse((prev) => ({
            ...prev,
            [selectedMateria!]: [] // Limpa o histórico da conversa ao fechar a modal
        }));
    };

    return (
        <div className='container'>
            <h1 className='title'>Escolha uma Matéria</h1>
            <div className='materias-container'>
                {materias.map((materia) => (
                    <Card className='card' key={materia}>
                        <CardContent>
                            <Typography className='areaNomeMateria' variant="h5">{materia}</Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={() => handleOpenChat(materia)}
                                style={{ marginTop: '10px' }}
                            >
                                Perguntar ao Gemini
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal para Chat */}
            <Modal
                open={Boolean(selectedMateria)}
                onClose={handleCloseChat}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className='chatgpt-modal'>
                    <h3>Gemini - {selectedMateria}</h3>
                    <div className='chat-area'>
                        {(chatResponse[selectedMateria!] || []).map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.type}`}>
                                <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.text }} />
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={`Digite sua pergunta sobre ${selectedMateria}`}
                        disabled={loading}
                        rows={4} // Definindo a altura da textarea
                        style={{ width: '100%', padding: '10px', resize: 'none' }} // Estilização
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => handleAskQuestion(selectedMateria!)} 
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Enviar"}
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            onClick={handleCloseChat}
                        >
                            Fechar
                        </Button>
                    </div>
                </div>
            </Modal>

            <ToastContainer />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </div>
    );
};

export default Materias;
