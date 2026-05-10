#!/usr/bin/env python3
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1] / "dist"
HOST = "0.0.0.0"
PORT = 4173


class CleanUrlHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        translated = Path(super().translate_path(path))
        if translated.exists():
            return str(translated)

        clean_path = path.split("?", 1)[0].split("#", 1)[0].rstrip("/")
        if clean_path and "." not in Path(clean_path).name:
            candidate = ROOT / f"{clean_path.lstrip('/')}.html"
            if candidate.exists():
                return str(candidate)

        return str(translated)

    def handle_one_request(self):
        # Swallow client-side disconnects (curl -I, browser closes) so the
        # server logs them quietly instead of bubbling a non-zero exit.
        try:
            super().handle_one_request()
        except (BrokenPipeError, ConnectionResetError):
            pass


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), CleanUrlHandler)
    print(f"Serving {ROOT} at http://{HOST}:{PORT}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down preview server.", flush=True)
    finally:
        server.server_close()
    sys.exit(0)
