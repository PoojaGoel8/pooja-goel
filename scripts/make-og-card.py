"""
Draws public/og-card.jpg, the 1200x630 image a link to the site unfurls with
on LinkedIn, Slack, WhatsApp and the rest.

Run it by hand when the headline or the portrait changes:

    python scripts/make-og-card.py

It is not part of the build. It needs Pillow, and it sets the type from the
Windows font folder: Impact standing in for the site's Anton, Segoe UI for
Space Grotesk, Consolas for JetBrains Mono -- each the nearest system face, so
nothing is downloaded. JPEG rather than WebP because LinkedIn does not reliably
accept WebP for previews.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path(r"C:\Windows\Fonts")

PAPER = "#0F0E0C"
INK = "#F2EDE4"
MUTED = "#968D80"
RULE = "#2D2A25"
ACCENT = "#FF6B3D"
SIGNAL = "#5BE38E"

W, H = 1200, 630
SCALE = 2  # draw large, shrink once, for clean edges


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size * SCALE)


def px(value: float) -> int:
    return round(value * SCALE)


card = Image.new("RGB", (W * SCALE, H * SCALE), PAPER)
draw = ImageDraw.Draw(card)

# --- the glow behind the portrait ---------------------------------------
from PIL import ImageFilter

glow = Image.new("RGB", card.size, PAPER)
gx, gy = W - 250, H // 2
ImageDraw.Draw(glow).ellipse(
    (px(gx - 260), px(gy - 260), px(gx + 260), px(gy + 260)), fill="#3A1C10"
)
card = Image.blend(card, glow.filter(ImageFilter.GaussianBlur(px(90))), 1.0)
draw = ImageDraw.Draw(card)

# --- portrait in a circle, as in the hero ---------------------------------
d = 380
cx, cy = W - 250, H // 2
portrait = Image.open(ROOT / "public/assets/images/portrait.webp").convert("RGB")
side = portrait.width
top = round(portrait.height * 0.08)
portrait = portrait.crop((0, top, side, top + side)).resize((px(d), px(d)), Image.LANCZOS)
mask = Image.new("L", portrait.size, 0)
ImageDraw.Draw(mask).ellipse((0, 0, *portrait.size), fill=255)
card.paste(portrait, (px(cx - d / 2), px(cy - d / 2)), mask)
draw.ellipse(
    (px(cx - d / 2 - 22), px(cy - d / 2 - 22), px(cx + d / 2 + 22), px(cy + d / 2 + 22)),
    outline=RULE,
    width=px(1.5),
)

left = 72

# --- status line ----------------------------------------------------------
mono = font("consola.ttf", 17)
draw.ellipse((px(left), px(70), px(left + 10), px(80)), fill=SIGNAL)
x = px(left + 24)
for char in "ONLINE  ·  DATABASE ADMINISTRATOR  ·  SINGAPORE":
    draw.text((x, px(64)), char, font=mono, fill=MUTED)
    x += draw.textlength(char, font=mono) + px(1.6)

# --- the name, poster size ------------------------------------------------
poster = font("impact.ttf", 138)
y = 118
for line in ["POOJA", "GOEL"]:
    draw.text((px(left), px(y)), line, font=poster, fill=INK)
    y += 142
goel_w = draw.textlength("GOEL", font=poster) / SCALE
draw.rectangle(
    (px(left + goel_w + 10), px(y - 46), px(left + goel_w + 34), px(y - 22)), fill=ACCENT
)

# --- the line from the hero -----------------------------------------------
body = font("segoeui.ttf", 30)
x = px(left)
for text, colour in [("Databases that stay up, stay fast, and ", INK), ("stay governed", ACCENT), (".", INK)]:
    draw.text((x, px(H - 120)), text, font=body, fill=colour)
    x += draw.textlength(text, font=body)

card = card.resize((W, H), Image.LANCZOS)
out = ROOT / "public/og-card.jpg"
card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} kB)")
