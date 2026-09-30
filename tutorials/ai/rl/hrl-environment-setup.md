# Setting Up the Pokemon Yellow Gym Environment

Configure emulator interfaces, memory buses, and hierarchical reward structures for training autonomous reinforcement learning agents in **Pokemon Yellow**.

---

## 1. Overview & Architecture

The **PokemonYellow-HRL-AI** system implements a two-tier Hierarchical Reinforcement Learning (HRL) model:

1. **High-Level Meta-Controller**: Decides macro objectives (e.g., "Navigate to Viridian Forest", "Heal at PokeCenter", "Train Caterpie to level 7").
2. **Low-Level Sub-Policy**: Executes frame-by-frame controller inputs (D-Pad movement, A/B button interactions, battle menu selections).

---

## 2. Memory Bus Bridge

The agent communicates with the Game Boy emulation runtime via a high-speed memory bus hook. This bypasses slow visual OCR and provides ground-truth environmental state:

```python
# Sample memory bus hook in Python
from pyboy import PyBoy

pyboy = PyBoy('PokemonYellow.gb', window_type='headless')
while not pyboy.tick():
    # Read memory addresses for player coordinates and party health
    player_x = pyboy.get_memory_value(0xD362)
    player_y = pyboy.get_memory_value(0xD361)
    party_count = pyboy.get_memory_value(0xD163)
```

---

## 3. Training the Agent

Start the training pipeline with your chosen hyperparameters:

```bash
python train.py --env PokemonYellow-v0 --algorithm PPO --timesteps 5000000 --parallel-envs 8
```

> [!NOTE]
> Training with headless emulation allows up to 2,000 frames per second per core, enabling rapid multi-agent convergence across exploration milestones.
