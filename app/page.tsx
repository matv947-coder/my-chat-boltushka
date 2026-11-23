'use client';
import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Привет! Я болтушка. Расскажи, что на душе? Можно про что угодно — про погоду, про салат, про TradingView… Я тут, слушаю.' }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');

    // Имитация ответа (чтобы работало без ключей и серверов)
    setTimeout(() => {
      const replies = [
        `Ты сказал: "${input}". Интересно! Расскажи ещё чуть-чуть, я тут.`,
        `Хм, вот это да… А что было до этого? Или давай про что-то совсем другое?`,
        `Спасибо, что поделился. Знаешь, иногда просто выговориться — уже легче. Что ещё хочется сказать?`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomReply }]);
    }, 600); // небольшая задержка, чтобы было похоже на «думает»
  };

  return (
    <main style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>Болтушка</h2>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '8px', background: '#f9f9f9' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '12px', padding: '8px 12px', borderRadius: '6px', lineHeight: '1.4' }}>
            <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>
              {m.role === 'user' ? 'Ты:' : 'Болтушка:'}
            </strong>
            <div style={{ background: m.role === 'user' ? '#e3f2fd' : '#f5f5f5', padding: '8px', borderRadius: '6px' }}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          style={{ width: '75%', padding: '10px', border: '1px solid #aaa', borderRadius: '4px' }}
          placeholder="Напиши что-нибудь..."
        />
        <button onClick={send} style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Отправить
        </button>
      </div>
    </main>
  );
}