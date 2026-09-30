# Simulating Port Velocity & Box Volume in RuneBox

Master acoustic compliance, air velocity optimization, and cabinet design using the **RuneBox** Audio CAD suite.

---

## 1. Acoustic Compliance & Tuning

When designing high-output subwoofer enclosures, internal net volume and port tuning work as a coupled resonator (Helmholtz oscillator).

- **Net Internal Volume ($V_b$)**: Determines driver compliance and low-end group delay.
- **Port Tuning Frequency ($F_b$)**: Governs where driver excursion is minimized and acoustic port output is maximized.

> [!TIP]
> In RuneBox, adjust the port cross-sectional area to keep port air velocity below **25 m/s** at rated RMS power to eliminate chuffing and turbulent boundary layer separation.

---

## 2. Using the 3D Vector Visualizer

RuneBox computes pure Python 3D vector graphics to render internal partitions, port slot turns, and speaker cutouts without requiring heavy WebGL or external CAD packages.

### Recommended Steps:
1. Input your driver Thiele/Small (T/S) parameters ($F_s$, $Q_{ts}$, $V_{as}$).
2. Specify physical dimension bounds (outer width, height, depth).
3. Select slot port or aeroport configuration.
4. Click **Generate 3D Projection** to inspect port clearance relative to the enclosure rear wall.

---

## 3. Generating Precision Cut Sheets

Once your volume and frequency curves look optimal, click **Export Cut Sheet**. RuneBox calculates:
- Exact board dimensions accounting for material thickness (e.g., 0.75" MDF or Baltic Birch).
- 45-degree corner brace allowances.
- Step-by-step assembly diagrams.
