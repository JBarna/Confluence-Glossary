from bs4 import BeautifulSoup
import requests
import json

url = "https://satvocabulary.us/INDEX.ASP?CATEGORY=6000LIST"

# Make a GET request to fetch the raw HTML content
html_content = requests.get(url).text

# Parse the html content
soup = BeautifulSoup(html_content, "html.parser")

rows = soup.find_all('tr')
words = {}
for r in rows[2:]:
    cols = r.find_all('td')
    print('cols', r)
    words[cols[1].text.strip()] = {
        'definition': cols[2].text.encode('ascii', 'ignore').decode("utf-8").strip(),
        'grouping': cols[3].text.strip()
    }


with open('../src/words.json', 'w') as f:
    f.write(json.dumps(words))
