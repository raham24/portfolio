"use client";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Send, X, MessageCircle } from "lucide-react";
import { useState } from "react";

export function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim() && status === "ready") {
			sendMessage({ text: input });
			setInput("");
		}
	};

	const isLoading = status === "streaming";

	return (
		<>
			{/* Floating Chat Button */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(true)}
					className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 shadow-lg group"
					aria-label="Open chat"
				>
					<MessageCircle className="w-6 h-6 text-zinc-300 group-hover:text-zinc-100" />
				</button>
			)}

			{/* Chat Window */}
			{isOpen && (
				<div className="fixed bottom-8 right-8 z-50 w-[380px] h-[600px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl animate-fade-in-fast">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-zinc-800">
						<div>
							<h3 className="text-sm font-semibold text-zinc-100">Ask about me</h3>
							<p className="text-xs text-zinc-500">Powered by AI</p>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="p-1 rounded hover:bg-zinc-800 transition-colors"
							aria-label="Close chat"
						>
							<X className="w-5 h-5 text-zinc-400 hover:text-zinc-100" />
						</button>
					</div>

					{/* Messages */}
					<div className="flex-1 overflow-y-auto p-4 space-y-4">
						{messages.length === 0 && (
							<div className="text-center py-8">
								<MessageCircle className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
								<p className="text-sm text-zinc-500">
									Ask me anything about my background, projects, or experience!
								</p>
							</div>
						)}
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[85%] rounded-lg px-4 py-2 ${
										message.role === "user"
											? "bg-zinc-800 text-zinc-100"
											: "bg-zinc-800/50 text-zinc-300 border border-zinc-700/50"
									}`}
								>
									<p className="text-sm whitespace-pre-wrap">
										{message.parts.map((part, index) =>
											part.type === "text" ? <span key={index}>{part.text}</span> : null
										)}
									</p>
								</div>
							</div>
						))}
						{isLoading && (
							<div className="flex justify-start">
								<div className="max-w-[85%] rounded-lg px-4 py-2 bg-zinc-800/50 border border-zinc-700/50">
									<div className="flex space-x-2">
										<div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
										<div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
										<div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Input */}
					<form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800">
						<div className="flex gap-2">
							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Ask a question..."
								className="flex-1 px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-zinc-600 text-zinc-100 placeholder-zinc-500"
								disabled={status !== "ready"}
							/>
							<button
								type="submit"
								disabled={status !== "ready" || !input.trim()}
								className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed border border-zinc-700 hover:border-zinc-600 rounded-lg transition-colors"
								aria-label="Send message"
							>
								<Send className="w-4 h-4 text-zinc-300" />
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
}
