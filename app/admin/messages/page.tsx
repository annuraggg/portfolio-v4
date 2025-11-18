"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Mail, Calendar, User } from "lucide-react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function MessagesManagementPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        toast.success("Message deleted!");
        setMessages(messages.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("An error occurred");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Messages</h1>
        <p className="text-muted-foreground">
          View and manage messages from your portfolio contact form
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="bg-secondary/10 rounded-lg overflow-hidden">
          <div className="bg-secondary/20 px-4 py-3 font-semibold">
            All Messages ({messages.length})
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`border-b border-secondary/20 p-4 cursor-pointer hover:bg-secondary/10 transition-colors ${
                  selectedMessage?.id === message.id ? "bg-secondary/20" : ""
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {message.name}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Mail className="w-3 h-3" />
                      {message.email}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(message.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm font-medium mt-2">{message.subject}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                  <Calendar className="w-3 h-3" />
                  {formatDate(message.created_at)}
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No messages received yet
              </div>
            )}
          </div>
        </div>

        {/* Message Details */}
        <div className="bg-secondary/10 rounded-lg overflow-hidden">
          <div className="bg-secondary/20 px-4 py-3 font-semibold">
            Message Details
          </div>
          {selectedMessage ? (
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-muted-foreground">From</label>
                <div className="mt-1">
                  <div className="font-medium">{selectedMessage.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedMessage.email}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-muted-foreground">Subject</label>
                <div className="mt-1 font-medium">{selectedMessage.subject}</div>
              </div>

              <div>
                <label className="text-sm font-semibold text-muted-foreground">Date</label>
                <div className="mt-1">{formatDate(selectedMessage.created_at)}</div>
              </div>

              <div>
                <label className="text-sm font-semibold text-muted-foreground">Message</label>
                <div className="mt-1 p-4 bg-background rounded-md whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Message
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full py-24 text-muted-foreground">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
