import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

function MuiLocalizationLayout({ children }: { children: JSX.Element }) {
  const { i18n } = useTranslation();

  // Use it for
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <>
      {i18n.language == 'ar' ? (
        <CacheProvider value={cacheRtl}>{children}</CacheProvider>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default MuiLocalizationLayout;
