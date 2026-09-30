# Installing RiftLink on NeoForge

Learn how to configure and install **RiftLink** on your Minecraft client using the modern NeoForge mod loader.

---

## 1. Prerequisites

Before installing RiftLink, make sure your environment satisfies the following requirements:

- **Minecraft Java Edition** version `1.21.1` (or matching targeted release).
- **NeoForge Loader** installed for your Minecraft profile. You can download the latest installer from the official [NeoForge website](https://neoforged.net/).
- A clean launcher profile with NeoForge selected as the runtime version.

> [!NOTE]
> Make sure to run the vanilla Minecraft profile at least once before installing NeoForge so all base game assets are downloaded.

---

## 2. Mod Placement

1. Download the latest `RiftLink-x.x.x.jar` release binary.
2. Locate your active `.minecraft` directory:
   - **Windows**: Press `Win + R`, type `%appdata%\.minecraft` and press Enter.
   - **Linux**: `~/.minecraft`
   - **macOS**: `~/Library/Application Support/minecraft`
3. Open the `mods` folder (create one if it does not already exist).
4. Move the `RiftLink.jar` file directly into your `mods/` directory.

```text
.minecraft/
├── config/
├── mods/
│   └── RiftLink-1.21.1-1.0.0.jar
└── options.txt
```

---

## 3. Configuration & Boot

Start Minecraft using the **NeoForge** profile in your launcher. Once at the main menu:

1. Click **Mods** to confirm that **RiftLink** appears in the active mod list.
2. Adjust any in-game config options or keybindings according to your gameplay preferences.
