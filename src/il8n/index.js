import languages from './languages';

export default {
  messages: languages.en,
  language: 'en',
  languages,
  getLang: (lang: string) => languages[lang],
};
