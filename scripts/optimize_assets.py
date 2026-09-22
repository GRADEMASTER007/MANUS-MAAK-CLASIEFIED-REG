from pathlib import Path
from PIL import Image

source_dir = Path('/home/ubuntu/marketplace-hub/public/images')
for source in sorted(source_dir.glob('pillar-*.jpg')):
    destination = source.with_name(f'{source.stem}.web.jpg')
    with Image.open(source) as image:
        image = image.convert('RGB')
        image.thumbnail((1400, 1050), Image.Resampling.LANCZOS)
        image.save(destination, format='JPEG', quality=78, optimize=True, progressive=True)
        print(f'{source.name} -> {destination.name}: {destination.stat().st_size} bytes')
