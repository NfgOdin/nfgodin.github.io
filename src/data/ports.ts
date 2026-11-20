/**
 * PC Ports Catalog (Single Source of Truth)
 * --------------------------------------------------------------------------
 * Add future native PC game ports to `pcPorts` below. Each entry automatically:
 *   1. Appears in Projects -> PC Ports (/projects/pc-ports/)
 *   2. Appears in the unified Projects explorer (/projects/)
 *   3. Generates its own SEO-optimized detail page (/projects/pc-ports/<slug>/)
 *   4. Registers in the global Ctrl+K Command Palette & sitemap.xml
 */

export interface PortFeatureGroup {
  id: string;
  label: string;
  eyebrow: string;
  items: {
    title: string;
    detail: string;
  }[];
}

export interface PortControlRow {
  shortcut: string;
  action: string;
}

export interface PortScreenshot {
  src: string;
  caption: string;
  alt: string;
}

export interface PcPort {
  slug: string;
  title: string;
  originalGame: string;
  originalPlatform: string;
  regionSpec: string;
  status: 'Active' | 'Playable' | 'Beta' | 'In Development';
  accent: 'crimson' | 'cyan' | 'violet';
  tagline: string;
  summary: string;
  bannerImage: string;
  /** Drop real screenshots into public/images/ports/<slug>/ and list them here */
  screenshots: PortScreenshot[];
  githubUrl: string;
  docsUrl?: string;
  license: string;
  engineBase: string;
  tech: string[];
  /** Concise hero telemetry specs */
  specs: {
    label: string;
    value: string;
  }[];
  /** Short feature pills shown on showcase cards */
  badges: string[];
  featureGroups: PortFeatureGroup[];
  quickStart: {
    step: string;
    title: string;
    detail: string;
    command?: string;
  }[];
  controls: PortControlRow[];
  legalNotice: string;
  credits: string[];
  featured?: boolean;
}

