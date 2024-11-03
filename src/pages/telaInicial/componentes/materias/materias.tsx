import React, { useState } from 'react';
import './materias.css'; // Inclua o CSS
import { GoogleGenerativeAI } from "@google/generative-ai";

const Materias: React.FC = () => {
    const [selectedMateria, setSelectedMateria] = useState<string | null>(null);
    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Novo estado para armazenar o histórico de chats por matéria
    const [chatHistories, setChatHistories] = useState<Record<string, JSX.Element[]>>({});

    const materias = ['Português', 'Matemática', 'História', 'Geografia', 'Física', 'Biologia', 'Química'];

    // Inicialização do modelo de IA
    const genAI = new GoogleGenerativeAI("AIzaSyACARutO6F7B0FBmxezOldxokEpXWdUb34");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const formatResponse = (response: string) => {
        const lines = response.split('\n');

        let formattedHTML = '';

        lines.forEach((line) => {
            if (line.startsWith('*')) {
                formattedHTML += `<li>${line.replace('* ', '')}</li>`;
            } else {
                formattedHTML += `<p>${line}</p>`;
            }
        });

        return formattedHTML;
    };

    const handleAskQuestion = async () => {
        if (userInput.trim() && selectedMateria) {
            setLoading(true);
            try {
                const chat = model.startChat({
                    history: [
                        {
                            role: "user",
                            parts: [{ text: `Pergunta sobre ${selectedMateria}: ${userInput}` }],
                        },
                    ],
                });

                const result = await chat.sendMessage(userInput);
                const formattedResponse = formatResponse(result.response.text());
                
                // Atualiza o histórico de chat para a matéria selecionada
                setChatHistories(prev => ({
                    ...prev,
                    [selectedMateria]: [
                        ...(prev[selectedMateria] || []),
                        <p key={prev[selectedMateria]?.length}>Você: {userInput}</p>,
                        <div key={prev[selectedMateria]?.length + 1} className="chatgpt-response" dangerouslySetInnerHTML={{ __html: `Gemini: ${formattedResponse}` }} />
                    ]
                }));

                setUserInput('');
            } catch (error) {
                console.error("Erro ao enviar mensagem:", error);
                setChatHistories(prev => ({
                    ...prev,
                    [selectedMateria]: [
                        ...(prev[selectedMateria] || []),
                        <p key={prev[selectedMateria]?.length}>Erro ao obter resposta. Tente novamente.</p>
                    ]
                }));
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className='container'>
            <div>
                <h1 className='title'>Escolha uma Matéria</h1>
            </div>
            {materias.map((materia) => (
                <div className='card' key={materia}>
                    <div className='card-header'>
                        <div className='areaNomeMateria'>{materia}</div>
                    </div>
                    <div className='card-body'>
                        <button onClick={() => setSelectedMateria(materia)}>Perguntar ao Gemini</button>
                    </div>
                </div>
            ))}

            {selectedMateria && (
                <div className='chatgpt-modal'>
                    <h3>Gemini - {selectedMateria}</h3>
                    <div className='chat-area'>
                        {chatHistories[selectedMateria]}
                    </div>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={`Digite sua pergunta sobre ${selectedMateria}`}
                        disabled={loading}
                    />
                    <button onClick={handleAskQuestion} disabled={loading}>
                        {loading ? "Aguardando resposta..." : "Enviar"}
                    </button>
                    <button onClick={() => setSelectedMateria(null)}>Fechar</button>
                </div>
            )}
        </div>
    );
};

export default Materias;
