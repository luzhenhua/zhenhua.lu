import { Icons } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { HomeIcon, FolderIcon } from "lucide-react";
import { DEFAULT_LOCALE } from "@/lib/i18n";

export type NavbarItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export type SocialLink = {
  name: string;
  url: string;
  icon: ComponentType<{ className?: string }>;
  navbar: boolean;
};

export type ProjectLink = {
  type: string;
  href: string;
  icon: ReactNode;
};

export type Project = {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: readonly string[];
  links: ProjectLink[];
  image: string;
  video: string;
};

export type ResumeData = {
  name: string;
  username: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: readonly string[];
  navbar: NavbarItem[];
  contact: {
    email: string;
    social: Record<string, SocialLink>;
  };
  beian: {
    icp: string;
    police: string;
  };
  projects: Project[];
};

const resumeContent = {
  en: {
    name: "Zhenhua Lu",
    username: "Zhenhua Lu",
    initials: "ZL",
    url: "https://zhenhua.lu",
    location: "China",
    locationLink: "https://www.google.com/maps/place/china",
    description: "A tinkering full-stack developer who loves building products.",
    summary:
      ">>\n\n" +
      "**About me**  \n" +
      "I'm a full-stack developer who tinkers with ideas, learns in public, and ships my own products.\n\n" +
      ">>\n\n" +
      "**Things I've shipped**  \n" +
      "- Operated \"DaHu AiYun Tasks\" in 2021, a free automation assistant that served 20k+ users\n" +
      "- Co-launched \"Not AI\" with friends in 2022, reaching nearly 85k registered users and 33k followers on WeChat\n" +
      "- Released the open-source project NCE Flow and crossed 1k+ stars within three weeks; featured in Ruanyifeng's Tech Weekly #369\n" +
      "- My previous work has been shared by tech creators on X, Douyin, Weibo, and Bilibili\n" +
      "\n" +
      "**What I enjoy**  \n" +
      ">\n\n" +
      "I love writing code, working out, and music. I started strength training at 16 and it stayed a habit. Playing instruments and listening to Jay Chou helps me unwind. I admire Google the most, followed by Apple and OpenAI—they prove that doing the work matters more than talking about it.\n" +
      "\n" +
      "🤝 I'm a believer in diversity and inclusion. Meeting people who share the same energy always makes me happy!",
    avatarUrl: "https://q.qlogo.cn/headimg_dl?dst_uin=3235728982&spec=640&img_type=jpg",
    skills: [
      "Python",
      "MySQL",
      "Cursor",
      "Trae",
      "Claude Code",
      "CODEX",
      "PHP",
      "HTML",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Git",
      "Docker",
      "DevOps",
      "Fitness",
      "Guitar",
      "Piano",
      "Ukulele",
    ],
    navbar: [
      { href: "/", icon: HomeIcon, label: "Home" },
      { href: "/projects", icon: FolderIcon, label: "Projects" },
    ],
    contact: {
      email: "luzhenhuadev@qq.com",
      social: {
        GitHub: {
          name: "GitHub",
          url: "https://github.com/luzhenhua",
          icon: Icons.github,
          navbar: true,
        },
        Bilibili: {
          name: "Bilibili",
          url: "https://space.bilibili.com/1189276682",
          icon: Icons.bilibili,
          navbar: true,
        },
        Douyin: {
          name: "Douyin",
          url: "https://www.douyin.com/user/MS4wLjABAAAAe_UbKX_yOC03iIH10AmzlJJSnt_O0CecI1naUtR5qjNKNKd4Gqg8Hw1tyOfeHRLA?from_tab_name=main",
          icon: Icons.douyin,
          navbar: true,
        },
        Xiaohongshu: {
          name: "Xiaohongshu",
          url: "https://www.xiaohongshu.com/user/profile/6554bb560000000002035357",
          icon: Icons.xiaohongshu,
          navbar: true,
        },
        NetEase: {
          name: "NetEase Music",
          url: "https://music.163.com/#/user/home?id=334469730",
          icon: Icons.netease,
          navbar: true,
        },
        email: {
          name: "Send Email",
          url: "mailto:luzhenhuadev@qq.com",
          icon: Icons.email,
          navbar: false,
        },
      },
    },

    beian: {
      icp: "豫ICP备2023006326号",
      police: "豫公网安备41070202001451号",
    },

    projects: [
      {
        title: "NCE Flow",
        href: "https://nceflow.zhenhua.lu",
        dates: "2025",
        active: true,
        description:
          "Interactive New Concept English reader with click-to-play sentences supporting EN / EN+CN / CN modes.",
        technologies: ["JavaScript", "HTML", "CSS", "Shell", "Dockerfile"],
        links: [
          {
            type: "Website",
            href: "https://nceflow.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "Source",
            href: "https://github.com/luzhenhua/NCE-Flow",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/images/nce.webp",
        video: "",
      },
      {
        title: "Lyrics Card",
        href: "https://lyricscard.zhenhua.lu",
        dates: "2025",
        active: true,
        description: "Create slick Apple Music–style lyric cards in the browser.",
        technologies: ["JavaScript", "CSS", "PHP", "HTML"],
        links: [
          {
            type: "Website",
            href: "https://lyricscard.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "Source",
            href: "https://github.com/luzhenhua/LyricsCard",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/images/card.webp",
        video: "",
      },
      {
        title: "Heart Notes",
        href: "https://heartnots.zhenhua.lu",
        dates: "2025",
        active: true,
        description: "An elegant interactive sticky-note wall for sharing feelings.",
        technologies: ["JavaScript", "CSS", "HTML"],
        links: [
          {
            type: "Website",
            href: "https://heartnots.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "Source",
            href: "https://github.com/luzhenhua/Heart-Notes",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/images/notes.webp",
        video: "",
      },
      {
        title: "Heytea DIY Sticker",
        href: "https://diy.zhenhua.lu",
        dates: "2025",
        active: true,
        description: "A web tool for creating custom Heytea DIY cup stickers.",
        technologies: ["TypeScript", "JavaScript", "CSS"],
        links: [
          {
            type: "Website",
            href: "https://diy.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "Source",
            href: "https://github.com/luzhenhua/heytea",
            icon: <Icons.github className="size-3" />,
          },
          {
            type: "Original Post",
            href: "http://xhslink.com/o/4NUYhjXmUUv",
            icon: <Icons.xiaohongshu className="size-3" />,
          },
        ],
        image: "/images/diy.webp",
        video: "",
      },
    ],
  },
  zh: {
    name: "卢振华",
    username: "卢振华 Zhenhua Lu",
    initials: "ZL",
    url: "https://zhenhua.lu",
    location: "China",
    locationLink: "https://www.google.com/maps/place/china",
    description: "一个喜欢折腾的全栈开发者",
    summary:
      ">>\n\n" +
      "**我**  \n" +
      "一个喜欢折腾的全栈开发者，在学习的路上，也在创造属于自己的作品。\n\n" +
      ">>\n\n" +
      "**我做过的事**  \n" +
      "- 2021 年所运营的「大户爱云任务」，累计服务超 20k 用户的免费自动化助手\n" +
      "- 2022 年和朋友一起上线「不是 Ai」，注册用户近 85k，公众号粉丝近 33k\n" +
      "- NCE Flow 开源项目发布三周获得 1k+ Stars，被阮一峰《科技爱好者周刊》第 369 期收录\n" +
      "- 历史作品被 X、抖音、微博、哔哩哔哩上的多名技术博主转载推荐\n" +
      "\n" +
      "**我喜欢的领域**  \n" +
      ">\n\n" +
      "我喜欢写代码，也喜欢运动和音乐，我从 16 岁开始健身，已经成了习惯。弹琴、听周杰伦，会让我放松下来。我认为最伟大，也是我最喜欢的组织是 Google，其次是 Apple 和 OpenAi，它们让我相信，做好一件事，比说什么都重要。\n" +
      "\n" +
      "🤝 我相信多元与包容，能遇见志同道合的人，对我来说就是件开心的事！",
    avatarUrl: "https://q.qlogo.cn/headimg_dl?dst_uin=3235728982&spec=640&img_type=jpg",
    skills: [
      "Python",
      "Mysql",
      "Cursor",
      "Trae",
      "Claude Code",
      "CODEX",
      "PHP",
      "HTML",
      "JS",
      "TypeScript",
      "Node.js",
      "Git",
      "Docker",
      "运维",
      "健身",
      "吉他",
      "钢琴",
      "尤克里里",
    ],
    navbar: [
      { href: "/", icon: HomeIcon, label: "首页" },
      { href: "/projects", icon: FolderIcon, label: "作品" },
    ],
    contact: {
      email: "luzhenhuadev@qq.com",
      social: {
        GitHub: {
          name: "GitHub",
          url: "https://github.com/luzhenhua",
          icon: Icons.github,
          navbar: true,
        },
        Bilibili: {
          name: "Bilibili",
          url: "https://space.bilibili.com/1189276682",
          icon: Icons.bilibili,
          navbar: true,
        },
        Douyin: {
          name: "抖音",
          url: "https://www.douyin.com/user/MS4wLjABAAAAe_UbKX_yOC03iIH10AmzlJJSnt_O0CecI1naUtR5qjNKNKd4Gqg8Hw1tyOfeHRLA?from_tab_name=main",
          icon: Icons.douyin,
          navbar: true,
        },
        Xiaohongshu: {
          name: "小红书",
          url: "https://www.xiaohongshu.com/user/profile/6554bb560000000002035357",
          icon: Icons.xiaohongshu,
          navbar: true,
        },
        NetEase: {
          name: "网易云音乐",
          url: "https://music.163.com/#/user/home?id=334469730",
          icon: Icons.netease,
          navbar: true,
        },
        email: {
          name: "发送邮件",
          url: "mailto:luzhenhuadev@qq.com",
          icon: Icons.email,
          navbar: false,
        },
      },
    },

    beian: {
      icp: "豫ICP备2023006326号",
      police: "豫公网安备41070202001451号",
    },

    projects: [
      {
        title: "NCE Flow",
        href: "https://nceflow.zhenhua.lu",
        dates: "2025",
        active: true,
        description:
          "新概念英语在线点读，点句即读、连续播放，支持 EN / EN+CN / CN。",
        technologies: ["JavaScript", "HTML", "CSS", "Shell", "Dockerfile"],
        links: [
          {
            type: "网站",
            href: "https://nceflow.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "源码",
            href: "https://github.com/luzhenhua/NCE-Flow",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/images/nce.webp",
        video: "",
      },
      {
        title: "Lyrics Card",
        href: "https://lyricscard.zhenhua.lu",
        dates: "2025",
        active: true,
        description: "制作精美的 Apple Music 风格歌词卡片。",
        technologies: ["JavaScript", "CSS", "PHP", "HTML"],
        links: [
          {
            type: "网站",
            href: "https://lyricscard.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "源码",
            href: "https://github.com/luzhenhua/LyricsCard",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/images/card.webp",
        video: "",
      },
      {
        title: "Heart Notes",
        href: "https://heartnots.zhenhua.lu",
        dates: "2025",
        active: true,
        description: "一个优雅的交互式便签墙。",
        technologies: ["JavaScript", "CSS", "HTML"],
        links: [
          {
            type: "网站",
            href: "https://heartnots.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "源码",
            href: "https://github.com/luzhenhua/Heart-Notes",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/images/notes.webp",
        video: "",
      },
      {
        title: "喜茶Diy杯贴",
        href: "https://diy.zhenhua.lu",
        dates: "2025",
        active: true,
        description: "喜茶自定义 Diy 杯贴网页版工具。",
        technologies: ["TypeScript", "JavaScript", "CSS"],
        links: [
          {
            type: "网站",
            href: "https://diy.zhenhua.lu",
            icon: <Icons.globe className="size-3" />,
          },
          {
            type: "源码",
            href: "https://github.com/luzhenhua/heytea",
            icon: <Icons.github className="size-3" />,
          },
          {
            type: "原帖",
            href: "http://xhslink.com/o/4NUYhjXmUUv",
            icon: <Icons.xiaohongshu className="size-3" />,
          },
        ],
        image: "/images/diy.webp",
        video: "",
      },
    ],
  },
} satisfies Record<Locale, ResumeData>;

export const RESUME_CONTENT = resumeContent;
export const DATA = RESUME_CONTENT[DEFAULT_LOCALE];

export function getResumeData(locale: Locale): ResumeData {
  return RESUME_CONTENT[locale] ?? DATA;
}
