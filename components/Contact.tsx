
import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle, Linkedin, MessageCircle, User, Type, AlignLeft, AtSign, LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { sendEmail } from '../services/emailService';

// Extract InputField outside the main component to prevent re-renders causing focus loss
interface InputFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  type?: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ 
  id, 
  label, 
  icon: Icon, 
  type = "text", 
  value, 
  error, 
  placeholder,
  onChange 
}: InputFieldProps) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1 block">
      {label}
    </label>
    <div className={`relative group transition-all duration-300 ${error ? 'shake' : ''}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors duration-300 pointer-events-none">
        <Icon size={18} />
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full pl-11 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 
          border transition-all duration-300 outline-none
          text-slate-900 dark:text-white placeholder:text-slate-400/60 font-medium text-sm
          shadow-sm hover:border-slate-300 dark:hover:border-slate-600
          ${error 
            ? 'border-red-400 bg-red-50/50 dark:bg-red-900/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
            : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 dark:focus:border-primary-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10'
          }
        `}
      />
      {error && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-pulse pointer-events-none">
          <AlertCircle size={18} />
        </div>
      )}
    </div>
    {error && <p className="text-red-500 text-xs font-bold ml-1 animate-in slide-in-from-top-1">{error}</p>}
  </div>
);

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const validate = () => {
    const newErrors = { name: '', email: '', subject: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Subject is optional now
    // if (!formData.subject.trim()) {
    //   newErrors.subject = 'Subject is required';
    //   isValid = false;
    // }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Reset status if they start typing after a success/error
    if (status !== 'idle' && status !== 'submitting') {
        setStatus('idle');
        setResponseMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setStatus('submitting');
    setResponseMessage('');

    try {
      const response = await sendEmail(formData);
      
      setResponseMessage(response.reply);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
        setResponseMessage('');
      }, 15000);

    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="bg-white/10 dark:bg-slate-900/30 backdrop-blur-lg rounded-[3rem] p-8 md:p-12 overflow-hidden relative shadow-2xl border border-slate-200 dark:border-white/10">
           {/* Background Accents */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/20 dark:bg-primary-600/10 blur-[100px] rounded-full pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 dark:bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
             
             {/* Left Side - Text & Info */}
             <div className="flex flex-col justify-between h-full pt-4">
                <div>
                  <ScrollReveal variant="slide-right">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-snug pb-2">
                      <span className="block text-slate-900 dark:text-white mb-1">Let's build something</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-purple-600 inline-block">
                        extraordinary.
                      </span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-md leading-relaxed font-medium">
                      Have a project in mind? Looking for a consultant? Or just want to talk tech? I'm always open to discussing new projects and opportunities.
                    </p>
                  </ScrollReveal>

                  <ScrollReveal delay="delay-100" variant="fade-up">
                    <div className="space-y-4">
                      {/* Contact Items */}
                      <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-200/50 dark:hover:border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-all duration-300">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Me</p>
                          <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-all">{SOCIAL_LINKS.email}</p>
                        </div>
                      </a>

                      <a href={`tel:${SOCIAL_LINKS.phone}`} className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-200/50 dark:hover:border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white shadow-lg shadow-green-500/30 group-hover:scale-110 transition-all duration-300">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp</p>
                          <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{SOCIAL_LINKS.phone}</p>
                        </div>
                      </a>
                      
                      <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-200/50 dark:hover:border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0077b5] to-[#005582] flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-all duration-300">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LinkedIn</p>
                          <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#0077b5] dark:group-hover:text-[#0077b5] transition-colors">Connect Professionally</p>
                        </div>
                      </a>

                      <a href="https://maps.google.com/?q=Kondapur,+Hyderabad,+Telangana" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-slate-200/50 dark:hover:border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-all duration-300">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                          <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Kondapur, Hyderabad</p>
                        </div>
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
             </div>

             {/* Right Side - Form */}
             <div className="relative mt-8 lg:mt-0">
                <ScrollReveal delay="delay-200" variant="slide-left">
                   <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800">
                      
                      <div className="mb-8">
                         <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send a Message</h3>
                         <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">I usually respond within 24 hours.</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                         
                         <div className="grid md:grid-cols-2 gap-6">
                           <InputField 
                             id="name" 
                             label="Your Name" 
                             icon={User} 
                             value={formData.name} 
                             error={errors.name} 
                             onChange={handleChange} 
                             placeholder="John Doe"
                           />
                           <InputField 
                             id="email" 
                             label="Email Address" 
                             icon={AtSign} 
                             type="email" 
                             value={formData.email} 
                             error={errors.email} 
                             onChange={handleChange} 
                             placeholder="john@example.com"
                           />
                         </div>

                         <InputField 
                             id="subject" 
                             label="Subject (Optional)" 
                             icon={Type} 
                             value={formData.subject} 
                             error={errors.subject} 
                             onChange={handleChange} 
                             placeholder="Project Proposal / Inquiry"
                         />

                         <div className="space-y-2">
                            <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1 block">
                              Message
                            </label>
                            <div className={`relative group ${errors.message ? 'shake' : ''}`}>
                              <div className="absolute left-4 top-4 text-slate-400 group-focus-within:text-primary-500 transition-colors duration-300 pointer-events-none">
                                <AlignLeft size={18} />
                              </div>
                              <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={5}
                                placeholder="Tell me about your project..."
                                className={`
                                  w-full pl-11 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 
                                  border transition-all duration-300 outline-none resize-none
                                  text-slate-900 dark:text-white placeholder:text-slate-400/60 font-medium text-sm
                                  shadow-sm hover:border-slate-300 dark:hover:border-slate-600
                                  ${errors.message
                                    ? 'border-red-400 bg-red-50/50 dark:bg-red-900/10 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                                    : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 dark:focus:border-primary-400 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-primary-500/10'
                                  }
                                `}
                              />
                              {errors.message && (
                                <div className="absolute right-4 top-4 text-red-500 animate-pulse pointer-events-none">
                                  <AlertCircle size={18} />
                                </div>
                              )}
                            </div>
                            {errors.message && <p className="text-red-500 text-xs font-bold ml-1 animate-in slide-in-from-top-1">{errors.message}</p>}
                         </div>

                         {/* Submit Button */}
                         <div className="pt-2">
                           <button
                              type="submit"
                              disabled={status === 'submitting' || status === 'success'}
                              className={`
                                group w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl shadow-primary-500/20 
                                transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]
                                flex items-center justify-center gap-2 relative overflow-hidden
                                ${status === 'success' ? 'bg-green-500 cursor-default' : 'bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-500'}
                                disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                              `}
                           >
                              {status === 'submitting' ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  <span>Sending...</span>
                                </>
                              ) : status === 'success' ? (
                                <>
                                  <CheckCircle className="w-5 h-5" />
                                  <span>Message Sent Successfully!</span>
                                </>
                              ) : (
                                <>
                                  <span>Send Message</span>
                                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </>
                              )}
                           </button>
                         </div>

                         {/* Status Messages */}
                         {responseMessage && (
                           <div className={`p-4 rounded-xl text-sm font-medium text-center animate-in fade-in slide-in-from-bottom-2 ${
                             status === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                           }`}>
                             {responseMessage}
                           </div>
                         )}
                      </form>
                   </div>
                </ScrollReveal>
             </div>

           </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
