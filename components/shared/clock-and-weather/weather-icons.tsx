import React from 'react';

interface WeatherIconsProps {
  weatherIconId:
    | '01d'
    | '01n'
    | '02'
    | '03'
    | '04'
    | '09'
    | '10'
    | '11'
    | '13'
    | '50';
  className?: string;
  props?: React.HTMLAttributes<SVGElement>;
}

const WeatherIcons = ({
  weatherIconId,
  className,
  props,
}: WeatherIconsProps) => {
  switch (weatherIconId) {
    case '01d':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z'
          ></path>
          <path
            className='stroke-primary'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19.14 19.14l-.13-.13m0-14.02l.13-.13-.13.13zM4.86 19.14l.13-.13-.13.13zM12 2.08V2v.08zM12 22v-.08.08zM2.08 12H2h.08zM22 12h-.08.08zM4.99 4.99l-.13-.13.13.13z'
          ></path>
        </svg>
      );

    case '01n':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M2.03 12.42c.36 5.15 4.73 9.34 9.96 9.57 3.69.16 6.99-1.56 8.97-4.27.82-1.11.38-1.85-.99-1.6-.67.12-1.36.17-2.08.14C13 16.06 9 11.97 8.98 7.14c-.01-1.3.26-2.53.75-3.65.54-1.24-.11-1.83-1.36-1.3C4.41 3.86 1.7 7.85 2.03 12.42z'
          ></path>
        </svg>
      );

    case '02':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M20.27 18.68c-.99.91-2.29 1.41-3.64 1.4H5.54c-4.67-.34-4.68-7.14 0-7.48h.05C2.89 5.06 12.12 1.34 16 6.03v.01c.7.86 1.23 2 1.47 3.45 1.33.17 2.41.82 3.18 1.74 1.75 2.07 1.9 5.45-.38 7.45zM7.26 13.01c-.52-.26-1.09-.4-1.67-.41M15.85 9.92c.52-.26 1.09-.4 1.67-.41'
          ></path>
          <path
            className='stroke-primary'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M21.97 8.5c0 1.1-.51 2.09-1.32 2.73a4.897 4.897 0 00-3.18-1.74C17.23 8.04 16.7 6.9 16 6.04v-.01A3.46 3.46 0 0118.47 5c1.93 0 3.5 1.57 3.5 3.5z'
          ></path>
        </svg>
      );

    case '03':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M7.27 13.01a3.79 3.79 0 00-1.72-.41c-4.68.33-4.68 7.14 0 7.47h11.09c1.35.01 2.65-.49 3.64-1.4 3.29-2.87 1.53-8.64-2.8-9.19C15.92.11 2.39 3.67 5.6 12.6M15.85 9.92c.52-.26 1.09-.4 1.67-.41'
          ></path>
        </svg>
      );

    case '04':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M7.27 13.01a3.79 3.79 0 00-1.72-.41c-4.68.33-4.68 7.14 0 7.47h11.09c1.35.01 2.65-.49 3.64-1.4 3.29-2.87 1.53-8.64-2.8-9.19C15.92.11 2.39 3.67 5.6 12.6M15.85 9.92c.52-.26 1.09-.4 1.67-.41'
          ></path>
        </svg>
      );

    case '09':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M16.61 20c1.34.01 2.63-.49 3.62-1.39 3.27-2.86 1.52-8.6-2.79-9.14C15.9.13 2.43 3.67 5.62 12.56'
          ></path>
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M7.28 12.97c-.53-.27-1.12-.41-1.71-.4-4.66.33-4.65 7.11 0 7.44M15.82 9.89c.52-.26 1.08-.4 1.66-.41'
          ></path>
          <path
            className='stroke-primary'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M9.97 20l-2 2M13.97 20l-2 2M13.97 16l-2 2M9.97 16l-2 2'
          ></path>
        </svg>
      );

    case '10':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M16.61 20c1.34.01 2.63-.49 3.62-1.39 3.27-2.86 1.52-8.6-2.79-9.14C15.9.13 2.43 3.67 5.62 12.56'
          ></path>
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M7.28 12.97c-.53-.27-1.12-.41-1.71-.4-4.66.33-4.65 7.11 0 7.44M15.82 9.89c.52-.26 1.08-.4 1.66-.41'
          ></path>
          <path
            className='stroke-primary'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M9.97 20l-2 2M13.97 20l-2 2M13.97 16l-2 2M9.97 16l-2 2'
          ></path>
        </svg>
      );

    case '11':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M16.61 20c1.34.01 2.63-.49 3.62-1.39 3.27-2.86 1.52-8.6-2.79-9.14C15.9.13 2.43 3.67 5.62 12.56'
          ></path>
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M7.28 12.97c-.53-.27-1.12-.41-1.71-.4-4.66.33-4.65 7.11 0 7.44M15.82 9.89c.52-.26 1.08-.4 1.66-.41'
          ></path>
          <path
            className='stroke-primary'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M9.23 19.16h1v2.33c0 .34.43.51.65.25l2.45-2.79c.3-.34.17-.62-.28-.62h-1V16c0-.34-.43-.51-.65-.25l-2.45 2.79c-.3.34-.17.62.28.62z'
          ></path>
        </svg>
      );

    case '50':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          className={className}
          {...props}
        >
          <path
            className='stroke-primary'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M2 13.1l2.5-1.5c1.54-.92 3.46-.92 5 0s3.46.92 5 0 3.46-.92 5 0l2.5 1.5'
          ></path>
          <path
            className='stroke-muted-foreground'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
            d='M2 3.9l2.5 1.5c1.54.92 3.46.92 5 0s3.46-.92 5 0 3.46.92 5 0L22 3.9M2 20.1l2.5-1.5c1.54-.92 3.46-.92 5 0s3.46.92 5 0 3.46-.92 5 0l2.5 1.5'
          ></path>
        </svg>
      );
  }
};

export default WeatherIcons;
