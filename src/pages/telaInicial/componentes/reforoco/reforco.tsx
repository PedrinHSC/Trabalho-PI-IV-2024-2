import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, CircularProgress, Snackbar, Card, CardContent, TextField, Typography, Container, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reforco: React.FC<{ materia: string }> = ({ materia }) => {
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState<{ type: string, text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const genAI = new GoogleGenerativeAI("AIzaSyACARutO6F7B0FBmxezOldxokEpXWdUb34");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const formatResponse = (response: string) => {
        const lines = response.split('\n');
        let formattedHTML = '';

        lines.forEach((line) => {
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            if (line.startsWith('*')) {
                formattedHTML += `<li>${line.replace('* ', '')}</li>`;
            } else {
                formattedHTML += `<p>${line}</p>`;
            }
        });

        return formattedHTML;
    };

    const handleAskQuestion = async () => {
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

                setChatResponse((prev) => [
                    ...prev,
                    { type: 'user', text: userInput },
                    { type: 'gpt', text: formattedResponse },
                ]);

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

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatResponse]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="md">
            <Card>
                <CardContent>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Reforço para {materia}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Você pode usar o chat para tirar dúvidas específicas.
                    </Typography>

                    <Box className='chat-area' sx={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '16px' }}>
                        {chatResponse.map((msg, index) => (
                            <Box key={index} className={`chat-message ${msg.type}`} sx={{ marginBottom: '8px', textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                                <Box className="message-content" sx={{ display: 'inline-block', padding: '8px', borderRadius: '8px', backgroundColor: msg.type === 'user' ? '#e0f7fa' : '#f1f1f1' }} dangerouslySetInnerHTML={{ __html: msg.text }} />
                            </Box>
                        ))}
                        <div ref={chatEndRef} />
                    </Box>

                    <TextField
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={`Digite sua pergunta sobre ${materia}`}
                        disabled={loading}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAskQuestion}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Enviar"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <ToastContainer />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default Reforco;
