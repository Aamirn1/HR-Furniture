#!/bin/bash
# Generate professional sofa images in parallel batches.
# Each generation takes ~30-60s. Running 3 in parallel keeps total time reasonable.

set -e
OUT_PRODUCTS=/home/z/my-project/public/products
OUT_SCENES=/home/z/my-project/public/scenes

# === Featured Collection product images (6 distinct sofas) ===
declare -A PRODUCTS=(
  ["aspen-lounge"]="A single luxury cream boucle three-seater sofa centered on a white background, professional studio product photography, soft daylight from the left, gentle shadow underneath, minimalist, high-end editorial catalog style, ultra-detailed fabric texture"
  ["monaco-sectional"]="A modern sand-beige linen L-shape sectional sofa with chaise extension, on a warm cream background, professional studio product photography, soft directional lighting, minimalist editorial catalog style, fabric texture detail"
  ["hudson-velvet"]="A walnut brown velvet three-seater sofa with brass sabre legs, on a dark charcoal gradient background, dramatic studio lighting, professional product photography, rich velvet sheen, luxury editorial style"
  ["kyoto-low"]="A low-profile oatmeal wool three-seater sofa with slim oak legs, on a soft ivory background, professional studio product photography, soft daylight, minimalist Japanese-inspired editorial style, fabric weave detail"
  ["savona-recliner"]="A single cognac leather power recliner armchair with chrome accents, on a warm grey background, professional studio product photography, soft directional lighting, full-grain leather detail, luxury editorial style"
  ["riviera-corner"]="A cream linen corner sofa with deep seats and removable cushions, on a warm white background, professional studio product photography, soft natural daylight, editorial catalog style, fabric texture detail"
)

# === Category / scene images (interior settings) ===
declare -A SCENES=(
  ["cat-luxury"]="A luxury modern living room interior featuring a cream boucle sofa, walnut hardwood floor, marble coffee table, brass accents, tall windows with soft natural daylight, minimalist Scandinavian design, professional architectural photography"
  ["cat-lshape"]="A contemporary living room with a large L-shape sectional sofa in sand linen, oak wood floor, woven rug, floor lamp, large windows with natural light, professional interior photography, editorial quality"
  ["cat-sectional"]="A spacious family living room with a deep cream sectional sofa, marble side tables, fiddle leaf fig plant, hardwood floor, warm natural daylight, professional interior photography, aspirational luxury aesthetic"
  ["cat-recliner"]="A private home media room with a single cognac leather recliner armchair, dark walnut wall paneling, soft ambient lighting, brass floor lamp, professional interior photography, cozy luxury aesthetic"
  ["cat-bedroom"]="A serene bedroom with an upholstered cream velvet bed, walnut nightstands, brass swing-arm lamps, linen bedding, large windows with soft morning daylight, professional interior photography, hotel-luxe aesthetic"
  ["cat-dining"]="A sculptural dining room with a solid walnut table surrounded by cream upholstered dining chairs, brass pendant light, hardwood floor, warm ambient lighting, professional interior photography, editorial quality"
  ["cat-tv-console"]="A modern living room with a matte walnut TV console media cabinet, cream sofa in the background, brass accents, indoor plant, polished concrete floor, soft daylight, professional interior photography"
  ["gallery-1"]="A luxury penthouse living room with a cream sofa, floor-to-ceiling windows showing city skyline at golden hour, marble coffee table, brass accents, professional architectural photography"
  ["gallery-2"]="A library study room with a walnut velvet wingback chair, floor-to-ceiling bookshelves, brass reading lamp, oriental rug, warm ambient lighting, professional interior photography"
  ["gallery-3"]="A sunlit conservatory sunroom with a rattan and cream linen sofa, potted palms, terracotta tile floor, bright natural daylight, professional interior photography, greenhouse aesthetic"
  ["gallery-4"]="A modern Brooklyn loft living room with a low-profile cream sofa, exposed brick wall, steel-framed windows, oak coffee table, industrial luxury aesthetic, professional interior photography"
  ["gallery-5"]="A coastal retreat living room with a cream linen sofa, driftwood coffee table, jute rug, large windows showing ocean view, bright natural daylight, professional interior photography"
  ["gallery-6"]="A garden room with a cream boucle sofa, large sliding glass doors opening to a green garden, marble side table, fiddle leaf fig plant, bright natural daylight, professional interior photography"
  ["before-empty"]="An empty modern living room with bare hardwood floor, blank white walls, single tall window with soft daylight, no furniture, real estate photography, neutral and unfurnished"
  ["after-styled"]="A beautifully styled modern living room with a walnut brown velvet sofa, brass floor lamp, marble coffee table, potted fiddle leaf fig plant, warm natural daylight, professional interior photography, luxury aesthetic"
)

gen_one() {
  local name="$1"
  local prompt="$2"
  local out_dir="$3"
  local out_file="${out_dir}/${name}.jpg"
  if [ -f "$out_file" ]; then
    echo "SKIP $name (already exists)"
    return
  fi
  echo "GEN  $name"
  z-ai image -p "$prompt" -o "$out_file" -s 1344x768 > /dev/null 2>&1
  if [ $? -eq 0 ] && [ -f "$out_file" ]; then
    echo "OK   $name ($(stat -c%s "$out_file") bytes)"
  else
    echo "FAIL $name"
  fi
}

export -f gen_one
export OUT_PRODUCTS OUT_SCENES

# Run all products + scenes in parallel batches of 3
{
  for name in "${!PRODUCTS[@]}"; do
    echo "$name|${PRODUCTS[$name]}|$OUT_PRODUCTS|product"
  done
  for name in "${!SCENES[@]}"; do
    echo "$name|${SCENES[$name]}|$OUT_SCENES|scene"
  done
} | xargs -P 3 -I {} bash -c '
  IFS="|" read -r name prompt out_dir kind <<< "{}"
  gen_one "$name" "$prompt" "$out_dir"
'

echo ""
echo "=== Summary ==="
echo "Products:"
ls -la $OUT_PRODUCTS 2>/dev/null | grep -E "\.jpg" | wc -l
echo "Scenes:"
ls -la $OUT_SCENES 2>/dev/null | grep -E "\.jpg" | wc -l
