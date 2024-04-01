import { Button, styled } from '@mui/material';

export const backgroundGradient = {
  background: 'linear-gradient(45deg, #FE532D, #EF9719)',
  color: 'white',
  ':disabled': {
    background: 'none',
    backgroundColor: '#1f1f1e',
    color: 'white',
  },
};

export const SuccessButtonGradient =
  'linear-gradient(120deg,#5cb85c, 99.9%, #00CDAC )';
export const gradientBackGround = 'linear-gradient(120deg,#e30513, #fa3845 )';
export const errorGradientColor = 'linear-gradient(45deg, #EB3349, #F45C43)';

export const ErrorButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundImage: errorGradientColor,
}));
