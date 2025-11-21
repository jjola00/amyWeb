"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import emailjs from '@emailjs/browser';

export function ContactForm() {
  const [showForm, setShowForm] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget, // This is the form element
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      console.log('Email sent successfully:', result.text);
      setMessageSent(true);
      e.currentTarget.reset();
      setShowForm(false);
      
      setTimeout(() => setMessageSent(false), 5000);
    } catch (error) {
      console.error('Email failed to send:', error);
      
      // Fallback to mailto if EmailJS fails
      const formData = new FormData(e.currentTarget);
      const email = formData.get("user_email") as string;
      const subject = formData.get("subject") as string;
      const message = formData.get("message") as string;
      const phone = formData.get("phone") as string;
      
      const emailBody = `From: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\nMessage:\n${message}`;
      window.location.href = `mailto:beetleheaddesigns@gmail.com?subject=${encodeURIComponent(subject || "Contact from portfolio")}&body=${encodeURIComponent(emailBody)}`;
      setShowForm(false);
    }
    
    setIsSubmitting(false);
  };

  if (messageSent) {
    return (
      <div className="w-full max-w-sm text-center space-y-4">
        <div className="p-6 rounded-lg bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <Mail className="mx-auto h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
          <h3 className="text-green-800 dark:text-green-200 font-medium text-lg">Message Sent!</h3>
          <p className="text-green-700 dark:text-green-300 text-sm mt-1">
            Thanks for reaching out. I&apos;ll get back to you soon!
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
              className="resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input 
              name="user_email"
              type="email" 
              placeholder="your.email@example.com"
              required
            />
            <Input 
              name="subject"
              type="text" 
              placeholder="Subject"
            />
          </div>
          <div>
            <Input 
              name="phone"
              type="tel" 
              placeholder="Phone (optional)"
            />
          </div>
          
          {/* Hidden field for user name - EmailJS needs this */}
          <input type="hidden" name="user_name" value="Portfolio Contact" />
          
          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <Button size="lg" className="w-full text-lg h-14" onClick={() => setShowForm(true)}>
        <Mail className="mr-3 h-6 w-6" />
        Send me a message
      </Button>
    </div>
  );
}