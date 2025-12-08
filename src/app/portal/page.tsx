"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { 
  FaLock, FaSignInAlt,
  FaTh, FaFolderOpen, FaComments, 
  FaReceipt, FaSignOutAlt, FaBell, 
  FaCheckSquare, FaFileAlt, FaFile,
  FaBars
} from 'react-icons/fa';

const getPortalContent = (lang: string) => {
  const content = {
    tr: {
      title: "Müşteri Erişimi",
      subtitle: "Güvenli kimlik bilgilerinizi girin.",
      clientIdLabel: "MÜŞTERİ ID / E-POSTA",
      passwordLabel: "ŞİFRE",
      loginButton: "Güvenli Giriş",
      backToWebsite: "← Web Sitesine Dön",
      portalTitle: "ALVOLO PORTAL",
      mainSection: "ANA",
      overview: "Genel Bakış",
      documents: "Belgeler",
      advisoryChat: "Danışmanlık Sohbeti",
      financeSection: "FİNANS",
      invoices: "Faturalar",
      logOut: "Çıkış Yap",
      projectDashboard: "Proje Panosu",
      currentPhase: "MEVCUT AŞAMA",
      phaseTitle: "Kuruluş: Aşama 2/4",
      phaseDescription: "Milano'da Noter Onayı Bekleniyor.",
      actionRequired: "Gerekli İşlem",
      signArticles: "Ana Sözleşmeyi İmzala",
      signNow: "Şimdi İmzala",
      uploadPassport: "Pasaport Kopyası Yükle",
      completed: "TAMAMLANDI",
      recentFiles: "Son Dosyalar",
      draftStatute: "Taslak_Statü_v2.pdf",
      added2HoursAgo: "2 saat önce eklendi",
      taxIdCertificate: "Vergi_Kimlik_Sertifikası.pdf",
      addedYesterday: "Dün eklendi",
      financialProjections: "Finansal Projeksiyonlar (1. Yıl)"
    },
    en: {
      title: "Client Access",
      subtitle: "Enter your secure credentials.",
      clientIdLabel: "CLIENT ID / EMAIL",
      passwordLabel: "PASSWORD",
      loginButton: "Secure Login",
      backToWebsite: "← Back to Website",
      portalTitle: "ALVOLO PORTAL",
      mainSection: "MAIN",
      overview: "Overview",
      documents: "Documents",
      advisoryChat: "Advisory Chat",
      financeSection: "FINANCE",
      invoices: "Invoices",
      logOut: "Log Out",
      projectDashboard: "Project Dashboard",
      currentPhase: "CURRENT PHASE",
      phaseTitle: "Incorporation: Stage 2/4",
      phaseDescription: "Pending Notary Approval in Milan.",
      actionRequired: "Action Required",
      signArticles: "Sign Articles of Association",
      signNow: "Sign Now",
      uploadPassport: "Upload Passport Copy",
      completed: "COMPLETED",
      recentFiles: "Recent Files",
      draftStatute: "Draft_Statute_v2.pdf",
      added2HoursAgo: "Added 2 hours ago",
      taxIdCertificate: "Tax_ID_Certificate.pdf",
      addedYesterday: "Added yesterday",
      financialProjections: "Financial Projections (Year 1)"
    },
    it: {
      title: "Accesso Cliente",
      subtitle: "Inserisci le tue credenziali sicure.",
      clientIdLabel: "ID CLIENTE / EMAIL",
      passwordLabel: "PASSWORD",
      loginButton: "Accesso Sicuro",
      backToWebsite: "← Torna al Sito Web",
      portalTitle: "ALVOLO PORTAL",
      mainSection: "PRINCIPALE",
      overview: "Panoramica",
      documents: "Documenti",
      advisoryChat: "Chat Consulenza",
      financeSection: "FINANZA",
      invoices: "Fatture",
      logOut: "Esci",
      projectDashboard: "Dashboard Progetto",
      currentPhase: "FASE CORRENTE",
      phaseTitle: "Costituzione: Fase 2/4",
      phaseDescription: "In attesa di approvazione notarile a Milano.",
      actionRequired: "Azione Richiesta",
      signArticles: "Firma Statuto",
      signNow: "Firma Ora",
      uploadPassport: "Carica Copia Passaporto",
      completed: "COMPLETATO",
      recentFiles: "File Recenti",
      draftStatute: "Bozza_Statuto_v2.pdf",
      added2HoursAgo: "Aggiunto 2 ore fa",
      taxIdCertificate: "Certificato_ID_Fiscale.pdf",
      addedYesterday: "Aggiunto ieri",
      financialProjections: "Proiezioni Finanziarie (Anno 1)"
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

export default function PortalPage() {
  const { language } = useLanguage();
  const c = getPortalContent(language);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('demo@client.com');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-[#0B1120]/90 backdrop-blur-sm"></div>

        <div className="relative w-full max-w-md p-8 glass-panel rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded bg-gradient-to-br from-[#3c77ad] to-[#f58643] flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">{c.title}</h1>
            <p className="text-slate-400 text-sm mt-2">{c.subtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono mb-1" style={{color: '#64748b'}}>
                {c.clientIdLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3c77ad] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{color: '#64748b'}}>
                {c.passwordLabel}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#3c77ad] transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#3c77ad] text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {language === 'tr' ? 'Doğrulanıyor...' : language === 'it' ? 'Verifica...' : 'Verifying...'}
                </>
              ) : (
                <>
                  <FaSignInAlt className="w-4 h-4" />
                  {c.loginButton}
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-xs hover:text-white transition-colors" style={{color: '#64748b'}}>
              {c.backToWebsite}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="flex-1 flex">
        {/* SIDEBAR */}
        <aside className="w-64 border-r hidden md:flex flex-col" style={{ borderColor: 'var(--border-secondary)', backgroundColor: 'var(--bg-surface)' }}>
          <div className="h-16 flex items-center px-6 border-b" style={{borderColor: '#1e293b'}}>
            <span className="font-bold text-lg tracking-tight">
              ALVOLO <span style={{color: '#3c77ad'}}>PORTAL</span>
            </span>
          </div>
          
          <div className="p-4 space-y-2">
            <div className="text-xs font-mono px-3 py-2" style={{color: '#475569'}}>{c.mainSection}</div>
            <a href="#" className="sidebar-link active flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-white transition-colors" style={{backgroundColor: 'rgba(60, 119, 173, 0.1)', borderRight: '2px solid #3c77ad', color: 'white'}}>
              <FaTh className="w-4 h-4" />
              {c.overview}
            </a>
            <a href="#" className="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-white transition-colors" style={{color: '#94a3b8'}}>
              <FaFolderOpen className="w-4 h-4" />
              {c.documents}
            </a>
            <a href="#" className="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-white transition-colors" style={{color: '#94a3b8'}}>
              <FaComments className="w-4 h-4" />
              {c.advisoryChat}
              <span className="ml-auto w-2 h-2 rounded-full bg-[#f58643]"></span>
            </a>
            
            <div className="text-xs font-mono px-3 py-2 mt-6" style={{color: '#475569'}}>{c.financeSection}</div>
            <a href="#" className="sidebar-link flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 hover:text-white transition-colors" style={{color: '#94a3b8'}}>
              <FaReceipt className="w-4 h-4" />
              {c.invoices}
            </a>
          </div>

          <div className="mt-auto p-4 border-t" style={{borderColor: '#1e293b'}}>
            <Link href="/" className="flex items-center gap-3 hover:text-white transition-colors text-sm" style={{color: '#64748b'}}>
              <FaSignOutAlt className="w-4 h-4" />
              {c.logOut}
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-y-auto" style={{ backgroundColor: 'var(--bg-primary)' }}>
          {/* Topbar */}
          <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md" style={{borderColor: '#1e293b', backgroundColor: 'rgba(11, 17, 32, 0.8)'}}>
            <div className="flex items-center gap-4">
              <button className="md:hidden text-slate-400">
                <FaBars className="w-6 h-6" />
              </button>
              <h2 className="text-white font-medium">{c.projectDashboard}</h2>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative text-slate-400 hover:text-white">
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#f58643] rounded-full"></span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">JD</div>
                <span className="text-sm text-slate-300 hidden sm:inline">John Doe (S.r.l.)</span>
              </div>
            </div>
          </header>

          {/* Content Grid */}
          <div className="p-8 max-w-6xl mx-auto w-full">
            {/* Status Banner */}
            <div className="glass-panel p-6 rounded-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-xs font-mono mb-1" style={{color: '#64748b'}}>{c.currentPhase}</div>
                <h3 className="text-2xl font-bold text-white">{c.phaseTitle}</h3>
                <p className="text-slate-400 text-sm mt-1">{c.phaseDescription}</p>
              </div>
              <div className="w-full md:w-64 bg-slate-800 h-3 rounded-full overflow-hidden">
                <div className="bg-[#3c77ad] h-full rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Action Items */}
              <div className="glass-panel p-6 rounded-xl lg:col-span-2">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <FaCheckSquare className="w-4 h-4" style={{color: '#f58643'}} />
                  {c.actionRequired}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded border" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)', borderColor: 'rgba(245, 134, 67, 0.3)'}}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#f58643] animate-pulse"></div>
                      <span className="text-sm text-white">{c.signArticles}</span>
                    </div>
                    <button className="text-xs bg-[#f58643] text-white px-3 py-1.5 rounded hover:bg-[#d97335]">
                      {c.signNow}
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded border" style={{backgroundColor: 'rgba(15, 23, 42, 0.5)', borderColor: '#1e293b'}}>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                      <span className="text-sm text-slate-300">{c.uploadPassport}</span>
                    </div>
                    <span className="text-xs text-green-500 font-mono">{c.completed}</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Quick Docs */}
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <FaFileAlt className="w-4 h-4" style={{color: '#3c77ad'}} />
                  {c.recentFiles}
                </h4>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800/50 group transition-colors">
                    <FaFile className="w-4 h-4 group-hover:text-[#3c77ad] transition-colors" style={{color: '#64748b'}} />
                    <div>
                      <div className="text-sm text-slate-200">{c.draftStatute}</div>
                      <div className="text-[10px]" style={{color: '#64748b'}}>{c.added2HoursAgo}</div>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded hover:bg-slate-800/50 group transition-colors">
                    <FaFile className="w-4 h-4 group-hover:text-[#3c77ad] transition-colors" style={{color: '#64748b'}} />
                    <div>
                      <div className="text-sm text-slate-200">{c.taxIdCertificate}</div>
                      <div className="text-[10px]" style={{color: '#64748b'}}>{c.addedYesterday}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Data Viz */}
            <div className="mt-6 glass-panel p-6 rounded-xl border" style={{borderColor: '#1e293b'}}>
              <h4 className="text-white font-bold mb-4">{c.financialProjections}</h4>
              {/* Simple CSS Chart */}
              <div className="flex items-end justify-between h-32 gap-2 mt-4 px-2">
                <div className="w-full bg-slate-800 rounded-t h-[20%] group relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100">€2k</span>
                </div>
                <div className="w-full bg-slate-800 rounded-t h-[35%] group relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100">€5k</span>
                </div>
                <div className="w-full rounded-t h-[50%] group relative" style={{backgroundColor: 'rgba(60, 119, 173, 0.3)'}}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#3c77ad] opacity-0 group-hover:opacity-100">€12k</span>
                </div>
                <div className="w-full rounded-t h-[75%] group relative" style={{backgroundColor: 'rgba(60, 119, 173, 0.6)'}}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#3c77ad] opacity-0 group-hover:opacity-100">€24k</span>
                </div>
                <div className="w-full bg-[#f58643] rounded-t h-[90%] group relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#f58643] font-bold opacity-0 group-hover:opacity-100">€45k</span>
                </div>
              </div>
              <div className="flex justify-between text-xs font-mono mt-2 px-2" style={{color: '#64748b'}}>
                <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span><span>Y2</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

