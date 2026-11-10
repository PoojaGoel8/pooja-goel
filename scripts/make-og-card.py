"""
Draws public/og-card.jpg, the 1200x630 image a link to the site unfurls with
on LinkedIn, Slack, WhatsApp and the rest.

Run it by hand when the headline or the portrait changes:

    python scripts/make-og-card.py

It is not part of the build. It needs Pillow, and it sets the type in Georgia
and Segoe UI from the Windows font folder -- Georgia being the fallback the
site itself names for its display face. JPEG rather than WebP because LinkedIn
does not reliably accept WebP for previews.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = Path(r"C:\Windows\Fonts")

PAPER = "#FBF8F4"
INK = "#1A1714"
MUTED = "#766B60"
RULE = "#E4DACE"
ACCENT = "#B9472A"
ACCENT_SOFT = "#F2DCD2"

W, H = 1200, 630
SCALE = 2  # draw large, shrink once, for clean edges


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size * SCALE)


def px(value: float) -> int:
    return round(value * SCALE)


card = Image.new("RGB", (W * SCALE, H * SCALE), PAPER)
draw = ImageDraw.Draw(card)

# --- portrait, right, with the soft disc the site puts behind it -----------
photo_w, photo_h = 368, 460
photo_x, photo_y = W - 84 - photo_w, (H - photo_h) // 2

draw.ellipse(
    (px(photo_x - 34), px(photo_y - 34), px(photo_x + 106), px(photo_y + 106)),
    fill=ACCENT_SOFT,
)

portrait = Image.open(ROOT / "public/assets/images/portrait.webp").convert("RGB")
portrait = portrait.resize((px(photo_w), px(photo_h)), Image.LANCZOS)
mask = Image.new("L", portrait.size, 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, *portrait.size), radius=px(4), fill=255)
card.paste(portrait, (px(photo_x), px(photo_y)), mask)

# --- eyebrow ---------------------------------------------------------------
left = 84
eyebrow = font("seguisb.ttf", 19)
x = px(left)
for char in "DATABASE ADMINISTRATOR  ·  SINGAPORE":
    draw.text((x, px(92)), char, font=eyebrow, fill=ACCENT)
    x += draw.textlength(char, font=eyebrow) + px(3.2)

# --- headline, the hero line from the home page ----------------------------
display = font("georgia.ttf", 70)
lines = [
    [("Databases that", INK)],
    [("stay up, stay fast,", INK)],
    [("and ", INK), ("stay governed", ACCENT), (".", INK)],
]
y = 150
for line in lines:
    x = px(left)
    for text, colour in line:
        draw.text((x, px(y)), text, font=display, fill=colour)
        x += draw.textlength(text, font=display)
    y += 86

# --- name, on a rule, with the accent dot from the header ------------------
draw.line((px(left), px(468), px(left + 560), px(468)), fill=RULE, width=px(1))

name = font("georgia.ttf", 34)
draw.text((px(left), px(496)), "Pooja Goel", font=name, fill=INK)
name_w = draw.textlength("Pooja Goel", font=name) / SCALE
dot_x, dot_y = left + name_w + 16, 496 + 27
draw.ellipse((px(dot_x), px(dot_y), px(dot_x + 9), px(dot_y + 9)), fill=ACCENT)

card = card.resize((W, H), Image.LANCZOS)
out = ROOT / "public/og-card.jpg"
card.save(out, "JPEG", quality=88, optimize=True, progressive=True)
print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} kB)")
