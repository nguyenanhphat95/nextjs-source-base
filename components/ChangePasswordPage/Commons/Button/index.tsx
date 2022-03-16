import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import cn from 'classnames';
import { Theme } from '@mui/material/styles';
import LoadingIcon from '../LoadingIcon';
export interface Props extends ButtonProps {
  loading?: boolean;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 40,
    fontSize: 17,
    fontWeight: 700,
    // boxShadow: 'none !important',
    height: 38,
    width: 140,
    textTransform: 'inherit',
    paddingLeft: '30px !important',
    paddingRight: '30px !important',
    background: '#ffd643',
    color: 'black',
    '&:hover': {
      opacity: 0.7,
      background: '#ffd643',
   },
  },
}));

const ButtonCustom = (props: Props) => {
  const { fullWidth, loading, className, children, ...rest } = props;
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <Button
          variant="contained"
          fullWidth={fullWidth}
          className={cn(classes.root, className)}
          disabled
        >
          <LoadingIcon />
        </Button>
      ) : (
        <Button
          fullWidth={fullWidth}
          className={cn(classes.root, className)}
          {...rest}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default ButtonCustom;
