import { useTranslation } from 'react-i18next';

const useLang = () => {
  const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('current-lang', JSON.stringify(i18n.language));
    changeHtml(lang);
  };

  const changeHtml = (lang: string) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return { changeLang, changeHtml };
};

export default useLang;
