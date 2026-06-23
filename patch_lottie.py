import json

# Read the original Lottie file
with open('public/lottie/dots-evolving.json', 'r') as f:
    data = json.load(f)

# 1. Fix missing properties in Stroke and Trim Paths shapes
for layer in data.get('layers', []):
    if 'shapes' in layer:
        for shape in layer['shapes']:
            if shape.get('ty') == 'tm':
                if 'o' not in shape:
                    shape['o'] = {'a': 0, 'k': 0}
            elif shape.get('ty') == 'st':
                if 'o' not in shape:
                    shape['o'] = {'a': 0, 'k': 100}

# 2. Fix missing tangents in keyframes
def fix_keyframes(obj):
    if not obj or not isinstance(obj, (dict, list)):
        return
    if isinstance(obj, dict):
        if 'k' in obj and isinstance(obj['k'], list) and len(obj['k']) > 0:
            first_elem = obj['k'][0]
            if isinstance(first_elem, dict) and 't' in first_elem:
                # Populate default linear tangents on all but the last keyframe
                for kf in obj['k'][:-1]:
                    if 'o' not in kf:
                        kf['o'] = {'x': 0.833, 'y': 0.833}
                    if 'i' not in kf:
                        kf['i'] = {'x': 0.167, 'y': 0.167}
        else:
            for k in obj:
                fix_keyframes(obj[k])
    elif isinstance(obj, list):
        for item in obj:
            fix_keyframes(item)

fix_keyframes(data)

# Write the patched Lottie file back
with open('public/lottie/dots-evolving.json', 'w') as f:
    json.dump(data, f, indent=2)
