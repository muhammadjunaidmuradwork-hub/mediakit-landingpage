from pathlib import Path
from PIL import Image, ImageDraw
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
PUBLIC = ROOT / "public" / "downloads"
TMP = ROOT / "tmp" / "pdfs"
IMAGES = ROOT / "public" / "images"
for folder in (OUT, PUBLIC, TMP):
    folder.mkdir(parents=True, exist_ok=True)

SUN = HexColor("#F5D90A")
INK = HexColor("#11110F")
PAPER = HexColor("#F4F1E8")
MUTED = HexColor("#6A685F")
W, H = A4


def prepare_assets():
    for name in ("magazine-feature", "daraz-award"):
        src = IMAGES / f"{name}.png"
        out = IMAGES / f"{name}.webp"
        with Image.open(src) as image:
            image.convert("RGB").save(out, "WEBP", quality=84, method=6)

    for name in ("magazine-feature", "daraz-award"):
        src = IMAGES / f"{name}.png"
        out = TMP / f"{name}-crop.jpg"
        with Image.open(src) as image:
            rgb = image.convert("RGB")
            target_ratio = 1.22
            ratio = rgb.width / rgb.height
            if ratio < target_ratio:
                new_h = int(rgb.width / target_ratio)
                top = int((rgb.height - new_h) * (0.22 if name == "magazine-feature" else 0.5))
                rgb = rgb.crop((0, top, rgb.width, top + new_h))
            else:
                new_w = int(rgb.height * target_ratio)
                left = (rgb.width - new_w) // 2
                rgb = rgb.crop((left, 0, left + new_w, rgb.height))
            rgb.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            rgb.save(out, "JPEG", quality=88, optimize=True)

    # ReportLab embeds PNG pixel data with lossless compression. Large photos can
    # therefore make the final PDF exceed Cloudflare's per-asset upload limit.
    # These JPEG derivatives are used only inside the PDF; website assets remain
    # untouched and retain their original quality/transparency.
    with Image.open(IMAGES / "annie-profile.webp") as image:
        rgba = image.convert("RGBA")
        background = Image.new("RGB", rgba.size, "#F5D90A")
        background.paste(rgba, mask=rgba.getchannel("A"))
        background.save(TMP / "annie-profile-pdf.jpg", "JPEG", quality=88, optimize=True)

    with Image.open(IMAGES / "daraz-affiliate-award.webp") as image:
        award = image.convert("RGB")
        award.thumbnail((1200, 1600), Image.Resampling.LANCZOS)
        award.save(TMP / "daraz-affiliate-award-pdf.jpg", "JPEG", quality=84, optimize=True)

    icon = Image.new("RGB", (64, 64), "#F5D90A")
    draw = ImageDraw.Draw(icon)
    draw.ellipse((12, 12, 52, 52), fill="#11110F")
    draw.ellipse((24, 24, 40, 40), fill="#F5D90A")
    icon.save(ROOT / "public" / "favicon.png")


