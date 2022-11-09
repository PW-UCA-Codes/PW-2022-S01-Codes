import classes from './LoadingSpinner.module.scss';

import { useConfigContext } from '../../contexts/ConfigContext';

const LoadingSpinner = () => {
  const { loading } = useConfigContext();

  return (
    loading &&
    <div className={classes["container"]}>
      <div className={classes["lds-facebook"]}><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoadingSpinner;