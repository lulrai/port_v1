import { GlobalWorkerOptions, version, getDocument } from 'pdfjs-dist';

const getPdfText = async (
  pdfUrl: string,
): Promise<
  Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description?: string[];
  }>
> => {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.mjs`;
  const pdf = await getDocument(pdfUrl).promise;
  const page = await pdf.getPage(1);
  const textContent = await page.getTextContent();

  let content = '';
  textContent.items.forEach((item: any) => {
    content += item.str + ' ';
  });


  // Get only the experience section
  const experienceRegex = /Experience(.*)(?=Education|Skills|Project|$)/is;  // Match experience until other sections like Education or Skills
  const experienceMatch = experienceRegex.exec(content);
  if (experienceMatch) {
    content = experienceMatch[1].replaceAll('- ', '').trim();
  }
  content = "  " + content;
  content = content.replaceAll('   ', ' ');

  // Split the experience by ȧ + the words before until the previous period. Example: "Company ȧ Position ... 50%. Company2 ȧ Position2 ... 50%." => ["Company ȧ Position ... 50%", "Company2 ȧ Position2 ... 50%"]
  const experienceSplitRegex = /(?: ){2,}([A-Za-z0-9\s\.,&]+?)\s{1,}ȧ\s{2,}([A-Za-z0-9,\s\/\-\(\)]+)([A-Za-z\s]{3} [\d]{4} – (?:[A-Za-z\s]{3} [\d]{4}|Now))\s*([\s\S]+?)(?=\s{2}|$)/gui;
  const splitExpContent = content.matchAll(experienceSplitRegex);

  // Store the matched values in an array of dictionaries
  const experiences: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description?: string[];
  }[] = [];
  for (const match of splitExpContent) {
    console.log(match);
    const company = match[1].trim();
    const title = match[2].split('  ')[0].trim();
    const loc = match[2].split('  ')[1].trim();
    const dateStart = match[3].split('–')[0].trim();
    const dateEnd = match[3].split('–')[1].trim();
  
    // Get the experience/descriptions
    const experienceList = match[4].split('•').filter(Boolean);

    experiences.push({
      title: title.trim(),
      company: company.trim(),
      startDate: dateStart.trim(),
      endDate: dateEnd.trim(),
      location: loc.trim(),
      description: experienceList,
    });
  }
  return experiences;
};

export const history = getPdfText('/resume.pdf');