def text(c, value, x, y, size=11, font="Helvetica", color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def right_text(c, value, x, y, size=11, font="Helvetica", color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawRightString(x, y, value)


def wrapped(c, value, x, y, max_width, size=11, leading=15, font="Helvetica", color=INK):
    words = value.split()
    lines, current = [], ""
    for word in words:
        attempt = f"{current} {word}".strip()
        if stringWidth(attempt, font, size) <= max_width:
            current = attempt
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    for line in lines:
        text(c, line, x, y, size, font, color)
        y -= leading
    return y


def footer(c, page, dark=False):
    color = white if dark else INK
    text(c, "tireddesimom", 36, 24, 8, "Helvetica-Bold", color)
    right_text(c, f"ANNIE AZHAR  /  {page:02d}", W - 36, 24, 7, "Helvetica-Bold", color)


def media_kit():
    path = OUT / "annie-azhar-media-kit.pdf"
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle("Annie Azhar - tireddesimom Media Kit")
    c.setAuthor("Annie Azhar")

    # Cover
    c.setFillColor(SUN)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, "UGC CREATOR  /  LIFESTYLE  /  PAKISTAN", 36, H - 48, 8, "Helvetica-Bold")
    text(c, "REAL LIFE.", 36, H - 150, 42, "Helvetica-Bold")
    text(c, "USEFUL IDEAS.", 36, H - 198, 42, "Helvetica-Bold")
    text(c, "ZERO PRETENCE.", 36, H - 246, 42, "Helvetica-Bold")
    c.setStrokeColor(INK)
    c.setLineWidth(1)
    c.line(36, H - 276, W - 36, H - 276)
    text(c, "Annie Azhar", 36, H - 320, 22, "Helvetica-Bold")
    text(c, "(Qurratulain)  /  @tireddesimom", 36, H - 341, 10)
    wrapped(c, "Telecom engineer turned creator. Honest reviews, hands-on DIY, useful tools, viral recipes, gym life and a serious love of meetha.", 36, H - 390, 290, 12, 17)
    c.drawImage(ImageReader(str(TMP / "annie-profile-pdf.jpg")), 330, 150, 228, 228, preserveAspectRatio=True, anchor="c")
    c.setFillColor(INK)
    c.rect(310, 68, 248, 40, fill=1, stroke=0)
    text(c, "MEDIA KIT  /  2026", 325, 83, 9, "Helvetica-Bold", white)
    footer(c, 1)
    c.showPage()

    # Audience
    c.setFillColor(INK)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, "01  /  AUDIENCE", 36, H - 48, 8, "Helvetica-Bold", SUN)
    text(c, "ATTENTION THAT", 36, H - 118, 35, "Helvetica-Bold", white)
    text(c, "MOVES.", 36, H - 158, 35, "Helvetica-Bold", SUN)
    stats = [("5.2M", "VIEWS / 30 DAYS"), ("1.53M", "UNIQUE VIEWERS"), ("2.2M", "STORY VIEWS"), ("1.2M", "REEL VIEWS")]
    y = H - 250
    for index, (value, label) in enumerate(stats):
        x = 36 + (index % 2) * 270
        row_y = y - (index // 2) * 120
        text(c, value, x, row_y, 34, "Helvetica-Bold", white)
        text(c, label, x, row_y - 20, 7, "Helvetica-Bold", HexColor("#B6B3AA"))
    c.setStrokeColor(HexColor("#444440"))
    c.line(36, 330, W - 36, 330)
    text(c, "81.5%", 36, 275, 40, "Helvetica-Bold", SUN)
    text(c, "WOMEN", 36, 253, 8, "Helvetica-Bold", white)
    text(c, "83.2%", 210, 275, 40, "Helvetica-Bold", SUN)
    text(c, "AGES 25-44", 210, 253, 8, "Helvetica-Bold", white)
    text(c, "79.6%", 384, 275, 40, "Helvetica-Bold", SUN)
    text(c, "PAKISTAN", 384, 253, 8, "Helvetica-Bold", white)
    wrapped(c, "A Pakistan-first community led by women making household, lifestyle, wellness and family purchase decisions.", 36, 190, W - 72, 15, 21, "Helvetica", white)
    text(c, "Source: Instagram Insights, trailing 30-day snapshot supplied August 2026.", 36, 84, 7, "Helvetica", HexColor("#918F87"))
    footer(c, 2, dark=True)
    c.showPage()

    # Work and trust
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, "02  /  CONTENT + TRUST", 36, H - 48, 8, "Helvetica-Bold")
    text(c, "BUILT TO BE", 36, H - 112, 34, "Helvetica-Bold")
    text(c, "SAVED, SHARED, USED.", 36, H - 150, 34, "Helvetica-Bold")
    pillars = ["DIY + TOOLS", "HONEST REVIEWS", "FOOD + MEETHA", "FITNESS", "EVERYDAY LIVING"]
    y = H - 205
    for index, item in enumerate(pillars):
        c.setFillColor(SUN if index % 2 == 0 else white)
        c.rect(36, y - 31, W - 72, 40, fill=1, stroke=1)
        text(c, f"0{index + 1}", 48, y - 17, 8, "Helvetica-Bold")
        text(c, item, 82, y - 18, 12, "Helvetica-Bold")
        y -= 48
    text(c, "SELECTED BRAND PARTNERS", 36, 335, 8, "Helvetica-Bold", MUTED)
    partner_lines = [
        "SHAN  /  DARAZ  /  JAZZ  /  TAPMAD  /  DIAMOND PAINTS",
        "BLUEBIRD PAINTS  /  ASTONISH  /  PATEX  /  POPBAR",
        "ALPINEBEAR  /  ROLLOVER KIDS COMPANY  /  ELO",
        "POWERHOUSE EXPRESS  /  MTRONIC  /  TECHMANISTAN",
        "ANAAJPUR  /  TANDRUSTE  /  HAIR PANTRY  /  SKIN PANTRY",
    ]
    y = 305
    for line in partner_lines:
        text(c, line, 36, y, 8.2, "Helvetica-Bold")
        y -= 22
    c.drawImage(ImageReader(str(TMP / "daraz-affiliate-award-pdf.jpg")), 340, 48, 218, 170, preserveAspectRatio=True, anchor="c")
    text(c, "DARAZ ECOMMERCE SUMMIT", 36, 132, 7, "Helvetica-Bold", MUTED)
    text(c, "BEST AFFILIATE", 36, 105, 22, "Helvetica-Bold")
    text(c, "INFLUENCER OF THE YEAR", 36, 80, 18, "Helvetica-Bold")
    footer(c, 3)
    c.showPage()

    # Contact
    c.setFillColor(SUN)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, "03  /  LET'S COLLABORATE", 36, H - 48, 8, "Helvetica-Bold")
    text(c, "TRUST OVER", 36, H - 160, 48, "Helvetica-Bold")
    text(c, "THEATRE.", 36, H - 214, 48, "Helvetica-Bold")
    wrapped(c, "Available for reels, collab posts, story-led launches, static content, cross-platform packages and paid usage rights.", 36, H - 285, 405, 14, 20)
    c.setFillColor(INK)
    c.rect(36, 270, W - 72, 165, fill=1, stroke=0)
    text(c, "STANDARD DELIVERY WINDOW", 58, 400, 7, "Helvetica-Bold", SUN)
    text(c, "TWO WEEKS", 58, 360, 28, "Helvetica-Bold", white)
    text(c, "PROFESSIONAL EMAIL", 58, 320, 7, "Helvetica-Bold", HexColor("#AAA89F"))
    text(c, "tireddesimom@gmail.com", 58, 292, 18, "Helvetica-Bold", white)
    text(c, "INSTAGRAM", 36, 205, 7, "Helvetica-Bold", MUTED)
    text(c, "@tireddesimom", 36, 177, 20, "Helvetica-Bold")
    text(c, "Rate card available as a separate PDF.", 36, 98, 10)
    footer(c, 4)
    c.save()
    return path


