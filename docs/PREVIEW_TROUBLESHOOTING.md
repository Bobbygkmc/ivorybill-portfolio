# Preview Troubleshooting

Use these steps from the repository root:

1. `cd ~/ivorybill-portfolio`
2. `npm run build`
3. `npm run preview`
4. On a device connected to the same Tailscale network, open:
   `http://100.113.241.59:4173`

If the page does not load, run these checks:

```bash
hostname -I
tailscale ip -4
ss -ltnp | grep 4173
curl -I http://127.0.0.1:4173/
curl -I http://100.113.241.59:4173/
```

Common causes:

- The preview server is not running.
- The browser is using the wrong IP address.
- Tailscale is not connected on the browser device.
- A local firewall is blocking inbound traffic.
- Port `4173` is already in use by another process.
- The browser device is on cellular or another route that is not using Tailscale.

The preview command binds to `0.0.0.0` so it can accept local network and Tailscale connections:

```bash
npm run preview
```
