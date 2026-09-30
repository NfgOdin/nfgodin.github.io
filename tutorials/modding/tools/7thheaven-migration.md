# Converting IRO Mods with 7thHeavenToFFVIIModLoader

Step-by-step instructions on converting classic 7th Heaven `.iro` mod packages into native folder structures ready for modern mod loaders.

---

## 1. Overview

Legacy modding communities for Final Fantasy VII heavily relied on proprietary `.iro` container formats bundled for the 7th Heaven mod manager. Modern native loaders (such as FFVIISE Mod Loader) operate on transparent file system directories, eliminating overhead and proprietary compression layers.

The **7thHeavenToFFVIIModLoader** converter automates this migration process.

---

## 2. Requirements & Installation

The converter is written in Python 3 and requires standard library dependencies:

- **Python 3.10+** installed on your system.
- Clone or download the repository from GitHub:

```bash
git clone https://github.com/odinj2010/7thHeavenToFFVIIModLoader.git
cd 7thHeavenToFFVIIModLoader
```

---

## 3. Running the Extraction

Execute the conversion script pointing to your `.iro` archive and destination folder:

```bash
python convert.py --input "C:/Mods/SourceMod.iro" --output "C:/Games/FINAL FANTASY VII/mods/SourceMod"
```

### CLI Arguments

| Argument | Description | Required |
| :--- | :--- | :--- |
| `--input`, `-i` | Path to the `.iro` archive file | Yes |
| `--output`, `-o` | Destination directory for unpacked assets | Yes |
| `--verbose` | Output detailed extraction progress and file headers | No |

> [!TIP]
> You can batch process multiple `.iro` files by pointing the script to an entire directory of archives using `--batch`.
