'use client';

import { useEffect } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import './n8n-chat-overrides.css';

export default function N8nChat() {
  useEffect(() => {
    createChat({
      webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ?? '',
      webhookConfig: { method: 'POST', headers: {} },
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        "Hi — I'm Cacho, the Desvelo AI.",
        'Ask me anything about our work, services, or how to get started.',
      ],
      i18n: {
        en: {
          title: "Hi, I'm Cacho",
          subtitle: 'Ask us anything about our work or services.',
          footer: '',
          getStarted: 'Start Conversation',
          inputPlaceholder: 'Type your question...',
          closeButtonTooltip: 'Close',
        },
      },
      enableStreaming: false,
    });
  }, []);

  return null;
}
