import React, {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  center?: boolean;
}

const Container = ({children, center}: Props) => {
  return center ? (
    <div className="w-full bg-background-500 dark:bg-primary-900 transition-all duration-500 ease-in-out h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  ) : (
    <div className="w-full bg-background-500 dark:bg-primary-900 transition-all duration-500 ease-in-out h-screen">
      {children}
    </div>
  );
};

export default Container;
