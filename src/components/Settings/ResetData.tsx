import React from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ErrorButton } from '@src/styles/globalMuiStyls';
import WarningIcon from '@mui/icons-material/Warning';
import { useApi } from '@src/hooks/useApi';
import { Domain } from '@src/enums/Domain';
import { useTranslation } from 'react-i18next';

const { DELETE } = useApi();
function ResetData() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const resetDash = async () => {
    setLoading(true);
    DELETE(`${Domain.API_URL}/resetdatabase`, []).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <div className=" flex items-center gap-3">
        <RestartAltIcon fontSize="large" />
        <h2 className=" text-lg md:text-xl font-bold">{t('resetData')}</h2>
      </div>
      <p>{t('resetDataDesc')}</p>
      <div className="my-3">
        <ErrorButton
          disabled={loading}
          onClick={resetDash}
          startIcon={<WarningIcon />}
        >
          {t('resetDash')}
        </ErrorButton>
      </div>
    </div>
  );
}

export default ResetData;
