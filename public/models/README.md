# 3D Human Companion Model Guide

To activate the full 3D interactive character in your portfolio, place your `.glb` file here:

```
public/models/portfolio-boy.glb
```

---

## 1. Where to Get Your 3D Cartoon Model
You can get a free, rigged 3D character in minutes:

- **Ready Player Me (Recommended)**: [readyplayer.me](https://readyplayer.me)
  - Create a custom cartoon avatar with hoodie, jeans, sneakers, and expressive eyes.
  - Export directly as `.glb`.

- **Mixamo**: [mixamo.com](https://www.mixamo.com)
  - Browse free characters and download individual animations (`idle`, `wave`, `walk`, `run`, `jump`, `sitting`, etc.).

- **Sketchfab**: [sketchfab.com](https://sketchfab.com)
  - Search for "cartoon human animated GLB free".

---

## 2. Animation Clip Names Supported
The companion's animation engine automatically matches any of these common clip names:

| State | Supported Clip Names |
|---|---|
| **Idle** | `idle`, `Idle`, `Standing Idle`, `mixamo.com` |
| **Wave** | `wave`, `Wave`, `Waving`, `Standing Wave`, `right arm wave` |
| **Walk** | `walk`, `Walk`, `Walking`, `Slow Walk` |
| **Run** | `run`, `Run`, `Running`, `Sprint` |
| **Jump** | `jump`, `Jump`, `Jumping`, `Jump In Place` |
| **Look** | `look`, `Look Around`, `Looking`, `Head Look` |
| **Sit** | `sit`, `Sitting`, `Sitting Idle` |
| **Think** | `think`, `Thinking`, `Thinking Idle` |
| **Celebrate** | `celebrate`, `Celebrate`, `Victory Idle`, `Happy Idle` |

---

## 3. How It Works
- As soon as `portfolio-boy.glb` is placed in this directory, the website will detect it automatically via pre-flight check.
- It will instantly mount the **React Three Fiber** WebGL canvas with real-time head tracking, Section-based reactions, and smooth clip transitions.
- While the file is not yet placed, a cute stylized animated cartoon placeholder is displayed so the website remains 100% bug-free and crash-free.

