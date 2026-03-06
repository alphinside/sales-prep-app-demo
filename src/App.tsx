/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Trash2,
  Edit2,
  Sparkles,
  X,
  ChevronRight,
  LayoutDashboard,
  ListFilter,
  Calendar,
  CheckCircle,
  Circle,
  Mic,
  Square,
  Upload,
  Loader2,
  Headphones,
  Volume2,
  Image as ImageIcon,
  FileImage,
  MessageSquare,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed Won' | 'Closed Lost';

interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  value: number;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface Meeting {
  id: number;
  lead_id: number;
  lead_name: string;
  lead_company: string;
  title: string;
  meeting_date: string;
  notes: string;
  is_completed: number;
  created_at: string;
}

interface LeadNote {
  id: number;
  lead_id: number;
  content: string;
  type: 'general' | 'meeting' | 'analysis' | 'research';
  created_at: string;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  'New': 'bg-blue-100 text-blue-700 border-blue-200',
  'Contacted': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Qualified': 'bg-purple-100 text-purple-700 border-purple-200',
  'Proposal': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Closed Won': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Closed Lost': 'bg-rose-100 text-rose-700 border-rose-200',
};

const STATUS_OPTIONS: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed Won', 'Closed Lost'];

// --- Components ---

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);
  const [view, setView] = useState<'dashboard' | 'leads' | 'meetings' | 'chat'>('leads');
  const [aiAnalysis, setAiAnalysis] = useState<{ id: number; text: string; type: 'analysis' | 'research' } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isGeneratingPodcast, setIsGeneratingPodcast] = useState<number | null>(null);
  const [isGeneratingInfographic, setIsGeneratingInfographic] = useState<number | null>(null);
  const [infographicUrl, setInfographicUrl] = useState<{ id: number; url: string } | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordingMeetingId, setRecordingMeetingId] = useState<number | null>(null);
  const [leadNotes, setLeadNotes] = useState<LeadNote[]>([]);
  const [selectedLeadForNotes, setSelectedLeadForNotes] = useState<Lead | null>(null);

  useEffect(() => {
    fetchLeads();
    fetchMeetings();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await fetch('/api/meetings');
      const data = await res.json();
      setMeetings(data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const fetchLeadNotes = async (leadId: number) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/notes`);
      const data = await res.json();
      setLeadNotes(data);
    } catch (error) {
      console.error('Error fetching lead notes:', error);
    }
  };

  const addLeadNote = async (leadId: number, content: string, type: LeadNote['type'] = 'general') => {
    try {
      await fetch(`/api/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type }),
      });
      if (selectedLeadForNotes?.id === leadId) {
        fetchLeadNotes(leadId);
      }
    } catch (error) {
      console.error('Error adding lead note:', error);
    }
  };

  const handleSaveLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const leadData = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      status: formData.get('status') as LeadStatus,
      value: parseFloat(formData.get('value') as string) || 0,
      notes: formData.get('notes') as string,
    };

    try {
      if (editingLead) {
        await fetch(`/api/leads/${editingLead.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      } else {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadData),
        });
      }
      fetchLeads();
      setIsModalOpen(false);
      setEditingLead(null);
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleSaveMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const meetingData = {
      lead_id: parseInt(formData.get('lead_id') as string),
      title: formData.get('title') as string,
      meeting_date: formData.get('meeting_date') as string,
      notes: formData.get('notes') as string,
      is_completed: editingMeeting?.is_completed || 0
    };

    try {
      if (editingMeeting) {
        await fetch(`/api/meetings/${editingMeeting.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(meetingData),
        });
      } else {
        await fetch('/api/meetings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(meetingData),
        });
      }
      fetchMeetings();
      setIsMeetingModalOpen(false);
      setEditingMeeting(null);
    } catch (error) {
      console.error('Error saving meeting:', error);
    }
  };

  const handleDeleteMeeting = async (id: number) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return;
    try {
      await fetch(`/api/meetings/${id}`, { method: 'DELETE' });
      fetchMeetings();
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  const handleToggleMeetingComplete = async (meeting: Meeting) => {
    try {
      await fetch(`/api/meetings/${meeting.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...meeting,
          is_completed: meeting.is_completed ? 0 : 1
        }),
      });
      fetchMeetings();
    } catch (error) {
      console.error('Error toggling meeting completion:', error);
    }
  };

  const startRecording = async (meetingId: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        await handleTranscribe(meetingId, blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingMeetingId(meetingId);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordingMeetingId(null);
    }
  };

  const handleTranscribe = async (meetingId: number, blob: Blob) => {
    setIsTranscribing(true);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          resolve(base64String);
        };
      });
      reader.readAsDataURL(blob);
      const base64Data = await base64Promise;

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            inlineData: {
              mimeType: blob.type,
              data: base64Data
            }
          },
          {
            text: "Transcribe this meeting recording into clear, professional notes. Focus on key decisions and action items."
          }
        ]
      });

      const transcription = response.text || "Transcription failed.";
      const meeting = meetings.find(m => m.id === meetingId);
      if (meeting) {
        const updatedNotes = meeting.notes 
          ? `${meeting.notes}\n\n--- AI Transcription ---\n${transcription}`
          : transcription;

        await fetch(`/api/meetings/${meetingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...meeting,
            notes: updatedNotes
          }),
        });
        
        // Also add to centralized log
        await addLeadNote(meeting.lead_id, `AI Transcription for "${meeting.title}":\n\n${transcription}`, 'meeting');
        
        fetchMeetings();
      }
    } catch (error) {
      console.error('Transcription error:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleFileUpload = async (meetingId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleTranscribe(meetingId, file);
    }
  };

  const generateBriefingPodcast = async (meeting: Meeting) => {
    setIsGeneratingPodcast(meeting.id);
    try {
      // 1. Fetch lead history
      const res = await fetch(`/api/leads/${meeting.lead_id}/notes`);
      const notes: LeadNote[] = await res.json();
      
      const historyText = notes.map(n => `[${new Date(n.created_at).toLocaleDateString()}] (${n.type}): ${n.content}`).join('\n\n');
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

      // Step 1: Generate the script using a text model
      const scriptResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are a scriptwriter for a short "Pre-Meeting Briefing" podcast. 
        Hosts: Alex (senior strategist) and Sam (research analyst).
        
        Client: ${meeting.lead_name} from ${meeting.lead_company}
        Upcoming Meeting: ${meeting.title} on ${new Date(meeting.meeting_date).toLocaleString()}
        
        History & Notes:
        ${historyText || "No previous history recorded."}
        
        Task: Write a 60-second conversational script. 
        Format it exactly like this:
        Alex: [Alex's lines]
        Sam: [Sam's lines]
        
        Keep it professional, energetic, and concise. Do not include any other text or formatting.`,
      });

      const script = scriptResponse.text;
      if (!script) throw new Error("Failed to generate script");

      // Step 2: Generate the audio using the TTS model
      const audioResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `TTS the following conversation between Alex and Sam:\n\n${script}` }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            multiSpeakerVoiceConfig: {
              speakerVoiceConfigs: [
                {
                  speaker: 'Alex',
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                },
                {
                  speaker: 'Sam',
                  voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
                }
              ]
            }
          }
        }
      });

      const part = audioResponse.candidates?.[0]?.content?.parts?.[0];
      const base64Audio = part?.inlineData?.data;
      const mimeType = part?.inlineData?.mimeType;

      if (base64Audio) {
        const binaryString = atob(base64Audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        let audioBlob: Blob;
        
        // If it's raw PCM (common for this model), we need to add a WAV header
        if (mimeType === 'audio/pcm' || !mimeType || mimeType.includes('pcm')) {
          const sampleRate = 24000;
          const header = new ArrayBuffer(44);
          const view = new DataView(header);

          // RIFF identifier
          view.setUint32(0, 0x52494646, false); // "RIFF"
          // file length
          view.setUint32(4, 36 + bytes.length, true);
          // RIFF type
          view.setUint32(8, 0x57415645, false); // "WAVE"
          // format chunk identifier
          view.setUint32(12, 0x666d7420, false); // "fmt "
          // format chunk length
          view.setUint32(16, 16, true);
          // sample format (PCM)
          view.setUint16(20, 1, true);
          // channel count (Mono)
          view.setUint16(22, 1, true);
          // sample rate
          view.setUint32(24, sampleRate, true);
          // byte rate (sample rate * block align)
          view.setUint32(28, sampleRate * 2, true);
          // block align (channel count * bytes per sample)
          view.setUint16(32, 2, true);
          // bits per sample
          view.setUint16(34, 16, true);
          // data chunk identifier
          view.setUint32(36, 0x64617461, false); // "data"
          // data chunk length
          view.setUint32(40, bytes.length, true);

          audioBlob = new Blob([header, bytes], { type: 'audio/wav' });
        } else {
          audioBlob = new Blob([bytes], { type: mimeType });
        }

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        alert("Failed to generate audio briefing.");
      }
    } catch (error) {
      console.error('Podcast generation error:', error);
      alert('Failed to generate briefing podcast. Please try again.');
    } finally {
      setIsGeneratingPodcast(null);
    }
  };

  const generatePrepInfographic = async (meeting: Meeting) => {
    setIsGeneratingInfographic(meeting.id);
    
    const maxRetries = 2;
    let attempt = 0;

    const executeGeneration = async () => {
      try {
        const res = await fetch(`/api/leads/${meeting.lead_id}/notes`);
        const notes: LeadNote[] = await res.json();
        // Truncate to last 10 notes to avoid prompt length issues
        const recentNotes = notes.slice(-10);
        const historyText = recentNotes.map(n => `[${n.type}]: ${n.content}`).join('\n');

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
        const prompt = `Create a highly visual, graphic-rich sales prep infographic for a meeting with ${meeting.lead_name} from ${meeting.lead_company}.
        Meeting Title: ${meeting.title}
        
        Summary of History:
        ${historyText || "No previous history recorded."}
        
        The infographic MUST be a single vertical image with a dynamic, modern layout. 
        Use bold graphic elements, professional icons for each section, and a vibrant but professional color palette.
        
        Sections to include:
        1. Client Profile (Name, Company, Role)
        2. Timeline of History (visual timeline or flow chart)
        3. Key Insights & Red Flags
        4. Tactical Strategy
        
        Style: High-end data visualization, bento-grid style, 3D icons, premium typography. 
        Avoid plain text blocks; use bullet points and labels. 
        Ensure the header is bold and clearly visible at the top.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
        });

        if (!response.candidates?.[0]?.content?.parts) {
          throw new Error("Invalid response structure from AI");
        }

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64Data = part.inlineData.data;
            setInfographicUrl({ id: meeting.id, url: `data:image/png;base64,${base64Data}` });
            return true;
          }
        }
        throw new Error("No image data returned in response");
      } catch (error: any) {
        console.error(`Infographic generation attempt ${attempt + 1} failed:`, error);
        if (attempt < maxRetries && (error.message?.includes('500') || error.status === 500 || error.message?.includes('Internal error'))) {
          attempt++;
          // Wait 1s before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          return await executeGeneration();
        }
        throw error;
      }
    };

    try {
      await executeGeneration();
    } catch (error) {
      console.error('Final infographic generation error:', error);
      alert('Failed to generate infographic after multiple attempts. This may be a transient issue with the AI service. Please try again in a moment.');
    } finally {
      setIsGeneratingInfographic(null);
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const analyzeLead = async (lead: Lead) => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this sales lead and suggest next steps. 
        Lead Name: ${lead.name}
        Company: ${lead.company}
        Status: ${lead.status}
        Value: $${lead.value}
        Notes: ${lead.notes}
        
        Provide a concise summary and 3 actionable next steps.`,
      });
      const text = response.text || "No analysis available.";
      setAiAnalysis({ id: lead.id, text, type: 'analysis' });
      
      // Add to centralized log
      await addLeadNote(lead.id, text, 'analysis');
    } catch (error) {
      console.error('AI Analysis error:', error);
      setAiAnalysis({ id: lead.id, text: "Failed to generate AI analysis. Please check your API key.", type: 'analysis' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const researchLead = async (lead: Lead) => {
    setIsResearching(true);
    setAiAnalysis(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const missingInfo = [];
      if (!lead.email) missingInfo.push('email address');
      if (!lead.phone) missingInfo.push('phone number');
      if (!lead.company) missingInfo.push('company details');
      
      const prompt = `Perform a professional research task for this sales lead.
      Name: ${lead.name}
      Company: ${lead.company || 'Unknown'}
      Current Email: ${lead.email || 'Missing'}
      Current Phone: ${lead.phone || 'Missing'}
      
      Task:
      1. Find a brief professional background for this person.
      2. Search for the following missing information: ${missingInfo.length > 0 ? missingInfo.join(', ') : 'any relevant contact details or social profiles'}.
      3. Provide a summary of their company's recent news or activities.
      4. List any verified social media profiles (LinkedIn, Twitter, etc.).
      
      Format the output as a structured research report with clear headings.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      let reportText = response.text || "No research data found.";
      
      // Extract grounding sources if available
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks && chunks.length > 0) {
        reportText += "\n\n### Sources\n";
        const sources = chunks
          .filter(c => c.web)
          .map(c => `- [${c.web?.title || 'Source'}](${c.web?.uri})`)
          .join('\n');
        reportText += sources;
      }

      setAiAnalysis({ id: lead.id, text: reportText, type: 'research' });
      
      // Add to centralized log
      await addLeadNote(lead.id, reportText, 'research');
    } catch (error) {
      console.error('AI Research error:', error);
      setAiAnalysis({ id: lead.id, text: "Failed to perform AI research. Please check your API key and search permissions.", type: 'research' });
    } finally {
      setIsResearching(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [leads, searchQuery]);

  const stats = useMemo(() => {
    const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
    const wonValue = leads.filter(l => l.status === 'Closed Won').reduce((sum, lead) => sum + lead.value, 0);
    const activeLeads = leads.filter(l => !['Closed Won', 'Closed Lost'].includes(l.status)).length;
    return { totalValue, wonValue, activeLeads, totalLeads: leads.length };
  }, [leads]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C1E] font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#E1E2E4] p-6 hidden lg:block">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <TrendingUp size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">LeadFlow</h1>
        </div>

        <nav className="space-y-1">
          <button 
            onClick={() => setView('leads')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
              view === 'leads' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Users size={18} />
            Leads
          </button>
          <button 
            onClick={() => setView('dashboard')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
              view === 'dashboard' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>
          <button 
            onClick={() => setView('meetings')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
              view === 'meetings' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Calendar size={18} />
            Meetings
          </button>
          <button 
            onClick={() => setView('chat')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
              view === 'chat' ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <MessageSquare size={18} />
            Chat
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-indigo-600 rounded-2xl text-white">
            <p className="text-xs font-medium opacity-80 mb-1">Total Pipeline</p>
            <p className="text-xl font-bold">${stats.totalValue.toLocaleString()}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              {view === 'leads' ? 'Sales Leads' : view === 'dashboard' ? 'Pipeline Overview' : view === 'meetings' ? 'Meetings & Events' : 'AI Sales Assistant'}
            </h2>
            <p className="text-gray-500 text-sm">
              {view === 'leads' ? 'Manage and track your potential customers' : 
               view === 'dashboard' ? 'Overview of your sales health' : 
               view === 'meetings' ? 'Schedule and record client interactions' :
               'Ask questions about your leads, meetings, and sales strategy'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {view !== 'dashboard' && view !== 'chat' && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder={view === 'leads' ? "Search leads..." : "Search meetings..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-[#E1E2E4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-full md:w-64"
                />
              </div>
            )}
            {view !== 'chat' && (
              <button 
                onClick={() => { 
                  if (view === 'leads') {
                    setEditingLead(null); 
                    setIsModalOpen(true); 
                  } else {
                    setEditingMeeting(null);
                    setIsMeetingModalOpen(true);
                  }
                }}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm shadow-indigo-200"
              >
                <Plus size={18} />
                {view === 'leads' ? 'Add Lead' : 'Schedule Meeting'}
              </button>
            )}
          </div>
        </header>

        {view === 'chat' ? (
          <ChatView leads={leads} meetings={meetings} />
        ) : view === 'dashboard' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Users className="text-blue-600" />} label="Total Leads" value={stats.totalLeads} />
            <StatCard icon={<Clock className="text-yellow-600" />} label="Active Leads" value={stats.activeLeads} />
            <StatCard icon={<DollarSign className="text-emerald-600" />} label="Won Value" value={`$${stats.wonValue.toLocaleString()}`} />
            <StatCard icon={<TrendingUp className="text-indigo-600" />} label="Total Pipeline" value={`$${stats.totalValue.toLocaleString()}`} />
            
            <div className="col-span-full bg-white p-6 rounded-2xl border border-[#E1E2E4]">
              <h3 className="text-lg font-semibold mb-6">Pipeline by Status</h3>
              <div className="space-y-4">
                {STATUS_OPTIONS.map(status => {
                  const count = leads.filter(l => l.status === status).length;
                  const percentage = leads.length > 0 ? (count / leads.length) * 100 : 0;
                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{status}</span>
                        <span className="text-gray-500">{count} leads</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          className={cn("h-full rounded-full", STATUS_COLORS[status].split(' ')[0])}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : view === 'leads' ? (
          <div className="bg-white rounded-2xl border border-[#E1E2E4] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-bottom border-[#E1E2E4]">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E1E2E4]">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading leads...</td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No leads found.</td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <React.Fragment key={lead.id}>
                        <tr className="hover:bg-gray-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-900">{lead.name}</span>
                              <span className="text-xs text-gray-500">{lead.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", STATUS_COLORS[lead.status])}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-900">${lead.value.toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Building2 size={14} />
                              <span className="text-sm">{lead.company || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => researchLead(lead)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="AI Research"
                              >
                                <Search size={18} />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedLeadForNotes(lead);
                                  fetchLeadNotes(lead.id);
                                }}
                                className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="View Notes Log"
                              >
                                <ListFilter size={18} />
                              </button>
                              <button 
                                onClick={() => analyzeLead(lead)}
                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                title="AI Analysis"
                              >
                                <Sparkles size={18} />
                              </button>
                              <button 
                                onClick={() => { setEditingLead(lead); setIsModalOpen(true); }}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {aiAnalysis?.id === lead.id && (
                          <tr>
                            <td colSpan={5} className="px-6 py-4 bg-indigo-50/50">
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-white rounded-xl border border-indigo-100 shadow-sm"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm">
                                    {aiAnalysis.type === 'research' ? <Search size={16} /> : <Sparkles size={16} />}
                                    {aiAnalysis.type === 'research' ? 'Lead Research Report' : 'AI Insights'}
                                  </div>
                                  <button onClick={() => setAiAnalysis(null)} className="text-gray-400 hover:text-gray-600">
                                    <X size={16} />
                                  </button>
                                </div>
                                <div className="prose prose-sm max-w-none text-gray-600">
                                  <Markdown>{aiAnalysis.text}</Markdown>
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#E1E2E4]">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-indigo-600" size={20} />
                  Upcoming Meetings
                </h3>
                <div className="space-y-3">
                  {meetings.filter(m => !m.is_completed).length === 0 ? (
                    <p className="text-gray-500 text-sm py-4">No upcoming meetings scheduled.</p>
                  ) : (
                    meetings.filter(m => !m.is_completed).map(meeting => (
                      <MeetingItem 
                        key={meeting.id} 
                        meeting={meeting} 
                        isRecording={isRecording && recordingMeetingId === meeting.id}
                        isTranscribing={isTranscribing && recordingMeetingId === meeting.id}
                        isGeneratingPodcast={isGeneratingPodcast === meeting.id}
                        isGeneratingInfographic={isGeneratingInfographic === meeting.id}
                        onToggle={() => handleToggleMeetingComplete(meeting)}
                        onEdit={() => { setEditingMeeting(meeting); setIsMeetingModalOpen(true); }}
                        onDelete={() => handleDeleteMeeting(meeting.id)}
                        onStartRecord={() => startRecording(meeting.id)}
                        onStopRecord={stopRecording}
                        onFileUpload={(e) => {
                          setRecordingMeetingId(meeting.id);
                          handleFileUpload(meeting.id, e);
                        }}
                        onGeneratePodcast={() => generateBriefingPodcast(meeting)}
                        onGenerateInfographic={() => generatePrepInfographic(meeting)}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E1E2E4]">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-600" size={20} />
                  Completed Events
                </h3>
                <div className="space-y-3">
                  {meetings.filter(m => m.is_completed).length === 0 ? (
                    <p className="text-gray-500 text-sm py-4">No completed meetings yet.</p>
                  ) : (
                    meetings.filter(m => m.is_completed).map(meeting => (
                      <MeetingItem 
                        key={meeting.id} 
                        meeting={meeting} 
                        isRecording={isRecording && recordingMeetingId === meeting.id}
                        isTranscribing={isTranscribing && recordingMeetingId === meeting.id}
                        isGeneratingPodcast={isGeneratingPodcast === meeting.id}
                        isGeneratingInfographic={isGeneratingInfographic === meeting.id}
                        onToggle={() => handleToggleMeetingComplete(meeting)}
                        onEdit={() => { setEditingMeeting(meeting); setIsMeetingModalOpen(true); }}
                        onDelete={() => handleDeleteMeeting(meeting.id)}
                        onStartRecord={() => startRecording(meeting.id)}
                        onStopRecord={stopRecording}
                        onFileUpload={(e) => {
                          setRecordingMeetingId(meeting.id);
                          handleFileUpload(meeting.id, e);
                        }}
                        onGeneratePodcast={() => generateBriefingPodcast(meeting)}
                        onGenerateInfographic={() => generatePrepInfographic(meeting)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Lead Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-[#E1E2E4] flex items-center justify-between">
                <h3 className="text-xl font-bold">{editingLead ? 'Edit Lead' : 'Add New Lead'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveLead} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                    <input 
                      name="name"
                      required
                      defaultValue={editingLead?.name}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Company</label>
                    <input 
                      name="company"
                      defaultValue={editingLead?.company}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                    <input 
                      name="email"
                      type="email"
                      defaultValue={editingLead?.email}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                    <input 
                      name="phone"
                      defaultValue={editingLead?.phone}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                    <select 
                      name="status"
                      defaultValue={editingLead?.status || 'New'}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    >
                      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Deal Value ($)</label>
                    <input 
                      name="value"
                      type="number"
                      step="0.01"
                      defaultValue={editingLead?.value}
                      className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Notes</label>
                  <textarea 
                    name="notes"
                    rows={3}
                    defaultValue={editingLead?.notes}
                    className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-[#E1E2E4] text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                  >
                    {editingLead ? 'Update Lead' : 'Create Lead'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Meeting Modal */}
      <AnimatePresence>
        {isMeetingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMeetingModalOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-[#E1E2E4] flex items-center justify-between">
                <h3 className="text-xl font-bold">{editingMeeting ? 'Edit Meeting' : 'Schedule Meeting'}</h3>
                <button onClick={() => setIsMeetingModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveMeeting} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Associate with Lead</label>
                  <select 
                    name="lead_id"
                    required
                    defaultValue={editingMeeting?.lead_id}
                    className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="">Select a lead...</option>
                    {leads.map(lead => (
                      <option key={lead.id} value={lead.id}>{lead.name} ({lead.company})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Meeting Title</label>
                  <input 
                    name="title"
                    required
                    placeholder="e.g. Discovery Call, Product Demo"
                    defaultValue={editingMeeting?.title}
                    className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Date & Time</label>
                  <input 
                    name="meeting_date"
                    type="datetime-local"
                    required
                    defaultValue={editingMeeting?.meeting_date}
                    className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Meeting Notes / Agenda</label>
                  <textarea 
                    name="notes"
                    rows={4}
                    placeholder="What was discussed? Next steps?"
                    defaultValue={editingMeeting?.notes}
                    className="w-full px-4 py-2 bg-gray-50 border border-[#E1E2E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsMeetingModalOpen(false)}
                    className="flex-1 px-4 py-2.5 border border-[#E1E2E4] text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
                  >
                    {editingMeeting ? 'Update Meeting' : 'Schedule Meeting'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notes Log Modal */}
      <AnimatePresence>
        {selectedLeadForNotes && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLeadForNotes(null)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-[#E1E2E4] flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h3 className="text-xl font-bold">Notes Log</h3>
                  <p className="text-sm text-gray-500">{selectedLeadForNotes.name} • {selectedLeadForNotes.company}</p>
                </div>
                <button onClick={() => setSelectedLeadForNotes(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                <div className="space-y-4">
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const content = new FormData(form).get('note') as string;
                      if (!content.trim()) return;
                      await addLeadNote(selectedLeadForNotes.id, content);
                      form.reset();
                    }}
                    className="bg-white p-4 rounded-2xl border border-[#E1E2E4] shadow-sm"
                  >
                    <textarea 
                      name="note"
                      placeholder="Add a new note..."
                      rows={2}
                      className="w-full px-0 py-0 bg-transparent border-none focus:ring-0 text-sm resize-none"
                    />
                    <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                      <button 
                        type="submit"
                        className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Add Note
                      </button>
                    </div>
                  </form>

                  {leadNotes.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <AlertCircle className="mx-auto mb-2 opacity-20" size={48} />
                      <p>No notes in the log yet.</p>
                    </div>
                  ) : (
                    leadNotes.map((note) => (
                      <div key={note.id} className="bg-white p-4 rounded-2xl border border-[#E1E2E4] shadow-sm relative group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              note.type === 'meeting' ? "bg-blue-100 text-blue-700" :
                              note.type === 'analysis' ? "bg-purple-100 text-purple-700" :
                              note.type === 'research' ? "bg-emerald-100 text-emerald-700" :
                              "bg-gray-100 text-gray-700"
                            )}>
                              {note.type}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {new Date(note.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <Markdown>{note.content}</Markdown>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Infographic Modal */}
      <AnimatePresence>
        {infographicUrl && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfographicUrl(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-[#E1E2E4] flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <ImageIcon className="text-indigo-600" size={20} />
                  <h3 className="text-xl font-bold">Meeting Prep Infographic</h3>
                </div>
                <button onClick={() => setInfographicUrl(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex flex-col items-center">
                <img 
                  src={infographicUrl.url} 
                  alt="Meeting Prep Infographic" 
                  className="w-full max-w-full h-auto rounded-xl shadow-2xl border border-gray-200"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-4 bg-white border-t border-[#E1E2E4] flex justify-end">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = infographicUrl.url;
                    link.download = `infographic-meeting-${infographicUrl.id}.png`;
                    link.click();
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Upload size={16} className="rotate-180" />
                  Download Infographic
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Analyzing & Researching Overlays */}
      <AnimatePresence>
        {(isAnalyzing || isResearching || isGeneratingInfographic) && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-indigo-600"
              >
                {isResearching ? <Search size={48} /> : isGeneratingInfographic ? <ImageIcon size={48} /> : <Sparkles size={48} />}
              </motion.div>
              <p className="text-lg font-semibold text-indigo-900">
                {isResearching ? 'Gemini is researching lead details...' : 
                 isGeneratingInfographic ? 'Nano Banana is crafting your infographic...' :
                 'AI is analyzing lead data...'}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E1E2E4] flex items-start gap-4">
      <div className="p-3 bg-gray-50 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function ChatView({ leads, meetings }: { leads: Lead[]; meetings: Meeting[] }) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Hello! I'm your LeadFlow AI assistant. I have access to all your leads and meetings. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      const context = `
        Current Leads: ${JSON.stringify(leads.map(l => ({ name: l.name, company: l.company, status: l.status, value: l.value })))}
        Upcoming Meetings: ${JSON.stringify(meetings.map(m => ({ title: m.title, lead: m.lead_name, date: m.meeting_date, completed: m.is_completed })))}
      `;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are LeadFlow AI, a helpful sales assistant. 
          You have access to the user's CRM data. 
          Context: ${context}
          
          Answer questions about leads, meetings, and sales performance. 
          Be concise, professional, and helpful. 
          If asked about specific leads or meetings, use the provided context.
          If asked for advice, provide strategic sales recommendations based on the data.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-2xl border border-[#E1E2E4] overflow-hidden shadow-sm">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex",
            msg.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[80%] p-4 rounded-2xl text-sm",
              msg.role === 'user' 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-gray-100 text-gray-800 rounded-tl-none"
            )}>
              <div className="markdown-body">
                <Markdown>{msg.text}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-indigo-600" />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#E1E2E4] bg-gray-50">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask about your leads or meetings..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 bg-white border border-[#E1E2E4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shadow-sm shadow-indigo-200"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MeetingItem({ 
  meeting, 
  isRecording, 
  isTranscribing, 
  isGeneratingPodcast,
  isGeneratingInfographic,
  onToggle, 
  onEdit, 
  onDelete, 
  onStartRecord, 
  onStopRecord, 
  onFileUpload,
  onGeneratePodcast,
  onGenerateInfographic
}: { 
  meeting: Meeting; 
  isRecording: boolean;
  isTranscribing: boolean;
  isGeneratingPodcast: boolean;
  isGeneratingInfographic: boolean;
  onToggle: () => void; 
  onEdit: () => void; 
  onDelete: () => void;
  onStartRecord: () => void;
  onStopRecord: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGeneratePodcast: () => void;
  onGenerateInfographic: () => void;
}) {
  const date = new Date(meeting.meeting_date);
  const isPast = date < new Date() && !meeting.is_completed;
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all flex items-start gap-4",
      meeting.is_completed ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-[#E1E2E4] hover:border-indigo-200 shadow-sm"
    )}>
      <button 
        onClick={onToggle}
        className={cn(
          "mt-1 p-1 rounded-full transition-colors",
          meeting.is_completed ? "text-emerald-600 bg-emerald-50" : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
        )}
      >
        {meeting.is_completed ? <CheckCircle size={20} /> : <Circle size={20} />}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className={cn("font-semibold truncate", meeting.is_completed && "line-through text-gray-500")}>
            {meeting.title}
          </h4>
          <div className="flex items-center gap-1">
            {isTranscribing || isGeneratingPodcast || isGeneratingInfographic ? (
              <Loader2 size={14} className="animate-spin text-indigo-600" />
            ) : isRecording ? (
              <button onClick={onStopRecord} className="p-1 text-rose-600 bg-rose-50 rounded animate-pulse">
                <Square size={14} />
              </button>
            ) : (
              <>
                <button 
                  onClick={onGenerateInfographic} 
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded" 
                  title="Generate Prep Infographic"
                >
                  <ImageIcon size={14} />
                </button>
                <button 
                  onClick={onGeneratePodcast} 
                  className="p-1 text-indigo-600 hover:bg-indigo-50 rounded" 
                  title="Generate Briefing Podcast"
                >
                  <Headphones size={14} />
                </button>
                <button onClick={onStartRecord} className="p-1 text-gray-400 hover:text-indigo-600 rounded" title="Record Voice Note">
                  <Mic size={14} />
                </button>
                <button onClick={() => fileInputRef.current?.click()} className="p-1 text-gray-400 hover:text-indigo-600 rounded" title="Upload Voice Note">
                  <Upload size={14} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="audio/*" 
                  onChange={onFileUpload} 
                />
              </>
            )}
            <button onClick={onEdit} className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <Edit2 size={14} />
            </button>
            <button onClick={onDelete} className="p-1 text-gray-400 hover:text-rose-600 rounded">
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {meeting.lead_name} ({meeting.lead_company})
          </span>
          <span className={cn("flex items-center gap-1", isPast && "text-rose-600 font-medium")}>
            <Clock size={12} />
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {meeting.notes && (
          <div className="mt-2 text-sm text-gray-600 line-clamp-3 prose prose-sm max-w-none italic">
            <Markdown>{meeting.notes}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}
