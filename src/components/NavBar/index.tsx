import { Box, IconButton, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { lightTheme } from '@src/main';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/store/store';
import { switchMode } from '@src/reducers/AppSlice';
import { useAuth } from '@src/hooks/useAuth';
import { gradientBackGround } from '@src/styles/globalMuiStyls';
import { useTranslation } from 'react-i18next';
function NavBar({
  state,
  setState,
  hideMenu = false,
}: {
  state?: boolean;
  setState?: React.Dispatch<boolean>;
  hideMenu?: boolean;
}) {
  const { t } = useTranslation();
  const { mode } = useSelector((state: RootState) => state.App);
  const dispatch = useDispatch<AppDispatch>();
  const { GetUserData, LogOut } = useAuth();
  return (
    <>
      <Paper
        sx={{
          borderRadius: 0,
          backgroundImage:
            lightTheme.palette.mode == 'dark' ? '' : gradientBackGround,
        }}
        className=" flex items-center justify-between  shadow-md py-4 px-3 text-white  font-bold"
      >
        <div className=" flex items-center gap-4 text-white">
          {!hideMenu && (
            <IconButton onClick={() => setState(!state)} sx={{ color: '#fff' }}>
              {state ? <RestaurantMenuIcon /> : <MenuIcon />}
            </IconButton>
          )}
          <div>
            <p>
              {/* Restaurant Name */}
              My Chicken Armaturenbrett
            </p>
            <p>
              [{t(GetUserData()?.role)}-{GetUserData()?.name}]
            </p>
          </div>
        </div>

        <div>
          <IconButton
            sx={{ color: '#fff' }}
            onClick={() =>
              dispatch(switchMode(mode == 'dark' ? 'light' : 'dark'))
            }
          >
            {mode == 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton sx={{ color: '#fff' }} onClick={LogOut}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Paper>
    </>
  );
}

export default NavBar;
