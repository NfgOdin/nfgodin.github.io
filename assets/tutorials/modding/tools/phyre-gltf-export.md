# Exporting 3D Models to glTF with FFX-Phyre-Tool

A complete guide to extracting 3D meshes, skeletons, and textures from Final Fantasy X / X-2 HD Remaster and converting them into the modern open **glTF 2.0** format for Blender workflows.

---

## 1. Background

Final Fantasy X / X-2 HD Remaster utilizes Sony's proprietary **PhyreEngine** architecture. Models are stored in specialized `.phyre` binary containers containing vertex streams, bone matrices, and texture blocks.

**FFX-Phyre-Tool** parses these binary streams and compiles them directly into standard `.gltf` and `.bin` payloads ready for Blender, Maya, or game engines.

---

## 2. Setup

Clone the repository and install required dependencies:

```bash
git clone https://github.com/odinj2010/FFX-Phyre-Tool.git
cd FFX-Phyre-Tool
pip install -r requirements.txt
```

---

## 3. Extracting Models

To unpack a character model or environment chunk, provide the input `.phyre` asset file:

```bash
python phyre_tool.py --extract "c101.phyre" --out "exported_tidus.gltf" --embed-textures
```

### Options:
- `--extract <file>`: Specifies the source `.phyre` binary archive.
- `--out <file>`: Sets the target filename for the exported glTF model.
- `--embed-textures`: Packs DDS/PNG textures directly into the glTF container buffer.

---

## 4. Importing into Blender

1. Open **Blender 4.x+**.
2. Go to **File** &rarr; **Import** &rarr; **glTF 2.0 (.gltf/.glb)**.
3. Select your exported file.
4. The armature, skinning weights, and material shaders will load automatically into your viewport.
