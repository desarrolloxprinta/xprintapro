import re

extracted_path = "/home/suario/projects/xprinta-pro/scratch/redeia_extracted.txt"
out_path = "/home/suario/projects/xprinta-pro/scratch/reconstructed/src/proyecto-redeia.js"

def generate():
    with open(extracted_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # renderProyectoRedeia is the HTML content from after the opening backtick up to index 19142
    template_content = content[1:19142].strip()
    
    # zu is from index 19152 to 25833
    zu_content = content[19152:25833].strip()
    
    # Replace variables: q -> gsap, Q -> ScrollTrigger
    # Be careful to replace them only where they represent the global/imported variables.
    # In the minified code:
    # 'q.timeline' -> 'gsap.timeline'
    # 'q.to' -> 'gsap.to'
    # 'q.from' -> 'gsap.from'
    # 'q.registerPlugin' -> 'gsap.registerPlugin'
    # 'Q.create' -> 'ScrollTrigger.create'
    
    zu_content = zu_content.replace("q.timeline", "gsap.timeline")
    zu_content = zu_content.replace("q.to", "gsap.to")
    zu_content = zu_content.replace("q.from", "gsap.from")
    zu_content = zu_content.replace("Q.create", "ScrollTrigger.create")
    zu_content = zu_content.replace("q.registerPlugin", "gsap.registerPlugin")
    
    # Format the file nicely
    file_code = f"""import {{ gsap }} from 'gsap';
import {{ ScrollTrigger }} from 'gsap/ScrollTrigger';

export const renderProyectoRedeia = () => `
{template_content}
`;

export const initProyectoAnimations = () => {{
  {zu_content}
}};
"""
    
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(file_code)
        
    print(f"Generated {out_path} ({len(file_code)} bytes)")

if __name__ == "__main__":
    generate()
