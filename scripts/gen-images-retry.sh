#!/bin/bash
# Retry failed image generations sequentially with delays.

set -e
OUT_PRODUCTS=/home/z/my-project/public/products
OUT_SCENES=/home/z/my-project/public/scenes

declare -A PRODUCTS=(
  ["aspen-lounge"]="A single luxury cream boucle three-seater sofa centered on a white background, professional studio product photography, soft daylight from the left, gentle shadow underneath, minimalist, high-end editorial catalog style, ultra-detailed fabric texture"
  ["monaco-sectional"]="A modern sand-beige linen L-shape sectional sofa with chaise extension, on a warm cream background, professional studio product photography, soft directional lighting, minimalist editorial catalog style, fabric texture detail"
  ["hudson-velvet"]="A walnut brown velvet three-seater sofa with brass sabre legs, on a dark charcoal gradient background, dramatic studio lighting, professional product photography, rich velvet sheen, luxury editorial style"
  ["savona-recliner"]="A single cognac leather power recliner armchair with chrome accents, on a warm grey background, professional studio product photography, soft directional lighting, full-grain leather detail, luxury editorial style"
)

declare -A SCENES=(
  ["gallery-1"]="A luxury penthouse living room with a cream sofa, floor-to-ceiling windows showing city skyline at golden hour, marble coffee table, brass accents, professional architectural photography"
  ["gallery-2"]="A library study room with a walnut velvet wingback chair, floor-to-ceiling bookshelves, brass reading lamp, oriental rug, warm ambient lighting, professional interior photography"
  ["gallery-3"]="A sunlit conservatory sunroom with a rattan and cream linen sofa, potted palms, terracotta tile floor, bright natural daylight, professional interior photography, greenhouse aesthetic"
  ["gallery-4"]="A modern Brooklyn loft living room with a low-profile cream sofa, exposed brick wall, steel-framed windows, oak coffee table, industrial luxury aesthetic, professional interior photography"
  ["gallery-5"]="A coastal retreat living room with a cream linen sofa, driftwood coffee table, jute rug, large windows showing ocean view, bright natural daylight, professional interior photography"
  ["gallery-6"]="A garden room with a cream boucle sofa, large sliding glass doors opening to a green garden, marble side table, fiddle leaf fig plant, bright natural daylight, professional interior photography"
  ["cat-bedroom"]="A serene bedroom with an upholstered cream velvet bed, walnut nightstands, brass swing-arm lamps, linen bedding, large windows with soft morning daylight, professional interior photography, hotel-luxe aesthetic"
  ["cat-dining"]="A sculptural dining room with a solid walnut table surrounded by cream upholstered dining chairs, brass pendant light, hardwood floor, warm ambient lighting, professional interior photography, editorial quality"
  ["before-empty"]="An empty modern living room with bare hardwood floor, blank white walls, single tall window with soft daylight, no furniture, real estate photography, neutral and unfurnished"
  ["after-styled"]="A beautifully styled modern living room with a walnut brown velvet sofa, brass floor lamp, marble coffee table, potted fiddle leaf fig plant, warm natural daylight, professional interior photography, luxury aesthetic"
)

for name in "${!PRODUCTS[@]}"; do
  out_file="${OUT_PRODUCTS}/${name}.jpg"
  if [ -f "$out_file" ]; then
    echo "SKIP $name"
    continue
  fi
  echo "GEN  $name"
  z-ai image -p "${PRODUCTS[$name]}" -o "$out_file" -s 1344x768 > /dev/null 2>&1
  if [ $? -eq 0 ] && [ -f "$out_file" ]; then
    echo "OK   $name ($(stat -c%s "$out_file") bytes)"
  else
    echo "FAIL $name - retrying after 5s"
    sleep 5
    z-ai image -p "${PRODUCTS[$name]}" -o "$out_file" -s 1344x768 > /dev/null 2>&1
    [ -f "$out_file" ] && echo "OK   $name on retry ($(stat -c%s "$out_file") bytes)" || echo "FAIL $name again"
  fi
  sleep 2
done

for name in "${!SCENES[@]}"; do
  out_file="${OUT_SCENES}/${name}.jpg"
  if [ -f "$out_file" ]; then
    echo "SKIP $name"
    continue
  fi
  echo "GEN  $name"
  z-ai image -p "${SCENES[$name]}" -o "$out_file" -s 1344x768 > /dev/null 2>&1
  if [ $? -eq 0 ] && [ -f "$out_file" ]; then
    echo "OK   $name ($(stat -c%s "$out_file") bytes)"
  else
    echo "FAIL $name - retrying after 5s"
    sleep 5
    z-ai image -p "${SCENES[$name]}" -o "$out_file" -s 1344x768 > /dev/null 2>&1
    [ -f "$out_file" ] && echo "OK   $name on retry ($(stat -c%s "$out_file") bytes)" || echo "FAIL $name again"
  fi
  sleep 2
done

echo ""
echo "=== Final count ==="
echo "Products:"
ls $OUT_PRODUCTS/*.jpg 2>/dev/null | wc -l
echo "Scenes:"
ls $OUT_SCENES/*.jpg 2>/dev/null | wc -l
