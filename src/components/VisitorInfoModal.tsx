import { useState, createContext, useContext } from 'react';

export type VisitorModalData = {
  name?: string;
  email?: string;
  howFound?: string;
};

interface VisitorInfoModalProps {
  onSubmit: (data: VisitorModalData) => void;
  onSkip: () => void;
}

export const VisitorModalContext = createContext<{
  isVisitorModalOpen: boolean;
  setVisitorModalOpen: (open: boolean) => void;
}>({
  isVisitorModalOpen: false,
  setVisitorModalOpen: () => {},
});

const VisitorInfoModal = ({ onSubmit, onSkip }: VisitorInfoModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [howFound, setHowFound] = useState('');
  const [open, setOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('portfolio_visit_tracked', 'true');
    onSubmit({ name, email, howFound });
    setOpen(false);
  };

  const handleSkip = () => {
    localStorage.setItem('portfolio_visit_tracked', 'true');
    onSkip();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
      <div className="w-[95vw] max-w-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 dark:border-white/20 bg-black/60 dark:bg-white/10 shadow-xl flex flex-col gap-4">
        <div className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2">
          <span className="text-3xl">👋</span> <span>Welcome!</span>
        </div>
        <div className="text-base sm:text-lg text-center text-white/90 dark:text-white/80">
          We'd love to know a bit about you.<br/>All fields are optional.
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs sm:text-sm font-mono mb-1 text-white/70 dark:text-white/60">Name</label>
            <input
              className="w-full bg-transparent border-b border-white/20 focus:border-primary outline-none py-2 px-0 text-sm sm:text-base placeholder:text-white/40 dark:placeholder:text-white/30 transition"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name (optional)"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-mono mb-1 text-white/70 dark:text-white/60">Email</label>
            <input
              className="w-full bg-transparent border-b border-white/20 focus:border-primary outline-none py-2 px-0 text-sm sm:text-base placeholder:text-white/40 dark:placeholder:text-white/30 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email (optional)"
              type="email"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-mono mb-1 text-white/70 dark:text-white/60">How did you get to know about me?</label>
            <input
              className="w-full bg-transparent border-b border-white/20 focus:border-primary outline-none py-2 px-0 text-sm sm:text-base placeholder:text-white/40 dark:placeholder:text-white/30 transition"
              value={howFound}
              onChange={e => setHowFound(e.target.value)}
              placeholder="e.g. Google, LinkedIn, Friend..."
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-primary text-white font-bold py-2 rounded-lg shadow transition hover:bg-primary/90"
            >Continue</button>
            <button
              type="button"
              className="w-full sm:w-auto bg-transparent border border-white/20 text-white font-bold py-2 rounded-lg shadow transition hover:bg-white/10"
              onClick={handleSkip}
            >Skip</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitorInfoModal; 