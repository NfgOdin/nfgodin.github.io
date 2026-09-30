# Setting Up FFVIISE Mod Loader

A comprehensive walkthrough for installing and configuring the native **FFVIISE Mod Loader** for the Steam edition of Final Fantasy VII (2026 update).

---

## 1. Overview & Clean Install

**FFVIISE Mod Loader** is a lightweight, zero-overhead native mod loader designed exclusively for the Final Fantasy VII Steam release. It injects directly into the engine's asset subsystem without requiring heavy external launchers, proxy injectors, or cumbersome background processes.

> [!NOTE]
> It is strongly recommended to start with a clean Steam installation. Right-click **FINAL FANTASY VII** in your Steam Library &rarr; **Properties** &rarr; **Installed Files** &rarr; **Verify integrity of game files**.

---

## 2. Directory Layout & Installation

1. Download the latest release archive of **FFVIISE Mod Loader**.
2. Navigate to your Steam installation root directory:
   ```plaintext
   C:\Program Files (x86)\Steam\steamapps\common\FINAL FANTASY VII\
   ```
3. Extract the contents of the mod loader archive directly into this root folder alongside `ff7_en.exe`.

Your game directory should now resemble the following layout:

```text
FINAL FANTASY VII/
├── ff7_en.exe
├── [FFVIISE Mod Loader Binaries]
└── mods/                  <-- Place active mods here
```

> [!TIP]
> If the `mods/` directory does not exist after extraction, you can safely create it manually in the root folder.

---

## 3. Installing & Organizing Mods

Installing mods with FFVIISE is simple and modular:

- Download compatible mods (extracted folders or mod packages).
- Place each mod into its own subfolder within `mods/`:
  ```text
  mods/
  ├── HighResModels/
  ├── RemasteredSoundtrack/
  └── CustomTextures/
  ```

---

## 4. Verification & Launch

Launch the game normally via Steam or by executing `ff7_en.exe`. 

FFVIISE Mod Loader will automatically initialize on startup, load mods alphabetically or according to your load configuration, and stream assets dynamically with zero performance penalty.
