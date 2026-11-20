/**
 * Unified Projects & Mods Data Store (Single Source of Truth)
 * --------------------------------------------------------------------------
 * Categories:
 *   1. PC Ports (backed by src/data/ports.ts)
 *   2. Modding (Loaders, Tools, Mods)
 *   3. Software (Desktop Applications, Raspberry Pi)
 *   4. AI (Reinforcement Learning, AI Systems & Assistants)
 */

import { pcPorts } from './ports';

export type ProjectCategoryId = 'pc-ports' | 'modding' | 'software' | 'ai';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategoryId;
  subcategory: string;
  subcategoryId: string;
  platform: string;
  game?: string;
  mcVersion?: string;
  mcLoader?: 'Forge' | 'NeoForge';
  status: 'Active' | 'Playable' | 'Beta';
  description: string;
  tech: string[];
  image?: string;
  featured?: boolean;
  /** Internal page URL (e.g. PC Port showcase detail page) */
  detailUrl?: string;
  githubUrl?: string;
  downloadUrl?: string;
  nexusUrl?: string;
  curseforgeUrl?: string;
  guideUrl?: string;
}

export interface CategoryMeta {
  id: ProjectCategoryId;
  title: string;
  shortTitle: string;
  description: string;
  accent: 'crimson' | 'cyan' | 'violet' | 'emerald';
  subcategories: {
    id: string;
    title: string;
    description: string;
  }[];
}

