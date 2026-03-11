"use client";

import { useEffect, useState, useCallback } from "react";
import {
  MessageSquare,
  Mail,
  MailOpen,
  Trash2,
  Phone,
  Clock,
  Eye,
  EyeOff,
  User,
} from "lucide-react";
import GoldRule from "@/components/decorative/GoldRule";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

type FilterTab = "ALL" | "UNREAD" | "READ";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [filterTab, setFilterTab] = useState<FilterTab>("ALL");
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [togglingRead, setTogglingRead] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/messages");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = useCallback(
    async (messageId: string, isRead: boolean) => {
      try {
        const res = await fetch(`/api/admin/messages/${messageId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead }),
        });
        if (!res.ok) throw new Error();
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, isRead } : m))
        );
        // Also update the selected message if it is the same one
        setSelectedMessage((prev) =>
          prev && prev.id === messageId ? { ...prev, isRead } : prev
        );
      } catch {
        toast.error("Failed to update message");
      }
    },
    []
  );

  const handleOpenMessage = useCallback(
    (message: ContactMessage) => {
      setSelectedMessage(message);
      setConfirmDelete(false);
      // Auto-mark as read when opening
      if (!message.isRead) {
        markAsRead(message.id, true);
      }
    },
    [markAsRead]
  );

  const handleToggleRead = async () => {
    if (!selectedMessage) return;
    setTogglingRead(true);
    await markAsRead(selectedMessage.id, !selectedMessage.isRead);
    setTogglingRead(false);
    toast.success(
      selectedMessage.isRead ? "Marked as unread" : "Marked as read"
    );
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/messages/${selectedMessage.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      toast.success("Message deleted");
      setMessages((prev) =>
        prev.filter((m) => m.id !== selectedMessage.id)
      );
      setSelectedMessage(null);
      setConfirmDelete(false);
    } catch {
      toast.error("Failed to delete message");
    } finally {
      setDeleting(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const readCount = messages.filter((m) => m.isRead).length;

  const filteredMessages =
    filterTab === "ALL"
      ? messages
      : filterTab === "UNREAD"
        ? messages.filter((m) => !m.isRead)
        : messages.filter((m) => m.isRead);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatDateTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const truncateMessage = (text: string, maxLength: number = 80) =>
    text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-bark/20 border-t-terracotta" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl text-bark">Messages</h1>
        <p className="text-sm text-bark/50 font-body mt-1">
          Contact form submissions
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["ALL", "UNREAD", "READ"] as FilterTab[]).map((tab) => {
          const count =
            tab === "ALL"
              ? messages.length
              : tab === "UNREAD"
                ? unreadCount
                : readCount;

          return (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={cn(
                "px-3 py-1.5 text-xs font-accent uppercase tracking-wider rounded-full border transition-colors whitespace-nowrap",
                filterTab === tab
                  ? "bg-bark text-cream border-bark"
                  : "bg-cream text-bark/50 border-border hover:border-bark/30"
              )}
            >
              {tab}
              <span className="ml-1 opacity-50">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Messages list */}
      <div className="bg-cream rounded-sm border border-border/50">
        <div className="flex items-center gap-3 p-4 border-b border-border/50">
          <span className="section-label text-bark/40">
            {filteredMessages.length} Message
            {filteredMessages.length !== 1 ? "s" : ""}
          </span>
          <GoldRule variant="simple" width="w-full" />
        </div>

        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-bark/30">
            <MessageSquare className="h-12 w-12 mb-3 opacity-50" />
            <p className="font-heading text-lg text-bark/40">
              {filterTab === "ALL"
                ? "No messages yet"
                : filterTab === "UNREAD"
                  ? "No unread messages"
                  : "No read messages"}
            </p>
            <p className="text-xs text-bark/30 font-body mt-1">
              {filterTab === "ALL"
                ? "Customer messages from the contact form will appear here"
                : "Try switching to a different filter"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-center gap-4 p-4 hover:bg-parchment/20 transition-colors cursor-pointer",
                  !msg.isRead && "bg-parchment/10"
                )}
                onClick={() => handleOpenMessage(msg)}
              >
                {/* Read/Unread icon */}
                <div className="shrink-0">
                  {msg.isRead ? (
                    <MailOpen className="h-4 w-4 text-bark/25" />
                  ) : (
                    <Mail className="h-4 w-4 text-terracotta" />
                  )}
                </div>

                {/* Message info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p
                      className={cn(
                        "font-accent text-sm text-bark truncate",
                        !msg.isRead && "font-semibold"
                      )}
                    >
                      {msg.name}
                    </p>
                    {!msg.isRead && (
                      <Badge variant="terracotta">New</Badge>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs font-body truncate",
                      !msg.isRead ? "text-bark/70" : "text-bark/40"
                    )}
                  >
                    <span className="font-medium">{msg.subject}</span>
                    <span className="mx-1.5">&mdash;</span>
                    <span>{truncateMessage(msg.message)}</span>
                  </p>
                  <p className="text-[10px] text-bark/30 font-body mt-1">
                    {msg.email} &bull; {formatDate(msg.createdAt)}
                  </p>
                </div>

                {/* View button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenMessage(msg);
                  }}
                  className="p-2 text-bark/30 hover:text-bark transition-colors shrink-0"
                  aria-label="View message"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message detail modal */}
      {selectedMessage && (
        <Modal
          isOpen={!!selectedMessage}
          onClose={() => {
            setSelectedMessage(null);
            setConfirmDelete(false);
          }}
          title={selectedMessage.subject}
          size="lg"
        >
          <div className="space-y-5">
            {/* Sender info */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/40 mb-2">
                From
              </h3>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-bark/30" />
                  <p className="text-sm text-bark font-body">
                    {selectedMessage.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-bark/30" />
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-sm text-terracotta hover:text-terracotta/80 font-body transition-colors"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
                {selectedMessage.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-bark/30" />
                    <a
                      href={`tel:${selectedMessage.phone}`}
                      className="text-sm text-terracotta hover:text-terracotta/80 font-body transition-colors"
                    >
                      {selectedMessage.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-bark/30" />
                  <p className="text-sm text-bark/50 font-body">
                    {formatDateTime(selectedMessage.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <GoldRule variant="simple" width="w-full" />

            {/* Message body */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/40 mb-2">
                Message
              </h3>
              <div className="bg-parchment/30 rounded-sm p-4 border border-border/30">
                <p className="text-sm text-bark/80 font-body whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>
            </div>

            <GoldRule variant="simple" width="w-full" />

            {/* Actions */}
            <div>
              <h3 className="text-xs font-accent uppercase tracking-wider text-bark/40 mb-3">
                Actions
              </h3>

              {!confirmDelete ? (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleToggleRead}
                    isLoading={togglingRead}
                  >
                    {selectedMessage.isRead ? (
                      <>
                        <EyeOff className="h-3 w-3 mr-1.5" />
                        Mark Unread
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 mr-1.5" />
                        Mark Read
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`;
                    }}
                  >
                    <Mail className="h-3 w-3 mr-1.5" />
                    Reply via Email
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <Trash2 className="h-3 w-3 mr-1.5" />
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="bg-terracotta/5 border border-terracotta/20 rounded-sm p-4">
                  <p className="text-sm text-bark/70 font-body mb-3">
                    Are you sure you want to delete this message? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleDelete}
                      isLoading={deleting}
                    >
                      <Trash2 className="h-3 w-3 mr-1.5" />
                      Confirm Delete
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDelete(false)}
                      disabled={deleting}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
