import React, { useState } from 'react';
import { Mail, Copy, Send, RefreshCw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { Lead } from '../App';
import { cn } from '../App';

interface EmailComposerProps {
    leads: Lead[];
}

const EMAIL_TYPES = [
    'Follow-up',
    'Introduction',
    'Proposal',
    'Thank You'
];

export function EmailComposer({ leads }: EmailComposerProps) {
    const [selectedLeadId, setSelectedLeadId] = useState<number | ''>('');
    const [emailType, setEmailType] = useState<string>(EMAIL_TYPES[0]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedEmail, setGeneratedEmail] = useState<{ subject: string; body: string } | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const selectedLead = leads.find(l => l.id === selectedLeadId);

    const generateEmail = async (overrideLead?: Lead, overrideType?: string) => {
        const leadToUse = overrideLead || selectedLead;
        const typeToUse = overrideType || emailType;

        if (!leadToUse) {
            alert("Please select a lead first.");
            return;
        }

        setIsGenerating(true);
        setIsCopied(false);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

            const prompt = `Write a professional sales email.
      Type: ${typeToUse}
      Recipient Name: ${leadToUse.name}
      Recipient Company: ${leadToUse.company || 'their company'}
      Context (Notes): ${leadToUse.notes || 'None'}
      
      Respond STRICTLY in JSON format with exactly two keys: "subject" and "body".
      Do not include any other text or markdown block formatting.
      Example:
      {
        "subject": "Email subject here",
        "body": "Email body here"
      }`;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });

            const text = response.text;
            if (!text) throw new Error("No response text");

            const rawContent = text.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            const parsed = JSON.parse(rawContent);

            if (parsed.subject && parsed.body) {
                setGeneratedEmail({ subject: parsed.subject, body: parsed.body });
            } else {
                throw new Error("Invalid response format");
            }

        } catch (error) {
            console.error('Email generation error:', error);
            alert('Failed to generate email. Please check your API key and try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (generatedEmail) {
            const textToCopy = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
            navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#E1E2E4] p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Controls Section */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Mail className="text-indigo-600" size={20} />
                            Email Settings
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Select Lead</label>
                            <select
                                className="w-full px-4 py-2.5 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                value={selectedLeadId}
                                onChange={(e) => setSelectedLeadId(e.target.value ? Number(e.target.value) : '')}
                            >
                                <option value="">-- Select a Lead --</option>
                                {leads.map(lead => (
                                    <option key={lead.id} value={lead.id}>
                                        {lead.name} {lead.company ? `(${lead.company})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                {EMAIL_TYPES.map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setEmailType(type)}
                                        className={cn(
                                            "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                                            emailType === type
                                                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                                : "bg-white border-[#E1E2E4] text-gray-600 hover:bg-gray-50"
                                        )}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => generateEmail()}
                            disabled={!selectedLeadId || isGenerating}
                            className="w-full flex justify-center items-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium transition-colors mt-4"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw className="animate-spin" size={18} />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Generate Email
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Output Section */}
                <div className="lg:col-span-2">
                    <div className="h-full min-h-[400px] flex flex-col bg-gray-50 rounded-2xl border border-[#E1E2E4] p-6 relative">
                        <AnimatePresence mode="wait">
                            {!generatedEmail ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-4"
                                >
                                    <Mail size={48} className="opacity-20" />
                                    <p className="text-center">Select a lead and email type, then click <br />"Generate Email" to craft a personalized message.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex-1 flex flex-col"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900">Generated Email</h3>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => generateEmail()}
                                                disabled={isGenerating}
                                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-[#E1E2E4] rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                                            >
                                                <RefreshCw size={14} className={cn(isGenerating && "animate-spin")} />
                                                Regenerate
                                            </button>
                                            <button
                                                onClick={handleCopy}
                                                className={cn(
                                                    "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border",
                                                    isCopied
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : "bg-white text-gray-600 border-[#E1E2E4] hover:bg-gray-50"
                                                )}
                                            >
                                                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                                {isCopied ? 'Copied!' : 'Copy'}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-1 flex flex-col">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Subject</label>
                                            <input
                                                type="text"
                                                value={generatedEmail.subject}
                                                onChange={(e) => setGeneratedEmail({ ...generatedEmail, subject: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Body</label>
                                            <textarea
                                                value={generatedEmail.body}
                                                onChange={(e) => setGeneratedEmail({ ...generatedEmail, body: e.target.value })}
                                                className="w-full flex-1 min-h-[250px] p-4 bg-white border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-sans text-gray-700 leading-relaxed"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}
