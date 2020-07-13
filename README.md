### SAT Glossary

Automated macro for creating a section of defined SAT words present in any given Confluence article.

Search for the `sat-glossary` forge app

Invoke via `/Word glossary`

### How it works
* Pulls a list of SAT words found here https://satvocabulary.us/INDEX.ASP?CATEGORY=6000LIST and converts it into a json format.
* Library tokenizes the confluence article content and finds matching words.
* Any matched words are rendered in the SAT glossary macro section.
