import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Send,
  CheckCircle2,
  Navigation,
} from 'lucide-react';
import { StoreSettings } from '../types';

interface ContactViewProps {
  settings: StoreSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSentSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="text-[11px] uppercase tracking-widest font-bold text-gray-500">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-1">
          CONTACT FASHION HUB
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto">
          Have a question about an online order, sizing, or visiting our store? Our concierge team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FBFBFA] border border-gray-200 p-6 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 pb-3 border-b border-gray-200">
              Store Information
            </h3>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-900 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">Store Address</strong>
                  <p className="text-gray-600 mt-0.5 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-900 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">Direct Phone Support</strong>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-gray-600 hover:text-black">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-900 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">Customer Support Email</strong>
                  <a href={`mailto:${settings.email}`} className="text-gray-600 hover:text-black">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-900 shrink-0" />
                <div>
                  <strong className="text-gray-900 block font-semibold">Opening Hours</strong>
                  <p className="text-gray-600">{settings.openingHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Fashion%20Hub,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold py-2.5 px-3 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={settings.googleMapsLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#111111] hover:bg-black text-white text-xs font-bold py-2.5 px-3 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="bg-[#FBFBFA] border border-gray-200 p-5 flex items-center justify-between text-xs">
            <span className="font-bold text-gray-800">Follow FASHION HUB</span>
            <div className="flex items-center gap-3">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black flex items-center gap-1 font-medium"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <span>·</span>
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black flex items-center gap-1 font-medium"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="lg:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-gray-900 tracking-tight mb-1">
            Send Us a Message
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            We usually respond to inquiries within 2 to 4 business hours.
          </p>

          {sentSuccess ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Message Sent Successfully!</h4>
              <p className="text-xs text-emerald-700">
                Thank you for reaching out. A FASHION HUB representative will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ananya@example.com"
                    className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Order query, size exchange or store visit"
                  className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="w-full p-2.5 border border-gray-300 focus:border-black focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#111111] hover:bg-black text-white font-bold py-3 px-6 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
