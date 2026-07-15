"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from 'motion/react';
import { JetBrains_Mono } from 'next/font/google';
import { useTheme } from 'next-themes';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage, useTranslations } from "@/components/language-provider";

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

const ASCII_ART = `
███████╗██╗  ██╗███████╗███╗   ██╗██╗  ██╗██╗   ██╗ █████╗     ██╗     ██╗   ██╗
╚══███╔╝██║  ██║██╔════╝████╗  ██║██║  ██║██║   ██║██╔══██╗    ██║     ██║   ██║
  ███╔╝ ███████║█████╗  ██╔██╗ ██║███████║██║   ██║███████║    ██║     ██║   ██║
 ███╔╝  ██╔══██║██╔══╝  ██║╚██╗██║██╔══██║██║   ██║██╔══██║    ██║     ██║   ██║
███████╗██║  ██║███████╗██║ ╚████║██║  ██║╚██████╔╝██║  ██║    ███████╗╚██████╔╝
╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝    ╚══════╝ ╚═════╝
`;

interface CliInterfaceProps {
  onGuiCommand: () => void;
}

const ALIASES = {
  ls: 'projects',
  h: 'help',
  v: 'version',
  g: 'gui',
  a: 'about',
  s: 'skills',
  e: 'exp',
  p: 'projects',
  c: 'contact',
  t: 'theme',
};

type CommandValue = string | (() => string);

function makeLinksClickable(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

// Helper function to format command output
function formatCommandLine(line: string, currentTheme: string | undefined) {
  if (!line || !currentTheme) return line;
  if (line.startsWith('$')) {
    return (
      <>
        <span className={currentTheme === 'dark' ? 'text-fuchsia-500' : 'text-green-600 font-semibold'}>luzhenhua@dev:~</span>
        <span className={currentTheme === 'dark' ? 'text-green-400' : 'text-blue-600 font-semibold'}>$</span>
        {' '}{line.slice(1)}
      </>
    );
  }
  return makeLinksClickable(line);
}

export function CliInterface({ onGuiCommand }: CliInterfaceProps) {
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMounted, setIsMounted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);
  const { theme } = useTheme();
  const { data, locale } = useLanguage();
  const t = useTranslations();
  const delimiter = locale === "zh" ? "、" : ", ";
  const colon = locale === "zh" ? "：" : ": ";
  const copyTooltip = locale === "zh" ? "复制到剪贴板" : "Copy to clipboard";
  const copiedLabel = locale === "zh" ? "已复制!" : "Copied!";

  const commands = useMemo<Record<string, CommandValue>>(
    () => ({
      help: t("cliHelp"),
      about: () => `${data.name}\n${data.description}\n\n${data.summary}`,
      skills: () => `${t("cliSkillsHeading")}:\n${data.skills.join(delimiter)}`,
      projects: () =>
        data.projects
          .map(
            (project) =>
              `\n${project.title}\n${project.description}\n${t("cliProjectsTechLabel")}${colon}${project.technologies.join(delimiter)}\n`
          )
          .join("\n"),
      contact: () => `${t("cliContactLabel")}${colon}${data.contact.email}`,
      social: () =>
        Object.values(data.contact.social)
          .map((entry) => `${entry.name}${colon}${entry.url}`)
          .join("\n"),
      version: () => "zhenhua.lu CLI v1.0.0",
      clear: "CLEAR",
      gui: "GUI",
    }),
    [colon, data, delimiter, t]
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    setIsMounted(true);
    if (!hasInitializedRef.current) {
      setOutput([
        ...(isMobile ? [] : [ASCII_ART]),
        "",
        t("cliWelcomeLineOne"),
        t("cliWelcomeLineTwo"),
        "",
      ]);
      hasInitializedRef.current = true;
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      setIsMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, t]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const command = trimmedCmd.split(' ')[0];

    // Handle Chinese question mark separately
    let resolvedCmd = command;
    if (command === '？' || command === '?') {
      resolvedCmd = 'help';
    } else {
      resolvedCmd = ALIASES[command as keyof typeof ALIASES] || command;
    }
    
    if (resolvedCmd === 'clear') {
      setOutput([]);
      return;
    }

    if (resolvedCmd === 'gui') {
      setOutput(prev => [...prev, `$ ${cmd}`, t("cliSwitchingGui"), '']);
      setTimeout(onGuiCommand, 500);
      return;
    }

    if (resolvedCmd === 'theme' || resolvedCmd === 't') {
      setOutput(prev => [...prev, `$ ${cmd}`, t("cliThemeLockedMessage"), '']);
      return;
    }

    const result = commands[resolvedCmd];

    if (!result) {
      setOutput(prev => [...prev, `$ ${cmd}`, t("cliCommandNotFound", { command: cmd }), '']);
      return;
    }

    const response = typeof result === 'function' ? result() : result;
    setOutput(prev => [...prev, `$ ${cmd}`, response, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setCommandHistory(prev => [input, ...prev]);
    setHistoryIndex(-1);
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = [...Object.keys(commands), ...Object.keys(ALIASES)];
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Add some visual feedback
      const button = document.activeElement as HTMLButtonElement;
      if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = copiedLabel;
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 1000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed inset-0 bg-background ${jetbrainsMono.variable} font-mono overflow-hidden flex flex-col`}
    >
      {/* Terminal Content */}
      <div className="flex-1 overflow-y-auto" ref={outputRef}>
        <div className="max-w-3xl mx-auto p-4 md:px-8 space-y-4">
          {output.map((line, i) => {
            // Check if this line is part of ASCII art (Unicode block characters)
            const isAsciiArt = line.includes('█') || line.includes('╗') || line.includes('║') || line.includes('╚') || line.includes('═');

            return (
              <div
                key={i}
                className={cn(
                  "group relative whitespace-pre-wrap leading-relaxed selection:bg-blue-500/30",
                  isAsciiArt && "text-[0.45rem] md:text-[0.65rem] leading-tight"
                )}
              >
                <span className="text-foreground">
                  {line.startsWith('http') ? (
                    <a
                      href={line}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={theme === 'dark'
                        ? 'text-green-400 hover:text-green-300 [text-shadow:0_0_10px_theme(colors.green.400/40)] hover:[text-shadow:0_0_15px_theme(colors.green.400/60)] transition-all underline underline-offset-4'
                        : 'text-blue-600 hover:text-blue-700 transition-all underline underline-offset-4'
                      }
                    >
                      {line}
                    </a>
                  ) : (
                    formatCommandLine(line, theme)
                  )}
                </span>
                {line.trim() && (
                  <button
                    onClick={() => copyToClipboard(line)}
                    className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    title={copyTooltip}
                  >
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} className="h-4" />

          {/* Terminal Input */}
          <form onSubmit={handleSubmit} className="flex items-center group sticky bottom-0 bg-background/80 backdrop-blur-sm py-2">
            <span className={theme === 'dark'
              ? 'text-fuchsia-500 [text-shadow:0_0_10px_theme(colors.fuchsia.500/40)] transition-all group-hover:[text-shadow:0_0_15px_theme(colors.fuchsia.500/60)]'
              : 'text-green-600 font-semibold'
            }>
              luzhenhua@dev:~
            </span>
            <span className={theme === 'dark' ? 'text-green-400' : 'text-blue-600 font-semibold'}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none ml-2 text-foreground caret-foreground selection:bg-blue-500/30"
              autoFocus
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        </div>
      </div>
    </motion.div>
  );
} 
