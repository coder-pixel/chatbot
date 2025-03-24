import React from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SendIcon, XIcon, StopCircleIcon, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";

interface ChatWindowProps {
  toggleChat: () => void;
}

const ChatWindow = ({ toggleChat }: ChatWindowProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    error,
  } = useChat({
    api: "/api/gemini", // can also use other LLM providers
  });

  return (
    <Card className="border-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-semibold">Chat with AI</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="px-2 py-2"
          onClick={toggleChat}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-2">
          {messages?.length > 0 ? (
            messages?.map((message, index) => (
              <div
                key={message?.id || index}
                className={`mb-4 ${
                  message?.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message?.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, children, ...props }) {
                        return inline ? (
                          <code className="bg-gray-200 px-1 rounded" {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-200 p-2 rounded">
                            <code {...props}>{children}</code>
                          </pre>
                        );
                      },

                      ul({ children }) {
                        return <ul className="list-disc ml-4">{children}</ul>;
                      },

                      ol({ children }) {
                        return (
                          <ul className="list-decimal ml-4">{children}</ul>
                        );
                      },
                    }}
                  >
                    {message?.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full h-[90%] mt-32 text-gray-500 items-center flex justify-center gap-3">
              <p>No messages yet</p>
            </div>
          )}

          {isLoading && (
            <div className="w-full mt-5 text-gray-500 items-center flex justify-start gap-3">
              <p>Generating response...</p>
              <Loader2 className="size-4 animate-spin" />
            </div>
          )}

          {error && (
            <div className="w-full mt-32 text-gray-500 items-center flex justify-center gap-3">
              <p>Error generating response.</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          className="w-full flex justify-between items-center space-x-2"
          onSubmit={
            isLoading
              ? (e) => {
                  if (e) e.preventDefault();
                  stop();
                }
              : handleSubmit
          }
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button type="submit">
            {isLoading ? (
              <StopCircleIcon className="size-4" />
            ) : (
              <SendIcon className="size-4" />
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatWindow;
