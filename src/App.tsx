import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Server, 
  Bot, 
  Clock, 
  GitMerge, 
  Box, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Code2,
  Github,
  Linkedin,
  Globe
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, ...props }: { children: React.ReactNode, delay?: number } & React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    {...props}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [chatStep, setChatStep] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const timer1 = setTimeout(() => setChatStep(1), 1000);
    const timer2 = setTimeout(() => setChatStep(2), 2000);
    const timer3 = setTimeout(() => setChatStep(3), 3500);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  const handleApprove = () => {
    setIsApproved(true);
    setTimeout(() => {
      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setIsApproved(false);
        setChatStep(0);
        setTimeout(() => setChatStep(1), 1000);
        setTimeout(() => setChatStep(2), 2000);
        setTimeout(() => setChatStep(3), 3500);
      }, 2000);
    }, 1500);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Store email in localStorage as a simple "database"
      const waitlist = JSON.parse(localStorage.getItem('orkestral_waitlist') || '[]');
      if (!waitlist.includes(email)) {
        waitlist.push(email);
        localStorage.setItem('orkestral_waitlist', JSON.stringify(waitlist));
      }
      const subject = 'Interesse no Orkestral (Lista de Espera)';
      const body = [
        'Olá, equipe Orkestral!',
        '',
        'Tenho interesse em participar da lista de espera do MVP.',
        '',
        `Meu e-mail: ${email}`,
        '',
        'Obrigado!'
      ].join('\n');
      const mailtoUrl = `mailto:orkestrala.i@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      setSubmitMessage('Obrigado! Abrimos seu e-mail com uma mensagem pronta.');
      setEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage('Erro ao abrir o e-mail. Tente novamente ou envie para orkestrala.i@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const logoUrl = new URL('../assets/images/logo.png', import.meta.url).href;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl tracking-tight cursor-pointer" onClick={handleScrollToTop}>
            <img src={logoUrl} alt="Orkestral" className="h-10 w-auto rounded-md" />
            <span>Orkestral</span>
          </div>
          <a href="#waitlist" className="text-sm font-medium hover:text-emerald-400 transition-colors">
            Acesso Antecipado
          </a>
        </div>
      </nav>

      <main>
        {/* A. Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sm text-slate-300 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Soberania Técnica & Redução de Atrito
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Transforme ideias em serviços <br className="hidden lg:block" />
                rodando em <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">minutos, não dias.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                Automação guiada por IA para criar e gerenciar APIs, Containers e Infraestrutura sem perder o controle. Foque no código, nós cuidamos do deploy.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#waitlist" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 group">
                  Quero simplificar minha operação
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#solution" className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-medium rounded-lg transition-all flex items-center justify-center">
                  Entenda como funciona
                </a>
              </div>
            </motion.div>

            {/* Visual Suggestion: Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-20 relative mx-auto max-w-5xl"
            >
              <div className="h-[500px] sm:h-[540px] rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden shadow-2xl relative flex flex-col">
                <div className="h-12 border-b border-slate-800 bg-slate-950 flex items-center px-4 gap-2 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="w-3 h-3 rounded-full bg-slate-800" />
                  <div className="ml-4 text-xs font-mono text-slate-500">IA Architect Chat</div>
                </div>
                <div className="flex-1 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto relative text-left bg-slate-950/50">
                  {/* User Message */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20, scale: 0.9 }} 
                    animate={{ opacity: chatStep >= 1 ? 1 : 0, x: chatStep >= 1 ? 0 : 20, scale: chatStep >= 1 ? 1 : 0.9 }} 
                    className="self-end bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-md"
                  >
                    Suba uma API Node.js com PostgreSQL para gerenciar usuários.
                  </motion.div>

                  {/* AI Typing */}
                  {chatStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20, scale: 0.9 }} 
                      animate={{ opacity: 1, x: 0, scale: 1 }} 
                      className="self-start bg-slate-900 border border-slate-800 text-slate-400 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2 shadow-md"
                    >
                      <Bot className="w-4 h-4 text-emerald-500" />
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </motion.div>
                  )}

                  {/* AI Response */}
                  {chatStep >= 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20, scale: 0.9 }} 
                      animate={{ opacity: 1, x: 0, scale: 1 }} 
                      className="self-start bg-slate-900 border border-slate-800 text-slate-300 p-4 sm:p-5 rounded-2xl rounded-tl-sm max-w-[95%] w-full shadow-xl"
                    >
                      <div className="flex items-center gap-2 mb-3 text-emerald-400 font-medium">
                        <Bot className="w-5 h-5" />
                        <span>Orkestral AI</span>
                      </div>
                      <p className="mb-4 text-sm text-slate-300">Entendido! Aqui está o plano de execução para a sua arquitetura:</p>
                      
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm relative overflow-hidden">
                        {isApproved && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", bounce: 0.5 }}
                            >
                              <CheckCircle className="w-12 h-12 text-emerald-400 mb-2 mx-auto" />
                            </motion.div>
                            <span className="text-emerald-400 font-bold text-lg">Deploy Iniciado!</span>
                            <span className="text-emerald-500/70 text-xs mt-1">Redirecionando para a lista de espera...</span>
                          </motion.div>
                        )}

                        <div className="space-y-3 text-slate-400">
                          <div className="flex gap-3"><span className="text-emerald-400">+</span> <span>Criar container Docker (Node.js 20)</span></div>
                          <div className="flex gap-3"><span className="text-emerald-400">+</span> <span>Configurar rota de API /v1/users</span></div>
                          <div className="flex gap-3"><span className="text-emerald-400">+</span> <span>Provisionar banco PostgreSQL</span></div>
                          <div className="flex gap-3"><span className="text-emerald-400">+</span> <span>Configurar variáveis de ambiente seguras</span></div>
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-end">
                          <button 
                            onClick={handleApprove}
                            className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors flex items-center gap-2 font-sans font-medium cursor-pointer"
                          >
                            <Zap className="w-4 h-4" />
                            Aprovar e Executar
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* B. O Problema */}
        <section className="py-24 bg-slate-900/50 border-y border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">O Caos da Infraestrutura Tradicional</h2>
                <p className="text-slate-400 text-lg">
                  Comandos complexos, documentação defasada, configuração manual propensa a erros e a alta barreira técnica para subir um simples serviço estão drenando a energia da sua equipe.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Terminal, title: "Comandos Obscuros", desc: "Horas perdidas decifrando flags e configurações de CLI que mudam a cada versão." },
                { icon: Layers, title: "Silos de Conhecimento", desc: "Apenas um desenvolvedor sabe como fazer o deploy, criando gargalos na equipe." },
                { icon: ShieldCheck, title: "Erros Humanos", desc: "Configurações manuais que resultam em falhas de segurança ou indisponibilidade." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-6 text-red-400">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* C. A Solução: Os 4 Níveis de Automação */}
        <section id="solution" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Evolua no Seu Ritmo</h2>
                <p className="text-slate-400 text-lg max-w-2xl">
                  Nossa plataforma se adapta à sua maturidade técnica. Automação modular que cresce com você, sem impor caixas-pretas.
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { level: "Nível 1", name: "Assistido", title: "IA como seu Arquiteto", desc: "Descreva sua necessidade em linguagem natural e receba a arquitetura ideal recomendada." },
                { level: "Nível 2", name: "Semi-assistido", title: "Scripts Prontos", desc: "Templates otimizados e revisados para os casos de uso mais comuns, prontos para uso." },
                { level: "Nível 3", name: "Controlado", title: "Execução 1-Click", desc: "Deploy padronizado, seguro e rastreável com apenas um clique de aprovação." },
                { level: "Nível 4", name: "Orquestração", title: "Automação Total", desc: "Operação contínua sob sua supervisão e regras de negócio pré-definidas." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative p-8 rounded-2xl bg-slate-900 border border-slate-800 h-full flex flex-col">
                    <div className="text-emerald-400 font-mono text-sm font-semibold mb-2">{item.level}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-4">{item.name}</div>
                    <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.desc}</p>
                    
                    {i < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-slate-800" />
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* E. O Diferencial: Automação Transparente */}
        <section className="py-24 bg-slate-900/30 border-y border-slate-800/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Automação Transparente.<br/>Soberania Técnica Garantida.</h2>
                <div className="space-y-6 text-lg text-slate-400">
                  <p>
                    Diferente de outras IAs que operam como caixas-pretas, o Orkestral gera um <strong>Plano Técnico detalhado</strong> para sua aprovação antes de qualquer execução.
                  </p>
                  <p>
                    Você sempre sabe exatamente o que está sendo criado, modificado ou destruído. Redução de atrito com máxima rastreabilidade.
                  </p>
                </div>
                <ul className="mt-8 space-y-4">
                  {[
                    "Revisão de código antes do deploy",
                    "Logs de execução em tempo real",
                    "Rollback simplificado"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-2xl blur-2xl" />
                  <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-sm shadow-2xl">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                      <Code2 className="w-5 h-5 text-slate-400" />
                      <span className="text-slate-300">Plano de Execução Gerado</span>
                    </div>
                    {isApproved && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center z-10 backdrop-blur-sm"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                        >
                          <CheckCircle className="w-12 h-12 text-emerald-400 mb-2 mx-auto" />
                        </motion.div>
                        <span className="text-emerald-400 font-bold text-lg">Deploy Iniciado!</span>
                        <span className="text-emerald-500/70 text-xs mt-1">Redirecionando para a lista de espera...</span>
                      </motion.div>
                    )}
                    <div className="space-y-3 text-slate-400">
                      <div className="flex gap-4"><span className="text-emerald-400">+</span> <span>Criar container Docker (Node.js 20)</span></div>
                      <div className="flex gap-4"><span className="text-emerald-400">+</span> <span>Configurar rota de API /v1/users</span></div>
                      <div className="flex gap-4"><span className="text-emerald-400">+</span> <span>Provisionar banco de dados PostgreSQL</span></div>
                      <div className="flex gap-4"><span className="text-emerald-400">+</span> <span>Configurar variáveis de ambiente seguras</span></div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end gap-3">
                      <button className="px-4 py-2 text-slate-400 hover:text-white transition-colors">Revisar</button>
                      <button 
                        onClick={handleApprove}
                        className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded hover:bg-emerald-500/20 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Zap className="w-4 h-4" />
                        Aprovar e Executar
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* D. Tipos de Serviços */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">O Que Você Pode Criar Hoje?</h2>
                <p className="text-slate-400 text-lg">Tudo o que você precisa para rodar sua aplicação, em um só lugar.</p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
              {[
                { icon: Server, label: "APIs REST" },
                { icon: Box, label: "Microsserviços" },
                { icon: Bot, label: "Bots & Webhooks" },
                { icon: Clock, label: "Tarefas Cron" },
                { icon: GitMerge, label: "Pipelines CI/CD" },
                { icon: Layers, label: "Containers" }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800/50 transition-colors group cursor-default">
                    <item.icon className="w-10 h-10 text-slate-400 group-hover:text-emerald-400 transition-colors mb-4" />
                    <span className="font-medium text-slate-300 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* G. Sobre o Desenvolvedor */}
        <section className="py-24 bg-slate-900/50 border-t border-slate-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-800 border-4 border-slate-900 shadow-xl flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-slate-500">EC</span>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-mono mb-4">
                      Desenvolvedor & Arquiteto
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Eric Wellinton Fortes da Costa</h2>
                    <h3 className="text-lg md:text-xl text-slate-400 mb-6">Desenvolvedor Java | Programador Backend</h3>
                    
                    <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
                      Desenvolvedor com experiência prática em análise e desenvolvimento de sistemas de alta performance. 
                      Com expertise em <strong>Java, JavaScript (React) e Python</strong>, foco na otimização de processos e gestão de projetos técnicos. 
                      Possuo histórico comprovado na criação de automações que reduzem horas de trabalho manual, 
                      integração de múltiplos sistemas via APIs RESTful e implementação de arquiteturas inovadoras, 
                      incluindo modelos de IA locais (offline-first).
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4">
                      <a href="https://www.linkedin.com/in/ericcostaw/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 transition-colors font-medium text-sm">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </a>
                      <a href="https://github.com/EricFortesdaCosta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 transition-colors font-medium text-sm">
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                      <a href="https://ericfortesdacosta.github.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors font-medium text-sm">
                        <Globe className="w-4 h-4" />
                        Portfólio
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* F. Rodapé e Lista de Espera */}
        <section id="waitlist" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
          
          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
            <FadeIn>
              <Zap className="w-12 h-12 text-emerald-400 mx-auto mb-8" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Seja o Primeiro a Testar</h2>
              <p className="text-xl text-slate-400 mb-10">
                Junte-se à lista de espera exclusiva para o nosso MVP e revolucione a forma como você lida com infraestrutura.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail profissional" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-lg bg-slate-950 border border-slate-700 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all text-white placeholder:text-slate-500"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-600 text-slate-950 font-bold rounded-lg transition-all whitespace-nowrap disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Entrar na Lista'}
                </button>
              </form>
              {submitMessage && (
                <p className={`text-sm mt-4 ${submitMessage.includes('Erro') ? 'text-red-400' : 'text-emerald-400'}`}>
                  {submitMessage}
                </p>
              )}
              <p className="text-sm text-slate-500 mt-6">
                Vagas limitadas para o beta fechado. Sem spam, prometemos.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-800/50 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-300 cursor-pointer" onClick={handleScrollToTop}>
            <img src={logoUrl} alt="Orkestral" className="h-6 w-auto rounded-md" />
            <span>Orkestral</span>
          </div>
          <p>© {new Date().getFullYear()} Orkestral. Desenvolvido por <a href="https://www.linkedin.com/in/ericcostaw/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Eric Costa</a>. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
