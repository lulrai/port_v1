import { DefaultImg } from '@static/images';
import axios from 'axios';

const GH_API_KEY = import.meta.env.VITE_GH_API_KEY;

const headers = {
  Authorization: `token ${GH_API_KEY}`,
  Accept: 'application/vnd.github.v3+json',
};

const fetchImage = async (url: string) => {
  try {
    const imageResponse = await axios.get(url, { headers });
    return 'data:image/jpeg;base64,' + imageResponse.data.content.replace(/\n/g, '');
  } catch (e) {
    return '';
  }
};

const fetchReadmeData = async (repo: any) => {
  try {
    const readmeResponse = await axios.get(`${repo.url}/readme`, { headers });
    if (!readmeResponse.data) return;
    return window.atob(readmeResponse.data.content);
  } catch (e) {
    return null;
  }
};

const fetchLanguages = async (repo: any) => {
  try {
    const langResponse = await axios.get(repo.languages_url, { headers });
    return Object.keys(langResponse.data);
  } catch (e) {
    return [];
  }
};

const fetchRepos = async () => {
  try {
    const response = await axios.get('https://api.github.com/user/repos', { headers });
    const repoData = await Promise.all(
      response.data.map(async (repo: any) => {
        const readmeData = await fetchReadmeData(repo);
        let image_info = DefaultImg;
        if (readmeData) {
          const imageRegex = /(\[product-screenshot\]: *)(.*)\n/;
          const nameRegex = /(<h3 align="center">)(.*)(<\/h3>)/;
          const imageMatch = imageRegex.exec(readmeData);
          const nameMatch = nameRegex.exec(readmeData);
          if (imageMatch) {
            const imageUrl = `${repo.contents_url.replace('{+path}', imageMatch[2])}`;
            image_info = await fetchImage(imageUrl);
          }
          if (nameMatch) {
            repo.name = nameMatch[2];
          }
        }

        const repo_langs = await fetchLanguages(repo);
        return {
          repo_id: repo.id,
          reponame: repo.name,
          is_private: repo.private,
          repolink: repo.private ? null : repo.html_url,
          repodesc: repo.description ? repo.description : 'No repo description.',
          repo_langs,
          repo_stars: repo.stargazers_count,
          repo_img: image_info,
        };
      }),
    );
    return repoData
      .sort((a, b) => b.repo_stars - a.repo_stars)
      .slice(1)
      .filter(Boolean);
  } catch (e) {
    console.error('Could not load Github repos');
    throw e;
  }
};

export const reposDict = fetchRepos();
