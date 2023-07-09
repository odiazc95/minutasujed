import logo_UJED from '../assets/img/logoujed.png';
import { Metric } from "@tremor/react";

const NotFound = () => {
  return (
    <section className='w-full h-full flex flex-col justify-center items-center gap-4'>
      <img src={logo_UJED} alt="ujed logo" className='bg-main rounded-full w-52 h-52 -mt-4' />
      <Metric className='text-center'>Lo sentimos, esta página no existe</Metric>
    </section>
  );
};

export default NotFound;