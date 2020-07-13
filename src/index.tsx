import api from "@forge/api";
import ForgeUI, {
  render,
  Fragment,
  Text,
  Macro,
  useProductContext,
  useState,
} from "@forge/ui";
import { parse } from "node-html-parser";
import { findMatchingWords } from "./helper";

process.cwd = () => ".";

const fetchKeywordsForContent = async (contentId) => {

  console.log("HERE WE ARE", contentId)

  const res = await api
    .asApp()
    .requestConfluence(
      `/wiki/rest/api/content/${contentId}?expand=body.storage`
    );

  const data = await res.json();

  console.log("body", JSON.stringify(data));

  const htmlContent = data.body.storage.value;
  const root = parse(htmlContent);
  const text = root.querySelector("p").text;

  const matchingWords = findMatchingWords(text);
  console.log("matchingWords", matchingWords);
  return matchingWords;
};

const App = () => {
  const context = useProductContext();
  const [words] = useState<any>(
    async () => await fetchKeywordsForContent(context.contentId)
  );

  const wordKeys = Object.keys(words);
  const hasWords = wordKeys.length > 0;

  return (
    <Fragment>
      <Text>**Definitions**</Text>
      {!hasWords && <Text>No matching words found.</Text>}
      {wordKeys.map((w) => {
        return (
          <Text>
            {w} ({words[w].grouping}): {words[w].definition}
          </Text>
        );
      })}
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);