def rate_card():
    path = OUT / "annie-azhar-rate-card.pdf"
    c = canvas.Canvas(str(path), pagesize=A4, pageCompression=1)
    c.setTitle("Annie Azhar - Rate Card")
    c.setAuthor("Annie Azhar")
    c.setFillColor(SUN)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    text(c, "tireddesimom", 36, H - 45, 12, "Helvetica-Bold")
    right_text(c, "RATE CARD  /  PKR", W - 36, H - 45, 8, "Helvetica-Bold")
    text(c, "LET'S MAKE", 36, H - 112, 37, "Helvetica-Bold")
    text(c, "SOMETHING USEFUL.", 36, H - 154, 37, "Helvetica-Bold")
    rates = [
        ("01", "Detailed story shout", "25K"),
        ("02", "Monthly 10-story package", "35K"),
        ("03", "Static post", "40K"),
        ("04", "Reel only", "60K"),
        ("05", "Reel + collab + ad rights", "85K"),
        ("06", "Ad rights - 3 months", "15K"),
        ("07", "Cross-platform posting", "100K"),
    ]
    y = H - 220
    c.setStrokeColor(INK)
    for number, item, price in rates:
        c.line(36, y + 15, W - 36, y + 15)
        text(c, number, 36, y - 8, 8, "Helvetica-Bold")
        text(c, item, 75, y - 10, 12, "Helvetica-Bold")
        right_text(c, price, W - 36, y - 10, 18, "Helvetica-Bold")
        y -= 58
    c.line(36, y + 15, W - 36, y + 15)
    c.setFillColor(INK)
    c.rect(36, 82, W - 72, 92, fill=1, stroke=0)
    text(c, "STANDARD DELIVERY", 55, 142, 7, "Helvetica-Bold", SUN)
    text(c, "Two weeks", 55, 112, 20, "Helvetica-Bold", white)
    right_text(c, "tireddesimom@gmail.com", W - 55, 112, 12, "Helvetica-Bold", white)
    text(c, "Rates are quoted in Pakistani rupees. Final scope and usage terms are confirmed in writing.", 36, 50, 7, "Helvetica", MUTED)
    c.save()
    return path


if __name__ == "__main__":
    prepare_assets()
    for result in (media_kit(), rate_card()):
        public_path = PUBLIC / result.name
        public_path.write_bytes(result.read_bytes())
        print(result)