export const pcPorts: PcPort[] = [
  {
    slug: 'shadow-hearts-nocturne',
    title: 'Shadow Hearts: Nocturne',
    originalGame: 'Shadow Hearts: Covenant',
    originalPlatform: 'PlayStation 2',
    regionSpec: 'NTSC-U • Disc 1 SLUS-21041 / Disc 2 SLUS-21044',
    status: 'Active',
    accent: 'crimson',
    featured: true,
    tagline: 'Native Windows static-recompilation PC port of Shadow Hearts: Covenant.',
    summary:
      'A ground-up native Windows PC port powered by ahead-of-time static recompilation, Direct3D 12 / Vulkan rendering up to 64× internal resolution, GPU tile binning, depth-aware post-processing, seamless dual-disc virtual folders, a Gothic Direct2D launcher, and a live 110-achievement EE RAM tracker.',
    bannerImage: '/images/ports/nocturne-banner.jpg',
    screenshots: [],
    githubUrl: 'https://github.com/NfgOdin/Shadow-Hearts-Nocturne',
    docsUrl: 'https://github.com/NfgOdin/Shadow-Hearts-Nocturne/blob/main/SHADOW_HEARTS_COVENANT.md',
    license: 'MIT License',
    engineBase: 'Custom fork of ps2-native-recomp',
    tech: ['C++20', 'Static Recompilation', 'Direct3D 12', 'Vulkan', 'Direct2D', 'WGSL', 'SDL2'],
    specs: [
      { label: 'Original Hardware', value: 'PS2 (NTSC-U)' },
      { label: 'Graphics API', value: 'D3D12 / Vulkan' },
      { label: 'Internal Scaling', value: '1× up to 64×' },
      { label: 'Achievements', value: '110 Live RAM' },
    ],
    badges: [
      'AOT Static Recomp',
      'D3D12 / Vulkan',
      '1×–64× Scaling',
      'Seamless 2-Disc',
      '110 Achievements',
      'Direct2D Launcher',
    ],
    legalNotice:
      'Bring-Your-Own-Disc: This repository contains zero copyrighted game code, Sony BIOS files, disc images, extracted binaries, overlays, textures, audio, saves, or prebuilt executables. You must supply your own legally dumped NTSC-U Disc 1 and Disc 2 images (.iso, .chd, .cso, or .bin/.cue) to build the game locally.',
    featureGroups: [
      {
        id: 'engine',
        label: 'Engine & Multi-Disc',
        eyebrow: 'Native Recompilation Core',
        items: [
          {
            title: 'Full Ahead-of-Time Static Recompilation',
            detail:
              'Translates SLUS_210.41 and all three MWo3 runtime overlays (OPENING.BIN, FIELD.BIN, BATTLE.BIN) ahead of time at -O2, eliminating mid-game live-recompilation hitches.',
          },
          {
            title: 'ISO-Free Unpacked Virtual Disc Folders',
            detail:
              'Unpacks Disc 1 & Disc 2 (.iso, .chd, .cso, or .bin/.cue) into standard directories with cross-disc NTFS hardlink deduplication and byte-for-byte source verification—no ISOs required after setup.',
          },
          {
            title: 'Seamless Automatic Disc 1 ↔ Disc 2 Switching',
            detail:
              'Mounts both discs simultaneously and intercepts SSHSys::DiskChange automatically so disc swaps at the end of Disc 1 or when loading a Disc 2 save happen transparently.',
          },
          {
            title: 'Fast SSD Disc Loading (~16× Faster)',
            detail:
              'Accelerates CDVD/CDVDFSV read and seek timing ~16× over PS2 DVD hardware by default, with a live toggle in F1 → Settings → Controls if you want authentic DVD timing.',
          },
          {
            title: 'Dedicated Covenant Runtime Fixes',
            detail:
              'Includes IOP hardware root-counter reset-on-compare fixes (SDRV_IOP.IRX audio/FMV deadlock resolution), SIF command mirroring (IOPUTY.IRX), and async sceCdSeek completion (FIO.IRX).',
          },
        ],
      },
      {
        id: 'graphics',
        label: 'Graphics & Performance',
        eyebrow: 'Modern GPU Pipeline',
        items: [
          {
            title: 'High-Resolution Scaling (1× – 64×)',
            detail:
              'Cycle powers of two or enter any custom integer scale up to your GPU safe limit with live pixel resolution and estimated VRAM preview inside F1 → Settings → Graphics.',
          },
          {
            title: 'Single-Pass GPU Tile Binning (raster_gpu)',
            detail:
              'Offloads primitive-to-tile filtering into on-chip GPU shared memory with auto 16×16 tiles at 4×+, cutting 4× CPU overhead by 2.5× with 100% bit-exact PS2 accuracy and ~3× faster 8× scaling.',
          },
          {
            title: 'Unlocked & Monitor-Hz Frame Pacing',
            detail:
              'Supports 30, 60, 120, 144, 240, Match Display Hz, or Unlimited framing paired with High-FPS Speed Sync to keep IOP/SPU2 audio at exact 48 kHz real-time and auto-hold 60 Hz during FMVs.',
          },
          {
            title: 'Depth-Aware Post-Processing (blit.wgsl)',
            detail:
              'Resolves the PS2 GS Z-buffer directly on the GPU with zero CPU readback to drive real-time SSAO, HDR Bloom, SSGI Light Bounce, Filmic Tone Mapping, and Gothic Vignette (all opt-in).',
          },
          {
            title: 'Fast DXC & Multi-Threaded Shader Startup',
            detail:
              'Automatically fetches Microsoft DXC and compiles compute pipelines in parallel across CPU threads alongside live D3D12/Vulkan switching, VSync modes, CRT scanlines, and color grading.',
          },
        ],
      },
      {
        id: 'launcher',
        label: 'Launcher, Achievements & UI',
        eyebrow: 'Gothic Command Hub & Telemetry',
        items: [
          {
            title: 'Native Direct2D Launcher (Shadow Hearts Nocturne.exe)',
            detail:
              'Modern Gothic Direct2D Command Hub featuring an animated Judgment Ring hero, live keys.ini configuration, 110-achievement Trophy Gallery, Save States & Screenshots browser, and quick tools—or launch Shadow Hearts Covenant.exe directly.',
          },
          {
            title: 'Custom 110-Achievement Live EE RAM System',
            detail:
              '110 handcrafted Covenant achievements across 7 tiers—Mark (24), Sigil (19), Crest (15), Sovereign (11), The Covenant Capstone (1), Follies (15), and Curiosities (25 hidden/missable)—tracked live from NTSC-U SSH_SAVE memory.',
          },
          {
            title: 'Ornate Achievement Toasts & Auto-Captures',
            detail:
              'Unlocks trigger a harmonic chime, a TrueType medallion gradient toast (4 themes with smart burst coalescing), and an automatic composited PNG screenshot saved to Pictures/Game Screenshots.',
          },
          {
            title: 'F1 Quick Menu, Compressed Save States & Clean Captures',
            detail:
              'Organized F1 overlay hub with ~10× smaller compressed save states (backward-compatible with legacy .state files), optional F5/F8 slot picker, and clean F12 game-only lossless PNG captures.',
          },
          {
            title: 'Granular Dual-Core SPU2 Audio Controls',
            detail:
              'Independent volume sliders for Music & Voices (SPU2 Core 0), Sound Effects (SPU2 Core 1), UI/Achievement Chimes, Master Volume, Output Device switching, and Audio Time-Stretch.',
          },
        ],
      },
    ],
    quickStart: [
      {
        step: '01',
        title: 'Clone the Repository',
        detail:
          'Download or clone Shadow-Hearts-Nocturne from GitHub. No Visual Studio installation or manual toolchain setup is needed on Windows.',
        command: 'git clone https://github.com/NfgOdin/Shadow-Hearts-Nocturne.git',
      },
      {
        step: '02',
        title: 'Run the One-Click Windows Builder',
        detail:
          'Double-click "Build Shadow Hearts Covenant.cmd". It automatically fetches the portable toolchain (llvm-mingw, CMake, Ninja, Python, MinGit, SDL2, wgpu-native, DXC) and prompts you to drag-and-drop your legally dumped NTSC-U Disc 1 & Disc 2 images.',
        command: 'Build Shadow Hearts Covenant.cmd',
      },
      {
        step: '03',
        title: 'Automatic AOT Translation & Verification',
        detail:
          'The builder unpacks and deduplicates both discs via NTFS hardlinks, verifies every byte against your images, statically recompiles SLUS_210.41 + all three MWo3 overlays, and preserves existing memcard.ps2 and keys.ini files on upgrades.',
      },
      {
        step: '04',
        title: 'Launch Shadow Hearts: Nocturne',
        detail:
          'Double-click "Shadow Hearts Nocturne.exe" for the Gothic Direct2D Command Hub (settings, trophies, saves), or "Shadow Hearts Covenant.exe" to boot directly into the game.',
        command: 'Shadow Hearts Nocturne.exe',
      },
    ],
    controls: [
      { shortcut: 'F1 (or Select+Start / Guide)', action: 'Open / close the Quick Menu Hub (Settings, Save States, Achievements, Screenshot)' },
      { shortcut: 'F5', action: 'Quick Save to active slot (0–9), or open Slot Picker if enabled' },
      { shortcut: 'F8', action: 'Quick Load from active slot (0–9), or open Slot Picker if enabled' },
      { shortcut: 'F6 / F7', action: 'Cycle active Save State slot (0–9)' },
      { shortcut: 'F12', action: 'Take clean game-only lossless PNG screenshot' },
      { shortcut: 'F2', action: 'Cycle picture styles / post-processing filters' },
      { shortcut: 'F11', action: 'Toggle Full Screen' },
      { shortcut: 'Q / E (or L1 / R1)', action: 'Switch Settings tabs (Graphics / Audio / Controls) or Achievement Tier filters' },
    ],
    credits: [
      'Built on ps2-native-recomp (exoteric33) and ps2-web-recomp (Samir Nuri).',
      'Released under the MIT License; MPEG VLC tables adapted from Play! (BSD 2-Clause).',
      'Shadow Hearts: Covenant is a trademark of its respective copyright holders; PlayStation and PS2 are trademarks of Sony Interactive Entertainment. Independent fan-made static recompiler port.',
    ],
  },
];

export function getPortBySlug(slug: string): PcPort | undefined {
  return pcPorts.find((p) => p.slug === slug);
}
