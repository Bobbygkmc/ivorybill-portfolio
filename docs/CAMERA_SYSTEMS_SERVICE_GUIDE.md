# Camera Systems Service Guide

This document defines the scope and limits of camera and network-video
work offered through `dev.uyammadu.com`. It exists to be unambiguous
about what is and is not in scope, and to provide a written reference
for owners and staff after a handoff.

---

## What is in scope

- **Install** — mounting Power-over-Ethernet (PoE) cameras, running
  Cat6 cabling along surface paths or through accessible voids,
  connecting cameras to a PoE switch or PoE-capable NVR.
- **Configure** — setting camera parameters (resolution, frame rate,
  detection zones, schedules), connecting cameras to an NVR or
  software-based recorder such as Frigate.
- **Manage footage** — setting retention windows, configuring storage
  rotation, exporting clips on request, and deleting footage on the
  owner's instruction.
- **Remote access** — setting up secure remote viewing using vendor
  apps (Reolink, Frigate / Home Assistant), private VPN tunnels
  (Tailscale, ZeroTier, WireGuard), or owner-supplied cloud accounts.
- **Storage and retention planning** — sizing local disks for the
  required retention period, recommending RAID vs. single-disk
  configurations, and documenting expected retention behavior.
- **Documentation** — written summary of how the system works, where
  cameras are mounted, what each camera is named, where the recorder
  lives, how to view footage, and how to export clips.
- **Transfer of ownership** — turning over all credentials, accounts,
  hardware ownership, and configuration to the customer at the end of
  the engagement.
- **Privacy-conscious handoff** — wiping installer accounts, rotating
  default passwords, and confirming with the owner that no third party
  retains access to the system.
- **Training for owner and staff** — short walkthroughs covering
  daily use, footage export, and what to do if a camera goes offline.

---

## What is not in scope

This service is positioned as **camera, network, and NVR setup and
support**. It is **not** any of the following:

- Licensed alarm system installation or monitoring
- Permitted low-voltage or electrical work where local code requires
  a licensed contractor
- Active 24/7 monitoring or central station service
- Forensic chain-of-custody footage handling for legal proceedings
- Sale or resale of branded security packages

When a project requires any of the above, the customer is referred to
a licensed local contractor and the work is scoped around their
responsibilities.

---

## Typical install workflow

1. **Walkthrough** — on-site visit, document camera coverage goals,
   identify mounting points, identify cable paths, identify the
   recorder location, identify network and power constraints.
2. **Proposal** — written scope, hardware list at cost, labor estimate,
   retention plan, remote access plan.
3. **Hardware procurement** — ordered and itemized; owner pays for
   hardware.
4. **Install day** — cameras mounted, cables run, switch and NVR
   placed, system brought online.
5. **Configuration** — naming, detection zones, schedules, retention,
   remote viewing.
6. **Documentation** — written handoff package created.
7. **Handoff session** — short walkthrough with the owner; owner
   verifies they can view footage, export a clip, and recognize their
   own login as the only privileged account.
8. **Optional follow-up** — system check at 30 days. Bundled into a
   retainer if the owner wants ongoing support.

---

## Retention and storage planning

A short reference for sizing decisions.

| Cameras | Resolution | FPS | Retention | Approx. storage |
| ------- | ---------- | --- | --------- | --------------- |
| 4       | 4MP        | 15  | 14 days   | 1 – 2 TB        |
| 4       | 4MP        | 15  | 30 days   | 2 – 4 TB        |
| 8       | 4MP        | 15  | 14 days   | 2 – 4 TB        |
| 8       | 4MP        | 15  | 30 days   | 4 – 8 TB        |

Final sizing depends on motion-only vs. continuous recording,
compression codec (H.264 vs. H.265), bitrate, and how often the
cameras are triggered. Numbers above are conservative.

---

## Remote viewing options

| Option                  | Notes                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| Vendor cloud (Reolink)  | Easiest. Subject to vendor terms and possible subscription fees.   |
| Frigate + Home Assistant| Owner-controlled. Requires owner-managed remote access.            |
| Tailscale / WireGuard   | Private network, no public exposure of the recorder.               |
| Direct port forward     | **Not recommended.** Avoided unless the owner specifically asks.   |

Default recommendation is Tailscale or vendor-cloud, depending on the
owner's comfort level.

---

## Privacy and handoff principles

- The owner is the sole privileged account holder after handoff.
- Default vendor passwords are rotated before handoff.
- Installer accounts are removed.
- Public proof materials may show hardware, topology diagrams, and
  sanitized handoff examples, but never private footage.
- Faces, addresses, license plates, credentials, account screens, and
  live or exported footage stay private.
- Footage is deleted on the owner's instruction at any time, no
  questions asked.
- The owner receives written documentation that includes how to wipe
  the system entirely if it is ever sold, retired, or transferred.

---

## Owner handoff checklist

Provided to the owner in writing on the last day of the engagement.

- [ ] Owner has received a written summary of the install
- [ ] Owner has logged in and viewed live footage
- [ ] Owner has exported a test clip
- [ ] Owner has rotated their account password
- [ ] Installer account has been removed
- [ ] Owner has been shown how to add or remove a user
- [ ] Owner knows where the recorder lives and how it is powered
- [ ] Owner has the warranty and serial information for each camera
- [ ] Owner knows how to contact us for follow-up support
