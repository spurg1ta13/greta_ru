import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import gretaMark from "@/assets/greta-ai-mark.png";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";


export function GretaChat() {
  const { t, language } = useLanguage();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");
  const sessionIdRef = useRef<string>(
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now()),
  );

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { language, sessionId: sessionIdRef.current },
    }),

    onError: (error) => {
      console.error(error);
      toast.error(t.chat.error);
    },
  });

  const busy = status === "submitted" || status === "streaming";

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!busy && hasInteracted.current) {
      textareaRef.current?.focus({ preventScroll: true });
    }
  }, [busy]);


  const send = (text: string) => {
    const value = text.trim();
    if (!value || busy) return;
    hasInteracted.current = true;
    setInput("");
    void sendMessage({ text: value });
  };


  const handleSubmit = (message: PromptInputMessage) => {
    send(message.text ?? "");
  };

  return (
    <section id="greta-ai" className="scroll-mt-24 border-y border-border bg-surface/30 py-24">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {t.chat.eyebrow}
          </p>
          <div className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <img
              src={gretaMark}
              alt="Greta AI assistant logo"
              width={56}
              height={56}
              loading="lazy"
              className="size-12 shrink-0 sm:size-14"
            />
            <div className="min-w-0">
              <h2 className="text-3xl font-bold sm:text-4xl">{t.chat.heading}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t.chat.lead}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="panel flex h-[560px] flex-col overflow-hidden">
            <Conversation className="flex-1">
              <ConversationContent className="gap-5">
                {messages.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t.chat.empty}
                    </p>
                    <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
                      {t.chat.suggestions.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            onClick={() => send(s)}
                            className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {messages.map((message) => (
                  <Message from={message.role} key={message.id}>
                    <MessageContent
                      className={
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent p-0 text-foreground"
                      }
                    >
                      {message.parts.map((part, index) =>
                        part.type === "text" ? (
                          <MessageResponse key={index}>{part.text}</MessageResponse>
                        ) : null,
                      )}
                    </MessageContent>
                  </Message>
                ))}

                {status === "submitted" ? (
                  <Shimmer className="text-sm">{t.chat.thinking}</Shimmer>
                ) : null}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            <div className="border-t border-border p-3">
              <PromptInput onSubmit={handleSubmit}>
                <PromptInputTextarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.currentTarget.value)}
                  placeholder={t.chat.placeholder}
                />
                <PromptInputFooter className="justify-end">
                  <PromptInputSubmit status={status} disabled={!input.trim() && !busy} />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
