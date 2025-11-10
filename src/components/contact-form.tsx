"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export function ContactForm() {
  const [showForm, setShowForm] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailClick = () => {
    setShowForm(true);
    setMessageSent(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    // Create mailto URL with form data
    const mailtoUrl = `mailto:beetleheaddesigns@gmail.com?subject=${encodeURIComponent(
      subject || "Contact from portfolio"
    )}&body=${encodeURIComponent(
      `From: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open default email client
    window.location.href = mailtoUrl;

    // Reset form and show success state
    e.currentTarget.reset();
    setIsSubmitting(false);
    setShowForm(false);
    setMessageSent(true);

    // Reset to initial state after 3 seconds
    setTimeout(() => {
      setMessageSent(false);
    }, 3000);
  };

  const handleCancel = () => {
    setShowForm(false);
    setMessageSent(false);
  };

  if (messageSent) {
    return (
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <p className="text-green-800 dark:text-green-200 font-medium">
            Message Sent!
          </p>
          <p className="text-sm text-green-600 dark:text-green-300 mt-1">
            Your email client should have opened with the message.
          </p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="w-full max-w-lg space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea 
              name="message"
              placeholder="Write your message here..."
              rows={5}
              required
              className="w-full"
            />
          </div>
          <div className="flex gap-3">
            <Input 
              name="email"
              type="email" 
              placeholder="your.email@example.com"
              required
              className="flex-1"
            />
            <Input 
              name="subject"
              type="text" 
              placeholder="Subject"
              className="flex-1"
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <Button size="lg" className="w-full text-lg h-14" onClick={handleEmailClick}>
        <Mail className="mr-3 h-6 w-6" />
        beetleheaddesigns@gmail.com
      </Button>
    </div>
  );
}