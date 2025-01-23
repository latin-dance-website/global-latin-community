import Image from "next/image";
import React from "react";

export const Logo: React.FC = () => {
  return (
    <Image src="/assets/logo.png" alt="nextjs" height={'50'} width={'40'} />
  );
};
