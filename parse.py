import urllib.request
import re
from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
    def handle_data(self, data):
        data = data.strip()
        if data:
            self.text.append(data)

html = urllib.request.urlopen('https://docs.magnific.com/modelcontextprotocol').read().decode('utf-8')
parser = MyHTMLParser()
parser.feed(html)
with open('magnific_docs.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(parser.text))
