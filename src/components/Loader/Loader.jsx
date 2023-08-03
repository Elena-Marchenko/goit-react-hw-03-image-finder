import { MutatingDots } from 'react-loader-spinner';
import s from './Loader.module.css';

function Loaders() {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass={s.loader}
      visible={true}
    />
  );
}
export default Loaders;