export const categories: CategoryMeta[] = [
  {
    id: 'pc-ports',
    title: 'PC Ports',
    shortTitle: 'PC Ports',
    description:
      'Native Windows static-recompilation ports bringing classic console titles to modern PC hardware with D3D12/Vulkan, high-res scaling, and custom launchers.',
    accent: 'crimson',
    subcategories: [
      {
        id: 'ps2',
        title: 'PlayStation 2',
        description: 'Ahead-of-time static recompilation ports targeting classic PS2 releases.',
      },
    ],
  },
  {
    id: 'modding',
    title: 'Modding',
    shortTitle: 'Modding',
    description:
      'Native C++ memory hook engines, reverse-engineering tools, 3D glTF extractors, localization studios, and game modifications.',
    accent: 'cyan',
    subcategories: [
      {
        id: 'loaders',
        title: 'Loaders',
        description: 'Native C++ memory hook engines and runtime asset loaders.',
      },
      {
        id: 'tools',
        title: 'Tools',
        description: 'Mod managers, 3D PhyreEngine glTF extractors, text studios, and binary editors.',
      },
      {
        id: 'mods',
        title: 'Mods',
        description: 'Difficulty overhauls, custom weapons, texture upgrades, and Minecraft mods.',
      },
    ],
  },
  {
    id: 'software',
    title: 'Software',
    shortTitle: 'Software',
    description:
      'Standalone desktop engineering workstations, car audio acoustics CAD, and embedded Raspberry Pi 5 systems.',
    accent: 'violet',
    subcategories: [
      {
        id: 'desktop',
        title: 'Desktop Applications',
        description: 'Standalone GUI software and precision engineering tools.',
      },
      {
        id: 'raspberry-pi',
        title: 'Raspberry Pi',
        description: 'Automotive cockpit OS, hardware controllers, and Linux daemons for Raspberry Pi 5.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    shortTitle: 'AI',
    description:
      'Hierarchical reinforcement learning frameworks, autonomous game-playing agents, and local AI companion platforms.',
    accent: 'emerald',
    subcategories: [
      {
        id: 'rl',
        title: 'Reinforcement Learning',
        description: 'Emulation memory hooks and hierarchical RL agent training pipelines.',
      },
      {
        id: 'assistants',
        title: 'AI Assistants',
        description: 'Local desktop and Raspberry Pi 5 generative assistant platforms.',
      },
    ],
  },
];

// Derive PC Port items automatically from src/data/ports.ts
const portProjectItems: ProjectItem[] = pcPorts.map((port) => ({
  id: port.slug,
  title: port.title,
  category: 'pc-ports',
  subcategory: port.originalPlatform,
  subcategoryId: 'ps2',
  platform: port.originalPlatform,
  game: port.originalGame,
  status: port.status === 'In Development' ? 'Beta' : port.status,
  description: port.summary,
  tech: port.tech,
  image: port.bannerImage,
  featured: port.featured,
  detailUrl: `/projects/pc-ports/${port.slug}/`,
  githubUrl: port.githubUrl,
}));

export const projects: ProjectItem[] = [
  ...portProjectItems,

  // =========================================================================
  // MODDING — LOADERS
  // =========================================================================
  {
    id: 'ffviise-mod-loader',
    title: 'FFVIISE Mod Loader',
    category: 'modding',
    subcategory: 'Loaders',
    subcategoryId: 'loaders',
    platform: 'Final Fantasy VII',
    game: 'Final Fantasy VII',
    status: 'Active',
    featured: true,
    description:
      'Lightweight, portable, high-performance native C++ mod loader for the Final Fantasy VII Steam Edition (2026 re-release), bypassing heavy third-party overhead.',
    tech: ['C++', 'Win32 API', 'Memory Hooks'],
    githubUrl: 'https://github.com/NfgOdin/FFVIISE_Mod_Loader',
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7/mods/157',
    guideUrl: '/tutorials/modding/loaders/ffviise-loader/',
  },

  // =========================================================================
  // MODDING — TOOLS
  // =========================================================================
  {
    id: 'spira-mod-manager',
    title: 'Spira Mod Manager',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    featured: true,
    image: '/images/spira-mod-manager.png',
    description:
      'Standalone mod manager for Final Fantasy X / X-2 HD Remaster featuring profile switching, conflict detection, load-order control, save backups, and VFS loading.',
    tech: ['Python', 'Mod Manager', 'VFS', 'FFX / X-2'],
    githubUrl: 'https://github.com/NfgOdin/Spira_Mod_Manager',
    downloadUrl: 'https://github.com/NfgOdin/Spira_Mod_Manager/releases/latest/download/SpiraMM.rar',
    nexusUrl: 'https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/327',
  },
  {
    id: 'spira-text-tool',
    title: 'Spira Text Tool (v2.0)',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Dual-engine localization and text modding studio for Final Fantasy X and X-2 HD Remaster with an interactive live dialogue/choice simulator and translation memory.',
    tech: ['Python', 'Localization Studio', 'Binary Tables'],
    githubUrl: 'https://github.com/NfgOdin/Spira_Text_Tool',
  },
  {
    id: 'ffx-phyre-tool',
    title: 'FFX Phyre Tool',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    featured: true,
    description:
      'High-performance extractor and compiler for Sony PhyreEngine binary model archives and textures directly into the open glTF 2.0 standard for Blender workflows.',
    tech: ['Python', 'glTF 2.0', 'PhyreEngine 3D'],
    githubUrl: 'https://github.com/NfgOdin/FFX-Phyre-Tool',
    nexusUrl: 'https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/315',
    guideUrl: '/tutorials/modding/tools/phyre-gltf-export/',
  },
  {
    id: '7th-heaven-converter',
    title: '7th Heaven to FFVIISE Converter',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy VII',
    game: 'Final Fantasy VII',
    status: 'Active',
    description:
      'Automated archive extraction and conversion utility translating legacy 7th Heaven .iro containers into clean unpacked folder structures for FFVIISE Mod Loader.',
    tech: ['Python', 'IRO Archives', 'CLI Converter'],
    githubUrl: 'https://github.com/NfgOdin/7thHeavenToFFVIIModLoader',
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7/mods/161',
    guideUrl: '/tutorials/modding/tools/7thheaven-migration/',
  },
  {
    id: 'ffviise-modding-tool',
    title: 'FFVIISE Modding Tool',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy VII',
    game: 'Final Fantasy VII',
    status: 'Active',
    description:
      'Dedicated authoring and asset-packing utility for configuring and packaging mods targeting the 2026 Steam re-release of Final Fantasy VII.',
    tech: ['Python', 'Asset Packing', 'FFVII Steam'],
    githubUrl: 'https://github.com/NfgOdin/FFVIISE_Modding_Tool',
  },
  {
    id: 'ffx-sphere-grid-tool',
    title: 'FFX Sphere Grid Tool',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Visual editor and binary parser for the Final Fantasy X Sphere Grid layout, node links, character starting paths, and stat progression.',
    tech: ['Python', 'Binary Parser', 'Visual Editor'],
    githubUrl: 'https://github.com/NfgOdin/FFX_Sphere_Grid_Tool',
  },
  {
    id: 'ffx-audio-tool',
    title: 'FFX Audio Tool',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Stream extraction and conversion utility for proprietary audio banks inside Final Fantasy X / X-2 HD Remaster.',
    tech: ['Python', 'Audio Banks', 'Binary Parsing'],
    githubUrl: 'https://github.com/NfgOdin/FFX_Audio_Tool',
  },
  {
    id: 'ffx-shop-tool',
    title: 'FFX Shop Tool',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Binary data parser and inventory editor for merchant shop tables, item lists, and equipment prices in Final Fantasy X.',
    tech: ['Python', 'Data Tables', 'FFX'],
    githubUrl: 'https://github.com/NfgOdin/FFX_Shop_Tool',
  },
  {
    id: 'ffx-ai-tool',
    title: 'FFX AI Tool',
    category: 'modding',
    subcategory: 'Tools',
    subcategoryId: 'tools',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Bytecode decompiler and behavior script inspector for analyzing and editing enemy battle AI routines in Final Fantasy X.',
    tech: ['Python', 'Bytecode Decompiler', 'Enemy AI'],
    githubUrl: 'https://github.com/NfgOdin/FFX_AI_Tool',
  },

  // =========================================================================
  // MODDING — MODS
  // =========================================================================
  {
    id: 'ecologies-and-echoes',
    title: 'Ecologies & Echoes',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Minecraft',
    game: 'Minecraft',
    mcVersion: '1.21.1',
    mcLoader: 'NeoForge',
    status: 'Active',
    description:
      'Atmospheric world & gameplay mod engineered for Minecraft 1.21.1 on the NeoForge mod loader.',
    tech: ['Java 21', 'NeoForge', 'Minecraft 1.21.1'],
    githubUrl: 'https://github.com/NfgOdin/ecologies_and_echoes',
  },
  {
    id: 'riftlink',
    title: 'RiftLink',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Minecraft',
    game: 'Minecraft',
    mcVersion: '1.21.1',
    mcLoader: 'NeoForge',
    status: 'Active',
    description:
      'Modern dimensional mechanics, rift traversal, and custom utility systems built for Minecraft 1.21.1 on NeoForge.',
    tech: ['Java', 'NeoForge', 'Minecraft 1.21.1'],
    githubUrl: 'https://github.com/NfgOdin/RiftLink',
    guideUrl: '/tutorials/modding/mods/installing-riftlink/',
  },
  {
    id: 'sticky-resources',
    title: 'StickyResources',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Minecraft',
    game: 'Minecraft',
    mcVersion: '1.20.1',
    mcLoader: 'Forge',
    status: 'Active',
    description:
      'Java gameplay enhancement and resource automation mod built for Minecraft 1.20.1 on the Forge mod loader.',
    tech: ['Java', 'Forge', 'Minecraft 1.20.1'],
    githubUrl: 'https://github.com/NfgOdin/StickyResources',
    curseforgeUrl: 'https://www.curseforge.com/minecraft/mc-mods/sticky-resources',
  },
  {
    id: 'ffvii-159',
    title: 'Final Fantasy VII Difficulty Mod',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII',
    game: 'Final Fantasy VII',
    status: 'Active',
    description:
      'Custom balance overhaul retuning encounter dynamics, enemy AI behaviors, and combat stats for the 2026 Steam re-release.',
    tech: ['Game Balance', 'Enemy AI', 'Steam 2026'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7/mods/159',
  },
  {
    id: 'ffvii-158',
    title: 'FFVII Battle Overlay Plugin',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII',
    game: 'Final Fantasy VII',
    status: 'Active',
    description:
      'Real-time in-game battle telemetry and tactical statistics HUD overlay rendered directly over active FFVII combat scenes.',
    tech: ['C++', 'DirectX Hook', 'HUD Overlay'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7/mods/158',
  },
  {
    id: 'ffx-321',
    title: 'Spiras Trials — Custom Difficulty & Rewards',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Multi-tier difficulty rebalance overhaul re-tuning monster AI scripts, boss stats, ability costs, and encounter rewards across Spira.',
    tech: ['Difficulty Overhaul', 'Enemy AI', 'FFX / X-2'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/321',
  },
  {
    id: 'ffx-320',
    title: 'Classic Magic & Command Nomenclature',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy X / X-2',
    game: 'Final Fantasy X / X-2',
    status: 'Active',
    description:
      'Localization rework restoring classic vintage FF7-era spell tier naming (Bolt/Bolt2/Bolt3, Fire/Fire2/Fire3) across FFX.',
    tech: ['Localization', 'Text Rework', 'FFX / X-2'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasyxx2hdremaster/mods/320',
  },
  {
    id: 'ff8-101',
    title: 'FFVIII Title Screen Overhaul',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'High-definition overhaul and aesthetic revamp for the Final Fantasy VIII Remastered main title screen.',
    tech: ['UI Overhaul', 'HD Textures', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/101',
  },
  {
    id: 'ff8-100',
    title: 'Moomba Enhanced Textures',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'Faithfully upscaled and re-authored texture pack enhancing the Moomba creature model in FFVIII Remastered.',
    tech: ['Texture Pack', 'Character Art', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/100',
  },
  {
    id: 'ff8-99',
    title: 'Intro Logos, Cheat Icons & Start Screen Overhaul',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'Clean aesthetic replacement for opening publisher logos, booster UI icons, and the initial start sequence.',
    tech: ['UI / HUD', 'Logos', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/99',
  },
  {
    id: 'ff8-98',
    title: 'Triple Triad Re-texture',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'Complete visual redesign of the Triple Triad mini-game card faces, borders, and battle mat surfaces.',
    tech: ['Mini-Game Overhaul', 'Cards', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/98',
  },
  {
    id: 'ff8-97',
    title: 'Realistic Character Portrait Textures',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'High-definition realistic texture overhaul for party member menu portraits and dialogue avatars.',
    tech: ['Portraits', 'Character Art', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/97',
  },
  {
    id: 'ff8-96',
    title: 'Realistic GF Portrait Textures',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'Detailed high-resolution portrait textures for Guardian Forces in the junction and battle menus.',
    tech: ['GF Art', 'Menu Textures', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/96',
  },
  {
    id: 'ff8-95',
    title: 'Guardian Force Shiva Retexture',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VIII',
    game: 'Final Fantasy VIII',
    status: 'Active',
    description: 'Custom summon texture modification for Guardian Force Shiva in Final Fantasy VIII Remastered.',
    tech: ['Summon Model', 'Textures', 'FFVIII'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy8remastered/mods/95',
  },
  {
    id: 'skyrim-158649',
    title: 'Fenrir Companion Follower',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Skyrim SE',
    game: 'Skyrim SE',
    status: 'Active',
    description:
      'Mythological wolf companion follower inspired by Fenrir, featuring custom combat AI behaviors and follower commands.',
    tech: ['Follower Mod', 'Companion AI', 'Skyrim SE'],
    nexusUrl: 'https://www.nexusmods.com/skyrimspecialedition/mods/158649',
  },
  {
    id: 'ff7r-1429',
    title: "Ichigo's Bankai Tensa Zangetsu",
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: "Custom 3D weapon replacement bringing Ichigo Kurosaki's Bankai blade into Final Fantasy VII Remake.",
    tech: ['Weapon Model', '3D Asset', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1429',
  },
  {
    id: 'ff7r-1426',
    title: 'Metal Cactuar Mod',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: 'Material and shader overhaul giving Cactuar a polished metallic chrome finish.',
    tech: ['Enemy Retexture', 'Materials', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1426',
  },
  {
    id: 'ff7r-1425',
    title: "Ichigo's Shikai Zangetsu",
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: "Custom 3D weapon replacement introducing Ichigo's oversized Shikai cleaver for Cloud Strife.",
    tech: ['Weapon Model', '3D Asset', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1425',
  },
  {
    id: 'ff7r-1424',
    title: 'Divine Axe Rhitta',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: "Custom 3D weapon replacement importing Escanor's sacred treasure, Divine Axe Rhitta.",
    tech: ['Weapon Model', '3D Asset', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1424',
  },
  {
    id: 'ff7r-1423',
    title: 'Reptilian Leviathan Mod',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: 'Custom texture overhaul transforming the summon Leviathan with distinct reptilian scales and coloration.',
    tech: ['Summon Retexture', 'Textures', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1423',
  },
  {
    id: 'ff7r-1421',
    title: "Kenpachi's Shikai Nozarashi",
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: "Custom weapon model importing Kenpachi Zaraki's battle cleaver Shikai, Nozarashi.",
    tech: ['Weapon Model', '3D Asset', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1421',
  },
  {
    id: 'ff7r-1420',
    title: 'Elder Wand Mod',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: 'Custom magic weapon model replacement bringing the Elder Wand into Final Fantasy VII Remake.',
    tech: ['Weapon Model', '3D Asset', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1420',
  },
  {
    id: 'ff7r-1419',
    title: 'Viking Axe Mod',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: 'Rugged Norse Viking battle axe replacement model with forged steel and wood textures.',
    tech: ['Weapon Model', 'Textures', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1419',
  },
  {
    id: 'ff7r-1417',
    title: 'Bahamut Retexture Mod',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: 'High-detail retexture and shading overhaul for the dragon king summon, Bahamut.',
    tech: ['Summon Retexture', 'Materials', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1417',
  },
  {
    id: 'ff7r-1415',
    title: 'Chocobo & Moogle Summon Texture',
    category: 'modding',
    subcategory: 'Mods',
    subcategoryId: 'mods',
    platform: 'Final Fantasy VII Remake',
    game: 'Final Fantasy VII Remake',
    status: 'Active',
    description: 'Vibrant aesthetic texture modification for the Chocobo & Moogle summon pair.',
    tech: ['Summon Retexture', 'Textures', 'FFVII Remake'],
    nexusUrl: 'https://www.nexusmods.com/finalfantasy7remake/mods/1415',
  },

  // =========================================================================
  // SOFTWARE — DESKTOP & RASPBERRY PI
  // =========================================================================
  {
    id: 'runebox',
    title: 'RuneBox — Audio CAD & Acoustics Lab',
    category: 'software',
    subcategory: 'Desktop Applications',
    subcategoryId: 'desktop',
    platform: 'Audio CAD',
    status: 'Active',
    featured: true,
    description:
      'Commercial-grade car audio subwoofer enclosure CAD & acoustics simulation lab featuring pure Python 3D vector visualization, port velocity modeling, and fabrication cut sheets.',
    tech: ['Python', '3D Vector CAD', 'Acoustics Simulation'],
    githubUrl: 'https://github.com/NfgOdin/RuneBox',
    guideUrl: '/tutorials/software/desktop/enclosure-tuning/',
  },
  {
    id: 'carpi5-cockpit-os',
    title: 'CarPi5 Cockpit OS',
    category: 'software',
    subcategory: 'Raspberry Pi',
    subcategoryId: 'raspberry-pi',
    platform: 'Raspberry Pi 5',
    status: 'Active',
    featured: true,
    description:
      'Custom automotive cockpit operating system and infotainment interface engineered specifically for Raspberry Pi 5 in-vehicle hardware deployments.',
    tech: ['Raspberry Pi 5', 'Embedded Linux', 'Cockpit OS'],
    githubUrl: 'https://github.com/NfgOdin/CarPi5-Cockpit-OS',
  },
  {
    id: 'sbc-core',
    title: 'SBC-Core',
    category: 'software',
    subcategory: 'Raspberry Pi',
    subcategoryId: 'raspberry-pi',
    platform: 'Raspberry Pi 5',
    status: 'Active',
    image: '/images/sbc-core.svg',
    description:
      'Core utility suite, daemon controller, and low-level hardware interface system tailored for Raspberry Pi 5 single-board computer environments.',
    tech: ['Python', 'Raspberry Pi 5', 'Linux Daemons'],
    githubUrl: 'https://github.com/NfgOdin/SBC-Core',
  },

  // =========================================================================
  // AI — REINFORCEMENT LEARNING & ASSISTANTS
  // =========================================================================
  {
    id: 'pokemon-yellow-ai',
    title: 'PokemonYellow-HRL-AI',
    category: 'ai',
    subcategory: 'Reinforcement Learning',
    subcategoryId: 'rl',
    platform: 'Pokemon Yellow',
    status: 'Active',
    featured: true,
    description:
      'Hierarchical Reinforcement Learning (HRL) framework training an autonomous agent to navigate, battle, and complete Pokémon Yellow through direct Game Boy emulation memory hooks.',
    tech: ['Python', 'Hierarchical RL', 'PyBoy / Gym'],
    githubUrl: 'https://github.com/NfgOdin/PokemonYellow-HRL-AI',
    guideUrl: '/tutorials/ai/rl/hrl-environment-setup/',
  },
  {
    id: 'pi5-maia',
    title: 'Pi5-MAIA',
    category: 'ai',
    subcategory: 'AI Assistants',
    subcategoryId: 'assistants',
    platform: 'Raspberry Pi 5',
    status: 'Active',
    description:
      'Local AI assistant platform (Maia) built to run on Raspberry Pi 5 edge hardware for private, always-available voice and system automation.',
    tech: ['Python', 'Raspberry Pi 5', 'Edge AI'],
    githubUrl: 'https://github.com/NfgOdin/Pi5-MAIA',
  },
  {
    id: 'digit-ai',
    title: 'digit.ai',
    category: 'ai',
    subcategory: 'AI Assistants',
    subcategoryId: 'assistants',
    platform: 'Desktop',
    status: 'Active',
    description:
      'Local desktop AI companion application and generative workflow assistant built for everyday desktop productivity.',
    tech: ['Python', 'Desktop AI', 'Local Assistant'],
    githubUrl: 'https://github.com/NfgOdin/digit.ai',
  },
];

export function getPortfolioStats(tutorialCount: number) {
  const modsCount = projects.filter((p) => p.category === 'modding' && p.subcategoryId === 'mods').length;
  const toolsAndAppsCount = projects.filter(
    (p) =>
      p.category === 'software' ||
      p.category === 'ai' ||
      (p.category === 'modding' && p.subcategoryId !== 'mods')
  ).length;
  return {
    ports: pcPorts.length,
    toolsAndApps: toolsAndAppsCount,
    mods: modsCount,
    tutorials: tutorialCount,
    total: projects.length,
  };
}
