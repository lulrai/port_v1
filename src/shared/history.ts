import * as pdfjs from 'pdfjs-dist';

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
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const pdf = await pdfjs.getDocument(pdfUrl).promise;
  const page = await pdf.getPage(1);
  const textContent = await page.getTextContent();

  let content = '';
  textContent.items.forEach((item: any) => {
    content += item.str + ' ';
  });
  // Get only the experience section
  const experienceRegex = /EXPERIENCE(.*)PROJECT/;
  const experienceMatch = experienceRegex.exec(content);
  if (experienceMatch) {
    content = experienceMatch[1].replaceAll('- ', '').trim();
  }
  // Split each experience into an array using regex
  const generalExp =
    /([A-Z][a-z]+(?:[\s\xA0]{1}[a-z]+)*(?:\s{2}[a-z]+(?:\s[A-Za-z.]+)*))  \u{11}   ([a-z]{3} [0-9]{4}) \u{2013} ([a-z]{3} [0-9]{4}|[a-z]*)   \u{BD}   ([a-z]+, *[a-z]+[, a-z]*)/giu;
  const experienceTitles = content.matchAll(generalExp);
  // Store the matched values in an array of dictionaries
  const experiences: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description?: string[];
  }[] = [];
  for (const match of experienceTitles) {
    const [, jobTitle, dateStart, dateEnd, loc] = match;
    const title = jobTitle.split('  ')[0].trim();
    const company = jobTitle.replace(title, '').trim();
    experiences.push({
      title: title.trim(),
      company: company.trim(),
      startDate: dateStart.trim(),
      endDate: dateEnd.trim(),
      location: loc.trim(),
    });
  }

  // Split the remaining information and add it to already existing experiences
  const expInfo = content.replaceAll(generalExp, ' split_text ').split(' split_text ').filter(Boolean);
  for (let i = 0; i < expInfo.length; i += 1) {
    const descriptions: string[] = expInfo[i].split(/\u{2022}/u).filter(Boolean);
    experiences[i].description = descriptions;
  }
  return experiences;
};

export const history = getPdfText('/resume.pdf');
