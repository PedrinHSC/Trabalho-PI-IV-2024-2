import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button, CircularProgress, Snackbar, Card, CardContent, TextField, Typography, Container, Box, styled } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCard = styled(Card)({
    marginTop: 16,
    padding: 16,
    minWidth: '100%',
});

const ChatArea = styled(Box)({
    maxHeight: '63vh',
    overflowY: 'auto',
    padding: 8,
    borderRadius: 8,

    // Estilização da barra de rolagem para navegadores compatíveis
    '&::-webkit-scrollbar': {
        width: '8px', // largura da barra
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1', // cor do fundo do track
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#b0bec5', // cor da "pegada" da barra
        borderRadius: '10px',
        border: '2px solid #f5f5f5', // borda para melhor contraste
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#78909c', // cor da "pegada" ao passar o mouse
    },
});

const MessageBox = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
    marginBottom: 8,
    textAlign: isUser ? 'right' : 'left',
}));

const MessageContent = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
    display: 'inline-block',
    padding: '8px',
    borderRadius: 8,
    backgroundColor: isUser ? '#e0f7fa' : '#f1f1f1',
}));

const FullScreenContainer = styled(Container)({
    width: '100%',      // Largura total da janela
    height: '100%',     // Altura total da janela
    display: 'flex',     // Flexbox para centralizar conteúdo, se necessário
    alignItems: 'center', // Alinha verticalmente ao centro
    justifyContent: 'center', // Alinha horizontalmente ao centro
    padding: 0,           // Remove o padding padrão do Container do Material-UI
    overflow: 'hidden',   // Evita barras de rolagem extras
});

const Reforco: React.FC<{ materia: string }> = ({ materia }) => {
    const [userInput, setUserInput] = useState('');
    const [chatResponse, setChatResponse] = useState<{ type: string, text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const genAI = new GoogleGenerativeAI("AIzaSyB4Bw4_vC6eWV23ESPYX6VHTc2vmE1qxCw");
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
        <FullScreenContainer>
            <StyledCard>
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        Utilize o chat para tirar suas dúvidas relacionadas a matéria.
                    </Typography>

                    <ChatArea>
                        {chatResponse.map((msg, index) => (
                            <MessageBox key={index} isUser={msg.type === 'user'}>
                                <MessageContent isUser={msg.type === 'user'} dangerouslySetInnerHTML={{ __html: msg.text }} />
                            </MessageBox>
                        ))}
                        <div ref={chatEndRef} />
                    </ChatArea>

                    <TextField
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={`Digite sua pergunta sobre ${materia}`}
                        disabled={loading}
                        multiline
                        rows={2}
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
            </StyledCard>

            <ToastContainer />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </FullScreenContainer>
    );
};

export default Reforco;
