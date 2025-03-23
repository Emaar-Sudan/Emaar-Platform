import { useState, useCallback } from 'react';
import { Message } from '../types/support';
import { chatApi } from '@/services/api/chat';
import { generateId } from '../utils/id';
import { useLanguage } from '../contexts/LanguageContext';

export const useChat = (apiKey: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // استخدام الترجمة من السياق
  const { t } = useLanguage();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      content: content.trim(),
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      const reply = await chatService.sendMessage(content, apiKey);
      const botMessage: Message = {
        id: generateId(),
        content: reply,
        type: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : t('support.failedToSendMessage'));
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, t]);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};
