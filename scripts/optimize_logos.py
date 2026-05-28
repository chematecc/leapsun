"""
把公司 logo 放到 public/logos/ 后运行此脚本：
  python3 scripts/optimize_logos.py

处理内容：
  - 去掉白色/浅色背景，转为透明 PNG
  - 统一尺寸（最大 320×160，保持比例）
  - 覆盖保存原文件
"""
import os
import sys
from PIL import Image

LOGOS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'logos')
MAX_W, MAX_H = 320, 160
BG_THRESHOLD = 235  # 像素 RGB 均高于此值视为背景色


def remove_white_bg(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r > BG_THRESHOLD and g > BG_THRESHOLD and b > BG_THRESHOLD:
                pixels[x, y] = (r, g, b, 0)
    return img


def crop_to_content(img: Image.Image, padding: int = 6) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    l = max(0, l - padding)
    t = max(0, t - padding)
    r = min(img.width, r + padding)
    b = min(img.height, b + padding)
    return img.crop((l, t, r, b))


def resize_to_fit(img: Image.Image, max_w: int, max_h: int) -> Image.Image:
    w, h = img.size
    if w <= max_w and h <= max_h:
        return img
    ratio = min(max_w / w, max_h / h)
    return img.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)


def process(path: str):
    name = os.path.basename(path)
    try:
        img = Image.open(path)
        img = remove_white_bg(img)
        img = crop_to_content(img)
        img = resize_to_fit(img, MAX_W, MAX_H)
        out = os.path.splitext(path)[0] + '.png'
        img.save(out, optimize=True)
        if out != path:
            os.remove(path)
        print(f"  ✓ {name} → {os.path.basename(out)}  {img.size}")
    except Exception as e:
        print(f"  ✗ {name}: {e}")


def main():
    files = [
        f for f in os.listdir(LOGOS_DIR)
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp'))
        and not f.startswith('.')
    ]
    if not files:
        print("public/logos/ 目录为空，请先放入图片文件。")
        sys.exit(0)

    print(f"处理 {len(files)} 个文件...")
    for f in sorted(files):
        process(os.path.join(LOGOS_DIR, f))
    print("完成。")


if __name__ == '__main__':
    main()
